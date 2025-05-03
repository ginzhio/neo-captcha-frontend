<p align="center">
  <img src="public/logo-dark.png" alt="NeoCAPTCHA logo" width="100" />
</p>

<h1 align="center">NeoCAPTCHA</h1>
<p align="center"><em>What CAPTCHA was always meant to be.</em></p>

<p align="center">
  <a href="https://neo-captcha.com" target="_blank">Website</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#about">About</a> •
  <a href="#license">License</a>
</p>  

[![latest patch](https://img.shields.io/badge/v1.1.8-00adad?label=Latest%20Patch)](https://github.com/ginzhio/neo-captcha-frontend/tree/v1.1.8)     [![current release](https://img.shields.io/github/v/release/ginzhio/neo-captcha-frontend?label=Current%20Release&color=009bb8)](https://github.com/ginzhio/neo-captcha-frontend/releases)

---

## What is NeoCAPTCHA?
NeoCAPTCHA is a human verification tool primarily for mobile devices. The user has to
- Click a button
- Shake their phone
- Solve a small visual challenge

Using the motion events coming directly from the smartphone's hardware makes this virtually impossible for bots or AI to solve.  
**Set it up for your website in just a few seconds!**

## Why NeoCAPTCHA? 

- ✅ No tracking, no data collection  
- 🧠 Doesn’t train AI models  
- 🎯 Easy for humans, hard for bots  
- ⚡ Lightweight and easy to integrate  
- 🔐 Hosted backend – privacy-first by design  

## Quick Start

```html
<!-- 1. Add a target element -->
<div id="neo-captcha"></div>

<!-- 2. Include the script -->
<script src="https://neo-captcha.com/widget/v1/neo-captcha.js"
        integrity="sha256-vReSO09jMrQdTyw0A2KYkVFMIQpeyF0VdnA392rOA8I="
        crossorigin="anonymous"></script>

<!-- 3. Render the CAPTCHA -->
<script>
    window.NeoCAPTCHA.renderCaptcha(document.getElementById("neo-captcha"), {
        // more config options below
        showHowTo: false,
        expandHowTo: false,
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
| Current v1.x Release |   ```https://neo-captcha.com/widget/v1/neo-captcha.js```   | ```sha256-vReSO09jMrQdTyw0A2KYkVFMIQpeyF0VdnA392rOA8I=``` |
| Latest Patch (1.1.8) | ```https://neo-captcha.com/widget/latest/neo-captcha.js``` | ```sha256-eqYSA4D150H/v4AUM6/29b7hoSvE00xLNsM6hi+Lqi0=``` |
 
##### Configuration options:
```ts
{
    showHowTo: true,        // shows instructions on how to solve the CAPTCHA
    expandHowTo: false,     // expand or collapse the "How-To" section initially
    minDifficulty: 'easy',  // ['easy', 'medium', 'hard'] default is 'easy'
    lang: 'en',             // currently: ['en', 'de'] forces the text to be in that language, omit for browser-default
    theme: 'dark',          // ['light', 'dark'] forces ui theme, omit for browser-default
    variant: 'ns',          // ['ns', 'iq'] 'ns' = Neon Shape, 'iq' = Implied Square, default is 'ns'
    visualOnDesktop: false, // show visual reaction challenge ("Tap when GREEN") instead of audible one when on desktop
    key: '<captcha-key>',   // an ephemeral key used to sign the result in 'onResult', use a different one for every CAPTCHA
}
```
→ [Help with translations](docs/translations.xlsx)

## Preview

|            Neon Shape (theme: 'dark')             |            Implied Square (theme: 'light')            |
|:-------------------------------------------------:|:-----------------------------------------------------:|
| ![Neon Shape](docs/neo-captcha-screenshot-ns.png) | ![Implied Square](docs/neo-captcha-screenshot-iq.png) |

## About

**NeoCAPTCHA** is a privacy-first CAPTCHA system designed to be intuitive, satisfying, and bot-resistant.

The frontend widget is open source. The backend is hosted and stateless, using signed challenges and human interaction heuristics.

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
