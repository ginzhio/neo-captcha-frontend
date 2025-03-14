var NeoCAPTCHA=function(W){"use strict";const ee=`
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

.neo-captcha-caption {
    font-size: 1.8em;
    font-weight: bold;
    color: var(--neo-captcha-fg);
}

.neo-captcha-main-canvas {
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

.neo-captcha-bg {
    width: 20em;
    height: 20em;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 1;
    position: absolute;
    display: none;
}

.neo-captcha-container {
    width: 20em;
    height: 1em;
    position: relative;
    transform: translateX(-50%);
}

.neo-captcha-button {
    width: 20em;
    height: 4em;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
}

.neo-captcha-icon-div {
    width: 20em;
    height: 20em;
    position: absolute;
    z-index: 3;
    display: none;
    padding-top: 50%;
    cursor: pointer;
}

.neo-captcha-icon {
    font-size: 3em;
    color: var(--neo-captcha-light);
    transform: translateY(-50%);
}

.neo-captcha-icon-dark {
    color: var(--neo-captcha-dark);
    font-size: 3em;
}

.neo-captcha-wrapper {
    display: none;
}

.neo-captcha-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
    margin: 0 0 1em 0;
}

.neo-captcha-logo {
    margin-right: 1em;
    width: 3.5em;
    height: 3.5em;
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
`;function te(){if(document.getElementById("neo-captcha-style"))return;const u=document.createElement("style");u.id="neo-captcha-style",u.textContent=ee,document.head.appendChild(u)}function ne(){if(document.getElementById("neo-captcha-material-icons"))return;const u=document.createElement("link");u.id="neo-captcha-material-icons",u.rel="stylesheet",u.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(u)}function F(u,ae,oe,y){ne(),te(),u.innerHTML=`
<div class="neo-captcha-box">
    <div class="neo-captcha-title">
        <picture>
            <source class="neo-captcha-logo" srcset="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend@main/dist/logo-dark.png" media="(prefers-color-scheme: dark)">
            <source class="neo-captcha-logo" srcset="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend@main/dist/logo.png" media="(prefers-color-scheme: light)">
            <img class="neo-captcha-logo" src="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-fronten@main/dist/logo.png" alt="NeoCAPTCHA logo">
        </picture>
        <span class="neo-captcha-caption">NeoCAPTCHA</span>
    </div>
    <div id="howTo" class="neo-captcha-how-to">
        <div id="howToCaption" class="neo-captcha-how-to-caption">How-To:
            <span id="howToIcon" class="neo-captcha-wide-icon material-icons">expand_less</span>
        </div>
        <table id="howToText" class="neo-captcha-how-to-text">
            <tr>
                <td class="neo-captcha-steps-numbers">1.</td>
                <td>Press play</td>
            </tr>
            <tr>
                <td class="neo-captcha-steps-numbers">2.</td>
                <td>Wait for the signal</td>
            </tr>
            <tr>
                <td class="neo-captcha-steps-numbers">3.</td>
                <td>Just after the signal click to reveal the CAPTCHA</td>
            </tr>
            <tr>
                <td class="neo-captcha-steps-numbers">4.</td>
                <td>Find the missing corner of the hidden shape</td>
            </tr>
        </table>
    </div>
    <button id="start" class="neo-captcha-button">
        <span class="neo-captcha-icon-dark material-icons">play_arrow</span>
    </button>
    <div id="wrapper" class="neo-captcha-wrapper">
        <div id="container" class="neo-captcha-container">
            <img id="bg" class="neo-captcha-bg" alt="background"/>
            <canvas id="captchaCanvas" class="neo-captcha-main-canvas" width="320" height="20"></canvas>
            <div id="startOverlay" class="neo-captcha-icon-div">
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
`;const A=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),z=document.getElementById("startOverlay"),ie=document.getElementById("howTo"),B=document.getElementById("submit"),D=document.getElementById("start"),c=document.getElementById("captchaCanvas"),e=c.getContext("2d"),w=document.getElementById("timeCanvas"),p=w.getContext("2d");if(!e||!p)throw new Error("Canvas context could not be initialized.");const L=6e3;let h=[255,0,0],T=!1,m=[],d=0,P=0,$=0,f=0,g=!1,j="",R=0,M=0,C,E=oe;const ce=document.getElementById("howToCaption"),J=document.getElementById("howToText"),Y=document.getElementById("howToIcon");J.style.display=E?"block":"none",Y.innerText=E?"expand_less":"expand_more",ce.addEventListener("click",()=>{E=!E,J.style.display=E?"block":"none",Y.innerText=E?"expand_less":"expand_more"}),D.addEventListener("click",X);const se=document.getElementById("signalIcon");se.innerText=A?"vibration":"hearing",ae||(ie.style.display="none");function le(){console.log("userAgent: "+navigator.userAgent),console.log('"vibrate" in navigator: '+("vibrate"in navigator)),A&&"vibrate"in navigator?(navigator.vibrate(200),f>0?m.push({action:"react",time:f-Date.now()}):f=Date.now()):he()}async function X(){const o=document.getElementById("wrapper");o.style.display="block",D.style.display="none";const n=C?{id:C.toString()}:{},t=await(await fetch("https://neo-captcha-backend.fly.dev/api/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const i=document.getElementById("bg");i.style.display="inline-block",z.style.display="inline-block",j=`data:image/png;base64,${t.img}`,R=t.pointSize,M=t.thumbSize,h=t.color,C=BigInt(t.id);const v=document.getElementById("container");if(v.style.height="320px",c.height=c.width,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,c.width,c.height),p.fillStyle=`rgba(${h[0]}, ${h[1]}, ${h[2]})`,$=Date.now(),setTimeout(()=>le(),t.suspense)}}function re(){d=Date.now(),q()}function q(){if(!p)throw new Error("Canvas context could not be initialized.");const o=Date.now()-d,n=Math.max(L-o,0),a=n/L*w.width;p.clearRect(0,0,w.width,w.height),p.fillStyle=`rgba(${h[0]}, ${h[1]}, ${h[2]})`,p.fillRect(0,0,a,w.height),n>0&&g?requestAnimationFrame(q):n<=0&&g?(console.log("Time's up!"),P=d+L,Q()):(p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,w.width,w.height))}function G(o,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(o-1,n-1,M/2,0,Math.PI*2),e.fillStyle=`rgba(${h[0]}, ${h[1]}, ${h[2]}, 0.2)`,e.fill()}function U(){d==0&&(f>0?m.push({action:"react",time:Date.now()-f}):f=Date.now()),A&&"vibrate"in navigator&&navigator.vibrate(200)}z.addEventListener("mousedown",U),z.addEventListener("touchstart",U);function O(o,n){let a,t;return o instanceof MouseEvent?(a=o.clientX-n.left,t=o.clientY-n.top):(a=o.touches[0].clientX-n.left,t=o.touches[0].clientY-n.top),{x:a,y:t}}function V(o){const n=c.getBoundingClientRect();let{x:a,y:t}=O(o,n);d>0&&m.push({action:"down",enabled:g,x:a,y:t,time:Date.now()-d}),g&&(T=!0,G(a,t))}c.addEventListener("mousedown",V),c.addEventListener("touchstart",V);function K(o){const n=c.getBoundingClientRect();let{x:a,y:t}=O(o,n);d>0&&m.push({action:"move",enabled:g,drawing:T,x:a,y:t,time:Date.now()-d}),g&&T&&G(a,t)}c.addEventListener("mousemove",K),c.addEventListener("touchmove",K);function _(){if(d==0){m.push({action:"start",time:Date.now()-$}),g=!0,B.disabled=!1;const o=document.getElementById("bg");if(o.src=j,re(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),z.style.display="none"}}z.addEventListener("mouseup",_),window.addEventListener("touchend",_),window.addEventListener("touchcancel",_);function H(o){if(!T)return;const n=c.getBoundingClientRect();let{x:a,y:t}=O(o,n);if(d>0&&m.push({action:"up",enabled:g,x:a,y:t,time:Date.now()-d}),d>=0&&g){if(T=!1,m.push({action:"point",x:a,y:t,time:Date.now()-d}),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(a,t,R/2,0,Math.PI*2),e.fillStyle=`rgba(${h[0]}, ${h[1]}, ${h[2]})`,e.fill()}}c.addEventListener("mouseup",H),window.addEventListener("touchend",H),window.addEventListener("touchcancel",H),B==null||B.addEventListener("click",Q);async function Q(){if(!g)return;if(g=!1,B.disabled=!0,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,c.width,c.height),p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,w.width,w.height),P===0&&(P=Date.now());const o=P-d;m.push({action:"end",time:o});const n={id:C==null?void 0:C.toString(),activity:m},t=await(await fetch("https://neo-captcha-backend.fly.dev/api/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();e.lineJoin="round",e.lineCap="round";const i=c.width*.1;let v=c.width/2,I=c.height/2;const s=c.width/3;if(t.valid){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=i+20;let l=v+i/8,r=I+i/4;x(s,l,r),e.lineWidth=i+17,x(s,l,r),e.lineWidth=i+14,x(s,l,r),e.lineWidth=i+11,x(s,l,r),e.lineWidth=i+8,x(s,l,r),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=i,x(s,v,I)}else if(t.retry){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=i+20;let l=v+i/8,r=I+i/4;S(s,l,r),e.lineWidth=i+17,S(s,l,r),e.lineWidth=i+14,S(s,l,r),e.lineWidth=i+11,S(s,l,r),e.lineWidth=i+8,S(s,l,r),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=i,S(s,v,I)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=i+20;let l=v+i/8,r=I+i/4;k(s,l,r),e.lineWidth=i+17,k(s,l,r),e.lineWidth=i+14,k(s,l,r),e.lineWidth=i+11,k(s,l,r),e.lineWidth=i+8,k(s,l,r),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=i,k(s,v,I)}t.valid&&y&&y.onSuccess?y.onSuccess():t.retry?setTimeout(()=>{de(),X()},500):y&&y.onFailure&&y.onFailure()}function x(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t/2,a+t),e.lineTo(n-t-t/2,a),e.moveTo(n-t/2,a+t),e.lineTo(n+o-t/2,a-t),e.stroke()}function k(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t,a-t),e.lineTo(n+t,a+t),e.moveTo(n+t,a-t),e.lineTo(n-t,a+t),e.stroke()}function S(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t,a),e.lineTo(n-t+1,a),e.moveTo(n,a),e.lineTo(n+1,a),e.moveTo(n+t,a),e.lineTo(n+t+1,a),e.stroke()}function de(){T=!1,m=[],d=0,P=0,$=0,f=0,g=!1,j="",R=0,M=0;const o=document.getElementById("wrapper");o.style.display="none",D.style.display="block"}const b=new AudioContext,he=()=>{b.state==="suspended"?b.resume().then(()=>Z()):Z()},Z=()=>{N(285,.12),N(852,.12,.12),N(528,.12,.24),f>0?m.push({action:"react",time:f-Date.now()}):f=Date.now()};function N(o,n,a=0){let t=b.createOscillator(),i=b.createGain();t.type="sine",t.frequency.value=o,i.gain.value=.1,t.connect(i),i.connect(b.destination),t.start(b.currentTime+a),t.stop(b.currentTime+a+n)}}return window.NeoCAPTCHA={render:F},W.renderCaptcha=F,Object.defineProperty(W,Symbol.toStringTag,{value:"Module"}),W}({});
