(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{137:function(e,t){},143:function(e,t,n){e.exports=n.p+"static/media/iredoc-logo.ce6965c1.png"},147:function(e,t,n){"use strict";n.r(t);var r=n(13),a=n.n(r),o=n(66),i=n.n(o),c=(n(79),n(67)),l=n(33),s=n(57),u=n(26),d=(n(62),n(63),n(72)),h=n.n(d);function f(){f=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r=Object.defineProperty||function(e,t,n){e[t]=n.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(A){l=function(e,t,n){return e[t]=n}}function s(e,t,n,a){var o=t&&t.prototype instanceof h?t:h,i=Object.create(o.prototype),c=new T(a||[]);return r(i,"_invoke",{value:S(e,n,c)}),i}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(A){return{type:"throw",arg:A}}}e.wrap=s;var d={};function h(){}function p(){}function m(){}var g={};l(g,o,function(){return this});var v=Object.getPrototypeOf,y=v&&v(v(L([])));y&&y!==t&&n.call(y,o)&&(g=y);var E=m.prototype=h.prototype=Object.create(g);function b(e){["next","throw","return"].forEach(function(t){l(e,t,function(e){return this._invoke(t,e)})})}function w(e,t){var a;r(this,"_invoke",{value:function(r,o){function i(){return new t(function(a,i){!function r(a,o,i,c){var l=u(e[a],e,o);if("throw"!==l.type){var s=l.arg,d=s.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then(function(e){r("next",e,i,c)},function(e){r("throw",e,i,c)}):t.resolve(d).then(function(e){s.value=e,i(s)},function(e){return r("throw",e,i,c)})}c(l.arg)}(r,o,a,i)})}return a=a?a.then(i,i):i()}})}function S(e,t,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return j()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=O(i,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var l=u(e,t,n);if("normal"===l.type){if(r=n.done?"completed":"suspendedYield",l.arg===d)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r="completed",n.method="throw",n.arg=l.arg)}}}function O(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,O(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var a=u(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,d;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function I(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function x(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function T(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(I,this),this.reset(!0)}function L(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,a=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:j}}function j(){return{value:void 0,done:!0}}return p.prototype=m,r(E,"constructor",{value:m,configurable:!0}),r(m,"constructor",{value:p,configurable:!0}),p.displayName=l(m,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,m):(e.__proto__=m,l(e,c,"GeneratorFunction")),e.prototype=Object.create(E),e},e.awrap=function(e){return{__await:e}},b(w.prototype),l(w.prototype,i,function(){return this}),e.AsyncIterator=w,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var i=new w(s(t,n,r,a),o);return e.isGeneratorFunction(n)?i:i.next().then(function(e){return e.done?e.value:i.next()})},b(E),l(E,c,"Generator"),l(E,o,function(){return this}),l(E,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},e.values=L,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),x(n),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;x(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:L(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},e}var p="1SI1vuW0HQUveqiKPT1Jjr_A471W02Co0OXVcp2zyeO0",m="",g=0,v="",y=function(){var e,t=Object(r.useState)(""),o=Object(l.a)(t,2),i=o[0],d=o[1],y=Object(r.useState)(""),E=Object(l.a)(y,2),b=E[0],w=E[1],S=Object(r.useState)(""),O=Object(l.a)(S,2),I=O[0],x=O[1],T=Object(r.useState)(""),L=Object(l.a)(T,2),j=L[0],A=L[1],C=Object(r.useState)(!1),N=Object(l.a)(C,2),k=N[0],M=N[1],R=Object(r.useState)(!1),_=Object(l.a)(R,2),G=_[0],P=_[1],B=Object(r.useState)(!1),D=Object(l.a)(B,2),U=D[0],F=D[1],H=Object(r.useState)(!1),V=Object(l.a)(H,2),q=V[0],z=V[1],J=["IREDOC","SWES","ETIKA","NUMERIKA","LETRA"],W=["AWIT","GALAW","INSTRUMENTO","LITERATURA","SINING (MULTIMEDIA)","SINING (VISUAL ARTS)"],Q=function(){var t=Object(c.a)(f().mark(function t(n,r,a){var o,i,c,l,s,u,d,h,y;return f().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=1,i=3,n=n.replace(/\s\w{1,2}\.$/,""),J.includes(a)?(m="LISTA_SectionBased_Attendance",e={ABM1101:[4,7],CA1101:[9,22],DA1101:[9,22],HUMSS1101:[24,29],TO1101:[24,29],ITM1101:[31,54],STEM1101:[56,81],STEM1102:[83,92],ABM1201:[95,113],CA1201:[115,121],DA1201:[115,121],HUMSS1201:[123,134],ITM1201:[136,160],STEM1201:[162,178],STEM1202:[180,195]},g=1382711057):W.includes(a)&&(m="LISTA_SectionBased_GILAS_Attendance",e={STEM1101:[4,11],STEM1102:[13,41],ABM1101:[43,52],HUMSS1101:[54,68],ITM1101:[70,83],TO1101:[85,95],CA1101:[97,100],DA1101:[102,106],STEM1201:[108,123],STEM1202:[125,133],ABM1201:[135,148],HUMSS1201:[150,160],TO1201:[162,183],ITM1201:[185,194],CA1201:[196,202],DA1201:[204,210]},g=634796021),t.next=6,fetch("https://sheets.googleapis.com/v4/spreadsheets/".concat(p,"/values/").concat(m,"!D2:2"),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(v)}});case 6:return l=t.sent,t.prev=7,t.next=10,l.json();case 10:s=t.sent.values[0],t.next=16;break;case 13:t.prev=13,t.t0=t.catch(7),s=[];case 16:return u=new Date,s[s.length-1]===u.toLocaleDateString("en-us",{month:"short",day:"numeric"}).split(" ").join(". ")?c=s.length:(console.log("Cannot find Current Date in Google Sheets\nAdding a new Column!"),fetch("https://sheets.googleapis.com/v4/spreadsheets/".concat(p,":batchUpdate"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(v)},body:JSON.stringify({requests:[{updateCells:{range:{sheetId:g,startColumnIndex:i+s.length,endColumnIndex:i+s.length+1,endRowIndex:2,startRowIndex:1},fields:"*",rows:[{values:[{userEnteredValue:{stringValue:u.toLocaleDateString("en-us",{month:"short",day:"numeric"}).split(" ").join(". ")}}]}]}}]})}),c=s.length+1),t.next=20,fetch("https://sheets.googleapis.com/v4/spreadsheets/".concat(p,"/values/").concat(m,"!A").concat(e[r][0],":B").concat(e[r][1]),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(v)}});case 20:return d=t.sent,t.next=23,d.json();case 23:h=t.sent,t.t1=f().keys(h.values);case 25:if((t.t2=t.t1()).done){t.next=34;break}if(y=t.t2.value,h.values[y][1].slice(0,n.length)!==n){t.next=32;break}return o=parseInt(y)+e[r][0],console.log("Located at Column 1, Row "+o),fetch("https://sheets.googleapis.com/v4/spreadsheets/".concat(p,":batchUpdate"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(v)},body:JSON.stringify({requests:[{updateCells:{rows:[{values:[{userEnteredValue:{stringValue:"P"}}]}],range:{sheetId:g,startColumnIndex:i+(c-1),endColumnIndex:i+c,endRowIndex:o,startRowIndex:o-1},fields:"*"}}]})}),t.abrupt("return");case 32:t.next=25;break;case 34:return F(!0),t.abrupt("return",h);case 36:case"end":return t.stop()}},t,null,[[7,13]])}));return function(e,n,r){return t.apply(this,arguments)}}();Object(r.useEffect)(function(){new s.a("reader",{formatsToSupport:[s.b.QR_CODE]}).start({facingMode:"environment"},{fps:5,qrbox:200},function(e,t){var n=function(e){var t=e.split(" [|] ");return{name:t[0],studentNumber:t[1],guild:t[2],section:t[3]}}(h.a.decrypt(e,"@stamaria.sti.edu.ph").toString().match(/.{1,2}/g).map(function(e){return String.fromCharCode(parseInt(e,16))}).join(""));d(n.name),w(n.studentNumber),x(n.guild),A(n.section),P(!0)}).catch(function(e){z(!0)})},[]);return a.a.createElement(u.Page,null,a.a.createElement(u.Splitter,null,a.a.createElement(u.SplitterSide,{side:"left",width:"300",swipeable:!0,collapse:!0,isOpen:k,onPostClose:function(){return M(!1)}},a.a.createElement(u.Page,null,a.a.createElement("div",{id:"logo",align:"center"},a.a.createElement("img",{src:n(143),style:{height:"300px"},alt:"iredoclogo"})),a.a.createElement("hr",null),a.a.createElement("p",{align:"center"},"STI LISTO Club All Rights Reserved"),a.a.createElement("p",{align:"center"},"PBP Group | IREDOC Guild"))),a.a.createElement(u.SplitterContent,null,a.a.createElement(u.Page,{renderToolbar:function(){return a.a.createElement(u.Toolbar,{id:"toolbar"},a.a.createElement("div",{className:"left"},a.a.createElement("div",{className:"sidebyside"},a.a.createElement(u.ToolbarButton,{style:{color:"white"},onClick:function(){return M(!0)}},a.a.createElement(u.Icon,{icon:"md-menu"})),a.a.createElement("span",{id:"toolbar-title"},"Lista"))))}},a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement(u.AlertDialog,{isOpen:U,cancelable:!0},a.a.createElement("div",{className:"alert-dialog-title"},"Aw snap! No name found"),a.a.createElement("div",{className:"alert-dialog-content"},"It could be because a student's name in the QR Code has a typo, or their name in Google Sheets has a typo. ",a.a.createElement("br",null),a.a.createElement("br",null),"Try editing the name and try again, if that doesn't work look up their name in Google Sheets ",a.a.createElement("br",null),a.a.createElement("br",null),"If the methods above doesn't work, contact the IREDOC Coordinator, it might be because token has expired."),a.a.createElement("div",{className:"alert-dialog-footer"},a.a.createElement(u.Button,{className:"alert-dialog-button",onClick:function(){return F(!1)}},"Okie-dokey"))),a.a.createElement(u.AlertDialog,{isOpen:q,cancelable:!0},a.a.createElement("div",{className:"alert-dialog-title"},"Oops! I can't see"),a.a.createElement("div",{className:"alert-dialog-content"},"I don't have permission to use your camera! I can't scan QR Codes! ",a.a.createElement("br",null),a.a.createElement("br",null),"Please enable Camera permissions on your device settings and restart the app!"),a.a.createElement("div",{className:"alert-dialog-footer"},a.a.createElement(u.Button,{className:"alert-dialog-button",onClick:function(){return z(!1)}},"Okay!"))),a.a.createElement("div",{id:"reader"}),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("div",{align:"center",id:"student-information"},a.a.createElement(u.Card,null,a.a.createElement("h2",{className:"title",align:"center"},"Student Information"),a.a.createElement("p",{id:"name"},"Name: ",a.a.createElement(u.Input,{style:{fontFamily:"barlowLight"},value:i,onChange:function(e){return d(e.target.value)}})),a.a.createElement("p",{id:"student-number"},"Student number: ",b),a.a.createElement("p",{id:"guild"},"Guild: ",I),a.a.createElement("p",{id:"section"},"Section: ",j))),a.a.createElement("div",{id:"buttons"},a.a.createElement(u.Button,{modifier:"large--cta",onClick:function(){var e=new XMLHttpRequest;e.open("GET","https://raw.githubusercontent.com/brylleee/lista/main/.temptoken"),e.onload=function(){v=e.responseText,console.log("Token: "+v),Q(i,j,I),P(!1),d(""),w(""),x(""),A("")},e.send()},disabled:!G},"CONFIRM"))))))},E=function(){i.a.createRoot(document.getElementById("root")).render(a.a.createElement(y,null))};window.cordova?document.addEventListener("deviceready",E,!1):E()},73:function(e,t,n){e.exports=n(147)},79:function(e,t,n){}},[[73,1,2]]]);
//# sourceMappingURL=main.e486077a.chunk.js.map