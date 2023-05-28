/*!
 * Created using the WCL-TS-Components Template https://github.com/JoschiGrey/WCL-TS-Components
 * The source code can be found here https://github.com/JoschiGrey/WCL-Components
 *
 */
let getComponent;(()=>{"use strict";var t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function s(t,e,s){return t.eventsByCategoryAndDisposition(e,s)}t.d(e,{default:()=>m});const i=(t,e)=>{for(const s of e)for(const e in s)if(t[e]!==s[e])return!0};class r{constructor(t,e={}){this.actors={};for(const s of t){if(!s.ability||!s.target||!s.source)continue;if(s.type.includes("stack"))continue;if("Pet"===s.target.type)continue;if("friendly"!==s.targetDisposition)continue;if(e.auraIds&&!e.auraIds.has(s.ability.id))continue;if(e.fight&&e.fight.isEventExcludedFromDamageRankings(s))continue;if(e.targetFilters&&i(s.target,e.targetFilters))continue;if(e.sourceFilters&&i(s.source,e.sourceFilters))continue;if(e.abilityFilters&&i(s.ability,e.abilityFilters))continue;const t=new n(s.source.id),r=new a(s.target.id),l=new o(s.ability.id);s.type.includes("apply")?this.addActor(t).addTarget(r).addBuff(l).buffApplied(s,e.captureEvent):s.type.includes("remove")&&this.addActor(t).addTarget(r).addBuff(l).buffRemoved(s,e.captureEvent)}}addActor(t){return this.actors[t.id]?this.actors[t.id]:(this.actors[t.id]=t,t)}getAurasBySourceActor(t){if(this.actors[t])return this.actors[t]}getSelfBuff(t,e){return this.actors[t].targets[t].buffs[e]}}class n{constructor(t){this.targets={},this.id=t}addTarget(t){return this.targets[t.id]?this.targets[t.id]:(this.targets[t.id]=t,t)}}class a{constructor(t){this.buffs={},this.id=t}addBuff(t){return this.buffs[t.id]?this.buffs[t.id]:(this.buffs[t.id]=t,t)}}class o{constructor(t){this.applied=[],this.removed=[],this.events={},this.id=t}buffApplied(t,e=!1){this.applied.push(t.timestamp),e&&(this.events[t.timestamp]=t)}buffRemoved(t,e=!1){this.removed.push(t.timestamp),e&&(this.events[t.timestamp]=t)}get appliedTimings(){return this.applied}get removedTimings(){return this.removed}get sortedTimeSpans(){if(this._sortedTimes)return JSON.parse(JSON.stringify(this._sortedTimes));for(this.applied=Array.from(new Set(this.applied)),this.removed=Array.from(new Set(this.removed));this.applied.length<this.removed.length;)this.applied.unshift(0);for(this.applied.sort(((t,e)=>t-e));this.removed.length<this.applied.length;)this.removed.push(1/0);return this.removed.sort(((t,e)=>t-e)),this._sortedTimes=Array.from(Array(Math.max(this.applied.length,this.removed.length)),((t,e)=>[this.applied[e]?this.applied[e]:0,this.removed[e]?this.removed[e]:1/0])),JSON.parse(JSON.stringify(this._sortedTimes))}isTimeInTimeSpans(t){let e=0,s=this.sortedTimeSpans.length-1;for(;e<=s;){const i=Math.floor((e+s)/2),[r,n]=this.sortedTimeSpans[i];if(t>=r&&t<=n)return!0;t<r?s=i-1:e=i+1}return!1}}class l{constructor(t,e={}){this.targets=new Map,this.options=e;for(const s of t){if(!s.targetResources||!s.target)continue;if(e.targetFilters&&i(s.target,e.targetFilters))continue;if(e.sourceFilters&&i(s.source,e.sourceFilters))continue;if(e.abilityFilters&&i(s.ability,e.abilityFilters))continue;this.addTarget(new d(s.target.name,s.target.idInReport)).addHealth(s)}}addTarget(t){const e=this.targets.get(t.id);return e||(this.targets.set(t.id,t),t)}getHealth(t,e,s){const i=this.targets.get(t);if(!i)return 1/0;const r=i.getHealth(e,s);return r||1/0}}class d{constructor(t,e){this.maxHealth=0,this.health=new Map,this.name=t,this.id=e}addHealth(t){t.target&&t.targetResources&&(this.health.set(t.timestamp,t.targetResources.hitPoints),this.maxHealth=t.targetResources.maxHitPoints)}getHealth(t,e){const s=this.health.get(t);if(s)return s;if(0===this.health.size)return null;let i=null;if("before"===e){i=this.maxHealth;for(const[e,s]of this.health){if(e>t)break;i=s}return i}if("after"===e){for(const[e,s]of this.health)if(i=s,e>t)break;return i}return this.getClosestHealth(t)}getClosestHealth(t){let e=null,s=1/0;for(const[i,r]of this.health){null!=e||(e=r);const n=Math.abs(i-t);if(!(n<=s))break;e=r,s=n}return e}}function h(t,e){return{component:"EnhancedMarkdown",props:{content:`\n<u># ${t} Error</u>\n${e}\n`}}}function c(t){return`${Math.floor(t/6e4)}:${Math.round(t%6e4/1e3)}`}const u="Alter Time Healing",f=new class{constructor(t){this.messages=[],this.debug=t}addMessage(t,e){if(!this.debug)return;const s={};s[t]=e,this.messages.push(s)}}(false),p=342246,g=342247,m=getComponent=()=>{if(1!==reportGroup.fights.length)return h(u,"Please select a single fight");const t=reportGroup.fights[0];if(0===t.combatantInfoEvents.length)return h(u,"Sadly this component relies on real encounters and won't work with trash fights.");if(1!==t.combatantInfoEvents.length)return h(u,"Please select a single <Mage>");const e=t.combatantInfoEvents[0].source;if(!e||"Mage"!==e.subType)return h(u,"Please select a single <Mage>");const i=function(t,e){const i=s(t,"aurasGained","friendly"),n=new r(i,{sourceFilters:[{idInReport:e.idInReport}],auraIds:new Set([p]),captureEvent:!0});f.addMessage("BuffManager",n);const a=s(t,"damage","enemy"),o=new l(a,{targetFilters:[{idInReport:e.idInReport}]});if(f.addMessage("HealthManager",o),!n.actors[e.id]||!n.actors[e.id].targets[e.id]||!n.actors[e.id].targets[e.id].buffs[342246])return[];const d=n.actors[e.id].targets[e.id].buffs[342246].sortedTimeSpans,h=[];let u=0;for(const[s,i]of d){let r=o.getHealth(e.idInReport,s,"before");const n=o.getHealth(e.idInReport,i,"before");f.addMessage("AT",{startHealth:r,endHealth:n,start:s,end:i});if(Math.round(i/1e3)-Math.round(s/1e3)<10&&!b(t,e,i)){f.addMessage("canceled",`AT Skipped at ${c(i-t.startTime)}, ${s} - ${i}`);continue}const a=r-n;u+=a;const l=a>=0?a+"":`<span style='color:red'>${a}</span>`,d=c(i-t.startTime),p=a>=0?d+"":`<span style='color:red'>${d}</span>`;h.push({timestamp:p,amount:l})}const g=u>=0?`<span style='font-weight: bold'>${u}</span>`:`<span style='color:red; font-weight: bold'>${u}</span>`,m=u>=0?"<span style='font-weight: bold'>overall</span>":"<span style='color:red; font-weight: bold'>overall</span>";return h.push({timestamp:m,amount:g}),h}(t,e),n={component:"EnhancedMarkdown",props:{content:`\n# ${u}\n<Mage>${e.name}</Mage> did not use <AbilityIcon id={ALTER_TIME_ID} icon="spell_mage_altertime.jpg">Alter Time</AbilityIcon> or all usages got canceled.\n`}};if(0===i.length)return n;return{component:"Table",props:{columns:{title:{header:`<a href="https://www.wowhead.com/spell=342245">Alter Time</a> Healing Done by <Mage>${e.name}</Mage>`,columns:{timestamp:{header:"Timestamp",textAlign:"center"},amount:{header:"Amount",textAlign:"center"}}}},data:i}}};function b(t,e,i){const r=s(t,"casts","friendly");for(const t of r)if(t.ability&&t.ability.id===g&&t.source&&t.source.idInReport===e.idInReport&&t.timestamp===i)return!0;return!1}globalThis.getComponent=e.default})();