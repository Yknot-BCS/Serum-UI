<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import KYCCompletion from 'components/KYCCompletion.vue';
import DevicesWithoutMeters from 'components/DevicesWithoutMeters.vue';
import DevicesWithoutData from 'components/DevicesWithoutData.vue';
import REC from 'components/REC.vue';
import MyGraph from 'components/MyGraph.vue';
import api from 'src/boot/api';

export interface GraphData {
  y: [{ name: string; data: { x: string; y: number }[] }];
}

export default defineComponent({
  name: 'IndexPage',
  components: { KYCCompletion, DevicesWithoutMeters, REC, MyGraph, DevicesWithoutData },
  setup() {
    const userSignupData = ref<GraphData>({
      y: [
        {
          name: 'Hi',
          data: [{ x: '05/06/2014', y: 54 }]
        }
      ]
    });

    const recsReleased = ref<GraphData>({
      y: [
        {
          name: 'Hi',
          data: [{ x: '05/06/2014', y: 54 }]
        }
      ]
    });

    function prepareGraphData(graphTitle: string, databaseRes: any) {
      let sum = 0;
      const y = [] as number[];
      let datas = [] as { x: string; y: number }[];

      const firstDay = new Date(databaseRes[0]._id).setDate(
        new Date(databaseRes[0]._id).getDate() - 2
      );
      const secondaryDay = new Date(databaseRes[0]._id).setDate(
        new Date(databaseRes[0]._id).getDate() - 1
      );
      databaseRes.unshift({ _id: secondaryDay, count: 0 });
      databaseRes.unshift({ _id: firstDay, count: 0 });

      const dataPoints = databaseRes.map((a: { count: number }) => a.count);
      dataPoints.forEach((dataPoint: number) => {
        sum += dataPoint;
        y.push(sum);
      });

      databaseRes.forEach((a: { _id: string }, key: number) => {
        datas.push({ x: a._id, y: y[key] });
      });

      return <GraphData>{
        y: [
          {
            name: graphTitle,
            data: datas
          }
        ]
      };
    }

    onMounted(async () => {
      const userSignupRes = await api.getUserSignupData();
      const recsReleasedRes = await api.getRECRequestData();
      userSignupData.value = prepareGraphData(
        'User signups over time',
        userSignupRes
      );
      recsReleased.value = prepareGraphData(
        'RECs issued over time',
        recsReleasedRes
      );
    });

    return {
      userSignupData,
      recsReleased,
      onMounted,
    };
  }
});
</script>

<template lang="pug">
q-page.row
  div.q-px-sm.q-py-none.q-mt-sm.full-width.row
    KYCCompletion.card.col
    DevicesWithoutMeters.card.col
    DevicesWithoutData.card.col
  div.q-px-sm.q-py-none.full-width.row
    MyGraph.card.col(:graphTitle="userSignupData?.y[0].name" :y="userSignupData?.y")
    MyGraph.card.col(:graphTitle="recsReleased?.y[0].name" :y="recsReleased?.y")
  div.q-px-md.q-py-none.q-mb-sm.full-width.row
    REC.full-width.card
</template>

<style scoped lang="sass">
.card
  background: linear-gradient(to bottom , $primary, $secondary)
  min-width: 200px
</style>
