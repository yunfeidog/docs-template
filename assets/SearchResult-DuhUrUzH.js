import{u as _,f as ae,g as se,h as U,i as te,P as le,t as re,j as ue,k as x,l as H,m as oe,n as Y,p as s,q as Ee,R as I,s as ie,v as ce,x as ne,C as ve,y as de,z as Be,A as he,B as Ae,D as pe,E as ye,F as me,G as O,H as T,I as ge,J as R,K as Fe}from"./app-CKRV3Rln.js";const fe=["/","/autodir/","/blog/","/docs/","/resources/","/autodir/usereadme/","/autodir/%E7%9B%AE%E5%BD%951/%E7%9B%AE%E5%BD%951.html","/docs/algdata/","/docs/javacore/Java8%E6%96%B0%E7%89%B9%E6%80%A7.html","/docs/javacore/Java%E4%B8%AD%E7%9A%84SPI%E6%9C%BA%E5%88%B6.html","/docs/javacore/Java%E5%9F%BA%E7%A1%80-%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6.html","/docs/javacore/Java%E5%9F%BA%E7%A1%80-%E5%BC%82%E5%B8%B8%E6%9C%BA%E5%88%B6.html","/docs/javacore/Java%E5%9F%BA%E7%A1%80-%E6%B3%9B%E5%9E%8B%E6%9C%BA%E5%88%B6.html","/docs/javacore/Java%E5%9F%BA%E7%A1%80-%E6%B3%A8%E8%A7%A3%E6%9C%BA%E5%88%B6.html","/docs/javacore/Java%E5%9F%BA%E7%A1%80-%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1.html","/docs/javacore/Java%E9%9B%86%E5%90%88-ArrayList.html","/docs/javacore/Java%E9%9B%86%E5%90%88-%E7%B1%BB%E5%85%B3%E7%B3%BB%E5%9B%BE.html","/docs/javacore/","/resources/books/","/resources/videos/","/docs/algdata/lbld/","/docs/algdata/lbld/%E7%AE%97%E6%B3%95%E5%B0%8F%E6%8A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92.html","/docs/algdata/lbld/%E7%AE%97%E6%B3%95%E5%B0%8F%E6%8A%84%E6%95%B0%E5%AD%A6%E8%BF%90%E7%AE%97.html","/docs/algdata/lbld/%E7%AE%97%E6%B3%95%E5%B0%8F%E6%8A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.html","/docs/algdata/lbld/%E7%AE%97%E6%B3%95%E5%B0%8F%E6%8A%84%E6%A0%B8%E5%BF%83%E5%A5%97%E8%B7%AF.html","/docs/algdata/lbld/%E7%AE%97%E6%B3%95%E5%B0%8F%E6%8A%84%E7%AE%97%E6%B3%95%E6%80%9D%E7%BB%B4.html","/docs/algdata/lbld/%E7%AE%97%E6%B3%95%E5%B0%8F%E6%8A%84%E9%AB%98%E9%A2%91%E9%9D%A2%E8%AF%95.html","/404.html","/autodir/%E7%9B%AE%E5%BD%951/","/category/","/category/%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1/","/category/%E5%AE%9E%E6%88%98%E9%A1%B9%E7%9B%AE/","/category/java/","/category/%E4%B9%A6%E7%B1%8D/","/category/%E5%BD%B1%E8%A7%86/","/category/%E9%9F%B3%E4%B9%90/","/category/%E7%AE%97%E6%B3%95/","/category/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/","/tag/","/tag/%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1/","/tag/%E5%AE%9E%E6%88%98%E9%A1%B9%E7%9B%AE/","/tag/java/","/tag/%E4%B9%A6%E7%B1%8D/","/tag/%E5%BD%B1%E8%A7%86/","/tag/%E9%9F%B3%E4%B9%90/","/tag/%E7%AE%97%E6%B3%95/","/tag/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/","/article/","/star/","/timeline/"],De="SEARCH_PRO_QUERY_HISTORY",p=_(De,[]),He=()=>{const{queryHistoryCount:t}=R,l=t>0;return{enabled:l,queryHistory:p,addQueryHistory:r=>{l&&(p.value=Array.from(new Set([r,...p.value.slice(0,t-1)])))},removeQueryHistory:r=>{p.value=[...p.value.slice(0,r),...p.value.slice(r+1)]}}},S=t=>fe[t.id]+("anchor"in t?`#${t.anchor}`:""),Re="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:$}=R,y=_(Re,[]),ke=()=>{const t=$>0;return{enabled:t,resultHistory:y,addResultHistory:l=>{if(t){const r={link:S(l),display:l.display};"header"in l&&(r.header=l.header),y.value=[r,...y.value.slice(0,$-1)]}},removeResultHistory:l=>{y.value=[...y.value.slice(0,l),...y.value.slice(l+1)]}}},Ce=t=>{const l=ve(),r=U(),k=de(),o=x(0),F=H(()=>o.value>0),B=Be([]);return he(()=>{const{search:h,terminate:C}=Ae(),m=ge(c=>{const g=c.join(" "),{searchFilter:b=d=>d,splitWord:j,suggestionsFilter:L,...A}=l.value;g?(o.value+=1,h(c.join(" "),r.value,A).then(d=>b(d,g,r.value,k.value)).then(d=>{o.value-=1,B.value=d}).catch(d=>{console.warn(d),o.value-=1,o.value||(B.value=[])})):B.value=[]},R.searchDelay-R.suggestDelay);Y([t,r],([c])=>m(c),{immediate:!0}),pe(()=>{C()})}),{isSearching:F,results:B}};var je=ae({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(t,{emit:l}){const r=se(),k=U(),o=te(le),{enabled:F,addQueryHistory:B,queryHistory:h,removeQueryHistory:C}=He(),{enabled:m,resultHistory:c,addResultHistory:g,removeResultHistory:b}=ke(),j=F||m,L=re(t,"queries"),{results:A,isSearching:d}=Ce(L),u=ue({isQuery:!0,index:0}),n=x(0),v=x(0),J=H(()=>j&&(h.value.length>0||c.value.length>0)),Q=H(()=>A.value.length>0),w=H(()=>A.value[n.value]||null),M=()=>{const{isQuery:e,index:a}=u;a===0?(u.isQuery=!e,u.index=e?c.value.length-1:h.value.length-1):u.index=a-1},z=()=>{const{isQuery:e,index:a}=u;a===(e?h.value.length-1:c.value.length-1)?(u.isQuery=!e,u.index=0):u.index=a+1},G=()=>{n.value=n.value>0?n.value-1:A.value.length-1,v.value=w.value.contents.length-1},K=()=>{n.value=n.value<A.value.length-1?n.value+1:0,v.value=0},V=()=>{v.value<w.value.contents.length-1?v.value+=1:K()},N=()=>{v.value>0?v.value-=1:G()},q=e=>e.map(a=>Fe(a)?a:s(a[0],a[1])),W=e=>{if(e.type==="customField"){const a=ye[e.index]||"$content",[E,D=""]=me(a)?a[k.value].split("$content"):a.split("$content");return e.display.map(i=>s("div",q([E,...i,D])))}return e.display.map(a=>s("div",q(a)))},f=()=>{n.value=0,v.value=0,l("updateQuery",""),l("close")},X=()=>F?s("ul",{class:"search-pro-result-list"},s("li",{class:"search-pro-result-list-item"},[s("div",{class:"search-pro-result-title"},o.value.queryHistory),h.value.map((e,a)=>s("div",{class:["search-pro-result-item",{active:u.isQuery&&u.index===a}],onClick:()=>{l("updateQuery",e)}},[s(O,{class:"search-pro-result-type"}),s("div",{class:"search-pro-result-content"},e),s("button",{class:"search-pro-remove-icon",innerHTML:T,onClick:E=>{E.preventDefault(),E.stopPropagation(),C(a)}})]))])):null,Z=()=>m?s("ul",{class:"search-pro-result-list"},s("li",{class:"search-pro-result-list-item"},[s("div",{class:"search-pro-result-title"},o.value.resultHistory),c.value.map((e,a)=>s(I,{to:e.link,class:["search-pro-result-item",{active:!u.isQuery&&u.index===a}],onClick:()=>{f()}},()=>[s(O,{class:"search-pro-result-type"}),s("div",{class:"search-pro-result-content"},[e.header?s("div",{class:"content-header"},e.header):null,s("div",e.display.map(E=>q(E)).flat())]),s("button",{class:"search-pro-remove-icon",innerHTML:T,onClick:E=>{E.preventDefault(),E.stopPropagation(),b(a)}})]))])):null;return oe("keydown",e=>{if(t.isFocusing){if(Q.value){if(e.key==="ArrowUp")N();else if(e.key==="ArrowDown")V();else if(e.key==="Enter"){const a=w.value.contents[v.value];B(t.queries.join(" ")),g(a),r.push(S(a)),f()}}else if(m){if(e.key==="ArrowUp")M();else if(e.key==="ArrowDown")z();else if(e.key==="Enter"){const{index:a}=u;u.isQuery?(l("updateQuery",h.value[a]),e.preventDefault()):(r.push(c.value[a].link),f())}}}}),Y([n,v],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>s("div",{class:["search-pro-result-wrapper",{empty:t.queries.length?!Q.value:!J.value}],id:"search-pro-results"},t.queries.length?d.value?s(Ee,{hint:o.value.searching}):Q.value?s("ul",{class:"search-pro-result-list"},A.value.map(({title:e,contents:a},E)=>{const D=n.value===E;return s("li",{class:["search-pro-result-list-item",{active:D}]},[s("div",{class:"search-pro-result-title"},e||o.value.defaultTitle),a.map((i,ee)=>{const P=D&&v.value===ee;return s(I,{to:S(i),class:["search-pro-result-item",{active:P,"aria-selected":P}],onClick:()=>{B(t.queries.join(" ")),g(i),f()}},()=>[i.type==="text"?null:s(i.type==="title"?ie:i.type==="heading"?ce:ne,{class:"search-pro-result-type"}),s("div",{class:"search-pro-result-content"},[i.type==="text"&&i.header?s("div",{class:"content-header"},i.header):null,s("div",W(i))])])})])})):o.value.emptyResult:j?J.value?[X(),Z()]:o.value.emptyHistory:o.value.emptyResult)}});export{je as default};