var NeoCAPTCHA=function(oe){"use strict";const Re=`
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
}

.neo-captcha-theme-dark {
    --neo-captcha-bg: var(--neo-captcha-bg-dark);
    --neo-captcha-bg2: var(--neo-captcha-bg2-dark);
    --neo-captcha-fg: var(--neo-captcha-fg-dark);
    --neo-captcha-gradient: linear-gradient(color-mix(in srgb, var(--neo-captcha-fg) 25%, transparent), color-mix(in srgb, var(--neo-captcha-fg) 5%, transparent));
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
    color: var(--neo-captcha-light);
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

@keyframes shake {
    0% {
        transform: rotate(-10deg) translateX(-0.25em);
    }
    50% {
        transform: rotate(10deg) translateX(0.25em);
    }
    100% {
        transform: rotate(-10deg) translateX(-0.25em);
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
    background: var(--neo-captcha-gradient);
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
`;function Ne(){if(document.getElementById("neo-captcha-style"))return;const T=document.createElement("style");T.id="neo-captcha-style",T.textContent=Re,document.head.appendChild(T)}function $e(){if(document.getElementById("neo-captcha-material-icons"))return;const T=document.createElement("link");T.id="neo-captcha-material-icons",T.rel="stylesheet",T.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(T)}function xe(T){var Ae,Pe;$e(),Ne(),T.innerHTML=`
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
    `;const Ee="1.1.4-demo",Te="https://neo-captcha.com/api/v1",S=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),y=document.getElementById("neoCaptcha-startOverlay"),x=document.getElementById("neoCaptcha-submit"),ie=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),e=c.getContext("2d"),E=document.getElementById("neoCaptcha-timeCanvas"),f=E.getContext("2d");if(!e||!f)throw new Error("Canvas context could not be initialized.");let N="ns",Z=N==="ns"||N==="ncs",z=!1;document.getElementById("neoCaptchaRoot").classList.add("neo-captcha-theme-dark"),document.getElementById("neoCaptchaWidgetLogo").src="https://neo-captcha.com/assets/logo-dark.png";const X="#f406",_e="#0f4a";let d=(navigator.language||navigator.languages[0]).split("-")[0];console.log("lang: "+d);const o={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_desktop:"Click at the <b>signal tone!</b>",step_2_motion:"<b>Shake</b> your phone!",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!",settings:"Settings",settings_variant:"Variant:",settings_difficulty:"Difficulty:",opt_ns:"Neon Shape",opt_iq:"Implied Square",opt_easy:"Easy",opt_medium:"Medium",opt_hard:"Hard"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_desktop:"Klicke beim <b>Signalton!</b>",step_2_motion:"<b>Schüttel</b> dein Handy!",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?",settings:"Einstellungen",settings_variant:"Variante:",settings_difficulty:"Schwierigkeit:",opt_ns:"Neon-Form",opt_iq:"Angedeutetes Viereck",opt_easy:"Einfach",opt_medium:"Mittel",opt_hard:"Schwer"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(o[d]||o.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(o[d]||o.en).step_1,S?(document.getElementById("neoCaptcha-step_2").innerHTML=(o[d]||o.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(o[d]||o.en).step_2):(document.getElementById("neoCaptcha-step_2").innerHTML=(o[d]||o.en).step_2_desktop,document.getElementById("neoCaptcha-signalText").innerHTML=(o[d]||o.en).step_2_desktop),document.getElementById("neoCaptcha-step_3").innerHTML=(o[d]||o.en).step_3,Z?(document.getElementById("neoCaptcha-mode").innerHTML=(o[d]||o.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(o[d]||o.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(o[d]||o.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(o[d]||o.en).mode_1_text),document.getElementById("neoCaptcha-settings").innerHTML=(o[d]||o.en).settings,document.getElementById("neoCaptcha-labelVari").innerHTML=(o[d]||o.en).settings_variant,document.getElementById("neoCaptcha-labelDiff").innerHTML=(o[d]||o.en).settings_difficulty,document.getElementById("neoCaptcha-optNs").innerHTML=(o[d]||o.en).opt_ns,document.getElementById("neoCaptcha-optIq").innerHTML=(o[d]||o.en).opt_iq,document.getElementById("neoCaptcha-optEasy").innerHTML=(o[d]||o.en).opt_easy,document.getElementById("neoCaptcha-optMedium").innerHTML=(o[d]||o.en).opt_medium,document.getElementById("neoCaptcha-optHard").innerHTML=(o[d]||o.en).opt_hard;let Q="easy",Ie=document.getElementById("neoCaptcha-selectVari");Ie.addEventListener("change",()=>{Ie.selectedIndex==0?N="ns":N="iq",Z=N==="ns",ve()});let ce=document.getElementById("neoCaptcha-selectDiff");ce.addEventListener("change",()=>{ce.selectedIndex==0?Q="easy":ce.selectedIndex==1?Q="medium":Q="hard"});let G=6e3,b=[255,0,0],A=!1,_=[],g=0,Y=0,se=0,w=0,C=!1,le="",de=0,re=0,F,J,ee=0;const ke=50,K=500/ke,$=.6;let H=0,I=0,k=0,D=0,M,te=[],B=!1,q=!1;{const n=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText"),i=document.getElementById("neoCaptcha-howToIcon");a.style.display=q?"block":"none",i.innerText=q?"expand_less":"expand_more",n.addEventListener("click",()=>{q=!q,a.style.display=q?"block":"none",i.innerText=q?"expand_less":"expand_more"})}const W=document.getElementById("neoCaptcha-overlayBg");S?W.style.background=X:W.style.background="#000";const L=document.getElementById("neoCaptcha-signalIcon");L.innerText=S?"do_not_touch":"hearing",ie.addEventListener("click",Me),ye();async function Me(){console.log("version: "+Ee),console.log("userAgent: "+navigator.userAgent);const n=document.getElementById("neoCaptcha-wrapper");n.style.display="flex",ie.style.display="none";const a={challenge:F,hmac:J,userAgent:navigator.userAgent,mobile:S,version:Ee,minDifficulty:Q,variant:N},t=await(await fetch(Te+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(console.log(t),t.img){const h=document.getElementById("neoCaptcha-image");h.style.display="inline-block",y.style.display="flex",le=`data:image/png;base64,${t.img}`,b=t.color,F=t.challenge,J=t.hmac,G=t.totalTime||G,ee=t.suspense;const l=document.getElementById("neoCaptcha-container");if(l.style.height="20em",t.variant==="ns")for(let m=1;m<=4;m++)document.getElementById("neoCaptcha-guess-icon-"+m).src=`https://neo-captcha.com/assets/icon_shape_${t.icons[m-1]}.png`;if(c.style.width="20em",c.style.height="20em",c.width=c.clientWidth,c.height=c.width,de=c.width*t.pointSize,re=c.width*t.thumbSize,!e||!f)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,c.width,c.height),f.fillStyle=`rgba(${b[0]}, ${b[1]}, ${b[2]})`,se=Date.now(),S&&window.DeviceMotionEvent?"requestPermission"in DeviceMotionEvent?DeviceMotionEvent.requestPermission().then(m=>{m==="granted"?(window.addEventListener("devicemotion",pe),console.log("beepIfNoMotion timeout, permission"),setTimeout(()=>Se(),1e3)):(console.log("beep timeout, no motion permission"),setTimeout(()=>he(),ee))}).catch(console.error):(window.addEventListener("devicemotion",pe),console.log("beepIfNoMotion timeout, regular"),setTimeout(()=>Se(),1e3)):(console.log("beep timeout, no motion available"),setTimeout(()=>he(),ee))}}function Be(n){B=n,S&&(B?(W.style.background=X,L.innerText="edgesensor_low",L.style.animation="shake 0.4s ease-in-out infinite",document.getElementById("neoCaptcha-step_2").innerHTML=(o[d]||o.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(o[d]||o.en).step_2_motion,y.removeEventListener("pointerdown",ne),y.removeEventListener("pointermove",ge),y.removeEventListener("pointerup",ae)):(W.style.background=X,L.innerText="do_not_touch",L.style.animation="none",document.getElementById("neoCaptcha-step_2").innerHTML=(o[d]||o.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(o[d]||o.en).step_2,y.addEventListener("pointerdown",ne,{passive:!1}),y.addEventListener("pointermove",ge,{passive:!1}),y.addEventListener("pointerup",ae)))}async function pe(n){if(B||console.log("handleMotion"),!(n instanceof DeviceMotionEvent))return;const a=Date.now();if(H>0&&a-H<ke)return;B||console.log("there is motion"),H=a;const i=n.accelerationIncludingGravity;if(i&&i.x!==null&&i.y!==null&&i.z!==null){B||Be(!0),I=$*I+(1-$)*i.x,k=$*k+(1-$)*i.y,D=$*D+(1-$)*i.z;let t=Math.sqrt(I*I+k*k+D*D),h=Math.sqrt(I*I+k*k);if(M){let l=t-M.mag,m=I-M.x,v=k-M.y,r=D-M.z;M={mag:t,move:h,x:I,y:k,z:D,dmag:l,dx:m,dy:v,dz:r},te.push(M),te.length>K&&(w<=0&&(w=Date.now()),Le()&&(ne(),ae()))}else M={mag:t,move:h,x:I,y:k,z:D,dmag:0,dx:0,dy:0,dz:0}}}function Le(n=!1){let t=0,h=0,l=0,m=99,v=-99;function r(){t=0,h=0,l=0,m=99,v=-99}let s=0,p=0,we;for(const u of te){if(p++,p<K){we=u;continue}let Ce=!1;if(Math.abs(u.x)>2?(u.x<we.x?(n&&console.log(p-K,"<left","x:",u.x,"move:",u.move,"mag:",u.mag),t===1?Ce=!0:h++,t=-1):(n&&console.log(p-K,"right>","x:",u.x,"move:",u.move,"mag:",u.mag),t===-1?Ce=!0:h++,t=1),l+=u.mag,m=Math.min(m,Math.sign(u.x)*u.move),v=Math.max(v,Math.sign(u.x)*u.move)):u.mag>9&&(n&&console.log(p-K,"idle"),r(),s=0),Ce){let Xe=2<=h&&h<=5,Ge=l/h,Ye=Math.abs(v-m);Xe&&Ge>7&&Ye>7&&s++,r()}if(we=u,s>=2)break}return s>=1?W.style.background=_e:t===0&&(W.style.background=X,w=Date.now()),s>=2}function Se(){!B||H<=0?(console.log("beep timeout, regular","motionEnabled:",B,"lastMotionTime:",H),setTimeout(()=>he(),ee)):console.log("no beep","motionEnabled:",B,"lastMotionTime:",H)}function he(){S?(W.style.background=_e,L.innerText="touch_app",L.style.animation="blinker 0.5s ease-in-out infinite",w=Date.now()):qe()}const P=new AudioContext,qe=()=>{P.state==="suspended"?P.resume().then(()=>ze()):ze()},ze=()=>{me(285,.12),me(852,.12,.12),me(528,.12,.24),w=Date.now()};function me(n,a,i=0){let t=P.createOscillator(),h=P.createGain();t.type="sine",t.frequency.value=n,h.gain.value=.1,t.connect(h),h.connect(P.destination),t.start(P.currentTime+i),t.stop(P.currentTime+i+a)}let R;function ne(){if(g==0){let n;w<=0?n=0:n=Date.now()-w,R={action:"react",time:n}}}y.addEventListener("pointerdown",ne,{passive:!1}),y.addEventListener("pointermove",ge,{passive:!1});function ge(){w<=0&&(R=void 0)}function ae(){if(w<=0&&(R={action:"react",time:-1},w=1),!(R&&R.time===0)&&w>0&&g==0&&R){H>0&&(window.removeEventListener("devicemotion",pe),Le(!0)),_.push(R),_.push({action:"start",time:Date.now()-se}),C=!0;const n=document.getElementById("neoCaptcha-image");if(n.src=le,Ve(),!e)throw new Error("Canvas context could not be initialized.");if(e.clearRect(0,0,c.width,c.height),y.style.display="none",Z)for(let a=1;a<=4;a++)document.getElementById("neoCaptcha-guess-button-"+a).disabled=!1}}y.addEventListener("pointerup",ae);function Ve(){g=Date.now(),He()}function He(){if(!f)throw new Error("Canvas context could not be initialized.");const n=Date.now()-g,a=Math.max(G-n,0),i=a/G*E.width;f.clearRect(0,0,E.width,E.height),f.fillStyle=`rgba(${b[0]}, ${b[1]}, ${b[2]})`,f.fillRect(0,0,i,E.height),a>0&&C?requestAnimationFrame(He):a<=0&&C?(console.log("Time's up!"),Y=g+G,U()):(f.fillStyle="rgba(255, 255, 255, 0.8)",f.fillRect(0,0,E.width,E.height))}function ue(n){if(z&&n.preventDefault(),g>0){const a=c.getBoundingClientRect();let{x:i,y:t}=be(n,a);_.push({action:"down",enabled:C,x:i,y:t,time:Date.now()-g}),C&&z&&(A=!0,De(i,t))}}function je(n){z&&n.preventDefault();const a=c.getBoundingClientRect();let{x:i,y:t}=be(n,a);g>0&&_.push({action:"move",enabled:C,drawing:A,x:i,y:t,time:Date.now()-g}),C&&A&&De(i,t)}c.addEventListener("pointermove",je,{passive:!1});function fe(n){if(z&&n.preventDefault(),z&&!A)return;const a=c.getBoundingClientRect();let{x:i,y:t}=be(n,a);if(g>0&&_.push({action:"up",enabled:C,x:i,y:t,time:Date.now()-g}),g>=0&&C&&A){if(A=!1,_.push({action:"point",x:i/c.width,y:t/c.height,time:Date.now()-g}),x.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(i,t,de/2,0,Math.PI*2),e.fillStyle=`rgba(${b[0]}, ${b[1]}, ${b[2]})`,e.fill()}}c.addEventListener("pointerup",fe),c.addEventListener("pointercancel",fe);function De(n,a){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(n-1,a-1,re/2,0,Math.PI*2),e.fillStyle=`rgba(${b[0]}, ${b[1]}, ${b[2]}, 0.2)`,e.fill()}function be(n,a){let i,t;return n instanceof MouseEvent?(i=n.clientX-a.left,t=n.clientY-a.top):(i=n.changedTouches[0].clientX-a.left,t=n.changedTouches[0].clientY-a.top),{x:i,y:t}}for(let n=1;n<=4;n++)(Ae=document.getElementById("neoCaptcha-guess-button-"+n))==null||Ae.addEventListener("pointerdown",ue),(Pe=document.getElementById("neoCaptcha-guess-button-"+n))==null||Pe.addEventListener("pointerup",a=>{fe(a),Oe(n)});function Oe(n){let a=document.getElementById("neoCaptcha-guess-icon-"+n).src,i=a.split("/");a=i[i.length-1].split(".")[0],_.push({action:"guess",tag:a,time:Date.now()-g}),U()}x==null||x.addEventListener("click",U);async function U(){if(!C)return;C=!1,x.disabled=!0;for(let s=1;s<=4;s++)document.getElementById("neoCaptcha-guess-button-"+s).disabled=!0;if(!e||!f)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,c.width,c.height),f.fillStyle="rgba(255, 255, 255, 0.8)",f.fillRect(0,0,E.width,E.height),Y===0&&(Y=Date.now());const n=Y-g;_.push({action:"end",time:n});const a={challenge:F,hmac:J,activity:_},i=await fetch(Te+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});let t=!1,h=!1;try{const s=await i.json();t=s.valid,h=s.retry,h&&(F=s.challenge,J=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const l=c.width*.1;let m=c.width/2,v=c.height/2;const r=c.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=l+20;let s=m+l/8,p=v+l/4;V(r,s,p),e.lineWidth=l+17,V(r,s,p),e.lineWidth=l+14,V(r,s,p),e.lineWidth=l+11,V(r,s,p),e.lineWidth=l+8,V(r,s,p),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=l,V(r,m,v)}else if(h){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=l+20;let s=m+l/8,p=v+l/4;O(r,s,p),e.lineWidth=l+17,O(r,s,p),e.lineWidth=l+14,O(r,s,p),e.lineWidth=l+11,O(r,s,p),e.lineWidth=l+8,O(r,s,p),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=l,O(r,m,v)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=l+20;let s=m+l/8,p=v+l/4;j(r,s,p),e.lineWidth=l+17,j(r,s,p),e.lineWidth=l+14,j(r,s,p),e.lineWidth=l+11,j(r,s,p),e.lineWidth=l+8,j(r,s,p),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=l,j(r,m,v)}t?(console.log("Yippie!"),We()):h?setTimeout(()=>{ye(),Me()},500):(console.log("Womp, womp"),We())}function We(){document.getElementById("neoCaptcha-guess").style.display="none",document.getElementById("neoCaptcha-submit").style.display="block",x.disabled=!1,x.removeEventListener("click",U),x.addEventListener("click",ve);let n=document.getElementById("neoCaptcha-submitIcon");n.innerText="replay"}function ve(){ye(),F=void 0,J=void 0,x.removeEventListener("click",ve),x.addEventListener("click",U);let n=document.getElementById("neoCaptcha-submitIcon");n.innerText="check",e&&e.clearRect(0,0,c.width,c.height);const a=document.getElementById("neoCaptcha-image");a.style.display="none",y.style.display="none"}function V(n,a,i){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t/2,i+t),e.lineTo(a-t-t/2,i),e.moveTo(a-t/2,i+t),e.lineTo(a+n-t/2,i-t),e.stroke()}function j(n,a,i){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t,i-t),e.lineTo(a+t,i+t),e.moveTo(a+t,i-t),e.lineTo(a-t,i+t),e.stroke()}function O(n,a,i){if(!e)throw new Error("Canvas context could not be initialized.");const t=n/2;e.beginPath(),e.moveTo(a-t,i),e.lineTo(a-t+1,i),e.moveTo(a,i),e.lineTo(a+1,i),e.moveTo(a+t,i),e.lineTo(a+t+1,i),e.stroke()}function ye(){A=!1,_=[],g=0,Y=0,se=0,w=0,C=!1,x.disabled=!0,le="",de=0,re=0;const n=document.getElementById("neoCaptcha-wrapper");n.style.display="none",ie.style.display="block",f&&f.clearRect(0,0,E.width,E.height),S&&(B?(H=0,I=0,k=0,D=0,M=void 0,te=[],Be(!0)):(W.style.background=X,L.innerText="do_not_touch",L.style.animation="none")),document.getElementById("neoCaptcha-guess").style.display="grid",document.getElementById("neoCaptcha-submit").style.display="block",Z?(document.getElementById("neoCaptcha-submit").style.display="none",c.style.cursor="auto",c.style.touchAction="auto",z=!1,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_see_shape_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(o[d]||o.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(o[d]||o.en).mode_2_text):(document.getElementById("neoCaptcha-guess").style.display="none",c.style.cursor="crosshair",c.style.touchAction="none",z=!0,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_find_corner_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(o[d]||o.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(o[d]||o.en).mode_1_text),z?c.addEventListener("pointerdown",ue,{passive:!1}):c.addEventListener("pointerdown",ue)}}return window.NeoCAPTCHA={render:xe},oe.renderCaptcha=xe,Object.defineProperty(oe,Symbol.toStringTag,{value:"Module"}),oe}({});
