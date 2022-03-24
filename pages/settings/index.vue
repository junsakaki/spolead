<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Menu />
  </div>
</template>

<script>
import Menu from '~/components/settings/organisms/Menu.vue'

export default {
  components: { Menu },
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: '各種設定',
          disabled: true
        }
      ]
    }
  },
  head () {
    return {
      title: '各種設定 | '
    }
  },
  created () {
    // 未ログインの場合はトップ画面へリダイレクトする
    if (!this.$auth.loggedIn) {
      this.$router.replace('/login')
    }
    // デスクトップ版のみ/settingと/setting/accountの内容が同じなのでリプレイスする
    if (!this.$vuetify.breakpoint.smAndDown) {
      this.$router.replace('/settings/salons')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
