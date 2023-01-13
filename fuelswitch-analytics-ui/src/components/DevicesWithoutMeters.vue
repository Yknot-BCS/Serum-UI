<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import api from 'src/boot/api';
import { useLoginStore } from 'src/stores/login';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DevicesWithoutMeters',
  components: {},
  data() {
    return {
      store: useLoginStore(),
      deviceMsg: 'None',
      meterMsg: 'None',
      devicesWithMetersWithoutData: [] as {
        username: string;
        devicename: string;
      }[],
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
    },
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
  q-separator(dark inset)
  q-expansion-item(
    switch-toggle-side
    label="List of devices"
    v-model="store.expanded"
    @show="store.expanded = true"
    @hide="store.expanded = false"
  )
    q-list.q-pl-md(dark)
      q-separator(dark)
      q-item.row.q-pl-md(v-for="device in devicesWithoutMeters")
        |{{device.username }}'s device:
        q-space
        |{{ device.devicename }}
</template>

<style scoped lang="sass"></style>
