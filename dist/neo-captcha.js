var NeoCAPTCHA=function(ge){"use strict";const Ve=`
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
    --neo-captcha-gradient: linear-gradient(color-mix(in srgb, var(--neo-captcha-fg) 2%, transparent), color-mix(in srgb, var(--neo-captcha-fg) 15%, transparent));
    --neo-captcha-warn: #b14300;
}

.neo-captcha-theme-dark {
    --neo-captcha-bg: var(--neo-captcha-bg-dark);
    --neo-captcha-bg2: var(--neo-captcha-bg2-dark);
    --neo-captcha-fg: var(--neo-captcha-fg-dark);
    --neo-captcha-gradient: linear-gradient(color-mix(in srgb, var(--neo-captcha-fg) 25%, transparent), color-mix(in srgb, var(--neo-captcha-fg) 5%, transparent));
    --neo-captcha-warn: #fa7d00;
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
    padding: 1rem;
    margin: 0;
}

.neo-captcha-logo {
    margin: 0 1rem 0 0;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    padding: 0;
}

.neo-captcha-caption {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--neo-captcha-fg);
    margin: 0 0 0.2rem 0;
    padding: 0;
}

.neo-captcha-main-canvas {
    width: 18rem;
    height: 18rem;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 2;
    position: absolute;
    margin: 0;
    padding: 0;
    touch-action: none;
}

.neo-captcha-time {
    width: 18rem;
    height: 1rem;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
    margin: 0;
    padding: 0;
}

.neo-captcha-image {
    width: 18rem;
    height: 18rem;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 1;
    position: absolute;
    display: none;
    margin: 0;
    padding: 0;
}

.neo-captcha-container {
    width: 18rem;
    height: 18rem;
    position: relative;
    display: flex;
    margin: 0;
    padding: 0;
}

.neo-captcha-button {
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0;
    padding: 0;

    background: linear-gradient(color-mix(in srgb, var(--neo-captcha-button) 80%, var(--neo-captcha-light)), var(--neo-captcha-button));
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 4px 0.5rem color-mix(in srgb, var(--neo-captcha-fg) 30%, transparent);

    &:disabled {
        opacity: 0.5;
        box-shadow: none;
    }

    &:hover:enabled {
        background: linear-gradient(color-mix(in srgb, var(--neo-captcha-button) 80%, white), color-mix(in srgb, var(--neo-captcha-button) 80%, white));
        box-shadow: 0 6px 0.75rem color-mix(in srgb, var(--neo-captcha-fg) 30%, transparent);
        transform: translateY(-1px);
    }

    &:active:enabled {
        background: linear-gradient(var(--neo-captcha-button), var(--neo-captcha-button));
        box-shadow: none;
    }
}

.neo-captcha-submit-button {
    width: 18rem;
    height: 4rem;
    margin: 0;
    padding: 0;
}

.neo-captcha-guess-region {
    width: 18rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.25rem;
    margin: 0;
    padding: 0;
}

.neo-captcha-multi-button {
    font-size: 1rem;
    margin: 0;
    padding: 0;
}

.neo-captcha-start-button {
    width: 18rem;
    height: 15rem;
    margin: 0.25rem 0 0 0;
    padding: 0;
}

.neo-captcha-icon-div {
    width: 18rem;
    height: 18rem;
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
    width: 18rem;
    height: 18rem;
    position: absolute;
    z-index: -1;
    transform: translateY(1px) translateX(1px);
    margin: 0;
    padding: 0;
}

.neo-captcha-overlay-bg-fill {
    width: 18rem;
    height: 0;
    position: absolute;
    bottom: 0;
    z-index: -1;
    transform: translateY(1px) translateX(1px);
    margin: 0;
    padding: 0;
}

.neo-captcha-signal-text {
    top: 0.5rem;
    font-size: 1.3rem;
    color: var(--neo-captcha-light);
    text-shadow: #000 0 0 0.25rem;
    position: absolute;
}

.neo-captcha-icon {
    font-size: 5rem;
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

@keyframes shake {
    0% {
        transform: rotate(-10deg) translateX(-1rem);
    }
    50% {
        transform: rotate(10deg) translateX(1rem);
    }
    100% {
        transform: rotate(-10deg) translateX(-1rem);
    }
}


.neo-captcha-fg-icon {
    font-size: 3rem;
    color: var(--neo-captcha-fg);
    margin: 0;
    padding: 0;
}

.neo-captcha-icon-dark {
    font-size: 3rem;
    max-width: 3rem;
    max-height: 3rem;
    color: var(--neo-captcha-dark);
    margin: 0;
    padding: 0;
}

.neo-captcha-start-icon {
    font-size: 5rem;
    max-width: 5rem;
    max-height: 5rem;
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
    margin: 0 0 0.5rem 0;
    padding: 0;
}

.neo-captcha-how-to {
    width: 18rem;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
    margin: 0;
    padding: 0;
}

.neo-captcha-how-to-text {
    font-size: 0.9rem;
    text-align: start;
    margin: 0;
    padding: 0;
}

.neo-captcha-how-to-caption {
    font-size: 0.75rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0.1rem 1rem 0.1rem 1rem;
    background: var(--neo-captcha-gradient);
    display: flex;
    flex-direction: row;
    margin: 0;
}

.neo-captcha-how-to-title {
    margin: 0.2rem 0 0 0;
}

.neo-captcha-how-to-table {
    padding: 0.25rem 1rem 0.5rem 1rem;
    background: color-mix(in srgb, var(--neo-captcha-fg) 7%, transparent);
    margin: 0;
}

.neo-captcha-how-to-description {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: start;
    padding: 0.25rem 0.5rem 0.5rem 0.5rem;
    margin: 0;
}

.neo-captcha-mode-icon {
    width: 2rem;
    height: 2rem;
    margin: 0 0.75rem 0 0;
    padding: 0;
}

.neo-captcha-how-to-header {
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
}

.neo-captcha-how-to-header-mode {
    padding: 0;
    margin: 0.25rem 1rem 0 0.5rem;
}

.neo-captcha-how-to-header-mode-title {
    font-size: 1.2rem;
    color: var(--neo-captcha-accent);
    font-weight: bold;
    padding: 0;
    margin: 0;
    text-align: center;
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

.neo-captcha-warn-message {
    max-width: 19rem;
    font-size: 1rem;
    color: var(--neo-captcha-warn);
    margin: 4rem 0 3rem 0;
    display: none;
}
`;function Ke(){if(document.getElementById("neo-captcha-style"))return;const I=document.createElement("style");I.id="neo-captcha-style",I.textContent=Ve,document.head.appendChild(I)}function Ue(){if(document.getElementById("neo-captcha-material-icons"))return;const I=document.createElement("link");I.id="neo-captcha-material-icons",I.rel="stylesheet",I.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(I)}function ze(I,d,v){var qe,Fe,je;Ue(),Ke(),I.innerHTML=`
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
            <div class="neo-captcha-how-to-header-mode">
                <span id="neoCaptcha-mode" class="neo-captcha-how-to-header-mode-title"></span>
            </div>
            <div class="neo-captcha-how-to-description">
                <img id="neoCaptcha-modeIcon" class="neo-captcha-mode-icon" alt="icon variant">
                <div class="neo-captcha-how-to-header">
                    <span id="neoCaptcha-modeText"></span>
                </div>
            </div>
            <div id="neoCaptcha-howToCaption" class="neo-captcha-how-to-caption">
                <span id="neoCaptcha-howToTitle" class="neo-captcha-how-to-title"></span>
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
            </div>
        </div>
        <span id="neoCaptcha-warnMessage" class="neo-captcha-warn-message"></span>
        <button id="neoCaptcha-start" class="neo-captcha-button neo-captcha-start-button">
            <span class="neo-captcha-icon-dark neo-captcha-start-icon material-icons">play_arrow</span>
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
                    <div id="neoCaptcha-overlayBgFill" class="neo-captcha-overlay-bg-fill"></div>
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
    `;const ue="1.1.7",De="https://neo-captcha.com/api/v1",fe=(d==null?void 0:d.variant)||"ns",ne=fe==="ns"||fe==="ncs",Ze=(qe=window.matchMedia)==null?void 0:qe.call(window,"(prefers-color-scheme: dark)").matches,ae=(d==null?void 0:d.theme)==="dark"||(d==null?void 0:d.theme)==="light"?d.theme:Ze?"dark":"light";let g=(navigator.language||navigator.languages[0]).split("-")[0];g=(d==null?void 0:d.lang)||g;const Qe=(d==null?void 0:d.minDifficulty)||"easy",et=(d==null?void 0:d.showHowTo)||!1;let F=(d==null?void 0:d.expandHowTo)||!1;const j=(d==null?void 0:d.visualOnDesktop)||!1,w=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),_=document.getElementById("neoCaptcha-startOverlay"),X=document.getElementById("neoCaptcha-submit"),ve=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),n=c.getContext("2d"),M=document.getElementById("neoCaptcha-timeCanvas"),y=M.getContext("2d");if(!n||!y)throw new Error("Canvas context could not be initialized.");let A;ne?(document.getElementById("neoCaptcha-submit").style.display="none",A=!1):(document.getElementById("neoCaptcha-guess").style.display="none",c.style.cursor="crosshair",c.style.touchAction="none",A=!0),document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${ae}`),document.getElementById("neoCaptchaWidgetLogo").src=ae==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png",ne?document.getElementById("neoCaptcha-modeIcon").src=ae==="dark"?"https://neo-captcha.com/assets/icon_see_shape_dark.png":"https://neo-captcha.com/assets/icon_see_shape.png":document.getElementById("neoCaptcha-modeIcon").src=ae==="dark"?"https://neo-captcha.com/assets/icon_find_corner_dark.png":"https://neo-captcha.com/assets/icon_find_corner.png";const oe="#f406",be="#0f4a",s={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_desktop:"Click after the <b>sound cue!</b>",step_2_motion:"<b>Shake</b> your phone!",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape",mode_2_text:"Select the shape you see!",too_many_requests:"Please wait a minute before trying again."},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_desktop:"Klicke beim <b>Signalton!</b>",step_2_motion:"<b>Schüttel</b> dein Handy!",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form",mode_2_text:"Welche Form siehst du?",too_many_requests:"Bitte warte eine Minute, bevor du es erneut versuchst."}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(s[g]||s.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(s[g]||s.en).step_1,w||j?(document.getElementById("neoCaptcha-step_2").innerHTML=(s[g]||s.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(s[g]||s.en).step_2_motion):(document.getElementById("neoCaptcha-step_2").innerHTML=(s[g]||s.en).step_2_desktop,document.getElementById("neoCaptcha-signalText").innerHTML=(s[g]||s.en).step_2_desktop),document.getElementById("neoCaptcha-step_3").innerHTML=(s[g]||s.en).step_3,ne?(document.getElementById("neoCaptcha-mode").innerHTML=(s[g]||s.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(s[g]||s.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(s[g]||s.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(s[g]||s.en).mode_1_text);let U=6e3,x=[255,0,0],N=!1,k=[],b=0,Z=0,Q=0,C=0,T=!1,ye="",we=0,xe=0,ie,ce,Ce=0;const ee=50,tt=500/ee,G=.6;let H=0,B=0,L=0,P=0,S,z=[],W=!1,se=0;if(et){const t=document.getElementById("neoCaptcha-howToCaption"),e=document.getElementById("neoCaptcha-howToText"),a=document.getElementById("neoCaptcha-howToIcon");e.style.display=F?"block":"none",a.innerText=F?"expand_less":"expand_more",t.addEventListener("click",()=>{F=!F,e.style.display=F?"block":"none",a.innerText=F?"expand_less":"expand_more"})}else{const t=document.getElementById("neoCaptcha-howToCaption"),e=document.getElementById("neoCaptcha-howToText");t.style.display="none",e.style.display="none"}const O=document.getElementById("neoCaptcha-overlayBg");w||j?O.style.background=oe:O.style.background="#000";const D=document.getElementById("neoCaptcha-signalIcon");D.innerText=w||j?"do_not_touch":"hearing",ve.addEventListener("click",Ae);let R=w;function Ae(){w&&window.DeviceMotionEvent?(Y(!0),"requestPermission"in DeviceMotionEvent?DeviceMotionEvent.requestPermission().then(t=>{t==="granted"?(u("motion permission granted"),R=!0,window.addEventListener("devicemotion",Te)):(u("motion permission denied"),R=!1),re()}).catch(t=>{u("motion permission error"),Oe(t),R=!1,re()}):(u("motion allowed by default"),R=!0,window.addEventListener("devicemotion",Te),re())):(u("no motion available"),R=!1,re())}async function re(){u("version: "+ue),u("userAgent: "+navigator.userAgent),w&&Y(R);const t=document.getElementById("neoCaptcha-wrapper");t.style.display="flex",ve.style.display="none";const e={challenge:ie,hmac:ce,userAgent:navigator.userAgent,mobile:w,version:ue,minDifficulty:Qe,variant:fe},a=await Ne(fetch(De+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}));if(!(a!=null&&a.ok))return;const o=await a.json();if(o.img){const f=document.getElementById("neoCaptcha-image");f.style.display="inline-block",_.style.display="flex",ye=`data:image/png;base64,${o.img}`,x=o.color,ie=o.challenge,ce=o.hmac,U=o.totalTime||U,Ce=o.suspense;const i=document.getElementById("neoCaptcha-container");if(i.style.height="18rem",o.variant==="ns")for(let p=1;p<=4;p++)document.getElementById("neoCaptcha-guess-icon-"+p).src=`https://neo-captcha.com/assets/icon_shape_${o.icons[p-1]}.png`;if(c.style.width="18rem",c.style.height="18rem",c.width=c.clientWidth,c.height=c.width,we=c.width*o.pointSize,xe=c.width*o.thumbSize,!n||!y)throw new Error("Canvas context could not be initialized.");n.fillStyle="rgba(0, 0, 0)",n.fillRect(0,0,c.width,c.height),y.fillStyle=`rgba(${x[0]}, ${x[1]}, ${x[2]})`,Q=Date.now(),u("isMobile",w,"motionAllowed",R),w&&R?setTimeout(()=>at(),500):(u("beep timeout, no motion available"),setTimeout(()=>He(),Ce))}}function Y(t){w&&(t?(O.style.background=oe,D.innerText="edgesensor_low",D.style.animation="shake 0.4s ease-in-out infinite",document.getElementById("neoCaptcha-step_2").innerHTML=(s[g]||s.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(s[g]||s.en).step_2_motion,_.removeEventListener("pointerdown",le),_.removeEventListener("pointermove",Me),_.removeEventListener("pointerup",de),se=0,requestAnimationFrame(Ee)):(O.style.background=oe,D.innerText="do_not_touch",D.style.animation="none",document.getElementById("neoCaptcha-step_2").innerHTML=(s[g]||s.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(s[g]||s.en).step_2,_.addEventListener("pointerdown",le,{passive:!1}),_.addEventListener("pointermove",Me,{passive:!1}),_.addEventListener("pointerup",de)))}async function Te(t){if(W||u("handleMotion"),!(t instanceof DeviceMotionEvent))return;const e=Date.now();if(H>0&&e-H<ee)return;W||u("there is motion"),H=e;const a=t.accelerationIncludingGravity;if(a&&a.x!==null&&a.y!==null&&a.z!==null){W||(W=!0,Y(!0)),B=G*B+(1-G)*a.x,L=G*L+(1-G)*a.y,P=G*P+(1-G)*a.z;let o=Math.sqrt(B*B+L*L+P*P),f=Math.sqrt(B*B+L*L);if(S){let i=o-S.mag,p=B-S.x,E=L-S.y,h=P-S.z;S={mag:o,move:f,x:B,y:L,z:P,dmag:i,dx:p,dy:E,dz:h,time:e-Q},z.push(S),z.length>tt&&(C<=0&&(C=Date.now()),nt()?requestAnimationFrame(()=>{Ee(),O.style.background=be,D.style.animation="none",D.innerText="check",new Promise(()=>setTimeout(()=>{le(),de()},ee*2))}):requestAnimationFrame(()=>{Ee(),O.style.background=oe}))}else S={mag:o,move:f,x:B,y:L,z:P,dmag:0,dx:0,dy:0,dz:0,time:e-Q}}else Y(!1)}function Ee(){let t=document.getElementById("neoCaptcha-overlayBgFill"),e=se/100*18;t.style.height=e+"rem",t.style.background=be}function nt(t=!1){let i=0,p=0,E=0,h=99,r=-99,l=0,he=0;function Xe(){i=0,p=0,E=0,h=99,r=-99}let pe=0,me=0,te,lt=5e3/ee;z=z.slice(Math.max(0,z.length-lt),z.length);for(const m of z){if(me++,!te){te=m;continue}Math.abs(m.move-te.move)<2?he++:he=0;let Se=!1;if(Math.abs(m.x)>2&&he<5?(m.x<te.x?(t&&u(me,"<left","x:",m.x,"move:",m.move,"mag:",m.mag),i===1?Se=!0:p++,i=-1):(t&&u(me,"right>","x:",m.x,"move:",m.move,"mag:",m.mag),i===-1?Se=!0:p++,i=1),l+=Math.max(m.x-1,m.move-2),E+=m.mag,h=Math.min(h,Math.sign(m.x)*m.move),r=Math.max(r,Math.sign(m.x)*m.move)):m.mag>9&&(t&&u(me,"idle"),Xe(),pe=0,l=Math.max(0,l-Math.max(2,he-2))),Se){let Ge=2<=p&&p<=5,Ye=E/p,Je=Math.abs(r-h);Ge&&(l+=1),Ye>7&&(l+=1),Je>4&&(l+=1),Ge&&Ye>7&&Je>4&&(pe++,l+=10),Xe()}if(te=m,pe<1&&(l=Math.min(l,60)),l>=100)break}return l=Math.max(0,Math.min(100,l)),se=l,pe<1&&i===0&&(C=Date.now()),se==100}function at(){!W||H<=0?(u("beepIfNoMotion","motionEnabled:",W,"lastMotionTime:",H),Y(!1),setTimeout(()=>He(),Ce-500)):u("no beep","motionEnabled:",W,"lastMotionTime:",H)}function He(){w||j?(O.style.background=be,D.innerText="touch_app",D.style.animation="blinker 0.5s ease-in-out infinite",C=Date.now()):ot()}const $=new AudioContext,ot=()=>{$.state==="suspended"?$.resume().then(()=>Pe()):Pe()},Pe=()=>{_e(285,.12),_e(852,.12,.12),_e(528,.12,.24),C=Date.now()};function _e(t,e,a=0){let o=$.createOscillator(),f=$.createGain();o.type="sine",o.frequency.value=t,f.gain.value=.1,o.connect(f),f.connect($.destination),o.start($.currentTime+a),o.stop($.currentTime+a+e)}let q;function le(){if(b==0){let t;C<=0?t=0:t=Date.now()-C,q={action:"react",time:t}}}_.addEventListener("pointerdown",le,{passive:!1}),_.addEventListener("pointermove",Me,{passive:!1});function Me(){C<=0&&(q=void 0)}function de(){if(C<=0&&(q={action:"react",time:-1},C=1),!(q&&q.time===0)&&C>0&&b==0&&q){if(H>0){window.removeEventListener("devicemotion",Te);for(const e of z){let a=Object.assign({},e);a.action="motion",k.push(a)}}k.push(q),k.push({action:"start",time:Date.now()-Q}),T=!0;const t=document.getElementById("neoCaptcha-image");if(t.src=ye,it(),!n)throw new Error("Canvas context could not be initialized.");if(n.clearRect(0,0,c.width,c.height),_.style.display="none",ne)for(let e=1;e<=4;e++)document.getElementById("neoCaptcha-guess-button-"+e).disabled=!1}}_.addEventListener("pointerup",de);function it(){b=Date.now(),We()}function We(){if(!y)throw new Error("Canvas context could not be initialized.");const t=Date.now()-b,e=Math.max(U-t,0),a=e/U*M.width;y.clearRect(0,0,M.width,M.height),y.fillStyle=`rgba(${x[0]}, ${x[1]}, ${x[2]})`,y.fillRect(0,0,a,M.height),e>0&&T?requestAnimationFrame(We):e<=0&&T?(u("Time's up!"),Z=b+U,Le()):(y.fillStyle="rgba(255, 255, 255, 0.8)",y.fillRect(0,0,M.width,M.height))}function ke(t){if(A&&t.preventDefault(),b>0){const e=c.getBoundingClientRect();let{x:a,y:o}=Be(t,e);k.push({action:"down",enabled:T,x:a,y:o,time:Date.now()-b}),T&&A&&(N=!0,Re(a,o))}}A?(c.style.touchAction="none",c.addEventListener("pointerdown",ke,{passive:!1})):(c.style.touchAction="auto",c.addEventListener("pointerdown",ke));function ct(t){A&&t.preventDefault();const e=c.getBoundingClientRect();let{x:a,y:o}=Be(t,e);b>0&&k.push({action:"move",enabled:T,drawing:N,x:a,y:o,time:Date.now()-b}),T&&N&&Re(a,o)}c.addEventListener("pointermove",ct,{passive:!1});function Ie(t){if(A&&t.preventDefault(),A&&!N)return;const e=c.getBoundingClientRect();let{x:a,y:o}=Be(t,e);if(b>0&&k.push({action:"up",enabled:T,x:a,y:o,time:Date.now()-b}),b>=0&&T&&N){if(N=!1,k.push({action:"point",x:a/c.width,y:o/c.height,time:Date.now()-b}),X.disabled=!1,!n)throw new Error("Canvas context could not be initialized.");n.clearRect(0,0,c.width,c.height),n.beginPath(),n.arc(a,o,we/2,0,Math.PI*2),n.fillStyle=`rgba(${x[0]}, ${x[1]}, ${x[2]})`,n.fill()}}c.addEventListener("pointerup",Ie),c.addEventListener("pointercancel",Ie);function Re(t,e){if(!n)throw new Error("Canvas context could not be initialized.");n.clearRect(0,0,c.width,c.height),n.beginPath(),n.arc(t-1,e-1,xe/2,0,Math.PI*2),n.fillStyle=`rgba(${x[0]}, ${x[1]}, ${x[2]}, 0.2)`,n.fill()}function Be(t,e){let a,o;return t instanceof MouseEvent?(a=t.clientX-e.left,o=t.clientY-e.top):(a=t.changedTouches[0].clientX-e.left,o=t.changedTouches[0].clientY-e.top),{x:a,y:o}}for(let t=1;t<=4;t++)(Fe=document.getElementById("neoCaptcha-guess-button-"+t))==null||Fe.addEventListener("pointerdown",ke),(je=document.getElementById("neoCaptcha-guess-button-"+t))==null||je.addEventListener("pointerup",e=>{Ie(e),st(t)});function st(t){let e=document.getElementById("neoCaptcha-guess-icon-"+t).src,a=e.split("/");e=a[a.length-1].split(".")[0],k.push({action:"guess",tag:e,time:Date.now()-b}),Le()}X==null||X.addEventListener("click",Le);async function Le(){if(!T)return;T=!1,X.disabled=!0;for(let r=1;r<=4;r++)document.getElementById("neoCaptcha-guess-button-"+r).disabled=!0;if(!n||!y)throw new Error("Canvas context could not be initialized.");n.fillStyle="rgba(255, 255, 255, 0.8)",n.fillRect(0,0,c.width,c.height),y.fillStyle="rgba(255, 255, 255, 0.8)",y.fillRect(0,0,M.width,M.height),Z===0&&(Z=Date.now());const t=Z-b;k.push({action:"end",time:t});const e={challenge:ie,hmac:ce,activity:k,mobile:w,version:ue,motionThrottle:ee},a=await Ne(fetch(De+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}));if(!(a!=null&&a.ok))return;let o=!1,f=!1;try{const r=await a.json();o=r.valid,f=r.retry,f&&(ie=r.challenge,ce=r.hmac)}catch{}n.lineJoin="round",n.lineCap="round";const i=c.width*.1;let p=c.width/2,E=c.height/2;const h=c.width/3;if(o){n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=i+20;let r=p+i/8,l=E+i/4;J(h,r,l),n.lineWidth=i+17,J(h,r,l),n.lineWidth=i+14,J(h,r,l),n.lineWidth=i+11,J(h,r,l),n.lineWidth=i+8,J(h,r,l),n.strokeStyle="rgba(0, 160, 0)",n.lineWidth=i,J(h,p,E)}else if(f){n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=i+20;let r=p+i/8,l=E+i/4;K(h,r,l),n.lineWidth=i+17,K(h,r,l),n.lineWidth=i+14,K(h,r,l),n.lineWidth=i+11,K(h,r,l),n.lineWidth=i+8,K(h,r,l),n.strokeStyle="rgba(0, 80, 255)",n.lineWidth=i,K(h,p,E)}else{n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=i+20;let r=p+i/8,l=E+i/4;V(h,r,l),n.lineWidth=i+17,V(h,r,l),n.lineWidth=i+14,V(h,r,l),n.lineWidth=i+11,V(h,r,l),n.lineWidth=i+8,V(h,r,l),n.strokeStyle="rgba(255, 0, 0)",n.lineWidth=i,V(h,p,E)}o&&(v!=null&&v.onSuccess)?v.onSuccess():f?setTimeout(()=>{rt(),Ae()},500):v!=null&&v.onFailure&&v.onFailure()}function J(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o/2,a+o),n.lineTo(e-o-o/2,a),n.moveTo(e-o/2,a+o),n.lineTo(e+t-o/2,a-o),n.stroke()}function V(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o,a-o),n.lineTo(e+o,a+o),n.moveTo(e+o,a-o),n.lineTo(e-o,a+o),n.stroke()}function K(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o,a),n.lineTo(e-o+1,a),n.moveTo(e,a),n.lineTo(e+1,a),n.moveTo(e+o,a),n.lineTo(e+o+1,a),n.stroke()}function rt(){N=!1,k=[],b=0,Z=0,Q=0,C=0,T=!1,X.disabled=!0,ye="",we=0,xe=0;const t=document.getElementById("neoCaptcha-wrapper");t.style.display="none",ve.style.display="block",y&&y.clearRect(0,0,M.width,M.height),(w||j)&&(Y(!0),!j&&W&&(H=0,B=0,L=0,P=0,S=void 0,z=[]))}async function Ne(t){let e;try{e=await t,e.ok||(e.status===429?(document.getElementById("neoCaptcha-warnMessage").innerHTML=(s[g]||s.en).too_many_requests,document.getElementById("neoCaptcha-warnMessage").style.display="block",document.getElementById("neoCaptcha-wrapper").style.display="none"):(alert("Error "+e.status+(e.statusText?": "+e.statusText:"")),v!=null&&v.onError&&v.onError({status:e.status,message:e.statusText})))}catch(a){Oe(a),v!=null&&v.onError&&v.onError(a)}return e}function u(t,...e){$e(" > ",t,e),console.log(t,e)}function Oe(t,...e){$e("!!! ERROR: ",t,e),console.error(t,e)}function $e(t,e,a){let o=document.getElementById("testLogs");if(o){let f=JSON.stringify(e)+" ";a&&(f+=a.map(p=>JSON.stringify(p)).join(" "));let i=o;i.value+=t+f+`
`,i.scrollTop=i.scrollHeight}}}return window.NeoCAPTCHA={render:ze},ge.renderCaptcha=ze,Object.defineProperty(ge,Symbol.toStringTag,{value:"Module"}),ge}({});
