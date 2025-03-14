# Easy peasy, lemon squeezy
```html
<div id="neo-captcha"></div>
<script src="https://cdn.jsdelivr.net/gh/ginzhio/neo-captcha-frontend@main/dist/neo-captcha.iife.js"></script>
<script>
    window.NeoCAPTCHA.renderCaptcha(document.getElementById("neo-captcha"), true, false, {
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
