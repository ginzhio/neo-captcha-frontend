const config = {
    showHowTo: true,
    expandHowTo: false,
    variant: 'ns',
    theme: 'dark',
    lang: 'en',
    minDifficulty: 'easy',
};
const callbacks = {
    onSuccess: () => {
    },
    onFailure: () => {
    }
}

declare const __VERSION__: string;

const VERSION = __VERSION__;
const url = "http://localhost:8080/api"; // "https://neo-captcha.com/api/v1";

const variant = config?.variant || "ns";
const variantNs = variant === 'ns' || variant === 'ncs';
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const theme = (config?.theme === 'dark' || config?.theme === 'light') ? config.theme : (prefersDark ? 'dark' : 'light');
let userLang = (navigator.language || navigator.languages[0]).split("-")[0];
userLang = config?.lang || userLang;
const minDifficulty = config?.minDifficulty || "easy";
const showHowTo = config?.showHowTo || false;
let howToExpanded = config?.expandHowTo || false;

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const overlay = document.getElementById("neoCaptcha-startOverlay") as HTMLDivElement;
const submitBtn = document.getElementById("neoCaptcha-submit") as HTMLButtonElement;
const startBtn = document.getElementById("neoCaptcha-start") as HTMLButtonElement;
const canvas = document.getElementById("neoCaptcha-captchaCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const timeCanvas = document.getElementById("neoCaptcha-timeCanvas") as HTMLCanvasElement;
const bar = timeCanvas.getContext("2d");
if (!ctx || !bar) {
    throw new Error("Canvas context could not be initialized.");
}

let interactive: boolean;
if (variantNs) {
    document.getElementById("neoCaptcha-submit")!.style.display = "none";
    interactive = false;
} else {
    document.getElementById("neoCaptcha-guess")!.style.display = "none";
    canvas!.style.cursor = "crosshair";
    canvas!.style.touchAction = "none";
    interactive = true;
}

document.getElementById("neoCaptchaRoot")!.classList.add(`neo-captcha-theme-${theme}`);
(document.getElementById("neoCaptchaWidgetLogo") as HTMLImageElement).src = theme === 'dark'
    ? 'https://neo-captcha.com/assets/logo-dark.png'
    : 'https://neo-captcha.com/assets/logo.png';
if (variantNs) {
    (document.getElementById("neoCaptcha-modeIcon") as HTMLImageElement).src = theme === 'dark'
        ? 'https://neo-captcha.com/assets/icon_see_shape_dark.png'
        : 'https://neo-captcha.com/assets/icon_see_shape.png';
} else {
    (document.getElementById("neoCaptcha-modeIcon") as HTMLImageElement).src = theme === 'dark'
        ? 'https://neo-captcha.com/assets/icon_find_corner_dark.png'
        : 'https://neo-captcha.com/assets/icon_find_corner.png';
}

const mobileRed = "#f406";
const mobileGreen = "#0f4a";

const translations: Record<string, {
    howto: string,
    step_1: string,
    step_2: string,
    step_2_s: string,
    step_3: string,
    mode_1: string,
    mode_1_text: string,
    mode_2: string,
    mode_2_text: string,
}> = {
    en: {
        howto: '?   How-To:',
        step_1: 'Hit ▶ Play',
        step_2: `Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>`,
        step_2_s: `Click when you <b>hear a signal!</b>`,
        step_3: '<b>Solve the CAPTCHA</b>',
        mode_1: 'Implied square:',
        mode_1_text: 'Mark the missing corner!',
        mode_2: 'Neon Shape:',
        mode_2_text: 'Select the shape you see!',
    },
    de: {
        howto: '?   Wie man\'s macht:',
        step_1: 'Drücke ▶ Start',
        step_2: `Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>`,
        step_2_s: 'Klicke beim <b>Signalton</b>',
        step_3: '<b>Löse das CAPTCHA!</b>',
        mode_1: 'Angedeutetes Viereck:',
        mode_1_text: 'Markiere die fehlende Ecke!',
        mode_2: 'Neon-Form:',
        mode_2_text: 'Welche Form siehst du?',
    },
};
document.getElementById("neoCaptcha-howToTitle")!.innerHTML = (translations[userLang] || translations['en']).howto;
document.getElementById("neoCaptcha-step_1")!.innerHTML = (translations[userLang] || translations['en']).step_1;
if (isMobile) {
    document.getElementById("neoCaptcha-step_2")!.innerHTML = (translations[userLang] || translations['en']).step_2;
} else {
    document.getElementById("neoCaptcha-step_2")!.innerHTML = (translations[userLang] || translations['en']).step_2_s;
}
document.getElementById("neoCaptcha-step_3")!.innerHTML = (translations[userLang] || translations['en']).step_3;
if (variantNs) {
    document.getElementById("neoCaptcha-mode")!.innerHTML = (translations[userLang] || translations['en']).mode_2;
    document.getElementById("neoCaptcha-modeText")!.innerHTML = (translations[userLang] || translations['en']).mode_2_text;
} else {
    document.getElementById("neoCaptcha-mode")!.innerHTML = (translations[userLang] || translations['en']).mode_1;
    document.getElementById("neoCaptcha-modeText")!.innerHTML = (translations[userLang] || translations['en']).mode_1_text;
}

let totalTime = 6000;
let color: number[] = [255, 0, 0];

let drawing = false;
let activity: any[] = [];
let startTime: number = 0;
let endTime: number = 0;
let idleStartTime: number = 0;
let beepStartTime: number = 0;
let enabled = false;
let ignoreNext = false;
let dontIgnoreNext = false;
let imgSrc: string = "";
let pointSize: number = 0;
let thumbSize: number = 0;
let challenge: string | undefined = undefined;
let hmac: string | undefined = undefined;

if (showHowTo) {
    const howToCaption = document.getElementById("neoCaptcha-howToCaption") as HTMLDivElement;
    const howToText = document.getElementById("neoCaptcha-howToText") as HTMLTableElement;
    const howToIcon = document.getElementById("neoCaptcha-howToIcon") as HTMLSpanElement;
    howToText.style.display = howToExpanded ? "block" : "none";
    howToIcon.innerText = howToExpanded ? "expand_less" : "expand_more";
    howToCaption.addEventListener("click", () => {
        howToExpanded = !howToExpanded;
        howToText.style.display = howToExpanded ? "block" : "none";
        howToIcon.innerText = howToExpanded ? "expand_less" : "expand_more";
    });
} else {
    const howTo = document.getElementById("neoCaptcha-howToCaption") as HTMLDivElement;
    const howToText = document.getElementById("neoCaptcha-howToText") as HTMLTableElement;
    howTo.style.display = "none";
    howToText.style.display = "none";
}

const overlayBg = document.getElementById("neoCaptcha-overlayBg") as HTMLDivElement;
if (!isMobile) {
    overlayBg.style.background = "#000";
} else {
    overlayBg.style.background = mobileRed;
}
const signalIcon = document.getElementById("neoCaptcha-signalIcon") as HTMLSpanElement;
signalIcon.innerText = isMobile ? "do_not_touch" : "hearing";

startBtn.addEventListener("click", getCaptcha);

async function getCaptcha() {
    console.log("version: " + VERSION);
    console.log("userAgent: " + navigator.userAgent);

    const wrapper = document.getElementById("neoCaptcha-wrapper") as HTMLDivElement;
    wrapper.style.display = "flex";
    startBtn.style.display = "none";

    const payload: any = {
        challenge, hmac,
        userAgent: navigator.userAgent,
        mobile: isMobile,
        version: VERSION,
        minDifficulty,
        variant
    };
    const response = await fetch(url + "/generate-captcha", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    const result = await response.json();
    console.log(result);
    if (result.img) {
        const image = document.getElementById("neoCaptcha-image") as HTMLImageElement;
        image.style.display = "inline-block";
        overlay.style.display = "flex";
        imgSrc = `data:image/png;base64,${result.img}`;
        color = result.color;
        challenge = result.challenge;
        hmac = result.hmac;
        totalTime = result.totalTime || totalTime;
        const container = document.getElementById("neoCaptcha-container") as HTMLDivElement;
        container.style.height = "20em";
        if (result.variant === 'ns') {
            for (let i = 1; i <= 4; i++) {
                (document.getElementById("neoCaptcha-guess-icon-" + i) as HTMLImageElement)
                    .src = `https://neo-captcha.com/assets/icon_shape_${result.icons[i - 1]}.png`;
            }
        }

        canvas.style.width = "20em";
        canvas.style.height = "20em";
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.width;
        pointSize = canvas.width * result.pointSize;
        thumbSize = canvas.width * result.thumbSize;
        if (!ctx || !bar) {
            throw new Error("Canvas context could not be initialized.");
        }

        ctx.fillStyle = "rgba(0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        bar.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]})`;

        idleStartTime = Date.now();
        setTimeout(() => beep(), result.suspense);
    }
}

function beep() {
    if (isMobile) {
        overlayBg.style.background = mobileGreen;
        signalIcon.innerText = "touch_app";
        if (beepStartTime > 0) {
            activity.push({action: "react", time: beepStartTime - Date.now()});
        } else {
            beepStartTime = Date.now();
        }
    } else {
        playTone();
    }
}

const audio = new AudioContext();

const playTone = () => {
    if (audio.state === "suspended") {
        // Wichtig für iOS/Chrome
        audio.resume().then(() => actuallyPlayTone());
    } else {
        actuallyPlayTone();
    }
};

const actuallyPlayTone = () => {
    playSound(285, 0.12);
    playSound(852, 0.12, 0.12);
    playSound(528, 0.12, 0.24);

    if (beepStartTime > 0) {
        activity.push({action: "react", time: beepStartTime - Date.now()});
    } else {
        beepStartTime = Date.now();
    }
}

function playSound(hz: number, duration: number, delay: number = 0) {
    let oscillator = audio.createOscillator();
    let gainNode = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = hz;

    gainNode.gain.value = 0.1;

    oscillator.connect(gainNode);
    gainNode.connect(audio.destination);

    oscillator.start(audio.currentTime + delay);
    oscillator.stop(audio.currentTime + delay + duration);
}

function react() {
    if (startTime == 0) {
        if (beepStartTime > 0) {
            activity.push({action: "react", time: Date.now() - beepStartTime});
        } else {
            beepStartTime = Date.now();
        }
        if (variantNs) {
            for (let i = 1; i <= 4; i++) {
                (document.getElementById("neoCaptcha-guess-button-" + i) as HTMLButtonElement).disabled = false;
            }
        }
    }
}

overlay.addEventListener("mousedown", react);
overlay.addEventListener("touchstart", react, {passive: false});
overlay.addEventListener("touchmove", () => {/*just consume event*/
    dontIgnoreNext = true;
}, {passive: false});

function start() {
    if (beepStartTime > 0 && startTime == 0) {
        activity.push({action: "start", time: Date.now() - idleStartTime});

        enabled = true;
        const image = document.getElementById("neoCaptcha-image") as HTMLImageElement;
        image.src = imgSrc;
        startTimer();
        if (!ctx) {
            throw new Error("Canvas context could not be initialized.");
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        overlay.style.display = "none";
        if (!dontIgnoreNext && isMobile) {
            ignoreNext = true;
        }
        dontIgnoreNext = false;
    }
}

overlay.addEventListener("mouseup", start);
overlay.addEventListener("touchend", start);
overlay.addEventListener("touchcancel", start);

function startTimer() {
    startTime = Date.now();
    drawTimerBar();
}

function drawTimerBar() {
    if (!bar) {
        throw new Error("Canvas context could not be initialized.");
    }
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(totalTime - elapsed, 0);
    const width = (remaining / totalTime) * timeCanvas.width;

    bar.clearRect(0, 0, timeCanvas.width, timeCanvas.height);
    bar.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]})`;
    bar.fillRect(0, 0, width, timeCanvas.height);

    if (remaining > 0 && enabled) {
        requestAnimationFrame(drawTimerBar);
    } else if (remaining <= 0 && enabled) {
        console.log("Time's up!");
        endTime = startTime + totalTime;
        submitCaptcha();
    } else {
        bar.fillStyle = "rgba(255, 255, 255, 0.8)";
        bar.fillRect(0, 0, timeCanvas.width, timeCanvas.height);
    }
}

function down(e: MouseEvent | TouchEvent) {
    if (interactive) e.preventDefault();
    if (ignoreNext) return;

    if (startTime > 0) {
        const rect = canvas.getBoundingClientRect();
        let {x, y} = getCoords(e, rect);
        activity.push({action: "down", enabled: enabled, x: x, y: y, time: Date.now() - startTime});

        if (enabled && interactive) {
            drawing = true;
            drawCurrentPos(x, y);
        }
    }
}

if (interactive) {
    canvas.addEventListener("mousedown", down);
    canvas.addEventListener("touchstart", down, {passive: false});
}

function move(e: MouseEvent | TouchEvent) {
    if (interactive) e.preventDefault();
    if (ignoreNext) return;

    const rect = canvas.getBoundingClientRect();
    let {x, y} = getCoords(e, rect);
    if (startTime > 0) {
        activity.push({action: "move", enabled: enabled, drawing: drawing, x: x, y: y, time: Date.now() - startTime});
    }

    if (enabled && drawing) {
        drawCurrentPos(x, y);
    }
}

canvas.addEventListener("mousemove", move);
canvas.addEventListener("touchmove", move, {passive: false});

function up(e: MouseEvent | TouchEvent) {
    if (interactive) e.preventDefault();
    if (ignoreNext) {
        ignoreNext = false;
        return;
    }
    if (interactive && !drawing) return;

    const rect = canvas.getBoundingClientRect();
    let {x, y} = getCoords(e, rect);
    if (startTime > 0) {
        activity.push({action: "up", enabled: enabled, x: x, y: y, time: Date.now() - startTime});
    }

    if (startTime >= 0 && enabled && drawing) {
        drawing = false;
        activity.push({action: "point", x: x / canvas.width, y: y / canvas.height, time: Date.now() - startTime});
        submitBtn.disabled = false;

        if (!ctx) {
            throw new Error("Canvas context could not be initialized.");
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, pointSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]})`;
        ctx.fill();
    }
}

canvas.addEventListener("mouseup", up);
canvas.addEventListener("touchend", up);
canvas.addEventListener("touchcancel", up);

function drawCurrentPos(x: number, y: number) {
    if (!ctx) {
        throw new Error("Canvas context could not be initialized.");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x - 1, y - 1, thumbSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`;
    ctx.fill();
}

function getCoords(e: MouseEvent | TouchEvent, rect: DOMRect) {
    let x: number;
    let y: number
    if (e instanceof MouseEvent) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    } else {
        x = e.changedTouches[0].clientX - rect.left;
        y = e.changedTouches[0].clientY - rect.top;
    }
    return {x, y};
}

for (let i = 1; i <= 4; i++) {
    if (isMobile) {
        document.getElementById("neoCaptcha-guess-button-" + i)?.addEventListener("touchstart", down);
        document.getElementById("neoCaptcha-guess-button-" + i)?.addEventListener("touchend", e => {
            up(e);
            submitGuess(i);
        });
    } else {
        document.getElementById("neoCaptcha-guess-button-" + i)?.addEventListener("mousedown", down);
        document.getElementById("neoCaptcha-guess-button-" + i)?.addEventListener("mouseup", e => {
            up(e);
            submitGuess(i);
        });
    }
}

function submitGuess(id: number) {
    let src = (document.getElementById("neoCaptcha-guess-icon-" + id) as HTMLImageElement).src;
    let split = src.split("/");
    src = split[split.length - 1].split(".")[0];
    activity.push({action: "guess", tag: src, time: Date.now() - startTime});

    submitCaptcha();
}

submitBtn?.addEventListener("click", submitCaptcha);

async function submitCaptcha() {
    if (!enabled) return;

    enabled = false;
    submitBtn.disabled = true;
    for (let i = 1; i <= 4; i++) {
        (document.getElementById("neoCaptcha-guess-button-" + i) as HTMLButtonElement).disabled = true;
    }

    if (!ctx || !bar) {
        throw new Error("Canvas context could not be initialized.");
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bar.fillStyle = "rgba(255, 255, 255, 0.8)";
    bar.fillRect(0, 0, timeCanvas.width, timeCanvas.height);

    if (endTime === 0) endTime = Date.now();
    const duration = endTime - startTime;
    activity.push({action: "end", time: duration});
    const payload = {
        challenge,
        hmac,
        activity
    };

    const response = await fetch(url + "/validate-captcha", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    let valid = false;
    let retry = false;
    try {
        const result = await response.json();
        valid = result.valid;
        retry = result.retry;
        if (retry) {
            challenge = result.challenge;
            hmac = result.hmac;
        }
    } catch (e) {
    }
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const lineWidth = canvas.width * 0.1;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    const size = canvas.width / 3;
    if (valid) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.02)";
        ctx.lineWidth = lineWidth + 20;
        let sx = x + lineWidth / 8;
        let sy = y + lineWidth / 4;
        drawCheckMark(size, sx, sy);
        ctx.lineWidth = lineWidth + 17;
        drawCheckMark(size, sx, sy);
        ctx.lineWidth = lineWidth + 14;
        drawCheckMark(size, sx, sy);
        ctx.lineWidth = lineWidth + 11;
        drawCheckMark(size, sx, sy);
        ctx.lineWidth = lineWidth + 8;
        drawCheckMark(size, sx, sy);
        ctx.strokeStyle = "rgba(0, 160, 0)";
        ctx.lineWidth = lineWidth;
        drawCheckMark(size, x, y);
    } else if (retry) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.02)";
        ctx.lineWidth = lineWidth + 20;
        let sx = x + lineWidth / 8;
        let sy = y + lineWidth / 4;
        drawDots(size, sx, sy);
        ctx.lineWidth = lineWidth + 17;
        drawDots(size, sx, sy);
        ctx.lineWidth = lineWidth + 14;
        drawDots(size, sx, sy);
        ctx.lineWidth = lineWidth + 11;
        drawDots(size, sx, sy);
        ctx.lineWidth = lineWidth + 8;
        drawDots(size, sx, sy);
        ctx.strokeStyle = "rgba(0, 80, 255)";
        ctx.lineWidth = lineWidth;
        drawDots(size, x, y);
    } else {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.02)";
        ctx.lineWidth = lineWidth + 20;
        let sx = x + lineWidth / 8;
        let sy = y + lineWidth / 4;
        drawCross(size, sx, sy);
        ctx.lineWidth = lineWidth + 17;
        drawCross(size, sx, sy);
        ctx.lineWidth = lineWidth + 14;
        drawCross(size, sx, sy);
        ctx.lineWidth = lineWidth + 11;
        drawCross(size, sx, sy);
        ctx.lineWidth = lineWidth + 8;
        drawCross(size, sx, sy);
        ctx.strokeStyle = "rgba(255, 0, 0)";
        ctx.lineWidth = lineWidth;
        drawCross(size, x, y);
    }

    if (valid && callbacks && callbacks.onSuccess) {
        callbacks.onSuccess();
    } else if (retry) {
        setTimeout(() => {
            reset();
            getCaptcha();
        }, 500);
    } else if (callbacks && callbacks.onFailure) {
        callbacks.onFailure();
    }
}

function drawCheckMark(size: number, x: number, y: number) {
    if (!ctx) {
        throw new Error("Canvas context could not be initialized.");
    }
    const halfSize = size / 2;
    ctx.beginPath();
    ctx.moveTo(x - halfSize / 2, y + halfSize);
    ctx.lineTo(x - halfSize - halfSize / 2, y);
    ctx.moveTo(x - halfSize / 2, y + halfSize);
    ctx.lineTo(x + size - halfSize / 2, y - halfSize);
    ctx.stroke();
}

function drawCross(size: number, x: number, y: number) {
    if (!ctx) {
        throw new Error("Canvas context could not be initialized.");
    }
    const halfSize = size / 2;
    ctx.beginPath();
    ctx.moveTo(x - halfSize, y - halfSize);
    ctx.lineTo(x + halfSize, y + halfSize);
    ctx.moveTo(x + halfSize, y - halfSize);
    ctx.lineTo(x - halfSize, y + halfSize);
    ctx.stroke();
}

function drawDots(size: number, x: number, y: number) {
    if (!ctx) {
        throw new Error("Canvas context could not be initialized.");
    }
    const halfSize = size / 2;
    ctx.beginPath();
    ctx.moveTo(x - halfSize, y);
    ctx.lineTo(x - halfSize + 1, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 1, y);
    ctx.moveTo(x + halfSize, y);
    ctx.lineTo(x + halfSize + 1, y);
    ctx.stroke();
}

function reset() {
    drawing = false;
    activity = [];
    startTime = 0;
    endTime = 0;
    idleStartTime = 0;
    beepStartTime = 0;
    enabled = false;
    submitBtn.disabled = true;
    ignoreNext = false;
    imgSrc = "";
    pointSize = 0;
    thumbSize = 0;
    const wrapper = document.getElementById("neoCaptcha-wrapper") as HTMLDivElement;
    wrapper.style.display = "none";
    startBtn.style.display = "block";
    if (bar) {
        bar.clearRect(0, 0, timeCanvas.width, timeCanvas.height);
    }
    if (isMobile) {
        overlayBg.style.background = mobileRed;
        signalIcon.innerText = "do_not_touch";
    }
}
