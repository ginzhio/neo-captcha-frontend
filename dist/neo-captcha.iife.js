var NeoCAPTCHA=function(O){"use strict";const ge=`
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
}

.neo-captcha-logo {
    margin: 0 1em 0 0;
    width: 3.5em;
    height: 3.5em;
    cursor: pointer;
}

.neo-captcha-caption {
    font-size: 1.8em;
    font-weight: bold;
    color: var(--neo-captcha-fg);
    margin: 0 0 0.2em 0;
}

.neo-captcha-main-canvas {
    width: 20em;
    height: 20em;
    border: 1px solid var(--neo-captcha-fg);
    cursor: crosshair;
    z-index: 2;
    position: absolute;
    touch-action: none;
}

.neo-captcha-time {
    width: 20em;
    height: 1em;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
}

.neo-captcha-image {
    width: 20em;
    height: 20em;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 1;
    position: absolute;
    display: none;
}

.neo-captcha-container {
    width: 20em;
    height: 20em;
    position: relative;
    display: flex;
}

.neo-captcha-button {
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;

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
}

.neo-captcha-guess-region {
    width: 20em;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.25em;
}

.neo-captcha-multi-button {
}

.neo-captcha-start-button {
    width: 20rem;
    height: 15rem;
    font-size: 1.5em;
    margin-top: 0.25em;
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
}

.neo-captcha-icon {
    font-size: 3em;
    color: var(--neo-captcha-light);
}

.neo-captcha-fg-icon {
    font-size: 3em;
    color: var(--neo-captcha-fg);
}

.neo-captcha-icon-dark {
    color: var(--neo-captcha-dark);
    font-size: 3em;
    width: 1em;
    height: 1em;
}

.neo-captcha-wrapper {
    display: none;
    flex-direction: column;
}

.neo-captcha-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
    margin: 0 0 0.5em 0;
}

.neo-captcha-how-to {
    width: 20em;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
    text-align: start;
}

.neo-captcha-how-to-caption {
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5em 1em 0.5em 1em;
    background: color-mix(in srgb, var(--neo-captcha-fg) 10%, transparent);
    display: flex;
    flex-direction: row;
}

.neo-captcha-how-to-table {
    padding: 0 1em 0.5em 1em;
    background: color-mix(in srgb, var(--neo-captcha-fg) 10%, transparent);
}

.neo-captcha-how-to-description {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5em 0.5em 0.5em 1em;
}

.neo-captcha-mode-icon {
    width: 2.5em;
    height: 2.5em;
    margin-right: 1em;
}

.neo-captcha-how-to-footer {
    font-size: 1.1em;
    display: flex;
    flex-direction: column;
}

.neo-captcha-how-to-footer-mode {
    color: var(--neo-captcha-accent);
    font-weight: bold;
}

.neo-captcha-wide-icon {
    flex: 1;
    text-align: end;
    transform: translateY(0.1em);
}

.neo-captcha-steps-numbers {
    text-align: start;
    vertical-align: top;
    font-weight: bold;
    color: var(--neo-captcha-accent);
}
`;function be(){if(document.getElementById("neo-captcha-style"))return;const C=document.createElement("style");C.id="neo-captcha-style",C.textContent=ge,document.head.appendChild(C)}function fe(){if(document.getElementById("neo-captcha-material-icons"))return;const C=document.createElement("link");C.id="neo-captcha-material-icons",C.rel="stylesheet",C.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(C)}function te(C,l,k){var me,ue;fe(),be(),C.innerHTML=`
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
                    <img id="neoCaptcha-guess-icon-1" class="neo-captcha-icon-dark" src="/icon_shape_777.png"/>
                </button>
                <button id="neoCaptcha-guess-button-2" class="neo-captcha-button neo-captcha-multi-button" disabled>
                    <img id="neoCaptcha-guess-icon-2" class="neo-captcha-icon-dark" src="/icon_shape_777.png"/>
                </button>
                <button id="neoCaptcha-guess-button-3" class="neo-captcha-button neo-captcha-multi-button" disabled>
                    <img id="neoCaptcha-guess-icon-3" class="neo-captcha-icon-dark" src="/icon_shape_777.png"/>
                </button>
                <button id="neoCaptcha-guess-button-4" class="neo-captcha-button neo-captcha-multi-button" disabled>
                    <img id="neoCaptcha-guess-icon-4" class="neo-captcha-icon-dark" src="/icon_shape_777.png"/>
                </button>
            </div>
        </div>
    </div>
    `;const ae="1.0.3",ne="https://neo-captcha.com/api/v1",E=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),x=document.getElementById("neoCaptcha-startOverlay"),I=document.getElementById("neoCaptcha-submit"),F=document.getElementById("neoCaptcha-start"),c=document.getElementById("neoCaptcha-captchaCanvas"),e=c.getContext("2d"),f=document.getElementById("neoCaptcha-timeCanvas"),m=f.getContext("2d");if(!e||!m)throw new Error("Canvas context could not be initialized.");const G=(l==null?void 0:l.variant)||"iq",H=G==="ns"||G==="ncs";let oe=!0;H?(document.getElementById("neoCaptcha-submit").style.display="none",c.style.cursor="auto",oe=!1):document.getElementById("neoCaptcha-guess").style.display="none";const ve=(me=window.matchMedia)==null?void 0:me.call(window,"(prefers-color-scheme: dark)").matches,R=(l==null?void 0:l.theme)==="dark"||(l==null?void 0:l.theme)==="light"?l.theme:ve?"dark":"light";document.getElementById("neoCaptchaRoot").classList.add(`neo-captcha-theme-${R}`),document.getElementById("neoCaptchaWidgetLogo").src=R==="dark"?"https://neo-captcha.com/assets/logo-dark.png":"https://neo-captcha.com/assets/logo.png",H?document.getElementById("neoCaptcha-modeIcon").src=R==="dark"?"https://neo-captcha.com/assets/icon_see_shape_dark.png":"https://neo-captcha.com/assets/icon_see_shape.png":document.getElementById("neoCaptcha-modeIcon").src=R==="dark"?"https://neo-captcha.com/assets/icon_find_corner_dark.png":"https://neo-captcha.com/assets/icon_find_corner.png";const ce="#f406",we="#0f4a";let v=(navigator.language||navigator.languages[0]).split("-")[0];v=(l==null?void 0:l.lang)||v;const r={en:{howto:"?   How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_s:"Click when you <b>hear a signal!</b>",step_3:"<b>Solve the CAPTCHA</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!",mode_2:"Neon Shape:",mode_2_text:"Select the shape you see!"},de:{howto:"?   Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_s:"Klicke beim <b>Signalton</b>",step_3:"<b>Löse das CAPTCHA!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!",mode_2:"Neon-Form:",mode_2_text:"Welche Form siehst du?"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(r[v]||r.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(r[v]||r.en).step_1,E?document.getElementById("neoCaptcha-step_2").innerHTML=(r[v]||r.en).step_2:document.getElementById("neoCaptcha-step_2").innerHTML=(r[v]||r.en).step_2_s,document.getElementById("neoCaptcha-step_3").innerHTML=(r[v]||r.en).step_3,H?(document.getElementById("neoCaptcha-mode").innerHTML=(r[v]||r.en).mode_2,document.getElementById("neoCaptcha-modeText").innerHTML=(r[v]||r.en).mode_2_text):(document.getElementById("neoCaptcha-mode").innerHTML=(r[v]||r.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(r[v]||r.en).mode_1_text);const ye=(l==null?void 0:l.minDifficulty)||"easy";let P=6e3,u=[255,0,0],B=!1,g=[],p=0,A=0,Y=0,w=0,b=!1,S=!1,q="",V=0,X=0,$,N,Ce=(l==null?void 0:l.showHowTo)||!1,L=(l==null?void 0:l.expandHowTo)||!1;if(Ce){const a=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText"),o=document.getElementById("neoCaptcha-howToIcon");n.style.display=L?"block":"none",o.innerText=L?"expand_less":"expand_more",a.addEventListener("click",()=>{L=!L,n.style.display=L?"block":"none",o.innerText=L?"expand_less":"expand_more"})}else{const a=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText");a.style.display="none",n.style.display="none"}const j=document.getElementById("neoCaptcha-overlayBg");E?j.style.background=ce:j.style.background="#000";const J=document.getElementById("neoCaptcha-signalIcon");J.innerText=E?"do_not_touch":"hearing",F.addEventListener("click",ie);async function ie(){console.log("version: "+ae),console.log("userAgent: "+navigator.userAgent);const a=document.getElementById("neoCaptcha-wrapper");a.style.display="flex",F.style.display="none";const n={challenge:$,hmac:N,userAgent:navigator.userAgent,mobile:E,version:ae,minDifficulty:ye,variant:G},t=await(await fetch(ne+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const T=document.getElementById("neoCaptcha-image");T.style.display="inline-block",x.style.display="flex",q=`data:image/png;base64,${t.img}`,u=t.color,$=t.challenge,N=t.hmac,P=t.totalTime||P;const s=document.getElementById("neoCaptcha-container");if(s.style.height="20em",t.variant==="ns")for(let y=1;y<=4;y++)document.getElementById("neoCaptcha-guess-icon-"+y).src=`/icon_shape_${t.icons[y-1]}.png`;if(c.style.width="20em",c.style.height="20em",c.width=c.clientWidth,c.height=c.width,V=c.width*t.pointSize,X=c.width*t.thumbSize,!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,c.width,c.height),m.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,Y=Date.now(),setTimeout(()=>Te(),t.suspense)}}function Te(){E?(j.style.background=we,J.innerText="touch_app",w>0?g.push({action:"react",time:w-Date.now()}):w=Date.now()):xe()}const _=new AudioContext,xe=()=>{_.state==="suspended"?_.resume().then(()=>se()):se()},se=()=>{K(285,.12),K(852,.12,.12),K(528,.12,.24),w>0?g.push({action:"react",time:w-Date.now()}):w=Date.now()};function K(a,n,o=0){let t=_.createOscillator(),T=_.createGain();t.type="sine",t.frequency.value=a,T.gain.value=.1,t.connect(T),T.connect(_.destination),t.start(_.currentTime+o),t.stop(_.currentTime+o+n)}function le(){if(p==0&&(w>0?g.push({action:"react",time:Date.now()-w}):w=Date.now(),H))for(let a=1;a<=4;a++)document.getElementById("neoCaptcha-guess-button-"+a).disabled=!1}x.addEventListener("mousedown",le),x.addEventListener("touchstart",le,{passive:!1}),x.addEventListener("touchmove",()=>{},{passive:!1});function U(){if(w>0&&p==0){g.push({action:"start",time:Date.now()-Y}),b=!0;const a=document.getElementById("neoCaptcha-image");if(a.src=q,Ee(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),x.style.display="none",E&&(S=!0)}}x.addEventListener("mouseup",U),x.addEventListener("touchend",U),x.addEventListener("touchcancel",U);function Ee(){p=Date.now(),re()}function re(){if(!m)throw new Error("Canvas context could not be initialized.");const a=Date.now()-p,n=Math.max(P-a,0),o=n/P*f.width;m.clearRect(0,0,f.width,f.height),m.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,m.fillRect(0,0,o,f.height),n>0&&b?requestAnimationFrame(re):n<=0&&b?(console.log("Time's up!"),A=p+P,ee()):(m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,f.width,f.height))}function de(a){if(a.preventDefault(),!S&&p>0){const n=c.getBoundingClientRect();let{x:o,y:t}=Z(a,n);g.push({action:"down",enabled:b,x:o,y:t,time:Date.now()-p}),b&&(B=!0,pe(o,t))}}oe&&(c.addEventListener("mousedown",de),c.addEventListener("touchstart",de,{passive:!1}));function he(a){if(a.preventDefault(),S)return;const n=c.getBoundingClientRect();let{x:o,y:t}=Z(a,n);p>0&&g.push({action:"move",enabled:b,drawing:B,x:o,y:t,time:Date.now()-p}),b&&B&&pe(o,t)}c.addEventListener("mousemove",he),c.addEventListener("touchmove",he,{passive:!1});function Q(a){if(a.preventDefault(),S){S=!1;return}if(!B)return;const n=c.getBoundingClientRect();let{x:o,y:t}=Z(a,n);if(p>0&&g.push({action:"up",enabled:b,x:o,y:t,time:Date.now()-p}),p>=0&&b){if(B=!1,g.push({action:"point",x:o/c.width,y:t/c.height,time:Date.now()-p}),I.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(o,t,V/2,0,Math.PI*2),e.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]})`,e.fill()}}c.addEventListener("mouseup",Q),c.addEventListener("touchend",Q),c.addEventListener("touchcancel",Q);function pe(a,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,c.width,c.height),e.beginPath(),e.arc(a-1,n-1,X/2,0,Math.PI*2),e.fillStyle=`rgba(${u[0]}, ${u[1]}, ${u[2]}, 0.2)`,e.fill()}function Z(a,n){let o,t;return a instanceof MouseEvent?(o=a.clientX-n.left,t=a.clientY-n.top):(o=a.changedTouches[0].clientX-n.left,t=a.changedTouches[0].clientY-n.top),{x:o,y:t}}for(let a=1;a<=4;a++)(ue=document.getElementById("neoCaptcha-guess-button-"+a))==null||ue.addEventListener("click",()=>_e(a));function _e(a){let n=document.getElementById("neoCaptcha-guess-icon-"+a).src,o=n.split("/");n=o[o.length-1].split(".")[0],g.push({action:"guess",tag:n,time:Date.now()-p}),ee()}I==null||I.addEventListener("click",ee);async function ee(){if(!b)return;b=!1,I.disabled=!0;for(let i=1;i<=4;i++)document.getElementById("neoCaptcha-guess-button-"+i).disabled=!0;if(!e||!m)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,c.width,c.height),m.fillStyle="rgba(255, 255, 255, 0.8)",m.fillRect(0,0,f.width,f.height),A===0&&(A=Date.now());const a=A-p;g.push({action:"end",time:a});const n={challenge:$,hmac:N,activity:g},o=await fetch(ne+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let t=!1,T=!1;try{const i=await o.json();t=i.valid,T=i.retry,T&&($=i.challenge,N=i.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const s=c.width*.1;let y=c.width/2,M=c.height/2;const d=c.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let i=y+s/8,h=M+s/4;z(d,i,h),e.lineWidth=s+17,z(d,i,h),e.lineWidth=s+14,z(d,i,h),e.lineWidth=s+11,z(d,i,h),e.lineWidth=s+8,z(d,i,h),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=s,z(d,y,M)}else if(T){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let i=y+s/8,h=M+s/4;W(d,i,h),e.lineWidth=s+17,W(d,i,h),e.lineWidth=s+14,W(d,i,h),e.lineWidth=s+11,W(d,i,h),e.lineWidth=s+8,W(d,i,h),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=s,W(d,y,M)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=s+20;let i=y+s/8,h=M+s/4;D(d,i,h),e.lineWidth=s+17,D(d,i,h),e.lineWidth=s+14,D(d,i,h),e.lineWidth=s+11,D(d,i,h),e.lineWidth=s+8,D(d,i,h),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=s,D(d,y,M)}t&&k&&k.onSuccess?k.onSuccess():T?setTimeout(()=>{ke(),ie()},500):k&&k.onFailure&&k.onFailure()}function z(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t/2,o+t),e.lineTo(n-t-t/2,o),e.moveTo(n-t/2,o+t),e.lineTo(n+a-t/2,o-t),e.stroke()}function D(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t,o-t),e.lineTo(n+t,o+t),e.moveTo(n+t,o-t),e.lineTo(n-t,o+t),e.stroke()}function W(a,n,o){if(!e)throw new Error("Canvas context could not be initialized.");const t=a/2;e.beginPath(),e.moveTo(n-t,o),e.lineTo(n-t+1,o),e.moveTo(n,o),e.lineTo(n+1,o),e.moveTo(n+t,o),e.lineTo(n+t+1,o),e.stroke()}function ke(){B=!1,g=[],p=0,A=0,Y=0,w=0,b=!1,I.disabled=!0,S=!1,q="",V=0,X=0;const a=document.getElementById("neoCaptcha-wrapper");a.style.display="none",F.style.display="block",m&&m.clearRect(0,0,f.width,f.height),E&&(j.style.background=ce,J.innerText="do_not_touch")}}return window.NeoCAPTCHA={render:te},O.renderCaptcha=te,Object.defineProperty(O,Symbol.toStringTag,{value:"Module"}),O}({});
