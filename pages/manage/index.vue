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
import Menu from '~/components/manage/organisms/Menu.vue'

export default {
  components: { Menu },
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'サービス管理',
          disabled: true
        }
      ]
    }
  },
  head () {
    return {
      title: 'サービス管理 | '
    }
  },
  created () {
    // 未ログインの場合はトップ画面へリダイレクトする
    if (!this.$auth.loggedIn) {
      this.$router.replace('/login')
    }
    // デスクトップ版のみ/settingと/setting/accountの内容が同じなのでリプレイスする
    if (!this.$vuetify.breakpoint.smAndDown) {
      this.$router.replace('/manage/salons')
    }
    this.checkRole()
  },
  methods: {
    checkRole () {
      if (this.$auth && this.$auth.user) {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'userIndex',
            query: {
              id: this.$auth.user.sub
            }
          }).then((res) => {
            if (res.status === 200) {
              if (res.data.user.role !== 'admin') {
                this.$router.replace('/')
              }
            }
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
