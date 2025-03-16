var NeoCAPTCHA=function(L){"use strict";const ae=`
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
`;function ie(){if(document.getElementById("neo-captcha-style"))return;const w=document.createElement("style");w.id="neo-captcha-style",w.textContent=ae,document.head.appendChild(w)}function ce(){if(document.getElementById("neo-captcha-material-icons"))return;const w=document.createElement("link");w.id="neo-captcha-material-icons",w.rel="stylesheet",w.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(w)}function V(w,y,C){ce(),ie(),w.innerHTML=`
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
    `;const se=(y==null?void 0:y.showHowTo)||!1,le=(y==null?void 0:y.expandHowTo)||!1,X="0.2.4",q="https://neo-captcha.com/api/v1",S=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),x=document.getElementById("startOverlay"),I=document.getElementById("submit"),R=document.getElementById("start"),i=document.getElementById("captchaCanvas"),e=i.getContext("2d"),u=document.getElementById("timeCanvas"),h=u.getContext("2d");if(!e||!h)throw new Error("Canvas context could not be initialized.");const $=6e3;let p=[255,0,0],k=!1,g=[],d=0,A=0,H=0,f=0,m=!1,B=!1,M="",j=0,_=0,z,G=se;if(G){let n=le;const o=document.getElementById("howToCaption"),a=document.getElementById("howToText"),t=document.getElementById("howToIcon");a.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more",o.addEventListener("click",()=>{n=!n,a.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more"})}else{const n=document.getElementById("howTo");n.style.display="none"}const O=document.getElementById("overlayBg");S||(O.style.display="none");const re=document.getElementById("signalIcon");re.innerText=S?"visibility":"hearing",R.addEventListener("click",U);const de=(y==null?void 0:y.minDifficulty)||"easy";async function U(){console.log("version: "+X),console.log("userAgent: "+navigator.userAgent);const n=document.getElementById("wrapper");n.style.display="flex",R.style.display="none";const o={id:z?z.toString():void 0,userAgent:navigator.userAgent,mobile:S,version:X,minDifficulty:de},t=await(await fetch(q+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();if(console.log(t),t.img){const v=document.getElementById("howToText");if(G&&v.style.display=="block"){const T=document.getElementById("howToText"),l=document.getElementById("howToIcon");T.style.display="none",l.innerText="expand_more"}const c=document.getElementById("bg");c.style.display="inline-block",x.style.display="flex",M=`data:image/png;base64,${t.img}`,j=t.pointSize,_=t.thumbSize,p=t.color,z=BigInt(t.id);const b=document.getElementById("container");if(b.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!h)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),h.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,H=Date.now(),setTimeout(()=>he(),t.suspense)}}function he(){S?(O.style.background="#0f08",f>0?g.push({action:"react",time:f-Date.now()}):f=Date.now()):pe()}const E=new AudioContext,pe=()=>{E.state==="suspended"?E.resume().then(()=>K()):K()},K=()=>{N(285,.12),N(852,.12,.12),N(528,.12,.24),f>0?g.push({action:"react",time:f-Date.now()}):f=Date.now()};function N(n,o,a=0){let t=E.createOscillator(),v=E.createGain();t.type="sine",t.frequency.value=n,v.gain.value=.1,t.connect(v),v.connect(E.destination),t.start(E.currentTime+a),t.stop(E.currentTime+a+o)}function Q(){d==0&&(f>0?g.push({action:"react",time:Date.now()-f}):f=Date.now())}x.addEventListener("mousedown",Q),x.addEventListener("touchstart",Q,{passive:!1});function F(){if(f>0&&d==0){g.push({action:"start",time:Date.now()-H}),m=!0;const n=document.getElementById("bg");if(n.src=M,me(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),x.style.display="none",S&&(B=!0)}}x.addEventListener("mouseup",F),x.addEventListener("touchend",F),x.addEventListener("touchcancel",F);function me(){d=Date.now(),Z()}function Z(){if(!h)throw new Error("Canvas context could not be initialized.");const n=Date.now()-d,o=Math.max($-n,0),a=o/$*u.width;h.clearRect(0,0,u.width,u.height),h.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,h.fillRect(0,0,a,u.height),o>0&&m?requestAnimationFrame(Z):o<=0&&m?(console.log("Time's up!"),A=d+$,oe()):(h.fillStyle="rgba(255, 255, 255, 0.8)",h.fillRect(0,0,u.width,u.height))}function ee(n){if(n.preventDefault(),!B&&d>0){const o=i.getBoundingClientRect();let{x:a,y:t}=J(n,o);g.push({action:"down",enabled:m,x:a,y:t,time:Date.now()-d}),m&&(k=!0,ne(a,t))}}i.addEventListener("mousedown",ee),i.addEventListener("touchstart",ee,{passive:!1});function te(n){if(n.preventDefault(),B)return;const o=i.getBoundingClientRect();let{x:a,y:t}=J(n,o);d>0&&g.push({action:"move",enabled:m,drawing:k,x:a,y:t,time:Date.now()-d}),m&&k&&ne(a,t)}i.addEventListener("mousemove",te),i.addEventListener("touchmove",te,{passive:!1});function Y(n){if(n.preventDefault(),B){B=!1;return}if(!k)return;const o=i.getBoundingClientRect();let{x:a,y:t}=J(n,o);if(d>0&&g.push({action:"up",enabled:m,x:a,y:t,time:Date.now()-d}),d>=0&&m){if(k=!1,g.push({action:"point",x:a,y:t,time:Date.now()-d}),I.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(a,t,j/2,0,Math.PI*2),e.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]})`,e.fill()}}i.addEventListener("mouseup",Y),i.addEventListener("touchend",Y),i.addEventListener("touchcancel",Y);function ne(n,o){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(n-1,o-1,_/2,0,Math.PI*2),e.fillStyle=`rgba(${p[0]}, ${p[1]}, ${p[2]}, 0.2)`,e.fill()}function J(n,o){let a,t;return n instanceof MouseEvent?(a=n.clientX-o.left,t=n.clientY-o.top):(a=n.changedTouches[0].clientX-o.left,t=n.changedTouches[0].clientY-o.top),{x:a,y:t}}I==null||I.addEventListener("click",oe);async function oe(){if(!m)return;if(m=!1,I.disabled=!0,!e||!h)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),h.fillStyle="rgba(255, 255, 255, 0.8)",h.fillRect(0,0,u.width,u.height),A===0&&(A=Date.now());const n=A-d;g.push({action:"end",time:n});const o={id:z==null?void 0:z.toString(),activity:g},a=await fetch(q+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});let t=!1,v=!1;try{const s=await a.json();t=s.valid,v=s.retry}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let b=i.width/2,T=i.height/2;const l=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=b+c/8,r=T+c/4;W(l,s,r),e.lineWidth=c+17,W(l,s,r),e.lineWidth=c+14,W(l,s,r),e.lineWidth=c+11,W(l,s,r),e.lineWidth=c+8,W(l,s,r),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,W(l,b,T)}else if(v){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=b+c/8,r=T+c/4;P(l,s,r),e.lineWidth=c+17,P(l,s,r),e.lineWidth=c+14,P(l,s,r),e.lineWidth=c+11,P(l,s,r),e.lineWidth=c+8,P(l,s,r),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,P(l,b,T)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=b+c/8,r=T+c/4;D(l,s,r),e.lineWidth=c+17,D(l,s,r),e.lineWidth=c+14,D(l,s,r),e.lineWidth=c+11,D(l,s,r),e.lineWidth=c+8,D(l,s,r),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,D(l,b,T)}t&&C&&C.onSuccess?C.onSuccess():v?setTimeout(()=>{ue(),U()},500):C&&C.onFailure&&C.onFailure()}function W(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t/2,a+t),e.lineTo(o-t-t/2,a),e.moveTo(o-t/2,a+t),e.lineTo(o+n-t/2,a-t),e.stroke()}function D(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t,a-t),e.lineTo(o+t,a+t),e.moveTo(o+t,a-t),e.lineTo(o-t,a+t),e.stroke()}function P(n,o,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(o-t,a),e.lineTo(o-t+1,a),e.moveTo(o,a),e.lineTo(o+1,a),e.moveTo(o+t,a),e.lineTo(o+t+1,a),e.stroke()}function ue(){k=!1,g=[],d=0,A=0,H=0,f=0,m=!1,I.disabled=!0,B=!1,M="",j=0,_=0;const n=document.getElementById("wrapper");n.style.display="none",R.style.display="block",h&&h.clearRect(0,0,u.width,u.height),S&&(O.style.background="#f008")}}return window.NeoCAPTCHA={render:V},L.renderCaptcha=V,Object.defineProperty(L,Symbol.toStringTag,{value:"Module"}),L}({});
