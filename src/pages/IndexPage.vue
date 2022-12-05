<script lang="ts">
import { defineComponent } from 'vue'; 3
import { computed, ref } from 'vue';
import { useAccountStore } from 'stores/account';
// import { storeToRefs } from 'pinia';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const store = useAccountStore();
    const account = computed(() => store.getAccount);

    //- Chad Contract Address
    const chadContract = '0x1B84f3Db0EC59e1854f24d03596585F9740c9266';
    const ERC721_ABI = [
      'function walletOfOwner(address) view returns (uint256[])',
      'function tokenURI(uint256) view returns (string)',
      'function tokenOfOwnerByIndex(address, uint256) view returns (uint256)'
    ];

    return {
      store,
      nftData: ref<string[]>([]),
      chadContract,
      ERC721_ABI,
      account
    }
  },
  methods: {

    imageLink(url: string): string {
      if (url) {
        const imageUrl = url.replace('ipfs://', 'https://ipfs.io/ipfs/');

        return imageUrl;
      }

      return '';
    },

    // Get the user balance for chad contract (nft ids)
    async getNftData() {
      // if logged in
      if (this.store.isAuthorized) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        console.log(await provider.getNetwork())
        const contract = new ethers.Contract(this.chadContract, this.ERC721_ABI, provider);
        const tokenIds = await contract.walletOfOwner(this.account);
        console.log(tokenIds);

        for (const nft of tokenIds) {
          // axios get ipfs json data
          this.$axios.get(`https://ipfs.io/ipfs/QmWjQNm3N8eWNQtAAmdU5KaQW46x2AoaGxU9RjmHTLuGHF/${nft}.json`).then((res) => {
            // console.log(res.data);
            this.nftData.push(res.data);
          });
        }
        // console.log(this.nftData);
        // return tokenIds;
      }
    }
  },

  watch: {
    account: {
      async handler() {
        await this.getNftData();
      }
    },
  },

  async mounted() {
    await this.getNftData();
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
        q-card.q-ma-md(v-for='NFT in nftData', bordered)
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
