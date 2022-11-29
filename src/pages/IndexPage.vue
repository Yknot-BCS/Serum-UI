<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup(){
    const NFTDummies = [
    {
    'name': '#976',
    'description': '',
    'image': 'ipfs://QmdGPQVFirRFB6f3YJckx7rivck67mmn5Qofw5xYowoZLd/976.png',
      },
    {
    'name': '#970',
    'description': '',
    'image': 'ipfs://QmdGPQVFirRFB6f3YJckx7rivck67mmn5Qofw5xYowoZLd/440.png',
      },
      {
    'name': '#979',
    'description': '',
    'image': 'ipfs://QmdGPQVFirRFB6f3YJckx7rivck67mmn5Qofw5xYowoZLd/976.png',
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
q-page
  //- Token Countdown and Claim All Area
  .row
    q-item.token-data
      q-item-section
        .row.justify-center
          .h1_title Claim Your Tokens
        .row.justify-center
          .h2_title Time left to claim
            q-img.q-ma-xs(
              src='~assets/loading.svg',width="20px")
            | 44 days...
        .row.justify-center
          q-btn(
            label="Claim All"
          )
  //- User NFTs
  .row
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
