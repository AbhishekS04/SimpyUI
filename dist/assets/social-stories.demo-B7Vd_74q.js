import{r as a,j as e,m as A,k as F,b as T}from"./index-BW0aMnOn.js";/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=(...s)=>s.filter((r,c,n)=>!!r&&r.trim()!==""&&n.indexOf(r)===c).join(" ").trim();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,c,n)=>n?n.toUpperCase():c.toLowerCase());/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=s=>{const r=X(s);return r.charAt(0).toUpperCase()+r.slice(1)};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var B={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=s=>{for(const r in s)if(r.startsWith("aria-")||r==="role"||r==="title")return!0;return!1};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=a.forwardRef(({color:s="currentColor",size:r=24,strokeWidth:c=2,absoluteStrokeWidth:n,className:d="",children:o,iconNode:v,...u},x)=>a.createElement("svg",{ref:x,...B,width:r,height:r,stroke:s,strokeWidth:n?Number(c)*24/Number(r):c,className:E("lucide",d),...!o&&!D(u)&&{"aria-hidden":"true"},...u},[...v.map(([p,w])=>a.createElement(p,w)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=(s,r)=>{const c=a.forwardRef(({className:n,...d},o)=>a.createElement(O,{ref:o,iconNode:r,className:E(`lucide-${$(z(s))}`,`lucide-${s}`,n),...d}));return c.displayName=z(s),c};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],W=R("arrow-up-right",V);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],H=R("loader-circle",Z);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],G=R("x",K),J=s=>/\.(mp4|webm|ogg)$/i.test(s)||s.includes("/video/");function Q({stories:s=[],profile:r,defaultDuration:c=5}){const[n,d]=a.useState(!1),[o,v]=a.useState(0),[u,x]=a.useState(!1),[p,w]=a.useState(!1),[P,_]=a.useState(!1),N=a.useRef(null),m=a.useRef(null),b=a.useRef(null),g=a.useRef(null),j=a.useRef(null),q=a.useRef(0),i=s[o],h=J((i==null?void 0:i.mediaUrl)??""),U=((i==null?void 0:i.duration)??c)*1e3;a.useEffect(()=>{_(!0)},[]);const C=t=>{q.current=Math.max(0,Math.min(1,t)),N.current&&(N.current.style.transform=`scaleX(${q.current})`)},f=()=>{m.current!==null&&(cancelAnimationFrame(m.current),m.current=null)},k=a.useCallback((t=!0)=>{b.current=null,g.current=null,t&&C(0),w(!1)},[]),y=a.useCallback(()=>{f(),k(),o<s.length-1?v(t=>t+1):(d(!1),v(0))},[o,s.length,k]),I=a.useCallback(()=>{o!==0&&(f(),k(),v(t=>t-1))},[o,k]);a.useEffect(()=>{if(!n||!p||h)return;const t=l=>{if(b.current||(b.current=l),!u){const S=l-b.current,M=Math.min(S/U,1);if(C(M),M>=1){f(),requestAnimationFrame(y);return}}m.current=requestAnimationFrame(t)};return f(),m.current=requestAnimationFrame(t),()=>f()},[n,u,p,U,y,h]),a.useEffect(()=>{if(!h||!n)return;const t=j.current,l=()=>{if(!t||!t.duration){m.current=requestAnimationFrame(l);return}C(t.currentTime/t.duration),m.current=requestAnimationFrame(l)};return p&&!u&&(f(),m.current=requestAnimationFrame(l)),()=>f()},[h,u,n,p]),a.useEffect(()=>{var t,l;u?(g.current===null&&(g.current=performance.now()),(t=j.current)==null||t.pause(),f()):(g.current!==null&&b.current!==null&&(b.current+=performance.now()-g.current,g.current=null),h&&((l=j.current)==null||l.play().catch(()=>{})))},[u,h]);const L=t=>{if(t.target.closest("button, a"))return;const{width:l}=t.currentTarget.getBoundingClientRect();t.nativeEvent.offsetX<l/3?I():y()};return P?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"relative w-12 h-12 sm:w-16 sm:h-16 cursor-pointer z-10",children:!n&&e.jsxs(A.div,{layoutId:"story-trigger",onClick:()=>d(!0),className:"absolute inset-0 rounded-full p-[4px]",whileHover:{scale:1.05},whileTap:{scale:.95},children:[e.jsx("div",{className:"absolute inset-0 rounded-full border-[3px] border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"}),e.jsx("div",{className:"absolute inset-[6px] rounded-full overflow-hidden bg-zinc-800 ring-2 ring-black",children:e.jsx("img",{src:r.avatarUrl,alt:r.name,className:"w-full h-full object-cover"})})]})}),F.createPortal(e.jsx(T,{children:n&&i&&e.jsxs("div",{className:"fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto",children:[e.jsx(A.div,{className:"absolute inset-0 bg-black/80 backdrop-blur-xl",onClick:()=>d(!1),initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3}}),e.jsx(A.div,{layoutId:"story-card-modal",initial:{opacity:0,scale:.9,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.9,y:20},transition:{type:"spring",stiffness:350,damping:30},className:`\r
                  relative\r
                  w-[90vw] h-auto\r
                  aspect-[9/16]\r
                  max-h-[85vh]\r
                  max-w-[420px]\r
                  bg-black\r
                  rounded-[20px] md:rounded-[30px]\r
                  overflow-hidden\r
                  shadow-2xl\r
                  border border-white/10\r
                  flex flex-col\r
                `,children:e.jsxs("div",{className:"relative w-full h-full flex-1",onMouseDown:()=>x(!0),onMouseUp:L,onMouseLeave:()=>x(!1),onTouchStart:()=>x(!0),onTouchEnd:()=>x(!1),children:[!p&&e.jsx("div",{className:"absolute inset-0 z-10 flex items-center justify-center bg-zinc-900",children:e.jsx(H,{className:"w-8 h-8 animate-spin text-white/50"})}),e.jsx("div",{className:"absolute inset-0 bg-zinc-900",children:h?e.jsx("video",{ref:j,src:i.mediaUrl,playsInline:!0,autoPlay:!0,className:"w-full h-full object-cover",onLoadedData:()=>{var t;w(!0),u||(t=j.current)==null||t.play().catch(()=>{})},onEnded:y}):e.jsx("img",{src:i.mediaUrl,alt:"Story",className:"absolute inset-0 w-full h-full object-cover",onLoad:()=>w(!0)})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none"}),e.jsx("div",{className:"absolute top-4 left-4 right-4 flex gap-1.5 z-20",children:s.map((t,l)=>e.jsx("div",{className:"h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden",children:e.jsx("div",{ref:l===o?N:null,className:"h-full bg-white origin-left",style:{transform:l<o?"scaleX(1)":"scaleX(0)"}})},l))}),e.jsxs("div",{className:"absolute top-8 left-4 right-4 flex justify-between items-center z-20",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx("div",{className:"relative w-9 h-9 rounded-full overflow-hidden border border-white/20",children:e.jsx("img",{src:r.avatarUrl,alt:r.name,className:"w-full h-full object-cover"})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-white text-sm font-semibold leading-none drop-shadow-sm",children:r.name}),e.jsx("span",{className:"text-white/70 text-[10px] uppercase tracking-wider mt-0.5",children:i.platform})]})]}),e.jsx("button",{onClick:t=>{t.stopPropagation(),d(!1)},className:"p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors",children:e.jsx(G,{className:"w-5 h-5 text-white"})})]}),e.jsxs("div",{className:"absolute bottom-6 left-5 right-5 flex items-end justify-between gap-4 z-20",children:[e.jsx("div",{className:"flex-1",children:e.jsx("p",{className:"text-white text-[15px] font-medium leading-relaxed drop-shadow-md line-clamp-2",children:i.caption})}),i.linkUrl&&e.jsx("a",{href:i.linkUrl,target:"_blank",rel:"noopener noreferrer",onClick:t=>t.stopPropagation(),className:"flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 transition-all hover:scale-105",children:e.jsx(W,{className:"w-5 h-5 text-white"})})]})]})})]})}),document.body)]}):null}function ee(){const s=a.useMemo(()=>[{id:"1",platform:"instagram",mediaUrl:"https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/d5521455-f668-481c-85a4-2ab10f49d580.mp4",linkUrl:"https://instagram.com",caption:"",duration:5},{id:"2",platform:"instagram",mediaUrl:"https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/8a98fec1-5439-4cb3-8eb2-f0d605204397.mp4",linkUrl:"https://instagram.com",caption:"",duration:7},{id:"3",platform:"instagram",mediaUrl:"https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/44fe63af-47e0-4df6-8fc3-0a984c7337da.mp4",linkUrl:"https://instagram.com",caption:"",duration:6}],[]),r=a.useMemo(()=>({name:"Abhishek Singh",avatarUrl:"https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/original/68e0efce-84a4-42ae-9bd7-a2be6aca73d8.jpg"}),[]);return e.jsx(Q,{stories:s,profile:r})}export{ee as default};
