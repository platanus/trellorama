(function(t){function e(e){for(var i,s,d=e[0],o=e[1],c=e[2],u=0,f=[];u<d.length;u++)s=d[u],r[s]&&f.push(r[s][0]),r[s]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i]);l&&l(e);while(f.length)f.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],i=!0,d=1;d<a.length;d++){var o=a[d];0!==r[o]&&(i=!1)}i&&(n.splice(e--,1),t=s(s.s=a[0]))}return t}var i={},r={app:0},n=[];function s(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=i,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(a,i,function(e){return t[e]}.bind(null,i));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/trello-stats/";var d=window["webpackJsonp"]=window["webpackJsonp"]||[],o=d.push.bind(d);d.push=e,d=d.slice();for(var c=0;c<d.length;c++)e(d[c]);var l=o;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var i=a("64a9"),r=a.n(i);r.a},4678:function(t,e,a){var i={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(t){var e=n(t);return a(e)}function n(t){var e=i[t];if(!(e+1)){var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}return e}r.keys=function(){return Object.keys(i)},r.resolve=n,t.exports=r,r.id="4678"},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var i=a("2b0e"),r=a("ed18"),n=a.n(r),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("button",{on:{click:t.swichSettings}},[t._v("Settings")]),t.seeSettings?a("Settings",{attrs:{boards:t.boards}}):t._e(),t.seeSettings?t._e():a("BoardList",{attrs:{boards:t.selectedBoards}})],1)},d=[],o=(a("6762a"),a("2fdb"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",t._l(t.boards,function(t){return a("div",{key:t.id},[a("Board",{attrs:{board:t}})],1)}),0)}),c=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("hr"),a("h1",[t._v(t._s(t.board.name))]),a("h2",[t._v("Label Filter")]),a("div",{staticClass:"label-box-conatiner"},t._l(t.labelOptions,function(e){return a("div",{key:e.value,staticClass:"label-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedLabels,expression:"selectedLabels"}],attrs:{type:"checkbox",id:e.value},domProps:{value:e.value,checked:Array.isArray(t.selectedLabels)?t._i(t.selectedLabels,e.value)>-1:t.selectedLabels},on:{change:function(a){var i=t.selectedLabels,r=a.target,n=!!r.checked;if(Array.isArray(i)){var s=e.value,d=t._i(i,s);r.checked?d<0&&(t.selectedLabels=i.concat([s])):d>-1&&(t.selectedLabels=i.slice(0,d).concat(i.slice(d+1)))}else t.selectedLabels=n}}}),a("label",{attrs:{for:e.value}},[t._v(t._s(e.label))])])}),0),a("h2",[t._v("Date Filter")]),a("div",{staticClass:"date-selector"},[a("div",{staticClass:"date-selector--input"},[a("label",{attrs:{for:"startDate"}},[t._v("Start Date: ")]),a("datepicker",{attrs:{name:"startDate",placeholder:"Start Date",format:"yyyy-MM-dd"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1),a("div",{staticClass:"date-selector--input"},[a("label",{attrs:{for:"endDate"}},[t._v("End Date (Not inclusive): ")]),a("datepicker",{attrs:{name:"endDate",placeholder:"End Date",format:"yyyy-MM-dd"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)]),a("h2",[t._v("Board Status")]),a("BoardInfo",{attrs:{lists:t.lists,cardsByList:t.cardsByList,cardActivities:t.cardActivities,endListId:t.endListId}}),a("CumulativeWrapper",{attrs:{cardActivities:t.cardActivities,listIds:t.listIds,boardId:t.board.id,startDate:t.startDate}}),a("LeadTime",{attrs:{cardActivities:t.cardActivities,endListId:t.endListId}}),a("TeamSpeed",{attrs:{cardActivities:t.cardActivities,endListId:t.endListId,startDate:t.startDate,endDate:t.endDate}}),a("ProjectionWrapper",{attrs:{cardActivities:t.cardActivities,endListId:t.endListId,numberOfCards:t.getNumberOfCards(),startDate:t.startDate,endDate:t.endDate,boardId:t.board.id}})],1)},u=[],f=(a("7f7f"),a("8615"),a("ac6a"),a("c1df")),v=a.n(f),p=a("fa33"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th"),t._l(t.lists,function(e){return a("th",{key:e.id},[t._v(t._s(e.name))])})],2)]),a("tbody",[a("tr",[a("th",[t._v("Number of Cards")]),t._l(t.lists,function(e){return a("td",{key:e.id+"_count"},[t._v(t._s(t.cardsByList[e.id].length))])})],2),a("tr",[a("th",[t._v("Time in List Average (days)")]),t._l(t.lists,function(e){return a("td",{key:e.id+"_time"},[t._v("\n        "+t._s(t.averageTimeByList[e.id])+"\n      ")])})],2),a("tr",[a("th",[t._v("Time in List Standard Deviation (days)")]),t._l(t.lists,function(e){return a("td",{key:e.id+"_time"},[t._v("\n        "+t._s(t.standardDeviationByList[e.id])+"\n      ")])})],2),a("tr",[a("th",[t._v("Time in List Mode (days)")]),t._l(t.lists,function(e){return a("td",{key:e.id+"_time"},[t._v("\n        "+t._s(t.modeByList[e.id])+"\n      ")])})],2)])])},b=[],m=a("2909"),y=(a("6b54"),a("7514"),a("55dd"),a("aabe"));v()().format();var j=2;function _(t,e,a){return a.filter(function(e){return e.id===t.id}).sort(function(t,e){return e.date-t.date})[0].activityId===t.activityId}function g(t,e,a){return 1===a.filter(function(e){return e.id===t.id}).length||_(t,e,a)}function k(t,e){return(e.map(function(e){return void 0===t.find(function(t){return t.id===e.id})?0:e.date.diff(t.find(function(t){return t.id===e.id}).date,"days",!0)}).map(function(t){return t>=0?t:0}).reduce(function(t,e){return t+e},0)/e.length).toFixed(j)}function L(t,e){var a=e.map(function(e){return void 0===t.find(function(t){return t.id===e.id})?0:e.date.diff(t.find(function(t){return t.id===e.id}).date,"days",!0)}).map(function(t){return t>=0?t:0});return 0===a.length?0:Object(y["std"])(a).toFixed(j)}function S(t,e){var a=e.map(function(e){return void 0===t.find(function(t){return t.id===e.id})?0:e.date.diff(t.find(function(t){return t.id===e.id}).date,"days",!0)}).map(function(t){return t>=0?t:0}).map(function(t){return Math.round(t)});return 0===a.length?0:Object(y["mode"])(a).toString()}function D(t,e){var a=t.filter(function(t){return"updateCard"===t.type}).filter(function(t){return t.data.listAfter.id===e}).map(function(t){return{id:t.data.card.id,date:v()(t.date),activityId:t.id}}).filter(function(t,e,a){return g(t,e,a)}),i=t.filter(function(t){return"createCard"===t.type}).filter(function(t){return a.map(function(t){return t.id}).includes(t.data.card.id)}).map(function(t){return{id:t.data.card.id,date:v()(t.date),activityId:t.id}});return[i,a]}function O(t,e){var a=t.filter(function(t){return"updateCard"===t.type}).filter(function(t){return t.data.listBefore.id===e}).map(function(t){return{id:t.data.card.id,date:v()(t.date),activityId:t.id}}).filter(function(t,e,a){return g(t,e,a)}),i=t.filter(function(t){return"createCard"===t.type}).filter(function(t){return t.data.list.id===e}).map(function(t){return{id:t.data.card.id,date:v()(t.date),activityId:t.id}}),r=t.filter(function(t){return"updateCard"===t.type}).filter(function(t){return t.data.listAfter.id===e}).map(function(t){return{id:t.data.card.id,date:v()(t.date),activityId:t.id}}).filter(function(t,e,a){return g(t,e,a)}),n=i.concat(r).filter(function(t,e,a){return g(t,e,a)}).filter(function(t){return a.map(function(t){return t.id}).includes(t.id)});return[n,a]}var A={name:"BoardInfo",props:{boardId:String,listIds:Array,lists:Array,cardsByList:Object,cardActivities:Array,endListId:String},data:function(){return{averageTimeByList:{},standardDeviationByList:{},modeByList:{}}},watch:{cardActivities:function(){var t=this;this.lists.forEach(function(e){t.$set(t.averageTimeByList,e.id,e.id===t.endListId?"-":k.apply(void 0,Object(m["a"])(O(t.cardActivities,e.id)))),t.$set(t.standardDeviationByList,e.id,e.id===t.endListId?"-":L.apply(void 0,Object(m["a"])(O(t.cardActivities,e.id)))),t.$set(t.modeByList,e.id,e.id===t.endListId?"-":S.apply(void 0,Object(m["a"])(O(t.cardActivities,e.id))))})}}},B=A,C=(a("d6ab"),a("2877")),w=Object(C["a"])(B,h,b,!1,null,null,null);w.options.__file="BoardInfo.vue";var T=w.exports,I=(a("456d"),a("a481"),a("4917"),a("bc3a")),W=a.n(I),x="https://trello.com/1/",P="trellotoken",V="trelloapikey",M=1e4;function E(t){var e=document.cookie.match("(^|;)\\s*".concat(t,"\\s*=\\s*([^;]+)"));return e?e.pop():""}function N(t,e){document.cookie="".concat(t,"=").concat(e)}function z(){return E(P)}function $(){return E(V)}function F(){return!(""===z())}function U(t){var e="".concat(window.location.origin).concat("/trello-stats/"),a="read",i="never",r="Trello Statistics",n="fragment",s="".concat(x,"authorize?key=").concat(t,"&return_url=").concat(e,"&name=").concat(r,"    &scope=").concat(a,"&expiration=").concat(i,"&response_type=").concat(n);window.location.assign(s)}function J(t){window.location.hash&&(N(P,window.location.hash.replace("#token=","")),N(V,t),window.location.href=window.location.href.replace(location.hash,"")),F()||U(t)}function R(t){return Object.keys(t).reduce(function(e,a){return"".concat(e,"&").concat(a,"=").concat(t[a])},"")}function q(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];setTimeout(function(){t.apply(void 0,Object(m["a"])(e))},M)}function G(t,e,a){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};W.a.get("".concat(x).concat(t,"?key=").concat($(),"&token=").concat(z()).concat(R(i))).then(e).catch(a)}var H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h2",[t._v("Cumulative Chart")]),a("div",[a("b",[t._v("Options:")]),t._v("\n     \n    "),a("label",{attrs:{for:"fillBackLists"}},[t._v("Fill lists retroactively")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.fillBackLists,expression:"fillBackLists"}],attrs:{type:"checkbox",id:"fillBackLists"},domProps:{checked:Array.isArray(t.fillBackLists)?t._i(t.fillBackLists,null)>-1:t.fillBackLists},on:{change:function(e){var a=t.fillBackLists,i=e.target,r=!!i.checked;if(Array.isArray(a)){var n=null,s=t._i(a,n);i.checked?s<0&&(t.fillBackLists=a.concat([n])):s>-1&&(t.fillBackLists=a.slice(0,s).concat(a.slice(s+1)))}else t.fillBackLists=r}}}),t._v("\n     \n    "),a("label",{attrs:{for:"dateTypeSelector"}},[t._v("Date Format: ")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.dateTypeSelector,expression:"dateTypeSelector"}],attrs:{id:"dateTypeSelector"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.dateTypeSelector=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"day"}},[t._v("Day")]),a("option",{attrs:{value:"week"}},[t._v("Week")]),a("option",{attrs:{value:"month"}},[t._v("Month")])]),t._v("\n     \n    "),"week"===t.dateTypeSelector?a("select",{directives:[{name:"model",rawName:"v-model",value:t.dayOfWeek,expression:"dayOfWeek"}],attrs:{id:"dayOfWeek"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.dayOfWeek=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"monday"}},[t._v("Monday")]),a("option",{attrs:{value:"tuesday"}},[t._v("Tuesday")]),a("option",{attrs:{value:"wednesday"}},[t._v("Wednesday")]),a("option",{attrs:{value:"thursday"}},[t._v("Thursday")]),a("option",{attrs:{value:"friday"}},[t._v("Friday")]),a("option",{attrs:{value:"saturday"}},[t._v("Saturday")]),a("option",{attrs:{value:"sunday"}},[t._v("Sunday")])]):t._e()]),a("CumulativeChart",{attrs:{activities:t.activities,listIds:t.listIds,fillBackLists:t.fillBackLists,dateTypeSelector:t.dateTypeSelector,dayOfWeek:t.dayOfWeek,startDate:t.startDate}})],1)},K=[],Q=a("1fca");a("f576");v()().format("yyyy-MM-dd");var X=2;function Y(t,e,a){var i=t.date().toString().padStart(X,"0");return"".concat(e,"-").concat(a,"-").concat(i)}function Z(t,e){t.day(e);var a=t.date().toString().padStart(X,"0"),i=t.year(),r=(t.month()+1).toString().padStart(X,"0");return"".concat(i,"-").concat(r,"-").concat(a)}function tt(t,e,a){return"".concat(e,"-").concat(a)}function et(t,e){var a,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"monday",r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];a=r?v()(t):t;var n=a.year(),s=(a.month()+1).toString().padStart(X,"0");switch(e){case"day":return Y(a,n,s);case"week":return Z(a,i);case"month":return tt(a,n,s);default:return Y(a,n,s)}}function at(t,e,a){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"monday",r=v()(t);return r.add(e,"".concat(a,"s")),et(r,a,i,!1)}function it(){return v()()}function rt(t,e,a,i){var r=v()(t);return r.subtract(e,"".concat(a,"s")),et(r,i.hasOwnProperty("unit")?i.unit:a,i.hasOwnProperty("dayOfWeek")?i.dayOfWeek:"monday",!1)}a("6c7b");v()().format("yyyy-MM-dd");var nt=[["rgba(255, 0, 0, 0.1)","rgba(255, 0, 0, 0.5)"],["rgba(0, 255, 0, 0.1)","rgba(0, 255, 0, 0.5)"],["rgba(0, 0, 255, 0.1)","rgba(0, 0, 255, 0.5)"],["rgba(244, 244, 65, 0.1)","rgba(244, 244, 65, 0.5)"],["rgba(244, 124, 65, 0.1)","rgba(244, 124, 65, 0.5)"],["rgba(65, 244, 211, 0.1)","rgba(65, 244, 211, 0.5)"],["rgba(160, 65, 244, 0.1)","rgba(160, 65, 244, 0.5)"]],st=0;function dt(t){var e;switch(t){case"random":e=nt[st],st=(st+1)%nt.length;break;case"blue":e=["rgba(0, 0, 255, 1)","rgba(0, 0, 255, 1)"];break;case"red":e=["rgba(255, 0, 0, 1)","rgba(255, 0, 0, 1)"];break;case"green":e=["rgba(0, 255, 0, 1)","rgba(0, 255, 0, 1)"];break;case"black":e=["rgba(0, 0, 0, 1)","rgba(0, 0, 0, 1)"];break;case"orange":e=["rgba(242, 132, 14, 0.5)","rgba(242, 132, 14, 0.5)"];break;default:e=nt[st],st=(st+1)%nt.length;break}return e}function ot(t){return t.map(function(t){return t.date}).filter(function(t,e,a){return a.indexOf(t)===e}).sort()}function ct(t,e){return t.filter(function(t){return t.date===e}).length}function lt(t,e,a){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{color:"random",fill:!0};if(0===t.length)return{label:[],data:[]};var r=e.map(function(e){return ct(t,e)}).reduce(function(t,e,a){return[].concat(Object(m["a"])(t),[e+(t[a-1]||0)])},[]),n=dt(i.color);return{label:a,data:r,fill:i.fill,backgroundColor:n[0],borderColor:n[1],cubicInterpolationMode:"monotone"}}function ut(t,e,a){return a.map(function(a){return lt(t.filter(function(t){return a===t.list.id}),e,t.filter(function(t){return a===t.list.id}).length>0?t.filter(function(t){return a===t.list.id})[0].list.name:"")})}function ft(t,e,a){t.splice(e+1,0,a)}function vt(t,e,a){t.splice(e+1,0,t[a?e:e+1])}function pt(t,e,a,i){i.multipleDatasets?t.dateLabels.includes(a)||(ft(t.dateLabels,e,a),Object.values(t.datasetData).map(function(t){return vt(t.data,e,i.isTheStart)})):t.dateLabels.includes(a)||(ft(t.dateLabels,e,a),vt(t.datasetData,e,i.isTheStart))}function ht(t,e,a,i){if(0!==t.length){var r=-1,n=et(a.startDate,a.dateTypeSelector,a.dayOfWeek,!0);while(!t.includes(n))pt({dateLabels:t,datasetData:e},r,n,{multipleDatasets:i,isTheStart:!1}),n=at(n,1,a.dateTypeSelector,a.dayOfWeek),r++}}function bt(t,e,a,i){if(0!==t.length){var r,n=0,s=et(rt(it(),1,a.dateTypeSelector,{dayOfWeek:a.dayOfWeek}),a.dateTypeSelector,a.dayOfWeek,!0),d=t[n];while(v()(d).isSameOrBefore(s,"day"))r=at(d,1,a.dateTypeSelector,a.dayOfWeek),pt({dateLabels:t,datasetData:e},n,r,{multipleDatasets:i,isTheStart:!0}),n++,d=t[n]}}function mt(t,e,a){return"updateCard"===t.type?{date:et(t.date,e,a),list:t.data.listAfter,id:t.data.card.id}:"createCard"===t.type?{date:et(t.date,e,a),list:t.data.list,id:t.data.card.id}:null}function yt(t,e){e.slice(1).forEach(function(a,i){t.filter(function(t){return t.list.id===a}).forEach(function(a){e.slice(0,i+1).forEach(function(e){var i=t.filter(function(t){return t.list.id===e}).filter(function(t){return t.id===a.id});0===i.length&&t.push({date:a.date,list:{id:e,name:""},id:a.id})})})})}var jt,_t,gt=function(t,e,a,i){var r=t.map(function(t){return mt(t,i.dateTypeSelector,i.dayOfWeek)}).filter(function(t){return null!==t}).filter(function(t){return e.includes(t.list.id)});a&&yt(r,e);var n=ot(r),s=ut(r,n,e);return bt(n,s,{dateTypeSelector:i.dateTypeSelector,dayOfWeek:i.dayOfWeek},!0),ht(n,s,{dateTypeSelector:i.dateTypeSelector,dayOfWeek:i.dayOfWeek,startDate:i.startDate},!0),{labels:n,datasets:s}},kt=Q["b"].reactiveData,Lt={name:"CumulativeChart",mixins:[Q["a"],kt],props:{activities:{type:Array,default:null},listIds:Array,fillBackLists:Boolean,dateTypeSelector:String,dayOfWeek:String,startDate:Date},data:function(){return{chartoptions:{responsive:!0,maintainAspectRatio:!1,chartdata:{}}}},watch:{activities:function(){this.renderData()},fillBackLists:function(){this.renderData()},dateTypeSelector:function(){this.renderData()},dayOfWeek:function(){this.renderData()}},mounted:function(){this.renderChart(this.chartdata,this.chartoptions)},methods:{renderData:function(){this.chartdata=gt(this.activities,this.listIds,this.fillBackLists,{dateTypeSelector:this.dateTypeSelector,dayOfWeek:this.dayOfWeek,startDate:this.startDate}),this.renderChart(this.chartdata,this.chartoptions)}}},St=Lt,Dt=Object(C["a"])(St,jt,_t,!1,null,null,null);Dt.options.__file="CumulativeChart.vue";var Ot=Dt.exports;function At(t,e){window.localStorage.setItem(t,JSON.stringify(e))}function Bt(t,e){var a=window.localStorage.getItem(t);return null===a?e:JSON.parse(a)}var Ct={name:"CumulativeWrapper",components:{CumulativeChart:Ot},props:{cardActivities:Array,listIds:Array,boardId:String,startDate:Date},mounted:function(){this.activities=this.cardActivities},data:function(){return{fillBackLists:Bt("".concat(this.boardId,"_cumulative_fillBack"),!0),dateTypeSelector:Bt("".concat(this.boardId,"_cumulative_dateType"),"day"),dayOfWeek:Bt("".concat(this.boardId,"_cumulative_dayOfWeek"),"monday"),activities:[]}},watch:{cardActivities:function(){this.activities=this.cardActivities},dateTypeSelector:function(){At("".concat(this.boardId,"_cumulative_dateType"),this.dateTypeSelector)},dayOfWeek:function(){At("".concat(this.boardId,"_cumulative_dayOfWeek"),this.dayOfWeek)},fillBackLists:function(){At("".concat(this.boardId,"_cumulative_fillBack"),this.fillBackLists)}}},wt=Ct,Tt=Object(C["a"])(wt,H,K,!1,null,null,null);Tt.options.__file="CumulativeWrapper.vue";var It=Tt.exports,Wt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h2",[t._v("Team Speed")]),a("p",[a("b",[t._v("By Week:")]),t._v(" "+t._s(t.speed))])])},xt=[];function Pt(t,e){return v()(t.date).diff(e.date,"days")}function Vt(t,e,a){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"monday";return t.filter(function(t){return"updateCard"===t.type}).filter(function(t){return t.data.listAfter.id===e}).map(function(t){return{id:t.data.card.id,date:et(t.date,a,i)}}).sort(Pt)}function Mt(t,e,a){var i=null===a?v()():v()(a),r=null===e?t[0].date:e;return(t.length/(0===t.length?1:i.diff(r,"weeks"))).toFixed(1)}v()().format("yyyy-MM-dd");var Et={name:"TeamSpeed",props:{cardActivities:Array,endListId:String,endDate:Date,startDate:Date},data:function(){return{speed:0}},mounted:function(){this.speed=this.getSpeed()},watch:{cardActivities:function(){this.speed=this.getSpeed()}},methods:{getSpeed:function(){return Mt(Vt(this.cardActivities,this.endListId,"week"),this.startDate,this.endDate)}}},Nt=Et,zt=Object(C["a"])(Nt,Wt,xt,!1,null,null,null);zt.options.__file="TeamSpeed.vue";var $t=zt.exports,Ft=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h2",[t._v("Lead Time")]),a("p",[a("b",[t._v("Days: ")]),t._v(" "+t._s(t.leadTime)+"\n  ")])])},Ut=[],Jt={name:"LeadTime",props:{cardActivities:Array,endListId:String},data:function(){return{leadTime:0}},watch:{cardActivities:function(){this.leadTime=k.apply(void 0,Object(m["a"])(D(this.cardActivities,this.endListId)))}}},Rt=Jt,qt=Object(C["a"])(Rt,Ft,Ut,!1,null,null,null);qt.options.__file="LeadTime.vue";var Gt=qt.exports,Ht=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h2",[t._v("Projection Chart")]),a("div",[a("b",[t._v("Options:")]),t._v("\n     \n    "),a("label",{attrs:{for:"dateTypeSelector"}},[t._v("Date Format: ")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.dateTypeSelector,expression:"dateTypeSelector"}],attrs:{id:"dateTypeSelector"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.dateTypeSelector=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"day"}},[t._v("Day")]),a("option",{attrs:{value:"week"}},[t._v("Week")])]),t._v("\n     \n    "),"week"===t.dateTypeSelector?a("select",{directives:[{name:"model",rawName:"v-model",value:t.dayOfWeek,expression:"dayOfWeek"}],attrs:{id:"dayOfWeek"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.dayOfWeek=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"monday"}},[t._v("Monday")]),a("option",{attrs:{value:"tuesday"}},[t._v("Tuesday")]),a("option",{attrs:{value:"wednesday"}},[t._v("Wednesday")]),a("option",{attrs:{value:"thursday"}},[t._v("Thursday")]),a("option",{attrs:{value:"friday"}},[t._v("Friday")]),a("option",{attrs:{value:"saturday"}},[t._v("Saturday")]),a("option",{attrs:{value:"sunday"}},[t._v("Sunday")])]):t._e(),t._v("\n     \n    "),a("label",{attrs:{for:"optimistValue"}},[t._v("Optimist increase: ")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.optimistValue,expression:"optimistValue"}],attrs:{type:"number",id:"optimistValue"},domProps:{value:t.optimistValue},on:{input:function(e){e.target.composing||(t.optimistValue=e.target.value)}}}),t._v("\n     \n    "),a("label",{attrs:{for:"pesimistValue"}},[t._v("Pesimist decrease: ")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.pesimistValue,expression:"pesimistValue"}],attrs:{type:"number",id:"timeUpesimistValuenits"},domProps:{value:t.pesimistValue},on:{input:function(e){e.target.composing||(t.pesimistValue=e.target.value)}}}),t._v("\n     \n    "),a("div",{staticClass:"date-selector"},[a("div",{staticClass:"date-selector--input"},[a("label",{attrs:{for:"endDate"}},[t._v("Projection Date: ")]),a("datepicker",{attrs:{name:"projectionDate",placeholder:"Projection Date",format:"yyyy-MM-dd"},model:{value:t.projectionDate,callback:function(e){t.projectionDate=e},expression:"projectionDate"}})],1)])]),a("ProjectionChart",{attrs:{filteredActivities:t.filteredActivities,endListId:t.endListId,speed:parseFloat(t.localSpeedProjection(t.filteredActivities)),timeUnitsForward:t.timeUnits,dateTypeSelector:t.dateTypeSelector,optimistValue:parseInt(t.optimistValue),pesimistValue:parseInt(t.pesimistValue),numberOfCards:t.numberOfCards,dayOfWeek:t.dayOfWeek,startDate:t.startDate}})],1)},Kt=[],Qt=(a("c5f6"),a("0644")),Xt=a.n(Qt);v()().format("yyyy-MM-dd");var Yt,Zt,te=Q["b"].reactiveData,ee=5,ae=7,ie={name:"ProjectionChart",mixins:[Q["a"],te],props:{filteredActivities:{type:Array,default:null},speed:Number,timeUnitsForward:Number,endListId:String,dateTypeSelector:String,optimistValue:Number,pesimistValue:Number,numberOfCards:Number,dayOfWeek:String,startDate:Date},data:function(){return{chartoptions:{responsive:!0,maintainAspectRatio:!1,chartdata:{}}}},watch:{filteredActivities:function(){this.renderData()},speed:function(){this.renderData()},timeUnitsForward:function(){this.renderData()},optimistValue:function(){this.renderData()},pesimistValue:function(){this.renderData()}},mounted:function(){this.renderChart(this.chartdata,this.chartoptions)},methods:{renderData:function(){this.buildChartData(),this.renderChart(this.chartdata,this.chartoptions)},getSecondToLastItem:function(t){var e=2;return t[t.length-e]},buildChartData:function(){var t=ot(this.filteredActivities),e=lt(this.filteredActivities,t,"Current Progression",{color:"black",fill:!1});bt(t,e.data,{dateTypeSelector:this.dateTypeSelector,dayOfWeek:this.dayOfWeek},!1),ht(t,e.data,{dateTypeSelector:this.dateTypeSelector,dayOfWeek:this.dayOfWeek,startDate:this.startDate},!1);var a=this.projectData(this.speed,this.timeUnitsForward,e,{colors:dt("blue"),label:"Current Projection"}),i=this.projectData(this.speed+this.optimistValue,this.timeUnitsForward,e,{colors:dt("green"),label:"Optimist Projection"}),r=this.projectData(this.speed-this.pesimistValue,this.timeUnitsForward,e,{colors:dt("red"),label:"Pesimist Projection"}),n=this.generateTotalCardsLine(e,a.data.length,this.numberOfCards,{colors:dt("orange"),label:"Number of Cards",borderDash:[ee,ee]});t=this.extendLabels(t,this.timeUnitsForward),this.chartdata={labels:t,datasets:[e,a,i,r,n]}},extendLabels:function(t,e){var a=this,i=t.slice(),r=i[i.length-1];return Object(m["a"])(Array(e).keys()).forEach(function(){r=at(r,1,a.dateTypeSelector),i.push(r)}),i},adaptProjectionRate:function(t,e){switch(e){case"week":return t;case"day":return t/ae;default:return t}},projectData:function(t,e,a,i){var r=this,n=Xt()(a);n.borderColor=i.colors[0],n.backgroundColor=i.colors[1],n.label=i.label;var s=a.data[a.data.length-1];return Object(m["a"])(Array(e).keys()).forEach(function(e){n.data.push(Math.floor(s+r.adaptProjectionRate(t,r.dateTypeSelector)*(e+1)))}),n},generateTotalCardsLine:function(t,e,a,i){var r=Xt()(t);return r.borderColor=i.colors[0],r.backgroundColor=i.colors[1],r.label=i.label,r.borderDash=i.borderDash,r.radius=0,r.data=Array(e).fill(a),r}}},re=ie,ne=Object(C["a"])(re,Yt,Zt,!1,null,null,null);ne.options.__file="ProjectionChart.vue";var se=ne.exports;v()().format("yyyy-MM-dd");var de={name:"ProjectionWrapper",props:{endListId:String,cardActivities:Array,numberOfCards:Number,endDate:Date,boardId:String,startDate:Date},components:{ProjectionChart:se,Datepicker:p["a"]},data:function(){return{dateTypeSelector:Bt("".concat(this.boardId,"_projection_dateType"),"week"),dayOfWeek:Bt("".concat(this.boardId,"_projection_dayOfWeek"),"monday"),filteredActivities:[],optimistValue:Bt("".concat(this.boardId,"_projection_optimistValue"),1),pesimistValue:Bt("".concat(this.boardId,"_projection_pesimistValue"),1),projectionDate:Bt("".concat(this.boardId,"_projection_projectionDate"),new Date)}},computed:{timeUnits:function(){return Math.ceil(v()(this.projectionDate).diff(v()(new Date),"".concat(this.dateTypeSelector,"s"),!0))}},mounted:function(){this.generateData()},watch:{cardActivities:function(){this.generateData()},dayOfWeek:function(){At("".concat(this.boardId,"_projection_dayOfWeek"),this.dayOfWeek),this.generateData()},dateTypeSelector:function(){At("".concat(this.boardId,"_projection_dateType"),this.dateTypeSelector),this.generateData()},projectionDate:function(){At("".concat(this.boardId,"_projection_projectionDate"),this.projectionDate)},optimistValue:function(){At("".concat(this.boardId,"_projection_optimistValue"),this.optimistValue)},pesimistValue:function(){At("".concat(this.boardId,"_projection_pesimistValue"),this.pesimistValue)}},methods:{localSpeedProjection:function(t){return Mt(t,this.startDate,this.endDate)},generateData:function(){this.filteredActivities=Vt(this.cardActivities,this.endListId,this.dateTypeSelector,this.dayOfWeek)}}},oe=de,ce=(a("b855"),Object(C["a"])(oe,Ht,Kt,!1,null,null,null));ce.options.__file="ProjectionWrapper.vue";var le=ce.exports;v()().format("yyyy-MM-dd");var ue={name:"Board",components:{BoardInfo:T,TeamSpeed:$t,CumulativeWrapper:It,LeadTime:Gt,ProjectionWrapper:le,Datepicker:p["a"]},props:{board:Object},data:function(){return{listIds:Bt("lists_".concat(this.$props.board.id),[]),lists:[],allCardsByList:{},cardsByList:{},listIncludesArchived:Bt("archived_".concat(this.$props.board.id),[]),allCardsActivities:[],cardActivities:[],endListId:Bt("end_".concat(this.$props.board.id),null),labelOptions:[],startDate:new Date(Bt("".concat(this.board.id,"_startDate"),rt(new Date,1,"month",{unit:"day"}))),endDate:new Date,selectedLabels:[]}},mounted:function(){this.getLists(this.$props.board.id,this.listIds),this.getBoardLabels(this.$props.board.id)},watch:{startDate:function(){var t=this;At("".concat(this.board.id,"_startDate"),this.startDate),this.allCardsActivities=[],Object.values(this.cardsByList).flat().forEach(function(e){return t.getAllCardsActivities(e.id)})},endDate:function(){var t=this;this.allCardsActivities=[],Object.values(this.cardsByList).flat().forEach(function(e){return t.getAllCardsActivities(e.id)})},allCardsActivities:function(){this.getSelectedActivities()},selectedLabels:function(){At("".concat(this.board.id,"_selectedLabels"),this.selectedLabels),this.getSelectedCards(),this.getSelectedActivities()},allCardsByList:{handler:function(){this.getSelectedCards(),this.getSelectedActivities()},deep:!0}},methods:{getNumberOfCards:function(){var t=this;return this.lists.map(function(e){return t.cardsByList[e.id]}).flat().length},getSelectedCards:function(){var t=this;this.lists.forEach(function(e){t.cardsByList[e.id]=t.allCardsByList[e.id].filter(function(e){return e.labels.map(function(t){return t.id}).some(function(e){return t.selectedLabels.includes(e)})||!!t.selectedLabels.includes(null)&&0===e.labels.length})})},getSelectedActivities:function(){var t=this;this.cardActivities=this.allCardsActivities.filter(function(e){return Object.values(t.cardsByList).flat().map(function(t){return t.id}).includes(e.data.card.id)})},getLists:function(t,e){var a=this;G("boards/".concat(t,"/lists"),function(t){a.lists=t.data.filter(function(t){return e.includes(t.id)}),a.lists.forEach(function(t){return a.getAllCards(t.id,a.listIncludesArchived.includes(t.id))})},function(){q(a.getLists,[t,e])})},getAllCards:function(t,e){var a=e?"all":"open",i=this;i.$set(i.allCardsByList,t,[]),i.$set(this.cardsByList,t,[]),G("lists/".concat(t),function(e){e.data.cards.forEach(function(t){i.getAllCardsActivities(t.id)}),i.$set(i.allCardsByList,t,e.data.cards)},function(){q(i.getAllCards,[t,e])},{cards:a})},getAllCardsActivities:function(t){var e=this;G("cards/".concat(t,"/actions"),function(t){e.allCardsActivities=e.allCardsActivities.concat(t.data),e.cardActivities=e.cardActivities.concat(t.data)},function(){q(e.getAllCardsActivities,[t])},{filter:"createCard,updateCard:idList",since:et(e.startDate,"day"),before:et(e.endDate,"day")})},getBoardLabels:function(t){var e=this,a=this;G("boards/".concat(t,"/labels"),function(t){a.labelOptions=t.data.map(function(t){return{label:t.name,value:t.id}}),a.labelOptions.push({label:"No Label",value:null}),a.selectedLabels=Bt("".concat(e.board.id,"_selectedLabels"),null),null===a.selectedLabels&&(a.selectedLabels=a.labelOptions.map(function(t){return t.value}))},function(){q(a.getBoardLabels,[t])})}}},fe=ue,ve=(a("b2e8"),Object(C["a"])(fe,l,u,!1,null,null,null));ve.options.__file="Board.vue";var pe=ve.exports,he={name:"BoardList",components:{Board:pe},props:{boards:Array}},be=he,me=Object(C["a"])(be,o,c,!1,null,null,null);me.options.__file="BoardList.vue";var ye=me.exports,je=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("BoardSelector",{attrs:{boards:t.boards}})},_e=[],ge=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",[t._v("Select Boards")]),a("v-select",{attrs:{multiple:"",options:t.boardLabels},model:{value:t.selectedBoards,callback:function(e){t.selectedBoards=e},expression:"selectedBoards"}}),a("button",{on:{click:t.saveBoards}},[t._v("Save Boards")]),a("h2",[t._v("Select a board")]),a("v-select",{attrs:{options:t.selectedBoards},model:{value:t.selectedBoard,callback:function(e){t.selectedBoard=e},expression:"selectedBoard"}}),null!==t.selectedBoard?a("div",[a("h3",[t._v("Lists to Show")]),a("v-select",{attrs:{multiple:"",options:t.listLabels},model:{value:t.selectedLists,callback:function(e){t.selectedLists=e},expression:"selectedLists"}}),a("h3",[t._v("Include Archived")]),a("v-select",{attrs:{multiple:"",options:t.selectedLists},model:{value:t.archivedLists,callback:function(e){t.archivedLists=e},expression:"archivedLists"}}),a("h3",[t._v("Finished List")]),a("v-select",{attrs:{options:t.selectedLists},model:{value:t.endList,callback:function(e){t.endList=e},expression:"endList"}}),a("button",{on:{click:t.saveLists}},[t._v("Save Lists")])],1):t._e()],1)},ke=[],Le=a("4a7a"),Se=a.n(Le),De={name:"BoardSelector",components:{vSelect:Se.a},props:{boards:Array},data:function(){return{boardLabels:[],selectedBoards:[],selectedBoard:null,listLabels:[],selectedLists:[],archivedLists:[],lists:[],endList:null}},mounted:function(){this.boardLabels=this.boards.map(function(t){return{label:t.name,value:t.id}})},watch:{boardLabels:function(){var t=Bt("boards",[]);this.selectedBoards=this.boardLabels.filter(function(e){return t.includes(e.value)})},selectedBoard:function(){this.getLists(this.selectedBoard.value),this.endList=null,this.archivedLists=[]},listLabels:function(){var t=Bt("lists_".concat(this.selectedBoard.value),[]);this.selectedLists=this.listLabels.filter(function(e){return t.includes(e.value)});var e=Bt("archived_".concat(this.selectedBoard.value),[]);this.archivedLists=this.listLabels.filter(function(t){return e.includes(t.value)});var a=Bt("end_".concat(this.selectedBoard.value),null);this.endList=this.listLabels.find(function(t){return a===t.value})}},methods:{getLists:function(t){var e=this;G("boards/".concat(t,"/lists"),function(t){e.listLabels=t.data.map(function(t){return{label:t.name,value:t.id}}),e.lists=t.data},function(){q(e.getLists)})},saveBoards:function(){At("boards",this.selectedBoards.map(function(t){return t.value}))},saveLists:function(){At("end_".concat(this.selectedBoard.value),this.endList.value),At("lists_".concat(this.selectedBoard.value),this.selectedLists.map(function(t){return t.value})),At("archived_".concat(this.selectedBoard.value),this.archivedLists.map(function(t){return t.value}))}}},Oe=De,Ae=Object(C["a"])(Oe,ge,ke,!1,null,null,null);Ae.options.__file="BoardSelector.vue";var Be=Ae.exports,Ce={name:"Settings",components:{BoardSelector:Be},props:{boards:Array}},we=Ce,Te=Object(C["a"])(we,je,_e,!1,null,null,null);Te.options.__file="Settings.vue";var Ie=Te.exports;J("79fd6886e87f06d8259e2020164c3899");var We={name:"app",components:{BoardList:ye,Settings:Ie},data:function(){return{seeSettings:!1,boards:[],boardIds:[],selectedBoards:[]}},mounted:function(){this.getBoards()},watch:{seeSettings:function(){var t=this;this.boardIds=Bt("boards",[]),this.selectedBoards=this.boards.filter(function(e){return t.boardIds.includes(e.id)})},boards:function(){var t=this;this.boardIds=Bt("boards",[]),this.selectedBoards=this.boards.filter(function(e){return t.boardIds.includes(e.id)})}},methods:{swichSettings:function(){this.seeSettings=!this.seeSettings},getBoards:function(){var t=this;G("members/me/boards",function(e){t.boards=e.data},function(){q(t.getBoards)})}}},xe=We,Pe=(a("034f"),Object(C["a"])(xe,s,d,!1,null,null,null));Pe.options.__file="App.vue";var Ve=Pe.exports;n.a.config(),i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(Ve)}}).$mount("#app")},"64a9":function(t,e,a){},7470:function(t,e,a){},b2e8:function(t,e,a){"use strict";var i=a("dcc5"),r=a.n(i);r.a},b855:function(t,e,a){"use strict";var i=a("dade"),r=a.n(i);r.a},d6ab:function(t,e,a){"use strict";var i=a("7470"),r=a.n(i);r.a},dade:function(t,e,a){},dcc5:function(t,e,a){}});
//# sourceMappingURL=app.4dc9c962.js.map