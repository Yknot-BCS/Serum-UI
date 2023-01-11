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
      pending: 'None',
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
        this.pending = data.pending;
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
      |  Current unapproved RECs:
      q-space
      |{{pending}}
  q-separator(dark inset)
  q-card-section.q-pa-md
    div.text-h6.row
      |  Total value of RECs traded:
      q-space
      |  {{totalValue}}
</template>

<style scoped lang="sass"></style>
