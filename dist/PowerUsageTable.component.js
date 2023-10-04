let getComponent;(()=>{"use strict";var e={d:(t,s)=>{for(var o in s)e.o(s,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:s[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{default:()=>n});const s={0:"Mana",1:"Rage",2:"Focus",3:"Energy",4:"Combo Points",5:"Runes",6:"Runic Power",7:"Soul Shards",8:"Astral Power",9:"Holy Power",10:"Alternate",11:"Maelstrom",12:"Chi",13:"Insanity",14:"Obsolete",15:"Obsolete2",16:"Arcane Charges",17:"Fury",18:"Pain",19:"Essence",20:"Rune Blood (Classic)",21:"Rune Frost (Classic)",22:"Rune Unholy (Classic)",23:"Alternate Quest",24:"Alternate Encounter",25:"Alternate Mount"};function o(e){return s[e]||`${e}`}const a=new class{constructor(e){this.messages=[],this.debug=e}addMessage(e,t){if(!this.debug)return;const s={};s[e]=t,this.messages.push(s)}}(!1),n=getComponent=()=>{const e=[],t=[],s=[];for(const o of reportGroup.fights){const a=r(o),n=a.GetColumns();e.push(a),s.push(n),t.push(a.GetRows(n))}a.addMessage("Fight Data",e);const o=function(e){let t={};for(let s of e)t=Object.assign(Object.assign({},t),s);return t}(s);a.addMessage("Columns",o);let n=function(e){const t=new Map;return e.forEach((e=>{e.forEach((e=>{const s=`${(o=e).actorName}_${o.ability}`;var o;!function(e,t,s){let o=e.get(t);o?function(e,t){if(e.actorName===t.actorName&&e.ability===t.ability){for(const s in e){let o=e[s],a=t[s];if("string"==typeof o&&"number"==typeof a?o=parseFloat(o):"string"==typeof a&&"number"==typeof o&&(a=parseFloat(a)),"number"==typeof o&&"number"==typeof a)e[s]=o+a;else if("string"==typeof o&&"string"==typeof a){const t=parseFloat(o),n=parseFloat(a);isNaN(t)||isNaN(n)||(e[s]=t+n)}}return e}throw new Error("Row objects must have the same actorName and ability")}(o,s):o=Object.assign({},s);e.set(t,o)}(t,s,e)}))})),Array.from(t.values())}(t);e.length>1&&(n=function(e,t){var s,o;const a={};for(const e of t)for(const t in e.players){const n=e.players[t].getTotalResourcesUsed();if(a[t])for(const e in n)null!==(s=(o=a[t])[e])&&void 0!==s||(o[e]=0),a[t][e]+=n[e];else a[t]=n}for(const t of e){const e=a[t.actorName];for(const s in t){if(!s.endsWith("%"))continue;const o=s.slice(0,-1),a=t[o];if("number"==typeof a&&0!==a){const n=a/e[o];t[s]=Math.round(100*n)}}}return e}(n,e)),a.addMessage("Data Rows",n);const i={component:"Table",props:{columns:{title:{header:"Resource Usage",columns:o}},data:n}};return a.debug?a.messages:i};function r(e){const t=new i,s=function(e,t,s){return e.eventsByCategoryAndDisposition(t,s)}(e,"casts","friendly");for(const e of s)"cast"===e.type&&t.AddCastEvent(e);return t}class i{constructor(){this.players={},this.AbilitiesUsed={}}AddCastEvent(e){var t,s,o;e.source&&"Pet"!==e.source.type&&e.ability&&(this.AbilitiesUsed[e.ability.name]=e.ability,null!==(t=(s=this.players)[o=e.source.name])&&void 0!==t||(s[o]=new c),this.players[e.source.name].AddCastEvent(e))}GetColumns(){const e={actorName:{header:"Player Name",textAlign:"center"},ability:{header:"Ability Name",textAlign:"center"},castCount:{header:"Casts",textAlign:"center"}},t=new Set;for(const e of Object.values(this.players))for(const s of Object.values(e.abilityDataByName))for(const e in s.totalResourcesUsed)t.add(e);for(const s of t)e[s]={header:s,textAlign:"center"},e[s+"%"]={header:s+"%",textAlign:"center"};return e}GetRows(e){var t;const s=[];for(const a in this.players){const n=this.players[a].getTotalResourcesUsed();for(const r in this.players[a].abilityDataByName){const i=this.players[a].abilityDataByName[r],c={actorName:a,ability:(o=this.AbilitiesUsed[r],`<AbilityIcon id="${o.id}" icon="${o.icon}" type="${o.type}">${o.name}</AbilityIcon>`),castCount:i.Casts};for(const e in i.totalResourcesUsed){const t=i.totalResourcesUsed[e]?i.totalResourcesUsed[e]:0,s=n[e]?Math.round(i.totalResourcesUsed[e]/n[e]*100):0;c[e]=t,c[e+"%"]=s}for(const s in e)null!==(t=c[s])&&void 0!==t||(c[s]=0);s.push(c)}}var o;return s}}class c{constructor(){this.abilityDataByName={}}getTotalResourcesUsed(){var e;const t={};for(const s of Object.values(this.abilityDataByName))for(const o in s.totalResourcesUsed)null!==(e=t[o])&&void 0!==e||(t[o]=0),t[o]+=s.totalResourcesUsed[o];return t}AddCastEvent(e){var t,s,o;e.ability&&(null!==(t=(s=this.abilityDataByName)[o=e.ability.name])&&void 0!==t||(s[o]=new l(e.ability.name)),this.abilityDataByName[e.ability.name].AddCastEvent(e))}}class l{constructor(e){this.totalResourcesUsed={},this.Casts=0,this.events=[],a.addMessage("CastEvents "+e,this.events),this.Name=e}AddCastEvent(e){e.sourceResources&&(this.events.push(e),this.Casts++,this.ParseClassResource(e.sourceResources))}ParseClassResource(e){var t,s;if(0!==e.resourceType&&!e.resourceType)return;const a=o(e.resourceType);null!==(t=(s=this.totalResourcesUsed)[a])&&void 0!==t||(s[a]=0),this.totalResourcesUsed[a]+=e.resourceCost,e.additionalResources&&this.ParseAdditionalResources(e.additionalResources)}ParseAdditionalResources(e){var t,s;if(!e.resourceType)return;const a=o(e.resourceType);null!==(t=(s=this.totalResourcesUsed)[a])&&void 0!==t||(s[a]=0),this.totalResourcesUsed[a]+=e.resourceAmount,e.next&&this.ParseAdditionalResources(e.next)}}globalThis.getComponent=t.default})();