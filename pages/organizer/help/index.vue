<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Help />
  </div>
</template>

<script>
import Help from '~/components/organizer/organisms/Help.vue'

export default {
  components: { Help },
  data () {
    return {
      breadcrumbs: [
        ...this.$ORGANIZER_BREADCRUMBS,
        {
          text: 'ヘルプ・Q&A',
          disabled: true
        }
      ],
      user: {
        salons: {
          owned: [],
          participating: []
        }
      }
    }
  },
  head () {
    return {
      title: 'オンラインサロン | 管理者ページ | '
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
