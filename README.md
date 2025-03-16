# How to use:
Easy peasy, lemon squeezy. Just copy this and add it to your website, wherever you see fit.
```html
<div id="neo-captcha"></div>
<script src="https://neo-captcha.com/widget/v1/neo-captcha.js"></script>
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
Use the callback methods ```onSuccess``` and ```onFailure``` to grant or deny access to the features you wanna protect from bots.

# API keys / Licence keys
coming soon...

#
# Stay tuned for additional features, customization options and security updates!
Preview:
<p align="center">
  <img src="docs/neo-captcha-screenshot.png" alt="neoCAPTCHA Screenshot" width="386"/>
</p>


