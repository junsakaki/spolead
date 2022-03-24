<template>
  <v-row justify="center">
    <v-dialog v-if="dialog" :value="dialog" persistent max-width="600px">
      <salons-regist-form :salon="salon" @closeModal="closeModal" @submit="submit" />
    </v-dialog>
  </v-row>
</template>

<script>
import SalonsRegistForm from '../../salons/organisms/SalonsRegistForm.vue'
export default {
  components: {
    SalonsRegistForm
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    salon: {
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
          api: 'salonEdit',
          query: {
            id: this.salon.id
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
