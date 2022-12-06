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
    const lockId = 0;
    const chadContractAddr = '0x52E8DE03B382743Eb3ed6E68D5553580fc5fBcD8'; //testnet
    const claimContractAddr = '0x9584F7b1Fbc1370A126F5408c9fC4bDCdfb1B581';
    const serumContractAddr = '0x3D36FC0bEdC3FF7E15C0c30d6331C067D1A1E09C';
    // const chadContract = '0x1B84f3Db0EC59e1854f24d03596585F9740c9266'; // mainnet
    // const claimContract = '0x9584F7b1Fbc1370A126F5408c9fC4bDCdfb1B581';
    // const serumContract = '0x1B84f3Db0EC59e1854f24d03596585F9740c9266';
    const ERC721_ABI = [
      'function walletOfOwner(address) view returns (uint256[])',
      'function tokenURI(uint256) view returns (string)',
      'function tokenOfOwnerByIndex(address, uint256) view returns (uint256)'
    ];
    const claimABI = [
      'function getWithdrawableSharesToken(uint256,uint256) view returns (uint256)',
      'function LOCKS(uint256) view returns (address tokenAddress,address nftContract,uint256 sharesDeposited,uint256 sharesWithdrawn,uint256 startEmission,uint256 endEmission,uint256 expiration,uint256 lockID,address owner,address condition)',
      'function NFT_LOCKS(uint256,uint256) view returns (uint256 sharesDeposited,uint256 sharesWithdrawn)',
      'function withdraw(uint256,uint256,uint256)',
      'function claimAll(uint256)'
    ];
    const ERC20_ABI = [
      'function balanceOf(address) view returns (uint256)',
    ];

    return {
      store,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nftData: ref<any[]>([]),
      chadContractAddr,
      claimContractAddr,
      serumContractAddr,
      ERC721_ABI,
      claimABI,
      ERC20_ABI,
      account,
      lockId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      polling: ref<any>(null),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      countdown: ref<any>(null),
      lockInfo: ref({
        nftContract: '',
        amount: 0,
        startEmission: 0,
        endEmission: 0,
        expiration: 0,
        condition: '0x0000000000000000000000000000000000000000'
      })
    }
  },
  methods: {
    timeRemaining() {
      if (this.lockInfo.startEmission !== 0 && this.lockInfo.endEmission !== 0) {
        const now = new Date().getTime();
        const end = this.lockInfo.expiration * 1000;
        const diff = end - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        this.countdown = '';
      }
    },
    toEther(amount: ethers.BigNumber): string {
      let res = ethers.utils.formatEther(amount);
      res = (+res).toFixed(4);
      return `${res} SER`;
    },

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
        // console.log(await provider.getNetwork())
        const chadcontract = new ethers.Contract(this.chadContractAddr, this.ERC721_ABI, provider);
        const tokenIds = await chadcontract.walletOfOwner(this.account);
        // console.log(tokenIds);

        this.nftData = [];
        for (const nft of tokenIds) {
          // axios get ipfs json data
          let res = await this.$axios.get(`https://ipfs.io/ipfs/QmWjQNm3N8eWNQtAAmdU5KaQW46x2AoaGxU9RjmHTLuGHF/${nft}.json`)
          this.nftData.push(res.data);
        }

        const claimtokens = new ethers.Contract(this.claimContractAddr, this.claimABI, provider);
        // console.log((await claimtokens.getWithdrawableSharesToken(0, 1)).toString());
        // console.log(await claimtokens.LOCKS(0));
        this.lockInfo = await claimtokens.LOCKS(this.lockId);
        for (const nft of this.nftData) {
          // Calculate claimed, available and locked tokens
          let { sharesDeposited, sharesWithdrawn } = await claimtokens.NFT_LOCKS(this.lockId, nft['edition']);
          sharesDeposited = ethers.BigNumber.from(sharesDeposited);
          sharesWithdrawn = ethers.BigNumber.from(sharesWithdrawn);
          nft['claimed'] = sharesWithdrawn;
          nft['available'] = await claimtokens.getWithdrawableSharesToken(0, nft['edition']);
          nft['locked'] = sharesDeposited.sub(sharesWithdrawn);
        }

      }
    },

    // Claim All NFTs
    async claimAll() {
      console.log('Claiming All NFTs')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.claimContractAddr, this.claimABI, signer);
      const tx = await contract.claimAll(this.lockId);
      await tx.wait();
      console.log('Claimed All NFT');
      await this.getNftData()
    },

    async claimSingle(tokenId: number) {
      console.log('Claiming Single NFT' + tokenId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.claimContractAddr, this.claimABI, signer);
      const tx = await contract.withdraw(this.lockId, tokenId, 0);
      await tx.wait();
      console.log('Claimed Single NFT');
      await this.getNftData()
    },
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
    this.polling = setInterval(() => {
      this.timeRemaining();
    }, 1000);

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
            | {{countdown}}
        .row.justify-center
          q-btn(
            label="Claim All"
            @click="claimAll()"
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
            .p.text-yellow CLAIMED : {{NFT.claimed != undefined ? toEther(NFT.claimed) : 0}}
            .p.text-white AVAILABLE : {{NFT.available != undefined ? toEther(NFT.available): 0}}
            .p.text-white LOCKED :  {{NFT.locked != undefined ? toEther(NFT.locked): 0}}

          .row.flex-center
            q-card-actions(vertical)
              q-btn(
                label='Claim Now'
                icon='star'
                @click="claimSingle(NFT.edition)"
              )
</template>
