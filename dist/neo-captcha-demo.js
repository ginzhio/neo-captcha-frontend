var NeoCAPTCHA=function(me){"use strict";const Ke=`
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

.neo-captcha-try-mobile-hint {
    max-width: 19rem;
    font-size: 1rem;
    color: var(--neo-captcha-warn);
    margin: 1rem 0 0 0;
    display: none;
}

.neo-captcha-settings-box {
    width: 16rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1rem;
    text-align: end;
    align-items: baseline;
    padding: 2rem;
    margin: 0;
}

.neo-captcha-settings-title {
    font-size: 1.5rem;
    grid-column: 1/-1;
    text-align: center;
    padding: 0 1rem 0 0;
    margin: 0;
}

.neo-captcha-select {
    height: 3rem;
    margin: 0;
    padding: 0;
}
`;function Qe(){if(document.getElementById("neo-captcha-style"))return;const k=document.createElement("style");k.id="neo-captcha-style",k.textContent=Ke,document.head.appendChild(k)}function et(){if(document.getElementById("neo-captcha-material-icons"))return;const k=document.createElement("link");k.id="neo-captcha-material-icons",k.rel="stylesheet",k.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(k)}function De(k){var Ye,Xe;et(),Qe(),k.innerHTML=`
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
        <span id="neoCaptcha-tryMobileHint" class="neo-captcha-try-mobile-hint"></span>
        <div>
            <div class="neo-captcha-settings-box">
                <span class="neo-captcha-settings-title" id="neoCaptcha-settings"></span>
                <label for="neoCaptcha-selectVari" id="neoCaptcha-labelVari"></label>
                <select id="neoCaptcha-selectVari" class="neo-captcha-select">
                    <option id="neoCaptcha-optNs"></option>
                    <option id="neoCaptcha-optIq"></option>
                </select>
                <label for="neoCaptcha-selectDiff" id="neoCaptcha-labelDiff"></label>
                <select id="neoCaptcha-selectDiff" class="neo-captcha-select">
                    <option id="neoCaptcha-optEasy"></option>
                    <option id="neoCaptcha-optMedium"></option>
                    <option id="neoCaptcha-optHard"></option>
                </select>
            </div>
        </div>
    </div>
    `;const ge="1.1.8-demo",Ae="plYu5UtrxXE6YvmSeZ3W+M3L91UtWE7ZLYs5ckS47Ag=",Pe="https://neo-captcha.com/api/v1",y=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),w=document.getElementById("neoCaptcha-startOverlay"),T=document.getElementById("neoCaptcha-submit"),ue=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),n=c.getContext("2d"),_=document.getElementById("neoCaptcha-timeCanvas"),b=_.getContext("2d");if(!n||!b)throw new Error("Canvas context could not be initialized.");let O="ns",ae=O==="ns"||O==="ncs",H=!1;document.getElementById("neoCaptchaRoot").classList.add("neo-captcha-theme-dark"),document.getElementById("neoCaptchaWidgetLogo").src="https://neo-captcha.com/assets/logo-dark.png";const oe="#f406",fe="#0f4a";let d=(navigator.language||navigator.languages[0]).split("-")[0];console.log("lang: "+d);const i={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_desktop:"Click after the <b>sound cue!</b>",step_2_motion:"<b>Shake</b> your phone!",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape",mode_2_text:"Select the shape you see!",too_many_requests:"Please wait a minute before trying again.",try_mobile:"NeoCAPTCHA is optimized for real mobile devices!",settings:"Settings",settings_variant:"Variant:",settings_difficulty:"Difficulty:",opt_ns:"Neon Shape",opt_iq:"Implied Square",opt_easy:"Easy",opt_medium:"Medium",opt_hard:"Hard"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_desktop:"Klicke beim <b>Signalton!</b>",step_2_motion:"<b>Schüttel</b> dein Handy!",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form",mode_2_text:"Welche Form siehst du?",too_many_requests:"Bitte warte eine Minute, bevor du es erneut versuchst.",try_mobile:"NeoCAPTCHA ist für echte Mobilgeräte optimiert!",settings:"Einstellungen",settings_variant:"Variante:",settings_difficulty:"Schwierigkeit:",opt_ns:"Neon-Form",opt_iq:"Angedeutetes Viereck",opt_easy:"Einfach",opt_medium:"Mittel",opt_hard:"Schwer"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(i[d]||i.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(i[d]||i.en).step_1,y?(document.getElementById("neoCaptcha-step_2").innerHTML=(i[d]||i.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(i[d]||i.en).step_2_motion):(document.getElementById("neoCaptcha-step_2").innerHTML=(i[d]||i.en).step_2_desktop,document.getElementById("neoCaptcha-signalText").innerHTML=(i[d]||i.en).step_2_desktop),document.getElementById("neoCaptcha-step_3").innerHTML=(i[d]||i.en).step_3,ae?(document.getElementById("neoCaptcha-mode").innerHTML=(i[d]||i.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(i[d]||i.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(i[d]||i.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(i[d]||i.en).mode_1_text),document.getElementById("neoCaptcha-tryMobileHint").innerHTML=(i[d]||i.en).try_mobile,document.getElementById("neoCaptcha-settings").innerHTML=(i[d]||i.en).settings,document.getElementById("neoCaptcha-labelVari").innerHTML=(i[d]||i.en).settings_variant,document.getElementById("neoCaptcha-labelDiff").innerHTML=(i[d]||i.en).settings_difficulty,document.getElementById("neoCaptcha-optNs").innerHTML=(i[d]||i.en).opt_ns,document.getElementById("neoCaptcha-optIq").innerHTML=(i[d]||i.en).opt_iq,document.getElementById("neoCaptcha-optEasy").innerHTML=(i[d]||i.en).opt_easy,document.getElementById("neoCaptcha-optMedium").innerHTML=(i[d]||i.en).opt_medium,document.getElementById("neoCaptcha-optHard").innerHTML=(i[d]||i.en).opt_hard;let ie="easy",We=document.getElementById("neoCaptcha-selectVari");We.addEventListener("change",()=>{We.selectedIndex==0?O="ns":O="iq",ae=O==="ns",Le()});let be=document.getElementById("neoCaptcha-selectDiff");be.addEventListener("change",()=>{be.selectedIndex==0?ie="easy":be.selectedIndex==1?ie="medium":ie="hard"});let J=6e3,v=[255,0,0],R=!1,I=[],f=0,U=0,Z=0,C=0,x=!1,ye="",ve=0,we=0,K,Q,Ce=0;const ee=50,tt=500/ee,V=.6;let D=0,M=0,B=0,A=0,L,S=[],P=!1,ce=0,F=!1;{const t=document.getElementById("neoCaptcha-howToCaption"),e=document.getElementById("neoCaptcha-howToText"),a=document.getElementById("neoCaptcha-howToIcon");e.style.display=F?"block":"none",a.innerText=F?"expand_less":"expand_more",t.addEventListener("click",()=>{F=!F,e.style.display=F?"block":"none",a.innerText=F?"expand_less":"expand_more"})}const N=document.getElementById("neoCaptcha-overlayBg"),xe=document.getElementById("neoCaptcha-tryMobileHint");y?(N.style.background=oe,xe.style.display="none"):(N.style.background="#000",xe.style.display="block");const z=document.getElementById("neoCaptcha-signalIcon");z.innerText=y?"do_not_touch":"hearing",ue.addEventListener("click",Re);let W=y;function Re(){y&&window.DeviceMotionEvent?(j(!0),"requestPermission"in DeviceMotionEvent?DeviceMotionEvent.requestPermission().then(t=>{t==="granted"?(m("motion permission granted"),W=!0,window.addEventListener("devicemotion",Ee)):(m("motion permission denied"),W=!1),se()}).catch(t=>{m("motion permission error"),ze(t),W=!1,se()}):(m("motion allowed by default"),W=!0,window.addEventListener("devicemotion",Ee),se())):(m("no motion available"),W=!1,se())}Se();async function se(){m("version: "+ge),m("userAgent: "+navigator.userAgent),y&&j(W);const t=document.getElementById("neoCaptcha-wrapper");t.style.display="flex",ue.style.display="none";const e={challenge:K,hmac:Q,userAgent:navigator.userAgent,mobile:y,version:ge,minDifficulty:ie,variant:O},a=await Fe(fetch(Pe+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Blob "+Ae},body:JSON.stringify(e)}));if(!(a!=null&&a.ok))return;const o=await a.json();if(o.img){const u=document.getElementById("neoCaptcha-image");u.style.display="inline-block",w.style.display="flex",ye=`data:image/png;base64,${o.img}`,v=o.color,K=o.challenge,Q=o.hmac,J=o.totalTime||J,Ce=o.suspense;const s=document.getElementById("neoCaptcha-container");if(s.style.height="18rem",o.variant==="ns")for(let h=1;h<=4;h++)document.getElementById("neoCaptcha-guess-icon-"+h).src=`https://neo-captcha.com/assets/icon_shape_${o.icons[h-1]}.png`;if(c.style.width="18rem",c.style.height="18rem",c.width=c.clientWidth,c.height=c.width,ve=c.width*o.pointSize,we=c.width*o.thumbSize,!n||!b)throw new Error("Canvas context could not be initialized.");n.fillStyle="rgba(0, 0, 0)",n.fillRect(0,0,c.width,c.height),b.fillStyle=`rgba(${v[0]}, ${v[1]}, ${v[2]})`,Z=Date.now(),m("isMobile",y,"motionAllowed",W),y&&W?setTimeout(()=>at(),500):(m("beep timeout, no motion available"),setTimeout(()=>Ne(),Ce))}}function j(t){y&&(t?(N.style.background=oe,z.innerText="edgesensor_low",z.style.animation="shake 0.4s ease-in-out infinite",document.getElementById("neoCaptcha-step_2").innerHTML=(i[d]||i.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(i[d]||i.en).step_2_motion,w.removeEventListener("pointerdown",re),w.removeEventListener("pointermove",Ie),w.removeEventListener("pointerup",le),ce=0,requestAnimationFrame(Te)):(N.style.background=oe,z.innerText="do_not_touch",z.style.animation="none",document.getElementById("neoCaptcha-step_2").innerHTML=(i[d]||i.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(i[d]||i.en).step_2,w.addEventListener("pointerdown",re,{passive:!1}),w.addEventListener("pointermove",Ie,{passive:!1}),w.addEventListener("pointerup",le)))}async function Ee(t){if(P||m("handleMotion"),!(t instanceof DeviceMotionEvent))return;const e=Date.now();if(D>0&&e-D<ee)return;P||m("there is motion"),D=e;const a=t.accelerationIncludingGravity;if(a&&a.x!==null&&a.y!==null&&a.z!==null){P||(P=!0,j(!0)),M=V*M+(1-V)*a.x,B=V*B+(1-V)*a.y,A=V*A+(1-V)*a.z;let o=Math.sqrt(M*M+B*B+A*A),u=Math.sqrt(M*M+B*B);if(L){let s=o-L.mag,h=M-L.x,E=B-L.y,p=A-L.z;L={mag:o,move:u,x:M,y:B,z:A,dmag:s,dx:h,dy:E,dz:p,time:e-Z},S.push(L),S.length>tt&&(C<=0&&(C=Date.now()),nt()?requestAnimationFrame(()=>{Te(),N.style.background=fe,z.style.animation="none",z.innerText="check",new Promise(()=>setTimeout(()=>{re(),le()},ee*2))}):requestAnimationFrame(()=>{Te(),N.style.background=oe}))}else L={mag:o,move:u,x:M,y:B,z:A,dmag:0,dx:0,dy:0,dz:0,time:e-Z}}else j(!1),xe.style.display="block"}function Te(){let t=document.getElementById("neoCaptcha-overlayBgFill"),e=ce/100*18;t.style.height=e+"rem",t.style.background=fe}function nt(t=!1){let s=0,h=0,E=0,p=99,r=-99,l=0,de=0;function Ge(){s=0,h=0,E=0,p=99,r=-99}let pe=0,he=0,ne,rt=5e3/ee;S=S.slice(Math.max(0,S.length-rt),S.length);for(const g of S){if(he++,!ne){ne=g;continue}Math.abs(g.move-ne.move)<2?de++:de=0;let He=!1;if(Math.abs(g.x)>2&&de<5?(g.x<ne.x?(t&&m(he,"<left","x:",g.x,"move:",g.move,"mag:",g.mag),s===1?He=!0:h++,s=-1):(t&&m(he,"right>","x:",g.x,"move:",g.move,"mag:",g.mag),s===-1?He=!0:h++,s=1),l+=Math.max(g.x-1,g.move-2),E+=g.mag,p=Math.min(p,Math.sign(g.x)*g.move),r=Math.max(r,Math.sign(g.x)*g.move)):g.mag>9&&(t&&m(he,"idle"),Ge(),pe=0,l=Math.max(0,l-Math.max(2,de-2))),He){let Je=2<=h&&h<=5,Ue=E/h,Ze=Math.abs(r-p);Je&&(l+=1),Ue>7&&(l+=1),Ze>4&&(l+=1),Je&&Ue>7&&Ze>4&&(pe++,l+=10),Ge()}if(ne=g,pe<1&&(l=Math.min(l,60)),l>=100)break}return l=Math.max(0,Math.min(100,l)),ce=l,pe<1&&s===0&&(C=Date.now()),ce==100}function at(){!P||D<=0?(m("beepIfNoMotion","motionEnabled:",P,"lastMotionTime:",D),j(!1),setTimeout(()=>Ne(),Ce-500)):m("no beep","motionEnabled:",P,"lastMotionTime:",D)}function Ne(){y?(N.style.background=fe,z.innerText="touch_app",z.style.animation="blinker 0.5s ease-in-out infinite",C=Date.now()):ot()}const q=new AudioContext,ot=()=>{q.state==="suspended"?q.resume().then(()=>qe()):qe()},qe=()=>{_e(285,.12),_e(852,.12,.12),_e(528,.12,.24),C=Date.now()};function _e(t,e,a=0){let o=q.createOscillator(),u=q.createGain();o.type="sine",o.frequency.value=t,u.gain.value=.1,o.connect(u),u.connect(q.destination),o.start(q.currentTime+a),o.stop(q.currentTime+a+e)}let $;function re(){if(f==0){let t;C<=0?t=0:t=Date.now()-C,$={action:"react",time:t}}}w.addEventListener("pointerdown",re,{passive:!1}),w.addEventListener("pointermove",Ie,{passive:!1});function Ie(){C<=0&&($=void 0)}function le(){if(C<=0&&($={action:"react",time:-1},C=1),!($&&$.time===0)&&C>0&&f==0&&$){if(D>0){window.removeEventListener("devicemotion",Ee);for(const e of S){let a=Object.assign({},e);a.action="motion",I.push(a)}}I.push($),I.push({action:"start",time:Date.now()-Z}),x=!0;const t=document.getElementById("neoCaptcha-image");if(t.src=ye,it(),!n)throw new Error("Canvas context could not be initialized.");if(n.clearRect(0,0,c.width,c.height),w.style.display="none",ae)for(let e=1;e<=4;e++)document.getElementById("neoCaptcha-guess-button-"+e).disabled=!1}}w.addEventListener("pointerup",le);function it(){f=Date.now(),$e()}function $e(){if(!b)throw new Error("Canvas context could not be initialized.");const t=Date.now()-f,e=Math.max(J-t,0),a=e/J*_.width;b.clearRect(0,0,_.width,_.height),b.fillStyle=`rgba(${v[0]}, ${v[1]}, ${v[2]})`,b.fillRect(0,0,a,_.height),e>0&&x?requestAnimationFrame($e):e<=0&&x?(m("Time's up!"),U=f+J,te()):(b.fillStyle="rgba(255, 255, 255, 0.8)",b.fillRect(0,0,_.width,_.height))}function ke(t){if(H&&t.preventDefault(),f>0){const e=c.getBoundingClientRect();let{x:a,y:o}=Be(t,e);I.push({action:"down",enabled:x,x:a,y:o,time:Date.now()-f}),x&&H&&(R=!0,Oe(a,o))}}function ct(t){H&&t.preventDefault();const e=c.getBoundingClientRect();let{x:a,y:o}=Be(t,e);f>0&&I.push({action:"move",enabled:x,drawing:R,x:a,y:o,time:Date.now()-f}),x&&R&&Oe(a,o)}c.addEventListener("pointermove",ct,{passive:!1});function Me(t){if(H&&t.preventDefault(),H&&!R)return;const e=c.getBoundingClientRect();let{x:a,y:o}=Be(t,e);if(f>0&&I.push({action:"up",enabled:x,x:a,y:o,time:Date.now()-f}),f>=0&&x&&R){if(R=!1,I.push({action:"point",x:a/c.width,y:o/c.height,time:Date.now()-f}),T.disabled=!1,!n)throw new Error("Canvas context could not be initialized.");n.clearRect(0,0,c.width,c.height),n.beginPath(),n.arc(a,o,ve/2,0,Math.PI*2),n.fillStyle=`rgba(${v[0]}, ${v[1]}, ${v[2]})`,n.fill()}}c.addEventListener("pointerup",Me),c.addEventListener("pointercancel",Me);function Oe(t,e){if(!n)throw new Error("Canvas context could not be initialized.");n.clearRect(0,0,c.width,c.height),n.beginPath(),n.arc(t-1,e-1,we/2,0,Math.PI*2),n.fillStyle=`rgba(${v[0]}, ${v[1]}, ${v[2]}, 0.2)`,n.fill()}function Be(t,e){let a,o;return t instanceof MouseEvent?(a=t.clientX-e.left,o=t.clientY-e.top):(a=t.changedTouches[0].clientX-e.left,o=t.changedTouches[0].clientY-e.top),{x:a,y:o}}for(let t=1;t<=4;t++)(Ye=document.getElementById("neoCaptcha-guess-button-"+t))==null||Ye.addEventListener("pointerdown",ke),(Xe=document.getElementById("neoCaptcha-guess-button-"+t))==null||Xe.addEventListener("pointerup",e=>{Me(e),st(t)});function st(t){let e=document.getElementById("neoCaptcha-guess-icon-"+t).src,a=e.split("/");e=a[a.length-1].split(".")[0],I.push({action:"guess",tag:e,time:Date.now()-f}),te()}T==null||T.addEventListener("click",te);async function te(){if(!x)return;x=!1,T.disabled=!0;for(let r=1;r<=4;r++)document.getElementById("neoCaptcha-guess-button-"+r).disabled=!0;if(!n||!b)throw new Error("Canvas context could not be initialized.");n.fillStyle="rgba(255, 255, 255, 0.8)",n.fillRect(0,0,c.width,c.height),b.fillStyle="rgba(255, 255, 255, 0.8)",b.fillRect(0,0,_.width,_.height),U===0&&(U=Date.now());const t=U-f;I.push({action:"end",time:t});const e={challenge:K,hmac:Q,activity:I,mobile:y,version:ge,motionThrottle:ee},a=await Fe(fetch(Pe+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Blob "+Ae},body:JSON.stringify(e)}));if(!(a!=null&&a.ok))return;let o=!1,u=!1;try{const r=await a.json();o=r.valid,u=r.retry,u&&(K=r.challenge,Q=r.hmac)}catch{}n.lineJoin="round",n.lineCap="round";const s=c.width*.1;let h=c.width/2,E=c.height/2;const p=c.width/3;if(o){n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=s+20;let r=h+s/8,l=E+s/4;Y(p,r,l),n.lineWidth=s+17,Y(p,r,l),n.lineWidth=s+14,Y(p,r,l),n.lineWidth=s+11,Y(p,r,l),n.lineWidth=s+8,Y(p,r,l),n.strokeStyle="rgba(0, 160, 0)",n.lineWidth=s,Y(p,h,E)}else if(u){n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=s+20;let r=h+s/8,l=E+s/4;G(p,r,l),n.lineWidth=s+17,G(p,r,l),n.lineWidth=s+14,G(p,r,l),n.lineWidth=s+11,G(p,r,l),n.lineWidth=s+8,G(p,r,l),n.strokeStyle="rgba(0, 80, 255)",n.lineWidth=s,G(p,h,E)}else{n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=s+20;let r=h+s/8,l=E+s/4;X(p,r,l),n.lineWidth=s+17,X(p,r,l),n.lineWidth=s+14,X(p,r,l),n.lineWidth=s+11,X(p,r,l),n.lineWidth=s+8,X(p,r,l),n.strokeStyle="rgba(255, 0, 0)",n.lineWidth=s,X(p,h,E)}o?(m("Yippie!"),Ve()):u?setTimeout(()=>{Se(),Re()},500):(m("Womp, womp"),Ve())}function Ve(){document.getElementById("neoCaptcha-guess").style.display="none",document.getElementById("neoCaptcha-submit").style.display="block",T.disabled=!1,T.removeEventListener("click",te),T.addEventListener("click",Le);let t=document.getElementById("neoCaptcha-submitIcon");t.innerText="replay"}function Le(){Se(),K=void 0,Q=void 0,T.removeEventListener("click",Le),T.addEventListener("click",te);let t=document.getElementById("neoCaptcha-submitIcon");t.innerText="check",n&&n.clearRect(0,0,c.width,c.height);const e=document.getElementById("neoCaptcha-image");e.style.display="none",w.style.display="none"}function Y(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o/2,a+o),n.lineTo(e-o-o/2,a),n.moveTo(e-o/2,a+o),n.lineTo(e+t-o/2,a-o),n.stroke()}function X(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o,a-o),n.lineTo(e+o,a+o),n.moveTo(e+o,a-o),n.lineTo(e-o,a+o),n.stroke()}function G(t,e,a){if(!n)throw new Error("Canvas context could not be initialized.");const o=t/2;n.beginPath(),n.moveTo(e-o,a),n.lineTo(e-o+1,a),n.moveTo(e,a),n.lineTo(e+1,a),n.moveTo(e+o,a),n.lineTo(e+o+1,a),n.stroke()}function Se(){R=!1,I=[],f=0,U=0,Z=0,C=0,x=!1,T.disabled=!0,ye="",ve=0,we=0;const t=document.getElementById("neoCaptcha-wrapper");t.style.display="none",ue.style.display="block",b&&b.clearRect(0,0,_.width,_.height),y&&(j(!0),P&&(D=0,M=0,B=0,A=0,L=void 0,S=[])),document.getElementById("neoCaptcha-guess").style.display="grid",document.getElementById("neoCaptcha-submit").style.display="block",ae?(document.getElementById("neoCaptcha-submit").style.display="none",c.style.cursor="auto",c.style.touchAction="auto",H=!1,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_see_shape_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(i[d]||i.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(i[d]||i.en).mode_2_text):(document.getElementById("neoCaptcha-guess").style.display="none",c.style.cursor="crosshair",c.style.touchAction="none",H=!0,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_find_corner_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(i[d]||i.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(i[d]||i.en).mode_1_text),H?c.addEventListener("pointerdown",ke,{passive:!1}):c.addEventListener("pointerdown",ke)}async function Fe(t){let e;try{e=await t,e.ok||(e.status===429?(document.getElementById("neoCaptcha-warnMessage").innerHTML=(i[d]||i.en).too_many_requests,document.getElementById("neoCaptcha-warnMessage").style.display="block",document.getElementById("neoCaptcha-wrapper").style.display="none"):(alert("Error "+e.status+(e.statusText?": "+e.statusText:"")),ze(e.status,e.statusText)))}catch(a){ze(a)}return e}function m(t,...e){je(" > ",t,e),console.log(t,e)}function ze(t,...e){je("!!! ERROR: ",t,e),console.error(t,e)}function je(t,e,a){let o=document.getElementById("testLogs");if(o){let u=JSON.stringify(e)+" ";a&&(u+=a.map(h=>JSON.stringify(h)).join(" "));let s=o;s.value+=t+u+`
`,s.scrollTop=s.scrollHeight}}}return window.NeoCAPTCHA={render:De},me.renderCaptcha=De,Object.defineProperty(me,Symbol.toStringTag,{value:"Module"}),me}({});
