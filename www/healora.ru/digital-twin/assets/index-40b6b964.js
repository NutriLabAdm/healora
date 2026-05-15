(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function kp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Mp={exports:{}},Ac={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ny=Symbol.for("react.transitional.element"),ay=Symbol.for("react.fragment");function Ap(e,t,n){var l=null;if(n!==void 0&&(l=""+n),t.key!==void 0&&(l=""+t.key),"key"in t){n={};for(var i in t)i!=="key"&&(n[i]=t[i])}else n=t;return t=n.ref,{$$typeof:ny,type:e,key:l,ref:t!==void 0?t:null,props:n}}Ac.Fragment=ay;Ac.jsx=Ap;Ac.jsxs=Ap;Mp.exports=Ac;var a=Mp.exports,Tp={exports:{}},J={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yd=Symbol.for("react.transitional.element"),ly=Symbol.for("react.portal"),iy=Symbol.for("react.fragment"),sy=Symbol.for("react.strict_mode"),cy=Symbol.for("react.profiler"),ry=Symbol.for("react.consumer"),oy=Symbol.for("react.context"),dy=Symbol.for("react.forward_ref"),uy=Symbol.for("react.suspense"),hy=Symbol.for("react.memo"),Rp=Symbol.for("react.lazy"),my=Symbol.for("react.activity"),Gm=Symbol.iterator;function fy(e){return e===null||typeof e!="object"?null:(e=Gm&&e[Gm]||e["@@iterator"],typeof e=="function"?e:null)}var Op={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Bp=Object.assign,zp={};function wl(e,t,n){this.props=e,this.context=t,this.refs=zp,this.updater=n||Op}wl.prototype.isReactComponent={};wl.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};wl.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Lp(){}Lp.prototype=wl.prototype;function xd(e,t,n){this.props=e,this.context=t,this.refs=zp,this.updater=n||Op}var _d=xd.prototype=new Lp;_d.constructor=xd;Bp(_d,wl.prototype);_d.isPureReactComponent=!0;var Pm=Array.isArray;function vo(){}var Ne={H:null,A:null,T:null,S:null},Hp=Object.prototype.hasOwnProperty;function bd(e,t,n){var l=n.ref;return{$$typeof:yd,type:e,key:t,ref:l!==void 0?l:null,props:n}}function py(e,t){return bd(e.type,t,e.props)}function jd(e){return typeof e=="object"&&e!==null&&e.$$typeof===yd}function gy(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var qm=/\/+/g;function Er(e,t){return typeof e=="object"&&e!==null&&e.key!=null?gy(""+e.key):t.toString(36)}function vy(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(vo,vo):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Qa(e,t,n,l,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case yd:case ly:c=!0;break;case Rp:return c=e._init,Qa(c(e._payload),t,n,l,i)}}if(c)return i=i(e),c=l===""?"."+Er(e,0):l,Pm(i)?(n="",c!=null&&(n=c.replace(qm,"$&/")+"/"),Qa(i,t,n,"",function(d){return d})):i!=null&&(jd(i)&&(i=py(i,n+(i.key==null||e&&e.key===i.key?"":(""+i.key).replace(qm,"$&/")+"/")+c)),t.push(i)),1;c=0;var o=l===""?".":l+":";if(Pm(e))for(var r=0;r<e.length;r++)l=e[r],s=o+Er(l,r),c+=Qa(l,t,n,s,i);else if(r=fy(e),typeof r=="function")for(e=r.call(e),r=0;!(l=e.next()).done;)l=l.value,s=o+Er(l,r++),c+=Qa(l,t,n,s,i);else if(s==="object"){if(typeof e.then=="function")return Qa(vy(e),t,n,l,i);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function ys(e,t,n){if(e==null)return e;var l=[],i=0;return Qa(e,l,"","",function(s){return t.call(n,s,i++)}),l}function yy(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Vm=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},xy={map:ys,forEach:function(e,t,n){ys(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ys(e,function(){t++}),t},toArray:function(e){return ys(e,function(t){return t})||[]},only:function(e){if(!jd(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};J.Activity=my;J.Children=xy;J.Component=wl;J.Fragment=iy;J.Profiler=cy;J.PureComponent=xd;J.StrictMode=sy;J.Suspense=uy;J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ne;J.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Ne.H.useMemoCache(e)}};J.cache=function(e){return function(){return e.apply(null,arguments)}};J.cacheSignal=function(){return null};J.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var l=Bp({},e.props),i=e.key;if(t!=null)for(s in t.key!==void 0&&(i=""+t.key),t)!Hp.call(t,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&t.ref===void 0||(l[s]=t[s]);var s=arguments.length-2;if(s===1)l.children=n;else if(1<s){for(var c=Array(s),o=0;o<s;o++)c[o]=arguments[o+2];l.children=c}return bd(e.type,i,l)};J.createContext=function(e){return e={$$typeof:oy,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:ry,_context:e},e};J.createElement=function(e,t,n){var l,i={},s=null;if(t!=null)for(l in t.key!==void 0&&(s=""+t.key),t)Hp.call(t,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(i[l]=t[l]);var c=arguments.length-2;if(c===1)i.children=n;else if(1<c){for(var o=Array(c),r=0;r<c;r++)o[r]=arguments[r+2];i.children=o}if(e&&e.defaultProps)for(l in c=e.defaultProps,c)i[l]===void 0&&(i[l]=c[l]);return bd(e,s,i)};J.createRef=function(){return{current:null}};J.forwardRef=function(e){return{$$typeof:dy,render:e}};J.isValidElement=jd;J.lazy=function(e){return{$$typeof:Rp,_payload:{_status:-1,_result:e},_init:yy}};J.memo=function(e,t){return{$$typeof:hy,type:e,compare:t===void 0?null:t}};J.startTransition=function(e){var t=Ne.T,n={};Ne.T=n;try{var l=e(),i=Ne.S;i!==null&&i(n,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(vo,Vm)}catch(s){Vm(s)}finally{t!==null&&n.types!==null&&(t.types=n.types),Ne.T=t}};J.unstable_useCacheRefresh=function(){return Ne.H.useCacheRefresh()};J.use=function(e){return Ne.H.use(e)};J.useActionState=function(e,t,n){return Ne.H.useActionState(e,t,n)};J.useCallback=function(e,t){return Ne.H.useCallback(e,t)};J.useContext=function(e){return Ne.H.useContext(e)};J.useDebugValue=function(){};J.useDeferredValue=function(e,t){return Ne.H.useDeferredValue(e,t)};J.useEffect=function(e,t){return Ne.H.useEffect(e,t)};J.useEffectEvent=function(e){return Ne.H.useEffectEvent(e)};J.useId=function(){return Ne.H.useId()};J.useImperativeHandle=function(e,t,n){return Ne.H.useImperativeHandle(e,t,n)};J.useInsertionEffect=function(e,t){return Ne.H.useInsertionEffect(e,t)};J.useLayoutEffect=function(e,t){return Ne.H.useLayoutEffect(e,t)};J.useMemo=function(e,t){return Ne.H.useMemo(e,t)};J.useOptimistic=function(e,t){return Ne.H.useOptimistic(e,t)};J.useReducer=function(e,t,n){return Ne.H.useReducer(e,t,n)};J.useRef=function(e){return Ne.H.useRef(e)};J.useState=function(e){return Ne.H.useState(e)};J.useSyncExternalStore=function(e,t,n){return Ne.H.useSyncExternalStore(e,t,n)};J.useTransition=function(){return Ne.H.useTransition()};J.version="19.2.5";Tp.exports=J;var y=Tp.exports;const Re=kp(y);var Up={exports:{}},Tc={},Gp={exports:{}},Pp={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(B,q){var G=B.length;B.push(q);e:for(;0<G;){var ee=G-1>>>1,T=B[ee];if(0<i(T,q))B[ee]=q,B[G]=T,G=ee;else break e}}function n(B){return B.length===0?null:B[0]}function l(B){if(B.length===0)return null;var q=B[0],G=B.pop();if(G!==q){B[0]=G;e:for(var ee=0,T=B.length,Z=T>>>1;ee<Z;){var Fe=2*(ee+1)-1,Pe=B[Fe],He=Fe+1,Wt=B[He];if(0>i(Pe,G))He<T&&0>i(Wt,Pe)?(B[ee]=Wt,B[He]=G,ee=He):(B[ee]=Pe,B[Fe]=G,ee=Fe);else if(He<T&&0>i(Wt,G))B[ee]=Wt,B[He]=G,ee=He;else break e}}return q}function i(B,q){var G=B.sortIndex-q.sortIndex;return G!==0?G:B.id-q.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var c=Date,o=c.now();e.unstable_now=function(){return c.now()-o}}var r=[],d=[],h=1,p=null,f=3,x=!1,C=!1,k=!1,M=!1,v=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;function w(B){for(var q=n(d);q!==null;){if(q.callback===null)l(d);else if(q.startTime<=B)l(d),q.sortIndex=q.expirationTime,t(r,q);else break;q=n(d)}}function O(B){if(k=!1,w(B),!C)if(n(r)!==null)C=!0,L||(L=!0,_e());else{var q=n(d);q!==null&&H(O,q.startTime-B)}}var L=!1,z=-1,P=5,Y=-1;function Q(){return M?!0:!(e.unstable_now()-Y<P)}function I(){if(M=!1,L){var B=e.unstable_now();Y=B;var q=!0;try{e:{C=!1,k&&(k=!1,m(z),z=-1),x=!0;var G=f;try{t:{for(w(B),p=n(r);p!==null&&!(p.expirationTime>B&&Q());){var ee=p.callback;if(typeof ee=="function"){p.callback=null,f=p.priorityLevel;var T=ee(p.expirationTime<=B);if(B=e.unstable_now(),typeof T=="function"){p.callback=T,w(B),q=!0;break t}p===n(r)&&l(r),w(B)}else l(r);p=n(r)}if(p!==null)q=!0;else{var Z=n(d);Z!==null&&H(O,Z.startTime-B),q=!1}}break e}finally{p=null,f=G,x=!1}q=void 0}}finally{q?_e():L=!1}}}var _e;if(typeof _=="function")_e=function(){_(I)};else if(typeof MessageChannel<"u"){var Qe=new MessageChannel,Te=Qe.port2;Qe.port1.onmessage=I,_e=function(){Te.postMessage(null)}}else _e=function(){v(I,0)};function H(B,q){z=v(function(){B(e.unstable_now())},q)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(B){B.callback=null},e.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<B?Math.floor(1e3/B):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(B){switch(f){case 1:case 2:case 3:var q=3;break;default:q=f}var G=f;f=q;try{return B()}finally{f=G}},e.unstable_requestPaint=function(){M=!0},e.unstable_runWithPriority=function(B,q){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var G=f;f=B;try{return q()}finally{f=G}},e.unstable_scheduleCallback=function(B,q,G){var ee=e.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?ee+G:ee):G=ee,B){case 1:var T=-1;break;case 2:T=250;break;case 5:T=1073741823;break;case 4:T=1e4;break;default:T=5e3}return T=G+T,B={id:h++,callback:q,priorityLevel:B,startTime:G,expirationTime:T,sortIndex:-1},G>ee?(B.sortIndex=G,t(d,B),n(r)===null&&B===n(d)&&(k?(m(z),z=-1):k=!0,H(O,G-ee))):(B.sortIndex=T,t(r,B),C||x||(C=!0,L||(L=!0,_e()))),B},e.unstable_shouldYield=Q,e.unstable_wrapCallback=function(B){var q=f;return function(){var G=f;f=q;try{return B.apply(this,arguments)}finally{f=G}}}})(Pp);Gp.exports=Pp;var _y=Gp.exports,qp={exports:{}},nt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var by=y;function Vp(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Tn(){}var tt={d:{f:Tn,r:function(){throw Error(Vp(522))},D:Tn,C:Tn,L:Tn,m:Tn,X:Tn,S:Tn,M:Tn},p:0,findDOMNode:null},jy=Symbol.for("react.portal");function Ny(e,t,n){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:jy,key:l==null?null:""+l,children:e,containerInfo:t,implementation:n}}var ci=by.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Rc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}nt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=tt;nt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Vp(299));return Ny(e,t,null,n)};nt.flushSync=function(e){var t=ci.T,n=tt.p;try{if(ci.T=null,tt.p=2,e)return e()}finally{ci.T=t,tt.p=n,tt.d.f()}};nt.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,tt.d.C(e,t))};nt.prefetchDNS=function(e){typeof e=="string"&&tt.d.D(e)};nt.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,l=Rc(n,t.crossOrigin),i=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?tt.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:l,integrity:i,fetchPriority:s}):n==="script"&&tt.d.X(e,{crossOrigin:l,integrity:i,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};nt.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Rc(t.as,t.crossOrigin);tt.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&tt.d.M(e)};nt.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,l=Rc(n,t.crossOrigin);tt.d.L(e,n,{crossOrigin:l,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};nt.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Rc(t.as,t.crossOrigin);tt.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else tt.d.m(e)};nt.requestFormReset=function(e){tt.d.r(e)};nt.unstable_batchedUpdates=function(e,t){return e(t)};nt.useFormState=function(e,t,n){return ci.H.useFormState(e,t,n)};nt.useFormStatus=function(){return ci.H.useHostTransitionStatus()};nt.version="19.2.5";function Yp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Yp)}catch(e){console.error(e)}}Yp(),qp.exports=nt;var Sy=qp.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ge=_y,Qp=y,wy=Sy;function R(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Xp(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function zi(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Kp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function $p(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ym(e){if(zi(e)!==e)throw Error(R(188))}function Cy(e){var t=e.alternate;if(!t){if(t=zi(e),t===null)throw Error(R(188));return t!==e?null:e}for(var n=e,l=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(l=i.return,l!==null){n=l;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Ym(i),e;if(s===l)return Ym(i),t;s=s.sibling}throw Error(R(188))}if(n.return!==l.return)n=i,l=s;else{for(var c=!1,o=i.child;o;){if(o===n){c=!0,n=i,l=s;break}if(o===l){c=!0,l=i,n=s;break}o=o.sibling}if(!c){for(o=s.child;o;){if(o===n){c=!0,n=s,l=i;break}if(o===l){c=!0,l=s,n=i;break}o=o.sibling}if(!c)throw Error(R(189))}}if(n.alternate!==l)throw Error(R(190))}if(n.tag!==3)throw Error(R(188));return n.stateNode.current===n?e:t}function Zp(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Zp(e),t!==null)return t;e=e.sibling}return null}var Se=Object.assign,Ey=Symbol.for("react.element"),xs=Symbol.for("react.transitional.element"),ni=Symbol.for("react.portal"),$a=Symbol.for("react.fragment"),Jp=Symbol.for("react.strict_mode"),yo=Symbol.for("react.profiler"),Fp=Symbol.for("react.consumer"),mn=Symbol.for("react.context"),Nd=Symbol.for("react.forward_ref"),xo=Symbol.for("react.suspense"),_o=Symbol.for("react.suspense_list"),Sd=Symbol.for("react.memo"),Rn=Symbol.for("react.lazy"),bo=Symbol.for("react.activity"),Dy=Symbol.for("react.memo_cache_sentinel"),Qm=Symbol.iterator;function $l(e){return e===null||typeof e!="object"?null:(e=Qm&&e[Qm]||e["@@iterator"],typeof e=="function"?e:null)}var ky=Symbol.for("react.client.reference");function jo(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ky?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case $a:return"Fragment";case yo:return"Profiler";case Jp:return"StrictMode";case xo:return"Suspense";case _o:return"SuspenseList";case bo:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case ni:return"Portal";case mn:return e.displayName||"Context";case Fp:return(e._context.displayName||"Context")+".Consumer";case Nd:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Sd:return t=e.displayName||null,t!==null?t:jo(e.type)||"Memo";case Rn:t=e._payload,e=e._init;try{return jo(e(t))}catch{}}return null}var ai=Array.isArray,X=Qp.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,he=wy.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,pa={pending:!1,data:null,method:null,action:null},No=[],Za=-1;function Zt(e){return{current:e}}function Ye(e){0>Za||(e.current=No[Za],No[Za]=null,Za--)}function xe(e,t){Za++,No[Za]=e.current,e.current=t}var $t=Zt(null),bi=Zt(null),Yn=Zt(null),Is=Zt(null);function ec(e,t){switch(xe(Yn,t),xe(bi,e),xe($t,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Wf(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Wf(t),e=vg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Ye($t),xe($t,e)}function fl(){Ye($t),Ye(bi),Ye(Yn)}function So(e){e.memoizedState!==null&&xe(Is,e);var t=$t.current,n=vg(t,e.type);t!==n&&(xe(bi,e),xe($t,n))}function tc(e){bi.current===e&&(Ye($t),Ye(bi)),Is.current===e&&(Ye(Is),Ti._currentValue=pa)}var Dr,Xm;function ua(e){if(Dr===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Dr=t&&t[1]||"",Xm=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Dr+e+Xm}var kr=!1;function Mr(e,t){if(!e||kr)return"";kr=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(x){var f=x}Reflect.construct(e,[],p)}else{try{p.call()}catch(x){f=x}e.call(p.prototype)}}else{try{throw Error()}catch(x){f=x}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(x){if(x&&f&&typeof x.stack=="string")return[x.stack,f.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=l.DetermineComponentFrameRoot(),c=s[0],o=s[1];if(c&&o){var r=c.split(`
`),d=o.split(`
`);for(i=l=0;l<r.length&&!r[l].includes("DetermineComponentFrameRoot");)l++;for(;i<d.length&&!d[i].includes("DetermineComponentFrameRoot");)i++;if(l===r.length||i===d.length)for(l=r.length-1,i=d.length-1;1<=l&&0<=i&&r[l]!==d[i];)i--;for(;1<=l&&0<=i;l--,i--)if(r[l]!==d[i]){if(l!==1||i!==1)do if(l--,i--,0>i||r[l]!==d[i]){var h=`
`+r[l].replace(" at new "," at ");return e.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",e.displayName)),h}while(1<=l&&0<=i);break}}}finally{kr=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?ua(n):""}function My(e,t){switch(e.tag){case 26:case 27:case 5:return ua(e.type);case 16:return ua("Lazy");case 13:return e.child!==t&&t!==null?ua("Suspense Fallback"):ua("Suspense");case 19:return ua("SuspenseList");case 0:case 15:return Mr(e.type,!1);case 11:return Mr(e.type.render,!1);case 1:return Mr(e.type,!0);case 31:return ua("Activity");default:return""}}function Km(e){try{var t="",n=null;do t+=My(e,n),n=e,e=e.return;while(e);return t}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var wo=Object.prototype.hasOwnProperty,wd=Ge.unstable_scheduleCallback,Ar=Ge.unstable_cancelCallback,Ay=Ge.unstable_shouldYield,Ty=Ge.unstable_requestPaint,gt=Ge.unstable_now,Ry=Ge.unstable_getCurrentPriorityLevel,Wp=Ge.unstable_ImmediatePriority,Ip=Ge.unstable_UserBlockingPriority,nc=Ge.unstable_NormalPriority,Oy=Ge.unstable_LowPriority,e0=Ge.unstable_IdlePriority,By=Ge.log,zy=Ge.unstable_setDisableYieldValue,Li=null,vt=null;function Un(e){if(typeof By=="function"&&zy(e),vt&&typeof vt.setStrictMode=="function")try{vt.setStrictMode(Li,e)}catch{}}var yt=Math.clz32?Math.clz32:Uy,Ly=Math.log,Hy=Math.LN2;function Uy(e){return e>>>=0,e===0?32:31-(Ly(e)/Hy|0)|0}var _s=256,bs=262144,js=4194304;function ha(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Oc(e,t,n){var l=e.pendingLanes;if(l===0)return 0;var i=0,s=e.suspendedLanes,c=e.pingedLanes;e=e.warmLanes;var o=l&134217727;return o!==0?(l=o&~s,l!==0?i=ha(l):(c&=o,c!==0?i=ha(c):n||(n=o&~e,n!==0&&(i=ha(n))))):(o=l&~s,o!==0?i=ha(o):c!==0?i=ha(c):n||(n=l&~e,n!==0&&(i=ha(n)))),i===0?0:t!==0&&t!==i&&!(t&s)&&(s=i&-i,n=t&-t,s>=n||s===32&&(n&4194048)!==0)?t:i}function Hi(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Gy(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function t0(){var e=js;return js<<=1,!(js&62914560)&&(js=4194304),e}function Tr(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ui(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Py(e,t,n,l,i,s){var c=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,r=e.expirationTimes,d=e.hiddenUpdates;for(n=c&~n;0<n;){var h=31-yt(n),p=1<<h;o[h]=0,r[h]=-1;var f=d[h];if(f!==null)for(d[h]=null,h=0;h<f.length;h++){var x=f[h];x!==null&&(x.lane&=-536870913)}n&=~p}l!==0&&n0(e,l,0),s!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=s&~(c&~t))}function n0(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-yt(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|n&261930}function a0(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var l=31-yt(n),i=1<<l;i&t|e[l]&t&&(e[l]|=t),n&=~i}}function l0(e,t){var n=t&-t;return n=n&42?1:Cd(n),n&(e.suspendedLanes|t)?0:n}function Cd(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ed(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function i0(){var e=he.p;return e!==0?e:(e=window.event,e===void 0?32:Dg(e.type))}function $m(e,t){var n=he.p;try{return he.p=e,t()}finally{he.p=n}}var aa=Math.random().toString(36).slice(2),Ke="__reactFiber$"+aa,rt="__reactProps$"+aa,Cl="__reactContainer$"+aa,Co="__reactEvents$"+aa,qy="__reactListeners$"+aa,Vy="__reactHandles$"+aa,Zm="__reactResources$"+aa,Gi="__reactMarker$"+aa;function Dd(e){delete e[Ke],delete e[rt],delete e[Co],delete e[qy],delete e[Vy]}function Ja(e){var t=e[Ke];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Cl]||n[Ke]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ap(e);e!==null;){if(n=e[Ke])return n;e=ap(e)}return t}e=n,n=e.parentNode}return null}function El(e){if(e=e[Ke]||e[Cl]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function li(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(R(33))}function cl(e){var t=e[Zm];return t||(t=e[Zm]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ve(e){e[Gi]=!0}var s0=new Set,c0={};function Ca(e,t){pl(e,t),pl(e+"Capture",t)}function pl(e,t){for(c0[e]=t,e=0;e<t.length;e++)s0.add(t[e])}var Yy=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Jm={},Fm={};function Qy(e){return wo.call(Fm,e)?!0:wo.call(Jm,e)?!1:Yy.test(e)?Fm[e]=!0:(Jm[e]=!0,!1)}function zs(e,t,n){if(Qy(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Ns(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function ln(e,t,n,l){if(l===null)e.removeAttribute(n);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+l)}}function wt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function r0(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Xy(e,t,n){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var i=l.get,s=l.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(c){n=""+c,s.call(this,c)}}),Object.defineProperty(e,t,{enumerable:l.enumerable}),{getValue:function(){return n},setValue:function(c){n=""+c},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Eo(e){if(!e._valueTracker){var t=r0(e)?"checked":"value";e._valueTracker=Xy(e,t,""+e[t])}}function o0(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),l="";return e&&(l=r0(e)?e.checked?"true":"false":e.value),e=l,e!==n?(t.setValue(e),!0):!1}function ac(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ky=/[\n"\\]/g;function Dt(e){return e.replace(Ky,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Do(e,t,n,l,i,s,c,o){e.name="",c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?e.type=c:e.removeAttribute("type"),t!=null?c==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+wt(t)):e.value!==""+wt(t)&&(e.value=""+wt(t)):c!=="submit"&&c!=="reset"||e.removeAttribute("value"),t!=null?ko(e,c,wt(t)):n!=null?ko(e,c,wt(n)):l!=null&&e.removeAttribute("value"),i==null&&s!=null&&(e.defaultChecked=!!s),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+wt(o):e.removeAttribute("name")}function d0(e,t,n,l,i,s,c,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){Eo(e);return}n=n!=null?""+wt(n):"",t=t!=null?""+wt(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}l=l??i,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=o?e.checked:!!l,e.defaultChecked=!!l,c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(e.name=c),Eo(e)}function ko(e,t,n){t==="number"&&ac(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function rl(e,t,n,l){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&l&&(e[n].defaultSelected=!0)}else{for(n=""+wt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,l&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function u0(e,t,n){if(t!=null&&(t=""+wt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+wt(n):""}function h0(e,t,n,l){if(t==null){if(l!=null){if(n!=null)throw Error(R(92));if(ai(l)){if(1<l.length)throw Error(R(93));l=l[0]}n=l}n==null&&(n=""),t=n}n=wt(t),e.defaultValue=n,l=e.textContent,l===n&&l!==""&&l!==null&&(e.value=l),Eo(e)}function gl(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $y=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Wm(e,t,n){var l=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,n):typeof n!="number"||n===0||$y.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function m0(e,t,n){if(t!=null&&typeof t!="object")throw Error(R(62));if(e=e.style,n!=null){for(var l in n)!n.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var i in t)l=t[i],t.hasOwnProperty(i)&&n[i]!==l&&Wm(e,i,l)}else for(var s in t)t.hasOwnProperty(s)&&Wm(e,s,t[s])}function kd(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Jy=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ls(e){return Jy.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function fn(){}var Mo=null;function Md(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Fa=null,ol=null;function Im(e){var t=El(e);if(t&&(e=t.stateNode)){var n=e[rt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Do(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Dt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var l=n[t];if(l!==e&&l.form===e.form){var i=l[rt]||null;if(!i)throw Error(R(90));Do(l,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)l=n[t],l.form===e.form&&o0(l)}break e;case"textarea":u0(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&rl(e,!!n.multiple,t,!1)}}}var Rr=!1;function f0(e,t,n){if(Rr)return e(t,n);Rr=!0;try{var l=e(t);return l}finally{if(Rr=!1,(Fa!==null||ol!==null)&&(Xc(),Fa&&(t=Fa,e=ol,ol=Fa=null,Im(t),e)))for(t=0;t<e.length;t++)Im(e[t])}}function ji(e,t){var n=e.stateNode;if(n===null)return null;var l=n[rt]||null;if(l===null)return null;n=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(R(231,t,typeof n));return n}var xn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ao=!1;if(xn)try{var Zl={};Object.defineProperty(Zl,"passive",{get:function(){Ao=!0}}),window.addEventListener("test",Zl,Zl),window.removeEventListener("test",Zl,Zl)}catch{Ao=!1}var Gn=null,Ad=null,Hs=null;function p0(){if(Hs)return Hs;var e,t=Ad,n=t.length,l,i="value"in Gn?Gn.value:Gn.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var c=n-e;for(l=1;l<=c&&t[n-l]===i[s-l];l++);return Hs=i.slice(e,1<l?1-l:void 0)}function Us(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ss(){return!0}function ef(){return!1}function ot(e){function t(n,l,i,s,c){this._reactName=n,this._targetInst=i,this.type=l,this.nativeEvent=s,this.target=c,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ss:ef,this.isPropagationStopped=ef,this}return Se(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ss)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ss)},persist:function(){},isPersistent:Ss}),t}var Ea={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bc=ot(Ea),Pi=Se({},Ea,{view:0,detail:0}),Fy=ot(Pi),Or,Br,Jl,zc=Se({},Pi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Td,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Jl&&(Jl&&e.type==="mousemove"?(Or=e.screenX-Jl.screenX,Br=e.screenY-Jl.screenY):Br=Or=0,Jl=e),Or)},movementY:function(e){return"movementY"in e?e.movementY:Br}}),tf=ot(zc),Wy=Se({},zc,{dataTransfer:0}),Iy=ot(Wy),e2=Se({},Pi,{relatedTarget:0}),zr=ot(e2),t2=Se({},Ea,{animationName:0,elapsedTime:0,pseudoElement:0}),n2=ot(t2),a2=Se({},Ea,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),l2=ot(a2),i2=Se({},Ea,{data:0}),nf=ot(i2),s2={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},c2={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},r2={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function o2(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=r2[e])?!!t[e]:!1}function Td(){return o2}var d2=Se({},Pi,{key:function(e){if(e.key){var t=s2[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Us(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?c2[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Td,charCode:function(e){return e.type==="keypress"?Us(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Us(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),u2=ot(d2),h2=Se({},zc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),af=ot(h2),m2=Se({},Pi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Td}),f2=ot(m2),p2=Se({},Ea,{propertyName:0,elapsedTime:0,pseudoElement:0}),g2=ot(p2),v2=Se({},zc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),y2=ot(v2),x2=Se({},Ea,{newState:0,oldState:0}),_2=ot(x2),b2=[9,13,27,32],Rd=xn&&"CompositionEvent"in window,ri=null;xn&&"documentMode"in document&&(ri=document.documentMode);var j2=xn&&"TextEvent"in window&&!ri,g0=xn&&(!Rd||ri&&8<ri&&11>=ri),lf=String.fromCharCode(32),sf=!1;function v0(e,t){switch(e){case"keyup":return b2.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function y0(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Wa=!1;function N2(e,t){switch(e){case"compositionend":return y0(t);case"keypress":return t.which!==32?null:(sf=!0,lf);case"textInput":return e=t.data,e===lf&&sf?null:e;default:return null}}function S2(e,t){if(Wa)return e==="compositionend"||!Rd&&v0(e,t)?(e=p0(),Hs=Ad=Gn=null,Wa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return g0&&t.locale!=="ko"?null:t.data;default:return null}}var w2={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!w2[e.type]:t==="textarea"}function x0(e,t,n,l){Fa?ol?ol.push(l):ol=[l]:Fa=l,t=bc(t,"onChange"),0<t.length&&(n=new Bc("onChange","change",null,n,l),e.push({event:n,listeners:t}))}var oi=null,Ni=null;function C2(e){fg(e,0)}function Lc(e){var t=li(e);if(o0(t))return e}function rf(e,t){if(e==="change")return t}var _0=!1;if(xn){var Lr;if(xn){var Hr="oninput"in document;if(!Hr){var of=document.createElement("div");of.setAttribute("oninput","return;"),Hr=typeof of.oninput=="function"}Lr=Hr}else Lr=!1;_0=Lr&&(!document.documentMode||9<document.documentMode)}function df(){oi&&(oi.detachEvent("onpropertychange",b0),Ni=oi=null)}function b0(e){if(e.propertyName==="value"&&Lc(Ni)){var t=[];x0(t,Ni,e,Md(e)),f0(C2,t)}}function E2(e,t,n){e==="focusin"?(df(),oi=t,Ni=n,oi.attachEvent("onpropertychange",b0)):e==="focusout"&&df()}function D2(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Lc(Ni)}function k2(e,t){if(e==="click")return Lc(t)}function M2(e,t){if(e==="input"||e==="change")return Lc(t)}function A2(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var _t=typeof Object.is=="function"?Object.is:A2;function Si(e,t){if(_t(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),l=Object.keys(t);if(n.length!==l.length)return!1;for(l=0;l<n.length;l++){var i=n[l];if(!wo.call(t,i)||!_t(e[i],t[i]))return!1}return!0}function uf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hf(e,t){var n=uf(e);e=0;for(var l;n;){if(n.nodeType===3){if(l=e+n.textContent.length,e<=t&&l>=t)return{node:n,offset:t-e};e=l}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=uf(n)}}function j0(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?j0(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function N0(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ac(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ac(e.document)}return t}function Od(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var T2=xn&&"documentMode"in document&&11>=document.documentMode,Ia=null,To=null,di=null,Ro=!1;function mf(e,t,n){var l=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ro||Ia==null||Ia!==ac(l)||(l=Ia,"selectionStart"in l&&Od(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),di&&Si(di,l)||(di=l,l=bc(To,"onSelect"),0<l.length&&(t=new Bc("onSelect","select",null,t,n),e.push({event:t,listeners:l}),t.target=Ia)))}function da(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var el={animationend:da("Animation","AnimationEnd"),animationiteration:da("Animation","AnimationIteration"),animationstart:da("Animation","AnimationStart"),transitionrun:da("Transition","TransitionRun"),transitionstart:da("Transition","TransitionStart"),transitioncancel:da("Transition","TransitionCancel"),transitionend:da("Transition","TransitionEnd")},Ur={},S0={};xn&&(S0=document.createElement("div").style,"AnimationEvent"in window||(delete el.animationend.animation,delete el.animationiteration.animation,delete el.animationstart.animation),"TransitionEvent"in window||delete el.transitionend.transition);function Da(e){if(Ur[e])return Ur[e];if(!el[e])return e;var t=el[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in S0)return Ur[e]=t[n];return e}var w0=Da("animationend"),C0=Da("animationiteration"),E0=Da("animationstart"),R2=Da("transitionrun"),O2=Da("transitionstart"),B2=Da("transitioncancel"),D0=Da("transitionend"),k0=new Map,Oo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Oo.push("scrollEnd");function Ut(e,t){k0.set(e,t),Ca(t,[e])}var lc=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},St=[],tl=0,Bd=0;function Hc(){for(var e=tl,t=Bd=tl=0;t<e;){var n=St[t];St[t++]=null;var l=St[t];St[t++]=null;var i=St[t];St[t++]=null;var s=St[t];if(St[t++]=null,l!==null&&i!==null){var c=l.pending;c===null?i.next=i:(i.next=c.next,c.next=i),l.pending=i}s!==0&&M0(n,i,s)}}function Uc(e,t,n,l){St[tl++]=e,St[tl++]=t,St[tl++]=n,St[tl++]=l,Bd|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function zd(e,t,n,l){return Uc(e,t,n,l),ic(e)}function ka(e,t){return Uc(e,null,null,t),ic(e)}function M0(e,t,n){e.lanes|=n;var l=e.alternate;l!==null&&(l.lanes|=n);for(var i=!1,s=e.return;s!==null;)s.childLanes|=n,l=s.alternate,l!==null&&(l.childLanes|=n),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(i=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,i&&t!==null&&(i=31-yt(n),e=s.hiddenUpdates,l=e[i],l===null?e[i]=[t]:l.push(t),t.lane=n|536870912),s):null}function ic(e){if(50<xi)throw xi=0,td=null,Error(R(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var nl={};function z2(e,t,n,l){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ft(e,t,n,l){return new z2(e,t,n,l)}function Ld(e){return e=e.prototype,!(!e||!e.isReactComponent)}function gn(e,t){var n=e.alternate;return n===null?(n=ft(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function A0(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Gs(e,t,n,l,i,s){var c=0;if(l=e,typeof e=="function")Ld(e)&&(c=1);else if(typeof e=="string")c=Px(e,n,$t.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case bo:return e=ft(31,n,t,i),e.elementType=bo,e.lanes=s,e;case $a:return ga(n.children,i,s,t);case Jp:c=8,i|=24;break;case yo:return e=ft(12,n,t,i|2),e.elementType=yo,e.lanes=s,e;case xo:return e=ft(13,n,t,i),e.elementType=xo,e.lanes=s,e;case _o:return e=ft(19,n,t,i),e.elementType=_o,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case mn:c=10;break e;case Fp:c=9;break e;case Nd:c=11;break e;case Sd:c=14;break e;case Rn:c=16,l=null;break e}c=29,n=Error(R(130,e===null?"null":typeof e,"")),l=null}return t=ft(c,n,t,i),t.elementType=e,t.type=l,t.lanes=s,t}function ga(e,t,n,l){return e=ft(7,e,l,t),e.lanes=n,e}function Gr(e,t,n){return e=ft(6,e,null,t),e.lanes=n,e}function T0(e){var t=ft(18,null,null,0);return t.stateNode=e,t}function Pr(e,t,n){return t=ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ff=new WeakMap;function kt(e,t){if(typeof e=="object"&&e!==null){var n=ff.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Km(t)},ff.set(e,t),t)}return{value:e,source:t,stack:Km(t)}}var al=[],ll=0,sc=null,wi=0,Ct=[],Et=0,In=null,Qt=1,Xt="";function un(e,t){al[ll++]=wi,al[ll++]=sc,sc=e,wi=t}function R0(e,t,n){Ct[Et++]=Qt,Ct[Et++]=Xt,Ct[Et++]=In,In=e;var l=Qt;e=Xt;var i=32-yt(l)-1;l&=~(1<<i),n+=1;var s=32-yt(t)+i;if(30<s){var c=i-i%5;s=(l&(1<<c)-1).toString(32),l>>=c,i-=c,Qt=1<<32-yt(t)+i|n<<i|l,Xt=s+e}else Qt=1<<s|n<<i|l,Xt=e}function Hd(e){e.return!==null&&(un(e,1),R0(e,1,0))}function Ud(e){for(;e===sc;)sc=al[--ll],al[ll]=null,wi=al[--ll],al[ll]=null;for(;e===In;)In=Ct[--Et],Ct[Et]=null,Xt=Ct[--Et],Ct[Et]=null,Qt=Ct[--Et],Ct[Et]=null}function O0(e,t){Ct[Et++]=Qt,Ct[Et++]=Xt,Ct[Et++]=In,Qt=t.id,Xt=t.overflow,In=e}var $e=null,je=null,re=!1,Qn=null,Mt=!1,Bo=Error(R(519));function ea(e){var t=Error(R(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ci(kt(t,e)),Bo}function pf(e){var t=e.stateNode,n=e.type,l=e.memoizedProps;switch(t[Ke]=e,t[rt]=l,n){case"dialog":ae("cancel",t),ae("close",t);break;case"iframe":case"object":case"embed":ae("load",t);break;case"video":case"audio":for(n=0;n<Mi.length;n++)ae(Mi[n],t);break;case"source":ae("error",t);break;case"img":case"image":case"link":ae("error",t),ae("load",t);break;case"details":ae("toggle",t);break;case"input":ae("invalid",t),d0(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":ae("invalid",t);break;case"textarea":ae("invalid",t),h0(t,l.value,l.defaultValue,l.children)}n=l.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||l.suppressHydrationWarning===!0||gg(t.textContent,n)?(l.popover!=null&&(ae("beforetoggle",t),ae("toggle",t)),l.onScroll!=null&&ae("scroll",t),l.onScrollEnd!=null&&ae("scrollend",t),l.onClick!=null&&(t.onclick=fn),t=!0):t=!1,t||ea(e,!0)}function gf(e){for($e=e.return;$e;)switch($e.tag){case 5:case 31:case 13:Mt=!1;return;case 27:case 3:Mt=!0;return;default:$e=$e.return}}function Va(e){if(e!==$e)return!1;if(!re)return gf(e),re=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||sd(e.type,e.memoizedProps)),n=!n),n&&je&&ea(e),gf(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));je=np(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));je=np(e)}else t===27?(t=je,la(e.type)?(e=dd,dd=null,je=e):je=t):je=$e?Tt(e.stateNode.nextSibling):null;return!0}function _a(){je=$e=null,re=!1}function qr(){var e=Qn;return e!==null&&(st===null?st=e:st.push.apply(st,e),Qn=null),e}function Ci(e){Qn===null?Qn=[e]:Qn.push(e)}var zo=Zt(null),Ma=null,pn=null;function Bn(e,t,n){xe(zo,t._currentValue),t._currentValue=n}function vn(e){e._currentValue=zo.current,Ye(zo)}function Lo(e,t,n){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===n)break;e=e.return}}function Ho(e,t,n,l){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var s=i.dependencies;if(s!==null){var c=i.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=i;for(var r=0;r<t.length;r++)if(o.context===t[r]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Lo(s.return,n,e),l||(c=null);break e}s=o.next}}else if(i.tag===18){if(c=i.return,c===null)throw Error(R(341));c.lanes|=n,s=c.alternate,s!==null&&(s.lanes|=n),Lo(c,n,e),c=null}else c=i.child;if(c!==null)c.return=i;else for(c=i;c!==null;){if(c===e){c=null;break}if(i=c.sibling,i!==null){i.return=c.return,c=i;break}c=c.return}i=c}}function Dl(e,t,n,l){e=null;for(var i=t,s=!1;i!==null;){if(!s){if(i.flags&524288)s=!0;else if(i.flags&262144)break}if(i.tag===10){var c=i.alternate;if(c===null)throw Error(R(387));if(c=c.memoizedProps,c!==null){var o=i.type;_t(i.pendingProps.value,c.value)||(e!==null?e.push(o):e=[o])}}else if(i===Is.current){if(c=i.alternate,c===null)throw Error(R(387));c.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(Ti):e=[Ti])}i=i.return}e!==null&&Ho(t,e,n,l),t.flags|=262144}function cc(e){for(e=e.firstContext;e!==null;){if(!_t(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ba(e){Ma=e,pn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ze(e){return B0(Ma,e)}function ws(e,t){return Ma===null&&ba(e),B0(e,t)}function B0(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},pn===null){if(e===null)throw Error(R(308));pn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else pn=pn.next=t;return n}var L2=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},H2=Ge.unstable_scheduleCallback,U2=Ge.unstable_NormalPriority,ze={$$typeof:mn,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Gd(){return{controller:new L2,data:new Map,refCount:0}}function qi(e){e.refCount--,e.refCount===0&&H2(U2,function(){e.controller.abort()})}var ui=null,Uo=0,vl=0,dl=null;function G2(e,t){if(ui===null){var n=ui=[];Uo=0,vl=uu(),dl={status:"pending",value:void 0,then:function(l){n.push(l)}}}return Uo++,t.then(vf,vf),t}function vf(){if(--Uo===0&&ui!==null){dl!==null&&(dl.status="fulfilled");var e=ui;ui=null,vl=0,dl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function P2(e,t){var n=[],l={status:"pending",value:null,reason:null,then:function(i){n.push(i)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var i=0;i<n.length;i++)(0,n[i])(t)},function(i){for(l.status="rejected",l.reason=i,i=0;i<n.length;i++)(0,n[i])(void 0)}),l}var yf=X.S;X.S=function(e,t){Z1=gt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&G2(e,t),yf!==null&&yf(e,t)};var va=Zt(null);function Pd(){var e=va.current;return e!==null?e:ye.pooledCache}function Ps(e,t){t===null?xe(va,va.current):xe(va,t.pool)}function z0(){var e=Pd();return e===null?null:{parent:ze._currentValue,pool:e}}var kl=Error(R(460)),qd=Error(R(474)),Gc=Error(R(542)),rc={then:function(){}};function xf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function L0(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(fn,fn),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,bf(e),e;default:if(typeof t.status=="string")t.then(fn,fn);else{if(e=ye,e!==null&&100<e.shellSuspendCounter)throw Error(R(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=l}},function(l){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,bf(e),e}throw ya=t,kl}}function ma(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(ya=n,kl):n}}var ya=null;function _f(){if(ya===null)throw Error(R(459));var e=ya;return ya=null,e}function bf(e){if(e===kl||e===Gc)throw Error(R(483))}var ul=null,Ei=0;function Cs(e){var t=Ei;return Ei+=1,ul===null&&(ul=[]),L0(ul,e,t)}function Fl(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Es(e,t){throw t.$$typeof===Ey?Error(R(525)):(e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function H0(e){function t(v,m){if(e){var _=v.deletions;_===null?(v.deletions=[m],v.flags|=16):_.push(m)}}function n(v,m){if(!e)return null;for(;m!==null;)t(v,m),m=m.sibling;return null}function l(v){for(var m=new Map;v!==null;)v.key!==null?m.set(v.key,v):m.set(v.index,v),v=v.sibling;return m}function i(v,m){return v=gn(v,m),v.index=0,v.sibling=null,v}function s(v,m,_){return v.index=_,e?(_=v.alternate,_!==null?(_=_.index,_<m?(v.flags|=67108866,m):_):(v.flags|=67108866,m)):(v.flags|=1048576,m)}function c(v){return e&&v.alternate===null&&(v.flags|=67108866),v}function o(v,m,_,w){return m===null||m.tag!==6?(m=Gr(_,v.mode,w),m.return=v,m):(m=i(m,_),m.return=v,m)}function r(v,m,_,w){var O=_.type;return O===$a?h(v,m,_.props.children,w,_.key):m!==null&&(m.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===Rn&&ma(O)===m.type)?(m=i(m,_.props),Fl(m,_),m.return=v,m):(m=Gs(_.type,_.key,_.props,null,v.mode,w),Fl(m,_),m.return=v,m)}function d(v,m,_,w){return m===null||m.tag!==4||m.stateNode.containerInfo!==_.containerInfo||m.stateNode.implementation!==_.implementation?(m=Pr(_,v.mode,w),m.return=v,m):(m=i(m,_.children||[]),m.return=v,m)}function h(v,m,_,w,O){return m===null||m.tag!==7?(m=ga(_,v.mode,w,O),m.return=v,m):(m=i(m,_),m.return=v,m)}function p(v,m,_){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=Gr(""+m,v.mode,_),m.return=v,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case xs:return _=Gs(m.type,m.key,m.props,null,v.mode,_),Fl(_,m),_.return=v,_;case ni:return m=Pr(m,v.mode,_),m.return=v,m;case Rn:return m=ma(m),p(v,m,_)}if(ai(m)||$l(m))return m=ga(m,v.mode,_,null),m.return=v,m;if(typeof m.then=="function")return p(v,Cs(m),_);if(m.$$typeof===mn)return p(v,ws(v,m),_);Es(v,m)}return null}function f(v,m,_,w){var O=m!==null?m.key:null;if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return O!==null?null:o(v,m,""+_,w);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case xs:return _.key===O?r(v,m,_,w):null;case ni:return _.key===O?d(v,m,_,w):null;case Rn:return _=ma(_),f(v,m,_,w)}if(ai(_)||$l(_))return O!==null?null:h(v,m,_,w,null);if(typeof _.then=="function")return f(v,m,Cs(_),w);if(_.$$typeof===mn)return f(v,m,ws(v,_),w);Es(v,_)}return null}function x(v,m,_,w,O){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return v=v.get(_)||null,o(m,v,""+w,O);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case xs:return v=v.get(w.key===null?_:w.key)||null,r(m,v,w,O);case ni:return v=v.get(w.key===null?_:w.key)||null,d(m,v,w,O);case Rn:return w=ma(w),x(v,m,_,w,O)}if(ai(w)||$l(w))return v=v.get(_)||null,h(m,v,w,O,null);if(typeof w.then=="function")return x(v,m,_,Cs(w),O);if(w.$$typeof===mn)return x(v,m,_,ws(m,w),O);Es(m,w)}return null}function C(v,m,_,w){for(var O=null,L=null,z=m,P=m=0,Y=null;z!==null&&P<_.length;P++){z.index>P?(Y=z,z=null):Y=z.sibling;var Q=f(v,z,_[P],w);if(Q===null){z===null&&(z=Y);break}e&&z&&Q.alternate===null&&t(v,z),m=s(Q,m,P),L===null?O=Q:L.sibling=Q,L=Q,z=Y}if(P===_.length)return n(v,z),re&&un(v,P),O;if(z===null){for(;P<_.length;P++)z=p(v,_[P],w),z!==null&&(m=s(z,m,P),L===null?O=z:L.sibling=z,L=z);return re&&un(v,P),O}for(z=l(z);P<_.length;P++)Y=x(z,v,P,_[P],w),Y!==null&&(e&&Y.alternate!==null&&z.delete(Y.key===null?P:Y.key),m=s(Y,m,P),L===null?O=Y:L.sibling=Y,L=Y);return e&&z.forEach(function(I){return t(v,I)}),re&&un(v,P),O}function k(v,m,_,w){if(_==null)throw Error(R(151));for(var O=null,L=null,z=m,P=m=0,Y=null,Q=_.next();z!==null&&!Q.done;P++,Q=_.next()){z.index>P?(Y=z,z=null):Y=z.sibling;var I=f(v,z,Q.value,w);if(I===null){z===null&&(z=Y);break}e&&z&&I.alternate===null&&t(v,z),m=s(I,m,P),L===null?O=I:L.sibling=I,L=I,z=Y}if(Q.done)return n(v,z),re&&un(v,P),O;if(z===null){for(;!Q.done;P++,Q=_.next())Q=p(v,Q.value,w),Q!==null&&(m=s(Q,m,P),L===null?O=Q:L.sibling=Q,L=Q);return re&&un(v,P),O}for(z=l(z);!Q.done;P++,Q=_.next())Q=x(z,v,P,Q.value,w),Q!==null&&(e&&Q.alternate!==null&&z.delete(Q.key===null?P:Q.key),m=s(Q,m,P),L===null?O=Q:L.sibling=Q,L=Q);return e&&z.forEach(function(_e){return t(v,_e)}),re&&un(v,P),O}function M(v,m,_,w){if(typeof _=="object"&&_!==null&&_.type===$a&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case xs:e:{for(var O=_.key;m!==null;){if(m.key===O){if(O=_.type,O===$a){if(m.tag===7){n(v,m.sibling),w=i(m,_.props.children),w.return=v,v=w;break e}}else if(m.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===Rn&&ma(O)===m.type){n(v,m.sibling),w=i(m,_.props),Fl(w,_),w.return=v,v=w;break e}n(v,m);break}else t(v,m);m=m.sibling}_.type===$a?(w=ga(_.props.children,v.mode,w,_.key),w.return=v,v=w):(w=Gs(_.type,_.key,_.props,null,v.mode,w),Fl(w,_),w.return=v,v=w)}return c(v);case ni:e:{for(O=_.key;m!==null;){if(m.key===O)if(m.tag===4&&m.stateNode.containerInfo===_.containerInfo&&m.stateNode.implementation===_.implementation){n(v,m.sibling),w=i(m,_.children||[]),w.return=v,v=w;break e}else{n(v,m);break}else t(v,m);m=m.sibling}w=Pr(_,v.mode,w),w.return=v,v=w}return c(v);case Rn:return _=ma(_),M(v,m,_,w)}if(ai(_))return C(v,m,_,w);if($l(_)){if(O=$l(_),typeof O!="function")throw Error(R(150));return _=O.call(_),k(v,m,_,w)}if(typeof _.then=="function")return M(v,m,Cs(_),w);if(_.$$typeof===mn)return M(v,m,ws(v,_),w);Es(v,_)}return typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint"?(_=""+_,m!==null&&m.tag===6?(n(v,m.sibling),w=i(m,_),w.return=v,v=w):(n(v,m),w=Gr(_,v.mode,w),w.return=v,v=w),c(v)):n(v,m)}return function(v,m,_,w){try{Ei=0;var O=M(v,m,_,w);return ul=null,O}catch(z){if(z===kl||z===Gc)throw z;var L=ft(29,z,null,v.mode);return L.lanes=w,L.return=v,L}finally{}}}var ja=H0(!0),U0=H0(!1),On=!1;function Vd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Go(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Xn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Kn(e,t,n){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,ue&2){var i=l.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),l.pending=t,t=ic(e),M0(e,null,n),t}return Uc(e,l,t,n),ic(e)}function hi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,n|=l,t.lanes=n,a0(e,n)}}function Vr(e,t){var n=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,n===l)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var c={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?i=s=c:s=s.next=c,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:l.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:l.shared,callbacks:l.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Po=!1;function mi(){if(Po){var e=dl;if(e!==null)throw e}}function fi(e,t,n,l){Po=!1;var i=e.updateQueue;On=!1;var s=i.firstBaseUpdate,c=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var r=o,d=r.next;r.next=null,c===null?s=d:c.next=d,c=r;var h=e.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==c&&(o===null?h.firstBaseUpdate=d:o.next=d,h.lastBaseUpdate=r))}if(s!==null){var p=i.baseState;c=0,h=d=r=null,o=s;do{var f=o.lane&-536870913,x=f!==o.lane;if(x?(se&f)===f:(l&f)===f){f!==0&&f===vl&&(Po=!0),h!==null&&(h=h.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var C=e,k=o;f=t;var M=n;switch(k.tag){case 1:if(C=k.payload,typeof C=="function"){p=C.call(M,p,f);break e}p=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=k.payload,f=typeof C=="function"?C.call(M,p,f):C,f==null)break e;p=Se({},p,f);break e;case 2:On=!0}}f=o.callback,f!==null&&(e.flags|=64,x&&(e.flags|=8192),x=i.callbacks,x===null?i.callbacks=[f]:x.push(f))}else x={lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(d=h=x,r=p):h=h.next=x,c|=f;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;x=o,o=x.next,x.next=null,i.lastBaseUpdate=x,i.shared.pending=null}}while(1);h===null&&(r=p),i.baseState=r,i.firstBaseUpdate=d,i.lastBaseUpdate=h,s===null&&(i.shared.lanes=0),na|=c,e.lanes=c,e.memoizedState=p}}function G0(e,t){if(typeof e!="function")throw Error(R(191,e));e.call(t)}function P0(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)G0(n[e],t)}var yl=Zt(null),oc=Zt(0);function jf(e,t){e=Nn,xe(oc,e),xe(yl,t),Nn=e|t.baseLanes}function qo(){xe(oc,Nn),xe(yl,yl.current)}function Yd(){Nn=oc.current,Ye(yl),Ye(oc)}var bt=Zt(null),At=null;function zn(e){var t=e.alternate;xe(Me,Me.current&1),xe(bt,e),At===null&&(t===null||yl.current!==null||t.memoizedState!==null)&&(At=e)}function Vo(e){xe(Me,Me.current),xe(bt,e),At===null&&(At=e)}function q0(e){e.tag===22?(xe(Me,Me.current),xe(bt,e),At===null&&(At=e)):Ln()}function Ln(){xe(Me,Me.current),xe(bt,bt.current)}function mt(e){Ye(bt),At===e&&(At=null),Ye(Me)}var Me=Zt(0);function dc(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||rd(n)||od(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _n=0,W=null,ve=null,Oe=null,uc=!1,hl=!1,Na=!1,hc=0,Di=0,ml=null,q2=0;function Ee(){throw Error(R(321))}function Qd(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!_t(e[n],t[n]))return!1;return!0}function Xd(e,t,n,l,i,s){return _n=s,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,X.H=e===null||e.memoizedState===null?x1:au,Na=!1,s=n(l,i),Na=!1,hl&&(s=Y0(t,n,l,i)),V0(e),s}function V0(e){X.H=ki;var t=ve!==null&&ve.next!==null;if(_n=0,Oe=ve=W=null,uc=!1,Di=0,ml=null,t)throw Error(R(300));e===null||Le||(e=e.dependencies,e!==null&&cc(e)&&(Le=!0))}function Y0(e,t,n,l){W=e;var i=0;do{if(hl&&(ml=null),Di=0,hl=!1,25<=i)throw Error(R(301));if(i+=1,Oe=ve=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}X.H=_1,s=t(n,l)}while(hl);return s}function V2(){var e=X.H,t=e.useState()[0];return t=typeof t.then=="function"?Vi(t):t,e=e.useState()[0],(ve!==null?ve.memoizedState:null)!==e&&(W.flags|=1024),t}function Kd(){var e=hc!==0;return hc=0,e}function $d(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Zd(e){if(uc){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}uc=!1}_n=0,Oe=ve=W=null,hl=!1,Di=hc=0,ml=null}function et(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Oe===null?W.memoizedState=Oe=e:Oe=Oe.next=e,Oe}function Ae(){if(ve===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=ve.next;var t=Oe===null?W.memoizedState:Oe.next;if(t!==null)Oe=t,ve=e;else{if(e===null)throw W.alternate===null?Error(R(467)):Error(R(310));ve=e,e={memoizedState:ve.memoizedState,baseState:ve.baseState,baseQueue:ve.baseQueue,queue:ve.queue,next:null},Oe===null?W.memoizedState=Oe=e:Oe=Oe.next=e}return Oe}function Pc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Vi(e){var t=Di;return Di+=1,ml===null&&(ml=[]),e=L0(ml,e,t),t=W,(Oe===null?t.memoizedState:Oe.next)===null&&(t=t.alternate,X.H=t===null||t.memoizedState===null?x1:au),e}function qc(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Vi(e);if(e.$$typeof===mn)return Ze(e)}throw Error(R(438,String(e)))}function Jd(e){var t=null,n=W.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var l=W.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Pc(),W.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),l=0;l<e;l++)n[l]=Dy;return t.index++,n}function bn(e,t){return typeof t=="function"?t(e):t}function qs(e){var t=Ae();return Fd(t,ve,e)}function Fd(e,t,n){var l=e.queue;if(l===null)throw Error(R(311));l.lastRenderedReducer=n;var i=e.baseQueue,s=l.pending;if(s!==null){if(i!==null){var c=i.next;i.next=s.next,s.next=c}t.baseQueue=i=s,l.pending=null}if(s=e.baseState,i===null)e.memoizedState=s;else{t=i.next;var o=c=null,r=null,d=t,h=!1;do{var p=d.lane&-536870913;if(p!==d.lane?(se&p)===p:(_n&p)===p){var f=d.revertLane;if(f===0)r!==null&&(r=r.next={lane:0,revertLane:0,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),p===vl&&(h=!0);else if((_n&f)===f){d=d.next,f===vl&&(h=!0);continue}else p={lane:0,revertLane:d.revertLane,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},r===null?(o=r=p,c=s):r=r.next=p,W.lanes|=f,na|=f;p=d.action,Na&&n(s,p),s=d.hasEagerState?d.eagerState:n(s,p)}else f={lane:p,revertLane:d.revertLane,gesture:d.gesture,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},r===null?(o=r=f,c=s):r=r.next=f,W.lanes|=p,na|=p;d=d.next}while(d!==null&&d!==t);if(r===null?c=s:r.next=o,!_t(s,e.memoizedState)&&(Le=!0,h&&(n=dl,n!==null)))throw n;e.memoizedState=s,e.baseState=c,e.baseQueue=r,l.lastRenderedState=s}return i===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Yr(e){var t=Ae(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var l=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var c=i=i.next;do s=e(s,c.action),c=c.next;while(c!==i);_t(s,t.memoizedState)||(Le=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,l]}function Q0(e,t,n){var l=W,i=Ae(),s=re;if(s){if(n===void 0)throw Error(R(407));n=n()}else n=t();var c=!_t((ve||i).memoizedState,n);if(c&&(i.memoizedState=n,Le=!0),i=i.queue,Wd($0.bind(null,l,i,e),[e]),i.getSnapshot!==t||c||Oe!==null&&Oe.memoizedState.tag&1){if(l.flags|=2048,xl(9,{destroy:void 0},K0.bind(null,l,i,n,t),null),ye===null)throw Error(R(349));s||_n&127||X0(l,t,n)}return n}function X0(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t=Pc(),W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function K0(e,t,n,l){t.value=n,t.getSnapshot=l,Z0(t)&&J0(e)}function $0(e,t,n){return n(function(){Z0(t)&&J0(e)})}function Z0(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!_t(e,n)}catch{return!0}}function J0(e){var t=ka(e,2);t!==null&&ct(t,e,2)}function Yo(e){var t=et();if(typeof e=="function"){var n=e;if(e=n(),Na){Un(!0);try{n()}finally{Un(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:bn,lastRenderedState:e},t}function F0(e,t,n,l){return e.baseState=n,Fd(e,ve,typeof l=="function"?l:bn)}function Y2(e,t,n,l,i){if(Yc(e))throw Error(R(485));if(e=t.action,e!==null){var s={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(c){s.listeners.push(c)}};X.T!==null?n(!0):s.isTransition=!1,l(s),n=t.pending,n===null?(s.next=t.pending=s,W0(t,s)):(s.next=n.next,t.pending=n.next=s)}}function W0(e,t){var n=t.action,l=t.payload,i=e.state;if(t.isTransition){var s=X.T,c={};X.T=c;try{var o=n(i,l),r=X.S;r!==null&&r(c,o),Nf(e,t,o)}catch(d){Qo(e,t,d)}finally{s!==null&&c.types!==null&&(s.types=c.types),X.T=s}}else try{s=n(i,l),Nf(e,t,s)}catch(d){Qo(e,t,d)}}function Nf(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(l){Sf(e,t,l)},function(l){return Qo(e,t,l)}):Sf(e,t,n)}function Sf(e,t,n){t.status="fulfilled",t.value=n,I0(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,W0(e,n)))}function Qo(e,t,n){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=n,I0(t),t=t.next;while(t!==l)}e.action=null}function I0(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function e1(e,t){return t}function wf(e,t){if(re){var n=ye.formState;if(n!==null){e:{var l=W;if(re){if(je){t:{for(var i=je,s=Mt;i.nodeType!==8;){if(!s){i=null;break t}if(i=Tt(i.nextSibling),i===null){i=null;break t}}s=i.data,i=s==="F!"||s==="F"?i:null}if(i){je=Tt(i.nextSibling),l=i.data==="F!";break e}}ea(l)}l=!1}l&&(t=n[0])}}return n=et(),n.memoizedState=n.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e1,lastRenderedState:t},n.queue=l,n=g1.bind(null,W,l),l.dispatch=n,l=Yo(!1),s=nu.bind(null,W,!1,l.queue),l=et(),i={state:t,dispatch:null,action:e,pending:null},l.queue=i,n=Y2.bind(null,W,i,s,n),i.dispatch=n,l.memoizedState=e,[t,n,!1]}function Cf(e){var t=Ae();return t1(t,ve,e)}function t1(e,t,n){if(t=Fd(e,t,e1)[0],e=qs(bn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=Vi(t)}catch(c){throw c===kl?Gc:c}else l=t;t=Ae();var i=t.queue,s=i.dispatch;return n!==t.memoizedState&&(W.flags|=2048,xl(9,{destroy:void 0},Q2.bind(null,i,n),null)),[l,s,e]}function Q2(e,t){e.action=t}function Ef(e){var t=Ae(),n=ve;if(n!==null)return t1(t,n,e);Ae(),t=t.memoizedState,n=Ae();var l=n.queue.dispatch;return n.memoizedState=e,[t,l,!1]}function xl(e,t,n,l){return e={tag:e,create:n,deps:l,inst:t,next:null},t=W.updateQueue,t===null&&(t=Pc(),W.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(l=n.next,n.next=e,e.next=l,t.lastEffect=e),e}function n1(){return Ae().memoizedState}function Vs(e,t,n,l){var i=et();W.flags|=e,i.memoizedState=xl(1|t,{destroy:void 0},n,l===void 0?null:l)}function Vc(e,t,n,l){var i=Ae();l=l===void 0?null:l;var s=i.memoizedState.inst;ve!==null&&l!==null&&Qd(l,ve.memoizedState.deps)?i.memoizedState=xl(t,s,n,l):(W.flags|=e,i.memoizedState=xl(1|t,s,n,l))}function Df(e,t){Vs(8390656,8,e,t)}function Wd(e,t){Vc(2048,8,e,t)}function X2(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=Pc(),W.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function a1(e){var t=Ae().memoizedState;return X2({ref:t,nextImpl:e}),function(){if(ue&2)throw Error(R(440));return t.impl.apply(void 0,arguments)}}function l1(e,t){return Vc(4,2,e,t)}function i1(e,t){return Vc(4,4,e,t)}function s1(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function c1(e,t,n){n=n!=null?n.concat([e]):null,Vc(4,4,s1.bind(null,t,e),n)}function Id(){}function r1(e,t){var n=Ae();t=t===void 0?null:t;var l=n.memoizedState;return t!==null&&Qd(t,l[1])?l[0]:(n.memoizedState=[e,t],e)}function o1(e,t){var n=Ae();t=t===void 0?null:t;var l=n.memoizedState;if(t!==null&&Qd(t,l[1]))return l[0];if(l=e(),Na){Un(!0);try{e()}finally{Un(!1)}}return n.memoizedState=[l,t],l}function eu(e,t,n){return n===void 0||_n&1073741824&&!(se&261930)?e.memoizedState=t:(e.memoizedState=n,e=F1(),W.lanes|=e,na|=e,n)}function d1(e,t,n,l){return _t(n,t)?n:yl.current!==null?(e=eu(e,n,l),_t(e,t)||(Le=!0),e):!(_n&42)||_n&1073741824&&!(se&261930)?(Le=!0,e.memoizedState=n):(e=F1(),W.lanes|=e,na|=e,t)}function u1(e,t,n,l,i){var s=he.p;he.p=s!==0&&8>s?s:8;var c=X.T,o={};X.T=o,nu(e,!1,t,n);try{var r=i(),d=X.S;if(d!==null&&d(o,r),r!==null&&typeof r=="object"&&typeof r.then=="function"){var h=P2(r,l);pi(e,t,h,xt(e))}else pi(e,t,l,xt(e))}catch(p){pi(e,t,{then:function(){},status:"rejected",reason:p},xt())}finally{he.p=s,c!==null&&o.types!==null&&(c.types=o.types),X.T=c}}function K2(){}function Xo(e,t,n,l){if(e.tag!==5)throw Error(R(476));var i=h1(e).queue;u1(e,i,t,pa,n===null?K2:function(){return m1(e),n(l)})}function h1(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:pa,baseState:pa,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:bn,lastRenderedState:pa},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:bn,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function m1(e){var t=h1(e);t.next===null&&(t=e.alternate.memoizedState),pi(e,t.next.queue,{},xt())}function tu(){return Ze(Ti)}function f1(){return Ae().memoizedState}function p1(){return Ae().memoizedState}function $2(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=xt();e=Xn(n);var l=Kn(t,e,n);l!==null&&(ct(l,t,n),hi(l,t,n)),t={cache:Gd()},e.payload=t;return}t=t.return}}function Z2(e,t,n){var l=xt();n={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Yc(e)?v1(t,n):(n=zd(e,t,n,l),n!==null&&(ct(n,e,l),y1(n,t,l)))}function g1(e,t,n){var l=xt();pi(e,t,n,l)}function pi(e,t,n,l){var i={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Yc(e))v1(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var c=t.lastRenderedState,o=s(c,n);if(i.hasEagerState=!0,i.eagerState=o,_t(o,c))return Uc(e,t,i,0),ye===null&&Hc(),!1}catch{}finally{}if(n=zd(e,t,i,l),n!==null)return ct(n,e,l),y1(n,t,l),!0}return!1}function nu(e,t,n,l){if(l={lane:2,revertLane:uu(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Yc(e)){if(t)throw Error(R(479))}else t=zd(e,n,l,2),t!==null&&ct(t,e,2)}function Yc(e){var t=e.alternate;return e===W||t!==null&&t===W}function v1(e,t){hl=uc=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function y1(e,t,n){if(n&4194048){var l=t.lanes;l&=e.pendingLanes,n|=l,t.lanes=n,a0(e,n)}}var ki={readContext:Ze,use:qc,useCallback:Ee,useContext:Ee,useEffect:Ee,useImperativeHandle:Ee,useLayoutEffect:Ee,useInsertionEffect:Ee,useMemo:Ee,useReducer:Ee,useRef:Ee,useState:Ee,useDebugValue:Ee,useDeferredValue:Ee,useTransition:Ee,useSyncExternalStore:Ee,useId:Ee,useHostTransitionStatus:Ee,useFormState:Ee,useActionState:Ee,useOptimistic:Ee,useMemoCache:Ee,useCacheRefresh:Ee};ki.useEffectEvent=Ee;var x1={readContext:Ze,use:qc,useCallback:function(e,t){return et().memoizedState=[e,t===void 0?null:t],e},useContext:Ze,useEffect:Df,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Vs(4194308,4,s1.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Vs(4194308,4,e,t)},useInsertionEffect:function(e,t){Vs(4,2,e,t)},useMemo:function(e,t){var n=et();t=t===void 0?null:t;var l=e();if(Na){Un(!0);try{e()}finally{Un(!1)}}return n.memoizedState=[l,t],l},useReducer:function(e,t,n){var l=et();if(n!==void 0){var i=n(t);if(Na){Un(!0);try{n(t)}finally{Un(!1)}}}else i=t;return l.memoizedState=l.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},l.queue=e,e=e.dispatch=Z2.bind(null,W,e),[l.memoizedState,e]},useRef:function(e){var t=et();return e={current:e},t.memoizedState=e},useState:function(e){e=Yo(e);var t=e.queue,n=g1.bind(null,W,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Id,useDeferredValue:function(e,t){var n=et();return eu(n,e,t)},useTransition:function(){var e=Yo(!1);return e=u1.bind(null,W,e.queue,!0,!1),et().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var l=W,i=et();if(re){if(n===void 0)throw Error(R(407));n=n()}else{if(n=t(),ye===null)throw Error(R(349));se&127||X0(l,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,Df($0.bind(null,l,s,e),[e]),l.flags|=2048,xl(9,{destroy:void 0},K0.bind(null,l,s,n,t),null),n},useId:function(){var e=et(),t=ye.identifierPrefix;if(re){var n=Xt,l=Qt;n=(l&~(1<<32-yt(l)-1)).toString(32)+n,t="_"+t+"R_"+n,n=hc++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=q2++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:tu,useFormState:wf,useActionState:wf,useOptimistic:function(e){var t=et();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=nu.bind(null,W,!0,n),n.dispatch=t,[e,t]},useMemoCache:Jd,useCacheRefresh:function(){return et().memoizedState=$2.bind(null,W)},useEffectEvent:function(e){var t=et(),n={impl:e};return t.memoizedState=n,function(){if(ue&2)throw Error(R(440));return n.impl.apply(void 0,arguments)}}},au={readContext:Ze,use:qc,useCallback:r1,useContext:Ze,useEffect:Wd,useImperativeHandle:c1,useInsertionEffect:l1,useLayoutEffect:i1,useMemo:o1,useReducer:qs,useRef:n1,useState:function(){return qs(bn)},useDebugValue:Id,useDeferredValue:function(e,t){var n=Ae();return d1(n,ve.memoizedState,e,t)},useTransition:function(){var e=qs(bn)[0],t=Ae().memoizedState;return[typeof e=="boolean"?e:Vi(e),t]},useSyncExternalStore:Q0,useId:f1,useHostTransitionStatus:tu,useFormState:Cf,useActionState:Cf,useOptimistic:function(e,t){var n=Ae();return F0(n,ve,e,t)},useMemoCache:Jd,useCacheRefresh:p1};au.useEffectEvent=a1;var _1={readContext:Ze,use:qc,useCallback:r1,useContext:Ze,useEffect:Wd,useImperativeHandle:c1,useInsertionEffect:l1,useLayoutEffect:i1,useMemo:o1,useReducer:Yr,useRef:n1,useState:function(){return Yr(bn)},useDebugValue:Id,useDeferredValue:function(e,t){var n=Ae();return ve===null?eu(n,e,t):d1(n,ve.memoizedState,e,t)},useTransition:function(){var e=Yr(bn)[0],t=Ae().memoizedState;return[typeof e=="boolean"?e:Vi(e),t]},useSyncExternalStore:Q0,useId:f1,useHostTransitionStatus:tu,useFormState:Ef,useActionState:Ef,useOptimistic:function(e,t){var n=Ae();return ve!==null?F0(n,ve,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Jd,useCacheRefresh:p1};_1.useEffectEvent=a1;function Qr(e,t,n,l){t=e.memoizedState,n=n(l,t),n=n==null?t:Se({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ko={enqueueSetState:function(e,t,n){e=e._reactInternals;var l=xt(),i=Xn(l);i.payload=t,n!=null&&(i.callback=n),t=Kn(e,i,l),t!==null&&(ct(t,e,l),hi(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var l=xt(),i=Xn(l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Kn(e,i,l),t!==null&&(ct(t,e,l),hi(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=xt(),l=Xn(n);l.tag=2,t!=null&&(l.callback=t),t=Kn(e,l,n),t!==null&&(ct(t,e,n),hi(t,e,n))}};function kf(e,t,n,l,i,s,c){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,s,c):t.prototype&&t.prototype.isPureReactComponent?!Si(n,l)||!Si(i,s):!0}function Mf(e,t,n,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,l),t.state!==e&&Ko.enqueueReplaceState(t,t.state,null)}function Sa(e,t){var n=t;if("ref"in t){n={};for(var l in t)l!=="ref"&&(n[l]=t[l])}if(e=e.defaultProps){n===t&&(n=Se({},n));for(var i in e)n[i]===void 0&&(n[i]=e[i])}return n}function b1(e){lc(e)}function j1(e){console.error(e)}function N1(e){lc(e)}function mc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function Af(e,t,n){try{var l=e.onCaughtError;l(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function $o(e,t,n){return n=Xn(n),n.tag=3,n.payload={element:null},n.callback=function(){mc(e,t)},n}function S1(e){return e=Xn(e),e.tag=3,e}function w1(e,t,n,l){var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var s=l.value;e.payload=function(){return i(s)},e.callback=function(){Af(t,n,l)}}var c=n.stateNode;c!==null&&typeof c.componentDidCatch=="function"&&(e.callback=function(){Af(t,n,l),typeof i!="function"&&($n===null?$n=new Set([this]):$n.add(this));var o=l.stack;this.componentDidCatch(l.value,{componentStack:o!==null?o:""})})}function J2(e,t,n,l,i){if(n.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=n.alternate,t!==null&&Dl(t,n,i,!0),n=bt.current,n!==null){switch(n.tag){case 31:case 13:return At===null?yc():n.alternate===null&&ke===0&&(ke=3),n.flags&=-257,n.flags|=65536,n.lanes=i,l===rc?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([l]):t.add(l),no(e,l,i)),!1;case 22:return n.flags|=65536,l===rc?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([l]):n.add(l)),no(e,l,i)),!1}throw Error(R(435,n.tag))}return no(e,l,i),yc(),!1}if(re)return t=bt.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,l!==Bo&&(e=Error(R(422),{cause:l}),Ci(kt(e,n)))):(l!==Bo&&(t=Error(R(423),{cause:l}),Ci(kt(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,l=kt(l,n),i=$o(e.stateNode,l,i),Vr(e,i),ke!==4&&(ke=2)),!1;var s=Error(R(520),{cause:l});if(s=kt(s,n),yi===null?yi=[s]:yi.push(s),ke!==4&&(ke=2),t===null)return!0;l=kt(l,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=$o(n.stateNode,l,e),Vr(n,e),!1;case 1:if(t=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&($n===null||!$n.has(s))))return n.flags|=65536,i&=-i,n.lanes|=i,i=S1(i),w1(i,e,n,l),Vr(n,i),!1}n=n.return}while(n!==null);return!1}var lu=Error(R(461)),Le=!1;function Xe(e,t,n,l){t.child=e===null?U0(t,null,n,l):ja(t,e.child,n,l)}function Tf(e,t,n,l,i){n=n.render;var s=t.ref;if("ref"in l){var c={};for(var o in l)o!=="ref"&&(c[o]=l[o])}else c=l;return ba(t),l=Xd(e,t,n,c,s,i),o=Kd(),e!==null&&!Le?($d(e,t,i),jn(e,t,i)):(re&&o&&Hd(t),t.flags|=1,Xe(e,t,l,i),t.child)}function Rf(e,t,n,l,i){if(e===null){var s=n.type;return typeof s=="function"&&!Ld(s)&&s.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=s,C1(e,t,s,l,i)):(e=Gs(n.type,null,l,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!iu(e,i)){var c=s.memoizedProps;if(n=n.compare,n=n!==null?n:Si,n(c,l)&&e.ref===t.ref)return jn(e,t,i)}return t.flags|=1,e=gn(s,l),e.ref=t.ref,e.return=t,t.child=e}function C1(e,t,n,l,i){if(e!==null){var s=e.memoizedProps;if(Si(s,l)&&e.ref===t.ref)if(Le=!1,t.pendingProps=l=s,iu(e,i))e.flags&131072&&(Le=!0);else return t.lanes=e.lanes,jn(e,t,i)}return Zo(e,t,n,l,i)}function E1(e,t,n,l){var i=l.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if(t.flags&128){if(s=s!==null?s.baseLanes|n:n,e!==null){for(l=t.child=e.child,i=0;l!==null;)i=i|l.lanes|l.childLanes,l=l.sibling;l=i&~s}else l=0,t.child=null;return Of(e,t,s,n,l)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ps(t,s!==null?s.cachePool:null),s!==null?jf(t,s):qo(),q0(t);else return l=t.lanes=536870912,Of(e,t,s!==null?s.baseLanes|n:n,n,l)}else s!==null?(Ps(t,s.cachePool),jf(t,s),Ln(),t.memoizedState=null):(e!==null&&Ps(t,null),qo(),Ln());return Xe(e,t,i,n),t.child}function ii(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Of(e,t,n,l,i){var s=Pd();return s=s===null?null:{parent:ze._currentValue,pool:s},t.memoizedState={baseLanes:n,cachePool:s},e!==null&&Ps(t,null),qo(),q0(t),e!==null&&Dl(e,t,l,!0),t.childLanes=i,null}function Ys(e,t){return t=fc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Bf(e,t,n){return ja(t,e.child,null,n),e=Ys(t,t.pendingProps),e.flags|=2,mt(t),t.memoizedState=null,e}function F2(e,t,n){var l=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(re){if(l.mode==="hidden")return e=Ys(t,l),t.lanes=536870912,ii(null,e);if(Vo(t),(e=je)?(e=xg(e,Mt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:In!==null?{id:Qt,overflow:Xt}:null,retryLane:536870912,hydrationErrors:null},n=T0(e),n.return=t,t.child=n,$e=t,je=null)):e=null,e===null)throw ea(t);return t.lanes=536870912,null}return Ys(t,l)}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(Vo(t),i)if(t.flags&256)t.flags&=-257,t=Bf(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(R(558));else if(Le||Dl(e,t,n,!1),i=(n&e.childLanes)!==0,Le||i){if(l=ye,l!==null&&(c=l0(l,n),c!==0&&c!==s.retryLane))throw s.retryLane=c,ka(e,c),ct(l,e,c),lu;yc(),t=Bf(e,t,n)}else e=s.treeContext,je=Tt(c.nextSibling),$e=t,re=!0,Qn=null,Mt=!1,e!==null&&O0(t,e),t=Ys(t,l),t.flags|=4096;return t}return e=gn(e.child,{mode:l.mode,children:l.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Qs(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(R(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Zo(e,t,n,l,i){return ba(t),n=Xd(e,t,n,l,void 0,i),l=Kd(),e!==null&&!Le?($d(e,t,i),jn(e,t,i)):(re&&l&&Hd(t),t.flags|=1,Xe(e,t,n,i),t.child)}function zf(e,t,n,l,i,s){return ba(t),t.updateQueue=null,n=Y0(t,l,n,i),V0(e),l=Kd(),e!==null&&!Le?($d(e,t,s),jn(e,t,s)):(re&&l&&Hd(t),t.flags|=1,Xe(e,t,n,s),t.child)}function Lf(e,t,n,l,i){if(ba(t),t.stateNode===null){var s=nl,c=n.contextType;typeof c=="object"&&c!==null&&(s=Ze(c)),s=new n(l,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Ko,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=l,s.state=t.memoizedState,s.refs={},Vd(t),c=n.contextType,s.context=typeof c=="object"&&c!==null?Ze(c):nl,s.state=t.memoizedState,c=n.getDerivedStateFromProps,typeof c=="function"&&(Qr(t,n,c,l),s.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(c=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),c!==s.state&&Ko.enqueueReplaceState(s,s.state,null),fi(t,l,s,i),mi(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,r=Sa(n,o);s.props=r;var d=s.context,h=n.contextType;c=nl,typeof h=="object"&&h!==null&&(c=Ze(h));var p=n.getDerivedStateFromProps;h=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||d!==c)&&Mf(t,s,l,c),On=!1;var f=t.memoizedState;s.state=f,fi(t,l,s,i),mi(),d=t.memoizedState,o||f!==d||On?(typeof p=="function"&&(Qr(t,n,p,l),d=t.memoizedState),(r=On||kf(t,n,r,l,f,d,c))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=d),s.props=l,s.state=d,s.context=c,l=r):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{s=t.stateNode,Go(e,t),c=t.memoizedProps,h=Sa(n,c),s.props=h,p=t.pendingProps,f=s.context,d=n.contextType,r=nl,typeof d=="object"&&d!==null&&(r=Ze(d)),o=n.getDerivedStateFromProps,(d=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(c!==p||f!==r)&&Mf(t,s,l,r),On=!1,f=t.memoizedState,s.state=f,fi(t,l,s,i),mi();var x=t.memoizedState;c!==p||f!==x||On||e!==null&&e.dependencies!==null&&cc(e.dependencies)?(typeof o=="function"&&(Qr(t,n,o,l),x=t.memoizedState),(h=On||kf(t,n,h,l,f,x,r)||e!==null&&e.dependencies!==null&&cc(e.dependencies))?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(l,x,r),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(l,x,r)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||c===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=x),s.props=l,s.state=x,s.context=r,l=h):(typeof s.componentDidUpdate!="function"||c===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),l=!1)}return s=l,Qs(e,t),l=(t.flags&128)!==0,s||l?(s=t.stateNode,n=l&&typeof n.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&l?(t.child=ja(t,e.child,null,i),t.child=ja(t,null,n,i)):Xe(e,t,n,i),t.memoizedState=s.state,e=t.child):e=jn(e,t,i),e}function Hf(e,t,n,l){return _a(),t.flags|=256,Xe(e,t,n,l),t.child}var Xr={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Kr(e){return{baseLanes:e,cachePool:z0()}}function $r(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=pt),e}function D1(e,t,n){var l=t.pendingProps,i=!1,s=(t.flags&128)!==0,c;if((c=s)||(c=e!==null&&e.memoizedState===null?!1:(Me.current&2)!==0),c&&(i=!0,t.flags&=-129),c=(t.flags&32)!==0,t.flags&=-33,e===null){if(re){if(i?zn(t):Ln(),(e=je)?(e=xg(e,Mt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:In!==null?{id:Qt,overflow:Xt}:null,retryLane:536870912,hydrationErrors:null},n=T0(e),n.return=t,t.child=n,$e=t,je=null)):e=null,e===null)throw ea(t);return od(e)?t.lanes=32:t.lanes=536870912,null}var o=l.children;return l=l.fallback,i?(Ln(),i=t.mode,o=fc({mode:"hidden",children:o},i),l=ga(l,i,n,null),o.return=t,l.return=t,o.sibling=l,t.child=o,l=t.child,l.memoizedState=Kr(n),l.childLanes=$r(e,c,n),t.memoizedState=Xr,ii(null,l)):(zn(t),Jo(t,o))}var r=e.memoizedState;if(r!==null&&(o=r.dehydrated,o!==null)){if(s)t.flags&256?(zn(t),t.flags&=-257,t=Zr(e,t,n)):t.memoizedState!==null?(Ln(),t.child=e.child,t.flags|=128,t=null):(Ln(),o=l.fallback,i=t.mode,l=fc({mode:"visible",children:l.children},i),o=ga(o,i,n,null),o.flags|=2,l.return=t,o.return=t,l.sibling=o,t.child=l,ja(t,e.child,null,n),l=t.child,l.memoizedState=Kr(n),l.childLanes=$r(e,c,n),t.memoizedState=Xr,t=ii(null,l));else if(zn(t),od(o)){if(c=o.nextSibling&&o.nextSibling.dataset,c)var d=c.dgst;c=d,l=Error(R(419)),l.stack="",l.digest=c,Ci({value:l,source:null,stack:null}),t=Zr(e,t,n)}else if(Le||Dl(e,t,n,!1),c=(n&e.childLanes)!==0,Le||c){if(c=ye,c!==null&&(l=l0(c,n),l!==0&&l!==r.retryLane))throw r.retryLane=l,ka(e,l),ct(c,e,l),lu;rd(o)||yc(),t=Zr(e,t,n)}else rd(o)?(t.flags|=192,t.child=e.child,t=null):(e=r.treeContext,je=Tt(o.nextSibling),$e=t,re=!0,Qn=null,Mt=!1,e!==null&&O0(t,e),t=Jo(t,l.children),t.flags|=4096);return t}return i?(Ln(),o=l.fallback,i=t.mode,r=e.child,d=r.sibling,l=gn(r,{mode:"hidden",children:l.children}),l.subtreeFlags=r.subtreeFlags&65011712,d!==null?o=gn(d,o):(o=ga(o,i,n,null),o.flags|=2),o.return=t,l.return=t,l.sibling=o,t.child=l,ii(null,l),l=t.child,o=e.child.memoizedState,o===null?o=Kr(n):(i=o.cachePool,i!==null?(r=ze._currentValue,i=i.parent!==r?{parent:r,pool:r}:i):i=z0(),o={baseLanes:o.baseLanes|n,cachePool:i}),l.memoizedState=o,l.childLanes=$r(e,c,n),t.memoizedState=Xr,ii(e.child,l)):(zn(t),n=e.child,e=n.sibling,n=gn(n,{mode:"visible",children:l.children}),n.return=t,n.sibling=null,e!==null&&(c=t.deletions,c===null?(t.deletions=[e],t.flags|=16):c.push(e)),t.child=n,t.memoizedState=null,n)}function Jo(e,t){return t=fc({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function fc(e,t){return e=ft(22,e,null,t),e.lanes=0,e}function Zr(e,t,n){return ja(t,e.child,null,n),e=Jo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Uf(e,t,n){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Lo(e.return,t,n)}function Jr(e,t,n,l,i,s){var c=e.memoizedState;c===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:n,tailMode:i,treeForkCount:s}:(c.isBackwards=t,c.rendering=null,c.renderingStartTime=0,c.last=l,c.tail=n,c.tailMode=i,c.treeForkCount=s)}function k1(e,t,n){var l=t.pendingProps,i=l.revealOrder,s=l.tail;l=l.children;var c=Me.current,o=(c&2)!==0;if(o?(c=c&1|2,t.flags|=128):c&=1,xe(Me,c),Xe(e,t,l,n),l=re?wi:0,!o&&e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Uf(e,n,t);else if(e.tag===19)Uf(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&dc(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Jr(t,!1,i,n,s,l);break;case"backwards":case"unstable_legacy-backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&dc(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Jr(t,!0,n,null,s,l);break;case"together":Jr(t,!1,null,null,void 0,l);break;default:t.memoizedState=null}return t.child}function jn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),na|=t.lanes,!(n&t.childLanes))if(e!==null){if(Dl(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,n=gn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=gn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function iu(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&cc(e)))}function W2(e,t,n){switch(t.tag){case 3:ec(t,t.stateNode.containerInfo),Bn(t,ze,e.memoizedState.cache),_a();break;case 27:case 5:So(t);break;case 4:ec(t,t.stateNode.containerInfo);break;case 10:Bn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Vo(t),null;break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(zn(t),t.flags|=128,null):n&t.child.childLanes?D1(e,t,n):(zn(t),e=jn(e,t,n),e!==null?e.sibling:null);zn(t);break;case 19:var i=(e.flags&128)!==0;if(l=(n&t.childLanes)!==0,l||(Dl(e,t,n,!1),l=(n&t.childLanes)!==0),i){if(l)return k1(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),xe(Me,Me.current),l)break;return null;case 22:return t.lanes=0,E1(e,t,n,t.pendingProps);case 24:Bn(t,ze,e.memoizedState.cache)}return jn(e,t,n)}function M1(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Le=!0;else{if(!iu(e,n)&&!(t.flags&128))return Le=!1,W2(e,t,n);Le=!!(e.flags&131072)}else Le=!1,re&&t.flags&1048576&&R0(t,wi,t.index);switch(t.lanes=0,t.tag){case 16:e:{var l=t.pendingProps;if(e=ma(t.elementType),t.type=e,typeof e=="function")Ld(e)?(l=Sa(e,l),t.tag=1,t=Lf(null,t,e,l,n)):(t.tag=0,t=Zo(null,t,e,l,n));else{if(e!=null){var i=e.$$typeof;if(i===Nd){t.tag=11,t=Tf(null,t,e,l,n);break e}else if(i===Sd){t.tag=14,t=Rf(null,t,e,l,n);break e}}throw t=jo(e)||e,Error(R(306,t,""))}}return t;case 0:return Zo(e,t,t.type,t.pendingProps,n);case 1:return l=t.type,i=Sa(l,t.pendingProps),Lf(e,t,l,i,n);case 3:e:{if(ec(t,t.stateNode.containerInfo),e===null)throw Error(R(387));l=t.pendingProps;var s=t.memoizedState;i=s.element,Go(e,t),fi(t,l,null,n);var c=t.memoizedState;if(l=c.cache,Bn(t,ze,l),l!==s.cache&&Ho(t,[ze],n,!0),mi(),l=c.element,s.isDehydrated)if(s={element:l,isDehydrated:!1,cache:c.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=Hf(e,t,l,n);break e}else if(l!==i){i=kt(Error(R(424)),t),Ci(i),t=Hf(e,t,l,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(je=Tt(e.firstChild),$e=t,re=!0,Qn=null,Mt=!0,n=U0(t,null,l,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(_a(),l===i){t=jn(e,t,n);break e}Xe(e,t,l,n)}t=t.child}return t;case 26:return Qs(e,t),e===null?(n=ip(t.type,null,t.pendingProps,null))?t.memoizedState=n:re||(n=t.type,e=t.pendingProps,l=jc(Yn.current).createElement(n),l[Ke]=t,l[rt]=e,Je(l,n,e),Ve(l),t.stateNode=l):t.memoizedState=ip(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return So(t),e===null&&re&&(l=t.stateNode=_g(t.type,t.pendingProps,Yn.current),$e=t,Mt=!0,i=je,la(t.type)?(dd=i,je=Tt(l.firstChild)):je=i),Xe(e,t,t.pendingProps.children,n),Qs(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&re&&((i=l=je)&&(l=Dx(l,t.type,t.pendingProps,Mt),l!==null?(t.stateNode=l,$e=t,je=Tt(l.firstChild),Mt=!1,i=!0):i=!1),i||ea(t)),So(t),i=t.type,s=t.pendingProps,c=e!==null?e.memoizedProps:null,l=s.children,sd(i,s)?l=null:c!==null&&sd(i,c)&&(t.flags|=32),t.memoizedState!==null&&(i=Xd(e,t,V2,null,null,n),Ti._currentValue=i),Qs(e,t),Xe(e,t,l,n),t.child;case 6:return e===null&&re&&((e=n=je)&&(n=kx(n,t.pendingProps,Mt),n!==null?(t.stateNode=n,$e=t,je=null,e=!0):e=!1),e||ea(t)),null;case 13:return D1(e,t,n);case 4:return ec(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=ja(t,null,l,n):Xe(e,t,l,n),t.child;case 11:return Tf(e,t,t.type,t.pendingProps,n);case 7:return Xe(e,t,t.pendingProps,n),t.child;case 8:return Xe(e,t,t.pendingProps.children,n),t.child;case 12:return Xe(e,t,t.pendingProps.children,n),t.child;case 10:return l=t.pendingProps,Bn(t,t.type,l.value),Xe(e,t,l.children,n),t.child;case 9:return i=t.type._context,l=t.pendingProps.children,ba(t),i=Ze(i),l=l(i),t.flags|=1,Xe(e,t,l,n),t.child;case 14:return Rf(e,t,t.type,t.pendingProps,n);case 15:return C1(e,t,t.type,t.pendingProps,n);case 19:return k1(e,t,n);case 31:return F2(e,t,n);case 22:return E1(e,t,n,t.pendingProps);case 24:return ba(t),l=Ze(ze),e===null?(i=Pd(),i===null&&(i=ye,s=Gd(),i.pooledCache=s,s.refCount++,s!==null&&(i.pooledCacheLanes|=n),i=s),t.memoizedState={parent:l,cache:i},Vd(t),Bn(t,ze,i)):(e.lanes&n&&(Go(e,t),fi(t,null,null,n),mi()),i=e.memoizedState,s=t.memoizedState,i.parent!==l?(i={parent:l,cache:l},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),Bn(t,ze,l)):(l=s.cache,Bn(t,ze,l),l!==i.cache&&Ho(t,[ze],n,!0))),Xe(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(R(156,t.tag))}function sn(e){e.flags|=4}function Fr(e,t,n,l,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(eg())e.flags|=8192;else throw ya=rc,qd}else e.flags&=-16777217}function Gf(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ng(t))if(eg())e.flags|=8192;else throw ya=rc,qd}function Ds(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?t0():536870912,e.lanes|=t,_l|=t)}function Wl(e,t){if(!re)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function be(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,l=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,l|=i.subtreeFlags&65011712,l|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,l|=i.subtreeFlags,l|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=l,e.childLanes=n,t}function I2(e,t,n){var l=t.pendingProps;switch(Ud(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return be(t),null;case 1:return be(t),null;case 3:return n=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),vn(ze),fl(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Va(t)?sn(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,qr())),be(t),null;case 26:var i=t.type,s=t.memoizedState;return e===null?(sn(t),s!==null?(be(t),Gf(t,s)):(be(t),Fr(t,i,null,l,n))):s?s!==e.memoizedState?(sn(t),be(t),Gf(t,s)):(be(t),t.flags&=-16777217):(e=e.memoizedProps,e!==l&&sn(t),be(t),Fr(t,i,e,l,n)),null;case 27:if(tc(t),n=Yn.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&sn(t);else{if(!l){if(t.stateNode===null)throw Error(R(166));return be(t),null}e=$t.current,Va(t)?pf(t):(e=_g(i,l,n),t.stateNode=e,sn(t))}return be(t),null;case 5:if(tc(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&sn(t);else{if(!l){if(t.stateNode===null)throw Error(R(166));return be(t),null}if(s=$t.current,Va(t))pf(t);else{var c=jc(Yn.current);switch(s){case 1:s=c.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:s=c.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":s=c.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":s=c.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":s=c.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof l.is=="string"?c.createElement("select",{is:l.is}):c.createElement("select"),l.multiple?s.multiple=!0:l.size&&(s.size=l.size);break;default:s=typeof l.is=="string"?c.createElement(i,{is:l.is}):c.createElement(i)}}s[Ke]=t,s[rt]=l;e:for(c=t.child;c!==null;){if(c.tag===5||c.tag===6)s.appendChild(c.stateNode);else if(c.tag!==4&&c.tag!==27&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===t)break e;for(;c.sibling===null;){if(c.return===null||c.return===t)break e;c=c.return}c.sibling.return=c.return,c=c.sibling}t.stateNode=s;e:switch(Je(s,i,l),i){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&sn(t)}}return be(t),Fr(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&sn(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(R(166));if(e=Yn.current,Va(t)){if(e=t.stateNode,n=t.memoizedProps,l=null,i=$e,i!==null)switch(i.tag){case 27:case 5:l=i.memoizedProps}e[Ke]=t,e=!!(e.nodeValue===n||l!==null&&l.suppressHydrationWarning===!0||gg(e.nodeValue,n)),e||ea(t,!0)}else e=jc(e).createTextNode(l),e[Ke]=t,t.stateNode=e}return be(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(l=Va(t),n!==null){if(e===null){if(!l)throw Error(R(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(557));e[Ke]=t}else _a(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;be(t),e=!1}else n=qr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(mt(t),t):(mt(t),null);if(t.flags&128)throw Error(R(558))}return be(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Va(t),l!==null&&l.dehydrated!==null){if(e===null){if(!i)throw Error(R(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(R(317));i[Ke]=t}else _a(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;be(t),i=!1}else i=qr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(mt(t),t):(mt(t),null)}return mt(t),t.flags&128?(t.lanes=n,t):(n=l!==null,e=e!==null&&e.memoizedState!==null,n&&(l=t.child,i=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(i=l.alternate.memoizedState.cachePool.pool),s=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(s=l.memoizedState.cachePool.pool),s!==i&&(l.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ds(t,t.updateQueue),be(t),null);case 4:return fl(),e===null&&hu(t.stateNode.containerInfo),be(t),null;case 10:return vn(t.type),be(t),null;case 19:if(Ye(Me),l=t.memoizedState,l===null)return be(t),null;if(i=(t.flags&128)!==0,s=l.rendering,s===null)if(i)Wl(l,!1);else{if(ke!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=dc(e),s!==null){for(t.flags|=128,Wl(l,!1),e=s.updateQueue,t.updateQueue=e,Ds(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)A0(n,e),n=n.sibling;return xe(Me,Me.current&1|2),re&&un(t,l.treeForkCount),t.child}e=e.sibling}l.tail!==null&&gt()>gc&&(t.flags|=128,i=!0,Wl(l,!1),t.lanes=4194304)}else{if(!i)if(e=dc(s),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,Ds(t,e),Wl(l,!0),l.tail===null&&l.tailMode==="hidden"&&!s.alternate&&!re)return be(t),null}else 2*gt()-l.renderingStartTime>gc&&n!==536870912&&(t.flags|=128,i=!0,Wl(l,!1),t.lanes=4194304);l.isBackwards?(s.sibling=t.child,t.child=s):(e=l.last,e!==null?e.sibling=s:t.child=s,l.last=s)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=gt(),e.sibling=null,n=Me.current,xe(Me,i?n&1|2:n&1),re&&un(t,l.treeForkCount),e):(be(t),null);case 22:case 23:return mt(t),Yd(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?n&536870912&&!(t.flags&128)&&(be(t),t.subtreeFlags&6&&(t.flags|=8192)):be(t),n=t.updateQueue,n!==null&&Ds(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==n&&(t.flags|=2048),e!==null&&Ye(va),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),vn(ze),be(t),null;case 25:return null;case 30:return null}throw Error(R(156,t.tag))}function ex(e,t){switch(Ud(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return vn(ze),fl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return tc(t),null;case 31:if(t.memoizedState!==null){if(mt(t),t.alternate===null)throw Error(R(340));_a()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(mt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));_a()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ye(Me),null;case 4:return fl(),null;case 10:return vn(t.type),null;case 22:case 23:return mt(t),Yd(),e!==null&&Ye(va),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return vn(ze),null;case 25:return null;default:return null}}function A1(e,t){switch(Ud(t),t.tag){case 3:vn(ze),fl();break;case 26:case 27:case 5:tc(t);break;case 4:fl();break;case 31:t.memoizedState!==null&&mt(t);break;case 13:mt(t);break;case 19:Ye(Me);break;case 10:vn(t.type);break;case 22:case 23:mt(t),Yd(),e!==null&&Ye(va);break;case 24:vn(ze)}}function Yi(e,t){try{var n=t.updateQueue,l=n!==null?n.lastEffect:null;if(l!==null){var i=l.next;n=i;do{if((n.tag&e)===e){l=void 0;var s=n.create,c=n.inst;l=s(),c.destroy=l}n=n.next}while(n!==i)}}catch(o){fe(t,t.return,o)}}function ta(e,t,n){try{var l=t.updateQueue,i=l!==null?l.lastEffect:null;if(i!==null){var s=i.next;l=s;do{if((l.tag&e)===e){var c=l.inst,o=c.destroy;if(o!==void 0){c.destroy=void 0,i=t;var r=n,d=o;try{d()}catch(h){fe(i,r,h)}}}l=l.next}while(l!==s)}}catch(h){fe(t,t.return,h)}}function T1(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{P0(t,n)}catch(l){fe(e,e.return,l)}}}function R1(e,t,n){n.props=Sa(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(l){fe(e,t,l)}}function gi(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof n=="function"?e.refCleanup=n(l):n.current=l}}catch(i){fe(e,t,i)}}function Kt(e,t){var n=e.ref,l=e.refCleanup;if(n!==null)if(typeof l=="function")try{l()}catch(i){fe(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(i){fe(e,t,i)}else n.current=null}function O1(e){var t=e.type,n=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&l.focus();break e;case"img":n.src?l.src=n.src:n.srcSet&&(l.srcset=n.srcSet)}}catch(i){fe(e,e.return,i)}}function Wr(e,t,n){try{var l=e.stateNode;jx(l,e.type,n,t),l[rt]=t}catch(i){fe(e,e.return,i)}}function B1(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&la(e.type)||e.tag===4}function Ir(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||B1(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&la(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fo(e,t,n){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=fn));else if(l!==4&&(l===27&&la(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Fo(e,t,n),e=e.sibling;e!==null;)Fo(e,t,n),e=e.sibling}function pc(e,t,n){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(l!==4&&(l===27&&la(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(pc(e,t,n),e=e.sibling;e!==null;)pc(e,t,n),e=e.sibling}function z1(e){var t=e.stateNode,n=e.memoizedProps;try{for(var l=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Je(t,l,n),t[Ke]=e,t[rt]=n}catch(s){fe(e,e.return,s)}}var hn=!1,Be=!1,eo=!1,Pf=typeof WeakSet=="function"?WeakSet:Set,qe=null;function tx(e,t){if(e=e.containerInfo,ld=Cc,e=N0(e),Od(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var l=n.getSelection&&n.getSelection();if(l&&l.rangeCount!==0){n=l.anchorNode;var i=l.anchorOffset,s=l.focusNode;l=l.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var c=0,o=-1,r=-1,d=0,h=0,p=e,f=null;t:for(;;){for(var x;p!==n||i!==0&&p.nodeType!==3||(o=c+i),p!==s||l!==0&&p.nodeType!==3||(r=c+l),p.nodeType===3&&(c+=p.nodeValue.length),(x=p.firstChild)!==null;)f=p,p=x;for(;;){if(p===e)break t;if(f===n&&++d===i&&(o=c),f===s&&++h===l&&(r=c),(x=p.nextSibling)!==null)break;p=f,f=p.parentNode}p=x}n=o===-1||r===-1?null:{start:o,end:r}}else n=null}n=n||{start:0,end:0}}else n=null;for(id={focusedElem:e,selectionRange:n},Cc=!1,qe=t;qe!==null;)if(t=qe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,qe=e;else for(;qe!==null;){switch(t=qe,s=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&s!==null){e=void 0,n=t,i=s.memoizedProps,s=s.memoizedState,l=n.stateNode;try{var C=Sa(n.type,i);e=l.getSnapshotBeforeUpdate(C,s),l.__reactInternalSnapshotBeforeUpdate=e}catch(k){fe(n,n.return,k)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)cd(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":cd(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(R(163))}if(e=t.sibling,e!==null){e.return=t.return,qe=e;break}qe=t.return}}function L1(e,t,n){var l=n.flags;switch(n.tag){case 0:case 11:case 15:rn(e,n),l&4&&Yi(5,n);break;case 1:if(rn(e,n),l&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(c){fe(n,n.return,c)}else{var i=Sa(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(c){fe(n,n.return,c)}}l&64&&T1(n),l&512&&gi(n,n.return);break;case 3:if(rn(e,n),l&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{P0(e,t)}catch(c){fe(n,n.return,c)}}break;case 27:t===null&&l&4&&z1(n);case 26:case 5:rn(e,n),t===null&&l&4&&O1(n),l&512&&gi(n,n.return);break;case 12:rn(e,n);break;case 31:rn(e,n),l&4&&G1(e,n);break;case 13:rn(e,n),l&4&&P1(e,n),l&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=dx.bind(null,n),Mx(e,n))));break;case 22:if(l=n.memoizedState!==null||hn,!l){t=t!==null&&t.memoizedState!==null||Be,i=hn;var s=Be;hn=l,(Be=t)&&!s?on(e,n,(n.subtreeFlags&8772)!==0):rn(e,n),hn=i,Be=s}break;case 30:break;default:rn(e,n)}}function H1(e){var t=e.alternate;t!==null&&(e.alternate=null,H1(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Dd(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var we=null,it=!1;function cn(e,t,n){for(n=n.child;n!==null;)U1(e,t,n),n=n.sibling}function U1(e,t,n){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(Li,n)}catch{}switch(n.tag){case 26:Be||Kt(n,t),cn(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Be||Kt(n,t);var l=we,i=it;la(n.type)&&(we=n.stateNode,it=!1),cn(e,t,n),_i(n.stateNode),we=l,it=i;break;case 5:Be||Kt(n,t);case 6:if(l=we,i=it,we=null,cn(e,t,n),we=l,it=i,we!==null)if(it)try{(we.nodeType===9?we.body:we.nodeName==="HTML"?we.ownerDocument.body:we).removeChild(n.stateNode)}catch(s){fe(n,t,s)}else try{we.removeChild(n.stateNode)}catch(s){fe(n,t,s)}break;case 18:we!==null&&(it?(e=we,ep(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Sl(e)):ep(we,n.stateNode));break;case 4:l=we,i=it,we=n.stateNode.containerInfo,it=!0,cn(e,t,n),we=l,it=i;break;case 0:case 11:case 14:case 15:ta(2,n,t),Be||ta(4,n,t),cn(e,t,n);break;case 1:Be||(Kt(n,t),l=n.stateNode,typeof l.componentWillUnmount=="function"&&R1(n,t,l)),cn(e,t,n);break;case 21:cn(e,t,n);break;case 22:Be=(l=Be)||n.memoizedState!==null,cn(e,t,n),Be=l;break;default:cn(e,t,n)}}function G1(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Sl(e)}catch(n){fe(t,t.return,n)}}}function P1(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Sl(e)}catch(n){fe(t,t.return,n)}}function nx(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Pf),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Pf),t;default:throw Error(R(435,e.tag))}}function ks(e,t){var n=nx(e);t.forEach(function(l){if(!n.has(l)){n.add(l);var i=ux.bind(null,e,l);l.then(i,i)}})}function at(e,t){var n=t.deletions;if(n!==null)for(var l=0;l<n.length;l++){var i=n[l],s=e,c=t,o=c;e:for(;o!==null;){switch(o.tag){case 27:if(la(o.type)){we=o.stateNode,it=!1;break e}break;case 5:we=o.stateNode,it=!1;break e;case 3:case 4:we=o.stateNode.containerInfo,it=!0;break e}o=o.return}if(we===null)throw Error(R(160));U1(s,c,i),we=null,it=!1,s=i.alternate,s!==null&&(s.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)q1(t,e),t=t.sibling}var zt=null;function q1(e,t){var n=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:at(t,e),lt(e),l&4&&(ta(3,e,e.return),Yi(3,e),ta(5,e,e.return));break;case 1:at(t,e),lt(e),l&512&&(Be||n===null||Kt(n,n.return)),l&64&&hn&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?l:n.concat(l))));break;case 26:var i=zt;if(at(t,e),lt(e),l&512&&(Be||n===null||Kt(n,n.return)),l&4){var s=n!==null?n.memoizedState:null;if(l=e.memoizedState,n===null)if(l===null)if(e.stateNode===null){e:{l=e.type,n=e.memoizedProps,i=i.ownerDocument||i;t:switch(l){case"title":s=i.getElementsByTagName("title")[0],(!s||s[Gi]||s[Ke]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=i.createElement(l),i.head.insertBefore(s,i.querySelector("head > title"))),Je(s,l,n),s[Ke]=e,Ve(s),l=s;break e;case"link":var c=cp("link","href",i).get(l+(n.href||""));if(c){for(var o=0;o<c.length;o++)if(s=c[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){c.splice(o,1);break t}}s=i.createElement(l),Je(s,l,n),i.head.appendChild(s);break;case"meta":if(c=cp("meta","content",i).get(l+(n.content||""))){for(o=0;o<c.length;o++)if(s=c[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){c.splice(o,1);break t}}s=i.createElement(l),Je(s,l,n),i.head.appendChild(s);break;default:throw Error(R(468,l))}s[Ke]=e,Ve(s),l=s}e.stateNode=l}else rp(i,e.type,e.stateNode);else e.stateNode=sp(i,l,e.memoizedProps);else s!==l?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,l===null?rp(i,e.type,e.stateNode):sp(i,l,e.memoizedProps)):l===null&&e.stateNode!==null&&Wr(e,e.memoizedProps,n.memoizedProps)}break;case 27:at(t,e),lt(e),l&512&&(Be||n===null||Kt(n,n.return)),n!==null&&l&4&&Wr(e,e.memoizedProps,n.memoizedProps);break;case 5:if(at(t,e),lt(e),l&512&&(Be||n===null||Kt(n,n.return)),e.flags&32){i=e.stateNode;try{gl(i,"")}catch(C){fe(e,e.return,C)}}l&4&&e.stateNode!=null&&(i=e.memoizedProps,Wr(e,i,n!==null?n.memoizedProps:i)),l&1024&&(eo=!0);break;case 6:if(at(t,e),lt(e),l&4){if(e.stateNode===null)throw Error(R(162));l=e.memoizedProps,n=e.stateNode;try{n.nodeValue=l}catch(C){fe(e,e.return,C)}}break;case 3:if($s=null,i=zt,zt=Nc(t.containerInfo),at(t,e),zt=i,lt(e),l&4&&n!==null&&n.memoizedState.isDehydrated)try{Sl(t.containerInfo)}catch(C){fe(e,e.return,C)}eo&&(eo=!1,V1(e));break;case 4:l=zt,zt=Nc(e.stateNode.containerInfo),at(t,e),lt(e),zt=l;break;case 12:at(t,e),lt(e);break;case 31:at(t,e),lt(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ks(e,l)));break;case 13:at(t,e),lt(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Qc=gt()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ks(e,l)));break;case 22:i=e.memoizedState!==null;var r=n!==null&&n.memoizedState!==null,d=hn,h=Be;if(hn=d||i,Be=h||r,at(t,e),Be=h,hn=d,lt(e),l&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||r||hn||Be||fa(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){r=n=t;try{if(s=r.stateNode,i)c=s.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none";else{o=r.stateNode;var p=r.memoizedProps.style,f=p!=null&&p.hasOwnProperty("display")?p.display:null;o.style.display=f==null||typeof f=="boolean"?"":(""+f).trim()}}catch(C){fe(r,r.return,C)}}}else if(t.tag===6){if(n===null){r=t;try{r.stateNode.nodeValue=i?"":r.memoizedProps}catch(C){fe(r,r.return,C)}}}else if(t.tag===18){if(n===null){r=t;try{var x=r.stateNode;i?tp(x,!0):tp(r.stateNode,!1)}catch(C){fe(r,r.return,C)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(n=l.retryQueue,n!==null&&(l.retryQueue=null,ks(e,n))));break;case 19:at(t,e),lt(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ks(e,l)));break;case 30:break;case 21:break;default:at(t,e),lt(e)}}function lt(e){var t=e.flags;if(t&2){try{for(var n,l=e.return;l!==null;){if(B1(l)){n=l;break}l=l.return}if(n==null)throw Error(R(160));switch(n.tag){case 27:var i=n.stateNode,s=Ir(e);pc(e,s,i);break;case 5:var c=n.stateNode;n.flags&32&&(gl(c,""),n.flags&=-33);var o=Ir(e);pc(e,o,c);break;case 3:case 4:var r=n.stateNode.containerInfo,d=Ir(e);Fo(e,d,r);break;default:throw Error(R(161))}}catch(h){fe(e,e.return,h)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function V1(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;V1(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function rn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)L1(e,t.alternate,t),t=t.sibling}function fa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:ta(4,t,t.return),fa(t);break;case 1:Kt(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&R1(t,t.return,n),fa(t);break;case 27:_i(t.stateNode);case 26:case 5:Kt(t,t.return),fa(t);break;case 22:t.memoizedState===null&&fa(t);break;case 30:fa(t);break;default:fa(t)}e=e.sibling}}function on(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,i=e,s=t,c=s.flags;switch(s.tag){case 0:case 11:case 15:on(i,s,n),Yi(4,s);break;case 1:if(on(i,s,n),l=s,i=l.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(d){fe(l,l.return,d)}if(l=s,i=l.updateQueue,i!==null){var o=l.stateNode;try{var r=i.shared.hiddenCallbacks;if(r!==null)for(i.shared.hiddenCallbacks=null,i=0;i<r.length;i++)G0(r[i],o)}catch(d){fe(l,l.return,d)}}n&&c&64&&T1(s),gi(s,s.return);break;case 27:z1(s);case 26:case 5:on(i,s,n),n&&l===null&&c&4&&O1(s),gi(s,s.return);break;case 12:on(i,s,n);break;case 31:on(i,s,n),n&&c&4&&G1(i,s);break;case 13:on(i,s,n),n&&c&4&&P1(i,s);break;case 22:s.memoizedState===null&&on(i,s,n),gi(s,s.return);break;case 30:break;default:on(i,s,n)}t=t.sibling}}function su(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&qi(n))}function cu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&qi(e))}function Bt(e,t,n,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Y1(e,t,n,l),t=t.sibling}function Y1(e,t,n,l){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Bt(e,t,n,l),i&2048&&Yi(9,t);break;case 1:Bt(e,t,n,l);break;case 3:Bt(e,t,n,l),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&qi(e)));break;case 12:if(i&2048){Bt(e,t,n,l),e=t.stateNode;try{var s=t.memoizedProps,c=s.id,o=s.onPostCommit;typeof o=="function"&&o(c,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(r){fe(t,t.return,r)}}else Bt(e,t,n,l);break;case 31:Bt(e,t,n,l);break;case 13:Bt(e,t,n,l);break;case 23:break;case 22:s=t.stateNode,c=t.alternate,t.memoizedState!==null?s._visibility&2?Bt(e,t,n,l):vi(e,t):s._visibility&2?Bt(e,t,n,l):(s._visibility|=2,Xa(e,t,n,l,(t.subtreeFlags&10256)!==0||!1)),i&2048&&su(c,t);break;case 24:Bt(e,t,n,l),i&2048&&cu(t.alternate,t);break;default:Bt(e,t,n,l)}}function Xa(e,t,n,l,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,c=t,o=n,r=l,d=c.flags;switch(c.tag){case 0:case 11:case 15:Xa(s,c,o,r,i),Yi(8,c);break;case 23:break;case 22:var h=c.stateNode;c.memoizedState!==null?h._visibility&2?Xa(s,c,o,r,i):vi(s,c):(h._visibility|=2,Xa(s,c,o,r,i)),i&&d&2048&&su(c.alternate,c);break;case 24:Xa(s,c,o,r,i),i&&d&2048&&cu(c.alternate,c);break;default:Xa(s,c,o,r,i)}t=t.sibling}}function vi(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,l=t,i=l.flags;switch(l.tag){case 22:vi(n,l),i&2048&&su(l.alternate,l);break;case 24:vi(n,l),i&2048&&cu(l.alternate,l);break;default:vi(n,l)}t=t.sibling}}var si=8192;function Ya(e,t,n){if(e.subtreeFlags&si)for(e=e.child;e!==null;)Q1(e,t,n),e=e.sibling}function Q1(e,t,n){switch(e.tag){case 26:Ya(e,t,n),e.flags&si&&e.memoizedState!==null&&qx(n,zt,e.memoizedState,e.memoizedProps);break;case 5:Ya(e,t,n);break;case 3:case 4:var l=zt;zt=Nc(e.stateNode.containerInfo),Ya(e,t,n),zt=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=si,si=16777216,Ya(e,t,n),si=l):Ya(e,t,n));break;default:Ya(e,t,n)}}function X1(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Il(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var l=t[n];qe=l,$1(l,e)}X1(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)K1(e),e=e.sibling}function K1(e){switch(e.tag){case 0:case 11:case 15:Il(e),e.flags&2048&&ta(9,e,e.return);break;case 3:Il(e);break;case 12:Il(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Xs(e)):Il(e);break;default:Il(e)}}function Xs(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var l=t[n];qe=l,$1(l,e)}X1(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ta(8,t,t.return),Xs(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Xs(t));break;default:Xs(t)}e=e.sibling}}function $1(e,t){for(;qe!==null;){var n=qe;switch(n.tag){case 0:case 11:case 15:ta(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var l=n.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:qi(n.memoizedState.cache)}if(l=n.child,l!==null)l.return=n,qe=l;else e:for(n=e;qe!==null;){l=qe;var i=l.sibling,s=l.return;if(H1(l),l===n){qe=null;break e}if(i!==null){i.return=s,qe=i;break e}qe=s}}}var ax={getCacheForType:function(e){var t=Ze(ze),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ze(ze).controller.signal}},lx=typeof WeakMap=="function"?WeakMap:Map,ue=0,ye=null,le=null,se=0,me=0,ht=null,Pn=!1,Ml=!1,ru=!1,Nn=0,ke=0,na=0,xa=0,ou=0,pt=0,_l=0,yi=null,st=null,Wo=!1,Qc=0,Z1=0,gc=1/0,vc=null,$n=null,Ue=0,Zn=null,bl=null,yn=0,Io=0,ed=null,J1=null,xi=0,td=null;function xt(){return ue&2&&se!==0?se&-se:X.T!==null?uu():i0()}function F1(){if(pt===0)if(!(se&536870912)||re){var e=bs;bs<<=1,!(bs&3932160)&&(bs=262144),pt=e}else pt=536870912;return e=bt.current,e!==null&&(e.flags|=32),pt}function ct(e,t,n){(e===ye&&(me===2||me===9)||e.cancelPendingCommit!==null)&&(jl(e,0),qn(e,se,pt,!1)),Ui(e,n),(!(ue&2)||e!==ye)&&(e===ye&&(!(ue&2)&&(xa|=n),ke===4&&qn(e,se,pt,!1)),Jt(e))}function W1(e,t,n){if(ue&6)throw Error(R(327));var l=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Hi(e,t),i=l?cx(e,t):to(e,t,!0),s=l;do{if(i===0){Ml&&!l&&qn(e,t,0,!1);break}else{if(n=e.current.alternate,s&&!ix(n)){i=to(e,t,!1),s=!1;continue}if(i===2){if(s=t,e.errorRecoveryDisabledLanes&s)var c=0;else c=e.pendingLanes&-536870913,c=c!==0?c:c&536870912?536870912:0;if(c!==0){t=c;e:{var o=e;i=yi;var r=o.current.memoizedState.isDehydrated;if(r&&(jl(o,c).flags|=256),c=to(o,c,!1),c!==2){if(ru&&!r){o.errorRecoveryDisabledLanes|=s,xa|=s,i=4;break e}s=st,st=i,s!==null&&(st===null?st=s:st.push.apply(st,s))}i=c}if(s=!1,i!==2)continue}}if(i===1){jl(e,0),qn(e,t,0,!0);break}e:{switch(l=e,s=i,s){case 0:case 1:throw Error(R(345));case 4:if((t&4194048)!==t)break;case 6:qn(l,t,pt,!Pn);break e;case 2:st=null;break;case 3:case 5:break;default:throw Error(R(329))}if((t&62914560)===t&&(i=Qc+300-gt(),10<i)){if(qn(l,t,pt,!Pn),Oc(l,0,!0)!==0)break e;yn=t,l.timeoutHandle=yg(qf.bind(null,l,n,st,vc,Wo,t,pt,xa,_l,Pn,s,"Throttled",-0,0),i);break e}qf(l,n,st,vc,Wo,t,pt,xa,_l,Pn,s,null,-0,0)}}break}while(1);Jt(e)}function qf(e,t,n,l,i,s,c,o,r,d,h,p,f,x){if(e.timeoutHandle=-1,p=t.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:fn},Q1(t,s,p);var C=(s&62914560)===s?Qc-gt():(s&4194048)===s?Z1-gt():0;if(C=Vx(p,C),C!==null){yn=s,e.cancelPendingCommit=C(Yf.bind(null,e,t,s,n,l,i,c,o,r,h,p,null,f,x)),qn(e,s,c,!d);return}}Yf(e,t,s,n,l,i,c,o,r)}function ix(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var l=0;l<n.length;l++){var i=n[l],s=i.getSnapshot;i=i.value;try{if(!_t(s(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function qn(e,t,n,l){t&=~ou,t&=~xa,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var i=t;0<i;){var s=31-yt(i),c=1<<s;l[s]=-1,i&=~c}n!==0&&n0(e,n,t)}function Xc(){return ue&6?!0:(Qi(0,!1),!1)}function du(){if(le!==null){if(me===0)var e=le.return;else e=le,pn=Ma=null,Zd(e),ul=null,Ei=0,e=le;for(;e!==null;)A1(e.alternate,e),e=e.return;le=null}}function jl(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,wx(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),yn=0,du(),ye=e,le=n=gn(e.current,null),se=t,me=0,ht=null,Pn=!1,Ml=Hi(e,t),ru=!1,_l=pt=ou=xa=na=ke=0,st=yi=null,Wo=!1,t&8&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var i=31-yt(l),s=1<<i;t|=e[i],l&=~s}return Nn=t,Hc(),n}function I1(e,t){W=null,X.H=ki,t===kl||t===Gc?(t=_f(),me=3):t===qd?(t=_f(),me=4):me=t===lu?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ht=t,le===null&&(ke=1,mc(e,kt(t,e.current)))}function eg(){var e=bt.current;return e===null?!0:(se&4194048)===se?At===null:(se&62914560)===se||se&536870912?e===At:!1}function tg(){var e=X.H;return X.H=ki,e===null?ki:e}function ng(){var e=X.A;return X.A=ax,e}function yc(){ke=4,Pn||(se&4194048)!==se&&bt.current!==null||(Ml=!0),!(na&134217727)&&!(xa&134217727)||ye===null||qn(ye,se,pt,!1)}function to(e,t,n){var l=ue;ue|=2;var i=tg(),s=ng();(ye!==e||se!==t)&&(vc=null,jl(e,t)),t=!1;var c=ke;e:do try{if(me!==0&&le!==null){var o=le,r=ht;switch(me){case 8:du(),c=6;break e;case 3:case 2:case 9:case 6:bt.current===null&&(t=!0);var d=me;if(me=0,ht=null,il(e,o,r,d),n&&Ml){c=0;break e}break;default:d=me,me=0,ht=null,il(e,o,r,d)}}sx(),c=ke;break}catch(h){I1(e,h)}while(1);return t&&e.shellSuspendCounter++,pn=Ma=null,ue=l,X.H=i,X.A=s,le===null&&(ye=null,se=0,Hc()),c}function sx(){for(;le!==null;)ag(le)}function cx(e,t){var n=ue;ue|=2;var l=tg(),i=ng();ye!==e||se!==t?(vc=null,gc=gt()+500,jl(e,t)):Ml=Hi(e,t);e:do try{if(me!==0&&le!==null){t=le;var s=ht;t:switch(me){case 1:me=0,ht=null,il(e,t,s,1);break;case 2:case 9:if(xf(s)){me=0,ht=null,Vf(t);break}t=function(){me!==2&&me!==9||ye!==e||(me=7),Jt(e)},s.then(t,t);break e;case 3:me=7;break e;case 4:me=5;break e;case 7:xf(s)?(me=0,ht=null,Vf(t)):(me=0,ht=null,il(e,t,s,7));break;case 5:var c=null;switch(le.tag){case 26:c=le.memoizedState;case 5:case 27:var o=le;if(c?Ng(c):o.stateNode.complete){me=0,ht=null;var r=o.sibling;if(r!==null)le=r;else{var d=o.return;d!==null?(le=d,Kc(d)):le=null}break t}}me=0,ht=null,il(e,t,s,5);break;case 6:me=0,ht=null,il(e,t,s,6);break;case 8:du(),ke=6;break e;default:throw Error(R(462))}}rx();break}catch(h){I1(e,h)}while(1);return pn=Ma=null,X.H=l,X.A=i,ue=n,le!==null?0:(ye=null,se=0,Hc(),ke)}function rx(){for(;le!==null&&!Ay();)ag(le)}function ag(e){var t=M1(e.alternate,e,Nn);e.memoizedProps=e.pendingProps,t===null?Kc(e):le=t}function Vf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=zf(n,t,t.pendingProps,t.type,void 0,se);break;case 11:t=zf(n,t,t.pendingProps,t.type.render,t.ref,se);break;case 5:Zd(t);default:A1(n,t),t=le=A0(t,Nn),t=M1(n,t,Nn)}e.memoizedProps=e.pendingProps,t===null?Kc(e):le=t}function il(e,t,n,l){pn=Ma=null,Zd(t),ul=null,Ei=0;var i=t.return;try{if(J2(e,i,t,n,se)){ke=1,mc(e,kt(n,e.current)),le=null;return}}catch(s){if(i!==null)throw le=i,s;ke=1,mc(e,kt(n,e.current)),le=null;return}t.flags&32768?(re||l===1?e=!0:Ml||se&536870912?e=!1:(Pn=e=!0,(l===2||l===9||l===3||l===6)&&(l=bt.current,l!==null&&l.tag===13&&(l.flags|=16384))),lg(t,e)):Kc(t)}function Kc(e){var t=e;do{if(t.flags&32768){lg(t,Pn);return}e=t.return;var n=I2(t.alternate,t,Nn);if(n!==null){le=n;return}if(t=t.sibling,t!==null){le=t;return}le=t=e}while(t!==null);ke===0&&(ke=5)}function lg(e,t){do{var n=ex(e.alternate,e);if(n!==null){n.flags&=32767,le=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){le=e;return}le=e=n}while(e!==null);ke=6,le=null}function Yf(e,t,n,l,i,s,c,o,r){e.cancelPendingCommit=null;do $c();while(Ue!==0);if(ue&6)throw Error(R(327));if(t!==null){if(t===e.current)throw Error(R(177));if(s=t.lanes|t.childLanes,s|=Bd,Py(e,n,s,c,o,r),e===ye&&(le=ye=null,se=0),bl=t,Zn=e,yn=n,Io=s,ed=i,J1=l,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,hx(nc,function(){return og(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,t.subtreeFlags&13878||l){l=X.T,X.T=null,i=he.p,he.p=2,c=ue,ue|=4;try{tx(e,t,n)}finally{ue=c,he.p=i,X.T=l}}Ue=1,ig(),sg(),cg()}}function ig(){if(Ue===1){Ue=0;var e=Zn,t=bl,n=(t.flags&13878)!==0;if(t.subtreeFlags&13878||n){n=X.T,X.T=null;var l=he.p;he.p=2;var i=ue;ue|=4;try{q1(t,e);var s=id,c=N0(e.containerInfo),o=s.focusedElem,r=s.selectionRange;if(c!==o&&o&&o.ownerDocument&&j0(o.ownerDocument.documentElement,o)){if(r!==null&&Od(o)){var d=r.start,h=r.end;if(h===void 0&&(h=d),"selectionStart"in o)o.selectionStart=d,o.selectionEnd=Math.min(h,o.value.length);else{var p=o.ownerDocument||document,f=p&&p.defaultView||window;if(f.getSelection){var x=f.getSelection(),C=o.textContent.length,k=Math.min(r.start,C),M=r.end===void 0?k:Math.min(r.end,C);!x.extend&&k>M&&(c=M,M=k,k=c);var v=hf(o,k),m=hf(o,M);if(v&&m&&(x.rangeCount!==1||x.anchorNode!==v.node||x.anchorOffset!==v.offset||x.focusNode!==m.node||x.focusOffset!==m.offset)){var _=p.createRange();_.setStart(v.node,v.offset),x.removeAllRanges(),k>M?(x.addRange(_),x.extend(m.node,m.offset)):(_.setEnd(m.node,m.offset),x.addRange(_))}}}}for(p=[],x=o;x=x.parentNode;)x.nodeType===1&&p.push({element:x,left:x.scrollLeft,top:x.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var w=p[o];w.element.scrollLeft=w.left,w.element.scrollTop=w.top}}Cc=!!ld,id=ld=null}finally{ue=i,he.p=l,X.T=n}}e.current=t,Ue=2}}function sg(){if(Ue===2){Ue=0;var e=Zn,t=bl,n=(t.flags&8772)!==0;if(t.subtreeFlags&8772||n){n=X.T,X.T=null;var l=he.p;he.p=2;var i=ue;ue|=4;try{L1(e,t.alternate,t)}finally{ue=i,he.p=l,X.T=n}}Ue=3}}function cg(){if(Ue===4||Ue===3){Ue=0,Ty();var e=Zn,t=bl,n=yn,l=J1;t.subtreeFlags&10256||t.flags&10256?Ue=5:(Ue=0,bl=Zn=null,rg(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&($n=null),Ed(n),t=t.stateNode,vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(Li,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=X.T,i=he.p,he.p=2,X.T=null;try{for(var s=e.onRecoverableError,c=0;c<l.length;c++){var o=l[c];s(o.value,{componentStack:o.stack})}}finally{X.T=t,he.p=i}}yn&3&&$c(),Jt(e),i=e.pendingLanes,n&261930&&i&42?e===td?xi++:(xi=0,td=e):xi=0,Qi(0,!1)}}function rg(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,qi(t)))}function $c(){return ig(),sg(),cg(),og()}function og(){if(Ue!==5)return!1;var e=Zn,t=Io;Io=0;var n=Ed(yn),l=X.T,i=he.p;try{he.p=32>n?32:n,X.T=null,n=ed,ed=null;var s=Zn,c=yn;if(Ue=0,bl=Zn=null,yn=0,ue&6)throw Error(R(331));var o=ue;if(ue|=4,K1(s.current),Y1(s,s.current,c,n),ue=o,Qi(0,!1),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(Li,s)}catch{}return!0}finally{he.p=i,X.T=l,rg(e,t)}}function Qf(e,t,n){t=kt(n,t),t=$o(e.stateNode,t,2),e=Kn(e,t,2),e!==null&&(Ui(e,2),Jt(e))}function fe(e,t,n){if(e.tag===3)Qf(e,e,n);else for(;t!==null;){if(t.tag===3){Qf(t,e,n);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&($n===null||!$n.has(l))){e=kt(n,e),n=S1(2),l=Kn(t,n,2),l!==null&&(w1(n,l,t,e),Ui(l,2),Jt(l));break}}t=t.return}}function no(e,t,n){var l=e.pingCache;if(l===null){l=e.pingCache=new lx;var i=new Set;l.set(t,i)}else i=l.get(t),i===void 0&&(i=new Set,l.set(t,i));i.has(n)||(ru=!0,i.add(n),e=ox.bind(null,e,t,n),t.then(e,e))}function ox(e,t,n){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,ye===e&&(se&n)===n&&(ke===4||ke===3&&(se&62914560)===se&&300>gt()-Qc?!(ue&2)&&jl(e,0):ou|=n,_l===se&&(_l=0)),Jt(e)}function dg(e,t){t===0&&(t=t0()),e=ka(e,t),e!==null&&(Ui(e,t),Jt(e))}function dx(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),dg(e,n)}function ux(e,t){var n=0;switch(e.tag){case 31:case 13:var l=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(R(314))}l!==null&&l.delete(t),dg(e,n)}function hx(e,t){return wd(e,t)}var xc=null,Ka=null,nd=!1,_c=!1,ao=!1,Vn=0;function Jt(e){e!==Ka&&e.next===null&&(Ka===null?xc=Ka=e:Ka=Ka.next=e),_c=!0,nd||(nd=!0,fx())}function Qi(e,t){if(!ao&&_c){ao=!0;do for(var n=!1,l=xc;l!==null;){if(!t)if(e!==0){var i=l.pendingLanes;if(i===0)var s=0;else{var c=l.suspendedLanes,o=l.pingedLanes;s=(1<<31-yt(42|e)+1)-1,s&=i&~(c&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,Xf(l,s))}else s=se,s=Oc(l,l===ye?s:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),!(s&3)||Hi(l,s)||(n=!0,Xf(l,s));l=l.next}while(n);ao=!1}}function mx(){ug()}function ug(){_c=nd=!1;var e=0;Vn!==0&&Sx()&&(e=Vn);for(var t=gt(),n=null,l=xc;l!==null;){var i=l.next,s=hg(l,t);s===0?(l.next=null,n===null?xc=i:n.next=i,i===null&&(Ka=n)):(n=l,(e!==0||s&3)&&(_c=!0)),l=i}Ue!==0&&Ue!==5||Qi(e,!1),Vn!==0&&(Vn=0)}function hg(e,t){for(var n=e.suspendedLanes,l=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var c=31-yt(s),o=1<<c,r=i[c];r===-1?(!(o&n)||o&l)&&(i[c]=Gy(o,t)):r<=t&&(e.expiredLanes|=o),s&=~o}if(t=ye,n=se,n=Oc(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,n===0||e===t&&(me===2||me===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Ar(l),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Hi(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(l!==null&&Ar(l),Ed(n)){case 2:case 8:n=Ip;break;case 32:n=nc;break;case 268435456:n=e0;break;default:n=nc}return l=mg.bind(null,e),n=wd(n,l),e.callbackPriority=t,e.callbackNode=n,t}return l!==null&&l!==null&&Ar(l),e.callbackPriority=2,e.callbackNode=null,2}function mg(e,t){if(Ue!==0&&Ue!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if($c()&&e.callbackNode!==n)return null;var l=se;return l=Oc(e,e===ye?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(W1(e,l,t),hg(e,gt()),e.callbackNode!=null&&e.callbackNode===n?mg.bind(null,e):null)}function Xf(e,t){if($c())return null;W1(e,t,!0)}function fx(){Cx(function(){ue&6?wd(Wp,mx):ug()})}function uu(){if(Vn===0){var e=vl;e===0&&(e=_s,_s<<=1,!(_s&261888)&&(_s=256)),Vn=e}return Vn}function Kf(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ls(""+e)}function $f(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function px(e,t,n,l,i){if(t==="submit"&&n&&n.stateNode===i){var s=Kf((i[rt]||null).action),c=l.submitter;c&&(t=(t=c[rt]||null)?Kf(t.formAction):c.getAttribute("formAction"),t!==null&&(s=t,c=null));var o=new Bc("action","action",null,l,i);e.push({event:o,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Vn!==0){var r=c?$f(i,c):new FormData(i);Xo(n,{pending:!0,data:r,method:i.method,action:s},null,r)}}else typeof s=="function"&&(o.preventDefault(),r=c?$f(i,c):new FormData(i),Xo(n,{pending:!0,data:r,method:i.method,action:s},s,r))},currentTarget:i}]})}}for(var lo=0;lo<Oo.length;lo++){var io=Oo[lo],gx=io.toLowerCase(),vx=io[0].toUpperCase()+io.slice(1);Ut(gx,"on"+vx)}Ut(w0,"onAnimationEnd");Ut(C0,"onAnimationIteration");Ut(E0,"onAnimationStart");Ut("dblclick","onDoubleClick");Ut("focusin","onFocus");Ut("focusout","onBlur");Ut(R2,"onTransitionRun");Ut(O2,"onTransitionStart");Ut(B2,"onTransitionCancel");Ut(D0,"onTransitionEnd");pl("onMouseEnter",["mouseout","mouseover"]);pl("onMouseLeave",["mouseout","mouseover"]);pl("onPointerEnter",["pointerout","pointerover"]);pl("onPointerLeave",["pointerout","pointerover"]);Ca("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ca("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ca("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ca("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ca("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ca("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Mi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),yx=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Mi));function fg(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var l=e[n],i=l.event;l=l.listeners;e:{var s=void 0;if(t)for(var c=l.length-1;0<=c;c--){var o=l[c],r=o.instance,d=o.currentTarget;if(o=o.listener,r!==s&&i.isPropagationStopped())break e;s=o,i.currentTarget=d;try{s(i)}catch(h){lc(h)}i.currentTarget=null,s=r}else for(c=0;c<l.length;c++){if(o=l[c],r=o.instance,d=o.currentTarget,o=o.listener,r!==s&&i.isPropagationStopped())break e;s=o,i.currentTarget=d;try{s(i)}catch(h){lc(h)}i.currentTarget=null,s=r}}}}function ae(e,t){var n=t[Co];n===void 0&&(n=t[Co]=new Set);var l=e+"__bubble";n.has(l)||(pg(t,e,2,!1),n.add(l))}function so(e,t,n){var l=0;t&&(l|=4),pg(n,e,l,t)}var Ms="_reactListening"+Math.random().toString(36).slice(2);function hu(e){if(!e[Ms]){e[Ms]=!0,s0.forEach(function(n){n!=="selectionchange"&&(yx.has(n)||so(n,!1,e),so(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ms]||(t[Ms]=!0,so("selectionchange",!1,t))}}function pg(e,t,n,l){switch(Dg(t)){case 2:var i=Xx;break;case 8:i=Kx;break;default:i=gu}n=i.bind(null,t,n,e),i=void 0,!Ao||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),l?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function co(e,t,n,l,i){var s=l;if(!(t&1)&&!(t&2)&&l!==null)e:for(;;){if(l===null)return;var c=l.tag;if(c===3||c===4){var o=l.stateNode.containerInfo;if(o===i)break;if(c===4)for(c=l.return;c!==null;){var r=c.tag;if((r===3||r===4)&&c.stateNode.containerInfo===i)return;c=c.return}for(;o!==null;){if(c=Ja(o),c===null)return;if(r=c.tag,r===5||r===6||r===26||r===27){l=s=c;continue e}o=o.parentNode}}l=l.return}f0(function(){var d=s,h=Md(n),p=[];e:{var f=k0.get(e);if(f!==void 0){var x=Bc,C=e;switch(e){case"keypress":if(Us(n)===0)break e;case"keydown":case"keyup":x=u2;break;case"focusin":C="focus",x=zr;break;case"focusout":C="blur",x=zr;break;case"beforeblur":case"afterblur":x=zr;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=tf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Iy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=f2;break;case w0:case C0:case E0:x=n2;break;case D0:x=g2;break;case"scroll":case"scrollend":x=Fy;break;case"wheel":x=y2;break;case"copy":case"cut":case"paste":x=l2;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=af;break;case"toggle":case"beforetoggle":x=_2}var k=(t&4)!==0,M=!k&&(e==="scroll"||e==="scrollend"),v=k?f!==null?f+"Capture":null:f;k=[];for(var m=d,_;m!==null;){var w=m;if(_=w.stateNode,w=w.tag,w!==5&&w!==26&&w!==27||_===null||v===null||(w=ji(m,v),w!=null&&k.push(Ai(m,w,_))),M)break;m=m.return}0<k.length&&(f=new x(f,C,null,n,h),p.push({event:f,listeners:k}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",f&&n!==Mo&&(C=n.relatedTarget||n.fromElement)&&(Ja(C)||C[Cl]))break e;if((x||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,x?(C=n.relatedTarget||n.toElement,x=d,C=C?Ja(C):null,C!==null&&(M=zi(C),k=C.tag,C!==M||k!==5&&k!==27&&k!==6)&&(C=null)):(x=null,C=d),x!==C)){if(k=tf,w="onMouseLeave",v="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(k=af,w="onPointerLeave",v="onPointerEnter",m="pointer"),M=x==null?f:li(x),_=C==null?f:li(C),f=new k(w,m+"leave",x,n,h),f.target=M,f.relatedTarget=_,w=null,Ja(h)===d&&(k=new k(v,m+"enter",C,n,h),k.target=_,k.relatedTarget=M,w=k),M=w,x&&C)t:{for(k=xx,v=x,m=C,_=0,w=v;w;w=k(w))_++;w=0;for(var O=m;O;O=k(O))w++;for(;0<_-w;)v=k(v),_--;for(;0<w-_;)m=k(m),w--;for(;_--;){if(v===m||m!==null&&v===m.alternate){k=v;break t}v=k(v),m=k(m)}k=null}else k=null;x!==null&&Zf(p,f,x,k,!1),C!==null&&M!==null&&Zf(p,M,C,k,!0)}}e:{if(f=d?li(d):window,x=f.nodeName&&f.nodeName.toLowerCase(),x==="select"||x==="input"&&f.type==="file")var L=rf;else if(cf(f))if(_0)L=M2;else{L=D2;var z=E2}else x=f.nodeName,!x||x.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?d&&kd(d.elementType)&&(L=rf):L=k2;if(L&&(L=L(e,d))){x0(p,L,n,h);break e}z&&z(e,f,d),e==="focusout"&&d&&f.type==="number"&&d.memoizedProps.value!=null&&ko(f,"number",f.value)}switch(z=d?li(d):window,e){case"focusin":(cf(z)||z.contentEditable==="true")&&(Ia=z,To=d,di=null);break;case"focusout":di=To=Ia=null;break;case"mousedown":Ro=!0;break;case"contextmenu":case"mouseup":case"dragend":Ro=!1,mf(p,n,h);break;case"selectionchange":if(T2)break;case"keydown":case"keyup":mf(p,n,h)}var P;if(Rd)e:{switch(e){case"compositionstart":var Y="onCompositionStart";break e;case"compositionend":Y="onCompositionEnd";break e;case"compositionupdate":Y="onCompositionUpdate";break e}Y=void 0}else Wa?v0(e,n)&&(Y="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(Y="onCompositionStart");Y&&(g0&&n.locale!=="ko"&&(Wa||Y!=="onCompositionStart"?Y==="onCompositionEnd"&&Wa&&(P=p0()):(Gn=h,Ad="value"in Gn?Gn.value:Gn.textContent,Wa=!0)),z=bc(d,Y),0<z.length&&(Y=new nf(Y,e,null,n,h),p.push({event:Y,listeners:z}),P?Y.data=P:(P=y0(n),P!==null&&(Y.data=P)))),(P=j2?N2(e,n):S2(e,n))&&(Y=bc(d,"onBeforeInput"),0<Y.length&&(z=new nf("onBeforeInput","beforeinput",null,n,h),p.push({event:z,listeners:Y}),z.data=P)),px(p,e,d,n,h)}fg(p,t)})}function Ai(e,t,n){return{instance:e,listener:t,currentTarget:n}}function bc(e,t){for(var n=t+"Capture",l=[];e!==null;){var i=e,s=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||s===null||(i=ji(e,n),i!=null&&l.unshift(Ai(e,i,s)),i=ji(e,t),i!=null&&l.push(Ai(e,i,s))),e.tag===3)return l;e=e.return}return[]}function xx(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Zf(e,t,n,l,i){for(var s=t._reactName,c=[];n!==null&&n!==l;){var o=n,r=o.alternate,d=o.stateNode;if(o=o.tag,r!==null&&r===l)break;o!==5&&o!==26&&o!==27||d===null||(r=d,i?(d=ji(n,s),d!=null&&c.unshift(Ai(n,d,r))):i||(d=ji(n,s),d!=null&&c.push(Ai(n,d,r)))),n=n.return}c.length!==0&&e.push({event:t,listeners:c})}var _x=/\r\n?/g,bx=/\u0000|\uFFFD/g;function Jf(e){return(typeof e=="string"?e:""+e).replace(_x,`
`).replace(bx,"")}function gg(e,t){return t=Jf(t),Jf(e)===t}function ge(e,t,n,l,i,s){switch(n){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||gl(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&gl(e,""+l);break;case"className":Ns(e,"class",l);break;case"tabIndex":Ns(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Ns(e,n,l);break;case"style":m0(e,l,s);break;case"data":if(t!=="object"){Ns(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(n);break}l=Ls(""+l),e.setAttribute(n,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(t!=="input"&&ge(e,t,"name",i.name,i,null),ge(e,t,"formEncType",i.formEncType,i,null),ge(e,t,"formMethod",i.formMethod,i,null),ge(e,t,"formTarget",i.formTarget,i,null)):(ge(e,t,"encType",i.encType,i,null),ge(e,t,"method",i.method,i,null),ge(e,t,"target",i.target,i,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(n);break}l=Ls(""+l),e.setAttribute(n,l);break;case"onClick":l!=null&&(e.onclick=fn);break;case"onScroll":l!=null&&ae("scroll",e);break;case"onScrollEnd":l!=null&&ae("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(R(61));if(n=l.__html,n!=null){if(i.children!=null)throw Error(R(60));e.innerHTML=n}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}n=Ls(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(n,""+l):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":l===!0?e.setAttribute(n,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(n,l):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(n,l):e.removeAttribute(n);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(n):e.setAttribute(n,l);break;case"popover":ae("beforetoggle",e),ae("toggle",e),zs(e,"popover",l);break;case"xlinkActuate":ln(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":ln(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":ln(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":ln(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":ln(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":ln(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":ln(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":ln(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":ln(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":zs(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Zy.get(n)||n,zs(e,n,l))}}function ad(e,t,n,l,i,s){switch(n){case"style":m0(e,l,s);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(R(61));if(n=l.__html,n!=null){if(i.children!=null)throw Error(R(60));e.innerHTML=n}}break;case"children":typeof l=="string"?gl(e,l):(typeof l=="number"||typeof l=="bigint")&&gl(e,""+l);break;case"onScroll":l!=null&&ae("scroll",e);break;case"onScrollEnd":l!=null&&ae("scrollend",e);break;case"onClick":l!=null&&(e.onclick=fn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!c0.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(i=n.endsWith("Capture"),t=n.slice(2,i?n.length-7:void 0),s=e[rt]||null,s=s!=null?s[n]:null,typeof s=="function"&&e.removeEventListener(t,s,i),typeof l=="function")){typeof s!="function"&&s!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,l,i);break e}n in e?e[n]=l:l===!0?e.setAttribute(n,""):zs(e,n,l)}}}function Je(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ae("error",e),ae("load",e);var l=!1,i=!1,s;for(s in n)if(n.hasOwnProperty(s)){var c=n[s];if(c!=null)switch(s){case"src":l=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(R(137,t));default:ge(e,t,s,c,n,null)}}i&&ge(e,t,"srcSet",n.srcSet,n,null),l&&ge(e,t,"src",n.src,n,null);return;case"input":ae("invalid",e);var o=s=c=i=null,r=null,d=null;for(l in n)if(n.hasOwnProperty(l)){var h=n[l];if(h!=null)switch(l){case"name":i=h;break;case"type":c=h;break;case"checked":r=h;break;case"defaultChecked":d=h;break;case"value":s=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(R(137,t));break;default:ge(e,t,l,h,n,null)}}d0(e,s,o,r,d,c,i,!1);return;case"select":ae("invalid",e),l=c=s=null;for(i in n)if(n.hasOwnProperty(i)&&(o=n[i],o!=null))switch(i){case"value":s=o;break;case"defaultValue":c=o;break;case"multiple":l=o;default:ge(e,t,i,o,n,null)}t=s,n=c,e.multiple=!!l,t!=null?rl(e,!!l,t,!1):n!=null&&rl(e,!!l,n,!0);return;case"textarea":ae("invalid",e),s=i=l=null;for(c in n)if(n.hasOwnProperty(c)&&(o=n[c],o!=null))switch(c){case"value":l=o;break;case"defaultValue":i=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(R(91));break;default:ge(e,t,c,o,n,null)}h0(e,l,i,s);return;case"option":for(r in n)if(n.hasOwnProperty(r)&&(l=n[r],l!=null))switch(r){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:ge(e,t,r,l,n,null)}return;case"dialog":ae("beforetoggle",e),ae("toggle",e),ae("cancel",e),ae("close",e);break;case"iframe":case"object":ae("load",e);break;case"video":case"audio":for(l=0;l<Mi.length;l++)ae(Mi[l],e);break;case"image":ae("error",e),ae("load",e);break;case"details":ae("toggle",e);break;case"embed":case"source":case"link":ae("error",e),ae("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in n)if(n.hasOwnProperty(d)&&(l=n[d],l!=null))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(R(137,t));default:ge(e,t,d,l,n,null)}return;default:if(kd(t)){for(h in n)n.hasOwnProperty(h)&&(l=n[h],l!==void 0&&ad(e,t,h,l,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(l=n[o],l!=null&&ge(e,t,o,l,n,null))}function jx(e,t,n,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,s=null,c=null,o=null,r=null,d=null,h=null;for(x in n){var p=n[x];if(n.hasOwnProperty(x)&&p!=null)switch(x){case"checked":break;case"value":break;case"defaultValue":r=p;default:l.hasOwnProperty(x)||ge(e,t,x,null,l,p)}}for(var f in l){var x=l[f];if(p=n[f],l.hasOwnProperty(f)&&(x!=null||p!=null))switch(f){case"type":s=x;break;case"name":i=x;break;case"checked":d=x;break;case"defaultChecked":h=x;break;case"value":c=x;break;case"defaultValue":o=x;break;case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(R(137,t));break;default:x!==p&&ge(e,t,f,x,l,p)}}Do(e,c,o,r,d,h,s,i);return;case"select":x=c=o=f=null;for(s in n)if(r=n[s],n.hasOwnProperty(s)&&r!=null)switch(s){case"value":break;case"multiple":x=r;default:l.hasOwnProperty(s)||ge(e,t,s,null,l,r)}for(i in l)if(s=l[i],r=n[i],l.hasOwnProperty(i)&&(s!=null||r!=null))switch(i){case"value":f=s;break;case"defaultValue":o=s;break;case"multiple":c=s;default:s!==r&&ge(e,t,i,s,l,r)}t=o,n=c,l=x,f!=null?rl(e,!!n,f,!1):!!l!=!!n&&(t!=null?rl(e,!!n,t,!0):rl(e,!!n,n?[]:"",!1));return;case"textarea":x=f=null;for(o in n)if(i=n[o],n.hasOwnProperty(o)&&i!=null&&!l.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ge(e,t,o,null,l,i)}for(c in l)if(i=l[c],s=n[c],l.hasOwnProperty(c)&&(i!=null||s!=null))switch(c){case"value":f=i;break;case"defaultValue":x=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(R(91));break;default:i!==s&&ge(e,t,c,i,l,s)}u0(e,f,x);return;case"option":for(var C in n)if(f=n[C],n.hasOwnProperty(C)&&f!=null&&!l.hasOwnProperty(C))switch(C){case"selected":e.selected=!1;break;default:ge(e,t,C,null,l,f)}for(r in l)if(f=l[r],x=n[r],l.hasOwnProperty(r)&&f!==x&&(f!=null||x!=null))switch(r){case"selected":e.selected=f&&typeof f!="function"&&typeof f!="symbol";break;default:ge(e,t,r,f,l,x)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var k in n)f=n[k],n.hasOwnProperty(k)&&f!=null&&!l.hasOwnProperty(k)&&ge(e,t,k,null,l,f);for(d in l)if(f=l[d],x=n[d],l.hasOwnProperty(d)&&f!==x&&(f!=null||x!=null))switch(d){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(R(137,t));break;default:ge(e,t,d,f,l,x)}return;default:if(kd(t)){for(var M in n)f=n[M],n.hasOwnProperty(M)&&f!==void 0&&!l.hasOwnProperty(M)&&ad(e,t,M,void 0,l,f);for(h in l)f=l[h],x=n[h],!l.hasOwnProperty(h)||f===x||f===void 0&&x===void 0||ad(e,t,h,f,l,x);return}}for(var v in n)f=n[v],n.hasOwnProperty(v)&&f!=null&&!l.hasOwnProperty(v)&&ge(e,t,v,null,l,f);for(p in l)f=l[p],x=n[p],!l.hasOwnProperty(p)||f===x||f==null&&x==null||ge(e,t,p,f,l,x)}function Ff(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Nx(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),l=0;l<n.length;l++){var i=n[l],s=i.transferSize,c=i.initiatorType,o=i.duration;if(s&&o&&Ff(c)){for(c=0,o=i.responseEnd,l+=1;l<n.length;l++){var r=n[l],d=r.startTime;if(d>o)break;var h=r.transferSize,p=r.initiatorType;h&&Ff(p)&&(r=r.responseEnd,c+=h*(r<o?1:(o-d)/(r-d)))}if(--l,t+=8*(s+c)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ld=null,id=null;function jc(e){return e.nodeType===9?e:e.ownerDocument}function Wf(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function vg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function sd(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ro=null;function Sx(){var e=window.event;return e&&e.type==="popstate"?e===ro?!1:(ro=e,!0):(ro=null,!1)}var yg=typeof setTimeout=="function"?setTimeout:void 0,wx=typeof clearTimeout=="function"?clearTimeout:void 0,If=typeof Promise=="function"?Promise:void 0,Cx=typeof queueMicrotask=="function"?queueMicrotask:typeof If<"u"?function(e){return If.resolve(null).then(e).catch(Ex)}:yg;function Ex(e){setTimeout(function(){throw e})}function la(e){return e==="head"}function ep(e,t){var n=t,l=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"||n==="/&"){if(l===0){e.removeChild(i),Sl(t);return}l--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")l++;else if(n==="html")_i(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,_i(n);for(var s=n.firstChild;s;){var c=s.nextSibling,o=s.nodeName;s[Gi]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=c}}else n==="body"&&_i(e.ownerDocument.body);n=i}while(n);Sl(t)}function tp(e,t){var n=e;e=0;do{var l=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=l}while(n)}function cd(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":cd(n),Dd(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Dx(e,t,n,l){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Gi])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Tt(e.nextSibling),e===null)break}return null}function kx(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Tt(e.nextSibling),e===null))return null;return e}function xg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Tt(e.nextSibling),e===null))return null;return e}function rd(e){return e.data==="$?"||e.data==="$~"}function od(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Mx(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var l=function(){t(),n.removeEventListener("DOMContentLoaded",l)};n.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Tt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var dd=null;function np(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Tt(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function ap(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function _g(e,t,n){switch(t=jc(n),e){case"html":if(e=t.documentElement,!e)throw Error(R(452));return e;case"head":if(e=t.head,!e)throw Error(R(453));return e;case"body":if(e=t.body,!e)throw Error(R(454));return e;default:throw Error(R(451))}}function _i(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Dd(e)}var Rt=new Map,lp=new Set;function Nc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var wn=he.d;he.d={f:Ax,r:Tx,D:Rx,C:Ox,L:Bx,m:zx,X:Hx,S:Lx,M:Ux};function Ax(){var e=wn.f(),t=Xc();return e||t}function Tx(e){var t=El(e);t!==null&&t.tag===5&&t.type==="form"?m1(t):wn.r(e)}var Al=typeof document>"u"?null:document;function bg(e,t,n){var l=Al;if(l&&typeof t=="string"&&t){var i=Dt(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof n=="string"&&(i+='[crossorigin="'+n+'"]'),lp.has(i)||(lp.add(i),e={rel:e,crossOrigin:n,href:t},l.querySelector(i)===null&&(t=l.createElement("link"),Je(t,"link",e),Ve(t),l.head.appendChild(t)))}}function Rx(e){wn.D(e),bg("dns-prefetch",e,null)}function Ox(e,t){wn.C(e,t),bg("preconnect",e,t)}function Bx(e,t,n){wn.L(e,t,n);var l=Al;if(l&&e&&t){var i='link[rel="preload"][as="'+Dt(t)+'"]';t==="image"&&n&&n.imageSrcSet?(i+='[imagesrcset="'+Dt(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(i+='[imagesizes="'+Dt(n.imageSizes)+'"]')):i+='[href="'+Dt(e)+'"]';var s=i;switch(t){case"style":s=Nl(e);break;case"script":s=Tl(e)}Rt.has(s)||(e=Se({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Rt.set(s,e),l.querySelector(i)!==null||t==="style"&&l.querySelector(Xi(s))||t==="script"&&l.querySelector(Ki(s))||(t=l.createElement("link"),Je(t,"link",e),Ve(t),l.head.appendChild(t)))}}function zx(e,t){wn.m(e,t);var n=Al;if(n&&e){var l=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+Dt(l)+'"][href="'+Dt(e)+'"]',s=i;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Tl(e)}if(!Rt.has(s)&&(e=Se({rel:"modulepreload",href:e},t),Rt.set(s,e),n.querySelector(i)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Ki(s)))return}l=n.createElement("link"),Je(l,"link",e),Ve(l),n.head.appendChild(l)}}}function Lx(e,t,n){wn.S(e,t,n);var l=Al;if(l&&e){var i=cl(l).hoistableStyles,s=Nl(e);t=t||"default";var c=i.get(s);if(!c){var o={loading:0,preload:null};if(c=l.querySelector(Xi(s)))o.loading=5;else{e=Se({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Rt.get(s))&&mu(e,n);var r=c=l.createElement("link");Ve(r),Je(r,"link",e),r._p=new Promise(function(d,h){r.onload=d,r.onerror=h}),r.addEventListener("load",function(){o.loading|=1}),r.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Ks(c,t,l)}c={type:"stylesheet",instance:c,count:1,state:o},i.set(s,c)}}}function Hx(e,t){wn.X(e,t);var n=Al;if(n&&e){var l=cl(n).hoistableScripts,i=Tl(e),s=l.get(i);s||(s=n.querySelector(Ki(i)),s||(e=Se({src:e,async:!0},t),(t=Rt.get(i))&&fu(e,t),s=n.createElement("script"),Ve(s),Je(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},l.set(i,s))}}function Ux(e,t){wn.M(e,t);var n=Al;if(n&&e){var l=cl(n).hoistableScripts,i=Tl(e),s=l.get(i);s||(s=n.querySelector(Ki(i)),s||(e=Se({src:e,async:!0,type:"module"},t),(t=Rt.get(i))&&fu(e,t),s=n.createElement("script"),Ve(s),Je(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},l.set(i,s))}}function ip(e,t,n,l){var i=(i=Yn.current)?Nc(i):null;if(!i)throw Error(R(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Nl(n.href),n=cl(i).hoistableStyles,l=n.get(t),l||(l={type:"style",instance:null,count:0,state:null},n.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Nl(n.href);var s=cl(i).hoistableStyles,c=s.get(e);if(c||(i=i.ownerDocument||i,c={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,c),(s=i.querySelector(Xi(e)))&&!s._p&&(c.instance=s,c.state.loading=5),Rt.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Rt.set(e,n),s||Gx(i,e,n,c.state))),t&&l===null)throw Error(R(528,""));return c}if(t&&l!==null)throw Error(R(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Tl(n),n=cl(i).hoistableScripts,l=n.get(t),l||(l={type:"script",instance:null,count:0,state:null},n.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(R(444,e))}}function Nl(e){return'href="'+Dt(e)+'"'}function Xi(e){return'link[rel="stylesheet"]['+e+"]"}function jg(e){return Se({},e,{"data-precedence":e.precedence,precedence:null})}function Gx(e,t,n,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),Je(t,"link",n),Ve(t),e.head.appendChild(t))}function Tl(e){return'[src="'+Dt(e)+'"]'}function Ki(e){return"script[async]"+e}function sp(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+Dt(n.href)+'"]');if(l)return t.instance=l,Ve(l),l;var i=Se({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),Ve(l),Je(l,"style",i),Ks(l,n.precedence,e),t.instance=l;case"stylesheet":i=Nl(n.href);var s=e.querySelector(Xi(i));if(s)return t.state.loading|=4,t.instance=s,Ve(s),s;l=jg(n),(i=Rt.get(i))&&mu(l,i),s=(e.ownerDocument||e).createElement("link"),Ve(s);var c=s;return c._p=new Promise(function(o,r){c.onload=o,c.onerror=r}),Je(s,"link",l),t.state.loading|=4,Ks(s,n.precedence,e),t.instance=s;case"script":return s=Tl(n.src),(i=e.querySelector(Ki(s)))?(t.instance=i,Ve(i),i):(l=n,(i=Rt.get(s))&&(l=Se({},n),fu(l,i)),e=e.ownerDocument||e,i=e.createElement("script"),Ve(i),Je(i,"link",l),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(R(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(l=t.instance,t.state.loading|=4,Ks(l,n.precedence,e));return t.instance}function Ks(e,t,n){for(var l=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=l.length?l[l.length-1]:null,s=i,c=0;c<l.length;c++){var o=l[c];if(o.dataset.precedence===t)s=o;else if(s!==i)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function mu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function fu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var $s=null;function cp(e,t,n){if($s===null){var l=new Map,i=$s=new Map;i.set(n,l)}else i=$s,l=i.get(n),l||(l=new Map,i.set(n,l));if(l.has(e))return l;for(l.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var s=n[i];if(!(s[Gi]||s[Ke]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var c=s.getAttribute(t)||"";c=e+c;var o=l.get(c);o?o.push(s):l.set(c,[s])}}return l}function rp(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function Px(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Ng(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function qx(e,t,n,l){if(n.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var i=Nl(l.href),s=t.querySelector(Xi(i));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Sc.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=s,Ve(s);return}s=t.ownerDocument||t,l=jg(l),(i=Rt.get(i))&&mu(l,i),s=s.createElement("link"),Ve(s);var c=s;c._p=new Promise(function(o,r){c.onload=o,c.onerror=r}),Je(s,"link",l),n.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Sc.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var oo=0;function Vx(e,t){return e.stylesheets&&e.count===0&&Zs(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var l=setTimeout(function(){if(e.stylesheets&&Zs(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&oo===0&&(oo=62500*Nx());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Zs(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>oo?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(i)}}:null}function Sc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Zs(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var wc=null;function Zs(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,wc=new Map,t.forEach(Yx,e),wc=null,Sc.call(e))}function Yx(e,t){if(!(t.state.loading&4)){var n=wc.get(e);if(n)var l=n.get(null);else{n=new Map,wc.set(e,n);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<i.length;s++){var c=i[s];(c.nodeName==="LINK"||c.getAttribute("media")!=="not all")&&(n.set(c.dataset.precedence,c),l=c)}l&&n.set(null,l)}i=t.instance,c=i.getAttribute("data-precedence"),s=n.get(c)||l,s===l&&n.set(null,i),n.set(c,i),this.count++,l=Sc.bind(this),i.addEventListener("load",l),i.addEventListener("error",l),s?s.parentNode.insertBefore(i,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Ti={$$typeof:mn,Provider:null,Consumer:null,_currentValue:pa,_currentValue2:pa,_threadCount:0};function Qx(e,t,n,l,i,s,c,o,r){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Tr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Tr(0),this.hiddenUpdates=Tr(null),this.identifierPrefix=l,this.onUncaughtError=i,this.onCaughtError=s,this.onRecoverableError=c,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=r,this.incompleteTransitions=new Map}function Sg(e,t,n,l,i,s,c,o,r,d,h,p){return e=new Qx(e,t,n,c,r,d,h,p,o),t=1,s===!0&&(t|=24),s=ft(3,null,null,t),e.current=s,s.stateNode=e,t=Gd(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:l,isDehydrated:n,cache:t},Vd(s),e}function wg(e){return e?(e=nl,e):nl}function Cg(e,t,n,l,i,s){i=wg(i),l.context===null?l.context=i:l.pendingContext=i,l=Xn(t),l.payload={element:n},s=s===void 0?null:s,s!==null&&(l.callback=s),n=Kn(e,l,t),n!==null&&(ct(n,e,t),hi(n,e,t))}function op(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function pu(e,t){op(e,t),(e=e.alternate)&&op(e,t)}function Eg(e){if(e.tag===13||e.tag===31){var t=ka(e,67108864);t!==null&&ct(t,e,67108864),pu(e,67108864)}}function dp(e){if(e.tag===13||e.tag===31){var t=xt();t=Cd(t);var n=ka(e,t);n!==null&&ct(n,e,t),pu(e,t)}}var Cc=!0;function Xx(e,t,n,l){var i=X.T;X.T=null;var s=he.p;try{he.p=2,gu(e,t,n,l)}finally{he.p=s,X.T=i}}function Kx(e,t,n,l){var i=X.T;X.T=null;var s=he.p;try{he.p=8,gu(e,t,n,l)}finally{he.p=s,X.T=i}}function gu(e,t,n,l){if(Cc){var i=ud(l);if(i===null)co(e,t,l,Ec,n),up(e,l);else if(Zx(i,e,t,n,l))l.stopPropagation();else if(up(e,l),t&4&&-1<$x.indexOf(e)){for(;i!==null;){var s=El(i);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var c=ha(s.pendingLanes);if(c!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;c;){var r=1<<31-yt(c);o.entanglements[1]|=r,c&=~r}Jt(s),!(ue&6)&&(gc=gt()+500,Qi(0,!1))}}break;case 31:case 13:o=ka(s,2),o!==null&&ct(o,s,2),Xc(),pu(s,2)}if(s=ud(l),s===null&&co(e,t,l,Ec,n),s===i)break;i=s}i!==null&&l.stopPropagation()}else co(e,t,l,null,n)}}function ud(e){return e=Md(e),vu(e)}var Ec=null;function vu(e){if(Ec=null,e=Ja(e),e!==null){var t=zi(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=Kp(t),e!==null)return e;e=null}else if(n===31){if(e=$p(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ec=e,null}function Dg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ry()){case Wp:return 2;case Ip:return 8;case nc:case Oy:return 32;case e0:return 268435456;default:return 32}default:return 32}}var hd=!1,Jn=null,Fn=null,Wn=null,Ri=new Map,Oi=new Map,Hn=[],$x="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function up(e,t){switch(e){case"focusin":case"focusout":Jn=null;break;case"dragenter":case"dragleave":Fn=null;break;case"mouseover":case"mouseout":Wn=null;break;case"pointerover":case"pointerout":Ri.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Oi.delete(t.pointerId)}}function ei(e,t,n,l,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:l,nativeEvent:s,targetContainers:[i]},t!==null&&(t=El(t),t!==null&&Eg(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Zx(e,t,n,l,i){switch(t){case"focusin":return Jn=ei(Jn,e,t,n,l,i),!0;case"dragenter":return Fn=ei(Fn,e,t,n,l,i),!0;case"mouseover":return Wn=ei(Wn,e,t,n,l,i),!0;case"pointerover":var s=i.pointerId;return Ri.set(s,ei(Ri.get(s)||null,e,t,n,l,i)),!0;case"gotpointercapture":return s=i.pointerId,Oi.set(s,ei(Oi.get(s)||null,e,t,n,l,i)),!0}return!1}function kg(e){var t=Ja(e.target);if(t!==null){var n=zi(t);if(n!==null){if(t=n.tag,t===13){if(t=Kp(n),t!==null){e.blockedOn=t,$m(e.priority,function(){dp(n)});return}}else if(t===31){if(t=$p(n),t!==null){e.blockedOn=t,$m(e.priority,function(){dp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Js(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ud(e.nativeEvent);if(n===null){n=e.nativeEvent;var l=new n.constructor(n.type,n);Mo=l,n.target.dispatchEvent(l),Mo=null}else return t=El(n),t!==null&&Eg(t),e.blockedOn=n,!1;t.shift()}return!0}function hp(e,t,n){Js(e)&&n.delete(t)}function Jx(){hd=!1,Jn!==null&&Js(Jn)&&(Jn=null),Fn!==null&&Js(Fn)&&(Fn=null),Wn!==null&&Js(Wn)&&(Wn=null),Ri.forEach(hp),Oi.forEach(hp)}function As(e,t){e.blockedOn===t&&(e.blockedOn=null,hd||(hd=!0,Ge.unstable_scheduleCallback(Ge.unstable_NormalPriority,Jx)))}var Ts=null;function mp(e){Ts!==e&&(Ts=e,Ge.unstable_scheduleCallback(Ge.unstable_NormalPriority,function(){Ts===e&&(Ts=null);for(var t=0;t<e.length;t+=3){var n=e[t],l=e[t+1],i=e[t+2];if(typeof l!="function"){if(vu(l||n)===null)continue;break}var s=El(n);s!==null&&(e.splice(t,3),t-=3,Xo(s,{pending:!0,data:i,method:n.method,action:l},l,i))}}))}function Sl(e){function t(r){return As(r,e)}Jn!==null&&As(Jn,e),Fn!==null&&As(Fn,e),Wn!==null&&As(Wn,e),Ri.forEach(t),Oi.forEach(t);for(var n=0;n<Hn.length;n++){var l=Hn[n];l.blockedOn===e&&(l.blockedOn=null)}for(;0<Hn.length&&(n=Hn[0],n.blockedOn===null);)kg(n),n.blockedOn===null&&Hn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(l=0;l<n.length;l+=3){var i=n[l],s=n[l+1],c=i[rt]||null;if(typeof s=="function")c||mp(n);else if(c){var o=null;if(s&&s.hasAttribute("formAction")){if(i=s,c=s[rt]||null)o=c.formAction;else if(vu(i)!==null)continue}else o=c.action;typeof o=="function"?n[l+1]=o:(n.splice(l,3),l-=3),mp(n)}}}function Mg(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(c){return i=c})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),l||setTimeout(n,20)}function n(){if(!l&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function yu(e){this._internalRoot=e}Zc.prototype.render=yu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));var n=t.current,l=xt();Cg(n,l,e,t,null,null)};Zc.prototype.unmount=yu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Cg(e.current,2,null,e,null,null),Xc(),t[Cl]=null}};function Zc(e){this._internalRoot=e}Zc.prototype.unstable_scheduleHydration=function(e){if(e){var t=i0();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Hn.length&&t!==0&&t<Hn[n].priority;n++);Hn.splice(n,0,e),n===0&&kg(e)}};var fp=Qp.version;if(fp!=="19.2.5")throw Error(R(527,fp,"19.2.5"));he.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=Cy(t),e=e!==null?Zp(e):null,e=e===null?null:e.stateNode,e};var Fx={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:X,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Rs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Rs.isDisabled&&Rs.supportsFiber)try{Li=Rs.inject(Fx),vt=Rs}catch{}}Tc.createRoot=function(e,t){if(!Xp(e))throw Error(R(299));var n=!1,l="",i=b1,s=j1,c=N1;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=Sg(e,1,!1,null,null,n,l,null,i,s,c,Mg),e[Cl]=t.current,hu(e),new yu(t)};Tc.hydrateRoot=function(e,t,n){if(!Xp(e))throw Error(R(299));var l=!1,i="",s=b1,c=j1,o=N1,r=null;return n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(r=n.formState)),t=Sg(e,1,!0,t,n??null,l,i,r,s,c,o,Mg),t.context=wg(null),n=t.current,l=xt(),l=Cd(l),i=Xn(l),i.callback=null,Kn(n,i,l),n=l,t.current.lanes=n,Ui(t,n),Jt(t),e[Cl]=t.current,hu(e),new Zc(t)};Tc.version="19.2.5";function Ag(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ag)}catch(e){console.error(e)}}Ag(),Up.exports=Tc;var Wx=Up.exports;const Ix=kp(Wx),e_="modulepreload",t_=function(e){return"/digital-twin/"+e},pp={},n_=function(t,n,l){if(!n||n.length===0)return t();const i=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=t_(s),s in pp)return;pp[s]=!0;const c=s.endsWith(".css"),o=c?'[rel="stylesheet"]':"";if(!!l)for(let h=i.length-1;h>=0;h--){const p=i[h];if(p.href===s&&(!c||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${o}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":e_,c||(d.as="script",d.crossOrigin=""),d.href=s,document.head.appendChild(d),c)return new Promise((h,p)=>{d.addEventListener("load",h),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t()).catch(s=>{const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s})};var gp="popstate";function vp(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function a_(e={}){function t(l,i){var d;let s=(d=i.state)==null?void 0:d.masked,{pathname:c,search:o,hash:r}=s||l.location;return md("",{pathname:c,search:o,hash:r},i.state&&i.state.usr||null,i.state&&i.state.key||"default",s?{pathname:l.location.pathname,search:l.location.search,hash:l.location.hash}:void 0)}function n(l,i){return typeof i=="string"?i:Bi(i)}return i_(t,n,null,e)}function Ce(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ht(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function l_(){return Math.random().toString(36).substring(2,10)}function yp(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function md(e,t,n=null,l,i){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Rl(t):t,state:n,key:t&&t.key||l||l_(),unstable_mask:i}}function Bi({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Rl(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let l=e.indexOf("?");l>=0&&(t.search=e.substring(l),e=e.substring(0,l)),e&&(t.pathname=e)}return t}function i_(e,t,n,l={}){let{window:i=document.defaultView,v5Compat:s=!1}=l,c=i.history,o="POP",r=null,d=h();d==null&&(d=0,c.replaceState({...c.state,idx:d},""));function h(){return(c.state||{idx:null}).idx}function p(){o="POP";let M=h(),v=M==null?null:M-d;d=M,r&&r({action:o,location:k.location,delta:v})}function f(M,v){o="PUSH";let m=vp(M)?M:md(k.location,M,v);n&&n(m,M),d=h()+1;let _=yp(m,d),w=k.createHref(m.unstable_mask||m);try{c.pushState(_,"",w)}catch(O){if(O instanceof DOMException&&O.name==="DataCloneError")throw O;i.location.assign(w)}s&&r&&r({action:o,location:k.location,delta:1})}function x(M,v){o="REPLACE";let m=vp(M)?M:md(k.location,M,v);n&&n(m,M),d=h();let _=yp(m,d),w=k.createHref(m.unstable_mask||m);c.replaceState(_,"",w),s&&r&&r({action:o,location:k.location,delta:0})}function C(M){return s_(M)}let k={get action(){return o},get location(){return e(i,c)},listen(M){if(r)throw new Error("A history only accepts one active listener");return i.addEventListener(gp,p),r=M,()=>{i.removeEventListener(gp,p),r=null}},createHref(M){return t(i,M)},createURL:C,encodeLocation(M){let v=C(M);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:f,replace:x,go(M){return c.go(M)}};return k}function s_(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),Ce(n,"No window.location.(origin|href) available to create URL");let l=typeof e=="string"?e:Bi(e);return l=l.replace(/ $/,"%20"),!t&&l.startsWith("//")&&(l=n+l),new URL(l,n)}function Tg(e,t,n="/"){return c_(e,t,n,!1)}function c_(e,t,n,l){let i=typeof t=="string"?Rl(t):t,s=Sn(i.pathname||"/",n);if(s==null)return null;let c=Rg(e);r_(c);let o=null;for(let r=0;o==null&&r<c.length;++r){let d=x_(s);o=v_(c[r],d,l)}return o}function Rg(e,t=[],n=[],l="",i=!1){let s=(c,o,r=i,d)=>{let h={relativePath:d===void 0?c.path||"":d,caseSensitive:c.caseSensitive===!0,childrenIndex:o,route:c};if(h.relativePath.startsWith("/")){if(!h.relativePath.startsWith(l)&&r)return;Ce(h.relativePath.startsWith(l),`Absolute route path "${h.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),h.relativePath=h.relativePath.slice(l.length)}let p=Lt([l,h.relativePath]),f=n.concat(h);c.children&&c.children.length>0&&(Ce(c.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),Rg(c.children,t,f,p,r)),!(c.path==null&&!c.index)&&t.push({path:p,score:p_(p,c.index),routesMeta:f})};return e.forEach((c,o)=>{var r;if(c.path===""||!((r=c.path)!=null&&r.includes("?")))s(c,o);else for(let d of Og(c.path))s(c,o,!0,d)}),t}function Og(e){let t=e.split("/");if(t.length===0)return[];let[n,...l]=t,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(l.length===0)return i?[s,""]:[s];let c=Og(l.join("/")),o=[];return o.push(...c.map(r=>r===""?s:[s,r].join("/"))),i&&o.push(...c),o.map(r=>e.startsWith("/")&&r===""?"/":r)}function r_(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:g_(t.routesMeta.map(l=>l.childrenIndex),n.routesMeta.map(l=>l.childrenIndex)))}var o_=/^:[\w-]+$/,d_=3,u_=2,h_=1,m_=10,f_=-2,xp=e=>e==="*";function p_(e,t){let n=e.split("/"),l=n.length;return n.some(xp)&&(l+=f_),t&&(l+=u_),n.filter(i=>!xp(i)).reduce((i,s)=>i+(o_.test(s)?d_:s===""?h_:m_),l)}function g_(e,t){return e.length===t.length&&e.slice(0,-1).every((l,i)=>l===t[i])?e[e.length-1]-t[t.length-1]:0}function v_(e,t,n=!1){let{routesMeta:l}=e,i={},s="/",c=[];for(let o=0;o<l.length;++o){let r=l[o],d=o===l.length-1,h=s==="/"?t:t.slice(s.length)||"/",p=Dc({path:r.relativePath,caseSensitive:r.caseSensitive,end:d},h),f=r.route;if(!p&&d&&n&&!l[l.length-1].route.index&&(p=Dc({path:r.relativePath,caseSensitive:r.caseSensitive,end:!1},h)),!p)return null;Object.assign(i,p.params),c.push({params:i,pathname:Lt([s,p.pathname]),pathnameBase:N_(Lt([s,p.pathnameBase])),route:f}),p.pathnameBase!=="/"&&(s=Lt([s,p.pathnameBase]))}return c}function Dc(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,l]=y_(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let s=i[0],c=s.replace(/(.)\/+$/,"$1"),o=i.slice(1);return{params:l.reduce((d,{paramName:h,isOptional:p},f)=>{if(h==="*"){let C=o[f]||"";c=s.slice(0,s.length-C.length).replace(/(.)\/+$/,"$1")}const x=o[f];return p&&!x?d[h]=void 0:d[h]=(x||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:c,pattern:e}}function y_(e,t=!1,n=!0){Ht(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let l=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(c,o,r,d,h)=>{if(l.push({paramName:o,isOptional:r!=null}),r){let p=h.charAt(d+c.length);return p&&p!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(l.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),l]}function x_(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ht(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Sn(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,l=e.charAt(n);return l&&l!=="/"?null:e.slice(n)||"/"}var __=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function b_(e,t="/"){let{pathname:n,search:l="",hash:i=""}=typeof e=="string"?Rl(e):e,s;return n?(n=Bg(n),n.startsWith("/")?s=_p(n.substring(1),"/"):s=_p(n,t)):s=t,{pathname:s,search:S_(l),hash:w_(i)}}function _p(e,t){let n=kc(t).split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function uo(e,t,n,l){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(l)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function j_(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function xu(e){let t=j_(e);return t.map((n,l)=>l===t.length-1?n.pathname:n.pathnameBase)}function Jc(e,t,n,l=!1){let i;typeof e=="string"?i=Rl(e):(i={...e},Ce(!i.pathname||!i.pathname.includes("?"),uo("?","pathname","search",i)),Ce(!i.pathname||!i.pathname.includes("#"),uo("#","pathname","hash",i)),Ce(!i.search||!i.search.includes("#"),uo("#","search","hash",i)));let s=e===""||i.pathname==="",c=s?"/":i.pathname,o;if(c==null)o=n;else{let p=t.length-1;if(!l&&c.startsWith("..")){let f=c.split("/");for(;f[0]==="..";)f.shift(),p-=1;i.pathname=f.join("/")}o=p>=0?t[p]:"/"}let r=b_(i,o),d=c&&c!=="/"&&c.endsWith("/"),h=(s||c===".")&&n.endsWith("/");return!r.pathname.endsWith("/")&&(d||h)&&(r.pathname+="/"),r}var Bg=e=>e.replace(/\/\/+/g,"/"),Lt=e=>Bg(e.join("/")),kc=e=>e.replace(/\/+$/,""),N_=e=>kc(e).replace(/^\/*/,"/"),S_=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,w_=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,C_=class{constructor(e,t,n,l=!1){this.status=e,this.statusText=t||"",this.internal=l,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function E_(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function D_(e){let t=e.map(n=>n.route.path).filter(Boolean);return Lt(t)||"/"}var zg=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Lg(e,t){let n=e;if(typeof n!="string"||!__.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let l=n,i=!1;if(zg)try{let s=new URL(window.location.href),c=n.startsWith("//")?new URL(s.protocol+n):new URL(n),o=Sn(c.pathname,t);c.origin===s.origin&&o!=null?n=o+c.search+c.hash:i=!0}catch{Ht(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:l,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Hg=["POST","PUT","PATCH","DELETE"];new Set(Hg);var k_=["GET",...Hg];new Set(k_);var Ol=y.createContext(null);Ol.displayName="DataRouter";var Fc=y.createContext(null);Fc.displayName="DataRouterState";var Ug=y.createContext(!1);function M_(){return y.useContext(Ug)}var Gg=y.createContext({isTransitioning:!1});Gg.displayName="ViewTransition";var A_=y.createContext(new Map);A_.displayName="Fetchers";var T_=y.createContext(null);T_.displayName="Await";var jt=y.createContext(null);jt.displayName="Navigation";var $i=y.createContext(null);$i.displayName="Location";var Ft=y.createContext({outlet:null,matches:[],isDataRoute:!1});Ft.displayName="Route";var _u=y.createContext(null);_u.displayName="RouteError";var Pg="REACT_ROUTER_ERROR",R_="REDIRECT",O_="ROUTE_ERROR_RESPONSE";function B_(e){if(e.startsWith(`${Pg}:${R_}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function z_(e){if(e.startsWith(`${Pg}:${O_}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new C_(t.status,t.statusText,t.data)}catch{}}function L_(e,{relative:t}={}){Ce(Bl(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:l}=y.useContext(jt),{hash:i,pathname:s,search:c}=Zi(e,{relative:t}),o=s;return n!=="/"&&(o=s==="/"?n:Lt([n,s])),l.createHref({pathname:o,search:c,hash:i})}function Bl(){return y.useContext($i)!=null}function Gt(){return Ce(Bl(),"useLocation() may be used only in the context of a <Router> component."),y.useContext($i).location}var qg="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Vg(e){y.useContext(jt).static||y.useLayoutEffect(e)}function ia(){let{isDataRoute:e}=y.useContext(Ft);return e?J_():H_()}function H_(){Ce(Bl(),"useNavigate() may be used only in the context of a <Router> component.");let e=y.useContext(Ol),{basename:t,navigator:n}=y.useContext(jt),{matches:l}=y.useContext(Ft),{pathname:i}=Gt(),s=JSON.stringify(xu(l)),c=y.useRef(!1);return Vg(()=>{c.current=!0}),y.useCallback((r,d={})=>{if(Ht(c.current,qg),!c.current)return;if(typeof r=="number"){n.go(r);return}let h=Jc(r,JSON.parse(s),i,d.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:Lt([t,h.pathname])),(d.replace?n.replace:n.push)(h,d.state,d)},[t,n,s,i,e])}y.createContext(null);function Zi(e,{relative:t}={}){let{matches:n}=y.useContext(Ft),{pathname:l}=Gt(),i=JSON.stringify(xu(n));return y.useMemo(()=>Jc(e,JSON.parse(i),l,t==="path"),[e,i,l,t])}function U_(e,t){return Yg(e,t)}function Yg(e,t,n){var M;Ce(Bl(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:l}=y.useContext(jt),{matches:i}=y.useContext(Ft),s=i[i.length-1],c=s?s.params:{},o=s?s.pathname:"/",r=s?s.pathnameBase:"/",d=s&&s.route;{let v=d&&d.path||"";Xg(o,!d||v.endsWith("*")||v.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${o}" (under <Route path="${v}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${v}"> to <Route path="${v==="/"?"*":`${v}/*`}">.`)}let h=Gt(),p;if(t){let v=typeof t=="string"?Rl(t):t;Ce(r==="/"||((M=v.pathname)==null?void 0:M.startsWith(r)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${r}" but pathname "${v.pathname}" was given in the \`location\` prop.`),p=v}else p=h;let f=p.pathname||"/",x=f;if(r!=="/"){let v=r.replace(/^\//,"").split("/");x="/"+f.replace(/^\//,"").split("/").slice(v.length).join("/")}let C=Tg(e,{pathname:x});Ht(d||C!=null,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),Ht(C==null||C[C.length-1].route.element!==void 0||C[C.length-1].route.Component!==void 0||C[C.length-1].route.lazy!==void 0,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let k=Y_(C&&C.map(v=>Object.assign({},v,{params:Object.assign({},c,v.params),pathname:Lt([r,l.encodeLocation?l.encodeLocation(v.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?r:Lt([r,l.encodeLocation?l.encodeLocation(v.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:v.pathnameBase])})),i,n);return t&&k?y.createElement($i.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...p},navigationType:"POP"}},k):k}function G_(){let e=Z_(),t=E_(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,l="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:l},s={padding:"2px 4px",backgroundColor:l},c=null;return console.error("Error handled by React Router default ErrorBoundary:",e),c=y.createElement(y.Fragment,null,y.createElement("p",null,"💿 Hey developer 👋"),y.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",y.createElement("code",{style:s},"ErrorBoundary")," or"," ",y.createElement("code",{style:s},"errorElement")," prop on your route.")),y.createElement(y.Fragment,null,y.createElement("h2",null,"Unexpected Application Error!"),y.createElement("h3",{style:{fontStyle:"italic"}},t),n?y.createElement("pre",{style:i},n):null,c)}var P_=y.createElement(G_,null),Qg=class extends y.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=z_(e.digest);n&&(e=n)}let t=e!==void 0?y.createElement(Ft.Provider,{value:this.props.routeContext},y.createElement(_u.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?y.createElement(q_,{error:e},t):t}};Qg.contextType=Ug;var ho=new WeakMap;function q_({children:e,error:t}){let{basename:n}=y.useContext(jt);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let l=B_(t.digest);if(l){let i=ho.get(t);if(i)throw i;let s=Lg(l.location,n);if(zg&&!ho.get(t))if(s.isExternal||l.reloadDocument)window.location.href=s.absoluteURL||s.to;else{const c=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:l.replace}));throw ho.set(t,c),c}return y.createElement("meta",{httpEquiv:"refresh",content:`0;url=${s.absoluteURL||s.to}`})}}return e}function V_({routeContext:e,match:t,children:n}){let l=y.useContext(Ol);return l&&l.static&&l.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=t.route.id),y.createElement(Ft.Provider,{value:e},n)}function Y_(e,t=[],n){let l=n==null?void 0:n.state;if(e==null){if(!l)return null;if(l.errors)e=l.matches;else if(t.length===0&&!l.initialized&&l.matches.length>0)e=l.matches;else return null}let i=e,s=l==null?void 0:l.errors;if(s!=null){let h=i.findIndex(p=>p.route.id&&(s==null?void 0:s[p.route.id])!==void 0);Ce(h>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),i=i.slice(0,Math.min(i.length,h+1))}let c=!1,o=-1;if(n&&l){c=l.renderFallback;for(let h=0;h<i.length;h++){let p=i[h];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(o=h),p.route.id){let{loaderData:f,errors:x}=l,C=p.route.loader&&!f.hasOwnProperty(p.route.id)&&(!x||x[p.route.id]===void 0);if(p.route.lazy||C){n.isStatic&&(c=!0),o>=0?i=i.slice(0,o+1):i=[i[0]];break}}}}let r=n==null?void 0:n.onError,d=l&&r?(h,p)=>{var f,x;r(h,{location:l.location,params:((x=(f=l.matches)==null?void 0:f[0])==null?void 0:x.params)??{},unstable_pattern:D_(l.matches),errorInfo:p})}:void 0;return i.reduceRight((h,p,f)=>{let x,C=!1,k=null,M=null;l&&(x=s&&p.route.id?s[p.route.id]:void 0,k=p.route.errorElement||P_,c&&(o<0&&f===0?(Xg("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),C=!0,M=null):o===f&&(C=!0,M=p.route.hydrateFallbackElement||null)));let v=t.concat(i.slice(0,f+1)),m=()=>{let _;return x?_=k:C?_=M:p.route.Component?_=y.createElement(p.route.Component,null):p.route.element?_=p.route.element:_=h,y.createElement(V_,{match:p,routeContext:{outlet:h,matches:v,isDataRoute:l!=null},children:_})};return l&&(p.route.ErrorBoundary||p.route.errorElement||f===0)?y.createElement(Qg,{location:l.location,revalidation:l.revalidation,component:k,error:x,children:m(),routeContext:{outlet:null,matches:v,isDataRoute:!0},onError:d}):m()},null)}function bu(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Q_(e){let t=y.useContext(Ol);return Ce(t,bu(e)),t}function X_(e){let t=y.useContext(Fc);return Ce(t,bu(e)),t}function K_(e){let t=y.useContext(Ft);return Ce(t,bu(e)),t}function ju(e){let t=K_(e),n=t.matches[t.matches.length-1];return Ce(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function $_(){return ju("useRouteId")}function Z_(){var l;let e=y.useContext(_u),t=X_("useRouteError"),n=ju("useRouteError");return e!==void 0?e:(l=t.errors)==null?void 0:l[n]}function J_(){let{router:e}=Q_("useNavigate"),t=ju("useNavigate"),n=y.useRef(!1);return Vg(()=>{n.current=!0}),y.useCallback(async(i,s={})=>{Ht(n.current,qg),n.current&&(typeof i=="number"?await e.navigate(i):await e.navigate(i,{fromRouteId:t,...s}))},[e,t])}var bp={};function Xg(e,t,n){!t&&!bp[e]&&(bp[e]=!0,Ht(!1,n))}y.memo(F_);function F_({routes:e,future:t,state:n,isStatic:l,onError:i}){return Yg(e,void 0,{state:n,isStatic:l,onError:i,future:t})}function jp({to:e,replace:t,state:n,relative:l}){Ce(Bl(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=y.useContext(jt);Ht(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:s}=y.useContext(Ft),{pathname:c}=Gt(),o=ia(),r=Jc(e,xu(s),c,l==="path"),d=JSON.stringify(r);return y.useEffect(()=>{o(JSON.parse(d),{replace:t,state:n,relative:l})},[o,d,l,t,n]),null}function dn(e){Ce(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function W_({basename:e="/",children:t=null,location:n,navigationType:l="POP",navigator:i,static:s=!1,unstable_useTransitions:c}){Ce(!Bl(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=e.replace(/^\/*/,"/"),r=y.useMemo(()=>({basename:o,navigator:i,static:s,unstable_useTransitions:c,future:{}}),[o,i,s,c]);typeof n=="string"&&(n=Rl(n));let{pathname:d="/",search:h="",hash:p="",state:f=null,key:x="default",unstable_mask:C}=n,k=y.useMemo(()=>{let M=Sn(d,o);return M==null?null:{location:{pathname:M,search:h,hash:p,state:f,key:x,unstable_mask:C},navigationType:l}},[o,d,h,p,f,x,l,C]);return Ht(k!=null,`<Router basename="${o}"> is not able to match the URL "${d}${h}${p}" because it does not start with the basename, so the <Router> won't render anything.`),k==null?null:y.createElement(jt.Provider,{value:r},y.createElement($i.Provider,{children:t,value:k}))}function I_({children:e,location:t}){return U_(fd(e),t)}function fd(e,t=[]){let n=[];return y.Children.forEach(e,(l,i)=>{if(!y.isValidElement(l))return;let s=[...t,i];if(l.type===y.Fragment){n.push.apply(n,fd(l.props.children,s));return}Ce(l.type===dn,`[${typeof l.type=="string"?l.type:l.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ce(!l.props.index||!l.props.children,"An index route cannot have child routes.");let c={id:l.props.id||s.join("-"),caseSensitive:l.props.caseSensitive,element:l.props.element,Component:l.props.Component,index:l.props.index,path:l.props.path,middleware:l.props.middleware,loader:l.props.loader,action:l.props.action,hydrateFallbackElement:l.props.hydrateFallbackElement,HydrateFallback:l.props.HydrateFallback,errorElement:l.props.errorElement,ErrorBoundary:l.props.ErrorBoundary,hasErrorBoundary:l.props.hasErrorBoundary===!0||l.props.ErrorBoundary!=null||l.props.errorElement!=null,shouldRevalidate:l.props.shouldRevalidate,handle:l.props.handle,lazy:l.props.lazy};l.props.children&&(c.children=fd(l.props.children,s)),n.push(c)}),n}var Fs="get",Ws="application/x-www-form-urlencoded";function Wc(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function eb(e){return Wc(e)&&e.tagName.toLowerCase()==="button"}function tb(e){return Wc(e)&&e.tagName.toLowerCase()==="form"}function nb(e){return Wc(e)&&e.tagName.toLowerCase()==="input"}function ab(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function lb(e,t){return e.button===0&&(!t||t==="_self")&&!ab(e)}var Os=null;function ib(){if(Os===null)try{new FormData(document.createElement("form"),0),Os=!1}catch{Os=!0}return Os}var sb=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function mo(e){return e!=null&&!sb.has(e)?(Ht(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ws}"`),null):e}function cb(e,t){let n,l,i,s,c;if(tb(e)){let o=e.getAttribute("action");l=o?Sn(o,t):null,n=e.getAttribute("method")||Fs,i=mo(e.getAttribute("enctype"))||Ws,s=new FormData(e)}else if(eb(e)||nb(e)&&(e.type==="submit"||e.type==="image")){let o=e.form;if(o==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let r=e.getAttribute("formaction")||o.getAttribute("action");if(l=r?Sn(r,t):null,n=e.getAttribute("formmethod")||o.getAttribute("method")||Fs,i=mo(e.getAttribute("formenctype"))||mo(o.getAttribute("enctype"))||Ws,s=new FormData(o,e),!ib()){let{name:d,type:h,value:p}=e;if(h==="image"){let f=d?`${d}.`:"";s.append(`${f}x`,"0"),s.append(`${f}y`,"0")}else d&&s.append(d,p)}}else{if(Wc(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Fs,l=null,i=Ws,c=e}return s&&i==="text/plain"&&(c=s,s=void 0),{action:l,method:n.toLowerCase(),encType:i,formData:s,body:c}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Nu(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Kg(e,t,n,l){let i=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?i.pathname.endsWith("/")?i.pathname=`${i.pathname}_.${l}`:i.pathname=`${i.pathname}.${l}`:i.pathname==="/"?i.pathname=`_root.${l}`:t&&Sn(i.pathname,t)==="/"?i.pathname=`${kc(t)}/_root.${l}`:i.pathname=`${kc(i.pathname)}.${l}`,i}async function rb(e,t){if(e.id in t)return t[e.id];try{let n=await n_(()=>import(e.module),[]);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ob(e){return e!=null&&typeof e.page=="string"}function db(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function ub(e,t,n){let l=await Promise.all(e.map(async i=>{let s=t.routes[i.route.id];if(s){let c=await rb(s,n);return c.links?c.links():[]}return[]}));return pb(l.flat(1).filter(db).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function Np(e,t,n,l,i,s){let c=(r,d)=>n[d]?r.route.id!==n[d].route.id:!0,o=(r,d)=>{var h;return n[d].pathname!==r.pathname||((h=n[d].route.path)==null?void 0:h.endsWith("*"))&&n[d].params["*"]!==r.params["*"]};return s==="assets"?t.filter((r,d)=>c(r,d)||o(r,d)):s==="data"?t.filter((r,d)=>{var p;let h=l.routes[r.route.id];if(!h||!h.hasLoader)return!1;if(c(r,d)||o(r,d))return!0;if(r.route.shouldRevalidate){let f=r.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((p=n[0])==null?void 0:p.params)||{},nextUrl:new URL(e,window.origin),nextParams:r.params,defaultShouldRevalidate:!0});if(typeof f=="boolean")return f}return!0}):[]}function hb(e,t,{includeHydrateFallback:n}={}){return mb(e.map(l=>{let i=t.routes[l.route.id];if(!i)return[];let s=[i.module];return i.clientActionModule&&(s=s.concat(i.clientActionModule)),i.clientLoaderModule&&(s=s.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(s=s.concat(i.hydrateFallbackModule)),i.imports&&(s=s.concat(i.imports)),s}).flat(1))}function mb(e){return[...new Set(e)]}function fb(e){let t={},n=Object.keys(e).sort();for(let l of n)t[l]=e[l];return t}function pb(e,t){let n=new Set,l=new Set(t);return e.reduce((i,s)=>{if(t&&!ob(s)&&s.as==="script"&&s.href&&l.has(s.href))return i;let o=JSON.stringify(fb(s));return n.has(o)||(n.add(o),i.push({key:o,link:s})),i},[])}function Su(){let e=y.useContext(Ol);return Nu(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function gb(){let e=y.useContext(Fc);return Nu(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var wu=y.createContext(void 0);wu.displayName="FrameworkContext";function Cu(){let e=y.useContext(wu);return Nu(e,"You must render this element inside a <HydratedRouter> element"),e}function vb(e,t){let n=y.useContext(wu),[l,i]=y.useState(!1),[s,c]=y.useState(!1),{onFocus:o,onBlur:r,onMouseEnter:d,onMouseLeave:h,onTouchStart:p}=t,f=y.useRef(null);y.useEffect(()=>{if(e==="render"&&c(!0),e==="viewport"){let k=v=>{v.forEach(m=>{c(m.isIntersecting)})},M=new IntersectionObserver(k,{threshold:.5});return f.current&&M.observe(f.current),()=>{M.disconnect()}}},[e]),y.useEffect(()=>{if(l){let k=setTimeout(()=>{c(!0)},100);return()=>{clearTimeout(k)}}},[l]);let x=()=>{i(!0)},C=()=>{i(!1),c(!1)};return n?e!=="intent"?[s,f,{}]:[s,f,{onFocus:ti(o,x),onBlur:ti(r,C),onMouseEnter:ti(d,x),onMouseLeave:ti(h,C),onTouchStart:ti(p,x)}]:[!1,f,{}]}function ti(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function yb({page:e,...t}){let n=M_(),{router:l}=Su(),i=y.useMemo(()=>Tg(l.routes,e,l.basename),[l.routes,e,l.basename]);return i?n?y.createElement(_b,{page:e,matches:i,...t}):y.createElement(bb,{page:e,matches:i,...t}):null}function xb(e){let{manifest:t,routeModules:n}=Cu(),[l,i]=y.useState([]);return y.useEffect(()=>{let s=!1;return ub(e,t,n).then(c=>{s||i(c)}),()=>{s=!0}},[e,t,n]),l}function _b({page:e,matches:t,...n}){let l=Gt(),{future:i}=Cu(),{basename:s}=Su(),c=y.useMemo(()=>{if(e===l.pathname+l.search+l.hash)return[];let o=Kg(e,s,i.unstable_trailingSlashAwareDataRequests,"rsc"),r=!1,d=[];for(let h of t)typeof h.route.shouldRevalidate=="function"?r=!0:d.push(h.route.id);return r&&d.length>0&&o.searchParams.set("_routes",d.join(",")),[o.pathname+o.search]},[s,i.unstable_trailingSlashAwareDataRequests,e,l,t]);return y.createElement(y.Fragment,null,c.map(o=>y.createElement("link",{key:o,rel:"prefetch",as:"fetch",href:o,...n})))}function bb({page:e,matches:t,...n}){let l=Gt(),{future:i,manifest:s,routeModules:c}=Cu(),{basename:o}=Su(),{loaderData:r,matches:d}=gb(),h=y.useMemo(()=>Np(e,t,d,s,l,"data"),[e,t,d,s,l]),p=y.useMemo(()=>Np(e,t,d,s,l,"assets"),[e,t,d,s,l]),f=y.useMemo(()=>{if(e===l.pathname+l.search+l.hash)return[];let k=new Set,M=!1;if(t.forEach(m=>{var w;let _=s.routes[m.route.id];!_||!_.hasLoader||(!h.some(O=>O.route.id===m.route.id)&&m.route.id in r&&((w=c[m.route.id])!=null&&w.shouldRevalidate)||_.hasClientLoader?M=!0:k.add(m.route.id))}),k.size===0)return[];let v=Kg(e,o,i.unstable_trailingSlashAwareDataRequests,"data");return M&&k.size>0&&v.searchParams.set("_routes",t.filter(m=>k.has(m.route.id)).map(m=>m.route.id).join(",")),[v.pathname+v.search]},[o,i.unstable_trailingSlashAwareDataRequests,r,l,s,h,t,e,c]),x=y.useMemo(()=>hb(p,s),[p,s]),C=xb(p);return y.createElement(y.Fragment,null,f.map(k=>y.createElement("link",{key:k,rel:"prefetch",as:"fetch",href:k,...n})),x.map(k=>y.createElement("link",{key:k,rel:"modulepreload",href:k,...n})),C.map(({key:k,link:M})=>y.createElement("link",{key:k,nonce:n.nonce,...M,crossOrigin:M.crossOrigin??n.crossOrigin})))}function jb(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Nb=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Nb&&(window.__reactRouterVersion="7.14.2")}catch{}function Sb({basename:e,children:t,unstable_useTransitions:n,window:l}){let i=y.useRef();i.current==null&&(i.current=a_({window:l,v5Compat:!0}));let s=i.current,[c,o]=y.useState({action:s.action,location:s.location}),r=y.useCallback(d=>{n===!1?o(d):y.startTransition(()=>o(d))},[n]);return y.useLayoutEffect(()=>s.listen(r),[s,r]),y.createElement(W_,{basename:e,children:t,location:c.location,navigationType:c.action,navigator:s,unstable_useTransitions:n})}var $g=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Zg=y.forwardRef(function({onClick:t,discover:n="render",prefetch:l="none",relative:i,reloadDocument:s,replace:c,unstable_mask:o,state:r,target:d,to:h,preventScrollReset:p,viewTransition:f,unstable_defaultShouldRevalidate:x,...C},k){let{basename:M,navigator:v,unstable_useTransitions:m}=y.useContext(jt),_=typeof h=="string"&&$g.test(h),w=Lg(h,M);h=w.to;let O=L_(h,{relative:i}),L=Gt(),z=null;if(o){let H=Jc(o,[],L.unstable_mask?L.unstable_mask.pathname:"/",!0);M!=="/"&&(H.pathname=H.pathname==="/"?M:Lt([M,H.pathname])),z=v.createHref(H)}let[P,Y,Q]=vb(l,C),I=Db(h,{replace:c,unstable_mask:o,state:r,target:d,preventScrollReset:p,relative:i,viewTransition:f,unstable_defaultShouldRevalidate:x,unstable_useTransitions:m});function _e(H){t&&t(H),H.defaultPrevented||I(H)}let Qe=!(w.isExternal||s),Te=y.createElement("a",{...C,...Q,href:(Qe?z:void 0)||w.absoluteURL||O,onClick:Qe?_e:t,ref:jb(k,Y),target:d,"data-discover":!_&&n==="render"?"true":void 0});return P&&!_?y.createElement(y.Fragment,null,Te,y.createElement(yb,{page:O})):Te});Zg.displayName="Link";var wb=y.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:l="",end:i=!1,style:s,to:c,viewTransition:o,children:r,...d},h){let p=Zi(c,{relative:d.relative}),f=Gt(),x=y.useContext(Fc),{navigator:C,basename:k}=y.useContext(jt),M=x!=null&&Rb(p)&&o===!0,v=C.encodeLocation?C.encodeLocation(p).pathname:p.pathname,m=f.pathname,_=x&&x.navigation&&x.navigation.location?x.navigation.location.pathname:null;n||(m=m.toLowerCase(),_=_?_.toLowerCase():null,v=v.toLowerCase()),_&&k&&(_=Sn(_,k)||_);const w=v!=="/"&&v.endsWith("/")?v.length-1:v.length;let O=m===v||!i&&m.startsWith(v)&&m.charAt(w)==="/",L=_!=null&&(_===v||!i&&_.startsWith(v)&&_.charAt(v.length)==="/"),z={isActive:O,isPending:L,isTransitioning:M},P=O?t:void 0,Y;typeof l=="function"?Y=l(z):Y=[l,O?"active":null,L?"pending":null,M?"transitioning":null].filter(Boolean).join(" ");let Q=typeof s=="function"?s(z):s;return y.createElement(Zg,{...d,"aria-current":P,className:Y,ref:h,style:Q,to:c,viewTransition:o},typeof r=="function"?r(z):r)});wb.displayName="NavLink";var Cb=y.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:l,replace:i,state:s,method:c=Fs,action:o,onSubmit:r,relative:d,preventScrollReset:h,viewTransition:p,unstable_defaultShouldRevalidate:f,...x},C)=>{let{unstable_useTransitions:k}=y.useContext(jt),M=Ab(),v=Tb(o,{relative:d}),m=c.toLowerCase()==="get"?"get":"post",_=typeof o=="string"&&$g.test(o),w=O=>{if(r&&r(O),O.defaultPrevented)return;O.preventDefault();let L=O.nativeEvent.submitter,z=(L==null?void 0:L.getAttribute("formmethod"))||c,P=()=>M(L||O.currentTarget,{fetcherKey:t,method:z,navigate:n,replace:i,state:s,relative:d,preventScrollReset:h,viewTransition:p,unstable_defaultShouldRevalidate:f});k&&n!==!1?y.startTransition(()=>P()):P()};return y.createElement("form",{ref:C,method:m,action:v,onSubmit:l?r:w,...x,"data-discover":!_&&e==="render"?"true":void 0})});Cb.displayName="Form";function Eb(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Jg(e){let t=y.useContext(Ol);return Ce(t,Eb(e)),t}function Db(e,{target:t,replace:n,unstable_mask:l,state:i,preventScrollReset:s,relative:c,viewTransition:o,unstable_defaultShouldRevalidate:r,unstable_useTransitions:d}={}){let h=ia(),p=Gt(),f=Zi(e,{relative:c});return y.useCallback(x=>{if(lb(x,t)){x.preventDefault();let C=n!==void 0?n:Bi(p)===Bi(f),k=()=>h(e,{replace:C,unstable_mask:l,state:i,preventScrollReset:s,relative:c,viewTransition:o,unstable_defaultShouldRevalidate:r});d?y.startTransition(()=>k()):k()}},[p,h,f,n,l,i,t,e,s,c,o,r,d])}var kb=0,Mb=()=>`__${String(++kb)}__`;function Ab(){let{router:e}=Jg("useSubmit"),{basename:t}=y.useContext(jt),n=$_(),l=e.fetch,i=e.navigate;return y.useCallback(async(s,c={})=>{let{action:o,method:r,encType:d,formData:h,body:p}=cb(s,t);if(c.navigate===!1){let f=c.fetcherKey||Mb();await l(f,n,c.action||o,{unstable_defaultShouldRevalidate:c.unstable_defaultShouldRevalidate,preventScrollReset:c.preventScrollReset,formData:h,body:p,formMethod:c.method||r,formEncType:c.encType||d,flushSync:c.flushSync})}else await i(c.action||o,{unstable_defaultShouldRevalidate:c.unstable_defaultShouldRevalidate,preventScrollReset:c.preventScrollReset,formData:h,body:p,formMethod:c.method||r,formEncType:c.encType||d,replace:c.replace,state:c.state,fromRouteId:n,flushSync:c.flushSync,viewTransition:c.viewTransition})},[l,i,t,n])}function Tb(e,{relative:t}={}){let{basename:n}=y.useContext(jt),l=y.useContext(Ft);Ce(l,"useFormAction must be used inside a RouteContext");let[i]=l.matches.slice(-1),s={...Zi(e||".",{relative:t})},c=Gt();if(e==null){s.search=c.search;let o=new URLSearchParams(s.search),r=o.getAll("index");if(r.some(h=>h==="")){o.delete("index"),r.filter(p=>p).forEach(p=>o.append("index",p));let h=o.toString();s.search=h?`?${h}`:""}}return(!e||e===".")&&i.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:Lt([n,s.pathname])),Bi(s)}function Rb(e,{relative:t}={}){let n=y.useContext(Gg);Ce(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:l}=Jg("useViewTransitionState"),i=Zi(e,{relative:t});if(!n.isTransitioning)return!1;let s=Sn(n.currentLocation.pathname,l)||n.currentLocation.pathname,c=Sn(n.nextLocation.pathname,l)||n.nextLocation.pathname;return Dc(i.pathname,c)!=null||Dc(i.pathname,s)!=null}const Ob=()=>{ia();const[e,t]=y.useState([]),[n,l]=y.useState(""),[i,s]=y.useState(!1),[c,o]=y.useState([]),[r,d]=y.useState({}),[h,p]=y.useState([]),[f,x]=y.useState(null),[C,k]=y.useState(!1),[M,v]=y.useState([]),[m,_]=y.useState(0),[w,O]=y.useState(0);y.useEffect(()=>{const H=localStorage.getItem("healoraBasket");H&&d(JSON.parse(H))},[]),y.useEffect(()=>{localStorage.setItem("healoraBasket",JSON.stringify(r))},[r]);const L=(H,B=!1)=>{const q={id:Date.now(),text:H,user:B,time:new Date().toLocaleTimeString(),type:"text"};t(G=>[...G,q])},z=(H,B,q)=>{const G={id:Date.now(),type:"task",title:H,points:B,category:q,completed:!1,user:!1,time:new Date().toLocaleTimeString()};t(ee=>[...ee,G])},P=[{title:"Пить 2л воды в день",points:10,category:"Питание"},{title:"Прогулка 30 мин",points:15,category:"Активность"},{title:"Ложиться до 23:00",points:20,category:"Сон"},{title:"Медитация 10 мин",points:10,category:"Ментальное"},{title:"Записать приемы пищи",points:5,category:"Дневник"},{title:"Измерить пульс утром",points:15,category:"Мониторинг"}],Y=H=>{t(B=>B.map(q=>{if(q.id===H&&!q.completed){const G={time:new Date().toLocaleTimeString(),action:`Выполнено: ${q.title} (+${q.points} звёзд)`};return p(ee=>[G,...ee].slice(0,20)),{...q,completed:!0}}return q}))},Q=async H=>{if(H.preventDefault(),!n.trim())return;const B=n;l(""),L(B,!0),s(!0);try{const G=await(await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:B})})).json();G.reply&&L(G.reply,!1),G.quiz&&(x(G.quiz),k(!0),v(Array(G.quiz.questions.length).fill(null)),_(0),O(0)),/задач|реком|совет|предлож|делать|план|тренировк|упражнен/i.test(B)&&setTimeout(()=>{L("Вот рекомендованные задачи на сегодня:",!1),P.forEach(T=>z(T.title,T.points,T.category))},500)}catch(q){console.error(q),L("Ошибка соединения",!1)}finally{s(!1)}},I=H=>{if(!c.includes(H)){o(G=>[...G,H]),d(G=>{const ee={...G};return ee[H]={sample:`Data for ${H}`},ee});const B={wearable:"Wearables (HRV, сон)",voice:"Voice (голосовой ввод)",medical:"Medical (анализы)",food:"Food Photos (фото еды)",genetics:"Genetics (генетика)",mental:"Mental (медитации)"},q={time:new Date().toLocaleTimeString(),action:`Добавлен источник: ${B[H]||H}`};p(G=>[q,...G].slice(0,20))}},_e=(H,B)=>{v(q=>{const G=[...q];return G[H]=B,G})},Qe=()=>{if(w<M.length-1)O(H=>H+1);else{let H=0;M.forEach((B,q)=>{f.questions&&B===f.questions[q].correct_answer&&H++}),_(H),k(!1),L(`Вы набрали ${H} из ${f.questions.length} звезд!`,!1)}},Te=()=>{w>0&&O(H=>H-1)};return C&&f?a.jsxs("div",{className:"chat-container",children:[a.jsxs("div",{className:"chat-header",children:[a.jsxs("h2",{children:["Викторина: ",f.title]}),a.jsx("button",{onClick:()=>k(!1),className:"close-quiz",id:"EL_ICON_012",children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsxs("div",{className:"quiz-container",children:[a.jsx("div",{className:"quiz-question",children:a.jsx("p",{children:f.questions[w].question})}),a.jsx("div",{className:"quiz-options",children:f.questions[w].options.map((H,B)=>a.jsx("div",{className:`quiz-option ${M[w]===B?"selected":""}`,onClick:()=>_e(w,B),children:H},B))}),a.jsxs("div",{className:"quiz-nav",children:[a.jsx("button",{onClick:Te,disabled:w===0,className:"nav-btn",children:"Назад"}),a.jsx("button",{onClick:Qe,disabled:M[w]===null,className:"nav-btn",children:w===M.length-1?"Завершить":"Далее"})]}),m>0&&w===M.length-1&&a.jsxs("div",{className:"quiz-result",children:[a.jsxs("p",{children:["Ваш результат: ",m," из ",f.questions.length]}),a.jsxs("p",{children:["Вы получили ",m," звезд!"]})]})]})]}):a.jsxs("div",{className:"chat-container",children:[a.jsx("div",{className:"chat-header",children:a.jsx("h2",{children:"Healora AI Ассистент"})}),a.jsxs("div",{className:"chat-messages",children:[e.map(H=>H.type==="task"?a.jsxs("div",{className:`task-card ${H.completed?"completed":""}`,onClick:()=>Y(H.id),children:[a.jsx("div",{className:"checkbox",children:H.completed?"✓":""}),a.jsxs("div",{className:"content",children:[a.jsx("div",{className:"title",children:H.title}),a.jsxs("div",{className:"points",children:["+",H.points," звёзд"]}),a.jsx("div",{className:"category",children:H.category})]})]},H.id):a.jsx("div",{className:`message ${H.user?"user-message":"ai-message"}`,children:a.jsxs("div",{className:"message-content",children:[a.jsx("p",{children:H.text}),a.jsx("small",{className:"message-time",children:H.time})]})},H.id)),i&&a.jsx("div",{className:"message ai-message",children:a.jsx("div",{className:"message-content",children:a.jsx("p",{children:"Думаю..."})})})]}),a.jsxs("form",{onSubmit:Q,className:"chat-form",children:[a.jsx("input",{type:"text",value:n,onChange:H=>l(H.target.value),placeholder:"Напишите сообщение...",disabled:i}),a.jsx("button",{type:"submit",disabled:i||!n.trim(),children:i?"Отправка...":"Отправить"})]}),a.jsxs("div",{className:"chat-sidebar",children:[a.jsxs("div",{className:"sidebar-section",children:[a.jsx("h3",{children:"Источники данных"}),a.jsx("div",{className:"sources-list",children:["wearable","voice","medical","food","genetics","mental"].map(H=>a.jsxs("div",{className:`source-item ${c.includes(H)?"added":""}`,onClick:()=>!c.includes(H)&&I(H),children:[a.jsxs("span",{children:[H==="wearable"&&"Wearables",H==="voice"&&"Voice",H==="medical"&&"Medical",H==="food"&&"Food Photos",H==="genetics"&&"Genetics",H==="mental"&&"Mental"]}),c.includes(H)&&a.jsx("span",{className:"remove-source",onClick:B=>{B.stopPropagation()},children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"12",height:"12",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]},H))})]}),a.jsxs("div",{className:"sidebar-section",children:[a.jsx("h3",{children:"Журнал действий"}),a.jsx("div",{className:"action-log",children:h.map((H,B)=>a.jsxs("div",{className:"log-entry",children:[a.jsx("div",{className:"time",children:H.time}),a.jsx("div",{children:H.action})]},B))})]})]})]})},Bb=({onDrop:e,allowedTypes:t=["wearable","bio_check","bio_anamnes"]})=>{const[n,l]=y.useState(!1),i=y.useCallback(s=>{var d,h;s.preventDefault(),l(!1);const c=s.dataTransfer.getData("application/json")||s.dataTransfer.getData("text/plain");if(!c)return;let o=c;try{o=JSON.parse(c)}catch{}const r=(o==null?void 0:o.type)||(((h=(d=o==null?void 0:o.device_type)==null?void 0:d.toLowerCase)==null?void 0:h.call(d))??"unknown");t.includes(r),e==null||e(o)},[e,t]);return a.jsx("div",{className:`drop-zone ${n?"active":""}`,onDragOver:s=>{s.preventDefault(),l(!0)},onDragLeave:()=>l(!1),onDrop:i,style:{padding:20,borderRadius:12},children:"Перетащите данные устройства сюда"})},zb=()=>{const e=ia(),[t,n]=y.useState([]),[l,i]=y.useState([]),[s,c]=y.useState([]),[o,r]=y.useState({energy:75,focus:60,stress:40,sleep:70,mood:65}),[d,h]=y.useState([]);y.useEffect(()=>{const v=localStorage.getItem("healora_drop_data");if(v)try{h(JSON.parse(v))}catch{}},[]),y.useEffect(()=>{localStorage.setItem("healora_drop_data",JSON.stringify(d))},[d]);const p=v=>{var w,O,L,z;const m=v.type||(((w=v.payload)==null?void 0:w.type)??"unknown"),_=((O=v.payload)==null?void 0:O.name)??((L=v.payload)==null?void 0:L.device_id)??((z=v.payload)==null?void 0:z.title)??"Данные";return a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx("span",{style:{fontSize:18},children:m==="wearable"?"Wearable":m}),a.jsx("span",{style:{fontWeight:600},children:_})]})},f=v=>{const m={id:Date.now(),type:(v==null?void 0:v.type)??(v==null?void 0:v.device_type)??"unknown",payload:v,time:new Date().toLocaleTimeString()};h(_=>[m,..._])},[x,C]=y.useState(!0);y.useEffect(()=>{(async()=>{try{const m=await fetch("/docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json");if(!m.ok)throw new Error("Failed to fetch profiles");const _=await m.json();n(_.healora_test_profiles||[])}catch(m){console.error("Error loading profiles:",m),n([{profile_id:"TEST_001",demographics:{age:34,sex:"Male",bmi:22.1}},{profile_id:"TEST_002",demographics:{age:28,sex:"Female",bmi:20.5}},{profile_id:"TEST_003",demographics:{age:45,sex:"Male",bmi:28.3}},{profile_id:"TEST_004",demographics:{age:32,sex:"Female",bmi:24.7}},{profile_id:"TEST_005",demographics:{age:29,sex:"Male",bmi:26.1}}])}finally{C(!1)}})()},[]),y.useEffect(()=>{c([{title:"Утренняя медитация 10 минут",description:"Начните день с осознанности и спокойствия",source_url:"https://healora.ru/articles/morning-meditation",type:"mental"},{title:"Холодный душ после тренировки",description:"Ускорьте восстановление и бодрость",source_url:"https://healora.ru/articles/cold-shower",type:"physical"},{title:"Прогулка на природе 30 минут",description:"Повысьте настроение и креативность",source_url:"https://healora.ru/articles/nature-walk",type:"lifestyle"}])},[]);const k=v=>{i(m=>m.includes(v)?m.filter(_=>_!==v):[...m,v])},M=v=>{e(`/chat?intervention=${encodeURIComponent(JSON.stringify(v))}`)};return x?a.jsxs("div",{className:"progress-container",children:[a.jsx("div",{className:"progress-header",children:a.jsxs("div",{className:"phone-header",onClick:()=>e("/chat"),children:[a.jsx("img",{src:"/images/healora.png",alt:"Healora",className:"logo"}),a.jsx("div",{children:a.jsxs("div",{className:"score",children:[a.jsx("span",{id:"total-stars",children:"840"})," звёзд"]})})]})}),a.jsx("div",{style:{padding:"20px",textAlign:"center"},children:"Загрузка данных..."})]}):a.jsxs("div",{className:"progress-container",children:[a.jsxs("div",{className:"progress-header",children:[a.jsxs("div",{className:"phone-header",onClick:()=>e("/chat"),children:[a.jsx("img",{src:"/images/healora.png",alt:"Healora",className:"logo"}),a.jsxs("div",{children:[a.jsxs("div",{className:"score",children:[a.jsx("span",{id:"total-stars",children:"840"})," звёзд"]}),a.jsx("div",{className:"progress",children:"68% плана | 5 дней подряд"}),a.jsx("div",{className:"streak",children:"Уровень: Functional Application (41-60)"})]})]}),a.jsx("h2",{children:"Ваш Путь к Здоровью"})]}),a.jsxs("div",{className:"progress-content",children:[a.jsxs("div",{className:"profile-section",children:[a.jsx("h3",{children:"Выберите свой профиль Digital Twin:"}),a.jsx("div",{className:"profiles-grid",children:t.map(v=>{var m,_,w;return a.jsxs("div",{className:`profile-card ${l.includes(v.profile_id)?"selected":""}`,onClick:()=>k(v.profile_id),children:[a.jsx("div",{className:"profile-id",children:v.profile_id}),a.jsxs("div",{className:"profile-name",children:[(m=v.demographics)==null?void 0:m.age," лет, ",(_=v.demographics)==null?void 0:_.sex,", BMI ",(w=v.demographics)==null?void 0:w.bmi]})]},v.profile_id)})}),a.jsxs("p",{style:{fontSize:"12px",color:"#7b1fa2",marginTop:"10px"},children:["Выбрано профилей: ",l.length]})]}),a.jsxs("div",{className:"profile-section",children:[a.jsx("h3",{children:"Прогресс пути"}),a.jsxs("div",{className:"param-row",children:[a.jsx("span",{className:"param-name",children:"Дней в пути"}),a.jsx("span",{className:"param-value",children:"42 дня"}),a.jsx("span",{className:"param-status status-good"})]}),a.jsxs("div",{className:"param-row",children:[a.jsx("span",{className:"param-name",children:"Текущий этап"}),a.jsx("span",{className:"param-value",children:"Фаза 2: Стабилизация"}),a.jsx("span",{className:"param-status status-good"})]}),a.jsxs("div",{className:"param-row",children:[a.jsx("span",{className:"param-name",children:"Общий прогресс"}),a.jsx("span",{className:"param-value",children:"68% (42/62 задач выполнено)"}),a.jsx("span",{className:"param-status status-good"})]})]}),a.jsxs("div",{className:"profile-section",children:[a.jsx("h3",{children:"Рекомендуемые интервенции:"}),a.jsx("div",{className:"interventions-grid",children:s.map((v,m)=>a.jsxs("div",{className:"intervention-card",onClick:()=>M(v),children:[a.jsx("h4",{children:v.title}),a.jsx("p",{children:v.description}),a.jsx("div",{style:{fontSize:"11px",color:"#607d8b",marginTop:"8px",display:"flex",alignItems:"center",gap:"5px"},children:"Читать статью"})]},m))})]}),a.jsxs("div",{className:"path-dropzone-section",style:{padding:12},children:[a.jsx(Bb,{onDrop:f}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, 180px)",gap:12,marginTop:12},children:d.map(v=>a.jsxs("div",{className:"drop-preview-card",style:{padding:8,border:"1px solid #ddd",borderRadius:6},children:[p(v),a.jsx("div",{style:{fontSize:10,color:"#777"},children:v.time})]},v.id))})]}),a.jsxs("div",{className:"profile-section",children:[a.jsx("h3",{children:"Состояние вашего Digital Twin:"}),a.jsx("div",{className:"state-indicators",children:Object.entries(o).map(([v,m])=>a.jsxs("div",{className:"state-item",children:[a.jsx("label",{children:v==="energy"?"Энергия":v==="focus"?"Фокус":v==="stress"?"Стресс":v==="sleep"?"Сон":"Настроение"}),a.jsxs("div",{className:"state-value",children:[m,"%"]}),a.jsx("div",{className:"state-bar",children:a.jsx("div",{className:"state-fill",style:{width:`${m}%`}})})]},v))})]})]})]})},Lb=()=>{ia();const e={totalStars:840,streak:5,level:12,healthScore:65,rank:"Emerging Awareness"},t=[{icon:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:a.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"})}),name:"Первый шаг",condition:"3 задания подряд",earned:!0},{icon:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:a.jsx("path",{d:"M12 2c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1V3c0-.5.5-1 1-1zm0 18c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1v-1c0-.5.5-1 1-1zm10-8c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1h-1c-.5 0-1 .5-1 1zM2 12c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1H3c-.5 0-1 .5-1 1zm16.95-7.95c.4.4.4 1 0 1.4l-.71.71c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l.71-.71c.4-.39 1.03-.39 1.41 0zM6.34 17.66c.4.4.4 1 0 1.41l-.71.71c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l.71-.71c.39-.39 1.02-.39 1.41 0zM17.66 17.66c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0l-.71-.71c-.39-.39-.39-1.02 0-1.41zM6.34 6.34c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0l-.71-.71c-.39-.39-.39-1.02 0-1.41z"})}),name:"На огне",condition:"7 дней без пропусков",earned:!0},{icon:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:a.jsx("path",{d:"M12 3v18M3 12h18"})}),name:"Баланс",condition:"≥50 очков в каждой категории",earned:!1},{icon:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:a.jsx("path",{d:"M3 17l6-6 4 4 8-8M16 9h6v6"})}),name:"Минус 2 кг",condition:"Привязка к трекеру веса",earned:!1}],n={name:"Анна",age:28,weight:55,height:165,bmi:20.2};return a.jsxs("div",{className:"profile-container",children:[a.jsxs("div",{className:"profile-header",children:[a.jsx("div",{className:"avatar-large",id:"EL_ICON_013",children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"60",height:"60",children:[a.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),a.jsx("circle",{cx:"12",cy:"7",r:"4"})]})}),a.jsx("h2",{children:n.name}),a.jsxs("p",{className:"profile-subtitle",children:["Уровень ",e.level]})]}),a.jsxs("div",{className:"stats-grid",children:[a.jsxs("div",{className:"stat-card",id:"EL_COMP_003",children:[a.jsx("span",{className:"stat-icon",id:"EL_ICON_010",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:a.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})})}),a.jsx("span",{className:"stat-value",children:e.totalStars}),a.jsx("span",{className:"stat-label",children:"Звёзд"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("span",{className:"stat-icon",id:"EL_ICON_014",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:a.jsx("path",{d:"M12 2c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1V3c0-.5.5-1 1-1zm0 18c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1v-1c0-.5.5-1 1-1zm10-8c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1h-1c-.5 0-1 .5-1 1zM2 12c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1H3c-.5 0-1 .5-1 1zm16.95-7.95c.4.4.4 1 0 1.4l-.71.71c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l.71-.71c.4-.39 1.03-.39 1.41 0z"})})}),a.jsx("span",{className:"stat-value",children:e.streak}),a.jsx("span",{className:"stat-label",children:"Дней подряд"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("span",{className:"stat-icon",id:"EL_ICON_015",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:a.jsx("path",{d:"M18 20V10M12 20V4M6 20v-6"})})}),a.jsx("span",{className:"stat-value",children:e.healthScore}),a.jsx("span",{className:"stat-label",children:"Healora Score"})]})]}),a.jsxs("div",{className:"health-score-section",children:[a.jsx("h3",{children:"Healora Score"}),a.jsx("div",{className:"score-bar",children:a.jsx("div",{className:"score-fill",style:{width:`${e.healthScore}%`}})}),a.jsxs("p",{className:"score-label",children:[e.rank," (0-100)"]})]}),a.jsxs("div",{className:"profile-info",children:[a.jsx("h3",{children:"Профиль"}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{children:"Возраст"}),a.jsxs("span",{children:[n.age," лет"]})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{children:"Вес"}),a.jsxs("span",{children:[n.weight," кг"]})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{children:"Рост"}),a.jsxs("span",{children:[n.height," см"]})]}),a.jsxs("div",{className:"info-row",children:[a.jsx("span",{children:"ИМТ"}),a.jsx("span",{children:n.bmi})]})]}),a.jsxs("div",{className:"achievements-section",children:[a.jsx("h3",{children:"Достижения"}),a.jsx("div",{className:"achievements-grid",children:t.map((l,i)=>a.jsxs("div",{className:`achievement-card ${l.earned?"earned":""}`,children:[a.jsx("span",{className:"achievement-icon",children:l.icon}),a.jsx("span",{className:"achievement-name",children:l.name}),a.jsx("span",{className:"achievement-condition",children:l.condition})]},i))})]}),a.jsx("style",{children:`
        .profile-container {
          padding: 15px;
          background: #fafafa;
          height: 100%;
          overflow-y: auto;
          padding-bottom: 60px;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .avatar-large {
          font-size: 60px;
          margin-bottom: 10px;
        }

        .profile-header h2 {
          font-size: 20px;
          color: #311b92;
          margin: 0;
        }

        .profile-subtitle {
          font-size: 12px;
          color: #7b1fa2;
          margin: 5px 0 0 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #6b21c8;
          display: block;
        }

        .stat-label {
          font-size: 10px;
          color: #757575;
        }

        .health-score-section {
          background: white;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .health-score-section h3 {
          font-size: 14px;
          color: #311b92;
          margin: 0 0 10px 0;
        }

        .score-bar {
          height: 12px;
          background: #e0e0e0;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .score-fill {
          height: 100%;
          background: linear-gradient(90deg, #6b21c8, #9c27ca);
          border-radius: 6px;
          transition: width 0.5s ease;
        }

        .score-label {
          font-size: 11px;
          color: #757575;
          margin: 0;
        }

        .profile-info {
          background: white;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .profile-info h3 {
          font-size: 14px;
          color: #311b92;
          margin: 0 0 12px 0;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f3e5f5;
          font-size: 12px;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-row span:first-child {
          color: #757575;
        }

        .info-row span:last-child {
          color: #311b92;
          font-weight: 600;
        }

        .achievements-section {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .achievements-section h3 {
          font-size: 14px;
          color: #311b92;
          margin: 0 0 12px 0;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .achievement-card {
          background: #f5f5f5;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          opacity: 0.5;
        }

        .achievement-card.earned {
          background: #f3e5f5;
          opacity: 1;
        }

        .achievement-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 5px;
        }

        .achievement-name {
          font-size: 12px;
          font-weight: 600;
          color: #311b92;
          display: block;
        }

        .achievement-condition {
          font-size: 9px;
          color: #757575;
        }
      `})]})},Hb=`# Практика: Аюрведа

### Category: Традиционная

---

## 1. Цель

Аюрведа — древняя система индийской медицины, сформировавшаяся более 3000 лет назад. В переводе с санскрита — «наука о жизни». Её цель — поддержание здоровья через баланс трёх дош (вата, питта, капха), правильное питание, режим дня, очистительные процедуры (панчакарма) и духовные практики. Аюрведа основана на философии санкхьи и текстах Чарака-самхиты и Сушрута-самхиты.

---

## 2. Области применимости

пищеварительные расстройства, стресс и бессонница, кожные заболевания (псориаз, экзема), метаболический синдром, детоксикация, укрепление иммунитета, профилактика возрастных изменений

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| AY_01 | Определение доши (пульсовая / опросник) | 1 раз в год |
| AY_02 | Панчакарма классическая | ежегодно 14–21 день |
| AY_03 | Абхьянга (масляный массаж) | ежедневно / 3–4 раза в неделю |
| AY_04 | Приём расаян (омолаживающих средств) | курсами 1–3 месяца |
| AY_05 | Аюрведическая диета по доше | постоянно |
| AY_06 | Широдхара (масло на лоб) | 7–14 дней курсами |
| AY_07 | Йога и пранаяма | ежедневно 20–40 мин |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Острые инфекционные заболевания | лихорадка >38°C | отложить панчакарму |
| Беременность | любая | исключить некоторые травы и процедуры |
| Тяжёлая почечная/печёночная недостаточность | клинически значимо | консультация нефролога |
| Психотические расстройства | обострение | исключить интенсивные очистительные практики |

### Противопоказания и запреты

- Применение аюрведических препаратов без лабораторного контроля содержания тяжёлых металлов (свинец, ртуть, мышьяк)
- Проведение панчакармы при беременности, острых инфекциях и кахексии
- Назначение трав с документированной гепатотоксичностью без врачебного мониторинга
- Использование аюрведической диагностики как единственного метода скрининга онкологических заболеваний

---

## 5. Рекомендации

- Проходить панчакарму только в сертифицированных центрах
- Информировать врача о принимаемых аюрведических препаратах (свинец, ртуть)
- Начинать с мягких процедур, оценивая реакцию организма
- Сочетать аюрведу с современной диагностикой (лабораторные тесты)
- Использовать аюрведу как профилактику, а не замену неотложной помощи
- Записывать изменения самочувствия для корректировки протокола
- Учитывать сезонные вариации дош (ритмочарья)

---

## 6. Уровень доказательности

★★☆☆☆ Ограниченный. Имеются отдельные РКИ по аюрведическим травам (куркума, ашваганда, гуггул) и йоге. Классические протоколы панчакармы изучены слабо из-за сложности стандартизации.

**Ключевые публикации и РКИ:**
- Singh RH, Narsimhamurthy K, Singh G. Translational research in Ayurveda: challenges and opportunities. J Ayurveda Integr Med. 2011;2(4):167–171.
- Chandran S, Patwardhan K. Ayurvedic research in the 21st century: need for evidence-based approaches. J Ayurveda Integr Med. 2017;8(3):145–147.
- Choudhary D, Bhattacharyya S, Bose S. Efficacy and safety of ashwagandha (Withania somnifera) root extract in improving memory and cognitive functions. J Clin Psychopharmacol. 2017;37(1):46–54.

---

## 7. За и Против

### За
- Целостная система с детальной диагностикой
- Профилактическая направленность (диначарья)
- Сильная традиция и философская база
- Низкая токсичность базовых рекомендаций

### Против
- Контаминация препаратов тяжёлыми металлами
- Отсутствие стандартизации в классических протоколах
- Западная популяция сложно соблюдает аюрведический режим
- Дефицит квалифицированных вайдьев (аюрведических врачей)

---

## 8. Дискуссия

Аюрведа пересекается с нутрициологией (диета по доше), поведенческой медициной (режим дня) и йогой как практикой долголетия. В DTLP аюрведические вмешательства требуют адаптации к западному контексту: замена трав с риском токсичности, интеграция пульсовой диагностики с биомаркерами. Аюрведическая концепция расаяны (омоложения) коррелирует с современными представлениями о геропротекторах. Некоторые аюрведические травы могут вызывать лекарственные взаимодействия и гепатотоксичность — это требует обязательного врачебного контроля.

**Нормативная база:** Отсутствует

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Ub=`# Практика: Поведенческая психология

### Category: Доказательная

---

## 1. Цель

Поведенческая психология в контексте здоровья — применение принципов когнитивно-поведенческой терапии (КПТ), мотивационного интервьюирования и теории подкрепления для формирования устойчивых привычек здорового образа жизни. Цель — преодоление разрыва между знанием и реальным поведением (intention-behavior gap). Корни — в бихевиоризме Уотсона и Скиннера, современная поведенческая медицина оформилась в 1970-х.

---

## 2. Области применимости

отказ от курения, управление весом, приверженность терапии, управление стрессом, тревожные и депрессивные состояния, формирование приверженности физической активности, пищевое поведение

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| BEH_01 | Когнитивно-поведенческая терапия | 1 раз в неделю |
| BEH_02 | Мотивационное интервьюирование | 1 раз в 2 недели |
| BEH_03 | Техники самоконтроля (дневник) | ежедневно |
| BEH_04 | Анализ цепей поведения | по ситуациям срыва |
| BEH_05 | Поведенческая активация | ежедневно |
| BEH_06 | Экспозиционная терапия | по протоколу |
| BEH_07 | Тренинг релаксации (прогрессивная мышечная) | ежедневно 10–15 мин |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Суицидальные мысли | любые | кризисный протокол, психиатр |
| Тяжёлая депрессия (PHQ-9) | >20 баллов | психиатр, медикаментозная поддержка |
| Расстройство пищевого поведения | активная фаза | специализированная помощь |
| Злоупотребление ПАВ | любой | наркологическая служба |

### Противопоказания и запреты

- Проведение психотерапевтических вмешательств лицами без профильного образования (клинический психолог, психотерапевт)
- Применение КПТ-протоколов для работы с расстройствами тяжёлой степени (психотические эпизоды, активная суицидальность) без участия психиатра
- Использование экспозиционной терапии без предварительной оценки стабилизации пациента

---

## 5. Рекомендации

- Использовать SMART-цели для постановки задач поведения
- Комбинировать КПТ с wearables-трекингом для обратной связи
- Учитывать стадию готовности к изменениям (Prochaska & DiClemente)
- Вовлекать социальное окружение и группы поддержки
- Избегать чувства вины и стыда при срывах — анализ причин
- Применять микро-привычки для постепенного изменения
- Подкреплять достижения позитивной обратной связью

---

## 6. Уровень доказательности

★★★★☆ Высокий. КПТ — один из самых исследованных психотерапевтических методов. Для мотивационного интервьюирования — мета-анализы подтверждают эффективность. Поведенческие интервенции с цифровой поддержкой — активно накапливающаяся база.

**Ключевые публикации и РКИ:**
- Cuijpers P, Karyotaki E, Reijnders M, et al. Psychotherapies for depression: a network meta-analysis. World Psychiatry. 2019;18(3):325–336.
- Hofmann SG, Asnaani A, Vonk IJJ, et al. The efficacy of cognitive behavioral therapy: a review of meta-analyses. Cognit Ther Res. 2012;36(5):427–440.
- Karyotaki E, Efthimiou O, Miguel C, et al. Internet-based cognitive behavioral therapy for depression: a systematic review and individual patient data network meta-analysis. Psychol Med. 2021;51(13):2231–2242.
- Rubak S, Sandbæk A, Lauritzen T, et al. Motivational interviewing: a systematic review and meta-analysis. Br J Gen Pract. 2005;55(513):305–312.

---

## 7. За и Против

### За
- Измеримые результаты поведения
- Инструментарий для долгосрочных изменений
- Синергия с любыми другими медицинскими протоколами
- Доступность (низкая стоимость, онлайн-форматы)

### Против
- Требует высокой мотивации пациента
- Эффект может угасать без подкрепления
- Квалификация терапевта критически важна
- Не заменяет медицинскую диагностику органических причин

---

## 8. Дискуссия

Поведенческая психология — «клей» DTLP, удерживающий все практики вместе. Любой протокол долголетия требует изменения поведения, и без психологической поддержки приверженность падает. Пересечение с нутрициологией (пищевое поведение), цифровыми биомаркерами (трекинг), интегративной медициной (стресс-менеджмент). Исторически включение поведенческих наук в медицину (биопсихосоциальная модель Энгеля, 1977) изменило подход к хроническим заболеваниям. Поведенческие интервенции не должны превращаться в манипуляцию; уважение автономии пациента — этический императив.

**Нормативная база:** Клинические рекомендации Минздрава по КПТ; закон о психологической помощи

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Gb=`# Практика: Цифровые биомаркеры

### Category: Развивающаяся

---

## 1. Цель

Цифровые биомаркеры — объективные, поддающиеся количественному измерению физиологические и поведенческие показатели, собираемые с помощью носимых устройств, смартфонов и цифровых сенсоров. Цель — обеспечение непрерывного мониторинга здоровья в реальном времени для раннего выявления отклонений и персонализированной обратной связи. Концепция восходит к зарождению трекинга (Quantified Self, 2007), а современный прорыв связан с миниатюризацией сенсоров.

---

## 2. Области применимости

кардиометаболическое здоровье, качество сна, физическая активность, стресс (вариабельность сердечного ритма), когнитивные функции, гликемический контроль, респираторные показатели

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| DBM_01 | Трекинг вариабельности сердечного ритма (ВСР) | непрерывно / ежедневно |
| DBM_02 | Непрерывный мониторинг глюкозы (CGM) | 14–28 дней |
| DBM_03 | Актиграфия (сон/активность) | непрерывно |
| DBM_04 | Фотоплетизмография (SpO₂, HR) | непрерывно |
| DBM_05 | Электродермальная активность (стресс) | непрерывно |
| DBM_06 | Цифровая когнитивная оценка | 1 раз в месяц |
| DBM_07 | Анализ голосовых биомаркеров | 1 раз в неделю |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Ночная сатурация | <90% >10 мин | полисомнография, пульмонолог |
| ВСР (SDNN) | <20 мс | оценка стресса, исключение патологии |
| Глюкоза натощак (CGM) | >7.0 ммоль/л | пероральный тест толерантности |
| Продолжительность сна | <5 ч >5 дней | референс к сомнологу |

### Противопоказания и запреты

- Использование неверифицированных носимых устройств для постановки клинического диагноза
- Самостоятельная интерпретация цифровых биомаркеров без учёта референсных интервалов и артефактов
- Принятие решений о терапии на основе единичных отклонений без подтверждения лабораторными методами

---

## 5. Рекомендации

- Калибровать устройства согласно инструкции производителя
- Использовать верифицированные трекеры с валидированными алгоритмами
- Интерпретировать данные в контексте референсных интервалов
- Не заменять клиническую диагностику цифровыми показателями
- Обеспечить преемственность данных между устройствами
- Избегать тревожности из-за ежедневных колебаний (data anxiety)
- Обсуждать результаты с врачом, а не полагаться на алгоритмы приложений

---

## 6. Уровень доказательности

★★★☆☆ Средний с быстрым ростом. Для актиграфии и HRV — высокая валидность. Для голосовых и цифровых когнитивных биомаркеров — ограниченная. FDA одобрило первые цифровые биомаркеры как конечные точки в клинических исследованиях.

**Ключевые публикации и РКИ:**
- Califf RM. Biomarker definitions and their applications. Biomark Med. 2018;12(7):669–671.
- FDA-NIH Biomarker Working Group. BEST (Biomarkers, EndpointS, and other Tools) Resource. Silver Spring (MD): Food and Drug Administration; 2016.
- Li X, Dunn J, Salins D, et al. Digital health: tracking physiomes and activity using wearable biosensors reveals useful health-related information. npj Digit Med. 2020;3:56.
- Shaffer F, Ginsberg JP. An overview of heart rate variability metrics and norms. Front Public Health. 2017;5:258.

---

## 7. За и Против

### За
- Непрерывность и объективность данных
- Раннее выявление отклонений до симптомов
- Вовлечение пациента в управление здоровьем
- Потенциал для удалённого мониторинга

### Против
- Высокий уровень шума и артефактов
- Риск гипердиагностики и тревожности
- Конфиденциальность и безопасность данных
- Цифровое неравенство (доступ к устройствам)

---

## 8. Дискуссия

Цифровые биомаркеры пересекаются с персонализированной медициной (индивидуальные тренды), поведенческой психологией (обратная связь для формирования привычек), нутрициологией (CGM для диетических экспериментов) и РКИ (цифровые конечные точки). История движения Quantified Self и пионерные работы Ларри Смарра заложили основу для гражданской науки. В DTLP цифровые биомаркеры служат связующим звеном между субъективным самочувствием и объективными лабораторными данными. Сырые данные без грамотной интерпретации могут приносить больше вреда, чем пользы.

**Нормативная база:** Отсутствует

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Pb=`# Практика: Китайская медицина

### Category: Традиционная

---

## 1. Цель

Традиционная китайская медицина (ТКМ) — целостная система диагностики и лечения, сформировавшаяся более 2000 лет назад. Цель практики — восстановление гармонии ци (жизненной энергии) в меридианах тела и баланса инь-ян. ТКМ включает фитотерапию, акупунктуру, массаж туйна, диетологию и цигун. Корни — в философии даосизма и наблюдениях за природными циклами, зафиксированных в трактате «Хуанди Нэйцзин».

---

## 2. Области применимости

хроническая боль, функциональные расстройства ЖКТ, стресс и тревожность, бессонница, аллергические состояния, женское здоровье, поддержка иммунитета

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| TCM_01 | Акупунктура (корпоральная) | 1–2 раза в неделю |
| TCM_02 | Фитотерапия (индивидуальные сборы) | ежедневно, курсами 1–3 месяца |
| TCM_03 | Массаж туйна | 1 раз в неделю |
| TCM_04 | Цигун / тайцзицюань | ежедневно 15–30 мин |
| TCM_05 | Баночный массаж | 1 раз в 2 недели |
| TCM_06 | Прижигание (мокса) | 1–2 раза в неделю |
| TCM_07 | Диетотерапия по 5 элементам | постоянно |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Острая хирургическая патология | любая | экстренная госпитализация |
| Онкологический диагноз | любой | ТКМ только как дополнение к основной терапии |
| Беременность (1 триместр) | любая | исключить акупунктуру точек риска |
| Приём антикоагулянтов | любой | с осторожностью при иглоукалывании |

### Противопоказания и запреты

- Использование травяных сборов, содержащих токсичные или гепатотоксичные компоненты (например, Aristolochia, Dictamnus)
- Проведение акупунктуры нестерильными иглами или в местах с нарушением целостности кожи
- Назначение ТКМ-препаратов без ботанической верификации сырья и контроля тяжёлых металлов

---

## 5. Рекомендации

- Обращаться только к сертифицированным специалистам ТКМ
- Информировать лечащего врача о параллельном приёме трав
- Не заменять ТКМ экстренную или жизнеспасающую терапию
- Учитывать качество и происхождение травяных сборов (тяжёлые металлы)
- Комбинировать с цигун для профилактики
- Фиксировать динамику состояния в дневнике
- Сессионный подход: курс 8–12 сеансов с переоценкой

---

## 6. Уровень доказательности

★★★☆☆ Средний. Акупунктура имеет убедительную базу при хронической боли (более 60 РКИ). Фитотерапия — неоднородная, с ограниченным числом качественных исследований. Требуется больше РКИ с адекватным контролем.

**Ключевые публикации и РКИ:**
- Vickers AJ, Vertosick EA, Lewith G, et al. Acupuncture for chronic pain: update of an individual patient data meta-analysis. J Pain. 2018;19(5):455–474.
- MacPherson H, Vertosick E, Foster N, et al. The persistence of the effects of acupuncture after a course of treatment: a meta-analysis of patients with chronic pain. Pain. 2017;158(5):784–793.
- Liu JP, Yang M, Liu YX, et al. Chinese herbal medicine for irritable bowel syndrome. Cochrane Database Syst Rev. 2013;(1):CD004488.

---

## 7. За и Против

### За
- Холистический подход к здоровью
- Низкий риск побочных эффектов при квалифицированном применении
- Тысячелетний эмпирический опыт
- Интеграция с современной физиотерапией

### Против
- Недостаточная доказательная база для многих методов
- Риск загрязнения травяных сборов
- Сложность стандартизации диагностики
- Культурный барьер для западных пациентов

---

## 8. Дискуссия

ТКМ всё активнее интегрируется в западную медицину: акупунктура входит в рекомендации по лечению боли, а фитотерапия — предмет фармакологических исследований. В DTLP китайская медицина ценна своим профилактическим уклоном и подходом к «предболезни». Пересечение с нутрициологией (диета по 5 элементам) и психологией (цигун для стресса) делает ТКМ естественным компонентом интегративного долголетия. Предостережение: недобросовестные практики ТКМ без медицинского образования могут задерживать постановку правильного диагноза.

**Нормативная база:** Отсутствует

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,qb=`# Практика: Культурная адаптация

### Category: Культурная

---

## 1. Цель

Культурная адаптация медицинских практик — процесс модификации протоколов, вмешательств и рекомендаций для соответствия культурным, языковым и социальным особенностям целевой популяции. Цель — повышение эффективности здравоохранения путём устранения культурных барьеров между пациентом и системой помощи. Концепция возникла в 1960-х с развитием медицинской антропологии и культурной психиатрии, а в 2000-х стала обязательным компонентом глобального здравоохранения.

---

## 2. Области применимости

иммигрантские популяции, коренные народы, этнические меньшинства, религиозные общины, сельское население, беженцы, пациенты с ограниченным уровнем медицинской грамотности

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| CA_01 | Антропологическая оценка сообщества | однократно |
| CA_02 | Перевод и валидация материалов на язык популяции | по потребности |
| CA_03 | Привлечение культурных посредников (community health workers) | постоянно |
| CA_04 | Адаптация диетических рекомендаций к местной кухне | при разработке плана |
| CA_05 | Модификация поведенческих протоколов с учётом табу | при разработке плана |
| CA_06 | Обучение медицинского персонала культурной компетентности | ежегодно |
| CA_07 | Оценка приемлемости вмешательства (фокус-группы) | на этапе внедрения |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Игнорирование культурных табу | любое | пересмотреть протокол |
| Отказ сообщества от участия | >50% | кардинальная переработка подхода |
| Упрощение культуры до стереотипов | любое | антропологическая ревизия |
| Адаптация без участия сообщества | любая | включить представителей в проект |

### Противопоказания и запреты

- Редукция культурных особенностей до стереотипных представлений при адаптации протоколов
- Разработка и внедрение адаптированных вмешательств без вовлечения представителей целевой популяции
- Использование культурных символов и ритуалов вне их исконного контекста (культурная экзотизация)

---

## 5. Рекомендации

- Использовать методологию адаптации (Barrera & Castro, ADAPT-ITT)
- Вовлекать представителей целевой популяции в дизайн вмешательства
- Учитывать уровень медицинской грамотности и язык
- Различать культурные универсалии и уникальные особенности
- Оценивать эффективность адаптированной версии против оригинальной
- Не путать культурную адаптацию с упрощением или «экзотизацией»
- Обучать команду культурной компетентности и смирению (cultural humility)

---

## 6. Уровень доказательности

★★★☆☆ Средний. Мета-анализы показывают, что культурно-адаптированные вмешательства эффективнее неадаптированных (эффект малый–средний). Качество исследований варьирует.

**Ключевые публикации и РКИ:**
- Berry JW. Immigration, acculturation, and adaptation. Appl Psychol. 1997;46(1):5–34.
- Castro FG, Barrera M Jr, Holleran Steiker LK. Issues and challenges in the design of culturally adapted evidence-based interventions. Annu Rev Clin Psychol. 2010;6:213–239.
- Lee JH, Ramos GG, Kim E, et al. Cultural adaptation of cognitive-behavioral therapy: a systematic review. J Clin Psychol. 2017;73(8):932–946.
- Hall GCN, Ibaraki AY, Huang ER, et al. A meta-analysis of cultural adaptations of psychological interventions. Behav Ther. 2016;47(6):893–906.

---

## 7. За и Против

### За
- Повышает приверженность и доверие
- Уменьшает неравенство в доступе к помощи
- Снижает риск недопонимания и врачебных ошибок
- Учитывает разнообразие пищевых и религиозных практик

### Против
- Требует дополнительных ресурсов и времени
- Риск генерализации (все члены группы — одинаковые)
- Сложность адаптации быстро меняющихся рекомендаций
- Возможное сопротивление медицинского персонала

---

## 8. Дискуссия

Культурная адаптация — мета-практика, пронизывающая все остальные разделы DTLP. Любой протокол долголетия — от нутрициологии до РКИ — должен учитывать культурный контекст пациента. Пересечение с поведенческими подходами (культурные нормы поведения), нутрициологией (пищевые традиции), традиционными медицинами (Chinese medicine, Ayurveda). ВОЗ признала культурную компетентность приоритетом глобального здравоохранения с 2000-х. Культурная адаптация повышает внутреннюю валидность вмешательств за пределами WEIRD-популяций. Адаптация не означает снижение стандартов — доказательность и безопасность должны сохраняться при любом культурном контексте.

**Нормативная база:** Отсутствует

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Vb=`# Практика: Народные практики

### Category: Культурная

---

## 1. Цель

Народные практики (folk medicine, традиционная народная медицина) — совокупность эмпирических знаний и навыков целительства, передаваемых устно из поколения в поколение в различных культурах. Цель — оказание доступной первичной помощи с использованием подручных средств — трав, продуктов, массажа, заговоров — на основе местного опыта и наблюдений. Корни уходят в доисторический период, каждая этническая группа имеет свой уникальный арсенал.

---

## 2. Области применимости

простудные заболевания, лёгкие травмы и ушибы, кожные раздражения, головная боль, расстройства пищеварения, зубная боль (до стоматологической помощи), «материнские» практики (опрелости, колики)

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| FLK_01 | Травяные чаи (ромашка, липа, малина) | 3–4 раза в день при симптомах |
| FLK_02 | Компрессы и припарки (капуста, лук, подорожник) | 1–2 раза в день |
| FLK_03 | Ингаляции паром (картофель, эвкалипт) | 2–3 раза в день |
| FLK_04 | Полоскания (соль, сода, прополис) | 3–5 раз в день |
| FLK_05 | Медовые и молочные составы | 1–2 раза в день |
| FLK_06 | Банки (неаспирационные) | 1 раз в 3–5 дней |
| FLK_07 | Заговоры / шептания (культурно-обусловленные) | однократно или по ритуалу |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Лихорадка >48 ч | >38°C | врачебная консультация |
| Гнойные процессы | любые | хирургическая помощь |
| Сыпь с геморрагическим компонентом | любая | исключить менингококк |
| Спутанность сознания | любая | экстренная госпитализация |

### Противопоказания и запреты

- Внутреннее применение токсичных растений (чистотел, мухомор, болиголов) в составе народных рецептов
- Использование народных средств для лечения тяжёлых состояний (пневмония, аппендицит, инфаркт) вместо врачебной помощи
- Применение неизвестных ингредиентов без проверки на аллергическую реакцию
- Задержка начала антибактериальной терапии в пользу народных методов при бактериальных инфекциях

---

## 5. Рекомендации

- Использовать народные практики только для лёгких состояний
- Не задерживать обращение к врачу при ухудшении
- Проверять ингредиенты на аллергию перед применением
- Учитывать возможные лекарственные взаимодействия с назначаемыми препаратами
- Соблюдать гигиену при приготовлении компрессов и настоев
- Отдавать предпочтение проверенным поколениями, а не экзотическим рецептам
- Фиксировать состав и эффект для возможного обсуждения с врачом

---

## 6. Уровень доказательности

★☆☆☆☆ Преимущественно анекдотический. Некоторые народные средства изучались (мёд при кашле, имбирь при тошноте) и показали умеренную эффективность. Однако целостные протоколы не валидированы.

**Ключевые публикации и РКИ:**
- World Health Organization. WHO Traditional Medicine Strategy 2014–2023. Geneva: WHO Press, 2013.
- Che CT, George V, Ijinu TP, et al. Traditional medicine: past, present and future research and development prospects. J Ethnopharmacol. 2017;207:290–303.
- Heinrich M, Barnes J, Gibbons S, et al. Fundamentals of Pharmacognosy and Phytotherapy. 3rd ed. Chichester: Wiley, 2018.

---

## 7. За и Против

### За
- Доступность и низкая стоимость
- Культурная укоренённость и доверие
- Мягкое действие при правильном применении
- Передача знаний внутри сообщества

### Против
- Непроверенная безопасность многих рецептов
- Задержка получения квалифицированной помощи
- Индивидуальная непереносимость и аллергии
- Вытеснение доказательных методов

---

## 8. Дискуссия

Народные практики представляют собой «живую лабораторию» этномедицины в DTLP. Пересекаются с культурной адаптацией, медициной Майя и аюрведой. Фольк-медицина была единственным доступным здравоохранением для большинства населения мира до XX века. В DTLP народные практики ценны как антропологический феномен и источник идей для фармакологии. Не всё «народное» безопасно: многие рецепты содержат токсичные ингредиенты (чистотел внутрь, мухомор). Рекомендуется критическая оценка с позиций доказательной медицины.

**Нормативная база:** Отсутствует

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Yb=`# Практика: Клинические гайдлайны

### Category: Доказательная

---

## 1. Цель

Клинические гайдлайны (рекомендации) — систематически разрабатываемые утверждения, помогающие врачам и пациентам принимать информированные решения об оптимальном лечении в конкретных клинических ситуациях. Цель — стандартизация качества медицинской помощи на основе наилучших доступных данных. История гайдлайнов начинается с 1990-х с созданием организаций (NICE, SIGN, USPSTF) и методологии GRADE.

---

## 2. Области применимости

скрининг и ранняя диагностика, фармакотерапия, хирургические вмешательства, профилактика, реабилитация, паллиативная помощь, организация здравоохранения

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| GL_01 | Систематический обзор литературы | каждые 2–3 года |
| GL_02 | Оценка качества доказательств (GRADE) | при каждом обновлении |
| GL_03 | Формирование рекомендаций (EtD framework) | при каждом обновлении |
| GL_04 | Экспертное голосование (Delphi / RAND) | по неопределённым вопросам |
| GL_05 | Пилотирование в клинических центрах | 3–6 месяцев |
| GL_06 | Внедрение (clinical pathways, checklists) | постоянно |
| GL_07 | Аудит соблюдения гайдлайнов | ежегодно |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Конфликт интересов у авторов | неуказанный | отклонить рекомендацию |
| Устаревшая рекомендация | >5 лет без обновления | проверить актуальность |
| Слабая рекомендация при высокой неопределённости | любая | особое обсуждение с пациентом |
| Исключение значимых подгрупп | любое | оценка применимости |

### Противопоказания и запреты

- Использование клинических рекомендаций старше 5 лет без проверки актуальности
- Применение гайдлайнов, разработанных авторами с недекларированным конфликтом интересов
- Слепое следование рекомендациям без учёта индивидуальной клинической картины и коморбидности

---

## 5. Рекомендации

- Использовать проверенную методологию (GRADE, AGREE II)
- Декларировать все конфликты интересов авторов
- Обновлять гайдлайны не реже 1 раза в 3–5 лет
- Адаптировать международные рекомендации к локальному контексту
- Включать предпочтения пациентов в процесс принятия решений
- Сопровождать гайдлайны инструментами для клиницистов (checklists)
- Избегать рекомендаций на основе единичных или небольших исследований

---

## 6. Уровень доказательности

★★★★★ Самый высокий уровень, когда гайдлайн основан на систематических обзорах РКИ. Однако качество отдельных рекомендаций внутри гайдлайна может варьировать. Методология GRADE обеспечивает прозрачность.

**Ключевые публикации и РКИ:**
- Guyatt GH, Oxman AD, Vist GE, et al. GRADE: an emerging consensus on rating quality of evidence and strength of recommendations. BMJ. 2008;336(7650):924–926.
- Brouwers MC, Kho ME, Browman GP, et al. AGREE II: advancing guideline development, reporting and evaluation in health care. CMAJ. 2010;182(18):E839–E842.
- World Health Organization. WHO Handbook for Guideline Development. 2nd ed. Geneva: WHO Press, 2014.
- Woolf SH, Grol R, Hutchinson A, et al. Clinical guidelines: potential benefits, limitations, and harms of clinical guidelines. BMJ. 1999;318(7182):527–530.

---

## 7. За и Против

### За
- Стандартизация и повышение качества помощи
- Снижение вариабельности врачебных решений
- Юридическая защита врачей
- Упрощение внедрения новых данных

### Против
- «Поваренная медицина» (cookbook medicine) подавляет клиническое мышление
- Рекомендации отстают от актуальных данных
- Конфликт интересов в группах разработчиков
- Трудно применимы к пациентам с коморбидностью

---

## 8. Дискуссия

Клинические гайдлайны — ключевой инструмент DTLP для трансляции доказательств из РКИ в реальную практику. Пересекаются с персонализированной медициной (необходимость адаптации), культурной адаптацией (локализация рекомендаций), цифровыми биомаркерами (включение новых конечных точек). Эпоха «доказательной медицины» (Evidence-Based Medicine, 1992) породила потребность в гайдлайнах. Проблема: гайдлайны по долголетию сталкиваются с дефицитом долгосрочных данных. Слепое следование гайдлайнам без учёта индивидуальной клинической картины может навредить не меньше, чем их игнорирование.

**Нормативная база:** Приказ Минздрава № 786н «Об утверждении порядка разработки клинических рекомендаций»

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Qb=`# Практика: Интегративная медицина

### Category: Развивающаяся

---

## 1. Цель

Интегративная медицина объединяет лучшие подходы доказательной, традиционной и комплементарной медицины с фокусом на пациента как целостную систему. Цель — не просто лечение симптомов, а оптимизация здоровья через комбинацию конвенциональных и альтернативных методов. Движение интегративной медицины возникло в 1990-х в США как ответ на фрагментацию здравоохранения и сегодня активно развивается в ведущих клиниках мира.

---

## 2. Области применимости

хронические заболевания (болезни цивилизации), профилактика возраст-ассоциированных состояний, управление стрессом, реабилитация, хосписная паллиативная помощь, спортивная медицина, антивозрастная медицина

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| INT_01 | Интегративный консилиум | 1 раз в 3–6 месяцев |
| INT_02 | Персонализированный план вмешательств | ежегодно |
| INT_03 | Майндфулнесс и медитация | ежедневно 10–30 мин |
| INT_04 | Нутрицевтическая поддержка | курсами 2–3 месяца |
| INT_05 | Физическая активность (INIT-программа) | 3–5 раз в неделю |
| INT_06 | Детокс-протокол (контролируемый) | 1–2 раза в год |
| INT_07 | Биоэнергетическая терапия | по показаниям |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Отказ от стандартной терапии | полный | просвещение, повторное информирование |
| Полипрагмазия БАДов | >5 средств | пересмотр необходимости каждого |
| Отсутствие объективных методов оценки | субъективные критерии | внедрить измеримые биомаркеры |
| Психологическая зависимость от «детокса» | повторные курсы без показаний | референс к психологу |

### Противопоказания и запреты

- Замена доказанной конвенциональной терапии (химиотерапия, антибиотики, инсулин) комплементарными методами
- Применение невалидированных «интегративных протоколов» без оценки соотношения риск/польза
- Использование терминов «детокс» или «чистка» для продления необоснованных повторных курсов
- Самоназначение биоэнергетических терапий без клинических показаний

---

## 5. Рекомендации

- Начинать с доказательных методов, добавлять комплементарные по мере необходимости
- Оценивать соотношение риск/польза для каждой дополнительной терапии
- Использовать шкалы качества жизни как основной исход
- Привлекать мультидисциплинарную команду
- Документировать все параллельные вмешательства
- Избегать терминов «чудесное исцеление» и «панацея»
- Регулярно пересматривать план на основе новых данных

---

## 6. Уровень доказательности

★★★☆☆ Средний и неоднородный. Для отдельных компонентов (диета, физическая активность, когнитивно-поведенческая терапия) — высокий. Для «интегративных протоколов» в целом — низкий из-за сложности стандартизации.

**Ключевые публикации и РКИ:**
- National Center for Complementary and Integrative Health (NCCIH). Complementary, Alternative, or Integrative Health: What's In a Name? NIH Publication, 2021.
- Wieland LS, Skoetz N, Pilkington K, et al. Yoga for chronic non-specific low back pain. Cochrane Database Syst Rev. 2017;(1):CD010671.
- Goyal M, Singh S, Sibinga EMS, et al. Meditation programs for psychological stress and well-being: a systematic review and meta-analysis. JAMA Intern Med. 2014;174(3):357–368.

---

## 7. За и Против

### За
- Ориентация на пациента, а не на болезнь
- Потенциал для снижения полипрагмазии
- Учёт психосоциальных факторов здоровья
- Профилактическая направленность

### Против
- Сложность стандартизации и оценки эффективности
- Риск шарлатанства под видом интегративного подхода
- Более высокая стоимость (самостоятельная оплата)
- Дефицит квалифицированных интегративных врачей

---

## 8. Дискуссия

Интегративная медицина служит концептуальным мостом между категориями практик в DTLP, объединяя РКИ, нутрициологию, традиционные системы и поведенческие подходы. Исторически интеграция альтернативных методов в официальную медицину встречала сопротивление, однако сегодня такие центры, как Cleveland Clinic и MD Anderson, имеют полноценные интегративные отделения. Ключевой вызов — валидация комбинированных протоколов. Предостережение: пациенты с тяжёлыми заболеваниями могут отказываться от эффективной терапии в пользу недоказанных интегративных методов.

**Нормативная база:** ФЗ № 323 «Об основах охраны здоровья граждан»; приказы Минздрава по восстановительной медицине; международные рекомендации по интегративному подходу (NIH, NCCIH)

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Xb=`# Практика: Медицина Майя

### Category: Культурная

---

## 1. Цель

Медицина Майя — традиционная система целительства цивилизации Мезоамерики, сохранившаяся в общинах Юкатана, Гватемалы и Чьяпаса. Её цель — восстановление баланса между телом, душой и природой, а также гармонизация отношений человека с божествами и духами предков. Медицина Майя основана на концепции «горячих» и «холодных» начал, магическом символизме и детальном знании местной флоры.

---

## 2. Области применимости

желудочно-кишечные расстройства, лихорадочные состояния, укусы насекомых и змей, женское здоровье (беременность, роды), ритуалы очищения, уход за новорождёнными, психоэмоциональные расстройства (susto, mal de ojo)

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| MY_01 | Очищение темаскалем (потовая баня) | 1 раз в месяц |
| MY_02 | Травяные настои (рута, эпазот, чеснок) | по необходимости |
| MY_03 | Кровопускание (в ритуальном контексте) | по показаниям шамана |
| MY_04 | Массаж с растиранием травами (sobada) | 1 раз в неделю |
| MY_05 | Церемония очищения (limpia с яйцом/травами) | 1 раз в месяц |
| MY_06 | Примочки и компрессы из коры и листьев | 2–3 раза в день |
| MY_07 | Обряд изгнания «дурного глаза» (mal de ojo) | однократно |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Тяжёлая дегидратация | клиническая | инфузионная терапия |
| Отравление неизвестным растением | любое | токсикология |
| Инфекция с системными проявлениями | лихорадка >39°C, сепсис | антибиотики, госпитализация |
| Ритуальное кровопускание без антисептики | любое | риск ВИЧ/гепатита |

### Противопоказания и запреты

- Применение растений медицины Майя без ботанической идентификации (риск токсичных и ядовитых видов)
- Замена экстренной медицинской помощи (антибиотики, инфузионная терапия, хирургия) ритуальными практиками
- Проведение ритуального кровопускания без соблюдения правил асептики и антисептики

---

## 5. Рекомендации

- Уважать культурную ценность практики и её носителей
- Сочетать с современным лабораторным контролем
- Идентифицировать растения ботанически перед применением
- Не заменять традиционную медицину экстренной помощью при угрожающих состояниях
- Документировать этноботанические знания для сохранения наследия
- Учитывать сезонность растений и методы их сбора
- Интегрировать с пищевыми привычками общины

---

## 6. Уровень доказательности

★☆☆☆☆ Нет формальной доказательной базы. Этноботанические исследования выявили фармакологическую активность некоторых растений (Tagetes lucida, Piper auritum), но клинических исследований классических протоколов не проводилось.

**Ключевые публикации и РКИ:**
- Berlin EA, Berlin B. Medical Ethnobiology of the Highland Maya. Princeton: Princeton University Press, 1996.
- Casagrande DG. The use of traditional ecological knowledge in the study of medicinal plants in the Maya area. J Ethnopharmacol. 2004;90(2–3):283–293.
- Hinojosa A. Medicina tradicional maya: un acercamiento a la cosmovisión y práctica curativa. Rev Biomed. 2004;15(3):189–196.

---

## 7. За и Против

### За
- Глубокое знание местной флоры и экосистемы
- Культурная приемлемость для коренных общин
- Архетипическая ценность ритуальных практик
- Потенциальный источник новых фармакологических соединений

### Против
- Отсутствие стандартизации и дозировок
- Риск ядовитых растений при ошибочной идентификации
- Магические объяснения могут мешать обращению за медицинской помощью
- Исчезновение носителей традиции (старейшин)

---

## 8. Дискуссия

Медицина Майя — пример адаптивной традиционной системы, пересекающейся с культурной адаптацией и народными практиками. В DTLP она представляет интерес как этномедицинский ресурс и источник биоактивных соединений (например, противовоспалительных и противомикробных). Ботанические знания майя могут обогатить нутрициологию и фитотерапию. Романтизация «древней мудрости» без учёта исторического и социального контекста может приводить к неверному применению. Культурное наследие требует уважительного документирования.

**Нормативная база:** Отсутствует

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Kb=`# Практика: Нутрициология

### Category: Доказательная

---

## 1. Цель

Нутрициология — наука о питании и его влиянии на здоровье, профилактику заболеваний и продление жизни. Цель практики — разработка персонализированных рекомендаций по питанию на основе современных эпидемиологических и клинических данных. Корни нутрициологии уходят в XIX век с открытием витаминов и макронутриентов, а современная нутригеномика и изучение микробиоты открыли новые горизонты для долголетия.

---

## 2. Области применимости

метаболическое здоровье, сердечно-сосудистые заболевания, сахарный диабет 2 типа, ожирение, нутритивные дефициты, спортивная нутрициология, геронтологическая нутрициология

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| NTR_01 | Оценка рациона (24-часовой recall) | 1 раз в 3 месяца |
| NTR_02 | Нутригенетическое тестирование | однократно |
| NTR_03 | Интервальное голодание | 16:8 ежедневно |
| NTR_04 | Средиземноморская диета | постоянно |
| NTR_05 | Персонализированный план нутриентов | 1 раз в 6 месяцев |
| NTR_06 | Анализ микробиоты | 1 раз в год |
| NTR_07 | Метаболический трекинг (CGM) | непрерывно 14–28 дней |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| ИМТ | <18.5 или >35 | референс к диетологу/эндокринологу |
| Дефицит железа (ферритин) | <30 нг/мл | коррекция, исключение кровопотери |
| Витамин D | <20 нг/мл | заместительная терапия |
| С-реактивный белок | >2 мг/л | поиск воспалительного очага |

### Противопоказания и запреты

- Присвоение статуса «лечебной» диете без клинических доказательств эффективности
- Рекомендация экстремальных диет (кетогенная без контроля, длительное голодание) без врачебного наблюдения
- Назначение БАДов в дозировках, превышающих верхний допустимый уровень потребления

---

## 5. Рекомендации

- Отдавать предпочтение цельным продуктам перед обработанными
- Обеспечить достаточное потребление белка (1.2–2.0 г/кг массы тела)
- Включать ферментированные продукты для поддержки микробиоты
- Контролировать качество жиров (омега-3, мононенасыщенные)
- Ограничить добавленные сахара и рафинированные углеводы
- Учитывать сезонные и региональные особенности рациона
- Комбинировать нутритивную поддержку с физической активностью

---

## 6. Уровень доказательности

★★★★☆ Высокий уровень доказательности для базовых принципов (средиземноморская диета, ограничение сахаров). Для персонализированных подходов (нутригеномика) — средний, активно накапливается.

**Ключевые публикации и РКИ:**
- Lachat C, Hawwash D, Höglund D, et al. Strengthening nutrition research — the ANN position paper. Ann Nutr Metab. 2016;68(1):1–8.
- Mozaffarian D. Dietary and policy priorities for cardiovascular disease, diabetes, and obesity — a comprehensive review. Circulation. 2016;133(2):187–225.
- Willett WC, Sacks F, Trichopoulou A, et al. Mediterranean diet pyramid: a cultural model for healthy eating. Am J Clin Nutr. 1995;61(6 Suppl):1402S–1406S.
- WHO Guideline: Sodium intake for adults and children. Geneva: World Health Organization, 2012.

---

## 7. За и Против

### За
- Широкая доказательная база для основных диетических паттернов
- Низкий порог входа для пациента
- Синергия с метаболическим здоровьем и долголетием
- Доступность биомаркеров для мониторинга

### Против
- Сложность долгосрочного соблюдения рекомендаций
- Индивидуальная вариабельность ответа на диету
- Риск орторексии и пищевых расстройств
- Конфликт интересов в индустрии БАДов

---

## 8. Дискуссия

Нутрициология пересекается с персонализированной медициной и поведенческими практиками, поскольку диетические изменения требуют поведенческой поддержки. Исторически диетологические рекомендации часто менялись, что подрывало доверие. В DTLP нутрициология занимает одну из ключевых ролей как модифицируемый фактор долголетия. Экстремальные диеты (кетогенная без контроля, длительное голодание) требуют врачебного наблюдения. Культурный контекст питания — средиземноморская, азиатская, латиноамериканская модели — должен учитываться при адаптации рекомендаций.

**Нормативная база:** СанПиН 2.3/2.4.3590-20; приказы Минздрава по лечебному питанию

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,$b=`# Практика: Персонализированная медицина

### Category: Развивающаяся

---

## 1. Цель

Персонализированная медицина — подход, учитывающий генетические, эпигенетические, метаболические и средовые особенности индивида для создания точечных профилактических и терапевтических стратегий. Цель — заменить универсальные протоколы (one-size-fits-all) на индивидуально подобранные вмешательства. Концепция восходит к гиппократовскому учению о конституциях, а современная реализация стала возможна благодаря секвенированию генома и Big Data.

---

## 2. Области применимости

фармакогеномика, онкология (таргетная терапия), предиктивная диагностика возрастных заболеваний, нутригеномика, спортивная генетика, эпигенетическое тестирование, метаболомика

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| PM_01 | Секвенирование экзома/генома | однократно |
| PM_02 | Эпигенетический возраст (DNAm clocks) | 1 раз в 1–2 года |
| PM_03 | Метаболомный профиль (кровь) | 1 раз в год |
| PM_04 | Фармакогенетическое тестирование | однократно |
| PM_05 | Непрерывный мониторинг глюкозы | 14–28 дней по показаниям |
| PM_06 | Микробиомное профилирование | 1 раз в год |
| PM_07 | Протеомный анализ | 1 раз в 1–2 года |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Выявление патогенных мутаций (BRCA, Lynch) | класс 5 | генетическое консультирование |
| Эпигенетический возраст > хронологический | >10 лет | интенсивный протокол вмешательств |
| Инциденталомы при скрининге | клинически значимые | верификация и наблюдение |
| Отсутствие actionable findings | полный отчёт без рекомендаций | не создавать ложного чувства безопасности |

### Противопоказания и запреты

- Передача генетических данных третьим лицам (страховые компании, работодатели) без информированного согласия
- Принятие клинических решений исключительно на основе вариантов неясной значимости (VUS)
- Дискриминация пациентов по генетическим признакам при подборе протоколов

---

## 5. Рекомендации

- Проводить генетическое консультирование до и после тестов
- Комбинировать омиксные данные с клиническими показателями
- Использовать проверенные лаборатории (CLIA, CAP)
- Интерпретировать варианты неясной значимости (VUS) с осторожностью
- Обновлять рекомендации по мере появления новых GWAS
- Учитывать уровень доказательности для каждого биомаркера
- Интегрировать данные в единую цифровую платформу

---

## 6. Уровень доказательности

★★★☆☆ Средний и быстрорастущий. Для фармакогеномики — высокий. Для эпигенетических часов и протеомных панелей — ограниченный, требуется валидация в проспективных когортах.

**Ключевые публикации и РКИ:**
- Ashley EA. Towards precision medicine. Nat Rev Genet. 2016;17(9):507–522.
- Collins FS, Varmus H. A new initiative on precision medicine. N Engl J Med. 2015;372(9):793–795.
- Ioannidis JPA, Bossuyt PMM. Waste, leaks, and failures in the biomarker pipeline. Clin Chem. 2017;63(5):963–972.
- The Precision Medicine Initiative Cohort Program — Building a Research Foundation for 21st Century Medicine. NIH, 2015.

---

## 7. За и Против

### За
- Точность и эффективность вмешательств
- Профилактика нежелательных лекарственных реакций
- Выявление доклинических рисков
- Экономия ресурсов за счёт отказа от неэффективных вмешательств

### Против
- Высокая стоимость технологий
- Риски конфиденциальности генетических данных
- Неравенство в доступе к персонализированным подходам
- Избыточное тестирование без клинической пользы

---

## 8. Дискуссия

Персонализированная медицина пересекается со всеми практиками DTLP: нутрициология (нутригеномика), РКИ (N-of-1 дизайны), цифровые биомаркеры, гайдлайны. История — от проекта «Геном человека» (2003) до современных полигенных шкал риска. Эпигенетические часы Хорвата (2013) стали революцией для longevity. Персонализация не отменяет необходимость РКИ — индивидуальный подход и доказательность должны дополнять друг друга, а не конкурировать.

**Нормативная база:** ФЗ № 152 «О персональных данных»; регулирование генетических исследований

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Zb=`# Практика: РКИ (рандомизированные контролируемые испытания)

### Category: Доказательная

---

## 1. Цель

Рандомизированные контролируемые испытания (РКИ) — золотой стандарт доказательной медицины, позволяющий объективно оценивать эффективность вмешательств путём минимизации систематических ошибок. Основная цель РКИ — установление причинно-следственной связи между медицинским вмешательством и клиническим исходом. Эта практика берёт начало в середине XX века, когда статистические методы начали систематически применяться в клинических исследованиях, и сегодня составляет фундамент принятия решений в здравоохранении.

---

## 2. Области применимости

фармакотерапия, хирургические вмешательства, профилактические стратегии, диагностические методы, поведенческие интервенции, реабилитационные программы, нутрицевтические подходы

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| RCT_01 | Параллельное РКИ | однократно / по протоколу |
| RCT_02 | Перекрёстное РКИ | два периода с отмывкой |
| RCT_03 | Кластерное РКИ | по группам учреждений |
| RCT_04 | Факторное РКИ | 2×2 или более факторов |
| RCT_05 | РКИ с адаптивным дизайном | промежуточные анализы |
| RCT_06 | Прагматическое РКИ | в рутинной клинической практике |
| RCT_07 | N-of-1 РКИ | множественные кроссоверы у одного пациента |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Отсутствие ослепления | любой | учесть риск систематической ошибки |
| Высокий уровень отсева | >20% | анализ чувствительности, ITT |
| Непредусмотренный досрочный останов | любой | запросить независимый мониторинг |
| Селективное сообщение исходов | любой | сверить с протоколом и регистрацией |

### Противопоказания и запреты

- Применение результатов РКИ для off-label назначений без соответствующего обоснования
- Сокрытие или недостоверное декларирование конфликтов интересов исследователей
- Использование суррогатных конечных точек без подтверждения связи с клинически значимыми исходами
- Экстраполяция результатов на популяции, не представленные в выборке исследования

---

## 5. Рекомендации

- Публичная регистрация протокола до набора первого пациента
- Чёткое определение первичных и вторичных конечных точек
- Использование стратифицированной рандомизации при известных конфаундерах
- Анализ по намерению лечить (ITT) как основной
- Априорное определение размера выборки с учётом статистической мощности
- Ослепление участников, исследователей и оценщиков исходов
- Прозрачная отчётность по CONSORT

---

## 6. Уровень доказательности

★★★★★ Золотой стандарт доказательной медицины, но только при условии высокого качества проведения. РКИ обеспечивает наивысший уровень достоверности при оценке эффективности вмешательств, однако результаты требуют осторожного переноса на реальные популяции (external validity).

**Ключевые публикации и РКИ:**
- Schulz KF, Altman DG, Moher D. CONSORT 2010 Statement: updated guidelines for reporting parallel group randomised trials. BMJ. 2010.
- Higgins JPT, Thomas J, Chandler J, et al. Cochrane Handbook for Systematic Reviews of Interventions. 2nd ed. Wiley, 2019.
- European Medicines Agency. ICH E9 Statistical Principles for Clinical Trials. CPMP/ICH/363/96; FDA Guidance for Industry: Adaptive Design Clinical Trials, 2019.

---

## 7. За и Против

### За
- Минимизация смещения за счёт рандомизации
- Возможность мета-анализа при воспроизведении
- Высокая внутренняя валидность
- Признание регуляторами (FDA, EMA)

### Против
- Высокая стоимость и длительность
- Ограниченная внешняя валидность (строгие критерии отбора)
- Этические ограничения (нельзя назначить заведомо вредное вмешательство)
- Неприменимость для редких исходов или длительных эффектов

---

## 8. Дискуссия

РКИ занимают центральное место в DTLP как инструмент верификации гипотез о долголетии. Исторически метод восходит к первому задокументированному РКИ (стрептомицин при туберкулёзе, 1948). В контексте longevity-практик РКИ сталкиваются с вызовами: длительные временные горизонты, сложность ослепления при поведенческих и диетических вмешательствах, высокая стоимость. Интеграция РКИ с реальными данными (RWE) и N-of-1 дизайнами открывает новые возможности. Предостережение: низкокачественные РКИ (малая выборка, отсутствие регистрации) могут вводить в заблуждение не хуже, чем отсутствие данных.

**Нормативная база:** ФЗ № 323 «Об основах охраны здоровья граждан»; клинические рекомендации Минздрава РФ

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Jb=`# Практика: Шаманизм

### Category: Культурная

---

## 1. Цель

Шаманские практики — древнейшие системы целительства, основанные на взаимодействии с духами, изменённых состояниях сознания и символизме. Цель — восстановление утраченной целостности души, изгнание «болезнетворных духов» и гармонизация связи человека с природой и сообществом. Шаманизм возник в палеолите и сохранился в культурах Сибири, Амазонии, Центральной Азии, Африки и Северной Америки.

---

## 2. Области применимости

психологическая травма (в культурном контексте), духовные кризисы, ритуалы перехода, психосоматические расстройства, хроническая усталость, экзистенциальная тревога, хосписная поддержка

---

## 3. Интервенции

| ID | Название | Периодичность |
|----|----------|---------------|
| SHM_01 | Камлание (ритуальное путешествие) | по лунному календарю |
| SHM_02 | Работа с бубном / монотонной перкуссией | 1–2 раза в неделю |
| SHM_03 | Травяные ритуальные составы (аяхуаска) | в рамках церемоний |
| SHM_04 | Пост и очищение (sweat lodge, темаскаль) | 1 раз в месяц |
| SHM_05 | Извлечение «болезни» (экстракция) | 1–2 раза в кризис |
| SHM_06 | Работа с тотемными животными / силами | ежедневная медитация |
| SHM_07 | Обряды предков и почитание духов рода | сезонно |

---

## 4. Красные флаги

| Показатель | Порог | Действие |
|------------|-------|----------|
| Психотическое состояние | обострение | шаманская практика противопоказана |
| Тяжёлые соматические заболевания | нестабильные | только после медицинской стабилизации |
| Неофит без культурного контекста | любое участие | этический риск апроприации |
| Использование психоактивных веществ неофитами | любое | юридическая и медицинская ответственность |

### Противопоказания и запреты

- Использование психоактивных веществ (аяхуаска, ибогаин, пейот) вне контролируемого культурного контекста и без медицинского наблюдения
- Применение шаманских практик для лечения психических расстройств без параллельного наблюдения психиатра
- Проведение церемоний лицами, не являющимися признанными носителями традиции (культурная апроприация)
- Взимание платы за «шаманское исцеление» с гарантией результата

---

## 5. Рекомендации

- Уважать культурный контекст и происхождение практики (избегать апроприации)
- Не использовать шаманские практики как замену медицинской помощи
- Участвовать только с сертифицированным носителем традиции
- Исключить приём психоактивных веществ при беременности, эпилепсии
- Документировать переживания в дневнике для интеграции опыта
- Комбинировать с психологической поддержкой для интеграции
- Оценивать состояние до и после ритуала (психометрические шкалы)

---

## 6. Уровень доказательности

★☆☆☆☆ Нет доказательной базы в западном научном понимании. Отдельные исследования аяхуаски в психиатрии и трансовых состояний в нейрофизиологии существуют, но не относятся к шаманизму как целостной системе.

**Ключевые публикации и РКИ:**
- Harner M. The Way of the Shaman. New York: Harper & Row, 1980.
- Palhano-Fontes F, Barreto D, Onias H, et al. Rapid antidepressant effects of the psychedelic ayahuasca in treatment-resistant depression: a randomized placebo-controlled trial. Psychol Med. 2019;49(4):655–663.
- Frecska E, Bokor P, Winkelman M. The therapeutic potentials of ayahuasca: possible effects against various diseases of civilization. Int Rev Psychiatry. 2016;28(3):321–332.

---

## 7. За и Против

### За
- Мощный культурно-адаптированный подход для коренных народов
- Возможный эффект через плацебо и ритуал
- Укрепление социальных связей в сообществе
- Интеграция экзистенциальных переживаний

### Против
- Отсутствие научной верификации
- Риск психологической дестабилизации
- Культурная апроприация вне контекста
- Юридические риски (психоактивные вещества)

---

## 8. Дискуссия

Шаманские практики — маргинальный, но антропологически значимый компонент DTLP. Пересекаются с культурной адаптацией, поведенческой психологией (изменённые состояния сознания изучаются нейронаукой) и народными практиками. Шаманизм как древнейшая профессия целителя предшествует всем медицинским системам. В DTLP шаманские практики рассматриваются исключительно в культурном контексте и не рекомендуются как самостоятельная терапия. Коммерциализация шаманизма на Западе часто приводит к небезопасным практикам без должной подготовки и контроля.

**Нормативная база:** Отсутствует

---

*Источник: traditional practice description | Создано: Май 2026 | DTLP v1.0*
`,Fb=`# Предпочтение: Без глютена

### Category: Диетическое

---

## 1. Суть подхода

Безглютеновая диета исключает все продукты, содержащие глютен — белок пшеницы, ржи и ячменя. Является обязательной при целиакии и рекомендуется при нецелиакийной чувствительности к глютену. Подход набирает популярность и вне медицинских показаний.

---

## 2. Разрешённые продукты

- Овощи, фрукты и ягоды
- Мясо, рыба, птица и яйца (в чистом виде)
- Молочные продукты
- Безглютеновые крупы (рис, гречка, киноа, амарант)
- Бобовые, орехи и семена

---

## 3. Запрещённые продукты

- Пшеница, рожь, ячмень и тритикале
- Хлеб, макароны, выпечка из пшеничной муки
- Пиво и солодовые напитки
- Соусы и полуфабрикаты с глютеном (соевый соус, некоторые приправы)

---

## 4. Показания

- Целиакия (аутоиммунная энтеропатия)
- Нецелиакийная чувствительность к глютену
- Герпетиформный дерматит
- Аутоиммунные заболевания ЖКТ

---

## 5. Противопоказания

- Отсутствие подтверждённого диагноза (не рекомендуется для здоровых без симптомов)
- Риск дефицита витаминов группы B и клетчатки при некомпенсированном рационе
- Повышенная стоимость продуктов

---

## 6. Уровень доказательности

★★★★★ — Высокий. Единственное доказанное лечение целиакии. Для NCGS данные основаны на плацебо-контролируемых исследованиях с умеренной достоверностью.

---

## 7. Плюсы и минусы

### За
- Клинически необходима при целиакии
- Снижает системное воспаление у чувствительных лиц
- Улучшает качество жизни при подтверждённой непереносимости

### Против
- Строгие социальные ограничения
- Может приводить к дефициту B1, B9, железа и клетчатки
- Маркетинговая популярность без медицинских оснований

---

## 8. Дискуссия

В DTLP безглютеновая диета входит в группу элиминационных протоколов. Используется как диагностический инструмент при подозрении на gluten-related disorders. Пересекается с low-carb и палео-подходами, но имеет самостоятельное нозологическое обоснование.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,Wb=`# Предпочтение: Интервальное голодание

### Category: Диетическое

---

## 1. Суть подхода

Интервальное голодание (IF) — режим питания, чередующий периоды приёма пищи и голодания. Наиболее распространённые схемы: 16:8 (16 часов голода, 8 часов окна), 5:2 (5 дней обычного питания, 2 дня ограничения до 500–600 ккал). Фокус — не на составе, а на времени приёма пищи.

---

## 2. Разрешённые продукты

- Любые продукты в пищевое окно (без дополнительных ограничений)
- Вода, чёрный кофе и зелёный чай без сахара в период голодания
- Овощи и некалорийные бульоны при схеме 5:2 (в дни ограничения)
- Белковые продукты для сохранения мышечной массы

---

## 3. Запрещённые продукты

- Любая калорийная пища в период голодания
- Сладкие и калорийные напитки (соки, молоко, газировка) вне окна
- Перекусы вне пищевого окна
- Алкоголь натощак (риск гипогликемии)

---

## 4. Показания

- Инсулинорезистентность и преддиабет
- Избыточная масса тела и ожирение
- Синдром поликистозных яичников (СПКЯ)
- Поддержание веса и улучшение метаболического здоровья

---

## 5. Противопоказания

- Беременность, лактация и планирование беременности
- Сахарный диабет 1 типа и нестабильный СД2
- Расстройства пищевого поведения (анорексия, булимия)
- Дети, подростки и пожилые с саркопенией

---

## 6. Уровень доказательности

★★★★☆ — Высокий для снижения веса и улучшения инсулинорезистентности. РКИ до 12 месяцев показывают не меньшую эффективность, чем ежедневное ограничение калорий. Данные по долгосрочным метаболическим эффектам накапливаются.

---

## 7. Плюсы и минусы

### За
- Не требует подсчёта калорий и ограничения групп продуктов
- Улучшает чувствительность к инсулину и аутофагию
- Гибкость в выборе схемы

### Против
- Сложность социальной адаптации
- Возможны головные боли, раздражительность, усталость
- Риск переедания в пищевое окно

---

## 8. Дискуссия

В DTLP интервальное голодание рассматривается как хроно-нутритивный протокол. Эффективность может модулироваться генами CLOCK, PER и CRY. Сочетается с любыми диетическими предпочтениями (low-carb, средиземноморская, веганская). Перспективно для персонализации по циркадным ритмам.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,Ib=`# Предпочтение: Кетодиета

### Category: Диетическое

---

## 1. Суть подхода

Кетогенная диета — режим с крайне низким содержанием углеводов (5–10% калорий), высоким содержанием жиров (70–75%) и умеренным — белков. Цель — достижение кетоза, при котором печень производит кетоновые тела из жирных кислот. Используется как терапевтический и метаболический протокол.

---

## 2. Разрешённые продукты

- Жирное мясо и птица с кожей
- Жирная рыба (лосось, скумбрия, сардины)
- Яйца, сливочное и топлёное масло
- Авокадо, оливковое и кокосовое масло
- Овощи с низким содержанием углеводов (листовая зелень, огурцы)

---

## 3. Запрещённые продукты

- Все зерновые и крупы
- Сахар, мёд, сиропы и кондитерские изделия
- Фрукты (кроме небольших порций ягод)
- Крахмалистые овощи (картофель, морковь, свёкла)

---

## 4. Показания

- Фармакорезистентная эпилепсия (особенно у детей)
- Сахарный диабет 2 типа (гликемический контроль)
- Ожирение и метаболический синдром
- Неврологические заболевания (болезнь Паркинсона, Альцгеймера — исследуется)

---

## 5. Противопоказания

- Дефицит ферментов β-окисления жирных кислот
- Хроническая болезнь почек и печени
- Беременность и лактация
- Приём SGLT2-ингибиторов (риск эугликемического кетоацидоза)

---

## 6. Уровень доказательности

★★★★☆ — Высокий для эпилепсии. Для метаболических показаний — РКИ до 2 лет показывают эффективность, сопоставимую с low-carb. Долгосрочная безопасность (>2 лет) остаётся предметом исследований.

---

## 7. Плюсы и минусы

### За
- Быстрая потеря веса и подавление аппетита
- Выраженный гликемический контроль
- Снижение частоты приступов при эпилепсии

### Против
- Побочные эффекты: «кето-грипп», запоры, дислипидемия
- Сложность долгосрочного соблюдения
- Риск дефицита клетчатки и микронутриентов

---

## 8. Дискуссия

В DTLP кетодиета рассматривается как терапевтический протокол, а не диета общего назначения. Применяется при специфических нутригенетических профилях (GLUT1-дефицит, PDHD-мутации). Требует врачебного контроля. Пересекается с low-carb, но отличается более строгим ограничением углеводов и обязательным кетозом.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,ej=`# Предпочтение: Без лактозы

### Category: Диетическое

---

## 1. Суть подхода

Диета с исключением лактозы — молочного сахара, расщепляемого ферментом лактазой. При лактазной недостаточности нерасщеплённая лактоза вызывает брожение и дискомфорт в ЖКТ. Исключение или замена молочных продуктов на безлактозные аналоги устраняет симптомы.

---

## 2. Разрешённые продукты

- Безлактозное молоко и молочные продукты
- Твёрдые сыры с низким содержанием лактозы (чеддер, пармезан)
- Растительное молоко (соевое, миндальное, овсяное, рисовое)
- Все овощи, фрукты, мясо, рыба, яйца и крупы
- Кисломолочные продукты с живыми культурами (йогурт — часто переносится)

---

## 3. Запрещённые продукты

- Цельное и обезжиренное молоко
- Мягкие сыры (рикотта, творог, сливочный сыр)
- Сливки, сметана, мороженое на молоке
- Сухие молочные смеси и сыворотка в составе продуктов

---

## 4. Показания

- Первичная лактазная недостаточность (генетически обусловленная)
- Вторичная лактазная недостаточность (после кишечных инфекций)
- Синдром раздражённого кишечника с непереносимостью лактозы
- Вздутие и диарея после употребления молочных продуктов

---

## 5. Противопоказания

- Отсутствие подтверждённой лактазной недостаточности (диета необоснованно ограничивает кальций)
- Остеопороз и остеопения (требуется контроль потребления кальция)
- Детский возраст (риск дефицита кальция и витамина D)

---

## 6. Уровень доказательности

★★★★★ — Высокий. Диагностика лактазной недостаточности (H₂-дыхательный тест) и эффективность элиминации лактозы подтверждены многочисленными РКИ.

---

## 7. Плюсы и минусы

### За
- Быстрое устранение симптомов при правильной диагностике
- Доступность безлактозных аналогов
- Не требует полного отказа от молочной группы

### Против
- Снижение потребления кальция без замещения
- Более высокая стоимость безлактозных продуктов
- Необходимость чтения составов (скрытая лактоза)

---

## 8. Дискуссия

В DTLP безлактозный протокол является одним из базовых элиминационных модулей. Часто сочетается с GF-диетой при комплексной непереносимости. Генетические маркеры (MCM6, LCT) используются для оценки предрасположенности к первичной лактазной недостаточности.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,tj=`# Предпочтение: Низкоуглеводное

### Category: Диетическое

---

## 1. Суть подхода

Низкоуглеводная диета ограничивает потребление углеводов до 20–100 г/сутки с замещением калорий за счёт белков и жиров. Цель — снижение уровня инсулина и переключение метаболизма на использование жирных кислот. Используется для контроля веса и гликемии.

---

## 2. Разрешённые продукты

- Мясо, птица, рыба и морепродукты
- Яйца и молочные продукты (сливочное масло, сыр)
- Овощи с низким содержанием углеводов (листовая зелень, брокколи, цукини)
- Орехи и семена
- Растительные масла (оливковое, кокосовое, авокадо)

---

## 3. Запрещённые продукты

- Сахар и кондитерские изделия
- Хлеб, макароны, крупы и выпечка
- Сладкие фрукты и сухофрукты
- Газированные напитки, соки и алкоголь с высоким содержанием сахара

---

## 4. Показания

- Сахарный диабет 2 типа и преддиабет
- Избыточная масса тела и ожирение
- Метаболический синдром
- Поликистоз яичников (СПКЯ)

---

## 5. Противопоказания

- Беременность и лактация
- Хроническая болезнь почек (ХБП)
- Расстройства пищевого поведения
- Приём SGLT2-ингибиторов (риск кетоацидоза)

---

## 6. Уровень доказательности

★★★★☆ — Высокий для краткосрочной потери веса и гликемического контроля. РКИ до 2 лет показывают преимущество перед низкожировыми диетами. Долгосрочная безопасность (>5 лет) требует дальнейших исследований.

---

## 7. Плюсы и минусы

### За
- Быстрое снижение веса и аппетита
- Улучшение гликемического контроля и HbA1c
- Снижение триглицеридов

### Против
- Риск дефицита клетчатки и микронутриентов
- Возможна дислипидемия с повышением ЛПНП
- Сложность соблюдения в социальных ситуациях

---

## 8. Дискуссия

В DTLP низкоуглеводный подход занимает центральное место в метаболических протоколах. Интегрируется с нутригенетикой: полиморфизмы PPARG, TCF7L2 и FTO могут предсказывать эффективность. Пересекается с кето- и средиземноморской диетами по спектру показаний.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,nj=`# Предпочтение: Средиземноморская

### Category: Диетическое

---

## 1. Суть подхода

Средиземноморская диета основана на традиционных пищевых привычках Греции, Италии и Испании. Характеризуется высоким потреблением оливкового масла, овощей, рыбы и цельнозерновых, умеренным — птицы и молочных, низким — красного мяса и сахара. Считается «золотым стандартом» здорового питания.

---

## 2. Разрешённые продукты

- Оливковое масло extra virgin — основной источник жира
- Овощи, фрукты, бобовые и орехи
- Рыба и морепродукты (не менее 2 раз в неделю)
- Цельнозерновые (цельная пшеница, овёс, коричневый рис)
- Умеренное количество вина (1–2 бокала в день)

---

## 3. Запрещённые продукты

- Красное мясо (более 2 порций в неделю)
- Обработанные мясные продукты (колбасы, бекон)
- Сахар и кондитерские изделия
- Рафинированные масла и трансжиры

---

## 4. Показания

- Профилактика сердечно-сосудистых заболеваний
- Метаболический синдром и сахарный диабет 2 типа
- Нейродегенеративные заболевания (болезнь Альцгеймера)
- Снижение системного воспаления

---

## 5. Противопоказания

- Индивидуальная непереносимость компонентов (оливковое масло, рыба)
- Необходимость строгого ограничения жиров (редкие нарушения липидного обмена)
- Алкогольная зависимость (исключается вино)

---

## 6. Уровень доказательности

★★★★★ — Очень высокий. Масштабные РКИ (PREDIMED, Lyon Diet Heart Study) и мета-анализы подтверждают снижение сердечно-сосудистых событий и общей смертности на 25–30%.

---

## 7. Плюсы и минусы

### За
- Доказанная кардиопротекция и снижение смертности
- Высокая вкусовая привлекательность и устойчивость
- Богатство клетчаткой, полифенолами и омега-3

### Против
- Относительно высокая стоимость качественных продуктов
- Требует регулярного приготовления пищи
- Умеренное содержание соли и вина может быть ограничением

---

## 8. Дискуссия

В DTLP средиземноморская диета является референсным рационом при отсутствии специфических непереносимостей. Нутригенетические исследования показывают модуляцию эффекта через полиморфизмы APOE, PPAR и TCF7L2. Легко комбинируется с GF-, LF- и low-carb-модификациями.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,aj=`# Предпочтение: Без сахара

### Category: Диетическое

---

## 1. Суть подхода

Диета без добавленного сахара предполагает полное исключение рафинированных сахаров, промышленных подсластителей и продуктов с добавленным сахаром. Естественные сахара фруктов и овощей не ограничиваются. Цель — снижение гликемической нагрузки и уменьшение инсулиновых пиков.

---

## 2. Разрешённые продукты

- Овощи и фрукты (в натуральном виде)
- Цельнозерновые и бобовые
- Мясо, рыба, птица, яйца
- Орехи, семена и несладкие молочные продукты
- Вода, травяные чаи, кофе без сахара

---

## 3. Запрещённые продукты

- Белый и коричневый сахар, сахарная пудра
- Кондитерские изделия, шоколад, десерты
- Сладкие газированные напитки и пакетированные соки
- Сиропы (кленовый, агавы, глюкозно-фруктозный)

---

## 4. Показания

- Сахарный диабет 2 типа и преддиабет
- Инсулинорезистентность
- Избыточная масса тела
- Хронические воспалительные заболевания

---

## 5. Противопоказания

- Расстройства пищевого поведения в анамнезе
- Необходимость быстрого восполнения энергии (интенсивные тренировки)
- Детский возраст без контроля (риск орторексии)

---

## 6. Уровень доказательности

★★★★☆ — Высокий. Снижение потребления добавленного сахара ассоциировано с уменьшением риска ожирения, СД2 и кариеса. ВОЗ рекомендует ограничение <10% калорий (целевой уровень <5%). РКИ подтверждают улучшение метаболических маркеров.

---

## 7. Плюсы и минусы

### За
- Снижение калорийности рациона без подсчёта
- Улучшение гликемического профиля
- Уменьшение риска стоматологических заболеваний

### Против
- Сложность избегания скрытого сахара в продуктах
- Социальные ограничения (праздники, кафе)
- Адаптационный период (тяга к сладкому, раздражительность)

---

## 8. Дискуссия

В DTLP протокол без сахара часто входит как начальный этап элиминации. Сочетается с low-carb и кето-подходами, но не идентичен им. Нутригенетические маркеры (GLUT2, TAS1R2) могут предсказывать предпочтение сладкого и эффективность ограничения. Является универсальным модулем для большинства протоколов.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,lj=`# Предпочтение: Спортивное питание

### Category: Диетическое

---

## 1. Суть подхода

Спортивная диета — рацион, оптимизированный для физической активности, роста мышечной массы и восстановления. Характеризуется повышенным содержанием белка (1.6–2.2 г/кг массы тела), достаточным количеством сложных углеводов и циклированием калорий. Адаптируется под тип, интенсивность и цели тренировок.

---

## 2. Разрешённые продукты

- Нежирное мясо (курица, индейка, говядина)
- Рыба и морепродукты
- Яйца, творог, греческий йогурт
- Сложные углеводы (гречка, рис, овсянка, сладкий картофель)
- Протеиновые добавки (сывороточный, казеин, растительный протеин)

---

## 3. Запрещённые продукты

- Фастфуд и ультра-обработанные продукты
- Трансжиры и промышленные маргарины
- Избыточное количество простых сахаров (кроме периодов «углеводного окна»)
- Алкоголь (снижает синтез белка и восстановление)

---

## 4. Показания

- Набор мышечной массы и увеличение силы
- Снижение процента жира (сушка)
- Аэробная и анаэробная подготовка
- Восстановление после травм и операций (повышенная потребность в белке)

---

## 5. Противопоказания

- Хроническая болезнь почек (избыток белка)
- Подагра и гиперурикемия
- Нарушения пищевого поведения (мышечная дисморфия, орторексия)
- Детский и подростковый возраст без наблюдения специалиста

---

## 6. Уровень доказательности

★★★★★ — Очень высокий. Мета-анализы подтверждают эффективность повышенного белка для мышечной гипертрофии при силовых тренировках. РКИ показывают преимущества timing-нутриентов (перитренировочное окно) и циклирования углеводов.

---

## 7. Плюсы и минусы

### За
- Поддержка мышечного роста и восстановления
- Персонализация под цели (сила, выносливость, сушка)
- Широкий выбор спортивных добавок (протеины, BCAA, креатин)

### Против
- Высокая стоимость качественного белка и добавок
- Риск злоупотребления протеиновыми смесями
- Требует точного расчёта макронутриентов

---

## 8. Дискуссия

В DTLP спортивный протокол интегрируется с нутригенетикой: полиморфизмы ACTN3, PPARGC1A и MTHFR влияют на метаболизм макронутриентов и восстановление. Сочетается с любыми диетами (средиземноморская, low-carb, веганская) при условии коррекции белка. Является основой для персонализированных фитнес-протоколов.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,ij=`# Предпочтение: Веганство

### Category: Диетическое

---

## 1. Суть подхода

Веганство исключает все продукты животного происхождения: мясо, рыбу, молочные продукты, яйца и мёд. Рацион полностью строится на растительных источниках. Ассоциируется с этическими, экологическими и оздоровительными мотивациями.

---

## 2. Разрешённые продукты

- Овощи, фрукты, ягоды и зелень
- Бобовые (чечевица, нут, тофу, темпе)
- Зерновые и цельнозерновые продукты
- Орехи, семена и растительные масла
- Растительное молоко (соевое, миндальное, овсяное)

---

## 3. Запрещённые продукты

- Все виды мяса и птицы
- Рыба и морепродукты
- Молочные продукты и яйца
- Мёд и продукты пчеловодства

---

## 4. Показания

- Сердечно-сосудистые заболевания
- Метаболический синдром
- Воспалительные заболевания кишечника
- Экологически мотивированный образ жизни

---

## 5. Противопоказания

- Беременность и лактация (без нутриентной поддержки)
- Дефицит B12 и витамина D в анамнезе
- Расстройства пищевого поведения (ОРПП)
- Детский возраст без наблюдения диетолога

---

## 6. Уровень доказательности

★★★☆☆ — Умеренный. Мета-анализы подтверждают снижение ИМТ и холестерина. Данные по долгосрочной безопасности при полном исключении животных продуктов ограничены.

---

## 7. Плюсы и минусы

### За
- Высокое содержание клетчатки и фитонутриентов
- Низкое содержание насыщенных жиров
- Потенциально низкий углеродный след

### Против
- Высокий риск дефицита B12, железа, кальция, цинка, омега-3
- Требует обязательной суплементации B12
- Социальные и кулинарные ограничения

---

## 8. Дискуссия

В DTLP веганский протокол используется как элиминационная диета высокой строгости. Пересекается с LF-подходом при подозрении на лактазную недостаточность. Требует интеграции с нутригенетическими данными для оценки риска дефицитов.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,sj=`# Предпочтение: Вегетарианство

### Category: Диетическое

---

## 1. Суть подхода

Вегетарианство исключает употребление мяса, рыбы и морепродуктов. Рацион строится на растительных продуктах, молочных изделиях и яйцах. Подход популярен как этический, экологический и оздоровительный.

---

## 2. Разрешённые продукты

- Овощи и зелень (все виды)
- Фрукты и ягоды
- Бобовые (чечевица, нут, фасоль, горох)
- Зерновые и крупы (гречка, рис, овсянка, киноа)
- Молочные продукты и яйца

---

## 3. Запрещённые продукты

- Красное мясо и птица
- Рыба и морепродукты
- Желатин животного происхождения
- Бульоны на мясе и рыбе

---

## 4. Показания

- Сердечно-сосудистые заболевания
- Избыточная масса тела
- Сахарный диабет 2 типа
- Хронические воспалительные заболевания

---

## 5. Противопоказания

- Беременность и лактация (требуется контроль нутриентов)
- Дефицит железа или B12 в анамнезе
- Дети в период активного роста (без врачебного контроля)

---

## 6. Уровень доказательности

★★★☆☆ — Умеренный. Когортные исследования показывают снижение риска ИБС и общей смертности. Требуются РКИ для подтверждения долгосрочных эффектов.

---

## 7. Плюсы и минусы

### За
- Снижает уровень холестерина и артериальное давление
- Богат клетчаткой и антиоксидантами
- Меньший углеродный след

### Против
- Риск дефицита B12, железа, цинка и омега-3
- Может быть сложен для соблюдения вне дома
- Требует осознанного планирования рациона

---

## 8. Дискуссия

В контексте DTLP вегетарианство пересекается с нутригеномными подходами: у части пациентов растительная диета модулирует экспрессию генов, связанных с воспалением. Комбинируется с LF, GF и другими исключающими протоколами для персонализированной коррекции.

---

*Источник: diet preference description | Создано: Май 2026 | DTLP v1.0*
`,cj=`# Ограничение: Аллергии

### Category: Диетическое

---

## 1. Суть подхода

Исключение из рациона продуктов, вызывающих иммунный ответ организма. Аллергия на пищу — это патологическая реакция иммунной системы на белки-аллергены, которая может проявляться от лёгкого дискомфорта до жизнеугрожающих состояний. Диетическое ограничение строится на полном исключении триггерных продуктов и контроле перекрёстного загрязнения.

---

## 2. Типичные случаи

- арахис
- коровье молоко
- яйца
- соя
- морепродукты
- орехи
- глютен
- кунжут

---

## 3. Влияние на рацион

Требует тщательного контроля состава всех блюд, замены аллергенных продуктов на безопасные аналоги, исключения готовых продуктов со скрытыми аллергенами. Необходимо пересмотреть систему закупок, хранения и приготовления, чтобы избежать перекрёстного загрязнения. Рацион становится менее разнообразным без проработки альтернатив.

---

## 4. Пересечение с другими подходами

- целиакия (безглютеновая диета) — частный случай медицинского исключения
- непереносимость лактозы — пересечение с исключением коровьего молока
- веганство — многие аллергены (соя, орехи) являются основой веганского рациона, что усложняет комбинирование
- этнические диеты — в некоторых культурах сложнее найти маркировку аллергенов
- FODMAP — частичное пересечение по исключаемым продуктам (пшеница, молочные продукты)

---

## 5. Рекомендации по реализации в DTLP

- добавить поле allergens в модель пользователя и в карточку рецепта
- реализовать строгую фильтрацию рецептов по триггерам
- предусмотреть предупреждения о перекрёстном загрязнении
- добавить возможность указания уровня строгости (контактная аллергия / пищевая)

---

## 6. Риски

- анафилаксия при случайном употреблении аллергена
- перекрёстная аллергия с продуктами из той же группы
- скрытые аллергены в обработанных продуктах и полуфабрикатах

---

## 7. Плюсы и минусы

### За
- предотвращение тяжёлых аллергических реакций
- улучшение качества жизни при правильном подборе рациона
- широкий выбор современных заменителей аллергенных продуктов

### Против
- высокий уровень тревожности при питании вне дома
- социальная изоляция в коллективных мероприятиях с едой
- риск дефицита нутриентов при неправильно составленном меню

---

## 8. Дискуссия

Аллергии — одно из самых строгих ограничений в DTLP, поскольку последствия ошибки могут быть фатальными. Это требует не только фильтрации рецептов, но и образовательного компонента: пользователь должен уметь читать этикетки и понимать риски перекрёстного загрязнения. Система должна поддерживать гибкость: некоторые аллергии допускают термическую обработку (например, коровье молоко в выпечке), тогда как другие (арахис) опасны в любом виде. Роль DTLP — не только исключать, но и предлагать безопасные альтернативы.

---

*Источник: diet restriction description | Создано: Май 2026 | DTLP v1.0*
`,rj=`# Ограничение: Нелюбимые продукты

### Category: Диетическое

---

## 1. Суть подхода

Персонализированное исключение продуктов или блюд на основе вкусовых предпочтений пользователя. В отличие от медицинских или религиозных ограничений, нелюбимые продукты не имеют объективной необходимости — решение об исключении принимается на уровне комфорта и субъективного восприятия пищи. Тем не менее, игнорирование таких предпочтений снижает приверженность диете.

---

## 2. Типичные случаи

- рыба и морепродукты
- печень и другие субпродукты
- грибы
- бобовые
- острая пища
- блюда с сильным запахом
- ферментированные продукты

---

## 3. Влияние на рацион

При исключении небольшого числа продуктов влияние минимально. Однако если пользователь исключает целые категории (например, все морепродукты или все бобовые), это может привести к сужению рациона и дефициту определённых нутриентов. Основная задача — подобрать альтернативы, которые восполнят питательную ценность исключённых продуктов.

---

## 4. Пересечение с другими подходами

- этический выбор (веганство) — если нелюбимы все продукты животного происхождения, может маскировать этическую позицию
- текстура пищи (дисфагия) — неприятие определённых текстур может быть следствием медицинской проблемы
- религиозные ограничения — субъективное неприятие может совпадать с религиозными нормами, но по другим мотивам
- FODMAP — исключение бобовых может быть как вкусовым, так и медицинским

---

## 5. Рекомендации по реализации в DTLP

- добавить механизм «настроек вкуса» в профиле пользователя
- реализовать замену исключённых продуктов без сильного изменения рецепта
- предусмотреть возможность временного исключения (например, на время беременности или болезни)
- не показывать «рекомендации дня» с нелюбимыми продуктами

---

## 6. Риски

- дефицит нутриентов при исключении целых групп продуктов
- снижение разнообразия рациона
- субъективность — предпочтения могут меняться со временем без отражения в профиле

---

## 7. Плюсы и минусы

### За
- повышение удовлетворённости и приверженности диете
- снижение стресса при планировании меню
- гибкость — легко добавлять и убирать ограничения

### Против
- риск недополучения важных нутриентов при исключении целых категорий
- необходимость отделять «нелюблю» от «не пробовал»
- может усложнять подбор сбалансированного меню при большом количестве исключений

---

## 8. Дискуссия

Нелюбимые продукты — наиболее субъективная категория ограничений в DTLP. В отличие от аллергий или религиозных норм, здесь нет внешнего диктата — решение принимает сам пользователь. Важно не путать нелюбимые продукты с медицинскими ограничениями: пользователь может «не любить» глютен, не имея целиакии. Система должна поддерживать эту категорию, но предлагать образовательный контент, чтобы пользователь понимал последствия исключения целых групп и мог осознанно расширять рацион.

---

*Источник: diet restriction description | Создано: Май 2026 | DTLP v1.0*
`,oj=`# Ограничение: Другие ограничения

### Category: Диетическое

---

## 1. Суть подхода

Сборная категория ограничений, не относящихся к аллергиям, вкусовым предпочтениям или религии. Включает этические диеты (веганство), медицинские протоколы (FODMAP, DASH), лечебное питание при хронических заболеваниях и ограничения по текстуре пищи (дисфагия). Каждое из этих ограничений имеет собственную логику и цели — от этических убеждений до строгих медицинских предписаний.

---

## 2. Типичные случаи

- этический выбор (веганство)
- FODMAP
- DASH
- лечебное питание
- текстура пищи (дисфагия)

---

## 3. Влияние на рацион

Влияние варьируется от умеренного (DASH — увеличение овощей и снижение соли) до радикального (FODMAP — поэтапное исключение и повторное введение ферментируемых углеводов). Веганство исключает все продукты животного происхождения. Лечебное питание может ограничивать конкретные нутриенты (калий при почечной недостаточности, углеводы при диабете). Дисфагия требует изменения текстуры всех блюд до определённого уровня вязкости/измельчения.

---

## 4. Пересечение с другими подходами

- аллергии — FODMAP может временно исключать аллергенные продукты (пшеница, молочные)
- религиозные ограничения — веганство частично совпадает с буддийской диетой и православным постом
- нелюбимые продукты — этический выбор может быть ошибочно принят за вкусовое предпочтение
- лечебное питание + FODMAP — оба требуют ведения дневника питания для выявления триггеров

---

## 5. Рекомендации по реализации в DTLP

- выделить веганство в отдельную категорию с поддержкой переходного периода (вегетарианство → веганство)
- для FODMAP реализовать поэтапный режим: исключение → повторное введение → поддерживающая диета
- для DASH — добавить трекинг натрия и калия
- для дисфагии — добавить фильтр по текстуре (пюре, измельчённое, мягкое, жидкое)

---

## 6. Риски

- несбалансированное питание без контроля специалиста при исключении целых групп продуктов
- самодиагностика — пользователь может ошибочно назначить себе FODMAP или лечебную диету
- сложность соблюдения — FODMAP и лечебное питание требуют высокой вовлечённости и знаний

---

## 7. Плюсы и минусы

### За
- широкий охват — от этики до медицины, покрывает большинство «нетиповых» случаев
- возможность тонкой настройки под индивидуальные потребности
- образовательный потенциал — пользователь узнаёт о влиянии питания на здоровье

### Против
- сложность реализации в одной системе из-за разнородности ограничений
- риск некомпетентного самолечения при медицинских диетах
- веганство требует особого внимания к дефициту B12, железа, кальция и омега-3

---

## 8. Дискуссия

Эта категория — самая разнородная в DTLP, что делает её одновременно и самой ценной, и самой сложной для реализации. Веганство — полноценный образ жизни, требующий глубокой проработки меню. FODMAP — клинический протокол, который должен назначаться врачом. DASH — научно обоснованный режим питания. Дисфагия — медицинское состояние, требующее изменения физических свойств пищи. DTLP должен не смешивать эти подходы, а предоставлять для каждого отдельный инструментарий, с чёткими предупреждениями о необходимости консультации со специалистом там, где это требуется.

---

*Источник: diet restriction description | Создано: Май 2026 | DTLP v1.0*
`,dj=`# Ограничение: Религиозные

### Category: Диетическое

---

## 1. Суть подхода

Соблюдение пищевых предписаний, налагаемых религиозной традицией. Религиозные ограничения могут быть постоянными (запрет на определённые продукты) или временными (посты, праздничные периоды). Они опираются на авторитет священных текстов и религиозных институтов, а не на медицинские показания. Нарушение таких ограничений часто воспринимается как этический или духовный проступок.

---

## 2. Типичные случаи

- халяль (ислам)
- кошер (иудаизм)
- православные посты
- индуизм (без говядины)
- буддийская диета

---

## 3. Влияние на рацион

Религиозные ограничения существенно влияют на структуру питания: исключаются целые категории продуктов, меняются принципы их обработки и сочетания. Для халяль и кошера требуется сертифицированное сырьё и раздельное хранение. Посты вводят циклические ограничения — одни продукты разрешены в обычные дни и запрещены в постные. Это требует сложной логики планирования меню с учётом календаря.

---

## 4. Пересечение с другими подходами

- этический выбор (веганство) — буддийская диета и православный пост частично пересекаются с веганством
- лечебное питание — при совпадении поста и медицинской диеты требуется приоритизация
- аллергии — кошерные/халяль продукты могут содержать скрытые аллергены
- FODMAP — исключение бобовых в пост может конфликтовать с медицинскими показаниями
- текстура пищи — в некоторых традициях есть ограничения на консистенцию (например, отсутствие мяса в пост)

---

## 5. Рекомендации по реализации в DTLP

- добавить календарь религиозных событий для автоматического переключения режимов
- реализовать проверку совместимости ингредиентов (халяль/кошер сертификация)
- предусмотреть приоритизацию при конфликте религиозных и медицинских ограничений
- обеспечить раздельное отображение «постоянных» и «временных» ограничений в интерфейсе

---

## 6. Риски

- социальная изоляция при невозможности разделить трапезу с другими
- сложность комбинирования с медицинскими диетами (особенно в пост)
- зависимость от доступности сертифицированных продуктов в регионе

---

## 7. Плюсы и минусы

### За
- сохранение культурной и религиозной идентичности
- структурированный подход к питанию с чёткими правилами
- возможность интеграции с календарём для автоматизации планирования

### Против
- сложность логистики (раздельная посуда, сертификация, разные поставщики)
- конфликт с медицинскими рекомендациями при совпадении ограничений
- региональная вариативность — нормы могут различаться в зависимости от течения и страны

---

## 8. Дискуссия

Религиозные ограничения занимают особое место в DTLP, поскольку они сочетают строгость правил с их временной вариативностью. Православные посты, например, создают циклы разрешённых и запрещённых продуктов, что требует календарной логики в системе. Халяль и кошер добавляют требование сертификации поставщиков. Наиболее сложный сценарий — одновременное соблюдение религиозных и медицинских ограничений, где DTLP должен выступать арбитром, предлагая компромиссные решения (например, постное меню с достаточным количеством белка).

---

*Источник: diet restriction description | Создано: Май 2026 | DTLP v1.0*
`;var uj=Object.defineProperty,Mc=Object.getOwnPropertySymbols,Fg=Object.prototype.hasOwnProperty,Wg=Object.prototype.propertyIsEnumerable,Sp=(e,t,n)=>t in e?uj(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,pd=(e,t)=>{for(var n in t||(t={}))Fg.call(t,n)&&Sp(e,n,t[n]);if(Mc)for(var n of Mc(t))Wg.call(t,n)&&Sp(e,n,t[n]);return e},gd=(e,t)=>{var n={};for(var l in e)Fg.call(e,l)&&t.indexOf(l)<0&&(n[l]=e[l]);if(e!=null&&Mc)for(var l of Mc(e))t.indexOf(l)<0&&Wg.call(e,l)&&(n[l]=e[l]);return n};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var wa;(e=>{const t=class ne{constructor(r,d,h,p){if(this.version=r,this.errorCorrectionLevel=d,this.modules=[],this.isFunction=[],r<ne.MIN_VERSION||r>ne.MAX_VERSION)throw new RangeError("Version value out of range");if(p<-1||p>7)throw new RangeError("Mask value out of range");this.size=r*4+17;let f=[];for(let C=0;C<this.size;C++)f.push(!1);for(let C=0;C<this.size;C++)this.modules.push(f.slice()),this.isFunction.push(f.slice());this.drawFunctionPatterns();const x=this.addEccAndInterleave(h);if(this.drawCodewords(x),p==-1){let C=1e9;for(let k=0;k<8;k++){this.applyMask(k),this.drawFormatBits(k);const M=this.getPenaltyScore();M<C&&(p=k,C=M),this.applyMask(k)}}i(0<=p&&p<=7),this.mask=p,this.applyMask(p),this.drawFormatBits(p),this.isFunction=[]}static encodeText(r,d){const h=e.QrSegment.makeSegments(r);return ne.encodeSegments(h,d)}static encodeBinary(r,d){const h=e.QrSegment.makeBytes(r);return ne.encodeSegments([h],d)}static encodeSegments(r,d,h=1,p=40,f=-1,x=!0){if(!(ne.MIN_VERSION<=h&&h<=p&&p<=ne.MAX_VERSION)||f<-1||f>7)throw new RangeError("Invalid value");let C,k;for(C=h;;C++){const _=ne.getNumDataCodewords(C,d)*8,w=c.getTotalBits(r,C);if(w<=_){k=w;break}if(C>=p)throw new RangeError("Data too long")}for(const _ of[ne.Ecc.MEDIUM,ne.Ecc.QUARTILE,ne.Ecc.HIGH])x&&k<=ne.getNumDataCodewords(C,_)*8&&(d=_);let M=[];for(const _ of r){n(_.mode.modeBits,4,M),n(_.numChars,_.mode.numCharCountBits(C),M);for(const w of _.getData())M.push(w)}i(M.length==k);const v=ne.getNumDataCodewords(C,d)*8;i(M.length<=v),n(0,Math.min(4,v-M.length),M),n(0,(8-M.length%8)%8,M),i(M.length%8==0);for(let _=236;M.length<v;_^=253)n(_,8,M);let m=[];for(;m.length*8<M.length;)m.push(0);return M.forEach((_,w)=>m[w>>>3]|=_<<7-(w&7)),new ne(C,d,m,f)}getModule(r,d){return 0<=r&&r<this.size&&0<=d&&d<this.size&&this.modules[d][r]}getModules(){return this.modules}drawFunctionPatterns(){for(let h=0;h<this.size;h++)this.setFunctionModule(6,h,h%2==0),this.setFunctionModule(h,6,h%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const r=this.getAlignmentPatternPositions(),d=r.length;for(let h=0;h<d;h++)for(let p=0;p<d;p++)h==0&&p==0||h==0&&p==d-1||h==d-1&&p==0||this.drawAlignmentPattern(r[h],r[p]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(r){const d=this.errorCorrectionLevel.formatBits<<3|r;let h=d;for(let f=0;f<10;f++)h=h<<1^(h>>>9)*1335;const p=(d<<10|h)^21522;i(p>>>15==0);for(let f=0;f<=5;f++)this.setFunctionModule(8,f,l(p,f));this.setFunctionModule(8,7,l(p,6)),this.setFunctionModule(8,8,l(p,7)),this.setFunctionModule(7,8,l(p,8));for(let f=9;f<15;f++)this.setFunctionModule(14-f,8,l(p,f));for(let f=0;f<8;f++)this.setFunctionModule(this.size-1-f,8,l(p,f));for(let f=8;f<15;f++)this.setFunctionModule(8,this.size-15+f,l(p,f));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let r=this.version;for(let h=0;h<12;h++)r=r<<1^(r>>>11)*7973;const d=this.version<<12|r;i(d>>>18==0);for(let h=0;h<18;h++){const p=l(d,h),f=this.size-11+h%3,x=Math.floor(h/3);this.setFunctionModule(f,x,p),this.setFunctionModule(x,f,p)}}drawFinderPattern(r,d){for(let h=-4;h<=4;h++)for(let p=-4;p<=4;p++){const f=Math.max(Math.abs(p),Math.abs(h)),x=r+p,C=d+h;0<=x&&x<this.size&&0<=C&&C<this.size&&this.setFunctionModule(x,C,f!=2&&f!=4)}}drawAlignmentPattern(r,d){for(let h=-2;h<=2;h++)for(let p=-2;p<=2;p++)this.setFunctionModule(r+p,d+h,Math.max(Math.abs(p),Math.abs(h))!=1)}setFunctionModule(r,d,h){this.modules[d][r]=h,this.isFunction[d][r]=!0}addEccAndInterleave(r){const d=this.version,h=this.errorCorrectionLevel;if(r.length!=ne.getNumDataCodewords(d,h))throw new RangeError("Invalid argument");const p=ne.NUM_ERROR_CORRECTION_BLOCKS[h.ordinal][d],f=ne.ECC_CODEWORDS_PER_BLOCK[h.ordinal][d],x=Math.floor(ne.getNumRawDataModules(d)/8),C=p-x%p,k=Math.floor(x/p);let M=[];const v=ne.reedSolomonComputeDivisor(f);for(let _=0,w=0;_<p;_++){let O=r.slice(w,w+k-f+(_<C?0:1));w+=O.length;const L=ne.reedSolomonComputeRemainder(O,v);_<C&&O.push(0),M.push(O.concat(L))}let m=[];for(let _=0;_<M[0].length;_++)M.forEach((w,O)=>{(_!=k-f||O>=C)&&m.push(w[_])});return i(m.length==x),m}drawCodewords(r){if(r.length!=Math.floor(ne.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let d=0;for(let h=this.size-1;h>=1;h-=2){h==6&&(h=5);for(let p=0;p<this.size;p++)for(let f=0;f<2;f++){const x=h-f,k=(h+1&2)==0?this.size-1-p:p;!this.isFunction[k][x]&&d<r.length*8&&(this.modules[k][x]=l(r[d>>>3],7-(d&7)),d++)}}i(d==r.length*8)}applyMask(r){if(r<0||r>7)throw new RangeError("Mask value out of range");for(let d=0;d<this.size;d++)for(let h=0;h<this.size;h++){let p;switch(r){case 0:p=(h+d)%2==0;break;case 1:p=d%2==0;break;case 2:p=h%3==0;break;case 3:p=(h+d)%3==0;break;case 4:p=(Math.floor(h/3)+Math.floor(d/2))%2==0;break;case 5:p=h*d%2+h*d%3==0;break;case 6:p=(h*d%2+h*d%3)%2==0;break;case 7:p=((h+d)%2+h*d%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[d][h]&&p&&(this.modules[d][h]=!this.modules[d][h])}}getPenaltyScore(){let r=0;for(let f=0;f<this.size;f++){let x=!1,C=0,k=[0,0,0,0,0,0,0];for(let M=0;M<this.size;M++)this.modules[f][M]==x?(C++,C==5?r+=ne.PENALTY_N1:C>5&&r++):(this.finderPenaltyAddHistory(C,k),x||(r+=this.finderPenaltyCountPatterns(k)*ne.PENALTY_N3),x=this.modules[f][M],C=1);r+=this.finderPenaltyTerminateAndCount(x,C,k)*ne.PENALTY_N3}for(let f=0;f<this.size;f++){let x=!1,C=0,k=[0,0,0,0,0,0,0];for(let M=0;M<this.size;M++)this.modules[M][f]==x?(C++,C==5?r+=ne.PENALTY_N1:C>5&&r++):(this.finderPenaltyAddHistory(C,k),x||(r+=this.finderPenaltyCountPatterns(k)*ne.PENALTY_N3),x=this.modules[M][f],C=1);r+=this.finderPenaltyTerminateAndCount(x,C,k)*ne.PENALTY_N3}for(let f=0;f<this.size-1;f++)for(let x=0;x<this.size-1;x++){const C=this.modules[f][x];C==this.modules[f][x+1]&&C==this.modules[f+1][x]&&C==this.modules[f+1][x+1]&&(r+=ne.PENALTY_N2)}let d=0;for(const f of this.modules)d=f.reduce((x,C)=>x+(C?1:0),d);const h=this.size*this.size,p=Math.ceil(Math.abs(d*20-h*10)/h)-1;return i(0<=p&&p<=9),r+=p*ne.PENALTY_N4,i(0<=r&&r<=2568888),r}getAlignmentPatternPositions(){if(this.version==1)return[];{const r=Math.floor(this.version/7)+2,d=this.version==32?26:Math.ceil((this.version*4+4)/(r*2-2))*2;let h=[6];for(let p=this.size-7;h.length<r;p-=d)h.splice(1,0,p);return h}}static getNumRawDataModules(r){if(r<ne.MIN_VERSION||r>ne.MAX_VERSION)throw new RangeError("Version number out of range");let d=(16*r+128)*r+64;if(r>=2){const h=Math.floor(r/7)+2;d-=(25*h-10)*h-55,r>=7&&(d-=36)}return i(208<=d&&d<=29648),d}static getNumDataCodewords(r,d){return Math.floor(ne.getNumRawDataModules(r)/8)-ne.ECC_CODEWORDS_PER_BLOCK[d.ordinal][r]*ne.NUM_ERROR_CORRECTION_BLOCKS[d.ordinal][r]}static reedSolomonComputeDivisor(r){if(r<1||r>255)throw new RangeError("Degree out of range");let d=[];for(let p=0;p<r-1;p++)d.push(0);d.push(1);let h=1;for(let p=0;p<r;p++){for(let f=0;f<d.length;f++)d[f]=ne.reedSolomonMultiply(d[f],h),f+1<d.length&&(d[f]^=d[f+1]);h=ne.reedSolomonMultiply(h,2)}return d}static reedSolomonComputeRemainder(r,d){let h=d.map(p=>0);for(const p of r){const f=p^h.shift();h.push(0),d.forEach((x,C)=>h[C]^=ne.reedSolomonMultiply(x,f))}return h}static reedSolomonMultiply(r,d){if(r>>>8||d>>>8)throw new RangeError("Byte out of range");let h=0;for(let p=7;p>=0;p--)h=h<<1^(h>>>7)*285,h^=(d>>>p&1)*r;return i(h>>>8==0),h}finderPenaltyCountPatterns(r){const d=r[1];i(d<=this.size*3);const h=d>0&&r[2]==d&&r[3]==d*3&&r[4]==d&&r[5]==d;return(h&&r[0]>=d*4&&r[6]>=d?1:0)+(h&&r[6]>=d*4&&r[0]>=d?1:0)}finderPenaltyTerminateAndCount(r,d,h){return r&&(this.finderPenaltyAddHistory(d,h),d=0),d+=this.size,this.finderPenaltyAddHistory(d,h),this.finderPenaltyCountPatterns(h)}finderPenaltyAddHistory(r,d){d[0]==0&&(r+=this.size),d.pop(),d.unshift(r)}};t.MIN_VERSION=1,t.MAX_VERSION=40,t.PENALTY_N1=3,t.PENALTY_N2=3,t.PENALTY_N3=40,t.PENALTY_N4=10,t.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],t.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],e.QrCode=t;function n(o,r,d){if(r<0||r>31||o>>>r)throw new RangeError("Value out of range");for(let h=r-1;h>=0;h--)d.push(o>>>h&1)}function l(o,r){return(o>>>r&1)!=0}function i(o){if(!o)throw new Error("Assertion error")}const s=class De{constructor(r,d,h){if(this.mode=r,this.numChars=d,this.bitData=h,d<0)throw new RangeError("Invalid argument");this.bitData=h.slice()}static makeBytes(r){let d=[];for(const h of r)n(h,8,d);return new De(De.Mode.BYTE,r.length,d)}static makeNumeric(r){if(!De.isNumeric(r))throw new RangeError("String contains non-numeric characters");let d=[];for(let h=0;h<r.length;){const p=Math.min(r.length-h,3);n(parseInt(r.substring(h,h+p),10),p*3+1,d),h+=p}return new De(De.Mode.NUMERIC,r.length,d)}static makeAlphanumeric(r){if(!De.isAlphanumeric(r))throw new RangeError("String contains unencodable characters in alphanumeric mode");let d=[],h;for(h=0;h+2<=r.length;h+=2){let p=De.ALPHANUMERIC_CHARSET.indexOf(r.charAt(h))*45;p+=De.ALPHANUMERIC_CHARSET.indexOf(r.charAt(h+1)),n(p,11,d)}return h<r.length&&n(De.ALPHANUMERIC_CHARSET.indexOf(r.charAt(h)),6,d),new De(De.Mode.ALPHANUMERIC,r.length,d)}static makeSegments(r){return r==""?[]:De.isNumeric(r)?[De.makeNumeric(r)]:De.isAlphanumeric(r)?[De.makeAlphanumeric(r)]:[De.makeBytes(De.toUtf8ByteArray(r))]}static makeEci(r){let d=[];if(r<0)throw new RangeError("ECI assignment value out of range");if(r<128)n(r,8,d);else if(r<16384)n(2,2,d),n(r,14,d);else if(r<1e6)n(6,3,d),n(r,21,d);else throw new RangeError("ECI assignment value out of range");return new De(De.Mode.ECI,0,d)}static isNumeric(r){return De.NUMERIC_REGEX.test(r)}static isAlphanumeric(r){return De.ALPHANUMERIC_REGEX.test(r)}getData(){return this.bitData.slice()}static getTotalBits(r,d){let h=0;for(const p of r){const f=p.mode.numCharCountBits(d);if(p.numChars>=1<<f)return 1/0;h+=4+f+p.bitData.length}return h}static toUtf8ByteArray(r){r=encodeURI(r);let d=[];for(let h=0;h<r.length;h++)r.charAt(h)!="%"?d.push(r.charCodeAt(h)):(d.push(parseInt(r.substring(h+1,h+3),16)),h+=2);return d}};s.NUMERIC_REGEX=/^[0-9]*$/,s.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,s.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let c=s;e.QrSegment=s})(wa||(wa={}));(e=>{(t=>{const n=class{constructor(i,s){this.ordinal=i,this.formatBits=s}};n.LOW=new n(0,1),n.MEDIUM=new n(1,0),n.QUARTILE=new n(2,3),n.HIGH=new n(3,2),t.Ecc=n})(e.QrCode||(e.QrCode={}))})(wa||(wa={}));(e=>{(t=>{const n=class{constructor(i,s){this.modeBits=i,this.numBitsCharCount=s}numCharCountBits(i){return this.numBitsCharCount[Math.floor((i+7)/17)]}};n.NUMERIC=new n(1,[10,12,14]),n.ALPHANUMERIC=new n(2,[9,11,13]),n.BYTE=new n(4,[8,16,16]),n.KANJI=new n(8,[8,10,12]),n.ECI=new n(7,[0,0,0]),t.Mode=n})(e.QrSegment||(e.QrSegment={}))})(wa||(wa={}));var sl=wa;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var hj={L:sl.QrCode.Ecc.LOW,M:sl.QrCode.Ecc.MEDIUM,Q:sl.QrCode.Ecc.QUARTILE,H:sl.QrCode.Ecc.HIGH},Ig=128,ev="L",tv="#FFFFFF",nv="#000000",av=!1,lv=1,mj=4,fj=0,pj=.1;function iv(e,t=0){const n=[];return e.forEach(function(l,i){let s=null;l.forEach(function(c,o){if(!c&&s!==null){n.push(`M${s+t} ${i+t}h${o-s}v1H${s+t}z`),s=null;return}if(o===l.length-1){if(!c)return;s===null?n.push(`M${o+t},${i+t} h1v1H${o+t}z`):n.push(`M${s+t},${i+t} h${o+1-s}v1H${s+t}z`);return}c&&s===null&&(s=o)})}),n.join("")}function sv(e,t){return e.slice().map((n,l)=>l<t.y||l>=t.y+t.h?n:n.map((i,s)=>s<t.x||s>=t.x+t.w?i:!1))}function gj(e,t,n,l){if(l==null)return null;const i=e.length+n*2,s=Math.floor(t*pj),c=i/t,o=(l.width||s)*c,r=(l.height||s)*c,d=l.x==null?e.length/2-o/2:l.x*c,h=l.y==null?e.length/2-r/2:l.y*c,p=l.opacity==null?1:l.opacity;let f=null;if(l.excavate){let C=Math.floor(d),k=Math.floor(h),M=Math.ceil(o+d-C),v=Math.ceil(r+h-k);f={x:C,y:k,w:M,h:v}}const x=l.crossOrigin;return{x:d,y:h,h:r,w:o,excavation:f,opacity:p,crossOrigin:x}}function vj(e,t){return t!=null?Math.max(Math.floor(t),0):e?mj:fj}function cv({value:e,level:t,minVersion:n,includeMargin:l,marginSize:i,imageSettings:s,size:c,boostLevel:o}){let r=Re.useMemo(()=>{const C=(Array.isArray(e)?e:[e]).reduce((k,M)=>(k.push(...sl.QrSegment.makeSegments(M)),k),[]);return sl.QrCode.encodeSegments(C,hj[t],n,void 0,void 0,o)},[e,t,n,o]);const{cells:d,margin:h,numCells:p,calculatedImageSettings:f}=Re.useMemo(()=>{let x=r.getModules();const C=vj(l,i),k=x.length+C*2,M=gj(x,c,C,s);return{cells:x,margin:C,numCells:k,calculatedImageSettings:M}},[r,c,s,l,i]);return{qrcode:r,margin:h,cells:d,numCells:p,calculatedImageSettings:f}}var yj=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),xj=Re.forwardRef(function(t,n){const l=t,{value:i,size:s=Ig,level:c=ev,bgColor:o=tv,fgColor:r=nv,includeMargin:d=av,minVersion:h=lv,boostLevel:p,marginSize:f,imageSettings:x}=l,k=gd(l,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:M}=k,v=gd(k,["style"]),m=x==null?void 0:x.src,_=Re.useRef(null),w=Re.useRef(null),O=Re.useCallback(Te=>{_.current=Te,typeof n=="function"?n(Te):n&&(n.current=Te)},[n]),[L,z]=Re.useState(!1),{margin:P,cells:Y,numCells:Q,calculatedImageSettings:I}=cv({value:i,level:c,minVersion:h,boostLevel:p,includeMargin:d,marginSize:f,imageSettings:x,size:s});Re.useEffect(()=>{if(_.current!=null){const Te=_.current,H=Te.getContext("2d");if(!H)return;let B=Y;const q=w.current,G=I!=null&&q!==null&&q.complete&&q.naturalHeight!==0&&q.naturalWidth!==0;G&&I.excavation!=null&&(B=sv(Y,I.excavation));const ee=window.devicePixelRatio||1;Te.height=Te.width=s*ee;const T=s/Q*ee;H.scale(T,T),H.fillStyle=o,H.fillRect(0,0,Q,Q),H.fillStyle=r,yj?H.fill(new Path2D(iv(B,P))):Y.forEach(function(Z,Fe){Z.forEach(function(Pe,He){Pe&&H.fillRect(He+P,Fe+P,1,1)})}),I&&(H.globalAlpha=I.opacity),G&&H.drawImage(q,I.x+P,I.y+P,I.w,I.h)}}),Re.useEffect(()=>{z(!1)},[m]);const _e=pd({height:s,width:s},M);let Qe=null;return m!=null&&(Qe=Re.createElement("img",{src:m,key:m,style:{display:"none"},onLoad:()=>{z(!0)},ref:w,crossOrigin:I==null?void 0:I.crossOrigin})),Re.createElement(Re.Fragment,null,Re.createElement("canvas",pd({style:_e,height:s,width:s,ref:O,role:"img"},v)),Qe)});xj.displayName="QRCodeCanvas";var rv=Re.forwardRef(function(t,n){const l=t,{value:i,size:s=Ig,level:c=ev,bgColor:o=tv,fgColor:r=nv,includeMargin:d=av,minVersion:h=lv,boostLevel:p,title:f,marginSize:x,imageSettings:C}=l,k=gd(l,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:M,cells:v,numCells:m,calculatedImageSettings:_}=cv({value:i,level:c,minVersion:h,boostLevel:p,includeMargin:d,marginSize:x,imageSettings:C,size:s});let w=v,O=null;C!=null&&_!=null&&(_.excavation!=null&&(w=sv(v,_.excavation)),O=Re.createElement("image",{href:C.src,height:_.h,width:_.w,x:_.x+M,y:_.y+M,preserveAspectRatio:"none",opacity:_.opacity,crossOrigin:_.crossOrigin}));const L=iv(w,M);return Re.createElement("svg",pd({height:s,width:s,viewBox:`0 0 ${m} ${m}`,ref:n,role:"img"},k),!!f&&Re.createElement("title",null,f),Re.createElement("path",{fill:o,d:`M0,0 h${m}v${m}H0z`,shapeRendering:"crispEdges"}),Re.createElement("path",{fill:r,d:L,shapeRendering:"crispEdges"}),O)});rv.displayName="QRCodeSVG";const _j={version:"1.0",last_updated:"2026-05-07",total_interventions:50,description:"Каталог интервенций для Цифрового Двойника - структурированный для парсинга"},bj={sleep:{name:"Сон",color:"#2196f3",description:"Интервенции для улучшения качества и продолжительности сна"},physical:{name:"Физический",color:"#4caf50",description:"Физическая активность и тренировки"},mental:{name:"Ментальный",color:"#9c27b0",description:"Психологическое здоровье и управление стрессом"},food:{name:"Питание",color:"#ff9800",description:"Питание и диетология"},medical:{name:"мед",color:"#f44336",description:"Медицинские обследования и направления"},supplement:{name:"Добавки",color:"#795548",description:"БАДы и нутри"}},jj={SL_BED:{code:"SL_BED",name:"Сон: время отхода",category:"sleep",impact:9,evidence:"A",type:"behavior",short_description:"Фиксированное время отхода ко сну",full_description:"Установка фиксированного времени отхода ко сну (22:00-23:00) для стабилизации циркадных ритмов. Помогает синхронизировать биологические часы, улучшает качество сна и дневную бодрость. Рекомендуется ложиться спать в одно и то же время, включая выходные.",benefits:["Стабилизация циркадных ритмов","Улучшение качества сна","Снижение времени засыпания","Улучшение дневной бодрости"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Низкий"},affects:["sleep","systolic_bp","diastolic_bp"],color:"#2196f3",regularity:"D",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["sleep","systolic_bp","diastolic_bp"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"22:00"}},SL_DUR:{code:"SL_DUR",name:"Сон: продолжительность",category:"sleep",impact:8.5,evidence:"A",type:"behavior",short_description:"Рекомендовано 7-9 часов сна",full_description:"Обеспечение продолжительности сна 7-9 часов для взрослых. Недостаток сна (<7 часов) связан с повышенным риском сердечно-сосудистых заболеваний, диабета и ожирения. Избыток (>9 часов) также может указывать на проблемы со здоровьем.",benefits:["Снижение риска сердечно-сосудистых заболеваний","Улучшение когнитивных функций","Поддержка иммунной системы","Регуляция гормонов"],implementation:{frequency:"Ежедневно",duration:"7-9 часов",effort_level:"Средний"},affects:["sleep"],color:"#2196f3",regularity:"D",delivery_type:"chatbot",report_effort:"medium",sources:"-",biomarkers:["sleep"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"22:00"}},SL_QLT:{code:"SL_QLT",name:"Сон: качество",category:"sleep",impact:8,evidence:"A",type:"behavior",short_description:"Улучшение качества сна через гигиену сна",full_description:"Комплекс мер по улучшению гигиены сна: прохладная темная комната (18-20°C), отсутствие экранов за час до сна, использование маски для сна, белый шум. Качественный сон важен для консолидации памяти и восстановления организма.",benefits:["Глубокий сон","Снижение ночных пробуждений","Улучшение фаз сна","Утренняя бодрость"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Средний"},affects:["sleep"],color:"#2196f3",regularity:"D",delivery_type:"chatbot",report_effort:"medium",sources:"-",biomarkers:["sleep"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"21:00"}},PH_HIIT:{code:"PH_HIIT",name:"Тренировки: ВИИТ",category:"physical",impact:9,evidence:"A",type:"behavior",short_description:"Высокоинтенсивный интервальный тренинг",full_description:"ВИИТ (HIIT) - тренировки с чередованием высокоинтенсивных упражнений (80-95% от максимального пульса) и периодов отдыха. 20-30 минут таких тренировок дают те же преимущества, что и 45-60 минут умеренных тренировок. Эффективно для сжигания жира и улучшения VO2 max.",benefits:["Сжигание висцерального жира","Улучшение кардиоваскулярного здоровья","Повышение VO2 max","Экономия времени"],implementation:{frequency:"2-3 раза в неделю",duration:"20-30 минут",effort_level:"Высокий"},affects:["resting_hr","systolic_bp","diastolic_bp","cholesterol","weight"],color:"#4caf50",regularity:"W",delivery_type:"chatbot",report_effort:"detailed",sources:"-",biomarkers:["resting_hr","systolic_bp","diastolic_bp","cholesterol","weight"],probability:.9,schedule:{days:[1,3],time:"10:00"}},PH_STR:{code:"PH_STR",name:"Тренировки: силовые",category:"physical",impact:8.5,evidence:"A",type:"behavior",short_description:"Регулярные силовые тренировки",full_description:"Силовые тренировки с отягощением для наращивания и поддержания мышечной массы. Рекомендуется 2-3 раза в неделю, прорабатывая все основные группы мышц. Мышечная масса важна для метаболизма, плотности костей и функционального здоровья.",benefits:["Увеличение мышечной массы","Повышение метаболизма","Укрепление костей","Улучшение инсулиновой чувствительности"],implementation:{frequency:"2-3 раза в неделю",duration:"45-60 минут",effort_level:"Средний"},affects:["weight","muscle_mass"],color:"#4caf50",regularity:"W",delivery_type:"chatbot",report_effort:"medium",sources:"-",biomarkers:["weight","muscle_mass"],probability:.9,schedule:{days:[0,2,4],time:"09:00"}},PH_AER:{code:"PH_AER",name:"Тренировки: аэробные",category:"physical",impact:9,evidence:"A",type:"behavior",short_description:"Бег, плавание, велосипед",full_description:"Аэробные тренировки (кардио) - бег, плавание, езда на велосипеде, быстрая ходьба. Улучшают работу сердечно-сосудистой системы, повышают выносливость. Рекомендуется 150 минут умеренной или 75 минут высокоинтенсивной активности в неделю.",benefits:["Улучшение работы сердца","Снижение АД","Контроль веса","Улучшение настроения"],implementation:{frequency:"3-5 раз в неделю",duration:"30-60 минут",effort_level:"Средний"},affects:["resting_hr","systolic_bp","diastolic_bp","glucose"],color:"#4caf50",regularity:"W",delivery_type:"chatbot",report_effort:"medium",sources:"-",biomarkers:["resting_hr","systolic_bp","diastolic_bp","glucose"],probability:.9,schedule:{days:[0,1,2,3,4],time:"07:00"}},PH_FLEX:{code:"PH_FLEX",name:"Тренировки: гибкость",category:"physical",impact:7.5,evidence:"B",type:"behavior",short_description:"Растяжка и йога",full_description:"Упражнения на гибкость, растяжка и йога для улучшения подвижности суставов и предотвращения травм. Рекомендуется включать в каждую тренировку и выполнять отдельные сессии йоги 1-2 раза в неделю.",benefits:["Улучшение подвижности","Предотвращение травм","Снижение мышечного напряжения","Улучшение осанки"],implementation:{frequency:"2-3 раза в неделю",duration:"20-40 минут",effort_level:"Низкий"},affects:["flexibility"],color:"#4caf50",regularity:"W",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["flexibility"],probability:.75,schedule:{days:[0,3],time:"18:00"}},PH_Z2:{code:"PH_Z2",name:"Тренировки: зона 2",category:"physical",impact:8,evidence:"A",type:"behavior",short_description:"Тренировки в зоне 2 для выносливости",full_description:"Тренировки в зоне 2 (60-70% от максимального пульса) - длительные умеренные нагрузки. Оптимально для развития митохондриальной эффективности и базовой выносливости. Можно выполнять длительную ходьбу, легкий бег, езду на велосипеде.",benefits:["Развитие митохондрий","Улучшение базовой выносливости","Сжигание жира как топлива","Быстрое восстановление"],implementation:{frequency:"3-4 раза в неделю",duration:"45-90 минут",effort_level:"Низкий"},affects:["endurance","resting_hr"],color:"#4caf50",regularity:"W",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["endurance","resting_hr"],probability:.9,schedule:{days:[0,2,4],time:"09:00"}},MN_MDT:{code:"MN_MDT",name:"Медитация",category:"mental",impact:8.5,evidence:"A",type:"behavior",short_description:"Медитация и осознанность",full_description:"Практика медитации и осознанности (mindfulness) для снижения стресса и улучшения ментального здоровья. Может включать дыхательные практики, сканирование тела, наблюдение за мыслями. Даже 10 минут в день дают заметный эффект.",benefits:["Снижение уровня кортизола","Улучшение концентрации","Снижение тревожности","Улучшение эмоционального состояния"],implementation:{frequency:"Ежедневно",duration:"10-20 минут",effort_level:"Низкий"},affects:["stress","hrv","sleep"],color:"#9c27b0",regularity:"D",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["stress","hrv","sleep"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},MN_BRTH:{code:"MN_BRTH",name:"Дыхательные упражнения",category:"mental",impact:7,evidence:"B",type:"behavior",short_description:"Глубокое дыхание",full_description:"Техники глубокого дыхания (диафрагмальное дыхание, дыхание 4-7-8, квадратное дыхание) для активации парасимпатической нервной системы. Помогает быстро снизить ЧСС и уровень стресса.",benefits:["Снижение ЧСС","Активация парасимпатики","Снижение давления","Быстрое успокоение"],implementation:{frequency:"По требности",duration:"3-10 минут",effort_level:"Низкий"},affects:["stress","resting_hr"],color:"#9c27b0",regularity:"P",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["stress","resting_hr"],probability:.75},SL_HYG:{code:"SL_HYG",name:"Сон",category:"sleep",impact:8,evidence:"A",type:"behavior",short_description:"Гигиена сна и режим",full_description:"Комплексная гигиена сна: регулярный режим, подготовка ко сну, идеальная среда для сна. Включает отказ от кофеина после 14:00, комфортную температуру спальни, отсутствие шума и света.",benefits:["Быстрое засыпание","Глубокий сон","Утренняя бодрость","Снижение дневной сонливости"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Низкий"},affects:["sleep"],color:"#2196f3",regularity:"D",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["sleep"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"21:30"}},MN_STR:{code:"MN_STR",name:"Управление стрессом",category:"mental",impact:8,evidence:"A",type:"behavior",short_description:"Техники управления стрессом",full_description:"Комплекс техник для управления хроническим стрессом: планирование, приоритизация задач, физическая активность, социальная поддержка, хобби. Хронический стресс ведет к воспалению, гормональным сбоям и снижению иммунитета.",benefits:["Снижение уровня кортизола","Улучшение гормонального фона","Снижение воспаления","Улучшение качества жизни"],implementation:{frequency:"Ежедневно",duration:"Разное",effort_level:"Средний"},affects:["stress","cortisol"],color:"#9c27b0",regularity:"D",delivery_type:"chatbot",report_effort:"medium",sources:"-",biomarkers:["stress","cortisol"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},MN_DTOX:{code:"MN_DTOX",name:"Цифровой детокс",category:"mental",impact:7.5,evidence:"B",type:"behavior",short_description:"Отказ от экранов перед сном",full_description:"Ограничение использования гаджетов за 1-2 часа до сна. Синий свет экранов (особенно в спектре 450-495 нм) подавляет выработку мелатонина, гормона сна. Цифровой детокс улучшает качество сна и снижает нагрузку на мозг.",benefits:["Улучшение выработки мелатонина","Снижение нагрузки на глаза","Улучшение качества сна","Снижение ментальной усталости"],implementation:{frequency:"Ежедневно",duration:"1-2 часа до сна",effort_level:"Средний"},affects:["sleep","eye_strain"],color:"#9c27b0",regularity:"D",delivery_type:"chatbot",report_effort:"medium",sources:"-",biomarkers:["sleep","eye_strain"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},FD_WATER:{code:"FD_WATER",name:"Водный режим",category:"food",impact:8,evidence:"A",type:"behavior",short_description:"Оптимальный водный баланс",full_description:"Обеспечение адекватного потребления воды: 2.5-3.5 литра в день для мужчин, 2-3 литра для женщин. Водный баланс критичен для терморегуляции, транспорта питательных веществ, работы суставов и выведения токсинов.",benefits:["Улучшение работы почек","Оптимизация метаболизма","Улучшение состояния кожи","Поддержка когнитивных функций"],implementation:{frequency:"Ежедневно",duration:"В течение дня",effort_level:"Низкий"},affects:["hydration","kidney_function"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"light",sources:"-",biomarkers:["hydration","kidney_function"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"09:00"}},FD_ELEC:{code:"FD_ELEC",name:"Баланс электролитов",category:"food",impact:7,evidence:"B",type:"behavior",short_description:"Поддержание баланса электролитов",full_description:"Поддержание оптимального уровня электролитов: натрий, калий, магний, кальций. Особенно важно при интенсивных тренировках, в жаркую погоду и при ограничении калорий. Дисбаланс может вызвать судороги, аритмию, слабость.",benefits:["Предотвращение судорог","Нормальная работа сердца","Поддержка мышечных сокращений","Баланс жидкости в клетках"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Низкий"},affects:["electrolytes","muscle_function"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"light",sources:"-",biomarkers:["electrolytes","muscle_function"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"12:00"}},FD_CAL:{code:"FD_CAL",name:"Ограничение калорий",category:"food",impact:8.5,evidence:"A",type:"behavior",short_description:"Умеренное ограничение калорий",full_description:"Умеренное ограничение калорий (на 10-20% ниже нормы) для долголетия и снижения веса. Калорическая рестрикция увеличивает продолжительность жизни у млекопитающих и снижает риск метаболических заболеваний у людей.",benefits:["Снижение веса","Улучшение чувствительности к инсулину","Снижение воспаления","Увеличение продолжительности жизни"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Средний"},affects:["glucose","cholesterol","weight"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"medium",sources:"-",biomarkers:["glucose","cholesterol","weight"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},FD_CRB:{code:"FD_CRB",name:"Контроль углеводов",category:"food",impact:8,evidence:"A",type:"behavior",short_description:"Контроль потребления углеводов",full_description:"Ограничение простых углеводов (сахар, белая мука) и предпочтение сложных углеводов с низким гликемическим индексом. Помогает стабилизировать уровень глюкозы в крови и предотвратить инсулиновые пики.",benefits:["Стабилизация глюкозы","Снижение инсулинорезистентности","Контроль аппетита","Снижение риска диабета 2 типа"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Средний"},affects:["glucose","insulin"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"medium",sources:"-",biomarkers:["glucose","insulin"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},FD_SUG:{code:"FD_SUG",name:"Снижение сахара",category:"food",impact:7.5,evidence:"A",type:"behavior",short_description:"Снижение потребления сахара",full_description:"Ограничение добавленного сахара до менее 25г в день. Избыток сахара связан с ожирением, диабетом 2 типа, сердечно-сосудистыми заболеваниями и неалкогольной жировой болезнью печени.",benefits:["Снижение риска диабета","Улучшение здоровья зубов","Снижение воспаления","Контроль веса"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Средний"},affects:["glucose","liver"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"medium",sources:"-",biomarkers:["glucose","liver"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"12:00"}},FD_IF:{code:"FD_IF",name:"Ограничение по времени",category:"food",impact:8,evidence:"B",type:"behavior",short_description:"Питание в ограниченное время (16:8)",full_description:"Прерывистое голодание (интервальное) - окно питания 8 часов, голодание 16 часов (16:8) или другие варианты (18:6, 20:4). Помогает улучшить метаболическое здоровье, снизить инсулинорезистентность и ускорить аутофагию.",benefits:["Улучшение чувствительности к инсулину","Активация аутофагии","Снижение воспаления","Снижение веса"],implementation:{frequency:"Ежедневно",duration:"16:8 или 18:6",effort_level:"Высокий"},affects:["glucose","insulin","autophagy"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"detailed",sources:"-",biomarkers:["glucose","insulin","autophagy"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"10:00"}},FD_EAT:{code:"FD_EAT",name:"Ранние приемы пищи",category:"food",impact:7.5,evidence:"B",type:"behavior",short_description:"Ранние приемы пищи для циркадного питания",full_description:"Прием пищи в ранние часы дня (до 18:00-19:00) для синхронизации с циркадными ритмами. Поздние приемы пищи нарушают метаболизм глюкозы и липидов, ухудшают качество сна.",benefits:["Улучшение метаболизма глюкозы","Синхронизация с биоритмами","Лучшее качество сна","Снижение риска метаболических нарушений"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Средний"},affects:["glucose","circadian_rhythm"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"medium",sources:"-",biomarkers:["glucose","circadian_rhythm"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},FD_FIB:{code:"FD_FIB",name:"Богатая клетчаткой диета",category:"food",impact:7,evidence:"A",type:"behavior",short_description:"Диета с высоким содержанием клетчатки",full_description:"Потребление 25-35г клетчатки в день из цельных злаков, овощей, фруктов, бобовых. Клетчатка улучшает здоровье кишечника, снижает холестерин, замедляет усвоение глюкозы и способствует сытости.",benefits:["Здоровье микробиома","Снижение холестерина","Улучшение пищеварения","Контроль веса"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Низкий"},affects:["cholesterol","glucose","gut_health"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"light",sources:"-",biomarkers:["cholesterol","glucose","gut_health"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},FD_CAF:{code:"FD_CAF",name:"Снижение кофеина",category:"food",impact:6.5,evidence:"B",type:"behavior",short_description:"Снижение потребления кофеина",full_description:"Ограничение кофеина (кофе, энергетики) до 400мг в день (2-3 чашки кофе). Избыток кофеина может вызвать тревожность, нарушения сна, тахикардию. Отказ от кофеина за 6-8 часов до сна.",benefits:["Улучшение качества сна","Снижение тревожности","Нормализация ЧСС","Снижение зависимости"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Средний"},affects:["sleep","anxiety","resting_hr"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"medium",sources:"-",biomarkers:["sleep","anxiety","resting_hr"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"10:00"}},SP_D3:{code:"SP_D3",name:"Витамин D3",category:"supplement",impact:8,evidence:"A",type:"supplement",short_description:"Прием витамина D3",full_description:"Прием витамина D3 (холекальциферол) для поддержки здоровья костей, иммунной системы и настроения. Рекомендуемая доза 1000-4000 МЕ/день, при дефиците - до 5000-10000 МЕ под контролем врача.",benefits:["Здоровье костей","Поддержка иммунитета","Улучшение настроения","Снижение воспаления"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Низкий"},affects:["vitamin_d","bone_health","immunity"],color:"#795548",regularity:"D",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["vitamin_d","bone_health","immunity"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"09:00"}},SP_O3:{code:"SP_O3",name:"Омега-3",category:"supplement",impact:8.5,evidence:"A",type:"supplement",short_description:"Прием Омега-3 жирных кислот",full_description:"Прием Омега-3 (ЭПК и ДГК) из рыбьего жира или водорослей. Доза 1-2г ЭПК+ДГК в день. Омега-3 критичны для здоровья сердца, мозга, снижения воспаления и здоровья глаз.",benefits:["Здоровье сердца","Когнитивные функции","Снижение воспаления","Здоровье глаз"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Низкий"},affects:["cholesterol","triglycerides","inflammation"],color:"#795548",regularity:"D",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["cholesterol","triglycerides","inflammation"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"09:00"}},SP_MG:{code:"SP_MG",name:"Магний",category:"supplement",impact:7.5,evidence:"A",type:"supplement",short_description:"Прием магния",full_description:"Прием магния (глицинат, цитрат, малат) в дозе 300-500мг элементарного магния в день. Магний важен для мышечного расслабления, сна, энергетического метаболизма и нервной системы.",benefits:["Улучшение сна","Расслабление мышц","Снижение стресса","Поддержка энергии"],implementation:{frequency:"Ежедневно (лучше вечером)",duration:"Длительно",effort_level:"Низкий"},affects:["stress","sleep","muscle_tension"],color:"#795548",regularity:"D",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["stress","sleep","muscle_tension"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"21:00"}},SP_BC:{code:"SP_BC",name:"В-комплекс",category:"supplement",impact:7,evidence:"B",type:"supplement",short_description:"Комплекс витаминов группы B",full_description:"Прием комплекса витаминов B (B1, B2, B3, B5, B6, B7, B9, B12) для поддержки энергетического метаболизма, нервной системы и образования крови. Особенно важно при вегетарианстве и высоких нагрузках.",benefits:["Энергетический метаболизм","Здоровье нервной системы","Образование крови","Здоровье кожи и волос"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Низкий"},affects:["energy","nervous_system","blood_formation"],color:"#795548",regularity:"D",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["energy","nervous_system","blood_formation"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"09:00"}},SP_ADP:{code:"SP_ADP",name:"Адаптогены",category:"supplement",impact:7.5,evidence:"B",type:"supplement",short_description:"Прием адаптогенов",full_description:"Прием адаптогенов (ашваганда, родиола розовая, элеутерококк, лимонник) для повышения устойчивости к стрессу. Адаптогены помогают организму адаптироваться к физическим и ментальным нагрузкам, снижают кортизол.",benefits:["Снижение кортизола","Повышение стрессоустойчивости","Улучшение энергии","Поддержка когнитивных функций"],implementation:{frequency:"Ежедневно (курсами)",duration:"1-3 месяца",effort_level:"Низкий"},affects:["stress","cortisol","energy"],color:"#795548",regularity:"D",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["stress","cortisol","energy"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"09:00"}},FD_ANTI:{code:"FD_ANTI",name:"Противовоспалительная диета",category:"food",impact:8,evidence:"A",type:"behavior",short_description:"Диета для снижения воспаления",full_description:"Диета с высоким содержанием антиоксидантов, Омега-3, специй (куркумин, гингерол) и низким содержанием провоспалительных продуктов (сахар, трансжиры, избыток омега-6). Полезна при хронических воспалительных состояниях.",benefits:["Снижение системного воспаления","Улучшение маркеров воспаления (СРБ)","Снижение риска хронических заболеваний","Улучшение здоровья суставов"],implementation:{frequency:"Ежедневно",duration:"Длительно",effort_level:"Средний"},affects:["inflammation","crp","joint_health"],color:"#ff9800",regularity:"D",delivery_type:"web_report",report_effort:"medium",sources:"-",biomarkers:["inflammation","crp","joint_health"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},SP_NTRP:{code:"SP_NTRP",name:"Ноотропы",category:"supplement",impact:7,evidence:"B",type:"supplement",short_description:"Прием ноотропов для когнитивных функций",full_description:"Прием ноотропов (L-теанин, бакопа монье, гинкго билоба, креатин) для улучшения памяти, концентрации и когнитивной выносливости. Эффективность варьируется, требуется консультация врача.",benefits:["Улучшение памяти","Повышение концентрации","Когнитивная выносливость","Нейропротекция"],implementation:{frequency:"Курсами (по назначению)",duration:"1-3 месяца",effort_level:"Низкий"},affects:["cognition","memory","focus"],color:"#795548",regularity:"P",delivery_type:"chatbot",report_effort:"light",sources:"-",biomarkers:["cognition","memory","focus"],probability:.75},DG_CHK:{code:"DG_CHK",name:"Регулярный чекап",category:"medical",impact:9,evidence:"A",type:"diagnostic",short_description:"Ежегодные медицинские осмотры",full_description:"Ежегодные медицинские обследования: ОАК, биохимия (глюкоза, холестерин, печеночные пробы), гормоны (ТТГ, Т3, Т4, витамин D), ЭКГ, флюорография. Раннее выявление отклонений спасает жизнь.",benefits:["Раннее выявление заболеваний","Профилактика осложнений","Мониторинг динамики здоровья","Коррекция терапии"],implementation:{frequency:"1 раз в год",duration:"1 день",effort_level:"Низкий"},affects:["vitamin_d","ferritin","tsh","early_detection"],color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"light",sources:"-",biomarkers:["vitamin_d","ferritin","tsh","early_detection"],probability:.9},DG_CARD:{code:"DG_CARD",name:"Направление к кардиологу",category:"medical",impact:9,evidence:"A",type:"diagnostic",short_description:"При подозрении на сердечно-сосудистые риски",full_description:"Направление к кардиологу при наличии красных флагов: АД >140/90, холестерин >240 мг/дл, глюкоза >126 мг/дл, семейный анамнез ранних сердечно-сосудистых заболеваний. Кардиолог может назначить ЭхоКГ, Холтер, стресс-тест.",benefits:["Профессиональная диагностика","Предотвращение инфарктов/инсультов","Назначение таргетной терапии","Снижение сердечно-сосудистого риска"],implementation:{frequency:"По показаниям",duration:"1 визит + обследования",effort_level:"Средний"},affects:["cardiac_health","blood_pressure","cholesterol"],color:"#f44336",regularity:"P",delivery_type:"web_report",report_effort:"medium",sources:"-",biomarkers:["cardiac_health","blood_pressure","cholesterol"],probability:.9},PH_HRV:{code:"PH_HRV",name:"Мониторинг ЧСС",category:"physical",impact:8.5,evidence:"B",type:"device",short_description:"Отслеживание вариабельности сердечного ритма",full_description:"Использование устройств (Apple Watch, Oura Ring, Garmin) для мониторинга ЧСС (частоты сердечных сокращений) и HRV (вариабельности сердечного ритма). HRV - маркер восстановления и адаптации организма, снижение HRV указывает на перетренированность.",benefits:["Мониторинг восстановления","Оптимизация тренировок","Выявление перетренированности","Предотвращение выгорания"],implementation:{frequency:"Ежедневно (ночной мониторинг)",duration:"Длительно",effort_level:"Низкий"},affects:["hrv","resting_hr","recovery"],color:"#4caf50",regularity:"D",delivery_type:"voice_report",report_effort:"light",sources:"-",biomarkers:["hrv","resting_hr","recovery"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},M_END01:{code:"M_END01",name:"Консультация эндокринолога",category:"medical",impact:9,evidence:"A",type:"diagnostic",short_description:"Направление к эндокринологу",full_description:"Консультация эндокринолога при выявлении отклонений гормонального профиля (ТТГ, T3, T4, инсулин, кортизол, половые гормоны). Включает сбор анамнеза, физикальное обследование, интерпретацию лабораторных данных.",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"medium",sources:"Клинические рекомендации МЗ РФ",biomarkers:["tsh","glucose","testosterone","cortisol"],probability:.85},M_END02:{code:"M_END02",name:"Интенсификация сахароснижающей терапии",category:"medical",impact:9.5,evidence:"A",type:"medication",short_description:"Коррекция сахароснижающей терапии",full_description:"Коррекция сахароснижающей терапии при неэффективности монотерапии метформином: добавление GLP-1 агонистов, SGLT2-ингибиторов, ДПП-4 или инсулина. Требует контроля гликемии и HbA1c.",color:"#f44336",regularity:"D",delivery_type:"chatbot",report_effort:"heavy",sources:"ADA Standards of Care 2025",biomarkers:["glucose","hba1c"],probability:.75,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},M_END03:{code:"M_END03",name:"Заместительная терапия (щитовидная железа)",category:"medical",impact:9,evidence:"A",type:"medication",short_description:"Терапия L-тироксином",full_description:"Назначение L-тироксина (левотироксин) при гипотиреозе с титрацией дозы под контролем ТТГ каждые 6-8 недель до достижения целевого уровня ТТГ 0.5-2.5 мМЕ/л.",color:"#f44336",regularity:"D",delivery_type:"chatbot",report_effort:"medium",sources:"ATA Guidelines",biomarkers:["tsh","t3","t4"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},M_CAR01:{code:"M_CAR01",name:"Назначение гипотензивной терапии",category:"medical",impact:9.5,evidence:"A",type:"medication",short_description:"Старт антигипертензивной терапии",full_description:"Старт антигипертензивной терапии (иАПФ/сартаны, тиазидные диуретики, антагонисты Ca) при стойком АД >140/90 мм рт.ст. Целевое АД <130/80 для большинства пациентов.",color:"#f44336",regularity:"D",delivery_type:"chatbot",report_effort:"medium",sources:"ESC/ESH Guidelines 2024",biomarkers:["systolic_bp","diastolic_bp"],probability:.9,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},M_CAR02:{code:"M_CAR02",name:"Назначение статинов",category:"medical",impact:9,evidence:"A",type:"medication",short_description:"Старт терапии статинами",full_description:"Назначение статинов (аторвастатин/розувастатин) при ЛПНП >3.0 ммоль/л и/или высоком риске ССЗ (SCORE >5%). Целевой ЛПНП <1.8 ммоль/л (высокий риск) или <2.6 ммоль/л (умеренный).",color:"#f44336",regularity:"D",delivery_type:"chatbot",report_effort:"medium",sources:"ESC/EAS Guidelines 2024",biomarkers:["ldl","total_cholesterol","triglycerides"],probability:.85,schedule:{days:[0,1,2,3,4,5,6],time:"08:00"}},M_CAR03:{code:"M_CAR03",name:"Холтер ЭКГ",category:"medical",impact:7.5,evidence:"B",type:"diagnostic",short_description:"Суточное мониторирование ЭКГ",full_description:"Суточное (или 48-часовое) мониторирование ЭКГ по Холтеру при тахикардии, аритмии, синкопальных состояниях, подозрении на ишемию миокарда.",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"light",sources:"РКО рекомендации",biomarkers:["resting_hr","hrv"],probability:.8},M_GAS01:{code:"M_GAS01",name:"Консультация гастроэнтеролога",category:"medical",impact:8.5,evidence:"A",type:"diagnostic",short_description:"Направление к гастроэнтерологу",full_description:"Консультация гастроэнтеролога при хронических жалобах (боли, вздутие, нарушение стула), изменении печёночных проб, подозрении на ВЗК или H. pylori.",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"medium",sources:"Клинические рекомендации",biomarkers:["alt","ast","crp","ggt"],probability:.8},M_GAS02:{code:"M_GAS02",name:"ЭГДС (гастроскопия)",category:"medical",impact:8,evidence:"A",type:"diagnostic",short_description:"Эндоскопия верхних отделов ЖКТ",full_description:"Эзофагогастродуоденоскопия при диспепсии, ГЭРБ, анемии, подозрении на язвенную болезнь или H. pylori. С биопсией при необходимости.",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"medium",sources:"Клинические рекомендации",biomarkers:["hemoglobin","ferritin"],probability:.8},M_GAS03:{code:"M_GAS03",name:"Колоноскопия",category:"medical",impact:9,evidence:"A",type:"diagnostic",short_description:"Скрининг колоректального рака",full_description:"Скрининговая колоноскопия с 45 лет (или раньше при семейном анамнезе). Диагностика воспалительных заболеваний кишечника, полипов, колоректального рака. Периодичность 5-10 лет.",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"heavy",sources:"ACG Guidelines",biomarkers:["hemoglobin","ferritin","early_detection"],probability:.85},M_NEU01:{code:"M_NEU01",name:"Консультация невролога",category:"medical",impact:9,evidence:"A",type:"diagnostic",short_description:"Направление к неврологу",full_description:"Консультация невролога при хронических головных болях, когнитивных нарушениях, парестезиях, нарушении сна неясной этиологии, головокружении.",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"medium",sources:"Клинические рекомендации",biomarkers:["sleep","stress"],probability:.8},M_NEU02:{code:"M_NEU02",name:"МРТ головного мозга",category:"medical",impact:8.5,evidence:"B",type:"diagnostic",short_description:"МРТ при неврологической симптоматике",full_description:"МРТ головного мозга при подозрении на объёмное образование, демиелинизацию, сосудистую патологию (после консультации невролога).",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"medium",sources:"Клинические рекомендации",biomarkers:["early_detection"],probability:.7},M_LAB01:{code:"M_LAB01",name:"Расширенная биохимия крови",category:"medical",impact:8.5,evidence:"A",type:"diagnostic",short_description:"Расширенный биохимический анализ",full_description:"Расширенная биохимия: глюкоза, HbA1c, липидный профиль (ОХ, ЛПНП, ЛПВП, ТГ), печёночные пробы (АЛТ, АСТ, ГГТП, ЩФ), креатинин, мочевая кислота, СРБ, ферритин, витамин D, B12.",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"light",sources:"Рекомендации МЗ РФ",biomarkers:["glucose","hba1c","ldl","crp","vitamin_d","ferritin","alt","ast"],probability:.95},M_LAB02:{code:"M_LAB02",name:"Гормональный профиль",category:"medical",impact:8,evidence:"B",type:"diagnostic",short_description:"Анализ гормонов",full_description:"Определение гормонального профиля: ТТГ, T3, T4, кортизол, инсулин, тестостерон (муж), прогестерон/эстрадиол (жен) при подозрении на эндокринные нарушения.",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"light",sources:"Клинические рекомендации",biomarkers:["tsh","cortisol","testosterone","glucose"],probability:.85},M_LAB03:{code:"M_LAB03",name:"Омега-3 индекс",category:"medical",impact:6.5,evidence:"B",type:"diagnostic",short_description:"Анализ омега-3 в эритроцитах",full_description:"Определение омега-3 индекса (сумма EPA+DHA в мембранах эритроцитов). Целевой уровень >8% (оптимально), >4% (минимально для кардиопротекции).",color:"#f44336",regularity:"Y",delivery_type:"web_report",report_effort:"light",sources:"Harris WS, 2018",biomarkers:["omega_3_index"],probability:.75}},ov={metadata:_j,categories:bj,interventions:jj},Nj={"1.1":{name:"Гликемический контроль",category:"nutritional",interventions:["04_1","04_2","04_3","04_6","02_3","03_5"]},"1.2":{name:"Циркадное питание",category:"nutritional",interventions:["04_4","04_5","01_1","03_5"]},"1.3":{name:"Гигиена сна",category:"nutritional",interventions:["01_1","01_2","01_3","03_1","03_7"]},"1.4":{name:"Гидратация",category:"nutritional",interventions:["03_9","03_10","04_7"]},"1.5":{name:"Базовые добавки",category:"nutritional",interventions:["05_1","05_2","05_3","05_4","07_1"]},"2.1":{name:"Метаболические риски",category:"medical",interventions:["02_1","02_2","04_1","07_2"]},"2.2":{name:"Гормональные нарушения",category:"medical",interventions:["05_5","03_1","03_6"]},"2.3":{name:"Воспалительные состояния",category:"medical",interventions:["05_6","02_4","03_2"]},"3.1":{name:"Сердечно-сосудистое здоровье",category:"wellness",interventions:["02_1","02_6","01_1","04_1","05_2"]},"3.2":{name:"Когнитивное здоровье",category:"wellness",interventions:["03_1","05_7","02_3","01_2"]},"3.3":{name:"Долголетие",category:"wellness",interventions:["04_1","04_4","02_1","05_2","05_3","07_1","08_1"]}},fo={"01. котлеты с макаронами и салат.jpg":{title:"Котлеты с макаронами и салат",meal_type:"обед",date:"2026-05-10",dish_name:"Котлеты с макаронами и овощной салат",ingredients:["котлеты мясные (говядина/свинина)","макароны из пшеницы","помидоры","огурцы","листья салата","растительное масло","лук"],nutrition:{calories:620,protein:32,carbs:58,fat:26,fiber:4,ndi:6.5},harvard_radar:{protein:65,vegetables:35,carbs:55,fats:40,fiber:30,nutri_index:55,cooking:75},harvard_assessment:"Сбалансированный обед, но маловато овощей",assessment_text:"✅ Хороший обед. Белковая часть и гарнир сбалансированы, но овощей могло бы быть больше для идеальной гарвардской тарелки.",recommendations:["Увеличить порцию овощей до 50% тарелки","Заменить макароны на цельнозерновые","Использовать котлеты из индейки для снижения жирности"],analysis:`📊 Анализ блюда "Котлеты с макаронами и овощной салат"

🔥 620 ккал | 💪 Белки: 32г | 🍞 Углеводы: 58г | 🧈 Жиры: 26г

⚖️ Баланс БЖУ
• Белок — высокий ✅ Отличное содержание для обеда
• Жиры — умеренные ✅ Котлеты дают насыщение
• Углеводы — выше среднего ⚠️ За счёт макарон

🧪 Микронутриенты
• Ликопин из помидоров ✅ Антиоксидантная защита
• Калий из огурцов ✅ Поддержка сердечно-сосудистой системы
• Витамин K из листьев салата ✅
• Клетчатка — ниже нормы ⚠️ Мало овощей

📉 Гликемическая нагрузка
Средняя — макароны из мягких сортов пшеницы дают умеренный подъём глюкозы. Рекомендуется замена на цельнозерновые.

⚙️ Метаболическая нагрузка
Средняя | ⚠️ Сочетание животных жиров и простых углеводов требует работы поджелудочной железы и желчного пузыря.

❤️ Влияние на организм
• Сердце: ⚠️ насыщенные жиры из котлет повышают нагрузку
• Пищеварение: 🟡 переваривается 3-4 часа из-за сочетания мяса и макарон
• Энергия: ✅ устойчивая, без резких скачков сахара

⏰ Рекомендации
✅ Идеален для обеда. Не рекомендуется на ужин из-за углеводов.

🔧 Как улучшить
1. Заменить макароны на гречку или булгур
2. Добавить больше свежих овощей (до 200г)
3. Приготовить котлеты на пару вместо жарки

💡 Health Score: 6.5/10 — Сытный сбалансированный обед, требующий небольшой корректировки состава.

💡 Интересный факт
Котлеты в современном виде появились в России в XIX веке благодаря французским поварам. Изначально это были рёбрышки на кости (côtelette), но со временем рецепт адаптировался под местные традиции.`,keywords:["мясное","обед","горячее","сытное"]},"02. обед с фруктами и мантами.jpg":{title:"Обед с фруктами и мантами",meal_type:"обед",date:"2026-05-10",dish_name:"Манты с фруктами и овощами",ingredients:["манты с мясом и луком","яблоко","виноград","помидоры","огурцы","зелень"],nutrition:{calories:580,protein:28,carbs:65,fat:20,fiber:7,ndi:7},harvard_radar:{protein:60,vegetables:45,carbs:60,fats:35,fiber:50,nutri_index:60,cooking:70},harvard_assessment:"Разнообразный обед с хорошим набором нутриентов",assessment_text:"✅ Разнообразное блюдо. Фрукты добавляют витамины, манты дают белок, но много углеводов из теста.",recommendations:["Уменьшить количество мантов до 3-4 штук","Добавить больше овощей вместо фруктов для снижения сахара","Выбрать манты из цельзернового теста"],analysis:`📊 Анализ блюда "Манты с фруктами и овощами"

🔥 580 ккал | 💪 Белки: 28г | 🍞 Углеводы: 65г | 🧈 Жиры: 20г

⚖️ Баланс БЖУ
• Белок — хороший ✅ Мясная начинка мантов
• Жиры — умеренные ✅ Без избытка
• Углеводы — высокие ⚠️ За счёт теста и фруктов

🧪 Микронутриенты
• Витамин C из фруктов ✅ Поддержка иммунитета
• Калий из помидоров и винограда ✅
• Пищевые волокна из фруктов и овощей ✅
• Железо из мяса ✅

📉 Гликемическая нагрузка
Высокая — сочетание пшеничного теста и сладких фруктов (виноград) даёт значительный гликемический отклик.

⚙️ Метаболическая нагрузка
Средняя | ✅ Разнообразие продуктов обеспечивает поступление разных нутриентов, но переваривание теста с мясом требует времени.

❤️ Влияние на организм
• Сердце: ✅ нейтральное
• Пищеварение: 🟡 тяжёлое из-за сочетания теста и мяса
• Энергия: ⚠️ возможен скачок сахара после винограда

⏰ Рекомендации
✅ Только для обеда. На ужин слишком калорийно.

🔧 Как улучшить
1. Заменить виноград на ягоды с низким ГИ
2. Добавить белковую закуску для выравнивания ГИ
3. Подавать с кисломолочным соусом для пищеварения

💡 Health Score: 7/10 — Сытный и разнообразный обед, но требует контроля углеводов.

💡 Интересный факт
Манты — традиционное блюдо народов Центральной Азии, которое готовят на пару в специальной каскадной кастрюле — мантоварке. В отличие от пельменей, тесто для мантов замешивают на яйцах и раскатывают тоньше.`,keywords:["мясное","обед","азиатская","паровое"]},"03. сосиски с оливье.jpg":{title:"Сосиски с оливье",meal_type:"обед",date:"2026-05-10",dish_name:"Сосиски с салатом Оливье",ingredients:["сосиски молочные","картофель","морковь","горошек консервированный","яйца","майонез","солёные огурцы"],nutrition:{calories:520,protein:18,carbs:42,fat:30,fiber:3,ndi:4.5},harvard_radar:{protein:35,vegetables:20,carbs:45,fats:55,fiber:15,nutri_index:35,cooking:90},harvard_assessment:"Тяжёлое блюдо с избытком жиров и дефицитом овощей",assessment_text:"⚠️ Классическое советское блюдо, но не соответствующее принципам здорового питания. Много майонеза, переработанного мяса и крахмала.",recommendations:["Заменить майонез на сметану 10% или греческий йогурт","Выбрать сосиски из мяса птицы вместо молочных","Добавить свежие овощи к основному блюду","Использовать домашний оливье без сосисок"],analysis:`📊 Анализ блюда "Сосиски с салатом Оливье"

🔥 520 ккал | 💪 Белки: 18г | 🍞 Углеводы: 42г | 🧈 Жиры: 30г

⚖️ Баланс БЖУ
• Белок — низкий ⚠️ Недостаточно для полноценного приёма пищи
• Жиры — высокие ⚠️ Майонез + сосиски = избыток насыщенных жиров
• Углеводы — умеренные ✅

🧪 Микронутриенты
• Натрий — избыток ⚠️ Сосиски + солёные огурцы
• Клетчатка — минимальная ⚠️ Почти отсутствуют овощи
• Витамины группы B — есть из яиц и горошка ✅
• Консерванты — из сосисок и майонеза ⚠️

📉 Гликемическая нагрузка
Средняя — картофель даёт крахмал, но жиры замедляют всасывание углеводов.

⚙️ Метаболическая нагрузка
Высокая | ⚠️ Сочетание переработанного мяса, майонеза и варёных овощей создаёт нагрузку на печень и поджелудочную.

❤️ Влияние на организм
• Сердце: ⚠️ Избыток насыщенных жиров и соли
• Пищеварение: 🟡 тяжёлое, долго переваривается
• Энергия: 🟡 вялость после еды из-за жирности

⏰ Рекомендации
❌ Не рекомендуется для регулярного употребления. Допустимо не чаще 1 раза в месяц.

🔧 Как улучшить
1. Полностью заменить майонез на йогуртовую заправку
2. Заменить сосиски на отварную курицу
3. Добавить свежий огурец и зелень
4. Уменьшить количество картофеля

💡 Health Score: 4.5/10 — Ностальгическое блюдо, не соответствующие современным принципам здорового питания.

💡 Интересный факт
Салат Оливье был изобретён в 1860-х годах французским поваром Люсьеном Оливье в московском ресторане «Эрмитаж». Изначально в рецепт входили рябчики, раковые шейки и трюфели — ничего общего с современными сосисками!`,keywords:["мясное","обед","быстрое","салат"]},"_04. яишница с овощами.jpg":{title:"Яичница с овощами",meal_type:"завтрак",date:"2026-05-10",dish_name:"Яичница с овощами",ingredients:["яйца куриные (2 шт)","помидоры","болгарский перец","лук","зелень","растительное масло"],nutrition:{calories:280,protein:20,carbs:8,fat:18,fiber:3,ndi:8},harvard_radar:{protein:80,vegetables:55,carbs:20,fats:45,fiber:35,nutri_index:75,cooking:85},harvard_assessment:"Отличный низкоуглеводный завтрак",assessment_text:"✅ Прекрасный выбор для завтрака! Высокое содержание белка и овощей делает это блюдо близким к идеалу Гарвардской тарелки.",recommendations:["Добавить авокадо для полезных жиров","Подавать с цельнозерновым тостом","Использовать масло оливковое extra virgin"],analysis:`📊 Анализ блюда "Яичница с овощами"

🔥 280 ккал | 💪 Белки: 20г | 🍞 Углеводы: 8г | 🧈 Жиры: 18г

⚖️ Баланс БЖУ
• Белок — высокий ✅ Отлично для завтрака
• Жиры — в норме ✅ Полезные жиры из яиц и масла
• Углеводы — низкие ✅ Идеально для низкоуглеводного питания

🧪 Микронутриенты
• Витамин A из яиц ✅ Здоровье глаз и кожи
• Витамин C из перца и помидоров ✅
• Холин из яиц ✅ Поддержка мозга
• Селен ✅ Антиоксидантная защита
• Калий из овощей ✅

📉 Гликемическая нагрузка
Очень низкая — овощи имеют минимальный гликемический индекс, яйца не содержат углеводов.

⚙️ Метаболическая нагрузка
Низкая | ✅ Лёгкое переваривание, быстрый запуск метаболизма после сна.

❤️ Влияние на организм
• Сердце: ✅ Современные исследования подтверждают безопасность яиц
• Пищеварение: ✅ Лёгкое, быстрое
• Энергия: ✅ Заряд бодрости на несколько часов

⏰ Рекомендации
✅ Идеален для завтрака. Подходит для кето-диеты.

🔧 Как улучшить
1. Добавить шпинат для дополнительного железа
2. Приправить куркумой для противовоспалительного эффекта
3. Подавать с ферментированными овощами

💡 Health Score: 8/10 — Отличный низкоуглеводный завтрак, богатый белком и витаминами.

💡 Интересный факт
Яйца — один из немногих продуктов, содержащих витамин D в естественном виде. Одно яйцо покрывает около 10% суточной потребности в этом витамине, который необходим для усвоения кальция и иммунитета.`,keywords:["завтрак","вегетарианское","быстрое","низкоуглеводное"]},"05. гречка с котлетой.jpg":{title:"Гречка с котлетой",meal_type:"обед",date:"2026-05-10",dish_name:"Гречка с котлетой",ingredients:["гречневая крупа","котлета мясная (говядина)","лук","морковь","растительное масло","зелень"],nutrition:{calories:490,protein:30,carbs:48,fat:16,fiber:6,ndi:8.2},harvard_radar:{protein:75,vegetables:25,carbs:55,fats:30,fiber:55,nutri_index:70,cooking:80},harvard_assessment:"Хороший сбалансированный обед с качественными углеводами",assessment_text:"✅ Отличная комбинация! Гречка — лучший гарнир, котлета даёт белок. Не хватает только свежих овощей для полной гарвардской тарелки.",recommendations:["Добавить порцию свежих овощей (салат, помидоры)","Приготовить котлету на пару или запечь","Добавить квашеную капусту для пробиотиков"],analysis:`📊 Анализ блюда "Гречка с котлетой"

🔥 490 ккал | 💪 Белки: 30г | 🍞 Углеводы: 48г | 🧈 Жиры: 16г

⚖️ Баланс БЖУ
• Белок — высокий ✅ Мясная котлета даёт полноценный аминокислотный профиль
• Жиры — умеренные ✅ Без избытка
• Углеводы — умеренные ✅ За счёт гречки

🧪 Микронутриенты
• Железо из гречки и говядины ✅ Профилактика анемии
• Магний из гречки ✅ Поддержка нервной системы
• Витамины группы B ✅ Энергетический обмен
• Фосфор ✅ Здоровье костей
• Клетчатка из гречки ✅ Хорошо для пищеварения

📉 Гликемическая нагрузка
Низкая — гречка имеет низкий ГИ (40-50), что обеспечивает медленное высвобождение энергии без скачков сахара.

⚙️ Метаболическая нагрузка
Низкая | ✅ Гречка легко усваивается, мясо даёт длительное насыщение. Отличное соотношение нутриентов.

❤️ Влияние на организм
• Сердце: ✅ Рутин в гречке укрепляет сосуды
• Пищеварение: ✅ Клетчатка гречки поддерживает микрофлору
• Энергия: ✅ Равномерная, на 4-5 часов

⏰ Рекомендации
✅ Идеален для обеда. Подходит для ужина в небольшой порции.

🔧 Как улучшить
1. Добавить грибы для дополнительного белка и вкуса
2. Сделать котлету из смеси говядины и индейки
3. Добавить тушёные овощи как подушку под котлету

💡 Health Score: 8.2/10 — Один из лучших вариантов обеда: сытно, полезно, сбалансированно.

💡 Интересный факт
Гречка — псевдозерновая культура, родственник ревеня, а не пшеницы. Она не содержит глютена, а по содержанию рутина (витамин P) превосходит все другие крупы. Рутин укрепляет стенки капилляров и снижает артериальное давление.`,keywords:["мясное","обед","русская","высокобелковое"]},"06. киноа с курице брокколи.jpg":{title:"Киноа с курицей и брокколи",meal_type:"обед",date:"2026-05-10",dish_name:"Киноа с курицей и брокколи",ingredients:["киноа","куриное филе","брокколи","оливковое масло","чеснок","специи"],nutrition:{calories:450,protein:38,carbs:38,fat:12,fiber:8,ndi:9},harvard_radar:{protein:90,vegetables:60,carbs:45,fats:25,fiber:70,nutri_index:85,cooking:85},harvard_assessment:"Эталонный обед по Гарвардской тарелке",assessment_text:"✅ Превосходно! Киноа — идеальный гарнир, куриная грудка — постный белок, брокколи — овощная половина тарелки.",recommendations:["Добавить лимонный сок для витамина C","Приправить куркумой и чёрным перцем","Можно добавить авокадо для полезных жиров"],analysis:`📊 Анализ блюда "Киноа с курицей и брокколи"

🔥 450 ккал | 💪 Белки: 38г | 🍞 Углеводы: 38г | 🧈 Жиры: 12г

⚖️ Баланс БЖУ
• Белок — высокий ✅ Куриная грудка — эталон постного белка
• Жиры — низкие ✅ Только полезные жиры из киноа и масла
• Углеводы — умеренные ✅ Сложные углеводы киноа

🧪 Микронутриенты
• Сульфорафан из брокколи ✅ Мощный антиоксидант
• Магний из киноа ✅ Расслабление мышц и нервов
• Витамин K из брокколи ✅
• Железо и цинк из киноа и курицы ✅
• Полный аминокислотный профиль из киноа ✅

📉 Гликемическая нагрузка
Низкая — киноа имеет ГИ около 53, брокколи практически не повышает сахар. Идеально для контроля глюкозы.

⚙️ Метаболическая нагрузка
Низкая | ✅ Лёгкое переваривание, высокое усвоение нутриентов. Оптимальный набор макро- и микронутриентов.

❤️ Влияние на организм
• Сердце: ✅ Омега-3 из киноа, клетчатка снижает холестерин
• Пищеварение: ✅ Клетчатка брокколи и киноа
• Энергия: ✅ Стабильный уровень сахара, энергия на 4-5 часов

⏰ Рекомендации
✅ Подходит для обеда и ужина. Идеально для спортсменов.

🔧 Как улучшить
1. Добавить тыквенные семечки для цинка
2. Полить лимонно-чесночной заправкой
3. Добавить вяленые томаты для вкуса

💡 Health Score: 9/10 — Одно из самых сбалансированных блюд в рационе.

💡 Интересный факт
Киноа называют «золотым зерном инков». Это единственный растительный продукт, содержащий все 9 незаменимых аминокислот, что делает его полноценным источником белка. НАСА рассматривало киноа для выращивания в космосе из-за её питательной ценности.`,keywords:["мясное","обед","диетическое","высокобелковое","пп"]},"07 овощи с йогуртом.jpg":{title:"Овощи с йогуртом",meal_type:"перекус",date:"2026-05-10",dish_name:"Овощи с йогуртом",ingredients:["йогурт натуральный","морковь","огурец","болгарский перец","чеснок","зелень","соль"],nutrition:{calories:180,protein:12,carbs:16,fat:6,fiber:5,ndi:8.5},harvard_radar:{protein:50,vegetables:80,carbs:30,fats:20,fiber:70,nutri_index:80,cooking:95},harvard_assessment:"Лёгкий и полезный перекус",assessment_text:"✅ Отличный перекус! Много овощей, пробиотики из йогурта, минимум калорий. Идеально для второй половины дня.",recommendations:["Использовать греческий йогурт для большего содержания белка","Добавить семена льна или чиа для омега-3","Подавать с цельнозерновыми хлебцами"],analysis:`📊 Анализ блюда "Овощи с йогуртом"

🔥 180 ккал | 💪 Белки: 12г | 🍞 Углеводы: 16г | 🧈 Жиры: 6г

⚖️ Баланс БЖУ
• Белок — хороший ✅ Йогурт даёт казеин и сыворотку
• Жиры — низкие ✅
• Углеводы — низкие ✅ В основном за счёт овощей

🧪 Микронутриенты
• Кальций из йогурта ✅ Здоровье костей
• Бета-каротин из моркови ✅ Антиоксидант
• Витамин C из перца ✅ Иммунитет
• Пробиотики из йогурта ✅ Микрофлора кишечника
• Калий ✅ Поддержка сердца

📉 Гликемическая нагрузка
Очень низкая — овощи с низким ГИ, йогурт стабилизирует сахар.

⚙️ Метаболическая нагрузка
Минимальная | ✅ Идеально для перекуса — лёгкое усвоение, поддержка метаболизма без перегрузки.

❤️ Влияние на организм
• Сердце: ✅ Калий и кальций для сосудов
• Пищеварение: ✅ Пробиотики и клетчатка — лучшее сочетание
• Энергия: ✅ Лёгкость, отсутствие тяжести

⏰ Рекомендации
✅ Идеален как второй завтрак или полдник.

🔧 Как улучшить
1. Добавить семена кунжута для кальция
2. Использовать йогурт с закваской из ацидофильных бактерий
3. Приправить зирой для аромата и пищеварения

💡 Health Score: 8.5/10 — Лёгкий, питательный перекус с пробиотиками.

💡 Интересный факт
Йогурт содержит в 2-3 раза меньше лактозы, чем молоко, благодаря ферментации. Это делает его доступным для многих людей с лактазной недостаточностью. Болгарская палочка (Lactobacillus bulgaricus) — одна из основных бактерий в йогурте — была открыта болгарским учёным Стаменом Григоровым в 1905 году.`,keywords:["перекус","вегетарианское","лёгкое","быстрое","пробиотики"]},"08. оливки гречка фасоль.jpg":{title:"Оливки, гречка, фасоль",meal_type:"обед",date:"2026-05-10",dish_name:"Оливки с гречкой и стручковой фасолью",ingredients:["гречневая крупа","стручковая фасоль","оливки зелёные","оливковое масло","чеснок","лимон","петрушка"],nutrition:{calories:360,protein:14,carbs:42,fat:14,fiber:9,ndi:8},harvard_radar:{protein:40,vegetables:50,carbs:50,fats:30,fiber:75,nutri_index:70,cooking:85},harvard_assessment:"Хорошее постное блюдо с высоким содержанием клетчатки",assessment_text:"✅ Прекрасный вариант для вегетарианского обеда. Много клетчатки, полезные жиры из оливок, однако маловато белка.",recommendations:["Добавить нут или тофу для увеличения белка","Подавать с кунжутом или семенами подсолнечника","Добавить болгарский перец для витамина C"],analysis:`📊 Анализ блюда "Оливки с гречкой и стручковой фасолью"

🔥 360 ккал | 💪 Белки: 14г | 🍞 Углеводы: 42г | 🧈 Жиры: 14г

⚖️ Баланс БЖУ
• Белок — умеренный ⚠️ Для обеда желательно больше
• Жиры — хорошие ✅ Мононенасыщенные из оливок
• Углеводы — умеренные ✅ Сложные из гречки

🧪 Микронутриенты
• Клетчатка — отличная ✅ Фасоль + гречка
• Железо из гречки ✅
• Витамин E из оливок ✅ Антиоксидант
• Фолиевая кислота из фасоли ✅ Поддержка кроветворения
• Натрий — из оливок ⚠️ Умеренно

📉 Гликемическая нагрузка
Низкая — гречка и фасоль имеют низкий ГИ, клетчатка замедляет всасывание.

⚙️ Метаболическая нагрузка
Низкая | ✅ Растительная пища легко переваривается. Хороший выбор для разгрузочного дня.

❤️ Влияние на организм
• Сердце: ✅ Оливки снижают «плохой» холестерин
• Пищеварение: ✅ Высокое содержание клетчатки
• Энергия: ✅ Равномерная, без скачков

⏰ Рекомендации
✅ Подходит для обеда. Можно на ужин — лёгкое блюдо.

🔧 Как улучшить
1. Добавить яйцо-пашот для белка
2. Посыпать тыквенными семечками
3. Заправить лимонно-горчичным соусом

💡 Health Score: 8/10 — Отличное растительное блюдо, богатое клетчаткой и полезными жирами.

💡 Интересный факт
Оливки — это фрукты, а не овощи. Они содержат гидрокситирозол — один из самых мощных природных антиоксидантов, который в 10 раз эффективнее зелёного чая защищает клетки от окислительного стресса.`,keywords:["обед","вегетарианское","постное","высококлетчаточное"]},"09. авокадо шпинат горошек.jpg":{title:"Авокадо, шпинат, горошек",meal_type:"обед",date:"2026-05-10",dish_name:"Авокадо со шпинатом и зелёным горошком",ingredients:["авокадо","шпинат свежий","горошек зелёный","оливковое масло","лимонный сок","кунжут","соль морская"],nutrition:{calories:340,protein:10,carbs:18,fat:26,fiber:12,ndi:8.8},harvard_radar:{protein:30,vegetables:75,carbs:25,fats:55,fiber:90,nutri_index:80,cooking:90},harvard_assessment:"Блюдо с отличной nutritional density",assessment_text:"✅ Очень полезное блюдо! Много зелени, полезные жиры авокадо, высокое содержание клетчатки. Рекомендуется добавить источник белка.",recommendations:["Добавить киноа или нут для полноценного белка","Подавать с яйцом пашот","Посыпать семенами чиа для омега-3"],analysis:`📊 Анализ блюда "Авокадо со шпинатом и зелёным горошком"

🔥 340 ккал | 💪 Белки: 10г | 🍞 Углеводы: 18г | 🧈 Жиры: 26г

⚖️ Баланс БЖУ
• Белок — низкий ⚠️ Необходимо дополнить
• Жиры — высокие ✅ Но исключительно полезные мононенасыщенные
• Углеводы — низкие ✅ В основном клетчатка

🧪 Микронутриенты
• Витамин K из шпината ✅ Очень высокое содержание
• Витамин E из авокадо ✅ Антиоксидант
• Фолиевая кислота из шпината ✅
• Калий из авокадо ✅ Выше, чем в бананах
• Магний из шпината ✅
• Лютеин для зрения ✅

📉 Гликемическая нагрузка
Очень низкая — практически не влияет на уровень сахара. Идеально для диабетиков.

⚙️ Метаболическая нагрузка
Минимальная | ✅ Организм легко усваивает все нутриенты. Высокая биодоступность жирорастворимых витаминов из-за авокадо.

❤️ Влияние на организм
• Сердце: ✅ Мощная поддержка сердечно-сосудистой системы
• Пищеварение: ✅ Рекордное содержание клетчатки (12г)
• Энергия: ✅ Плавная, без скачков
• Кожа: ✅ Витамин E и жиры улучшают состояние кожи

⏰ Рекомендации
✅ Идеален для обеда или лёгкого ужина.

🔧 Как улучшить
1. Добавить киноа для белка
2. Приправить имбирём для пищеварения
3. Добавить гранат для витамина C

💡 Health Score: 8.8/10 — Очень плотное по нутриентам блюдо, но требует дополнения белком.

💡 Интересный факт
Авокадо — это ягода, а не овощ. Оно содержит больше калия, чем банан (485 мг vs 358 мг на 100г). Также авокадо уникально тем, что его жиры улучшают усвоение жирорастворимых витаминов из других продуктов, съеденных за один приём.`,keywords:["обед","вегетарианское","низкоуглеводное","сыроедческое"]},"10. котлеты макароны лук томат.jpg":{title:"Котлеты, макароны, лук, томат",meal_type:"обед",date:"2026-05-10",dish_name:"Котлеты с макаронами и томатным соусом",ingredients:["котлеты мясные (говядина)","макароны","лук репчатый","томаты в собственном соку","чеснок","растительное масло","зелень"],nutrition:{calories:580,protein:30,carbs:54,fat:24,fiber:4,ndi:6},harvard_radar:{protein:65,vegetables:30,carbs:55,fats:40,fiber:25,nutri_index:50,cooking:80},harvard_assessment:"Традиционный обед, требующий увеличения овощной части",assessment_text:"⚠️ Сытно и вкусно, но не хватает овощей. Томатный соус не заменяет свежие овощи. Макароны лучше заменить на цельнозерновые.",recommendations:["Уменьшить порцию макарон, увеличить овощи","Добавить свежий салат из помидоров и огурцов","Использовать макароны из твёрдых сортов пшеницы","Котлеты запекать, а не жарить"],analysis:`📊 Анализ блюда "Котлеты с макаронами и томатным соусом"

🔥 580 ккал | 💪 Белки: 30г | 🍞 Углеводы: 54г | 🧈 Жиры: 24г

⚖️ Баланс БЖУ
• Белок — хороший ✅ Мясная котлета
• Жиры — умеренные ⚠️ Зависит от способа приготовления
• Углеводы — высокие ⚠️ Макароны — основной объём

🧪 Микронутриенты
• Ликопин из томатов ✅ Антиоксидант
• Витамины группы B из мяса ✅
• Клетчатка — недостаток ⚠️
• Кверцетин из лука ✅ Противовоспалительное
• Натрий — в норме ✅

📉 Гликемическая нагрузка
Высокая — макароны из мягкой пшеницы быстро повышают сахар. Томатный соус немного снижает ГИ за счёт кислоты.

⚙️ Метаболическая нагрузка
Средняя | ⚠️ Комбинация жареного мяса и макарон требует активной работы ЖКТ.

❤️ Влияние на организм
• Сердце: ⚠️ Насыщенные жиры при жарке
• Пищеварение: 🟡 Переваривается 3-4 часа
• Энергия: 🟡 Возможна сонливость после обеда

⏰ Рекомендации
✅ Для обеда. Не рекомендуется на ужин.

🔧 Как улучшить
1. Заменить макароны на спагетти из цельнозерновой муки
2. Добавить грибы для объёма и клетчатки
3. Использовать томатную пасту без сахара
4. Подавать с рукколой и пармезаном

💡 Health Score: 6/10 — Сытный обед, который можно значительно улучшить заменой гарнира.

💡 Интересный факт
Томатный соус содержит ликопин, который становится более биодоступным после термической обработки. Варёные томаты дают в 4 раза больше ликопина, чем сырые. Поэтому томатная паста полезнее свежих помидоров в этом аспекте.`,keywords:["мясное","обед","русская","сытное"]},"11. ряженка яблоко хлеб.jpg":{title:"Ряженка, яблоко, хлеб",meal_type:"завтрак",date:"2026-05-10",dish_name:"Ряженка с яблоком и хлебом",ingredients:["ряженка 4%","яблоко","хлеб цельнозерновой","мёд (опционально)","корица"],nutrition:{calories:290,protein:12,carbs:38,fat:10,fiber:5,ndi:7.5},harvard_radar:{protein:40,vegetables:0,carbs:60,fats:25,fiber:45,nutri_index:60,cooking:90},harvard_assessment:"Лёгкий завтрак, но недостаточно белка",assessment_text:"✅ Хороший вариант быстрого завтрака. Ряженка даёт кальций и пробиотики, яблоко — клетчатку и витамины. Рекомендуется добавить белок.",recommendations:["Добавить горсть орехов или семян","Выбрать хлеб с семечками и злаками","Заменить мёд на ягоды для снижения сахара"],analysis:`📊 Анализ блюда "Ряженка с яблоком и хлебом"

🔥 290 ккал | 💪 Белки: 12г | 🍞 Углеводы: 38г | 🧈 Жиры: 10г

⚖️ Баланс БЖУ
• Белок — умеренный ⚠️ Для завтрака маловато
• Жиры — умеренные ✅ Ряженка даёт молочный жир
• Углеводы — умеренные ✅ Сложные + простые

🧪 Микронутриенты
• Кальций из ряженки ✅ Здоровье костей
• Пробиотики из ряженки ✅ Микрофлора
• Клетчатка из яблока и хлеба ✅
• Витамин C из яблока ✅
• Пектин из яблока ✅ Снижает холестерин

📉 Гликемическая нагрузка
Средняя — яблоко и цельнозерновой хлеб имеют умеренный ГИ. Мёд повышает нагрузку.

⚙️ Метаболическая нагрузка
Низкая | ✅ Лёгкое усвоение. Подходит для утра, когда ЖКТ только просыпается.

❤️ Влияние на организм
• Сердце: ✅ Нейтрально-положительное
• Пищеварение: ✅ Пробиотики + клетчатка — идеально
• Энергия: ✅ Достаточно для утра до обеда

⏰ Рекомендации
✅ Хорош для завтрака и перекуса.

🔧 Как улучшить
1. Добавить грецкие орехи и миндаль
2. Выбрать ряженку 2.5% для снижения жирности
3. Добавить семена чиа для омега-3

💡 Health Score: 7.5/10 — Быстрый и полезный завтрак, требует небольшого дополнения белком.

💡 Интересный факт
Ряженка — исконно русский кисломолочный продукт, который готовят из топлёного молока. Благодаря длительному томлению, в ряженке полностью расщепляется лактоза, что делает её безопасной даже для людей с лёгкой лактазной недостаточностью. По содержанию кальция ряженка превосходит кефир.`,keywords:["завтрак","вегетарианское","быстрое","лёгкое","молочное"]},"12. 20260219_204535.jpg":{title:"Ужин (фото 20260219_204535)",meal_type:"ужин",date:"2026-02-19",dish_name:"Куриное филе с овощами и рисом",ingredients:["куриное филе","рис бурый","брокколи","морковь","чеснок","соевый соус","кунжутное масло"],nutrition:{calories:420,protein:34,carbs:40,fat:10,fiber:6,ndi:8.5},harvard_radar:{protein:85,vegetables:50,carbs:45,fats:20,fiber:55,nutri_index:80,cooking:80},harvard_assessment:"Сбалансированный ужин с хорошим содержанием белка",assessment_text:"✅ Отличный вариант ужина! Бурый рис даёт сложные углеводы, куриная грудка — постный белок, брокколи — клетчатку и витамины.",recommendations:["Добавить овощи разных цветов для большего спектра антиоксидантов","Уменьшить порцию риса для вечернего приёма","Использовать минимальное количество масла"],analysis:`📊 Анализ блюда "Куриное филе с овощами и рисом"

🔥 420 ккал | 💪 Белки: 34г | 🍞 Углеводы: 40г | 🧈 Жиры: 10г

⚖️ Баланс БЖУ
• Белок — высокий ✅ Отлично для ужина
• Жиры — низкие ✅ Щадящий режим
• Углеводы — умеренные ✅ Бурый рис — медленные углеводы

🧪 Микронутриенты
• Селен из курицы ✅ Антиоксидант
• Витамин C из брокколи ✅
• Бета-каротин из моркови ✅
• Клетчатка из бурого риса и овощей ✅
• Магний ✅ Расслабление нервной системы

📉 Гликемическая нагрузка
Низкая — бурый рис имеет ГИ 50, овощи минимально влияют на сахар. Отлично для вечера.

⚙️ Метаболическая нагрузка
Низкая | ✅ Хорошо усваивается. Подходит для вечернего метаболизма.

❤️ Влияние на организм
• Сердце: ✅ Постное мясо и овощи — поддержка сосудов
• Пищеварение: ✅ Лёгкое, за счёт клетчатки
• Энергия: ✅ Умеренная, не мешает засыпанию

⏰ Рекомендации
✅ Идеален для ужина за 3-4 часа до сна.

🔧 Как улучшить
1. Добавить куркуму с чёрным перцем
2. Заменить соевый соус на тамари (без глютена)
3. Подавать с кинзой или петрушкой

💡 Health Score: 8.5/10 — Идеальный ужин с точки зрения нутрициологии.

💡 Интересный факт
Бурый рис сохраняет оболочку зерна, в которой содержится до 80% всех питательных веществ, включая масло гамма-оризанол — соединение, которое снижает уровень холестерина и улучшает настроение. В белом шлифованном рисе этого масла практически нет.`,keywords:["мясное","ужин","диетическое","высокобелковое","азиатская"]},"13. гарвардская тарелка.jpg":{title:"Гарвардская тарелка",meal_type:"обед",date:"2026-05-10",dish_name:"Гарвардская тарелка",ingredients:["куриное филе","киноа","брокколи","помидоры черри","авокадо","листья салата","оливковое масло","лимонный сок"],nutrition:{calories:480,protein:35,carbs:35,fat:18,fiber:10,ndi:9.5},harvard_radar:{protein:90,vegetables:75,carbs:40,fats:35,fiber:85,nutri_index:95,cooking:85},harvard_assessment:"Эталонное блюдо по принципу Гарвардской тарелки",assessment_text:"✅ Идеально! Половина тарелки — овощи, четверть — белок, четверть — сложные углеводы. Плюс полезные жиры из авокадо и масла.",recommendations:["Добавить ягоды для антиоксидантов","Чередовать киноа с чечевицей","Экспериментировать с разными видами зелени"],analysis:`📊 Анализ блюда "Гарвардская тарелка"

🔥 480 ккал | 💪 Белки: 35г | 🍞 Углеводы: 35г | 🧈 Жиры: 18г

⚖️ Баланс БЖУ
• Белок — отличный ✅ Идеальное количество
• Жиры — оптимальные ✅ Полезные мононенасыщенные
• Углеводы — сбалансированные ✅ Преимущественно клетчатка

🧪 Микронутриенты
• Полный спектр витаминов из разноцветных овощей ✅
• Омега-3 из авокадо и оливкового масла ✅
• Железо из киноа и курицы ✅
• Калий, магний, фолиевая кислота ✅
• Антиоксиданты: ликопин, лютеин, кверцетин ✅

📉 Гликемическая нагрузка
Минимальная — все компоненты имеют низкий ГИ. Идеально для стабильного уровня сахара.

⚙️ Метаболическая нагрузка
Оптимальная | ✅ Организм получает все необходимые нутриенты без перегрузки. Максимальная биодоступность.

❤️ Влияние на организм
• Сердце: ✅ Максимальная защита
• Пищеварение: ✅ Клетчатка + антиоксиданты
• Энергия: ✅ Равномерная на 5-6 часов
• Иммунитет: ✅ Полная поддержка

⏰ Рекомендации
✅ Идеален для любого времени дня.

🔧 Как улучшить
1. Добавить ферментированные овощи (кимчи, квашеная капуста)
2. Посыпать тыквенными семечками
3. Приправить свежей зеленью (базилик, мята)

💡 Health Score: 9.5/10 — Эталон здорового питания. Ближе к идеалу быть просто невозможно.

💡 Интересный факт
Принцип Гарвардской тарелки был разработан экспертами по питанию Гарвардской школы общественного здоровья в 2011 году как альтернатива пищевой пирамиде USDA. Исследования показывают, что следование этой модели снижает риск сердечно-сосудистых заболеваний на 30% и риск диабета 2 типа на 20%.`,keywords:["обед","диетическое","сбалансированное","высокобелковое","пп"]},"14. rulka.jpg":{title:"Рулька",meal_type:"ужин",date:"2026-05-10",dish_name:"Свиная рулька с гарниром",ingredients:["свиная рулька","картофель","морковь","лук","чеснок","лавровый лист","специи","горчица"],nutrition:{calories:680,protein:38,carbs:32,fat:40,fiber:3,ndi:4.5},harvard_radar:{protein:60,vegetables:15,carbs:40,fats:70,fiber:15,nutri_index:30,cooking:75},harvard_assessment:"Тяжёлое блюдо с высоким содержанием насыщенных жиров",assessment_text:"⚠️ Богатое белком и жирами блюдо, но не соответствующее принципам Гарвардской тарелки. Рекомендуется употреблять нечасто и в первой половине дня.",recommendations:["Употреблять не чаще 1-2 раз в месяц","Сочетать с большим количеством свежих овощей","Удалить видимый жир перед приготовлением","Подавать с квашеной капустой для улучшения пищеварения"],analysis:`📊 Анализ блюда "Свиная рулька с гарниром"

🔥 680 ккал | 💪 Белки: 38г | 🍞 Углеводы: 32г | 🧈 Жиры: 40г

⚖️ Баланс БЖУ
• Белок — высокий ✅ Много полноценного белка
• Жиры — высокие ⚠️ Преимущественно насыщенные
• Углеводы — умеренные ✅ За счёт картофеля

🧪 Микронутриенты
• Железо из свинины ✅ Высокая биодоступность
• Цинк ✅ Иммунитет и мужское здоровье
• Витамин B12 ✅ Нервная система
• Калий ✅
• Коллаген из кожи и сухожилий ✅ Для суставов
• Натрий ⚠️ Умеренно

📉 Гликемическая нагрузка
Средняя — картофель повышает сахар, но жиры и белок замедляют всасывание.

⚙️ Метаболическая нагрузка
Высокая | ⚠️ Требует активной работы печени и поджелудочной. Долго переваривается (до 5 часов).

❤️ Влияние на организм
• Сердце: ⚠️ Насыщенные жиры повышают LDL холестерин
• Пищеварение: 🔴 Тяжёлое, может вызвать дискомфорт
• Энергия: 🟡 Возможна сонливость после еды

⏰ Рекомендации
❌ Только на обед, не на ужин. Идеально до 14:00 для полного переваривания.

🔧 Как улучшить
1. Запекать рульку без масла в духовке
2. Заменить картофель на тушёную капусту
3. Добавить горчицу и хрен для ускорения метаболизма
4. Подавать с большим зелёным салатом

💡 Health Score: 4.5/10 — Праздничное блюдо для редкого употребления.

💡 Интересный факт
Свиная рулька содержит значительное количество коллагена, который при длительном томлении превращается в желатин. Желатин содержит глицин и пролин — аминокислоты, важные для здоровья суставов, кожи и слизистой ЖКТ. Однако польза нивелируется высоким содержанием насыщенных жиров.`,keywords:["мясное","обед","русская","сытное","праздничное"]},"15. сибас.jpg":{title:"Сибас",meal_type:"ужин",date:"2026-05-10",dish_name:"Сибас запечённый с овощами",ingredients:["сибас (морской окунь)","лимон","розмарин","брокколи","черри","оливковое масло","чеснок","спаржа"],nutrition:{calories:380,protein:34,carbs:10,fat:22,fiber:5,ndi:9.2},harvard_radar:{protein:85,vegetables:60,carbs:15,fats:45,fiber:55,nutri_index:90,cooking:85},harvard_assessment:"Отличный ужин с высоким содержанием омега-3",assessment_text:"✅ Прекрасный выбор! Рыба — источник полноценного белка и омега-3, овощи — клетчатка и витамины. Идеально для вечернего приёма пищи.",recommendations:["Подавать с киноа или бурым рисом для углеводов","Чередовать с другими видами рыбы (лосось, треска)","Использовать минимальное количество соли"],analysis:`📊 Анализ блюда "Сибас запечённый с овощами"

🔥 380 ккал | 💪 Белки: 34г | 🍞 Углеводы: 10г | 🧈 Жиры: 22г

⚖️ Баланс БЖУ
• Белок — высокий ✅ Рыба — легкоусвояемый белок
• Жиры — хорошие ✅ Омега-3 ПНЖК
• Углеводы — низкие ✅ Только из овощей

🧪 Микронутриенты
• Омега-3 (EPA/DHA) из сибаса ✅ Высокое содержание
• Витамин D ✅ Для иммунитета и костей
• Витамин B12 ✅ Нервная система
• Селен ✅ Антиоксидант
• Витамин C из брокколи и черри ✅
• Калий ✅

📉 Гликемическая нагрузка
Минимальная — практически нет углеводов. Идеально для кето и LCHF.

⚙️ Метаболическая нагрузка
Низкая | ✅ Рыба переваривается быстрее мяса (2-3 часа). Не создаёт нагрузки на ЖКТ.

❤️ Влияние на организм
• Сердце: ✅ Омега-3 снижает триглицериды и воспаление
• Мозг: ✅ DHA критически важен для когнитивных функций
• Пищеварение: ✅ Лёгкое
• Энергия: ✅ Поддерживает, не вызывает тяжести

⏰ Рекомендации
✅ Идеален для ужина. Подходит для обеда.

🔧 Как улучшить
1. Добавить авокадо для дополнительных полезных жиров
2. Подавать с киноа для полноценного приёма
3. Полить лимонно-чесночным соусом

💡 Health Score: 9.2/10 — Один из лучших вариантов ужина: богатый нутриентами, лёгкий и полезный.

💡 Интересный факт
Сибас (морской окунь) — одна из самых потребляемых рыб в мире. Она содержит около 1.5г омега-3 на 100г, что делает её отличным источником этих незаменимых жирных кислот. Интересно, что дикий сибас содержит больше омега-3, чем фермерский, из-за различий в рационе.`,keywords:["рыбное","обед","диетическое","высокобелковое","паровое"]},"16. сибас.jpg":{title:"Сибас (второе фото)",meal_type:"ужин",date:"2026-05-10",dish_name:"Сибас с гарниром и соусом",ingredients:["сибас (морской окунь)","картофель","сметана","укроп","лимон","сливочное масло","огурец"],nutrition:{calories:440,protein:32,carbs:28,fat:24,fiber:3,ndi:7.8},harvard_radar:{protein:75,vegetables:25,carbs:35,fats:50,fiber:20,nutri_index:65,cooking:80},harvard_assessment:"Хороший вариант ужина с рыбой, но маловато овощей",assessment_text:"✅ Рыба — отличный выбор для ужина. Однако картофельный гарнир и сметанный соус увеличивают калорийность. Рекомендуется добавить больше овощей.",recommendations:["Заменить картофель на тушёные овощи","Заменить сметану на греческий йогурт","Добавить свежий салат из зелени"],analysis:`📊 Анализ блюда "Сибас с гарниром и соусом"

🔥 440 ккал | 💪 Белки: 32г | 🍞 Углеводы: 28г | 🧈 Жиры: 24г

⚖️ Баланс БЖУ
• Белок — высокий ✅ Качественный рыбный белок
• Жиры — умеренные ✅ Частично полезные из рыбы
• Углеводы — умеренные ✅ Картофель — крахмал

🧪 Микронутриенты
• Омега-3 из сибаса ✅
• Витамин D ✅
• Калий ✅ Из рыбы и картофеля
• Кальций из сметаны ✅
• Клетчатка — недостаток ⚠️

📉 Гликемическая нагрузка
Средняя — картофель повышает уровень глюкозы. Белок и жир смягчают скачок.

⚙️ Метаболическая нагрузка
Низкая | ✅ Рыба легко переваривается. Картофель — хорошо усваиваемый углевод.

❤️ Влияние на организм
• Сердце: ✅ Омега-3 поддерживает сердечно-сосудистую систему
• Пищеварение: ✅ Лёгкое
• Энергия: ✅ Устойчивая

⏰ Рекомендации
✅ Подходит для ужина. Можно на обед.

🔧 Как улучшить
1. Заменить картофель на запечённые овощи (баклажан, цукини)
2. Добавить шпинат в качестве зелёной подушки
3. Приправить имбирём для пищеварения

💡 Health Score: 7.8/10 — Вкусный ужин с качественным белком, который можно сделать ещё полезнее, изменив гарнир.

💡 Интересный факт
Рыба — единственный натуральный источник витамина D в значимых количествах. Порция сибаса (150г) покрывает около 70% суточной потребности в витамине D. При этом усвоение жирорастворимых витаминов из рыбы в 2 раза эффективнее, чем из синтетических добавок.`,keywords:["рыбное","обед","диетическое","высокобелковое","паровое"]},"17.сельдь под шубой.jpg":{title:"Сельдь под шубой",meal_type:"обед",date:"2026-05-10",dish_name:"Сельдь под шубой",ingredients:["сельдь слабосолёная","свёкла","картофель","морковь","яйца","майонез","лук репчатый"],nutrition:{calories:350,protein:16,carbs:24,fat:20,fiber:4,ndi:5.5},harvard_radar:{protein:35,vegetables:30,carbs:40,fats:50,fiber:30,nutri_index:40,cooking:95},harvard_assessment:"Традиционный салат с высоким содержанием жиров",assessment_text:"⚠️ Сельдь — полезный источник омега-3, но майонез и обилие картофеля делают блюдо жирным и крахмалистым. Не соответствует Гарвардской тарелке.",recommendations:["Заменить майонез на сметану с горчицей или йогурт","Уменьшить количество картофеля, добавить яблоко","Использовать селёдку собственного посола для контроля соли","Подавать как закуску, а не основное блюдо"],analysis:`📊 Анализ блюда "Сельдь под шубой"

🔥 350 ккал (порция 200г) | 💪 Белки: 16г | 🍞 Углеводы: 24г | 🧈 Жиры: 20г

⚖️ Баланс БЖУ
• Белок — умеренный ⚠️ Селёдка — хороший белок, но его мало
• Жиры — высокие ⚠️ Майонез + рыбий жир
• Углеводы — умеренные ✅ За счёт овощей

🧪 Микронутриенты
• Омега-3 из сельди ✅ Высокое содержание EPA и DHA
• Витамин D из сельди ✅ Очень высокое содержание
• Железо из свёклы ✅
• Бетаин из свёклы ✅ Для печени
• Натрий — избыток ⚠️ Соль + майонез
• Калий ✅ Из овощей

📉 Гликемическая нагрузка
Средняя — свёкла и картофель дают углеводы, но жиры замедляют усвоение.

⚙️ Метаболическая нагрузка
Средняя | ⚠️ Комбинация майонеза с солёной рыбой требует работы почек и печени.

❤️ Влияние на организм
• Сердце: ✅🟡 Омега-3 полезны, но соль и жиры создают нагрузку
• Пищеварение: 🟡 Тяжеловато из-за майонеза
• Энергия: 🟡 Возможна тяжесть

⏰ Рекомендации
✅ Как салат-закуска на праздничный стол. Не для регулярного употребления.

🔧 Как улучшить
1. Заменить майонез на смесь греческого йогурта с горчицей
2. Выложить салат слоями без майонеза между ними
3. Добавить зелёное яблоко для свежести
4. Сверху посыпать грецкими орехами

💡 Health Score: 5.5/10 — Сельдь — суперфуд, но майонез сводит пользу на нет. При замене заправки оценка вырастет до 8.

💡 Интересный факт
Сельдь под шубой — советский салат, придуманный в 1918 году в Москве. Свёкла в его составе — уникальный ингредиент: она содержит бетаин и нитраты, которые расширяют сосуды и снижают давление, что частично компенсирует вред от соли. Сама сельдь — один из рекордсменов по содержанию витамина D (до 25 мкг на 100г).`,keywords:["рыбное","обед","русская","праздничное","салат"]}},vd=[{id:"custom",name:"Пользовательский",protocol:"",category:"",doctor:"HEALORA AI · Модель v2.0",summary:"Индивидуальный план интервенций, сформированный на основе текущих потребностей пациента.",highlight:"",interventions:[]},{id:"1.1",name:"Гликемический контроль",protocol:"1.1",category:"nutritional",doctor:"Врач-эндокринолог Иванов А.В. · Центр современной цифровой медицины",summary:"Пациенту рекомендован курс нутрициологической коррекции гликемического профиля. Основные направления: контроль углеводной нагрузки, регулярная физическая активность, мониторинг гликемии в динамике.",highlight:"Контроль глюкозы, дробное питание 4-5 раз/день, аэробные нагрузки",interventions:[{code:"FD_WTR",name:"Водный режим",regularity:"D"},{code:"FD_TIM",name:"Тайминг питания",regularity:"D"},{code:"FD_PRO",name:"Белковая норма",regularity:"D"},{code:"FD_FAT",name:"Жировой профиль",regularity:"D"},{code:"PH_Z2",name:"Тренировки: зона 2",regularity:"W"},{code:"MN_MDT",name:"Медитация",regularity:"D"}]},{id:"1.2",name:"Циркадное питание",protocol:"1.2",category:"nutritional",doctor:"Врач-эндокринолог Иванов А.В. · Центр современной цифровой медицины",summary:"Пациенту рекомендован режим циркадного питания с ограничением временного окна приёма пищи (8-10 часов). Основные направления: ранний ужин, исключение ночных перекусов, достаточный водный режим.",highlight:"Окно питания 10:00-20:00, ужин за 3ч до сна, вода и травяной чай",interventions:[{code:"FD_TIM",name:"Тайминг питания",regularity:"D"},{code:"FD_VOL",name:"Объём порций",regularity:"D"},{code:"SL_BED",name:"Сон: время отхода",regularity:"D"},{code:"MN_MDT",name:"Медитация",regularity:"D"}]},{id:"1.3",name:"Гигиена сна",protocol:"1.3",category:"nutritional",doctor:"Врач-эндокринолог Иванов А.В. · Центр современной цифровой медицины",summary:"Пациенту рекомендован комплекс мероприятий по гигиене сна. Основные направления: стабилизация времени отхода, оптимизация продолжительности сна (7-9ч), контроль качества сна.",highlight:"Отход до 23:00, 7-9ч сна, отказ от экранов за 1ч до сна",interventions:[{code:"SL_BED",name:"Сон: время отхода",regularity:"D"},{code:"SL_DUR",name:"Сон: продолжительность",regularity:"D"},{code:"SL_QLT",name:"Сон: качество",regularity:"D"},{code:"MN_MDT",name:"Медитация",regularity:"D"},{code:"MN_BRTH",name:"Дыхательные упражнения",regularity:"P"}]},{id:"1.4",name:"Гидратация",protocol:"1.4",category:"nutritional",doctor:"Врач-эндокринолог Иванов А.В. · Центр современной цифровой медицины",summary:"Пациенту рекомендован режим гидратации с расчётом индивидуальной нормы потребления воды (30 мл/кг массы тела).",highlight:"Вода 30 мл/кг/день, стакан каждые 1.5-2ч, кофеин не более 2 чашек",interventions:[{code:"FD_WTR",name:"Водный режим",regularity:"D"},{code:"FD_VOL",name:"Объём порций",regularity:"D"},{code:"FD_MCR",name:"Микронутриенты: вода",regularity:"D"}]},{id:"1.5",name:"Базовые добавки",protocol:"1.5",category:"nutritional",doctor:"Врач-нутрициолог Петрова Е.С. · Центр современной цифровой медицины",summary:"Пациенту рекомендован курс базовой нутрицевтической поддержки с учётом дефицитов по результатам лабораторной диагностики.",highlight:"Витамин D 2000-5000 МЕ, Магний 300-400 мг, Омега-3 1-2 г/день",interventions:[{code:"SP_02",name:"Витамин D3",regularity:"D"},{code:"SP_03",name:"Витамин C",regularity:"D"},{code:"SP_15",name:"Магний (Mg)",regularity:"D"},{code:"SP_17",name:"Цинк (Zn)",regularity:"D"},{code:"SP_27",name:"Кофермент Q10",regularity:"D"}]},{id:"2.1",name:"Метаболические риски",protocol:"2.1",category:"medical",doctor:"Врач-эндокринолог Иванов А.В. · Центр современной цифровой медицины",summary:"Пациенту рекомендовано медицинское наблюдение и коррекция метаболических нарушений. Контроль липидного профиля, мониторинг АД, коррекция углеводного обмена.",highlight:"АД <130/80, глюкоза натощак <5.6, ЛПНП <2.6",interventions:[{code:"BIO_BP",name:"Измерение АД",regularity:"D"},{code:"BIO_GLU",name:"Глюкоза крови",regularity:"D"},{code:"FD_WTR",name:"Водный режим",regularity:"D"},{code:"SP_02",name:"Витамин D3",regularity:"D"},{code:"M_DD02",name:"Метформин (при ИР)",regularity:"D"}]},{id:"2.2",name:"Гормональные нарушения",protocol:"2.2",category:"medical",doctor:"Врач-эндокринолог Иванов А.В. · Центр современной цифровой медицины",summary:"Пациенту рекомендована коррекция гормональных нарушений: нормализация функции щитовидной железы, коррекция инсулинорезистентности, поддержка надпочечников.",highlight:"Инозитол 2-4 г/день, стресс-менеджмент, сон 7.5+",interventions:[{code:"SP_29",name:"Инозитол",regularity:"D"},{code:"MN_MDT",name:"Медитация",regularity:"D"},{code:"MN_BRTH",name:"Дыхательные упражнения",regularity:"P"}]},{id:"2.3",name:"Воспалительные состояния",protocol:"2.3",category:"medical",doctor:"Врач-терапевт Соколова М.В. · Центр современной цифровой медицины",summary:"Пациенту рекомендован противовоспалительный протокол. Нутрицевтическая поддержка, коррекция питания, контроль маркеров воспаления (СРБ, IL-6).",highlight:"Ресвератрол 250-500 мг, кверцетин 500-1000 мг, средиземноморская диета",interventions:[{code:"SP_39",name:"Ресвератрол",regularity:"D"},{code:"SP_36",name:"Кверцетин",regularity:"D"},{code:"PH_Z2",name:"Тренировки: зона 2",regularity:"W"},{code:"MN_BRTH",name:"Дыхательные упражнения",regularity:"P"}]},{id:"3.1",name:"Сердечно-сосудистое здоровье",protocol:"3.1",category:"wellness",doctor:"Врач-кардиолог Новиков Д.П. · Центр современной цифровой медицины",summary:"Пациенту рекомендован комплекс мероприятий для поддержания сердечно-сосудистого здоровья: мониторинг АД и ЧСС, аэробные нагрузки, нутрицевтическая поддержка.",highlight:"АД <130/85, ЧСС + HRV ежедневно, 150 мин/нед аэробики",interventions:[{code:"BIO_BP",name:"Измерение АД",regularity:"D"},{code:"BIO_HRV",name:"Вариабельность ритма",regularity:"D"},{code:"SL_BED",name:"Сон: время отхода",regularity:"D"},{code:"FD_WTR",name:"Водный режим",regularity:"D"},{code:"SP_02",name:"Витамин D3",regularity:"D"}]},{id:"3.2",name:"Когнитивное здоровье",protocol:"3.2",category:"wellness",doctor:"Врач-невролог Белова А.И. · Центр современной цифровой медицины",summary:"Пациенту рекомендован протокол поддержки когнитивных функций: нейронутрицевтика, ментальные практики, оптимизация сна, когнитивный тренинг.",highlight:"Медитация 10-20 мин/день, сон 7-9ч, нейронутрицевтика",interventions:[{code:"MN_MDT",name:"Медитация",regularity:"D"},{code:"SP_28",name:"α-Липоевая кислота",regularity:"D"},{code:"PH_Z2",name:"Тренировки: зона 2",regularity:"W"},{code:"SL_DUR",name:"Сон: продолжительность",regularity:"D"}]},{id:"3.3",name:"Долголетие",protocol:"3.3",category:"wellness",doctor:"HEALORA AI · Модель v2.0",summary:"Пациенту рекомендована комплексная программа активного долголетия: метаболическое здоровье, физическая активность, нутрицевтическая поддержка, управление стрессом.",highlight:"Средиземноморская диета + 16:8, комбинация аэробных/силовых, Q10",interventions:[{code:"FD_WTR",name:"Водный режим",regularity:"D"},{code:"FD_TIM",name:"Тайминг питания",regularity:"D"},{code:"BIO_BP",name:"Измерение АД",regularity:"D"},{code:"SP_02",name:"Витамин D3",regularity:"D"},{code:"SP_03",name:"Витамин C",regularity:"D"},{code:"SP_39",name:"Ресвератрол",regularity:"D"},{code:"SP_27",name:"Кофермент Q10",regularity:"D"}]}];function Sj(e){return vd.find(t=>t.id===e)||vd[0]}const wp="healora_plans",dv=y.createContext(null);function wj({children:e}){const[t,n]=y.useState(()=>{try{return JSON.parse(localStorage.getItem(wp)||"{}")}catch{return{}}});y.useEffect(()=>{try{localStorage.setItem(wp,JSON.stringify(t))}catch{}},[t]);const l=y.useCallback(c=>{const o=t[c];return o?Array.isArray(o)?{interventions:o,note:"",status:"active",templateId:"custom"}:o:{interventions:[],note:"",status:"active",templateId:"custom"}},[t]),i=y.useCallback((c,o)=>{const r=Array.isArray(o)?{interventions:o,note:"",status:"active",templateId:"custom"}:o;n(d=>({...d,[c]:r}))},[]),s=y.useCallback(c=>{n(o=>{const r={...o};return delete r[c],r})},[]);return a.jsx(dv.Provider,{value:{plans:t,getPlan:l,savePlan:i,removePlan:s},children:e})}function Cj(){const e=y.useContext(dv);if(!e)throw new Error("usePlans must be used within PlansProvider");return e}const Ej=[{id:1,name:"РКИ (медицина)",evidence:"высокий",stars:5,applicability:"Базовый слой: противопоказания, безопасность",short:"РКИ",official:!0,regulatory:"ФЗ № 323 «Об основах охраны здоровья граждан»; клинические рекомендации Минздрава РФ"},{id:2,name:"Нутрициология",evidence:"средний–высокий",stars:4,applicability:"Ядро продукта: персонализированные рационы",short:"Нутрициология",official:!0,regulatory:"СанПиН 2.3/2.4.3590-20; приказы Минздрава по лечебному питанию"},{id:3,name:"Китайская медицина",evidence:"средний (акупунктура — РКИ, травы — mixed)",stars:3,applicability:"Акупунктура, фитотерапия, цигун: доказательная база для боли и стресса",short:"Китайская",official:!1,regulatory:""},{id:4,name:"Интегративная медицина",evidence:"зависит от метода",stars:4,applicability:"Перспективно: йога + когнитивные техники + питание",short:"Интегративная",official:!0,regulatory:"ФЗ № 323 «Об основах охраны здоровья граждан»; приказы Минздрава по восстановительной медицине; международные рекомендации по интегративному подходу (NIH, NCCIH)"},{id:5,name:"Аюрведа",evidence:"низкий–средний (отдельные травы изучены)",stars:2,applicability:"С пометкой «традиция»: режим дня, питание по дошам, травы после проверки",short:"Аюрведа",official:!1,regulatory:""},{id:6,name:"Персонализированная медицина",evidence:"растущий",stars:4,applicability:"Долгосрочная цель: интеграция с лабораториями",short:"Персонализация",official:!0,regulatory:"ФЗ № 152 «О персональных данных»; регулирование генетических исследований"},{id:7,name:"Поведенческая психология",evidence:"высокий для CBT",stars:4,applicability:"Ключевой модуль: работа с мотивацией и срывами",short:"Психология",official:!0,regulatory:"Клинические рекомендации Минздрава по КПТ; закон о психологической помощи"},{id:8,name:"Цифровые биомаркеры",evidence:"зависит от алгоритма",stars:3,applicability:"Техническое ядро: адаптация под паттерны пользователя",short:"Биомаркеры",official:!1,regulatory:""},{id:9,name:"Шаманизм",evidence:"очень низкий (антропологические исследования)",stars:1,applicability:"С дисклеймером: культурный контекст, не является лечением",short:"Шаманизм",official:!1,regulatory:""},{id:10,name:"Клинические гайдлайны",evidence:"консенсус экспертов",stars:4,applicability:"Для безопасности: референсные значения, красные флаги",short:"Гайдлайны",official:!0,regulatory:"Приказ Минздрава № 786н «Об утверждении порядка разработки клинических рекомендаций»"},{id:11,name:"Медицина Майя",evidence:"очень низкий (этноботаника)",stars:1,applicability:"С дисклеймером: этноботанические данные, не заменяет медицину",short:"Майя",official:!1,regulatory:""},{id:12,name:"Народные практики",evidence:"низкий",stars:2,applicability:"С пометкой «традиция», без медицинских утверждений",short:"Народные",official:!1,regulatory:""},{id:13,name:"Культурная адаптация",evidence:"качественные исследования",stars:2,applicability:"Для удержания: уважение к пищевым традициям",short:"Культура",official:!1,regulatory:""}],Dj=[{id:1,name:"Вегетарианство",short:"Вегетарианство",stars:3,applicability:"Исключение мяса, рыбы; яйца и молочные продукты разрешены"},{id:2,name:"Веганство",short:"Веганство",stars:2,applicability:"Полное исключение продуктов животного происхождения"},{id:3,name:"Без глютена",short:"Без глютена",stars:3,applicability:"Исключение пшеницы, ржи, ячменя; при целиакии — строго"},{id:4,name:"Без лактозы",short:"Без лактозы",stars:3,applicability:"Исключение молочных продуктов; при лактазной недостаточности"},{id:5,name:"Низкоуглеводное",short:"LCHF",stars:3,applicability:"Ограничение углеводов до 50–100 г/сут, акцент на белки и жиры"},{id:6,name:"Средиземноморская",short:"Средиземноморская",stars:4,applicability:"Оливковое масло, рыба, овощи, цельнозерновые; доказана для долголетия"},{id:7,name:"Кетодиета",short:"Кето",stars:2,applicability:"Жиры 70–80%, белки 15–20%, углеводы <5%; требуется врачебный контроль"},{id:8,name:"Интервальное голодание",short:"IF",stars:3,applicability:"Окно приёма пищи 6–8 ч, остальное время — вода"},{id:9,name:"Без сахара",short:"Без сахара",stars:3,applicability:"Исключение добавленного сахара и подсластителей"},{id:10,name:"Спортивное питание",short:"Спортпит",stars:2,applicability:"Повышенный белок, BCAA, креатин, циклирование углеводов"}],kj=[{id:1,name:"Аллергии",short:"Аллергии",stars:4,applicability:"Пищевая аллергия: арахис, молоко, яйца, соя, морепродукты, кунжут, орехи, злаки"},{id:2,name:"Нелюбимые продукты",short:"Нелюбимые",stars:1,applicability:"Индивидуальная непереносимость вкуса/запаха: рыба, печень, грибы, бобовые, острая пища"},{id:3,name:"Религиозные",short:"Религиозные",stars:3,applicability:"Халяль, кошер, православные посты, индуистская диета"},{id:4,name:"Другие ограничения",short:"Иное",stars:2,applicability:"Этический выбор, FODMAP, DASH-диета, лечебное питание по назначению врача"}],Mj=Object.assign({"../../../../docs/domain/med_traditional_practices/practice_ayurveda.md":Hb,"../../../../docs/domain/med_traditional_practices/practice_behavioral.md":Ub,"../../../../docs/domain/med_traditional_practices/practice_biomarkers.md":Gb,"../../../../docs/domain/med_traditional_practices/practice_chinese_medicine.md":Pb,"../../../../docs/domain/med_traditional_practices/practice_cultural.md":qb,"../../../../docs/domain/med_traditional_practices/practice_folk.md":Vb,"../../../../docs/domain/med_traditional_practices/practice_guidelines.md":Yb,"../../../../docs/domain/med_traditional_practices/practice_integrative.md":Qb,"../../../../docs/domain/med_traditional_practices/practice_maya.md":Xb,"../../../../docs/domain/med_traditional_practices/practice_nutriciology.md":Kb,"../../../../docs/domain/med_traditional_practices/practice_personalized.md":$b,"../../../../docs/domain/med_traditional_practices/practice_rki.md":Zb,"../../../../docs/domain/med_traditional_practices/practice_shamanism.md":Jb}),Aj=Object.fromEntries(Object.entries(Mj).map(([e,t])=>{const n=e.match(/practice_(\w+)\.md$/);return n?[n[1],t]:null}).filter(Boolean)),Tj=Object.assign({"../../../../docs/domain/diet_preferences/diet_gluten_free.md":Fb,"../../../../docs/domain/diet_preferences/diet_if.md":Wb,"../../../../docs/domain/diet_preferences/diet_keto.md":Ib,"../../../../docs/domain/diet_preferences/diet_lactose_free.md":ej,"../../../../docs/domain/diet_preferences/diet_low_carb.md":tj,"../../../../docs/domain/diet_preferences/diet_mediterranean.md":nj,"../../../../docs/domain/diet_preferences/diet_no_sugar.md":aj,"../../../../docs/domain/diet_preferences/diet_sports.md":lj,"../../../../docs/domain/diet_preferences/diet_vegan.md":ij,"../../../../docs/domain/diet_preferences/diet_vegetarian.md":sj}),Rj=Object.fromEntries(Object.entries(Tj).map(([e,t])=>{const n=e.match(/diet_(\w+)\.md$/);return n?[n[1],t]:null}).filter(Boolean)),Oj=Object.assign({"../../../../docs/domain/diet_restrictions/restriction_allergies.md":cj,"../../../../docs/domain/diet_restrictions/restriction_disliked.md":rj,"../../../../docs/domain/diet_restrictions/restriction_other.md":oj,"../../../../docs/domain/diet_restrictions/restriction_religious.md":dj}),Bj=Object.fromEntries(Object.entries(Oj).map(([e,t])=>{const n=e.match(/restriction_(\w+)\.md$/);return n?[n[1],t]:null}).filter(Boolean)),Cp=({profileId:e,selectedProtocol:t,cartItems:n,onRemoveFromCart:l})=>{var ph,gh,vh,yh,xh,_h,bh,jh,Nh,Sh,wh,Ch,Eh,Dh,kh,Mh,Ah,Th,Rh,Oh,Bh,zh,Lh,Hh,Uh,Gh,Ph,qh,Vh,Yh,Qh,Xh,Kh,$h,Zh,Jh,Fh,Wh,Ih,em,tm,nm,am,lm,im,sm,cm,rm,om,dm,um,hm,mm,fm,pm,gm,vm,ym,xm,_m,bm,jm,Nm,Sm,wm,Cm,Em,Dm,km,Mm,Am,Tm,Rm,Om,Bm,zm,Lm,Hm,Um;const[i,s]=y.useState(null),[c,o]=y.useState(!0),[r,d]=y.useState(0),[h,p]=y.useState(!1),[f,x]=y.useState(!1);y.useState(1);const[C,k]=y.useState(!1),[M,v]=y.useState(1),[m,_]=y.useState([]),[w,O]=y.useState({}),[L,z]=y.useState([]),[P,Y]=y.useState(0),[Q,I]=y.useState({}),[_e,Qe]=y.useState({}),[Te,H]=y.useState(!1),[B,q]=y.useState(!1),[G,ee]=y.useState([]),[T,Z]=y.useState("interventions"),[Fe,Pe]=y.useState({demographics:!1,vitals:!1,labs:!1,lifestyle:!1,genetics:!1,medical:!1}),[He,Wt]=y.useState(null),[Ic,Eu]=y.useState("");y.useState({});const[dt,Ji]=y.useState("days"),[Fi,uv]=y.useState(!0);y.useState(null);const[hv,zl]=y.useState(!1),[F,er]=y.useState(null),[mv,Du]=y.useState(!1),[fv,Wi]=y.useState(!1),[Aa,tr]=y.useState("custom"),[Cn,Ll]=y.useState("active"),[Hl,nr]=y.useState(""),[ku,Mu]=y.useState(!1),[ar,Au]=y.useState(""),[lr,Ul]=y.useState(!1),[En,Ii]=y.useState(null),[It,We]=y.useState(null),[Yj,pv]=y.useState(!1),[Tu,ir]=y.useState(null),[Ta,en]=y.useState(null),[tn,nn]=y.useState("none"),[Gl,sr]=y.useState(null),[gv,es]=y.useState(!1),[Pt,vv]=y.useState(null),[ut,Pl]=y.useState(null),[cr,ts]=y.useState(null),[rr,yv]=y.useState(""),[Qj,xv]=y.useState(null),[or,dr]=y.useState(!1),[sa,qt]=y.useState([]),ql=y.useRef(null),[Ra,_v]=y.useState("simulation"),[Ru,ur]=y.useState([]),[bv,Ou]=y.useState(!1),[jv,Oa]=y.useState(!1),[Ie,hr]=y.useState(null),[Dn,Bu]=y.useState(-1),[Nv,mr]=y.useState(!1),[Sv,Vl]=y.useState(!1),[Ba,wv]=y.useState(null),[fr,Yl]=y.useState("idle"),[zu,za]=y.useState(""),[Cv,La]=y.useState([]),[Lu,ns]=y.useState(""),[as,kn]=y.useState({}),[Hu,ls]=y.useState(!1),[Uu,Ql]=y.useState(!1),[Gu,Ev]=y.useState("ru-RU"),[pr,Dv]=y.useState([]),[is,Pu]=y.useState(""),[kv,qu]=y.useState(!1),[ss,Vu]=y.useState(0),[Mv,gr]=y.useState(!1);y.useRef(null);const cs=y.useRef(null),rs=y.useRef(null),os=y.useRef(null),Ha=()=>{os.current&&(cancelAnimationFrame(os.current),os.current=null),cs.current&&(cs.current.getTracks().forEach(u=>u.stop()),cs.current=null),rs.current=null,Vu(0),gr(!1)},Yu=async u=>{if(Ha(),!!u)try{const g=await navigator.mediaDevices.getUserMedia({audio:{deviceId:{exact:u}}});cs.current=g;const j=new(window.AudioContext||window.webkitAudioContext),S=j.createMediaStreamSource(g),b=j.createAnalyser();b.fftSize=256,S.connect(b),rs.current=b,gr(!0);const N=new Uint8Array(b.frequencyBinCount),E=()=>{if(!rs.current)return;rs.current.getByteFrequencyData(N);const D=N.reduce((U,V)=>U+V,0)/N.length,A=Math.min(100,Math.round(D/255*100));Vu(A),os.current=requestAnimationFrame(E)};E()}catch(g){console.warn("Mic monitor failed:",g),gr(!1)}},Av=async u=>{Pu(u),u&&await Yu(u)},Qu=async()=>{try{qu(!0),(await navigator.mediaDevices.getUserMedia({audio:!0})).getTracks().forEach(S=>S.stop());const j=(await navigator.mediaDevices.enumerateDevices()).filter(S=>S.kind==="audioinput");Dv(j),j.length>0&&!is&&Pu(j[0].deviceId)}catch(u){console.warn("Microphone enumeration failed:",u)}finally{qu(!1)}};y.useState(null);const[ds,us]=y.useState(()=>{try{return JSON.parse(localStorage.getItem("healora_param_history_"+e)||"{}")}catch{return{}}}),[te,hs]=y.useState(()=>{try{return JSON.parse(localStorage.getItem("healora_param_overrides_"+e)||"{}")}catch{return{}}}),[Xu,Xl]=y.useState(!1),[Mn,Ku]=y.useState(()=>{try{return JSON.parse(localStorage.getItem("healora_pref_badges")||"[]")}catch{return[]}}),[ms,$u]=y.useState(()=>{try{return localStorage.getItem("healora_pref_custom")||""}catch{return""}}),[Tv,Zu]=y.useState(!1),[Ju,Rv]=y.useState(null),[fs,vr]=y.useState(null),[Ua,Fu]=y.useState(()=>{try{return JSON.parse(localStorage.getItem("healora_pref_diet")||"[]")}catch{return[]}}),[ca,yr]=y.useState(()=>{try{return JSON.parse(localStorage.getItem("healora_pref_restrictions")||"[]").map(g=>typeof g=="string"?{name:g,text:""}:g)}catch{return[]}}),[Ov,Wu]=y.useState(!1),[Bv,Iu]=y.useState(!1),[eh,xr]=y.useState(null),[th,_r]=y.useState(null),nh=y.useRef(1),{getPlan:ah,savePlan:lh,removePlan:zv,plans:Ga}=Cj(),ih=y.useRef("");y.useEffect(()=>{if(!e)return;const u=ah(e);(u.interventions.length>0||m.length>0)&&(_(u.interventions),nr(u.note||""),Ll(u.status||"active"),tr(u.templateId||"custom"))},[e]),y.useEffect(()=>{if(!e)return;const u=`${e}_${m.length}_${Hl}_${Cn}_${Aa}`;u!==ih.current&&(ih.current=u,lh(e,{interventions:m,note:Hl,status:Cn,templateId:Aa}))},[m,Hl,Cn,Aa,e]);const ra=u=>({day:u,waterMl:0,mood:{energy:"",mood:"",sleep:"",stress:"",digestion:""},voiceNote:"",audioFile:null,comment:"",meals:[{type:"breakfast",label:"Завтрак",photo:"",description:"",calories:"",protein:"",fat:"",carbs:"",ndi:"",recommendations:"",time:"08:00",duration:"20"},{type:"lunch",label:"Обед",photo:"",description:"",calories:"",protein:"",fat:"",carbs:"",ndi:"",recommendations:"",time:"13:00",duration:"30"},{type:"dinner",label:"Ужин",photo:"",description:"",calories:"",protein:"",fat:"",carbs:"",ndi:"",recommendations:"",time:"19:00",duration:"30"},{type:"snack",label:"Перекус",photo:"",description:"",calories:"",protein:"",fat:"",carbs:"",ndi:"",recommendations:"",time:"16:00",duration:"10"}]}),Vt={demographics:{title:"01 Демография",color:"#6b21c8",code:"01_DEMO",attributes:[{id:"age",code:"01_1_DEMO_AGE",name:"Возраст",current:(ph=i==null?void 0:i.demographics)==null?void 0:ph.age,target:null,unit:"лет",norm:"18-65",editable:!0},{id:"sex",code:"01_2_DEMO_GENDER",name:"Пол",current:(gh=i==null?void 0:i.demographics)==null?void 0:gh.sex,target:null,unit:"",norm:"M/F",editable:!0},{id:"height",code:"01_3_DEMO_HEIGHT",name:"Рост",current:(vh=i==null?void 0:i.anthropometrics)==null?void 0:vh.height_cm,target:null,unit:"см",norm:"150-200",editable:!0},{id:"weight",code:"01_4_DEMO_WEIGHT",name:"Вес",current:(yh=i==null?void 0:i.anthropometrics)==null?void 0:yh.weight_kg,target:70,unit:"кг",norm:"50-120",editable:!0},{id:"bmi",code:"01_19_BIO_BMI",name:"ИМТ",current:(xh=i==null?void 0:i.anthropometrics)==null?void 0:xh.bmi,target:22,unit:"кг/м²",norm:"18.5-25",editable:!1},{id:"waist",code:"01_20_BIO_WAIST",name:"Талия",current:(_h=i==null?void 0:i.anthropometrics)==null?void 0:_h.waist_cm,target:80,unit:"см",norm:"60-100",editable:!0},{id:"ethnicity",code:"01_5_DEMO_ETHNICITY",name:"Этническая принадлежность",current:(bh=i==null?void 0:i.demographics)==null?void 0:bh.ethnicity_or_background,target:null,unit:"",norm:"-",editable:!0}]},vitals:{title:"02 Витальные",color:"#1976d2",code:"02_BIO_VITALS",attributes:[{id:"bp_syst",code:"02_1_BIO_BP_SYST",name:"АД систолическое",current:(jh=i==null?void 0:i.vitals)==null?void 0:jh.systolic_bp_mmhg,target:120,unit:"мм рт.ст.",norm:"90-130",editable:!0},{id:"bp_diast",code:"02_2_BIO_BP_DIAST",name:"АД диастолическое",current:(Nh=i==null?void 0:i.vitals)==null?void 0:Nh.diastolic_bp_mmhg,target:80,unit:"мм рт.ст.",norm:"60-85",editable:!0},{id:"hr",code:"02_3_BIO_HR",name:"ЧСС покоя",current:(Sh=i==null?void 0:i.vitals)==null?void 0:Sh.resting_hr_bpm,target:72,unit:"уд/мин",norm:"60-80",editable:!0},{id:"hrv",code:"02_3_BIO_HRV",name:"HRV",current:(wh=i==null?void 0:i.vitals)==null?void 0:wh.hrv_ms,target:60,unit:"мс",norm:"40-100",editable:!0},{id:"spo2",code:"02_3_BIO_SPO2",name:"SpO2",current:(Ch=i==null?void 0:i.vitals)==null?void 0:Ch.spo2_percent,target:98,unit:"%",norm:"95-100",editable:!0}]},labs:{title:"03 Лаборатории",color:"#0288d1",code:"03_BIO_LABS",attributes:[{id:"glucose",code:"02_4_BIO_GLUCOSE",name:"Глюкоза",current:(Eh=i==null?void 0:i.labs)==null?void 0:Eh.glucose_mg_dl,target:100,unit:"мг/дл",norm:"70-100",editable:!0},{id:"hba1c",code:"02_4_BIO_HBA1C",name:"HbA1c",current:(Dh=i==null?void 0:i.labs)==null?void 0:Dh.hba1c_percent,target:5.5,unit:"%",norm:"4.0-5.6",editable:!0},{id:"tchol",code:"02_5_BIO_TCHOL",name:"Холестерин общий",current:(kh=i==null?void 0:i.labs)==null?void 0:kh.total_cholesterol_mg_dl,target:200,unit:"мг/дл",norm:"<200",editable:!0},{id:"hdl",code:"02_6_BIO_HDL",name:"ЛПВП",current:(Mh=i==null?void 0:i.labs)==null?void 0:Mh.hdl_mg_dl,target:60,unit:"мг/дл",norm:">40",editable:!0},{id:"ldl",code:"02_7_BIO_LDL",name:"ЛПНП",current:(Ah=i==null?void 0:i.labs)==null?void 0:Ah.ldl_mg_dl,target:100,unit:"мг/дл",norm:"<100",editable:!0},{id:"tg",code:"02_8_BIO_TG",name:"Триглицериды",current:(Th=i==null?void 0:i.labs)==null?void 0:Th.triglycerides_mg_dl,target:150,unit:"мг/дл",norm:"<150",editable:!0},{id:"crp",code:"02_9_BIO_CRP",name:"CRP",current:(Rh=i==null?void 0:i.labs)==null?void 0:Rh.crp_mg_l,target:1,unit:"мг/л",norm:"<3",editable:!0},{id:"vitd",code:"02_16_BIO_VITD",name:"Витамин D",current:(Oh=i==null?void 0:i.labs)==null?void 0:Oh.vitamin_d,target:40,unit:"нг/мл",norm:"30-100",editable:!0},{id:"ferritin",code:"02_18_BIO_FERRITIN",name:"Ферритин",current:(Bh=i==null?void 0:i.labs)==null?void 0:Bh.ferritin,target:80,unit:"нг/мл",norm:"20-200",editable:!0},{id:"tsh",code:"02_15_BIO_TSH",name:"ТТГ",current:(zh=i==null?void 0:i.labs)==null?void 0:zh.tsh,target:2.5,unit:"мМЕ/л",norm:"0.4-4.0",editable:!0}]},lifestyle:{title:"04 Образ жизни",color:"#388e3c",code:"04_LIFE",attributes:[{id:"sleep",code:"03_5_LIFE_SLEEP",name:"Сон",current:(Lh=i==null?void 0:i.lifestyle)==null?void 0:Lh.sleep_hours,target:7.5,unit:"ч",norm:"7-9",editable:!0},{id:"stress",code:"03_6_LIFE_STRESS",name:"Стресс",current:(Hh=i==null?void 0:i.lifestyle)==null?void 0:Hh.stress_level_0_10,target:3,unit:"/10",norm:"<5",editable:!0},{id:"steps",code:"03_8_LIFE_STEPS",name:"Шаги",current:(Uh=i==null?void 0:i.lifestyle)==null?void 0:Uh.daily_steps,target:1e4,unit:"/день",norm:"8000-12000",editable:!0},{id:"water",code:"03_9_LIFE_WATER",name:"Вода",current:(Gh=i==null?void 0:i.lifestyle)==null?void 0:Gh.water_l_day,target:2.5,unit:"л/день",norm:"2-3",editable:!0},{id:"smoking",code:"03_1_LIFE_SMOKE",name:"Курение",current:(Ph=i==null?void 0:i.lifestyle)==null?void 0:Ph.smoking,target:null,unit:"",norm:"Нет",editable:!0},{id:"alcohol",code:"03_2_LIFE_ALCOHOL",name:"Алкоголь",current:(qh=i==null?void 0:i.lifestyle)==null?void 0:qh.alcohol,target:null,unit:"",norm:"Редко",editable:!0},{id:"exercise_freq",code:"03_3_LIFE_EXERC_FREQ",name:"Тренировки",current:(Vh=i==null?void 0:i.lifestyle)==null?void 0:Vh.physical_activity,target:null,unit:"",norm:"3-5/нед",editable:!0},{id:"exercise_type",code:"03_4_LIFE_EXERC_TYPE",name:"Тип активности",current:(Yh=i==null?void 0:i.lifestyle)==null?void 0:Yh.exercise_type,target:null,unit:"",norm:"-",editable:!0},{id:"diet",code:"03_7_LIFE_DIET",name:"Питание",current:(Qh=i==null?void 0:i.lifestyle)==null?void 0:Qh.diet,target:null,unit:"",norm:"Сбалансир.",editable:!0}]},genetics:{title:"05 Генетика",color:"#7b1fa2",code:"05_GENE",attributes:[{id:"apoe",code:"04_1_GENE_APOE",name:"APOE",current:(Xh=i==null?void 0:i.genetics)==null?void 0:Xh.apoe,target:null,unit:"",norm:"e3/e3",editable:!0},{id:"mthfr",code:"04_2_GENE_MTHFR",name:"MTHFR",current:(Kh=i==null?void 0:i.genetics)==null?void 0:Kh.mthfr,target:null,unit:"",norm:"Нет",editable:!0},{id:"lactase",code:"04_3_GENE_LACTASE",name:"Лактаза",current:($h=i==null?void 0:i.genetics)==null?void 0:$h.lactase_persistence,target:null,unit:"",norm:"Да",editable:!0},{id:"brca",code:"04_4_GENE_BRCA",name:"BRCA1/2",current:(Zh=i==null?void 0:i.genetics)==null?void 0:Zh.brca_status,target:null,unit:"",norm:"Neg",editable:!0}]},medical:{title:"06 Медицина",color:"#c62828",code:"06_MED",attributes:[{id:"medications",code:"06_3_MED_MED",name:"Препараты",current:(Fh=(Jh=i==null?void 0:i.medical_history)==null?void 0:Jh.current_medications)==null?void 0:Fh.join(", "),target:null,unit:"",norm:"-",editable:!0},{id:"allergies",code:"06_4_MED_ALLR",name:"Аллергии",current:(Wh=i==null?void 0:i.medical_history)==null?void 0:Wh.allergies,target:null,unit:"",norm:"Нет",editable:!0},{id:"cv_history",code:"05_1_FAM_CVD",name:"ССЗ в семье",current:((Ih=i==null?void 0:i.medical_history)==null?void 0:Ih.cardiovascular_disease)==="yes"?"Есть":"Нет",target:null,unit:"",norm:"Нет",editable:!0},{id:"dm_history",code:"05_2_FAM_DM",name:"Диабет в семье",current:((em=i==null?void 0:i.medical_history)==null?void 0:em.diabetes)==="yes"?"Есть":"Нет",target:null,unit:"",norm:"Нет",editable:!0},{id:"family_history",code:"05_3_FAM_CA",name:"Онкология в семье",current:(tm=i==null?void 0:i.medical_history)==null?void 0:tm.family_history,target:null,unit:"",norm:"Нет",editable:!0}]}},Lv=u=>{const g=[];return Object.entries(an).forEach(([j,S])=>{S.biomarkers&&S.biomarkers.some(b=>b.toLowerCase().includes(u.toLowerCase())||u.toLowerCase().includes(b.toLowerCase()))&&g.push({code:j,...S})}),g},Pa=y.useRef(null);y.useRef(null);const oa=y.useRef(null),Ot=y.useRef(-1),ps=y.useRef(m);ps.current=m;const br=y.useRef();y.useEffect(()=>{br.current=rh});const jr=Nj,an={};Object.entries(ov.interventions).forEach(([u,g])=>{an[u]={code:u,name:g.name,category:g.category,color:g.color,impact:g.impact,regularity:g.regularity||"daily",type:g.type,evidence:g.evidence,probability:g.probability??.5,description:g.short_description,delivery_type:g.delivery_type||"chatbot",report_effort:g.report_effort||"light",sources:g.sources||"-",biomarkers:g.biomarkers||g.affects||[],schedule:g.schedule||null}});const sh={"01_1":["sleep","systolic_bp","diastolic_bp"],"02_1":["resting_hr","systolic_bp","diastolic_bp","cholesterol","weight"],"02_3":["resting_hr","systolic_bp","diastolic_bp","glucose"],"03_1":["stress","hrv","sleep"],"03_5":["sleep"],"04_1":["glucose","cholesterol","weight"],"04_2":["glucose"],"04_3":["glucose"],"04_6":["cholesterol"],"05_1":["vitamin_d"],"05_2":["cholesterol"],"05_3":["stress"],"07_1":["vitamin_d","ferritin","tsh"],"08_1":["hrv","resting_hr"]},Nr=(u,g=0,j=null)=>{const S=[];if(j&&j.days&&j.days.length>0)for(let b=g;b<=30;b++)j.days.includes(b%7)&&S.push(b);else switch(u){case"D":for(let b=g;b<=30;b++)S.push(b);break;case"W":for(let b=g;b<=30;b+=7)S.push(b);break;case"M":for(let b=g;b<=30;b+=30)S.push(b);break;case"once":default:S.push(g);break}return S},Sr=u=>{const g=jr[u];if(!g)return;const j=[];g.interventions.forEach(S=>{const b=an[S];if(!b||m.find(E=>E.code===S))return;Nr(b.regularity,0,b.schedule).forEach(E=>j.push({...b,day:E,protocolKey:u}))}),j.length>0&&_(S=>[...S,...j]),xv(u)},Hv=()=>{const u=[],g=new Set,j=S=>{S.forEach(b=>{const N=b.code||b;if(g.size>=10||g.has(N))return;const E=an[N];if(!E||m.find(A=>A.code===N))return;g.add(N),Nr(E.regularity,0,E.schedule).forEach(A=>u.push({...E,day:A,categoryKey:E.category}))})};G.length>0?G.forEach(S=>j(S.interventions)):j(Object.keys(an)),u.length>0&&_(S=>[...S,...u])},Uv=u=>{_(g=>g.filter(j=>j.code!==u))},ch={weight:"weight",bmi:"bmi",waist:"waist",bp_syst:"systolic_bp",bp_diast:"diastolic_bp",hr:"resting_hr",glucose:"glucose",tchol:"cholesterol",sleep:"sleep",stress:"stress",steps:"daily_steps",water:"water_l_day",vitd:"vitamin_d",ferritin:"ferritin",tsh:"tsh",hrv:"hrv"},Gv=()=>{const u={},g=[];Object.entries(Vt).forEach(([S,b])=>{(b.attributes||[]).forEach(N=>{const E=Q[N.id]??N.target;if(!(N.id==="age"||N.id==="sex")&&N.current!=null&&E!=null&&E>0){if(N.current>E*1.15){u[N.id]=`Высокий уровень (${N.current} ${N.unit||""})`;const D=ch[N.id];D&&g.push(D)}else if(N.current<E*.85){u[N.id]=`Низкий уровень (${N.current} ${N.unit||""})`;const D=ch[N.id];D&&g.push(D)}}})}),Qe(u),H(!0);const j=[];Object.entries(jr).forEach(([S,b])=>{(b.interventions||[]).some(E=>(sh[E]||[]).some(A=>g.includes(A)))&&j.push({...b,protocolKey:S})}),ee(j)},gs={TEST_001:{profile_id:"TEST_001",name:"Анна",photo:"03_Natalia_42_salad.png",demographics:{sex:"female",age:28,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:58,height_cm:168,bmi:20.2,waist_cm:72},vitals:{systolic_bp_mmhg:105,diastolic_bp_mmhg:68,resting_hr_bpm:64,hrv_ms:72,spo2_percent:98},labs:{glucose_mg_dl:88,total_cholesterol_mg_dl:175,hdl_mg_dl:55,ldl_mg_dl:100,triglycerides_mg_dl:120,hba1c_percent:5.2,crp_mg_l:.8,vitamin_d:32,ferritin:65,tsh:2.1},lifestyle:{sleep_hours:7.5,stress_level_0_10:3,daily_steps:8200,water_l_day:1.8,smoking:"Нет",alcohol:"Редко",physical_activity:"3-5/нед",exercise_type:"бег",diet:"средиземноморская"},genetics:{apoe:"e3/e3",mthfr:"Нет",lactase_persistence:"Да",brca_status:"Neg"},medical_history:{current_medications:[],allergies:"Нет",cardiovascular_disease:"no",diabetes:"no",family_history:"Нет"},digital_twin_scores:{current_stars:840,health_risk_score:18,risk_level:"low"}},TEST_002:{profile_id:"TEST_002",name:"Михаил",photo:"10_Alex_48_soup.png",demographics:{sex:"male",age:42,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:96,height_cm:182,bmi:31.2,waist_cm:104},vitals:{systolic_bp_mmhg:142,diastolic_bp_mmhg:91,resting_hr_bpm:78,hrv_ms:38,spo2_percent:96},labs:{glucose_mg_dl:112,total_cholesterol_mg_dl:245,hdl_mg_dl:38,ldl_mg_dl:160,triglycerides_mg_dl:210,hba1c_percent:5.9,crp_mg_l:3.2,vitamin_d:18,ferritin:140,tsh:3.8},lifestyle:{sleep_hours:6,stress_level_0_10:7,daily_steps:4200,water_l_day:1.2,smoking:"Курит",alcohol:"Регулярно",physical_activity:"0-1/нед",diet:"смешанная"},genetics:{apoe:"e3/e4",mthfr:"Гетерозигота",lactase_persistence:"Да",brca_status:"Neg"},medical_history:{current_medications:["статины"],allergies:"Нет",cardiovascular_disease:"yes",diabetes:"no",family_history:"ИБС у отца"},digital_twin_scores:{current_stars:210,health_risk_score:52,risk_level:"high"}},TEST_003:{profile_id:"TEST_003",name:"Елена",photo:"16_Anastasia_37_street.png",demographics:{sex:"female",age:34,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:64,height_cm:170,bmi:22.1,waist_cm:76},vitals:{systolic_bp_mmhg:118,diastolic_bp_mmhg:76,resting_hr_bpm:70,hrv_ms:55,spo2_percent:98},labs:{glucose_mg_dl:95,total_cholesterol_mg_dl:200,hdl_mg_dl:52,ldl_mg_dl:120,triglycerides_mg_dl:140,hba1c_percent:5.4,crp_mg_l:1.2,vitamin_d:24,ferritin:80,tsh:2.8},lifestyle:{sleep_hours:7,stress_level_0_10:5,daily_steps:6500,water_l_day:1.5,smoking:"Нет",alcohol:"По праздникам",physical_activity:"2-3/нед",exercise_type:"йога",diet:"средиземноморская"},genetics:{apoe:"e3/e3",mthfr:"Нет",lactase_persistence:"Да",brca_status:"Neg"},medical_history:{current_medications:[],allergies:"Нет",cardiovascular_disease:"no",diabetes:"no",family_history:"Нет"},digital_twin_scores:{current_stars:650,health_risk_score:28,risk_level:"medium"}},P005:{profile_id:"P005",name:"Дмитрий",photo:"05_Дмитрий_55_notepad.png",demographics:{sex:"male",age:57,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:88,height_cm:178,bmi:27.8,waist_cm:98},vitals:{systolic_bp_mmhg:135,diastolic_bp_mmhg:88,resting_hr_bpm:72,hrv_ms:35,spo2_percent:96},labs:{glucose_mg_dl:105,total_cholesterol_mg_dl:220,hdl_mg_dl:42,ldl_mg_dl:140,triglycerides_mg_dl:180,hba1c_percent:5.7,crp_mg_l:2.1,vitamin_d:20,ferritin:130,tsh:2.8},lifestyle:{sleep_hours:6.5,stress_level_0_10:6,daily_steps:5e3,water_l_day:1.4,smoking:"Бросил",alcohol:"1-2/нед",physical_activity:"1-2/нед",diet:"смешанная"},genetics:{apoe:"e3/e3",mthfr:"Гетерозигота",lactase_persistence:"Нет",brca_status:"Neg"},medical_history:{current_medications:["гипотензивные"],allergies:"Нет",cardiovascular_disease:"yes",diabetes:"no",family_history:"Гипертония"},digital_twin_scores:{current_stars:450,health_risk_score:42,risk_level:"medium"}},P007:{profile_id:"P007",name:"Иван",photo:"07_Ivan_13_chips.png",demographics:{sex:"male",age:13,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:48,height_cm:158,bmi:19.2,waist_cm:65},vitals:{systolic_bp_mmhg:108,diastolic_bp_mmhg:68,resting_hr_bpm:78,hrv_ms:58,spo2_percent:99},labs:{glucose_mg_dl:82,total_cholesterol_mg_dl:140,hdl_mg_dl:48,ldl_mg_dl:80,triglycerides_mg_dl:90,hba1c_percent:4.8,crp_mg_l:.5,vitamin_d:30,ferritin:50,tsh:1.9},lifestyle:{sleep_hours:9,stress_level_0_10:2,daily_steps:1e4,water_l_day:1,smoking:"Нет",alcohol:"Нет",physical_activity:"5-7/нед",diet:"домашняя"},genetics:{apoe:"e3/e3",mthfr:"Нет",lactase_persistence:"Да",brca_status:"Neg"},medical_history:{current_medications:[],allergies:"Нет",cardiovascular_disease:"no",diabetes:"no",family_history:"Нет"},digital_twin_scores:{current_stars:950,health_risk_score:10,risk_level:"low"}},P014:{profile_id:"P014",name:"Екатерина",photo:"14_Ekaterina_39_wearable.png",demographics:{sex:"female",age:39,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:60,height_cm:170,bmi:20.8,waist_cm:72},vitals:{systolic_bp_mmhg:115,diastolic_bp_mmhg:74,resting_hr_bpm:66,hrv_ms:58,spo2_percent:98},labs:{glucose_mg_dl:90,total_cholesterol_mg_dl:180,hdl_mg_dl:58,ldl_mg_dl:105,triglycerides_mg_dl:115,hba1c_percent:5.1,crp_mg_l:.9,vitamin_d:30,ferritin:70,tsh:2.2},lifestyle:{sleep_hours:7.8,stress_level_0_10:4,daily_steps:8e3,water_l_day:1.7,smoking:"Нет",alcohol:"Редко",physical_activity:"3-4/нед",exercise_type:"бег",diet:"средиземноморская"},genetics:{apoe:"e3/e3",mthfr:"Нет",lactase_persistence:"Да",brca_status:"Neg"},medical_history:{current_medications:[],allergies:"Нет",cardiovascular_disease:"no",diabetes:"no",family_history:"Нет"},digital_twin_scores:{current_stars:780,health_risk_score:22,risk_level:"low"}},P019b:{profile_id:"P019b",name:"Стас",photo:"19_Stas_35_dog_bike.png",demographics:{sex:"male",age:35,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:82,height_cm:178,bmi:24.8,waist_cm:84},vitals:{systolic_bp_mmhg:125,diastolic_bp_mmhg:80,resting_hr_bpm:68,hrv_ms:50,spo2_percent:98},labs:{glucose_mg_dl:92,total_cholesterol_mg_dl:190,hdl_mg_dl:48,ldl_mg_dl:115,triglycerides_mg_dl:135,hba1c_percent:5.3,crp_mg_l:1,vitamin_d:28,ferritin:90,tsh:2.4},lifestyle:{sleep_hours:7.2,stress_level_0_10:4,daily_steps:7500,water_l_day:1.8,smoking:"Нет",alcohol:"Редко",physical_activity:"3-4/нед",exercise_type:"велосипед",diet:"сбалансированная"},genetics:{apoe:"e3/e3",mthfr:"Нет",lactase_persistence:"Да",brca_status:"Neg"},medical_history:{current_medications:[],allergies:"Нет",cardiovascular_disease:"no",diabetes:"no",family_history:"Нет"},digital_twin_scores:{current_stars:680,health_risk_score:26,risk_level:"low"}},P022:{profile_id:"P022",name:"Варя",photo:"22_Varya_30_yoga.png",demographics:{sex:"female",age:30,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:57,height_cm:166,bmi:20.2,waist_cm:70},vitals:{systolic_bp_mmhg:110,diastolic_bp_mmhg:70,resting_hr_bpm:65,hrv_ms:62,spo2_percent:99},labs:{glucose_mg_dl:86,total_cholesterol_mg_dl:165,hdl_mg_dl:62,ldl_mg_dl:95,triglycerides_mg_dl:100,hba1c_percent:5,crp_mg_l:.6,vitamin_d:35,ferritin:60,tsh:2},lifestyle:{sleep_hours:8,stress_level_0_10:3,daily_steps:9e3,water_l_day:2,smoking:"Нет",alcohol:"Редко",physical_activity:"4-5/нед",exercise_type:"йога",diet:"вегетарианская"},genetics:{apoe:"e3/e3",mthfr:"Нет",lactase_persistence:"Да",brca_status:"Neg"},medical_history:{current_medications:[],allergies:"Нет",cardiovascular_disease:"no",diabetes:"no",family_history:"Нет"},digital_twin_scores:{current_stars:900,health_risk_score:14,risk_level:"low"}},P025:{profile_id:"P025",name:"Катя",photo:"25_Katya_29_office.png",demographics:{sex:"female",age:29,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:59,height_cm:167,bmi:20.7,waist_cm:71},vitals:{systolic_bp_mmhg:110,diastolic_bp_mmhg:70,resting_hr_bpm:66,hrv_ms:60,spo2_percent:99},labs:{glucose_mg_dl:88,total_cholesterol_mg_dl:170,hdl_mg_dl:60,ldl_mg_dl:98,triglycerides_mg_dl:105,hba1c_percent:5.1,crp_mg_l:.7,vitamin_d:32,ferritin:62,tsh:2.1},lifestyle:{sleep_hours:7.5,stress_level_0_10:4,daily_steps:7e3,water_l_day:1.6,smoking:"Нет",alcohol:"Редко",physical_activity:"2-3/нед",exercise_type:"фитнес",diet:"сбалансированная"},genetics:{apoe:"e3/e3",mthfr:"Нет",lactase_persistence:"Да",brca_status:"Neg"},medical_history:{current_medications:[],allergies:"Нет",cardiovascular_disease:"no",diabetes:"no",family_history:"Нет"},digital_twin_scores:{current_stars:640,health_risk_score:24,risk_level:"low"}},P008:{profile_id:"P008",name:"Галина",photo:"08_Galina_75_Vika_9_balcony.png",demographics:{sex:"female",age:75,ethnicity_or_background:"европеоидная"},anthropometrics:{weight_kg:68,height_cm:160,bmi:26.6,waist_cm:86},vitals:{systolic_bp_mmhg:148,diastolic_bp_mmhg:88,resting_hr_bpm:74,hrv_ms:28,spo2_percent:94},labs:{glucose_mg_dl:110,total_cholesterol_mg_dl:235,hdl_mg_dl:40,ldl_mg_dl:155,triglycerides_mg_dl:195,hba1c_percent:6,crp_mg_l:3.5,vitamin_d:14,ferritin:105,tsh:3.5},lifestyle:{sleep_hours:6,stress_level_0_10:3,daily_steps:3500,water_l_day:1.2,smoking:"Нет",alcohol:"Нет",physical_activity:"1/нед",diet:"домашняя"},genetics:{apoe:"e3/e4",mthfr:"Гетерозигота",lactase_persistence:"Нет",brca_status:"Neg"},medical_history:{current_medications:["гипотензивные","статины"],allergies:"Нет",cardiovascular_disease:"yes",diabetes:"yes",family_history:"ИБС, СД 2 типа"},digital_twin_scores:{current_stars:320,health_risk_score:55,risk_level:"high"}}};y.useEffect(()=>{if(!e){s(null),o(!1);return}o(!0);const u=gs[e];fetch(`/api/profiles/${e}`).then(g=>{if(!g.ok)throw new Error("HTTP "+g.status);return g.json()}).then(g=>{var j,S;s(g.profile||null),Y(((S=(j=g.profile)==null?void 0:j.digital_twin_scores)==null?void 0:S.current_stars)||0),o(!1)}).catch(()=>{var g;u?(s(u),Y(((g=u.digital_twin_scores)==null?void 0:g.current_stars)||0)):s(null),o(!1)});try{const g=JSON.parse(localStorage.getItem("healora_param_overrides_"+e)||"{}"),j=JSON.parse(localStorage.getItem("healora_param_history_"+e)||"{}");hs(g),us(j),Xl(!1)}catch{hs({}),us({}),Xl(!1)}},[e]);const wr=y.useRef(0),vs=y.useRef(null);y.useEffect(()=>{wr.current=r},[r]),y.useEffect(()=>{nh.current=M},[M]);const Pv=y.useCallback(u=>{if(!oa.current||f)return;const g=oa.current.getBoundingClientRect(),S=(u.clientX-g.left)/g.width,b=Math.max(0,Math.min(30,Math.round(S*30)));d(b),Ot.current<0&&(Ot.current=wr.current);const N=Ot.current+1;for(let E=N;E<=b;E++)ps.current.forEach(D=>{D.day===E&&br.current(D,E)});b>Ot.current&&(Ot.current=b)},[f]),qv=y.useCallback(u=>{u.preventDefault();const g=u.dataTransfer.getData("application/json");if(!g||!oa.current)return;const j=JSON.parse(g),S=oa.current.getBoundingClientRect(),N=(u.clientX-S.left)/S.width,E=Math.max(0,Math.min(30,Math.round(N*30)));_(D=>{const A=D.filter(K=>K.code!==j.code),V=Nr(j.regularity,E,j.schedule).map(K=>({...j,day:K}));return[...A,...V]}),O(D=>({...D,[j.code]:{state:0,day:E}}))},[]);y.useCallback(u=>{f||(u.stopPropagation(),k(!0))},[f]),y.useEffect(()=>{const u=j=>{if(!C||!oa.current)return;const S=oa.current.getBoundingClientRect(),N=Math.max(0,Math.min(j.clientX-S.left,S.width))/S.width,E=Math.max(0,Math.min(30,Math.round(N*30)));d(E);const D=Ot.current+1;for(let A=D;A<=E;A++)ps.current.forEach(U=>{U.day===A&&br.current(U,A)});E>Ot.current&&(Ot.current=E)},g=()=>{k(!1)};return C&&(Ot.current<0&&(Ot.current=wr.current),window.addEventListener("mousemove",u),window.addEventListener("mouseup",g)),()=>{window.removeEventListener("mousemove",u),window.removeEventListener("mouseup",g)}},[C]);const rh=y.useCallback((u,g)=>{if(Math.random()<(u.probability??.5)){const S=Math.round(u.impact*10);Y(b=>b+S),z(b=>[...b,{day:g,code:u.code,name:u.name,state:"Активировано",starsGained:S}])}else z(S=>[...S,{day:g,code:u.code,name:u.name,state:"Игнорировано",starsGained:0}])},[]),oh=()=>{h||(p(!0),x(!0),d(0),z([]),Ot.current=0,Pa.current=setInterval(()=>{d(u=>{const g=u+1;return g>30?(clearInterval(Pa.current),p(!1),x(!1),30):(ps.current.forEach(j=>{j.day===g&&rh(j,g)}),g)})},100/nh.current))},dh=()=>{Pa.current&&clearInterval(Pa.current),p(!1),x(!1)};y.useEffect(()=>()=>{Pa.current&&clearInterval(Pa.current)},[]);const Vv=[{text:"✅ Готово!",weight:25},{text:"📤 Отправил!",weight:15},{text:"⏳ В следующий раз",weight:10},{text:"👍 Сделано",weight:20},{text:"📝 Записал",weight:10},{text:"✅ Выполнено",weight:15},{text:"📊 Готово, данные отправил",weight:5}],Yv=u=>{const g=u.reduce((S,b)=>S+b.weight,0);let j=Math.random()*g;for(const S of u)if(j-=S.weight,j<=0)return S.text;return u[0].text};y.useEffect(()=>{if(!or||L.length===0)return;const u=L[L.length-1];if(sa.some(D=>D.id===`${u.day}_${u.code}`))return;const j=an[u.code],S=(j==null?void 0:j.regularity)||u.regularity||"D",b={D:"23:59",W:"ПН 23:59",M:"1-е число",Y:"31.12 23:59",P:"—"},N={id:`${u.day}_${u.code}`,type:"intervention",day:u.day,code:u.code,name:u.name,state:u.state,category:(j==null?void 0:j.category)||u.category,regularity:S,deadline:b[S]||"23:59",done:!1,skipped:!1,time:`${String(6+u.day*7%14).padStart(2,"0")}:${String(u.day*17%60).padStart(2,"0")}`};qt(D=>[...D,N]);const E=setTimeout(()=>{qt(D=>D.map(A=>A.id===N.id?{...A,response:Yv(Vv)}:A))},1200+Math.random()*800);return()=>clearTimeout(E)},[L,or,an]),y.useEffect(()=>{vs.current&&(vs.current.scrollTop=vs.current.scrollHeight)},[sa]);const Qv=[{name:"Пить 2л воды",code:"TASK_01",category:"food",points:10},{name:"Прогулка 30 мин",code:"TASK_02",category:"physical",points:15},{name:"Лечь до 23:00",code:"TASK_03",category:"sleep",points:20},{name:"Медитация 10 мин",code:"TASK_04",category:"mental",points:10},{name:"Записать приемы пищи",code:"TASK_05",category:"food",points:5},{name:"Измерить пульс",code:"TASK_06",category:"medical",points:15}],uh=()=>{const u=ql.current?ql.current.value.trim():"";if(!u)return;if(ql.current&&(ql.current.value=""),Ra==="gigachat"){ur(j=>[...j,{id:Date.now(),text:u,user:!0,time:new Date().toLocaleTimeString()}]),Ou(!0),fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:u,profile:e})}).then(j=>j.json()).then(j=>{j.reply&&ur(S=>[...S,{id:Date.now(),text:j.reply,user:!1,time:new Date().toLocaleTimeString()}])}).catch(()=>{ur(j=>[...j,{id:Date.now(),text:"Ошибка соединения с GigaChat",user:!1,time:new Date().toLocaleTimeString()}])}).finally(()=>Ou(!1));return}qt(j=>[...j,{id:`chat_${Date.now()}`,day:r,text:u,user:!0,time:new Date().toLocaleTimeString()}]),/задач|реком|совет|предлож|делать|план|тренировк|упражнен/i.test(u)&&setTimeout(()=>{Qv.forEach((j,S)=>{qt(b=>[...b,{id:`chat_task_${Date.now()}_${S}`,type:"intervention",day:r,code:j.code,name:j.name,category:j.category,regularity:"D",deadline:"23:59",done:!1,skipped:!1,time:new Date().toLocaleTimeString()}])})},500)},hh=u=>{if(!t)return!1;const g=sh[t.code];return g?g.some(j=>u.toLowerCase().includes(j.toLowerCase())):!1};y.useEffect(()=>{if(!i)return;const u={};Object.values(mh||{}).forEach(g=>{(g.attributes||[]).forEach(j=>{j.id!=="stars"&&j.target!=null&&(u[j.id]=j.target)})}),I(g=>Object.keys(g).length===0?u:g)},[i]),y.useEffect(()=>{if(!lr||!e)return;const u=En??r;fetch(`/api/diary/${e}/${u}`).then(g=>{if(!g.ok)throw new Error("No diary");return g.json()}).then(g=>{const j=ra(u);g.meals&&(j.meals=g.meals.map(S=>({...j.meals.find(N=>N.type===S.type),...S,ndi:S.ndi?Number(S.ndi):null}))),g.water_ml!=null&&(j.waterMl=g.water_ml),g.mood&&(j.mood={...j.mood,...g.mood}),g.voice_note&&(j.voiceNote=g.voice_note),g.comment&&(j.comment=g.comment),We(j)}).catch(()=>{We(ra(u))})},[lr,En,e]);const mh=i?{profile:{title:"Профиль",color:"#f57c00",stars:((nm=i.digital_twin_scores)==null?void 0:nm.current_stars)||0,subscription:"Premium",attributes:[{id:"stars",name:"Звезды",start:0,current:((am=i.digital_twin_scores)==null?void 0:am.current_stars)||0,target:2e3,unit:"очков"},{id:"risk",name:"Оценка риска",start:(lm=i.digital_twin_scores)==null?void 0:lm.health_risk_score,current:(im=i.digital_twin_scores)==null?void 0:im.health_risk_score,target:15,unit:"/100"}]},demographics:{title:"Демография",color:"#6b21c8",attributes:[{id:"01_4",name:"Вес",start:(sm=i.anthropometrics)==null?void 0:sm.weight_kg,current:(cm=i.anthropometrics)==null?void 0:cm.weight_kg,target:70,unit:"кг"},{id:"01_5",name:"ИМТ",start:(rm=i.anthropometrics)==null?void 0:rm.bmi,current:(om=i.anthropometrics)==null?void 0:om.bmi,target:22,unit:"кг/м²"},{id:"01_6",name:"Талия",start:(dm=i.anthropometrics)==null?void 0:dm.waist_cm,current:(um=i.anthropometrics)==null?void 0:um.waist_cm,target:80,unit:"см"}]},biomarkers:{title:"Биомаркеры",color:"#1976d2",attributes:[{id:"02_1",name:"АД систолическое",start:(hm=i.vitals)==null?void 0:hm.systolic_bp_mmhg,current:(mm=i.vitals)==null?void 0:mm.systolic_bp_mmhg,target:120,unit:"мм рт.ст."},{id:"02_3",name:"ЧСС",start:(fm=i.vitals)==null?void 0:fm.resting_hr_bpm,current:(pm=i.vitals)==null?void 0:pm.resting_hr_bpm,target:72,unit:"уд/мин"},{id:"02_6",name:"Глюкоза",start:(gm=i.labs)==null?void 0:gm.glucose_mg_dl,current:(vm=i.labs)==null?void 0:vm.glucose_mg_dl,target:100,unit:"мг/дл"},{id:"02_8",name:"Общий холестерин",start:(ym=i.labs)==null?void 0:ym.total_cholesterol_mg_dl,current:(xm=i.labs)==null?void 0:xm.total_cholesterol_mg_dl,target:200,unit:"мг/дл"}]},lifestyle:{title:"Образ жизни",color:"#388e3c",attributes:[{id:"03_5",name:"Сон",start:(_m=i.lifestyle)==null?void 0:_m.sleep_hours,current:(bm=i.lifestyle)==null?void 0:bm.sleep_hours,target:7.5,unit:"часов"},{id:"03_6",name:"Стресс",start:(jm=i.lifestyle)==null?void 0:jm.stress_level_0_10,current:(Nm=i.lifestyle)==null?void 0:Nm.stress_level_0_10,target:3,unit:"/10"},{id:"03_8",name:"Шаги",start:(Sm=i.lifestyle)==null?void 0:Sm.daily_steps,current:(wm=i.lifestyle)==null?void 0:wm.daily_steps,target:1e4,unit:"/день"},{id:"03_9",name:"Вода",start:(Cm=i.lifestyle)==null?void 0:Cm.water_l_day,current:(Em=i.lifestyle)==null?void 0:Em.water_l_day,target:2.5,unit:"л/день"}]}}:null,Xv=(u,g)=>{I(j=>({...j,[u]:g}))},Kv=(u,g)=>{const j=g+1;I(S=>({...S,[u]:j}))},$v=(u,g)=>{const j=(g||0)-1;I(S=>({...S,[u]:j}))},Zv=(u,g,j)=>{Wt(u+"_"+g),Eu(j!=null?String(j):"")},fh=(u,g)=>{var A,U,V;if(Wt(null),!((A=Vt[u])==null?void 0:A.attributes.find(K=>K.id===g)))return;const S=parseFloat(Ic),b=isNaN(S)?Ic:S,N=new Date().toISOString(),E={...te,[g]:b},D={...ds};if(D[g]||(D[g]=[]),D[g]=[...D[g],{value:b,timestamp:N}],g==="weight"||g==="height"){const K=E.weight??((U=i==null?void 0:i.anthropometrics)==null?void 0:U.weight_kg),ce=E.height??((V=i==null?void 0:i.anthropometrics)==null?void 0:V.height_cm);if(K&&ce&&ce>0){const pe=Math.round(K/(ce/100)**2*10)/10;E.bmi=pe,D.bmi||(D.bmi=[]),D.bmi=[...D.bmi,{value:pe,timestamp:N}]}}hs(E),us(D),Xl(!0),localStorage.setItem("healora_param_overrides_"+e,JSON.stringify(E)),localStorage.setItem("healora_param_history_"+e,JSON.stringify(D))},Cr=u=>u==null||u===""?"—":typeof u=="boolean"?u?"Да":"Нет":u,Kl=u=>u.id in te?te[u.id]:u.current,Jv=(u,g)=>{if(!u||!g)return[];const j=Vt[g];if(!j)return[];const S=[],b={age:["возраст","лет"],sex:["пол","gender"],height:["рост","высота","длина тела"],weight:["вес","масса","вешу"],waist:["талия","обхват талии","окружность талии"],bmi:["ибт","имт","индекс массы тела"],ethnicity:["этническая","национальность","раса"],bp_syst:["ад систолическое","систолическое","верхнее"],bp_diast:["ад диастолическое","диастолическое","нижнее"],hr:["пульс","чсс","сердцебиение","частота пульса"],hrv:["hrv"],spo2:["сатурация","spo2","кислород","насыщение"],glucose:["глюкоза","сахар","глюкоза крови"],hba1c:["hba1c","гликированный","гемоглобин"],tchol:["холестерин","холестерин общий","общий холестерин"],hdl:["лпвп","хороший холестерин","липопротеины высокой"],ldl:["лпнп","плохой холестерин","липопротеины низкой"],tg:["триглицериды","триглицерид"],crp:["crp","срб","с-реактивный"],vitd:["витамин d","витамин д","vitamin d","25-oh"],ferritin:["ферритин"],tsh:["ттг","tsh","тиреотропный"],sleep:["сон","сплю","ночной сон"],stress:["стресс","уровень стресса"],steps:["шаги","шагов"],water:["вода","воды","пью воды"],smoking:["курение","курю","сигареты"],alcohol:["алкоголь","алкоголя"],exercise_freq:["тренировки","занятия","спорт","физическая активность"],exercise_type:["тип активности","вид спорта","активность"],diet:["питание","диета","рацион"],apoe:["apoe"],mthfr:["mthfr"],lactase:["лактаза","lactase"],brca:["brca","brca1","brca2"],medications:["препараты","лекарства","медикаменты","принимаю"],allergies:["аллергии","аллергия","аллергические"],cv_history:["ссз","сердечно-сосудистые","сердце","сосуды"],dm_history:["диабет","сахарный диабет"],family_history:["онкология","рак","опухоли"]},N=j.attributes.map(A=>A.id),E={};return N.forEach(A=>{b[A]&&(E[A]=b[A])}),u.split(/[,.;:]+/).map(A=>A.trim()).filter(Boolean).forEach(A=>{const U=A.toLowerCase().trim();if(U){if(E.bp_syst||E.bp_diast){const V=U.match(/(?:ад|давление)\s*[:]?\s*(\d{2,3})\s*(?:\/|на|из|к)\s*(\d{2,3})/i);if(V){const K=parseInt(V[1]),ce=parseInt(V[2]);K>50&&K<250&&ce>30&&ce<150&&(N.includes("bp_syst")&&S.push({attrId:"bp_syst",value:K,label:"АД систолическое",displayValue:`${K} мм рт.ст.`}),N.includes("bp_diast")&&S.push({attrId:"bp_diast",value:ce,label:"АД диастолическое",displayValue:`${ce} мм рт.ст.`}));return}}for(const[V,K]of Object.entries(E)){const ce=j.attributes.find($=>$.id===V);if(!ce)continue;const pe=K.find($=>U.includes($));if(!pe)continue;const ie=U.match(new RegExp(`${pe}[\\s:]*([+-]?\\d+(?:[.,]\\d+)?)`,"i"));if(ie){const $=parseFloat(ie[1].replace(",",".")),oe=ce.unit?`${$} ${ce.unit}`:String($);S.push({attrId:V,value:$,label:ce.name,displayValue:oe});continue}const de=U.match(new RegExp(`${pe}[\\s:]+(.+)`,"i"));if(de){const $=de[1].trim().replace(/\s+/g," ").replace(/[.,;]+$/,"");$&&!/^[+-]?\d+(?:[.,]\d+)?$/.test($)&&S.push({attrId:V,value:$,label:ce.name,displayValue:$})}}}}),S},Fv=(u,g)=>{var E,D;const j=new Date().toISOString(),S={...te},b={...ds},N=new Set(g.map(A=>A.attrId));if(g.forEach(({attrId:A,value:U})=>{S[A]=U,b[A]||(b[A]=[]),b[A]=[...b[A],{value:U,timestamp:j}]}),N.has("weight")||N.has("height")){const A=S.weight??((E=i==null?void 0:i.anthropometrics)==null?void 0:E.weight_kg),U=S.height??((D=i==null?void 0:i.anthropometrics)==null?void 0:D.height_cm);if(A&&U&&U>0){const V=Math.round(A/(U/100)**2*10)/10;S.bmi=V,b.bmi||(b.bmi=[]),b.bmi=[...b.bmi,{value:V,timestamp:j}]}}hs(S),us(b),Xl(!0),localStorage.setItem("healora_param_overrides_"+e,JSON.stringify(S)),localStorage.setItem("healora_param_history_"+e,JSON.stringify(b))},Wv=async()=>{var g,j,S,b;if(!i)return;const u={...i,anthropometrics:{...i.anthropometrics,weight_kg:te.weight??((g=i.anthropometrics)==null?void 0:g.weight_kg),height_cm:te.height??((j=i.anthropometrics)==null?void 0:j.height_cm),bmi:te.bmi??((S=i.anthropometrics)==null?void 0:S.bmi),waist_cm:te.waist??((b=i.anthropometrics)==null?void 0:b.waist_cm)},vitals:i.vitals?{...i.vitals,systolic_bp_mmhg:te.bp_syst??i.vitals.systolic_bp_mmhg,diastolic_bp_mmhg:te.bp_diast??i.vitals.diastolic_bp_mmhg,resting_hr_bpm:te.hr??i.vitals.resting_hr_bpm,hrv_ms:te.hrv??i.vitals.hrv_ms,spo2_percent:te.spo2??i.vitals.spo2_percent}:void 0,labs:i.labs?{...i.labs,glucose_mg_dl:te.glucose??i.labs.glucose_mg_dl,hba1c_percent:te.hba1c??i.labs.hba1c_percent,total_cholesterol_mg_dl:te.tchol??i.labs.total_cholesterol_mg_dl,hdl_mg_dl:te.hdl??i.labs.hdl_mg_dl,ldl_mg_dl:te.ldl??i.labs.ldl_mg_dl,triglycerides_mg_dl:te.tg??i.labs.triglycerides_mg_dl,crp_mg_l:te.crp??i.labs.crp_mg_l,vitamin_d:te.vitd??i.labs.vitamin_d,ferritin:te.ferritin??i.labs.ferritin,tsh:te.tsh??i.labs.tsh}:void 0,lifestyle:i.lifestyle?{...i.lifestyle,sleep_hours:te.sleep??i.lifestyle.sleep_hours,stress_level_0_10:te.stress??i.lifestyle.stress_level_0_10,daily_steps:te.steps??i.lifestyle.daily_steps,water_l_day:te.water??i.lifestyle.water_l_day,smoking:te.smoking??i.lifestyle.smoking,alcohol:te.alcohol??i.lifestyle.alcohol,physical_activity:te.exercise_freq??i.lifestyle.physical_activity,exercise_type:te.exercise_type??i.lifestyle.exercise_type,diet:te.diet??i.lifestyle.diet}:void 0,demographics:i.demographics?{...i.demographics,age:te.age??i.demographics.age,sex:te.sex??i.demographics.sex,ethnicity_or_background:te.ethnicity??i.demographics.ethnicity_or_background}:void 0};try{let N=await fetch(`/api/profiles/${i.profile_id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});if(N.status===404&&(N=await fetch("/api/profiles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)})),!N.ok)throw new Error(`HTTP ${N.status}`);Xl(!1)}catch(N){console.error("Save failed:",N),alert("Ошибка сохранения: бэкенд недоступен")}},Iv=u=>{const g=Vt[u];if(!g)return"Продиктуйте значения параметров.";const S={demographics:{age:"35",sex:"мужской",height:"175",weight:"70",waist:"80",ethnicity:"европеоид"},vitals:{bp_syst:"120",bp_diast:"80",hr:"72",hrv:"60",spo2:"98"},labs:{glucose:"90",hba1c:"5.5",tchol:"180",hdl:"60",ldl:"100",tg:"150",crp:"1",vitd:"40",ferritin:"80",tsh:"2.5"},lifestyle:{sleep:"8",stress:"3",steps:"10000",water:"2",smoking:"нет",alcohol:"редко",exercise_freq:"3",exercise_type:"бег",diet:"средиземноморская"},genetics:{apoe:"e3/e3",mthfr:"нет",lactase:"да",brca:"отрицательно"},medical:{medications:"лизиноприл",allergies:"нет",cv_history:"нет",dm_history:"нет",family_history:"нет"}}[u]||{};return`Продиктуйте значения параметров: «${g.attributes.map(N=>{const E=S[N.id];return E?`${N.name} ${E}${N.unit?" "+N.unit:""}`:N.name}).join("», «")}»`};return a.jsxs("div",{className:"digital-twin-container",children:[!e&&a.jsxs("div",{className:"no-profile-selected",children:[a.jsxs("svg",{className:"arrow-left-animated",viewBox:"0 0 24 24",width:"48",height:"48",fill:"none",stroke:"#9c27b0",strokeWidth:"1.5",children:[a.jsx("line",{x1:"20",y1:"12",x2:"4",y2:"12"}),a.jsx("polyline",{points:"10 6 4 12 10 18"})]}),a.jsx("p",{children:"Выберите профиль на левой панели"})]}),e&&c&&a.jsx("div",{className:"loading",children:"Загрузка данных профиля..."}),i&&mh&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"daw-container",children:[a.jsxs("div",{className:"daw-header",children:[a.jsx("div",{className:"daw-title",children:a.jsxs("div",{className:"interv-tabs",children:[a.jsx("button",{className:`interv-tab ${T==="protocols"?"active":""}`,onClick:()=>Z("protocols"),children:"Протоколы"}),a.jsx("button",{className:`interv-tab ${T==="interventions"?"active":""}`,onClick:()=>Z("interventions"),children:"Интервенции"})]})}),a.jsxs("div",{className:"daw-controls",children:[a.jsxs("button",{className:"daw-btn",onClick:()=>{_([]),e&&zv(e)},title:"Очистить план",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("polyline",{points:"3 6 5 6 21 6"}),a.jsx("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]}),"Очистить"]}),a.jsx("button",{className:"daw-btn",onClick:f?dh:oh,children:f?"Стоп":"Старт"}),!f&&a.jsxs("div",{className:"speed-control",children:[a.jsx("span",{className:"speed-label",children:"x"}),[1,2,5,10].map(u=>a.jsx("button",{className:`speed-btn ${M===u?"active":""}`,onClick:()=>v(u),children:u},u))]}),a.jsx("div",{className:"daw-day-display",children:a.jsxs("span",{children:["День: ",r,"/30"]})}),a.jsxs("div",{className:"timeline-view-toggle",children:[a.jsx("button",{className:`view-btn ${dt==="days"?"active":""}`,onClick:()=>Ji("days"),children:"1д"}),a.jsx("button",{className:`view-btn ${dt==="weeks"?"active":""}`,onClick:()=>Ji("weeks"),children:"1н"}),a.jsx("button",{className:`view-btn ${dt==="phases"?"active":""}`,onClick:()=>Ji("phases"),children:"Фазы"})]})]})]}),T==="protocols"&&a.jsxs("div",{className:"protocols-panel",children:[a.jsxs("div",{className:"panel-header",children:[a.jsx("button",{className:"interv-tab active",children:"Протоколы"}),a.jsxs("div",{className:"panel-header-actions",children:[a.jsxs("span",{className:"protocols-count",children:[G.length," рекомендовано"]}),a.jsxs("button",{className:"daw-btn",onClick:()=>Z("interventions"),children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("polyline",{points:"9 18 15 12 9 6"})}),"Интервенции"]})]})]}),a.jsx("div",{className:"protocols-list",children:G.length>0?G.map(u=>a.jsxs("div",{className:"protocol-card",onClick:()=>{hr(u),Oa(!0)},children:[a.jsxs("div",{className:"protocol-card-header",children:[a.jsx("span",{className:"protocol-card-name",children:u.name}),a.jsx("button",{className:"daw-btn",title:"Добавить на таймлайн",onClick:g=>{g.stopPropagation(),Sr(u.protocolKey||u.key)},children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})})]}),a.jsx("span",{className:"protocol-card-category",children:u.category}),a.jsx("div",{className:"protocol-card-interventions",children:u.interventions.map(g=>a.jsx("span",{className:"protocol-card-chip",children:g},g))})]},u.protocolKey||u.key)):Object.entries(jr).slice(0,6).map(([u,g])=>a.jsxs("div",{className:"protocol-card",onClick:()=>{hr(g),Oa(!0)},children:[a.jsxs("div",{className:"protocol-card-header",children:[a.jsx("span",{className:"protocol-card-name",children:g.name}),a.jsx("button",{className:"daw-btn",title:"Добавить на таймлайн",onClick:j=>{j.stopPropagation(),Sr(u)},children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})})]}),a.jsx("span",{className:"protocol-card-category",children:g.category}),a.jsx("div",{className:"protocol-card-interventions",children:g.interventions.map(j=>a.jsx("span",{className:"protocol-card-chip",children:j},j))})]},u))})]}),T==="interventions"&&a.jsxs("div",{className:"tracks-container",children:[a.jsxs("div",{className:"tracks-header",onClick:()=>uv(u=>!u),children:[a.jsxs("span",{className:"tracks-header-title",children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",style:{transform:Fi?"rotate(-90deg)":"none",transition:"transform 0.2s"},children:a.jsx("polyline",{points:"6 9 12 15 18 9"})}),"График интервенций"]}),Fi&&a.jsx("span",{className:"tracks-header-summary",children:(()=>`${[...new Set(m.map(g=>g.code))].length} интервенций · ${m.length} всего`)()}),a.jsx("div",{className:"tracks-header-controls",onClick:u=>u.stopPropagation(),children:!Fi&&[["days","Дни"],["weeks","Недели"],["phases","Фазы"]].map(([u,g])=>a.jsx("button",{className:`tracks-view-btn ${dt===u?"active":""}`,onClick:()=>Ji(u),children:g},u))})]}),!Fi&&a.jsx("div",{className:"tracks",ref:oa,onClick:Pv,onDrop:qv,onDragOver:u=>{u.preventDefault()},children:a.jsxs("div",{className:"track-table",children:[a.jsxs("div",{className:"track-table-header",children:[a.jsx("span",{className:"th-cat",title:"Категория",children:"Кат"}),a.jsx("span",{className:"th-name",children:"Название"}),a.jsxs("span",{className:"th-track",children:[a.jsx("span",{className:"th-track-text",children:"График интервенций"}),a.jsxs("span",{className:"th-track-labels",children:[dt==="days"&&[0,5,10,15,20,25,30].map(u=>a.jsx("span",{className:"th-track-label",style:{left:`${u/30*100}%`},children:u},u)),dt==="weeks"&&[1,2,3,4,5,6,7,8,9,10,11,12,13].map(u=>a.jsxs("span",{className:"th-track-label",style:{left:`${(u-1)/13*100}%`},children:[u,"н"]},u)),dt==="phases"&&["Фаза 1","Фаза 2","Фаза 3","Фаза 4"].map((u,g)=>a.jsx("span",{className:"th-track-label",style:{left:`${g/4*100}%`},children:u},g))]})]})]}),(()=>{const u={sleep:{name:"Сон",color:"#2196f3",interventions:[]},physical:{name:"Физический",color:"#4caf50",interventions:[]},mental:{name:"Ментальный",color:"#9c27b0",interventions:[]},food:{name:"Питание",color:"#ff9800",interventions:[]},medical:{name:"мед",color:"#f44336",interventions:[]},supplement:{name:"Добавки",color:"#795548",interventions:[]}};m.forEach(D=>{const A=D.category||"food";u[A]&&(u[A].interventions.find(U=>U.code===D.code)||u[A].interventions.push(D))});const g=[];Object.entries(u).forEach(([D,A])=>{A.interventions.length>0&&A.interventions.forEach(U=>g.push({type:"intervention",clip:U,categoryKey:D}))}),g.sort((D,A)=>{const U=D.clip.code||"",V=A.clip.code||"",K=U.localeCompare(V);return K!==0?K:(D.clip.day||0)-(A.clip.day||0)});const j=new Set,S=g.filter(D=>j.has(D.clip.code)?!1:(j.add(D.clip.code),!0)),b=D=>({sleep:a.jsx("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}),physical:a.jsx("path",{d:"M18 20V10M12 20V4M6 20v-6"}),mental:a.jsx("circle",{cx:"12",cy:"12",r:"10"}),food:a.jsx("path",{d:"M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"}),medical:a.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"}),supplement:a.jsxs(a.Fragment,{children:[a.jsx("path",{d:"M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8.5 3.5 6.5L6.5 3.5 13.5 10.5C15.5 12.5 15.5 15.5 13.5 17.5L10.5 20.5Z"}),a.jsx("path",{d:"M18.5 7.5L21.5 4.5C23.5 2.5 23.5 -0.5 21.5 -2.5L18.5 -5.5 11.5 1.5C9.5 3.5 9.5 6.5 11.5 8.5L18.5 7.5Z"})]})})[D]||null,N=(D,A)=>{const U=dt==="days"?30:dt==="weeks"?13:4,V=D.regularity==="D"?1:D.regularity==="W"?dt==="weeks"?1:7:D.regularity==="M"?dt==="phases"?1:30:D.regularity==="Y"?U:7,K=Math.max(1,Math.round(V/A)),ce=[];let pe=dt==="days"?D.day:Math.ceil(D.day/(dt==="weeks"?7:22.5));for(;pe<=U;)ce.push(pe),pe+=K;return ce.slice(0,Math.ceil(U/K))},E=r/30;return a.jsx(a.Fragment,{children:S.map((D,A)=>{var ce;const U=D.clip,V=((ce=u[D.categoryKey])==null?void 0:ce.color)||U.color,K=N(U,1);return a.jsxs("div",{className:"track-row intervention-row",style:{borderLeftColor:V,background:`${V}08`},children:[a.jsx("div",{className:"td-cat",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:V,strokeWidth:"2",width:"12",height:"12",children:b(D.categoryKey)})}),a.jsxs("div",{className:"td-name",onClick:()=>{er(U),zl(!0)},title:"Клик для подробной информации",children:[a.jsx("span",{className:"interv-label-code",children:U.code}),a.jsx("span",{className:"interv-label-name",children:U.name})]}),a.jsx("div",{className:"td-track",children:a.jsxs("svg",{viewBox:"0 0 1000 42",width:"100%",height:"42",style:{display:"block"},children:[a.jsx("rect",{width:"1000",height:"42",fill:"#fafafa"}),[1,2,3,4,5,6,7,8,9].map(pe=>a.jsx("line",{x1:pe*100,y1:0,x2:pe*100,y2:42,stroke:"#eee",strokeWidth:1},pe)),a.jsx("rect",{x:0,y:0,width:E*1e3,height:42,fill:`${V}15`}),(()=>{const pe=new Set(L.filter(de=>de.state==="Активировано").map(de=>`${de.code}_${de.day}`)),ie=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];return K.map((de,$)=>{const oe=de/30*1e3,Yt=pe.has(`${U.code}_${de}`),Nt=U.schedule&&U.schedule.time;return a.jsxs("g",{style:{cursor:"pointer"},onClick:qa=>{qa.stopPropagation(),er(U),zl(!0)},children:[a.jsx("title",{children:`${U.name} — ${ie[de%7]} день ${de}${Nt?" "+U.schedule.time:""}`}),a.jsx("rect",{x:oe-12,y:4,width:24,height:24,rx:4,fill:"transparent"}),a.jsx("circle",{cx:oe,cy:16,r:4,fill:V,opacity:de<=r&&Yt?1:.2}),Nt&&a.jsx("text",{x:oe,y:30,textAnchor:"middle",fontSize:"7",fill:"#666",children:U.schedule.time})]},$)})})(),a.jsx("line",{x1:E*1e3,y1:0,x2:E*1e3,y2:42,stroke:"#d50000",strokeWidth:2})]})})]},`row-${U.code}`)})})})()]})})]}),(()=>{const u=m.length,g=m.filter(b=>b.day<=r).length,j=L.filter(b=>b.state==="Активировано").length,S=u-g;return a.jsxs("div",{className:`log-full ${B?"":"log-collapsed"}`,children:[a.jsxs("div",{className:"log-header",children:[a.jsxs("div",{className:"log-header-left",children:[a.jsx("h4",{children:"Профиль"}),a.jsx("span",{className:"log-count",children:L.length})]}),m.length>0&&a.jsxs("button",{className:"log-tasks-badge",onClick:()=>mr(!0),title:"Задачи в плане",children:["📋 ",new Set(m.map(b=>b.code)).size," задач"]}),a.jsxs("div",{className:"log-stats",children:[a.jsxs("span",{className:"log-stat",children:["Всего: ",u]}),a.jsxs("span",{className:"log-stat",children:["Пройдено: ",g]}),a.jsxs("span",{className:"log-stat log-stat-ok",children:["Сработало: ",j]}),a.jsxs("span",{className:"log-stat",children:["Осталось: ",S]})]}),a.jsxs("div",{className:"log-day-nav",children:[a.jsx("button",{className:"log-day-btn",onClick:()=>Bu(b=>Math.max(-1,b-1)),disabled:Dn<=-1,title:"Назад",children:"◀"}),a.jsx("span",{className:"log-day-label",children:Dn===-1?"Все дни":`День ${Dn}`}),a.jsx("button",{className:"log-day-btn",onClick:()=>Bu(b=>b===-1?0:Math.min(30,b+1)),disabled:Dn>=30,title:"Вперёд",children:"▶"})]}),a.jsx("button",{className:"log-toggle",onClick:()=>q(b=>!b),title:B?"Скрыть":"Показать",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",style:{transform:B?"rotate(180deg)":"none",transition:"transform 0.2s"},children:a.jsx("polyline",{points:"6 9 12 15 18 9"})})})]}),B&&a.jsx("div",{className:"log-table",ref:b=>{if(b&&Dn>=0){const N=b.querySelector(`[data-day="${Dn}"]`);N&&N.scrollIntoView({block:"center"})}},children:(()=>{const b=new Date,N={};L.forEach(D=>{const A=D.day;Dn>=0&&A!==Dn||(N[A]||(N[A]=[]),N[A].push(D))});const E=Object.keys(N).sort((D,A)=>A-D);return E.length===0?a.jsx("div",{className:"log-empty",children:"Журнал пуст. Запустите симуляцию."}):E.map(D=>{const A=new Date(b);A.setDate(A.getDate()+Number(D));const U=A.toISOString().slice(0,10).replace(/-/g,".");return a.jsxs("div",{"data-day":D,children:[a.jsxs("div",{className:"log-day-separator",children:[a.jsx("span",{className:"log-day-sep-line"}),a.jsx("span",{className:"log-day-sep-text",children:U}),a.jsx("span",{className:"log-day-sep-line"})]}),N[D].map((V,K)=>a.jsxs("div",{className:`log-row ${V.state==="Активировано"?"log-row-ok":"log-row-skip"}`,children:[a.jsxs("span",{className:"col-day",children:["День ",V.day]}),a.jsx("span",{className:"col-time",children:V.time||`${String(6+V.day*7%14).padStart(2,"0")}:00`}),a.jsxs("span",{className:"col-intervention",children:[a.jsx("span",{children:V.code}),a.jsx("span",{children:V.name})]}),a.jsx("span",{className:"col-state",children:V.state==="Активировано"?"✓":"—"}),a.jsx("span",{className:"col-stars",children:V.starsGained>0?`+${V.starsGained} ⭐`:""})]},`${D}-${K}`))]},D)})})()})]})})(),Nv&&a.jsx("div",{className:"plan-popup-overlay",onClick:()=>mr(!1),children:a.jsxs("div",{className:"tasks-popup",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"tasks-popup-header",children:[a.jsx("h3",{children:"📋 Задачи в плане"}),a.jsx("button",{className:"plan-popup-close",onClick:()=>mr(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsx("div",{className:"tasks-popup-body",children:(()=>[...new Set(m.map(g=>g.code))].map(g=>{const j=m.find(N=>N.code===g);if(!j)return null;const S=m.filter(N=>N.code===g),b=L.filter(N=>N.code===g&&N.state==="Активировано").length;return a.jsxs("div",{className:"tasks-popup-row",children:[a.jsxs("div",{className:"tasks-popup-row-top",children:[a.jsx("span",{className:"tasks-popup-code",children:g}),a.jsx("span",{className:"tasks-popup-name",children:j.name})]}),a.jsxs("div",{className:"tasks-popup-row-meta",children:[a.jsxs("span",{children:[S.length," назначений"]}),a.jsxs("span",{className:"tasks-popup-done",children:[b," выполнено"]}),a.jsxs("span",{className:"tasks-popup-pct",children:[Math.round(b/S.length*100),"%"]})]})]},g)}))()})]})}),i&&a.jsxs("div",{className:"profile-header-card",children:[i.photo&&a.jsx("img",{src:`/images/pers/150_150/${i.photo}`,alt:i.name||"Profile",className:"profile-header-photo",onError:u=>{u.target.style.display="none"}}),a.jsxs("div",{className:"profile-header-content",children:[a.jsxs("div",{className:"profile-header-top",children:[a.jsxs("div",{className:"profile-header-info",children:[(()=>{var V,K,ce,pe,ie,de;const u=($,oe,Yt)=>$==null||$===0?0:Math.max(0,Math.min(100,(1-Math.abs($-oe)/Yt)*100)),g=[{label:"Сон",score:(V=i.lifestyle)!=null&&V.sleep_hours?Math.min(100,i.lifestyle.sleep_hours/7.5*100):0},{label:"Стресс",score:(K=i.lifestyle)!=null&&K.stress_level_0_10?u(i.lifestyle.stress_level_0_10,3,7):0},{label:"Шаги",score:(ce=i.lifestyle)!=null&&ce.daily_steps?Math.min(100,i.lifestyle.daily_steps/1e4*100):0},{label:"ИМТ",score:(pe=i.anthropometrics)!=null&&pe.bmi?u(i.anthropometrics.bmi,22,15):0},{label:"Сердце",score:(ie=i.vitals)!=null&&ie.systolic_bp_mmhg?u(i.vitals.systolic_bp_mmhg,120,60):0},{label:"Глюкоза",score:(de=i.labs)!=null&&de.glucose_mg_dl?u(i.labs.glucose_mg_dl,100,80):0}],j=g.length,S=25,b=25,N=18,E=g.map(($,oe)=>Math.PI*2*oe/j-Math.PI/2),D=($,oe)=>({x:S+$*Math.cos(E[oe]),y:b+$*Math.sin(E[oe])}),A=g.map(($,oe)=>D(N*$.score/100,oe)),U=$=>$.map(oe=>`${oe.x},${oe.y}`).join(" ");return a.jsxs("svg",{width:"50",height:"50",viewBox:"0 0 50 50",className:"health-radar",style:{flexShrink:0},children:[[.25,.5,.75,1].map(($,oe)=>a.jsx("polygon",{points:U(g.map((Yt,Nt)=>D(N*$,Nt))),fill:"none",stroke:"#e0e0e0",strokeWidth:"0.5"},oe)),E.map(($,oe)=>a.jsx("line",{x1:S,y1:b,x2:D(N,oe).x,y2:D(N,oe).y,stroke:"#e0e0e0",strokeWidth:"0.5"},oe)),a.jsx("polygon",{points:U(A),fill:"rgba(49,27,146,0.15)",stroke:"#311b92",strokeWidth:"1"}),A.map(($,oe)=>a.jsx("circle",{cx:$.x,cy:$.y,r:1.5,fill:"#311b92"},oe))]})})(),a.jsxs("div",{children:[a.jsx("h2",{className:"profile-header-name",children:i.name||(()=>{var u;try{const g=(u=i.photo)==null?void 0:u.replace(/\.\w+$/,"").split("_");return(g==null?void 0:g.slice(1).find(j=>!/^\d+$/.test(j)))||"—"}catch{return"—"}})()}),(()=>{const u=[...new Set(m.map(j=>j.code))],g=u.length>0;return a.jsx("div",{className:`plan-status-bar${g?" has-plan":""}`,children:a.jsxs("button",{className:"plan-status-btn",onClick:()=>Wi(!0),title:"План интервенций",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("line",{x1:"3",y1:"9",x2:"21",y2:"9"}),a.jsx("line",{x1:"9",y1:"21",x2:"9",y2:"9"})]}),"План",g&&a.jsxs("span",{className:"plan-status-dots",children:[a.jsx("span",{className:"plan-status-dot dot-protocols",title:`${u.length} протоколов`,children:u.length}),a.jsx("span",{className:"plan-status-dot dot-interventions",title:`${m.length} интервенций`,children:m.length})]})]})})})(),a.jsxs("div",{className:"profile-header-meta",children:[((Dm=i.demographics)==null?void 0:Dm.age)&&a.jsxs("span",{children:[i.demographics.age," лет"]}),((km=i.demographics)==null?void 0:km.sex)&&a.jsx("span",{children:i.demographics.sex==="male"?"М":"Ж"}),((Mm=i.digital_twin_scores)==null?void 0:Mm.current_stars)&&a.jsxs("span",{className:"profile-stars",children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:"14",height:"14",children:a.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})}),i.digital_twin_scores.current_stars]})]})]})]}),a.jsxs("button",{className:"assess-health-btn btn-health",onClick:()=>Gv(),children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})}),"Оценить здоровье"]}),a.jsxs("button",{className:"assess-health-btn btn-diary",onClick:()=>{const u=r;Ii(u),We(ra(u)),Ul(!0)},children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("path",{d:"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"})}),"Дневник"]}),a.jsxs("button",{className:"assess-health-btn btn-chat",onClick:()=>{const u=m.map((g,j)=>({id:j,type:"intervention",day:g.day,code:g.code,name:g.name,category:g.category,regularity:g.regularity,time:`${String(8+j*3%12).padStart(2,"0")}:${String(j*17%60).padStart(2,"0")}`}));u.sort((g,j)=>g.day-j.day),qt(u),dr(!0)},children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),"Чат"]}),a.jsxs("button",{className:"assess-health-btn btn-export",onClick:()=>{const u={profile:i,profileOverrides:te,paramHistory:ds,plans:Ga[e]||null,interventions:m,preferences:{badges:Mn,custom:ms,diet:Ua,restrictions:ca},exportedAt:new Date().toISOString()},g=new Blob([JSON.stringify(u,null,2)],{type:"application/json"}),j=URL.createObjectURL(g),S=document.createElement("a");S.href=j,S.download=`healora-twin-${i.id||i.name||"data"}-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(S),S.click(),document.body.removeChild(S),URL.revokeObjectURL(j)},children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),a.jsx("polyline",{points:"7 10 12 15 17 10"}),a.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),"Выгрузить"]}),a.jsxs("button",{className:`assess-health-btn ${Xu?"btn-save-active":""}`,onClick:Wv,style:{opacity:Xu?1:.5},children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}),a.jsx("polyline",{points:"17 21 17 13 7 13 7 21"}),a.jsx("polyline",{points:"7 3 7 8 15 8"})]}),"Сохранить"]})]}),a.jsxs("div",{className:"profile-prefs",children:[a.jsx("span",{className:"prefs-label",children:"Предпочтения:"}),Ua.map(u=>a.jsxs("span",{className:"pref-badge active",children:[u,a.jsx("span",{className:"pref-badge-remove",onClick:g=>{g.stopPropagation();const j=Ua.filter(S=>S!==u);Fu(j),localStorage.setItem("healora_pref_diet",JSON.stringify(j))},children:"×"})]},"d_"+u)),ca.map(u=>a.jsxs("span",{className:"pref-badge active",title:u.text||"",children:[u.name,u.text?": "+u.text:"",a.jsx("span",{className:"pref-badge-remove",onClick:g=>{g.stopPropagation();const j=ca.filter(S=>S.name!==u.name);yr(j),localStorage.setItem("healora_pref_restrictions",JSON.stringify(j))},children:"×"})]},"r_"+u.name)),a.jsxs("span",{className:"pref-custom-wrap",children:[a.jsxs("button",{className:"pref-practice-btn",onClick:()=>Wu(u=>!u),title:"Выбрать вкусовые предпочтения",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"12",height:"12",children:[a.jsx("path",{d:"M3 7h18M3 12h18M3 17h12"}),a.jsx("circle",{cx:"19",cy:"17",r:"3"})]}),"вкусовые"]}),a.jsxs("button",{className:"pref-practice-btn",onClick:()=>Iu(u=>!u),title:"Выбрать ограничения",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"12",height:"12",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),a.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),"ограничения"]}),a.jsxs("button",{className:"pref-practice-btn",onClick:()=>Zu(u=>!u),title:"Выбрать типы практик",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"12",height:"12",children:[a.jsx("path",{d:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"}),a.jsx("rect",{x:"9",y:"3",width:"6",height:"4",rx:"1"}),a.jsx("line",{x1:"9",y1:"12",x2:"15",y2:"12"}),a.jsx("line",{x1:"9",y1:"16",x2:"13",y2:"16"})]}),"практики"]}),a.jsx("input",{className:"pref-custom-input",type:"text",placeholder:"+ другая",value:ms,onChange:u=>$u(u.target.value),onKeyDown:u=>{if(u.key==="Enter"&&ms.trim()){u.preventDefault();const g=ms.trim();if(!Mn.includes(g)){const j=[...Mn,g];Ku(j),localStorage.setItem("healora_pref_badges",JSON.stringify(j))}$u("")}}}),Ov&&a.jsx("div",{className:"protocol-picker-dropdown",onClick:()=>Wu(!1),children:a.jsxs("div",{className:"protocol-picker-body",onClick:u=>u.stopPropagation(),children:[a.jsx("div",{className:"protocol-picker-header",children:"Вкусовые предпочтения"}),Dj.map(u=>{const g=Ua.includes(u.name),j=["protocol-picker-item"];return g&&j.push("active"),a.jsxs("div",{className:j.join(" "),onClick:()=>{const b={Вегетарианство:"vegetarian",Веганство:"vegan","Без глютена":"gluten_free","Без лактозы":"lactose_free",Низкоуглеводное:"low_carb",Средиземноморская:"mediterranean",Кетодиета:"keto","Интервальное голодание":"if","Без сахара":"no_sugar","Спортивное питание":"sports"}[u.name],N=b?Rj[b]:null;N&&xr({name:u.name,content:N})},children:[a.jsxs("span",{className:"protocol-picker-stars",children:["★".repeat(u.stars),"☆".repeat(5-u.stars)]}),a.jsxs("span",{className:"protocol-picker-name-group",children:[a.jsx("span",{className:"protocol-picker-name",children:u.name}),a.jsx("span",{className:"protocol-picker-applic",children:u.applicability})]}),a.jsx("span",{className:"protocol-picker-cb",onClick:S=>{S.stopPropagation();const b=g?Ua.filter(N=>N!==u.name):[...Ua,u.name];Fu(b),localStorage.setItem("healora_pref_diet",JSON.stringify(b))},children:g?"☑":"☐"})]},u.id)})]})}),Bv&&a.jsx("div",{className:"protocol-picker-dropdown",onClick:()=>Iu(!1),children:a.jsxs("div",{className:"protocol-picker-body",onClick:u=>u.stopPropagation(),children:[a.jsx("div",{className:"protocol-picker-header",children:"Ограничения"}),kj.map(u=>{const g=ca.find(b=>b.name===u.name),j=!!g,S=["protocol-picker-item"];return j&&S.push("active"),a.jsxs("div",{className:S.join(" "),onClick:()=>{const N={Аллергии:"allergies","Нелюбимые продукты":"disliked",Религиозные:"religious","Другие ограничения":"other"}[u.name],E=N?Bj[N]:null;E&&_r({name:u.name,content:E})},children:[a.jsxs("span",{className:"protocol-picker-stars",children:["★".repeat(u.stars),"☆".repeat(5-u.stars)]}),a.jsxs("span",{className:"protocol-picker-name-group",children:[a.jsx("span",{className:"protocol-picker-name",children:u.name}),a.jsx("span",{className:"protocol-picker-applic",children:u.applicability})]}),j&&a.jsx("input",{className:"protocol-picker-input",type:"text",placeholder:"Описание ограничения...",value:g.text,onClick:b=>b.stopPropagation(),onChange:b=>{b.stopPropagation();const N=ca.map(E=>E.name===u.name?{...E,text:b.target.value}:E);yr(N),localStorage.setItem("healora_pref_restrictions",JSON.stringify(N))}}),a.jsx("span",{className:"protocol-picker-cb",onClick:b=>{b.stopPropagation();const N=j?ca.filter(E=>E.name!==u.name):[...ca,{name:u.name,text:""}];yr(N),localStorage.setItem("healora_pref_restrictions",JSON.stringify(N))},children:j?"☑":"☐"})]},u.id)})]})}),Tv&&a.jsx("div",{className:"protocol-picker-dropdown",onClick:()=>Zu(!1),children:a.jsxs("div",{className:"protocol-picker-body",onClick:u=>u.stopPropagation(),children:[a.jsx("div",{className:"protocol-picker-header",children:"Практики"}),[...Ej].sort((u,g)=>g.stars-u.stars).map(u=>{const g=Mn.includes(u.name)||Mn.includes(u.short),j=["protocol-picker-item"];g&&j.push("active"),u.official&&j.push("official");const S=u.official&&u.regulatory?u.regulatory.split(";").filter(b=>b.trim()).length:0;return a.jsxs("div",{className:j.join(" "),onClick:()=>{const N={"РКИ (медицина)":"rki",Нутрициология:"nutriciology","Китайская медицина":"chinese_medicine","Интегративная медицина":"integrative",Аюрведа:"ayurveda","Персонализированная медицина":"personalized","Поведенческая психология":"behavioral","Цифровые биомаркеры":"biomarkers",Шаманизм:"shamanism","Клинические гайдлайны":"guidelines","Медицина Майя":"maya","Народные практики":"folk","Культурная адаптация":"cultural"}[u.name],E=N?Aj[N]:null;E&&vr({name:u.name,content:E,regulatory:u.regulatory||""})},children:[u.official&&a.jsxs("span",{className:"protocol-picker-src-badge",title:u.official?"Источники: законы, практики, регламенты":"",onClick:b=>{b.stopPropagation(),Rv(Ju===u.id?null:u.id)},children:[S,Ju===u.id&&a.jsxs("div",{className:"protocol-picker-reg-popup",onClick:b=>b.stopPropagation(),children:[a.jsx("div",{className:"reg-popup-title",children:"Источники"}),a.jsx("div",{className:"reg-popup-text",children:u.regulatory})]})]}),!u.official&&a.jsx("span",{style:{width:16,flexShrink:0}}),a.jsxs("span",{className:"protocol-picker-stars",children:["★".repeat(u.stars),"☆".repeat(5-u.stars)]}),a.jsxs("span",{className:"protocol-picker-name-group",children:[a.jsx("span",{className:"protocol-picker-name",children:u.name}),a.jsx("span",{className:"protocol-picker-applic",children:u.applicability})]}),a.jsx("span",{className:"protocol-picker-cb",onClick:b=>{b.stopPropagation();const E=Mn.includes(u.name)?Mn.filter(D=>D!==u.name&&D!==u.short):[...Mn,u.name];Ku(E),localStorage.setItem("healora_pref_badges",JSON.stringify(E))},children:g?"☑":"☐"})]},u.id)})]})})]})]}),a.jsxs("div",{className:"profile-targets",children:[a.jsx("span",{className:"targets-label",children:"Цели:"}),a.jsx("div",{className:"targets-badges",children:Object.entries(Vt).flatMap(([u,g])=>g.attributes.filter(j=>j.target!==null&&j.target!==void 0&&(Q[j.id]??j.target)!==null).slice(0,4).map(j=>{const S=_e[j.id]||_e[j.name];return a.jsxs("span",{className:`target-badge ${S?"alert":""}`,title:`${j.name}: текущее ${Kl(j)} → цель ${Q[j.id]??j.target} ${j.unit}`,children:[a.jsx("span",{className:"target-badge-dot",style:{backgroundColor:Vt[u].color}}),a.jsx("span",{className:"target-badge-name",children:j.name}),a.jsxs("span",{className:"target-badge-value",children:[Q[j.id]??j.target,j.unit]})]},`target_${j.id}`)})).slice(0,6)})]}),G.length>0&&a.jsxs("div",{className:"cjm-protocols",children:[a.jsxs("div",{className:"cjm-protocols-header",children:[a.jsx("span",{className:"cjm-protocols-title",children:"Подобранные протоколы"}),a.jsxs("button",{className:"daw-btn",onClick:()=>Z("protocols"),children:["Все (",G.length,")"]})]}),a.jsx("div",{className:"cjm-protocols-list",children:G.slice(0,3).map(u=>a.jsx("span",{className:"cjm-protocol-chip",onClick:()=>{hr(u),Oa(!0)},children:u.name},u.protocolKey||u.key))})]})]})]}),a.jsx("div",{className:"data-panel",children:Object.entries(Vt).map(([u,g])=>{const j=Fe[u];return a.jsxs("div",{className:"data-section",style:{borderLeft:`3px solid ${g.color}`},children:[a.jsxs("div",{className:"section-header",onClick:()=>Pe(S=>({...S,[u]:!S[u]})),children:[a.jsxs("div",{className:"section-title-row",children:[a.jsx("button",{className:"mic-btn",title:"Редактировать параметры",onClick:S=>{var N;S.stopPropagation(),wv(u),Vl(!0);const b={};(N=Vt[u])==null||N.attributes.forEach(E=>{const D=Kl(E);D!=null&&D!=="—"&&(b[E.id]=D)}),kn(b),za(""),La([]),Yl("idle")},children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:g.color,strokeWidth:"2",width:"16",height:"16",children:a.jsx("path",{d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})})}),a.jsx("h4",{style:{color:g.color},children:g.title})]}),a.jsx("button",{className:"collapse-btn",title:j?"Развернуть":"Свернуть",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:j?a.jsx("polyline",{points:"9 18 15 12 9 6"}):a.jsx("polyline",{points:"18 15 12 9 6 15"})})})]}),!j&&a.jsxs("div",{className:"attr-table",children:[a.jsxs("div",{className:"attr-row header",children:[a.jsx("span",{children:"Код"}),a.jsx("span",{children:"Параметр"}),a.jsx("span",{children:"Было"}),a.jsx("span",{children:"Текущее"}),a.jsx("span",{children:"Цель"}),a.jsx("span",{children:"Норма"}),a.jsx("span",{children:"Интервенции"}),(()=>{const S=[];for(let b=0;b<7;b++){const N=new Date;N.setDate(N.getDate()-b);const E=["Вс","Пн","Вт","Ср","Чт","Пт","Сб"][N.getDay()],D=`${String(N.getDate()).padStart(2,"0")}.${String(N.getMonth()+1).padStart(2,"0")}`;S.push(a.jsxs("span",{className:`attr-day-header ${b===0?"today":""}`,children:[E,a.jsx("br",{}),D]},b))}return S})()]}),g.attributes.map(S=>{const b=_e[S.id]||_e[S.name],N=Lv(S.id),E=He===`${u}_${S.id}`;return a.jsxs("div",{className:`attr-row ${hh(S.name)||hh(S.id)?"highlighted":""} ${b?"alert":""}`,children:[a.jsx("span",{className:"attr-code",children:S.code}),a.jsx("span",{className:"attr-name",children:S.name}),a.jsx("div",{className:`attr-cell orig ${S.id in te&&S.current!=null?"has-orig":""}`,children:S.id in te&&S.current!=null?Cr(S.current):"—"}),a.jsxs("div",{className:"attr-cell current",children:[E&&S.editable?a.jsx("input",{className:"edit-input",value:Ic,onChange:D=>Eu(D.target.value),onBlur:()=>fh(u,S.id),onKeyDown:D=>D.key==="Enter"&&fh(u,S.id),autoFocus:!0}):a.jsxs("span",{className:"editable-value",onDoubleClick:()=>S.editable&&Zv(u,S.id,Kl(S)),title:S.editable?"Двойной клик для редактирования":"",children:[Cr(Kl(S)),b&&a.jsx("span",{className:"alert-badge",title:b.message,children:b.direction==="up"?a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"10",height:"10",children:a.jsx("polyline",{points:"18 15 12 9 6 15"})}):b.direction==="down"?a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"10",height:"10",children:a.jsx("polyline",{points:"6 9 12 15 18 9"})}):a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"10",height:"10",children:a.jsx("polyline",{points:"20 6 9 17 4 12"})})})]}),S.unit&&a.jsx("span",{className:"unit",children:S.unit})]}),a.jsxs("div",{className:"attr-cell target",children:[a.jsx("button",{className:"target-btn",onClick:()=>$v(S.id,Q[S.id]??S.target),children:"-"}),a.jsx("input",{type:"number",className:"target-input",value:Q[S.id]??S.target??"",onChange:D=>Xv(S.id,parseFloat(D.target.value))}),a.jsx("button",{className:"target-btn",onClick:()=>Kv(S.id,Q[S.id]??S.target),children:"+"})]}),a.jsx("span",{className:"attr-cell norm",children:S.norm}),a.jsx("div",{className:"attr-cell interventions",children:N.length>0?a.jsxs("div",{className:"interv-group",title:`${N.length} интервенций`,children:[a.jsx("span",{className:"interv-count",children:N.length}),a.jsx("div",{className:"interv-badges",onClick:D=>D.stopPropagation(),children:N.map(D=>a.jsxs("div",{className:"interv-badge-item",style:{borderLeftColor:D.color},onClick:()=>{er(D),zl(!0)},children:[a.jsx("span",{className:"interv-badge",style:{backgroundColor:D.color+"33"},children:D.code}),a.jsx("span",{className:"interv-badge-name",children:D.name}),a.jsxs("span",{className:"interv-badge-impact",children:["[",D.impact,"]"]})]},D.code))})]}):a.jsx("span",{className:"no-interv",children:"—"})}),(()=>{const D=[],A=S.current;for(let U=0;U<7;U++){const V=new Date;V.setDate(V.getDate()-U);const K=`${V.getFullYear()}-${String(V.getMonth()+1).padStart(2,"0")}-${String(V.getDate()).padStart(2,"0")}`,pe=(ds[S.id]||[]).filter(qa=>qa.timestamp&&qa.timestamp.startsWith(K)),ie=pe.length>0?pe[pe.length-1]:null,de=U===0&&S.id in te?te[S.id]:null,$=ie?ie.value:de,oe=$!=null&&$!=A,Yt=oe?$:null,Nt=!ie&&de!==null&&oe;D.push(a.jsx("div",{className:`attr-day-cell ${U===0?"today":""} ${Nt?"overridden":""}`,children:Yt!==null?a.jsx("span",{className:"day-value",children:Yt}):a.jsx("span",{className:"day-empty",children:"—"})},U))}return D})()]},S.id)})]})]},u)})})]}),hv&&F&&a.jsx("div",{className:"intervention-popup-overlay",onClick:()=>zl(!1),children:a.jsxs("div",{className:"intervention-popup",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"popup-header",style:{borderLeftColor:F.color},children:[a.jsx("span",{className:"popup-code",children:F.code}),a.jsx("h3",{children:F.name}),a.jsx("button",{className:"popup-close",onClick:()=>zl(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsxs("div",{className:"popup-body",children:[a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Описание"}),a.jsx("span",{className:"popup-value",children:F.description||"Нет данных"})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Воздействие"}),a.jsxs("span",{className:"popup-value impact",style:{color:F.impact>=9?"#d50000":F.impact>=8?"#ff9100":"#ffd600"},children:[F.impact,"/10"]})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Периодичность"}),a.jsx("span",{className:"popup-value",children:F.regularity==="D"?"Ежедневно":F.regularity==="W"?"Еженедельно":F.regularity==="M"?"Ежемесячно":F.regularity==="Y"?"Ежегодно":F.regularity==="P"?"P":F.regularity})]}),F.schedule&&a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Расписание"}),a.jsxs("span",{className:"popup-value",children:[["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].filter((u,g)=>F.schedule.days.includes(g)).join(", "),F.schedule.time?` в ${F.schedule.time}`:""]})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Доказательность"}),a.jsxs("span",{className:"popup-value evidence",style:{color:F.evidence==="A"?"#00c853":F.evidence==="B"?"#ff9100":"#ffd600"},children:["Уровень ",F.evidence]})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Биомаркеры"}),a.jsx("span",{className:"popup-value",children:F.biomarkers&&F.biomarkers.length>0?F.biomarkers.join(", "):"Нет данных"})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Источники"}),a.jsx("span",{className:"popup-value sources",children:F.sources||"Нет данных"})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Категория"}),a.jsx("span",{className:"popup-value",children:F.category})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Тип"}),a.jsx("span",{className:"popup-value",children:F.type})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Доставка"}),a.jsxs("span",{className:"popup-value",children:[F.delivery_type==="chatbot"&&"Чат-бот (напоминание)",F.delivery_type==="web_report"&&"Веб-отчет (заполнение)",F.delivery_type==="voice_report"&&"Голосовой отчет",!["chatbot","web_report","voice_report"].includes(F.delivery_type)&&(F.delivery_type||"—")]})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Время начала"}),a.jsxs("span",{className:"popup-value",children:["День ",F.day??"—"]})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Время конца"}),a.jsx("span",{className:"popup-value",children:(()=>{const u=F.day;if(u==null)return"—";const g=F.regularity;return g==="D"?`День ${Math.min(30,u+30)}`:g==="W"?`День ${Math.min(30,u+28)}`:g==="M"?`День ${Math.min(30,u+30)}`:`День ${u}`})()})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Статус исполнения"}),a.jsx("span",{className:"popup-value",children:(()=>L.some(g=>g.code===F.code&&g.state==="Активировано")?"Выполнен":r>=F.day?"Пропущен":"Ожидается")()})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Подтверждение о выполнении"}),a.jsxs("span",{className:"popup-value",children:[F.report_effort==="light"&&"Автоматическое (трекер)",F.report_effort==="medium"&&"Самоотчет (дневник)",F.report_effort==="detailed"&&"Лабораторное (анализы)",!["light","medium","detailed"].includes(F.report_effort)&&(F.report_effort||"—")]})]})]})]})}),jv&&Ie&&a.jsx("div",{className:"intervention-popup-overlay",onClick:()=>Oa(!1),children:a.jsxs("div",{className:"intervention-popup protocol-popup",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"popup-header",style:{borderLeftColor:"#311b92"},children:[a.jsx("span",{className:"popup-code",children:Ie.protocolKey||Ie.key||""}),a.jsx("h3",{children:Ie.name}),a.jsx("button",{className:"popup-close",onClick:()=>Oa(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsxs("div",{className:"popup-body",children:[a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Категория"}),a.jsx("span",{className:"popup-value",children:Ie.category||"—"})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Описание"}),a.jsx("span",{className:"popup-value",children:Ie.description||Ie.name||"Нет данных"})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Интервенции в протоколе"}),a.jsx("span",{className:"popup-value",children:a.jsx("div",{className:"protocol-popup-chips",children:(Ie.interventions||[]).map(u=>a.jsx("span",{className:"protocol-card-chip",children:u},u))})})]}),a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Длительность"}),a.jsx("span",{className:"popup-value",children:Ie.duration?`${Ie.duration} дней`:"—"})]}),Ie.targets&&Ie.targets.length>0&&a.jsxs("div",{className:"popup-row",children:[a.jsx("span",{className:"popup-label",children:"Целевые параметры"}),a.jsx("span",{className:"popup-value",children:Ie.targets.join(", ")})]}),a.jsx("div",{className:"popup-actions",children:a.jsxs("button",{className:"daw-btn generate-btn",onClick:()=>{Sr(Ie.protocolKey||Ie.key),Oa(!1)},children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),"Добавить на таймлайн"]})})]})]})}),mv&&a.jsx("div",{className:"history-popup-overlay",onClick:()=>Du(!1),children:a.jsxs("div",{className:"history-popup",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"history-popup-header",children:[a.jsx("h3",{children:"Отчет интервенций"}),a.jsxs("div",{className:"plan-popup-header-actions",children:[a.jsxs("button",{className:"daw-btn",onClick:()=>{const u=m.length,g=m.filter(U=>U.day<=r).length,j=L.filter(U=>U.state==="Активировано").length,S=u-g,b=L.sort((U,V)=>U.day-V.day).map(U=>`День ${U.day} | ${U.code} | ${U.name} | ${U.state} | ${U.starsGained>0?"+"+U.starsGained:"—"}`).join(`
`),N=`ОТЧЕТ ИНТЕРВЕНЦИЙ
${"=".repeat(50)}
Всего: ${u} | Пройдено: ${g} | Сработало: ${j} | Осталось: ${S}

Детали:
${b||"—"}`,E=new Blob([N],{type:"text/plain"}),D=URL.createObjectURL(E),A=document.createElement("a");A.href=D,A.download="report-interventions.txt",A.click(),URL.revokeObjectURL(D)},children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),a.jsx("polyline",{points:"7 10 12 15 17 10"}),a.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),"Скачать"]}),a.jsx("button",{className:"history-popup-close",onClick:()=>Du(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})]}),a.jsxs("div",{className:"history-popup-body",children:[(()=>{const u=m.length,g=m.filter(b=>b.day<=r).length,j=L.filter(b=>b.state==="Активировано").length,S=u-g;return a.jsxs("div",{className:"report-summary",children:[a.jsxs("div",{className:"report-stat",children:[a.jsx("span",{className:"report-label",children:"Всего"}),a.jsx("span",{className:"report-value",children:u})]}),a.jsxs("div",{className:"report-stat",children:[a.jsx("span",{className:"report-label",children:"Пройдено"}),a.jsx("span",{className:"report-value",children:g})]}),a.jsxs("div",{className:"report-stat",children:[a.jsx("span",{className:"report-label",children:"Сработало"}),a.jsx("span",{className:"report-value report-ok",children:j})]}),a.jsxs("div",{className:"report-stat",children:[a.jsx("span",{className:"report-label",children:"Осталось"}),a.jsx("span",{className:"report-value",children:S})]})]})})(),(()=>{const u=new Set(L.filter(S=>S.state==="Активировано").map(S=>`${S.code}_${S.day}`)),j=[...new Set(m.map(S=>S.code))].map(S=>{const b=m.find(A=>A.code===S),N=(b==null?void 0:b.day)??0,E=u.has(`${S}_${N}`),D=E?"Выполнено":N<=r?"Пропущено":"Ожидается";return{code:S,name:(b==null?void 0:b.name)||S,day:N,triggered:E,status:D}});return a.jsxs("table",{className:"history-table",style:{marginBottom:16},children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Код"}),a.jsx("th",{children:"Название"}),a.jsx("th",{children:"День"}),a.jsx("th",{children:"Статус"})]})}),a.jsx("tbody",{children:j.map(S=>a.jsxs("tr",{children:[a.jsx("td",{style:{fontFamily:"monospace",fontSize:11},children:S.code}),a.jsx("td",{children:S.name}),a.jsx("td",{children:S.day}),a.jsx("td",{className:S.triggered?"history-status-success":S.day<=r?"history-status-failed":"",children:S.status})]},S.code))})]})})(),L.length===0?a.jsx("div",{className:"history-empty",children:"История пуста. Запустите симуляцию."}):a.jsxs("table",{className:"history-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"День"}),a.jsx("th",{children:"Код"}),a.jsx("th",{children:"Название"}),a.jsx("th",{children:"Статус"}),a.jsx("th",{children:"Звёзды"})]})}),a.jsx("tbody",{children:L.map((u,g)=>a.jsxs("tr",{children:[a.jsx("td",{children:u.day}),a.jsx("td",{style:{fontFamily:"monospace",fontSize:11},children:u.code}),a.jsx("td",{children:u.name}),a.jsx("td",{className:u.state==="Активировано"?"history-status-success":"history-status-failed",children:u.state}),a.jsx("td",{className:"history-stars",children:u.starsGained>0?`+${u.starsGained} ☆`:"—"})]},g))})]})]})]})}),fv&&a.jsx("div",{className:"plan-popup-overlay",onClick:()=>Wi(!1),children:a.jsxs("div",{className:"plan-popup plan-prescription",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"plan-popup-header",children:[a.jsxs("div",{className:"plan-popup-header-left",children:[a.jsx("div",{className:"plan-popup-badge",children:"🏥 НАЗНАЧЕНИЕ HEALORA"}),(()=>{var U,V,K,ce,pe;const u=Object.entries(Ga||{}).filter(([,ie])=>{var de;return((de=ie.interventions)==null?void 0:de.length)>0}),g=e,j=u.filter(([ie,de])=>{var Nt;if(!ar)return!0;const $=ar.toLowerCase(),oe=gs[ie];return((oe==null?void 0:oe.name)||ie).toLowerCase().includes($)||ie.toLowerCase().includes($)||((Nt=de.status)==null?void 0:Nt.includes($))}),S=gs[g],b=(S==null?void 0:S.name)||g||"—",N=g&&((U=Ga[g])!=null&&U.interventions)?new Set(Ga[g].interventions.map(ie=>ie.code)).size:0,E=((K=(V=Ga[g])==null?void 0:V.interventions)==null?void 0:K.length)||0,D=((pe=(ce=Ga[g])==null?void 0:ce.interventions)==null?void 0:pe.filter(ie=>ie.day<=r).length)||0,A=E>0?Math.round(D/E*100):0;return a.jsxs("div",{className:"plan-search-dropdown",children:[a.jsxs("div",{className:"plan-search-current",onClick:()=>Mu(ie=>!ie),children:[a.jsx("span",{className:"plan-search-label",children:b}),a.jsxs("span",{className:"plan-search-summary",children:[N," протоколов · ",A,"%"]}),a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"12",height:"12",style:{transform:ku?"rotate(180deg)":"none",transition:"transform 0.2s"},children:a.jsx("polyline",{points:"6 9 12 15 18 9"})})]}),ku&&a.jsxs("div",{className:"plan-search-panel",children:[a.jsxs("div",{className:"plan-search-input-wrap",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"12",height:"12",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),a.jsx("input",{className:"plan-search-input",type:"text",placeholder:"Поиск клиента...",value:ar,onChange:ie=>Au(ie.target.value),autoFocus:!0})]}),a.jsx("div",{className:"plan-search-results",children:j.length===0?a.jsx("div",{className:"plan-search-empty",children:"Ничего не найдено"}):j.map(([ie,de])=>{const $=gs[ie],oe=($==null?void 0:$.name)||ie,Yt=new Set(de.interventions.map(An=>An.code)).size,Nt=de.interventions.length,qa=de.interventions.filter(An=>An.day<=(e===ie?r:0)).length,ey=Nt>0?Math.round(qa/Nt*100):0,ty=ie===g;return a.jsxs("div",{className:`plan-search-result ${ty?"active":""}`,onClick:()=>{if(ie!==g){const An=ah(ie);_(An.interventions),nr(An.note||""),Ll(An.status||"active"),tr(An.templateId||"custom")}Mu(!1),Au("")},children:[a.jsx("span",{className:"plan-search-result-name",children:oe}),a.jsxs("span",{className:"plan-search-result-meta",children:[Yt," протоколов · ",de.status==="active"?"▶ Активен":de.status==="stopped"?"⏹ Остановлен":"📦 Архив"," · ",ey,"%"]})]},ie)})})]})]})})()]}),a.jsxs("div",{className:"plan-popup-header-actions",children:[a.jsx("select",{className:"plan-template-select",value:Aa,onChange:u=>tr(u.target.value),children:vd.map(u=>a.jsx("option",{value:u.id,children:u.name},u.id))}),a.jsxs("button",{className:"daw-btn",onClick:()=>window.print(),children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),a.jsx("polyline",{points:"7 10 12 15 17 10"}),a.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),"Скачать PDF"]}),a.jsx("button",{className:"plan-popup-close",onClick:()=>Wi(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})]}),a.jsx("div",{className:"plan-popup-body",children:(()=>{const u=Sj(Aa),g=[...new Set(m.map(b=>b.code))],j=g.length>0,S=j?g.map(b=>m.find(N=>N.code===b)):u.interventions;return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"plan-doctor-block",children:a.jsxs("div",{className:"plan-doctor-info",children:[a.jsxs("div",{className:"plan-info-row",children:[a.jsx("span",{className:"plan-info-label",children:"Пациент:"}),a.jsx("span",{className:"plan-info-value",children:(i==null?void 0:i.name)||e||"—"})]}),a.jsxs("div",{className:"plan-info-row",children:[a.jsx("span",{className:"plan-info-label",children:"Врач:"}),a.jsx("span",{className:"plan-info-value",children:u.doctor})]}),a.jsxs("div",{className:"plan-info-row",children:[a.jsx("span",{className:"plan-info-label",children:"Дата:"}),a.jsx("span",{className:"plan-info-value",children:new Date().toLocaleDateString("ru-RU")})]}),a.jsxs("div",{className:"plan-info-row",children:[a.jsx("span",{className:"plan-info-label",children:"Срок:"}),a.jsx("span",{className:"plan-info-value",children:"30 дней"})]})]})}),a.jsxs("div",{className:"plan-summary-block",children:[a.jsx("h4",{className:"plan-section-title",children:"Заключение"}),a.jsx("p",{className:"plan-summary-text",children:u.summary}),a.jsx("div",{className:"plan-highlight",children:u.highlight})]}),j&&a.jsxs("div",{className:"plan-badges-section",children:[a.jsx("h4",{className:"plan-section-title",children:"Назначенные интервенции"}),a.jsx("div",{className:"plan-badges-list",children:g.map(b=>{const N=m.find(E=>E.code===b);return N?a.jsxs("span",{className:"plan-badge",title:N.name,children:[a.jsx("span",{className:"plan-badge-name",children:N.name}),a.jsx("span",{className:"plan-badge-code",children:b}),a.jsx("button",{className:"plan-badge-remove",onClick:()=>Uv(b),title:"Убрать",children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"10",height:"10",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]},b):null})})]}),a.jsxs("div",{className:"plan-interventions-section",children:[a.jsx("h4",{className:"plan-section-title",children:"План назначений"}),S.length===0?a.jsxs("div",{className:"plan-empty-guide",children:[a.jsxs("div",{className:"plan-empty-wishes",children:[a.jsx("p",{children:"🌟 Ваш путь к здоровью начинается здесь!"}),a.jsx("p",{children:"HEALORA поможет вам выработать полезные привычки, улучшить сон, питание и физическую активность. Каждый маленький шаг приближает вас к большой цели."})]}),a.jsxs("div",{className:"plan-empty-steps",children:[a.jsx("h4",{children:"Как начать:"}),a.jsxs("ol",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"Оцените здоровье"})," — нажмите кнопку «Оценить здоровье» в панели профиля. Система проанализирует ваши текущие показатели и предложит цели."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Выберите цели"})," — отметьте атрибуты, которые хотите улучшить (вес, сон, активность, стресс и др.)."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Назначьте интервенции"})," — перетащите протоколы из каталога на таймлайн или выберите готовый протокол из селектора шаблонов выше."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Следуйте плану"})," — после создания плана вы сможете отмечать выполненные интервенции в чате и отслеживать прогресс."]})]})]}),a.jsxs("button",{className:"plan-create-btn",onClick:()=>{Hv(),Ll("active")},children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("line",{x1:"3",y1:"9",x2:"21",y2:"9"}),a.jsx("line",{x1:"9",y1:"21",x2:"9",y2:"9"})]}),"Создать план"]})]}):a.jsxs("table",{className:"plan-table plan-table-prescription",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"№"}),a.jsx("th",{children:"Интервенция"}),a.jsx("th",{children:"Код"}),a.jsx("th",{children:"Per"}),a.jsx("th",{children:"Расписание"})]})}),a.jsx("tbody",{children:S.map((b,N)=>{const E=b.schedule||an[b.code]&&an[b.code].schedule,D=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],A=E?E.days.map(U=>D[U]).join(",")+(E.time?" "+E.time:""):"";return a.jsxs("tr",{children:[a.jsx("td",{className:"plan-num",children:N+1}),a.jsx("td",{children:b.name}),a.jsx("td",{className:"plan-code",children:b.code}),a.jsx("td",{className:"plan-reg",children:b.regularity==="D"?"Д":b.regularity==="W"?"Н":b.regularity==="M"?"М":b.regularity==="Y"?"Г":b.regularity||"Д"}),a.jsx("td",{className:"plan-sched",children:A})]},b.code||N)})})]})]}),j&&a.jsxs("div",{className:"plan-doctor-note-block",children:[a.jsx("h4",{className:"plan-section-title",children:"Рекомендации врача / нутрициолога"}),a.jsx("textarea",{className:"plan-doctor-note",placeholder:"Добавьте рекомендации, пояснения к назначениям, режим приёма, особые указания...",value:Hl,onChange:b=>nr(b.target.value),rows:3})]}),j&&a.jsxs("div",{className:"plan-actions-section",children:[a.jsxs("div",{className:"plan-status-info",children:["Статус: ",a.jsx("span",{className:`plan-status-tag plan-status-${Cn}`,children:Cn==="active"?"Активен":Cn==="stopped"?"Остановлен":"Архивирован"})]}),a.jsxs("div",{className:"plan-action-buttons",children:[a.jsx("button",{className:"btn-plan-action btn-plan-save",onClick:()=>{lh(e,{interventions:m,note:Hl,status:Cn,templateId:Aa}),Wi(!1)},children:"💾 Сохранить"}),a.jsx("button",{className:"btn-plan-action btn-plan-stop",onClick:()=>Ll(b=>b==="stopped"?"active":"stopped"),children:Cn==="stopped"?"▶ Возобновить":"⏹ Остановить"}),a.jsx("button",{className:"btn-plan-action btn-plan-archive",onClick:()=>Ll("archived"),children:"📦 Архивировать"}),a.jsx("button",{className:"btn-plan-action btn-plan-send",children:"📤 Отправить"})]})]}),a.jsxs("div",{className:"plan-footer-block",children:[a.jsx("div",{className:"plan-qr-block",children:a.jsx(rv,{value:`https://healora.ru/digital-twin/?plan=${u.id}&profile=${e||"anon"}`,size:100,fgColor:"#1a1a2e"})}),a.jsx("div",{className:"plan-app-mockup",children:a.jsxs("svg",{viewBox:"0 0 120 220",width:"100%",style:{maxWidth:90},children:[a.jsx("rect",{x:"10",y:"0",width:"100",height:"210",rx:"18",fill:"#1a1a2e",stroke:"#333",strokeWidth:"1"}),a.jsx("rect",{x:"14",y:"3",width:"92",height:"18",rx:"4",fill:"#2d2d5e"}),a.jsx("text",{x:"55",y:"15",textAnchor:"middle",fontSize:"6",fill:"#fff",fontFamily:"sans-serif",fontWeight:"bold",children:"HEALORA"}),a.jsx("circle",{cx:"55",cy:"40",r:"12",fill:"#613CF5",opacity:"0.3"}),a.jsx("circle",{cx:"45",cy:"36",r:"8",fill:"#613CF5",opacity:"0.5"}),a.jsx("circle",{cx:"65",cy:"36",r:"8",fill:"#022374",opacity:"0.5"}),a.jsx("circle",{cx:"55",cy:"36",r:"2.5",fill:"#fff"}),a.jsx("text",{x:"55",y:"70",textAnchor:"middle",fontSize:"4",fill:"#aaa",fontFamily:"sans-serif",children:"Цифровой двойник"}),a.jsx("rect",{x:"20",y:"80",width:"80",height:"4",rx:"2",fill:"#FEAAE6"}),a.jsx("rect",{x:"20",y:"80",width:"50",height:"4",rx:"2",fill:"#613CF5"}),a.jsx("text",{x:"55",y:"95",textAnchor:"middle",fontSize:"4",fill:"#666",fontFamily:"sans-serif",children:"25/30 · 15/45"}),a.jsx("rect",{x:"20",y:"105",width:"80",height:"12",rx:"4",fill:"#2d2d5e"}),a.jsx("text",{x:"24",y:"113",fontSize:"3.5",fill:"#fff",fontFamily:"sans-serif",children:"Сон: время отхода"}),a.jsx("text",{x:"85",y:"113",fontSize:"3.5",fill:"#4caf50",fontFamily:"sans-serif",children:"✓"}),a.jsx("rect",{x:"20",y:"120",width:"80",height:"12",rx:"4",fill:"#2d2d5e"}),a.jsx("text",{x:"24",y:"128",fontSize:"3.5",fill:"#fff",fontFamily:"sans-serif",children:"Прогулка 30 мин"}),a.jsx("rect",{x:"84",y:"122",width:"14",height:"8",rx:"2",fill:"#333"}),a.jsx("circle",{cx:"62",cy:"155",r:"16",fill:"none",stroke:"#FEAAE6",strokeWidth:"2"}),a.jsx("circle",{cx:"62",cy:"155",r:"16",fill:"none",stroke:"#613CF5",strokeWidth:"2",strokeDasharray:"50 50",strokeDashoffset:"0",transform:"rotate(-90 62 155)"}),a.jsx("text",{x:"62",y:"159",textAnchor:"middle",fontSize:"5",fill:"#fff",fontFamily:"sans-serif",children:"32"}),a.jsx("rect",{x:"35",y:"190",width:"55",height:"8",rx:"4",fill:"#FEAAE6"}),a.jsx("text",{x:"62",y:"196",textAnchor:"middle",fontSize:"3.5",fill:"#1a1a2e",fontFamily:"sans-serif",children:"Напишите сообщение..."})]})}),a.jsx("div",{className:"plan-app-caption",children:"Установите HEALORA для повышения эффективности выполнения рекомендаций"})]})]})})()})]})}),lr&&a.jsx("div",{className:"diary-overlay",onClick:()=>Ul(!1),children:a.jsxs("div",{className:"diary-modal",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"diary-header",children:[a.jsxs("div",{className:"diary-header-nav",children:[a.jsx("button",{className:"diary-nav-btn",onClick:()=>{const u=(En??r)-1;u>=0&&(Ii(u),We(ra(u)))},disabled:(En??r)<=0,children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:a.jsx("polyline",{points:"15 18 9 12 15 6"})})}),a.jsxs("h3",{children:["Дневник питания — День ",En??r]}),a.jsx("button",{className:"diary-nav-btn",onClick:()=>{const u=(En??r)+1;u<=30&&(Ii(u),We(ra(u)))},disabled:(En??r)>=30,children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:a.jsx("polyline",{points:"9 18 15 12 9 6"})})})]}),a.jsx("button",{className:"history-popup-close",onClick:()=>Ul(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsx("div",{className:"diary-body",children:(()=>{const g=It||ra(En??r),j=(N,E,D)=>{const A=[...g.meals];A[N]={...A[N],[E]:D},We({...g,meals:A})},S=()=>{const N=window.SpeechRecognition||window.webkitSpeechRecognition;if(!N){alert("Голосовой ввод не поддерживается в этом браузере");return}const E=new N;E.lang="ru-RU",E.interimResults=!1,E.onresult=D=>{const A=D.results[0][0].transcript;We({...g,voiceNote:A,comment:g.comment+A}),Object.entries({завтрак:0,"завтрак:":0,обед:1,"обед:":1,ужин:2,"ужин:":2,перекус:3,"перекус:":3}).forEach(([K,ce])=>{const pe=new RegExp(`${K}\\s*([^.!]+)`,"i"),ie=A.match(pe);if(ie){const de=ie[1].trim().replace(/\s+\d+[гмл]?\s*/g,"");j(ce,"description",g.meals[ce].description+(g.meals[ce].description?"; ":"")+de)}});const V=A.match(/вод[ыа]?\s*(около|примерно|~)?\s*(\d+(?:[.,]\d+)?)\s*л/i);V&&We({...g,waterMl:Math.round(parseFloat(V[2].replace(",","."))*1e3)})},E.onerror=()=>alert("Ошибка распознавания речи"),E.start()},b=()=>{const N={profile_id:e,day:g.day,meals:g.meals.map(E=>({type:E.type,photo:E.photo||null,description:E.description,time:E.time||null,duration:E.duration?Number(E.duration):null,calories:E.calories?Number(E.calories):null,protein:E.protein?Number(E.protein):null,fat:E.fat?Number(E.fat):null,carbs:E.carbs?Number(E.carbs):null,ndi:E.ndi?Number(E.ndi):null,recommendations:E.recommendations||null})),water_ml:g.waterMl,mood:g.mood,voice_note:g.voiceNote||null,audio:null,comment:g.comment||null};fetch("/api/diary",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(N)}).then(E=>{if(!E.ok)throw new Error("HTTP "+E.status);return E.json()}).then(()=>{Ul(!1),We(null)}).catch(E=>{console.warn("Diary submit failed:",E),alert("Ошибка отправки: бэкенд недоступен")})};return a.jsxs("div",{className:"diary-form",children:[a.jsx("div",{className:"diary-meals-row",children:g.meals.map((N,E)=>a.jsxs("div",{className:"diary-meal",children:[a.jsxs("div",{className:"diary-meal-header",children:[a.jsx("span",{children:N.label}),a.jsxs("span",{className:"diary-meal-time",children:[a.jsx("input",{type:"time",value:N.time,onChange:D=>j(E,"time",D.target.value),style:{width:80,border:"none",fontSize:11,outline:"none",background:"transparent"}}),a.jsx("input",{type:"number",min:"1",max:"180",value:N.duration,onChange:D=>j(E,"duration",D.target.value),style:{width:40,border:"none",fontSize:11,outline:"none",background:"transparent",textAlign:"right"}}),a.jsx("span",{style:{fontSize:10,color:"#999"},children:"мин"})]})]}),a.jsxs("div",{className:"diary-meal-body",children:[a.jsx("div",{className:"diary-photo-upload",onClick:()=>{vv(E),es(!0)},children:N.photo?a.jsx("img",{src:N.photo,alt:"",className:"diary-photo-preview",onClick:D=>{D.stopPropagation(),j(E,"photo","")}}):a.jsx("div",{className:"diary-photo-btn",title:"Выбрать фото",children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),a.jsx("path",{d:"M21 15l-5-5L5 21"})]})})}),a.jsx("div",{className:"diary-meal-fields",children:a.jsxs("div",{className:"diary-kbzu",children:[a.jsx("input",{type:"number",placeholder:"ккал",value:N.calories,onChange:D=>j(E,"calories",D.target.value)}),a.jsx("input",{type:"number",placeholder:"белки",value:N.protein,onChange:D=>j(E,"protein",D.target.value)}),a.jsx("input",{type:"number",placeholder:"жиры",value:N.fat,onChange:D=>j(E,"fat",D.target.value)}),a.jsx("input",{type:"number",placeholder:"углев.",value:N.carbs,onChange:D=>j(E,"carbs",D.target.value)}),a.jsx("input",{type:"number",placeholder:"NDI",value:N.ndi,onChange:D=>j(E,"ndi",D.target.value)})]})})]}),a.jsxs("div",{className:"diary-meal-desc-row",children:[a.jsx("textarea",{placeholder:"Описание блюда",rows:1,value:N.description,onChange:D=>j(E,"description",D.target.value)}),a.jsx("button",{className:"diary-mic-btn",type:"button",onClick:()=>{const D=new(window.SpeechRecognition||window.webkitSpeechRecognition);D.lang="ru-RU",D.interimResults=!1,D.onresult=A=>j(E,"description",g.meals[E].description+(g.meals[E].description?"; ":"")+A.results[0][0].transcript),D.onerror=()=>{},D.start()},title:"Голосовое описание",children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"}),a.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}),a.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"22"})]})})]}),a.jsx("textarea",{className:"diary-meal-recs",placeholder:"Рекомендации",rows:1,value:N.recommendations,onChange:D=>j(E,"recommendations",D.target.value)})]},N.type))}),a.jsxs("div",{className:"diary-section",children:[a.jsx("label",{className:"diary-section-label",children:"Показатели"}),a.jsxs("div",{className:"diary-metrics-grid",children:[a.jsxs("div",{className:"diary-metric",children:[a.jsx("span",{className:"diary-metric-icon",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:a.jsx("path",{d:"M12 2C8 8 6 12 6 16a6 6 0 0 0 12 0c0-4-2-8-6-14z"})})}),a.jsx("span",{className:"diary-metric-label",children:"Вода"}),a.jsxs("span",{className:"diary-metric-value",children:[g.waterMl,"мл"]}),a.jsx("input",{type:"range",min:"0",max:"3000",step:"100",value:g.waterMl,onChange:N=>We({...g,waterMl:Number(N.target.value)})})]}),[{key:"energy",label:"Энергия",icon:a.jsx(a.Fragment,{children:a.jsx("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})})},{key:"mood",label:"Настроение",icon:a.jsxs(a.Fragment,{children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}),a.jsx("line",{x1:"9",y1:"9",x2:"9.01",y2:"9"}),a.jsx("line",{x1:"15",y1:"9",x2:"15.01",y2:"9"})]})},{key:"sleep",label:"Сон",icon:a.jsx(a.Fragment,{children:a.jsx("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})})},{key:"stress",label:"Стресс",icon:a.jsxs(a.Fragment,{children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),a.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]})},{key:"digestion",label:"ЖКТ",icon:a.jsxs(a.Fragment,{children:[a.jsx("path",{d:"M4 12h16M4 12l2-4h12l2 4M4 12l2 4h12l2-4"}),a.jsx("path",{d:"M8 4v4M16 4v4"})]})}].map(({key:N,label:E,icon:D})=>a.jsxs("div",{className:"diary-metric",children:[a.jsx("span",{className:"diary-metric-icon",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:D})}),a.jsx("span",{className:"diary-metric-label",children:E}),a.jsxs("span",{className:"diary-metric-value",children:[Math.round(g.mood[N]==="red"?25:g.mood[N]==="yellow"?55:g.mood[N]==="green"?85:0),"%"]}),a.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:g.mood[N]==="red"?25:g.mood[N]==="yellow"?55:g.mood[N]==="green"?85:0,onChange:A=>{const U=Number(A.target.value),V=U<40?"red":U<70?"yellow":"green";We({...g,mood:{...g.mood,[N]:V}})}})]},N))]})]}),a.jsxs("div",{className:"diary-section",children:[a.jsx("label",{className:"diary-section-label",children:"Голосовой ввод"}),a.jsxs("div",{className:"diary-voice-row",children:[a.jsxs("button",{className:"diary-voice-btn",onClick:S,children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"}),a.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}),a.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"22"})]}),"Записать"]}),g.voiceNote&&a.jsx("span",{className:"diary-voice-status",children:"✓ Распознано"})]}),a.jsx("textarea",{placeholder:"Распознанный текст появится здесь...",rows:3,value:g.comment,onChange:N=>We({...g,comment:N.target.value})})]}),a.jsxs("div",{className:"diary-section",children:[a.jsx("label",{className:"diary-section-label",children:"Аудиофайл (разговор с врачом)"}),a.jsx("input",{type:"file",accept:".mp3,.wav,.ogg,.m4a",className:"diary-audio-input",onChange:N=>We({...g,audioFile:N.target.files[0]})}),g.audioFile&&a.jsxs("span",{className:"diary-voice-status",children:["✓ ",g.audioFile.name]})]}),a.jsxs("button",{className:"diary-submit",onClick:b,children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("path",{d:"M22 2L11 13"}),a.jsx("path",{d:"M22 2l-7 20-4-9-9-4 20-7z"})]}),"Сохранить запись"]})]})})()})]})}),gv&&a.jsx("div",{className:"diary-overlay",onClick:()=>{es(!1),Pl(null),ts("")},children:a.jsxs("div",{className:"food-selector-modal",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"diary-header",children:[a.jsx("h3",{children:"Выберите блюдо"}),a.jsxs("div",{style:{display:"flex",gap:8},children:[a.jsxs("label",{className:"food-upload-btn",title:"Своё фото",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),a.jsx("path",{d:"M21 15l-5-5L5 21"})]}),"Своё фото",a.jsx("input",{type:"file",accept:"image/*",style:{display:"none"},onChange:u=>{if(u.target.files[0]&&Pt!==null&&It){const g=new FileReader;g.onload=()=>{Pl({custom:!0,src:g.result})},g.readAsDataURL(u.target.files[0])}}})]}),a.jsxs("button",{className:"daw-btn",onClick:()=>{if(console.log("SAVE: selectedFoodItem=",ut,"selectedFoodMealIdx=",Pt,"diaryData=",It),ut&&Pt!==null&&It){if(ut.custom){const u=[...It.meals];u[Pt]={...u[Pt],photo:ut.src},We({...It,meals:u}),console.log("SAVE: custom photo applied to meal",Pt)}else{const u=fo[ut.filename];if(u){const g=[...It.meals];g[Pt]={...g[Pt],photo:`/images/food/${ut.filename}`,description:u.dish_name||u.title,calories:String(u.nutrition.calories||""),protein:String(u.nutrition.protein||""),fat:String(u.nutrition.fat||""),carbs:String(u.nutrition.carbs||""),ndi:String(u.nutrition.ndi||""),recommendations:(u.recommendations||[]).join("; ")},We({...It,meals:g}),console.log("SAVE: catalog food applied to meal",Pt,ut.filename)}else console.log("SAVE ERROR: no catalog entry for",ut.filename)}es(!1),Pl(null),ts("")}else console.log("SAVE BLOCKED: missing condition",{item:!!ut,mealIdx:Pt,dd:!!It})},disabled:!ut,children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("path",{d:"M22 2L11 13"}),a.jsx("path",{d:"M22 2l-7 20-4-9-9-4 20-7z"})]}),"Сохранить"]}),a.jsx("button",{className:"food-popup-close",onClick:()=>{es(!1),Pl(null),ts("")},children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"18",height:"18",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})]}),a.jsxs("div",{className:"food-selector-search",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),a.jsx("input",{type:"text",placeholder:"Поиск блюд...",value:rr,onChange:u=>yv(u.target.value),autoFocus:!0})]}),a.jsx("div",{className:"food-selector-badges",children:[...new Set(Object.values(fo).flatMap(u=>u.keywords||[]))].sort().map(u=>a.jsx("span",{className:`food-selector-badge${cr===u?" active":""}`,onClick:()=>ts(g=>g===u?"":u),children:u},u))}),a.jsx("div",{className:"food-selector-grid",children:Object.entries(fo).filter(([u,g])=>{var N,E,D;const j=rr.toLowerCase(),S=!rr||((N=g.title)==null?void 0:N.toLowerCase().includes(j))||((E=g.dish_name)==null?void 0:E.toLowerCase().includes(j))||((D=g.meal_type)==null?void 0:D.toLowerCase().includes(j))||(g.ingredients||[]).some(A=>A.toLowerCase().includes(j)),b=!cr||(g.keywords||[]).includes(cr);return S&&b}).map(([u,g])=>{const j=ut&&!ut.custom&&ut.filename===u;return a.jsxs("div",{className:`food-selector-item${j?" selected":""}`,onClick:()=>{Pl(S=>S&&!S.custom&&S.filename===u?null:{filename:u})},children:[a.jsx("img",{src:`/images/food/${u}`,alt:g.title,className:"food-selector-img"}),j&&a.jsx("div",{className:"food-selector-check",children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"#4caf50",width:"28",height:"28",children:a.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"})})}),a.jsxs("div",{className:"food-selector-info",children:[a.jsx("div",{className:"food-selector-title",children:g.title}),a.jsxs("div",{className:"food-selector-nutri",children:[g.nutrition.calories," ккал | NDI ",g.nutrition.ndi]})]})]},u)})})]})}),or&&a.jsx("div",{className:"chat-modal-overlay",onClick:()=>dr(!1),children:a.jsxs("div",{className:"chat-modal",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"chat-modal-header",children:[a.jsxs("div",{className:"chat-header-left",children:[a.jsx("h3",{children:"HEALORA"}),a.jsx("span",{className:"chat-user-name",children:(i==null?void 0:i.name)||e||"—"}),a.jsxs("span",{className:"chat-header-stars",children:[P," ⭐"]}),a.jsx("div",{className:"chat-stars-bar-wrap",children:a.jsx("div",{className:"chat-stars-bar",style:{width:Math.min(100,P/2e3*100)+"%"}})})]}),a.jsxs("div",{className:"chat-header-right",children:[h&&a.jsxs("span",{className:"chat-day-counter",children:[r,"/30 · ",sa.filter(u=>u.done||u.skipped).length,"/",sa.length]}),a.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[Ra==="simulation"&&m.length>0&&!h&&a.jsxs("button",{className:"chat-start-btn",onClick:oh,children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("polygon",{points:"5 3 19 12 5 21 5 3"})}),"Запустить"]}),h&&a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"chat-sim-badge",children:"Симуляция..."}),a.jsxs("button",{className:"chat-start-btn stop",onClick:dh,children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("rect",{x:"6",y:"6",width:"12",height:"12"})}),"Стоп"]})]}),a.jsx("button",{className:`chat-gigachat-btn ${Ra==="gigachat"?"active":""}`,onClick:()=>_v(u=>u==="gigachat"?"simulation":"gigachat"),title:Ra==="gigachat"?"Симуляция":"GigaChat",children:Ra==="gigachat"?a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("polygon",{points:"5 3 19 12 5 21 5 3"})}):a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})})}),a.jsx("button",{className:"chat-close-btn",onClick:()=>dr(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})]})]}),a.jsx("div",{className:"chat-messages",ref:vs,children:Ra==="gigachat"?a.jsxs(a.Fragment,{children:[Ru.length===0&&a.jsx("div",{className:"chat-empty",children:"Спросите у GigaChat о здоровье, питании, тренировках"}),Ru.map(u=>a.jsx("div",{className:`chat-ai-msg ${u.user?"chat-ai-msg-user":"chat-ai-msg-bot"}`,children:a.jsxs("div",{className:"chat-ai-bubble",children:[a.jsx("span",{className:"chat-ai-text",children:u.text}),a.jsx("span",{className:"chat-interv-time",children:u.time})]})},u.id)),bv&&a.jsx("div",{className:"chat-ai-msg chat-ai-msg-bot",children:a.jsx("div",{className:"chat-ai-bubble",children:a.jsx("span",{className:"chat-ai-text",children:"..."})})})]}):a.jsxs(a.Fragment,{children:[sa.length===0&&!h&&a.jsx("div",{className:"chat-empty",children:m.length===0?"Нет запланированных интервенций. Создайте план.":"Нажмите «Запустить» чтобы начать симуляцию"}),(()=>{const u={sleep:"#2196f3",physical:"#4caf50",mental:"#9c27b0",food:"#ff9800",medical:"#f44336",supplement:"#795548"},g=Math.max(-1,...sa.map(N=>N.day)),j=Math.max(0,g-2),S=sa.filter(N=>N.day>=j),b={};return S.forEach(N=>{b[N.day]||(b[N.day]=[]),b[N.day].push(N)}),Object.entries(b).sort((N,E)=>N[0]-E[0]).map(([N,E])=>{const D=E.filter(A=>A.done).length;return a.jsxs(Re.Fragment,{children:[a.jsx("div",{className:"chat-date-divider",children:a.jsxs("span",{children:["День ",N," ",D>0&&a.jsxs("span",{className:"chat-day-done",children:[D,"/",E.length]})]})}),a.jsx("div",{className:"chat-interventions-row",children:E.map(A=>{if(A.user)return a.jsxs("div",{className:"chat-user-message",children:[A.photo&&a.jsx("img",{src:A.photo,className:"chat-user-photo",alt:""}),a.jsx("span",{className:"chat-user-text",children:A.text}),a.jsx("span",{className:"chat-interv-time",children:A.time})]},A.id);const U=u[A.category]||"#6b21c8";return a.jsxs("div",{className:`chat-interv-card ${A.done?"done":A.skipped?"skipped":""}`,children:[a.jsxs("div",{className:"chat-interv-card-top",children:[a.jsxs("span",{className:"chat-interv-badge",style:{borderLeftColor:U},children:[a.jsx("span",{className:"chat-interv-badge-name",children:A.name}),a.jsx("span",{className:"chat-interv-badge-code",children:A.code})]}),a.jsx("span",{className:"chat-interv-time",children:A.time})]}),A.done?a.jsx("div",{className:"chat-interv-card-status done",children:"✓ Выполнено"}):A.skipped?a.jsx("div",{className:"chat-interv-card-status skipped",children:"✗ Пропущено"}):a.jsxs("div",{className:"chat-interv-card-actions",children:[a.jsxs("div",{className:"chat-interv-deadline",children:[a.jsx("span",{className:"chat-deadline-label",children:"⏰ до"}),a.jsxs("select",{className:"chat-deadline-select",value:A.deadline,onChange:V=>qt(K=>K.map(ce=>ce.id===A.id?{...ce,deadline:V.target.value}:ce)),children:[a.jsx("option",{value:"23:59",children:"23:59"}),a.jsx("option",{value:"11:00",children:"11:00 (завтрак)"}),a.jsx("option",{value:"22:00",children:"22:00 (отход ко сну)"}),a.jsx("option",{value:"07:00",children:"07:00 (раннее пробуждение)"}),a.jsx("option",{value:"—",children:"нет дедлайна"})]})]}),a.jsxs("div",{className:"chat-interv-btns",children:[a.jsx("button",{className:"chat-btn-done",onClick:()=>qt(V=>V.map(K=>K.id===A.id?{...K,done:!0,skipped:!1}:K)),children:"✓"}),a.jsx("button",{className:"chat-btn-skip",onClick:()=>qt(V=>V.map(K=>K.id===A.id?{...K,skipped:!0,done:!1}:K)),children:"✗"})]})]})]},A.id)})})]},N)})})(),tn==="profile"&&a.jsxs("div",{className:"chat-diary-form",children:[a.jsxs("div",{className:"chat-diary-header",children:[a.jsx("span",{className:"chat-diary-title",children:"👤 Профиль"}),a.jsx("button",{className:"chat-diag-close",onClick:()=>nn("none"),children:"×"})]}),a.jsxs("div",{className:"chat-diary-body",children:[a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"Имя"}),a.jsx("span",{className:"chat-profile-value",children:(i==null?void 0:i.name)||"—"})]}),a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"ID"}),a.jsx("span",{className:"chat-profile-value",children:e||"—"})]}),a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"Возраст"}),a.jsxs("span",{className:"chat-profile-value",children:[((Am=i==null?void 0:i.demographics)==null?void 0:Am.age)||"—"," лет"]})]}),a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"Пол"}),a.jsx("span",{className:"chat-profile-value",children:((Tm=i==null?void 0:i.demographics)==null?void 0:Tm.sex)==="male"?"М":"Ж"})]}),a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"Вес"}),a.jsxs("span",{className:"chat-profile-value",children:[((Rm=i==null?void 0:i.anthropometrics)==null?void 0:Rm.weight_kg)||"—"," кг"]})]}),a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"Рост"}),a.jsxs("span",{className:"chat-profile-value",children:[((Om=i==null?void 0:i.anthropometrics)==null?void 0:Om.height_cm)||"—"," см"]})]}),a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"ИМТ"}),a.jsx("span",{className:"chat-profile-value",children:((Bm=i==null?void 0:i.anthropometrics)==null?void 0:Bm.bmi)||"—"})]}),a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"Healora Score"}),a.jsxs("span",{className:"chat-profile-value",children:[((zm=i==null?void 0:i.digital_twin_scores)==null?void 0:zm.current_stars)||0," ⭐"]})]}),a.jsxs("div",{className:"chat-profile-row",children:[a.jsx("span",{className:"chat-profile-label",children:"Риск"}),a.jsx("span",{className:`chat-profile-value risk-${((Lm=i==null?void 0:i.digital_twin_scores)==null?void 0:Lm.risk_level)||"unknown"}`,children:((Hm=i==null?void 0:i.digital_twin_scores)==null?void 0:Hm.risk_level)||"—"})]})]})]},"chat-profile"),tn==="plan"&&a.jsxs("div",{className:"chat-diary-form",children:[a.jsxs("div",{className:"chat-diary-header",children:[a.jsx("span",{className:"chat-diary-title",children:"📋 План интервенций"}),a.jsx("button",{className:"chat-diag-close",onClick:()=>nn("none"),children:"×"})]}),a.jsx("div",{className:"chat-diary-body",children:m.length===0?a.jsx("div",{className:"chat-plan-empty",children:"Нет запланированных интервенций"}):[...new Set(m.map(u=>u.code))].map(u=>{const g=m.filter(b=>b.code===u),j=g[0],S={sleep:"#2196f3",physical:"#4caf50",mental:"#9c27b0",food:"#ff9800",medical:"#f44336",supplement:"#795548"};return a.jsxs("div",{className:"chat-plan-item",style:{borderLeftColor:S[j.category]||"#6b21c8"},children:[a.jsxs("div",{className:"chat-plan-item-top",children:[a.jsx("span",{className:"chat-plan-item-name",children:j.name}),a.jsx("span",{className:"chat-plan-item-code",children:u})]}),a.jsx("div",{className:"chat-plan-item-days",children:g.map(b=>a.jsxs("span",{className:"chat-plan-day-badge",style:{backgroundColor:b.day<=r?S[j.category]||"#6b21c8":"#e0e0e0",color:b.day<=r?"#fff":"#999"},children:["Д",b.day]},b.day))})]},u)})})]},"chat-plan"),tn==="diary"&&Ta&&(()=>{const u=Ta,g=(b,N,E)=>{const D=[...u.meals];D[b]={...D[b],[N]:E},en({...u,meals:D})},j=(b,N)=>{if(!N)return;const E=new FileReader;E.onload=()=>g(b,"photo",E.result),E.readAsDataURL(N)},S=()=>{const b=u.meals.reduce((D,A)=>D+(Number(A.calories)||0),0),N=u.meals.reduce((D,A)=>D+(Number(A.protein)||0),0),E=`📋 День ${u.day}: ${b} ккал, ${N}г белка, вода ${u.waterMl}мл`;qt(D=>[...D,{id:`diary_${Date.now()}`,type:"diary",day:u.day,text:E,user:!0,time:new Date().toLocaleTimeString()}]),We(u),Ii(u.day),Ul(!0),pv(!1),en(null)};return a.jsxs("div",{className:"chat-diary-form",children:[a.jsxs("div",{className:"chat-diary-header",children:[a.jsx("span",{className:"chat-diary-title",children:"📋 Дневник питания"}),a.jsxs("span",{className:"chat-diary-day",children:["День",a.jsx("button",{className:"chat-diary-day-btn",onClick:()=>{const b=u.day-1;b>=0&&(en({...u,day:b}),ir(b))},disabled:u.day<=0,children:"−"}),a.jsx("span",{className:"chat-diary-day-val",children:u.day}),a.jsx("button",{className:"chat-diary-day-btn",onClick:()=>{const b=u.day+1;b<=30&&(en({...u,day:b}),ir(b))},disabled:u.day>=30,children:"+"})]})]}),u.meals.map((b,N)=>a.jsxs("div",{className:"chat-diary-meal",children:[a.jsx("div",{className:"chat-diary-meal-header",children:b.label}),a.jsxs("div",{className:"chat-diary-meal-fields",children:[a.jsx("input",{className:"chat-diary-input",placeholder:"🔍 Описание",value:b.description,onChange:E=>g(N,"description",E.target.value)}),a.jsx("input",{className:"chat-diary-input sm",placeholder:"ккал",type:"number",value:b.calories,onChange:E=>g(N,"calories",E.target.value)}),a.jsx("input",{className:"chat-diary-input sm",placeholder:"белки",type:"number",value:b.protein,onChange:E=>g(N,"protein",E.target.value)}),a.jsx("input",{className:"chat-diary-input sm",placeholder:"жиры",type:"number",value:b.fat,onChange:E=>g(N,"fat",E.target.value)}),a.jsx("input",{className:"chat-diary-input sm",placeholder:"углеводы",type:"number",value:b.carbs,onChange:E=>g(N,"carbs",E.target.value)}),a.jsxs("label",{className:"chat-diary-photo-btn",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),a.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),a.jsx("polyline",{points:"21 15 16 10 5 21"})]}),a.jsx("input",{type:"file",accept:"image/*",hidden:!0,onChange:E=>{j(N,E.target.files[0]),E.target.value=""}})]}),b.photo&&a.jsx("img",{src:b.photo,className:"chat-diary-photo-preview",alt:""})]})]},b.type)),a.jsxs("div",{className:"chat-diary-row",children:[a.jsx("span",{className:"chat-diary-label",children:"💧 Вода"}),a.jsx("input",{className:"chat-diary-input",placeholder:"мл",type:"number",value:u.waterMl||"",onChange:b=>en({...u,waterMl:Number(b.target.value)})})]}),a.jsxs("div",{className:"chat-diary-row",children:[a.jsx("span",{className:"chat-diary-label",children:"😊 Самочувствие"}),a.jsx("div",{className:"chat-diary-mood",children:["energy","mood","sleep","stress","digestion"].map(b=>a.jsxs("select",{className:"chat-diary-select",value:u.mood[b],onChange:N=>en({...u,mood:{...u.mood,[b]:N.target.value}}),children:[a.jsx("option",{value:"",children:b}),[1,2,3,4,5].map(N=>a.jsx("option",{value:N,children:N},N))]},b))})]}),a.jsx("button",{className:"chat-diary-submit",onClick:S,children:"✓ Сохранить"})]},"chat-diary")})(),tn==="food"&&a.jsxs("div",{className:"chat-diary-form",children:[a.jsxs("div",{className:"chat-diary-header",children:[a.jsx("span",{className:"chat-diary-title",children:"📸 Фото еды"}),a.jsx("button",{className:"chat-diag-close",onClick:()=>nn("none"),children:"×"})]}),a.jsxs("div",{className:"chat-diary-body",children:[a.jsxs("label",{className:"chat-food-upload",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),a.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),a.jsx("polyline",{points:"21 15 16 10 5 21"})]}),a.jsx("span",{children:"Загрузить фото еды"}),a.jsx("input",{type:"file",accept:"image/*",hidden:!0,onChange:u=>{const g=u.target.files[0];if(!g)return;const j=new FileReader;j.onload=()=>sr(j.result),j.readAsDataURL(g),u.target.value=""}})]}),Gl&&a.jsxs("div",{className:"chat-food-preview-wrap",children:[a.jsx("img",{src:Gl,className:"chat-food-preview-img",alt:"food"}),a.jsx("button",{className:"chat-food-remove",onClick:()=>sr(null),children:"×"})]}),a.jsx("button",{className:"chat-diary-submit",onClick:()=>{if(Gl){if(qt(u=>[...u,{id:`food_${Date.now()}`,type:"food",day:r,text:"📸 Фото еды загружено",photo:Gl,user:!0,time:new Date().toLocaleTimeString()}]),Ta&&tn==="food"){const u=Ta.meals.findIndex(g=>!g.photo);if(u>=0){const g=[...Ta.meals];g[u]={...g[u],photo:Gl},en({...Ta,meals:g})}}sr(null),nn("none")}},children:"✓ Отправить в чат"})]})]},"chat-food"),h&&a.jsxs("div",{className:"chat-typing",children:[a.jsx("span",{className:"typing-dot"}),a.jsx("span",{className:"typing-dot"}),a.jsx("span",{className:"typing-dot"})]})]})}),a.jsxs("div",{className:"chat-actions-bar",children:[a.jsxs("button",{className:"chat-action-btn",onClick:()=>nn(tn==="profile"?"none":"profile"),children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),a.jsx("circle",{cx:"12",cy:"7",r:"4"})]})," Профиль"]}),a.jsxs("button",{className:"chat-action-btn",onClick:()=>nn(tn==="plan"?"none":"plan"),children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),a.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),a.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),a.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]})," План"]}),a.jsxs("button",{className:"chat-action-btn",onClick:()=>{if(tn==="diary"){nn("none"),en(null);return}nn("diary"),ir(Tu??r),en(ra(Tu??r))},children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),a.jsx("polyline",{points:"14 2 14 8 20 8"}),a.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),a.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]})," Дневник"]}),a.jsxs("button",{className:"chat-action-btn",onClick:()=>nn(tn==="food"?"none":"food"),children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),a.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),a.jsx("polyline",{points:"21 15 16 10 5 21"})]})," Фото еды"]})]}),a.jsxs("div",{className:"chat-input-bar",children:[a.jsx("input",{type:"text",className:"chat-input",ref:ql,placeholder:"Напишите сообщение...",defaultValue:"",onKeyDown:u=>{u.key==="Enter"&&uh()}}),a.jsx("button",{className:"chat-send-btn",onClick:uh,children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),a.jsx("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})]})})]})]})}),Sv&&a.jsx("div",{className:"voice-overlay",onClick:()=>{fr!=="recording"&&(Ha(),Vl(!1),Yl("idle"),za(""),La([]),kn({}),ns(""),ls(!1),Ql(!1))},children:a.jsxs("div",{className:"voice-popup",onClick:u=>u.stopPropagation(),children:[a.jsx("button",{className:"voice-close",onClick:()=>{fr!=="recording"&&(Ha(),Vl(!1),Yl("idle"),za(""),La([]),kn({}),ns(""),ls(!1),Ql(!1))},children:"×"}),a.jsxs("div",{className:"voice-header",children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"#6b21c8",strokeWidth:"2",width:"24",height:"24",children:a.jsx("path",{d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})}),a.jsx("h3",{children:"Редактор параметров"})]}),a.jsxs("p",{className:"voice-desc",children:["Заполните раздел ",a.jsxs("strong",{children:["«",((Um=Vt[Ba])==null?void 0:Um.title)||Ba,"»"]})," голосом. ",Iv(Ba)]}),Lu&&a.jsxs("div",{className:"voice-error-banner",children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"#d32f2f",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),a.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),a.jsx("span",{children:Lu})]}),a.jsx("div",{className:"voice-top-bar",children:a.jsxs("div",{className:"voice-top-right",children:[fr==="recording"&&a.jsxs("span",{className:"voice-rec-indicator",children:[a.jsx("span",{className:`voice-rec-dot ${Hu?"speaking":""}`}),Hu?"Голос":"..."]}),a.jsx("button",{className:"voice-settings-gear",onClick:()=>{const u=!Uu;Ql(u),u?(pr.length===0&&Qu(),is&&setTimeout(()=>Yu(is),100)):Ha()},title:"Настройки микрофона",children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),Uu&&a.jsxs("div",{className:"voice-settings-dropdown",children:[a.jsxs("div",{className:"voice-settings-item",children:[a.jsx("span",{className:"voice-settings-label",children:"Язык распознавания"}),a.jsxs("select",{className:"voice-settings-select",value:Gu,onChange:u=>Ev(u.target.value),children:[a.jsx("option",{value:"ru-RU",children:"Русский"}),a.jsx("option",{value:"en-US",children:"English"}),a.jsx("option",{value:"de-DE",children:"Deutsch"}),a.jsx("option",{value:"fr-FR",children:"Français"}),a.jsx("option",{value:"es-ES",children:"Español"}),a.jsx("option",{value:"it-IT",children:"Italiano"}),a.jsx("option",{value:"zh-CN",children:"中文"}),a.jsx("option",{value:"ja-JP",children:"日本語"})]})]}),a.jsxs("div",{className:"voice-settings-item",children:[a.jsx("span",{className:"voice-settings-label",children:"Микрофон"}),a.jsxs("div",{className:"voice-settings-mic-row",children:[a.jsxs("select",{className:"voice-settings-select",value:is,onChange:u=>Av(u.target.value),children:[pr.length===0&&a.jsx("option",{value:"",children:kv?"Загрузка...":"Не найдены"}),pr.map(u=>a.jsx("option",{value:u.deviceId,children:u.label||`Микрофон ${u.deviceId.slice(0,8)}...`},u.deviceId))]}),a.jsx("button",{className:"voice-settings-refresh",onClick:Qu,title:"Обновить",children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"12",height:"12",children:[a.jsx("polyline",{points:"23 4 23 10 17 10"}),a.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]})})]}),Mv&&a.jsxs("div",{className:"voice-level-meter",children:[a.jsx("div",{className:"voice-level-bar",children:a.jsx("div",{className:"voice-level-fill",style:{width:`${ss}%`,background:ss>60?"#4caf50":ss>20?"#ff9800":"#9e9e9e"}})}),a.jsxs("span",{className:"voice-level-label",children:[ss,"%"]})]})]})]})]})}),zu&&a.jsx("div",{className:"voice-transcript-section",children:a.jsx("textarea",{className:"voice-transcript-input",value:zu,onChange:u=>{za(u.target.value);const g=Jv(u.target.value,Ba);La(g),kn(j=>{const S={...j};return g.forEach(b=>{S[b.attrId]=b.value}),S})},rows:2,placeholder:""})}),(()=>{const u=Vt[Ba],g=u?u.attributes:[],j=Object.entries(as).filter(([b,N])=>{if(N==="")return!1;const E=g.find(D=>D.id===b);return E?N!=E.current:!1}).length,S=new Set(Cv.map(b=>b.attrId));return a.jsxs("div",{className:"voice-form-section",children:[a.jsxs("label",{className:"voice-section-label",children:["Параметры раздела «",(u==null?void 0:u.title)||"","»"]}),a.jsx("div",{className:"voice-form-list",children:g.map(b=>{const N=S.has(b.id),E=as[b.id]!==void 0?String(as[b.id]):"",D=E!==""&&E!=b.current;return a.jsxs("div",{className:`voice-form-row ${N?"detected":""} ${D?"changed":""} ${E?"filled":""}`,children:[a.jsx("span",{className:"voice-form-label",children:b.name}),a.jsxs("div",{className:"voice-form-input-wrap",children:[a.jsx("input",{className:"voice-form-input",type:"text",placeholder:b.unit?`введите ${b.unit}`:"введите значение",value:E,onChange:A=>kn(U=>({...U,[b.id]:A.target.value}))}),N&&a.jsx("span",{className:"voice-form-badge",children:"✓"})]}),a.jsx("span",{className:"voice-form-orig",children:Cr(Kl(b))}),a.jsx("button",{className:"voice-form-mic",title:"Продиктовать",onClick:()=>{if(!("webkitSpeechRecognition"in window)&&!("SpeechRecognition"in window))return;const A=new(window.SpeechRecognition||window.webkitSpeechRecognition);A.lang=Gu,A.interimResults=!1,A.onresult=U=>{const V=U.results[0][0].transcript;kn(K=>({...K,[b.id]:V}))},A.start()},children:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",children:a.jsx("path",{d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})})})]},b.id)})}),a.jsxs("div",{className:"voice-actions",children:[a.jsx("button",{className:"voice-done-btn",onClick:()=>{Ha(),Vl(!1),Yl("idle"),za(""),La([]),kn({}),ns(""),ls(!1),Ql(!1)},children:"Отмена"}),a.jsxs("button",{className:"voice-apply-btn",disabled:j===0,onClick:()=>{Ha();const b=Object.entries(as).filter(([,N])=>N!=="").map(([N,E])=>{const D=g.find(V=>V.id===N),A=parseFloat(String(E).replace(",",".")),U=isNaN(A)?E:A;return{attrId:N,value:U,label:(D==null?void 0:D.name)||N,displayValue:D!=null&&D.unit?`${U} ${D.unit}`:String(U)}});Fv(Ba,b),Vl(!1),Yl("idle"),za(""),La([]),kn({}),ns(""),ls(!1),Ql(!1)},children:["Применить (",j,")"]})]})]})})()]})}),fs&&a.jsx("div",{className:"practice-overlay",onClick:()=>vr(null),children:a.jsxs("div",{className:"practice-popup",onClick:u=>u.stopPropagation(),children:[a.jsx("button",{className:"practice-close",onClick:()=>vr(null),children:"×"}),fs.regulatory&&a.jsxs("div",{className:"practice-regulatory",children:[a.jsx("span",{className:"reg-label",children:"Нормативная база:"}),a.jsx("span",{className:"reg-text",children:fs.regulatory})]}),a.jsx("div",{className:"practice-content",dangerouslySetInnerHTML:{__html:po(fs.content)}})]})}),eh&&a.jsx("div",{className:"practice-overlay",onClick:()=>xr(null),children:a.jsxs("div",{className:"practice-popup",onClick:u=>u.stopPropagation(),children:[a.jsx("button",{className:"practice-close",onClick:()=>xr(null),children:"×"}),a.jsx("div",{className:"practice-content",dangerouslySetInnerHTML:{__html:po(eh.content)}})]})}),th&&a.jsx("div",{className:"practice-overlay",onClick:()=>_r(null),children:a.jsxs("div",{className:"practice-popup",onClick:u=>u.stopPropagation(),children:[a.jsx("button",{className:"practice-close",onClick:()=>_r(null),children:"×"}),a.jsx("div",{className:"practice-content",dangerouslySetInnerHTML:{__html:po(th.content)}})]})})]})]})};function po(e){const t=e.split(`
`),n=[];let l=!1,i=[],s=!1;function c(p){return p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function o(p){return p.replace(/\*\*(.+?)\*\*/g,(f,x)=>"<strong>"+c(x)+"</strong>").replace(/`([^`]+)`/g,(f,x)=>"<code>"+c(x)+"</code>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,(f,x,C)=>'<a href="'+c(C)+'" target="_blank">'+c(x)+"</a>")}function r(p){return o(c(p))}function d(){l&&(i.length>0&&(n.push("<table>"),i.forEach((p,f)=>{f===0?n.push("<thead><tr>"+p.map(x=>"<th>"+c(x)+"</th>").join("")+"</tr></thead><tbody>"):n.push("<tr>"+p.map(x=>"<td>"+r(x)+"</td>").join("")+"</tr>")}),n.push("</tbody></table>")),l=!1,i=[])}function h(){s&&(n.push("</ul>"),s=!1)}for(const p of t){const f=p.trimEnd();if(!f.trim()){d(),h();continue}if(f.startsWith("# ")&&!f.startsWith("## ")){d(),h(),n.push("<h1>"+c(f.slice(2))+"</h1>");continue}if(f.startsWith("## ")&&!f.startsWith("### ")){d(),h(),n.push("<h2>"+c(f.slice(3))+"</h2>");continue}if(f.startsWith("### ")){d(),h();const x=f.slice(4);x.startsWith("Category:")?n.push('<div class="practice-category">'+c(x)+"</div>"):n.push("<h3>"+c(x)+"</h3>");continue}if(f.trim()==="---"){d(),h();continue}if(f.startsWith("|")){h();const x=f.split("|").filter(C=>C.trim()).map(C=>C.trim());if(x.length&&x.every(C=>/^[-:\s]+$/.test(C)))continue;l=!0,i.push(x);continue}if(f.startsWith("- ")){d(),s||(n.push("<ul>"),s=!0),n.push("<li>"+r(f.slice(2))+"</li>");continue}d(),h(),f.startsWith("*")&&f.endsWith("*")&&!f.startsWith("**")?n.push('<p class="practice-footer">'+r(f.slice(1,-1))+"</p>"):n.push("<p>"+r(f)+"</p>")}return d(),h(),n.join(`
`)}const zj=()=>{const e=ia(),[t,n]=y.useState([]),[l,i]=y.useState(!0),s=()=>a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("path",{d:"M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"}),a.jsx("path",{d:"M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"}),a.jsx("path",{d:"M7 21h10"}),a.jsx("path",{d:"M12 3v18"}),a.jsx("path",{d:"M3 7h2c2 0 5-1 7-3 2 5 3 7 3z"})]}),c=()=>a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("circle",{cx:"12",cy:"5",r:"2"}),a.jsx("path",{d:"M12 7v4"}),a.jsx("path",{d:"M8 21l4-4 2 2"}),a.jsx("path",{d:"M15 21l-2-2"}),a.jsx("path",{d:"M9 17l-2-6"}),a.jsx("path",{d:"M8 11l3-3"})]}),o=()=>a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:a.jsx("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79z"})}),r=()=>a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:a.jsx("path",{d:"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"})}),d=()=>a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),a.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]});return y.useEffect(()=>{n([{id:1,title:"Пить 8 стаканов воды",progress:75,category:"Nutrition",icon:a.jsx(r,{})},{id:2,title:"Спать 7-8 часов",progress:60,category:"Recovery",icon:a.jsx(o,{})},{id:3,title:"Ходить 10000 шагов",progress:45,category:"Activity",icon:a.jsx(c,{})},{id:4,title:"Медитировать 10 мин",progress:30,category:"Recovery",icon:a.jsx(s,{})},{id:5,title:"Читать 30 мин",progress:50,category:"Knowledge",icon:a.jsx(d,{})}]),i(!1)},[]),l?a.jsxs("div",{className:"progress-container",children:[a.jsx("div",{className:"progress-header",children:a.jsxs("div",{className:"phone-header",onClick:()=>e("/chat"),children:[a.jsx("img",{src:"/images/healora.png",alt:"Healora",className:"logo"}),a.jsx("div",{children:a.jsxs("div",{className:"score",children:[a.jsx("span",{id:"total-stars",children:"840"})," звёзд"]})})]})}),a.jsx("div",{style:{padding:"20px",textAlign:"center"},children:"Загрузка..."})]}):a.jsxs("div",{className:"progress-container",children:[a.jsxs("div",{className:"progress-header",children:[a.jsxs("div",{className:"phone-header",onClick:()=>e("/chat"),children:[a.jsx("img",{src:"/images/healora.png",alt:"Healora",className:"logo"}),a.jsx("div",{children:a.jsxs("div",{className:"score",children:[a.jsx("span",{id:"total-stars",children:"840"})," звёзд"]})})]}),a.jsx("h2",{children:"Ваши Цели"})]}),a.jsxs("div",{className:"progress-content",children:[a.jsxs("div",{className:"profile-section",children:[a.jsx("h3",{children:"Текущие цели:"}),a.jsx("div",{className:"goals-list",children:t.map(h=>a.jsxs("div",{className:"goal-card",children:[a.jsxs("div",{className:"goal-header",children:[a.jsx("span",{className:"goal-icon",children:h.icon}),a.jsx("span",{className:"goal-title",children:h.title}),a.jsx("span",{className:"goal-category",children:h.category})]}),a.jsxs("div",{className:"goal-progress",children:[a.jsx("div",{className:"progress-bar",children:a.jsx("div",{className:"progress-fill",style:{width:`${h.progress}%`}})}),a.jsxs("span",{className:"progress-text",children:[h.progress,"%"]})]})]},h.id))})]}),a.jsxs("div",{className:"profile-section",children:[a.jsx("h3",{children:"Прогресс по категориям:"}),a.jsx("div",{className:"categories-grid",children:["Knowledge","Activity","Recovery","Nutrition","Specialists"].map(h=>{const p=t.filter(C=>C.category===h),f=p.reduce((C,k)=>C+k.progress,0),x=p.length>0?Math.round(f/p.length):0;return a.jsxs("div",{className:"category-card",children:[a.jsx("div",{className:"category-name",children:h}),a.jsxs("div",{className:"category-progress",children:[a.jsx("div",{className:"progress-bar",children:a.jsx("div",{className:"progress-fill",style:{width:`${x}%`}})}),a.jsxs("span",{className:"progress-text",children:[x,"%"]})]})]},h)})})]})]})]})},Lj=()=>{const e=ia(),t=Gt(),n=[{path:"/chat",icon:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),label:"Chat",active:t.pathname==="/chat"},{path:"/path",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),a.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),label:"Path",active:t.pathname==="/path"},{path:"/goals",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("circle",{cx:"12",cy:"12",r:"6"}),a.jsx("circle",{cx:"12",cy:"12",r:"2"})]}),label:"Goals",active:t.pathname==="/goals"},{path:"/digital-twin",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("path",{d:"M12 1v6m0 6v6"}),a.jsx("path",{d:"M1 12h6m6 0h6"}),a.jsx("path",{d:"M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24"}),a.jsx("path",{d:"M19.78 4.22l-4.24 4.24m-7.08 7.08l-4.24 4.24"})]}),label:"Twin",active:t.pathname==="/digital-twin"},{path:"/profile",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),a.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),label:"Profile",active:t.pathname==="/profile"}];return a.jsxs("div",{className:"bottom-nav",id:"EL_COMP_010",children:[n.map(l=>a.jsxs("button",{className:`nav-item ${l.active?"active":""}`,onClick:()=>e(l.path),children:[a.jsx("span",{className:"nav-icon",children:l.icon}),a.jsx("span",{className:"nav-label",children:l.label})]},l.path)),a.jsx("style",{children:`
        .bottom-nav {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          border-top: 1px solid #d1c4e9;
          display: flex;
          justify-content: space-around;
          padding: 8px 0;
          z-index: 100;
          flex-shrink: 0;
        }
        
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.3s;
          color: #7b1fa2;
        }
        
        .nav-item:hover {
          background: #f3e5f5;
        }
        
        .nav-item.active {
          background: #6b21c8;
          color: white;
        }
        
        .nav-item.active .nav-icon svg {
          stroke: white;
        }
        
        .nav-icon {
          width: 24px;
          height: 24px;
        }
        
        .nav-icon svg {
          width: 100%;
          height: 100%;
        }
        
        .nav-label {
          font-size: 10px;
          font-weight: 500;
        }
      `})]})},Bs=({children:e,title:t="Healora",showBottomNav:n=!0})=>a.jsx("div",{className:"phone-container",children:a.jsxs("div",{className:"phone",children:[a.jsxs("div",{className:"phone-header",id:"EL_COMP_003",children:[a.jsx("img",{src:"/images/healora.png",alt:"Healora",className:"logo"}),a.jsxs("div",{children:[a.jsxs("div",{className:"score",children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",id:"EL_ICON_010",children:a.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})}),a.jsx("span",{id:"total-stars",children:"840"})," звёзд"]}),a.jsxs("div",{className:"progress",children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"14",height:"14",id:"EL_ICON_014",children:a.jsx("path",{d:"M12 2c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1V3c0-.5.5-1 1-1zm0 18c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1v-1c0-.5.5-1 1-1zm10-8c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1h-1c-.5 0-1 .5-1 1zM2 12c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1H3c-.5 0-1 .5-1 1zm16.95-7.95c.4.4.4 1 0 1.4l-.71.71c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l.71-.71c.4-.39 1.03-.39 1.41 0z"})}),"68% плана | 5 дней подряд"]})]})]}),a.jsx("div",{className:"screen",children:e}),n&&a.jsx(Lj,{})]})});const Hj=({selectedProfile:e,onSelectProfile:t,onEditProfile:n,isEditMode:l=!1})=>{const[i,s]=y.useState([]),[c,o]=y.useState(!0),[r,d]=y.useState(null),[h,p]=y.useState(!1),f=["03_Natalia_42_salad.png","10_Alex_48_soup.png","16_Anastasia_37_street.png","01_Maia_55_flowers.png","02_Stepan_14_on_bench.png","04_Nina_75_Oleg_27_notebook.png","05_Дмитрий_55_notepad.png","06_Maria_43_kitchen_apron.png","07_Ivan_13_chips.png","08_Galina_75_Vika_9_balcony.png","09_Tanya_15_pasta.png","11_Nilolay_23_chocolate_bar.png","12_Galina_43_remote_work.png","14_Ekaterina_39_wearable.png","15_Polina_21_coffie.png","17_Stepan_72_terier.png","17_Stepan_72_terier_2.png","19_Danil_29_sofa_blue_jeanse.png","19_Stas_35_dog_bike.png","20_Irina_31_box_openspace.png","21_Yulia_35_coffie_white_blouse.png","22_Varya_30_yoga.png","23_Alina_26_baby_carriage_park.png","23_Ken_38_vegitables.png","24_Alla_38_mirror.png","24_fam_white_kitchen.png","24_Masha_Andrey_caffe.png","25_Katya_29_office.png","26_Alex_Regina_desert.png","29_cinema_family.png"];y.useEffect(()=>{fetch("/api/profiles").then(m=>{if(!m.ok)throw new Error("HTTP "+m.status);return m.json()}).then(m=>{const _=m.profiles||[],w=Ep(),O=[],L=new Set;w.forEach(z=>{const P=_.find(Y=>Y.profile_id===z.profile_id);P?(O.push({...z,...P}),L.add(P.profile_id)):O.push(z)}),_.forEach(z=>{L.has(z.profile_id)||O.push(z)}),s(O),o(!1)}).catch(()=>{s(Ep()),o(!1)})},[]);const x=m=>m==="low"?"#00c853":m==="high"?"#d50000":"#ff9100",C=m=>m<18.5||m>25?"warning":"good",k=()=>a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:[a.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),a.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),M=()=>a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"24",height:"24",children:[a.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),a.jsx("circle",{cx:"12",cy:"7",r:"4"}),a.jsx("line",{x1:"17",y1:"11",x2:"23",y2:"11"}),a.jsx("line",{x1:"20",y1:"8",x2:"20",y2:"14"})]}),v=()=>a.jsx("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"#ffc107",stroke:"none",children:a.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})});return a.jsxs("div",{className:"user-avatar-panel",children:[a.jsxs("div",{className:"panel-header",children:[a.jsx("h3",{children:"Digital Twins"}),a.jsxs("span",{className:"count",children:[i.length," profiles"]})]}),a.jsx("div",{className:"profiles-list",children:c?a.jsx("div",{className:"loading",children:"Loading profiles..."}):i.map((m,_)=>{var w,O,L,z,P,Y,Q,I,_e,Qe,Te,H,B,q,G,ee;return a.jsxs("div",{className:`profile-card ${e===m.profile_id?"selected":""}`,onClick:()=>t(m.profile_id),children:[a.jsxs("div",{className:"avatar",children:[m.photo?a.jsx("div",{className:"avatar-circle",style:{background:`linear-gradient(135deg, ${x((w=m.digital_twin_scores)==null?void 0:w.risk_level)}20, ${x((O=m.digital_twin_scores)==null?void 0:O.risk_level)}40)`,overflow:"hidden"},children:a.jsx("img",{src:`/images/pers/32_32/${m.photo}`,alt:m.profile_id,className:"profile-photo",onError:T=>{T.target.style.display="none",T.target.parentElement.innerHTML+='<span class="avatar-icon"></span>'}})}):a.jsx("div",{className:"avatar-circle",style:{background:`linear-gradient(135deg, ${x((L=m.digital_twin_scores)==null?void 0:L.risk_level)}20, ${x((z=m.digital_twin_scores)==null?void 0:z.risk_level)}40)`},children:a.jsx("span",{className:"avatar-icon",children:((P=m.demographics)==null?void 0:P.sex)==="female"?a.jsx(k,{}):a.jsx(M,{})})}),a.jsx("div",{className:"status-dot",style:{background:x((Y=m.digital_twin_scores)==null?void 0:Y.risk_level)}})]}),a.jsxs("div",{className:"profile-info",children:[a.jsxs("div",{className:"profile-name",children:[m.name||(((Q=m.demographics)==null?void 0:Q.sex)==="female"?"Female":"Male")," ",(I=m.demographics)==null?void 0:I.age,"y",a.jsxs("span",{className:"profile-id",children:["(",m.profile_id,")"]}),l&&a.jsx("button",{className:"edit-btn",onClick:T=>{T.stopPropagation(),d(m),p(!0)},children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"10",height:"10",children:[a.jsx("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),a.jsx("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})})]}),a.jsxs("div",{className:"profile-params",children:[a.jsxs("span",{className:`param ${C((_e=m.anthropometrics)==null?void 0:_e.bmi)}`,children:["BMI ",(Qe=m.anthropometrics)==null?void 0:Qe.bmi]}),a.jsxs("span",{className:"param",children:[(Te=m.vitals)==null?void 0:Te.systolic_bp_mmhg,"/",(H=m.vitals)==null?void 0:H.diastolic_bp_mmhg]})]}),a.jsxs("div",{className:"profile-scores",children:[a.jsxs("span",{className:"stars",children:[a.jsx(v,{})," ",((B=m.digital_twin_scores)==null?void 0:B.current_stars)||0]}),a.jsx("span",{className:"risk-badge",style:{background:x((q=m.digital_twin_scores)==null?void 0:q.risk_level)+"20",color:x((G=m.digital_twin_scores)==null?void 0:G.risk_level)},children:((ee=m.digital_twin_scores)==null?void 0:ee.risk_level)||"unknown"})]})]})]},m.profile_id||_)})}),h&&a.jsx("div",{className:"photo-selector-overlay",onClick:()=>p(!1),children:a.jsxs("div",{className:"photo-selector",onClick:m=>m.stopPropagation(),children:[a.jsxs("div",{className:"photo-selector-header",children:[a.jsx("h4",{children:"Выберите фото"}),a.jsx("button",{className:"close-btn",onClick:()=>p(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsx("div",{className:"photo-grid",children:f.map(m=>a.jsx("div",{className:`photo-item ${(r==null?void 0:r.photo)===m?"selected":""}`,onClick:()=>{n&&r&&(n(r.profile_id,{photo:m}),s(_=>_.map(w=>w.profile_id===r.profile_id?{...w,photo:m}:w))),p(!1),d(null)},children:a.jsx("img",{src:`/images/pers/32_32/${m}`,alt:m})},m))})]})})]})},Ep=()=>[{profile_id:"TEST_001",name:"Анна",photo:"03_Natalia_42_salad.png",demographics:{sex:"female",age:28},anthropometrics:{bmi:20.2,weight_kg:58},vitals:{systolic_bp_mmhg:105,diastolic_bp_mmhg:68},digital_twin_scores:{current_stars:840,risk_level:"low"}},{profile_id:"TEST_002",name:"Михаил",photo:"10_Alex_48_soup.png",demographics:{sex:"male",age:42},anthropometrics:{bmi:31.2,weight_kg:96},vitals:{systolic_bp_mmhg:142,diastolic_bp_mmhg:91},digital_twin_scores:{current_stars:210,risk_level:"high"}},{profile_id:"TEST_003",name:"Елена",photo:"16_Anastasia_37_street.png",demographics:{sex:"female",age:34},anthropometrics:{bmi:22.1,weight_kg:64},vitals:{systolic_bp_mmhg:118,diastolic_bp_mmhg:76},digital_twin_scores:{current_stars:650,risk_level:"medium"}},{profile_id:"P005",name:"Дмитрий",photo:"05_Дмитрий_55_notepad.png",demographics:{sex:"male",age:57},anthropometrics:{bmi:27.8,weight_kg:88},vitals:{systolic_bp_mmhg:135,diastolic_bp_mmhg:88},digital_twin_scores:{current_stars:450,risk_level:"medium"}},{profile_id:"P007",name:"Иван",photo:"07_Ivan_13_chips.png",demographics:{sex:"male",age:13},anthropometrics:{bmi:19.2,weight_kg:48},vitals:{systolic_bp_mmhg:108,diastolic_bp_mmhg:68},digital_twin_scores:{current_stars:950,risk_level:"low"}},{profile_id:"P014",name:"Екатерина",photo:"14_Ekaterina_39_wearable.png",demographics:{sex:"female",age:39},anthropometrics:{bmi:20.8,weight_kg:60},vitals:{systolic_bp_mmhg:115,diastolic_bp_mmhg:74},digital_twin_scores:{current_stars:780,risk_level:"low"}},{profile_id:"P019b",name:"Стас",photo:"19_Stas_35_dog_bike.png",demographics:{sex:"male",age:35},anthropometrics:{bmi:24.8,weight_kg:82},vitals:{systolic_bp_mmhg:125,diastolic_bp_mmhg:80},digital_twin_scores:{current_stars:680,risk_level:"low"}},{profile_id:"P022",name:"Варя",photo:"22_Varya_30_yoga.png",demographics:{sex:"female",age:30},anthropometrics:{bmi:20.2,weight_kg:57},vitals:{systolic_bp_mmhg:110,diastolic_bp_mmhg:70},digital_twin_scores:{current_stars:900,risk_level:"low"}},{profile_id:"P025",name:"Катя",photo:"25_Katya_29_office.png",demographics:{sex:"female",age:29},anthropometrics:{bmi:20.7,weight_kg:59},vitals:{systolic_bp_mmhg:110,diastolic_bp_mmhg:70},digital_twin_scores:{current_stars:640,risk_level:"low"}},{profile_id:"P008",name:"Галина",photo:"08_Galina_75_Vika_9_balcony.png",demographics:{sex:"female",age:75},anthropometrics:{bmi:26.6,weight_kg:68},vitals:{systolic_bp_mmhg:148,diastolic_bp_mmhg:88},digital_twin_scores:{current_stars:320,risk_level:"high"}}];const go=[{code:"SP_01",name:"Витамин A (Ретинол)",classification:"нутри",impact:8.5,evidence:"A",regularity:"D",description:"Жирорастворимый витамин для зрения, иммунитета, кожи. Кофактор синтеза родопсина. Антиоксидант (каротиноиды).",file:"vitamins/vit_A_retinol.md",group:"vitamins"},{code:"SP_02",name:"Витамин D3 (Холекальциферол)",classification:"мед",impact:9,evidence:"A",regularity:"D",description:"Регуляция кальций-фосфорного обмена, иммунитет, профилактика остеопороза. Дефицит — у 60-80% населения.",file:"vitamins/vit_D_calciferol.md",group:"vitamins"},{code:"SP_03",name:"Витамин C (Аскорбиновая кислота)",classification:"нутри",impact:8,evidence:"B",regularity:"D",description:"Водорастворимый антиоксидант. Участвует в синтезе коллагена, карнитина, нейромедиаторов. Улучшает усвоение железа.",file:"vitamins/vit_C_ascorbic.md",group:"vitamins"},{code:"SP_04",name:"Витамин E (Токоферол)",classification:"нутри",impact:7.5,evidence:"B",regularity:"D",description:"Жирорастворимый антиоксидант. Защита мембран от перекисного окисления. Иммуномодулятор.",file:"vitamins/vit_E_tocopherol.md",group:"vitamins"},{code:"SP_05",name:"Витамин K (Филлохинон)",classification:"нутри",impact:7,evidence:"A",regularity:"D",description:"Кофактор синтеза факторов свёртывания крови (II, VII, IX, X). Участвует в метаболизме костей (остеокальцин).",file:"vitamins/vit_K_phylloquinone.md",group:"vitamins"},{code:"SP_06",name:"Витамин B1 (Тиамин)",classification:"нутри",impact:7.5,evidence:"A",regularity:"D",description:"Кофермент декарбоксилаз кетокислот. Метаболизм углеводов и АТФ. Поддержка нервной системы.",file:"vitamins/vit_B1_thiamin.md",group:"vitamins"},{code:"SP_07",name:"Витамин B2 (Рибофлавин)",classification:"нутри",impact:7,evidence:"B",regularity:"D",description:"Предшественник FAD и FMN (коферменты окисления). Метаболизм жиров, углеводов, белков.",file:"vitamins/vit_B2_riboflavin.md",group:"vitamins"},{code:"SP_08",name:"Витамин B3 (Ниацин)",classification:"мед",impact:8,evidence:"A",regularity:"D",description:"Предшественник NAD⁺/NADP⁺. Снижение LDL-C и триглицеридов. Ключевой кофермент окислительно-восстановительных реакций.",file:"vitamins/vit_B3_niacin.md",group:"vitamins"},{code:"SP_09",name:"Витамин B5 (Пантотеновая кислота)",classification:"нутри",impact:7,evidence:"B",regularity:"D",description:"Предшественник кофермента A (КоА). Синтез жирных кислот, стероидов, ацетилхолина.",file:"vitamins/vit_B5_pantothenic.md",group:"vitamins"},{code:"SP_10",name:"Витамин B6 (Пиридоксин)",classification:"нутри",impact:7.5,evidence:"A",regularity:"D",description:"Кофермент трансаминаз и декарбоксилаз. Метаболизм аминокислот, синтез нейромедиаторов. Снижение гомоцистеина.",file:"vitamins/vit_B6_pyridoxine.md",group:"vitamins"},{code:"SP_11",name:"Витамин B7 (Биотин)",classification:"нутри",impact:7,evidence:"B",regularity:"D",description:"Кофермент карбоксилаз (глюконеогенез, синтез жирных кислот). Здоровье кожи, волос, ногтей.",file:"vitamins/vit_B7_biotin.md",group:"vitamins"},{code:"SP_12",name:"Витамин B9 (Фолиевая кислота)",classification:"мед",impact:9,evidence:"A",regularity:"D",description:"Синтез ДНК, деление клеток. Профилактика дефектов нервной трубки у плода. Снижение гомоцистеина.",file:"vitamins/vit_B9_folate.md",group:"vitamins"},{code:"SP_13",name:"Витамин B12 (Кобаламин)",classification:"мед",impact:8.5,evidence:"A",regularity:"D",description:"Кофермент метионинсинтазы и метилмалонил-КоА-мутазы. Эритропоэз, миелинизация, энергия. Дефицит у веганов 80%.",file:"vitamins/vit_B12_cobalamin.md",group:"vitamins"},{code:"SP_14",name:"Кальций (Ca)",classification:"нутри",impact:8.5,evidence:"A",regularity:"D",description:"Макроэлемент для костей, зубов, мышечных сокращений, свёртывания крови. Транспорт ионов.",file:"minerals/min_Ca_calcium.md",group:"minerals"},{code:"SP_15",name:"Магний (Mg)",classification:"мед",impact:8.5,evidence:"A",regularity:"D",description:"Кофактор >300 ферментов. Синтез АТФ, мышечное расслабление, сон, антиаритмическое, мигрень.",file:"minerals/min_Mg_magnesium.md",group:"minerals"},{code:"SP_16",name:"Железо (Fe)",classification:"мед",impact:9,evidence:"A",regularity:"D",description:"Транспорт кислорода (гемоглобин, миоглобин). Синтез ДНК, митохондриальное дыхание. Дефицит — анемия.",file:"minerals/min_Fe_iron.md",group:"minerals"},{code:"SP_17",name:"Цинк (Zn)",classification:"нутри",impact:8,evidence:"A",regularity:"D",description:"Кофактор >100 ферментов. Иммунитет, синтез белка, заживление ран, вкус/обоняние.",file:"minerals/min_Zn_zinc.md",group:"minerals"},{code:"SP_18",name:"Калий (K)",classification:"нутри",impact:7.5,evidence:"A",regularity:"D",description:"Внутриклеточный макроэлемент. Регуляция АД, сердечный ритм, нервно-мышечная передача.",file:"minerals/min_K.md",group:"minerals"},{code:"SP_19",name:"Натрий (Na)",classification:"нутри",impact:6,evidence:"B",regularity:"D",description:"Внеклеточный макроэлемент. Осмотическое давление, гидратация. Избыток — гипертензия.",file:"minerals/min_Na.md",group:"minerals"},{code:"SP_20",name:"Селен (Se)",classification:"нутри",impact:8,evidence:"B",regularity:"D",description:"Кофактор глутатионпероксидазы (антиоксидант). Функция щитовидной железы, иммунитет.",file:"minerals/min_Se_selenium.md",group:"minerals"},{code:"SP_21",name:"Хром (Cr)",classification:"нутри",impact:7.5,evidence:"C",regularity:"D",description:"Усиление действия инсулина, метаболизм глюкозы, липидов. Спорная эффективность.",file:"minerals/min_Cr.md",group:"minerals"},{code:"SP_22",name:"Марганец (Mn)",classification:"нутри",impact:6.5,evidence:"C",regularity:"D",description:"Кофактор аргиназы, супероксиддисмутазы. Метаболизм аминокислот, холестерина, углеводов.",file:"minerals/min_Mn.md",group:"minerals"},{code:"SP_23",name:"Медь (Cu)",classification:"нутри",impact:7,evidence:"B",regularity:"D",description:"Кофактор цитохром-c-оксидазы, супероксиддисмутазы. Синтез коллагена, эластина, миелина. Транспорт железа.",file:"minerals/min_Cu.md",group:"minerals"},{code:"SP_24",name:"Фосфор (P)",classification:"нутри",impact:7,evidence:"B",regularity:"D",description:"Структура костей (гидроксиапатит), АТФ, ДНК/РНК, фосфолипиды мембран.",file:"minerals/min_P.md",group:"minerals"},{code:"SP_25",name:"Хлор (Cl)",classification:"нутри",impact:5,evidence:"C",regularity:"D",description:"Внеклеточный анион. Поддержание pH, желудочный сок (HCl). Избыток — гипертензия.",file:"minerals/min_Cl.md",group:"minerals"},{code:"SP_26",name:"Йод (I)",classification:"мед",impact:8.5,evidence:"A",regularity:"D",description:"Компонент гормонов щитовидной железы (T4, T3). Метаболизм, рост, развитие мозга плода.",file:"minerals/min_I_iodine.md",group:"minerals"},{code:"SP_27",name:"Кофермент Q10 (Убихинон)",classification:"мед",impact:8,evidence:"A",regularity:"D",description:"Митохондриальное дыхание, антиоксидант. Кардиопротекция, статиновая миопатия, мигрень.",file:"vitamin_like/coq10_ubiquinone.md",group:"vitamin_like"},{code:"SP_28",name:"α-Липоевая кислота",classification:"мед",impact:8,evidence:"A",regularity:"D",description:"Митохондриальный кофермент, амфифильный антиоксидант. Диабетическая нейропатия, инсулинорезистентность.",file:"vitamin_like/alpha_lipoic_acid.md",group:"vitamin_like"},{code:"SP_29",name:"Инозитол (мио-Инозитол)",classification:"мед",impact:8,evidence:"A",regularity:"D",description:"Сигнальная трансдукция (IP3/DAG). СПКЯ, метаболический синдром, паническое расстройство.",file:"vitamin_like/inositol.md",group:"vitamin_like"},{code:"SP_30",name:"Холин (Витамин B4)",classification:"нутри",impact:8.5,evidence:"A",regularity:"D",description:"Предшественник ацетилхолина, фосфатидилхолина. Профилактика НАЖБП, развитие мозга плода.",file:"vitamin_like/choline.md",group:"vitamin_like"},{code:"SP_31",name:"L-Карнитин",classification:"нутри",impact:8,evidence:"A",regularity:"D",description:"Транспорт жирных кислот в митохондрии (β-окисление). Спорт, кардиопротекция, фертильность.",file:"vitamin_like/carnitine.md",group:"vitamin_like"},{code:"SP_32",name:"Биотин",classification:"нутри",impact:7,evidence:"B",regularity:"D",description:"Кофермент карбоксилаз. Метаболизм жиров, углеводов. Здоровье кожи, волос, ногтей.",file:"vitamin_like/biotin.md",group:"vitamin_like"},{code:"SP_33",name:"Оротовая кислота (B13)",classification:"нутри",impact:7,evidence:"C",regularity:"D",description:"Синтез пиримидинов (ДНК/РНК). Транспорт магния (Mg-оротат). Кардиопротекция.",file:"vitamin_like/orotic_acid.md",group:"vitamin_like"},{code:"SP_34",name:"Парааминобензойная кислота",classification:"нутри",impact:6,evidence:"C",regularity:"D",description:"Кофермент синтеза фолата (микрофлора). Склеродермия (Potaba). Пигментация.",file:"vitamin_like/paba.md",group:"vitamin_like"},{code:"SP_35",name:"Пангамовая кислота (B15)",classification:"нутри",impact:5,evidence:"D",regularity:"D",description:"Статус спорный. Не признан FDA/ВОЗ. Метилирование (предположительно).",file:"vitamin_like/pangamic_acid.md",group:"vitamin_like"},{code:"SP_36",name:"Кверцетин",classification:"нутри",impact:8,evidence:"B",regularity:"D",description:"Биофлавоноид. Противовоспалительное, антигистаминное, сенолитик. Антиоксидант.",file:"vitamin_like/quercetin.md",group:"vitamin_like"},{code:"SP_37",name:"Рутин (Рутозид)",classification:"нутри",impact:7.5,evidence:"A",regularity:"D",description:"Сосудистая защита, венозный тонус. ХВН, геморрой. Синергия с вит C.",file:"vitamin_like/rutin.md",group:"vitamin_like"},{code:"SP_38",name:"Гесперидин",classification:"нутри",impact:7.5,evidence:"A",regularity:"D",description:"Цитрусовый биофлавоноид. Венопротекция, антиоксидант. В составе Детралекса.",file:"vitamin_like/hesperidin.md",group:"vitamin_like"},{code:"SP_39",name:"Ресвератрол",classification:"нутри",impact:7.5,evidence:"B",regularity:"D",description:"Активатор сиртуинов (SIRT1). Кардиопротекция, долголетие, нейропротекция.",file:"vitamin_like/resveratrol.md",group:"vitamin_like"},{code:"SP_40",name:"Полифенолы (общий комплекс)",classification:"нутри",impact:7,evidence:"B",regularity:"D",description:"Растительные антиоксиданты. Противовоспалительное, кардиопротективное, пребиотическое.",file:"vitamin_like/polyphenols.md",group:"vitamin_like"}],Dp=[{code:"DIET_01",name:"DASH-диета",category:"food",foodGroup:"diet",impact:8.5,evidence:"A",regularity:"D",description:"Диета для снижения АД: ограничение натрия <1.5 г/сут, богатство калием, магнием, кальцием. Овощи, фрукты, цельнозерновые, обезжиренные молочные.",indications:["Артериальная гипертензия","Предгипертензия","Метаболический синдром"]},{code:"DIET_02",name:"Средиземноморская диета",category:"food",foodGroup:"diet",impact:9,evidence:"A",regularity:"D",description:"Оливковое масло EV, овощи, рыба, орехи, умеренное вино. Снижает риск ССЗ на 30%, увеличивает продолжительность жизни.",indications:["Профилактика ССЗ","Метаболический синдром","Когнитивное здоровье"]},{code:"DIET_03",name:"Кетогенная диета",category:"food",foodGroup:"diet",impact:7.5,evidence:"B",regularity:"D",description:"Углеводы <50 г/сут, жиры 70-80%. Достижение кетоза. Эпилепсия, ожирение, диабет 2 типа.",indications:["Фармакорезистентная эпилепсия","Ожирение","Диабет 2 типа"]},{code:"DIET_04",name:"Интервальное голодание 16:8",category:"food",foodGroup:"diet",impact:8,evidence:"B",regularity:"D",description:"16 часов голода, 8 часов пищевое окно. Активация аутофагии, снижение инсулина, потеря веса 3-8% за 3-6 мес.",indications:["Избыточный вес","Инсулинорезистентность","Предиабет"]},{code:"DIET_05",name:"Low-FODMAP диета",category:"food",foodGroup:"diet",impact:8,evidence:"A",regularity:"D",description:"Элиминация ферментируемых углеводов при СРК. 3 фазы: элиминация 2-6 нед, реинтродукция, персонализация.",indications:["СРК","Вздутие","Функциональная диспепсия"]},{code:"DIET_06",name:"Безглютеновая диета",category:"food",foodGroup:"diet",impact:8.5,evidence:"A",regularity:"D",description:"Полное исключение глютена (пшеница, рожь, ячмень). Единственное лечение целиакии. Восстановление ворсинок кишечника за 3-12 мес.",indications:["Целиакия","NCGS (чувствительность к глютену)"]},{code:"DIET_07",name:"Низкоуглеводная диета",category:"food",foodGroup:"diet",impact:8,evidence:"A",regularity:"D",description:"Углеводы 50-150 г/сут (не обязательно кетоз). Контроль гликемии, ↓ HbA1c на 0.5-1.0%, потеря 5-10% веса за 6 мес.",indications:["Предиабет","Диабет 2 типа","Метаболический синдром"]},{code:"DIET_08",name:"Противовоспалительная диета",category:"food",foodGroup:"diet",impact:8,evidence:"B",regularity:"D",description:"Омега-3, полифенолы, клетчатка. Исключение сахара и трансжиров. Снижает СРБ на 20-40% за 3-6 мес.",indications:["Повышенный СРБ","Аутоиммунные заболевания","Хроническая боль"]},{code:"DIET_09",name:"Элиминационная диета",category:"food",foodGroup:"diet",impact:7.5,evidence:"B",regularity:"D",description:"Исключение всех потенциальных аллергенов → поэтапное введение для выявления пищевых триггеров. Выявляет триггеры у 60-80%.",indications:["Хроническая крапивница","Атопический дерматит","СРК"]},{code:"03_9",name:"Водный режим",category:"food",foodGroup:"habit",impact:8,evidence:"A",regularity:"D",description:"Оптимальный водный баланс — 2-3 л/сут. Влияет на все метаболические процессы."},{code:"03_10",name:"Баланс электролитов",category:"food",foodGroup:"habit",impact:7,evidence:"B",regularity:"D",description:"Поддержание баланса натрия, калия, магния для гидратации и нервно-мышечной передачи."},{code:"04_1",name:"Ограничение калорий",category:"food",foodGroup:"habit",impact:8.5,evidence:"A",regularity:"D",description:"Умеренный дефицит калорий 300-500 ккал/сут для снижения веса и долголетия."},{code:"04_2",name:"Контроль углеводов",category:"food",foodGroup:"habit",impact:8,evidence:"A",regularity:"D",description:"Мониторинг и ограничение потребления углеводов, особенно простых. Предпочтение сложным углеводам с низким ГИ."},{code:"04_3",name:"Снижение сахара",category:"food",foodGroup:"habit",impact:7.5,evidence:"A",regularity:"D",description:"Снижение потребления добавленного сахара до <25 г/сут (жен) и <36 г/сут (муж)."},{code:"04_4",name:"Ограничение по времени",category:"food",foodGroup:"habit",impact:8,evidence:"B",regularity:"D",description:"Питание в ограниченное окно (16:8). Синхронизация с циркадными ритмами."},{code:"04_5",name:"Ранние приёмы пищи",category:"food",foodGroup:"habit",impact:7.5,evidence:"B",regularity:"D",description:"Предпочтение ранних приёмов пищи (завтрак плотный, ужин ранний) для метаболического здоровья."},{code:"04_6",name:"Богатая клетчаткой диета",category:"food",foodGroup:"habit",impact:7,evidence:"A",regularity:"D",description:"30-40 г клетчатки/сут из овощей, бобовых, цельнозерновых для здоровья микробиома и снижения холестерина."},{code:"04_7",name:"Снижение кофеина",category:"food",foodGroup:"habit",impact:6.5,evidence:"B",regularity:"D",description:"Ограничение кофеина до 1-2 чашек/сут, исключение после 14:00 для улучшения качества сна."},{code:"05_6",name:"Противовоспалительная диета",category:"food",foodGroup:"diet",impact:8,evidence:"A",regularity:"D",description:"Диета для снижения воспаления: омега-3, полифенолы, исключение сахара и трансжиров."}],Uj=`# Healora Backlog
> ver 0.10.3 | 13.05.2026, 07:25
> **101**/128 задач · **312**/670 ч

## Recent Updates (14–15.05.2026)

### 15.05.2026
- [x] **Voice popup redesign** — Always-visible form with per-field inputs, settings gear (language 8 langs, mic device picker with level meter via AnalyserNode), transcript preview with correction, per-field record button (10 ч)
- [x] **Parameter history** — profileOverrides + paramHistory in localStorage, getAttrCurrent helper, 7 weekday columns in attr table showing recent values (6 ч)
- [x] **Export twin data** — JSON download with profile, overrides, history, plans, interventions (1 ч)
- [x] **Preference badges** — Toggle badges (вегетарианство, только РКИ) + custom text field, persisted in localStorage, included in export (2 ч)
- [x] **Icon cleanup** — Mic icon→pencil edit icon in section header, voice popup header, per-field buttons (1 ч)
- [x] **Profile header mic→edit** — Mic button moved to bullet position, opens editor popup (1 ч)
- [x] **Weekday column fix** — Only show changed values (differs from \`attr.current\`), loose comparison fixes false negatives (1.5 ч)
- [x] **Protocol picker checkbox** — ☐/☑ replaces row background highlight for selection state (1 ч)
- [x] **Practice name+applic 2 lines** — Vertical stack layout in protocol picker rows (0.5 ч)
- [x] **13 practice descriptions** — MD files in \`docs/domain/med_traditional_practices/\` with 8 sections each (3 ч)
- [x] **Practice popup** — Build-time \`import.meta.glob\` loads MD, regulatory-info banner, full markdown renderer (3 ч)
- [x] **Интегративная медицина regulatory** — Made official: true, added regulatory text (0.5 ч)
- [x] **Prohibitions in practice MDs** — Section added to all 13 files (1 ч)
- [x] **RCT/publication refs** — Key references added to section 6 of all 13 practice MDs (1 ч)

### 14.05.2026
- [x] **Inline edit persistence** — saveEdit writes to profileOverrides + paramHistory (2 ч)
- [x] **Weekday columns** — 7 columns (today + 6 previous) in attr grid, CSS grid \`repeat(7, 45px)\` (3 ч)
- [x] **Deploy cleanup** — Stale asset cleanup on server (0.5 ч)

## Recent Updates (12–13.05.2026)

### 13.05.2026
- [x] **Backlog modal** — Displays structured BACKLOG.md view (✓/□ checkboxes, h2/h3 headers, hr, clickable repo link, version footer) (3 ч)
- [x] **Chat interface** — Full chat UI with intervention cards (checkbox, points, category badge), task states (not started → in progress → completed with animation), optimistic UI instant points update, colorful timeline badges grouped by day (12 ч)
- [x] **Treatment plans** — Medical prescription popup layout with protocols/interventions table, plan per twin in localStorage, plan status badge in profile header (8 ч)
- [x] **Collapsible track timeline** — N интервенций · M всего summary line, chevron toggle (16px SVG), Дни/Недели/Фазы view switcher (4 ч)
- [x] **Plan search dropdown** — Searchable window by client name/ID, lists all saved plans with counts and status (3 ч)
- [x] **Enhanced intervention log** — Day separators with date (YYYY.MM.DD), day navigation buttons (◀ Все дни ▶), plan tasks badge with popup, activated/skipped row highlighting, stars display, filter by selected day (5 ч)
- [x] **Tasks popup** — Lists unique plan intervention codes with name, assignment count, completed count, percentage (2 ч)
- [x] **Plan prescription table** — Alternating rows (#fafaff), hover (#f0edff), purple protocol/intervention status dots (2 ч)

### 12.05.2026 (afternoon)
- [x] **Supplements catalog** — Loaded from \`supplements_catalog.json\` with group field (vitamins/vitamin-like/minerals), classification (мед/нутри), popup detail view (4 ч)
- [x] **Diets catalog** — Loaded from \`diets_catalog.json\` with foodGroup field (diet/habit), subgroup filter buttons (3 ч)
- [x] **Protocol cards** — Expand/collapse with red flags (🚩), recommendations, category badges, danger style for Ozempic protocol (5 ч)
- [x] **Intervention detail popup** — Shows description, category, impact/10, evidence (A–D), regularity, linked protocols (3 ч)
- [x] **Legend popup** — I/E/Per explanation with examples (I: 1–10, E: A–D, Per: D/W/M/Y/P) (1 ч)
- [x] **Cart widgets panel** — Compact badges with remove button, "Заказать План" button, item count (2 ч)
- [x] **Tab split** — Интервенции / Протоколы tabs in interventions panel (2 ч)
- [x] **Chat timeline badges** — Colored intervention badges in rows grouped by day, opacity matches timeline dots (1/0.2), filtered to simulationDay-3 window (4 ч)
- [x] **Stop button** — Chat header stop button (1 ч)
- [x] **Profile-id** — Hidden by default, shown on card hover (below avatar + parentheses after name) (2 ч)
- [x] **Panels resize** — 200px sidebar / 320px interventions panel (1 ч)
- [x] **Main-content padding** — Reduced to 7px (0.5 ч)
- [x] **UserAvatarPanel styles** — Moved from inline to CSS (1 ч)
- [x] **Vite config fix** — loadEnv for base path to avoid Git Bash BASE_PATH conflict (2 ч)
- [x] **Diary storage** — API (JSON POST/GET), UI with day switching, food photo display, KBZU, NDI (6 ч)
- [x] **Proxy config** — Vite dev proxy + nginx prod config (2 ч)
- [x] **Duplicate CSS removal** — .profile-card dups cleaned from shared.css (1 ч)
- [x] **Backlog-modal width** — Increased to 580px (0.5 ч)
- [x] **Favicon** — Added to www root + digital-twin subfolder (1 ч)

---

## MVP (Phase 1: 1-3 months)

### Core UX
- [x] **Backlog Modal** — Structured BACKLOG.md view with version info (3 ч)
- [x] **Favicon** — Add favicon.svg to www root, fix 404 error (1 ч)
- [x] **Profile-screen** — Fix switchScreen() to locate profile-screen div (2 ч)
- [x] **Context Tips Panel** — Add bottom 15% panel with explanations in info-panel (3 ч)
- [x] **Drag & Drop Logging** — Log drag actions to right "Under the Hood" panel (2 ч)
- [x] **Close Button** — Ensure redirect to https://healora.ru/ (1 ч)

### Onboarding
- [ ] **Slide 1** — Stars motivation screen (earn stars for completed tasks) (4 ч)
- [ ] **Slide 2** — 5 upgrade directions (Knowledge, Activity, Recovery, Nutrition, Specialists) (3 ч)
- [ ] **Slide 3** — Quick level test intro (3 ч)
- [ ] **Quiz** — 5 questions to calculate Healora Score (0-100) (6 ч)
- [ ] **Quiz Logic** — Map score to tiers (Emerging → Transformational) (4 ч)

### Chat Interface (Сообщения)
- [x] **Chat Timeline Badges** — Colored intervention badges in rows, grouped by day, opacity matched (4 ч)
- [x] **Badge Filter** — Filtered to simulationDay-3 window (2 ч)
- [x] **Stop Button** — Chat header stop button (1 ч)
- [x] **Full Badge History** — Show full history in chat (2 ч)
- [x] **Task Cards** — Cards with checkbox, points, category badge (6 ч)
- [x] **States** — Not started → In progress → Completed (with animation) (4 ч)
- [x] **Optimistic UI** — Instant points update (3 ч)
- [ ] **Filters** — All, Питание, Активность, Знания badges (3 ч)

### Intervention Buttons
- [ ] **"Что поесть"** — Nutrition recommendations (4 ч)
- [ ] **"Что почитать"** — PubMed articles (3 ч)
- [ ] **"Научи"** — Scientific facts and mechanisms (3 ч)
- [ ] **"Новости"** — Weight management latest discoveries (3 ч)

### Navigation (Bottom)
- [x] **Сообщения** — Chat/tasks screen (4 ч)
- [x] **Путь** — Longevity Path progress (3 ч)
- [x] **Цели** — Goal tracking (weight, activity, sleep) (4 ч)
- [x] **Профиль** — Stats, level, stars, 52 biomedical parameters (5 ч)

### Digital Twin
- [x] **Enhanced Intervention Log** — Day separators with date, day navigation buttons (◀ Все дни ▶), tasks badge/popup, activated/skipped highlighting, stars, day filter (5 ч)
- [x] **Tasks Popup** — Unique plan intervention codes with assignment count, completed count, percentage (2 ч)
- [x] **Plan Search Dropdown** — Searchable by client name/ID, lists all saved plans with counts and status (4 ч)
- [x] **Collapsible Track Timeline** — Summary line, chevron toggle, Дни/Недели/Фазы view switcher (4 ч)
- [x] **Plan Prescription Table** — Alternating rows (#fafaff), hover (#f0edff), purple status dots (2 ч)
- [x] **Protocol Cards** — Expand/collapse with red flags, recommendations, category badges, protocol-danger style (6 ч)
- [x] **Supplements Catalog** — Groups (vitamins/vitamin-like/minerals), classification (мед/нутри), detail popup (5 ч)
- [x] **Diets Catalog** — Food groups (diet/habit), subgroup filters (3 ч)
- [x] **Intervention Detail Popup** — Description, category, impact, evidence, regularity, linked protocols (3 ч)
- [x] **Legend Popup** — I/E/Per explanations with examples (1 ч)
- [x] **Cart Widgets Panel** — Compact badges, order plan button, remove from cart (2 ч)
- [x] **Tab Split** — Интервенции / Протоколы tabs (2 ч)
- [x] **Treatment Plan Popup** — Medical prescription layout with protocols/interventions table (8 ч)
- [x] **Plan per twin** — Each twin has own plan stored in localStorage via PlansProvider context (6 ч)
- [x] **Plan Status Badge** — Inline indicator in profile-header-card (protocol/intervention counts) (3 ч)
- [x] **Interventions Panel** — 290px wide, category filters (6 ч)
- [x] **Category Badge Colors** — Per-category \`.cat-*\`/\`.sup-*\`/\`.food-*\` styles in separate CSS (2 ч)
- [x] **Action Buttons** — Green/blue/orange/purple per button role (3 ч)
- [x] **Simulation 30 days** — Reduced from 90 to 30 days across all locations (1 ч)
- [x] **Empty Plan Guide** — Positive wishes + step-by-step guidance when no interventions (2 ч)
- [x] **Data Sources Panel** (left) — Draggable items: Wearables, Voice, Medical, Food Photos, Genetics, Mental (6 ч)
- [x] **Drop Zone** — Accept dropped sources → trigger AI analysis (3 ч)
- [x] **ML Model Stub** — Input (HRrest, HRpeak, HRR, BMI, waist, BP) → risk output (4 ч)
- [ ] **Adaptivity** — Difficulty based on Health Literacy Score (5 ч)

### Points System
- [ ] **Basic Tasks** — 5-10 points (water, steps, sleep) (3 ч)
- [ ] **Medium Tasks** — 15-25 points (recipes, 20-30 min workouts) (3 ч)
- [ ] **Hard Tasks** — 30-50 points (meal prep, sugar-free) (3 ч)
- [ ] **Streak Bonus** — +5 for consecutive days (2 ч)
- [ ] **On-time Bonus** — +10 for completing in time (2 ч)
- [ ] **No penalties** — Positive reinforcement only (1 ч)

### Categories (5 tracks)
- [ ] **Знания** — Knowledge tasks (320 pts example) (2 ч)
- [ ] **Активность** — Activity tasks (280 pts example) (2 ч)
- [ ] **Восстановление** — Recovery tasks (140 pts example) (2 ч)
- [ ] **Питание** — Nutrition tasks (240 pts example) (2 ч)
- [ ] **Специалисты** — Specialists tasks (180 pts example) (2 ч)

### Goals & Progress
- [x] **Weight Goal** — Track weight loss progress (-3.2kg / -5kg) (4 ч)
- [x] **Activity Goal** — Steps tracking (8,432 / 10,000) (3 ч)
- [x] **Sleep Goal** — Hours tracking (7.5h / 8h) (3 ч)
- [x] **Progress Bars** — Visual percentage display (3 ч)
- [x] **Healora Score** — 6-metric radar chart, stars display, profile health assessment (8 ч)
- [x] **Health Radar** — SVG radar chart (sleep, stress, steps, BMI, BP, glucose) (6 ч)

### Achievements
- [ ] **Первый шаг** — 3 tasks in a row (2 ч)
- [ ] **На огне** — 7 days without missing (2 ч)
- [ ] **Баланс** — ≥50 points in each category per week (2 ч)
- [ ] **Минус 2 кг** — Weight tracker integration (2 ч)

### Under the Hood Panel
- [ ] **Healora Score Display** — Show current tier and score (3 ч)
- [ ] **Action Log** — Log: completed tasks, uploads, quiz results, bonuses (4 ч)
- [ ] **Technical Info** — Show risk assessment output (2 ч)

### Profile & Assets
- [x] **Profile-id UI** — Hidden by default, shown on card hover (below avatar + parentheses) (2 ч)
- [x] **Panel Resize** — Sidebar 200px, interventions panel 320px (1 ч)
- [x] **Main-content padding** — Reduced to 7px (0.5 ч)
- [x] **UserAvatarPanel CSS** — Extracted from inline to dedicated stylesheet (1 ч)
- [x] **Profile Photos** — 30 avatar images with 32×32 and 150×150 thumbnails (4 ч)
- [x] **Image Optimization** — PNG8 quantization, ≤512KB per source image (3 ч)
- [x] **Classification Rename** — "Медицинский" → "мед", "Нутрицевтик" → "нутри" (1 ч)

### Plan Templates
- [x] **Template Library** — 11 protocol-aligned treatment plan templates (markdown + JS module) (8 ч)
- [x] **Plan Popup Redesign** — Medical prescription header, template selector, QR code, PDF export (6 ч)
- [x] **QR Code** — qrcode.react v4 (QRCodeSVG) for plan sharing (2 ч)

### Infrastructure
- [x] **Vite config fix** — loadEnv for base path, Git Bash BASE_PATH conflict resolved (2 ч)
- [x] **Diary storage API** — JSON POST/GET endpoints with profile_id + day validation (6 ч)
- [x] **Proxy config** — Vite dev proxy + nginx production config (2 ч)
- [x] **Duplicate CSS cleanup** — Removed .profile-card dups from shared.css (1 ч)

---

## V1 (Phase 2: 4-8 months)

- [ ] **Liquid Biopsy Integration** — Blood test results import (16 ч)
- [ ] **Bayesian Calibration** — probabilistic health scoring (12 ч)
- [ ] **Wearable Sync** — Apple Watch, Oura, Whoop API integration (20 ч)
- [ ] **Genetic Data Import** — 23andMe, AncestryDNA parser (12 ч)
- [ ] **Food Photo Analysis** — Computer vision KBJU calculation (16 ч)
- [ ] **Voice Input** — Speech-to-text symptom logging (8 ч)
- [ ] **Advanced ML Model** — Multi-parameter risk prediction (24 ч)

---

## Scale (Phase 3: 9-18 months)

- [ ] **RL Optimizer** — Reinforcement learning for task recommendations (40 ч)
- [ ] **FDA/EMA Pathway** — Regulatory compliance (80 ч)
- [ ] **B2B White-label API** — For clinics (40 ч)
- [ ] **Pro Plan for Nutriologists** — $49/month, saves 10h/week (30 ч)
- [ ] **Genetic Add-on** — $29.99 one-time upsell (10 ч)

---

## Tech Stack
- Frontend: React + Vite (JSX components)
- Backend: Beget server (217.114.8.5), Node.js API
- Deploy: devops.sh script
- Repo: https://github.com/NutriLabAdm/healora
- Storage: localStorage for per-twin plans (PlansProvider context)
- QR: qrcode.react v4 (QRCodeSVG)
- Charts: SVG inline (no heavy lib)

---

*Created: April 2026 | ver 0.10.3 | Based on PRODUCT_DESCRIPTION.md*
`,Gj=(()=>{const t=Uj.split(`
`).find(n=>n.startsWith("> ver "));return t?t.replace(/^>\s*/,"").replace(/, \d{2}:\d{2}$/,"").replace(" | "," · "):"0.10.3"})(),Pj=({profileId:e,onDragStart:t,cartItems:n,onAddToCart:l,onRemoveFromCart:i,onOrderPlan:s})=>{var ee;const[c,o]=y.useState("all"),[r,d]=y.useState("all"),[h,p]=y.useState("all"),[f,x]=y.useState("interventions"),[C,k]=y.useState(null),[M,v]=y.useState(!1),[m,_]=y.useState(null),[w,O]=y.useState(null),[L,z]=y.useState(!1),P=[{key:"all",label:"Все",color:"#6b21c8"},{key:"sleep",label:"Сон",color:"#1976d2"},{key:"physical",label:"Физический",color:"#388e3c"},{key:"mental",label:"Ментальный",color:"#7b1fa2"},{key:"food",label:"Питание",color:"#f57c00"},{key:"medical",label:"мед",color:"#d32f2f"},{key:"supplement",label:"Добавки",color:"#795548"}],Y=[{key:"all",label:"Все",color:"#6b21c8"},{key:"vitamins",label:"Витамины",color:"#2196f3"},{key:"vitamin_like",label:"Витаминоподобные",color:"#9c27b0"},{key:"minerals",label:"Минералы",color:"#4caf50"}],Q=[{key:"all",label:"Все",color:"#6b21c8"},{key:"diet",label:"Диеты",color:"#e65100"},{key:"habit",label:"Пищевые привычки",color:"#f9a825"}],I=[];Object.entries(ov.interventions||{}).forEach(([T,Z])=>{I.push({code:T,name:Z.name,category:Z.category,color:Z.color,impact:Z.impact,regularity:Z.regularity||"D",type:Z.type,evidence:Z.evidence,description:Z.short_description||Z.full_description})});const _e=[{id:"GLYCEMIC_CONTROL",name:"Гликемический контроль",category:"nutritional",goal:"Контроль уровня глюкозы и гликированного гемоглобина",interventions:["04_1","04_2","04_3","04_6","02_3","03_5"],red_flags:[{metric:"Глюкоза натощак",threshold:">7.0 ммоль/л",action:"Консультация эндокринолога"},{metric:"HbA1c",threshold:">7%",action:"Интенсификация терапии"}],recommendations:["Ограничить простые углеводы","Увеличить клетчатку","Контроль порций","Регулярный мониторинг глюкозы"]},{id:"CIRCADIAN_EATING",name:"Циркадное питание",category:"nutritional",goal:"Синхронизация питания с циркадными ритмами",interventions:["04_4","04_5","01_1","03_5"],red_flags:[{metric:"Время последнего приема",threshold:"после 20:00",action:"Перенести ужин на 18:00-19:00"},{metric:"Пропуск завтрака",threshold:">3 раза в неделю",action:"Установить регулярный завтрак"}],recommendations:["Ужин за 3-4 часа до сна","Завтрак в течение 1 часа после пробуждения","Пищевое окно 8-10 часов"]},{id:"SLEEP_HYGIENE",name:"Гигиена сна",category:"nutritional",goal:"Улучшение качества и продолжительности сна",interventions:["01_1","01_2","01_3","03_1","03_7"],red_flags:[{metric:"Длительность сна",threshold:"<6 часов",action:"Сдвиг отхода ко сну на 15 мин раньше"},{metric:"Вариабельность пробуждения",threshold:">2 часа",action:"Установить постоянное время пробуждения"}],recommendations:["Ложиться и вставать в одно время","Без экранов за 60 мин до сна","Прохлада 18-20°C","Ритуал расслабления 30 мин"]},{id:"HYDRATION",name:"Гидратация",category:"nutritional",goal:"Оптимизация водного баланса",interventions:["03_9","03_10","04_7"],red_flags:[{metric:"Цвет мочи",threshold:"Темный",action:"Увеличить потребление воды"},{metric:"Суточное потребление",threshold:"<1.5 л",action:"Пить 2-3 л воды в день"}],recommendations:["2-3 л воды в день","Снизить кофеин до 1-2 чашек","Электролиты при нагрузках"]},{id:"NUTRITIONAL_BASELINE",name:"Базовые добавки",category:"nutritional",goal:"Коррекция нутритивного статуса",interventions:["05_1","05_2","05_3","05_4","07_1"],red_flags:[{metric:"Уровень 25(OH)D",threshold:"<30 нг/мл",action:"Коррекция дозы D3"},{metric:"Омега-3 индекс",threshold:"<4%",action:"Увеличить дозу Омега-3"}],recommendations:["D3: 2000-5000 МЕ/день","Омега-3: 2-3 г/день","Магний: 300-400 мг/день","В-комплекс: 1 капсула/день"]},{id:"METABOLIC_CARDIO_RISKS",name:"Метаболические риски",category:"medical",goal:"Снижение метаболических и сердечно-сосудистых рисков",interventions:["02_1","02_2","04_1","07_1","07_2"],red_flags:[{metric:"АД",threshold:">140/90",action:"Консультация кардиолога"},{metric:"Холестерин ЛПНП",threshold:">3.0 ммоль/л",action:"Диета + статины"}],recommendations:["ВИИТ 2-3 раза в неделю","Силовые 2 раза в неделю","Дефицит калорий 300-500 ккал","Чекап раз в 6 мес"]},{id:"CARDIOVASCULAR_HEALTH",name:"Сердечно-сосудистое здоровье",category:"medical",goal:"Улучшение кардиоваскулярных показателей",interventions:["02_1","02_3","02_6","08_1","04_6","05_2","07_1"],red_flags:[{metric:"ЧСС покоя",threshold:">100 уд/мин",action:"Консультация кардиолога"},{metric:"Вариабельность ЧСС",threshold:"<20 мс",action:"Снизить стресс, улучшить сон"}],recommendations:["Зона 2: 150 мин/нед","ВИИТ: 1 раз/нед","Омега-3: 2-3 г/день","Ежедневный мониторинг ЧСС"]},{id:"INFLAMMATORY_SYSTEMIC",name:"Противовоспалительный",category:"medical",goal:"Снижение системного воспаления",interventions:["05_6","04_6","05_2","03_6","02_3","05_5"],red_flags:[{metric:"СРБ",threshold:">3 мг/л",action:"Усилить противовоспалительную диету"},{metric:"ФНО-α",threshold:">2.8 пг/мл",action:"Добавить куркумин/Омега-3"}],recommendations:["Противовоспалительная диета","Исключить трансжиры и сахар","Омега-3 3 г/день","Адаптогены: ашваганда/родиола"]},{id:"RAPID_WEIGHT_LOSS",name:"Быстрое снижение веса",category:"medical",goal:"Интенсивное снижение веса под контролем",interventions:["04_1","04_2","02_1","02_2","07_1"],red_flags:[{metric:"Темп снижения",threshold:">2 кг/нед",action:"Увеличить калорийность"},{metric:"Мышечная масса",threshold:"Потеря >1 кг/мес",action:"Увеличить белок + силовые"}],recommendations:["Дефицит 500-800 ккал/день","Белок 1.6-2 г/кг","ВИИТ 3 раза/нед","Силовые 2 раза/нед","Чекап каждые 2 нед"]},{id:"OZEMPIC_JUMPERS",name:"Протокол GLP-1 агонистов (Оземпик)",category:"medical",goal:"Сопровождение терапии GLP-1 агонистами с сохранением мышечной массы",interventions:["OZ_01","OZ_02","OZ_03","OZ_04","OZ_05","OZ_06","OZ_10"],red_flags:[{metric:"Потеря мышечной массы",threshold:">1.5 кг/мес",action:"Белок 2.2 г/кг + силовые"},{metric:"Тошнота/рвота",threshold:">3 дней",action:"Консультация врача"}],recommendations:["Белок 1.6-2.2 г/кг","Силовые 3-4 раза/нед","Гидратация 2.5-3 л/день","Электролиты ежедневно","Дробное питание 5-6 раз/день"]},{id:"COGNITIVE_HEALTH",name:"Когнитивное здоровье",category:"mental",goal:"Улучшение когнитивных функций и профилактика нейродегенерации",interventions:["05_7","03_1","03_6","05_2","02_2"],red_flags:[{metric:"Ухудшение памяти",threshold:"Прогрессирующее",action:"Невролог + когнитивное тестирование"},{metric:"Концентрация",threshold:"Снижение >3 мес",action:"Проверить дефициты B12, D, ферритин"}],recommendations:["Медитация 10-15 мин/день","Омега-3 2-3 г/день","Силовые тренировки","Ноотропы курсами","Цифровой детокс вечером"]},{id:"PAIN_MANAGEMENT",name:"Управление болью",category:"mental",goal:"Снижение хронической боли",interventions:["03_2","03_6","05_3","03_1"],red_flags:[{metric:"Интенсивность боли",threshold:"7/10 >3 дней",action:"Консультация невролога"},{metric:"Качество сна",threshold:"<5 часов",action:"Усилить протокол гигиены сна"}],recommendations:["Дыхательные практики 5-10 мин","Магний 300-400 мг/день","Медитация сканирования тела","Управление стрессом"]},{id:"DEPRESSION",name:"Поддержка при депрессии",category:"mental",goal:"Улучшение настроения и эмоционального фона",interventions:["02_3","03_1","03_6","05_5","03_7","05_2","05_3"],red_flags:[{metric:"Суицидальные мысли",threshold:"Любые",action:"Немедленно к психиатру"},{metric:"Апатия",threshold:">2 нед",action:"Психотерапия + антидепрессанты"}],recommendations:["Аэробные нагрузки 30 мин/день","Медитация 2 раза/день","Цифровой детокс","Омега-3 3 г/день","Витамин D 5000 МЕ/день"]},{id:"RECOVERY_REGENERATION",name:"Восстановление и регенерация",category:"physical",goal:"Ускорение восстановления после нагрузок",interventions:["05_1","05_2","05_3","03_6","03_7","01_1","02_6"],red_flags:[{metric:"Креатинкиназа",threshold:">500 Ед/л",action:"Снизить нагрузку на 50%"},{metric:"Субъективное восстановление",threshold:"<2/10",action:"Доп. день отдыха"}],recommendations:["Сон 8-9 часов","Магний 400 мг/день","D3 5000 МЕ/день","Зона 2 восстановление","Контрастный душ"]},{id:"EATING_DISORDERS",name:"Расстройства пищевого поведения",category:"mental",goal:"Нормализация пищевого поведения",interventions:["04_4","04_5","03_1","03_6","03_7"],red_flags:[{metric:"Пропуск приемов пищи",threshold:">1 раза/день",action:"Психотерапия + регулярное питание"},{metric:"Переедание",threshold:">2 раз/нед",action:"Дневник питания + психолог"}],recommendations:["3+1 приемов пищи в день","Осознанное питание","Медитация перед едой","Исключить диеты","Цифровой детокс"]},{id:"HORMONAL_ENDOCRINE",name:"Гормональный/эндокринный",category:"medical",goal:"Балансировка гормонального фона",interventions:["07_1","04_6","05_1","05_3","05_2","02_2","03_6"],red_flags:[{metric:"ТТГ",threshold:">4.0 мМЕ/л",action:"Эндокринолог"},{metric:"Тестостерон (муж)",threshold:"<12 нмоль/л",action:"Андролог"}],recommendations:["Чекап гормонов раз в 6 мес","Силовые 3 раза/нед","D3 5000 МЕ/день","Магний 400 мг/день","Омега-3 2 г/день"]},{id:"LONGEVITY",name:"Долголетие",category:"nutritional",goal:"Комплексная программа для активного долголетия",interventions:["04_1","04_6","02_1","02_2","03_6","05_1","05_2","07_1"],red_flags:[{metric:"Показатель Healora Score",threshold:"<60",action:"Комплексная коррекция образа жизни"},{metric:"Биологический возраст",threshold:">хронологического на 5+ лет",action:"Интенсификация протокола"}],recommendations:["Ограничение калорий (CR)","ВИИТ + силовые","Противовоспалительная диета","D3 5000 МЕ/день","Омега-3 2-3 г/день","Чекап раз в год"]},{id:"SPEECH_TOMATIS",name:"Коррекция речевых нарушений (Tomatiс®)",category:"medical",goal:"Коррекция ЗРР, алалии, ОНР, заикания, РАС методом Tomatis® + логопедия",interventions:["ST_01","ST_02","ST_03","ST_04","ST_05"],red_flags:[{metric:"Усиление заикания после сеанса",threshold:"Любое",action:"Снизить интенсивность, увеличить интервалы"},{metric:"Отсутствие динамики",threshold:">7 сеансов",action:"Пересмотр программы, доп. диагностика"},{metric:"Головная боль/головокружение",threshold:">2 ч после сеанса",action:"Консультация невролога"}],recommendations:["Курс Tomatis 14 сеансов (40-80 мин)","Артикуляционная гимнастика ежедневно","ЛФМ 2 раза в неделю","Трекинг речевых навыков еженедельно","Смирнова Л.И. Tomatis-терапевт: +7 985 285-74-44"]}],Qe=r==="all"?go:go.filter(T=>T.group===r),Te=h==="all"?Dp:Dp.filter(T=>T.foodGroup===h),H=c==="supplement"?Qe:c==="food"?Te:c==="all"?[...I,...go]:I.filter(T=>T.category===c),B=T=>T>=9?"#d50000":T>=8?"#ff9100":"#ffd600",q=T=>({A:"#00c853",B:"#ff9100",C:"#ffd600",D:"#d50000"})[T]||"#757575",G=T=>({sleep:"#1976d2",physical:"#388e3c",mental:"#7b1fa2",food:"#f57c00",medical:"#d32f2f",supplement:"#795548"})[T]||"#6b21c8";return a.jsxs("div",{className:"interventions-panel",children:[a.jsxs("div",{className:"panel-header",children:[a.jsxs("div",{className:"panel-tabs",children:[a.jsx("button",{className:`panel-tab ${f==="interventions"?"active":""}`,onClick:()=>x("interventions"),children:"Интервенции"}),a.jsx("button",{className:`panel-tab ${f==="protocols"?"active":""}`,onClick:()=>x("protocols"),children:"Протоколы"})]}),a.jsxs("span",{className:"version-link",onClick:()=>v(!0),children:["ver ",Gj]})]}),n&&n.length>0&&a.jsxs("div",{className:"cart-widgets-panel",children:[a.jsxs("div",{className:"cart-widgets-header",children:[a.jsxs("span",{children:["Корзина (",n.length,")"]}),a.jsx("button",{className:"cart-clear-btn",onClick:()=>n.forEach(T=>i(T.code)),children:"×"})]}),a.jsxs("button",{className:"order-plan-btn",onClick:()=>s&&s(n),title:"Разместить все интервенции из корзины на таймлайне",children:[a.jsxs("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("line",{x1:"3",y1:"9",x2:"21",y2:"9"}),a.jsx("line",{x1:"9",y1:"21",x2:"9",y2:"9"})]}),"Заказать План"]}),a.jsx("div",{className:"cart-widgets-wrap",children:n.map(T=>{const Z=T.color||"#6b21c8";return a.jsx("div",{className:"compact-cart-badge",style:{"--cat-color":Z},title:T.name,children:a.jsx("span",{className:"badge-index",children:T.code})},T.code)})})]}),f==="interventions"&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"category-filters",children:[P.map(T=>a.jsx("button",{className:`cat-btn cat-${T.key} ${c===T.key?"active":""}`,onClick:()=>o(T.key),children:T.label},T.key)),a.jsx("button",{className:"cat-btn legend-btn",onClick:()=>z(!L),title:"Пояснение сокращений",children:"?"})]}),c==="supplement"&&a.jsx("div",{className:"supplement-subgroups",children:Y.map(T=>a.jsx("button",{className:`cat-btn sm sup-${T.key} ${r===T.key?"active":""}`,onClick:()=>d(T.key),children:T.label},T.key))}),c==="food"&&a.jsx("div",{className:"supplement-subgroups",children:Q.map(T=>a.jsx("button",{className:`cat-btn sm food-${T.key} ${h===T.key?"active":""}`,onClick:()=>p(T.key),children:T.label},T.key))}),a.jsxs("div",{className:"interventions-table",children:[a.jsxs("div",{className:"table-header",children:[a.jsx("span",{className:"col-code",children:"Код"}),a.jsx("span",{className:"col-name",children:"Название"}),c==="supplement"&&a.jsx("span",{className:"col-class",children:"Тип"}),a.jsx("span",{className:"col-impact",children:"I"}),a.jsx("span",{className:"col-evidence",children:"E"}),a.jsx("span",{className:"col-regularity",children:"Per"})]}),H.map(T=>{const Z=T.classification||T.foodGroup;return a.jsxs("div",{className:`table-row ${Z?"sup-row":""}`,onClick:()=>{Z?_(T):O(T)},style:{cursor:"pointer",borderLeftColor:G(T.category||"supplement")},title:Z?"Клик: подробная информация":"Клик: карточка интервенции",children:[a.jsx("span",{className:"col-code",children:T.code}),a.jsx("span",{className:"col-name",children:T.name}),c==="supplement"&&a.jsx("span",{className:`col-class ${T.classification==="мед"?"class-med":"class-nutr"}`,children:T.classification}),a.jsx("span",{className:"col-impact",style:{color:B(T.impact)},children:T.impact}),a.jsx("span",{className:"col-evidence",style:{color:q(T.evidence)},children:T.evidence}),a.jsx("span",{className:"col-regularity",children:T.regularity}),a.jsx("span",{className:"col-actions",children:n&&n.find(Fe=>Fe.code===T.code)?a.jsx("button",{className:"cart-toggle-btn remove",onClick:Fe=>{Fe.stopPropagation(),i(T.code)},children:a.jsx("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})})}):a.jsx("button",{className:"cart-toggle-btn add",onClick:Fe=>{Fe.stopPropagation(),l(T)},children:a.jsxs("svg",{viewBox:"0 0 24 24",width:"12",height:"12",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})})})]},T.code)})]}),L&&a.jsx("div",{className:"supplement-popup-overlay",onClick:()=>z(!1),children:a.jsxs("div",{className:"supplement-popup",onClick:T=>T.stopPropagation(),style:{maxWidth:"320px"},children:[a.jsxs("div",{className:"supplement-popup-header",style:{borderLeftColor:"#6b21c8"},children:[a.jsx("h3",{style:{margin:0,fontSize:"14px"},children:"Пояснение сокращений"}),a.jsx("button",{className:"supplement-popup-close",onClick:()=>z(!1),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsxs("div",{className:"supplement-popup-body",children:[a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-symbol",children:"I"}),a.jsxs("span",{className:"legend-desc",children:["Impact — сила воздействия (1–10)",a.jsx("br",{}),a.jsx("span",{className:"legend-example",children:"9–10: высокая   5–8: средняя   1–4: низкая"})]})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-symbol",children:"E"}),a.jsxs("span",{className:"legend-desc",children:["Evidence — уровень доказательности (A–D)",a.jsx("br",{}),a.jsx("span",{className:"legend-example",children:"A: мета-анализы   B: РКИ   C: наблюд.   D: эксперты"})]})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-symbol",children:"Per"}),a.jsxs("span",{className:"legend-desc",children:["Period — периодичность",a.jsx("br",{}),a.jsx("span",{className:"legend-example",children:"D: ежедневно   W: еженедельно   M: ежемесячно   Y: ежегодно   P: по требованию"})]})]})]})]})})]}),f==="protocols"&&a.jsx("div",{className:"protocols-list",children:_e.map(T=>{const Z=C===T.id,Fe=()=>k(Z?null:T.id);return a.jsxs("div",{className:`protocol-card ${T.id==="OZEMPIC_JUMPERS"?"protocol-danger":""} ${Z?"expanded":""}`,onClick:Fe,children:[a.jsxs("div",{className:"protocol-card-header",children:[a.jsx("span",{className:"protocol-card-name",children:T.name}),a.jsx("span",{className:`protocol-card-cat ${T.category}`,children:T.category==="nutritional"?"Питание":T.category==="medical"?"Медицина":T.category==="mental"?"Ментальный":"Физический"}),a.jsx("span",{className:"protocol-chevron",children:Z?"▲":"▼"})]}),Z&&a.jsxs("div",{className:"protocol-card-body",children:[a.jsx("p",{className:"protocol-card-goal",children:T.goal}),a.jsx("div",{className:"protocol-card-interventions",children:T.interventions.map(Pe=>{const He=I.find(Wt=>Wt.code===Pe);return He?a.jsx("span",{className:"protocol-interv-badge",style:{borderLeftColor:G(He.category)},children:He.name},Pe):a.jsx("span",{className:"protocol-interv-badge",style:{borderLeftColor:"#d50000"},children:Pe},Pe)})}),T.red_flags&&T.red_flags.length>0&&a.jsxs("div",{className:"protocol-section",children:[a.jsx("div",{className:"protocol-section-title",children:"🚩 Красные флаги"}),T.red_flags.map((Pe,He)=>a.jsxs("div",{className:"protocol-flag-item",title:Pe.action,children:[a.jsx("span",{className:"protocol-flag-metric",children:Pe.metric}),a.jsx("span",{className:"protocol-flag-threshold",children:Pe.threshold})]},He))]}),T.recommendations&&T.recommendations.length>0&&a.jsxs("div",{className:"protocol-section",children:[a.jsx("div",{className:"protocol-section-title",children:"✓ Рекомендации"}),T.recommendations.map((Pe,He)=>a.jsx("div",{className:"protocol-rec-item",children:Pe},He))]})]})]},T.id)})}),m&&a.jsx("div",{className:"supplement-popup-overlay",onClick:()=>_(null),children:a.jsxs("div",{className:"supplement-popup",onClick:T=>T.stopPropagation(),children:[a.jsxs("div",{className:"supplement-popup-header",style:{borderLeftColor:m.classification==="мед"?"#d32f2f":"#795548"},children:[a.jsx("span",{className:"supplement-popup-code",children:m.code}),a.jsx("h3",{children:m.name}),a.jsx("button",{className:"supplement-popup-close",onClick:()=>_(null),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsxs("div",{className:"supplement-popup-body",children:[a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Описание"}),a.jsx("span",{className:"supplement-popup-value",children:m.description||"Нет данных"})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Тип"}),a.jsx("span",{className:`supplement-popup-value ${m.classification==="мед"?"class-med":"class-nutr"}`,children:m.classification==="мед"?"🏥 мед":"🌿 нутри"})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Воздействие"}),a.jsxs("span",{className:"supplement-popup-value",style:{color:B(m.impact)},children:[m.impact,"/10"]})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Доказательность"}),a.jsx("span",{className:"supplement-popup-value",style:{color:q(m.evidence)},children:m.evidence})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Периодичность"}),a.jsx("span",{className:"supplement-popup-value",children:"Ежедневно"})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Источник"}),a.jsx("span",{className:"supplement-popup-value",children:m.file||"—"})]})]})]})}),w&&a.jsx("div",{className:"supplement-popup-overlay",onClick:()=>O(null),children:a.jsxs("div",{className:"supplement-popup",onClick:T=>T.stopPropagation(),children:[a.jsxs("div",{className:"supplement-popup-header",style:{borderLeftColor:G(w.category)},children:[a.jsx("span",{className:"supplement-popup-code",children:w.code}),a.jsx("h3",{children:w.name}),a.jsx("button",{className:"supplement-popup-close",onClick:()=>O(null),children:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),a.jsxs("div",{className:"supplement-popup-body",children:[a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Описание"}),a.jsx("span",{className:"supplement-popup-value",children:w.description||"Нет данных"})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Категория"}),a.jsx("span",{className:"supplement-popup-value",style:{color:G(w.category)},children:((ee=P.find(T=>T.key===w.category))==null?void 0:ee.label)||w.category})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Воздействие"}),a.jsxs("span",{className:"supplement-popup-value",style:{color:B(w.impact)},children:[w.impact,"/10"]})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Доказательность"}),a.jsx("span",{className:"supplement-popup-value",style:{color:q(w.evidence)},children:w.evidence})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Периодичность"}),a.jsx("span",{className:"supplement-popup-value",children:w.regularity})]}),a.jsxs("div",{className:"supplement-popup-row",children:[a.jsx("span",{className:"supplement-popup-label",children:"Протоколы"}),a.jsx("span",{className:"supplement-popup-value",children:(()=>{const T=_e.filter(Z=>Z.interventions.includes(w.code));return T.length>0?T.map(Z=>a.jsx("span",{className:`protocol-interv-badge ${Z.id==="OZEMPIC_JUMPERS"?"protocol-danger":""}`,style:{display:"inline-block",margin:"2px 4px",borderLeftColor:Z.category==="medical"?"#d32f2f":Z.category==="nutritional"?"#f57c00":Z.category==="mental"?"#7b1fa2":"#388e3c"},children:Z.name},Z.id)):"Не входит в протоколы"})()})]})]})]})}),M&&a.jsx("div",{className:"backlog-overlay",onClick:()=>v(!1),children:a.jsxs("div",{className:"backlog-modal",onClick:T=>T.stopPropagation(),children:[a.jsxs("div",{className:"backlog-header",children:[a.jsxs("span",{children:["Healora — Backlog ",a.jsxs("span",{className:"backlog-summary",children:[a.jsx("strong",{children:"101"}),"/128 · ",a.jsx("strong",{children:"312"}),"/670 ч"]})]}),a.jsx("span",{className:"version-build",children:"ver 0.10.3 · 13.05.2026"}),a.jsx("span",{className:"backlog-close",onClick:()=>v(!1),children:"×"})]}),a.jsxs("div",{className:"backlog-body",children:[a.jsx("h2",{className:"md-h2",children:"Recent Updates (14–15.05.2026)"}),a.jsx("h3",{className:"md-h3",children:"15.05.2026"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Voice popup redesign"})," — Always-visible form with per-field inputs, settings gear (language 8 langs, mic device picker with level meter via AnalyserNode), transcript preview with correction, per-field record button"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Parameter history"})," — profileOverrides + paramHistory in localStorage, getAttrCurrent helper, 7 weekday columns in attr table showing recent values"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Export twin data"})," — JSON download with profile, overrides, history, plans, interventions"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Preference badges"})," — Toggle badges (вегетарианство, только РКИ) + custom text field, persisted in localStorage, included in export"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Icon cleanup"})," — Mic icon replaced with pencil edit icon in section header, voice popup header, per-field buttons"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Profile header mic→edit"})," — Mic button moved to bullet position, opens editor popup"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Weekday column fix"})," — Only show values that differ from original (",a.jsx("code",{children:"attr.current"}),"), loose comparison"]})]}),a.jsx("h3",{className:"md-h3",children:"14.05.2026"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Inline edit persistence"})," — saveEdit writes to profileOverrides + paramHistory"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Weekday columns"})," — 7 columns (today + 6 previous) in attr grid, CSS grid ",a.jsx("code",{children:"repeat(7, 45px)"})]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Deploy cleanup"})," — Stale asset cleanup on server"]})]}),a.jsx("h2",{className:"md-h2",children:"Recent Updates (12–13.05.2026)"}),a.jsx("h3",{className:"md-h3",children:"13.05.2026"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Backlog modal"})," — Displays structured BACKLOG.md view (✓/□ checkboxes, h2/h3 headers, hr, clickable repo link, version footer)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Chat interface"})," — Full chat UI with intervention cards (checkbox, points, category badge), task states, optimistic UI, colorful timeline badges grouped by day"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Treatment plans"})," — Medical prescription popup layout with protocols/interventions table, plan per twin in localStorage, plan status badge in profile header"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Collapsible track timeline"})," — N интервенций · M всего summary line, chevron toggle, Дни/Недели/Фазы view switcher"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Plan search dropdown"})," — Searchable window by client name/ID, lists all saved plans with counts and status"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Enhanced intervention log"})," — Day separators with date (YYYY.MM.DD), day nav buttons (◀ Все дни ▶), tasks badge/popup, activated/skipped highlighting, stars, day filter"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Tasks popup"})," — Unique plan intervention codes with assignment count, completed count, percentage"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Plan prescription table"})," — Alternating rows (#fafaff), hover (#f0edff), purple protocol/intervention status dots"]})]}),a.jsx("h3",{className:"md-h3",children:"12.05.2026 (afternoon)"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Supplements catalog"})," — Loaded from ",a.jsx("code",{children:"supplements_catalog.json"})," with group field (vitamins/vitamin-like/minerals), classification (мед/нутри), popup detail view"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Diets catalog"})," — Loaded from ",a.jsx("code",{children:"diets_catalog.json"})," with foodGroup field (diet/habit), subgroup filter buttons"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Protocol cards"})," — Expand/collapse with red flags (🚩), recommendations, category badges, danger style for Ozempic protocol"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Intervention detail popup"})," — Shows description, category, impact/10, evidence (A–D), regularity, linked protocols"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Legend popup"})," — I/E/Per explanation with examples (I: 1–10, E: A–D, Per: D/W/M/Y/P)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Cart widgets panel"}),' — Compact badges with remove button, "Заказать План" button, item count']}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Tab split"})," — Интервенции / Протоколы tabs in interventions panel"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Chat timeline badges"})," — Colored intervention badges in rows grouped by day, opacity matches timeline dots (1/0.2), filtered to simulationDay-3 window"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Stop button"})," — Chat header stop button"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Profile-id"})," — Hidden by default, shown on card hover (below avatar + parentheses after name)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Panels resize"})," — 200px sidebar / 320px interventions panel"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Main-content padding"})," — Reduced to 7px"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"UserAvatarPanel styles"})," — Moved from inline to CSS"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Vite config fix"})," — loadEnv for base path to avoid Git Bash BASE_PATH conflict"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Diary storage"})," — API (JSON POST/GET), UI with day switching, food photo display, KBZU, NDI"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Proxy config"})," — Vite dev proxy + nginx prod config"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Duplicate CSS removal"})," — .profile-card dups cleaned from shared.css"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Backlog-modal width"})," — Increased to 580px"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Favicon"})," — Added to www root + digital-twin subfolder"]})]}),a.jsx("hr",{className:"md-hr"}),a.jsx("h2",{className:"md-h2",children:"MVP (Phase 1: 1-3 months)"}),a.jsx("h3",{className:"md-h3",children:"Core UX"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Backlog Modal"})," — Structured BACKLOG.md view with version info"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Favicon"})," — Add favicon.svg to www root, fix 404 error"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Profile-screen"})," — Fix switchScreen() to locate profile-screen div"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Context Tips Panel"})," — Add bottom 15% panel with explanations in info-panel"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Drag & Drop Logging"}),' — Log drag actions to right "Under the Hood" panel']}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Close Button"})," — Ensure redirect to https://healora.ru/"]})]}),a.jsx("h3",{className:"md-h3",children:"Onboarding"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Slide 1"})," — Stars motivation screen (earn stars for completed tasks)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Slide 2"})," — 5 upgrade directions (Knowledge, Activity, Recovery, Nutrition, Specialists)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Slide 3"})," — Quick level test intro"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Quiz"})," — 5 questions to calculate Healora Score (0-100)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Quiz Logic"})," — Map score to tiers (Emerging → Transformational)"]})]}),a.jsx("h3",{className:"md-h3",children:"Chat Interface (Сообщения)"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Chat Timeline Badges"})," — Colored intervention badges in rows, grouped by day, opacity matched"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Badge Filter"})," — Filtered to simulationDay-3 window"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Stop Button"})," — Chat header stop button"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Full Badge History"})," — Show full history in chat"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Task Cards"})," — Cards with checkbox, points, category badge"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"States"})," — Not started → In progress → Completed (with animation)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Optimistic UI"})," — Instant points update"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Filters"})," — All, Питание, Активность, Знания badges"]})]}),a.jsx("h3",{className:"md-h3",children:"Intervention Buttons"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:'"Что поесть"'})," — Nutrition recommendations"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:'"Что почитать"'})," — PubMed articles"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:'"Научи"'})," — Scientific facts and mechanisms"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:'"Новости"'})," — Weight management latest discoveries"]})]}),a.jsx("h3",{className:"md-h3",children:"Navigation (Bottom)"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Сообщения"})," — Chat/tasks screen"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Путь"})," — Longevity Path progress"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Цели"})," — Goal tracking (weight, activity, sleep)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Профиль"})," — Stats, level, stars, 52 biomedical parameters"]})]}),a.jsx("h3",{className:"md-h3",children:"Digital Twin"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Enhanced Intervention Log"})," — Day separators with date, day nav buttons (◀ Все дни ▶), tasks badge/popup, activated/skipped highlighting, stars, day filter"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Tasks Popup"})," — Unique plan intervention codes with assignment count, completed count, percentage"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Plan Search Dropdown"})," — Searchable by client name/ID, lists all saved plans with counts and status"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Collapsible Track Timeline"})," — Summary line, chevron toggle, Дни/Недели/Фазы view switcher"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Plan Prescription Table"})," — Alternating rows (#fafaff), hover (#f0edff), purple status dots"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Protocol Cards"})," — Expand/collapse with red flags, recommendations, category badges, protocol-danger style"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Supplements Catalog"})," — Groups (vitamins/vitamin-like/minerals), classification (мед/нутри), detail popup"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Diets Catalog"})," — Food groups (diet/habit), subgroup filters"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Intervention Detail Popup"})," — Description, category, impact, evidence, regularity, linked protocols"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Legend Popup"})," — I/E/Per explanations with examples"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Cart Widgets Panel"})," — Compact badges, order plan button, remove from cart"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Tab Split"})," — Интервенции / Протоколы tabs"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Treatment Plan Popup"})," — Medical prescription layout with protocols/interventions table"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Plan per twin"})," — Each twin has own plan stored in localStorage via PlansProvider context"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Plan Status Badge"})," — Inline indicator in profile-header-card (protocol/intervention counts)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Interventions Panel"})," — 290px wide, category filters"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Category Badge Colors"})," — Per-category `.cat-*`/`.sup-*`/`.food-*` styles in separate CSS"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Action Buttons"})," — Green/blue/orange/purple per button role"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Simulation 30 days"})," — Reduced from 90 to 30 days across all locations"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Empty Plan Guide"})," — Positive wishes + step-by-step guidance when no interventions"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Data Sources Panel"})," (left) — Draggable items: Wearables, Voice, Medical, Food Photos, Genetics, Mental"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Drop Zone"})," — Accept dropped sources → trigger AI analysis"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"ML Model Stub"})," — Input (HRrest, HRpeak, HRR, BMI, waist, BP) → risk output"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Adaptivity"})," — Difficulty based on Health Literacy Score"]})]}),a.jsx("h3",{className:"md-h3",children:"Points System"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Basic Tasks"})," — 5-10 points (water, steps, sleep)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Medium Tasks"})," — 15-25 points (recipes, 20-30 min workouts)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Hard Tasks"})," — 30-50 points (meal prep, sugar-free)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Streak Bonus"})," — +5 for consecutive days"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"On-time Bonus"})," — +10 for completing in time"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"No penalties"})," — Positive reinforcement only"]})]}),a.jsx("h3",{className:"md-h3",children:"Categories (5 tracks)"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Знания"})," — Knowledge tasks (320 pts example)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Активность"})," — Activity tasks (280 pts example)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Восстановление"})," — Recovery tasks (140 pts example)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Питание"})," — Nutrition tasks (240 pts example)"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Специалисты"})," — Specialists tasks (180 pts example)"]})]}),a.jsx("h3",{className:"md-h3",children:"Goals & Progress"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Weight Goal"})," — Track weight loss progress (-3.2kg / -5kg)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Activity Goal"})," — Steps tracking (8,432 / 10,000)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Sleep Goal"})," — Hours tracking (7.5h / 8h)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Progress Bars"})," — Visual percentage display"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Healora Score"})," — 6-metric radar chart, stars display, profile health assessment"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Health Radar"})," — SVG radar chart (sleep, stress, steps, BMI, BP, glucose)"]})]}),a.jsx("h3",{className:"md-h3",children:"Achievements"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Первый шаг"})," — 3 tasks in a row"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"На огне"})," — 7 days without missing"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Баланс"})," ≥50 points in each category per week"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Минус 2 кг"})," — Weight tracker integration"]})]}),a.jsx("h3",{className:"md-h3",children:"Under the Hood Panel"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Healora Score Display"})," — Show current tier and score"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Action Log"})," — Log: completed tasks, uploads, quiz results, bonuses"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Technical Info"})," — Show risk assessment output"]})]}),a.jsx("h3",{className:"md-h3",children:"Profile & Assets"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Profile-id UI"})," — Hidden by default, shown on card hover (below avatar + parentheses)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Panel Resize"})," — Sidebar 200px, interventions panel 320px"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Main-content padding"})," — Reduced to 7px"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"UserAvatarPanel CSS"})," — Extracted from inline to dedicated stylesheet"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Profile Photos"})," — 30 avatar images with 32×32 and 150×150 thumbnails"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Image Optimization"})," — PNG8 quantization, ≤512KB per source image"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Classification Rename"}),' — "Медицинский" → "мед", "Нутрицевтик" → "нутри"']})]}),a.jsx("h3",{className:"md-h3",children:"Plan Templates"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Template Library"})," — 11 protocol-aligned treatment plan templates (markdown + JS module)"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Plan Popup Redesign"})," — Medical prescription header, template selector, QR code, PDF export"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"QR Code"})," — qrcode.react v4 (QRCodeSVG) for plan sharing"]})]}),a.jsx("h3",{className:"md-h3",children:"Infrastructure"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Vite config fix"})," — loadEnv for base path, Git Bash BASE_PATH conflict resolved"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Diary storage API"})," — JSON POST/GET endpoints with profile_id + day validation"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Proxy config"})," — Vite dev proxy + nginx production config"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Duplicate CSS cleanup"})," — Removed .profile-card dups from shared.css"]})]}),a.jsx("hr",{className:"md-hr"}),a.jsx("h2",{className:"md-h2",children:"V1 (Phase 2: 4-8 months)"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Liquid Biopsy Integration"})," — Blood test results import"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Bayesian Calibration"})," — probabilistic health scoring"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Wearable Sync"})," — Apple Watch, Oura, Whoop API integration"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Genetic Data Import"})," — 23andMe, AncestryDNA parser"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Food Photo Analysis"})," — Computer vision KBJU calculation"]}),a.jsxs("li",{className:"md-done",children:[a.jsx("span",{className:"md-check",children:"✓"})," ",a.jsx("b",{children:"Voice Input"})," — Speech-to-text symptom logging, editable transcripts, per-field recording, settings with language/mic selection"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Advanced ML Model"})," — Multi-parameter risk prediction"]})]}),a.jsx("hr",{className:"md-hr"}),a.jsx("h2",{className:"md-h2",children:"Scale (Phase 3: 9-18 months)"}),a.jsxs("ul",{className:"md-list",children:[a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"RL Optimizer"})," — Reinforcement learning for task recommendations"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"FDA/EMA Pathway"})," — Regulatory compliance"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"B2B White-label API"})," — For clinics"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Pro Plan for Nutriologists"})," — $49/month, saves 10h/week"]}),a.jsxs("li",{className:"md-todo",children:[a.jsx("span",{className:"md-box",children:" "})," ",a.jsx("b",{children:"Genetic Add-on"})," — $29.99 one-time upsell"]})]}),a.jsx("hr",{className:"md-hr"}),a.jsx("h2",{className:"md-h2",children:"Tech Stack"}),a.jsxs("ul",{className:"md-list md-tech",children:[a.jsxs("li",{children:[a.jsx("b",{children:"Frontend:"})," React + Vite (JSX components)"]}),a.jsxs("li",{children:[a.jsx("b",{children:"Backend:"})," Beget server (217.114.8.5), Node.js API"]}),a.jsxs("li",{children:[a.jsx("b",{children:"Deploy:"})," devops.sh script"]}),a.jsxs("li",{children:[a.jsx("b",{children:"Repo:"})," ",a.jsx("a",{href:"https://github.com/NutriLabAdm/healora",target:"_blank",rel:"noopener",children:"github.com/NutriLabAdm/healora"})]}),a.jsxs("li",{children:[a.jsx("b",{children:"Storage:"})," localStorage for per-twin plans (PlansProvider context)"]}),a.jsxs("li",{children:[a.jsx("b",{children:"QR:"})," qrcode.react v4 (QRCodeSVG)"]}),a.jsxs("li",{children:[a.jsx("b",{children:"Charts:"})," SVG inline (no heavy lib)"]})]}),a.jsx("div",{className:"md-footer",children:"Created: April 2026 | ver 0.10.3 | Based on PRODUCT_DESCRIPTION.md"})]})]})})]})},qj=()=>{const e=ia(),[t,n]=y.useState(!1),[l,i]=y.useState([]),s=[{id:"wearable",label:"Wearables",sub:"HRV, sleep",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("rect",{x:"5",y:"2",width:"14",height:"20",rx:"3"}),a.jsx("path",{d:"M12 6v6l4 2"})]})},{id:"voice",label:"Voice",sub:"voice input",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("path",{d:"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}),a.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}),a.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"23"}),a.jsx("line",{x1:"8",y1:"23",x2:"16",y2:"23"})]})},{id:"medical",label:"Medical",sub:"tests, labs",icon:a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:a.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})})},{id:"food",label:"Food",sub:"meal photos",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"}),a.jsx("circle",{cx:"12",cy:"12",r:"3"})]})},{id:"genetics",label:"Genetics",sub:"DNA test",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("path",{d:"M2 15c6.667-6 13.333 0 20-6"}),a.jsx("path",{d:"M9 22c1.798-1.998 2.518-3.995 2.807-5.993"}),a.jsx("path",{d:"M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"}),a.jsx("path",{d:"M17 6l-2.5-2.5"}),a.jsx("path",{d:"M14 8l-1-1"}),a.jsx("path",{d:"M7 18l2.5 2.5"}),a.jsx("path",{d:"M3.5 14.5l.5.5"}),a.jsx("path",{d:"M20 9l.5.5"}),a.jsx("path",{d:"M6.5 12.5l1 1"})]})},{id:"mental",label:"Mental",sub:"meditation",icon:a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"20",height:"20",children:[a.jsx("path",{d:"M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"}),a.jsx("line",{x1:"10",y1:"22",x2:"14",y2:"22"})]})}],c=y.useCallback((d,h)=>{d.dataTransfer.setData("application/json",JSON.stringify(h)),d.dataTransfer.setData("text",h.id),d.dataTransfer.effectAllowed="copy"},[]),o=y.useCallback(d=>{d.preventDefault();try{const h=d.dataTransfer.getData("application/json");if(h){const p=JSON.parse(h);l.includes(p.id)||i(f=>[...f,p.id])}}catch{const p=d.dataTransfer.getData("text");p&&!l.includes(p)&&i(f=>[...f,p])}},[l]),r=y.useCallback(d=>{d.preventDefault()},[]);return a.jsxs("div",{className:"sources-footer",children:[a.jsxs("div",{className:"footer-header",onClick:()=>n(!t),children:[a.jsxs("div",{className:"footer-title",children:[a.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:a.jsx("path",{d:"M18 20V10M12 20V4M6 20v-6"})}),a.jsx("span",{children:"Data Sources"}),a.jsxs("span",{className:"source-count",children:[l.length," active"]})]}),a.jsx("span",{className:"toggle-icon",children:t?"▼":"▲"})]}),t&&a.jsxs("div",{className:"footer-content",children:[a.jsx("div",{className:"drag-instruction",children:"Drag sources to Digital Twin panel to add data"}),a.jsx("div",{className:"sources-grid",children:s.map(d=>a.jsxs("div",{className:"source-card",draggable:"true",onDragStart:h=>c(h,d),children:[a.jsx("span",{className:"source-icon",children:d.icon}),a.jsx("span",{className:"source-label",children:d.label}),a.jsx("span",{className:"source-sub",children:d.sub})]},d.id))}),l.length>0&&a.jsxs("div",{className:"active-sources",children:[a.jsx("h4",{children:"Active in Twin:"}),a.jsx("div",{className:"active-tags",children:l.map(d=>a.jsxs("span",{className:"active-tag",children:[d," ✓"]},d))})]}),a.jsx("div",{className:"drop-zone-footer",onDrop:o,onDragOver:r,children:a.jsx("div",{className:"drop-hint",children:"Drop here to configure profile"})}),a.jsxs("button",{className:"digital-twin-btn",onClick:()=>e("/"),children:[a.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",width:"16",height:"16",children:[a.jsx("circle",{cx:"12",cy:"12",r:"3"}),a.jsx("path",{d:"M12 1v6m0 6v6"}),a.jsx("path",{d:"M1 12h6m6 0h6"}),a.jsx("path",{d:"M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24"}),a.jsx("path",{d:"M19.78 4.22l-4.24 4.24m-7.08 7.08l-4.24 4.24"})]}),a.jsx("span",{children:"Open Digital Twin"})]})]}),a.jsx("style",{children:`
        .sources-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 2px solid #6b21c8;
          z-index: 1000;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        }

        .footer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 15px;
          cursor: pointer;
          background: linear-gradient(135deg, #6b21c8, #4a148c);
          color: white;
        }

        .footer-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .source-count {
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 10px;
        }

        .toggle-icon {
          font-size: 10px;
        }

        .footer-content {
          padding: 15px;
          max-height: 300px;
          overflow-y: auto;
          background: #fafafa;
        }

        .drag-instruction {
          font-size: 11px;
          color: #757575;
          margin-bottom: 12px;
          text-align: center;
        }

        .sources-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
          margin-bottom: 15px;
        }

        .source-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 8px;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: grab;
          transition: all 0.3s;
          text-align: center;
        }

        .source-card:hover {
          border-color: #6b21c8;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(107, 33, 200, 0.2);
        }

        .source-card:active {
          cursor: grabbing;
        }

        .source-icon {
          font-size: 20px;
        }

        .source-label {
          font-size: 11px;
          font-weight: 600;
          color: #311b92;
        }

        .source-sub {
          font-size: 9px;
          color: #757575;
        }

        .active-sources {
          margin-bottom: 12px;
        }

        .active-sources h4 {
          font-size: 11px;
          color: #311b92;
          margin: 0 0 8px 0;
        }

        .active-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .active-tag {
          padding: 4px 8px;
          background: #e8eaf6;
          color: #3f51b5;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 500;
        }

        .drop-zone-footer {
          padding: 15px;
          border: 2px dashed #6b21c8;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 12px;
          background: rgba(107, 33, 200, 0.05);
        }

        .drop-hint {
          font-size: 11px;
          color: #6b21c8;
          font-weight: 500;
        }

        .digital-twin-btn {
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #6b21c8, #4a148c);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .digital-twin-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(107, 33, 200, 0.3);
        }
      `})]})};function Vj(){const[e,t]=y.useState(null),[n,l]=y.useState(null),[i,s]=y.useState([]),[c,o]=y.useState(null),[r,d]=y.useState(!1),[h,p]=y.useState("login"),[f,x]=y.useState(""),[C,k]=y.useState(""),M="/digital-twin/".replace(/\/$/,""),v=_=>{i.find(w=>w.code===_.code)||s(w=>[...w,_])},m=_=>{s(w=>w.filter(O=>O.code!==_))};return a.jsx(wj,{children:a.jsxs(Sb,{basename:M,children:[a.jsxs("div",{className:"app-topbar",children:[a.jsxs("div",{className:"app-topbar-inner",children:[a.jsxs("div",{className:"app-topbar-left",children:[a.jsx("span",{className:"app-topbar-title",children:"Healora"}),a.jsx("span",{className:"app-topbar-sep",children:"·"}),a.jsx("span",{className:"app-topbar-platform",children:"платформа Нутричат"}),a.jsx("img",{className:"app-topbar-logo",src:"https://bmitech.ru/assets/images/logos/nutrichat.png",alt:"Нутричат",width:"25",height:"25"})]}),a.jsxs("div",{className:"app-topbar-center",children:[a.jsx("span",{className:"app-topbar-tagline",children:"мы формируем привычки для здоровья и долголетия на научных знаниях и современных технологиях"}),a.jsx("a",{className:"app-topbar-project",href:"https://bmitech.ru",target:"_blank",rel:"noopener",children:"проект BMITECH.ru"})]}),a.jsx("div",{className:"app-topbar-right",children:c?a.jsx("span",{className:"auth-email",children:c}):a.jsx("button",{className:"auth-btn",onClick:()=>d(!r),children:"Войти"})})]}),r&&a.jsxs("div",{className:"auth-popup",children:[a.jsx("button",{className:"auth-close",onClick:()=>d(!1),children:"×"}),a.jsxs("div",{className:"auth-tabs",children:[a.jsx("button",{className:`auth-tab ${h==="login"?"active":""}`,onClick:()=>p("login"),children:"Войти"}),a.jsx("button",{className:`auth-tab ${h==="register"?"active":""}`,onClick:()=>p("register"),children:"Регистрация"})]}),a.jsx("input",{className:"auth-input",type:"email",placeholder:"Email",value:f,onChange:_=>x(_.target.value)}),a.jsx("input",{className:"auth-input",type:"password",placeholder:"Пароль",value:C,onChange:_=>k(_.target.value)}),a.jsx("button",{className:"auth-submit",onClick:()=>{f&&C&&(o(f),d(!1),x(""),k(""))},children:h==="login"?"Войти":"Зарегистрироваться"})]})]}),a.jsxs("div",{className:"app-layout-4col",children:[a.jsx(Hj,{selectedProfile:e,onSelectProfile:t}),a.jsx("div",{className:"main-content",children:a.jsxs(I_,{children:[M?a.jsx(dn,{path:"/",element:a.jsx(Cp,{profileId:e,selectedProtocol:n,cartItems:i,onRemoveFromCart:m})}):a.jsx(dn,{path:"/",element:a.jsx(jp,{replace:!0,to:"/digital-twin"})}),a.jsx(dn,{path:"/chat",element:a.jsx(Bs,{title:"Healthora AI",onBack:()=>window.history.back(),children:a.jsx(Ob,{})})}),a.jsx(dn,{path:"/path",element:a.jsx(Bs,{title:"Ваш Путь",onBack:()=>window.history.back(),children:a.jsx(zb,{})})}),a.jsx(dn,{path:"/profile",element:a.jsx(Bs,{title:"Профиль",onBack:()=>window.history.back(),children:a.jsx(Lb,{})})}),a.jsx(dn,{path:"/digital-twin",element:a.jsx(Cp,{profileId:e,selectedProtocol:n,cartItems:i,onRemoveFromCart:m})}),a.jsx(dn,{path:"/goals",element:a.jsx(Bs,{title:"Ваши Цели",onBack:()=>window.history.back(),children:a.jsx(zj,{})})}),a.jsx(dn,{path:"*",element:a.jsx(jp,{replace:!0,to:M?"/":"/digital-twin"})})]})}),a.jsx(Pj,{profileId:e,onDragStart:l,selectedProtocol:n,cartItems:i,onAddToCart:v,onRemoveFromCart:m}),a.jsx(qj,{})]})]})})}Ix.createRoot(document.getElementById("root")).render(a.jsx(Vj,{}));
