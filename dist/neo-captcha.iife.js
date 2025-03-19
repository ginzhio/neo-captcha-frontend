var NeoCAPTCHA=function(H){"use strict";const se=`
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
`;function le(){if(document.getElementById("neo-captcha-style"))return;const v=document.createElement("style");v.id="neo-captcha-style",v.textContent=se,document.head.appendChild(v)}function re(){if(document.getElementById("neo-captcha-material-icons"))return;const v=document.createElement("link");v.id="neo-captcha-material-icons",v.rel="stylesheet",v.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(v)}function V(v,y,E){re(),le(),v.innerHTML=`
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
    `;const de=(y==null?void 0:y.showHowTo)||!1,he=(y==null?void 0:y.expandHowTo)||!1,q="0.3.0",U="https://neo-captcha.com/api/v1",C=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),b=document.getElementById("startOverlay"),S=document.getElementById("submit"),M=document.getElementById("start"),i=document.getElementById("captchaCanvas"),e=i.getContext("2d"),g=document.getElementById("timeCanvas"),h=g.getContext("2d");if(!e||!h)throw new Error("Canvas context could not be initialized.");const pe=(y==null?void 0:y.minDifficulty)||"easy",j=6e3;let p=[255,0,0],k=!1,f=[],d=0,L=0,_=0,w=0,m=!1,I=!1,O="",N=0,Y=0,A,R,K=de,T=he;if(K){const o=document.getElementById("howToCaption"),n=document.getElementById("howToText"),a=document.getElementById("howToIcon");n.style.display=T?"block":"none",a.innerText=T?"expand_less":"expand_more",o.addEventListener("click",()=>{T=!T,n.style.display=T?"block":"none",a.innerText=T?"expand_less":"expand_more"})}else{const o=document.getElementById("howTo");o.style.display="none"}const $=document.getElementById("overlayBg"),Q="#f406",me="#0f4a";C?$.style.background=Q:$.style.background="#000";const ue=document.getElementById("signalIcon");ue.innerText=C?"visibility":"hearing",M.addEventListener("click",Z);async function Z(){if(console.log("version: "+q),console.log("userAgent: "+navigator.userAgent),K&&T){T=!1;const u=document.getElementById("howToText"),c=document.getElementById("howToIcon");u.style.display="none",c.innerText="expand_more"}const o=document.getElementById("wrapper");o.style.display="flex",M.style.display="none";const n={challenge:A,hmac:R,userAgent:navigator.userAgent,mobile:C,version:q,minDifficulty:pe},t=await(await fetch(U+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const u=document.getElementById("image");u.style.display="inline-block",b.style.display="flex",O=`data:image/png;base64,${t.img}`,N=t.pointSize,Y=t.thumbSize,p=t.color,A=t.challenge,R=t.hmac;const c=document.getElementById("container");if(c.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!h)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),h.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,_=Date.now(),setTimeout(()=>ge(),t.suspense)}}function ge(){C?($.style.background=me,w>0?f.push({action:"react",time:w-Date.now()}):w=Date.now()):fe()}const x=new AudioContext,fe=()=>{x.state==="suspended"?x.resume().then(()=>ee()):ee()},ee=()=>{F(285,.12),F(852,.12,.12),F(528,.12,.24),w>0?f.push({action:"react",time:w-Date.now()}):w=Date.now()};function F(o,n,a=0){let t=x.createOscillator(),u=x.createGain();t.type="sine",t.frequency.value=o,u.gain.value=.1,t.connect(u),u.connect(x.destination),t.start(x.currentTime+a),t.stop(x.currentTime+a+n)}function te(){d==0&&(w>0?f.push({action:"react",time:Date.now()-w}):w=Date.now())}b.addEventListener("mousedown",te),b.addEventListener("touchstart",te,{passive:!1}),b.addEventListener("touchmove",()=>{},{passive:!1});function X(){if(w>0&&d==0){f.push({action:"start",time:Date.now()-_}),m=!0;const o=document.getElementById("image");if(o.src=O,we(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),b.style.display="none",C&&(I=!0)}}b.addEventListener("mouseup",X),b.addEventListener("touchend",X),b.addEventListener("touchcancel",X);function we(){d=Date.now(),ne()}function ne(){if(!h)throw new Error("Canvas context could not be initialized.");const o=Date.now()-d,n=Math.max(j-o,0),a=n/j*g.width;h.clearRect(0,0,g.width,g.height),h.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,h.fillRect(0,0,a,g.height),n>0&&m?requestAnimationFrame(ne):n<=0&&m?(console.log("Time's up!"),L=d+j,ce()):(h.fillStyle="rgba(255, 255, 255, 0.8)",h.fillRect(0,0,g.width,g.height))}function ae(o){if(o.preventDefault(),!I&&d>0){const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);f.push({action:"down",enabled:m,x:a,y:t,time:Date.now()-d}),m&&(k=!0,ie(a,t))}}i.addEventListener("mousedown",ae),i.addEventListener("touchstart",ae,{passive:!1});function oe(o){if(o.preventDefault(),I)return;const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);d>0&&f.push({action:"move",enabled:m,drawing:k,x:a,y:t,time:Date.now()-d}),m&&k&&ie(a,t)}i.addEventListener("mousemove",oe),i.addEventListener("touchmove",oe,{passive:!1});function G(o){if(o.preventDefault(),I){I=!1;return}if(!k)return;const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);if(d>0&&f.push({action:"up",enabled:m,x:a,y:t,time:Date.now()-d}),d>=0&&m){if(k=!1,f.push({action:"point",x:a,y:t,time:Date.now()-d}),S.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(a,t,N/2,0,Math.PI*2),e.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,e.fill()}}i.addEventListener("mouseup",G),i.addEventListener("touchend",G),i.addEventListener("touchcancel",G);function ie(o,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(o-1,n-1,Y/2,0,Math.PI*2),e.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]}, 0.2)`,e.fill()}function J(o,n){let a,t;return o instanceof MouseEvent?(a=o.clientX-n.left,t=o.clientY-n.top):(a=o.changedTouches[0].clientX-n.left,t=o.changedTouches[0].clientY-n.top),{x:a,y:t}}S==null||S.addEventListener("click",ce);async function ce(){if(!m)return;if(m=!1,S.disabled=!0,!e||!h)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),h.fillStyle="rgba(255, 255, 255, 0.8)",h.fillRect(0,0,g.width,g.height),L===0&&(L=Date.now());const o=L-d;f.push({action:"end",time:o});const n={challenge:A,hmac:R,activity:f},a=await fetch(U+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let t=!1,u=!1;try{const s=await a.json();t=s.valid,u=s.retry,u&&(A=s.challenge,R=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let D=i.width/2,P=i.height/2;const l=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=D+c/8,r=P+c/4;z(l,s,r),e.lineWidth=c+17,z(l,s,r),e.lineWidth=c+14,z(l,s,r),e.lineWidth=c+11,z(l,s,r),e.lineWidth=c+8,z(l,s,r),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,z(l,D,P)}else if(u){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=D+c/8,r=P+c/4;W(l,s,r),e.lineWidth=c+17,W(l,s,r),e.lineWidth=c+14,W(l,s,r),e.lineWidth=c+11,W(l,s,r),e.lineWidth=c+8,W(l,s,r),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,W(l,D,P)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=D+c/8,r=P+c/4;B(l,s,r),e.lineWidth=c+17,B(l,s,r),e.lineWidth=c+14,B(l,s,r),e.lineWidth=c+11,B(l,s,r),e.lineWidth=c+8,B(l,s,r),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,B(l,D,P)}t&&E&&E.onSuccess?E.onSuccess():u?setTimeout(()=>{ve(),Z()},500):E&&E.onFailure&&E.onFailure()}function z(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t/2,a+t),e.lineTo(n-t-t/2,a),e.moveTo(n-t/2,a+t),e.lineTo(n+o-t/2,a-t),e.stroke()}function B(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t,a-t),e.lineTo(n+t,a+t),e.moveTo(n+t,a-t),e.lineTo(n-t,a+t),e.stroke()}function W(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t,a),e.lineTo(n-t+1,a),e.moveTo(n,a),e.lineTo(n+1,a),e.moveTo(n+t,a),e.lineTo(n+t+1,a),e.stroke()}function ve(){k=!1,f=[],d=0,L=0,_=0,w=0,m=!1,S.disabled=!0,I=!1,O="",N=0,Y=0;const o=document.getElementById("wrapper");o.style.display="none",M.style.display="block",h&&h.clearRect(0,0,g.width,g.height),C&&($.style.background=Q)}}return window.NeoCAPTCHA={render:V},H.renderCaptcha=V,Object.defineProperty(H,Symbol.toStringTag,{value:"Module"}),H}({});
