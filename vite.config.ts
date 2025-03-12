import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/widget.ts',
            name: 'NeoCAPTCHA',
            fileName: 'neo-captcha',
            formats: ['iife'],
        },
        rollupOptions: {
            output: {
                globals: {
                    window: 'window'
                }
            }
        }
    }
});
