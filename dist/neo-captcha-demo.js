var NeoCAPTCHA=function(O){"use strict";const ue=`
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

.neo-captcha-settings-box {
    width: 16em;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1em;
    text-align: end;
    align-items: baseline;
    padding: 2em;
    margin: 0;
}

.neo-captcha-settings-title {
    font-size: 1.5em;
    grid-column: 1/-1;
    text-align: center;
    padding: 0 1em 0 0;
    margin: 0;
}

.neo-captcha-select {
    height: 3em;
    margin: 0;
    padding: 0;
}
`;function fe(){if(document.getElementById("neo-captcha-style"))return;const v=document.createElement("style");v.id="neo-captcha-style",v.textContent=ue,document.head.appendChild(v)}function be(){if(document.getElementById("neo-captcha-material-icons"))return;const v=document.createElement("link");v.id="neo-captcha-material-icons",v.rel="stylesheet",v.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(v)}function ae(v){var me,ge;be(),fe(),v.innerHTML=`
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
    `;const oe="1.1.3-demo",ie="https://neo-captcha.com/api/v1",k=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),B=document.getElementById("neoCaptcha-startOverlay"),f=document.getElementById("neoCaptcha-submit"),F=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),e=c.getContext("2d"),b=document.getElementById("neoCaptcha-timeCanvas"),m=b.getContext("2d");if(!e||!m)throw new Error("Canvas context could not be initialized.");let L="ns",V=L==="ns"||L==="ncs",E=!1;document.getElementById("neoCaptchaRoot").classList.add("neo-captcha-theme-dark"),document.getElementById("neoCaptchaWidgetLogo").src="https://neo-captcha.com/assets/logo-dark.png";const ce="#f406",ye="#0f4a";let l=(navigator.language||navigator.languages[0]).split("-")[0];console.log("lang: "+l);const o={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_s:"Click at the <b>signal tone!</b>",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!",settings:"Settings",settings_variant:"Variant:",settings_difficulty:"Difficulty:",opt_ns:"Neon Shape",opt_iq:"Implied Square",opt_easy:"Easy",opt_medium:"Medium",opt_hard:"Hard"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_s:"Klicke beim <b>Signalton!</b>",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?",settings:"Einstellungen",settings_variant:"Variante:",settings_difficulty:"Schwierigkeit:",opt_ns:"Neon-Form",opt_iq:"Angedeutetes Viereck",opt_easy:"Einfach",opt_medium:"Mittel",opt_hard:"Schwer"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(o[l]||o.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(o[l]||o.en).step_1,k?(document.getElementById("neoCaptcha-step_2").innerHTML=(o[l]||o.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(o[l]||o.en).step_2):(document.getElementById("neoCaptcha-step_2").innerHTML=(o[l]||o.en).step_2_s,document.getElementById("neoCaptcha-signalText").innerHTML=(o[l]||o.en).step_2_s),document.getElementById("neoCaptcha-step_3").innerHTML=(o[l]||o.en).step_3,V?(document.getElementById("neoCaptcha-mode").innerHTML=(o[l]||o.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(o[l]||o.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(o[l]||o.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(o[l]||o.en).mode_1_text),document.getElementById("neoCaptcha-settings").innerHTML=(o[l]||o.en).settings,document.getElementById("neoCaptcha-labelVari").innerHTML=(o[l]||o.en).settings_variant,document.getElementById("neoCaptcha-labelDiff").innerHTML=(o[l]||o.en).settings_difficulty,document.getElementById("neoCaptcha-optNs").innerHTML=(o[l]||o.en).opt_ns,document.getElementById("neoCaptcha-optIq").innerHTML=(o[l]||o.en).opt_iq,document.getElementById("neoCaptcha-optEasy").innerHTML=(o[l]||o.en).opt_easy,document.getElementById("neoCaptcha-optMedium").innerHTML=(o[l]||o.en).opt_medium,document.getElementById("neoCaptcha-optHard").innerHTML=(o[l]||o.en).opt_hard;let j="easy",se=document.getElementById("neoCaptcha-selectVari");se.addEventListener("change",()=>{se.selectedIndex==0?L="ns":L="iq",V=L==="ns",te()});let G=document.getElementById("neoCaptcha-selectDiff");G.addEventListener("change",()=>{G.selectedIndex==0?j="easy":G.selectedIndex==1?j="medium":j="hard"});let W=6e3,g=[255,0,0],T=!1,C=[],h=0,A=0,Y=0,x=0,u=!1,X="",J=0,K=0,P,R,S=!1;{const a=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText"),i=document.getElementById("neoCaptcha-howToIcon");n.style.display=S?"block":"none",i.innerText=S?"expand_less":"expand_more",a.addEventListener("click",()=>{S=!S,n.style.display=S?"block":"none",i.innerText=S?"expand_less":"expand_more"})}const q=document.getElementById("neoCaptcha-overlayBg");k?q.style.background=ce:q.style.background="#000";const N=document.getElementById("neoCaptcha-signalIcon");N.innerText=k?"do_not_touch":"hearing",F.addEventListener("click",de),ne();async function de(){console.log("version: "+oe),console.log("userAgent: "+navigator.userAgent);const a=document.getElementById("neoCaptcha-wrapper");a.style.display="flex",F.style.display="none";const n={challenge:P,hmac:R,userAgent:navigator.userAgent,mobile:k,version:oe,minDifficulty:j,variant:L},t=await(await fetch(ie+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const w=document.getElementById("neoCaptcha-image");w.style.display="inline-block",B.style.display="flex",X=`data:image/png;base64,${t.img}`,g=t.color,P=t.challenge,R=t.hmac,W=t.totalTime||W;const d=document.getElementById("neoCaptcha-container");if(d.style.height="20em",t.variant==="ns")for(let y=1;y<=4;y++)document.getElementById("neoCaptcha-guess-icon-"+y).src=`https://neo-captcha.com/assets/icon_shape_${t.icons[y-1]}.png`;if(c.style.width="20em",c.style.height="20em",c.width=c.clientWidth,c.height=c.width,J=c.width*t.pointSize,K=c.width*t.thumbSize,!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,c.width,c.height),m.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,Y=Date.now(),setTimeout(()=>ve(),t.suspense)}}function ve(){k?(q.style.background=ye,N.innerText="touch_app",N.style.animation="blinker 0.5s ease-in-out infinite",x=Date.now()):Ce()}const _=new AudioContext,Ce=()=>{_.state==="suspended"?_.resume().then(()=>le()):le()},le=()=>{U(285,.12),U(852,.12,.12),U(528,.12,.24),x=Date.now()};function U(a,n,i=0){let t=_.createOscillator(),w=_.createGain();t.type="sine",t.frequency.value=a,w.gain.value=.1,t.connect(w),w.connect(_.destination),t.start(_.currentTime+i),t.stop(_.currentTime+i+n)}let I;function we(){if(h==0){let a;x<=0?a=0:a=Date.now()-x,I={action:"react",time:a}}}B.addEventListener("pointerdown",we,{passive:!1}),B.addEventListener("pointermove",()=>{x<=0&&(I=void 0)},{passive:!1});function xe(){if(x<=0&&(I={action:"react",time:-1},x=1),!(I&&I.time===0)&&x>0&&h==0&&I){C.push(I),C.push({action:"start",time:Date.now()-Y}),u=!0;const a=document.getElementById("neoCaptcha-image");if(a.src=X,Ee(),!e)throw new Error("Canvas context could not be initialized.");if(e.clearRect(0,0,c.width,c.height),B.style.display="none",V)for(let n=1;n<=4;n++)document.getElementById("neoCaptcha-guess-button-"+n).disabled=!1}}B.addEventListener("pointerup",xe);function Ee(){h=Date.now(),re()}function re(){if(!m)throw new Error("Canvas context could not be initialized.");const a=Date.now()-h,n=Math.max(W-a,0),i=n/W*b.width;m.clearRect(0,0,b.width,b.height),m.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,m.fillRect(0,0,i,b.height),n>0&&u?requestAnimationFrame(re):n<=0&&u?(console.log("Time's up!"),A=h+W,$()):(m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,b.width,b.height))}function Q(a){if(E&&a.preventDefault(),h>0){const n=c.getBoundingClientRect();let{x:i,y:t}=ee(a,n);C.push({action:"down",enabled:u,x:i,y:t,time:Date.now()-h}),u&&E&&(T=!0,pe(i,t))}}function Te(a){E&&a.preventDefault();const n=c.getBoundingClientRect();let{x:i,y:t}=ee(a,n);h>0&&C.push({action:"move",enabled:u,drawing:T,x:i,y:t,time:Date.now()-h}),u&&T&&pe(i,t)}c.addEventListener("pointermove",Te,{passive:!1});function Z(a){if(E&&a.preventDefault(),E&&!T)return;const n=c.getBoundingClientRect();let{x:i,y:t}=ee(a,n);if(h>0&&C.push({action:"up",enabled:u,x:i,y:t,time:Date.now()-h}),h>=0&&u&&T){if(T=!1,C.push({action:"point",x:i/c.width,y:t/c.height,time:Date.now()-h}),f.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(i,t,J/2,0,Math.PI*2),e.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,e.fill()}}c.addEventListener("pointerup",Z),c.addEventListener("pointercancel",Z);function pe(a,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(a-1,n-1,K/2,0,Math.PI*2),e.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]}, 0.2)`,e.fill()}function ee(a,n){let i,t;return a instanceof MouseEvent?(i=a.clientX-n.left,t=a.clientY-n.top):(i=a.changedTouches[0].clientX-n.left,t=a.changedTouches[0].clientY-n.top),{x:i,y:t}}for(let a=1;a<=4;a++)(me=document.getElementById("neoCaptcha-guess-button-"+a))==null||me.addEventListener("pointerdown",Q),(ge=document.getElementById("neoCaptcha-guess-button-"+a))==null||ge.addEventListener("pointerup",n=>{Z(n),_e(a)});function _e(a){let n=document.getElementById("neoCaptcha-guess-icon-"+a).src,i=n.split("/");n=i[i.length-1].split(".")[0],C.push({action:"guess",tag:n,time:Date.now()-h}),$()}f==null||f.addEventListener("click",$);async function $(){if(!u)return;u=!1,f.disabled=!0;for(let s=1;s<=4;s++)document.getElementById("neoCaptcha-guess-button-"+s).disabled=!0;if(!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,c.width,c.height),m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,b.width,b.height),A===0&&(A=Date.now());const a=A-h;C.push({action:"end",time:a});const n={challenge:P,hmac:R,activity:C},i=await fetch(ie+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let t=!1,w=!1;try{const s=await i.json();t=s.valid,w=s.retry,w&&(P=s.challenge,R=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const d=c.width*.1;let y=c.width/2,D=c.height/2;const r=c.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=d+20;let s=y+d/8,p=D+d/4;M(r,s,p),e.lineWidth=d+17,M(r,s,p),e.lineWidth=d+14,M(r,s,p),e.lineWidth=d+11,M(r,s,p),e.lineWidth=d+8,M(r,s,p),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=d,M(r,y,D)}else if(w){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=d+20;let s=y+d/8,p=D+d/4;z(r,s,p),e.lineWidth=d+17,z(r,s,p),e.lineWidth=d+14,z(r,s,p),e.lineWidth=d+11,z(r,s,p),e.lineWidth=d+8,z(r,s,p),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=d,z(r,y,D)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=d+20;let s=y+d/8,p=D+d/4;H(r,s,p),e.lineWidth=d+17,H(r,s,p),e.lineWidth=d+14,H(r,s,p),e.lineWidth=d+11,H(r,s,p),e.lineWidth=d+8,H(r,s,p),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=d,H(r,y,D)}t?(console.log("Yippie!"),he()):w?setTimeout(()=>{ne(),de()},500):(console.log("Womp, womp"),he())}function he(){document.getElementById("neoCaptcha-guess").style.display="none",document.getElementById("neoCaptcha-submit").style.display="block",f.disabled=!1,f.removeEventListener("click",$),f.addEventListener("click",te);let a=document.getElementById("neoCaptcha-submitIcon");a.innerText="replay"}function te(){ne(),P=void 0,R=void 0,f.removeEventListener("click",te),f.addEventListener("click",$);let a=document.getElementById("neoCaptcha-submitIcon");a.innerText="check",e&&e.clearRect(0,0,c.width,c.height);const n=document.getElementById("neoCaptcha-image");n.style.display="none",B.style.display="none"}function M(a,n,i){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t/2,i+t),e.lineTo(n-t-t/2,i),e.moveTo(n-t/2,i+t),e.lineTo(n+a-t/2,i-t),e.stroke()}function H(a,n,i){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t,i-t),e.lineTo(n+t,i+t),e.moveTo(n+t,i-t),e.lineTo(n-t,i+t),e.stroke()}function z(a,n,i){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t,i),e.lineTo(n-t+1,i),e.moveTo(n,i),e.lineTo(n+1,i),e.moveTo(n+t,i),e.lineTo(n+t+1,i),e.stroke()}function ne(){T=!1,C=[],h=0,A=0,Y=0,x=0,u=!1,f.disabled=!0,X="",J=0,K=0;const a=document.getElementById("neoCaptcha-wrapper");a.style.display="none",F.style.display="block",m&&m.clearRect(0,0,b.width,b.height),k&&(q.style.background=ce,N.innerText="do_not_touch"),N.style.animation="none",document.getElementById("neoCaptcha-guess").style.display="grid",document.getElementById("neoCaptcha-submit").style.display="block",V?(document.getElementById("neoCaptcha-submit").style.display="none",c.style.cursor="auto",c.style.touchAction="auto",E=!1,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_see_shape_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(o[l]||o.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(o[l]||o.en).mode_2_text):(document.getElementById("neoCaptcha-guess").style.display="none",c.style.cursor="crosshair",c.style.touchAction="none",E=!0,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_find_corner_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(o[l]||o.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(o[l]||o.en).mode_1_text),E?c.addEventListener("pointerdown",Q,{passive:!1}):c.addEventListener("pointerdown",Q)}}return window.NeoCAPTCHA={render:ae},O.renderCaptcha=ae,Object.defineProperty(O,Symbol.toStringTag,{value:"Module"}),O}({});
