<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import api from 'src/boot/api';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Devices',
  components: {},
  data() {
    return {
      devices: 'None',
      meters: 'None'
    };
  },
  async beforeMount() {
    await this.analyseDevicesAndMetes();
  },
  methods: {
    async analyseDevicesAndMetes() {
      await api.getDevicesAndMeters().then((data) => {
        this.devices = data.devices;
        this.meters = data.meters;
      });
    }
  }
});
</script>

<template lang="pug">
q-card.q-pa-sm.q-ma-sm(dark bordered)
  q-card-section.q-pa-md
      div.text-h6.row
        |  Devices without meters:
        q-space
        |{{meters}}
  q-separator(dark inset)
  q-card-section.q-pa-md
    div.text-h6.row
      |  Devices with meters without data:
      q-space
      |  {{devices}}
</template>

<style scoped lang="sass"></style>
