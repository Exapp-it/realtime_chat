import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
    ],
  //   define: {
  //     'import.meta.env.VITE_PUSHER_APP_KEY': JSON.stringify(process.env.MIX_PUSHER_APP_KEY),
  //     'import.meta.env.VITE_PUSHER_APP_CLUSTER': JSON.stringify(process.env.MIX_PUSHER_APP_CLUSTER),
  // },
});
