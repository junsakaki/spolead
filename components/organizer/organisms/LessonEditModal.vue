<template>
  <v-row justify="center">
    <v-dialog v-if="dialog" :value="dialog" persistent max-width="600px">
      <lessons-regist-form :lesson="lesson" @closeModal="closeModal" @submit="submit" />
    </v-dialog>
  </v-row>
</template>

<script>
import LessonsRegistForm from '../../lessons/organisms/LessonsRegistForm.vue'
export default {
  components: {
    LessonsRegistForm
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    lesson: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    submit (data) {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'lessonEdit',
          query: {
            id: this.lesson.id
          },
          data
        }).then((res) => {
          if (res.status === 200) {
            this.closeModal(true)
          }
        })
    },
    closeModal (shouldUpdateUser) {
      this.$emit('closeModal', shouldUpdateUser)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
