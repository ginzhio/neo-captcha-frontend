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
    width: 3.5rem;
    height: 3.5rem;
    cursor: pointer;
    padding: 0;
}

.neo-captcha-caption {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--neo-captcha-fg);
    margin: 0 0 0.2rem 0;
    padding: 0;
}

.neo-captcha-main-canvas {
    width: 20rem;
    height: 20rem;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 2;
    position: absolute;
    margin: 0;
    padding: 0;
    touch-action: none;
}

.neo-captcha-time {
    width: 20rem;
    height: 1rem;
    background: var(--neo-captcha-bg2);
    border: 1px solid var(--neo-captcha-fg);
    margin: 0;
    padding: 0;
}

.neo-captcha-image {
    width: 20rem;
    height: 20rem;
    border: 1px solid var(--neo-captcha-fg);
    z-index: 1;
    position: absolute;
    display: none;
    margin: 0;
    padding: 0;
}

.neo-captcha-container {
    width: 20rem;
    height: 20rem;
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

    background: var(--neo-captcha-button);
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 4px 0.5rem color-mix(in srgb, var(--neo-captcha-fg) 30%, transparent);

    &:disabled {
        opacity: 0.5;
        box-shadow: none;
    }

    &:hover:enabled {
        background: color-mix(in srgb, var(--neo-captcha-button) 80%, var(--neo-captcha-light));
        box-shadow: 0 6px 0.75rem color-mix(in srgb, var(--neo-captcha-fg) 30%, transparent);
        transform: translateY(-1px);
    }

    &:active:enabled {
        background: var(--neo-captcha-button);
        box-shadow: none;
    }
}

.neo-captcha-submit-button {
    width: 20rem;
    height: 4rem;
    margin: 0;
    padding: 0;
}

.neo-captcha-guess-region {
    width: 20rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.25rem;
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

.neo-captcha-overlay-bg-fill {
    width: 20em;
    height: 0;
    position: absolute;
    bottom: 0;
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
    width: 2.2rem;
    height: 2.2rem;
    margin: 0 0.75rem 0 0;
    padding: 0;
}

.neo-captcha-how-to-footer {
    font-size: 1.2rem;
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

.neo-captcha-settings-box {
    width: 16rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1rem;
    text-align: end;
    align-items: baseline;
    padding: 2rem;
    margin: 0;
}

.neo-captcha-settings-title {
    font-size: 1.5rem;
    grid-column: 1/-1;
    text-align: center;
    padding: 0 1rem 0 0;
    margin: 0;
}

.neo-captcha-select {
    height: 3rem;
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
    log("lang: " + userLang);
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
            step_2_desktop: `Click at the <b>signal tone!</b>`,
            step_2_motion: `<b>Shake</b> your phone!`,
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
            step_2_desktop: 'Klicke beim <b>Signalton!</b>',
            step_2_motion: '<b>Schüttel</b> dein Handy!',
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
        document.getElementById("neoCaptcha-signalText")!.innerHTML = (translations[userLang] || translations['en']).step_2;
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
        dmag: number, dx: number, dy: number, dz: number
    } | undefined = undefined;
    let accs: any[] = [];
    let motionEnabled = false;

    let howToShown = true;
    let howToExpanded = false;
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

    startBtn.addEventListener("click", requestMotion);

    let motionAllowed = isMobile;

    function requestMotion() {
        if (isMobile && window.DeviceMotionEvent) {
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

    reset();

    async function getCaptcha() {
        log("version: " + VERSION);
        log("userAgent: " + navigator.userAgent);

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
        // log(result);
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

            log("isMobile", isMobile, "motionAllowed", motionAllowed);
            if (isMobile && motionAllowed) {
                setTimeout(() => beepIfNoMotion(), 1000);
            } else {
                log("beep timeout, no motion available");
                setTimeout(() => beep(), suspense);
            }
        }
    }

    function setShakeEnabled(enabled: boolean) {
        motionEnabled = enabled;
        if (isMobile) {
            if (motionEnabled) {
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
                    dz: dz
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
                lastAcc = {mag: mag, move: move, x: smoothX, y: smoothY, z: smoothZ, dmag: 0, dx: 0, dy: 0, dz: 0};
            }
        }
    }

    let fillPercent = 0;

    function drawBgFill() {
        let bgFill = document.getElementById("neoCaptcha-overlayBgFill");
        let fill = fillPercent / 100 * 20;
        bgFill!.style.height = fill + "rem";
        bgFill!.style.background = mobileGreen;
    }

    function evaluateShake() {
        const g = 9;
        const minMag = 7;
        const minDMove = 4;
        const minDelta = 3;

        let dir = 0;
        let consecutive = 0;
        let sumMag = 0;
        let minMove = 99
        let maxMove = -99;
        let percent = 0;
        let deltaIdleCount = 0;

        function resetShakeVals() {
            dir = 0;
            consecutive = 0;
            sumMag = 0;
            minMove = 99
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

            const delta = Math.abs(acc.move - last.move);
            if (delta < minDelta) deltaIdleCount++;
            else deltaIdleCount = 0;
            let directionChanged = false;
            if (Math.abs(acc.x) > 2 && deltaIdleCount < 4) {
                if (acc.x < last.x) {
                    // move left
                    if (dir === 1) directionChanged = true
                    else consecutive++;
                    dir = -1;

                } else {
                    // move right
                    if (dir === -1) directionChanged = true
                    else consecutive++;
                    dir = 1;

                }
                percent += Math.max(acc.x - 1, acc.move - 2);
                sumMag += acc.mag;
                minMove = Math.min(minMove, Math.sign(acc.x) * acc.move);
                maxMove = Math.max(maxMove, Math.sign(acc.x) * acc.move);
            } else if (acc.mag > g) {
                // idle
                resetShakeVals();
                shakes = 0;
                percent = Math.max(0, percent - Math.max(2, deltaIdleCount - 2));
            }
            // detect shake
            if (directionChanged) {
                let validMoveLength = 2 <= consecutive && consecutive <= 5;
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
            if (shakes < 1) percent = Math.min(percent, 50);
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
            log("beep timeout, regular", "motionEnabled:", motionEnabled, "lastMotionTime:", lastMotionTime);
            setTimeout(() => beep(), suspense);
        } else {
            log("no beep", "motionEnabled:", motionEnabled, "lastMotionTime:", lastMotionTime);
        }
    }

    function beep() {
        if (isMobile) {
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
            }

            activity.push(reaction);
            activity.push({action: "start", time: Date.now() - idleStartTime});

            enabled = true;
            const image = document.getElementById("neoCaptcha-image") as HTMLImageElement;
            image.src = imgSrc;
            startTimer();
            if (!ctx) {
                error("Canvas context could not be initialized.");
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

    function move(e: MouseEvent | TouchEvent) {
        if (interactive) e.preventDefault();

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
            log("Yippie!");
            prepareRestart();
        } else if (retry) {
            setTimeout(() => {
                reset();
                requestMotion();
            }, 500);
        } else {
            log("Womp, womp");
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
            if (motionEnabled) {
                lastMotionTime = 0;
                smoothX = 0;
                smoothY = 0;
                smoothZ = 0;
                lastAcc = undefined;
                accs = [];
                setShakeEnabled(true);
            } else {
                overlayBg.style.background = mobileRed;
                signalIcon.innerText = "do_not_touch";
                signalIcon.style.animation = "none";
            }
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
            canvas.addEventListener("pointerdown", down, {passive: false});
        } else {
            canvas.addEventListener("pointerdown", down);
        }
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

}

(window as any).NeoCAPTCHA = {
    render: renderCaptcha
};