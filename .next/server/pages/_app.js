(()=>{var e={};e.id=888,e.ids=[888],e.modules={1940:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var i=r(997);r(6764);var s=r(6689),n=r(4298),u=r.n(n),d=r(1163);let o=function({Component:e,pageProps:t}){let r=(0,d.useRouter)();return(0,s.useEffect)(()=>{},[]),(0,i.jsxs)(i.Fragment,{children:["/"===r.pathname&&i.jsx(u(),{src:"https://identity.netlify.com/v1/netlify-identity-widget.js",strategy:"lazyOnload"}),"/"===r.pathname&&i.jsx(u(),{id:"netlify-identity-redirect",strategy:"afterInteractive",children:`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}),i.jsx(e,{...t})]})}},6764:()=>{},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},6405:e=>{"use strict";e.exports=require("react-dom")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},7147:e=>{"use strict";e.exports=require("fs")},2781:e=>{"use strict";e.exports=require("stream")},9796:e=>{"use strict";e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[491,859],()=>r(1940));module.exports=i})();