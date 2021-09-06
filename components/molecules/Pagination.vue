<template>
  <div class="text-center">
    <v-pagination
      v-model="internalPage"
      :length="totalPages"
      @input="execPagination"
      :total-visible="7"
    />
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      internalPage: 1
    }
  },
  watch: {
    page: {
      immediate: true,
      handler (value) {
        this.internalPage = value
      }
    }
  },
  methods: {
    execPagination (internalPage) {
      this.$emit('execPagination', internalPage)
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  margin: 24px 0px 36px 0px
}
</style>
