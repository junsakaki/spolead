<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div>
      <talks-menu :talks="talks" :user-id="userId" />
    </div>
  </div>
</template>

<script>
import transformTextToHtml from '~/utils/transformTextToHtml'
import TalksMenu from '~/components/talks/organisms/Menu.vue'

export default {
  components: { TalksMenu },
  data () {
    return {
      transformTextToHtml,
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'トークルーム',
          disabled: true
        }
      ],
      userId: null,
      talks: []
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
            this.isLoading = false
            if (res.status === 200) {
              this.userId = Number(res.data.user.id)
              this.getTalks()
            }
          })
      } else {
        this.$router.push('/login')
      }
    },
    getTalks () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'talkIndex',
          params: {
            user_id: this.userId
          }
        }).then((res) => {
          if (res.status === 200) {
            this.talks = res.data.lessons_talk_rooms
          }
        })
    }
  }
}
</script>
<style lang="scss">
</style>
