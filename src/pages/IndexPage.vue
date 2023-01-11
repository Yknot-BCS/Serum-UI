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
          data: [
            { x: '05/06/2014', y: 54 },
          ]
        }
      ]
    });

    const recsReleased = ref<GraphData>({
      y: [
        {
          name: 'Hi',
          data: [
            { x: '05/06/2014', y: 54 },
          ]
        }
      ]
    });

    async function getUserSignupData(){
      let sum = 0;
      const y = [] as number[];
      let datas = [] as { x: string; y: number }[];

      const res = await api.getUserSignupData();
      const firstDay = (new Date(res[0]._id)).setDate((new Date(res[0]._id)).getDate()-2);
      const secondaryDay = (new Date(res[0]._id)).setDate((new Date(res[0]._id)).getDate()-1);
      res.unshift({ _id: secondaryDay, count: 0 });
      res.unshift({ _id: firstDay, count: 0 });

      const dataPoints = res.map((a: { count: number }) => a.count);
      dataPoints.forEach((dataPoint: number) => {
        sum += dataPoint;
        y.push(sum);
      });

      res.forEach((a: { _id: string }, key: number) => {
        datas.push({ x: a._id, y: y[key] });
      });

      return <GraphData>{
        y: [
          {
            name: 'User signup date',
            data: datas
          }
        ]
      };
    }

    async function getRECRequestData() {
      let sum = 0;
      const y = [] as number[];
      let datas = [] as { x: string; y: number }[];

      const res = await api.getRECRequestData();
      const firstDay = (new Date(res[0]._id)).setDate((new Date(res[0]._id)).getDate()-2);
      const secondaryDay = (new Date(res[0]._id)).setDate((new Date(res[0]._id)).getDate()-1);
      res.unshift({ _id: secondaryDay, count: 0 });
      res.unshift({ _id: firstDay, count: 0 });

      const dataPoints = res.map((a: { count: number }) => a.count);
      dataPoints.forEach((dataPoint: number) => {
        sum += dataPoint;
        y.push(sum);
      });

      res.forEach((a: { _id: string }, key: number) => {
        datas.push({ x: a._id, y: y[key] });
      });

      return <GraphData>{
        y: [
          {
            name: 'REC Request date',
            data: datas
          }
        ]
      };
    }

    onMounted(async () => {
      userSignupData.value = await getUserSignupData();
      recsReleased.value = await getRECRequestData()
    });

    return {
      userSignupData,
      recsReleased,
      onMounted
    };
  }
});
</script>

<template lang="pug">
q-page.flex-center.column
  div.q-mt-xl
  KYCCompletion.card
  Devices.card
  REC.card
  MyGraph(:graphTitle="userSignupData?.y[0].name" :y="userSignupData?.y").card
  MyGraph(:graphTitle="recsReleased?.y[0].name" :y="recsReleased?.y").card
  div.q-mb-xl
</template>

<style scoped lang="sass">
.card
  background: linear-gradient(to right , $primary, $secondary)
  width: 55%
  min-width: 450px
</style>
