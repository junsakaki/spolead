<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Lessons :lessons="user.lessons.lessons" @getUser="getUser" />
  </div>
</template>

<script>
import Lessons from '~/components/organizer/organisms/Lessons.vue'

export default {
  components: { Lessons },
  data () {
    return {
      breadcrumbs: [
        ...this.$ORGANIZER_BREADCRUMBS,
        {
          text: '指導者マッチング',
          disabled: true
        }
      ],
      user: { lessons: { lessons: [] } }
    }
  },
  head () {
    return {
      title: '指導者マッチング | 管理者ページ | '
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
