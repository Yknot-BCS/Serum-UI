<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'NFTs',

  setup(){
    const NFTDummies = [
      {
        databaseID: 'Device1',
        dataField1: 'Test1',
        dataField2: 'Test2',
        file: 'File',
        actions: 'N/A'
      },
      {
        databaseID: 'Device2',
        dataField1: 'Test1',
        dataField2: 'Test2',
        file: 'File',
        actions: 'N/A'
      },
      {
        databaseID: 'Device3',
        dataField1: 'Test1',
        dataField2: 'Test2',
        file: 'File',
        actions: 'N/A'
      }
    ];
    return{
      NFTDummies
    }
  }

});
</script>
<template lang="pug">
q-item.nft-data
  .row.align-center.justify-center
      q-card.q-ma-md(v-for='NFT in NFTDummies', bordered)
        q-card-section
          h3.text-white {{NFT.databaseID}}
        img.q-ma-md.logo(
          src='~assets/star.svg'
        )
        q-card-actions(vertical)
          q-btn(
            label='claim'
          )



</template>
<style scoped lang="sass">
.logo
  height: 150px
.nft-data
  box-shadow: 0px 1px #ECECEC,
  background-color:  black
  width: 100%
  height: 100%
</style>
