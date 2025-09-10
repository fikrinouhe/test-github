'use server';

// A simple data type to hold the result
export interface WebsiteLookupOutput {
  companyName: string;
  websiteUrl: string;
}

// A simple data type for the input
export interface WebsiteLookupInput {
  companyName: string;
  location: string;
  keyword: string;
  apiKey: string;
}

/**
 * Finds a website URL for a single company using Serper.dev.
 * @param input The company name, location, keyword, and API key.
 * @returns An object with the company name and website URL.
 */
export async function findSingleWebsiteAction(
  input: WebsiteLookupInput
): Promise<WebsiteLookupOutput> {
  if (!input.apiKey) {
    throw new Error('SERPER_API_KEY is not configured.');
  }

  const excludedDomains = [
    // Social Media
    'facebook.com',
    'twitter.com',
    'linkedin.com',
    'instagram.com',
    'youtube.com',
    'tiktok.com',
    'pinterest.com',
    'snapchat.com',
    'reddit.com',
    'tumblr.com',
    'wechat.com',
    'line.me',
    'vk.com',
    'orkut.com',
    'xing.com',
    'viadeo.com',
    'meetup.com',
    'quora.com',
    'medium.com',
    'soundcloud.com',
    'mixcloud.com',
    'bandcamp.com',
    'spotify.com',
    'genius.com',
    'discogs.com',
    // Directories & Review Sites
    'yelp.com',
    'yelp.ca',
    'tripadvisor.com',
    'bbb.org',
    'glassdoor.com',
    'crunchbase.com',
    'yellowpages.com',
    'manta.com',
    'dnb.com',
    'zoominfo.com',
    'foursquare.com',
    'mapquest.com',
    'niche.com',
    'owler.com',
    'superpages.com',
    'local.com',
    'cityfos.com',
    'hotfrog.com',
    'elocal.com',
    'bizcommunity.com',
    'chamberofcommerce.com',
    'brownbook.net',
    'nextdoor.com',
    'trustpilot.com',
    'resellerratings.com',
    'sitejabber.com',
    'angi.com',
    'houzz.com',
    'thumbtack.com',
    'g2.com',
    'capterra.com',
    'getapp.com',
    'clutch.co',
    'goodfirms.co',
    'softwareadvice.com',
    'trustradius.com',
    'designrush.com',
    'sortlist.com',
    'expertise.com',
    '99firms.com',
    'appfutura.com',
    'itfirms.co',
    'topdevelopers.co',
    'develop4u.co',
    'upcity.com',
    'bestfirms.com',
    'gartner.com',
    'businesslist.com',
    'here.com',
    'google.com/business',
    'bingplaces.com',
    'apple.com/business',
    'navmii.com',
    'openstreetmap.org',
    'fanpagekarma.com',
    'eventbrite.com',
    'ticketmaster.com',
    'stubhub.com',
    'viator.com',
    'booking.com',
    'airbnb.com',
    'expedia.com',
    'hotels.com',
    'kayak.com',
    'priceline.com',
    'agoda.com',
    'trivago.com',
    'cruisecritic.com',
    'lonelyplanet.com',
    'ricksteves.com',
    'zomato.com',
    'opentable.com',
    'ubereats.com',
    'doordash.com',
    'grubhub.com',
    'postmates.com',
    'seamless.com',
    'deliveroo.com',
    'gloriafood.com',
    'foodpanda.com',
    'swiggy.com',
    'just-eat.co.uk',
    'caviar.com',
    'skipthedishes.com',
    'toasttab.com',
    'slice.com',
    'citysearch.com',
    'localstack.com',
    'yellowbook.com',
    'dexknows.com',
    'callupcontact.com',
    'cylex.us.com',
    'merchantcircle.com',
    'showmelocal.com',
    'salespider.com',
    'bizify.co.uk',
    'yalwa.com',
    'opendi.com',
    'macraesbluebook.com',
    'europages.com',
    'kompass.com',
    'fyple.com',
    'tupalo.com',
    'whodoyou.com',
    'localdatabiz.com',
    'sulekha.com',
    'indiamart.com',
    'tradeindia.com',
    'exportersindia.com',
    'zipleaf.us',
    'asklaila.com',
    'justdial.com',
    'getit.in',
    '411.ca',
    'canpages.ca',
    'truelocal.com.au',
    'startlocal.com.au',
    'whitepages.com.au',
    'nzlbusiness.com',
    'yellow.co.nz',
    'localist.co.nz',
    'freeindex.co.uk',
    'scoot.co.uk',
    'locallife.co.uk',
    'cylex-uk.co.uk',
    'businessmagnet.co.uk',
    'thebestof.co.uk',
    'local-data.co.uk',
    'pagesjaunes.fr',
    '118000.fr',
    'factual.com',
    'infobel.com',
    '192.com',
    'hoovers.com',
    'pitchbook.com',
    'cbinsights.com',
    'datanyze.com',
    'apollo.io',
    'semrush.com',
    'simplyhired.com',
    'indeed.com',
    'ziprecruiter.com',
    'monster.com',
    'workable.com',
    'recruit.net',
    'betterbusinessbureau.org',
    'consumerreports.org',
    'verifiedbusinesses.com',
    'businessdirectoryplugin.com',
    'localstack.org',
    'alignable.com',
    'kudzu.com',
    'bizjournals.com',
    'industrynet.com',
    'giftly.com',
    'yahoo.com',
    'waze.com',
    'iexitapp.com',
    'groupon.com',
    'rennlist.com',
    'wheree.com',
    'patch.com',
    // App Stores
    'apps.apple.com',
    'play.google.com',
  ];

  try {
    const query = `${input.companyName} ${input.keyword} in ${input.location}`;
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': input.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: query.trim(),
      }),
    });

    if (response.status === 429) {
      // Rate limit exceeded
      throw new Error('RATE_LIMIT_EXCEEDED');
    }

    if (!response.ok) {
      const errorData = await response.json();
      // Throw an error with specific details from the API
      throw new Error(
        `Serper API error: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    // Find the first organic result that is not from an excluded domain
    const result = data.organic?.find(
      (r: any) =>
        r.link && !excludedDomains.some((domain) => r.link.includes(domain))
    );

    return {
      companyName: input.companyName,
      websiteUrl: result?.link || 'Not found',
    };
  } catch (error: any) {
    // Re-throw the error to be handled by the client
    throw error;
  }
}
