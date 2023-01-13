<script lang="ts">
import api from 'src/boot/api';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'REC',
  components: {},
  data() {
    return {
      issued: 'None',
      totalValue: 'None',
      pendingRecs: 'None',
      pendingMeterDatas: 'None',
    };
  },
  async beforeMount() {
    await this.analyseDevicesAndMetes();
  },
  methods: {
    async analyseDevicesAndMetes() {
      await api.getRECs().then((data) => {
        this.issued = data.issued;
        this.totalValue = data.totalValue;
        this.pendingRecs = data.pendingRecs;
        this.pendingMeterDatas = data.pendingMeterDatas;
      });
    }
  }
});
</script>

<template lang="pug">
q-card.q-pa-sm.q-ma-sm(dark bordered)
  q-card-section.q-pa-md
    div.text-h6.row
      |  Total RECs issued:
      q-space
      |{{issued}}
  q-separator(dark inset)
  q-card-section.q-pa-md
    div.text-h6.row
      |  Total value of RECs traded:
      q-space
      |  {{totalValue}}
  q-separator(dark inset)
  q-card-section.q-pa-md
    div.text-h6.row
      |Current unapproved RECs:
      q-space
      u {{pendingRecs+pendingMeterDatas}}
    div.text-h6.q-ml-md.row
      |→ From pending RECs:
      q-space
      |{{pendingRecs}}
    div.text-h6.q-ml-md.row
      |→ From meter data:
      q-space
      |{{pendingMeterDatas}}
</template>

<style scoped lang="sass"></style>
