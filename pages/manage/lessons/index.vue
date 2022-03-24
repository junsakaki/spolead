<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div v-if="$vuetify.breakpoint.smAndDown" class="mb-6">
      <Lessons :lessons="lessons" @updateApproval="updateApproval" />
    </div>
    <v-row v-else class="mb-6">
      <v-col cols="12" sm="3">
        <Menu />
      </v-col>
      <v-col cols="12" sm="9">
        <Lessons :lessons="lessons" @updateApproval="updateApproval" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Menu from '~/components/manage/organisms/Menu.vue'
import Lessons from '~/components/manage/organisms/Lessons.vue'

export default {
  components: { Menu, Lessons },
  data () {
    return {
      lessons: [],
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
    updateApproval (lesson) {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'manageLessonApproval',
          data: {
            id: lesson.id
          }
        }).then((res) => {
          if (res.status === 200) {
            this.getLessons()
          }
        })
    },
    getLessons () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'manageLessonIndex'
        }).then((res) => {
          if (res.status === 200) {
            this.lessons = res.data.lessons
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
                this.getLessons()
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
