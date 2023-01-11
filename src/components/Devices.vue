<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import api from 'src/boot/api';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Devices',
  components: {},
  data() {
    return {
      deviceMsg: 'None',
      meterMsg: 'None',
      devicesWithMetersWithoutData: [] as { username: string; devicename: string }[],
      devicesWithoutMeters: [] as { username: string; devicename: string }[]
    };
  },
  async beforeMount() {
    await this.analyseDevicesAndMetes();
  },
  methods: {
    async analyseDevicesAndMetes() {
      const data = await api.getDevicesAndMeters();
      this.deviceMsg = data.deviceMsg;
      this.meterMsg = data.meterMsg;
      this.devicesWithMetersWithoutData = data.devicesWithMetersWithoutData;
      this.devicesWithoutMeters = data.devicesWithoutMeters;
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
      | {{ meterMsg }}
  q-expansion-item(switch-toggle-side expand-separator label="List of devices")
    q-list.q-pl-md(dark)
      q-separator(dark)
      q-item.row.q-pl-md(v-for="device in devicesWithoutMeters")
        |{{device.username }}'s device:
        q-space
        |{{ device.devicename }}
  q-separator(dark inset)
  q-card-section.q-pa-md
      div.text-h6.row
        |  Devices with meters without data:
        q-space
        | {{ deviceMsg }}
  q-expansion-item(switch-toggle-side expand-separator label="List of devices")
    q-list.q-pl-md(dark)
      q-separator(dark)
      q-item.row.q-pl-md(v-for="device in devicesWithMetersWithoutData")
        |{{device.username }}'s device:
        q-space
        |{{ device.devicename }}
</template>

<style scoped lang="sass"></style>
