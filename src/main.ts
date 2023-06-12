import "@/assets/styles/main.scss"
import "vuetify/styles"
import "vue-skeletor/dist/vue-skeletor.css"

import { createPinia } from "pinia"
import { createApp } from "vue"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import Highcharts from "highcharts"
import HighchartsVue from "highcharts-vue"
import Stock from "highcharts/modules/stock"
import HighchartsMapModule from "highcharts/modules/map"
import Russia from "@/helpers/newMapFinal.json"
import App from "./App.vue"
import router from "./router"
import { saneHtml, vClickOutside } from "@/directives"
import { Skeletor } from "vue-skeletor"
import YmapPlugin from "vue-yandex-maps"

HighchartsMapModule(Highcharts)
const russia = Russia
Highcharts.maps.Russia = russia
Stock(Highcharts)
const vuetify = createVuetify({
	components,
	directives
})
const settings = {
	apiKey: import.meta.env.VITE_YANDEX_API_KEY,
	lang: "ru_RU",
	coordorder: "latlong",
	enterprise: false,
	version: "2.1"
}
const app = createApp(App)
app.config.performance = true
app.directive("click-outside", vClickOutside)
app.directive("sane-html", saneHtml)
app.component(Skeletor.name, Skeletor)
app.use(YmapPlugin, settings)
app.use(HighchartsVue)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount("#app")
