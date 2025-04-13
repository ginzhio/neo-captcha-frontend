declare const __VERSION__: string;

const widgetStyles = `
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
`;

function injectStyles() {
    if (document.getElementById("neo-captcha-style")) return; // nur 1x

    const style = document.createElement("style");
    style.id = "neo-captcha-style";
    style.textContent = widgetStyles;
    document.head.appendChild(style);
}

function injectMaterialIcons() {
    if (document.getElementById("neo-captcha-material-icons")) return;

    const link = document.createElement("link");
    link.id = "neo-captcha-material-icons";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";

    document.head.appendChild(link);
}

// @ts-ignore
export function renderCaptcha(target: HTMLElement) {
    injectMaterialIcons();
    injectStyles();
    target.innerHTML = `
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
    `;

    const VERSION = __VERSION__;
    const url = "https://neo-captcha.com/api/v1";

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

    let variant: string = "ns";
    let variantNs = variant === 'ns' || variant === 'ncs';
    let interactive = false;

    const theme = 'dark';
    document.getElementById("neoCaptchaRoot")!.classList.add(`neo-captcha-theme-${theme}`);
    (document.getElementById("neoCaptchaWidgetLogo") as HTMLImageElement).src = theme === 'dark'
        ? 'https://neo-captcha.com/assets/logo-dark.png'
        : 'https://neo-captcha.com/assets/logo.png';

    const mobileRed = "#f406";
    const mobileGreen = "#0f4a";

    let userLang = (navigator.language || navigator.languages[0]).split("-")[0];
    console.log("lang: " + userLang);
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
        settings: string,
        settings_variant: string,
        settings_difficulty: string,
        opt_ns: string,
        opt_iq: string,
        opt_easy: string,
        opt_medium: string,
        opt_hard: string,
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
            settings: 'Settings',
            settings_variant: 'Variant:',
            settings_difficulty: 'Difficulty:',
            opt_ns: 'Neon Shape',
            opt_iq: 'Implied Square',
            opt_easy: 'Easy',
            opt_medium: 'Medium',
            opt_hard: 'Hard',
        },
        de: {
            howto: '?   Wie man\'s macht:',
            step_1: 'Drücke ▶ Start',
            step_2: `Tippe bei <b><span style="color: rgba(0, 160, 0)">GRÜN</span>!<b/>`,
            step_2_s: 'Klicke beim <b>Signalton!</b>',
            step_3: '<b>Löse das CAPTCHA!</b>',
            mode_1: 'Angedeutetes Viereck:',
            mode_1_text: 'Markiere die fehlende Ecke!',
            mode_2: 'Neon-Form:',
            mode_2_text: 'Welche Form siehst du?',
            settings: 'Einstellungen',
            settings_variant: 'Variante:',
            settings_difficulty: 'Schwierigkeit:',
            opt_ns: 'Neon-Form',
            opt_iq: 'Angedeutetes Viereck',
            opt_easy: 'Einfach',
            opt_medium: 'Mittel',
            opt_hard: 'Schwer',
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
    document.getElementById("neoCaptcha-settings")!.innerHTML = (translations[userLang] || translations['en']).settings;
    document.getElementById("neoCaptcha-labelVari")!.innerHTML = (translations[userLang] || translations['en']).settings_variant;
    document.getElementById("neoCaptcha-labelDiff")!.innerHTML = (translations[userLang] || translations['en']).settings_difficulty;
    document.getElementById("neoCaptcha-optNs")!.innerHTML = (translations[userLang] || translations['en']).opt_ns;
    document.getElementById("neoCaptcha-optIq")!.innerHTML = (translations[userLang] || translations['en']).opt_iq;
    document.getElementById("neoCaptcha-optEasy")!.innerHTML = (translations[userLang] || translations['en']).opt_easy;
    document.getElementById("neoCaptcha-optMedium")!.innerHTML = (translations[userLang] || translations['en']).opt_medium;
    document.getElementById("neoCaptcha-optHard")!.innerHTML = (translations[userLang] || translations['en']).opt_hard;

    let minDifficulty = "easy";

    let selectVari = document.getElementById("neoCaptcha-selectVari") as HTMLSelectElement;
    selectVari!.addEventListener("change", () => {
        if (selectVari.selectedIndex == 0) {
            variant = 'ns';
        } else {
            variant = 'iq';
        }
        variantNs = variant === 'ns';
        restart();
    })

    let selectDiff = document.getElementById("neoCaptcha-selectDiff") as HTMLSelectElement;
    selectDiff!.addEventListener("change", () => {
        if (selectDiff.selectedIndex == 0) {
            minDifficulty = 'easy';
        } else if (selectDiff.selectedIndex == 1) {
            minDifficulty = 'medium';
        } else {
            minDifficulty = 'hard';
        }
    })

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

    let howToShown = true;
    let howToExpanded = true;
    if (howToShown) {
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

    reset();

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

    function move(e: MouseEvent | TouchEvent) {
        if (interactive) e.preventDefault();
        if (ignoreNext) return;

        const rect = canvas.getBoundingClientRect();
        let {x, y} = getCoords(e, rect);
        if (startTime > 0) {
            activity.push({
                action: "move",
                enabled: enabled,
                drawing: drawing,
                x: x,
                y: y,
                time: Date.now() - startTime
            });
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

        if (valid) {
            console.log("Yippie!");
            prepareRestart();
        } else if (retry) {
            setTimeout(() => {
                reset();
                getCaptcha();
            }, 500);
        } else {
            console.log("Womp, womp");
            prepareRestart();
        }
    }

    function prepareRestart() {
        document.getElementById("neoCaptcha-guess")!.style.display = "none";
        document.getElementById("neoCaptcha-submit")!.style.display = "block";
        submitBtn.disabled = false;
        submitBtn.removeEventListener("click", submitCaptcha);
        submitBtn.addEventListener("click", restart);
        let submitIcon = document.getElementById("neoCaptcha-submitIcon") as HTMLSpanElement;
        submitIcon.innerText = "replay";
    }

    function restart() {
        reset();
        challenge = undefined;
        hmac = undefined;
        submitBtn.removeEventListener("click", restart);
        submitBtn.addEventListener("click", submitCaptcha);
        let submitIcon = document.getElementById("neoCaptcha-submitIcon") as HTMLSpanElement;
        submitIcon.innerText = "check";

        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        const image = document.getElementById("neoCaptcha-image") as HTMLImageElement;
        image.style.display = "none";
        overlay.style.display = "none";
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
        document.getElementById("neoCaptcha-guess")!.style.display = "grid";
        document.getElementById("neoCaptcha-submit")!.style.display = "block";
        if (variantNs) {
            document.getElementById("neoCaptcha-submit")!.style.display = "none";
            canvas!.style.cursor = "auto";
            canvas!.style.touchAction = "auto";
            interactive = false;
            (document.getElementById("neoCaptcha-modeIcon") as HTMLImageElement).src = theme === 'dark'
                ? 'https://neo-captcha.com/assets/icon_see_shape_dark.png'
                : 'https://neo-captcha.com/assets/icon_see_shape.png';
            document.getElementById("neoCaptcha-mode")!.innerHTML = (translations[userLang] || translations['en']).mode_2;
            document.getElementById("neoCaptcha-modeText")!.innerHTML = (translations[userLang] || translations['en']).mode_2_text;
        } else {
            document.getElementById("neoCaptcha-guess")!.style.display = "none";
            canvas!.style.cursor = "crosshair";
            canvas!.style.touchAction = "none";
            interactive = true;
            (document.getElementById("neoCaptcha-modeIcon") as HTMLImageElement).src = theme === 'dark'
                ? 'https://neo-captcha.com/assets/icon_find_corner_dark.png'
                : 'https://neo-captcha.com/assets/icon_find_corner.png';
            document.getElementById("neoCaptcha-mode")!.innerHTML = (translations[userLang] || translations['en']).mode_1;
            document.getElementById("neoCaptcha-modeText")!.innerHTML = (translations[userLang] || translations['en']).mode_1_text;
        }

        if (interactive) {
            canvas.addEventListener("mousedown", down);
            canvas.addEventListener("touchstart", down, {passive: false});
        } else {
            canvas.removeEventListener("mousedown", down);
            canvas.removeEventListener("touchstart", down);
        }
    }

}

(window as any).NeoCAPTCHA = {
    render: renderCaptcha
};