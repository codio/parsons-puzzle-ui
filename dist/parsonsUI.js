!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ParsonsUI=t():e.ParsonsUI=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){!function(){"use strict";var t={class:"className",contenteditable:"contentEditable",for:"htmlFor",readonly:"readOnly",maxlength:"maxLength",tabindex:"tabIndex",colspan:"colSpan",rowspan:"rowSpan",usemap:"useMap"};function n(e,t){try{return e(t)}catch(e){return t}}var r=document,a=window,i=r.documentElement,o=r.createElement.bind(r),s=o("div"),d=o("table"),u=o("tbody"),l=o("tr"),c=Array.isArray,f=Array.prototype,p=f.concat,v=f.filter,h=f.indexOf,g=f.map,m=f.push,b=f.slice,x=f.some,y=f.splice,_=/^#[\w-]*$/,T=/^\.[\w-]*$/,C=/<.+>/,w=/^\w+$/;function P(e,t){return e&&(D(t)||I(t))?T.test(e)?t.getElementsByClassName(e.slice(1)):w.test(e)?t.getElementsByTagName(e):t.querySelectorAll(e):[]}var E=function(){function e(e,t){if(e){if(W(e))return e;var n=e;if(U(e)){var i=(W(t)?t[0]:t)||r;if(!(n=_.test(e)?i.getElementById(e.slice(1)):C.test(e)?Le(e):P(e,i)))return}else if(A(e))return this.ready(e);(n.nodeType||n===a)&&(n=[n]),this.length=n.length;for(var o=0,s=this.length;o<s;o++)this[o]=n[o]}}return e.prototype.init=function(t,n){return new e(t,n)},e}(),k=E.prototype,L=k.init;L.fn=L.prototype=k,k.length=0,k.splice=y,"function"==typeof Symbol&&(k[Symbol.iterator]=f[Symbol.iterator]),k.map=function(e){return L(p.apply([],g.call(this,(function(t,n){return e.call(t,n,t)}))))},k.slice=function(e,t){return L(b.call(this,e,t))};var S=/-([a-z])/g;function M(e){return e.replace(S,(function(e,t){return t.toUpperCase()}))}function N(e,t,n){if(n){for(var r=e.length;r--;)if(!1===t.call(e[r],r,e[r]))return e}else{r=0;for(var a=e.length;r<a;r++)if(!1===t.call(e[r],r,e[r]))return e}return e}function G(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=arguments.length;if(!r)return{};if(1===r)return G(L,e);for(var a=1;a<r;a++)for(var i in arguments[a])e[i]=arguments[a][i];return e}function O(e,t){var n=e&&(e.matches||e.webkitMatchesSelector||e.msMatchesSelector);return!!n&&!!t&&n.call(e,t)}function W(e){return e instanceof E}function j(e){return!!e&&e===e.window}function D(e){return!!e&&9===e.nodeType}function I(e){return!!e&&1===e.nodeType}function A(e){return"function"==typeof e}function U(e){return"string"==typeof e}function B(e){return void 0===e}function $(e){return null===e}function R(e){return!isNaN(parseFloat(e))&&isFinite(e)}function V(e){return U(e)?function(t,n){return O(n,e)}:A(e)?e:W(e)?function(t,n){return e.is(n)}:e?function(t,n){return n===e}:function(){return!1}}function z(e,t){return t?e.filter(t):e}L.each=N,k.each=function(e){return N(this,e)},k.removeProp=function(e){return this.each((function(n,r){delete r[t[e]||e]}))},L.extend=G,k.extend=function(e){return G(k,e)},L.guid=1,L.isWindow=j,L.isFunction=A,L.isNumeric=R,L.isArray=c,k.prop=function(e,n){if(e){if(U(e))return e=t[e]||e,arguments.length<2?this[0]&&this[0][e]:this.each((function(t,r){r[e]=n}));for(var r in e)this.prop(r,e[r]);return this}},k.get=function(e){return B(e)?b.call(this):this[(e=Number(e))<0?e+this.length:e]},k.eq=function(e){return L(this.get(e))},k.first=function(){return this.eq(0)},k.last=function(){return this.eq(-1)},k.filter=function(e){var t=V(e);return L(v.call(this,(function(e,n){return t.call(e,n,e)})))};var F=/\S+/g;function q(e){return U(e)&&e.match(F)||[]}function H(e,t,n,r){for(var a=[],i=A(t),o=r&&V(r),s=0,d=e.length;s<d;s++)if(i){var u=t(e[s]);u.length&&m.apply(a,u)}else for(var l=e[s][t];!(null==l||r&&o(-1,l));)a.push(l),l=n?l[t]:null;return a}function J(e){return e.length>1?v.call(e,(function(e,t,n){return h.call(n,e)===t})):e}function Y(e,t,n){if(I(e)){var r=a.getComputedStyle(e,null);return n?r.getPropertyValue(t)||void 0:r[t]}}function X(e,t){return parseInt(Y(e,t),10)||0}k.hasClass=function(e){return!!e&&x.call(this,(function(t){return I(t)&&t.classList.contains(e)}))},k.removeAttr=function(e){var t=q(e);return this.each((function(e,n){I(n)&&N(t,(function(e,t){n.removeAttribute(t)}))}))},k.attr=function(e,t){if(e){if(U(e)){if(arguments.length<2){if(!this[0]||!I(this[0]))return;var n=this[0].getAttribute(e);return $(n)?void 0:n}return B(t)?this:$(t)?this.removeAttr(e):this.each((function(n,r){I(r)&&r.setAttribute(e,t)}))}for(var r in e)this.attr(r,e[r]);return this}},k.toggleClass=function(e,t){var n=q(e),r=!B(t);return this.each((function(e,a){I(a)&&N(n,(function(e,n){r?t?a.classList.add(n):a.classList.remove(n):a.classList.toggle(n)}))}))},k.addClass=function(e){return this.toggleClass(e,!0)},k.removeClass=function(e){return arguments.length?this.toggleClass(e,!1):this.attr("class","")},L.unique=J,k.add=function(e,t){return L(J(this.get().concat(L(e,t).get())))};var K=/^--/;function Q(e){return K.test(e)}var Z={},ee=s.style,te=["webkit","moz","ms"];function ne(e,t){if(void 0===t&&(t=Q(e)),t)return e;if(!Z[e]){var n=M(e),r=""+n[0].toUpperCase()+n.slice(1);N((n+" "+te.join(r+" ")+r).split(" "),(function(t,n){if(n in ee)return Z[e]=n,!1}))}return Z[e]}var re={animationIterationCount:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0};function ae(e,t,n){return void 0===n&&(n=Q(e)),n||re[e]||!R(t)?t:t+"px"}k.css=function(e,t){if(U(e)){var n=Q(e);return e=ne(e,n),arguments.length<2?this[0]&&Y(this[0],e,n):e?(t=ae(e,t,n),this.each((function(r,a){I(a)&&(n?a.style.setProperty(e,t):a.style[e]=t)}))):this}for(var r in e)this.css(r,e[r]);return this};var ie=/^\s+|\s+$/;function oe(e,t){var r=e.dataset[t]||e.dataset[M(t)];return ie.test(r)?r:n(JSON.parse,r)}function se(e,t,r){r=n(JSON.stringify,r),e.dataset[M(t)]=r}function de(e,t){var n=e.documentElement;return Math.max(e.body["scroll"+t],n["scroll"+t],e.body["offset"+t],n["offset"+t],n["client"+t])}function ue(e,t){return X(e,"border"+(t?"Left":"Top")+"Width")+X(e,"padding"+(t?"Left":"Top"))+X(e,"padding"+(t?"Right":"Bottom"))+X(e,"border"+(t?"Right":"Bottom")+"Width")}k.data=function(e,t){if(!e){if(!this[0])return;var n={};for(var r in this[0].dataset)n[r]=oe(this[0],r);return n}if(U(e))return arguments.length<2?this[0]&&oe(this[0],e):B(t)?this:this.each((function(n,r){se(r,e,t)}));for(var r in e)this.data(r,e[r]);return this},N([!0,!1],(function(e,t){N(["Width","Height"],(function(e,n){k[(t?"outer":"inner")+n]=function(r){if(this[0])return j(this[0])?t?this[0]["inner"+n]:this[0].document.documentElement["client"+n]:D(this[0])?de(this[0],n):this[0][(t?"offset":"client")+n]+(r&&t?X(this[0],"margin"+(e?"Top":"Left"))+X(this[0],"margin"+(e?"Bottom":"Right")):0)}}))})),N(["Width","Height"],(function(e,t){var n=t.toLowerCase();k[n]=function(r){if(!this[0])return B(r)?void 0:this;if(!arguments.length)return j(this[0])?this[0].document.documentElement["client"+t]:D(this[0])?de(this[0],t):this[0].getBoundingClientRect()[n]-ue(this[0],!e);var a=parseInt(r,10);return this.each((function(t,r){if(I(r)){var i=Y(r,"boxSizing");r.style[n]=ae(n,a+("border-box"===i?ue(r,!e):0))}}))}}));var le={};function ce(e){return"none"===Y(e,"display")}function fe(e,t){return!t||!x.call(t,(function(t){return e.indexOf(t)<0}))}k.toggle=function(e){return this.each((function(t,n){I(n)&&((B(e)?ce(n):e)?(n.style.display=n.___cd||"",ce(n)&&(n.style.display=function(e){if(le[e])return le[e];var t=o(e);r.body.insertBefore(t,null);var n=Y(t,"display");return r.body.removeChild(t),le[e]="none"!==n?n:"block"}(n.tagName))):(n.___cd=Y(n,"display"),n.style.display="none"))}))},k.hide=function(){return this.toggle(!1)},k.show=function(){return this.toggle(!0)};var pe={focus:"focusin",blur:"focusout"},ve={mouseenter:"mouseover",mouseleave:"mouseout"},he=/^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;function ge(e){return ve[e]||pe[e]||e}function me(e){return e.___ce=e.___ce||{}}function be(e){var t=e.split(".");return[t[0],t.slice(1).sort()]}function xe(e,t,n,r,a){var i=me(e);if(t)i[t]&&(i[t]=i[t].filter((function(i){var o=i[0],s=i[1],d=i[2];if(a&&d.guid!==a.guid||!fe(o,n)||r&&r!==s)return!0;e.removeEventListener(t,d)})));else for(t in i)xe(e,t,n,r,a)}function ye(e){return e.multiple&&e.options?H(v.call(e.options,(function(e){return e.selected&&!e.disabled&&!e.parentNode.disabled})),"value"):e.value||""}k.off=function(e,t,n){var r=this;if(B(e))this.each((function(e,t){(I(t)||D(t)||j(t))&&xe(t)}));else if(U(e))A(t)&&(n=t,t=""),N(q(e),(function(e,a){var i=be(ge(a)),o=i[0],s=i[1];r.each((function(e,r){(I(r)||D(r)||j(r))&&xe(r,o,s,t,n)}))}));else for(var a in e)this.off(a,e[a]);return this},k.on=function(e,t,n,r,a){var i=this;if(!U(e)){for(var o in e)this.on(o,t,n,e[o],a);return this}return U(t)||(B(t)||$(t)?t="":B(n)?(n=t,t=""):(r=n,n=t,t="")),A(r)||(r=n,n=void 0),r?(N(q(e),(function(e,o){var s=be(ge(o)),d=s[0],u=s[1];d&&i.each((function(e,i){if(I(i)||D(i)||j(i)){var o=function e(o){if(!o.namespace||fe(u,o.namespace.split("."))){var s=i;if(t){for(var l=o.target;!O(l,t);){if(l===i)return;if(!(l=l.parentNode))return}s=l,o.___cd=!0}o.___cd&&Object.defineProperty(o,"currentTarget",{configurable:!0,get:function(){return s}}),Object.defineProperty(o,"data",{configurable:!0,get:function(){return n}});var c=r.call(s,o,o.___td);a&&xe(i,d,u,t,e),!1===c&&(o.preventDefault(),o.stopPropagation())}};o.guid=r.guid=r.guid||L.guid++,function(e,t,n,r,a){var i=me(e);i[t]=i[t]||[],i[t].push([n,r,a]),e.addEventListener(t,a)}(i,d,u,t,o)}}))})),this):this},k.one=function(e,t,n,r){return this.on(e,t,n,r,!0)},k.ready=function(e){var t=function(){return n(e,L)};return"loading"!==r.readyState?t():r.addEventListener("DOMContentLoaded",t),this},k.trigger=function(e,t){if(U(e)){var n=be(e),a=n[0],i=n[1];if(!a)return this;var o=he.test(a)?"MouseEvents":"HTMLEvents";(e=r.createEvent(o)).initEvent(a,!0,!0),e.namespace=i.join(".")}e.___td=t;var s=e.type in pe;return this.each((function(t,n){s&&A(n[e.type])?n[e.type]():n.dispatchEvent(e)}))};var _e=/%20/g,Te=/\r?\n/g;var Ce=/file|reset|submit|button|image/i,we=/radio|checkbox/i;k.serialize=function(){var e="";return this.each((function(t,n){N(n.elements||[n],(function(t,n){if(!(n.disabled||!n.name||"FIELDSET"===n.tagName||Ce.test(n.type)||we.test(n.type)&&!n.checked)){var r=ye(n);if(!B(r))N(c(r)?r:[r],(function(t,r){e+=function(e,t){return"&"+encodeURIComponent(e)+"="+encodeURIComponent(t.replace(Te,"\r\n")).replace(_e,"+")}(n.name,r)}))}}))})),e.slice(1)},k.val=function(e){return arguments.length?this.each((function(t,n){var r=n.multiple&&n.options;if(r||we.test(n.type)){var a=c(e)?g.call(e,String):$(e)?[]:[String(e)];r?N(n.options,(function(e,t){t.selected=a.indexOf(t.value)>=0}),!0):n.checked=a.indexOf(n.value)>=0}else n.value=B(e)||$(e)?"":e})):this[0]&&ye(this[0])},k.clone=function(){return this.map((function(e,t){return t.cloneNode(!0)}))},k.detach=function(e){return z(this,e).each((function(e,t){t.parentNode&&t.parentNode.removeChild(t)})),this};var Pe=/^\s*<(\w+)[^>]*>/,Ee=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,ke={"*":s,tr:u,td:l,th:l,thead:d,tbody:d,tfoot:d};function Le(e){if(!U(e))return[];if(Ee.test(e))return[o(RegExp.$1)];var t=Pe.test(e)&&RegExp.$1,n=ke[t]||ke["*"];return n.innerHTML=e,L(n.childNodes).detach().get()}L.parseHTML=Le,k.empty=function(){return this.each((function(e,t){for(;t.firstChild;)t.removeChild(t.firstChild)}))},k.html=function(e){return arguments.length?B(e)?this:this.each((function(t,n){I(n)&&(n.innerHTML=e)})):this[0]&&this[0].innerHTML},k.remove=function(e){return z(this,e).detach().off(),this},k.text=function(e){return B(e)?this[0]?this[0].textContent:"":this.each((function(t,n){I(n)&&(n.textContent=e)}))},k.unwrap=function(){return this.parent().each((function(e,t){if("BODY"!==t.tagName){var n=L(t);n.replaceWith(n.children())}})),this},k.offset=function(){var e=this[0];if(e){var t=e.getBoundingClientRect();return{top:t.top+a.pageYOffset,left:t.left+a.pageXOffset}}},k.offsetParent=function(){return this.map((function(e,t){for(var n=t.offsetParent;n&&"static"===Y(n,"position");)n=n.offsetParent;return n||i}))},k.position=function(){var e=this[0];if(e){var t="fixed"===Y(e,"position"),n=t?e.getBoundingClientRect():this.offset();if(!t){for(var r=e.ownerDocument,a=e.offsetParent||r.documentElement;(a===r.body||a===r.documentElement)&&"static"===Y(a,"position");)a=a.parentNode;if(a!==e&&I(a)){var i=L(a).offset();n.top-=i.top+X(a,"borderTopWidth"),n.left-=i.left+X(a,"borderLeftWidth")}}return{top:n.top-X(e,"marginTop"),left:n.left-X(e,"marginLeft")}}},k.children=function(e){return z(L(J(H(this,(function(e){return e.children})))),e)},k.contents=function(){return L(J(H(this,(function(e){return"IFRAME"===e.tagName?[e.contentDocument]:"TEMPLATE"===e.tagName?e.content.childNodes:e.childNodes}))))},k.find=function(e){return L(J(H(this,(function(t){return P(e,t)}))))};var Se=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Me=/^$|^module$|\/(java|ecma)script/i,Ne=["type","src","nonce","noModule"];function Ge(e,t,n,r,a){r?e.insertBefore(t,n?e.firstChild:null):e.parentNode.insertBefore(t,n?e:e.nextSibling),a&&function(e,t){var n=L(e);n.filter("script").add(n.find("script")).each((function(e,n){if(Me.test(n.type)&&i.contains(n)){var r=o("script");r.text=n.textContent.replace(Se,""),N(Ne,(function(e,t){n[t]&&(r[t]=n[t])})),t.head.insertBefore(r,null),t.head.removeChild(r)}}))}(t,e.ownerDocument)}function Oe(e,t,n,r,a,i,o,s){return N(e,(function(e,i){N(L(i),(function(e,i){N(L(t),(function(t,o){var s=n?o:i,d=n?e:t;Ge(n?i:o,d?s.cloneNode(!0):s,r,a,!d)}),s)}),o)}),i),t}k.after=function(){return Oe(arguments,this,!1,!1,!1,!0,!0)},k.append=function(){return Oe(arguments,this,!1,!1,!0)},k.appendTo=function(e){return Oe(arguments,this,!0,!1,!0)},k.before=function(){return Oe(arguments,this,!1,!0)},k.insertAfter=function(e){return Oe(arguments,this,!0,!1,!1,!1,!1,!0)},k.insertBefore=function(e){return Oe(arguments,this,!0,!0)},k.prepend=function(){return Oe(arguments,this,!1,!0,!0,!0,!0)},k.prependTo=function(e){return Oe(arguments,this,!0,!0,!0,!1,!1,!0)},k.replaceWith=function(e){return this.before(e).remove()},k.replaceAll=function(e){return L(e).replaceWith(this),this},k.wrapAll=function(e){for(var t=L(e),n=t[0];n.children.length;)n=n.firstElementChild;return this.first().before(t),this.appendTo(n)},k.wrap=function(e){return this.each((function(t,n){var r=L(e)[0];L(n).wrapAll(t?r.cloneNode(!0):r)}))},k.wrapInner=function(e){return this.each((function(t,n){var r=L(n),a=r.contents();a.length?a.wrapAll(e):r.append(e)}))},k.has=function(e){var t=U(e)?function(t,n){return P(e,n).length}:function(t,n){return n.contains(e)};return this.filter(t)},k.is=function(e){var t=V(e);return x.call(this,(function(e,n){return t.call(e,n,e)}))},k.next=function(e,t,n){return z(L(J(H(this,"nextElementSibling",t,n))),e)},k.nextAll=function(e){return this.next(e,!0)},k.nextUntil=function(e,t){return this.next(t,!0,e)},k.not=function(e){var t=V(e);return this.filter((function(n,r){return(!U(e)||I(r))&&!t.call(r,n,r)}))},k.parent=function(e){return z(L(J(H(this,"parentNode"))),e)},k.index=function(e){var t=e?L(e)[0]:this[0],n=e?this:L(t).parent().children();return h.call(n,t)},k.closest=function(e){var t=this.filter(e);if(t.length)return t;var n=this.parent();return n.length?n.closest(e):t},k.parents=function(e,t){return z(L(J(H(this,"parentElement",!0,t))),e)},k.parentsUntil=function(e,t){return this.parents(t,e)},k.prev=function(e,t,n){return z(L(J(H(this,"previousElementSibling",t,n))),e)},k.prevAll=function(e){return this.prev(e,!0)},k.prevUntil=function(e,t){return this.prev(t,!0,e)},k.siblings=function(e){return z(L(J(H(this,(function(e){return L(e).parent().children().not(e)})))),e)},e.exports=L}()},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(2));n(6),t.build=function(e,t){return new a.default(e,t)},t.default=t.build},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(0)),o=a(n(3)),s=n(5),d=function(){function e(e,t){this.initialSettings=t,this.container=i.default(e),this.render(),this.bindEvents()}return e.prototype.render=function(){o.render(this.container,this.initialSettings)},e.prototype.bindEvents=function(){var e=this;this.container.on("change","#grader",(function(t){t.preventDefault();var n=i.default(t.currentTarget).val();o.renderGrader(e.container,n)})),this.container.on("click","#add-test",(function(e){e.preventDefault();var t=i.default(e.currentTarget).closest(".grader-form-container"),n=t.hasClass("variable-check-grader-container");t.find(".tests-list").append(n?o.renderVarTest():o.renderUnitTest())})),this.container.on("click",".action.duplicate",(function(e){e.preventDefault();var t=i.default(e.currentTarget).closest(".test-container");t.clone().insertAfter(t)})),this.container.on("click",".action.remove",(function(e){e.preventDefault(),i.default(e.currentTarget).closest(".test-container").remove()})),this.container.on("change","#can-indent",(function(e){e.preventDefault();var t=i.default(e.currentTarget),n=t.is(":checked"),r=t.closest(".common-settings-container");n?r.find("#indent-size").removeAttr("disabled"):r.find("#indent-size").attr("disabled","disabled")}))},e.prototype.export=function(){return s.collectData(this.container,this.initialSettings.options)},e}();t.default=d},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(0)),i=n(4),o=function(e,t){var n=e.split("\n"),r=/(.*?)\s*#distractor\s*$/;return t?n.filter((function(e){return!e.search(r)})).map((function(e){return e.replace(/#distractor\s*$/,"")})).join("\n"):n.filter((function(e){return e.search(r)})).join("\n")},s=function(e){var t,n,r,o,s=a.default('<div class="common-settings-container"></div>');return s.append(function(e){var t=a.default('<div class="grader-container fieldset"></div>');t.append('<label for="grader">Grader</label>');var n=a.default('<select id="grader"></select>');return n.append('<option value="ParsonsWidget._graders.LineBasedGrader">LineBasedGrader</option>'),n.append('<option value="ParsonsWidget._graders.VariableCheckGrader">VariableCheckGrader</option>'),n.append('<option value="ParsonsWidget._graders.UnitTestGrader">UnitTestGrader</option>'),n.append('<option value="ParsonsWidget._graders.LanguageTranslationGrader">LanguageTranslationGrader</option>'),n.append('<option value="ParsonsWidget._graders.TurtleGrader">TurtleGrader</option>'),n.val(i.convertParsonsGraderFuncToEnum(e)),t.append(n),t}(e.grader)),s.append((t=e.trashId,(n=a.default('<div class="dragging-container fieldset"></div>')).append('<label for="require-dragging">Require dragging?</label>'),n.append('<input id="require-dragging" type="checkbox" '+(t?"checked":"")+" />"),n)),s.append((r=e.can_indent,(o=a.default('<div class="indenting-container fieldset"></div>')).append('<label for="can-indent">Indenting?</label>'),o.append('<input id="can-indent" type="checkbox" '+(r||void 0===r?"checked":"")+" />"),o)),s.append(function(e,t){var n=a.default('<div class="indent-size-container fieldset"></div>');return n.append('<label for="indent-size">Indent Size</label>'),n.append('<input id="indent-size" type="text" value="'+(void 0!==t?t:50)+'" '+(!1===e?"disabled":"")+" />"),n}(e.can_indent,e.x_indent)),s.append(function(e){var t=a.default('<div class="exec-limit-container fieldset"></div>');return t.append('<label for="exec-limit">Exec Limit</label>'),t.append('<input id="exec-limit" type="text" value="'+(void 0!==e?e:2500)+'" />'),t}(e.exec_limit)),s};t.renderVarTest=function(e){var t=a.default('<li class="test-container"></li>'),n=a.default('<div class="action-container"></div>');n.append('<button type="button" class="action duplicate">clone</button>'),n.append('<button type="button" class="action small remove">remove</button>'),t.append(n);var r=a.default('<div class="test-info-container"></div>'),o=a.default('<div class="column"></div>'),s=a.default('<div class="fieldset"></div>');s.append("<label>Expected variable values*</label>");var d=a.default('<textarea rows="2" name="variables">'+(e?i.convertTestVariablesToString(e.variables):"")+"</textarea>");d.attr("placeholder",'"var_Name_1": value\n"var_Name_2": value'),s.append(d),o.append(s);var u=a.default('<div class="fieldset"></div>');u.append("<label>Test Description*</label>");var l=a.default('<textarea rows="2" name="description">'+(e?e.message:"")+"</textarea>");l.attr("placeholder","Description of test that is shown to learner"),u.append(l),o.append(u);var c=a.default('<div class="column"></div>'),f=a.default('<div class="fieldset"></div>');f.append("<label>Pre Code</label>");var p=a.default('<textarea rows="2" name="pre-code">'+(e?e.initcode:"")+"</textarea>");p.attr("placeholder","Code prepended before student code"),f.append(p),c.append(f);var v=a.default('<div class="fieldset"></div>');v.append("<label>Post Code</label>");var h=a.default('<textarea rows="2" name="post-code">'+(e?e.code:"")+"</textarea>");return h.attr("placeholder","Code appended after student code"),v.append(h),c.append(v),r.append(o),r.append(c),t.append(r),t};var d=function(e,n){var r=["grader-form-container","variable-check-grader-container",n||""],i=a.default('<div class="'+r.join(" ")+'"></div>');i.append('<div class="add-test-container"><button id="add-test" type="button">New Test</button></div>');var o=a.default('<div class="tests-container"></div>'),s=a.default('<ul class="tests-list"></ul>');return e&&e.vartests?e.vartests.forEach((function(e){return s.append(t.renderVarTest(e))})):s.append(t.renderVarTest()),o.append(s),i.append(o),i};t.renderUnitTest=function(e){var t=a.default('<li class="test-container"></li>'),n=a.default('<div class="action-container"></div>');n.append('<button type="button" class="action duplicate">clone</button>'),n.append('<button type="button" class="action small remove">remove</button>'),t.append(n);var r=a.default('<div class="test-info-container"></div>'),i=a.default('<div class="column"></div>'),o=a.default('<div class="fieldset"></div>');o.append("<label>Method Call(s)*</label>");var s=a.default('<textarea rows="2" name="method-call">'+(e?e.methodCall:"")+"</textarea>");s.attr("placeholder","Write method call with arguments"),o.append(s),i.append(o);var d=a.default('<div class="fieldset"></div>');d.append("<label>Error Message (optional)</label>");var u=a.default('<textarea rows="2" name="error-message">'+(e?e.errorMessage:"")+"</textarea>");u.attr("placeholder","What student sees if this test fails"),d.append(u),i.append(d);var l=a.default('<div class="column"></div>'),c=a.default('<div class="fieldset"></div>');c.append("<label>Expected Output(s)*</label>");var f=a.default('<textarea rows="2" name="expected-output">'+(e?e.expectedOutput:"")+"</textarea>");return f.attr("placeholder","Expected output of method call"),c.append(f),l.append(c),r.append(i),r.append(l),t.append(r),t};var u=function(e){var n=a.default('<div class="grader-form-container unit-test-grader-container"></div>');n.append(function(e){var t=a.default('<div class="code-prepend-container"></div>'),n=a.default('<div class="code-prepend-ta-container fieldset"></div>');n.append('<label for="code-prepend">Code prepended before student code</label>');var r=a.default('<textarea id="code-prepend" rows="4">'+(e||"")+"</textarea>");return r.attr("placeholder","Code prepended before student code"),n.append(r),t.append(n),t}(e?e.unittest_code_prepend:""));var r=e?i.convertUnitTestsFromString():null;n.append('<div class="add-test-container"><button id="add-test" type="button">New Test</button></div>');var o=a.default('<div class="tests-container"></div>'),s=a.default('<ul class="tests-list"></ul>');return r?r.forEach((function(e){return s.append(t.renderUnitTest(e))})):s.append(t.renderUnitTest()),o.append(s),n.append(o),n},l=function(e){var t=a.default('<div class="programming-lang-container fieldset"></div>');t.append('<label for="programming-lang">Programming Language</label>');var n=a.default('<select id="programming-lang"></select>');return n.append('<option value="pseudo">pseudocode</option>'),n.append('<option value="java">java</option>'),n.append('<option value="python">python</option>'),e&&n.val(e),t.append(n),t},c=function(e){var t=a.default('<div class="executable-code-container"></div>'),n=a.default('<div class="executable-code-ta-container fieldset"></div>');n.append('<label for="code-prepend">Executable code</label>');var r=a.default('<textarea id="executable-code" rows="4">'+(e||"")+"</textarea>");return r.attr("placeholder","Executable code"),n.append(r),t.append(n),t},f=function(e){var t=a.default('<div class="grader-form-container turtle-grader-container"></div>');return t.append(l(e?e.programmingLang:"")),t.append(c(e?e.executable_code:"")),t.append(function(e){var t=a.default('<div class="turtle-model-code-container"></div>'),n=a.default('<div class="turtle-model-code-ta-container fieldset"></div>');n.append('<label for="turtle-model-code">Turtle Model Code</label>');var r=a.default('<textarea id="turtle-model-code" rows="4">'+(e||"")+"</textarea>");return r.attr("placeholder","Turtle Model Code"),n.append(r),t.append(n),t}(e?e.turtleModelCode:"")),t},p=function(e,t,n){switch(e.closest(".ParsonsUI").removeClass().addClass("ParsonsUI "+t.toString()),e.find(".grader-form-container").remove(),t){case"ParsonsWidget._graders.VariableCheckGrader":e.append(d(n));break;case"ParsonsWidget._graders.UnitTestGrader":e.append(u(n));break;case"ParsonsWidget._graders.LanguageTranslationGrader":e.append(function(e){var t=d(e,"language-translation-grader-container");return t.prepend(c(e?e.executable_code:"")),t.prepend(l(e?e.programmingLang:"")),t}(n));break;case"ParsonsWidget._graders.TurtleGrader":e.append(f(n))}};t.renderGrader=function(e,t){p(e.find(".ParsonsUI"),t)},t.render=function(e,t){e.empty();var n=a.default('<div class="ParsonsUI"></div>');n.append(function(e){var t=a.default('<div class="code-blocks-container"></div>'),n=o(e,!1),r=a.default('<div class="code-blocks-ta-container fieldset"></div>');r.append('<label for="initial">Code to Become Blocks</label>');var i=a.default('<textarea id="initial" rows="8">'+n+"</textarea>");i.attr("placeholder","Type Solution Here"),r.append(i),t.append(r);return t.append('<div class="code-blocks-hint">$$toggle::value1::value2::valuen$$&nbsp;&nbsp;&nbsp;&nbsp; new line \\n in same block</div>'),t}(t.initial)),n.append(function(e){var t=a.default('<div class="distractor-blocks-container"></div>'),n=a.default('<div class="distractor-blocks-ta-container fieldset"></div>'),r=o(e.initial,!0);n.append('<label for="distractors">Code to Become Distractor Blocks</label>');var i=a.default('<textarea id="distractors" rows="4">'+r+"</textarea>");i.attr("placeholder","Code blocks that serve as distractions (incorrect options)"),n.append(i),t.append(n);var s=e.options.max_wrong_lines||10,d=a.default('<div class="distractor-blocks-max-container fieldset"></div>');return d.append('<label for="max-distractors">Max Distractors</label>'),d.append('<input id="max-distractors" type="number" value="'+s+'" />'),t.append(d),t}(t)),n.append(s(t.options)),p(n,i.convertParsonsGraderFuncToEnum(t.options.grader),t.options),e.append(n)},t.default={render:t.render}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.convertParsonsGraderFuncToEnum=function(e){if(!e)return"ParsonsWidget._graders.LineBasedGrader";switch("string"==typeof e?e:e.name){case"VariableCheckGrader":return"ParsonsWidget._graders.VariableCheckGrader";case"TurtleGrader":return"ParsonsWidget._graders.TurtleGrader";case"UnitTestGrader":return"ParsonsWidget._graders.UnitTestGrader";case"LanguageTranslationGrader":return"ParsonsWidget._graders.LanguageTranslationGrader";default:return"ParsonsWidget._graders.LineBasedGrader"}},t.convertTestVariablesToString=function(e){var t=[];return Object.entries(e).forEach((function(e){var n=e[0],r=e[1];t.push('"'+n+'": '+r)})),t.join("\n")},t.convertUnitTestsFromString=function(){return[{methodCall:"",expectedOutput:"",errorMessage:""}]},t.default={convertParsonsGraderFuncToEnum:t.convertParsonsGraderFuncToEnum,convertTestVariablesToString:t.convertTestVariablesToString}},function(e,t,n){"use strict";var r=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var i=arguments[t],o=0,s=i.length;o<s;o++,a++)r[a]=i[o];return r},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=a(n(0)),o=function(e){var t=[];return e.find(".test-container").each((function(e,n){var r=i.default(n),a={},o=r.find('[name="variables"]').val(),s=r.find('[name="description"]').val(),d=r.find('[name="pre-code"]').val(),u=r.find('[name="post-code"]').val();o.split("\n").forEach((function(e){var t=/^\s*"(.*)":\s*(.*)\s*$/.exec(e);if(t&&0!==t.length){var n=t[1],r=t[2],i=r.trim(),o=/^[0-9]*$/.test(i);a[n]=o?parseInt(r,10):r.replace(/^"(.*)"$/,"$1")}})),t.push({message:s,initcode:d,code:u,variables:a})})),t};t.collectData=function(e,t){var n=function(e){var t=e.find("#initial").val(),n=e.find("#distractors").val(),r=parseInt(e.find("#max-distractors").val(),10),a=[t,n.split("\n").filter((function(e){return!!e})).map((function(e){return e+" #distractor"})).join("\n")].join("\n"),i=e.find("#grader").val(),o=parseInt(e.find("#indent-size").val(),10),s=parseInt(e.find("#exec-limit").val(),10);return{initial:a,maxDistractors:Number.isNaN(r)?10:r,grader:i||"ParsonsWidget._graders.LineBasedGrader",requireDragging:e.find("#require-dragging").is(":checked"),indenting:e.find("#can-indent").is(":checked"),indentSize:Number.isNaN(o)?50:o,execLimit:Number.isNaN(s)?2500:s}}(e),a=n.grader,s={sortableId:t.sortableId||"sortable",max_wrong_lines:n.maxDistractors,grader:a,exec_limit:n.execLimit,can_indent:n.indenting,x_indent:n.indentSize,lang:t.lang||"en",toggleTypeHandlers:t.toggleTypeHandlers,feedback_cb:t.feedback_cb};switch(n.requireDragging&&(s.trashId=t.trashId||"sortableTrash"),a){case"ParsonsWidget._graders.VariableCheckGrader":var d=function(e){return{vartests:o(e)}}(e);s.vartests=d.vartests;break;case"ParsonsWidget._graders.UnitTestGrader":d=function(e){var t=[],n=e.find('[name="code-prepend"]').val();return e.find(".test-container").each((function(e,n){var r=i.default(n),a=r.find('[name="method-call"]').val(),o=r.find('[name="error-message"]').val(),s=r.find('[name="expected-output"]').val();t.push({methodCall:a,errorMessage:o,expectedOutput:s})})),{unittestCodePrepend:n,unitTests:r(["import unittestparson","class myTests(unittestparson.unittest):"],t.map((function(e,t){return["  def test_"+t+"(self):","    self.assertEqual("+e.methodCall+","+e.expectedOutput+","+e.errorMessage+")"].join("\n")})),["_test_result = myTests().main()"]).join("\n")}}(e);s.unittest_code_prepend=d.unittestCodePrepend,s.unittests=d.unitTests;break;case"ParsonsWidget._graders.LanguageTranslationGrader":d=function(e){return{programmingLang:e.find("#programming-lang").val(),executableCode:e.find("#executable-code").val(),vartests:o(e)}}(e);s.executable_code=d.executableCode,s.programmingLang=d.programmingLang,s.vartests=d.vartests;break;case"ParsonsWidget._graders.TurtleGrader":d=function(e){return{programmingLang:e.find("#programming-lang").val(),executableCode:e.find("#executable-code").val(),turtleModelCode:e.find("#turtle-model-code").val()}}(e);s.executable_code=d.executableCode,s.programmingLang=d.programmingLang,s.turtleModelCode=d.turtleModelCode}return{initial:n.initial,options:s}},t.default={collectData:t.collectData}},function(e,t,n){}])}));