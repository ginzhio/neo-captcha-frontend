var NeoCAPTCHA=function(me){"use strict";const Ye=`
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
`;function Je(){if(document.getElementById("neo-captcha-style"))return;const k=document.createElement("style");k.id="neo-captcha-style",k.textContent=Ye,document.head.appendChild(k)}function Ve(){if(document.getElementById("neo-captcha-material-icons"))return;const k=document.createElement("link");k.id="neo-captcha-material-icons",k.rel="stylesheet",k.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(k)}function Le(k,d,O){var $e,Fe,Oe;Ve(),Je(),k.innerHTML=`
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
    `;const ze="1.1.5",De="https://neo-captcha.com/api/v1",ge=(d==null?void 0:d.variant)||"ns",ee=ge==="ns"||ge==="ncs",Ke=($e=window.matchMedia)==null?void 0:$e.call(window,"(prefers-color-scheme: dark)").matches,te=(d==null?void 0:d.theme)==="dark"||(d==null?void 0:d.theme)==="light"?d.theme:Ke?"dark":"light";let g=(navigator.language||navigator.languages[0]).split("-")[0];g=(d==null?void 0:d.lang)||g;const Ue=(d==null?void 0:d.minDifficulty)||"easy",Ze=(d==null?void 0:d.showHowTo)||!1;let j=(d==null?void 0:d.expandHowTo)||!1;const q=(d==null?void 0:d.visualOnDesktop)||!1,w=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),E=document.getElementById("neoCaptcha-startOverlay"),X=document.getElementById("neoCaptcha-submit"),ue=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),t=c.getContext("2d"),_=document.getElementById("neoCaptcha-timeCanvas"),v=_.getContext("2d");if(!t||!v)throw new Error("Canvas context could not be initialized.");let z;ee?(document.getElementById("neoCaptcha-submit").style.display="none",z=!1):(document.getElementById("neoCaptcha-guess").style.display="none",c.style.cursor="crosshair",c.style.touchAction="none",z=!0),document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${te}`),document.getElementById("neoCaptchaWidgetLogo").src=te==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png",ee?document.getElementById("neoCaptcha-modeIcon").src=te==="dark"?"https://neo-captcha.com/assets/icon_see_shape_dark.png":"https://neo-captcha.com/assets/icon_see_shape.png":document.getElementById("neoCaptcha-modeIcon").src=te==="dark"?"https://neo-captcha.com/assets/icon_find_corner_dark.png":"https://neo-captcha.com/assets/icon_find_corner.png";const ne="#f406",fe="#0f4a",l={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_desktop:"Click after the <b>sound cue!</b>",step_2_motion:"<b>Shake</b> your phone!",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape",mode_2_text:"Select the shape you see!"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_desktop:"Klicke beim <b>Signalton!</b>",step_2_motion:"<b>Schüttel</b> dein Handy!",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form",mode_2_text:"Welche Form siehst du?"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(l[g]||l.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(l[g]||l.en).step_1,w||q?(document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2_motion):(document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2_desktop,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2_desktop),document.getElementById("neoCaptcha-step_3").innerHTML=(l[g]||l.en).step_3,ee?(document.getElementById("neoCaptcha-mode").innerHTML=(l[g]||l.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(l[g]||l.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(l[g]||l.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(l[g]||l.en).mode_1_text);let U=6e3,y=[255,0,0],R=!1,M=[],b=0,Z=0,be=0,x=0,C=!1,ve="",ye=0,we=0,ae,oe,xe=0;const ie=50,Qe=500/ie,G=.6;let D=0,I=0,B=0,A=0,S,H=[],P=!1,ce=0;if(Ze){const e=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText"),o=document.getElementById("neoCaptcha-howToIcon");n.style.display=j?"block":"none",o.innerText=j?"expand_less":"expand_more",e.addEventListener("click",()=>{j=!j,n.style.display=j?"block":"none",o.innerText=j?"expand_less":"expand_more"})}else{const e=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText");e.style.display="none",n.style.display="none"}const N=document.getElementById("neoCaptcha-overlayBg");w||q?N.style.background=ne:N.style.background="#000";const L=document.getElementById("neoCaptcha-signalIcon");L.innerText=w||q?"do_not_touch":"hearing",ue.addEventListener("click",Ae);let W=w;function Ae(){w&&window.DeviceMotionEvent?(Y(!0),"requestPermission"in DeviceMotionEvent?DeviceMotionEvent.requestPermission().then(e=>{e==="granted"?(u("motion permission granted"),W=!0,window.addEventListener("devicemotion",Ce)):(u("motion permission denied"),W=!1),se()}).catch(e=>{u("motion permission error"),st(e),W=!1,se()}):(u("motion allowed by default"),W=!0,window.addEventListener("devicemotion",Ce),se())):(u("no motion available"),W=!1,se())}async function se(){u("version: "+ze),u("userAgent: "+navigator.userAgent),w&&Y(W);const e=document.getElementById("neoCaptcha-wrapper");e.style.display="flex",ue.style.display="none";const n={challenge:ae,hmac:oe,userAgent:navigator.userAgent,mobile:w,version:ze,minDifficulty:Ue,variant:ge},a=await(await fetch(De+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(a.img){const f=document.getElementById("neoCaptcha-image");f.style.display="inline-block",E.style.display="flex",ve=`data:image/png;base64,${a.img}`,y=a.color,ae=a.challenge,oe=a.hmac,U=a.totalTime||U,xe=a.suspense;const i=document.getElementById("neoCaptcha-container");if(i.style.height="18rem",a.variant==="ns")for(let p=1;p<=4;p++)document.getElementById("neoCaptcha-guess-icon-"+p).src=`https://neo-captcha.com/assets/icon_shape_${a.icons[p-1]}.png`;if(c.style.width="18rem",c.style.height="18rem",c.width=c.clientWidth,c.height=c.width,ye=c.width*a.pointSize,we=c.width*a.thumbSize,!t||!v)throw new Error("Canvas context could not be initialized.");t.fillStyle="rgba(0, 0, 0)",t.fillRect(0,0,c.width,c.height),v.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,be=Date.now(),u("isMobile",w,"motionAllowed",W),w&&W?setTimeout(()=>tt(),500):(u("beep timeout, no motion available"),setTimeout(()=>He(),xe))}}function Y(e){w&&(e?(N.style.background=ne,L.innerText="edgesensor_low",L.style.animation="shake 0.4s ease-in-out infinite",document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2_motion,E.removeEventListener("pointerdown",re),E.removeEventListener("pointermove",_e),E.removeEventListener("pointerup",le),ce=0,requestAnimationFrame(Te)):(N.style.background=ne,L.innerText="do_not_touch",L.style.animation="none",document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2,E.addEventListener("pointerdown",re,{passive:!1}),E.addEventListener("pointermove",_e,{passive:!1}),E.addEventListener("pointerup",le)))}async function Ce(e){if(P||u("handleMotion"),!(e instanceof DeviceMotionEvent))return;const n=Date.now();if(D>0&&n-D<ie)return;P||u("there is motion"),D=n;const o=e.accelerationIncludingGravity;if(o&&o.x!==null&&o.y!==null&&o.z!==null){P||(P=!0,Y(!0)),I=G*I+(1-G)*o.x,B=G*B+(1-G)*o.y,A=G*A+(1-G)*o.z;let a=Math.sqrt(I*I+B*B+A*A),f=Math.sqrt(I*I+B*B);if(S){let i=a-S.mag,p=I-S.x,T=B-S.y,h=A-S.z;S={mag:a,move:f,x:I,y:B,z:A,dmag:i,dx:p,dy:T,dz:h},H.push(S),H.length>Qe&&(x<=0&&(x=Date.now()),et()?requestAnimationFrame(()=>{Te(),N.style.background=fe,L.style.animation="none",L.innerText="check",new Promise(()=>setTimeout(()=>{re(),le()},ie*2))}):requestAnimationFrame(()=>{Te(),N.style.background=ne}))}else S={mag:a,move:f,x:I,y:B,z:A,dmag:0,dx:0,dy:0,dz:0}}else Y(!1)}function Te(){let e=document.getElementById("neoCaptcha-overlayBgFill"),n=ce/100*18;e.style.height=n+"rem",e.style.background=fe}function et(e=!1){let i=0,p=0,T=0,h=99,s=-99,r=0,de=0;function je(){i=0,p=0,T=0,h=99,s=-99}let he=0,pe=0,Q,rt=5e3/ie;H=H.slice(Math.max(0,H.length-rt),H.length);for(const m of H){if(pe++,!Q){Q=m;continue}Math.abs(m.move-Q.move)<2?de++:de=0;let Se=!1;if(Math.abs(m.x)>2&&de<5?(m.x<Q.x?(e&&u(pe,"<left","x:",m.x,"move:",m.move,"mag:",m.mag),i===1?Se=!0:p++,i=-1):(e&&u(pe,"right>","x:",m.x,"move:",m.move,"mag:",m.mag),i===-1?Se=!0:p++,i=1),r+=Math.max(m.x-1,m.move-2),T+=m.mag,h=Math.min(h,Math.sign(m.x)*m.move),s=Math.max(s,Math.sign(m.x)*m.move)):m.mag>9&&(e&&u(pe,"idle"),je(),he=0,r=Math.max(0,r-Math.max(2,de-2))),Se){let qe=2<=p&&p<=5,Xe=T/p,Ge=Math.abs(s-h);qe&&(r+=1),Xe>7&&(r+=1),Ge>4&&(r+=1),qe&&Xe>7&&Ge>4&&(he++,r+=10),je()}if(Q=m,he<1&&(r=Math.min(r,60)),r>=100)break}return r=Math.max(0,Math.min(100,r)),ce=r,he<1&&i===0&&(x=Date.now()),ce==100}function tt(){!P||D<=0?(u("beepIfNoMotion","motionEnabled:",P,"lastMotionTime:",D),Y(!1),setTimeout(()=>He(),xe-500)):u("no beep","motionEnabled:",P,"lastMotionTime:",D)}function He(){w||q?(N.style.background=fe,L.innerText="touch_app",L.style.animation="blinker 0.5s ease-in-out infinite",x=Date.now()):nt()}const $=new AudioContext,nt=()=>{$.state==="suspended"?$.resume().then(()=>Pe()):Pe()},Pe=()=>{Ee(285,.12),Ee(852,.12,.12),Ee(528,.12,.24),x=Date.now()};function Ee(e,n,o=0){let a=$.createOscillator(),f=$.createGain();a.type="sine",a.frequency.value=e,f.gain.value=.1,a.connect(f),f.connect($.destination),a.start($.currentTime+o),a.stop($.currentTime+o+n)}let F;function re(){if(b==0){let e;x<=0?e=0:e=Date.now()-x,F={action:"react",time:e}}}E.addEventListener("pointerdown",re,{passive:!1}),E.addEventListener("pointermove",_e,{passive:!1});function _e(){x<=0&&(F=void 0)}function le(){if(x<=0&&(F={action:"react",time:-1},x=1),!(F&&F.time===0)&&x>0&&b==0&&F){D>0&&window.removeEventListener("devicemotion",Ce),M.push(F),M.push({action:"start",time:Date.now()-be}),C=!0;const e=document.getElementById("neoCaptcha-image");if(e.src=ve,at(),!t)throw new Error("Canvas context could not be initialized.");if(t.clearRect(0,0,c.width,c.height),E.style.display="none",ee)for(let n=1;n<=4;n++)document.getElementById("neoCaptcha-guess-button-"+n).disabled=!1}}E.addEventListener("pointerup",le);function at(){b=Date.now(),We()}function We(){if(!v)throw new Error("Canvas context could not be initialized.");const e=Date.now()-b,n=Math.max(U-e,0),o=n/U*_.width;v.clearRect(0,0,_.width,_.height),v.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,v.fillRect(0,0,o,_.height),n>0&&C?requestAnimationFrame(We):n<=0&&C?(u("Time's up!"),Z=b+U,Be()):(v.fillStyle="rgba(255, 255, 255, 0.8)",v.fillRect(0,0,_.width,_.height))}function ke(e){if(z&&e.preventDefault(),b>0){const n=c.getBoundingClientRect();let{x:o,y:a}=Ie(e,n);M.push({action:"down",enabled:C,x:o,y:a,time:Date.now()-b}),C&&z&&(R=!0,Re(o,a))}}z?(c.style.touchAction="none",c.addEventListener("pointerdown",ke,{passive:!1})):(c.style.touchAction="auto",c.addEventListener("pointerdown",ke));function ot(e){z&&e.preventDefault();const n=c.getBoundingClientRect();let{x:o,y:a}=Ie(e,n);b>0&&M.push({action:"move",enabled:C,drawing:R,x:o,y:a,time:Date.now()-b}),C&&R&&Re(o,a)}c.addEventListener("pointermove",ot,{passive:!1});function Me(e){if(z&&e.preventDefault(),z&&!R)return;const n=c.getBoundingClientRect();let{x:o,y:a}=Ie(e,n);if(b>0&&M.push({action:"up",enabled:C,x:o,y:a,time:Date.now()-b}),b>=0&&C&&R){if(R=!1,M.push({action:"point",x:o/c.width,y:a/c.height,time:Date.now()-b}),X.disabled=!1,!t)throw new Error("Canvas context could not be initialized.");t.clearRect(0,0,c.width,c.height),t.beginPath(),t.arc(o,a,ye/2,0,Math.PI*2),t.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,t.fill()}}c.addEventListener("pointerup",Me),c.addEventListener("pointercancel",Me);function Re(e,n){if(!t)throw new Error("Canvas context could not be initialized.");t.clearRect(0,0,c.width,c.height),t.beginPath(),t.arc(e-1,n-1,we/2,0,Math.PI*2),t.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]}, 0.2)`,t.fill()}function Ie(e,n){let o,a;return e instanceof MouseEvent?(o=e.clientX-n.left,a=e.clientY-n.top):(o=e.changedTouches[0].clientX-n.left,a=e.changedTouches[0].clientY-n.top),{x:o,y:a}}for(let e=1;e<=4;e++)(Fe=document.getElementById("neoCaptcha-guess-button-"+e))==null||Fe.addEventListener("pointerdown",ke),(Oe=document.getElementById("neoCaptcha-guess-button-"+e))==null||Oe.addEventListener("pointerup",n=>{Me(n),it(e)});function it(e){let n=document.getElementById("neoCaptcha-guess-icon-"+e).src,o=n.split("/");n=o[o.length-1].split(".")[0],M.push({action:"guess",tag:n,time:Date.now()-b}),Be()}X==null||X.addEventListener("click",Be);async function Be(){if(!C)return;C=!1,X.disabled=!0;for(let s=1;s<=4;s++)document.getElementById("neoCaptcha-guess-button-"+s).disabled=!0;if(!t||!v)throw new Error("Canvas context could not be initialized.");t.fillStyle="rgba(255, 255, 255, 0.8)",t.fillRect(0,0,c.width,c.height),v.fillStyle="rgba(255, 255, 255, 0.8)",v.fillRect(0,0,_.width,_.height),Z===0&&(Z=Date.now());const e=Z-b;M.push({action:"end",time:e});const n={challenge:ae,hmac:oe,activity:M},o=await fetch(De+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let a=!1,f=!1;try{const s=await o.json();a=s.valid,f=s.retry,f&&(ae=s.challenge,oe=s.hmac)}catch{}t.lineJoin="round",t.lineCap="round";const i=c.width*.1;let p=c.width/2,T=c.height/2;const h=c.width/3;if(a){t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=i+20;let s=p+i/8,r=T+i/4;J(h,s,r),t.lineWidth=i+17,J(h,s,r),t.lineWidth=i+14,J(h,s,r),t.lineWidth=i+11,J(h,s,r),t.lineWidth=i+8,J(h,s,r),t.strokeStyle="rgba(0, 160, 0)",t.lineWidth=i,J(h,p,T)}else if(f){t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=i+20;let s=p+i/8,r=T+i/4;K(h,s,r),t.lineWidth=i+17,K(h,s,r),t.lineWidth=i+14,K(h,s,r),t.lineWidth=i+11,K(h,s,r),t.lineWidth=i+8,K(h,s,r),t.strokeStyle="rgba(0, 80, 255)",t.lineWidth=i,K(h,p,T)}else{t.strokeStyle="rgba(0, 0, 0, 0.02)",t.lineWidth=i+20;let s=p+i/8,r=T+i/4;V(h,s,r),t.lineWidth=i+17,V(h,s,r),t.lineWidth=i+14,V(h,s,r),t.lineWidth=i+11,V(h,s,r),t.lineWidth=i+8,V(h,s,r),t.strokeStyle="rgba(255, 0, 0)",t.lineWidth=i,V(h,p,T)}a&&O&&O.onSuccess?O.onSuccess():f?setTimeout(()=>{ct(),Ae()},500):O&&O.onFailure&&O.onFailure()}function J(e,n,o){if(!t)throw new Error("Canvas context could not be initialized.");const a=e/2;t.beginPath(),t.moveTo(n-a/2,o+a),t.lineTo(n-a-a/2,o),t.moveTo(n-a/2,o+a),t.lineTo(n+e-a/2,o-a),t.stroke()}function V(e,n,o){if(!t)throw new Error("Canvas context could not be initialized.");const a=e/2;t.beginPath(),t.moveTo(n-a,o-a),t.lineTo(n+a,o+a),t.moveTo(n+a,o-a),t.lineTo(n-a,o+a),t.stroke()}function K(e,n,o){if(!t)throw new Error("Canvas context could not be initialized.");const a=e/2;t.beginPath(),t.moveTo(n-a,o),t.lineTo(n-a+1,o),t.moveTo(n,o),t.lineTo(n+1,o),t.moveTo(n+a,o),t.lineTo(n+a+1,o),t.stroke()}function ct(){R=!1,M=[],b=0,Z=0,be=0,x=0,C=!1,X.disabled=!0,ve="",ye=0,we=0;const e=document.getElementById("neoCaptcha-wrapper");e.style.display="none",ue.style.display="block",v&&v.clearRect(0,0,_.width,_.height),(w||q)&&(Y(!0),!q&&P&&(D=0,I=0,B=0,A=0,S=void 0,H=[]))}function u(e,...n){Ne(" > ",e,n),console.log(e,n)}function st(e,...n){Ne("!!! ERROR: ",e,n),console.error(e,n)}function Ne(e,n,o){let a=document.getElementById("testLogs");if(a){let f=JSON.stringify(n)+" ";o&&(f+=o.map(p=>JSON.stringify(p)).join(" "));let i=a;i.value+=e+f+`
`,i.scrollTop=i.scrollHeight}}}return window.NeoCAPTCHA={render:Le},me.renderCaptcha=Le,Object.defineProperty(me,Symbol.toStringTag,{value:"Module"}),me}({});
