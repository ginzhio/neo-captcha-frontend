var NeoCAPTCHA=function(se){"use strict";const $e=`
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
`;function Oe(){if(document.getElementById("neo-captcha-style"))return;const k=document.createElement("style");k.id="neo-captcha-style",k.textContent=$e,document.head.appendChild(k)}function je(){if(document.getElementById("neo-captcha-material-icons"))return;const k=document.createElement("link");k.id="neo-captcha-material-icons",k.rel="stylesheet",k.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(k)}function Ee(k,r,O){var Pe,Re,Ne;je(),Oe(),k.innerHTML=`
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
    `;const _e="1.1.4",ke="https://neo-captcha.com/api/v1",le=(r==null?void 0:r.variant)||"ns",Q=le==="ns"||le==="ncs",qe=(Pe=window.matchMedia)==null?void 0:Pe.call(window,"(prefers-color-scheme: dark)").matches,ee=(r==null?void 0:r.theme)==="dark"||(r==null?void 0:r.theme)==="light"?r.theme:qe?"dark":"light";let g=(navigator.language||navigator.languages[0]).split("-")[0];g=(r==null?void 0:r.lang)||g;const Xe=(r==null?void 0:r.minDifficulty)||"easy",Fe=(r==null?void 0:r.showHowTo)||!1;let j=(r==null?void 0:r.expandHowTo)||!1;const q=(r==null?void 0:r.visualOnDesktop)||!1,T=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),E=document.getElementById("neoCaptcha-startOverlay"),X=document.getElementById("neoCaptcha-submit"),re=document.getElementById("neoCaptcha-start"),i=document.getElementById("neoCaptcha-captchaCanvas"),n=i.getContext("2d"),_=document.getElementById("neoCaptcha-timeCanvas"),v=_.getContext("2d");if(!n||!v)throw new Error("Canvas context could not be initialized.");let D;Q?(document.getElementById("neoCaptcha-submit").style.display="none",D=!1):(document.getElementById("neoCaptcha-guess").style.display="none",i.style.cursor="crosshair",i.style.touchAction="none",D=!0),document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${ee}`),document.getElementById("neoCaptchaWidgetLogo").src=ee==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png",Q?document.getElementById("neoCaptcha-modeIcon").src=ee==="dark"?"https://neo-captcha.com/assets/icon_see_shape_dark.png":"https://neo-captcha.com/assets/icon_see_shape.png":document.getElementById("neoCaptcha-modeIcon").src=ee==="dark"?"https://neo-captcha.com/assets/icon_find_corner_dark.png":"https://neo-captcha.com/assets/icon_find_corner.png";const V="#f406",Ie="#0f4a",l={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_desktop:"Click after the <b>sound cue!</b>",step_2_motion:"<b>Shake</b> your phone!",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_desktop:"Klicke beim <b>Signalton!</b>",step_2_motion:"<b>Schüttel</b> dein Handy!",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(l[g]||l.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(l[g]||l.en).step_1,T||q?(document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2):(document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2_desktop,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2_desktop),document.getElementById("neoCaptcha-step_3").innerHTML=(l[g]||l.en).step_3,Q?(document.getElementById("neoCaptcha-mode").innerHTML=(l[g]||l.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(l[g]||l.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(l[g]||l.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(l[g]||l.en).mode_1_text);let K=6e3,y=[255,0,0],P=!1,I=[],f=0,U=0,de=0,C=0,x=!1,pe="",he=0,me=0,te,ne,ge=0;const Me=50,Z=500/Me,F=.6;let H=0,M=0,B=0,A=0,S,ae=[],L=!1;if(Fe){const e=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText"),o=document.getElementById("neoCaptcha-howToIcon");a.style.display=j?"block":"none",o.innerText=j?"expand_less":"expand_more",e.addEventListener("click",()=>{j=!j,a.style.display=j?"block":"none",o.innerText=j?"expand_less":"expand_more"})}else{const e=document.getElementById("neoCaptcha-howToCaption"),a=document.getElementById("neoCaptcha-howToText");e.style.display="none",a.style.display="none"}const W=document.getElementById("neoCaptcha-overlayBg");T||q?W.style.background=V:W.style.background="#000";const z=document.getElementById("neoCaptcha-signalIcon");z.innerText=T||q?"do_not_touch":"hearing",re.addEventListener("click",Be);let R=T;function Be(){T&&window.DeviceMotionEvent?"requestPermission"in DeviceMotionEvent?DeviceMotionEvent.requestPermission().then(e=>{e==="granted"?(u("motion permission granted"),R=!0,window.addEventListener("devicemotion",ue)):(u("motion permission denied"),R=!1),oe()}).catch(e=>{u("motion permission error"),Ze(e),R=!1,oe()}):(u("motion allowed by default"),R=!0,window.addEventListener("devicemotion",ue),oe()):(u("no motion available"),R=!1,oe())}async function oe(){u("version: "+_e),u("userAgent: "+navigator.userAgent);const e=document.getElementById("neoCaptcha-wrapper");e.style.display="flex",re.style.display="none";const a={challenge:te,hmac:ne,userAgent:navigator.userAgent,mobile:T,version:_e,minDifficulty:Xe,variant:le},t=await(await fetch(ke+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(t.img){const d=document.getElementById("neoCaptcha-image");d.style.display="inline-block",E.style.display="flex",pe=`data:image/png;base64,${t.img}`,y=t.color,te=t.challenge,ne=t.hmac,K=t.totalTime||K,ge=t.suspense;const c=document.getElementById("neoCaptcha-container");if(c.style.height="20em",t.variant==="ns")for(let m=1;m<=4;m++)document.getElementById("neoCaptcha-guess-icon-"+m).src=`https://neo-captcha.com/assets/icon_shape_${t.icons[m-1]}.png`;if(i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,he=i.width*t.pointSize,me=i.width*t.thumbSize,!n||!v)throw new Error("Canvas context could not be initialized.");n.fillStyle="rgba(0, 0, 0)",n.fillRect(0,0,i.width,i.height),v.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,de=Date.now(),u("isMobile",T,"motionAllowed",R),T&&R?setTimeout(()=>Ge(),1e3):(u("beep timeout, no motion available"),setTimeout(()=>ze(),ge))}}function Se(e){L=e,T&&(L?(W.style.background=V,z.innerText="edgesensor_low",z.style.animation="shake 0.4s ease-in-out infinite",document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2_motion,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2_motion,E.removeEventListener("pointerdown",ie),E.removeEventListener("pointermove",be),E.removeEventListener("pointerup",ce)):(W.style.background=V,z.innerText="do_not_touch",z.style.animation="none",document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2,E.addEventListener("pointerdown",ie,{passive:!1}),E.addEventListener("pointermove",be,{passive:!1}),E.addEventListener("pointerup",ce)))}async function ue(e){if(L||u("handleMotion"),!(e instanceof DeviceMotionEvent))return;const a=Date.now();if(H>0&&a-H<Me)return;L||u("there is motion"),H=a;const o=e.accelerationIncludingGravity;if(o&&o.x!==null&&o.y!==null&&o.z!==null){L||Se(!0),M=F*M+(1-F)*o.x,B=F*B+(1-F)*o.y,A=F*A+(1-F)*o.z;let t=Math.sqrt(M*M+B*B+A*A),d=Math.sqrt(M*M+B*B);if(S){let c=t-S.mag,m=M-S.x,w=B-S.y,p=A-S.z;S={mag:t,move:d,x:M,y:B,z:A,dmag:c,dx:m,dy:w,dz:p},ae.push(S),ae.length>Z&&(C<=0&&(C=Date.now()),Le()&&(ie(),ce()))}else S={mag:t,move:d,x:M,y:B,z:A,dmag:0,dx:0,dy:0,dz:0}}}function Le(e=!1){let t=0,d=0,c=0,m=99,w=-99;function p(){t=0,d=0,c=0,m=99,w=-99}let s=0,h=0,xe;for(const b of ae){if(h++,h<Z){xe=b;continue}let Te=!1;if(Math.abs(b.x)>2?(b.x<xe.x?(e&&u(h-Z,"<left","x:",b.x,"move:",b.move,"mag:",b.mag),t===1?Te=!0:d++,t=-1):(e&&u(h-Z,"right>","x:",b.x,"move:",b.move,"mag:",b.mag),t===-1?Te=!0:d++,t=1),c+=b.mag,m=Math.min(m,Math.sign(b.x)*b.move),w=Math.max(w,Math.sign(b.x)*b.move)):b.mag>9&&(e&&u(h-Z,"idle"),p(),s=0),Te){let Qe=2<=d&&d<=5,et=c/d,tt=Math.abs(w-m);Qe&&et>7&&tt>7&&s++,p()}if(xe=b,s>=2)break}return s>=1?W.style.background=Ie:t===0&&(W.style.background=V,C=Date.now()),s>=2}function Ge(){!L||H<=0?(u("beep timeout, regular","motionEnabled:",L,"lastMotionTime:",H),setTimeout(()=>ze(),ge)):u("no beep","motionEnabled:",L,"lastMotionTime:",H)}function ze(){T||q?(W.style.background=Ie,z.innerText="touch_app",z.style.animation="blinker 0.5s ease-in-out infinite",C=Date.now()):Ye()}const N=new AudioContext,Ye=()=>{N.state==="suspended"?N.resume().then(()=>De()):De()},De=()=>{fe(285,.12),fe(852,.12,.12),fe(528,.12,.24),C=Date.now()};function fe(e,a,o=0){let t=N.createOscillator(),d=N.createGain();t.type="sine",t.frequency.value=e,d.gain.value=.1,t.connect(d),d.connect(N.destination),t.start(N.currentTime+o),t.stop(N.currentTime+o+a)}let $;function ie(){if(f==0){let e;C<=0?e=0:e=Date.now()-C,$={action:"react",time:e}}}E.addEventListener("pointerdown",ie,{passive:!1}),E.addEventListener("pointermove",be,{passive:!1});function be(){C<=0&&($=void 0)}function ce(){if(C<=0&&($={action:"react",time:-1},C=1),!($&&$.time===0)&&C>0&&f==0&&$){H>0&&(window.removeEventListener("devicemotion",ue),Le(!0)),I.push($),I.push({action:"start",time:Date.now()-de}),x=!0;const e=document.getElementById("neoCaptcha-image");if(e.src=pe,Je(),!n)throw new Error("Canvas context could not be initialized.");if(n.clearRect(0,0,i.width,i.height),E.style.display="none",Q)for(let a=1;a<=4;a++)document.getElementById("neoCaptcha-guess-button-"+a).disabled=!1}}E.addEventListener("pointerup",ce);function Je(){f=Date.now(),He()}function He(){if(!v)throw new Error("Canvas context could not be initialized.");const e=Date.now()-f,a=Math.max(K-e,0),o=a/K*_.width;v.clearRect(0,0,_.width,_.height),v.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,v.fillRect(0,0,o,_.height),a>0&&x?requestAnimationFrame(He):a<=0&&x?(u("Time's up!"),U=f+K,Ce()):(v.fillStyle="rgba(255, 255, 255, 0.8)",v.fillRect(0,0,_.width,_.height))}function ve(e){if(D&&e.preventDefault(),f>0){const a=i.getBoundingClientRect();let{x:o,y:t}=we(e,a);I.push({action:"down",enabled:x,x:o,y:t,time:Date.now()-f}),x&&D&&(P=!0,Ae(o,t))}}D?(i.style.touchAction="none",i.addEventListener("pointerdown",ve,{passive:!1})):(i.style.touchAction="auto",i.addEventListener("pointerdown",ve));function Ve(e){D&&e.preventDefault();const a=i.getBoundingClientRect();let{x:o,y:t}=we(e,a);f>0&&I.push({action:"move",enabled:x,drawing:P,x:o,y:t,time:Date.now()-f}),x&&P&&Ae(o,t)}i.addEventListener("pointermove",Ve,{passive:!1});function ye(e){if(D&&e.preventDefault(),D&&!P)return;const a=i.getBoundingClientRect();let{x:o,y:t}=we(e,a);if(f>0&&I.push({action:"up",enabled:x,x:o,y:t,time:Date.now()-f}),f>=0&&x&&P){if(P=!1,I.push({action:"point",x:o/i.width,y:t/i.height,time:Date.now()-f}),X.disabled=!1,!n)throw new Error("Canvas context could not be initialized.");n.clearRect(0,0,i.width,i.height),n.beginPath(),n.arc(o,t,he/2,0,Math.PI*2),n.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]})`,n.fill()}}i.addEventListener("pointerup",ye),i.addEventListener("pointercancel",ye);function Ae(e,a){if(!n)throw new Error("Canvas context could not be initialized.");n.clearRect(0,0,i.width,i.height),n.beginPath(),n.arc(e-1,a-1,me/2,0,Math.PI*2),n.fillStyle=`rgba(${y[0]}, ${y[1]}, ${y[2]}, 0.2)`,n.fill()}function we(e,a){let o,t;return e instanceof MouseEvent?(o=e.clientX-a.left,t=e.clientY-a.top):(o=e.changedTouches[0].clientX-a.left,t=e.changedTouches[0].clientY-a.top),{x:o,y:t}}for(let e=1;e<=4;e++)(Re=document.getElementById("neoCaptcha-guess-button-"+e))==null||Re.addEventListener("pointerdown",ve),(Ne=document.getElementById("neoCaptcha-guess-button-"+e))==null||Ne.addEventListener("pointerup",a=>{ye(a),Ke(e)});function Ke(e){let a=document.getElementById("neoCaptcha-guess-icon-"+e).src,o=a.split("/");a=o[o.length-1].split(".")[0],I.push({action:"guess",tag:a,time:Date.now()-f}),Ce()}X==null||X.addEventListener("click",Ce);async function Ce(){if(!x)return;x=!1,X.disabled=!0;for(let s=1;s<=4;s++)document.getElementById("neoCaptcha-guess-button-"+s).disabled=!0;if(!n||!v)throw new Error("Canvas context could not be initialized.");n.fillStyle="rgba(255, 255, 255, 0.8)",n.fillRect(0,0,i.width,i.height),v.fillStyle="rgba(255, 255, 255, 0.8)",v.fillRect(0,0,_.width,_.height),U===0&&(U=Date.now());const e=U-f;I.push({action:"end",time:e});const a={challenge:te,hmac:ne,activity:I},o=await fetch(ke+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});let t=!1,d=!1;try{const s=await o.json();t=s.valid,d=s.retry,d&&(te=s.challenge,ne=s.hmac)}catch{}n.lineJoin="round",n.lineCap="round";const c=i.width*.1;let m=i.width/2,w=i.height/2;const p=i.width/3;if(t){n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=c+20;let s=m+c/8,h=w+c/4;G(p,s,h),n.lineWidth=c+17,G(p,s,h),n.lineWidth=c+14,G(p,s,h),n.lineWidth=c+11,G(p,s,h),n.lineWidth=c+8,G(p,s,h),n.strokeStyle="rgba(0, 160, 0)",n.lineWidth=c,G(p,m,w)}else if(d){n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=c+20;let s=m+c/8,h=w+c/4;J(p,s,h),n.lineWidth=c+17,J(p,s,h),n.lineWidth=c+14,J(p,s,h),n.lineWidth=c+11,J(p,s,h),n.lineWidth=c+8,J(p,s,h),n.strokeStyle="rgba(0, 80, 255)",n.lineWidth=c,J(p,m,w)}else{n.strokeStyle="rgba(0, 0, 0, 0.02)",n.lineWidth=c+20;let s=m+c/8,h=w+c/4;Y(p,s,h),n.lineWidth=c+17,Y(p,s,h),n.lineWidth=c+14,Y(p,s,h),n.lineWidth=c+11,Y(p,s,h),n.lineWidth=c+8,Y(p,s,h),n.strokeStyle="rgba(255, 0, 0)",n.lineWidth=c,Y(p,m,w)}t&&O&&O.onSuccess?O.onSuccess():d?setTimeout(()=>{Ue(),Be()},500):O&&O.onFailure&&O.onFailure()}function G(e,a,o){if(!n)throw new Error("Canvas context could not be initialized.");const t=e/2;n.beginPath(),n.moveTo(a-t/2,o+t),n.lineTo(a-t-t/2,o),n.moveTo(a-t/2,o+t),n.lineTo(a+e-t/2,o-t),n.stroke()}function Y(e,a,o){if(!n)throw new Error("Canvas context could not be initialized.");const t=e/2;n.beginPath(),n.moveTo(a-t,o-t),n.lineTo(a+t,o+t),n.moveTo(a+t,o-t),n.lineTo(a-t,o+t),n.stroke()}function J(e,a,o){if(!n)throw new Error("Canvas context could not be initialized.");const t=e/2;n.beginPath(),n.moveTo(a-t,o),n.lineTo(a-t+1,o),n.moveTo(a,o),n.lineTo(a+1,o),n.moveTo(a+t,o),n.lineTo(a+t+1,o),n.stroke()}function Ue(){P=!1,I=[],f=0,U=0,de=0,C=0,x=!1,X.disabled=!0,pe="",he=0,me=0;const e=document.getElementById("neoCaptcha-wrapper");e.style.display="none",re.style.display="block",v&&v.clearRect(0,0,_.width,_.height),(T||q)&&(!q&&L?(H=0,M=0,B=0,A=0,S=void 0,ae=[],Se(!0)):(W.style.background=V,z.innerText="do_not_touch",z.style.animation="none"))}function u(e,...a){We(" > ",e,a),console.log(e,a)}function Ze(e,...a){We(`
!!! ERROR: `,e,[].concat(a).concat(`
`)),console.error(e,a)}function We(e,a,o){let t=document.getElementById("testLogs");if(t){let d=JSON.stringify(a)+" ";o&&(d+=o.map(m=>JSON.stringify(m)).join(" "));let c=t;c.value+=e+d+`
`,c.scrollTop=c.scrollHeight}}}return window.NeoCAPTCHA={render:Ee},se.renderCaptcha=Ee,Object.defineProperty(se,Symbol.toStringTag,{value:"Module"}),se}({});
