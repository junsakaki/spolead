<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div v-if="$vuetify.breakpoint.smAndDown" class="mb-6">
      <Funds :funds="user.funds" @getUser="getUser" />
    </div>
    <v-row v-else class="mb-6">
      <v-col cols="12" sm="3">
        <Menu />
      </v-col>
      <v-col cols="12" sm="9">
        <Funds :funds="user.funds" @getUser="getUser" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Menu from '~/components/settings/organisms/Menu.vue'
import Funds from '~/components/settings/organisms/Funds.vue'

export default {
  components: { Menu, Funds },
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: '各種設定',
          link: true,
          exact: true,
          disabled: false,
          to: {
            path: '/settings'
          }
        },
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
      title: 'クラウドファンディング - 各種設定 | '
    }
  },
  created () {
    // 未ログインの場合はトップ画面へリダイレクトする
    if (!this.$auth.loggedIn) {
      this.$router.replace('/login')
    }
    this.getUser()
  },
  methods: {
    getUser () {
      if (this.$auth && this.$auth.user) {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'userIndex',
            query: {
              id: this.$auth.user.sub
            }
          }).then((res) => {
            if (res.status === 200) {
              this.user = res.data.user
            }
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
