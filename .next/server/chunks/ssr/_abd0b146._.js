module.exports = {

"[project]/src/app/actions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"40b826701f067ff6a90a129189b8e744b89ef0459d":"findSingleWebsiteAction"},"",""] */ __turbopack_context__.s({
    "findSingleWebsiteAction": (()=>findSingleWebsiteAction)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function findSingleWebsiteAction(input) {
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
        'play.google.com'
    ];
    try {
        const query = `${input.companyName} ${input.keyword} in ${input.location}`;
        const response = await fetch('https://google.serper.dev/search', {
            method: 'POST',
            headers: {
                'X-API-KEY': input.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: query.trim()
            })
        });
        if (response.status === 429) {
            // Rate limit exceeded
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        if (!response.ok) {
            const errorData = await response.json();
            // Throw an error with specific details from the API
            throw new Error(`Serper API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        const data = await response.json();
        // Find the first organic result that is not from an excluded domain
        const result = data.organic?.find((r)=>r.link && !excludedDomains.some((domain)=>r.link.includes(domain)));
        return {
            companyName: input.companyName,
            websiteUrl: result?.link || 'Not found'
        };
    } catch (error) {
        // Re-throw the error to be handled by the client
        throw error;
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    findSingleWebsiteAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(findSingleWebsiteAction, "40b826701f067ff6a90a129189b8e744b89ef0459d", null);
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions.ts [app-rsc] (ecmascript)");
;
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "40b826701f067ff6a90a129189b8e744b89ef0459d": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findSingleWebsiteAction"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "40b826701f067ff6a90a129189b8e744b89ef0459d": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40b826701f067ff6a90a129189b8e744b89ef0459d"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/components/app/web-fetch-page.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/app/web-fetch-page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/app/web-fetch-page.tsx <module evaluation>", "default");
}}),
"[project]/src/components/app/web-fetch-page.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/app/web-fetch-page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/app/web-fetch-page.tsx", "default");
}}),
"[project]/src/components/app/web-fetch-page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2f$web$2d$fetch$2d$page$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/app/web-fetch-page.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2f$web$2d$fetch$2d$page$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/app/web-fetch-page.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2f$web$2d$fetch$2d$page$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2f$web$2d$fetch$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/app/web-fetch-page.tsx [app-rsc] (ecmascript)");
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2f$web$2d$fetch$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_abd0b146._.js.map