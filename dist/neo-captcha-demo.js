var NeoCAPTCHA=function(R){"use strict";const ce=`
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
`;function se(){if(document.getElementById("neo-captcha-style"))return;const y=document.createElement("style");y.id="neo-captcha-style",y.textContent=ce,document.head.appendChild(y)}function le(){if(document.getElementById("neo-captcha-material-icons"))return;const y=document.createElement("link");y.id="neo-captcha-material-icons",y.rel="stylesheet",y.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(y)}function V(y){le(),se(),y.innerHTML=`
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
    `;const re=!0,q="0.2.5",F="https://neo-captcha.com/api/v1",E=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),T=document.getElementById("startOverlay"),p=document.getElementById("submit"),$=document.getElementById("start"),i=document.getElementById("captchaCanvas"),e=i.getContext("2d"),f=document.getElementById("timeCanvas"),m=f.getContext("2d");if(!e||!m)throw new Error("Canvas context could not be initialized.");const de="easy",M=6e3;let u=[255,0,0],k=!1,v=[],h=0,L=0,j=0,w=0,g=!1,C=!1,_="",O=0,H=0,W,D;{let n=re;const o=document.getElementById("howToCaption"),a=document.getElementById("howToText"),t=document.getElementById("howToIcon");a.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more",o.addEventListener("click",()=>{n=!n,a.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more"})}const A=document.getElementById("overlayBg"),U="#f406",he="#0f4a";E?A.style.background=U:A.style.background="#000";const pe=document.getElementById("signalIcon");pe.innerText=E?"visibility":"hearing",$.addEventListener("click",K);async function K(){if(console.log("version: "+q),console.log("userAgent: "+navigator.userAgent),document.getElementById("howToText").style.display=="block"){const c=document.getElementById("howToText"),b=document.getElementById("howToIcon");c.style.display="none",b.innerText="expand_more"}const o=document.getElementById("wrapper");o.style.display="flex",$.style.display="none";const a={challenge:W,hmac:D,userAgent:navigator.userAgent,mobile:E,version:q,minDifficulty:de},l=await(await fetch(F+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(console.log(l),l.img){const c=document.getElementById("image");c.style.display="inline-block",T.style.display="flex",_=`data:image/png;base64,${l.img}`,O=l.pointSize,H=l.thumbSize,u=l.color,W=l.challenge,D=l.hmac;const b=document.getElementById("container");if(b.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),m.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,j=Date.now(),setTimeout(()=>me(),l.suspense)}}function me(){E?(A.style.background=he,w>0?v.push({action:"react",time:w-Date.now()}):w=Date.now()):ue()}const x=new AudioContext,ue=()=>{x.state==="suspended"?x.resume().then(()=>Q()):Q()},Q=()=>{N(285,.12),N(852,.12,.12),N(528,.12,.24),w>0?v.push({action:"react",time:w-Date.now()}):w=Date.now()};function N(n,o,a=0){let t=x.createOscillator(),l=x.createGain();t.type="sine",t.frequency.value=n,l.gain.value=.1,t.connect(l),l.connect(x.destination),t.start(x.currentTime+a),t.stop(x.currentTime+a+o)}function Z(){h==0&&(w>0?v.push({action:"react",time:Date.now()-w}):w=Date.now())}T.addEventListener("mousedown",Z),T.addEventListener("touchstart",Z,{passive:!1}),T.addEventListener("touchmove",()=>{},{passive:!1});function Y(){if(w>0&&h==0){v.push({action:"start",time:Date.now()-j}),g=!0;const n=document.getElementById("image");if(n.src=_,ge(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),T.style.display="none",E&&(C=!0)}}T.addEventListener("mouseup",Y),T.addEventListener("touchend",Y),T.addEventListener("touchcancel",Y);function ge(){h=Date.now(),ee()}function ee(){if(!m)throw new Error("Canvas context could not be initialized.");const n=Date.now()-h,o=Math.max(M-n,0),a=o/M*f.width;m.clearRect(0,0,f.width,f.height),m.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,m.fillRect(0,0,a,f.height),o>0&&g?requestAnimationFrame(ee):o<=0&&g?(console.log("Time's up!"),L=h+M,P()):(m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,f.width,f.height))}function te(n){if(n.preventDefault(),!C&&h>0){const o=i.getBoundingClientRect();let{x:a,y:t}=G(n,o);v.push({action:"down",enabled:g,x:a,y:t,time:Date.now()-h}),g&&(k=!0,ae(a,t))}}i.addEventListener("mousedown",te),i.addEventListener("touchstart",te,{passive:!1});function ne(n){if(n.preventDefault(),C)return;const o=i.getBoundingClientRect();let{x:a,y:t}=G(n,o);h>0&&v.push({action:"move",enabled:g,drawing:k,x:a,y:t,time:Date.now()-h}),g&&k&&ae(a,t)}i.addEventListener("mousemove",ne),i.addEventListener("touchmove",ne,{passive:!1});function X(n){if(n.preventDefault(),C){C=!1;return}if(!k)return;const o=i.getBoundingClientRect();let{x:a,y:t}=G(n,o);if(h>0&&v.push({action:"up",enabled:g,x:a,y:t,time:Date.now()-h}),h>=0&&g){if(k=!1,v.push({action:"point",x:a,y:t,time:Date.now()-h}),p.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(a,t,O/2,0,Math.PI*2),e.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,e.fill()}}i.addEventListener("mouseup",X),i.addEventListener("touchend",X),i.addEventListener("touchcancel",X);function ae(n,o){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(n-1,o-1,H/2,0,Math.PI*2),e.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]}, 0.2)`,e.fill()}function G(n,o){let a,t;return n instanceof MouseEvent?(a=n.clientX-o.left,t=n.clientY-o.top):(a=n.changedTouches[0].clientX-o.left,t=n.changedTouches[0].clientY-o.top),{x:a,y:t}}p==null||p.addEventListener("click",P);async function P(){if(!g)return;if(g=!1,p.disabled=!0,!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,f.width,f.height),L===0&&(L=Date.now());const n=L-h;v.push({action:"end",time:n});const o={challenge:W,hmac:D,activity:v},a=await fetch(F+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});let t=!1,l=!1;try{const s=await a.json();t=s.valid,l=s.retry,l&&(W=s.challenge,D=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let b=i.width/2,z=i.height/2;const r=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=b+c/8,d=z+c/4;I(r,s,d),e.lineWidth=c+17,I(r,s,d),e.lineWidth=c+14,I(r,s,d),e.lineWidth=c+11,I(r,s,d),e.lineWidth=c+8,I(r,s,d),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,I(r,b,z)}else if(l){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=b+c/8,d=z+c/4;B(r,s,d),e.lineWidth=c+17,B(r,s,d),e.lineWidth=c+14,B(r,s,d),e.lineWidth=c+11,B(r,s,d),e.lineWidth=c+8,B(r,s,d),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,B(r,b,z)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=b+c/8,d=z+c/4;S(r,s,d),e.lineWidth=c+17,S(r,s,d),e.lineWidth=c+14,S(r,s,d),e.lineWidth=c+11,S(r,s,d),e.lineWidth=c+8,S(r,s,d),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,S(r,b,z)}let ie=document.getElementById("submitIcon");t?(console.log("Yippie!"),p.disabled=!1,p.removeEventListener("click",P),p.addEventListener("click",J),ie.innerText="replay"):l?setTimeout(()=>{oe(),K()},500):(console.log("Womp, womp"),p.disabled=!1,p.removeEventListener("click",P),p.addEventListener("click",J),ie.innerText="replay")}function J(){oe(),W=void 0,D=void 0,p.removeEventListener("click",J),p.addEventListener("click",P);let n=document.getElementById("submitIcon");n.innerText="check"}function I(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t/2,a+t),e.lineTo(o-t-t/2,a),e.moveTo(o-t/2,a+t),e.lineTo(o+n-t/2,a-t),e.stroke()}function S(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t,a-t),e.lineTo(o+t,a+t),e.moveTo(o+t,a-t),e.lineTo(o-t,a+t),e.stroke()}function B(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t,a),e.lineTo(o-t+1,a),e.moveTo(o,a),e.lineTo(o+1,a),e.moveTo(o+t,a),e.lineTo(o+t+1,a),e.stroke()}function oe(){k=!1,v=[],h=0,L=0,j=0,w=0,g=!1,p.disabled=!0,C=!1,_="",O=0,H=0;const n=document.getElementById("wrapper");n.style.display="none",$.style.display="block",m&&m.clearRect(0,0,f.width,f.height),E&&(A.style.background=U)}}return window.NeoCAPTCHA={render:V},R.renderCaptcha=V,Object.defineProperty(R,Symbol.toStringTag,{value:"Module"}),R}({});
