var NeoCAPTCHA=function(j){"use strict";const he=`
:root {
    --neo-captcha-accent: #009696;
    --neo-captcha-dark: #111;
    --neo-captcha-light: #eee;

    --neo-captcha-bg-light: #C8DCDCFF;
    --neo-captcha-bg2-light: #eee;
    --neo-captcha-fg-light: #111;

    --neo-captcha-bg-dark: #111;
    --neo-captcha-bg2-dark: #222;
    --neo-captcha-fg-dark: #ddd;
}

.neo-captcha-theme-light {
    --neo-captcha-bg: var(--neo-captcha-bg-light);
    --neo-captcha-bg2: var(--neo-captcha-bg2-light);
    --neo-captcha-fg: var(--neo-captcha-fg-light);
}

.neo-captcha-theme-dark {
    --neo-captcha-bg: var(--neo-captcha-bg-dark);
    --neo-captcha-bg2: var(--neo-captcha-bg2-dark);
    --neo-captcha-fg: var(--neo-captcha-fg-dark);
}

.neo-captcha-box {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
    background: var(--neo-captcha-bg);
    color: var(--neo-captcha-fg);
    padding: 1em;
}

.neo-captcha-logo {
    margin: 0 1em 0 0;
    width: 3.5em;
    height: 3.5em;
    cursor: pointer;
}

.neo-captcha-caption {
    font-size: 1.8em;
    font-weight: bold;
    color: var(--neo-captcha-fg);
    margin: 0 0 0.2em 0;
}

.neo-captcha-main-canvas {
    width: 20em;
    height: 20em;
    border: 1px solid var(--neo-captcha-fg);
    cursor: crosshair;
    z-index: 2;
    position: absolute;
    touch-action: none;
}

.neo-captcha-time {
    width: 20em;
    height: 1em;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
}

.neo-captcha-image {
    width: 20em;
    height: 20em;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 1;
    position: absolute;
    display: none;
}

.neo-captcha-container {
    width: 20em;
    height: 20em;
    position: relative;
    display: flex;
}

.neo-captcha-button {
    width: 20em;
    height: 4em;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;

    &:disabled {
        opacity: 0.66;
    }
}

.neo-captcha-start-button {
    width: 20rem;
    height: 15rem;
    font-size: 1.5em;
    font-weight: bold;
    cursor: pointer;
}

.neo-captcha-icon-div {
    width: 20em;
    height: 20em;
    position: absolute;
    z-index: 3;
    display: none;
    cursor: pointer;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &.sync {
        display: flex;
        cursor: auto;
        background: var(--neo-captcha-bg2);
        transform: translateX(1px) translateY(1px);
        z-index: 0;
        opacity: 50%;
    }
}

.neo-captcha-overlay-bg {
    width: 20em;
    height: 20em;
    position: absolute;
    z-index: -1;
    transform: translateY(1px) translateX(1px);
}

.neo-captcha-icon {
    font-size: 3em;
    color: var(--neo-captcha-light);
}

.neo-captcha-icon-dark {
    color: var(--neo-captcha-dark);
    font-size: 3em;
}

.neo-captcha-wrapper {
    display: none;
    flex-direction: column;
}

.neo-captcha-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
    margin: 0 0 0.5em 0;
}

.neo-captcha-how-to {
    width: 20em;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
    text-align: start;
    margin-bottom: 0.5em;
}

.neo-captcha-how-to-caption {
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5em 1em 0.5em 1em;
    background: color-mix(in srgb, var(--neo-captcha-fg) 10%, transparent);
    display: flex;
    flex-direction: row;
}

.neo-captcha-how-to-text {
}

.neo-captcha-how-to-table {
    padding: 0 1em 0.5em 1em;
    background: color-mix(in srgb, var(--neo-captcha-fg) 10%, transparent);
}

.neo-captcha-how-to-footer {
    font-size: 1.1em;
    padding: 0.5em 1em 0.5em 1em;
    display: flex;
    flex-direction: column;
}

.neo-captcha-how-to-footer-mode {
    color: var(--neo-captcha-accent);
    font-weight: bold;
}

.neo-captcha-wide-icon {
    flex: 1;
    text-align: end;
    transform: translateY(0.1em);
}

.neo-captcha-steps-numbers {
    text-align: start;
    vertical-align: top;
    font-weight: bold;
    color: var(--neo-captcha-accent);
}
`;function pe(){if(document.getElementById("neo-captcha-style"))return;const y=document.createElement("style");y.id="neo-captcha-style",y.textContent=he,document.head.appendChild(y)}function me(){if(document.getElementById("neo-captcha-material-icons"))return;const y=document.createElement("link");y.id="neo-captcha-material-icons",y.rel="stylesheet",y.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(y)}function K(y,l,k){var de;me(),pe(),y.innerHTML=`
    <div id="neoCaptchaRoot" class="neo-captcha-box">
        <div class="neo-captcha-title">
            <a href="https://neo-captcha.com" target="_blank" rel="noopener">
                <picture class="neo-captcha-picture">
                    <img id="neoCaptchaWidgetLogo" class="neo-captcha-logo" title="Visit neo-captcha.com"
                         src="https://neo-captcha.com/assets/logo.png"
                         alt="logo">
                </picture>
            </a>
            <span class="neo-captcha-caption">NeoCAPTCHA</span>
        </div>
        <div id="neoCaptcha-howTo" class="neo-captcha-how-to">
            <div id="neoCaptcha-howToCaption" class="neo-captcha-how-to-caption">
                <span id="neoCaptcha-howToTitle"></span>
                <span id="neoCaptcha-howToIcon" class="neo-captcha-wide-icon material-icons">expand_less</span>
            </div>
            <div class="neo-captcha-how-to-text">
                <table id="neoCaptcha-howToText" class="neo-captcha-how-to-table">
                    <tr>
                        <td class="neo-captcha-steps-numbers">1.</td>
                        <td id="neoCaptcha-step_1"></td>
                    </tr>
                    <tr>
                        <td class="neo-captcha-steps-numbers">2.</td>
                        <td id="neoCaptcha-step_2"></td>
                    </tr>
                </table>
                <div class="neo-captcha-how-to-footer">
                    <span id="neoCaptcha-mode" class="neo-captcha-how-to-footer-mode"></span>
                    <span id="neoCaptcha-modeText"></span>
                </div>
            </div>
        </div>
        <button id="neoCaptcha-start" class="neo-captcha-start-button">
            <span class="neo-captcha-icon-dark material-icons">play_arrow</span>
        </button>
        <div id="neoCaptcha-wrapper" class="neo-captcha-wrapper">
            <div id="neoCaptcha-container" class="neo-captcha-container">
                <div class="neo-captcha-icon-div sync">
                    <span class="neo-captcha-icon material-icons">sync</span>
                </div>
                <img id="neoCaptcha-image" class="neo-captcha-image" alt="background"/>
                <canvas id="neoCaptcha-captchaCanvas" class="neo-captcha-main-canvas"></canvas>
                <div id="neoCaptcha-startOverlay" class="neo-captcha-icon-div">
                    <div id="neoCaptcha-overlayBg" class="neo-captcha-overlay-bg"></div>
                    <span id="neoCaptcha-signalIcon" class="neo-captcha-icon material-icons">hearing</span>
                </div>
            </div>
            <div>
                <canvas class="neo-captcha-time" id="neoCaptcha-timeCanvas"></canvas>
            </div>
            <button id="neoCaptcha-submit" class="neo-captcha-button" disabled>
                <span class="neo-captcha-icon-dark material-icons">check</span>
            </button>
        </div>
    </div>
    `;const Q="1.0.1",Z="https://neo-captcha.com/api/v1",x=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),C=document.getElementById("neoCaptcha-startOverlay"),I=document.getElementById("neoCaptcha-submit"),N=document.getElementById("neoCaptcha-start"),i=document.getElementById("neoCaptcha-captchaCanvas"),e=i.getContext("2d"),f=document.getElementById("neoCaptcha-timeCanvas"),p=f.getContext("2d");if(!e||!p)throw new Error("Canvas context could not be initialized.");const ge=(de=window.matchMedia)==null?void 0:de.call(window,"(prefers-color-scheme: dark)").matches,ee=(l==null?void 0:l.theme)==="dark"||(l==null?void 0:l.theme)==="light"?l.theme:ge?"dark":"light";document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${ee}`),document.getElementById("neoCaptchaWidgetLogo").src=ee==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png";const te="#f406",ue="#0f4a";let T=(navigator.language||navigator.languages[0]).split("-")[0];T=(l==null?void 0:l.lang)||T;const g={en:{howto:"How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_s:"Tap when you <b>hear a signal!</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!"},de:{howto:"Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_s:"Tippe beim <b>Signalton!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(g[T]||g.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(g[T]||g.en).step_1,x?document.getElementById("neoCaptcha-step_2").innerHTML=(g[T]||g.en).step_2:document.getElementById("neoCaptcha-step_2").innerHTML=(g[T]||g.en).step_2_s,document.getElementById("neoCaptcha-mode").innerHTML=(g[T]||g.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(g[T]||g.en).mode_1_text;const fe=(l==null?void 0:l.minDifficulty)||"easy";let P=6e3,m=[255,0,0],S=!1,w=[],h=0,R=0,O=0,v=0,u=!1,_=!1,F="",G=0,Y=0,A,H,we=(l==null?void 0:l.showHowTo)||!1,B=(l==null?void 0:l.expandHowTo)||!1;if(we){const o=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText"),n=document.getElementById("neoCaptcha-howToIcon");a.style.display=B?"block":"none",n.innerText=B?"expand_less":"expand_more",o.addEventListener("click",()=>{B=!B,a.style.display=B?"block":"none",n.innerText=B?"expand_less":"expand_more"})}else{const o=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText");o.style.display="none",a.style.display="none"}const $=document.getElementById("neoCaptcha-overlayBg");x?$.style.background=te:$.style.background="#000";const V=document.getElementById("neoCaptcha-signalIcon");V.innerText=x?"do_not_touch":"hearing",N.addEventListener("click",ae);async function ae(){console.log("version: "+Q),console.log("userAgent: "+navigator.userAgent);const o=document.getElementById("neoCaptcha-wrapper");o.style.display="flex",N.style.display="none";const a={challenge:A,hmac:H,userAgent:navigator.userAgent,mobile:x,version:Q,minDifficulty:fe},t=await(await fetch(Z+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(console.log(t),t.img){const b=document.getElementById("neoCaptcha-image");b.style.display="inline-block",C.style.display="flex",F=`data:image/png;base64,${t.img}`,G=t.pointSize,Y=t.thumbSize,m=t.color,A=t.challenge,H=t.hmac,P=t.totalTime||P;const c=document.getElementById("neoCaptcha-container");if(c.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,O=Date.now(),setTimeout(()=>ve(),t.suspense)}}function ve(){x?($.style.background=ue,V.innerText="touch_app",v>0?w.push({action:"react",time:v-Date.now()}):v=Date.now()):ye()}const E=new AudioContext,ye=()=>{E.state==="suspended"?E.resume().then(()=>ne()):ne()},ne=()=>{X(285,.12),X(852,.12,.12),X(528,.12,.24),v>0?w.push({action:"react",time:v-Date.now()}):v=Date.now()};function X(o,a,n=0){let t=E.createOscillator(),b=E.createGain();t.type="sine",t.frequency.value=o,b.gain.value=.1,t.connect(b),b.connect(E.destination),t.start(E.currentTime+n),t.stop(E.currentTime+n+a)}function oe(){h==0&&(v>0?w.push({action:"react",time:Date.now()-v}):v=Date.now())}C.addEventListener("mousedown",oe),C.addEventListener("touchstart",oe,{passive:!1}),C.addEventListener("touchmove",()=>{},{passive:!1});function q(){if(v>0&&h==0){w.push({action:"start",time:Date.now()-O}),u=!0;const o=document.getElementById("neoCaptcha-image");if(o.src=F,be(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),C.style.display="none",x&&(_=!0)}}C.addEventListener("mouseup",q),C.addEventListener("touchend",q),C.addEventListener("touchcancel",q);function be(){h=Date.now(),ie()}function ie(){if(!p)throw new Error("Canvas context could not be initialized.");const o=Date.now()-h,a=Math.max(P-o,0),n=a/P*f.width;p.clearRect(0,0,f.width,f.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,p.fillRect(0,0,n,f.height),a>0&&u?requestAnimationFrame(ie):a<=0&&u?(console.log("Time's up!"),R=h+P,re()):(p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,f.width,f.height))}function ce(o){if(o.preventDefault(),!_&&h>0){const a=i.getBoundingClientRect();let{x:n,y:t}=U(o,a);w.push({action:"down",enabled:u,x:n,y:t,time:Date.now()-h}),u&&(S=!0,le(n,t))}}i.addEventListener("mousedown",ce),i.addEventListener("touchstart",ce,{passive:!1});function se(o){if(o.preventDefault(),_)return;const a=i.getBoundingClientRect();let{x:n,y:t}=U(o,a);h>0&&w.push({action:"move",enabled:u,drawing:S,x:n,y:t,time:Date.now()-h}),u&&S&&le(n,t)}i.addEventListener("mousemove",se),i.addEventListener("touchmove",se,{passive:!1});function J(o){if(o.preventDefault(),_){_=!1;return}if(!S)return;const a=i.getBoundingClientRect();let{x:n,y:t}=U(o,a);if(h>0&&w.push({action:"up",enabled:u,x:n,y:t,time:Date.now()-h}),h>=0&&u){if(S=!1,w.push({action:"point",x:n,y:t,time:Date.now()-h}),I.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(n,t,G/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,e.fill()}}i.addEventListener("mouseup",J),i.addEventListener("touchend",J),i.addEventListener("touchcancel",J);function le(o,a){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(o-1,a-1,Y/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]}, 0.2)`,e.fill()}function U(o,a){let n,t;return o instanceof MouseEvent?(n=o.clientX-a.left,t=o.clientY-a.top):(n=o.changedTouches[0].clientX-a.left,t=o.changedTouches[0].clientY-a.top),{x:n,y:t}}I==null||I.addEventListener("click",re);async function re(){if(!u)return;if(u=!1,I.disabled=!0,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,f.width,f.height),R===0&&(R=Date.now());const o=R-h;w.push({action:"end",time:o});const a={challenge:A,hmac:H,activity:w},n=await fetch(Z+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});let t=!1,b=!1;try{const s=await n.json();t=s.valid,b=s.retry,b&&(A=s.challenge,H=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let W=i.width/2,M=i.height/2;const r=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=W+c/8,d=M+c/4;z(r,s,d),e.lineWidth=c+17,z(r,s,d),e.lineWidth=c+14,z(r,s,d),e.lineWidth=c+11,z(r,s,d),e.lineWidth=c+8,z(r,s,d),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,z(r,W,M)}else if(b){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=W+c/8,d=M+c/4;D(r,s,d),e.lineWidth=c+17,D(r,s,d),e.lineWidth=c+14,D(r,s,d),e.lineWidth=c+11,D(r,s,d),e.lineWidth=c+8,D(r,s,d),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,D(r,W,M)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=W+c/8,d=M+c/4;L(r,s,d),e.lineWidth=c+17,L(r,s,d),e.lineWidth=c+14,L(r,s,d),e.lineWidth=c+11,L(r,s,d),e.lineWidth=c+8,L(r,s,d),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,L(r,W,M)}t&&k&&k.onSuccess?k.onSuccess():b?setTimeout(()=>{Ce(),ae()},500):k&&k.onFailure&&k.onFailure()}function z(o,a,n){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(a-t/2,n+t),e.lineTo(a-t-t/2,n),e.moveTo(a-t/2,n+t),e.lineTo(a+o-t/2,n-t),e.stroke()}function L(o,a,n){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(a-t,n-t),e.lineTo(a+t,n+t),e.moveTo(a+t,n-t),e.lineTo(a-t,n+t),e.stroke()}function D(o,a,n){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(a-t,n),e.lineTo(a-t+1,n),e.moveTo(a,n),e.lineTo(a+1,n),e.moveTo(a+t,n),e.lineTo(a+t+1,n),e.stroke()}function Ce(){S=!1,w=[],h=0,R=0,O=0,v=0,u=!1,I.disabled=!0,_=!1,F="",G=0,Y=0;const o=document.getElementById("neoCaptcha-wrapper");o.style.display="none",N.style.display="block",p&&p.clearRect(0,0,f.width,f.height),x&&($.style.background=te,V.innerText="do_not_touch")}}return window.NeoCAPTCHA={render:K},j.renderCaptcha=K,Object.defineProperty(j,Symbol.toStringTag,{value:"Module"}),j}({});
