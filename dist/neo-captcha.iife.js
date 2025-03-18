var NeoCAPTCHA=function($){"use strict";const ce=`
:root {
    --neo-captcha-accent: #009696;
    --neo-captcha-bg: #ddd;
    --neo-captcha-bg2: #eee;
    --neo-captcha-fg: #111;
    --neo-captcha-dark: #111;
    --neo-captcha-light: #eee;
}

@media (prefers-color-scheme: dark) {
    :root {
        --neo-captcha-bg: #111;
        --neo-captcha-bg2: #222;
        --neo-captcha-fg: #ddd;
    }
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
    width: 18em;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
    text-align: start;
    padding: 0 1em 0 1em;
    margin-bottom: 0.5em;
}

.neo-captcha-how-to-caption {
    font-size: 1.2em;
    font-weight: bold;
    cursor: pointer;
    padding: 0.2em 0 0.5em 0;
}

.neo-captcha-how-to-text {
    padding-bottom: 1em;
}

.neo-captcha-wide-icon {
    width: 8em;
    text-align: end;
    transform: translateY(0.2em);
}

.neo-captcha-steps-numbers {
    text-align: start;
    vertical-align: top;
    font-weight: bold;
    color: var(--neo-captcha-accent);
}
`;function se(){if(document.getElementById("neo-captcha-style"))return;const v=document.createElement("style");v.id="neo-captcha-style",v.textContent=ce,document.head.appendChild(v)}function le(){if(document.getElementById("neo-captcha-material-icons"))return;const v=document.createElement("link");v.id="neo-captcha-material-icons",v.rel="stylesheet",v.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(v)}function J(v,b,E){le(),se(),v.innerHTML=`
    <div class="neo-captcha-box">
        <div class="neo-captcha-title">
            <a href="https://neo-captcha.com" target="_blank" rel="noopener">
                <picture class="neo-captcha-picture">
                    <source srcset="https://neo-captcha.com/assets/logo-dark.png"
                            media="(prefers-color-scheme: dark)">
                    <source srcset="https://neo-captcha.com/assets/logo.png"
                            media="(prefers-color-scheme: light)">
    
                    <img class="neo-captcha-logo" title="Visit neo-captcha.com"
                         src="https://neo-captcha.com/assets/logo.png"
                         alt="logo">
                </picture>
            </a>
            <span class="neo-captcha-caption">NeoCAPTCHA</span>
        </div>
        <div id="howTo" class="neo-captcha-how-to">
            <div id="howToCaption" class="neo-captcha-how-to-caption">How-To:
                <span id="howToIcon" class="neo-captcha-wide-icon material-icons">expand_less</span>
            </div>
            <table id="howToText" class="neo-captcha-how-to-text">
                <tr>
                    <td class="neo-captcha-steps-numbers">1.</td>
                    <td>Hit ▶ Play</td>
                </tr>
                <tr>
                    <td class="neo-captcha-steps-numbers">2.</td>
                    <td>Wait for the signal – stay alert!</td>
                </tr>
                <tr>
                    <td class="neo-captcha-steps-numbers">3.</td>
                    <td>When it triggers, tap to uncover the CAPTCHA</td>
                </tr>
                <tr>
                    <td class="neo-captcha-steps-numbers">4.</td>
                    <td>Find the missing corner and place your guess</td>
                </tr>
            </table>
        </div>
        <button id="start" class="neo-captcha-start-button">
            <span class="neo-captcha-icon-dark material-icons">play_arrow</span>
        </button>
        <div id="wrapper" class="neo-captcha-wrapper">
            <div id="container" class="neo-captcha-container">
                <div class="neo-captcha-icon-div sync">
                    <span class="neo-captcha-icon material-icons">sync</span>
                </div>
                <img id="image" class="neo-captcha-image" alt="background"/>
                <canvas id="captchaCanvas" class="neo-captcha-main-canvas"></canvas>
                <div id="startOverlay" class="neo-captcha-icon-div">
                    <div id="overlayBg" class="neo-captcha-overlay-bg"></div>
                    <span id="signalIcon" class="neo-captcha-icon material-icons">hearing</span>
                    <span class="neo-captcha-icon material-icons">trending_flat</span>
                    <span class="neo-captcha-icon material-icons">touch_app</span>
                </div>
            </div>
            <div>
                <canvas class="neo-captcha-time" id="timeCanvas"></canvas>
            </div>
            <button id="submit" class="neo-captcha-button" disabled>
                <span class="neo-captcha-icon-dark material-icons">check</span>
            </button>
        </div>
    </div>
    `;const re=(b==null?void 0:b.showHowTo)||!1,de=(b==null?void 0:b.expandHowTo)||!1,V="0.2.5",q="https://neo-captcha.com/api/v1",C=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),T=document.getElementById("startOverlay"),S=document.getElementById("submit"),H=document.getElementById("start"),i=document.getElementById("captchaCanvas"),e=i.getContext("2d"),g=document.getElementById("timeCanvas"),p=g.getContext("2d");if(!e||!p)throw new Error("Canvas context could not be initialized.");const he=(b==null?void 0:b.minDifficulty)||"easy",M=6e3;let m=[255,0,0],k=!1,f=[],h=0,P=0,j=0,w=0,u=!1,I=!1,_="",O=0,N=0,L,A,U=re;if(U){let n=de;const o=document.getElementById("howToCaption"),a=document.getElementById("howToText"),t=document.getElementById("howToIcon");a.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more",o.addEventListener("click",()=>{n=!n,a.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more"})}else{const n=document.getElementById("howTo");n.style.display="none"}const R=document.getElementById("overlayBg"),K="#f406",pe="#0f4a";C?R.style.background=K:R.style.background="#000";const me=document.getElementById("signalIcon");me.innerText=C?"visibility":"hearing",H.addEventListener("click",Q);async function Q(){console.log("version: "+V),console.log("userAgent: "+navigator.userAgent);const n=document.getElementById("howToText");if(U&&n.style.display=="block"){const c=document.getElementById("howToText"),y=document.getElementById("howToIcon");c.style.display="none",y.innerText="expand_more"}const o=document.getElementById("wrapper");o.style.display="flex",H.style.display="none";const a={challenge:L,hmac:A,userAgent:navigator.userAgent,mobile:C,version:V,minDifficulty:he},l=await(await fetch(q+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(console.log(l),l.img){const c=document.getElementById("image");c.style.display="inline-block",T.style.display="flex",_=`data:image/png;base64,${l.img}`,O=l.pointSize,N=l.thumbSize,m=l.color,L=l.challenge,A=l.hmac;const y=document.getElementById("container");if(y.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,j=Date.now(),setTimeout(()=>ue(),l.suspense)}}function ue(){C?(R.style.background=pe,w>0?f.push({action:"react",time:w-Date.now()}):w=Date.now()):ge()}const x=new AudioContext,ge=()=>{x.state==="suspended"?x.resume().then(()=>Z()):Z()},Z=()=>{Y(285,.12),Y(852,.12,.12),Y(528,.12,.24),w>0?f.push({action:"react",time:w-Date.now()}):w=Date.now()};function Y(n,o,a=0){let t=x.createOscillator(),l=x.createGain();t.type="sine",t.frequency.value=n,l.gain.value=.1,t.connect(l),l.connect(x.destination),t.start(x.currentTime+a),t.stop(x.currentTime+a+o)}function ee(){h==0&&(w>0?f.push({action:"react",time:Date.now()-w}):w=Date.now())}T.addEventListener("mousedown",ee),T.addEventListener("touchstart",ee,{passive:!1}),T.addEventListener("touchmove",()=>{},{passive:!1});function F(){if(w>0&&h==0){f.push({action:"start",time:Date.now()-j}),u=!0;const n=document.getElementById("image");if(n.src=_,fe(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),T.style.display="none",C&&(I=!0)}}T.addEventListener("mouseup",F),T.addEventListener("touchend",F),T.addEventListener("touchcancel",F);function fe(){h=Date.now(),te()}function te(){if(!p)throw new Error("Canvas context could not be initialized.");const n=Date.now()-h,o=Math.max(M-n,0),a=o/M*g.width;p.clearRect(0,0,g.width,g.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,p.fillRect(0,0,a,g.height),o>0&&u?requestAnimationFrame(te):o<=0&&u?(console.log("Time's up!"),P=h+M,ie()):(p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,g.width,g.height))}function ne(n){if(n.preventDefault(),!I&&h>0){const o=i.getBoundingClientRect();let{x:a,y:t}=G(n,o);f.push({action:"down",enabled:u,x:a,y:t,time:Date.now()-h}),u&&(k=!0,oe(a,t))}}i.addEventListener("mousedown",ne),i.addEventListener("touchstart",ne,{passive:!1});function ae(n){if(n.preventDefault(),I)return;const o=i.getBoundingClientRect();let{x:a,y:t}=G(n,o);h>0&&f.push({action:"move",enabled:u,drawing:k,x:a,y:t,time:Date.now()-h}),u&&k&&oe(a,t)}i.addEventListener("mousemove",ae),i.addEventListener("touchmove",ae,{passive:!1});function X(n){if(n.preventDefault(),I){I=!1;return}if(!k)return;const o=i.getBoundingClientRect();let{x:a,y:t}=G(n,o);if(h>0&&f.push({action:"up",enabled:u,x:a,y:t,time:Date.now()-h}),h>=0&&u){if(k=!1,f.push({action:"point",x:a,y:t,time:Date.now()-h}),S.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(a,t,O/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,e.fill()}}i.addEventListener("mouseup",X),i.addEventListener("touchend",X),i.addEventListener("touchcancel",X);function oe(n,o){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(n-1,o-1,N/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]}, 0.2)`,e.fill()}function G(n,o){let a,t;return n instanceof MouseEvent?(a=n.clientX-o.left,t=n.clientY-o.top):(a=n.changedTouches[0].clientX-o.left,t=n.changedTouches[0].clientY-o.top),{x:a,y:t}}S==null||S.addEventListener("click",ie);async function ie(){if(!u)return;if(u=!1,S.disabled=!0,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,g.width,g.height),P===0&&(P=Date.now());const n=P-h;f.push({action:"end",time:n});const o={challenge:L,hmac:A,activity:f},a=await fetch(q+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});let t=!1,l=!1;try{const s=await a.json();t=s.valid,l=s.retry,l&&(L=s.challenge,A=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let y=i.width/2,D=i.height/2;const r=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=y+c/8,d=D+c/4;z(r,s,d),e.lineWidth=c+17,z(r,s,d),e.lineWidth=c+14,z(r,s,d),e.lineWidth=c+11,z(r,s,d),e.lineWidth=c+8,z(r,s,d),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,z(r,y,D)}else if(l){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=y+c/8,d=D+c/4;W(r,s,d),e.lineWidth=c+17,W(r,s,d),e.lineWidth=c+14,W(r,s,d),e.lineWidth=c+11,W(r,s,d),e.lineWidth=c+8,W(r,s,d),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,W(r,y,D)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=y+c/8,d=D+c/4;B(r,s,d),e.lineWidth=c+17,B(r,s,d),e.lineWidth=c+14,B(r,s,d),e.lineWidth=c+11,B(r,s,d),e.lineWidth=c+8,B(r,s,d),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,B(r,y,D)}t&&E&&E.onSuccess?E.onSuccess():l?setTimeout(()=>{we(),Q()},500):E&&E.onFailure&&E.onFailure()}function z(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t/2,a+t),e.lineTo(o-t-t/2,a),e.moveTo(o-t/2,a+t),e.lineTo(o+n-t/2,a-t),e.stroke()}function B(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t,a-t),e.lineTo(o+t,a+t),e.moveTo(o+t,a-t),e.lineTo(o-t,a+t),e.stroke()}function W(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t,a),e.lineTo(o-t+1,a),e.moveTo(o,a),e.lineTo(o+1,a),e.moveTo(o+t,a),e.lineTo(o+t+1,a),e.stroke()}function we(){k=!1,f=[],h=0,P=0,j=0,w=0,u=!1,S.disabled=!0,I=!1,_="",O=0,N=0;const n=document.getElementById("wrapper");n.style.display="none",H.style.display="block",p&&p.clearRect(0,0,g.width,g.height),C&&(R.style.background=K)}}return window.NeoCAPTCHA={render:J},$.renderCaptcha=J,Object.defineProperty($,Symbol.toStringTag,{value:"Module"}),$}({});
