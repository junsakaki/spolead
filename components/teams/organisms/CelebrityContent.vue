<template>
  <div class="pa-3 celebrity">
    <p class="ma-0" v-html="transformTextToHtml(celebrity.content)" />
  </div>
</template>

<script>
import transformTextToHtml from '~/utils/transformTextToHtml'

export default {
  props: {
    celebrity: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      transformTextToHtml
    }
  }
}
</script>

<style lang="scss" scoped>
.celebrity {
  border: solid 1px #00000026;
}
</style>
