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
`;function Ke(){if(document.getElementById("neo-captcha-style"))return;const B=document.createElement("style");B.id="neo-captcha-style",B.textContent=Ve,document.head.appendChild(B)}function Ue(){if(document.getElementById("neo-captcha-material-icons"))return;const B=document.createElement("link");B.id="neo-captcha-material-icons",B.rel="stylesheet",B.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(B)}function ze(B,d,l){var qe,Fe,je;Ue(),Ke(),B.innerHTML=`
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
    `;const ue="1.2.0",De="https://neo-captcha.com/api/v1",fe=(d==null?void 0:d.variant)||"ns",ae=fe==="ns"||fe==="ncs",Ze=(qe=window.matchMedia)==null?void 0:qe.call(window,"(prefers-color-scheme: dark)").matches,oe=(d==null?void 0:d.theme)==="dark"||(d==null?void 0:d.theme)==="light"?d.theme:Ze?"dark":"light";let u=(navigator.language||navigator.languages[0]).split("-")[0];u=(d==null?void 0:d.lang)||u;const Qe=(d==null?void 0:d.minDifficulty)||"easy",et=(d==null?void 0:d.showHowTo)||!1;let j=(d==null?void 0:d.expandHowTo)||!1;const X=(d==null?void 0:d.visualOnDesktop)||!1,w=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),M=document.getElementById("neoCaptcha-startOverlay"),G=document.getElementById("neoCaptcha-submit"),ve=document.getElementById("neoCaptcha-start"),s=document.getElementById("neoCaptcha-captchaCanvas"),n=s.getContext("2d"),I=document.getElementById("neoCaptcha-timeCanvas"),b=I.getContext("2d");if(!n||!b)throw new Error("Canvas context could not be initialized.");let H;ae?(document.getElementById("neoCaptcha-submit").style.display="none",H=!1):(document.getElementById("neoCaptcha-guess").style.display="none",s.style.cursor="crosshair",s.style.touchAction="none",H=!0),document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${oe}`),document.getElementById("neoCaptchaWidgetLogo").src=oe==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png",ae?document.getElementById("neoCaptcha-modeIcon").src=oe==="dark"?"https://neo-captcha.com/assets/icon_see_shape_dark.png":"https://neo-captcha.com/assets/icon_see_shape.png":document.getElementById("neoCaptcha-modeIcon").src=oe==="dark"?"https://neo-captcha.com/assets/icon_find_corner_dark.png":"https://neo-captcha.com/assets/icon_find_corner.png";const ie="#f406",ye="#0f4a",r={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_desktop:"Click after the <b>sound cue!</b>",step_2_motion:"<b>Shake</b> your phone!",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape",mode_2_text:"Select the shape you see!",too_many_requests:"Please wait a minute before trying again."},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_desktop:"Klicke beim <b>Signalton!</b>",step_2_motion:"<b>Schüttel</b> dein Handy!",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form",mode_2_text:"Welche Form siehst du?",too_many_requests:"Bitte warte eine Minute, bevor du es erneut versuchst."}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(r[u]||r.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(r[u]||r.en).step_1,w||X?(document.getElementById("neoCaptcha-step_2").innerHTML=(r[u]||r.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(r[u]||r.en).step_2_motion):(document.getElementById("neoCaptcha-step_2").innerHTML=(r[u]||r.en).step_2_desktop,document.getElementById("neoCaptcha-signalText").innerHTML=(r[u]||r.en).step_2_desktop),document.getElementById("neoCaptcha-step_3").innerHTML=(r[u]||r.en).step_3,ae?(document.getElementById("neoCaptcha-mode").innerHTML=(r[u]||r.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(r[u]||r.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(r[u]||r.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(r[u]||r.en).mode_1_text);let Z=6e3,x=[255,0,0],O=!1,k=[],y=0,Q=0,ee=0,T=0,E=!1,be="",we=0,xe=0,ce,se,Ce=0;const te=50,tt=500/te,Y=.6;let P=0,L=0,S=0,R=0,z,D=[],W=!1,re=0;if(et){const t=document.getElementById("neoCaptcha-howToCaption"),e=document.getElementById("neoCaptcha-howToText"),a=document.getElementById("neoCaptcha-howToIcon");e.style.display=j?"block":"none",a.innerText=j?"expand_less":"expand_more",t.addEventListener("click",()=>{j=!j,e.style.display=j?"block":"none",a.innerText=j?"expand_less":"expand_more"})}else{const t=document.getElementById("neoCaptcha-howToCaption"),e=document.getElementById("neoCaptcha-howToText");t.style.display="none",e.style.display="none"}const $=document.getElementById("neoCaptcha-overlayBg");w||X?$.style.background=ie:$.style.background="#000";const A=document.getElementById("neoCaptcha-signalIcon");A.innerText=w||X?"do_not_touch":"hearing",ve.addEventListener("click",Ae);let N=w;function Ae(){w&&window.DeviceMotionEvent?(J(!0),"requestPermission"in DeviceMotionEvent?DeviceMotionEvent.requestPermission().then(t=>{t==="granted"?(f("motion permission granted"),N=!0,window.addEventListener("devicemotion",Te)):(f("motion permission denied"),N=!1),de()}).catch(t=>{f("motion permission error"),Oe(t),N=!1,de()}):(f("motion allowed by default"),N=!0,window.addEventListener("devicemotion",Te),de())):(f("no motion available"),N=!1,de())}async function de(){f("version: "+ue),f("userAgent: "+navigator.userAgent),w&&J(N);const t=document.getElementById("neoCaptcha-wrapper");t.style.display="flex",ve.style.display="none";const e={challenge:ce,hmac:se,userAgent:navigator.userAgent,mobile:w,version:ue,minDifficulty:Qe,variant:fe},a=await Ne(fetch(De+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}));if(!(a!=null&&a.ok))return;const o=await a.json();if(o.img){const v=document.getElementById("neoCaptcha-image");v.style.display="inline-block",M.style.display="flex",be=`data:image/png;base64,${o.img}`,x=o.color,ce=o.challenge,se=o.hmac,Z=o.totalTime||Z,Ce=o.suspense;const p=document.getElementById("neoCaptcha-container");if(p.style.height="18rem",o.variant==="ns")for(let c=1;c<=4;c++)document.getElementById("neoCaptcha-guess-icon-"+c).src=`https://neo-captcha.com/assets/icon_shape_${o.icons[c-1]}.png`;if(s.style.width="18rem",s.style.height="18rem",s.width=s.clientWidth,s.height=s.width,we=s.width*o.pointSize,xe=s.width*o.thumbSize,!n||!b)throw new Error("Canvas context could not be initialized.");n.fillStyle="rgba(0, 0, 0)",n.fillRect(0,0,s.width,s.height),b.fillStyle=`rgba(${x[0]}, ${x[1]}, ${x[2]})`,ee=Date.now(),f("isMobile",w,"motionAllowed",N),w&&N?setTimeout(()=>at(),500):(f("beep timeout, no motion available"),setTimeout(()=>He(),Ce))}}function J(t){w&&(t?($.style.background=ie,A.innerText="edgesensor_low",A.style.animation="shake 0.4s ease-in-out infinite",document.getElementById("neoCaptcha-step_2").innerHTML=(r[u]||r.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(r[u]||r.en).step_2_motion,M.removeEventListener("pointerdown",le),M.removeEventListener("pointermove",Me),M.removeEventListener("pointerup",he),re=0,requestAnimationFrame(Ee)):($.style.background=ie,A.innerText="do_not_touch",A.style.animation="none",document.getElementById("neoCaptcha-step_2").innerHTML=(r[u]||r.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(r[u]||r.en).step_2,M.addEventListener("pointerdown",le,{passive:!1}),M.addEventListener("pointermove",Me,{passive:!1}),M.addEventListener("pointerup",he)))}async function Te(t){if(W||f("handleMotion"),!(t instanceof DeviceMotionEvent))return;const e=Date.now();if(P>0&&e-P<te)return;W||f("there is motion"),P=e;const a=t.accelerationIncludingGravity;if(a&&a.x!==null&&a.y!==null&&a.z!==null){W||(W=!0,J(!0)),L=Y*L+(1-Y)*a.x,S=Y*S+(1-Y)*a.y,R=Y*R+(1-Y)*a.z;let o=Math.sqrt(L*L+S*S+R*R),v=Math.sqrt(L*L+S*S);if(z){let p=o-z.mag,c=L-z.x,_=S-z.y,C=R-z.z;z={mag:o,move:v,x:L,y:S,z:R,dmag:p,dx:c,dy:_,dz:C,time:e-ee},D.push(z),D.length>tt&&(T<=0&&(T=Date.now()),nt()?requestAnimationFrame(()=>{Ee(),$.style.background=ye,A.style.animation="none",A.innerText="check",new Promise(()=>setTimeout(()=>{le(),he()},te*2))}):requestAnimationFrame(()=>{Ee(),$.style.background=ie}))}else z={mag:o,move:v,x:L,y:S,z:R,dmag:0,dx:0,dy:0,dz:0,time:e-ee}}else J(!1)}function Ee(){let t=document.getElementById("neoCaptcha-overlayBgFill"),e=re/100*18;t.style.height=e+"rem",t.style.background=ye}function nt(t=!1){let p=0,c=0,_=0,C=99,h=-99,i=0,m=0;function Xe(){p=0,c=0,_=0,C=99,h=-99}let pe=0,me=0,ne,dt=5e3/te;D=D.slice(Math.max(0,D.length-dt),D.length);for(const g of D){if(me++,!ne){ne=g;continue}Math.abs(g.move-ne.move)<2?m++:m=0;let Se=!1;if(Math.abs(g.x)>2&&m<5?(g.x<ne.x?(t&&f(me,"<left","x:",g.x,"move:",g.move,"mag:",g.mag),p===1?Se=!0:c++,p=-1):(t&&f(me,"right>","x:",g.x,"move:",g.move,"mag:",g.mag),p===-1?Se=!0:c++,p=1),i+=Math.max(g.x-1,g.move-2),_+=g.mag,C=Math.min(C,Math.sign(g.x)*g.move),h=Math.max(h,Math.sign(g.x)*g.move)):g.mag>9&&(t&&f(me,"idle"),Xe(),pe=0,i=Math.max(0,i-Math.max(2,m-2))),Se){let Ge=2<=c&&c<=5,Ye=_/c,Je=Math.abs(h-C);Ge&&(i+=1),Ye>7&&(i+=1),Je>4&&(i+=1),Ge&&Ye>7&&Je>4&&(pe++,i+=10),Xe()}if(ne=g,pe<1&&(i=Math.min(i,60)),i>=100)break}return i=Math.max(0,Math.min(100,i)),re=i,pe<1&&p===0&&(T=Date.now()),re==100}function at(){!W||P<=0?(f("beepIfNoMotion","motionEnabled:",W,"lastMotionTime:",P),J(!1),setTimeout(()=>He(),Ce-500)):f("no beep","motionEnabled:",W,"lastMotionTime:",P)}function He(){w||X?($.style.background=ye,A.innerText="touch_app",A.style.animation="blinker 0.5s ease-in-out infinite",T=Date.now()):ot()}const q=new AudioContext,ot=()=>{q.state==="suspended"?q.resume().then(()=>Pe()):Pe()},Pe=()=>{_e(285,.12),_e(852,.12,.12),_e(528,.12,.24),T=Date.now()};function _e(t,e,a=0){let o=q.createOscillator(),v=q.createGain();o.type="sine",o.frequency.value=t,v.gain.value=.1,o.connect(v),v.connect(q.destination),o.start(q.currentTime+a),o.stop(q.currentTime+a+e)}let F;function le(){if(y==0){let t;T<=0?t=0:t=Date.now()-T,F={action:"react",time:t}}}M.addEventListener("pointerdown",le,{passive:!1}),M.addEventListener("pointermove",Me,{passive:!1});function Me(){T<=0&&(F=void 0)}function he(){if(T<=0&&(F={action:"react",time:-1},T=1),!(F&&F.time===0)&&T>0&&y==0&&F){if(P>0){window.removeEventListener("devicemotion",Te);for(const e of D){let a=Object.assign({},e);a.action="motion",k.push(a)}}k.push(F),k.push({action:"start",time:Date.now()-ee}),E=!0;const t=document.getElementById("neoCaptcha-image");if(t.src=be,it(),!n)throw new Error("Canvas context could not be initialized.");if(n.clearRect(0,0,s.width,s.height),M.style.display="none",ae)for(let e=1;e<=4;e++)document.getElementById("neoCaptcha-guess-button-"+e).disabled=!1}}M.addEventListener("pointerup",he);function it(){y=Date.now(),Re()}function Re(){if(!b)throw new Error("Canvas context could not be initialized.");const t=Date.now()-y,e=Math.max(Z-t,0),a=e/Z*I.width;b.clearRect(0,0,I.width,I.height),b.fillStyle=`rgba(${x[0]}, ${x[1]}, ${x[2]})`,b.fillRect(0,0,a,I.height),e>0&&E?requestAnimationFrame(Re):e<=0&&E?(f("Time's up!"),Q=y+Z,Le()):(b.fillStyle="rgba(255, 255, 255, 0.8)",b.fillRect(0,0,I.width,I.height))}function Ie(t){if(H&&t.preventDefault(),y>0){const e=s.getBoundingClientRect();let{x:a,y:o}=Be(t,e);k.push({action:"down",enabled:E,x:a,y:o,time:Date.now()-y}),E&&H&&(O=!0,We(a,o))}}H?(s.style.touchAction="none",s.addEventListener("pointerdown",Ie,{passive:!1})):(s.style.touchAction="auto",s.addEventListener("pointerdown",Ie));function ct(t){H&&t.preventDefault();const e=s.getBoundingClientRect();let{x:a,y:o}=Be(t,e);y>0&&k.push({action:"move",enabled:E,drawing:O,x:a,y:o,time:Date.now()-y}),E&&O&&We(a,o)}s.addEventListener("pointermove",ct,{passive:!1});function ke(t){if(H&&t.preventDefault(),H&&!O)return;const e=s.getBoundingClientRect();let{x:a,y:o}=Be(t,e);if(y>0&&k.push({action:"up",enabled:E,x:a,y:o,time:Date.now()-y}),y>=0&&E&&O){if(O=!1,k.push({action:"point",x:a/s.width,y:o/s.height,time:Date.now()-y}),G.disabled=!1,!n)throw new Error("Canvas context could not be initialized.");n.clearRect(0,0,s.width,s.height),n.beginPath(),n.arc(a,o,we/2,0,Math.PI*2),n.fillStyle=`rgba(${x[0]}, ${x[1]}, ${x[2]})`,n.fill()}}s.addEventListener("pointerup",ke),s.addEventListener("pointercancel",ke);function We(t,e){if(!n)throw new Error("Canvas context could not be initialized.");n.clearRect(0,0,s.width,s.height),n.beginPath(),n.arc(t-1,e-1,xe/2,0,Math.PI*2),n.fillStyle=`rgba(${x[0]}, ${x[1]}, ${x[2]}, 0.2)`,n.fill()}function Be(t,e){let a,o;return t instanceof MouseEvent?(a=t.clientX-e.left,o=t.clientY-e.top):(a=t.changedTouches[0].clientX-e.left,o=t.changedTouches[0].clientY-e.top),{x:a,y:o}}for(let t=1;t<=4;t++)(Fe=document.getElementById("neoCaptcha-guess-button-"+t))==null||Fe.addEventListener("pointerdown",Ie),(je=document.getElementById("neoCaptcha-guess-button-"+t))==null||je.addEventListener("pointerup",e=>{ke(e),st(t)});function st(t){let e=document.getElementById("neoCaptcha-guess-icon-"+t).src,a=e.split("/");e=a[a.length-1].split(".")[0],k.push({action:"guess",tag:e,time:Date.now()-y}),Le()}G==null||G.addEventListener("click",Le);async function Le(){if(!E)return;E=!1,G.disabled=!0;for(let i=1;i<=4;i++)document.getElementById("neoCaptcha-guess-button-"+i).disabled=!0;if(!n||!b)throw new Error("Canvas context could not be initialized.");n.fillStyle="rgba(255, 255, 255, 0.8)",n.fillRect(0,0,s.width,s.height),b.fillStyle="rgba(255, 255, 255, 0.8)",b.fillRect(0,0,I.width,I.height),Q===0&&(Q=Date.now());const t=Q-y;k.push({action:"end",time:t});const e={challenge:ce,hmac:se,activity:k,mobile:w,version:ue,motionThrottle:te,key:d==null?void 0:d.key},a=await Ne(fetch(De+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}));if(!(a!=null&&a.ok))return;let o=!1,v=!1,p;try{const i=await a.json();p=i.hash,o=p&&i.valid,v=p&&i.retry,v&&(ce=i.challenge,se=i.hmac)}catch{}n.lineJoin="round",n.lineCap="round";const c=s.width*.1;let _=s.width/2,C=s.height/2;const h=s.width/3;if(o){n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=c+20;let i=_+c/8,m=C+c/4;V(h,i,m),n.lineWidth=c+17,V(h,i,m),n.lineWidth=c+14,V(h,i,m),n.lineWidth=c+11,V(h,i,m),n.lineWidth=c+8,V(h,i,m),n.strokeStyle="rgba(0, 160, 0)",n.lineWidth=c,V(h,_,C)}else if(v){n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=c+20;let i=_+c/8,m=C+c/4;U(h,i,m),n.lineWidth=c+17,U(h,i,m),n.lineWidth=c+14,U(h,i,m),n.lineWidth=c+11,U(h,i,m),n.lineWidth=c+8,U(h,i,m),n.strokeStyle="rgba(0, 80, 255)",n.lineWidth=c,U(h,_,C)}else{n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=c+20;let i=_+c/8,m=C+c/4;K(h,i,m),n.lineWidth=c+17,K(h,i,m),n.lineWidth=c+14,K(h,i,m),n.lineWidth=c+11,K(h,i,m),n.lineWidth=c+8,K(h,i,m),n.strokeStyle="rgba(255, 0, 0)",n.lineWidth=c,K(h,_,C)}o&&(l!=null&&l.onSuccess)?(l.onSuccess(),p&&(l!=null&&l.onResult)&&l.onResult(p)):v?setTimeout(()=>{rt(),Ae()},500):l!=null&&l.onFailure&&(l.onFailure(),p&&(l!=null&&l.onResult)&&l.onResult(p))}function V(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o/2,a+o),n.lineTo(e-o-o/2,a),n.moveTo(e-o/2,a+o),n.lineTo(e+t-o/2,a-o),n.stroke()}function K(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o,a-o),n.lineTo(e+o,a+o),n.moveTo(e+o,a-o),n.lineTo(e-o,a+o),n.stroke()}function U(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o,a),n.lineTo(e-o+1,a),n.moveTo(e,a),n.lineTo(e+1,a),n.moveTo(e+o,a),n.lineTo(e+o+1,a),n.stroke()}function rt(){O=!1,k=[],y=0,Q=0,ee=0,T=0,E=!1,G.disabled=!0,be="",we=0,xe=0;const t=document.getElementById("neoCaptcha-wrapper");t.style.display="none",ve.style.display="block",b&&b.clearRect(0,0,I.width,I.height),(w||X)&&(J(!0),!X&&W&&(P=0,L=0,S=0,R=0,z=void 0,D=[]))}async function Ne(t){let e;try{e=await t,e.ok||(e.status===429?(document.getElementById("neoCaptcha-warnMessage").innerHTML=(r[u]||r.en).too_many_requests,document.getElementById("neoCaptcha-warnMessage").style.display="block",document.getElementById("neoCaptcha-wrapper").style.display="none"):(alert("Error "+e.status+(e.statusText?": "+e.statusText:"")),l!=null&&l.onError&&l.onError({status:e.status,message:e.statusText})))}catch(a){Oe(a),l!=null&&l.onError&&l.onError(a)}return e}function f(t,...e){$e(" > ",t,e),console.log(t,e)}function Oe(t,...e){$e("!!! ERROR: ",t,e),console.error(t,e)}function $e(t,e,a){let o=document.getElementById("testLogs");if(o){let v=JSON.stringify(e)+" ";a&&(v+=a.map(c=>JSON.stringify(c)).join(" "));let p=o;p.value+=t+v+`
`,p.scrollTop=p.scrollHeight}}}return window.NeoCAPTCHA={render:ze},ge.renderCaptcha=ze,Object.defineProperty(ge,Symbol.toStringTag,{value:"Module"}),ge}({});
