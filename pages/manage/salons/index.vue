<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div v-if="$vuetify.breakpoint.smAndDown" class="mb-6">
      <Salons :salons="salons" @updateApproval="updateApproval" />
    </div>
    <v-row v-else class="mb-6">
      <v-col cols="12" sm="3">
        <Menu />
      </v-col>
      <v-col cols="12" sm="9">
        <Salons :salons="salons" @updateApproval="updateApproval" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Menu from '~/components/manage/organisms/Menu.vue'
import Salons from '~/components/manage/organisms/Salons.vue'

export default {
  components: { Menu, Salons },
  data () {
    return {
      salons: [],
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
    updateApproval (salon) {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'manageSalonApproval',
          data: {
            id: salon.id
          }
        }).then((res) => {
          if (res.status === 200) {
            this.getSalons()
          }
        })
    },
    getSalons () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'manageSalonIndex'
        }).then((res) => {
          if (res.status === 200) {
            this.salons = res.data.salons
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
                this.getSalons()
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
