<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="grey--text text-center">
      購入が完了しました
    </div>
    <div class="mt-4 text-center">
      <router-link to="/" style="text-decoration: none;">
        <div class="d-flex align-center justify-center">
          <v-icon color="primary">
            mdi-home
          </v-icon>
          TOP
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: '商品購入',
          disabled: true
        },
        {
          text: '完了',
          disabled: true
        }
      ]
    }
  },
  head () {
    return {
      title: '完了 - 商品購入 | '
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
