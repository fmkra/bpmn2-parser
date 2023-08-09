var Te=Object.create;var M=Object.defineProperty;var ye=Object.getOwnPropertyDescriptor;var we=Object.getOwnPropertyNames;var Ae=Object.getPrototypeOf,Pe=Object.prototype.hasOwnProperty;var N=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ie=(e,t,s,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of we(t))!Pe.call(e,r)&&r!==s&&M(e,r,{get:()=>t[r],enumerable:!(i=ye(t,r))||i.enumerable});return e};var xe=(e,t,s)=>(s=e!=null?Te(Ae(e)):{},Ie(t||!e||!e.__esModule?M(s,"default",{value:e,enumerable:!0}):s,e));var x=N(E=>{"use strict";var k=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",Ce=k+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",R="["+k+"]["+Ce+"]*",Oe=new RegExp("^"+R+"$"),ve=function(e,t){let s=[],i=t.exec(e);for(;i;){let r=[];r.startIndex=t.lastIndex-i[0].length;let n=i.length;for(let f=0;f<n;f++)r.push(i[f]);s.push(r),i=t.exec(e)}return s},Ve=function(e){let t=Oe.exec(e);return!(t===null||typeof t>"u")};E.isExist=function(e){return typeof e<"u"};E.isEmptyObject=function(e){return Object.keys(e).length===0};E.merge=function(e,t,s){if(t){let i=Object.keys(t),r=i.length;for(let n=0;n<r;n++)s==="strict"?e[i[n]]=[t[i[n]]]:e[i[n]]=t[i[n]]}};E.getValue=function(e){return E.isExist(e)?e:""};E.isName=Ve;E.getAllMatches=ve;E.nameRegexp=R});var v=N(U=>{"use strict";var O=x(),_e={allowBooleanAttributes:!1,unpairedTags:[]};U.validate=function(e,t){t=Object.assign({},_e,t);let s=[],i=!1,r=!1;e[0]==="\uFEFF"&&(e=e.substr(1));for(let n=0;n<e.length;n++)if(e[n]==="<"&&e[n+1]==="?"){if(n+=2,n=X(e,n),n.err)return n}else if(e[n]==="<"){let f=n;if(n++,e[n]==="!"){n=G(e,n);continue}else{let u=!1;e[n]==="/"&&(u=!0,n++);let o="";for(;n<e.length&&e[n]!==">"&&e[n]!==" "&&e[n]!=="	"&&e[n]!=="\n"&&e[n]!=="\r";n++)o+=e[n];if(o=o.trim(),o[o.length-1]==="/"&&(o=o.substring(0,o.length-1),n--),!Re(o)){let c;return o.trim().length===0?c="Invalid space after '<'.":c="Tag '"+o+"' is an invalid name.",g("InvalidTag",c,h(e,n))}let a=Fe(e,n);if(a===!1)return g("InvalidAttr","Attributes for '"+o+"' have open quote.",h(e,n));let l=a.value;if(n=a.index,l[l.length-1]==="/"){let c=n-l.length;l=l.substring(0,l.length-1);let p=Z(l,t);if(p===!0)i=!0;else return g(p.err.code,p.err.msg,h(e,c+p.err.line))}else if(u)if(a.tagClosed){if(l.trim().length>0)return g("InvalidTag","Closing tag '"+o+"' can't have attributes or invalid starting.",h(e,f));{let c=s.pop();if(o!==c.tagName){let p=h(e,c.tagStartPos);return g("InvalidTag","Expected closing tag '"+c.tagName+"' (opened in line "+p.line+", col "+p.col+") instead of closing tag '"+o+"'.",h(e,f))}s.length==0&&(r=!0)}}else return g("InvalidTag","Closing tag '"+o+"' doesn't have proper closing.",h(e,n));else{let c=Z(l,t);if(c!==!0)return g(c.err.code,c.err.msg,h(e,n-l.length+c.err.line));if(r===!0)return g("InvalidXml","Multiple possible root nodes found.",h(e,n));t.unpairedTags.indexOf(o)!==-1||s.push({tagName:o,tagStartPos:f}),i=!0}for(n++;n<e.length;n++)if(e[n]==="<")if(e[n+1]==="!"){n++,n=G(e,n);continue}else if(e[n+1]==="?"){if(n=X(e,++n),n.err)return n}else break;else if(e[n]==="&"){let c=Me(e,n);if(c==-1)return g("InvalidChar","char '&' is not expected.",h(e,n));n=c}else if(r===!0&&!q(e[n]))return g("InvalidXml","Extra text at the end",h(e,n));e[n]==="<"&&n--}}else{if(q(e[n]))continue;return g("InvalidChar","char '"+e[n]+"' is not expected.",h(e,n))}if(i){if(s.length==1)return g("InvalidTag","Unclosed tag '"+s[0].tagName+"'.",h(e,s[0].tagStartPos));if(s.length>0)return g("InvalidXml","Invalid '"+JSON.stringify(s.map(n=>n.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1})}else return g("InvalidXml","Start tag expected.",1);return!0};function q(e){return e===" "||e==="	"||e==="\n"||e==="\r"}function X(e,t){let s=t;for(;t<e.length;t++)if(e[t]=="?"||e[t]==" "){let i=e.substr(s,t-s);if(t>5&&i==="xml")return g("InvalidXml","XML declaration allowed only at the start of the document.",h(e,t));if(e[t]=="?"&&e[t+1]==">"){t++;break}else continue}return t}function G(e,t){if(e.length>t+5&&e[t+1]==="-"&&e[t+2]==="-"){for(t+=3;t<e.length;t++)if(e[t]==="-"&&e[t+1]==="-"&&e[t+2]===">"){t+=2;break}}else if(e.length>t+8&&e[t+1]==="D"&&e[t+2]==="O"&&e[t+3]==="C"&&e[t+4]==="T"&&e[t+5]==="Y"&&e[t+6]==="P"&&e[t+7]==="E"){let s=1;for(t+=8;t<e.length;t++)if(e[t]==="<")s++;else if(e[t]===">"&&(s--,s===0))break}else if(e.length>t+9&&e[t+1]==="["&&e[t+2]==="C"&&e[t+3]==="D"&&e[t+4]==="A"&&e[t+5]==="T"&&e[t+6]==="A"&&e[t+7]==="["){for(t+=8;t<e.length;t++)if(e[t]==="]"&&e[t+1]==="]"&&e[t+2]===">"){t+=2;break}}return t}var $e='"',Se="'";function Fe(e,t){let s="",i="",r=!1;for(;t<e.length;t++){if(e[t]===$e||e[t]===Se)i===""?i=e[t]:i!==e[t]||(i="");else if(e[t]===">"&&i===""){r=!0;break}s+=e[t]}return i!==""?!1:{value:s,index:t,tagClosed:r}}var Be=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function Z(e,t){let s=O.getAllMatches(e,Be),i={};for(let r=0;r<s.length;r++){if(s[r][1].length===0)return g("InvalidAttr","Attribute '"+s[r][2]+"' has no space in starting.",A(s[r]));if(s[r][3]!==void 0&&s[r][4]===void 0)return g("InvalidAttr","Attribute '"+s[r][2]+"' is without value.",A(s[r]));if(s[r][3]===void 0&&!t.allowBooleanAttributes)return g("InvalidAttr","boolean attribute '"+s[r][2]+"' is not allowed.",A(s[r]));let n=s[r][2];if(!ke(n))return g("InvalidAttr","Attribute '"+n+"' is an invalid name.",A(s[r]));if(!i.hasOwnProperty(n))i[n]=1;else return g("InvalidAttr","Attribute '"+n+"' is repeated.",A(s[r]))}return!0}function Le(e,t){let s=/\d/;for(e[t]==="x"&&(t++,s=/[\da-fA-F]/);t<e.length;t++){if(e[t]===";")return t;if(!e[t].match(s))break}return-1}function Me(e,t){if(t++,e[t]===";")return-1;if(e[t]==="#")return t++,Le(e,t);let s=0;for(;t<e.length;t++,s++)if(!(e[t].match(/\w/)&&s<20)){if(e[t]===";")break;return-1}return t}function g(e,t,s){return{err:{code:e,msg:t,line:s.line||s,col:s.col}}}function ke(e){return O.isName(e)}function Re(e){return O.isName(e)}function h(e,t){let s=e.substring(0,t).split(/\r?\n/);return{line:s.length,col:s[s.length-1].length+1}}function A(e){return e.startIndex+e[1].length}});var J=N(V=>{var Y={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(e,t,s){return e}},qe=function(e){return Object.assign({},Y,e)};V.buildOptions=qe;V.defaultOptions=Y});var K=N((qt,W)=>{"use strict";var _=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,s){t==="__proto__"&&(t="#__proto__"),this.child.push({[t]:s})}addChild(t){t.tagname==="__proto__"&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}};W.exports=_});var z=N((Xt,Q)=>{var Xe=x();function Ge(e,t){let s={};if(e[t+3]==="O"&&e[t+4]==="C"&&e[t+5]==="T"&&e[t+6]==="Y"&&e[t+7]==="P"&&e[t+8]==="E"){t=t+9;let i=1,r=!1,n=!1,f="";for(;t<e.length;t++)if(e[t]==="<"&&!n){if(r&&Ye(e,t))t+=7,[entityName,val,t]=Ze(e,t+1),val.indexOf("&")===-1&&(s[Qe(entityName)]={regx:RegExp("&".concat(entityName,";"),"g"),val});else if(r&&Je(e,t))t+=8;else if(r&&We(e,t))t+=8;else if(r&&Ke(e,t))t+=9;else if(Ue)n=!0;else throw new Error("Invalid DOCTYPE");i++,f=""}else if(e[t]===">"){if(n?e[t-1]==="-"&&e[t-2]==="-"&&(n=!1,i--):i--,i===0)break}else e[t]==="["?r=!0:f+=e[t];if(i!==0)throw new Error("Unclosed DOCTYPE")}else throw new Error("Invalid Tag instead of DOCTYPE");return{entities:s,i:t}}function Ze(e,t){let s="";for(;t<e.length&&e[t]!=="'"&&e[t]!=='"';t++)s+=e[t];if(s=s.trim(),s.indexOf(" ")!==-1)throw new Error("External entites are not supported");let i=e[t++],r="";for(;t<e.length&&e[t]!==i;t++)r+=e[t];return[s,r,t]}function Ue(e,t){return e[t+1]==="!"&&e[t+2]==="-"&&e[t+3]==="-"}function Ye(e,t){return e[t+1]==="!"&&e[t+2]==="E"&&e[t+3]==="N"&&e[t+4]==="T"&&e[t+5]==="I"&&e[t+6]==="T"&&e[t+7]==="Y"}function Je(e,t){return e[t+1]==="!"&&e[t+2]==="E"&&e[t+3]==="L"&&e[t+4]==="E"&&e[t+5]==="M"&&e[t+6]==="E"&&e[t+7]==="N"&&e[t+8]==="T"}function We(e,t){return e[t+1]==="!"&&e[t+2]==="A"&&e[t+3]==="T"&&e[t+4]==="T"&&e[t+5]==="L"&&e[t+6]==="I"&&e[t+7]==="S"&&e[t+8]==="T"}function Ke(e,t){return e[t+1]==="!"&&e[t+2]==="N"&&e[t+3]==="O"&&e[t+4]==="T"&&e[t+5]==="A"&&e[t+6]==="T"&&e[t+7]==="I"&&e[t+8]==="O"&&e[t+9]==="N"}function Qe(e){if(Xe.isName(e))return e;throw new Error("Invalid entity name ".concat(e))}Q.exports=Ge});var j=N((Gt,H)=>{var ze=/^[-+]?0x[a-fA-F0-9]+$/,He=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt);!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);var je={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};function De(e,t={}){if(t=Object.assign({},je,t),!e||typeof e!="string")return e;let s=e.trim();if(t.skipLike!==void 0&&t.skipLike.test(s))return e;if(t.hex&&ze.test(s))return Number.parseInt(s,16);{let i=He.exec(s);if(i){let r=i[1],n=i[2],f=et(i[3]),u=i[4]||i[6];if(!t.leadingZeros&&n.length>0&&r&&s[2]!==".")return e;if(!t.leadingZeros&&n.length>0&&!r&&s[1]!==".")return e;{let o=Number(s),a=""+o;return a.search(/[eE]/)!==-1||u?t.eNotation?o:e:s.indexOf(".")!==-1?a==="0"&&f===""||a===f||r&&a==="-"+f?o:e:n?f===a||r+f===a?o:e:s===a||s===r+a?o:e}}else return e}}function et(e){return e&&e.indexOf(".")!==-1&&(e=e.replace(/0+$/,""),e==="."?e="0":e[0]==="."?e="0"+e:e[e.length-1]==="."&&(e=e.substr(0,e.length-1))),e}H.exports=De});var ee=N((Ut,D)=>{"use strict";var B=x(),P=K(),tt=z(),st=j(),Zt="<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,B.nameRegexp),$=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"\xA2"},pound:{regex:/&(pound|#163);/g,val:"\xA3"},yen:{regex:/&(yen|#165);/g,val:"\xA5"},euro:{regex:/&(euro|#8364);/g,val:"\u20AC"},copyright:{regex:/&(copy|#169);/g,val:"\xA9"},reg:{regex:/&(reg|#174);/g,val:"\xAE"},inr:{regex:/&(inr|#8377);/g,val:"\u20B9"}},this.addExternalEntities=nt,this.parseXml=ft,this.parseTextData=rt,this.resolveNameSpace=it,this.buildAttributesMap=ut,this.isItStopNode=dt,this.replaceEntitiesValue=lt,this.readStopNodeData=pt,this.saveTextToParentTag=ct,this.addChild=at}};function nt(e){let t=Object.keys(e);for(let s=0;s<t.length;s++){let i=t[s];this.lastEntities[i]={regex:new RegExp("&"+i+";","g"),val:e[i]}}}function rt(e,t,s,i,r,n,f){if(e!==void 0&&(this.options.trimValues&&!i&&(e=e.trim()),e.length>0)){f||(e=this.replaceEntitiesValue(e));let u=this.options.tagValueProcessor(t,e,s,r,n);return u==null?e:typeof u!=typeof e||u!==e?u:this.options.trimValues?F(e,this.options.parseTagValue,this.options.numberParseOptions):e.trim()===e?F(e,this.options.parseTagValue,this.options.numberParseOptions):e}}function it(e){if(this.options.removeNSPrefix){let t=e.split(":"),s=e.charAt(0)==="/"?"/":"";if(t[0]==="xmlns")return"";t.length===2&&(e=s+t[1])}return e}var ot=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function ut(e,t,s){if(!this.options.ignoreAttributes&&typeof e=="string"){let i=B.getAllMatches(e,ot),r=i.length,n={};for(let f=0;f<r;f++){let u=this.resolveNameSpace(i[f][1]),o=i[f][4],a=this.options.attributeNamePrefix+u;if(u.length)if(this.options.transformAttributeName&&(a=this.options.transformAttributeName(a)),a==="__proto__"&&(a="#__proto__"),o!==void 0){this.options.trimValues&&(o=o.trim()),o=this.replaceEntitiesValue(o);let l=this.options.attributeValueProcessor(u,o,t);l==null?n[a]=o:typeof l!=typeof o||l!==o?n[a]=l:n[a]=F(o,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(n[a]=!0)}if(!Object.keys(n).length)return;if(this.options.attributesGroupName){let f={};return f[this.options.attributesGroupName]=n,f}return n}}var ft=function(e){e=e.replace(/\r\n?/g,"\n");let t=new P("!xml"),s=t,i="",r="";for(let n=0;n<e.length;n++)if(e[n]==="<")if(e[n+1]==="/"){let u=T(e,">",n,"Closing Tag is not closed."),o=e.substring(n+2,u).trim();if(this.options.removeNSPrefix){let c=o.indexOf(":");c!==-1&&(o=o.substr(c+1))}this.options.transformTagName&&(o=this.options.transformTagName(o)),s&&(i=this.saveTextToParentTag(i,s,r));let a=r.substring(r.lastIndexOf(".")+1);if(o&&this.options.unpairedTags.indexOf(o)!==-1)throw new Error("Unpaired tag can not be used as closing tag: </".concat(o,">"));let l=0;a&&this.options.unpairedTags.indexOf(a)!==-1?(l=r.lastIndexOf(".",r.lastIndexOf(".")-1),this.tagsNodeStack.pop()):l=r.lastIndexOf("."),r=r.substring(0,l),s=this.tagsNodeStack.pop(),i="",n=u}else if(e[n+1]==="?"){let u=S(e,n,!1,"?>");if(!u)throw new Error("Pi Tag is not closed.");if(i=this.saveTextToParentTag(i,s,r),!(this.options.ignoreDeclaration&&u.tagName==="?xml"||this.options.ignorePiTags)){let o=new P(u.tagName);o.add(this.options.textNodeName,""),u.tagName!==u.tagExp&&u.attrExpPresent&&(o[":@"]=this.buildAttributesMap(u.tagExp,r,u.tagName)),this.addChild(s,o,r)}n=u.closeIndex+1}else if(e.substr(n+1,3)==="!--"){let u=T(e,"-->",n+4,"Comment is not closed.");if(this.options.commentPropName){let o=e.substring(n+4,u-2);i=this.saveTextToParentTag(i,s,r),s.add(this.options.commentPropName,[{[this.options.textNodeName]:o}])}n=u}else if(e.substr(n+1,2)==="!D"){let u=tt(e,n);this.docTypeEntities=u.entities,n=u.i}else if(e.substr(n+1,2)==="!["){let u=T(e,"]]>",n,"CDATA is not closed.")-2,o=e.substring(n+9,u);if(i=this.saveTextToParentTag(i,s,r),this.options.cdataPropName)s.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]);else{let a=this.parseTextData(o,s.tagname,r,!0,!1,!0);a==null&&(a=""),s.add(this.options.textNodeName,a)}n=u+2}else{let u=S(e,n,this.options.removeNSPrefix),o=u.tagName,a=u.tagExp,l=u.attrExpPresent,c=u.closeIndex;this.options.transformTagName&&(o=this.options.transformTagName(o)),s&&i&&s.tagname!=="!xml"&&(i=this.saveTextToParentTag(i,s,r,!1));let p=s;if(p&&this.options.unpairedTags.indexOf(p.tagname)!==-1&&(s=this.tagsNodeStack.pop(),r=r.substring(0,r.lastIndexOf("."))),o!==t.tagname&&(r+=r?"."+o:o),this.isItStopNode(this.options.stopNodes,r,o)){let d="";if(a.length>0&&a.lastIndexOf("/")===a.length-1)n=u.closeIndex;else if(this.options.unpairedTags.indexOf(o)!==-1)n=u.closeIndex;else{let w=this.readStopNodeData(e,o,c+1);if(!w)throw new Error("Unexpected end of ".concat(o));n=w.i,d=w.tagContent}let b=new P(o);o!==a&&l&&(b[":@"]=this.buildAttributesMap(a,r,o)),d&&(d=this.parseTextData(d,o,r,!0,l,!0,!0)),r=r.substr(0,r.lastIndexOf(".")),b.add(this.options.textNodeName,d),this.addChild(s,b,r)}else{if(a.length>0&&a.lastIndexOf("/")===a.length-1){o[o.length-1]==="/"?(o=o.substr(0,o.length-1),r=r.substr(0,r.length-1),a=o):a=a.substr(0,a.length-1),this.options.transformTagName&&(o=this.options.transformTagName(o));let d=new P(o);o!==a&&l&&(d[":@"]=this.buildAttributesMap(a,r,o)),this.addChild(s,d,r),r=r.substr(0,r.lastIndexOf("."))}else{let d=new P(o);this.tagsNodeStack.push(s),o!==a&&l&&(d[":@"]=this.buildAttributesMap(a,r,o)),this.addChild(s,d,r),s=d}i="",n=c}}else i+=e[n];return t.child};function at(e,t,s){let i=this.options.updateTag(t.tagname,s,t[":@"]);i===!1||(typeof i=="string"&&(t.tagname=i),e.addChild(t))}var lt=function(e){if(this.options.processEntities){for(let t in this.docTypeEntities){let s=this.docTypeEntities[t];e=e.replace(s.regx,s.val)}for(let t in this.lastEntities){let s=this.lastEntities[t];e=e.replace(s.regex,s.val)}if(this.options.htmlEntities)for(let t in this.htmlEntities){let s=this.htmlEntities[t];e=e.replace(s.regex,s.val)}e=e.replace(this.ampEntity.regex,this.ampEntity.val)}return e};function ct(e,t,s,i){return e&&(i===void 0&&(i=Object.keys(t.child).length===0),e=this.parseTextData(e,t.tagname,s,!1,t[":@"]?Object.keys(t[":@"]).length!==0:!1,i),e!==void 0&&e!==""&&t.add(this.options.textNodeName,e),e=""),e}function dt(e,t,s){let i="*."+s;for(let r in e){let n=e[r];if(i===n||t===n)return!0}return!1}function gt(e,t,s=">"){let i,r="";for(let n=t;n<e.length;n++){let f=e[n];if(i)f===i&&(i="");else if(f==='"'||f==="'")i=f;else if(f===s[0])if(s[1]){if(e[n+1]===s[1])return{data:r,index:n}}else return{data:r,index:n};else f==="	"&&(f=" ");r+=f}}function T(e,t,s,i){let r=e.indexOf(t,s);if(r===-1)throw new Error(i);return r+t.length-1}function S(e,t,s,i=">"){let r=gt(e,t+1,i);if(!r)return;let n=r.data,f=r.index,u=n.search(/\s/),o=n,a=!0;if(u!==-1&&(o=n.substr(0,u).replace(/\s\s*$/,""),n=n.substr(u+1)),s){let l=o.indexOf(":");l!==-1&&(o=o.substr(l+1),a=o!==r.data.substr(l+1))}return{tagName:o,tagExp:n,closeIndex:f,attrExpPresent:a}}function pt(e,t,s){let i=s,r=1;for(;s<e.length;s++)if(e[s]==="<")if(e[s+1]==="/"){let n=T(e,">",s,"".concat(t," is not closed"));if(e.substring(s+2,n).trim()===t&&(r--,r===0))return{tagContent:e.substring(i,s),i:n};s=n}else if(e[s+1]==="?")s=T(e,"?>",s+1,"StopNode is not closed.");else if(e.substr(s+1,3)==="!--")s=T(e,"-->",s+3,"StopNode is not closed.");else if(e.substr(s+1,2)==="![")s=T(e,"]]>",s,"StopNode is not closed.")-2;else{let n=S(e,s,">");n&&((n&&n.tagName)===t&&n.tagExp[n.tagExp.length-1]!=="/"&&r++,s=n.closeIndex)}}function F(e,t,s){if(t&&typeof e=="string"){let i=e.trim();return i==="true"?!0:i==="false"?!1:st(e,s)}else return B.isExist(e)?e:""}D.exports=$});var ne=N(se=>{"use strict";function ht(e,t){return te(e,t)}function te(e,t,s){let i,r={};for(let n=0;n<e.length;n++){let f=e[n],u=Nt(f),o="";if(s===void 0?o=u:o=s+"."+u,u===t.textNodeName)i===void 0?i=f[u]:i+=""+f[u];else{if(u===void 0)continue;if(f[u]){let a=te(f[u],t,o),l=Et(a,t);f[":@"]?bt(a,f[":@"],o,t):Object.keys(a).length===1&&a[t.textNodeName]!==void 0&&!t.alwaysCreateTextNode?a=a[t.textNodeName]:Object.keys(a).length===0&&(t.alwaysCreateTextNode?a[t.textNodeName]="":a=""),r[u]!==void 0&&r.hasOwnProperty(u)?(Array.isArray(r[u])||(r[u]=[r[u]]),r[u].push(a)):t.isArray(u,o,l)?r[u]=[a]:r[u]=a}}}return typeof i=="string"?i.length>0&&(r[t.textNodeName]=i):i!==void 0&&(r[t.textNodeName]=i),r}function Nt(e){let t=Object.keys(e);for(let s=0;s<t.length;s++){let i=t[s];if(i!==":@")return i}}function bt(e,t,s,i){if(t){let r=Object.keys(t),n=r.length;for(let f=0;f<n;f++){let u=r[f];i.isArray(u,s+"."+u,!0,!0)?e[u]=[t[u]]:e[u]=t[u]}}}function Et(e,t){let{textNodeName:s}=t,i=Object.keys(e).length;return!!(i===0||i===1&&(e[s]||typeof e[s]=="boolean"||e[s]===0))}se.prettify=ht});var ie=N((Jt,re)=>{var{buildOptions:mt}=J(),Tt=ee(),{prettify:yt}=ne(),wt=v(),L=class{constructor(t){this.externalEntities={},this.options=mt(t)}parse(t,s){if(typeof t!="string")if(t.toString)t=t.toString();else throw new Error("XML data is accepted in String or Bytes[] form.");if(s){s===!0&&(s={});let n=wt.validate(t,s);if(n!==!0)throw Error("".concat(n.err.msg,":").concat(n.err.line,":").concat(n.err.col))}let i=new Tt(this.options);i.addExternalEntities(this.externalEntities);let r=i.parseXml(t);return this.options.preserveOrder||r===void 0?r:yt(r,this.options)}addEntity(t,s){if(s.indexOf("&")!==-1)throw new Error("Entity value can't have '&'");if(t.indexOf("&")!==-1||t.indexOf(";")!==-1)throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if(s==="&")throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=s}};re.exports=L});var le=N((Wt,ae)=>{var At="\n";function Pt(e,t){let s="";return t.format&&t.indentBy.length>0&&(s=At),ue(e,t,"",s)}function ue(e,t,s,i){let r="",n=!1;for(let f=0;f<e.length;f++){let u=e[f],o=It(u),a="";if(s.length===0?a=o:a="".concat(s,".").concat(o),o===t.textNodeName){let b=u[o];xt(a,t)||(b=t.tagValueProcessor(o,b),b=fe(b,t)),n&&(r+=i),r+=b,n=!1;continue}else if(o===t.cdataPropName){n&&(r+=i),r+="<![CDATA[".concat(u[o][0][t.textNodeName],"]]>"),n=!1;continue}else if(o===t.commentPropName){r+=i+"<!--".concat(u[o][0][t.textNodeName],"-->"),n=!0;continue}else if(o[0]==="?"){let b=oe(u[":@"],t),w=o==="?xml"?"":i,I=u[o][0][t.textNodeName];I=I.length!==0?" "+I:"",r+=w+"<".concat(o).concat(I).concat(b,"?>"),n=!0;continue}let l=i;l!==""&&(l+=t.indentBy);let c=oe(u[":@"],t),p=i+"<".concat(o).concat(c),d=ue(u[o],t,a,l);t.unpairedTags.indexOf(o)!==-1?t.suppressUnpairedNode?r+=p+">":r+=p+"/>":(!d||d.length===0)&&t.suppressEmptyNode?r+=p+"/>":d&&d.endsWith(">")?r+=p+">".concat(d).concat(i,"</").concat(o,">"):(r+=p+">",d&&i!==""&&(d.includes("/>")||d.includes("</"))?r+=i+t.indentBy+d+i:r+=d,r+="</".concat(o,">")),n=!0}return r}function It(e){let t=Object.keys(e);for(let s=0;s<t.length;s++){let i=t[s];if(i!==":@")return i}}function oe(e,t){let s="";if(e&&!t.ignoreAttributes)for(let i in e){let r=t.attributeValueProcessor(i,e[i]);r=fe(r,t),r===!0&&t.suppressBooleanAttributes?s+=" ".concat(i.substr(t.attributeNamePrefix.length)):s+=" ".concat(i.substr(t.attributeNamePrefix.length),'="').concat(r,'"')}return s}function xt(e,t){e=e.substr(0,e.length-t.textNodeName.length-1);let s=e.substr(e.lastIndexOf(".")+1);for(let i in t.stopNodes)if(t.stopNodes[i]===e||t.stopNodes[i]==="*."+s)return!0;return!1}function fe(e,t){if(e&&e.length>0&&t.processEntities)for(let s=0;s<t.entities.length;s++){let i=t.entities[s];e=e.replace(i.regex,i.val)}return e}ae.exports=Pt});var de=N((Kt,ce)=>{"use strict";var Ct=le(),Ot={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function m(e){this.options=Object.assign({},Ot,e),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=_t),this.processTextOrObjNode=vt,this.options.format?(this.indentate=Vt,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}m.prototype.build=function(e){return this.options.preserveOrder?Ct(e,this.options):(Array.isArray(e)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(e={[this.options.arrayNodeName]:e}),this.j2x(e,0).val)};m.prototype.j2x=function(e,t){let s="",i="";for(let r in e)if(typeof e[r]>"u")this.isAttribute(r)&&(i+="");else if(e[r]===null)this.isAttribute(r)?i+="":r[0]==="?"?i+=this.indentate(t)+"<"+r+"?"+this.tagEndChar:i+=this.indentate(t)+"<"+r+"/"+this.tagEndChar;else if(e[r]instanceof Date)i+=this.buildTextValNode(e[r],r,"",t);else if(typeof e[r]!="object"){let n=this.isAttribute(r);if(n)s+=this.buildAttrPairStr(n,""+e[r]);else if(r===this.options.textNodeName){let f=this.options.tagValueProcessor(r,""+e[r]);i+=this.replaceEntitiesValue(f)}else i+=this.buildTextValNode(e[r],r,"",t)}else if(Array.isArray(e[r])){let n=e[r].length,f="";for(let u=0;u<n;u++){let o=e[r][u];typeof o>"u"||(o===null?r[0]==="?"?i+=this.indentate(t)+"<"+r+"?"+this.tagEndChar:i+=this.indentate(t)+"<"+r+"/"+this.tagEndChar:typeof o=="object"?this.options.oneListGroup?f+=this.j2x(o,t+1).val:f+=this.processTextOrObjNode(o,r,t):f+=this.buildTextValNode(o,r,"",t))}this.options.oneListGroup&&(f=this.buildObjectNode(f,r,"",t)),i+=f}else if(this.options.attributesGroupName&&r===this.options.attributesGroupName){let n=Object.keys(e[r]),f=n.length;for(let u=0;u<f;u++)s+=this.buildAttrPairStr(n[u],""+e[r][n[u]])}else i+=this.processTextOrObjNode(e[r],r,t);return{attrStr:s,val:i}};m.prototype.buildAttrPairStr=function(e,t){return t=this.options.attributeValueProcessor(e,""+t),t=this.replaceEntitiesValue(t),this.options.suppressBooleanAttributes&&t==="true"?" "+e:" "+e+'="'+t+'"'};function vt(e,t,s){let i=this.j2x(e,s+1);return e[this.options.textNodeName]!==void 0&&Object.keys(e).length===1?this.buildTextValNode(e[this.options.textNodeName],t,i.attrStr,s):this.buildObjectNode(i.val,t,i.attrStr,s)}m.prototype.buildObjectNode=function(e,t,s,i){if(e==="")return t[0]==="?"?this.indentate(i)+"<"+t+s+"?"+this.tagEndChar:this.indentate(i)+"<"+t+s+this.closeTag(t)+this.tagEndChar;{let r="</"+t+this.tagEndChar,n="";return t[0]==="?"&&(n="?",r=""),(s||s==="")&&e.indexOf("<")===-1?this.indentate(i)+"<"+t+s+n+">"+e+r:this.options.commentPropName!==!1&&t===this.options.commentPropName&&n.length===0?this.indentate(i)+"<!--".concat(e,"-->")+this.newLine:this.indentate(i)+"<"+t+s+n+this.tagEndChar+e+this.indentate(i)+r}};m.prototype.closeTag=function(e){let t="";return this.options.unpairedTags.indexOf(e)!==-1?this.options.suppressUnpairedNode||(t="/"):this.options.suppressEmptyNode?t="/":t="></".concat(e),t};m.prototype.buildTextValNode=function(e,t,s,i){if(this.options.cdataPropName!==!1&&t===this.options.cdataPropName)return this.indentate(i)+"<![CDATA[".concat(e,"]]>")+this.newLine;if(this.options.commentPropName!==!1&&t===this.options.commentPropName)return this.indentate(i)+"<!--".concat(e,"-->")+this.newLine;if(t[0]==="?")return this.indentate(i)+"<"+t+s+"?"+this.tagEndChar;{let r=this.options.tagValueProcessor(t,e);return r=this.replaceEntitiesValue(r),r===""?this.indentate(i)+"<"+t+s+this.closeTag(t)+this.tagEndChar:this.indentate(i)+"<"+t+s+">"+r+"</"+t+this.tagEndChar}};m.prototype.replaceEntitiesValue=function(e){if(e&&e.length>0&&this.options.processEntities)for(let t=0;t<this.options.entities.length;t++){let s=this.options.entities[t];e=e.replace(s.regex,s.val)}return e};function Vt(e){return this.options.indentBy.repeat(e)}function _t(e){return e.startsWith(this.options.attributeNamePrefix)&&e!==this.options.textNodeName?e.substr(this.attrPrefixLen):!1}ce.exports=m});var pe=N((Qt,ge)=>{"use strict";var $t=v(),St=ie(),Ft=de();ge.exports={XMLParser:St,XMLValidator:$t,XMLBuilder:Ft}});var me=xe(pe(),1);var C=class extends Error{constructor(t){super(t),this.name="BpmnParsingError"}};function y(e){return Object.keys(e)[0]}function he(e){return{id:e[":@"]["@_id"],source:e[":@"]["@_sourceRef"],target:e[":@"]["@_targetRef"]}}function Ne(e){let t=y(e),s=[],i=[];for(let r of e[t]){let n=y(r);n==="incoming"?s.push(r[n][0]["#text"]):n==="outgoing"&&i.push(r[n][0]["#text"])}return{type:t,id:e[":@"]["@_id"],name:e[":@"]["@_name"],incoming:s,outgoing:i}}function be(e){let t=[],s=[],i=new Map,r=new Map;for(let n of e.process){let f=y(n);if(f==="sequenceFlow"){let u=he(n);s.push(u),r.set(u.id,u)}else if(f!=="laneSet"){let u=Ne(n);t.push(u),i.set(u.id,u)}}for(let n of s){let f=i.get(n.source),u=i.get(n.target);if(!f||!u)throw new Error("Connector ".concat(n.id," has invalid source or target"));n.source=f,n.target=u}for(let n of t){for(let f in n.incoming){let u=r.get(n.incoming[f]);if(!u)throw new Error("Node ".concat(n.id," has invalid incoming connector"));n.incoming[f]=u}for(let f in n.outgoing){let u=r.get(n.outgoing[f]);if(!u)throw new Error("Node ".concat(n.id," has invalid outgoing connector"));n.outgoing[f]=u}}return{id:e[":@"]["@_id"],isExecutable:e[":@"]["@_isExecutable"]==="true",nodes:t,connectors:s}}function Ee(e){let t=e[":@"],s=[],i=[];for(let r of e.definitions)switch(y(r)){case"message":s.push(r);break;case"process":i.push(be(r));break}return{id:t["@_id"],targetNamespace:t["@_targetNamespace"],exporter:t["@_exporter"],exporterVersion:t["@_exporterVersion"],executionPlatform:t["@_executionPlatform"],executionPlatformVersion:t["@_executionPlatformVersion"],messages:s,processes:i}}function Bt(e){let t=new me.XMLParser({allowBooleanAttributes:!0,ignoreAttributes:!1,preserveOrder:!0,removeNSPrefix:!0,trimValues:!0}).parse(e),s=t[0][":@"],i=t[1];if(!("definitions"in i))throw new C("No definitions found");return{xml:{version:s["@_version"],encoding:s["@_encoding"]},definitions:Ee(i)}}export{Bt as parse};
//# sourceMappingURL=index.js.map
