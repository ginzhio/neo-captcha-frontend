var NeoCAPTCHA=function(L){"use strict";const oe=`
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
    margin: 0 0 0.2em 0;
}

.neo-captcha-main-canvas {
    width: 20em;
    height: 1em;
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
    display: flex;
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
    cursor: pointer;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.neo-captcha-overlay-bg {
    width: 20em;
    height: 20em;
    position: absolute;
    background: #f008;
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

.neo-captcha-logo {
    margin: 0 1em 0 0;
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
`;function ae(){if(document.getElementById("neo-captcha-style"))return;const w=document.createElement("style");w.id="neo-captcha-style",w.textContent=oe,document.head.appendChild(w)}function ie(){if(document.getElementById("neo-captcha-material-icons"))return;const w=document.createElement("link");w.id="neo-captcha-material-icons",w.rel="stylesheet",w.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(w)}function X(w,T,x){ie(),ae(),w.innerHTML=`
    <div class="neo-captcha-box">
        <div class="neo-captcha-title">
            <picture class="neo-captcha-picture">
                <source srcset="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend@main/dist/logo-dark.png"
                        media="(prefers-color-scheme: dark)">
                <source srcset="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend@main/dist/logo.png"
                        media="(prefers-color-scheme: light)">
                <img class="neo-captcha-logo"
                     src="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend@main/dist/logo.png"
                     alt="logo">
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
        <button id="start" class="neo-captcha-button">
            <span class="neo-captcha-icon-dark material-icons">play_arrow</span>
        </button>
        <div id="wrapper" class="neo-captcha-wrapper">
            <div id="container" class="neo-captcha-container">
                <img id="bg" class="neo-captcha-bg" alt="background"/>
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
    `;const ce=(T==null?void 0:T.showHowTo)||!1,se=(T==null?void 0:T.expandHowTo)||!1,q="0.2.1",G="https://neo-captcha-backend.fly.dev",E=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),y=document.getElementById("startOverlay"),D=document.getElementById("submit"),R=document.getElementById("start"),i=document.getElementById("captchaCanvas"),e=i.getContext("2d"),g=document.getElementById("timeCanvas"),h=g.getContext("2d");if(!e||!h)throw new Error("Canvas context could not be initialized.");const j=6e3;let p=[255,0,0],C=!1,u=[],d=0,A=0,$=0,f=0,m=!1,S=!1,H="",M=0,O=0,k;if(ce){let n=se;const o=document.getElementById("howToCaption"),a=document.getElementById("howToText"),t=document.getElementById("howToIcon");a.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more",o.addEventListener("click",()=>{n=!n,a.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more"})}else{const n=document.getElementById("howTo");n.style.display="none"}const N=document.getElementById("overlayBg");E||(N.style.display="none");const le=document.getElementById("signalIcon");le.innerText=E?"visibility":"hearing",R.addEventListener("click",V);async function V(){console.log("version: "+q),console.log("userAgent: "+navigator.userAgent);const n=document.getElementById("wrapper");n.style.display="flex",R.style.display="none";const o={id:k?k.toString():void 0,userAgent:navigator.userAgent,mobile:E,version:q},t=await(await fetch(G+"/api/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();if(console.log(t),t.img){const v=document.getElementById("bg");v.style.display="inline-block",y.style.display="flex",H=`data:image/png;base64,${t.img}`,M=t.pointSize,O=t.thumbSize,p=t.color,k=BigInt(t.id);const c=document.getElementById("container");if(c.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!h)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),h.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,$=Date.now(),setTimeout(()=>re(),t.suspense)}}function re(){E?(N.style.background="#0f08",f>0?u.push({action:"react",time:f-Date.now()}):f=Date.now()):de()}const b=new AudioContext,de=()=>{b.state==="suspended"?b.resume().then(()=>U()):U()},U=()=>{_(285,.12),_(852,.12,.12),_(528,.12,.24),f>0?u.push({action:"react",time:f-Date.now()}):f=Date.now()};function _(n,o,a=0){let t=b.createOscillator(),v=b.createGain();t.type="sine",t.frequency.value=n,v.gain.value=.1,t.connect(v),v.connect(b.destination),t.start(b.currentTime+a),t.stop(b.currentTime+a+o)}function K(){d==0&&(f>0?u.push({action:"react",time:Date.now()-f}):f=Date.now())}y.addEventListener("mousedown",K),y.addEventListener("touchstart",K);function F(){if(f>0&&d==0){u.push({action:"start",time:Date.now()-$}),m=!0;const n=document.getElementById("bg");if(n.src=H,he(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),y.style.display="none",E&&(S=!0)}}y.addEventListener("mouseup",F),y.addEventListener("touchend",F),y.addEventListener("touchcancel",F);function he(){d=Date.now(),Q()}function Q(){if(!h)throw new Error("Canvas context could not be initialized.");const n=Date.now()-d,o=Math.max(j-n,0),a=o/j*g.width;h.clearRect(0,0,g.width,g.height),h.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,h.fillRect(0,0,a,g.height),o>0&&m?requestAnimationFrame(Q):o<=0&&m?(console.log("Time's up!"),A=d+j,ne()):(h.fillStyle="rgba(255, 255, 255, 0.8)",h.fillRect(0,0,g.width,g.height))}function Z(n){if(n.preventDefault(),!S&&d>0){const o=i.getBoundingClientRect();let{x:a,y:t}=J(n,o);u.push({action:"down",enabled:m,x:a,y:t,time:Date.now()-d}),m&&(C=!0,te(a,t))}}i.addEventListener("mousedown",Z),i.addEventListener("touchstart",Z);function ee(n){if(n.preventDefault(),S)return;const o=i.getBoundingClientRect();let{x:a,y:t}=J(n,o);d>0&&u.push({action:"move",enabled:m,drawing:C,x:a,y:t,time:Date.now()-d}),m&&C&&te(a,t)}i.addEventListener("mousemove",ee),i.addEventListener("touchmove",ee);function Y(n){if(n.preventDefault(),S){S=!1;return}if(!C)return;const o=i.getBoundingClientRect();let{x:a,y:t}=J(n,o);if(d>0&&u.push({action:"up",enabled:m,x:a,y:t,time:Date.now()-d}),d>=0&&m){if(C=!1,u.push({action:"point",x:a,y:t,time:Date.now()-d}),D.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(a,t,M/2,0,Math.PI*2),e.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,e.fill()}}i.addEventListener("mouseup",Y),i.addEventListener("touchend",Y),i.addEventListener("touchcancel",Y);function te(n,o){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(n-1,o-1,O/2,0,Math.PI*2),e.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]}, 0.2)`,e.fill()}function J(n,o){let a,t;return n instanceof MouseEvent?(a=n.clientX-o.left,t=n.clientY-o.top):(a=n.changedTouches[0].clientX-o.left,t=n.changedTouches[0].clientY-o.top),{x:a,y:t}}D==null||D.addEventListener("click",ne);async function ne(){if(!m)return;if(m=!1,D.disabled=!0,!e||!h)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),h.fillStyle="rgba(255, 255, 255, 0.8)",h.fillRect(0,0,g.width,g.height),A===0&&(A=Date.now());const n=A-d;u.push({action:"end",time:n});const o={id:k==null?void 0:k.toString(),activity:u},a=await fetch(G+"/api/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});let t=!1,v=!1;try{const s=await a.json();t=s.valid,v=s.retry}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let W=i.width/2,P=i.height/2;const l=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=W+c/8,r=P+c/4;I(l,s,r),e.lineWidth=c+17,I(l,s,r),e.lineWidth=c+14,I(l,s,r),e.lineWidth=c+11,I(l,s,r),e.lineWidth=c+8,I(l,s,r),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,I(l,W,P)}else if(v){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=W+c/8,r=P+c/4;B(l,s,r),e.lineWidth=c+17,B(l,s,r),e.lineWidth=c+14,B(l,s,r),e.lineWidth=c+11,B(l,s,r),e.lineWidth=c+8,B(l,s,r),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,B(l,W,P)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=W+c/8,r=P+c/4;z(l,s,r),e.lineWidth=c+17,z(l,s,r),e.lineWidth=c+14,z(l,s,r),e.lineWidth=c+11,z(l,s,r),e.lineWidth=c+8,z(l,s,r),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,z(l,W,P)}t&&x&&x.onSuccess?x.onSuccess():v?setTimeout(()=>{pe(),V()},500):x&&x.onFailure&&x.onFailure()}function I(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t/2,a+t),e.lineTo(o-t-t/2,a),e.moveTo(o-t/2,a+t),e.lineTo(o+n-t/2,a-t),e.stroke()}function z(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t,a-t),e.lineTo(o+t,a+t),e.moveTo(o+t,a-t),e.lineTo(o-t,a+t),e.stroke()}function B(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t,a),e.lineTo(o-t+1,a),e.moveTo(o,a),e.lineTo(o+1,a),e.moveTo(o+t,a),e.lineTo(o+t+1,a),e.stroke()}function pe(){C=!1,u=[],d=0,A=0,$=0,f=0,m=!1,S=!1,H="",M=0,O=0;const n=document.getElementById("wrapper");n.style.display="none",R.style.display="block",h&&h.clearRect(0,0,g.width,g.height),E&&(N.style.background="#f008")}}return window.NeoCAPTCHA={render:X},L.renderCaptcha=X,Object.defineProperty(L,Symbol.toStringTag,{value:"Module"}),L}({});
