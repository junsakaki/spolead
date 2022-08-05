<template>
  <div>
    <TopMessage />
  </div>
</template>

<script>
import TopMessage from '~/components/organizer/organisms/TopMessage.vue'

export default {
  components: { TopMessage },
  head () {
    return {
      title: 'TOP | 管理者ページ | '
    }
  },
  created () {
    // 未ログインの場合は主催者側ログイン画面へリダイレクトする
    const isLoggedIn = true
    if (!isLoggedIn) {
      this.$router.push('/organizer/login')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
