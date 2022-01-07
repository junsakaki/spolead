<template>
  <div class="pa-3 career">
    <p class="ma-0" v-html="transformTextToHtml(career.content)" />
  </div>
</template>

<script>
import transformTextToHtml from '~/utils/transformTextToHtml'

export default {
  props: {
    career: {
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
.career {
  border: solid 1px #00000026;
}
</style>
