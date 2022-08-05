<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Manage />
  </div>
</template>

<script>
import Manage from '~/components/organizer/organisms/Manage.vue'
export default {
  components: { Manage },
  data () {
    return {
      breadcrumbs: [
        ...this.$ORGANIZER_BREADCRUMBS,
        {
          text: '管理',
          disabled: true
        }
      ]
    }
  },
  head () {
    return {
      title: 'アカウント | 管理者ページ | '
    }
  },
  created () {
    // 未ログインの場合はトップ画面へリダイレクトする
    if (!localStorage.getItem('token')) {
      this.$router.replace('/')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
