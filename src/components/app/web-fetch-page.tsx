'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  ChevronDown,
  Copy,
  ExternalLink,
  Loader2,
  Save,
  Search,
  Settings,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';

import { findSingleWebsiteAction } from '@/app/actions';
import type { WebsiteLookupOutput } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  companyNames: z.string().min(1, 'Please enter at least one company name.'),
  location: z.string().min(1, 'Please enter a location.'),
  keyword: z.string().optional(),
  apiKeys: z.string().min(1, 'Please enter at least one API key.'),
  threads: z.coerce
    .number()
    .min(1, 'Threads must be at least 1.')
    .max(50, 'Threads must be 50 or less.'),
});

type FormValues = z.infer<typeof formSchema>;

const API_KEYS_STORAGE_KEY = 'serperApiKeys';

export default function WebFetchPage() {
  const { toast } = useToast();
  const [results, setResults] = React.useState<WebsiteLookupOutput[]>([]);
  const [isPending, setIsPending] = React.useState(false);
  const [errorLog, setErrorLog] = React.useState('');
  const [advSettingsOpen, setAdvSettingsOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyNames: '',
      location: '',
      keyword: '',
      apiKeys: '',
      threads: 10,
    },
  });

  React.useEffect(() => {
    try {
      const savedKeys = localStorage.getItem(API_KEYS_STORAGE_KEY);
      if (savedKeys) {
        form.setValue('apiKeys', savedKeys);
      }
    } catch (error) {
      console.error('Could not load API keys from local storage:', error);
    }
  }, [form]);

  const handleSaveApiKeys = () => {
    try {
      const keys = form.getValues('apiKeys');
      localStorage.setItem(API_KEYS_STORAGE_KEY, keys);
      toast({
        title: 'API Keys Saved',
        description: 'Your API keys have been saved in your browser.',
      });
    } catch (error) {
      console.error('Could not save API keys to local storage:', error);
      toast({
        variant: 'destructive',
        title: 'Error Saving Keys',
        description:
          'Could not save API keys. Your browser might be blocking local storage.',
      });
    }
  };

  const copyResultsAsCsv = () => {
    if (results.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Results',
        description: 'There are no results to copy.',
      });
      return;
    }
    const header = 'Company Name,Website URL\n';
    const csvContent = results
      .map((row) => `"${row.companyName}","${row.websiteUrl}"`)
      .join('\n');
    navigator.clipboard.writeText(header + csvContent).then(
      () => {
        toast({
          title: 'Copied to Clipboard',
          description: `${results.length} rows have been copied as CSV.`,
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast({
          variant: 'destructive',
          title: 'Copy Failed',
          description: 'Could not copy results to the clipboard.',
        });
      }
    );
  };

  const onSubmit = async (values: FormValues) => {
    setIsPending(true);
    setResults([]);
    setErrorLog('');

    const allCompanyNames = values.companyNames
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name !== '');

    let availableApiKeys = values.apiKeys
      .split('\n')
      .map((k) => k.trim())
      .filter((k) => k !== '');

    if (availableApiKeys.length === 0) {
      setErrorLog('Please provide at least one API key.');
      setIsPending(false);
      return;
    }

    const concurrency = values.threads;
    let apiKeyIndex = 0;

    const processCompany = async (
      name: string
    ): Promise<WebsiteLookupOutput> => {
      if (availableApiKeys.length === 0) {
        throw new Error(
          'All API keys have been exhausted or hit their rate limits.'
        );
      }

      const currentApiKey = availableApiKeys[apiKeyIndex % availableApiKeys.length];
      apiKeyIndex++;

      try {
        const result = await findSingleWebsiteAction({
          companyName: name,
          location: values.location,
          keyword: values.keyword || '',
          apiKey: currentApiKey,
        });
        return result;
      } catch (err: any) {
        if (err.message === 'RATE_LIMIT_EXCEEDED') {
          // Remove the key from the pool and retry
          const exhaustedKey = currentApiKey;
          availableApiKeys = availableApiKeys.filter(
            (key) => key !== exhaustedKey
          );
          apiKeyIndex = 0; // Reset index
          toast({
            variant: 'destructive',
            title: 'API Key Rate Limited',
            description: `Key ending in ...${exhaustedKey.slice(
              -4
            )} has hit its rate limit. Trying next key.`,
          });
          // Retry the same company with the next key
          return processCompany(name);
        }
        // For other errors, just re-throw to be caught by the outer catch
        throw err;
      }
    };

    const companyChunks: string[][] = [];
    for (let i = 0; i < allCompanyNames.length; i += concurrency) {
      companyChunks.push(allCompanyNames.slice(i, i + concurrency));
    }

    for (const chunk of companyChunks) {
      try {
        const promises = chunk.map((name) => processCompany(name));
        const chunkResults = await Promise.all(
          promises.map(p => p.catch(e => e))
        );

        const successfulResults: WebsiteLookupOutput[] = [];
        chunkResults.forEach((result, index) => {
          const companyName = chunk[index];
          if (result instanceof Error) {
            console.error(`An unexpected error occurred for ${companyName}:`, result);
            const errorMessage = result.message || `An unknown error occurred.`;
            setErrorLog(
              (prevLog) => `${prevLog}\n[${companyName}]: ${errorMessage}`
            );
            successfulResults.push({ companyName: companyName, websiteUrl: `Error: ${errorMessage}` });
          } else {
             successfulResults.push(result);
          }
        });

        setResults((prev) => [...prev, ...successfulResults]);

      } catch (err: any) {
        console.error(`An unexpected error occurred during batch processing:`, err);
        setErrorLog(
          (prevLog) => `${prevLog}\n[Batch Error]: ${err.message}`
        );
      }
    }

    setIsPending(false);
  };

  const isApiKeyConfigError =
    errorLog.includes('Serper API error: 401') ||
    errorLog.includes('Invalid API Key');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="flex-grow container mx-auto px-4 py-12 sm:py-16">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4">
            <Image
              src="http://bestserviceiptv.co.uk/t/wp-content/uploads/2025/09/webfetchlogo.png"
              alt="WebFetch Logo"
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight font-headline">
              WebFetch
            </h1>
          </div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Instantly find official websites for a list of companies.
          </p>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            API Source:{' '}
            <a
              href="https://serper.dev/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://serper.dev/signup
            </a>
          </p>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl mx-auto">
            Temp Mail:{' '}
            <a
              href="https://smailpro.com/temporary-email"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://smailpro.com/temporary-email
            </a>
          </p>
        </header>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-8 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                  <CardHeader>
                    <CardTitle>Lookup Details</CardTitle>
                    <CardDescription>
                      Enter company names and a location.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="companyNames"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Names</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Google\nMicrosoft\nApple"
                              className="h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Austin, Texas"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="keyword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Keyword (optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., headquarters, careers"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Find Websites
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Collapsible open={advSettingsOpen} onOpenChange={setAdvSettingsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-center mt-4 text-sm"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Advanced Settings
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform ${
                          advSettingsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Advanced Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <FormField
                          control={form.control}
                          name="threads"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Threads</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Number of requests to run at once.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="apiKeys"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Serper API Keys</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter one API key per line"
                                  className="h-24 resize-y font-mono text-xs"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                The app will cycle through keys if one hits a
                                rate limit.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={handleSaveApiKeys}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Keys to Browser
                        </Button>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </form>
            </Form>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className='flex-row items-center justify-between'>
                <div>
                  <CardTitle>Results</CardTitle>
                  <CardDescription>
                    {isPending
                      ? 'Finding websites...'
                      : 'Website URLs will appear here.'}
                  </CardDescription>
                </div>
                 <Button
                  variant="outline"
                  size="sm"
                  onClick={copyResultsAsCsv}
                  disabled={results.length === 0}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy as CSV
                </Button>
              </CardHeader>
              <CardContent className="min-h-[200px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Company Name</TableHead>
                      <TableHead>Website URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {result.companyName}
                        </TableCell>
                        <TableCell>
                          {result.websiteUrl.startsWith('http') ? (
                            <a
                              href={result.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline hover:opacity-80 transition-opacity"
                            >
                              {result.websiteUrl}
                              <ExternalLink className="h-4 w-4 shrink-0" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground">
                              {result.websiteUrl}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {isPending && results.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2}>
                          <div className="flex items-center justify-center text-muted-foreground">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {!isPending && results.length === 0 && !errorLog && (
                  <div className="flex items-center justify-center h-full min-h-[150px] text-center">
                    <p className="text-muted-foreground">
                      Enter company names and click "Find Websites" to start.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            {errorLog && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-5 w-5" />
                    Error Log
                  </CardTitle>
                  <CardDescription>
                    {isApiKeyConfigError ? (
                      <>
                        The API key might be invalid, expired, or rate-limited.
                        This app uses Serper.dev to fetch search results. You
                        can get a free API key by signing up at{' '}
                        <a
                          href="https://serper.dev/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          serper.dev
                        </a>
                        .
                      </>
                    ) : (
                      'The following errors occurred during the search.'
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    value={errorLog.trim()}
                    className="h-32 resize-y text-destructive bg-destructive/10 border-destructive/30 font-mono text-xs"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <footer className="text-center p-4 text-muted-foreground">
        Made With ❤️ By{' '}
        <a
          href="https://www.linkedin.com/in/nouhefikri/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          Nouhe Fikri
        </a>
      </footer>
    </div>
  );
}
