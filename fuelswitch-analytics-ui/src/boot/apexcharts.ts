
//create a boot file that containes this apexchart.js
import VueApexCharts from 'vue3-apexcharts'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
    app.use(VueApexCharts)
})
//add this boot file to quasar.config.js
