var NeoCAPTCHA=function(Y){"use strict";const we=`
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

.neo-captcha-how-to-text {
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
    padding: 0 1em 1em 1em;
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
`;function ye(){if(document.getElementById("neo-captcha-style"))return;const C=document.createElement("style");C.id="neo-captcha-style",C.textContent=we,document.head.appendChild(C)}function Ce(){if(document.getElementById("neo-captcha-material-icons"))return;const C=document.createElement("link");C.id="neo-captcha-material-icons",C.rel="stylesheet",C.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(C)}function ne(C,d,B){var ge,ue,be,fe,ve;Ce(),ye(),C.innerHTML=`
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
    </div>
    `;const oe="1.0.4",ce="https://neo-captcha.com/api/v1",V=(d==null?void 0:d.variant)||"ns",$=V==="ns"||V==="ncs",Te=(ge=window.matchMedia)==null?void 0:ge.call(window,"(prefers-color-scheme: dark)").matches,N=(d==null?void 0:d.theme)==="dark"||(d==null?void 0:d.theme)==="light"?d.theme:Te?"dark":"light";let f=(navigator.language||navigator.languages[0]).split("-")[0];f=(d==null?void 0:d.lang)||f;const xe=(d==null?void 0:d.minDifficulty)||"easy",Ee=(d==null?void 0:d.showHowTo)||!1;let S=(d==null?void 0:d.expandHowTo)||!1;const x=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),E=document.getElementById("neoCaptcha-startOverlay"),L=document.getElementById("neoCaptcha-submit"),X=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),e=c.getContext("2d"),v=document.getElementById("neoCaptcha-timeCanvas"),m=v.getContext("2d");if(!e||!m)throw new Error("Canvas context could not be initialized.");let _;$?(document.getElementById("neoCaptcha-submit").style.display="none",c.style.cursor="auto",_=!1):(document.getElementById("neoCaptcha-guess").style.display="none",_=!0),document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${N}`),document.getElementById("neoCaptchaWidgetLogo").src=N==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png",$?document.getElementById("neoCaptcha-modeIcon").src=N==="dark"?"https://neo-captcha.com/assets/icon_see_shape_dark.png":"https://neo-captcha.com/assets/icon_see_shape.png":document.getElementById("neoCaptcha-modeIcon").src=N==="dark"?"https://neo-captcha.com/assets/icon_find_corner_dark.png":"https://neo-captcha.com/assets/icon_find_corner.png";const ie="#f406",_e="#0f4a",r={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_s:"Click when you <b>hear a signal!</b>",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_s:"Klicke beim <b>Signalton</b>",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(r[f]||r.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(r[f]||r.en).step_1,x?document.getElementById("neoCaptcha-step_2").innerHTML=(r[f]||r.en).step_2:document.getElementById("neoCaptcha-step_2").innerHTML=(r[f]||r.en).step_2_s,document.getElementById("neoCaptcha-step_3").innerHTML=(r[f]||r.en).step_3,$?(document.getElementById("neoCaptcha-mode").innerHTML=(r[f]||r.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(r[f]||r.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(r[f]||r.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(r[f]||r.en).mode_1_text);let H=6e3,g=[255,0,0],k=!1,u=[],p=0,A=0,q=0,w=0,b=!1,z=!1,J="",K=0,U=0,j,O;if(Ee){const a=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText"),o=document.getElementById("neoCaptcha-howToIcon");n.style.display=S?"block":"none",o.innerText=S?"expand_less":"expand_more",a.addEventListener("click",()=>{S=!S,n.style.display=S?"block":"none",o.innerText=S?"expand_less":"expand_more"})}else{const a=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText");a.style.display="none",n.style.display="none"}const F=document.getElementById("neoCaptcha-overlayBg");x?F.style.background=ie:F.style.background="#000";const Q=document.getElementById("neoCaptcha-signalIcon");Q.innerText=x?"do_not_touch":"hearing",X.addEventListener("click",se);async function se(){console.log("version: "+oe),console.log("userAgent: "+navigator.userAgent);const a=document.getElementById("neoCaptcha-wrapper");a.style.display="flex",X.style.display="none";const n={challenge:j,hmac:O,userAgent:navigator.userAgent,mobile:x,version:oe,minDifficulty:xe,variant:V},t=await(await fetch(ce+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const T=document.getElementById("neoCaptcha-image");T.style.display="inline-block",E.style.display="flex",J=`data:image/png;base64,${t.img}`,g=t.color,j=t.challenge,O=t.hmac,H=t.totalTime||H;const s=document.getElementById("neoCaptcha-container");if(s.style.height="20em",t.variant==="ns")for(let y=1;y<=4;y++)document.getElementById("neoCaptcha-guess-icon-"+y).src=`https://neo-captcha.com/assets/icon_shape_${t.icons[y-1]}.png`;if(c.style.width="20em",c.style.height="20em",c.width=c.clientWidth,c.height=c.width,K=c.width*t.pointSize,U=c.width*t.thumbSize,!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,c.width,c.height),m.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,q=Date.now(),setTimeout(()=>ke(),t.suspense)}}function ke(){x?(F.style.background=_e,Q.innerText="touch_app",w>0?u.push({action:"react",time:w-Date.now()}):w=Date.now()):Ie()}const I=new AudioContext,Ie=()=>{I.state==="suspended"?I.resume().then(()=>de()):de()},de=()=>{Z(285,.12),Z(852,.12,.12),Z(528,.12,.24),w>0?u.push({action:"react",time:w-Date.now()}):w=Date.now()};function Z(a,n,o=0){let t=I.createOscillator(),T=I.createGain();t.type="sine",t.frequency.value=a,T.gain.value=.1,t.connect(T),T.connect(I.destination),t.start(I.currentTime+o),t.stop(I.currentTime+o+n)}function re(){if(p==0&&(w>0?u.push({action:"react",time:Date.now()-w}):w=Date.now(),$))for(let a=1;a<=4;a++)document.getElementById("neoCaptcha-guess-button-"+a).disabled=!1}E.addEventListener("mousedown",re),E.addEventListener("touchstart",re,{passive:!1}),E.addEventListener("touchmove",()=>{},{passive:!1});function ee(){if(w>0&&p==0){u.push({action:"start",time:Date.now()-q}),b=!0;const a=document.getElementById("neoCaptcha-image");if(a.src=J,Be(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),E.style.display="none",x&&(z=!0)}}E.addEventListener("mouseup",ee),E.addEventListener("touchend",ee),E.addEventListener("touchcancel",ee);function Be(){p=Date.now(),le()}function le(){if(!m)throw new Error("Canvas context could not be initialized.");const a=Date.now()-p,n=Math.max(H-a,0),o=n/H*v.width;m.clearRect(0,0,v.width,v.height),m.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,m.fillRect(0,0,o,v.height),n>0&&b?requestAnimationFrame(le):n<=0&&b?(console.log("Time's up!"),A=p+H,ae()):(m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,v.width,v.height))}function G(a){if(_&&a.preventDefault(),!z&&p>0){const n=c.getBoundingClientRect();let{x:o,y:t}=te(a,n);u.push({action:"down",enabled:b,x:o,y:t,time:Date.now()-p}),b&&_&&(k=!0,pe(o,t))}}_&&(c.addEventListener("mousedown",G),c.addEventListener("touchstart",G,{passive:!1}));function he(a){if(_&&a.preventDefault(),z)return;const n=c.getBoundingClientRect();let{x:o,y:t}=te(a,n);p>0&&u.push({action:"move",enabled:b,drawing:k,x:o,y:t,time:Date.now()-p}),b&&k&&pe(o,t)}c.addEventListener("mousemove",he),c.addEventListener("touchmove",he,{passive:!1});function R(a){if(_&&a.preventDefault(),z){z=!1;return}if(_&&!k)return;const n=c.getBoundingClientRect();let{x:o,y:t}=te(a,n);if(p>0&&u.push({action:"up",enabled:b,x:o,y:t,time:Date.now()-p}),p>=0&&b&&k){if(k=!1,u.push({action:"point",x:o/c.width,y:t/c.height,time:Date.now()-p}),L.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(o,t,K/2,0,Math.PI*2),e.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]})`,e.fill()}}c.addEventListener("mouseup",R),c.addEventListener("touchend",R),c.addEventListener("touchcancel",R);function pe(a,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(a-1,n-1,U/2,0,Math.PI*2),e.fillStyle=`rgba(${g[0]}, ${g[1]}, ${g[2]}, 0.2)`,e.fill()}function te(a,n){let o,t;return a instanceof MouseEvent?(o=a.clientX-n.left,t=a.clientY-n.top):(o=a.changedTouches[0].clientX-n.left,t=a.changedTouches[0].clientY-n.top),{x:o,y:t}}for(let a=1;a<=4;a++)x?((ue=document.getElementById("neoCaptcha-guess-button-"+a))==null||ue.addEventListener("touchstart",G),(be=document.getElementById("neoCaptcha-guess-button-"+a))==null||be.addEventListener("touchend",n=>{R(n),me(a)})):((fe=document.getElementById("neoCaptcha-guess-button-"+a))==null||fe.addEventListener("mousedown",G),(ve=document.getElementById("neoCaptcha-guess-button-"+a))==null||ve.addEventListener("mouseup",n=>{R(n),me(a)}));function me(a){let n=document.getElementById("neoCaptcha-guess-icon-"+a).src,o=n.split("/");n=o[o.length-1].split(".")[0],u.push({action:"guess",tag:n,time:Date.now()-p}),ae()}L==null||L.addEventListener("click",ae);async function ae(){if(!b)return;b=!1,L.disabled=!0;for(let i=1;i<=4;i++)document.getElementById("neoCaptcha-guess-button-"+i).disabled=!0;if(!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,c.width,c.height),m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,v.width,v.height),A===0&&(A=Date.now());const a=A-p;u.push({action:"end",time:a});const n={challenge:j,hmac:O,activity:u},o=await fetch(ce+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let t=!1,T=!1;try{const i=await o.json();t=i.valid,T=i.retry,T&&(j=i.challenge,O=i.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const s=c.width*.1;let y=c.width/2,P=c.height/2;const l=c.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let i=y+s/8,h=P+s/4;D(l,i,h),e.lineWidth=s+17,D(l,i,h),e.lineWidth=s+14,D(l,i,h),e.lineWidth=s+11,D(l,i,h),e.lineWidth=s+8,D(l,i,h),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=s,D(l,y,P)}else if(T){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let i=y+s/8,h=P+s/4;M(l,i,h),e.lineWidth=s+17,M(l,i,h),e.lineWidth=s+14,M(l,i,h),e.lineWidth=s+11,M(l,i,h),e.lineWidth=s+8,M(l,i,h),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=s,M(l,y,P)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let i=y+s/8,h=P+s/4;W(l,i,h),e.lineWidth=s+17,W(l,i,h),e.lineWidth=s+14,W(l,i,h),e.lineWidth=s+11,W(l,i,h),e.lineWidth=s+8,W(l,i,h),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=s,W(l,y,P)}t&&B&&B.onSuccess?B.onSuccess():T?setTimeout(()=>{Se(),se()},500):B&&B.onFailure&&B.onFailure()}function D(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t/2,o+t),e.lineTo(n-t-t/2,o),e.moveTo(n-t/2,o+t),e.lineTo(n+a-t/2,o-t),e.stroke()}function W(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t,o-t),e.lineTo(n+t,o+t),e.moveTo(n+t,o-t),e.lineTo(n-t,o+t),e.stroke()}function M(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t,o),e.lineTo(n-t+1,o),e.moveTo(n,o),e.lineTo(n+1,o),e.moveTo(n+t,o),e.lineTo(n+t+1,o),e.stroke()}function Se(){k=!1,u=[],p=0,A=0,q=0,w=0,b=!1,L.disabled=!0,z=!1,J="",K=0,U=0;const a=document.getElementById("neoCaptcha-wrapper");a.style.display="none",X.style.display="block",m&&m.clearRect(0,0,v.width,v.height),x&&(F.style.background=ie,Q.innerText="do_not_touch")}}return window.NeoCAPTCHA={render:ne},Y.renderCaptcha=ne,Object.defineProperty(Y,Symbol.toStringTag,{value:"Module"}),Y}({});
