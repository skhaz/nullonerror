!function(){var p=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function S(a){function d(e){var a=e.charCodeAt(0);if(a!==92)return a;var b=e.charAt(1);return(a=q[b])?a:"0"<=b&&b<="7"?parseInt(e.substring(1),8):b==="u"||b==="x"?parseInt(e.substring(2),16):e.charCodeAt(1)}function g(e){if(e<32)return(e<16?"\\x0":"\\x")+e.toString(16);e=String.fromCharCode(e);return e==="\\"||e==="-"||e==="]"||e==="^"?"\\"+e:e}function c(e){var b=e.substring(1,e.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),e=[],a=
b[0]==="^",c=["["];a&&c.push("^");for(var a=a?1:0,f=b.length;a<f;++a){var h=b[a];if(/\\[bdsw]/i.test(h))c.push(h);else{var h=d(h),l;a+2<f&&"-"===b[a+1]?(l=d(b[a+2]),a+=2):l=h;e.push([h,l]);l<65||h>122||(l<65||h>90||e.push([Math.max(65,h)|32,Math.min(l,90)|32]),l<97||h>122||e.push([Math.max(97,h)&-33,Math.min(l,122)&-33]))}}e.sort(function(e,a){return e[0]-a[0]||a[1]-e[1]});b=[];f=[];for(a=0;a<e.length;++a)h=e[a],h[0]<=f[1]+1?f[1]=Math.max(f[1],h[1]):b.push(f=h);for(a=0;a<b.length;++a)h=b[a],c.push(g(h[0])),
h[1]>h[0]&&(h[1]+1>h[0]&&c.push("-"),c.push(g(h[1])));c.push("]");return c.join("")}function x(e){for(var a=e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),b=a.length,d=[],f=0,h=0;f<b;++f){var l=a[f];l==="("?++h:"\\"===l.charAt(0)&&(l=+l.substring(1))&&(l<=h?d[l]=-1:a[f]=g(l))}for(f=1;f<d.length;++f)-1===d[f]&&(d[f]=++u);for(h=f=0;f<b;++f)l=a[f],l==="("?(++h,d[h]||(a[f]="(?:")):"\\"===l.charAt(0)&&(l=+l.substring(1))&&l<=h&&
(a[f]="\\"+d[l]);for(f=0;f<b;++f)"^"===a[f]&&"^"!==a[f+1]&&(a[f]="");if(e.ignoreCase&&m)for(f=0;f<b;++f)l=a[f],e=l.charAt(0),l.length>=2&&e==="["?a[f]=c(l):e!=="\\"&&(a[f]=l.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var u=0,m=!1,j=!1,k=0,b=a.length;k<b;++k){var i=a[k];if(i.ignoreCase)j=!0;else if(/[a-z]/i.test(i.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){m=!0;j=!1;break}}for(var q={b:8,t:9,n:10,v:11,
f:12,r:13},n=[],k=0,b=a.length;k<b;++k){i=a[k];if(i.global||i.multiline)throw Error(""+i);n.push("(?:"+x(i)+")")}return RegExp(n.join("|"),j?"gi":"g")}function T(a,d){function g(a){var b=a.nodeType;if(b==1){if(!c.test(a.className)){for(b=a.firstChild;b;b=b.nextSibling)g(b);b=a.nodeName.toLowerCase();if("br"===b||"li"===b)x[j]="\n",m[j<<1]=u++,m[j++<<1|1]=a}}else if(b==3||b==4)b=a.nodeValue,b.length&&(b=d?b.replace(/\r\n?/g,"\n"):b.replace(/[\t\n\r ]+/g," "),x[j]=b,m[j<<1]=u,u+=b.length,m[j++<<1|1]=
a)}var c=/(?:^|\s)nocode(?:\s|$)/,x=[],u=0,m=[],j=0;g(a);return{a:x.join("").replace(/\n$/,""),d:m}}function H(a,d,g,c){d&&(a={a:d,e:a},g(a),c.push.apply(c,a.g))}function U(a){for(var d=void 0,g=a.firstChild;g;g=g.nextSibling)var c=g.nodeType,d=c===1?d?a:g:c===3?V.test(g.nodeValue)?a:d:d;return d===a?void 0:d}function C(a,d){function g(a){for(var j=a.e,k=[j,"pln"],b=0,i=a.a.match(x)||[],q={},n=0,e=i.length;n<e;++n){var z=i[n],w=q[z],s=void 0,f;if(typeof w==="string")f=!1;else{var h=c[z.charAt(0)];
if(h)s=z.match(h[1]),w=h[0];else{for(f=0;f<u;++f)if(h=d[f],s=z.match(h[1])){w=h[0];break}s||(w="pln")}if((f=w.length>=5&&"lang-"===w.substring(0,5))&&!(s&&typeof s[1]==="string"))f=!1,w="src";f||(q[z]=w)}h=b;b+=z.length;if(f){f=s[1];var l=z.indexOf(f),B=l+f.length;s[2]&&(B=z.length-s[2].length,l=B-f.length);w=w.substring(5);H(j+h,z.substring(0,l),g,k);H(j+h+l,f,I(w,f),k);H(j+h+B,z.substring(B),g,k)}else k.push(j+h,w)}a.g=k}var c={},x;(function(){for(var g=a.concat(d),j=[],k={},b=0,i=g.length;b<i;++b){var q=
g[b],n=q[3];if(n)for(var e=n.length;--e>=0;)c[n.charAt(e)]=q;q=q[1];n=""+q;k.hasOwnProperty(n)||(j.push(q),k[n]=p)}j.push(/[\S\s]/);x=S(j)})();var u=d.length;return g}function v(a){var d=[],g=[];a.tripleQuotedStrings?d.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,p,"'\""]):a.multiLineStrings?d.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
p,"'\"`"]):d.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,p,"\"'"]);a.verbatimStrings&&g.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,p]);var c=a.hashComments;c&&(a.cStyleComments?(c>1?d.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,p,"#"]):d.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/,p,"#"]),g.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,p])):d.push(["com",
/^#[^\n\r]*/,p,"#"]));a.cStyleComments&&(g.push(["com",/^\/\/[^\n\r]*/,p]),g.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,p]));a.regexLiterals&&g.push(["lang-regex",/^(?:^^\.?|[+-]|[!=]={0,2}|#|%=?|&&?=?|\(|\*=?|[+-]=|->|\/=?|::?|<<?=?|>{1,3}=?|[,;?@[{~]|\^\^?=?|\|\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);(c=a.types)&&g.push(["typ",c]);c=(""+a.keywords).replace(/^ | $/g,"");c.length&&g.push(["kwd",
RegExp("^(?:"+c.replace(/[\s,]+/g,"|")+")\\b"),p]);d.push(["pln",/^\s+/,p," \r\n\t\u00a0"]);c="^.[^\\s\\w.$@'\"`/\\\\]*";a.regexLiterals&&(c+="(?!s*/)");g.push(["lit",/^@[$_a-z][\w$@]*/i,p],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,p],["pln",/^[$_a-z][\w$@]*/i,p],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,p,"0123456789"],["pln",/^\\[\S\s]?/,p],["pun",RegExp(c),p]);return C(d,g)}function J(a,d,g){function c(a){var b=a.nodeType;if(b==1&&!u.test(a.className))if("br"===
a.nodeName)x(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)c(a);else if((b==3||b==4)&&g){var d=a.nodeValue,i=d.match(m);if(i)b=d.substring(0,i.index),a.nodeValue=b,(d=d.substring(i.index+i[0].length))&&a.parentNode.insertBefore(j.createTextNode(d),a.nextSibling),x(a),b||a.parentNode.removeChild(a)}}function x(a){function c(a,b){var d=b?a.cloneNode(!1):a,e=a.parentNode;if(e){var e=c(e,1),g=a.nextSibling;e.appendChild(d);for(var i=g;i;i=g)g=i.nextSibling,e.appendChild(i)}return d}
for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=c(a.nextSibling,0),d;(d=a.parentNode)&&d.nodeType===1;)a=d;b.push(a)}for(var u=/(?:^|\s)nocode(?:\s|$)/,m=/\r\n?|\n/,j=a.ownerDocument,k=j.createElement("li");a.firstChild;)k.appendChild(a.firstChild);for(var b=[k],i=0;i<b.length;++i)c(b[i]);d===(d|0)&&b[0].setAttribute("value",d);var q=j.createElement("ol");q.className="linenums";for(var d=Math.max(0,d-1|0)||0,i=0,n=b.length;i<n;++i)k=b[i],k.className="L"+(i+d)%10,k.firstChild||k.appendChild(j.createTextNode("\u00a0")),
q.appendChild(k);a.appendChild(q)}function r(a,d){for(var g=d.length;--g>=0;){var c=d[g];F.hasOwnProperty(c)?D.console&&console.warn("cannot override language handler %s",c):F[c]=a}}function I(a,d){if(!a||!F.hasOwnProperty(a))a=/^\s*</.test(d)?"default-markup":"default-code";return F[a]}function K(a){var d=a.h;try{var g=T(a.c,a.i),c=g.a;a.a=c;a.d=g.d;a.e=0;I(d,c)(a);var x=/\bMSIE\s(\d+)/.exec(navigator.userAgent),x=x&&+x[1]<=8,d=/\n/g,u=a.a,m=u.length,g=0,j=a.d,k=j.length,c=0,b=a.g,i=b.length,q=0;
b[i]=m;var n,e;for(e=n=0;e<i;)b[e]!==b[e+2]?(b[n++]=b[e++],b[n++]=b[e++]):e+=2;i=n;for(e=n=0;e<i;){for(var r=b[e],w=b[e+1],s=e+2;s+2<=i&&b[s+1]===w;)s+=2;b[n++]=r;b[n++]=w;e=s}b.length=n;var f=a.c,h;if(f)h=f.style.display,f.style.display="none";try{for(;c<k;){var l=j[c+2]||m,B=b[q+2]||m,s=Math.min(l,B),A=j[c+1],G;if(A.nodeType!==1&&(G=u.substring(g,s))){x&&(G=G.replace(d,"\r"));A.nodeValue=G;var L=A.ownerDocument,o=L.createElement("span");o.className=b[q+1];var v=A.parentNode;v.replaceChild(o,A);
o.appendChild(A);g<l&&(j[c+1]=A=L.createTextNode(u.substring(s,l)),v.insertBefore(A,o.nextSibling))}g=s;g>=l&&(c+=2);g>=B&&(q+=2)}}finally{if(f)f.style.display=h}}catch(t){D.console&&console.log(t&&t.stack||t)}}var D=window,y=["break,continue,do,else,for,if,return,while"],E=[[y,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],
M=[E,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],N=[E,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],O=[N,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],
E=[E,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],P=[y,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],Q=[y,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],W=[y,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],
y=[y,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],R=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,V=/\S/,X=v({keywords:[M,O,E,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",P,Q,y],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),F={};r(X,["default-code"]);r(C([],
[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);r(C([["pln",/^\s+/,p," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,
p,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);r(C([],[["atv",/^[\S\s]+/]]),["uq.val"]);r(v({keywords:M,hashComments:!0,
cStyleComments:!0,types:R}),["c","cc","cpp","cxx","cyc","m"]);r(v({keywords:"null,true,false"}),["json"]);r(v({keywords:O,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:R}),["cs"]);r(v({keywords:N,cStyleComments:!0}),["java"]);r(v({keywords:y,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]);r(v({keywords:P,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]);r(v({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]);r(v({keywords:Q,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]);r(v({keywords:E,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]);r(v({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),
["coffee"]);r(v({keywords:W,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]);r(C([],[["str",/^[\S\s]+/]]),["regex"]);var Y=D.PR={createSimpleLexer:C,registerLangHandler:r,sourceDecorator:v,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:D.prettyPrintOne=function(a,d,g){var c=document.createElement("div");
c.innerHTML="<pre>"+a+"</pre>";c=c.firstChild;g&&J(c,g,!0);K({h:d,j:g,c:c,i:1});return c.innerHTML},prettyPrint:D.prettyPrint=function(a,d){function g(){for(var d=D.PR_SHOULD_USE_CONTINUATION?b.now()+250:Infinity;i<u.length&&b.now()<d;i++){for(var c=u[i],j=h,k=c;k=k.previousSibling;){var m=k.nodeType,o=(m===7||m===8)&&k.nodeValue;if(o?!/^\??prettify\b/.test(o):m!==3||/\S/.test(k.nodeValue))break;if(o){j={};o.replace(/\b(\w+)=([\w%+\-.:]+)/g,function(a,b,c){j[b]=c});break}}k=c.className;if((j!==h||
e.test(k))&&!v.test(k)){m=!1;for(o=c.parentNode;o;o=o.parentNode)if(f.test(o.tagName)&&o.className&&e.test(o.className)){m=!0;break}if(!m){c.className+=" prettyprinted";m=j.lang;if(!m){var m=k.match(n),y;if(!m&&(y=U(c))&&s.test(y.tagName))m=y.className.match(n);m&&(m=m[1])}if(w.test(c.tagName))o=1;else var o=c.currentStyle,t=r.defaultView,o=(o=o?o.whiteSpace:t&&t.getComputedStyle?t.getComputedStyle(c,p).getPropertyValue("white-space"):0)&&"pre"===o.substring(0,3);t=j.linenums;if(!(t=t==="true"||+t))t=
(t=k.match(/\blinenums\b(?::(\d+))?/))?t[1]&&t[1].length?+t[1]:!0:!1;t&&J(c,t,o);q={h:m,c:c,j:t,i:o};K(q)}}}i<u.length?setTimeout(g,250):"function"===typeof a&&a()}for(var c=d||document.body,r=c.ownerDocument||document,c=[c.getElementsByTagName("pre"),c.getElementsByTagName("code"),c.getElementsByTagName("xmp")],u=[],m=0;m<c.length;++m)for(var j=0,k=c[m].length;j<k;++j)u.push(c[m][j]);var c=p,b=Date;b.now||(b={now:function(){return+new Date}});var i=0,q,n=/\blang(?:uage)?-([\w.]+)(?!\S)/,e=/\bprettyprint\b/,
v=/\bprettyprinted\b/,w=/pre|xmp/i,s=/^code$/i,f=/^(?:pre|code|xmp)$/i,h={};g()}};typeof define==="function"&&define.amd&&define("google-code-prettify",[],function(){return Y})})();}()
