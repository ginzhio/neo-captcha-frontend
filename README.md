<p align="center">
  <img src="public/logo-dark.png" alt="NeoCAPTCHA logo" width="100" />
</p>

<h1 align="center">NeoCAPTCHA</h1>
<p align="center"><em>What CAPTCHA was always meant to be.</em></p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="https://neo-captcha.com" target="_blank">Website</a> •
  <a href="#license">License</a>
</p>  

CAPTCHA used to stand for "**C**ompletely **A**utomated **P**ublic **T**uring test to tell **C**omputers and **H**umans **A**part". But since computers are beginning to pass turing tests with AI, we are redefining the term:  
  
**CAPTCHA** - **C**ontinuously **A**daptive **P**rotocol **T**hat **C**onfirms **H**uman **A**gency.

<br>
  
[![latest patch](https://img.shields.io/badge/v1.1.8-00adad?label=Latest%20Patch)](https://github.com/ginzhio/neo-captcha-frontend/tree/v1.1.8)     [![current release](https://img.shields.io/github/v/release/ginzhio/neo-captcha-frontend?label=Current%20Release&color=009bb8)](https://github.com/ginzhio/neo-captcha-frontend/releases)

---

## About
NeoCAPTCHA is a human verification tool primarily for mobile devices. The user has to
- Click a button
- Shake their phone
- Solve a small visual challenge

Using the motion events that come directly from the smartphone's hardware/OS makes it virtually impossible for bots or AI to solve.  

The frontend widget is open source. The validation backend is securely hosted, distributed and stateless, using signed challenges and human interaction heuristics.

## Why NeoCAPTCHA? 

- ✅ No tracking, no data collection  
- 🧠 Doesn’t train AI models  
- 🎯 Easy for humans, hard for bots  
- ⚡ Lightweight and easy to integrate  
- 🔐 Hosted backend – privacy-first by design  

## Quick Start
**Use it on your website in just a few seconds!**
```html
<!-- 1. Add a target element -->
<div id="neo-captcha"></div>

<!-- 2. Include the script -->
<script src="https://neo-captcha.com/widget/v1/neo-captcha.js"
        integrity="sha256-v5Yo7yBHHBEZzmSqrAysnGzuqZQVo7qYbpa1w+MrK0k="
        crossorigin="anonymous"></script>

<!-- 3. Render the CAPTCHA -->
<script>
    window.NeoCAPTCHA.renderCaptcha(document.getElementById("neo-captcha"), {
        showHowTo: false,
        expandHowTo: false,
        // more config options below
    }, {
        onSuccess: () => {
            console.log("CAPTCHA passed!");
        },
        onFailure: () => {
            console.log("CAPTCHA failed.");
        },
        onError: (e) => {
            console.error("Evaluation not possible...", e);
        },
        onResult: (r) => {
            console.log("Signed result:", r);
        }
    });
</script>
```

That’s it.  
Use the callback methods ```onSuccess``` and ```onFailure``` to grant or deny access to the features you wanna protect from bots.  
* The callback ```onError(e)``` will be called when an error occurred, resulting in neither of the other callbacks being called. In a perfect world this will never happen :upside_down_face:  
* The callback ```onResult(r)``` will be called **after** ```onSuccess``` or ```onFailure```. It provides the Base64 encoded bytes of the string ```'success'``` or ```'failure'``` signed with the bytes of the string you provide in the ```key``` config parameter, using ```HmacSHA256```.  
This way you can make sure the result actually came from our backend after being called from our script.

##### Script:
|       Version        |                            Link                            |                          SHA-256                          |
|:--------------------:|:----------------------------------------------------------:|:---------------------------------------------------------:|
| Current Release v1.2 |   ```https://neo-captcha.com/widget/v1/neo-captcha.js```   | ```sha256-v5Yo7yBHHBEZzmSqrAysnGzuqZQVo7qYbpa1w+MrK0k=``` |
| Latest Patch (1.1.8) | ```https://neo-captcha.com/widget/latest/neo-captcha.js``` | ```sha256-eqYSA4D150H/v4AUM6/29b7hoSvE00xLNsM6hi+Lqi0=``` |
 
##### Configuration options:
```ts
{
    showHowTo: true,        // shows instructions on how to solve the CAPTCHA
    expandHowTo: false,     // expand or collapse the "How-To" section initially
    minDifficulty: 'easy',  // ['easy', 'medium', 'hard'] default is 'easy'
    lang: 'en',             // currently: ['en', 'de']* forces the text to be in that language, omit for browser-default
    theme: 'dark',          // ['light', 'dark'] forces ui theme, omit for browser-default
    variant: 'ns',          // ['ns', 'iq'] 'ns' = Neon Shape, 'iq' = Implied Square, default is 'ns'
    visualOnDesktop: false, // show visual reaction challenge ("Tap when GREEN") instead of audible one when on desktop
    key: '<captcha-key>',   // an ephemeral key used to sign the result in 'onResult', use a different one for every CAPTCHA
}
```
```*``` [Help with translations](docs/translations.xlsx)

## Preview

|            Neon Shape (theme: 'dark')             |            Implied Square (theme: 'light')            |
|:-------------------------------------------------:|:-----------------------------------------------------:|
| ![Neon Shape](docs/neo-captcha-screenshot-ns.png) | ![Implied Square](docs/neo-captcha-screenshot-iq.png) | 

## Roadmap

✅ Interactive widget (click-to-reveal, [Kanizsa](https://en.wikipedia.org/wiki/Illusory_contours)-based challenge)  
✅ Mobile & touch support  
✅ Sound / visual start signal  
✅ How-To translations or gif → [Help with translations](docs/translations.xlsx)  
✅ "Shake to reveal" for mobile  
⬜ Customization / branding options  
⬜ Licence API keys for even more security  
⬜ Mode for visually impaired  
⬜ Even more bot-proof but intuitive challenges  

## Contribute

Pull requests are welcome!  
Have a feature idea or integration suggestion?  
→ [Open an issue](https://github.com/ginzhio/neo-captcha-frontend/issues)

## License

CC BY-NC 4.0 – see [LICENSE](./LICENSE)  
Commercial use requires permission – contact hello@neo-captcha.com

#
## *Stay tuned for additional features, customization options and security updates!*

---

> People-first security made with :heart:  
> by [@ginzhio](https://github.com/ginzhio)
