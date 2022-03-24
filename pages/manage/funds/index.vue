<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div v-if="$vuetify.breakpoint.smAndDown" class="mb-6">
      <Funds :funds="funds" @updateApproval="updateApproval" />
    </div>
    <v-row v-else class="mb-6">
      <v-col cols="12" sm="3">
        <Menu />
      </v-col>
      <v-col cols="12" sm="9">
        <Funds :funds="funds" @updateApproval="updateApproval" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Menu from '~/components/manage/organisms/Menu.vue'
import Funds from '~/components/manage/organisms/Funds.vue'

export default {
  components: { Menu, Funds },
  data () {
    return {
      funds: [],
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'サービス管理',
          link: true,
          exact: true,
          disabled: false,
          to: {
            path: '/manage'
          }
        },
        {
          text: 'オンラインサロン',
          disabled: true
        }
      ]
    }
  },
  head () {
    return {
      title: 'オンラインサロン - サービス管理 | '
    }
  },
  created () {
    // 未ログインの場合はトップ画面へリダイレクトする
    if (!this.$auth.loggedIn) {
      this.$router.replace('/login')
    }
    this.checkRole()
  },
  methods: {
    updateApproval (funds) {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'manageFundApproval',
          data: {
            id: funds.id
          }
        }).then((res) => {
          if (res.status === 200) {
            this.getFunds()
          }
        })
    },
    getFunds () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'manageFundIndex'
        }).then((res) => {
          if (res.status === 200) {
            this.funds = res.data.funds
          }
        })
    },
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
              } else {
                this.getFunds()
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
