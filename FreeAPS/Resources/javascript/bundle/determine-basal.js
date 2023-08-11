var freeaps_determineBasal;(()=>{var e={5546:(e,t,a)=>{var r=a(6880);function o(e,t){t||(t=0);var a=Math.pow(10,t);return Math.round(e*a)/a}function n(e,t){return"mmol/L"===t.out_units?o(.0555*e,1):Math.round(e)}e.exports=function(e,t,a,i,s,l,u,m,d,c,g,h,p,v){var B=i.min_bg,f=v.overrideTarget;const b=v.smbIsOff,M=v.advancedSettings,_=v.isfAndCr,y=v.isf,x=v.cr,S=v.smbIsAlwaysOff,D=v.start,w=v.end,G=v.smbMinutes,T=v.uamMinutes;var C=0,U=B,O=0,R="",A="",I="",F="",j="",P=0,E=0,q=0,W=0,k=0,L=0;const z=v.weightedAverage;var N=1,H=i.sens,Z=i.carb_ratio;v.useOverride&&(N=v.overridePercentage/100,_?(H/=N,Z/=N):(x&&(Z/=N),y&&(H/=N)));const $=i.weightPercentage,J=v.average_total_data;function K(e,t){var a=e.getTime();return new Date(a+36e5*t)}function Q(e){var t=i.bolus_increment;.1!=t&&(t=.05);var a=e/t;return a>=1?o(Math.floor(a)*t,5):0}function V(e){function t(e){return e<10&&(e="0"+e),e}return t(e.getHours())+":"+t(e.getMinutes())+":00"}function X(e,t){var a=new Date("1/1/1999 "+e),r=new Date("1/1/1999 "+t);return(a.getTime()-r.getTime())/36e5}function Y(e,t){var a=0,r=t,o=(e-t)/36e5,n=0,i=o,s=0;do{if(o>0){var l=V(r),u=p[0].rate;for(let e=0;e<p.length;e++){var m=p[e].start;if(l==m){if(e+1<p.length){o>=(s=X(p[e+1].start,p[e].start))?n=s:o<s&&(n=o)}else if(e+1==p.length){let t=p[0].start;s=24-X(p[e].start,t),o>=s?n=s:o<s&&(n=o)}a+=Q((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+Q(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=K(r,n)}else if(l>m)if(e+1<p.length){var d=p[e+1].start;l<d&&(o>=(s=X(d,l))?n=s:o<s&&(n=o),a+=Q((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+Q(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=K(r,n))}else if(e==p.length-1){o>=(s=X("23:59:59",l))?n=s:o<s&&(n=o),a+=Q((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+Q(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=K(r,n)}}}}while(o>0&&o<i);return a}if(g.length){let e=g.length-1;var ee=new Date(g[e].timestamp),te=new Date(g[0].timestamp);if("TempBasalDuration"==g[0]._type&&(te=new Date),(O=(te-ee)/36e5)<23.9&&O>21)k=Y(ee,(ae=24-O,re=ee.getTime(),new Date(re-36e5*ae))),F="24 hours of data is required for an accurate tdd calculation. Currently only "+O.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+k.toPrecision(5)+" U. ";else O<21?(pe=!1,enableDynamicCR=!1):F=""}else console.log("Pumphistory is empty!"),pe=!1,enableDynamicCR=!1;var ae,re;for(let e=0;e<g.length;e++)"Bolus"==g[e]._type&&(W+=g[e].amount);for(let e=1;e<g.length;e++)if("TempBasal"==g[e]._type&&g[e].rate>0){P=e,L=g[e].rate;var oe=g[e-1]["duration (min)"]/60,ne=oe,ie=new Date(g[e-1].timestamp),se=ie,le=0;do{if(e--,0==e){se=new Date;break}if("TempBasal"==g[e]._type||"PumpSuspend"==g[e]._type){se=new Date(g[e].timestamp);break}var ue=e-2;if(ue>=0&&"Rewind"==g[ue]._type){let e=g[ue].timestamp;for(;ue-1>=0&&"Prime"==g[ue-=1]._type;)le=(g[ue].timestamp-e)/36e5;le>=oe&&(se=e,le=0)}}while(e>0);var me=(se-ie)/36e5;me<ne&&(oe=me),q+=Q(L*(oe-le)),e=P}for(let e=0;e<g.length;e++)if(0,0==g[e]["duration (min)"]||"PumpResume"==g[e]._type){let t=new Date(g[e].timestamp),a=t,r=e;do{if(r>0&&(--r,"TempBasal"==g[r]._type)){a=new Date(g[r].timestamp);break}}while(r>0);(a-t)/36e5>0&&(k+=Y(a,t))}for(let e=g.length-1;e>0;e--)if("TempBasalDuration"==g[e]._type){let t=g[e]["duration (min)"]/60,a=new Date(g[e].timestamp);var de=a;let r=e;do{if(--r,r>=0&&("TempBasal"==g[r]._type||"PumpSuspend"==g[r]._type)){de=new Date(g[r].timestamp);break}}while(r>0);if(0==e&&"TempBasalDuration"==g[0]._type&&(de=new Date,t=g[e]["duration (min)"]/60),(de-a)/36e5-t>0){k+=Y(de,K(a,t))}}var ce,ge={TDD:o(E=W+q+k,5),bolus:o(W,5),temp_basal:o(q,5),scheduled_basal:o(k,5)};O>21?(A=". Bolus insulin: "+W.toPrecision(5)+" U",I=". Temporary basal insulin: "+q.toPrecision(5)+" U",R=". Insulin with scheduled basal rate: "+k.toPrecision(5)+" U",j=F+(" TDD past 24h is: "+E.toPrecision(5)+" U")+A+I+R,tddReason=", Total insulin: "+o(E,2)+" U, "+o(W/E*100,0)+"% Bolus "+o((q+k)/E*100,0)+"% Basal"):tddReason=", TDD: Not enough pumpData (< 21h)";const he=e.glucose;var pe=h.useNewFormula;const ve=h.enableDynamicCR,Be=Math.min(i.autosens_min,i.autosens_max),fe=Math.max(i.autosens_min,i.autosens_max);(fe==Be||fe<1||Be>1)&&(pe=!1,console.log("Dynamic ISF disabled due to current autosens settings"));const be=h.adjustmentFactor,Me=i.min_bg;var _e=!1,ye="",xe=1,Se="";J>0&&(xe=z/J),Se=xe>1?"Basal adjustment with a 24 hour  to total average (up to 14 days of data) TDD ratio (limited by Autosens max setting). Basal Ratio: "+(xe=o(xe=Math.min(xe,i.autosens_max),2))+". Upper limit = Autosens max ("+i.autosens_max+")":xe<1?"Basal adjustment with a 24 hour to  to total average (up to 14 days of data) TDD ratio (limited by Autosens min setting). Basal Ratio: "+(xe=o(xe=Math.max(xe,i.autosens_min),2))+". Lower limit = Autosens min ("+i.autosens_min+")":"Basal adjusted with a 24 hour to total average (up to 14 days of data) TDD ratio: "+xe,Se=", Basal ratio: "+xe,(i.high_temptarget_raises_sensitivity||i.exercise_mode||v.isEnabled)&&(_e=!0),Me>=118&&_e&&(pe=!1,ye="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+Me);var De=", Dynamic ratios log: ",we=", AF: "+be,Ge="BG: "+he+" mg/dl ("+(.0555*he).toPrecision(2)+" mmol/l)",Te="",Ce="";const Ue=h.curve,Oe=h.insulinPeakTime,Re=h.useCustomPeakTime;var Ae=55,Ie=65;switch(Ue){case"rapid-acting":Ie=65;break;case"ultra-rapid":Ie=50}Re?(Ae=120-Oe,console.log("Custom insulinpeakTime set to :"+Oe+", insulinFactor: "+Ae)):(Ae=120-Ie,console.log("insulinFactor set to : "+Ae)),ce=E,$<1&&z>0&&(E=z,console.log("Using weighted TDD average: "+o(E,2)+" U, instead of past 24 h ("+o(ce,2)+" U), weight: "+$),Ce=", Weighted TDD: "+o(E,2)+" U");const Fe=h.sigmoid;var je="";if(pe){var Pe=H*be*E*Math.log(he/Ae+1)/1800;Te=", Logarithmic formula"}if(pe&&Fe){const e=Be,t=fe-e,a=.0555*(he-i.min_bg);var Ee=xe,qe=fe-1;1==fe&&(qe=fe+.01-1);const r=Math.log10(1/qe-e/qe)/Math.log10(Math.E),o=a*be*Ee+r;Pe=t/(1+Math.exp(-o))+e,Te=", Sigmoid function"}var We=Z;const ke=o(Z,1);var Le="",ze="";if(pe&&E>0){if(Le=", Dynamic ISF/CR: On/",Pe>fe?(ye=", Dynamic ISF limited by autosens_max setting: "+fe+" ("+o(Pe,2)+"), ",ze=", Autosens/Dynamic Limit: "+fe+" ("+o(Pe,2)+")",Pe=fe):Pe<Be&&(ye=", Dynamic ISF limited by autosens_min setting: "+Be+" ("+o(Pe,2)+"). ",ze=", Autosens/Dynamic Limit: "+Be+" ("+o(Pe,2)+")",Pe=Be),ve){Le+="On";var Ne=". New Dynamic CR: "+o(Z/=Pe,1)+" g/U"}else Ne=" CR: "+We+" g/U",Le+="Off";const e=H/Pe;s.ratio=Pe,je=". Using Sigmoid function, the autosens ratio has been adjusted with sigmoid factor to: "+o(s.ratio,2)+". New ISF = "+o(e,2)+" mg/dl ("+o(.0555*e,2)+" (mmol/l). CR adjusted from "+o(ke,2)+" to "+o(Z,2),ye+=Fe?je:", Dynamic autosens.ratio set to "+o(Pe,2)+" with ISF: "+e.toPrecision(3)+" mg/dl/U ("+(.0555*e).toPrecision(3)+" mmol/l/U)",j+=De+Ge+we+Te+ye+Le+Ne+Ce}else j+=De+"Dynamic Settings disabled";console.log(j),pe||ve?pe&&i.tddAdjBasal?tddReason+=Le+Te+ze+we+Se:pe&&!i.tddAdjBasal&&(tddReason+=Le+Te+ze+we):tddReason+="";var He={},Ze=new Date;if(c&&(Ze=c),void 0===i||void 0===i.current_basal)return He.error="Error: could not get current basal rate",He;var $e=r(i.current_basal,i)*N,Je=$e;v.useOverride&&(0==v.duration?console.log("Profile Override is active. Override "+o(100*N,0)+"%. Override Duration: Enabled indefinitely"):console.log("Profile Override is active. Override "+o(100*N,0)+"%. Override Expires in: "+v.duration+" min."));var Ke=new Date;c&&(Ke=c);var Qe,Ve=new Date(e.date),Xe=o((Ke-Ve)/60/1e3,1),Ye=e.glucose,et=e.noise;Qe=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var tt=Math.min(e.delta,e.short_avgdelta),at=Math.min(e.short_avgdelta,e.long_avgdelta),rt=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(Ye<=10||38===Ye||et>=3)&&(He.reason="CGM is calibrating, in ??? state, or noise is high");if(Ye>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(Ye,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),Xe>12||Xe<-5?He.reason="If current system time "+Ke+" is correct, then BG data is too old. The last BG data was read "+Xe+"m ago at "+Ve:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?He.reason="CGM was just calibrated":He.reason="CGM data is unchanged ("+n(Ye,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,i)+" mg/dL ~45m change"),Ye<=10||38===Ye||et>=3||Xe>12||Xe<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return t.rate>=Je?(He.reason+=". Canceling high temp basal of "+t.rate,He.deliverAt=Ze,He.temp="absolute",He.duration=0,He.rate=0,He):0===t.rate&&t.duration>30?(He.reason+=". Shortening "+t.duration+"m long zero temp to 30m. ",He.deliverAt=Ze,He.temp="absolute",He.duration=30,He.rate=0,He):(He.reason+=". Temp "+t.rate+" <= current basal "+Je+"U/hr; doing nothing. ",He);var ot,nt,it,st,lt=i.max_iob;if(void 0!==i.min_bg&&(nt=i.min_bg),void 0!==i.max_bg&&(it=i.max_bg),void 0!==i.enableSMB_high_bg_target&&(st=i.enableSMB_high_bg_target),void 0===i.min_bg||void 0===i.max_bg)return He.error="Error: could not determine target_bg. ",He;ot=(i.min_bg+i.max_bg)/2;var ut=i.exercise_mode||i.high_temptarget_raises_sensitivity||v.isEnabled,mt=100,dt=160;if(dt=i.half_basal_exercise_target,v.isEnabled){const e=v.hbt;console.log("Half Basal Target used: "+n(e,i)+" "+i.out_units),dt=e}else console.log("Default Half Basal Target used: "+n(dt,i)+" "+i.out_units);if(ut&&i.temptargetSet&&ot>mt||i.low_temptarget_lowers_sensitivity&&i.temptargetSet&&ot<mt||v.isEnabled&&i.temptargetSet&&ot<mt){var ct=dt-mt;sensitivityRatio=ct*(ct+ot-mt)<=0?i.autosens_max:ct/(ct+ot-mt),sensitivityRatio=Math.min(sensitivityRatio,i.autosens_max),sensitivityRatio=o(sensitivityRatio,2),process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+ot+"; ")}else void 0!==s&&s&&(sensitivityRatio=s.ratio,0===f||f===i.min_bg||i.temptargetSet||(ot=f,console.log("Current Override Profile Target: "+n(f,i)+" "+i.out_units)),process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(i.temptargetSet&&ot<mt&&pe&&he>=ot&&sensitivityRatio<Pe&&(s.ratio=Pe*(mt/ot),s.ratio=Math.min(s.ratio,i.autosens_max),sensitivityRatio=o(s.ratio,2),console.log("Dynamic ratio increased from "+o(Pe,2)+" to "+o(s.ratio,2)+" due to a low temp target ("+ot+").")),sensitivityRatio&&!pe?(Je=i.current_basal*N*sensitivityRatio,Je=r(Je,i)):pe&&i.tddAdjBasal&&(Je=i.current_basal*xe*N,Je=r(Je,i),J>0&&(process.stderr.write("TDD-adjustment of basals activated, using tdd24h_14d_Ratio "+o(xe,2)+", TDD 24h = "+o(ce,2)+"U, Weighted average TDD = "+o(z,2)+"U, (Weight percentage = "+$+"), Total data of TDDs (up to 14 days) average = "+o(J,2)+"U. "),Je!==$e*N?process.stderr.write("Adjusting basal from "+$e*N+" U/h to "+Je+" U/h; "):process.stderr.write("Basal unchanged: "+Je+" U/h; "))),i.temptargetSet);else if(void 0!==s&&s&&(i.sensitivity_raises_target&&s.ratio<1||i.resistance_lowers_target&&s.ratio>1)){nt=o((nt-60)/s.ratio)+60,it=o((it-60)/s.ratio)+60;var gt=o((ot-60)/s.ratio)+60;ot===(gt=Math.max(80,gt))?process.stderr.write("target_bg unchanged: "+n(gt,i)+"; "):process.stderr.write("target_bg from "+n(gt,i)+" to "+n(gt,i)+"; "),ot=gt}var ht=n(ot,i);ot!=B&&(ht=0!==f&&f!==ot?n(B,i)+"→"+n(f,i)+"→"+n(ot,i):n(B,i)+"→"+n(ot,i));var pt=200,vt=200,Bt=200;if(e.noise>=2){var ft=Math.max(1.1,i.noisyCGMTargetMultiplier);Math.min(250,i.maxRaw);pt=o(Math.min(200,nt*ft)),vt=o(Math.min(200,ot*ft)),Bt=o(Math.min(200,it*ft)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+n(gt,i)+" to "+n(vt,i)+"; "),nt=pt,ot=vt,it=Bt}U=nt-.5*(nt-40);var bt=i.threshold_setting;bt>U&&bt<=120&&bt>=65?(console.error("Threshold changed in settings from "+n(U,i)+" to "+n(bt,i)+". "),U=bt):console.error("Current threshold: "+n(U,i));var Mt="",_t=(o(H,1),H);if(void 0!==s&&s&&((_t=o(_t=H/sensitivityRatio,1))!==H?process.stderr.write("ISF from "+n(H,i)+" to "+n(_t,i)):process.stderr.write("ISF unchanged: "+n(_t,i)),Mt+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+n(H,i)+"→"+n(_t,i)),console.error("CR:"+Z),void 0===a)return He.error="Error: iob_data undefined. ",He;var yt,xt=a;if(a.length,a.length>1&&(a=xt[0]),void 0===a.activity||void 0===a.iob)return He.error="Error: iob_data missing some property. ",He;var St=((yt=void 0!==a.lastTemp?o((new Date(Ke).getTime()-a.lastTemp.date)/6e4):0)+t.duration)%30;if(console.error("currenttemp:"+t.rate+" lastTempAge:"+yt+"m, tempModulus:"+St+"m"),He.temp="absolute",He.deliverAt=Ze,m&&t&&a.lastTemp&&t.rate!==a.lastTemp.rate&&yt>10&&t.duration)return He.reason="Warning: currenttemp rate "+t.rate+" != lastTemp rate "+a.lastTemp.rate+" from pumphistory; canceling temp",u.setTempBasal(0,0,i,He,t);if(t&&a.lastTemp&&t.duration>0){var Dt=yt-a.lastTemp.duration;if(Dt>5&&yt>10)return He.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+Dt+"m ago; canceling temp",u.setTempBasal(0,0,i,He,t)}var wt=o(-a.activity*_t*5,2),Gt=o(6*(tt-wt));Gt<0&&(Gt=o(6*(at-wt)))<0&&(Gt=o(6*(e.long_avgdelta-wt)));var Tt=Ye,Ct=(Tt=a.iob>0?o(Ye-a.iob*_t):o(Ye-a.iob*Math.min(_t,H)))+Gt;if(void 0===Ct||isNaN(Ct))return He.error="Error: could not calculate eventualBG. Sensitivity: "+_t+" Deviation: "+Gt,He;var Ut,Ot,Rt=function(e,t,a){return o(a+(e-t)/24,1)}(ot,Ct,wt);He={temp:"absolute",bg:Ye,tick:Qe,eventualBG:Ct,insulinReq:0,reservoir:d,deliverAt:Ze,sensitivityRatio,TDD:ce,insulin:ge,current_target:ot,insulinForManualBolus:C,manualBolusErrorString:0,minDelta:tt,expectedDelta:Rt,minGuardBG:Ot,minPredBG:Ut,threshold:n(U,i)};var At=[],It=[],Ft=[],jt=[];At.push(Ye),It.push(Ye),jt.push(Ye),Ft.push(Ye);var Pt=function(e,t,a,r,o,i){return t?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&o>100?(console.error("SMB disabled due to high temptarget of "+o),!1):!0===a.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&a.mealCOB?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of "+a.mealCOB),!0):!0===e.enableSMB_after_carbs&&a.carbs?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&o<100?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of "+n(o,e)),!0):!0===e.enableSMB_high_bg&&null!==i&&r>=i?(console.error("Checking BG to see if High for SMB enablement."),console.error("Current BG",r," | High BG ",i),a.bwFound?console.error("Warning: High BG SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("High BG detected. Enabling SMB."),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(i,m,l,Ye,ot,st);if(b)if(S){let e=c.getHours();e>=D&&e<=w&&(console.error("SMB disabled by schedule (a Profile is active with SMBs disabled)"),Pt=!1)}else console.error("SMBs are disabled (a Profile is active with SMBs disabled)"),Pt=!1;var Et=i.enableUAM,qt=0,Wt=0;qt=o(tt-wt,1);var kt=o(tt-wt,1);csf=_t/Z,console.error("profile.sens:"+n(H,i)+", sens:"+n(_t,i)+", CSF:"+o(csf,1));var Lt=o(30*csf*5/60,1);qt>Lt&&(console.error("Limiting carb impact from "+qt+" to "+Lt+"mg/dL/5m (30g/h)"),qt=Lt);var zt=3;sensitivityRatio&&(zt/=sensitivityRatio);var Nt=zt;if(l.carbs){zt=Math.max(zt,l.mealCOB/20);var Ht=o((new Date(Ke).getTime()-l.lastCarbTime)/6e4),Zt=(l.carbs-l.mealCOB)/l.carbs;Nt=o(Nt=zt+1.5*Ht/60,1),console.error("Last carbs "+Ht+" minutes ago; remainingCATime:"+Nt+"hours; "+o(100*Zt,1)+"% carbs absorbed")}var $t=Math.max(0,qt/5*60*Nt/2)/csf,Jt=90,Kt=1;i.remainingCarbsCap&&(Jt=Math.min(90,i.remainingCarbsCap)),i.remainingCarbsFraction&&(Kt=Math.min(1,i.remainingCarbsFraction));var Qt=1-Kt,Vt=Math.max(0,l.mealCOB-$t-l.carbs*Qt),Xt=(Vt=Math.min(Jt,Vt))*csf*5/60/(Nt/2),Yt=o(l.slopeFromMaxDeviation,2),ea=o(l.slopeFromMinDeviation,2),ta=Math.min(Yt,-ea/3);Wt=0===qt?0:Math.min(60*Nt/5/2,Math.max(0,l.mealCOB*csf/qt)),console.error("Carb Impact:"+qt+"mg/dL per 5m; CI Duration:"+o(5*Wt/60*2,1)+"hours; remaining CI ("+Nt/2+"h peak):"+o(Xt,1)+"mg/dL per 5m");var aa,ra,oa,na,ia=999,sa=999,la=999,ua=999,ma=999,da=999,ca=999,ga=Ct,ha=Ye,pa=Ye,va=0,Ba=[],fa=[];try{xt.forEach((function(e){var t=o(-e.activity*_t*5,2),a=o(-e.iobWithZeroTemp.activity*_t*5,2),r=Tt,n=qt*(1-Math.min(1,It.length/12));if(!0===(pe&&!Fe))ga=It[It.length-1]+o(-e.activity*(1800/(E*be*Math.log(Math.max(It[It.length-1],39)/Ae+1)))*5,2)+n,r=jt[jt.length-1]+o(-e.iobWithZeroTemp.activity*(1800/(E*be*Math.log(Math.max(jt[jt.length-1],39)/Ae+1)))*5,2),console.log("Dynamic ISF (Logarithmic Formula) )adjusted predictions for IOB and ZT: IOBpredBG: "+o(ga,2)+" , ZTpredBG: "+o(r,2));else ga=It[It.length-1]+t+n,r=jt[jt.length-1]+a;var i=Math.max(0,Math.max(0,qt)*(1-At.length/Math.max(2*Wt,1))),s=Math.min(At.length,12*Nt-At.length),l=Math.max(0,s/(Nt/2*12)*Xt);i+l,Ba.push(o(l,0)),fa.push(o(i,0)),COBpredBG=At[At.length-1]+t+Math.min(0,n)+i+l;var u=Math.max(0,kt+Ft.length*ta),m=Math.max(0,kt*(1-Ft.length/Math.max(36,1))),d=Math.min(u,m);if(d>0&&(va=o(5*(Ft.length+1)/60,1)),!0===(pe&&!Fe))UAMpredBG=Ft[Ft.length-1]+o(-e.activity*(1800/(E*be*Math.log(Math.max(Ft[Ft.length-1],39)/Ae+1)))*5,2)+Math.min(0,n)+d,console.log("Dynamic ISF (Logarithmic Formula) adjusted prediction for UAM: UAMpredBG: "+o(UAMpredBG,2));else UAMpredBG=Ft[Ft.length-1]+t+Math.min(0,n)+d;It.length<48&&It.push(ga),At.length<48&&At.push(COBpredBG),Ft.length<48&&Ft.push(UAMpredBG),jt.length<48&&jt.push(r),COBpredBG<ua&&(ua=o(COBpredBG)),UAMpredBG<ma&&(ma=o(UAMpredBG)),ga<da&&(da=o(ga)),r<ca&&(ca=o(r));It.length>18&&ga<ia&&(ia=o(ga)),ga>ha&&(ha=ga),(Wt||Xt>0)&&At.length>18&&COBpredBG<sa&&(sa=o(COBpredBG)),(Wt||Xt>0)&&COBpredBG>ha&&(pa=COBpredBG),Et&&Ft.length>12&&UAMpredBG<la&&(la=o(UAMpredBG)),Et&&UAMpredBG>ha&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}l.mealCOB&&(console.error("predCIs (mg/dL/5m):"+fa.join(" ")),console.error("remainingCIs:      "+Ba.join(" "))),He.predBGs={},It.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))}));for(var ba=It.length-1;ba>12&&It[ba-1]===It[ba];ba--)It.pop();for(He.predBGs.IOB=It,ra=o(It[It.length-1]),jt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ba=jt.length-1;ba>6&&!(jt[ba-1]>=jt[ba]||jt[ba]<=ot);ba--)jt.pop();if(He.predBGs.ZT=jt,o(jt[jt.length-1]),l.mealCOB>0&&(qt>0||Xt>0)){for(At.forEach((function(e,t,a){a[t]=o(Math.min(1500,Math.max(39,e)))})),ba=At.length-1;ba>12&&At[ba-1]===At[ba];ba--)At.pop();He.predBGs.COB=At,oa=o(At[At.length-1]),Ct=Math.max(Ct,o(At[At.length-1])),console.error("COBpredBG: "+o(At[At.length-1]))}if(qt>0||Xt>0){if(Et){for(Ft.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ba=Ft.length-1;ba>12&&Ft[ba-1]===Ft[ba];ba--)Ft.pop();He.predBGs.UAM=Ft,na=o(Ft[Ft.length-1]),Ft[Ft.length-1]&&(Ct=Math.max(Ct,o(Ft[Ft.length-1])))}He.eventualBG=Ct}console.error("UAM Impact:"+kt+"mg/dL per 5m; UAM Duration:"+va+"hours"),ia=Math.max(39,ia),sa=Math.max(39,sa),la=Math.max(39,la),Ut=o(ia);var Ma=l.mealCOB/l.carbs;aa=o(la<999&&sa<999?(1-Ma)*UAMpredBG+Ma*COBpredBG:sa<999?(ga+COBpredBG)/2:la<999?(ga+UAMpredBG)/2:ga),ca>aa&&(aa=ca),Ot=o(Ot=Wt||Xt>0?Et?Ma*ua+(1-Ma)*ma:ua:Et?ma:da);var _a=la;if(ca<U)_a=(la+ca)/2;else if(ca<ot){var ya=(ca-U)/(ot-U);_a=(la+(la*ya+ca*(1-ya)))/2}else ca>la&&(_a=(la+ca)/2);if(_a=o(_a),l.carbs)if(!Et&&sa<999)Ut=o(Math.max(ia,sa));else if(sa<999){var xa=Ma*sa+(1-Ma)*_a;Ut=o(Math.max(ia,sa,xa))}else Ut=Et?_a:Ot;else Et&&(Ut=o(Math.max(ia,_a)));Ut=Math.min(Ut,aa),process.stderr.write("minPredBG: "+Ut+" minIOBPredBG: "+ia+" minZTGuardBG: "+ca),sa<999&&process.stderr.write(" minCOBPredBG: "+sa),la<999&&process.stderr.write(" minUAMPredBG: "+la),console.error(" avgPredBG:"+aa+" COB/Carbs:"+l.mealCOB+"/"+l.carbs),pa>Ye&&(Ut=Math.min(Ut,pa)),He.COB=l.mealCOB,He.IOB=a.iob,He.BGI=n(wt,i),He.deviation=n(Gt,i),He.ISF=n(_t,i),He.CR=o(Z,1),He.target_bg=n(ot,i),He.TDD=o(ce,2),He.current_target=o(ot,0);var Sa=He.CR;ke!=He.CR&&(Sa=ke+"→"+He.CR),He.reason=Mt+", COB: "+He.COB+", Dev: "+He.deviation+", BGI: "+He.BGI+", CR: "+Sa+", Target: "+ht+", minPredBG "+n(Ut,i)+", minGuardBG "+n(Ot,i)+", IOBpredBG "+n(ra,i),oa>0&&(He.reason+=", COBpredBG "+n(oa,i)),na>0&&(He.reason+=", UAMpredBG "+n(na,i)),He.reason+=tddReason,He.reason+="; ";var Da=Tt;Da<40&&(Da=Math.min(Ot,Da));var wa,Ga=U-Da,Ta=240,Ca=240;if(l.mealCOB>0&&(qt>0||Xt>0)){for(ba=0;ba<At.length;ba++)if(At[ba]<nt){Ta=5*ba;break}for(ba=0;ba<At.length;ba++)if(At[ba]<U){Ca=5*ba;break}}else{for(ba=0;ba<It.length;ba++)if(It[ba]<nt){Ta=5*ba;break}for(ba=0;ba<It.length;ba++)if(It[ba]<U){Ca=5*ba;break}}Pt&&Ot<U&&(console.error("minGuardBG "+n(Ot,i)+" projected below "+n(U,i)+" - disabling SMB"),He.manualBolusErrorString=1,He.minGuardBG=Ot,He.insulinForManualBolus=o((He.eventualBG-He.target_bg)/_t,2),Pt=!1),void 0===i.maxDelta_bg_threshold&&(wa=.2),void 0!==i.maxDelta_bg_threshold&&(wa=Math.min(i.maxDelta_bg_threshold,.4)),rt>wa*Ye&&(console.error("maxDelta "+n(rt,i)+" > "+100*wa+"% of BG "+n(Ye,i)+" - disabling SMB"),He.reason+="maxDelta "+n(rt,i)+" > "+100*wa+"% of BG "+n(Ye,i)+" - SMB disabled!, ",Pt=!1),console.error("BG projected to remain above "+n(nt,i)+" for "+Ta+"minutes"),(Ca<240||Ta<60)&&console.error("BG projected to remain above "+n(U,i)+" for "+Ca+"minutes");var Ua=Ca,Oa=i.current_basal*N*_t*Ua/60,Ra=Math.max(0,l.mealCOB-.25*l.carbs),Aa=(Ga-Oa)/csf-Ra;Oa=o(Oa),Aa=o(Aa),console.error("naive_eventualBG:",Tt,"bgUndershoot:",Ga,"zeroTempDuration:",Ua,"zeroTempEffect:",Oa,"carbsReq:",Aa),"Could not parse clock data"==l.reason?console.error("carbsReq unknown: Could not parse clock data"):Aa>=i.carbsReqThreshold&&Ca<=45&&(He.carbsReq=Aa,He.reason+=Aa+" add'l carbs req w/in "+Ca+"m; ");var Ia=0;if(Ye<U&&a.iob<-i.current_basal*N*20/60&&tt>0&&tt>Rt)He.reason+="IOB "+a.iob+" < "+o(-i.current_basal*N*20/60,2),He.reason+=" and minDelta "+n(tt,i)+" > expectedDelta "+n(Rt,i)+"; ";else if(Ye<U||Ot<U)return He.reason+="minGuardBG "+n(Ot,i)+"<"+n(U,i),Ga=ot-Ot,Ot<U&&(He.manualBolusErrorString=2,He.minGuardBG=Ot),He.insulinForManualBolus=o((Ct-ot)/_t,2),Ia=o(60*(Ga/_t)/i.current_basal*N),Ia=30*o(Ia/30),Ia=Math.min(120,Math.max(30,Ia)),u.setTempBasal(0,Ia,i,He,t);if(i.skip_neutral_temps&&He.deliverAt.getMinutes()>=55)return He.reason+="; Canceling temp at "+He.deliverAt.getMinutes()+"m past the hour. ",u.setTempBasal(0,0,i,He,t);var Fa=0,ja=Je,Pa=0;if(Ct<nt){if(He.reason+="Eventual BG "+n(Ct,i)+" < "+n(nt,i),tt>Rt&&tt>0&&!Aa)return Tt<40?(He.reason+=", naive_eventualBG < 40. ",u.setTempBasal(0,30,i,He,t)):(e.delta>tt?He.reason+=", but Delta "+n(Qe,i)+" > expectedDelta "+n(Rt,i):He.reason+=", but Min. Delta "+tt.toFixed(2)+" > Exp. Delta "+n(Rt,i),t.duration>15&&r(Je,i)===r(t.rate,i)?(He.reason+=", temp "+t.rate+" ~ req "+Je+"U/hr. ",He):(He.reason+="; setting current basal of "+Je+" as temp. ",u.setTempBasal(Je,30,i,He,t)));Fa=o(Fa=2*Math.min(0,(Ct-ot)/_t),2);var Ea=Math.min(0,(Tt-ot)/_t);if(Ea=o(Ea,2),tt<0&&tt>Rt)Fa=o(Fa*(tt/Rt),2);ja=r(ja=Je+2*Fa,i),Pa=t.duration*(t.rate-Je)/60;var qa=Math.min(Fa,Ea);if(console.log("naiveInsulinReq:"+Ea),Pa<qa-.3*Je)return He.reason+=", "+t.duration+"m@"+t.rate.toFixed(2)+" is a lot less than needed. ",u.setTempBasal(ja,30,i,He,t);if(void 0!==t.rate&&t.duration>5&&ja>=.8*t.rate)return He.reason+=", temp "+t.rate+" ~< req "+ja+"U/hr. ",He;if(ja<=0){if((Ia=o(60*((Ga=ot-Tt)/_t)/i.current_basal*N))<0?Ia=0:(Ia=30*o(Ia/30),Ia=Math.min(120,Math.max(0,Ia))),Ia>0)return He.reason+=", setting "+Ia+"m zero temp. ",u.setTempBasal(ja,Ia,i,He,t)}else He.reason+=", setting "+ja+"U/hr. ";return u.setTempBasal(ja,30,i,He,t)}if(tt<Rt&&(He.minDelta=tt,He.expectedDelta=Rt,(Rt-tt>=2||Rt+-1*tt>=2)&&(He.manualBolusErrorString=tt>=0&&Rt>0?3:tt<0&&Rt<=0||tt<0&&Rt>=0?4:5),He.insulinForManualBolus=o((He.eventualBG-He.target_bg)/_t,2),!m||!Pt))return e.delta<tt?He.reason+="Eventual BG "+n(Ct,i)+" > "+n(nt,i)+" but Delta "+n(Qe,i)+" < Exp. Delta "+n(Rt,i):He.reason+="Eventual BG "+n(Ct,i)+" > "+n(nt,i)+" but Min. Delta "+tt.toFixed(2)+" < Exp. Delta "+n(Rt,i),t.duration>15&&r(Je,i)===r(t.rate,i)?(He.reason+=", temp "+t.rate+" ~ req "+Je+"U/hr. ",He):(He.reason+="; setting current basal of "+Je+" as temp. ",u.setTempBasal(Je,30,i,He,t));if(Math.min(Ct,Ut)<it&&(Ut<nt&&Ct>nt&&(He.manualBolusErrorString=6,He.insulinForManualBolus=o((He.eventualBG-He.target_bg)/_t,2),He.minPredBG=Ut),!m||!Pt))return He.reason+=n(Ct,i)+"-"+n(Ut,i)+" in range: no temp required",t.duration>15&&r(Je,i)===r(t.rate,i)?(He.reason+=", temp "+t.rate+" ~ req "+Je+"U/hr. ",He):(He.reason+="; setting current basal of "+Je+" as temp. ",u.setTempBasal(Je,30,i,He,t));if(Ct>=it&&(He.reason+="Eventual BG "+n(Ct,i)+" >= "+n(it,i)+", ",Ct>it&&(He.insulinForManualBolus=o((Ct-ot)/_t,2))),a.iob>lt)return He.reason+="IOB "+o(a.iob,2)+" > max_iob "+lt,t.duration>15&&r(Je,i)===r(t.rate,i)?(He.reason+=", temp "+t.rate+" ~ req "+Je+"U/hr. ",He):(He.reason+="; setting current basal of "+Je+" as temp. ",u.setTempBasal(Je,30,i,He,t));Fa=o((Math.min(Ut,Ct)-ot)/_t,2),C=o((Ct-ot)/_t,2),Fa>lt-a.iob?(console.error("SMB limited by maxIOB: "+lt-a.iob+" (. insulinReq: "+Fa+" U)"),He.reason+="max_iob "+lt+", ",Fa=lt-a.iob):console.error("SMB not limited by maxIOB ( insulinReq: "+Fa+" U)."),C>lt-a.iob?(console.error("Ev. Bolus limited by maxIOB: "+lt-a.iob+" (. insulinForManualBolus: "+C+" U)"),He.reason+="max_iob "+lt+", "):console.error("Ev. Bolus would not be limited by maxIOB ( insulinForManualBolus: "+C+" U)."),ja=r(ja=Je+2*Fa,i),Fa=o(Fa,3),He.insulinReq=Fa;var Wa=o((new Date(Ke).getTime()-a.lastBolusTime)/6e4,1);if(m&&Pt&&Ye>U){var ka=30;void 0!==i.maxSMBBasalMinutes&&(ka=i.maxSMBBasalMinutes);var La=30;void 0!==i.maxUAMSMBBasalMinutes&&(La=i.maxUAMSMBBasalMinutes),v.useOverride&&M&&G!==ka&&(console.error("SMB Max Minutes - setting overriden from "+ka+" to "+G),ka=G),v.useOverride&&M&&T!==La&&(console.error("UAM Max Minutes - setting overriden from "+La+" to "+T),La=T);var za=o(l.mealCOB/Z,3),Na=0;void 0===ka?(Na=o(i.current_basal*N*30/60,1),console.error("smbMinutesSetting undefined: defaulting to 30m"),Fa>Na&&console.error("SMB limited by maxBolus: "+Na+" ( "+Fa+" U)")):a.iob>za&&a.iob>0?(console.error("IOB"+a.iob+"> COB"+l.mealCOB+"; mealInsulinReq ="+za),La?(console.error("maxUAMSMBBasalMinutes: "+La+", profile.current_basal: "+i.current_basal*N),Na=o(i.current_basal*N*La/60,1)):(console.error("maxUAMSMBBasalMinutes undefined: defaulting to 30m"),Na=o(i.current_basal*N*30/60,1)),Fa>Na?console.error("SMB limited by maxUAMSMBBasalMinutes [ "+La+"m ]: "+Na+"U ( "+Fa+"U )"):console.error("SMB is not limited by maxUAMSMBBasalMinutes. ( insulinReq: "+Fa+"U )")):(console.error(".maxSMBBasalMinutes: "+ka+", profile.current_basal: "+i.current_basal*N),Fa>(Na=o(i.current_basal*ka/60,1))?console.error("SMB limited by maxSMBBasalMinutes: "+ka+"m ]: "+Na+"U ( insulinReq: "+Fa+"U )"):console.error("SMB is not limited by maxSMBBasalMinutes. ( insulinReq: "+Fa+"U )"));var Ha=i.bolus_increment,Za=1/Ha,$a=i.smb_delivery_ratio;$a>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o($a,2));var Ja=Math.min(Fa*$a,Na);Ja=Math.floor(Ja*Za)/Za,Ia=o(60*((ot-(Tt+ia)/2)/_t)/i.current_basal*N),Fa>0&&Ja<Ha&&(Ia=0);var Ka=0;Ia<=0?Ia=0:Ia>=30?(Ia=30*o(Ia/30),Ia=Math.min(60,Math.max(0,Ia))):(Ka=o(Je*Ia/30,2),Ia=30),He.reason+=" insulinReq "+Fa,Ja>=Na&&(He.reason+="; maxBolus "+Na),Ia>0&&(He.reason+="; setting "+Ia+"m low temp of "+Ka+"U/h"),He.reason+=". ";var Qa=3;i.SMBInterval&&(Qa=Math.min(10,Math.max(1,i.SMBInterval)));var Va=o(Qa-Wa,0),Xa=o(60*(Qa-Wa),0)%60;if(console.error("naive_eventualBG "+Tt+","+Ia+"m "+Ka+"U/h temp needed; last bolus "+Wa+"m ago; maxBolus: "+Na),Wa>Qa?Ja>0&&(He.units=Ja,He.reason+="Microbolusing "+Ja+"U. "):He.reason+="Waiting "+Va+"m "+Xa+"s to microbolus again. ",Ia>0)return He.rate=Ka,He.duration=Ia,He}var Ya=u.getMaxSafeBasal(i);return ja>Ya&&(He.reason+="adj. req. rate: "+ja+" to maxSafeBasal: "+o(Ya,2)+", ",ja=r(Ya,i)),(Pa=t.duration*(t.rate-Je)/60)>=2*Fa?(He.reason+=t.duration+"m@"+t.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+ja+"U/hr. ",u.setTempBasal(ja,30,i,He,t)):void 0===t.duration||0===t.duration?(He.reason+="no temp, setting "+ja+"U/hr. ",u.setTempBasal(ja,30,i,He,t)):t.duration>5&&r(ja,i)<=r(t.rate,i)?(He.reason+="temp "+t.rate+" >~ req "+ja+"U/hr. ",He):(He.reason+="temp "+t.rate+"<"+ja+"U/hr. ",u.setTempBasal(ja,30,i,He,t))}},6880:(e,t,a)=>{var r=a(6654);e.exports=function(e,t){var a=20;void 0!==t&&"string"==typeof t.model&&(r(t.model,"54")||r(t.model,"23"))&&(a=40);return e<1?Math.round(e*a)/a:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,t,a)=>{var r=a(5639).Symbol;e.exports=r},9932:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length,o=Array(r);++a<r;)o[a]=t(e[a],a,e);return o}},9750:e=>{e.exports=function(e,t,a){return e==e&&(void 0!==a&&(e=e<=a?e:a),void 0!==t&&(e=e>=t?e:t)),e}},4239:(e,t,a)=>{var r=a(2705),o=a(9607),n=a(2333),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},531:(e,t,a)=>{var r=a(2705),o=a(9932),n=a(1469),i=a(3448),s=r?r.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(n(t))return o(t,e)+"";if(i(t))return l?l.call(t):"";var a=t+"";return"0"==a&&1/t==-Infinity?"-0":a}},7561:(e,t,a)=>{var r=a(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(o,""):e}},1957:(e,t,a)=>{var r="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=r},9607:(e,t,a)=>{var r=a(2705),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=n.call(e,s),a=e[s];try{e[s]=void 0;var r=!0}catch(e){}var o=i.call(e);return r&&(t?e[s]=a:delete e[s]),o}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:(e,t,a)=>{var r=a(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=r||o||Function("return this")();e.exports=n},7990:e=>{var t=/\s/;e.exports=function(e){for(var a=e.length;a--&&t.test(e.charAt(a)););return a}},6654:(e,t,a)=>{var r=a(9750),o=a(531),n=a(554),i=a(9833);e.exports=function(e,t,a){e=i(e),t=o(t);var s=e.length,l=a=void 0===a?s:r(n(a),0,s);return(a-=t.length)>=0&&e.slice(a,l)==t}},1469:e=>{var t=Array.isArray;e.exports=t},3218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,t,a)=>{var r=a(4239),o=a(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},8601:(e,t,a)=>{var r=a(4841),o=1/0;e.exports=function(e){return e?(e=r(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,t,a)=>{var r=a(8601);e.exports=function(e){var t=r(e),a=t%1;return t==t?a?t-a:t:0}},4841:(e,t,a)=>{var r=a(7561),o=a(3218),n=a(3448),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var a=s.test(e);return a||l.test(e)?u(e.slice(2),a?2:8):i.test(e)?NaN:+e}},9833:(e,t,a)=>{var r=a(531);e.exports=function(e){return null==e?"":r(e)}}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var r=a(5546);freeaps_determineBasal=r})();