var NeoCAPTCHA=function(q){"use strict";const be=`
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
    cursor: crosshair;
    z-index: 2;
    position: absolute;
    touch-action: none;
    margin: 0;
    padding: 0;
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

.neo-captcha-icon {
    font-size: 3em;
    color: var(--neo-captcha-light);
    margin: 0;
    padding: 0;
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

.neo-captcha-how-to-caption {
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5em 1em 0.5em 1em;
    background: color-mix(in srgb, var(--neo-captcha-fg) 10%, transparent);
    display: flex;
    flex-direction: row;
    margin: 0;
}

.neo-captcha-how-to-table {
    padding: 0 1em 0.5em 1em;
    background: color-mix(in srgb, var(--neo-captcha-fg) 10%, transparent);
    margin: 0;
}

.neo-captcha-how-to-description {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5em 0.5em 0.5em 1em;
    margin: 0;
}

.neo-captcha-mode-icon {
    width: 2.5em;
    height: 2.5em;
    margin: 0 1em 0 0;
    padding: 0;
}

.neo-captcha-how-to-footer {
    font-size: 1.1em;
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
    transform: translateY(0.1em);
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
`;function ye(){if(document.getElementById("neo-captcha-style"))return;const w=document.createElement("style");w.id="neo-captcha-style",w.textContent=be,document.head.appendChild(w)}function ve(){if(document.getElementById("neo-captcha-material-icons"))return;const w=document.createElement("link");w.id="neo-captcha-material-icons",w.rel="stylesheet",w.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(w)}function oe(w){var fe;ve(),ye(),w.innerHTML=`
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
    `;const ie="1.0.5-demo",ce="https://neo-captcha.com/api/v1",T=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),x=document.getElementById("neoCaptcha-startOverlay"),b=document.getElementById("neoCaptcha-submit"),O=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),e=c.getContext("2d"),y=document.getElementById("neoCaptcha-timeCanvas"),m=y.getContext("2d");if(!e||!m)throw new Error("Canvas context could not be initialized.");let I="ns",N=I==="ns"||I==="ncs",Y=!1;document.getElementById("neoCaptchaRoot").classList.add("neo-captcha-theme-dark"),document.getElementById("neoCaptchaWidgetLogo").src="https://neo-captcha.com/assets/logo-dark.png";const se="#f406",Ce="#0f4a";let l=(navigator.language||navigator.languages[0]).split("-")[0];console.log("lang: "+l);const i={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_s:"Click when you <b>hear a signal!</b>",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!",settings:"Settings",settings_variant:"Variant:",settings_difficulty:"Difficulty:",opt_ns:"Neon Shape",opt_iq:"Implied Square",opt_easy:"Easy",opt_medium:"Medium",opt_hard:"Hard"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_s:"Klicke beim <b>Signalton!</b>",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?",settings:"Einstellungen",settings_variant:"Variante:",settings_difficulty:"Schwierigkeit:",opt_ns:"Neon-Form",opt_iq:"Angedeutetes Viereck",opt_easy:"Einfach",opt_medium:"Mittel",opt_hard:"Schwer"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(i[l]||i.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(i[l]||i.en).step_1,T?document.getElementById("neoCaptcha-step_2").innerHTML=(i[l]||i.en).step_2:document.getElementById("neoCaptcha-step_2").innerHTML=(i[l]||i.en).step_2_s,document.getElementById("neoCaptcha-step_3").innerHTML=(i[l]||i.en).step_3,N?(document.getElementById("neoCaptcha-mode").innerHTML=(i[l]||i.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(i[l]||i.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(i[l]||i.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(i[l]||i.en).mode_1_text),document.getElementById("neoCaptcha-settings").innerHTML=(i[l]||i.en).settings,document.getElementById("neoCaptcha-labelVari").innerHTML=(i[l]||i.en).settings_variant,document.getElementById("neoCaptcha-labelDiff").innerHTML=(i[l]||i.en).settings_difficulty,document.getElementById("neoCaptcha-optNs").innerHTML=(i[l]||i.en).opt_ns,document.getElementById("neoCaptcha-optIq").innerHTML=(i[l]||i.en).opt_iq,document.getElementById("neoCaptcha-optEasy").innerHTML=(i[l]||i.en).opt_easy,document.getElementById("neoCaptcha-optMedium").innerHTML=(i[l]||i.en).opt_medium,document.getElementById("neoCaptcha-optHard").innerHTML=(i[l]||i.en).opt_hard;let $="easy",de=document.getElementById("neoCaptcha-selectVari");de.addEventListener("change",()=>{de.selectedIndex==0?I="ns":I="iq",N=I==="ns",ne()});let F=document.getElementById("neoCaptcha-selectDiff");F.addEventListener("change",()=>{F.selectedIndex==0?$="easy":F.selectedIndex==1?$="medium":$="hard"});let D=6e3,g=[255,0,0],k=!1,u=[],h=0,W=0,G=0,v=0,f=!1,B=!1,X="",J=0,K=0,P,R,L=!0;{const n=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText"),o=document.getElementById("neoCaptcha-howToIcon");a.style.display=L?"block":"none",o.innerText=L?"expand_less":"expand_more",n.addEventListener("click",()=>{L=!L,a.style.display=L?"block":"none",o.innerText=L?"expand_less":"expand_more"})}const V=document.getElementById("neoCaptcha-overlayBg");T?V.style.background=se:V.style.background="#000";const U=document.getElementById("neoCaptcha-signalIcon");U.innerText=T?"do_not_touch":"hearing",O.addEventListener("click",le),ae();async function le(){console.log("version: "+ie),console.log("userAgent: "+navigator.userAgent);const n=document.getElementById("neoCaptcha-wrapper");n.style.display="flex",O.style.display="none";const a={challenge:P,hmac:R,userAgent:navigator.userAgent,mobile:T,version:ie,minDifficulty:$,variant:I},t=await(await fetch(ce+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(console.log(t),t.img){const E=document.getElementById("neoCaptcha-image");E.style.display="inline-block",x.style.display="flex",X=`data:image/png;base64,${t.img}`,g=t.color,P=t.challenge,R=t.hmac,D=t.totalTime||D;const d=document.getElementById("neoCaptcha-container");if(d.style.height="20em",t.variant==="ns")for(let C=1;C<=4;C++)document.getElementById("neoCaptcha-guess-icon-"+C).src=`https://neo-captcha.com/assets/icon_shape_${t.icons[C-1]}.png`;if(c.style.width="20em",c.style.height="20em",c.width=c.clientWidth,c.height=c.width,J=c.width*t.pointSize,K=c.width*t.thumbSize,!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,c.width,c.height),m.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,G=Date.now(),setTimeout(()=>we(),t.suspense)}}function we(){T?(V.style.background=Ce,U.innerText="touch_app",v>0?u.push({action:"react",time:v-Date.now()}):v=Date.now()):Ee()}const _=new AudioContext,Ee=()=>{_.state==="suspended"?_.resume().then(()=>re()):re()},re=()=>{Q(285,.12),Q(852,.12,.12),Q(528,.12,.24),v>0?u.push({action:"react",time:v-Date.now()}):v=Date.now()};function Q(n,a,o=0){let t=_.createOscillator(),E=_.createGain();t.type="sine",t.frequency.value=n,E.gain.value=.1,t.connect(E),E.connect(_.destination),t.start(_.currentTime+o),t.stop(_.currentTime+o+a)}function pe(){if(h==0&&(v>0?u.push({action:"react",time:Date.now()-v}):v=Date.now(),N))for(let n=1;n<=4;n++)document.getElementById("neoCaptcha-guess-button-"+n).disabled=!1}x.addEventListener("mousedown",pe),x.addEventListener("touchstart",pe,{passive:!1}),x.addEventListener("touchmove",()=>{},{passive:!1});function Z(){if(v>0&&h==0){u.push({action:"start",time:Date.now()-G}),f=!0;const n=document.getElementById("neoCaptcha-image");if(n.src=X,xe(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),x.style.display="none",T&&(B=!0)}}x.addEventListener("mouseup",Z),x.addEventListener("touchend",Z),x.addEventListener("touchcancel",Z);function xe(){h=Date.now(),he()}function he(){if(!m)throw new Error("Canvas context could not be initialized.");const n=Date.now()-h,a=Math.max(D-n,0),o=a/D*y.width;m.clearRect(0,0,y.width,y.height),m.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,m.fillRect(0,0,o,y.height),a>0&&f?requestAnimationFrame(he):a<=0&&f?(console.log("Time's up!"),W=h+D,A()):(m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,y.width,y.height))}function j(n){if(n.preventDefault(),!B&&h>0){const a=c.getBoundingClientRect();let{x:o,y:t}=te(n,a);u.push({action:"down",enabled:f,x:o,y:t,time:Date.now()-h}),f&&(k=!0,ge(o,t))}}function me(n){if(n.preventDefault(),B)return;const a=c.getBoundingClientRect();let{x:o,y:t}=te(n,a);h>0&&u.push({action:"move",enabled:f,drawing:k,x:o,y:t,time:Date.now()-h}),f&&k&&ge(o,t)}c.addEventListener("mousemove",me),c.addEventListener("touchmove",me,{passive:!1});function ee(n){if(n.preventDefault(),B){B=!1;return}if(!k)return;const a=c.getBoundingClientRect();let{x:o,y:t}=te(n,a);if(h>0&&u.push({action:"up",enabled:f,x:o,y:t,time:Date.now()-h}),h>=0&&f){if(k=!1,u.push({action:"point",x:o/c.width,y:t/c.height,time:Date.now()-h}),b.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(o,t,J/2,0,Math.PI*2),e.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,e.fill()}}c.addEventListener("mouseup",ee),c.addEventListener("touchend",ee),c.addEventListener("touchcancel",ee);function ge(n,a){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(n-1,a-1,K/2,0,Math.PI*2),e.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]}, 0.2)`,e.fill()}function te(n,a){let o,t;return n instanceof MouseEvent?(o=n.clientX-a.left,t=n.clientY-a.top):(o=n.changedTouches[0].clientX-a.left,t=n.changedTouches[0].clientY-a.top),{x:o,y:t}}for(let n=1;n<=4;n++)(fe=document.getElementById("neoCaptcha-guess-button-"+n))==null||fe.addEventListener("click",()=>Te(n));function Te(n){let a=document.getElementById("neoCaptcha-guess-icon-"+n).src,o=a.split("/");a=o[o.length-1].split(".")[0],u.push({action:"guess",tag:a,time:Date.now()-h}),A()}b==null||b.addEventListener("click",A);async function A(){if(!f)return;f=!1,b.disabled=!0;for(let s=1;s<=4;s++)document.getElementById("neoCaptcha-guess-button-"+s).disabled=!0;if(!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,c.width,c.height),m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,y.width,y.height),W===0&&(W=Date.now());const n=W-h;u.push({action:"end",time:n});const a={challenge:P,hmac:R,activity:u},o=await fetch(ce+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});let t=!1,E=!1;try{const s=await o.json();t=s.valid,E=s.retry,E&&(P=s.challenge,R=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const d=c.width*.1;let C=c.width/2,H=c.height/2;const r=c.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=d+20;let s=C+d/8,p=H+d/4;S(r,s,p),e.lineWidth=d+17,S(r,s,p),e.lineWidth=d+14,S(r,s,p),e.lineWidth=d+11,S(r,s,p),e.lineWidth=d+8,S(r,s,p),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=d,S(r,C,H)}else if(E){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=d+20;let s=C+d/8,p=H+d/4;z(r,s,p),e.lineWidth=d+17,z(r,s,p),e.lineWidth=d+14,z(r,s,p),e.lineWidth=d+11,z(r,s,p),e.lineWidth=d+8,z(r,s,p),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=d,z(r,C,H)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=d+20;let s=C+d/8,p=H+d/4;M(r,s,p),e.lineWidth=d+17,M(r,s,p),e.lineWidth=d+14,M(r,s,p),e.lineWidth=d+11,M(r,s,p),e.lineWidth=d+8,M(r,s,p),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=d,M(r,C,H)}t?(console.log("Yippie!"),ue()):E?setTimeout(()=>{ae(),le()},500):(console.log("Womp, womp"),ue())}function ue(){document.getElementById("neoCaptcha-guess").style.display="none",document.getElementById("neoCaptcha-submit").style.display="block",b.disabled=!1,b.removeEventListener("click",A),b.addEventListener("click",ne);let n=document.getElementById("neoCaptcha-submitIcon");n.innerText="replay"}function ne(){ae(),P=void 0,R=void 0,b.removeEventListener("click",ne),b.addEventListener("click",A);let n=document.getElementById("neoCaptcha-submitIcon");n.innerText="check",e&&e.clearRect(0,0,c.width,c.height);const a=document.getElementById("neoCaptcha-image");a.style.display="none",x.style.display="none"}function S(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t/2,o+t),e.lineTo(a-t-t/2,o),e.moveTo(a-t/2,o+t),e.lineTo(a+n-t/2,o-t),e.stroke()}function M(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t,o-t),e.lineTo(a+t,o+t),e.moveTo(a+t,o-t),e.lineTo(a-t,o+t),e.stroke()}function z(n,a,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t,o),e.lineTo(a-t+1,o),e.moveTo(a,o),e.lineTo(a+1,o),e.moveTo(a+t,o),e.lineTo(a+t+1,o),e.stroke()}function ae(){k=!1,u=[],h=0,W=0,G=0,v=0,f=!1,b.disabled=!0,B=!1,X="",J=0,K=0;const n=document.getElementById("neoCaptcha-wrapper");n.style.display="none",O.style.display="block",m&&m.clearRect(0,0,y.width,y.height),T&&(V.style.background=se,U.innerText="do_not_touch"),document.getElementById("neoCaptcha-guess").style.display="grid",document.getElementById("neoCaptcha-submit").style.display="block",N?(document.getElementById("neoCaptcha-submit").style.display="none",c.style.cursor="auto",Y=!1,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_see_shape_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(i[l]||i.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(i[l]||i.en).mode_2_text):(document.getElementById("neoCaptcha-guess").style.display="none",c.style.cursor="crosshair",Y=!0,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_find_corner_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(i[l]||i.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(i[l]||i.en).mode_1_text),Y?(c.addEventListener("mousedown",j),c.addEventListener("touchstart",j,{passive:!1})):(c.removeEventListener("mousedown",j),c.removeEventListener("touchstart",j))}}return window.NeoCAPTCHA={render:oe},q.renderCaptcha=oe,Object.defineProperty(q,Symbol.toStringTag,{value:"Module"}),q}({});
