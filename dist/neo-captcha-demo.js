var NeoCAPTCHA=function($){"use strict";const se=`
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
    touch-action: none;
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
`;function le(){if(document.getElementById("neo-captcha-style"))return;const w=document.createElement("style");w.id="neo-captcha-style",w.textContent=se,document.head.appendChild(w)}function re(){if(document.getElementById("neo-captcha-material-icons"))return;const w=document.createElement("link");w.id="neo-captcha-material-icons",w.rel="stylesheet",w.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(w)}function q(w){re(),le(),w.innerHTML=`
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
                <span id="submitIcon" class="neo-captcha-icon-dark material-icons">check</span>
            </button>
        </div>
    </div>
    `;const de=!0,F="0.2.8-demo",U="https://neo-captcha.com/api/v1",E=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),b=document.getElementById("startOverlay"),h=document.getElementById("submit"),M=document.getElementById("start"),i=document.getElementById("captchaCanvas"),e=i.getContext("2d"),f=document.getElementById("timeCanvas"),p=f.getContext("2d");if(!e||!p)throw new Error("Canvas context could not be initialized.");const he="easy",j=6e3;let m=[255,0,0],k=!1,v=[],d=0,W=0,_=0,y=0,g=!1,C=!1,O="",H=0,N=0,D,P,T=de;{const o=document.getElementById("howToCaption"),n=document.getElementById("howToText"),a=document.getElementById("howToIcon");n.style.display=T?"block":"none",a.innerText=T?"expand_less":"expand_more",o.addEventListener("click",()=>{T=!T,n.style.display=T?"block":"none",a.innerText=T?"expand_less":"expand_more"})}const R=document.getElementById("overlayBg"),K="#f406",pe="#0f4a";E?R.style.background=K:R.style.background="#000";const me=document.getElementById("signalIcon");me.innerText=E?"visibility":"hearing",M.addEventListener("click",Q);async function Q(){if(console.log("version: "+F),console.log("userAgent: "+navigator.userAgent),T){T=!1;const u=document.getElementById("howToText"),c=document.getElementById("howToIcon");u.style.display="none",c.innerText="expand_more"}const o=document.getElementById("wrapper");o.style.display="flex",M.style.display="none";const n={challenge:D,hmac:P,userAgent:navigator.userAgent,mobile:E,version:F,minDifficulty:he},t=await(await fetch(U+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const u=document.getElementById("image");u.style.display="inline-block",b.style.display="flex",O=`data:image/png;base64,${t.img}`,H=t.pointSize,N=t.thumbSize,m=t.color,D=t.challenge,P=t.hmac;const c=document.getElementById("container");if(c.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,_=Date.now(),setTimeout(()=>ge(),t.suspense)}}function ge(){E?(R.style.background=pe,y>0?v.push({action:"react",time:y-Date.now()}):y=Date.now()):ue()}const x=new AudioContext,ue=()=>{x.state==="suspended"?x.resume().then(()=>Z()):Z()},Z=()=>{Y(285,.12),Y(852,.12,.12),Y(528,.12,.24),y>0?v.push({action:"react",time:y-Date.now()}):y=Date.now()};function Y(o,n,a=0){let t=x.createOscillator(),u=x.createGain();t.type="sine",t.frequency.value=o,u.gain.value=.1,t.connect(u),u.connect(x.destination),t.start(x.currentTime+a),t.stop(x.currentTime+a+n)}function ee(){d==0&&(y>0?v.push({action:"react",time:Date.now()-y}):y=Date.now())}b.addEventListener("mousedown",ee),b.addEventListener("touchstart",ee,{passive:!1}),b.addEventListener("touchmove",()=>{},{passive:!1});function X(){if(y>0&&d==0){v.push({action:"start",time:Date.now()-_}),g=!0;const o=document.getElementById("image");if(o.src=O,fe(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),b.style.display="none",E&&(C=!0)}}b.addEventListener("mouseup",X),b.addEventListener("touchend",X),b.addEventListener("touchcancel",X);function fe(){d=Date.now(),te()}function te(){if(!p)throw new Error("Canvas context could not be initialized.");const o=Date.now()-d,n=Math.max(j-o,0),a=n/j*f.width;p.clearRect(0,0,f.width,f.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,p.fillRect(0,0,a,f.height),n>0&&g?requestAnimationFrame(te):n<=0&&g?(console.log("Time's up!"),W=d+j,A()):(p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,f.width,f.height))}function ne(o){if(o.preventDefault(),!C&&d>0){const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);v.push({action:"down",enabled:g,x:a,y:t,time:Date.now()-d}),g&&(k=!0,oe(a,t))}}i.addEventListener("mousedown",ne),i.addEventListener("touchstart",ne,{passive:!1});function ae(o){if(o.preventDefault(),C)return;const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);d>0&&v.push({action:"move",enabled:g,drawing:k,x:a,y:t,time:Date.now()-d}),g&&k&&oe(a,t)}i.addEventListener("mousemove",ae),i.addEventListener("touchmove",ae,{passive:!1});function G(o){if(o.preventDefault(),C){C=!1;return}if(!k)return;const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);if(d>0&&v.push({action:"up",enabled:g,x:a,y:t,time:Date.now()-d}),d>=0&&g){if(k=!1,v.push({action:"point",x:a,y:t,time:Date.now()-d}),h.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(a,t,H/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,e.fill()}}i.addEventListener("mouseup",G),i.addEventListener("touchend",G),i.addEventListener("touchcancel",G);function oe(o,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(o-1,n-1,N/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]}, 0.2)`,e.fill()}function J(o,n){let a,t;return o instanceof MouseEvent?(a=o.clientX-n.left,t=o.clientY-n.top):(a=o.changedTouches[0].clientX-n.left,t=o.changedTouches[0].clientY-n.top),{x:a,y:t}}h==null||h.addEventListener("click",A);async function A(){if(!g)return;if(g=!1,h.disabled=!0,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,f.width,f.height),W===0&&(W=Date.now());const o=W-d;v.push({action:"end",time:o});const n={challenge:D,hmac:P,activity:v},a=await fetch(U+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let t=!1,u=!1;try{const s=await a.json();t=s.valid,u=s.retry,u&&(D=s.challenge,P=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let z=i.width/2,L=i.height/2;const l=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=L+c/4;I(l,s,r),e.lineWidth=c+17,I(l,s,r),e.lineWidth=c+14,I(l,s,r),e.lineWidth=c+11,I(l,s,r),e.lineWidth=c+8,I(l,s,r),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,I(l,z,L)}else if(u){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=L+c/4;B(l,s,r),e.lineWidth=c+17,B(l,s,r),e.lineWidth=c+14,B(l,s,r),e.lineWidth=c+11,B(l,s,r),e.lineWidth=c+8,B(l,s,r),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,B(l,z,L)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=L+c/4;S(l,s,r),e.lineWidth=c+17,S(l,s,r),e.lineWidth=c+14,S(l,s,r),e.lineWidth=c+11,S(l,s,r),e.lineWidth=c+8,S(l,s,r),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,S(l,z,L)}let ce=document.getElementById("submitIcon");t?(console.log("Yippie!"),h.disabled=!1,h.removeEventListener("click",A),h.addEventListener("click",V),ce.innerText="replay"):u?setTimeout(()=>{ie(),Q()},500):(console.log("Womp, womp"),h.disabled=!1,h.removeEventListener("click",A),h.addEventListener("click",V),ce.innerText="replay")}function V(){ie(),D=void 0,P=void 0,h.removeEventListener("click",V),h.addEventListener("click",A);let o=document.getElementById("submitIcon");o.innerText="check",e&&e.clearRect(0,0,i.width,i.height);const n=document.getElementById("image");n.style.display="none",b.style.display="none"}function I(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t/2,a+t),e.lineTo(n-t-t/2,a),e.moveTo(n-t/2,a+t),e.lineTo(n+o-t/2,a-t),e.stroke()}function S(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t,a-t),e.lineTo(n+t,a+t),e.moveTo(n+t,a-t),e.lineTo(n-t,a+t),e.stroke()}function B(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t,a),e.lineTo(n-t+1,a),e.moveTo(n,a),e.lineTo(n+1,a),e.moveTo(n+t,a),e.lineTo(n+t+1,a),e.stroke()}function ie(){k=!1,v=[],d=0,W=0,_=0,y=0,g=!1,h.disabled=!0,C=!1,O="",H=0,N=0;const o=document.getElementById("wrapper");o.style.display="none",M.style.display="block",p&&p.clearRect(0,0,f.width,f.height),E&&(R.style.background=K)}}return window.NeoCAPTCHA={render:q},$.renderCaptcha=q,Object.defineProperty($,Symbol.toStringTag,{value:"Module"}),$}({});
