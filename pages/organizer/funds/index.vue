<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Funds :funds="user.funds" @getUser="getUser" />
  </div>
</template>

<script>
import Funds from '~/components/organizer/organisms/Funds.vue'

export default {
  components: { Funds },
  data () {
    return {
      breadcrumbs: [
        ...this.$ORGANIZER_BREADCRUMBS,
        {
          text: 'クラウドファンディング',
          disabled: true
        }
      ],
      user: {
        funds: {
          owned: [],
          purchased: []
        }

      }
    }
  },
  head () {
    return {
      title: 'クラウドファンディング | 管理者ページ | '
    }
  },
  created () {
    // 未ログインの場合は主催者側ログイン画面へリダイレクトする
    const isLoggedIn = true
    if (!isLoggedIn) {
      this.$router.push('/organizer/login')
    }
    this.getOrganizer()
  },
  methods: {
    getOrganizer () {
      // this.$store
      //   .dispatch('api/apiRequest', {
      //     api: 'userIndex',
      //     query: {
      //       id: this.$auth.user.sub
      //     }
      //   }).then((res) => {
      //     if (res.status === 200) {
      //       this.user = res.data.user
      //     }
      //   })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
