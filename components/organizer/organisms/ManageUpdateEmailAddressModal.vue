<template>
  <v-row justify="center">
    <v-dialog v-if="dialog" :value="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="headline">メールアドレス変更</span>
        </v-card-title>
        <v-card-text>
          <div class="ml-4">
            現在のメールアドレス: test@gmail.comment
            <v-row no-gutters>
              <v-text-field label="新しいメールアドレスを入力" />
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary">
            変更
          </v-btn>
          <v-btn color="blue darken-1" text @click="closeModal(false)">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
    // salon: {
    //   type: Object,
    //   default: null
    // }
  },
  created () {
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
