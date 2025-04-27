var NeoCAPTCHA=function(he){"use strict";const Je=`
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
    --neo-captcha-warn: #cf5d00;
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
    font-size: 1.5rem;
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
    font-size: 1.5rem;
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
    text-align: start;
    margin: 0;
    padding: 0;
}

.neo-captcha-how-to-text {
    font-size: 0.9rem;
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
    padding: 0.25rem 0.75rem 0.5rem 0.75rem;
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
    font-size: 1.2rem;
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
`;function Ke(){if(document.getElementById("neo-captcha-style"))return;const I=document.createElement("style");I.id="neo-captcha-style",I.textContent=Je,document.head.appendChild(I)}function Ue(){if(document.getElementById("neo-captcha-material-icons"))return;const I=document.createElement("link");I.id="neo-captcha-material-icons",I.rel="stylesheet",I.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(I)}function ze(I){var Fe,Oe;Ue(),Ke(),I.innerHTML=`
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
            <div class="neo-captcha-how-to-description">
                <img id="neoCaptcha-modeIcon" class="neo-captcha-mode-icon" alt="icon variant">
                <div class="neo-captcha-how-to-header">
                    <span id="neoCaptcha-mode" class="neo-captcha-how-to-header-mode"></span>
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
    `;const He="1.1.6-demo",De="https://neo-captcha.com/api/v1",v=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),w=document.getElementById("neoCaptcha-startOverlay"),T=document.getElementById("neoCaptcha-submit"),me=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),t=c.getContext("2d"),_=document.getElementById("neoCaptcha-timeCanvas"),b=_.getContext("2d");if(!t||!b)throw new Error("Canvas context could not be initialized.");let V="ns",te=V==="ns"||V==="ncs",z=!1;document.getElementById("neoCaptchaRoot").classList.add("neo-captcha-theme-dark"),document.getElementById("neoCaptchaWidgetLogo").src="https://neo-captcha.com/assets/logo-dark.png";const ne="#f406",ge="#0f4a";let d=(navigator.language||navigator.languages[0]).split("-")[0];console.log("lang: "+d);const o={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_desktop:"Click after the <b>sound cue!</b>",step_2_motion:"<b>Shake</b> your phone!",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!",try_mobile:"NeoCAPTCHA is optimized for real mobile devices!",settings:"Settings",settings_variant:"Variant:",settings_difficulty:"Difficulty:",opt_ns:"Neon Shape",opt_iq:"Implied Square",opt_easy:"Easy",opt_medium:"Medium",opt_hard:"Hard"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_desktop:"Klicke beim <b>Signalton!</b>",step_2_motion:"<b>Schüttel</b> dein Handy!",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?",try_mobile:"NeoCAPTCHA ist für echte Mobilgeräte optimiert!",settings:"Einstellungen",settings_variant:"Variante:",settings_difficulty:"Schwierigkeit:",opt_ns:"Neon-Form",opt_iq:"Angedeutetes Viereck",opt_easy:"Einfach",opt_medium:"Mittel",opt_hard:"Schwer"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(o[d]||o.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(o[d]||o.en).step_1,v?(document.getElementById("neoCaptcha-step_2").innerHTML=(o[d]||o.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(o[d]||o.en).step_2_motion):(document.getElementById("neoCaptcha-step_2").innerHTML=(o[d]||o.en).step_2_desktop,document.getElementById("neoCaptcha-signalText").innerHTML=(o[d]||o.en).step_2_desktop),document.getElementById("neoCaptcha-step_3").innerHTML=(o[d]||o.en).step_3,te?(document.getElementById("neoCaptcha-mode").innerHTML=(o[d]||o.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(o[d]||o.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(o[d]||o.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(o[d]||o.en).mode_1_text),document.getElementById("neoCaptcha-tryMobileHint").innerHTML=(o[d]||o.en).try_mobile,document.getElementById("neoCaptcha-settings").innerHTML=(o[d]||o.en).settings,document.getElementById("neoCaptcha-labelVari").innerHTML=(o[d]||o.en).settings_variant,document.getElementById("neoCaptcha-labelDiff").innerHTML=(o[d]||o.en).settings_difficulty,document.getElementById("neoCaptcha-optNs").innerHTML=(o[d]||o.en).opt_ns,document.getElementById("neoCaptcha-optIq").innerHTML=(o[d]||o.en).opt_iq,document.getElementById("neoCaptcha-optEasy").innerHTML=(o[d]||o.en).opt_easy,document.getElementById("neoCaptcha-optMedium").innerHTML=(o[d]||o.en).opt_medium,document.getElementById("neoCaptcha-optHard").innerHTML=(o[d]||o.en).opt_hard;let ae="easy",Ae=document.getElementById("neoCaptcha-selectVari");Ae.addEventListener("change",()=>{Ae.selectedIndex==0?V="ns":V="iq",te=V==="ns",Be()});let ue=document.getElementById("neoCaptcha-selectDiff");ue.addEventListener("change",()=>{ue.selectedIndex==0?ae="easy":ue.selectedIndex==1?ae="medium":ae="hard"});let J=6e3,y=[255,0,0],R=!1,k=[],f=0,K=0,fe=0,C=0,x=!1,be="",ye=0,ve=0,U,Z,we=0;const oe=50,Ze=500/oe,F=.6;let H=0,M=0,B=0,D=0,L,A=[],P=!1,ie=0,O=!1;{const e=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText"),i=document.getElementById("neoCaptcha-howToIcon");n.style.display=O?"block":"none",i.innerText=O?"expand_less":"expand_more",e.addEventListener("click",()=>{O=!O,n.style.display=O?"block":"none",i.innerText=O?"expand_less":"expand_more"})}const N=document.getElementById("neoCaptcha-overlayBg"),Ce=document.getElementById("neoCaptcha-tryMobileHint");v?(N.style.background=ne,Ce.style.display="none"):(N.style.background="#000",Ce.style.display="block");const S=document.getElementById("neoCaptcha-signalIcon");S.innerText=v?"do_not_touch":"hearing",me.addEventListener("click",Pe);let W=v;function Pe(){v&&window.DeviceMotionEvent?(j(!0),"requestPermission"in DeviceMotionEvent?DeviceMotionEvent.requestPermission().then(e=>{e==="granted"?(m("motion permission granted"),W=!0,window.addEventListener("devicemotion",xe)):(m("motion permission denied"),W=!1),ce()}).catch(e=>{m("motion permission error"),it(e),W=!1,ce()}):(m("motion allowed by default"),W=!0,window.addEventListener("devicemotion",xe),ce())):(m("no motion available"),W=!1,ce())}Le();async function ce(){m("version: "+He),m("userAgent: "+navigator.userAgent),v&&j(W);const e=document.getElementById("neoCaptcha-wrapper");e.style.display="flex",me.style.display="none";const n={challenge:U,hmac:Z,userAgent:navigator.userAgent,mobile:v,version:He,minDifficulty:ae,variant:V},a=await(await fetch(De+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(a.img){const u=document.getElementById("neoCaptcha-image");u.style.display="inline-block",w.style.display="flex",be=`data:image/png;base64,${a.img}`,y=a.color,U=a.challenge,Z=a.hmac,J=a.totalTime||J,we=a.suspense;const s=document.getElementById("neoCaptcha-container");if(s.style.height="18rem",a.variant==="ns")for(let h=1;h<=4;h++)document.getElementById("neoCaptcha-guess-icon-"+h).src=`https://neo-captcha.com/assets/icon_shape_${a.icons[h-1]}.png`;if(c.style.width="18rem",c.style.height="18rem",c.width=c.clientWidth,c.height=c.width,ye=c.width*a.pointSize,ve=c.width*a.thumbSize,!t||!b)throw new Error("Canvas context could not be initialized.");t.fillStyle="rgba(0, 0, 0)",t.fillRect(0,0,c.width,c.height),b.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,fe=Date.now(),m("isMobile",v,"motionAllowed",W),v&&W?setTimeout(()=>et(),500):(m("beep timeout, no motion available"),setTimeout(()=>We(),we))}}function j(e){v&&(e?(N.style.background=ne,S.innerText="edgesensor_low",S.style.animation="shake 0.4s ease-in-out infinite",document.getElementById("neoCaptcha-step_2").innerHTML=(o[d]||o.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(o[d]||o.en).step_2_motion,w.removeEventListener("pointerdown",se),w.removeEventListener("pointermove",_e),w.removeEventListener("pointerup",le),ie=0,requestAnimationFrame(Ee)):(N.style.background=ne,S.innerText="do_not_touch",S.style.animation="none",document.getElementById("neoCaptcha-step_2").innerHTML=(o[d]||o.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(o[d]||o.en).step_2,w.addEventListener("pointerdown",se,{passive:!1}),w.addEventListener("pointermove",_e,{passive:!1}),w.addEventListener("pointerup",le)))}async function xe(e){if(P||m("handleMotion"),!(e instanceof DeviceMotionEvent))return;const n=Date.now();if(H>0&&n-H<oe)return;P||m("there is motion"),H=n;const i=e.accelerationIncludingGravity;if(i&&i.x!==null&&i.y!==null&&i.z!==null){P||(P=!0,j(!0)),M=F*M+(1-F)*i.x,B=F*B+(1-F)*i.y,D=F*D+(1-F)*i.z;let a=Math.sqrt(M*M+B*B+D*D),u=Math.sqrt(M*M+B*B);if(L){let s=a-L.mag,h=M-L.x,E=B-L.y,p=D-L.z;L={mag:a,move:u,x:M,y:B,z:D,dmag:s,dx:h,dy:E,dz:p},A.push(L),A.length>Ze&&(C<=0&&(C=Date.now()),Qe()?requestAnimationFrame(()=>{Ee(),N.style.background=ge,S.style.animation="none",S.innerText="check",new Promise(()=>setTimeout(()=>{se(),le()},oe*2))}):requestAnimationFrame(()=>{Ee(),N.style.background=ne}))}else L={mag:a,move:u,x:M,y:B,z:D,dmag:0,dx:0,dy:0,dz:0}}else j(!1),Ce.style.display="block"}function Ee(){let e=document.getElementById("neoCaptcha-overlayBgFill"),n=ie/100*18;e.style.height=n+"rem",e.style.background=ge}function Qe(e=!1){let s=0,h=0,E=0,p=99,l=-99,r=0,re=0;function je(){s=0,h=0,E=0,p=99,l=-99}let de=0,pe=0,ee,ct=5e3/oe;A=A.slice(Math.max(0,A.length-ct),A.length);for(const g of A){if(pe++,!ee){ee=g;continue}Math.abs(g.move-ee.move)<2?re++:re=0;let Se=!1;if(Math.abs(g.x)>2&&re<5?(g.x<ee.x?(e&&m(pe,"<left","x:",g.x,"move:",g.move,"mag:",g.mag),s===1?Se=!0:h++,s=-1):(e&&m(pe,"right>","x:",g.x,"move:",g.move,"mag:",g.mag),s===-1?Se=!0:h++,s=1),r+=Math.max(g.x-1,g.move-2),E+=g.mag,p=Math.min(p,Math.sign(g.x)*g.move),l=Math.max(l,Math.sign(g.x)*g.move)):g.mag>9&&(e&&m(pe,"idle"),je(),de=0,r=Math.max(0,r-Math.max(2,re-2))),Se){let Xe=2<=h&&h<=5,Ye=E/h,Ge=Math.abs(l-p);Xe&&(r+=1),Ye>7&&(r+=1),Ge>4&&(r+=1),Xe&&Ye>7&&Ge>4&&(de++,r+=10),je()}if(ee=g,de<1&&(r=Math.min(r,60)),r>=100)break}return r=Math.max(0,Math.min(100,r)),ie=r,de<1&&s===0&&(C=Date.now()),ie==100}function et(){!P||H<=0?(m("beepIfNoMotion","motionEnabled:",P,"lastMotionTime:",H),j(!1),setTimeout(()=>We(),we-500)):m("no beep","motionEnabled:",P,"lastMotionTime:",H)}function We(){v?(N.style.background=ge,S.innerText="touch_app",S.style.animation="blinker 0.5s ease-in-out infinite",C=Date.now()):tt()}const q=new AudioContext,tt=()=>{q.state==="suspended"?q.resume().then(()=>Re()):Re()},Re=()=>{Te(285,.12),Te(852,.12,.12),Te(528,.12,.24),C=Date.now()};function Te(e,n,i=0){let a=q.createOscillator(),u=q.createGain();a.type="sine",a.frequency.value=e,u.gain.value=.1,a.connect(u),u.connect(q.destination),a.start(q.currentTime+i),a.stop(q.currentTime+i+n)}let $;function se(){if(f==0){let e;C<=0?e=0:e=Date.now()-C,$={action:"react",time:e}}}w.addEventListener("pointerdown",se,{passive:!1}),w.addEventListener("pointermove",_e,{passive:!1});function _e(){C<=0&&($=void 0)}function le(){if(C<=0&&($={action:"react",time:-1},C=1),!($&&$.time===0)&&C>0&&f==0&&$){H>0&&window.removeEventListener("devicemotion",xe),k.push($),k.push({action:"start",time:Date.now()-fe}),x=!0;const e=document.getElementById("neoCaptcha-image");if(e.src=be,nt(),!t)throw new Error("Canvas context could not be initialized.");if(t.clearRect(0,0,c.width,c.height),w.style.display="none",te)for(let n=1;n<=4;n++)document.getElementById("neoCaptcha-guess-button-"+n).disabled=!1}}w.addEventListener("pointerup",le);function nt(){f=Date.now(),Ne()}function Ne(){if(!b)throw new Error("Canvas context could not be initialized.");const e=Date.now()-f,n=Math.max(J-e,0),i=n/J*_.width;b.clearRect(0,0,_.width,_.height),b.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,b.fillRect(0,0,i,_.height),n>0&&x?requestAnimationFrame(Ne):n<=0&&x?(m("Time's up!"),K=f+J,Q()):(b.fillStyle="rgba(255, 255, 255, 0.8)",b.fillRect(0,0,_.width,_.height))}function Ie(e){if(z&&e.preventDefault(),f>0){const n=c.getBoundingClientRect();let{x:i,y:a}=Me(e,n);k.push({action:"down",enabled:x,x:i,y:a,time:Date.now()-f}),x&&z&&(R=!0,qe(i,a))}}function at(e){z&&e.preventDefault();const n=c.getBoundingClientRect();let{x:i,y:a}=Me(e,n);f>0&&k.push({action:"move",enabled:x,drawing:R,x:i,y:a,time:Date.now()-f}),x&&R&&qe(i,a)}c.addEventListener("pointermove",at,{passive:!1});function ke(e){if(z&&e.preventDefault(),z&&!R)return;const n=c.getBoundingClientRect();let{x:i,y:a}=Me(e,n);if(f>0&&k.push({action:"up",enabled:x,x:i,y:a,time:Date.now()-f}),f>=0&&x&&R){if(R=!1,k.push({action:"point",x:i/c.width,y:a/c.height,time:Date.now()-f}),T.disabled=!1,!t)throw new Error("Canvas context could not be initialized.");t.clearRect(0,0,c.width,c.height),t.beginPath(),t.arc(i,a,ye/2,0,Math.PI*2),t.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,t.fill()}}c.addEventListener("pointerup",ke),c.addEventListener("pointercancel",ke);function qe(e,n){if(!t)throw new Error("Canvas context could not be initialized.");t.clearRect(0,0,c.width,c.height),t.beginPath(),t.arc(e-1,n-1,ve/2,0,Math.PI*2),t.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]}, 0.2)`,t.fill()}function Me(e,n){let i,a;return e instanceof MouseEvent?(i=e.clientX-n.left,a=e.clientY-n.top):(i=e.changedTouches[0].clientX-n.left,a=e.changedTouches[0].clientY-n.top),{x:i,y:a}}for(let e=1;e<=4;e++)(Fe=document.getElementById("neoCaptcha-guess-button-"+e))==null||Fe.addEventListener("pointerdown",Ie),(Oe=document.getElementById("neoCaptcha-guess-button-"+e))==null||Oe.addEventListener("pointerup",n=>{ke(n),ot(e)});function ot(e){let n=document.getElementById("neoCaptcha-guess-icon-"+e).src,i=n.split("/");n=i[i.length-1].split(".")[0],k.push({action:"guess",tag:n,time:Date.now()-f}),Q()}T==null||T.addEventListener("click",Q);async function Q(){if(!x)return;x=!1,T.disabled=!0;for(let l=1;l<=4;l++)document.getElementById("neoCaptcha-guess-button-"+l).disabled=!0;if(!t||!b)throw new Error("Canvas context could not be initialized.");t.fillStyle="rgba(255, 255, 255, 0.8)",t.fillRect(0,0,c.width,c.height),b.fillStyle="rgba(255, 255, 255, 0.8)",b.fillRect(0,0,_.width,_.height),K===0&&(K=Date.now());const e=K-f;k.push({action:"end",time:e});const n={challenge:U,hmac:Z,activity:k},i=await fetch(De+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let a=!1,u=!1;try{const l=await i.json();a=l.valid,u=l.retry,u&&(U=l.challenge,Z=l.hmac)}catch{}t.lineJoin="round",t.lineCap="round";const s=c.width*.1;let h=c.width/2,E=c.height/2;const p=c.width/3;if(a){t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=s+20;let l=h+s/8,r=E+s/4;X(p,l,r),t.lineWidth=s+17,X(p,l,r),t.lineWidth=s+14,X(p,l,r),t.lineWidth=s+11,X(p,l,r),t.lineWidth=s+8,X(p,l,r),t.strokeStyle="rgba(0, 160, 0)",t.lineWidth=s,X(p,h,E)}else if(u){t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=s+20;let l=h+s/8,r=E+s/4;G(p,l,r),t.lineWidth=s+17,G(p,l,r),t.lineWidth=s+14,G(p,l,r),t.lineWidth=s+11,G(p,l,r),t.lineWidth=s+8,G(p,l,r),t.strokeStyle="rgba(0, 80, 255)",t.lineWidth=s,G(p,h,E)}else{t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=s+20;let l=h+s/8,r=E+s/4;Y(p,l,r),t.lineWidth=s+17,Y(p,l,r),t.lineWidth=s+14,Y(p,l,r),t.lineWidth=s+11,Y(p,l,r),t.lineWidth=s+8,Y(p,l,r),t.strokeStyle="rgba(255, 0, 0)",t.lineWidth=s,Y(p,h,E)}a?(m("Yippie!"),$e()):u?setTimeout(()=>{Le(),Pe()},500):(m("Womp, womp"),$e())}function $e(){document.getElementById("neoCaptcha-guess").style.display="none",document.getElementById("neoCaptcha-submit").style.display="block",T.disabled=!1,T.removeEventListener("click",Q),T.addEventListener("click",Be);let e=document.getElementById("neoCaptcha-submitIcon");e.innerText="replay"}function Be(){Le(),U=void 0,Z=void 0,T.removeEventListener("click",Be),T.addEventListener("click",Q);let e=document.getElementById("neoCaptcha-submitIcon");e.innerText="check",t&&t.clearRect(0,0,c.width,c.height);const n=document.getElementById("neoCaptcha-image");n.style.display="none",w.style.display="none"}function X(e,n,i){if(!t)throw new Error("Canvas context could not be initialized.");const a=e/2;t.beginPath(),t.moveTo(n-a/2,i+a),t.lineTo(n-a-a/2,i),t.moveTo(n-a/2,i+a),t.lineTo(n+e-a/2,i-a),t.stroke()}function Y(e,n,i){if(!t)throw new Error("Canvas context could not be initialized.");const a=e/2;t.beginPath(),t.moveTo(n-a,i-a),t.lineTo(n+a,i+a),t.moveTo(n+a,i-a),t.lineTo(n-a,i+a),t.stroke()}function G(e,n,i){if(!t)throw new Error("Canvas context could not be initialized.");const a=e/2;t.beginPath(),t.moveTo(n-a,i),t.lineTo(n-a+1,i),t.moveTo(n,i),t.lineTo(n+1,i),t.moveTo(n+a,i),t.lineTo(n+a+1,i),t.stroke()}function Le(){R=!1,k=[],f=0,K=0,fe=0,C=0,x=!1,T.disabled=!0,be="",ye=0,ve=0;const e=document.getElementById("neoCaptcha-wrapper");e.style.display="none",me.style.display="block",b&&b.clearRect(0,0,_.width,_.height),v&&(j(!0),P&&(H=0,M=0,B=0,D=0,L=void 0,A=[])),document.getElementById("neoCaptcha-guess").style.display="grid",document.getElementById("neoCaptcha-submit").style.display="block",te?(document.getElementById("neoCaptcha-submit").style.display="none",c.style.cursor="auto",c.style.touchAction="auto",z=!1,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_see_shape_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(o[d]||o.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(o[d]||o.en).mode_2_text):(document.getElementById("neoCaptcha-guess").style.display="none",c.style.cursor="crosshair",c.style.touchAction="none",z=!0,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_find_corner_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(o[d]||o.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(o[d]||o.en).mode_1_text),z?c.addEventListener("pointerdown",Ie,{passive:!1}):c.addEventListener("pointerdown",Ie)}function m(e,...n){Ve(" > ",e,n),console.log(e,n)}function it(e,...n){Ve("!!! ERROR: ",e,n),console.error(e,n)}function Ve(e,n,i){let a=document.getElementById("testLogs");if(a){let u=JSON.stringify(n)+" ";i&&(u+=i.map(h=>JSON.stringify(h)).join(" "));let s=a;s.value+=e+u+`
`,s.scrollTop=s.scrollHeight}}}return window.NeoCAPTCHA={render:ze},he.renderCaptcha=ze,Object.defineProperty(he,Symbol.toStringTag,{value:"Module"}),he}({});
