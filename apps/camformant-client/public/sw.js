!function(){"use strict";var e={913:function(){try{self["workbox:core:7.0.0"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},t={};function s(a){var i=t[a];if(void 0!==i)return i.exports;var r=t[a]={exports:{}},n=!0;try{e[a](r,r.exports,s),n=!1}finally{n&&delete t[a]}return r.exports}!function(){var e,t;let a,i,r;s(913);let n=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class l extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}let o={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},c=e=>[o.prefix,e,o.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||c(o.precache),u=e=>e||c(o.runtime);function f(e,t){let s=t();return e.waitUntil(s),s}s(977);class d{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){let e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class p{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{let s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}async function g(e,t){let s=null;if(e.url&&(s=new URL(e.url).origin),s!==self.location.origin)throw new l("cross-origin-copy-response",{origin:s});let i=e.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},n=t?t(r):r,o=!function(){if(void 0===a){let e=new Response("");if("body"in e)try{new Response(e.body),a=!0}catch(e){a=!1}a=!1}return a}()?await i.blob():i.body;return new Response(o,n)}let y=e=>new URL(String(e),location.href).href.replace(RegExp(`^${location.origin}`),"");function w(e,t){let s=new URL(e);for(let e of t)s.searchParams.delete(e);return s.href}async function m(e,t,s,a){let i=w(t.url,s);if(t.url===i)return e.match(t,a);let r=Object.assign(Object.assign({},a),{ignoreSearch:!0});for(let n of(await e.keys(t,r)))if(i===w(n.url,s))return e.match(n,a)}class R{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}let C=new Set;async function v(){for(let e of C)await e()}function b(e){return"string"==typeof e?new Request(e):e}s(873);class U{constructor(e,t){for(let s of(this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new R,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map,this._plugins))this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,s=b(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){let e=await t.preloadResponse;if(e)return e}let a=this.hasCallback("fetchDidFail")?s.clone():null;try{for(let e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(e){if(e instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}let i=s.clone();try{let e;for(let a of(e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions),this.iterateCallbacks("fetchDidSucceed")))e=await a({event:t,request:i,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:a.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){let t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){let t;let s=b(e),{cacheName:a,matchOptions:i}=this._strategy,r=await this.getCacheKey(s,"read"),n=Object.assign(Object.assign({},i),{cacheName:a});for(let e of(t=await caches.match(r,n),this.iterateCallbacks("cachedResponseWillBeUsed")))t=await e({cacheName:a,matchOptions:i,cachedResponse:t,request:r,event:this.event})||void 0;return t}async cachePut(e,t){let s=b(e);await new Promise(e=>setTimeout(e,0));let a=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:y(a.url)});let i=await this._ensureResponseSafeToCache(t);if(!i)return!1;let{cacheName:r,matchOptions:n}=this._strategy,o=await self.caches.open(r),c=this.hasCallback("cacheDidUpdate"),h=c?await m(o,a.clone(),["__WB_REVISION__"],n):null;try{await o.put(a,c?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await v(),e}for(let e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:r,oldResponse:h,newResponse:i.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){let s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(let e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=b(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if("function"==typeof t[e]){let s=this._pluginStateMap.get(t),a=a=>{let i=Object.assign(Object.assign({},a),{state:s});return t[e](i)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(let e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return!s&&t&&200!==t.status&&(t=void 0),t}}class L{constructor(e={}){this.cacheName=u(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a=new U(this,{event:t,request:s,params:"params"in e?e.params:void 0}),i=this._getResponse(a,s,t),r=this._awaitComplete(i,a,s,t);return[i,r]}async _getResponse(e,t,s){let a;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(!(a=await this._handle(t,e))||"error"===a.type)throw new l("no-response",{url:t.url})}catch(i){if(i instanceof Error){for(let r of e.iterateCallbacks("handlerDidError"))if(a=await r({error:i,event:s,request:t}))break}if(a);else throw i}for(let i of e.iterateCallbacks("handlerWillRespond"))a=await i({event:s,request:t,response:a});return a}async _awaitComplete(e,t,s,a){let i,r;try{i=await e}catch(e){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:i}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:i,error:r}),t.destroy(),r)throw r}}class k extends L{constructor(e={}){e.cacheName=h(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(k.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;let a=t.params||{};if(this._fallbackToNetwork){let i=a.integrity,r=e.integrity,n=!r||r===i;s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||i:void 0})),i&&n&&"no-cors"!==e.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();let s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new l("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(let[s,a]of this.plugins.entries())a!==k.copyRedirectedCacheableResponsesPlugin&&(a===k.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(k.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}k.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},k.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await g(e):e};class T{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new k({cacheName:h(e),plugins:[...t,new p({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){let t=[];for(let s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);let{cacheKey:e,url:a}=function(e){if(!e)throw new l("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){let t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}let{revision:t,url:s}=e;if(!s)throw new l("add-to-cache-list-unexpected-type",{entry:e});if(!t){let e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}let a=new URL(s,location.href),i=new URL(s,location.href);return a.searchParams.set("__WB_REVISION__",t),{cacheKey:a.href,url:i.href}}(s),i="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,s.integrity)}this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,i),t.length>0&&console.warn(`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`)}}install(e){return f(e,async()=>{let t=new d;for(let[s,a]of(this.strategy.plugins.push(t),this._urlsToCacheKeys)){let t=this._cacheKeysToIntegrities.get(a),i=this._urlsToCacheModes.get(s),r=new Request(s,{integrity:t,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:r,event:e}))}let{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}})}activate(e){return f(e,async()=>{let e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(let i of t)s.has(i.url)||(await e.delete(i),a.push(i.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){let t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){let t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){let t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let K=()=>(i||(i=new T),i);s(80);let x=e=>e&&"object"==typeof e?e:{handle:e};class q{constructor(e,t,s="GET"){this.handler=x(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=x(e)}}class P extends q{constructor(e,t,s){super(({url:t})=>{let s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class E{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){let{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(t=>{"string"==typeof t&&(t=[t]);let s=new Request(...t);return this.handleRequest({request:s,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let s;let a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return;let i=a.origin===location.origin,{params:r,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:i,url:a}),l=n&&n.handler,o=e.method;if(!l&&this._defaultHandlerMap.has(o)&&(l=this._defaultHandlerMap.get(o)),!l)return;try{s=l.handle({url:a,request:e,event:t,params:r})}catch(e){s=Promise.reject(e)}let c=n&&n.catchHandler;return s instanceof Promise&&(this._catchHandler||c)&&(s=s.catch(async s=>{if(c)try{return await c.handle({url:a,request:e,event:t,params:r})}catch(e){e instanceof Error&&(s=e)}if(this._catchHandler)return this._catchHandler.handle({url:a,request:e,event:t});throw s})),s}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){for(let i of this._routes.get(s.method)||[]){let r;let n=i.match({url:e,sameOrigin:t,request:s,event:a});if(n)return Array.isArray(r=n)&&0===r.length?r=void 0:n.constructor===Object&&0===Object.keys(n).length?r=void 0:"boolean"==typeof n&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,x(e))}setCatchHandler(e){this._catchHandler=x(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let N=()=>(r||((r=new E).addFetchListener(),r.addCacheListener()),r);class M extends q{constructor(e,t){super(({request:s})=>{let a=e.getURLsToCacheKeys();for(let i of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:i}={}){let r=new URL(e,location.href);r.hash="",yield r.href;let n=function(e,t=[]){for(let s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield n.href,s&&n.pathname.endsWith("/")){let e=new URL(n.href);e.pathname+=s,yield e.href}if(a){let e=new URL(n.href);e.pathname+=".html",yield e.href}if(i)for(let e of i({url:r}))yield e.href}(s.url,t)){let t=a.get(i);if(t){let s=e.getIntegrityForCacheKey(t);return{cacheKey:t,integrity:s}}}},e.strategy)}}e=[{'revision':'4e615fb1b1a9a88033f9de58313af6df','url':'/_next/app-build-manifest.json'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/1125-e3a68362434e5f74.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/17a9af85-c6b707700b471008.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/1dd3208c-3d23dee45fd0f418.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/286-6867b8ed12507e6f.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/35-2befec98d2ddc460.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/3567-8a725fb61b3258ec.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/483ecf8a-f02713de5a381661.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/5241-a13a85ce37e6c66d.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/5658-da40cfe98dd45eae.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/5e141d3c-53bae19e0c523e46.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/6535-dd47d0787d94af2a.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/6652-5a9f5a23bdc66b82.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/70a6a88c-0cd0f515a922553b.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/734-3545e9f13ee4d77b.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/7659-c0760110c1c1b13c.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/7717-f42d5545d2c9c23d.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/7720-81e979802415c133.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/781-cdf6db8dcc644ea0.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/78dcd220-46e63510fb29b988.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/7de6e931-7846ee6e3fc116a6.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/90bde008-02358f64d2111347.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/933cdb49-2c5b937e38c024df.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/9366-6dfe430f9aea3e44.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/9580-ee88296a90df3ffe.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/a9f06191-ecd2388bac93bb81.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/%5Bid%5D/message/page-ad7d65df554e3187.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/%5Bid%5D/page-5fd40e5aed8e8576.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/(cv-rating)/basic/page-16d87d544dad582d.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/(cv-rating)/certificates/page-7c0a664234e39a23.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/(cv-rating)/educ/page-4c44dccee312ee0f.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/(cv-rating)/exp/page-d057c471b98632dd.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/(cv-rating)/portfilio/page-0ee4c19bf65dac22.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/(cv-rating)/refenrences/page-90385231b2429041.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/(cv-rating)/self/page-27aeea1a1586c2af.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/%5Bname%5D/(cv-rating)/skills/page-0c571f6208065ae4.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/(auth)/login/page-2851875deb27619b.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/(auth)/register/page-f7ddcd35a53b6077.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/(auth)/verify/page-a9d49cd14a009661.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/(cv-page)/cv-rating/page-b506e9595cf2e25c.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/_not-found/page-5c7e1f3a84f2d7d6.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/applied/page-01f029ba7cfb2865.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/chat/page-dfc9ef3ad3d65085.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/cv/page-6baded00f23dd5ab.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/favorite/page-4d6dc7af88a22ca0.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/layout-2a4ef3758daff734.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/notification/page-8fe42f3b2703b033.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/page-a790a0871429d462.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/preview/page-9c56c2150907394e.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/profile/page-d3640f2b00e96381.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/resume/page-a4081a4752bd95de.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/app/search/page-a8acfc261b312c0f.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/b091cbf2-962f4d3543febfaf.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/b6ff252e-21f76733344ead08.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/d24f3a7f-f6ee5f561fe4d70d.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/dccfb526-f25063fa7952f580.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/df7857ae-bf49bfd2c4ae2fe8.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/framework-648e1ae7da590300.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/main-62a795c0bbb5ca87.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/main-app-f533fbde20117597.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/pages/_app-5cae9f4e3da1ca65.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/pages/_error-2fa67138f23652db.js'},{'revision':'79330112775102f91e1010318bae2bd3','url':'/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js'},{'revision':'q95krBrC3Tma7lt_azduI','url':'/_next/static/chunks/webpack-5dbd0e127b5ad608.js'},{'revision':'4ac4620fbffc7351','url':'/_next/static/css/4ac4620fbffc7351.css'},{'revision':'c298df7a731ebd3e','url':'/_next/static/css/c298df7a731ebd3e.css'},{'revision':'befd9c0fdfa3d8a645d5f95717ed6420','url':'/_next/static/media/26a46d62cd723877-s.woff2'},{'revision':'43828e14271c77b87e3ed582dbff9f74','url':'/_next/static/media/55c55f0601d81cf3-s.woff2'},{'revision':'f0b86e7c24f455280b8df606b89af891','url':'/_next/static/media/581909926a08bbc8-s.woff2'},{'revision':'621a07228c8ccbfd647918f1021b4868','url':'/_next/static/media/6d93bde91c0c2823-s.woff2'},{'revision':'e360c61c5bd8d90639fd4503c829c2dc','url':'/_next/static/media/97e0cb1ae144a2a9-s.woff2'},{'revision':'dad8698181b94741ef33ec4139fb4200','url':'/_next/static/media/Croods User Interface.c6491e40.png'},{'revision':'c78c02d40379bd6ca5678b41709d5d89','url':'/_next/static/media/Sabailogo.604be015.gif'},{'revision':'56ab1c22','url':'/_next/static/media/Skyscrapers5.56ab1c22.jpeg'},{'revision':'d4fe31e6a2aebc06b8d6e558c9141119','url':'/_next/static/media/a34f9d1faa5f3315-s.p.woff2'},{'revision':'aa98ed2a2393f85f8b0e92a7c0520f72','url':'/_next/static/media/cambodia.6d2e33b1.png'},{'revision':'5511364b83422438751cf8110befea76','url':'/_next/static/media/coming soon.0ee280b1.webp'},{'revision':'d54db44de5ccb18886ece2fda72bdfe0','url':'/_next/static/media/df0a9ae256c0569c-s.woff2'},{'revision':'0dc094165fbe1ade03a8c6d54db9fd67','url':'/_next/static/media/english.3d8b0271.png'},{'revision':'b6d67355523de1de2d64a1355357674c','url':'/_next/static/media/not-found.56d64495.png'},{'revision':'1de5fa3e081a679892be37ea3de6113c','url':'/_next/static/q95krBrC3Tma7lt_azduI/_buildManifest.js'},{'revision':'b6652df95db52feb4daf4eca35380933','url':'/_next/static/q95krBrC3Tma7lt_azduI/_ssgManifest.js'},{'revision':'aa98ed2a2393f85f8b0e92a7c0520f72','url':'/icon-social/language_/cambodia.png'},{'revision':'0dc094165fbe1ade03a8c6d54db9fd67','url':'/icon-social/language_/english.png'},{'revision':'006ccb28d8d8789f7a20226e9016b2c1','url':'/icons/apple-touch-icon.png'},{'revision':'07091e838df26a427804f9da3e59dab7','url':'/icons/camformant-128.png'},{'revision':'09c7102da5c48df64c1e1dd8ffa9b268','url':'/icons/camformant-144.png'},{'revision':'d87686b656c23e2aac3f266197580186','url':'/icons/camformant-152.png'},{'revision':'9c9667dfe9e233f07c778ff02a603c99','url':'/icons/camformant-16.png'},{'revision':'6d5150071648f4cd0190b4723f0cb54e','url':'/icons/camformant-180.png'},{'revision':'5f08213e5037886ebb4c59f924310479','url':'/icons/camformant-192.png'},{'revision':'f9a3a7578eb1b6d725cf7d9e3821a31a','url':'/icons/camformant-256.png'},{'revision':'0c3a8c119e983b37c4e6a391169c3b8b','url':'/icons/camformant-48.png'},{'revision':'5a9b38a0386d7bec8075be9234971e75','url':'/icons/camformant-512.png'},{'revision':'b9787e737761c14e9ca85c33959f919e','url':'/icons/camformant-64.png'},{'revision':'c4d3efe49ae22461bdff3f0000efb702','url':'/icons/camformant-72.png'},{'revision':'b5a0b2c8f61595eb9c5e3ecfe6c31060','url':'/icons/camformant-96.png'},{'revision':'84a452b7a702960ab9ca9aaa29360256','url':'/images/7.png'},{'revision':'0cd06f311910b37704609bf19b527518','url':'/images/Croods The Feedback.png'},{'revision':'dad8698181b94741ef33ec4139fb4200','url':'/images/Croods User Interface.png'},{'revision':'8020f011951ce6234d8cfe9399a07f31','url':'/images/G1.png'},{'revision':'6e946e724d6780e6dea8c2fc19d0ebd0','url':'/images/G2.png'},{'revision':'ac1265fde750801863389ce98ee0aae4','url':'/images/G3.png'},{'revision':'c78c02d40379bd6ca5678b41709d5d89','url':'/images/Sabailogo.gif'},{'revision':'fc147ad5b0154cac824c2c195472b474','url':'/images/Skyscrapers5.jpeg'},{'revision':'4f658b9a7d067de5238644b78d8d09cc','url':'/images/apple-logo.png'},{'revision':'6cd734834e72294ec95ef48bcbd73028','url':'/images/bloodbros-search.gif'},{'revision':'5511364b83422438751cf8110befea76','url':'/images/coming soon.webp'},{'revision':'8c89ef8ab45d47ae9a954822532889f7','url':'/images/facebook.png'},{'revision':'8128b1340330b4f2a043ff7552384745','url':'/images/foodpanda.png'},{'revision':'662c02a0211cf2c6443b042c5e2bceff','url':'/images/heart animation.gif'},{'revision':'c9672e7b29b71192eaf8f12ed2edf52c','url':'/images/logo.png'},{'revision':'13aea7333ef77ac72179e59c0ab99eec','url':'/images/logo1.jpg'},{'revision':'b6d67355523de1de2d64a1355357674c','url':'/images/not-found.png'},{'revision':'e9612850a6cb55eb547266043e1eef86','url':'/images/search.png'},{'revision':'a1185d04359f36270c3cd16e2a5d6bdd','url':'/images/tips1.png'},{'revision':'54e5c61640c2d34a7a05c30283c48814','url':'/images/tips2.png'},{'revision':'ae697243e0c63ca1d6e479096899e66e','url':'/images/tips3.png'},{'revision':'15d092bd05c3b0263b83218c3d10ccb8','url':'/images/total.png'},{'revision':'b989cae1de807400c9ddc9ea7a9a8c71','url':'/images/wing.png'},{'revision':'5ee74499ff3fcf5e732ce6a12cf55bdc','url':'/iphone-sms-tone-original-mp4-5732.mp3'},{'revision':'86e0f6e99b7102ad42428e82c52da487','url':'/manifest.json'},{'revision':'8e061864f388b47f33a1c3780831193e','url':'/next.svg'},{'revision':'d462e2fc1280013cb48d7741ea626eab','url':'/sw.js'},{'revision':'61c6b19abff40ea7acd577be818f3976','url':'/vercel.svg'}],K().precache(e),t=void 0,function(e,t,s){let a;if("string"==typeof e){let t=new URL(e,location.href);a=new q(({url:e})=>e.href===t.href,void 0,void 0)}else if(e instanceof RegExp)a=new P(e,void 0,void 0);else if("function"==typeof e)a=new q(e,void 0,void 0);else if(e instanceof q)a=e;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});N().registerRoute(a)}(new M(K(),t)),self.addEventListener("push",e=>{if(e.data){var t;let s=e.data.json(),a=s.title,i=s.body,r=(null===(t=s.data)||void 0===t?void 0:t.url)||"/",n={body:i,tag:"notification-".concat(Date.now()),icon:"./next.svg",data:{url:r}};e.waitUntil(self.registration.showNotification(a,n))}}),self.addEventListener("notificationclick",function(e){e.notification.close();let t=e.notification.data,s=(null==t?void 0:t.url)||"/";e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:!0}).then(e=>{let t=e.find(e=>e.url.startsWith(self.location.origin)&&"focus"in e);return t?(t.focus(),t.navigate(s)):clients.openWindow(s)}))})}()}();