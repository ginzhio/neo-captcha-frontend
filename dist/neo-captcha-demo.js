var NeoCAPTCHA=function(ce){"use strict";const $e=`
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
`;function Ve(){if(document.getElementById("neo-captcha-style"))return;const I=document.createElement("style");I.id="neo-captcha-style",I.textContent=$e,document.head.appendChild(I)}function Oe(){if(document.getElementById("neo-captcha-material-icons"))return;const I=document.createElement("link");I.id="neo-captcha-material-icons",I.rel="stylesheet",I.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(I)}function Te(I){var Ne,qe;Oe(),Ve(),I.innerHTML=`
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
    `;const _e="1.1.5-demo",Ie="https://neo-captcha.com/api/v1",E=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),w=document.getElementById("neoCaptcha-startOverlay"),T=document.getElementById("neoCaptcha-submit"),se=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),t=c.getContext("2d"),_=document.getElementById("neoCaptcha-timeCanvas"),b=_.getContext("2d");if(!t||!b)throw new Error("Canvas context could not be initialized.");let $="ns",ee=$==="ns"||$==="ncs",H=!1;document.getElementById("neoCaptchaRoot").classList.add("neo-captcha-theme-dark"),document.getElementById("neoCaptchaWidgetLogo").src="https://neo-captcha.com/assets/logo-dark.png";const Y="#f406",ke="#0f4a";let d=(navigator.language||navigator.languages[0]).split("-")[0];m("lang: "+d);const i={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_desktop:"Click at the <b>signal tone!</b>",step_2_motion:"<b>Shake</b> your phone!",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!",settings:"Settings",settings_variant:"Variant:",settings_difficulty:"Difficulty:",opt_ns:"Neon Shape",opt_iq:"Implied Square",opt_easy:"Easy",opt_medium:"Medium",opt_hard:"Hard"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_desktop:"Klicke beim <b>Signalton!</b>",step_2_motion:"<b>Schüttel</b> dein Handy!",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?",settings:"Einstellungen",settings_variant:"Variante:",settings_difficulty:"Schwierigkeit:",opt_ns:"Neon-Form",opt_iq:"Angedeutetes Viereck",opt_easy:"Einfach",opt_medium:"Mittel",opt_hard:"Schwer"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(i[d]||i.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(i[d]||i.en).step_1,E?(document.getElementById("neoCaptcha-step_2").innerHTML=(i[d]||i.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(i[d]||i.en).step_2):(document.getElementById("neoCaptcha-step_2").innerHTML=(i[d]||i.en).step_2_desktop,document.getElementById("neoCaptcha-signalText").innerHTML=(i[d]||i.en).step_2_desktop),document.getElementById("neoCaptcha-step_3").innerHTML=(i[d]||i.en).step_3,ee?(document.getElementById("neoCaptcha-mode").innerHTML=(i[d]||i.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(i[d]||i.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(i[d]||i.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(i[d]||i.en).mode_1_text),document.getElementById("neoCaptcha-settings").innerHTML=(i[d]||i.en).settings,document.getElementById("neoCaptcha-labelVari").innerHTML=(i[d]||i.en).settings_variant,document.getElementById("neoCaptcha-labelDiff").innerHTML=(i[d]||i.en).settings_difficulty,document.getElementById("neoCaptcha-optNs").innerHTML=(i[d]||i.en).opt_ns,document.getElementById("neoCaptcha-optIq").innerHTML=(i[d]||i.en).opt_iq,document.getElementById("neoCaptcha-optEasy").innerHTML=(i[d]||i.en).opt_easy,document.getElementById("neoCaptcha-optMedium").innerHTML=(i[d]||i.en).opt_medium,document.getElementById("neoCaptcha-optHard").innerHTML=(i[d]||i.en).opt_hard;let te="easy",Me=document.getElementById("neoCaptcha-selectVari");Me.addEventListener("change",()=>{Me.selectedIndex==0?$="ns":$="iq",ee=$==="ns",we()});let le=document.getElementById("neoCaptcha-selectDiff");le.addEventListener("change",()=>{le.selectedIndex==0?te="easy":le.selectedIndex==1?te="medium":te="hard"});let F=6e3,v=[255,0,0],R=!1,k=[],u=0,J=0,de=0,C=0,x=!1,re="",pe=0,he=0,K,U,me=0;const Be=50,Z=500/Be,V=.6;let D=0,M=0,B=0,A=0,L,ne=[],S=!1,O=!1;{const e=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText"),o=document.getElementById("neoCaptcha-howToIcon");a.style.display=O?"block":"none",o.innerText=O?"expand_less":"expand_more",e.addEventListener("click",()=>{O=!O,a.style.display=O?"block":"none",o.innerText=O?"expand_less":"expand_more"})}const W=document.getElementById("neoCaptcha-overlayBg");E?W.style.background=Y:W.style.background="#000";const z=document.getElementById("neoCaptcha-signalIcon");z.innerText=E?"do_not_touch":"hearing",se.addEventListener("click",Le);let P=E;function Le(){E&&window.DeviceMotionEvent?"requestPermission"in DeviceMotionEvent?DeviceMotionEvent.requestPermission().then(e=>{e==="granted"?(m("motion permission granted"),P=!0,window.addEventListener("devicemotion",ge)):(m("motion permission denied"),P=!1),ae()}).catch(e=>{m("motion permission error"),Je(e),P=!1,ae()}):(m("motion allowed by default"),P=!0,window.addEventListener("devicemotion",ge),ae()):(m("no motion available"),P=!1,ae())}Ce();async function ae(){m("version: "+_e),m("userAgent: "+navigator.userAgent);const e=document.getElementById("neoCaptcha-wrapper");e.style.display="flex",se.style.display="none";const a={challenge:K,hmac:U,userAgent:navigator.userAgent,mobile:E,version:_e,minDifficulty:te,variant:$},n=await(await fetch(Ie+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(n.img){const r=document.getElementById("neoCaptcha-image");r.style.display="inline-block",w.style.display="flex",re=`data:image/png;base64,${n.img}`,v=n.color,K=n.challenge,U=n.hmac,F=n.totalTime||F,me=n.suspense;const s=document.getElementById("neoCaptcha-container");if(s.style.height="20em",n.variant==="ns")for(let g=1;g<=4;g++)document.getElementById("neoCaptcha-guess-icon-"+g).src=`https://neo-captcha.com/assets/icon_shape_${n.icons[g-1]}.png`;if(c.style.width="20em",c.style.height="20em",c.width=c.clientWidth,c.height=c.width,pe=c.width*n.pointSize,he=c.width*n.thumbSize,!t||!b)throw new Error("Canvas context could not be initialized.");t.fillStyle="rgba(0, 0, 0)",t.fillRect(0,0,c.width,c.height),b.fillStyle=`rgba(${v[0]}, ${v[1]}, ${v[2]})`,de=Date.now(),m("isMobile",E,"motionAllowed",P),E&&P?setTimeout(()=>je(),1e3):(m("beep timeout, no motion available"),setTimeout(()=>He(),me))}}function Se(e){S=e,E&&(S?(W.style.background=Y,z.innerText="edgesensor_low",z.style.animation="shake 0.4s ease-in-out infinite",document.getElementById("neoCaptcha-step_2").innerHTML=(i[d]||i.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(i[d]||i.en).step_2_motion,w.removeEventListener("pointerdown",oe),w.removeEventListener("pointermove",fe),w.removeEventListener("pointerup",ie)):(W.style.background=Y,z.innerText="do_not_touch",z.style.animation="none",document.getElementById("neoCaptcha-step_2").innerHTML=(i[d]||i.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(i[d]||i.en).step_2,w.addEventListener("pointerdown",oe,{passive:!1}),w.addEventListener("pointermove",fe,{passive:!1}),w.addEventListener("pointerup",ie)))}async function ge(e){if(S||m("handleMotion"),!(e instanceof DeviceMotionEvent))return;const a=Date.now();if(D>0&&a-D<Be)return;S||m("there is motion"),D=a;const o=e.accelerationIncludingGravity;if(o&&o.x!==null&&o.y!==null&&o.z!==null){S||Se(!0),M=V*M+(1-V)*o.x,B=V*B+(1-V)*o.y,A=V*A+(1-V)*o.z;let n=Math.sqrt(M*M+B*B+A*A),r=Math.sqrt(M*M+B*B);if(L){let s=n-L.mag,g=M-L.x,y=B-L.y,p=A-L.z;L={mag:n,move:r,x:M,y:B,z:A,dmag:s,dx:g,dy:y,dz:p},ne.push(L),ne.length>Z&&(C<=0&&(C=Date.now()),ze()&&(oe(),ie()))}else L={mag:n,move:r,x:M,y:B,z:A,dmag:0,dx:0,dy:0,dz:0}}}function ze(e=!1){let n=0,r=0,s=0,g=99,y=-99;function p(){n=0,r=0,s=0,g=99,y=-99}let l=0,h=0,xe;for(const f of ne){if(h++,h<Z){xe=f;continue}let Ee=!1;if(Math.abs(f.x)>2?(f.x<xe.x?(e&&m(h-Z,"<left","x:",f.x,"move:",f.move,"mag:",f.mag),n===1?Ee=!0:r++,n=-1):(e&&m(h-Z,"right>","x:",f.x,"move:",f.move,"mag:",f.mag),n===-1?Ee=!0:r++,n=1),s+=f.mag,g=Math.min(g,Math.sign(f.x)*f.move),y=Math.max(y,Math.sign(f.x)*f.move)):f.mag>9&&(e&&m(h-Z,"idle"),p(),l=0),Ee){let Ke=2<=r&&r<=5,Ue=s/r,Ze=Math.abs(y-g);Ke&&Ue>7&&Ze>7&&l++,p()}if(xe=f,l>=2)break}return l>=1?W.style.background=ke:n===0&&(W.style.background=Y,C=Date.now()),l>=2}function je(){!S||D<=0?(m("beep timeout, regular","motionEnabled:",S,"lastMotionTime:",D),setTimeout(()=>He(),me)):m("no beep","motionEnabled:",S,"lastMotionTime:",D)}function He(){E?(W.style.background=ke,z.innerText="touch_app",z.style.animation="blinker 0.5s ease-in-out infinite",C=Date.now()):Xe()}const N=new AudioContext,Xe=()=>{N.state==="suspended"?N.resume().then(()=>De()):De()},De=()=>{ue(285,.12),ue(852,.12,.12),ue(528,.12,.24),C=Date.now()};function ue(e,a,o=0){let n=N.createOscillator(),r=N.createGain();n.type="sine",n.frequency.value=e,r.gain.value=.1,n.connect(r),r.connect(N.destination),n.start(N.currentTime+o),n.stop(N.currentTime+o+a)}let q;function oe(){if(u==0){let e;C<=0?e=0:e=Date.now()-C,q={action:"react",time:e}}}w.addEventListener("pointerdown",oe,{passive:!1}),w.addEventListener("pointermove",fe,{passive:!1});function fe(){C<=0&&(q=void 0)}function ie(){if(C<=0&&(q={action:"react",time:-1},C=1),!(q&&q.time===0)&&C>0&&u==0&&q){D>0&&(window.removeEventListener("devicemotion",ge),ze(!0)),k.push(q),k.push({action:"start",time:Date.now()-de}),x=!0;const e=document.getElementById("neoCaptcha-image");if(e.src=re,Ge(),!t)throw new Error("Canvas context could not be initialized.");if(t.clearRect(0,0,c.width,c.height),w.style.display="none",ee)for(let a=1;a<=4;a++)document.getElementById("neoCaptcha-guess-button-"+a).disabled=!1}}w.addEventListener("pointerup",ie);function Ge(){u=Date.now(),Ae()}function Ae(){if(!b)throw new Error("Canvas context could not be initialized.");const e=Date.now()-u,a=Math.max(F-e,0),o=a/F*_.width;b.clearRect(0,0,_.width,_.height),b.fillStyle=`rgba(${v[0]}, ${v[1]}, ${v[2]})`,b.fillRect(0,0,o,_.height),a>0&&x?requestAnimationFrame(Ae):a<=0&&x?(m("Time's up!"),J=u+F,Q()):(b.fillStyle="rgba(255, 255, 255, 0.8)",b.fillRect(0,0,_.width,_.height))}function be(e){if(H&&e.preventDefault(),u>0){const a=c.getBoundingClientRect();let{x:o,y:n}=ye(e,a);k.push({action:"down",enabled:x,x:o,y:n,time:Date.now()-u}),x&&H&&(R=!0,We(o,n))}}function Ye(e){H&&e.preventDefault();const a=c.getBoundingClientRect();let{x:o,y:n}=ye(e,a);u>0&&k.push({action:"move",enabled:x,drawing:R,x:o,y:n,time:Date.now()-u}),x&&R&&We(o,n)}c.addEventListener("pointermove",Ye,{passive:!1});function ve(e){if(H&&e.preventDefault(),H&&!R)return;const a=c.getBoundingClientRect();let{x:o,y:n}=ye(e,a);if(u>0&&k.push({action:"up",enabled:x,x:o,y:n,time:Date.now()-u}),u>=0&&x&&R){if(R=!1,k.push({action:"point",x:o/c.width,y:n/c.height,time:Date.now()-u}),T.disabled=!1,!t)throw new Error("Canvas context could not be initialized.");t.clearRect(0,0,c.width,c.height),t.beginPath(),t.arc(o,n,pe/2,0,Math.PI*2),t.fillStyle=`rgba(${v[0]}, ${v[1]}, ${v[2]})`,t.fill()}}c.addEventListener("pointerup",ve),c.addEventListener("pointercancel",ve);function We(e,a){if(!t)throw new Error("Canvas context could not be initialized.");t.clearRect(0,0,c.width,c.height),t.beginPath(),t.arc(e-1,a-1,he/2,0,Math.PI*2),t.fillStyle=`rgba(${v[0]}, ${v[1]}, ${v[2]}, 0.2)`,t.fill()}function ye(e,a){let o,n;return e instanceof MouseEvent?(o=e.clientX-a.left,n=e.clientY-a.top):(o=e.changedTouches[0].clientX-a.left,n=e.changedTouches[0].clientY-a.top),{x:o,y:n}}for(let e=1;e<=4;e++)(Ne=document.getElementById("neoCaptcha-guess-button-"+e))==null||Ne.addEventListener("pointerdown",be),(qe=document.getElementById("neoCaptcha-guess-button-"+e))==null||qe.addEventListener("pointerup",a=>{ve(a),Fe(e)});function Fe(e){let a=document.getElementById("neoCaptcha-guess-icon-"+e).src,o=a.split("/");a=o[o.length-1].split(".")[0],k.push({action:"guess",tag:a,time:Date.now()-u}),Q()}T==null||T.addEventListener("click",Q);async function Q(){if(!x)return;x=!1,T.disabled=!0;for(let l=1;l<=4;l++)document.getElementById("neoCaptcha-guess-button-"+l).disabled=!0;if(!t||!b)throw new Error("Canvas context could not be initialized.");t.fillStyle="rgba(255, 255, 255, 0.8)",t.fillRect(0,0,c.width,c.height),b.fillStyle="rgba(255, 255, 255, 0.8)",b.fillRect(0,0,_.width,_.height),J===0&&(J=Date.now());const e=J-u;k.push({action:"end",time:e});const a={challenge:K,hmac:U,activity:k},o=await fetch(Ie+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});let n=!1,r=!1;try{const l=await o.json();n=l.valid,r=l.retry,r&&(K=l.challenge,U=l.hmac)}catch{}t.lineJoin="round",t.lineCap="round";const s=c.width*.1;let g=c.width/2,y=c.height/2;const p=c.width/3;if(n){t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=s+20;let l=g+s/8,h=y+s/4;j(p,l,h),t.lineWidth=s+17,j(p,l,h),t.lineWidth=s+14,j(p,l,h),t.lineWidth=s+11,j(p,l,h),t.lineWidth=s+8,j(p,l,h),t.strokeStyle="rgba(0, 160, 0)",t.lineWidth=s,j(p,g,y)}else if(r){t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=s+20;let l=g+s/8,h=y+s/4;G(p,l,h),t.lineWidth=s+17,G(p,l,h),t.lineWidth=s+14,G(p,l,h),t.lineWidth=s+11,G(p,l,h),t.lineWidth=s+8,G(p,l,h),t.strokeStyle="rgba(0, 80, 255)",t.lineWidth=s,G(p,g,y)}else{t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=s+20;let l=g+s/8,h=y+s/4;X(p,l,h),t.lineWidth=s+17,X(p,l,h),t.lineWidth=s+14,X(p,l,h),t.lineWidth=s+11,X(p,l,h),t.lineWidth=s+8,X(p,l,h),t.strokeStyle="rgba(255, 0, 0)",t.lineWidth=s,X(p,g,y)}n?(m("Yippie!"),Re()):r?setTimeout(()=>{Ce(),Le()},500):(m("Womp, womp"),Re())}function Re(){document.getElementById("neoCaptcha-guess").style.display="none",document.getElementById("neoCaptcha-submit").style.display="block",T.disabled=!1,T.removeEventListener("click",Q),T.addEventListener("click",we);let e=document.getElementById("neoCaptcha-submitIcon");e.innerText="replay"}function we(){Ce(),K=void 0,U=void 0,T.removeEventListener("click",we),T.addEventListener("click",Q);let e=document.getElementById("neoCaptcha-submitIcon");e.innerText="check",t&&t.clearRect(0,0,c.width,c.height);const a=document.getElementById("neoCaptcha-image");a.style.display="none",w.style.display="none"}function j(e,a,o){if(!t)throw new Error("Canvas context could not be initialized.");const n=e/2;t.beginPath(),t.moveTo(a-n/2,o+n),t.lineTo(a-n-n/2,o),t.moveTo(a-n/2,o+n),t.lineTo(a+e-n/2,o-n),t.stroke()}function X(e,a,o){if(!t)throw new Error("Canvas context could not be initialized.");const n=e/2;t.beginPath(),t.moveTo(a-n,o-n),t.lineTo(a+n,o+n),t.moveTo(a+n,o-n),t.lineTo(a-n,o+n),t.stroke()}function G(e,a,o){if(!t)throw new Error("Canvas context could not be initialized.");const n=e/2;t.beginPath(),t.moveTo(a-n,o),t.lineTo(a-n+1,o),t.moveTo(a,o),t.lineTo(a+1,o),t.moveTo(a+n,o),t.lineTo(a+n+1,o),t.stroke()}function Ce(){R=!1,k=[],u=0,J=0,de=0,C=0,x=!1,T.disabled=!0,re="",pe=0,he=0;const e=document.getElementById("neoCaptcha-wrapper");e.style.display="none",se.style.display="block",b&&b.clearRect(0,0,_.width,_.height),E&&(S?(D=0,M=0,B=0,A=0,L=void 0,ne=[],Se(!0)):(W.style.background=Y,z.innerText="do_not_touch",z.style.animation="none")),document.getElementById("neoCaptcha-guess").style.display="grid",document.getElementById("neoCaptcha-submit").style.display="block",ee?(document.getElementById("neoCaptcha-submit").style.display="none",c.style.cursor="auto",c.style.touchAction="auto",H=!1,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_see_shape_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(i[d]||i.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(i[d]||i.en).mode_2_text):(document.getElementById("neoCaptcha-guess").style.display="none",c.style.cursor="crosshair",c.style.touchAction="none",H=!0,document.getElementById("neoCaptcha-modeIcon").src="https://neo-captcha.com/assets/icon_find_corner_dark.png",document.getElementById("neoCaptcha-mode").innerHTML=(i[d]||i.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(i[d]||i.en).mode_1_text),H?c.addEventListener("pointerdown",be,{passive:!1}):c.addEventListener("pointerdown",be)}function m(e,...a){Pe(" > ",e,a),console.log(e,a)}function Je(e,...a){Pe("!!! ERROR: ",e,a),console.error(e,a)}function Pe(e,a,o){let n=document.getElementById("testLogs");if(n){let r=JSON.stringify(a)+" ";o&&(r+=o.map(g=>JSON.stringify(g)).join(" "));let s=n;s.value+=e+r+`
`,s.scrollTop=s.scrollHeight}}}return window.NeoCAPTCHA={render:Te},ce.renderCaptcha=Te,Object.defineProperty(ce,Symbol.toStringTag,{value:"Module"}),ce}({});
