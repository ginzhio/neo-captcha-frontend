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

[![latest patch](https://img.shields.io/badge/v1.1.4-00adad?label=Latest%20Patch)](https://github.com/ginzhio/neo-captcha-frontend/tree/v1.1.4)     [![current release](https://img.shields.io/github/v/release/ginzhio/neo-captcha-frontend?label=Current%20Release&color=009bb8)](https://github.com/ginzhio/neo-captcha-frontend/releases)

---

## Why neoCAPTCHA? 

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
<script src="https://neo-captcha.com/widget/v1/neo-captcha.js"></script>

<!-- 3. Render the CAPTCHA -->
<script>
    window.NeoCAPTCHA.renderCaptcha(document.getElementById("neo-captcha"), {
        showHowTo: true,
        expandHowTo: false,
    }, {
        onSuccess: () => {
            console.log("CAPTCHA passed!");
        },
        onFailure: () => {
            console.log("CAPTCHA failed.");
        }
    });
</script>
```

That’s it.  
Use the callback methods ```onSuccess``` and ```onFailure``` to grant or deny access to the features you wanna protect from bots.  

##### Script:
| Current v1.x Release | ```https://neo-captcha.com/widget/v1/neo-captcha.js``` |
|:-------------------:|:------------------------------------------------------:|
| Latest Patch | ```https://neo-captcha.com/widget/latest/neo-captcha.js``` |
 
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
}
```
→ [Help with translations](docs/translations.xlsx)

## Preview

| Neon Shape | Implied Square |
|:----------:|:----------:|
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
