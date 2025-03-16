declare const __VERSION__: string;

const VERSION = __VERSION__;
const url = "http://localhost:8080/api";

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const overlay = document.getElementById("startOverlay") as HTMLDivElement;
const submitBtn = document.getElementById("submit") as HTMLButtonElement;
const startBtn = document.getElementById("start") as HTMLButtonElement;
const canvas = document.getElementById("captchaCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const timeCanvas = document.getElementById("timeCanvas") as HTMLCanvasElement;
const bar = timeCanvas.getContext("2d");
if (!ctx || !bar) {
    throw new Error("Canvas context could not be initialized.");
}

const totalTime = 6000;
let color: number[] = [255, 0, 0];

let drawing = false;
let activity: any[] = [];
let startTime: number = 0;
let endTime: number = 0;
let idleStartTime: number = 0;
let beepStartTime: number = 0;
let enabled = false;
let ignoreNext = false;
let imgSrc: string = "";
let pointSize: number = 0;
let thumbSize: number = 0;
let id: BigInt | undefined = undefined;

let howToShown = true;
if (howToShown) {
    let howToExpanded = true;
    const howToCaption = document.getElementById("howToCaption") as HTMLDivElement;
    const howToText = document.getElementById("howToText") as HTMLTableElement;
    const howToIcon = document.getElementById("howToIcon") as HTMLSpanElement;
    howToText.style.display = howToExpanded ? "block" : "none";
    howToIcon.innerText = howToExpanded ? "expand_less" : "expand_more";
    howToCaption.addEventListener("click", () => {
        howToExpanded = !howToExpanded;
        howToText.style.display = howToExpanded ? "block" : "none";
        howToIcon.innerText = howToExpanded ? "expand_less" : "expand_more";
    });
} else {
    const howTo = document.getElementById("howTo") as HTMLDivElement;
    howTo.style.display = "none";
}

const overlayBg = document.getElementById("overlayBg") as HTMLDivElement;
if (!isMobile) {
    overlayBg.style.display = "none";
}
const signalIcon = document.getElementById("signalIcon") as HTMLSpanElement;
signalIcon.innerText = isMobile ? "visibility" : "hearing";

startBtn.addEventListener("click", getCaptcha);

const minDifficulty = "hard";

async function getCaptcha() {
    console.log("version: " + VERSION);
    console.log("userAgent: " + navigator.userAgent);

    const wrapper = document.getElementById("wrapper") as HTMLDivElement;
    wrapper.style.display = "flex";
    startBtn.style.display = "none";

    const payload: any = {
        id: id ? id.toString() : undefined,
        userAgent: navigator.userAgent,
        mobile: isMobile,
        version: VERSION,
        minDifficulty: minDifficulty,
    };
    const response = await fetch(url + "/generate-captcha", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    const result = await response.json();
    console.log(result);
    if (result.img) {
        const howToText = document.getElementById("howToText") as HTMLTableElement;
        if (howToShown && howToText.style.display == "block") {
            const howToText = document.getElementById("howToText") as HTMLTableElement;
            const howToIcon = document.getElementById("howToIcon") as HTMLSpanElement;
            howToText.style.display = "none";
            howToIcon.innerText = "expand_more";
        }

        const bg = document.getElementById("bg") as HTMLImageElement;
        bg.style.display = "inline-block";
        overlay.style.display = "flex";
        imgSrc = `data:image/png;base64,${result.img}`;
        pointSize = result.pointSize;
        thumbSize = result.thumbSize;
        color = result.color;
        id = BigInt(result.id);
        const container = document.getElementById("container") as HTMLDivElement;
        container.style.height = "20em";

        canvas.style.width = "20em";
        canvas.style.height = "20em";
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.width;
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
        overlayBg.style.background = "#0f08";
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
    }
}

overlay.addEventListener("mousedown", react);
overlay.addEventListener("touchstart", react, {passive: false});

function start() {
    if (beepStartTime > 0 && startTime == 0) {
        activity.push({action: "start", time: Date.now() - idleStartTime});

        enabled = true;
        const bg = document.getElementById("bg") as HTMLImageElement;
        bg.src = imgSrc;
        startTimer();
        if (!ctx) {
            throw new Error("Canvas context could not be initialized.");
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        overlay.style.display = "none";
        if (isMobile) {
            ignoreNext = true;
        }
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
    e.preventDefault();
    if (ignoreNext) return;

    if (startTime > 0) {
        const rect = canvas.getBoundingClientRect();
        let {x, y} = getCoords(e, rect);
        activity.push({action: "down", enabled: enabled, x: x, y: y, time: Date.now() - startTime});

        if (enabled) {
            drawing = true;
            drawCurrentPos(x, y);
        }
    }
}

canvas.addEventListener("mousedown", down);
canvas.addEventListener("touchstart", down, {passive: false});

function move(e: MouseEvent | TouchEvent) {
    e.preventDefault();
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
    e.preventDefault();
    if (ignoreNext) {
        ignoreNext = false;
        return;
    }
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    let {x, y} = getCoords(e, rect);
    if (startTime > 0) {
        activity.push({action: "up", enabled: enabled, x: x, y: y, time: Date.now() - startTime});
    }

    if (startTime >= 0 && enabled) {
        drawing = false;
        activity.push({action: "point", x: x, y: y, time: Date.now() - startTime});
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

submitBtn?.addEventListener("click", submitCaptcha);

async function submitCaptcha() {
    if (!enabled) return;

    enabled = false;
    submitBtn.disabled = true;

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
    const payload = {id: id?.toString(), activity};

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

    if (valid && true && true) {
        console.log("Yippie!");
    } else if (retry) {
        setTimeout(() => {
            reset();
            getCaptcha();
        }, 500);
    } else if (true && true) {
        console.log("Womp womp");
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
    const wrapper = document.getElementById("wrapper") as HTMLDivElement;
    wrapper.style.display = "none";
    startBtn.style.display = "block";
    if (bar) {
        bar.clearRect(0, 0, timeCanvas.width, timeCanvas.height);
    }
    if (isMobile) {
        overlayBg.style.background = "#f008";
    }
}
