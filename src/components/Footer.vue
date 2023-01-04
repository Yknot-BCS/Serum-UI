<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});

</script>

<template lang="pug">
.q-py-md.bg-black
  .row.justify-center
    q-btn(
      color="black"
      a href="https://discord.gg/gYrwj5hbtZ"
      target="_blank"
      width="10px"
    )
      q-avatar(size='2.5rem')
        img(src='~/assets/dc.png')
    q-btn(
      color="black"
      href="https://twitter.com/TheChadsClub"
      target="_blank"
    )
      q-avatar(size='2.5rem')
        img(src='~/assets/tw.png')
    q-btn(
      color="black"
      href="https://opensea.io/collection/thechadsclub"
      target="_blank"
    )
      q-avatar(size='2.5rem')
        img(src='~/assets/os.png')

  .row.justify-center.q-my-md
    q-btn(
        label='Terms & Conditions'
        unelevated
        color="black"
        text-color="yellow"
        :ripple='false'
        :to='{ name: "terms-and-conditions" }'
        )

</template>
<style lang="sass" scoped>
.q-btn
  width: fit-content
</style>
