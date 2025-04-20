var NeoCAPTCHA=function(X){"use strict";const Ce=`
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
`;function xe(){if(document.getElementById("neo-captcha-style"))return;const C=document.createElement("style");C.id="neo-captcha-style",C.textContent=Ce,document.head.appendChild(C)}function Te(){if(document.getElementById("neo-captcha-material-icons"))return;const C=document.createElement("link");C.id="neo-captcha-material-icons",C.rel="stylesheet",C.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(C)}function ie(C,d,B){var be,fe,ve,ye,we;Te(),xe(),C.innerHTML=`
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
    `;const ce="1.1.2",se="https://neo-captcha.com/api/v1",q=(d==null?void 0:d.variant)||"ns",O=q==="ns"||q==="ncs",Ee=(be=window.matchMedia)==null?void 0:be.call(window,"(prefers-color-scheme: dark)").matches,j=(d==null?void 0:d.theme)==="dark"||(d==null?void 0:d.theme)==="light"?d.theme:Ee?"dark":"light";let g=(navigator.language||navigator.languages[0]).split("-")[0];g=(d==null?void 0:d.lang)||g;const _e=(d==null?void 0:d.minDifficulty)||"easy",ke=(d==null?void 0:d.showHowTo)||!1;let S=(d==null?void 0:d.expandHowTo)||!1;const P=(d==null?void 0:d.visualOnDesktop)||!1,T=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),E=document.getElementById("neoCaptcha-startOverlay"),L=document.getElementById("neoCaptcha-submit"),J=document.getElementById("neoCaptcha-start"),i=document.getElementById("neoCaptcha-captchaCanvas"),e=i.getContext("2d"),v=document.getElementById("neoCaptcha-timeCanvas"),m=v.getContext("2d");if(!e||!m)throw new Error("Canvas context could not be initialized.");let _;O?(document.getElementById("neoCaptcha-submit").style.display="none",_=!1):(document.getElementById("neoCaptcha-guess").style.display="none",i.style.cursor="crosshair",i.style.touchAction="none",_=!0),document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${j}`),document.getElementById("neoCaptchaWidgetLogo").src=j==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png",O?document.getElementById("neoCaptcha-modeIcon").src=j==="dark"?"https://neo-captcha.com/assets/icon_see_shape_dark.png":"https://neo-captcha.com/assets/icon_see_shape.png":document.getElementById("neoCaptcha-modeIcon").src=j==="dark"?"https://neo-captcha.com/assets/icon_find_corner_dark.png":"https://neo-captcha.com/assets/icon_find_corner.png";const de="#f406",Ie="#0f4a",l={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_s:"Click at the <b>signal tone!</b>",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_s:"Klicke beim <b>Signalton!</b>",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(l[g]||l.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(l[g]||l.en).step_1,T||P?(document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2):(document.getElementById("neoCaptcha-step_2").innerHTML=(l[g]||l.en).step_2_s,document.getElementById("neoCaptcha-signalText").innerHTML=(l[g]||l.en).step_2_s),document.getElementById("neoCaptcha-step_3").innerHTML=(l[g]||l.en).step_3,O?(document.getElementById("neoCaptcha-mode").innerHTML=(l[g]||l.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(l[g]||l.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(l[g]||l.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(l[g]||l.en).mode_1_text);let A=6e3,u=[255,0,0],k=!1,b=[],p=0,R=0,K=0,y=0,f=!1,z=!1,U=!1,Q="",Z=0,ee=0,F,G;if(ke){const a=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText"),o=document.getElementById("neoCaptcha-howToIcon");n.style.display=S?"block":"none",o.innerText=S?"expand_less":"expand_more",a.addEventListener("click",()=>{S=!S,n.style.display=S?"block":"none",o.innerText=S?"expand_less":"expand_more"})}else{const a=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText");a.style.display="none",n.style.display="none"}const Y=document.getElementById("neoCaptcha-overlayBg");T||P?Y.style.background=de:Y.style.background="#000";const $=document.getElementById("neoCaptcha-signalIcon");$.innerText=T||P?"do_not_touch":"hearing",J.addEventListener("click",le);async function le(){console.log("version: "+ce),console.log("userAgent: "+navigator.userAgent);const a=document.getElementById("neoCaptcha-wrapper");a.style.display="flex",J.style.display="none";const n={challenge:F,hmac:G,userAgent:navigator.userAgent,mobile:T,version:ce,minDifficulty:_e,variant:q},t=await(await fetch(se+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const x=document.getElementById("neoCaptcha-image");x.style.display="inline-block",E.style.display="flex",Q=`data:image/png;base64,${t.img}`,u=t.color,F=t.challenge,G=t.hmac,A=t.totalTime||A;const s=document.getElementById("neoCaptcha-container");if(s.style.height="20em",t.variant==="ns")for(let w=1;w<=4;w++)document.getElementById("neoCaptcha-guess-icon-"+w).src=`https://neo-captcha.com/assets/icon_shape_${t.icons[w-1]}.png`;if(i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,Z=i.width*t.pointSize,ee=i.width*t.thumbSize,!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),m.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,K=Date.now(),setTimeout(()=>Be(),t.suspense)}}function Be(){T||P?(Y.style.background=Ie,$.innerText="touch_app",$.style.animation="blinker 0.5s ease-in-out infinite",y>0?b.push({action:"react",time:y-Date.now()}):y=Date.now()):Se()}const I=new AudioContext,Se=()=>{I.state==="suspended"?I.resume().then(()=>re()):re()},re=()=>{te(285,.12),te(852,.12,.12),te(528,.12,.24),y>0?b.push({action:"react",time:y-Date.now()}):y=Date.now()};function te(a,n,o=0){let t=I.createOscillator(),x=I.createGain();t.type="sine",t.frequency.value=a,x.gain.value=.1,t.connect(x),x.connect(I.destination),t.start(I.currentTime+o),t.stop(I.currentTime+o+n)}function he(){if(p==0&&(y>0?b.push({action:"react",time:Date.now()-y}):y=Date.now(),O))for(let a=1;a<=4;a++)document.getElementById("neoCaptcha-guess-button-"+a).disabled=!1}E.addEventListener("mousedown",he),E.addEventListener("touchstart",he,{passive:!1}),E.addEventListener("touchmove",()=>{U=!0},{passive:!1});function ae(){if(y>0&&p==0){b.push({action:"start",time:Date.now()-K}),f=!0;const a=document.getElementById("neoCaptcha-image");if(a.src=Q,Le(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),E.style.display="none",!U&&T&&(z=!0),U=!1}}E.addEventListener("mouseup",ae),E.addEventListener("touchend",ae),E.addEventListener("touchcancel",ae);function Le(){p=Date.now(),pe()}function pe(){if(!m)throw new Error("Canvas context could not be initialized.");const a=Date.now()-p,n=Math.max(A-a,0),o=n/A*v.width;m.clearRect(0,0,v.width,v.height),m.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,m.fillRect(0,0,o,v.height),n>0&&f?requestAnimationFrame(pe):n<=0&&f?(console.log("Time's up!"),R=p+A,oe()):(m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,v.width,v.height))}function V(a){if(_&&a.preventDefault(),!z&&p>0){const n=i.getBoundingClientRect();let{x:o,y:t}=ne(a,n);b.push({action:"down",enabled:f,x:o,y:t,time:Date.now()-p}),f&&_&&(k=!0,ge(o,t))}}_&&(i.addEventListener("mousedown",V),i.addEventListener("touchstart",V,{passive:!1}));function me(a){if(_&&a.preventDefault(),z)return;const n=i.getBoundingClientRect();let{x:o,y:t}=ne(a,n);p>0&&b.push({action:"move",enabled:f,drawing:k,x:o,y:t,time:Date.now()-p}),f&&k&&ge(o,t)}i.addEventListener("mousemove",me),i.addEventListener("touchmove",me,{passive:!1});function N(a){if(_&&a.preventDefault(),z){z=!1;return}if(_&&!k)return;const n=i.getBoundingClientRect();let{x:o,y:t}=ne(a,n);if(p>0&&b.push({action:"up",enabled:f,x:o,y:t,time:Date.now()-p}),p>=0&&f&&k){if(k=!1,b.push({action:"point",x:o/i.width,y:t/i.height,time:Date.now()-p}),L.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(o,t,Z/2,0,Math.PI*2),e.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,e.fill()}}i.addEventListener("mouseup",N),i.addEventListener("touchend",N),i.addEventListener("touchcancel",N);function ge(a,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(a-1,n-1,ee/2,0,Math.PI*2),e.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]}, 0.2)`,e.fill()}function ne(a,n){let o,t;return a instanceof MouseEvent?(o=a.clientX-n.left,t=a.clientY-n.top):(o=a.changedTouches[0].clientX-n.left,t=a.changedTouches[0].clientY-n.top),{x:o,y:t}}for(let a=1;a<=4;a++)T?((fe=document.getElementById("neoCaptcha-guess-button-"+a))==null||fe.addEventListener("touchstart",V),(ve=document.getElementById("neoCaptcha-guess-button-"+a))==null||ve.addEventListener("touchend",n=>{N(n),ue(a)})):((ye=document.getElementById("neoCaptcha-guess-button-"+a))==null||ye.addEventListener("mousedown",V),(we=document.getElementById("neoCaptcha-guess-button-"+a))==null||we.addEventListener("mouseup",n=>{N(n),ue(a)}));function ue(a){let n=document.getElementById("neoCaptcha-guess-icon-"+a).src,o=n.split("/");n=o[o.length-1].split(".")[0],b.push({action:"guess",tag:n,time:Date.now()-p}),oe()}L==null||L.addEventListener("click",oe);async function oe(){if(!f)return;f=!1,L.disabled=!0;for(let c=1;c<=4;c++)document.getElementById("neoCaptcha-guess-button-"+c).disabled=!0;if(!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,v.width,v.height),R===0&&(R=Date.now());const a=R-p;b.push({action:"end",time:a});const n={challenge:F,hmac:G,activity:b},o=await fetch(se+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let t=!1,x=!1;try{const c=await o.json();t=c.valid,x=c.retry,x&&(F=c.challenge,G=c.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const s=i.width*.1;let w=i.width/2,H=i.height/2;const r=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let c=w+s/8,h=H+s/4;D(r,c,h),e.lineWidth=s+17,D(r,c,h),e.lineWidth=s+14,D(r,c,h),e.lineWidth=s+11,D(r,c,h),e.lineWidth=s+8,D(r,c,h),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=s,D(r,w,H)}else if(x){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let c=w+s/8,h=H+s/4;W(r,c,h),e.lineWidth=s+17,W(r,c,h),e.lineWidth=s+14,W(r,c,h),e.lineWidth=s+11,W(r,c,h),e.lineWidth=s+8,W(r,c,h),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=s,W(r,w,H)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let c=w+s/8,h=H+s/4;M(r,c,h),e.lineWidth=s+17,M(r,c,h),e.lineWidth=s+14,M(r,c,h),e.lineWidth=s+11,M(r,c,h),e.lineWidth=s+8,M(r,c,h),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=s,M(r,w,H)}t&&B&&B.onSuccess?B.onSuccess():x?setTimeout(()=>{ze(),le()},500):B&&B.onFailure&&B.onFailure()}function D(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t/2,o+t),e.lineTo(n-t-t/2,o),e.moveTo(n-t/2,o+t),e.lineTo(n+a-t/2,o-t),e.stroke()}function M(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t,o-t),e.lineTo(n+t,o+t),e.moveTo(n+t,o-t),e.lineTo(n-t,o+t),e.stroke()}function W(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t,o),e.lineTo(n-t+1,o),e.moveTo(n,o),e.lineTo(n+1,o),e.moveTo(n+t,o),e.lineTo(n+t+1,o),e.stroke()}function ze(){k=!1,b=[],p=0,R=0,K=0,y=0,f=!1,L.disabled=!0,z=!1,Q="",Z=0,ee=0;const a=document.getElementById("neoCaptcha-wrapper");a.style.display="none",J.style.display="block",m&&m.clearRect(0,0,v.width,v.height),(T||P)&&(Y.style.background=de,$.innerText="do_not_touch"),$.style.animation="none"}}return window.NeoCAPTCHA={render:ie},X.renderCaptcha=ie,Object.defineProperty(X,Symbol.toStringTag,{value:"Module"}),X}({});
