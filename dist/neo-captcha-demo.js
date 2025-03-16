var NeoCAPTCHA=function(D){"use strict";const oe=`
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
`;function ie(){if(document.getElementById("neo-captcha-style"))return;const w=document.createElement("style");w.id="neo-captcha-style",w.textContent=oe,document.head.appendChild(w)}function ce(){if(document.getElementById("neo-captcha-material-icons"))return;const w=document.createElement("link");w.id="neo-captcha-material-icons",w.rel="stylesheet",w.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(w)}function q(w){ce(),ie(),w.innerHTML=`
    <div class="neo-captcha-box">
        <div class="neo-captcha-title">
            <picture class="neo-captcha-picture">
                <source srcset="https://neo-captcha.com/assets/logo-dark.png"
                        media="(prefers-color-scheme: dark)">
                <source srcset="https://neo-captcha.com/assets/logo.png"
                        media="(prefers-color-scheme: light)">
                <img class="neo-captcha-logo"
                     src="https://neo-captcha.com/assets/logo.png"
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
                <span id="submitIcon" class="neo-captcha-icon-dark material-icons">check</span>
            </button>
        </div>
    </div>
    `;const se=!1,F="0.2.2",G="https://neo-captcha.com/api/v1",E=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),y=document.getElementById("startOverlay"),h=document.getElementById("submit"),A=document.getElementById("start"),i=document.getElementById("captchaCanvas"),e=i.getContext("2d"),u=document.getElementById("timeCanvas"),p=u.getContext("2d");if(!e||!p)throw new Error("Canvas context could not be initialized.");const R=6e3;let m=[255,0,0],C=!1,f=[],d=0,L=0,$=0,v=0,g=!1,k=!1,M="",j=0,O=0,T;{let n=se;const a=document.getElementById("howToCaption"),o=document.getElementById("howToText"),t=document.getElementById("howToIcon");o.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more",a.addEventListener("click",()=>{n=!n,o.style.display=n?"block":"none",t.innerText=n?"expand_less":"expand_more"})}const H=document.getElementById("overlayBg");E||(H.style.display="none");const le=document.getElementById("signalIcon");le.innerText=E?"visibility":"hearing",A.addEventListener("click",V);async function V(){console.log("version: "+F),console.log("userAgent: "+navigator.userAgent);const n=document.getElementById("wrapper");n.style.display="flex",A.style.display="none";const a={id:T?T.toString():void 0,userAgent:navigator.userAgent,mobile:E,version:F},t=await(await fetch(G+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(console.log(t),t.img){const b=document.getElementById("bg");b.style.display="inline-block",y.style.display="flex",M=`data:image/png;base64,${t.img}`,j=t.pointSize,O=t.thumbSize,m=t.color,T=BigInt(t.id);const c=document.getElementById("container");if(c.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,$=Date.now(),setTimeout(()=>re(),t.suspense)}}function re(){E?(H.style.background="#0f08",v>0?f.push({action:"react",time:v-Date.now()}):v=Date.now()):de()}const x=new AudioContext,de=()=>{x.state==="suspended"?x.resume().then(()=>U()):U()},U=()=>{N(285,.12),N(852,.12,.12),N(528,.12,.24),v>0?f.push({action:"react",time:v-Date.now()}):v=Date.now()};function N(n,a,o=0){let t=x.createOscillator(),b=x.createGain();t.type="sine",t.frequency.value=n,b.gain.value=.1,t.connect(b),b.connect(x.destination),t.start(x.currentTime+o),t.stop(x.currentTime+o+a)}function K(){d==0&&(v>0?f.push({action:"react",time:Date.now()-v}):v=Date.now())}y.addEventListener("mousedown",K),y.addEventListener("touchstart",K,{passive:!1});function _(){if(v>0&&d==0){f.push({action:"start",time:Date.now()-$}),g=!0;const n=document.getElementById("bg");if(n.src=M,he(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),y.style.display="none",E&&(k=!0)}}y.addEventListener("mouseup",_),y.addEventListener("touchend",_),y.addEventListener("touchcancel",_);function he(){d=Date.now(),Q()}function Q(){if(!p)throw new Error("Canvas context could not be initialized.");const n=Date.now()-d,a=Math.max(R-n,0),o=a/R*u.width;p.clearRect(0,0,u.width,u.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,p.fillRect(0,0,o,u.height),a>0&&g?requestAnimationFrame(Q):a<=0&&g?(console.log("Time's up!"),L=d+R,P()):(p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,u.width,u.height))}function Z(n){if(n.preventDefault(),!k&&d>0){const a=i.getBoundingClientRect();let{x:o,y:t}=J(n,a);f.push({action:"down",enabled:g,x:o,y:t,time:Date.now()-d}),g&&(C=!0,te(o,t))}}i.addEventListener("mousedown",Z),i.addEventListener("touchstart",Z,{passive:!1});function ee(n){if(n.preventDefault(),k)return;const a=i.getBoundingClientRect();let{x:o,y:t}=J(n,a);d>0&&f.push({action:"move",enabled:g,drawing:C,x:o,y:t,time:Date.now()-d}),g&&C&&te(o,t)}i.addEventListener("mousemove",ee),i.addEventListener("touchmove",ee,{passive:!1});function Y(n){if(n.preventDefault(),k){k=!1;return}if(!C)return;const a=i.getBoundingClientRect();let{x:o,y:t}=J(n,a);if(d>0&&f.push({action:"up",enabled:g,x:o,y:t,time:Date.now()-d}),d>=0&&g){if(C=!1,f.push({action:"point",x:o,y:t,time:Date.now()-d}),h.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(o,t,j/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,e.fill()}}i.addEventListener("mouseup",Y),i.addEventListener("touchend",Y),i.addEventListener("touchcancel",Y);function te(n,a){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(n-1,a-1,O/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]}, 0.2)`,e.fill()}function J(n,a){let o,t;return n instanceof MouseEvent?(o=n.clientX-a.left,t=n.clientY-a.top):(o=n.changedTouches[0].clientX-a.left,t=n.changedTouches[0].clientY-a.top),{x:o,y:t}}h==null||h.addEventListener("click",P);async function P(){if(!g)return;if(g=!1,h.disabled=!0,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,u.width,u.height),L===0&&(L=Date.now());const n=L-d;f.push({action:"end",time:n});const a={id:T==null?void 0:T.toString(),activity:f},o=await fetch(G+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});let t=!1,b=!1;try{const s=await o.json();t=s.valid,b=s.retry}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let z=i.width/2,W=i.height/2;const l=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=W+c/4;I(l,s,r),e.lineWidth=c+17,I(l,s,r),e.lineWidth=c+14,I(l,s,r),e.lineWidth=c+11,I(l,s,r),e.lineWidth=c+8,I(l,s,r),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,I(l,z,W)}else if(b){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=W+c/4;B(l,s,r),e.lineWidth=c+17,B(l,s,r),e.lineWidth=c+14,B(l,s,r),e.lineWidth=c+11,B(l,s,r),e.lineWidth=c+8,B(l,s,r),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,B(l,z,W)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=W+c/4;S(l,s,r),e.lineWidth=c+17,S(l,s,r),e.lineWidth=c+14,S(l,s,r),e.lineWidth=c+11,S(l,s,r),e.lineWidth=c+8,S(l,s,r),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,S(l,z,W)}let ae=document.getElementById("submitIcon");t?(console.log("Yippie!"),h.disabled=!1,h.removeEventListener("click",P),h.addEventListener("click",X),ae.innerText="replay"):b?setTimeout(()=>{ne(),V()},500):(console.log("Womp, womp"),h.disabled=!1,h.removeEventListener("click",P),h.addEventListener("click",X),ae.innerText="replay")}function X(){ne(),T=void 0,h.removeEventListener("click",X),h.addEventListener("click",P);let n=document.getElementById("submitIcon");n.innerText="check"}function I(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t/2,o+t),e.lineTo(a-t-t/2,o),e.moveTo(a-t/2,o+t),e.lineTo(a+n-t/2,o-t),e.stroke()}function S(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t,o-t),e.lineTo(a+t,o+t),e.moveTo(a+t,o-t),e.lineTo(a-t,o+t),e.stroke()}function B(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t,o),e.lineTo(a-t+1,o),e.moveTo(a,o),e.lineTo(a+1,o),e.moveTo(a+t,o),e.lineTo(a+t+1,o),e.stroke()}function ne(){C=!1,f=[],d=0,L=0,$=0,v=0,g=!1,h.disabled=!0,k=!1,M="",j=0,O=0;const n=document.getElementById("wrapper");n.style.display="none",A.style.display="block",p&&p.clearRect(0,0,u.width,u.height),E&&(H.style.background="#f008")}}return window.NeoCAPTCHA={render:q},D.renderCaptcha=q,Object.defineProperty(D,Symbol.toStringTag,{value:"Module"}),D}({});
