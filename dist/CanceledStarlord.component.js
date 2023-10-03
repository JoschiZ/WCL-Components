let getComponent;(()=>{"use strict";var t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{default:()=>l});function s(t,e){return{component:"EnhancedMarkdown",props:{content:`\n<u># ${t} Error</u>\n${e}\n`}}}const i=(t,e)=>{for(const s of e)for(const e in s)if(t[e]!==s[e])return!0};class r{constructor(t,e={}){this.actors={};for(const s of t){if(!s.ability||!s.target||!s.source)continue;if(s.type.includes("stack"))continue;if("Pet"===s.target.type)continue;if("friendly"!==s.targetDisposition)continue;if(e.auraIds&&!e.auraIds.has(s.ability.id))continue;if(e.fight&&e.fight.isEventExcludedFromDamageRankings(s))continue;if(e.targetFilters&&i(s.target,e.targetFilters))continue;if(e.sourceFilters&&i(s.source,e.sourceFilters))continue;if(e.abilityFilters&&i(s.ability,e.abilityFilters))continue;const t=new n(s.source.id),r=new o(s.target.id),d=new a(s.ability.id);s.type.includes("apply")?this.addActor(t).addTarget(r).addBuff(d).buffApplied(s,e.captureEvent):s.type.includes("remove")&&this.addActor(t).addTarget(r).addBuff(d).buffRemoved(s,e.captureEvent)}}addActor(t){return this.actors[t.id]?this.actors[t.id]:(this.actors[t.id]=t,t)}getAurasBySourceActor(t){if(this.actors[t])return this.actors[t]}getSelfBuff(t,e){return this.actors[t].targets[t].buffs[e]}}class n{constructor(t){this.targets={},this.id=t}addTarget(t){return this.targets[t.id]?this.targets[t.id]:(this.targets[t.id]=t,t)}}class o{constructor(t){this.buffs={},this.id=t}addBuff(t){return this.buffs[t.id]?this.buffs[t.id]:(this.buffs[t.id]=t,t)}}class a{constructor(t){this.applied=[],this.removed=[],this.events={},this.id=t}buffApplied(t,e=!1){this.applied.push(t.timestamp),e&&(this.events[t.timestamp]=t)}buffRemoved(t,e=!1){this.removed.push(t.timestamp),e&&(this.events[t.timestamp]=t)}get appliedTimings(){return this.applied}get removedTimings(){return this.removed}get sortedTimeSpans(){if(this._sortedTimes)return JSON.parse(JSON.stringify(this._sortedTimes));for(this.applied=Array.from(new Set(this.applied)),this.removed=Array.from(new Set(this.removed));this.applied.length<this.removed.length;)this.applied.unshift(0);for(this.applied.sort(((t,e)=>t-e));this.removed.length<this.applied.length;)this.removed.push(1/0);return this.removed.sort(((t,e)=>t-e)),this._sortedTimes=Array.from(Array(Math.max(this.applied.length,this.removed.length)),((t,e)=>[this.applied[e]?this.applied[e]:0,this.removed[e]?this.removed[e]:1/0])),JSON.parse(JSON.stringify(this._sortedTimes))}isTimeInTimeSpans(t){let e=0,s=this.sortedTimeSpans.length-1;for(;e<=s;){const i=Math.floor((e+s)/2),[r,n]=this.sortedTimeSpans[i];if(t>=r&&t<=n)return!0;t<r?s=i-1:e=i+1}return!1}getFullDuration(t){let e=0;const s=this._sortedTimes?this._sortedTimes:this.sortedTimeSpans;for(const i of s){let[s,r]=i;null!=s||(s=t.startTime),null!=r||(r=t.endTime),e+=r-s}return e}}const d=279709,u=new class{constructor(t){this.messages=[],this.debug=t}addMessage(t,e){if(!this.debug)return;const s={};s[t]=e,this.messages.push(s)}}(false),c="Canceled Starlord",l=getComponent=()=>{if(1!==reportGroup.fights.length)return s(c,"Please select a single fight");const t=reportGroup.fights[0];if(1!==t.combatantInfoEvents.length)return s(c,"Please select a single <Druid>");const e=t.combatantInfoEvents[0].source;if(!e||"Druid"!==e.subType)return s(c,"Please select a single <Druid>");const i=function(t,e,s){return t.eventsByCategoryAndDisposition(e,s)}(t,"aurasGained","friendly"),n=new r(i,{sourceFilters:[{idInReport:e.idInReport}],auraIds:new Set([d]),captureEvent:!0});if(u.addMessage("BuffManager",n),!n.actors[e.id]||!n.actors[e.id].targets[e.id]||!n.actors[e.id].targets[e.id].buffs[279709])return[];const o=n.actors[e.id].targets[e.id].buffs[279709].sortedTimeSpans;let a=0;const l=[];for(const[t,e]of o){const s=Math.round(e/1e3)-Math.round(t/1e3),i=e/1e3-t/1e3;l.push(i),s<15&&s>1&&a++}u.addMessage("Applications",o.length),u.addMessage("Canceled",a),u.addMessage("All Durations",l),u.addMessage("All Timings",o);return{component:"EnhancedMarkdown",props:{content:`\n# <u>${c} for <Druid>${e.name}</Druid></u>\nDetected Starlord applications: ${o.length}\n\n\nStarlord canceled: ${a}\n`}}};globalThis.getComponent=e.default})();