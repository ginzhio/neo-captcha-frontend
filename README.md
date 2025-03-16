# Easy peasy, lemon squeezy
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

# API keys / Licence keys
coming soon...
