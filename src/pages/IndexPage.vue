<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import KYCCompletion from 'components/KYCCompletion.vue';
import Devices from 'components/Devices.vue';
import REC from 'components/REC.vue';
import MyGraph from 'components/MyGraph.vue';
import api from 'src/boot/api';

export interface GraphData {
  y: [{ name: string; data: { x: string; y: number }[] }];
}

export default defineComponent({
  name: 'IndexPage',
  components: { KYCCompletion, Devices, REC, MyGraph },
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
        'User signup date',
        userSignupRes
      );
      recsReleased.value = prepareGraphData(
        'REC request date',
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
q-page.flex-center.column
  div.q-mt-xl
  KYCCompletion.card
  Devices.card(transition-show="fade")
  REC.card
  MyGraph.card(:graphTitle="userSignupData?.y[0].name" :y="userSignupData?.y")
  MyGraph.card(:graphTitle="recsReleased?.y[0].name" :y="recsReleased?.y")
  div.q-mb-xl
</template>

<style scoped lang="sass">
.card
  background: linear-gradient(to right , $primary, $secondary)
  width: 55%
  min-width: 450px
</style>
