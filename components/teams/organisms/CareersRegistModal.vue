<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="headline">進路実績の登録フォーム</span>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="content"
            autocomplete="進路実績の内容"
            label="進路実績の内容"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeModal">
            やめる
          </v-btn>
          <v-btn color="blue darken-1" text :disabled="content === ''" @click="postCareer">
            投稿する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  components: {
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    teamId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    postCareer () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'careerCreate',
          data: {
            team_id: this.teamId,
            content: this.content
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.content = ''
            this.closeModal(true)
          }
        })
    },
    closeModal (shouldUpdateTeamDetail) {
      this.$emit('closeModal', shouldUpdateTeamDetail)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
