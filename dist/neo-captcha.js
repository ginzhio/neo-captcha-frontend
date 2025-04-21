var NeoCAPTCHA=function(Y){"use strict";const ge=`
:root {
    --neo-captcha-accent: #009696;
    --neo-captcha-dark: #111;
    --neo-captcha-light: #eee;
    --neo-captcha-button: #009bb8;

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
    margin: 0;
}

.neo-captcha-logo {
    margin: 0 1em 0 0;
    width: 3.5em;
    height: 3.5em;
    cursor: pointer;
    padding: 0;
}

.neo-captcha-caption {
    font-size: 1.8em;
    font-weight: bold;
    color: var(--neo-captcha-fg);
    margin: 0 0 0.2em 0;
    padding: 0;
}

.neo-captcha-main-canvas {
    width: 20em;
    height: 20em;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 2;
    position: absolute;
    margin: 0;
    padding: 0;
    touch-action: none;
}

.neo-captcha-time {
    width: 20em;
    height: 1em;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
    margin: 0;
    padding: 0;
}

.neo-captcha-image {
    width: 20em;
    height: 20em;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 1;
    position: absolute;
    display: none;
    margin: 0;
    padding: 0;
}

.neo-captcha-container {
    width: 20em;
    height: 20em;
    position: relative;
    display: flex;
    margin: 0;
    padding: 0;
}

.neo-captcha-button {
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0;
    padding: 0;

    background: var(--neo-captcha-button);
    border: none;
    border-radius: 0.5em;
    box-shadow: 0 4px 0.5em color-mix(in srgb, var(--neo-captcha-fg) 30%, transparent);

    &:disabled {
        opacity: 0.5;
        box-shadow: none;
    }

    &:hover:enabled {
        background: color-mix(in srgb, var(--neo-captcha-button) 80%, var(--neo-captcha-light));
        box-shadow: 0 6px 0.75em color-mix(in srgb, var(--neo-captcha-fg) 30%, transparent);
        transform: translateY(-1px);
    }

    &:active:enabled {
        background: var(--neo-captcha-button);
        box-shadow: none;
    }
}

.neo-captcha-submit-button {
    width: 20em;
    height: 4em;
    margin: 0;
    padding: 0;
}

.neo-captcha-guess-region {
    width: 20em;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.25em;
    margin: 0;
    padding: 0;
}

.neo-captcha-multi-button {
    margin: 0;
    padding: 0;
}

.neo-captcha-start-button {
    width: 20rem;
    height: 15rem;
    font-size: 1.5em;
    margin: 0.25em 0 0 0;
    padding: 0;
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
    margin: 0;
    padding: 0;

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
    margin: 0;
    padding: 0;
}

.neo-captcha-signal-text {
    top: 0.5em;
    font-size: 1.5em;
    text-shadow: #000 0 0 0.25em;
    position: absolute;
}

.neo-captcha-icon {
    font-size: 5em;
    color: var(--neo-captcha-light);
    margin: 0;
    padding: 0;
    animation: none;
}

@keyframes blinker {
    50% {
        opacity: 20%;
    }
}

.neo-captcha-fg-icon {
    font-size: 3em;
    color: var(--neo-captcha-fg);
    margin: 0;
    padding: 0;
}

.neo-captcha-icon-dark {
    color: var(--neo-captcha-dark);
    font-size: 3em;
    width: 1em;
    height: 1em;
    margin: 0;
    padding: 0;
}

.neo-captcha-wrapper {
    display: none;
    flex-direction: column;
    margin: 0;
    padding: 0;
}

.neo-captcha-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
    margin: 0 0 0.5em 0;
    padding: 0;
}

.neo-captcha-how-to {
    width: 20em;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
    text-align: start;
    margin: 0;
    padding: 0;
}

.neo-captcha-how-to-text {
    margin: 0;
    padding: 0;
}

.neo-captcha-how-to-caption {
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    padding: 0.6em 1em 0.4em 1em;
    background: linear-gradient(color-mix(in srgb, var(--neo-captcha-fg) 25%, transparent), color-mix(in srgb, var(--neo-captcha-fg) 5%, transparent));
    display: flex;
    flex-direction: row;
    margin: 0;
}

.neo-captcha-how-to-table {
    padding: 0.5em 1em 1em 1em;
    background: color-mix(in srgb, var(--neo-captcha-fg) 7%, transparent);
    margin: 0;
}

.neo-captcha-how-to-description {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5em 0.5em 0.5em 0.75em;
    margin: 0;
}

.neo-captcha-mode-icon {
    width: 2.2em;
    height: 2.2em;
    margin: 0 0.75em 0 0;
    padding: 0;
}

.neo-captcha-how-to-footer {
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
}

.neo-captcha-how-to-footer-mode {
    color: var(--neo-captcha-accent);
    font-weight: bold;
    margin: 0;
    padding: 0;
}

.neo-captcha-wide-icon {
    flex: 1;
    text-align: end;
    margin: 0;
    padding: 0;
}

.neo-captcha-steps-numbers {
    text-align: start;
    vertical-align: top;
    font-weight: bold;
    color: var(--neo-captcha-accent);
    margin: 0;
    padding: 0;
}
`;function ue(){if(document.getElementById("neo-captcha-style"))return;const v=document.createElement("style");v.id="neo-captcha-style",v.textContent=ge,document.head.appendChild(v)}function be(){if(document.getElementById("neo-captcha-material-icons"))return;const v=document.createElement("link");v.id="neo-captcha-material-icons",v.rel="stylesheet",v.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(v)}function ne(v,d,I){var pe,he,me;be(),ue(),v.innerHTML=`
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
                    <tr>
                        <td class="neo-captcha-steps-numbers">3.</td>
                        <td id="neoCaptcha-step_3"></td>
                    </tr>
                </table>
                <div class="neo-captcha-how-to-description">
                    <img id="neoCaptcha-modeIcon" class="neo-captcha-mode-icon" alt="icon variant">
                    <div class="neo-captcha-how-to-footer">
                        <span id="neoCaptcha-mode" class="neo-captcha-how-to-footer-mode"></span>
                        <span id="neoCaptcha-modeText"></span>
                    </div>
                </div>
            </div>
        </div>
        <button id="neoCaptcha-start" class="neo-captcha-button neo-captcha-start-button">
            <span class="neo-captcha-icon-dark material-icons">play_arrow</span>
        </button>
        <div id="neoCaptcha-wrapper" class="neo-captcha-wrapper">
            <div id="neoCaptcha-container" class="neo-captcha-container">
                <div class="neo-captcha-icon-div sync">
                    <span class="neo-captcha-fg-icon material-icons">more_horiz</span>
                </div>
                <img id="neoCaptcha-image" class="neo-captcha-image" alt="background"/>
                <canvas id="neoCaptcha-captchaCanvas" class="neo-captcha-main-canvas"></canvas>
                <div id="neoCaptcha-startOverlay" class="neo-captcha-icon-div">
                    <div id="neoCaptcha-overlayBg" class="neo-captcha-overlay-bg"></div>
                    <span id="neoCaptcha-signalIcon" class="neo-captcha-icon material-icons">hearing</span>
                    <span id="neoCaptcha-signalText" class="neo-captcha-signal-text"></span>
                </div>
            </div>
            <div>
                <canvas class="neo-captcha-time" id="neoCaptcha-timeCanvas"></canvas>
            </div>
            <button id="neoCaptcha-submit" class="neo-captcha-button neo-captcha-submit-button" disabled>
                <span id="neoCaptcha-submitIcon" class="neo-captcha-icon-dark material-icons">check</span>
            </button>
            <div id="neoCaptcha-guess" class="neo-captcha-guess-region">
                <button id="neoCaptcha-guess-button-1" class="neo-captcha-button neo-captcha-multi-button" disabled>
                    <img id="neoCaptcha-guess-icon-1" class="neo-captcha-icon-dark"
                         src="https://neo-captcha.com/assets//icon_shape_undefined.png"/>
                </button>
                <button id="neoCaptcha-guess-button-2" class="neo-captcha-button neo-captcha-multi-button" disabled>
                    <img id="neoCaptcha-guess-icon-2" class="neo-captcha-icon-dark"
                         src="https://neo-captcha.com/assets//icon_shape_undefined.png"/>
                </button>
                <button id="neoCaptcha-guess-button-3" class="neo-captcha-button neo-captcha-multi-button" disabled>
                    <img id="neoCaptcha-guess-icon-3" class="neo-captcha-icon-dark"
                         src="https://neo-captcha.com/assets//icon_shape_undefined.png"/>
                </button>
                <button id="neoCaptcha-guess-button-4" class="neo-captcha-button neo-captcha-multi-button" disabled>
                    <img id="neoCaptcha-guess-icon-4" class="neo-captcha-icon-dark"
                         src="https://neo-captcha.com/assets//icon_shape_undefined.png"/>
                </button>
            </div>
        </div>
    </div>
    `;const oe="1.1.3",ie="https://neo-captcha.com/api/v1",V=(d==null?void 0:d.variant)||"ns",N=V==="ns"||V==="ncs",fe=(pe=window.matchMedia)==null?void 0:pe.call(window,"(prefers-color-scheme: dark)").matches,O=(d==null?void 0:d.theme)==="dark"||(d==null?void 0:d.theme)==="light"?d.theme:fe?"dark":"light";let g=(navigator.language||navigator.languages[0]).split("-")[0];g=(d==null?void 0:d.lang)||g;const ye=(d==null?void 0:d.minDifficulty)||"easy",ve=(d==null?void 0:d.showHowTo)||!1;let B=(d==null?void 0:d.expandHowTo)||!1;const A=(d==null?void 0:d.visualOnDesktop)||!1,S=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),H=document.getElementById("neoCaptcha-startOverlay"),z=document.getElementById("neoCaptcha-submit"),X=document.getElementById("neoCaptcha-start"),i=document.getElementById("neoCaptcha-captchaCanvas"),e=i.getContext("2d"),f=document.getElementById("neoCaptcha-timeCanvas"),m=f.getContext("2d");if(!e||!m)throw new Error("Canvas context could not be initialized.");let T;N?(document.getElementById("neoCaptcha-submit").style.display="none",T=!1):(document.getElementById("neoCaptcha-guess").style.display="none",i.style.cursor="crosshair",i.style.touchAction="none",T=!0),document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${O}`),document.getElementById("neoCaptchaWidgetLogo").src=O==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png",N?document.getElementById("neoCaptcha-modeIcon").src=O==="dark"?"https://neo-captcha.com/assets/icon_see_shape_dark.png":"https://neo-captcha.com/assets/icon_see_shape.png":document.getElementById("neoCaptcha-modeIcon").src=O==="dark"?"https://neo-captcha.com/assets/icon_find_corner_dark.png":"https://neo-captcha.com/assets/icon_find_corner.png";const ce="#f406",we="#0f4a",l={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_s:"Click at the <b>signal tone!</b>",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_s:"Klicke beim <b>Signalton!</b>",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(l[g]||l.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(l[g]||l.en).step_1,S||A?(document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2):(document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2_s,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2_s),document.getElementById("neoCaptcha-step_3").innerHTML=(l[g]||l.en).step_3,N?(document.getElementById("neoCaptcha-mode").innerHTML=(l[g]||l.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(l[g]||l.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(l[g]||l.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(l[g]||l.en).mode_1_text);let P=6e3,u=[255,0,0],_=!1,w=[],h=0,R=0,q=0,x=0,b=!1,J="",K=0,U=0,j,F;if(ve){const n=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText"),o=document.getElementById("neoCaptcha-howToIcon");a.style.display=B?"block":"none",o.innerText=B?"expand_less":"expand_more",n.addEventListener("click",()=>{B=!B,a.style.display=B?"block":"none",o.innerText=B?"expand_less":"expand_more"})}else{const n=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText");n.style.display="none",a.style.display="none"}const G=document.getElementById("neoCaptcha-overlayBg");S||A?G.style.background=ce:G.style.background="#000";const $=document.getElementById("neoCaptcha-signalIcon");$.innerText=S||A?"do_not_touch":"hearing",X.addEventListener("click",se);async function se(){console.log("version: "+oe),console.log("userAgent: "+navigator.userAgent);const n=document.getElementById("neoCaptcha-wrapper");n.style.display="flex",X.style.display="none";const a={challenge:j,hmac:F,userAgent:navigator.userAgent,mobile:S,version:oe,minDifficulty:ye,variant:V},t=await(await fetch(ie+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(console.log(t),t.img){const C=document.getElementById("neoCaptcha-image");C.style.display="inline-block",H.style.display="flex",J=`data:image/png;base64,${t.img}`,u=t.color,j=t.challenge,F=t.hmac,P=t.totalTime||P;const s=document.getElementById("neoCaptcha-container");if(s.style.height="20em",t.variant==="ns")for(let y=1;y<=4;y++)document.getElementById("neoCaptcha-guess-icon-"+y).src=`https://neo-captcha.com/assets/icon_shape_${t.icons[y-1]}.png`;if(i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,K=i.width*t.pointSize,U=i.width*t.thumbSize,!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),m.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,q=Date.now(),setTimeout(()=>Ce(),t.suspense)}}function Ce(){S||A?(G.style.background=we,$.innerText="touch_app",$.style.animation="blinker 0.5s ease-in-out infinite",x=Date.now()):xe()}const E=new AudioContext,xe=()=>{E.state==="suspended"?E.resume().then(()=>de()):de()},de=()=>{Q(285,.12),Q(852,.12,.12),Q(528,.12,.24),x=Date.now()};function Q(n,a,o=0){let t=E.createOscillator(),C=E.createGain();t.type="sine",t.frequency.value=n,C.gain.value=.1,t.connect(C),C.connect(E.destination),t.start(E.currentTime+o),t.stop(E.currentTime+o+a)}let k;function Te(){if(h==0){let n;x<=0?n=0:n=Date.now()-x,k={action:"react",time:n}}}H.addEventListener("pointerdown",Te,{passive:!1}),H.addEventListener("pointermove",()=>{x<=0&&(k=void 0)},{passive:!1});function _e(){if(x<=0&&(k={action:"react",time:-1},x=1),!(k&&k.time===0)&&x>0&&h==0&&k){w.push(k),w.push({action:"start",time:Date.now()-q}),b=!0;const n=document.getElementById("neoCaptcha-image");if(n.src=J,Ee(),!e)throw new Error("Canvas context could not be initialized.");if(e.clearRect(0,0,i.width,i.height),H.style.display="none",N)for(let a=1;a<=4;a++)document.getElementById("neoCaptcha-guess-button-"+a).disabled=!1}}H.addEventListener("pointerup",_e);function Ee(){h=Date.now(),le()}function le(){if(!m)throw new Error("Canvas context could not be initialized.");const n=Date.now()-h,a=Math.max(P-n,0),o=a/P*f.width;m.clearRect(0,0,f.width,f.height),m.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,m.fillRect(0,0,o,f.height),a>0&&b?requestAnimationFrame(le):a<=0&&b?(console.log("Time's up!"),R=h+P,ae()):(m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,f.width,f.height))}function Z(n){if(T&&n.preventDefault(),h>0){const a=i.getBoundingClientRect();let{x:o,y:t}=te(n,a);w.push({action:"down",enabled:b,x:o,y:t,time:Date.now()-h}),b&&T&&(_=!0,re(o,t))}}T?(i.style.touchAction="none",i.addEventListener("pointerdown",Z,{passive:!1})):(i.style.touchAction="auto",i.addEventListener("pointerdown",Z));function ke(n){T&&n.preventDefault();const a=i.getBoundingClientRect();let{x:o,y:t}=te(n,a);h>0&&w.push({action:"move",enabled:b,drawing:_,x:o,y:t,time:Date.now()-h}),b&&_&&re(o,t)}i.addEventListener("pointermove",ke,{passive:!1});function ee(n){if(T&&n.preventDefault(),T&&!_)return;const a=i.getBoundingClientRect();let{x:o,y:t}=te(n,a);if(h>0&&w.push({action:"up",enabled:b,x:o,y:t,time:Date.now()-h}),h>=0&&b&&_){if(_=!1,w.push({action:"point",x:o/i.width,y:t/i.height,time:Date.now()-h}),z.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(o,t,K/2,0,Math.PI*2),e.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,e.fill()}}i.addEventListener("pointerup",ee),i.addEventListener("pointercancel",ee);function re(n,a){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(n-1,a-1,U/2,0,Math.PI*2),e.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]}, 0.2)`,e.fill()}function te(n,a){let o,t;return n instanceof MouseEvent?(o=n.clientX-a.left,t=n.clientY-a.top):(o=n.changedTouches[0].clientX-a.left,t=n.changedTouches[0].clientY-a.top),{x:o,y:t}}for(let n=1;n<=4;n++)(he=document.getElementById("neoCaptcha-guess-button-"+n))==null||he.addEventListener("pointerdown",Z),(me=document.getElementById("neoCaptcha-guess-button-"+n))==null||me.addEventListener("pointerup",a=>{ee(a),Ie(n)});function Ie(n){let a=document.getElementById("neoCaptcha-guess-icon-"+n).src,o=a.split("/");a=o[o.length-1].split(".")[0],w.push({action:"guess",tag:a,time:Date.now()-h}),ae()}z==null||z.addEventListener("click",ae);async function ae(){if(!b)return;b=!1,z.disabled=!0;for(let c=1;c<=4;c++)document.getElementById("neoCaptcha-guess-button-"+c).disabled=!0;if(!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,f.width,f.height),R===0&&(R=Date.now());const n=R-h;w.push({action:"end",time:n});const a={challenge:j,hmac:F,activity:w},o=await fetch(ie+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});let t=!1,C=!1;try{const c=await o.json();t=c.valid,C=c.retry,C&&(j=c.challenge,F=c.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const s=i.width*.1;let y=i.width/2,W=i.height/2;const r=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let c=y+s/8,p=W+s/4;L(r,c,p),e.lineWidth=s+17,L(r,c,p),e.lineWidth=s+14,L(r,c,p),e.lineWidth=s+11,L(r,c,p),e.lineWidth=s+8,L(r,c,p),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=s,L(r,y,W)}else if(C){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let c=y+s/8,p=W+s/4;M(r,c,p),e.lineWidth=s+17,M(r,c,p),e.lineWidth=s+14,M(r,c,p),e.lineWidth=s+11,M(r,c,p),e.lineWidth=s+8,M(r,c,p),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=s,M(r,y,W)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let c=y+s/8,p=W+s/4;D(r,c,p),e.lineWidth=s+17,D(r,c,p),e.lineWidth=s+14,D(r,c,p),e.lineWidth=s+11,D(r,c,p),e.lineWidth=s+8,D(r,c,p),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=s,D(r,y,W)}t&&I&&I.onSuccess?I.onSuccess():C?setTimeout(()=>{Be(),se()},500):I&&I.onFailure&&I.onFailure()}function L(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t/2,o+t),e.lineTo(a-t-t/2,o),e.moveTo(a-t/2,o+t),e.lineTo(a+n-t/2,o-t),e.stroke()}function D(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t,o-t),e.lineTo(a+t,o+t),e.moveTo(a+t,o-t),e.lineTo(a-t,o+t),e.stroke()}function M(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t,o),e.lineTo(a-t+1,o),e.moveTo(a,o),e.lineTo(a+1,o),e.moveTo(a+t,o),e.lineTo(a+t+1,o),e.stroke()}function Be(){_=!1,w=[],h=0,R=0,q=0,x=0,b=!1,z.disabled=!0,J="",K=0,U=0;const n=document.getElementById("neoCaptcha-wrapper");n.style.display="none",X.style.display="block",m&&m.clearRect(0,0,f.width,f.height),(S||A)&&(G.style.background=ce,$.innerText="do_not_touch"),$.style.animation="none"}}return window.NeoCAPTCHA={render:ne},Y.renderCaptcha=ne,Object.defineProperty(Y,Symbol.toStringTag,{value:"Module"}),Y}({});
