import "./bootstrap";
import "../css/app.css";
import { createApp } from "vue";
import App from "./src/App.vue";
import Router from "./src/router/router";
import Store from "./src/store/index";

const app = createApp(App);
app.use(Store);
app.use(Router);
app.mount("#app");
