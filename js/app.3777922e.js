(function(t){function e(e){for(var n,s,c=e[0],o=e[1],d=e[2],u=0,f=[];u<c.length;u++)s=c[u],r[s]&&f.push(r[s][0]),r[s]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);l&&l(e);while(f.length)f.shift()();return i.push.apply(i,d||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,c=1;c<a.length;c++){var o=a[c];0!==r[o]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/trello-stats/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var l=o;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("64a9"),r=a.n(n);r.a},4678:function(t,e,a){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(t){var e=i(t);return a(e)}function i(t){var e=n[t];if(!(e+1)){var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}return e}r.keys=function(){return Object.keys(n)},r.resolve=i,t.exports=r,r.id="4678"},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var n=a("2b0e"),r=a("ed18"),i=a.n(r),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("BoardList")],1)},c=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",t._l(t.boards,function(t){return a("div",{key:t.id},[a("Board",{attrs:{board:t}})],1)}),0)},d=[],l=(a("6762"),a("2fdb"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",[t._v(t._s(t.board.name))]),a("h2",[t._v("Tag Filter")]),a("v-select",{attrs:{multiple:"",options:t.selectedLabelOptions},model:{value:t.selectedCardLabels,callback:function(e){t.selectedCardLabels=e},expression:"selectedCardLabels"}}),a("h2",[t._v("Board Status")]),a("BoardInfo",{attrs:{lists:t.lists,cardsByList:t.cardsByList}}),a("CumulativeWrapper",{attrs:{cardActivities:t.cardActivities,listIds:t.listIds}}),a("TeamSpeed",{attrs:{speed:t.weeklySpeed(t.filterActivities(t.endListId))}})],1)}),u=[],f=(a("5df3"),a("4f7f"),a("2909")),v=(a("55dd"),a("28a5"),a("7f7f"),a("8615"),a("ac6a"),a("4a7a")),b=a.n(v),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th"),t._l(t.lists,function(e){return a("th",{key:e.id},[t._v(t._s(e.name))])})],2)]),a("tbody",[a("tr",[a("th",[t._v("Number of Cards")]),t._l(t.lists,function(e){return a("td",{key:e.id+"_count"},[t._v(t._s(t.cardsByList[e.id].length))])})],2)])])},h=[],j={name:"BoardInfo",props:{boardId:String,listIds:Array,lists:Array,cardsByList:Object}},m=j,y=(a("d6ab"),a("2877")),g=Object(y["a"])(m,p,h,!1,null,null,null);g.options.__file="BoardInfo.vue";var k=g.exports,_=(a("456d"),a("a481"),a("4917"),a("bc3a")),B=a.n(_),A=a("5f35"),L="https://trello.com/1/",C="trellotoken",S="trelloapikey",O=1e4;function w(t){var e=document.cookie.match("(^|;)\\s*".concat(t,"\\s*=\\s*([^;]+)"));return e?e.pop():""}function D(t,e){document.cookie="".concat(t,"=").concat(e)}function x(){return w(C)}function T(){return w(S)}function z(){return!(""===x())}function I(t){var e="".concat(window.location.origin).concat(A["baseUrl"]),a="read",n="never",r="Trello Statistics",i="fragment",s="".concat(L,"authorize?key=").concat(t,"&return_url=").concat(e,"&name=").concat(r,"&scope=").concat(a,"&expiration=").concat(n,"&response_type=").concat(i);window.location.assign(s)}function W(t){window.location.hash&&(D(C,window.location.hash.replace("#token=","")),D(S,t),window.location.href=window.location.href.replace(location.hash,"")),z()||I(t)}function E(t){return Object.keys(t).reduce(function(e,a){return"".concat(e,"&").concat(a,"=").concat(t[a])},"")}function M(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];setTimeout(function(){t.apply(void 0,Object(f["a"])(e))},O)}function $(t,e,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};B.a.get("".concat(L).concat(t,"?key=").concat(T(),"&token=").concat(x()).concat(E(n))).then(e).catch(a)}var N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h2",[t._v("Cumulative Chart")]),a("div",[a("b",[t._v("Options:")]),t._v("\n     \n    "),a("label",{attrs:{for:"fillBackLists"}},[t._v("Fill lists retroactively")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.fillBackLists,expression:"fillBackLists"}],attrs:{type:"checkbox",id:"fillBackLists"},domProps:{checked:Array.isArray(t.fillBackLists)?t._i(t.fillBackLists,null)>-1:t.fillBackLists},on:{change:function(e){var a=t.fillBackLists,n=e.target,r=!!n.checked;if(Array.isArray(a)){var i=null,s=t._i(a,i);n.checked?s<0&&(t.fillBackLists=a.concat([i])):s>-1&&(t.fillBackLists=a.slice(0,s).concat(a.slice(s+1)))}else t.fillBackLists=r}}}),t._v("\n     \n    "),a("label",{attrs:{for:"dateTypeSelector"}},[t._v("Date Format: ")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.dateTypeSelector,expression:"dateTypeSelector"}],attrs:{id:"dateTypeSelector"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.dateTypeSelector=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"day"}},[t._v("Day")]),a("option",{attrs:{value:"week"}},[t._v("Week")]),a("option",{attrs:{value:"month"}},[t._v("Month")])]),t._v("\n     \n    "),"week"===t.dateTypeSelector?a("select",{directives:[{name:"model",rawName:"v-model",value:t.dayOfWeek,expression:"dayOfWeek"}],attrs:{id:"dayOfWeek"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.dayOfWeek=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"monday"}},[t._v("Monday")]),a("option",{attrs:{value:"tuesday"}},[t._v("Tuesday")]),a("option",{attrs:{value:"wednesday"}},[t._v("Wednesday")]),a("option",{attrs:{value:"thursday"}},[t._v("Thursday")]),a("option",{attrs:{value:"friday"}},[t._v("Friday")]),a("option",{attrs:{value:"saturday"}},[t._v("Saturday")]),a("option",{attrs:{value:"sunday"}},[t._v("Sunday")])]):t._e(),a("div",{staticClass:"date-selector"},[a("div",{staticClass:"date-selector--input"},[a("label",{attrs:{for:"startDate"}},[t._v("Start Date: ")]),a("datepicker",{attrs:{name:"startDate",placeholder:"Start Date",format:"yyyy-MM-dd"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1),a("div",{staticClass:"date-selector--input"},[a("label",{attrs:{for:"endDate"}},[t._v("End Date (Not inclusive): ")]),a("datepicker",{attrs:{name:"endDate",placeholder:"End Date",format:"yyyy-MM-dd"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)])]),a("CumulativeChart",{attrs:{activities:t.activities,listIds:t.listIds,fillBackLists:t.fillBackLists,dateTypeSelector:t.dateTypeSelector,dayOfWeek:t.dayOfWeek}})],1)},P=[],F=a("c1df"),U=a.n(F),q=a("fa33"),J=a("1fca");a("6b54"),a("f576");U()().format();var R=2;function G(t,e,a){var n=t.date().toString().padStart(R,"0");return"".concat(e,"-").concat(a,"-").concat(n)}function H(t,e,a,n){t.day(n);var r=t.date().toString().padStart(R,"0");return"".concat(e,"-").concat(a,"-").concat(r)}function K(t,e,a){return"".concat(e,"-").concat(a)}var Q=function(t,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"monday",n=U()(t),r=n.year(),i=(n.month()+1).toString().padStart(R,"0");switch(e){case"day":return G(n,r,i);case"week":return H(n,r,i,a);case"month":return K(n,r,i);default:return G(n,r,i)}},V=[["rgba(255, 0, 0, 0.1)","rgba(255, 0, 0, 0.5)"],["rgba(0, 255, 0, 0.1)","rgba(0, 255, 0, 0.5)"],["rgba(0, 0, 255, 0.1)","rgba(0, 0, 255, 0.5)"],["rgba(244, 244, 65, 0.1)","rgba(244, 244, 65, 0.5)"],["rgba(244, 124, 65, 0.1)","rgba(244, 124, 65, 0.5)"],["rgba(65, 244, 211, 0.1)","rgba(65, 244, 211, 0.5)"],["rgba(160, 65, 244, 0.1)","rgba(160, 65, 244, 0.5)"]],X=0;function Y(){var t=V[X];return X=(X+1)%V.length,t}function Z(t,e,a){return"updateCard"===t.type?{date:Q(t.date,e,a),list:t.data.listAfter,id:t.data.card.id}:"createCard"===t.type?{date:Q(t.date,e,a),list:t.data.list,id:t.data.card.id}:null}function tt(t){return t.map(function(t){return t.date}).filter(function(t,e,a){return a.indexOf(t)===e}).sort()}function et(t,e){return t.filter(function(t){return t.date===e}).length}function at(t,e){if(0===t.length)return{label:[],data:[]};var a=t[0].list.name,n=e.map(function(e){return et(t,e)}).reduce(function(t,e,a){return[].concat(Object(f["a"])(t),[e+(t[a-1]||0)])},[]),r=Y();return{label:a,data:n,fill:!0,backgroundColor:r[0],borderColor:r[1],cubicInterpolationMode:"monotone"}}function nt(t,e,a){return a.map(function(a){return at(t.filter(function(t){return a===t.list.id}),e)})}function rt(t,e){e.slice(1).forEach(function(a,n){t.filter(function(t){return t.list.id===a}).forEach(function(a){e.slice(0,n+1).forEach(function(e){var n=t.filter(function(t){return t.list.id===e}).filter(function(t){return t.id===a.id});0===n.length&&t.push({date:a.date,list:{id:e,name:""},id:a.id})})})})}var it,st,ct=function(t,e,a,n){var r=t.map(function(t){return Z.apply(void 0,[t].concat(Object(f["a"])(n)))}).filter(function(t){return null!==t}).filter(function(t){return e.includes(t.list.id)});a&&rt(r,e);var i=tt(r),s=nt(r,i,e);return{labels:i,datasets:s}},ot=J["b"].reactiveData,dt={name:"CumulativeChart",mixins:[J["a"],ot],props:{activities:{type:Array,default:null},listIds:Array,fillBackLists:Boolean,dateTypeSelector:String,dayOfWeek:String},data:function(){return{chartoptions:{responsive:!0,maintainAspectRatio:!1,chartdata:{}}}},watch:{activities:function(){this.renderData()},fillBackLists:function(){this.renderData()},dateTypeSelector:function(){this.renderData()},dayOfWeek:function(){this.renderData()}},mounted:function(){this.renderChart(this.chartdata,this.chartoptions)},methods:{renderData:function(){this.chartdata=ct(this.activities,this.listIds,this.fillBackLists,[this.dateTypeSelector,this.dayOfWeek]),this.$set(this.chartdata,"labels",this.chartdata.labels),this.renderChart(this.chartdata,this.chartoptions)}}},lt=dt,ut=Object(y["a"])(lt,it,st,!1,null,null,null);ut.options.__file="CumulativeChart.vue";var ft=ut.exports;U()().format("yyyy-MM-dd");var vt={name:"CumulativeWrapper",components:{CumulativeChart:ft,Datepicker:q["a"]},props:{cardActivities:Array,listIds:Array},mounted:function(){this.activities=this.cardActivities},data:function(){return{fillBackLists:!0,dateTypeSelector:"day",dayOfWeek:"monday",startDate:null,endDate:null,activities:[]}},watch:{cardActivities:function(){this.activities=this.cardActivities},startDate:function(){this.activities=this.filterActivitiesByDate(this.startDate,!0)},endDate:function(){this.activities=this.filterActivitiesByDate(this.endDate,!1)}},methods:{filterActivitiesByDate:function(t,e){return e?this.cardActivities.filter(function(e){return U()(e.date).isSameOrAfter(t,"day")}):this.cardActivities.filter(function(e){return U()(t).isSameOrAfter(e.date,"day")})}}},bt=vt,pt=Object(y["a"])(bt,N,P,!1,null,null,null);pt.options.__file="CumulativeWrapper.vue";var ht=pt.exports,jt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h2",[t._v("Team Speed")]),a("p",[a("b",[t._v("By Week:")]),t._v(" "+t._s(t.speed))])])},mt=[],yt={name:"TeamSpeed",props:{speed:String}},gt=yt,kt=Object(y["a"])(gt,jt,mt,!1,null,null,null);kt.options.__file="TeamSpeed.vue";var _t=kt.exports,Bt={name:"Board",components:{BoardInfo:k,TeamSpeed:_t,CumulativeWrapper:ht,vSelect:b.a},props:{board:Object},data:function(){return{listIds:["5bcf863f74837934564848c2","5bcf863f74837934564848c3","5bcf863f74837934564848c4","5bcf863f74837934564848c5","5bcf863f74837934564848c6","5bcf863f74837934564848c7","5bcf863f74837934564848c8"],lists:[],allCardsByList:{},cardsByList:{},listIncludesArchived:["5bcf863f74837934564848c8"],allCardsActivities:[],cardActivities:[],selectedLabelOptions:[],selectedCardLabels:[],endListId:"5bcf863f74837934564848c8"}},mounted:function(){this.getLists(this.$props.board.id,this.listIds),this.getBoardLabels(this.$props.board.id),this.getSelectedCards()},watch:{selectedCardLabels:function(){this.getSelectedCards(),this.getSelectedActivities()}},methods:{getSelectedCards:function(){var t=this;this.lists.forEach(function(e){t.cardsByList[e.id]=t.allCardsByList[e.id].filter(function(e){return!e.labels.map(function(t){return t.id}).some(function(e){return t.selectedCardLabels.map(function(t){return t.value}).includes(e)})})})},getSelectedActivities:function(){var t=this;this.cardActivities=this.allCardsActivities.filter(function(e){return Object.values(t.cardsByList).flat().map(function(t){return t.id}).includes(e.data.card.id)})},getLists:function(t,e){var a=this;$("boards/".concat(t,"/lists"),function(t){a.lists=t.data.filter(function(t){return e.includes(t.id)}),a.lists.forEach(function(t){return a.getAllCards(t.id,a.listIncludesArchived.includes(t.id))})},function(){M(a.getLists,[t,e])})},getAllCards:function(t,e){var a=e?"all":"open",n=this;n.$set(n.allCardsByList,t,[]),n.$set(this.cardsByList,t,[]),$("lists/".concat(t),function(e){e.data.cards.forEach(function(t){n.getAllCardsActivities(t.id)}),n.allCardsByList[t]=e.data.cards,n.cardsByList[t]=e.data.cards},function(){M(n.getAllCards,[t,e])},{cards:a})},getAllCardsActivities:function(t){var e=this;$("cards/".concat(t,"/actions"),function(t){e.allCardsActivities=e.allCardsActivities.concat(t.data),e.cardActivities=e.cardActivities.concat(t.data)},function(){M(e.getAllCardsActivities,[t])},{filter:"createCard,updateCard:idList"})},getBoardLabels:function(t){var e=this;$("boards/".concat(t,"/labels"),function(t){e.selectedLabelOptions=t.data.map(function(t){return{label:t.name,value:t.id}})},function(){M(e.getBoardLabels,[t])})},extractDate:function(t){return null!==t?t.toISOString().split("T")[0]:null},filterActivities:function(t){return this.cardActivities.filter(function(t){return"updateCard"===t.type}).filter(function(e){return e.data.listAfter.id===t}).map(function(t){return{id:t.data.card.id,date:Q(t.date,"week")}}).sort(function(t){return t.date})},weeklySpeed:function(t){return(t.length/Object(f["a"])(new Set(t.map(function(t){return t.date}))).length).toFixed(1)}}},At=Bt,Lt=(a("b2e8"),Object(y["a"])(At,l,u,!1,null,null,null));Lt.options.__file="Board.vue";var Ct=Lt.exports,St={name:"BoardList",components:{Board:Ct},data:function(){return{boards:[],boardIds:["5bcf863f74837934564848be"]}},mounted:function(){this.getBoards()},methods:{getBoards:function(){var t=this;$("members/me/boards",function(e){t.boards=e.data.filter(function(e){return t.boardIds.includes(e.id)})},function(){M(t.getBoards)})}}},Ot=St,wt=Object(y["a"])(Ot,o,d,!1,null,null,null);wt.options.__file="BoardList.vue";var Dt=wt.exports;W("79fd6886e87f06d8259e2020164c3899");var xt={name:"app",components:{BoardList:Dt}},Tt=xt,zt=(a("034f"),Object(y["a"])(Tt,s,c,!1,null,null,null));zt.options.__file="App.vue";var It=zt.exports;i.a.config(),n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(It)}}).$mount("#app")},"5f35":function(t,e,a){t.exports={baseUrl:"/trello-stats/"}},"64a9":function(t,e,a){},7470:function(t,e,a){},b2e8:function(t,e,a){"use strict";var n=a("dcc5"),r=a.n(n);r.a},d6ab:function(t,e,a){"use strict";var n=a("7470"),r=a.n(n);r.a},dcc5:function(t,e,a){}});
//# sourceMappingURL=app.3777922e.js.map