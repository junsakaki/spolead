<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="container">
      <lessons-regist-form @submit="submit" />
    </div>
  </v-layout>
</template>

<script>
import LessonsRegistForm from '~/components/lessons/organisms/LessonsRegistForm.vue'
export default {
  components: {
    LessonsRegistForm
  },
  data () {
    return {
      breadcrumbs: [
        {
          text: '指導者マッチングの登録申請',
          disabled: true
        }
      ],
      userId: null
    }
  },
  head () {
    return {
      title: '指導者マッチングの登録申請 | '
    }
  },
  created () {
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
              this.userId = Number(res.data.user.id)
            }
          })
      }
    },
    submit (form) {
      const data = { ...form }
      data.owner.user_id = this.userId
      this.$store
        .dispatch('api/apiRequest', {
          api: 'lessonCreate',
          data
        }).then((res) => {
          if (res.status === 200) {
            this.$router.push('/lessons')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';
.container {
  width: 100%;
}
</style>
