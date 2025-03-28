var NeoCAPTCHA=function(H){"use strict";const de=`
:root {
    --neo-captcha-accent: #009696;
    --neo-captcha-dark: #111;
    --neo-captcha-light: #eee;

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
    width: 20em;
    height: 4em;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;

    &:disabled {
        opacity: 0.66;
    }
}

.neo-captcha-start-button {
    width: 20rem;
    height: 15rem;
    font-size: 1.5em;
    font-weight: bold;
    cursor: pointer;
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
        opacity: 50%;
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

.neo-captcha-icon-dark {
    color: var(--neo-captcha-dark);
    font-size: 3em;
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
    margin-bottom: 0.5em;
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

.neo-captcha-how-to-text {
}

.neo-captcha-how-to-table {
    padding: 0 1em 0.5em 1em;
    background: color-mix(in srgb, var(--neo-captcha-fg) 10%, transparent);
}

.neo-captcha-how-to-footer {
    font-size: 1.1em;
    padding: 0.5em 1em 0.5em 1em;
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
`;function he(){if(document.getElementById("neo-captcha-style"))return;const w=document.createElement("style");w.id="neo-captcha-style",w.textContent=de,document.head.appendChild(w)}function pe(){if(document.getElementById("neo-captcha-material-icons"))return;const w=document.createElement("link");w.id="neo-captcha-material-icons",w.rel="stylesheet",w.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(w)}function K(w){pe(),he(),w.innerHTML=`
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
                </table>
                <div class="neo-captcha-how-to-footer">
                    <span id="neoCaptcha-mode" class="neo-captcha-how-to-footer-mode"></span>
                    <span id="neoCaptcha-modeText"></span>
                </div>
            </div>
        </div>
        <button id="neoCaptcha-start" class="neo-captcha-start-button">
            <span class="neo-captcha-icon-dark material-icons">play_arrow</span>
        </button>
        <div id="neoCaptcha-wrapper" class="neo-captcha-wrapper">
            <div id="neoCaptcha-container" class="neo-captcha-container">
                <div class="neo-captcha-icon-div sync">
                    <span class="neo-captcha-icon material-icons">sync</span>
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
            <button id="neoCaptcha-submit" class="neo-captcha-button" disabled>
                <span id="neoCaptcha-submitIcon" class="neo-captcha-icon-dark material-icons">check</span>
            </button>
        </div>
    </div>
    `;const Q="1.0.2-demo",Z="https://neo-captcha.com/api/v1",T=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),C=document.getElementById("neoCaptcha-startOverlay"),h=document.getElementById("neoCaptcha-submit"),j=document.getElementById("neoCaptcha-start"),i=document.getElementById("neoCaptcha-captchaCanvas"),e=i.getContext("2d"),f=document.getElementById("neoCaptcha-timeCanvas"),p=f.getContext("2d");if(!e||!p)throw new Error("Canvas context could not be initialized.");document.getElementById("neoCaptchaRoot").classList.add("neo-captcha-theme-dark"),document.getElementById("neoCaptchaWidgetLogo").src="https://neo-captcha.com/assets/logo-dark.png";const ee="#f406",me="#0f4a";let E=(navigator.language||navigator.languages[0]).split("-")[0];const g={en:{howto:"How-To:",step_1:"Hit ▶ Play",step_2:'Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>',step_2_s:"Tap when you <b>hear a signal!</b>",mode_1:"Implied square:",mode_1_text:"Mark the missing corner!"},de:{howto:"Wie man's macht:",step_1:"Drücke ▶ Start",step_2:'Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>',step_2_s:"Tippe beim <b>Signalton!</b>",mode_1:"Angedeutetes Viereck:",mode_1_text:"Markiere die fehlende Ecke!"}};document.getElementById("neoCaptcha-howToTitle").innerHTML=(g[E]||g.en).howto,document.getElementById("neoCaptcha-step_1").innerHTML=(g[E]||g.en).step_1,T?document.getElementById("neoCaptcha-step_2").innerHTML=(g[E]||g.en).step_2:document.getElementById("neoCaptcha-step_2").innerHTML=(g[E]||g.en).step_2_s,document.getElementById("neoCaptcha-mode").innerHTML=(g[E]||g.en).mode_1,document.getElementById("neoCaptcha-modeText").innerHTML=(g[E]||g.en).mode_1_text;const ge="easy";let D=6e3,m=[255,0,0],k=!1,v=[],d=0,R=0,N=0,b=0,u=!1,I=!1,O="",Y=0,G=0,M,P,_=!0;{const o=document.getElementById("neoCaptcha-howToCaption"),n=document.getElementById("neoCaptcha-howToText"),a=document.getElementById("neoCaptcha-howToIcon");n.style.display=_?"block":"none",a.innerText=_?"expand_less":"expand_more",o.addEventListener("click",()=>{_=!_,n.style.display=_?"block":"none",a.innerText=_?"expand_less":"expand_more"})}const $=document.getElementById("neoCaptcha-overlayBg");T?$.style.background=ee:$.style.background="#000";const V=document.getElementById("neoCaptcha-signalIcon");V.innerText=T?"do_not_touch":"hearing",j.addEventListener("click",te);async function te(){console.log("version: "+Q),console.log("userAgent: "+navigator.userAgent);const o=document.getElementById("neoCaptcha-wrapper");o.style.display="flex",j.style.display="none";const n={challenge:M,hmac:P,userAgent:navigator.userAgent,mobile:T,version:Q,minDifficulty:ge},t=await(await fetch(Z+"/generate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(t),t.img){const y=document.getElementById("neoCaptcha-image");y.style.display="inline-block",C.style.display="flex",O=`data:image/png;base64,${t.img}`,Y=t.pointSize,G=t.thumbSize,m=t.color,M=t.challenge,P=t.hmac,D=t.totalTime||D;const c=document.getElementById("neoCaptcha-container");if(c.style.height="20em",i.style.width="20em",i.style.height="20em",i.width=i.clientWidth,i.height=i.width,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(0, 0, 0)",e.fillRect(0,0,i.width,i.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,N=Date.now(),setTimeout(()=>ue(),t.suspense)}}function ue(){T?($.style.background=me,V.innerText="touch_app",b>0?v.push({action:"react",time:b-Date.now()}):b=Date.now()):fe()}const x=new AudioContext,fe=()=>{x.state==="suspended"?x.resume().then(()=>ne()):ne()},ne=()=>{X(285,.12),X(852,.12,.12),X(528,.12,.24),b>0?v.push({action:"react",time:b-Date.now()}):b=Date.now()};function X(o,n,a=0){let t=x.createOscillator(),y=x.createGain();t.type="sine",t.frequency.value=o,y.gain.value=.1,t.connect(y),y.connect(x.destination),t.start(x.currentTime+a),t.stop(x.currentTime+a+n)}function ae(){d==0&&(b>0?v.push({action:"react",time:Date.now()-b}):b=Date.now())}C.addEventListener("mousedown",ae),C.addEventListener("touchstart",ae,{passive:!1}),C.addEventListener("touchmove",()=>{},{passive:!1});function q(){if(b>0&&d==0){v.push({action:"start",time:Date.now()-N}),u=!0;const o=document.getElementById("neoCaptcha-image");if(o.src=O,ve(),!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),C.style.display="none",T&&(I=!0)}}C.addEventListener("mouseup",q),C.addEventListener("touchend",q),C.addEventListener("touchcancel",q);function ve(){d=Date.now(),oe()}function oe(){if(!p)throw new Error("Canvas context could not be initialized.");const o=Date.now()-d,n=Math.max(D-o,0),a=n/D*f.width;p.clearRect(0,0,f.width,f.height),p.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,p.fillRect(0,0,a,f.height),n>0&&u?requestAnimationFrame(oe):n<=0&&u?(console.log("Time's up!"),R=d+D,A()):(p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,f.width,f.height))}function ie(o){if(o.preventDefault(),!I&&d>0){const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);v.push({action:"down",enabled:u,x:a,y:t,time:Date.now()-d}),u&&(k=!0,se(a,t))}}i.addEventListener("mousedown",ie),i.addEventListener("touchstart",ie,{passive:!1});function ce(o){if(o.preventDefault(),I)return;const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);d>0&&v.push({action:"move",enabled:u,drawing:k,x:a,y:t,time:Date.now()-d}),u&&k&&se(a,t)}i.addEventListener("mousemove",ce),i.addEventListener("touchmove",ce,{passive:!1});function F(o){if(o.preventDefault(),I){I=!1;return}if(!k)return;const n=i.getBoundingClientRect();let{x:a,y:t}=J(o,n);if(d>0&&v.push({action:"up",enabled:u,x:a,y:t,time:Date.now()-d}),d>=0&&u){if(k=!1,v.push({action:"point",x:a,y:t,time:Date.now()-d}),h.disabled=!1,!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(a,t,Y/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]})`,e.fill()}}i.addEventListener("mouseup",F),i.addEventListener("touchend",F),i.addEventListener("touchcancel",F);function se(o,n){if(!e)throw new Error("Canvas context could not be initialized.");e.clearRect(0,0,i.width,i.height),e.beginPath(),e.arc(o-1,n-1,G/2,0,Math.PI*2),e.fillStyle=`rgba(${m[0]}, ${m[1]}, ${m[2]}, 0.2)`,e.fill()}function J(o,n){let a,t;return o instanceof MouseEvent?(a=o.clientX-n.left,t=o.clientY-n.top):(a=o.changedTouches[0].clientX-n.left,t=o.changedTouches[0].clientY-n.top),{x:a,y:t}}h==null||h.addEventListener("click",A);async function A(){if(!u)return;if(u=!1,h.disabled=!0,!e||!p)throw new Error("Canvas context could not be initialized.");e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillRect(0,0,i.width,i.height),p.fillStyle="rgba(255, 255, 255, 0.8)",p.fillRect(0,0,f.width,f.height),R===0&&(R=Date.now());const o=R-d;v.push({action:"end",time:o});const n={challenge:M,hmac:P,activity:v},a=await fetch(Z+"/validate-captcha",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});let t=!1,y=!1;try{const s=await a.json();t=s.valid,y=s.retry,y&&(M=s.challenge,P=s.hmac)}catch{}e.lineJoin="round",e.lineCap="round";const c=i.width*.1;let z=i.width/2,W=i.height/2;const l=i.width/3;if(t){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=W+c/4;S(l,s,r),e.lineWidth=c+17,S(l,s,r),e.lineWidth=c+14,S(l,s,r),e.lineWidth=c+11,S(l,s,r),e.lineWidth=c+8,S(l,s,r),e.strokeStyle="rgba(0, 160, 0)",e.lineWidth=c,S(l,z,W)}else if(y){e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=W+c/4;L(l,s,r),e.lineWidth=c+17,L(l,s,r),e.lineWidth=c+14,L(l,s,r),e.lineWidth=c+11,L(l,s,r),e.lineWidth=c+8,L(l,s,r),e.strokeStyle="rgba(0, 80, 255)",e.lineWidth=c,L(l,z,W)}else{e.strokeStyle="rgba(0, 0, 0, 0.02)",e.lineWidth=c+20;let s=z+c/8,r=W+c/4;B(l,s,r),e.lineWidth=c+17,B(l,s,r),e.lineWidth=c+14,B(l,s,r),e.lineWidth=c+11,B(l,s,r),e.lineWidth=c+8,B(l,s,r),e.strokeStyle="rgba(255, 0, 0)",e.lineWidth=c,B(l,z,W)}let re=document.getElementById("neoCaptcha-submitIcon");t?(console.log("Yippie!"),h.disabled=!1,h.removeEventListener("click",A),h.addEventListener("click",U),re.innerText="replay"):y?setTimeout(()=>{le(),te()},500):(console.log("Womp, womp"),h.disabled=!1,h.removeEventListener("click",A),h.addEventListener("click",U),re.innerText="replay")}function U(){le(),M=void 0,P=void 0,h.removeEventListener("click",U),h.addEventListener("click",A);let o=document.getElementById("neoCaptcha-submitIcon");o.innerText="check",e&&e.clearRect(0,0,i.width,i.height);const n=document.getElementById("neoCaptcha-image");n.style.display="none",C.style.display="none"}function S(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t/2,a+t),e.lineTo(n-t-t/2,a),e.moveTo(n-t/2,a+t),e.lineTo(n+o-t/2,a-t),e.stroke()}function B(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t,a-t),e.lineTo(n+t,a+t),e.moveTo(n+t,a-t),e.lineTo(n-t,a+t),e.stroke()}function L(o,n,a){if(!e)throw new Error("Canvas context could not be initialized.");const t=o/2;e.beginPath(),e.moveTo(n-t,a),e.lineTo(n-t+1,a),e.moveTo(n,a),e.lineTo(n+1,a),e.moveTo(n+t,a),e.lineTo(n+t+1,a),e.stroke()}function le(){k=!1,v=[],d=0,R=0,N=0,b=0,u=!1,h.disabled=!0,I=!1,O="",Y=0,G=0;const o=document.getElementById("neoCaptcha-wrapper");o.style.display="none",j.style.display="block",p&&p.clearRect(0,0,f.width,f.height),T&&($.style.background=ee,V.innerText="do_not_touch")}}return window.NeoCAPTCHA={render:K},H.renderCaptcha=K,Object.defineProperty(H,Symbol.toStringTag,{value:"Module"}),H}({});
