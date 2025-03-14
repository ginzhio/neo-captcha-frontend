var NeoCAPTCHA=function(W){"use strict";const G=`
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
`;function U(){if(document.getElementById("neo-captcha-style"))return;const u=document.createElement("style");u.id="neo-captcha-style",u.textContent=G,document.head.appendChild(u)}function V(){if(document.getElementById("neo-captcha-material-icons"))return;const u=document.createElement("link");u.id="neo-captcha-material-icons",u.rel="stylesheet",u.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(u)}function O(u,K,Q,y){V(),U(),u.innerHTML=`
<div class="neo-captcha-box">
    <div class="neo-captcha-title">
        <picture>
            <source class="neo-captcha-logo" srcset="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend/dist/logo-dark.png" media="(prefers-color-scheme: dark)">
            <source class="neo-captcha-logo" srcset="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend/dist/logo.png" media="(prefers-color-scheme: light)">
            <img class="neo-captcha-logo" src="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend/dist/logo.png" alt="NeoCAPTCHA logo">
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
`;const _=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),P=document.getElementById("startOverlay"),Z=document.getElementById("howTo"),z=document.getElementById("submit"),A=document.getElementById("start"),c=document.getElementById("captchaCanvas"),e=c.getContext("2d"),w=document.getElementById("timeCanvas"),p=w.getContext("2d");if(!e||!p)throw new Error("Canvas context could not be initialized.");const D=6e3;let h=[255,0,0],I=!1,m=[],d=0,B=0,$=0,f=0,g=!1,j="",R=0,M=0,T,C=Q;const ee=document.getElementById("howToCaption"),H=document.getElementById("howToText"),N=document.getElementById("howToIcon");H.style.display=C?"block":"none",N.innerText=C?"expand_less":"expand_more",ee.addEventListener("click",()=>{C=!C,H.style.display=C?"block":"none",N.innerText=C?"expand_less":"expand_more"}),A.addEventListener("click",Y);const te=document.getElementById("signalIcon");te.innerText=_?"vibration":"hearing",K||(Z.style.display="none");function ne(){console.log("userAgent: "+navigator.userAgent),console.log('"vibrate" in navigator: '+("vibrate"in navigator)),_&&"vibrate"in navigator?(console.log("bzzzz"),navigator.vibrate(200),f>0?m.push({action:"react",time:f-Date.now()}):f=Date.now()):ie()}async function Y(){const i=document.getElementById("wrapper");i.style.display="block",A.style.display="none";const n=T?{id:T.toString()}:{},t=await(await fetch("https://neo-captcha-backend.fly.dev/api/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const o=document.getElementById("bg");o.style.display="inline-block",P.style.display="inline-block",j=`data:image/png;base64,${t.img}`,R=t.pointSize,M=t.thumbSize,h=t.color,T=BigInt(t.id);const b=document.getElementById("container");if(b.style.height="320px",c.height=c.width,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,c.width,c.height),p.fillStyle=`rgba(${h[0]}, ${h[1]}, ${h[2]})`,$=Date.now(),setTimeout(()=>ne(),t.suspense)}}function ae(){d=Date.now(),F()}function F(){if(!p)throw new Error("Canvas context could not be initialized.");const i=Date.now()-d,n=Math.max(D-i,0),a=n/D*w.width;p.clearRect(0,0,w.width,w.height),p.fillStyle=`rgba(${h[0]}, ${h[1]}, ${h[2]})`,p.fillRect(0,0,a,w.height),n>0&&g?requestAnimationFrame(F):n<=0&&g?(console.log("Time's up!"),B=d+D,X()):(p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,w.width,w.height))}function J(i,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(i-1,n-1,M/2,0,Math.PI*2),e.fillStyle=`rgba(${h[0]}, ${h[1]}, ${h[2]}, 0.2)`,e.fill()}P.addEventListener("mousedown",()=>{d==0&&(f>0?m.push({action:"react",time:Date.now()-f}):f=Date.now())}),c.addEventListener("mousedown",i=>{const n=c.getBoundingClientRect(),a=i.clientX-n.left,t=i.clientY-n.top;d>0&&m.push({action:"down",enabled:g,x:a,y:t,time:Date.now()-d}),g&&(I=!0,J(a,t))}),c.addEventListener("mousemove",i=>{const n=c.getBoundingClientRect(),a=i.clientX-n.left,t=i.clientY-n.top;d>0&&m.push({action:"move",enabled:g,drawing:I,x:a,y:t,time:Date.now()-d}),g&&I&&J(a,t)}),P.addEventListener("mouseup",()=>{if(d==0){m.push({action:"start",time:Date.now()-$}),g=!0,z.disabled=!1;const i=document.getElementById("bg");if(i.src=j,ae(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),P.style.display="none"}}),c.addEventListener("mouseup",i=>{const n=c.getBoundingClientRect(),a=i.clientX-n.left,t=i.clientY-n.top;d>0&&m.push({action:"up",enabled:g,x:a,y:t,time:Date.now()-d}),d>=0&&g&&(I=!1,m.push({action:"point",x:a,y:t,time:Date.now()-d}),e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(a,t,R/2,0,Math.PI*2),e.fillStyle=`rgba(${h[0]}, ${h[1]}, ${h[2]})`,e.fill())}),z==null||z.addEventListener("click",X);async function X(){if(!g)return;if(g=!1,z.disabled=!0,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,c.width,c.height),p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,w.width,w.height),B===0&&(B=Date.now());const i=B-d;m.push({action:"end",time:i});const n={id:T==null?void 0:T.toString(),activity:m},t=await(await fetch("https://neo-captcha-backend.fly.dev/api/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();e.lineJoin="round",e.lineCap="round";const o=c.width*.1;let b=c.width/2,E=c.height/2;const s=c.width/3;if(t.valid){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=o+20;let l=b+o/8,r=E+o/4;x(s,l,r),e.lineWidth=o+17,x(s,l,r),e.lineWidth=o+14,x(s,l,r),e.lineWidth=o+11,x(s,l,r),e.lineWidth=o+8,x(s,l,r),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=o,x(s,b,E)}else if(t.retry){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=o+20;let l=b+o/8,r=E+o/4;S(s,l,r),e.lineWidth=o+17,S(s,l,r),e.lineWidth=o+14,S(s,l,r),e.lineWidth=o+11,S(s,l,r),e.lineWidth=o+8,S(s,l,r),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=o,S(s,b,E)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=o+20;let l=b+o/8,r=E+o/4;k(s,l,r),e.lineWidth=o+17,k(s,l,r),e.lineWidth=o+14,k(s,l,r),e.lineWidth=o+11,k(s,l,r),e.lineWidth=o+8,k(s,l,r),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=o,k(s,b,E)}t.valid&&y&&y.onSuccess?y.onSuccess():t.retry?setTimeout(()=>{oe(),Y()},500):y&&y.onFailure&&y.onFailure()}function x(i,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=i/2;e.beginPath(),e.moveTo(n-t/2,a+t),e.lineTo(n-t-t/2,a),e.moveTo(n-t/2,a+t),e.lineTo(n+i-t/2,a-t),e.stroke()}function k(i,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=i/2;e.beginPath(),e.moveTo(n-t,a-t),e.lineTo(n+t,a+t),e.moveTo(n+t,a-t),e.lineTo(n-t,a+t),e.stroke()}function S(i,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=i/2;e.beginPath(),e.moveTo(n-t,a),e.lineTo(n-t+1,a),e.moveTo(n,a),e.lineTo(n+1,a),e.moveTo(n+t,a),e.lineTo(n+t+1,a),e.stroke()}function oe(){I=!1,m=[],d=0,B=0,$=0,f=0,g=!1,j="",R=0,M=0;const i=document.getElementById("wrapper");i.style.display="none",A.style.display="block"}const v=new AudioContext,ie=()=>{v.state==="suspended"?v.resume().then(()=>q()):q()},q=()=>{L(285,.12),L(852,.12,.12),L(528,.12,.24),f>0?m.push({action:"react",time:f-Date.now()}):f=Date.now()};function L(i,n,a=0){let t=v.createOscillator(),o=v.createGain();t.type="sine",t.frequency.value=i,o.gain.value=.1,t.connect(o),o.connect(v.destination),t.start(v.currentTime+a),t.stop(v.currentTime+a+n)}}return window.NeoCAPTCHA={render:O},W.renderCaptcha=O,Object.defineProperty(W,Symbol.toStringTag,{value:"Module"}),W}({});
