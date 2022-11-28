<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'NFTs',

  setup(){
    const NFTDummies = [
    {
    'name': '#976',
    'description': '',
    'image': 'https://ipfs.io/ipfs/QmdGPQVFirRFB6f3YJckx7rivck67mmn5Qofw5xYowoZLd/976.png',
    'dna': '5e4a2debaae8641c674a1509175fb54cdc84eb64',
    'edition': 976,
    'date': 1644596775821,
      },
    {
    'name': '#970',
    'description': '',
    'image': 'ipfs://QmdGPQVFirRFB6f3YJckx7rivck67mmn5Qofw5xYowoZLd/440.png',
    'dna': '5e4a2debaae8641c674a1509175fb54cdc84eb64',
    'edition': 976,
    'date': 1644596775821,
      },
      {
    'name': '#979',
    'description': '',
    'image': 'ipfs://QmdGPQVFirRFB6f3YJckx7rivck67mmn5Qofw5xYowoZLd/976.png',
    'dna': '5e4a2debaae8641c674a1509175fb54cdc84eb64',
    'edition': 976,
    'date': 1644596775821,
      }
    ];
    return{
      NFTDummies
    }
  },
  methods: {

    imageLink(url:string) : string {

      const imageUrl = url.replace('ipfs://', 'https://ipfs.io/ipfs/');

      return imageUrl;
    }
  }
});
</script>
<template lang="pug">
q-item.nft-data
  .row.align-center.justify-center
    q-card.q-ma-md(v-for='NFT in NFTDummies', bordered)
      .row.flex-center
        h4.card-header {{NFT.name}}
      .row.flex-center
        img.q-ma-md.logo(
          :src= "imageLink(NFT.image)"
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
  height: 185px
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
