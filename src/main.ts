const config = {
    showHowTo: true,
    expandHowTo: false,
    variant: 'ns',
    theme: 'dark',
    lang: 'de',
    minDifficulty: 'easy',
    visualOnDesktop: false,
};
const callbacks = {
    onSuccess: () => {
    },
    onFailure: () => {
    },
    onError: (e: any) => {
        console.log(e);
    }
}

declare const __VERSION__: string;

const VERSION = __VERSION__;
const url = "https://neo-captcha.com/api/v1"; // "http://localhost:8080/api"

const variant = config?.variant || "ns";
const variantNs = variant === 'ns' || variant === 'ncs';
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const theme = (config?.theme === 'dark' || config?.theme === 'light') ? config.theme : (prefersDark ? 'dark' : 'light');
let userLang = (navigator.language || navigator.languages[0]).split("-")[0];
userLang = config?.lang || userLang;
const minDifficulty = config?.minDifficulty || "easy";
const showHowTo = config?.showHowTo || false;
let howToExpanded = config?.expandHowTo || false;
const visualOnDesktop = config?.visualOnDesktop || false;

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
    step_2_desktop: string,
    step_2_motion: string,
    step_3: string,
    mode_1: string,
    mode_1_text: string,
    mode_2: string,
    mode_2_text: string,
    too_many_requests: string,
}> = {
    en: {
        howto: '?   How-To:',
        step_1: 'Hit ▶ Play',
        step_2: `Tap when <b><span style="color: rgba(0, 160, 0)">GREEN</span>!<b/>`,
        step_2_desktop: `Click after the <b>sound cue!</b>`,
        step_2_motion: `<b>Shake</b> your phone!`,
        step_3: '<b>Solve the CAPTCHA</b>',
        mode_1: 'Implied square',
        mode_1_text: 'Mark the missing corner!',
        mode_2: 'Neon Shape',
        mode_2_text: 'Select the shape you see!',
        too_many_requests: 'Please wait a minute before trying again.',
    },
    de: {
        howto: '?   Wie man\'s macht:',
        step_1: 'Drücke ▶ Start',
        step_2: `Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>`,
        step_2_desktop: 'Klicke beim <b>Signalton!</b>',
        step_2_motion: '<b>Schüttel</b> dein Handy!',
        step_3: '<b>Löse das CAPTCHA!</b>',
        mode_1: 'Angedeutetes Viereck',
        mode_1_text: 'Markiere die fehlende Ecke!',
        mode_2: 'Neon-Form',
        mode_2_text: 'Welche Form siehst du?',
        too_many_requests: 'Bitte warte eine Minute, bevor du es erneut versuchst.',
    },
};
document.getElementById("neoCaptcha-howToTitle")!.innerHTML = (translations[userLang] || translations['en']).howto;
document.getElementById("neoCaptcha-step_1")!.innerHTML = (translations[userLang] || translations['en']).step_1;
if (isMobile || visualOnDesktop) {
    document.getElementById("neoCaptcha-step_2")!.innerHTML = (translations[userLang] || translations['en']).step_2_motion;
    document.getElementById("neoCaptcha-signalText")!.innerHTML = (translations[userLang] || translations['en']).step_2_motion;
} else {
    document.getElementById("neoCaptcha-step_2")!.innerHTML = (translations[userLang] || translations['en']).step_2_desktop;
    document.getElementById("neoCaptcha-signalText")!.innerHTML = (translations[userLang] || translations['en']).step_2_desktop;
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
let imgSrc: string = "";
let pointSize: number = 0;
let thumbSize: number = 0;
let challenge: string | undefined = undefined;
let hmac: string | undefined = undefined;
let suspense: number = 0;

// stuff for shake
const motionThrottle = 50;
const minAccs = 500 / motionThrottle; // half a second of data points
const alpha = 0.6; // higher for more smoothing
let lastMotionTime = 0;
let smoothX = 0, smoothY = 0, smoothZ = 0;
let lastAcc: {
    mag: number, move: number, x: number, y: number, z: number,
    dmag: number, dx: number, dy: number, dz: number, time: number
} | undefined = undefined;
let accs: any[] = [];
let motionEnabled = false;
let fillPercent = 0;

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
if (!(isMobile || visualOnDesktop)) {
    overlayBg.style.background = "#000";
} else {
    overlayBg.style.background = mobileRed;
}
const signalIcon = document.getElementById("neoCaptcha-signalIcon") as HTMLSpanElement;
signalIcon.innerText = (isMobile || visualOnDesktop) ? "do_not_touch" : "hearing";

startBtn.addEventListener("click", requestMotion);

let motionAllowed = isMobile;

function requestMotion() {
    if (isMobile && window.DeviceMotionEvent) {
        setShakeEnabled(true);
        if ('requestPermission' in DeviceMotionEvent) {
            (DeviceMotionEvent as any).requestPermission()
                .then((response: any) => {
                    if (response === 'granted') {
                        log("motion permission granted");
                        motionAllowed = true;
                        window.addEventListener('devicemotion', handleMotion);
                    } else {
                        log("motion permission denied");
                        motionAllowed = false;
                    }
                    getCaptcha();
                })
                .catch((e: any) => {
                    log("motion permission error");
                    error(e);
                    motionAllowed = false;
                    getCaptcha();
                });
        } else {
            log("motion allowed by default");
            motionAllowed = true;
            window.addEventListener('devicemotion', handleMotion);
            getCaptcha();
        }
    } else {
        log("no motion available");
        motionAllowed = false;
        getCaptcha();
    }
}

async function getCaptcha() {
    log("version: " + VERSION);
    log("userAgent: " + navigator.userAgent);

    if (isMobile) {
        setShakeEnabled(motionAllowed);
    }

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
    const response = await call(fetch(url + "/generate-captcha", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    }));
    if (!response?.ok) return;
    const result = await response.json();
    if (result.img) {
        const image = document.getElementById("neoCaptcha-image") as HTMLImageElement;
        image.style.display = "inline-block";
        overlay.style.display = "flex";
        imgSrc = `data:image/png;base64,${result.img}`;
        color = result.color;
        challenge = result.challenge;
        hmac = result.hmac;
        totalTime = result.totalTime || totalTime;
        suspense = result.suspense;
        const container = document.getElementById("neoCaptcha-container") as HTMLDivElement;
        container.style.height = "18rem";
        if (result.variant === 'ns') {
            for (let i = 1; i <= 4; i++) {
                (document.getElementById("neoCaptcha-guess-icon-" + i) as HTMLImageElement)
                    .src = `https://neo-captcha.com/assets/icon_shape_${result.icons[i - 1]}.png`;
            }
        }

        canvas.style.width = "18rem";
        canvas.style.height = "18rem";
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

        log("isMobile", isMobile, "motionAllowed", motionAllowed);
        if (isMobile && motionAllowed) {
            setTimeout(() => beepIfNoMotion(), 500);
        } else {
            log("beep timeout, no motion available");
            setTimeout(() => beep(), suspense);
        }
    }
}

function setShakeEnabled(enabled: boolean) {
    if (isMobile) {
        if (enabled) {
            overlayBg.style.background = mobileRed;
            signalIcon.innerText = "edgesensor_low";
            signalIcon.style.animation = "shake 0.4s ease-in-out infinite";
            document.getElementById("neoCaptcha-step_2")!.innerHTML = (translations[userLang] || translations['en']).step_2_motion;
            document.getElementById("neoCaptcha-signalText")!.innerHTML = (translations[userLang] || translations['en']).step_2_motion;
            overlay.removeEventListener("pointerdown", react);
            overlay.removeEventListener("pointermove", consumeMove);
            overlay.removeEventListener("pointerup", start);
            fillPercent = 0;
            requestAnimationFrame(drawBgFill);
        } else {
            overlayBg.style.background = mobileRed;
            signalIcon.innerText = "do_not_touch";
            signalIcon.style.animation = "none";
            document.getElementById("neoCaptcha-step_2")!.innerHTML = (translations[userLang] || translations['en']).step_2;
            document.getElementById("neoCaptcha-signalText")!.innerHTML = (translations[userLang] || translations['en']).step_2;
            overlay.addEventListener("pointerdown", react, {passive: false});
            overlay.addEventListener("pointermove", consumeMove, {passive: false});
            overlay.addEventListener("pointerup", start);
        }
    }
}

async function handleMotion(event: DeviceMotionEvent) {
    if (!motionEnabled) log("handleMotion");
    if (!(event instanceof DeviceMotionEvent)) return;

    // throttle
    const now = Date.now();
    if (lastMotionTime > 0 && now - lastMotionTime < motionThrottle) return;
    if (!motionEnabled) log("there is motion");
    lastMotionTime = now;

    const acc = event.accelerationIncludingGravity;
    if (acc && acc.x !== null && acc.y !== null && acc.z !== null) {
        if (!motionEnabled) {
            motionEnabled = true;
            setShakeEnabled(true);
        }
        // simple low-pass filter (weighted average)
        smoothX = alpha * smoothX + (1 - alpha) * acc.x;
        smoothY = alpha * smoothY + (1 - alpha) * acc.y;
        smoothZ = alpha * smoothZ + (1 - alpha) * acc.z;
        let mag = Math.sqrt(smoothX * smoothX + smoothY * smoothY + smoothZ * smoothZ);
        let move = Math.sqrt(smoothX * smoothX + smoothY * smoothY);
        if (lastAcc) {
            let dmag = mag - lastAcc.mag;
            let dx = smoothX - lastAcc.x;
            let dy = smoothY - lastAcc.y;
            let dz = smoothZ - lastAcc.z;
            lastAcc = {
                mag: mag,
                move: move,
                x: smoothX,
                y: smoothY,
                z: smoothZ,
                dmag: dmag,
                dx: dx,
                dy: dy,
                dz: dz,
                time: now - idleStartTime
            };
            accs.push(lastAcc);
            if (accs.length > minAccs) {
                if (beepStartTime <= 0) beepStartTime = Date.now();
                if (evaluateShake()) {
                    requestAnimationFrame(() => {
                        drawBgFill();
                        overlayBg.style.background = mobileGreen;
                        signalIcon.style.animation = "none";
                        signalIcon.innerText = "check";
                        new Promise(() => setTimeout(() => {
                            react();
                            start();
                        }, motionThrottle * 2));
                    });
                } else {
                    requestAnimationFrame(() => {
                        drawBgFill();
                        overlayBg.style.background = mobileRed;
                    });
                }
            }
        } else {
            lastAcc = {
                mag: mag,
                move: move,
                x: smoothX,
                y: smoothY,
                z: smoothZ,
                dmag: 0,
                dx: 0,
                dy: 0,
                dz: 0,
                time: now - idleStartTime
            };
        }
    } else {
        setShakeEnabled(false);
    }
}

function drawBgFill() {
    let bgFill = document.getElementById("neoCaptcha-overlayBgFill");
    let fill = fillPercent / 100 * 18;
    bgFill!.style.height = fill + "rem";
    bgFill!.style.background = mobileGreen;
}

function evaluateShake(logs: boolean = false) {
    const g = 9;
    const minMag = 7;
    const minDMove = 4;
    const minDelta = 2;

    let dir = 0;
    let consecutive = 0;
    let sumMag = 0;
    let minMove = 99;
    let maxMove = -99;
    let percent = 0;
    let deltaIdleCount = 0;

    function resetShakeVals() {
        dir = 0;
        consecutive = 0;
        sumMag = 0;
        minMove = 99;
        maxMove = -99;
    }

    let shakes = 0;
    let i = 0;
    let last: any;
    let maxLen = 5000 / motionThrottle; // 5 seconds of data points
    accs = accs.slice(Math.max(0, accs.length - maxLen), accs.length);
    for (const acc of accs) {
        i++;
        if (!last) {
            last = acc;
            continue;
        }

        // detect movement
        const delta = Math.abs(acc.move - last.move);
        if (delta < minDelta) deltaIdleCount++;
        else deltaIdleCount = 0;
        let directionChanged = false;
        if (Math.abs(acc.x) > 2 && deltaIdleCount < 5) { // number depends on motionThrottle
            if (acc.x < last.x) {
                // move left
                if (logs) log(i, "<left", "x:", acc.x, "move:", acc.move, "mag:", acc.mag);

                if (dir === 1) directionChanged = true
                else consecutive++;
                dir = -1;
            } else {
                // move right
                if (logs) log(i, "right>", "x:", acc.x, "move:", acc.move, "mag:", acc.mag);

                if (dir === -1) directionChanged = true
                else consecutive++;
                dir = 1;
            }
            percent += Math.max(acc.x - 1, acc.move - 2);
            sumMag += acc.mag;
            minMove = Math.min(minMove, Math.sign(acc.x) * acc.move);
            maxMove = Math.max(maxMove, Math.sign(acc.x) * acc.move);
        } else if (acc.mag > g) {
            if (logs) log(i, "idle");
            resetShakeVals();
            shakes = 0;
            percent = Math.max(0, percent - Math.max(2, deltaIdleCount - 2));
        }
        // detect shake
        if (directionChanged) {
            let validMoveLength = 2 <= consecutive && consecutive <= 5; // numbers depend on motionThrottle
            let avgMag = sumMag / consecutive;
            let dMove = Math.abs(maxMove - minMove);
            if (validMoveLength) percent += 1;
            if (avgMag > minMag) percent += 1;
            if (dMove > minDMove) percent += 1;
            if (validMoveLength && avgMag > minMag && dMove > minDMove) {
                shakes++;
                percent += 10;
            }
            resetShakeVals();
        }

        last = acc;
        if (shakes < 1) percent = Math.min(percent, 60);
        if (percent >= 100) break;
    }
    percent = Math.max(0, Math.min(100, percent));
    fillPercent = percent;
    if (shakes < 1 && dir === 0) {
        // idle
        beepStartTime = Date.now();
    }
    return fillPercent == 100;
}

function beepIfNoMotion() {
    if (!motionEnabled || lastMotionTime <= 0) {
        log("beepIfNoMotion", "motionEnabled:", motionEnabled, "lastMotionTime:", lastMotionTime);
        setShakeEnabled(false);
        setTimeout(() => beep(), suspense - 500);
    } else {
        log("no beep", "motionEnabled:", motionEnabled, "lastMotionTime:", lastMotionTime);
    }
}

function beep() {
    if (isMobile || visualOnDesktop) {
        overlayBg.style.background = mobileGreen;
        signalIcon.innerText = "touch_app";
        signalIcon.style.animation = "blinker 0.5s ease-in-out infinite";

        beepStartTime = Date.now();
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

    beepStartTime = Date.now();
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

let reaction: any;

function react() {
    if (startTime == 0) {
        let time: number;
        if (beepStartTime <= 0) {
            time = 0;
        } else {
            time = Date.now() - beepStartTime;
        }
        reaction = {action: "react", time: time};
    }
}

overlay.addEventListener("pointerdown", react, {passive: false});
overlay.addEventListener("pointermove", consumeMove, {passive: false});

function consumeMove() {
    if (beepStartTime <= 0) {
        reaction = undefined;
    }
}

function start() {
    if (beepStartTime <= 0) {
        reaction = {action: "react", time: -1};
        beepStartTime = 1;
    }
    if (reaction && reaction.time === 0) return;

    if (beepStartTime > 0 && startTime == 0 && reaction) {
        if (lastMotionTime > 0) {
            window.removeEventListener('devicemotion', handleMotion);
            for (const acc of accs) {
                let act: any = Object.assign({}, acc);
                act.action = "motion";
                activity.push(act);
            }
            // evaluateShake(true);
        }

        activity.push(reaction);
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

        if (variantNs) {
            for (let i = 1; i <= 4; i++) {
                (document.getElementById("neoCaptcha-guess-button-" + i) as HTMLButtonElement).disabled = false;
            }
        }
    }
}

overlay.addEventListener("pointerup", start);

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
        log("Time's up!");
        endTime = startTime + totalTime;
        submitCaptcha();
    } else {
        bar.fillStyle = "rgba(255, 255, 255, 0.8)";
        bar.fillRect(0, 0, timeCanvas.width, timeCanvas.height);
    }
}

function down(e: MouseEvent | TouchEvent) {
    if (interactive) e.preventDefault();

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
    canvas!.style.touchAction = "none";
    canvas.addEventListener("pointerdown", down, {passive: false});
} else {
    canvas!.style.touchAction = "auto";
    canvas.addEventListener("pointerdown", down);
}

function move(e: MouseEvent | TouchEvent) {
    if (interactive) e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    let {x, y} = getCoords(e, rect);
    if (startTime > 0) {
        activity.push({action: "move", enabled: enabled, drawing: drawing, x: x, y: y, time: Date.now() - startTime});
    }

    if (enabled && drawing) {
        drawCurrentPos(x, y);
    }
}

canvas.addEventListener("pointermove", move, {passive: false});

function up(e: MouseEvent | TouchEvent) {
    if (interactive) e.preventDefault();
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

canvas.addEventListener("pointerup", up);
canvas.addEventListener("pointercancel", up);

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
    document.getElementById("neoCaptcha-guess-button-" + i)?.addEventListener("pointerdown", down);
    document.getElementById("neoCaptcha-guess-button-" + i)?.addEventListener("pointerup", e => {
        up(e);
        submitGuess(i);
    });
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
        activity,
        mobile: isMobile,
        version: VERSION,
        motionThrottle
    };

    const response = await call(fetch(url + "/validate-captcha", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    }));
    if (!response?.ok) return;

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

    if (valid && callbacks?.onSuccess) {
        callbacks.onSuccess();
    } else if (retry) {
        setTimeout(() => {
            reset();
            requestMotion();
        }, 500);
    } else if (callbacks?.onFailure) {
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
    imgSrc = "";
    pointSize = 0;
    thumbSize = 0;
    const wrapper = document.getElementById("neoCaptcha-wrapper") as HTMLDivElement;
    wrapper.style.display = "none";
    startBtn.style.display = "block";
    if (bar) {
        bar.clearRect(0, 0, timeCanvas.width, timeCanvas.height);
    }
    if (isMobile || visualOnDesktop) {
        setShakeEnabled(true);
        if (!visualOnDesktop && motionEnabled) {
            lastMotionTime = 0;
            smoothX = 0;
            smoothY = 0;
            smoothZ = 0;
            lastAcc = undefined;
            accs = [];
        }
    }
}

async function call(asyncFun: Promise<Response>): Promise<Response | undefined> {
    let response: Response | undefined;
    try {
        response = await asyncFun;
        if (!response.ok) {
            if (response.status === 429) {
                document.getElementById("neoCaptcha-warnMessage")!.innerHTML = (translations[userLang] || translations['en']).too_many_requests;
                document.getElementById("neoCaptcha-warnMessage")!.style.display = "block";
                document.getElementById("neoCaptcha-wrapper")!.style.display = "none";
            } else {
                alert("Error " + response.status + (response.statusText ? (": " + response.statusText) : ""));
                if (callbacks?.onError) {
                    callbacks.onError({status: response.status, message: response.statusText});
                }
            }
        }
    } catch (e) {
        error(e);
        if (callbacks?.onError) {
            callbacks.onError(e);
        }
    }
    return response;
}

function log(message?: any, ...data: any[]) {
    addLog(" > ", message, data);
    console.log(message, data);
}

function error(message?: any, ...data: any[]) {
    addLog("!!! ERROR: ", message, data);
    console.error(message, data);
}

function addLog(prefix: string, message: any, data: any[]) {
    let logs = document.getElementById("testLogs");
    if (logs) {
        let newLog: string = JSON.stringify(message) + " ";
        if (data) newLog += data.map((value) => JSON.stringify(value)).join(" ");
        let textArea = (logs as HTMLTextAreaElement);
        textArea.value += prefix + newLog + "\n";
        textArea.scrollTop = textArea.scrollHeight;
    }
}
