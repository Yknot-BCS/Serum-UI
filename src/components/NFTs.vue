<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'NFTs',

  setup(){
    const NFTDummies = [
      {
        databaseID: 'MY NFT',
        dataField1: 'Test1',
        dataField2: 'Test2',
        file: 'File',
        actions: 'N/A'
      },
      {
        databaseID: 'MY NFT 2',
        dataField1: 'Test1',
        dataField2: 'Test2',
        file: 'File',
        actions: 'N/A'
      },
      {
        databaseID: 'MY NFT 3',
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
      .row.flex-center
        h4.card-header {{NFT.databaseID}}
      .row.flex-center
        img.q-ma-md.logo(
          src='~assets/star.svg'
        )
      .col.text-center
        .p.text-yellow CLAIMED : {{NFT.actions}}
        .p.text-white AVAILABLE : {{NFT.file}}
        .p.text-white LOCKED :  {{NFT.dataField1}}

      .row.flex-center
        q-card-actions(vertical)
          q-btn(
            label='Claim Now'
            icon='star'
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
.card-header
  color: white
  text-align: center
  vertical-align: middle
</style>
