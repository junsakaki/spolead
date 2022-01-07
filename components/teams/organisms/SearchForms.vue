<template>
  <div>
    <div class="text-right">
      <v-btn
        class="mx-2 mb-4"
        fab
        dark
        small
        color="primary"
        @click="openModal"
      >
        <v-icon dark>
          mdi-magnify
        </v-icon>
      </v-btn>
      <search-forms-modal
        :dialog="isModalOpen"
        @execSearch="execSearch"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>

<script>
import SearchFormsModal from '~/components/teams/organisms/SearchFormsModal.vue'

export default {
  components: {
    SearchFormsModal
  },
  props: {
    options: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      isModalOpen: false
    }
  },
  methods: {
    execSearch (search) {
      this.$emit('execSearch', search)
    },
    openModal () {
      this.isModalOpen = true
    },
    closeModal () {
      this.isModalOpen = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
