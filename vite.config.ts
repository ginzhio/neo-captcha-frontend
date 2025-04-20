import {defineConfig} from 'vite';
import {readFileSync} from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
    define: {
        __VERSION__: JSON.stringify(pkg.version),
    },
    build: {
        lib: {
            entry: 'src/widget.ts',
            name: 'NeoCAPTCHA',
            fileName: () => 'neo-captcha-demo.js',
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
