import {defineConfig} from 'vite';
import {readFileSync} from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
    define: {
        __VERSION__: JSON.stringify(pkg.version),
        __BLOB__: JSON.stringify("plYu5UtrxXE6YvmSeZ3W+M3L91UtWE7ZLYs5ckS47Ag="),
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
