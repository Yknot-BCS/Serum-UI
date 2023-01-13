<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MyGraph',
  components: {},
  props: ['y', 'graphTitle'],
  data: function () {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
          foreColor: '#FFFFFF',
          colors: '#FFFFFF',
          background: '#00000000',
          toolbar: {
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: true
            }
          }
        },
        xaxis: {
          type: 'datetime',
        },
        colors: ['#FFFFFF'],
        markers: {
          size: 5,
          colors: ['#FFFFFF']
        },
        tooltip: {
          colors: ['#0000000']
        },
        theme: { mode: 'dark' }
      }
    };
  }
});
</script>

<template lang="pug">
q-card.q-pa-sm.q-ma-sm(dark bordered)
  q-card-section
    div.text-h6.row.justify-center {{ graphTitle }}
  apexchart(type="line" :options="options" :series="y" height="300px")
</template>

<style scoped lang="sass"></style>
