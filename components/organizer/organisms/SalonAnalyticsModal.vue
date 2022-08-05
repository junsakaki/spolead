<template>
  <v-row justify="center">
    <v-dialog v-if="dialog" :value="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="headline">参加状況</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              プラン名
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              料金
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              参加者数
            </v-col>
          </v-row>
          <v-row v-for="plan in salon.plans" :key="`plan-${plan.id}`">
            <v-col cols="12" sm="6">
              {{ plan.name }}
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              {{ plan.amount.toLocaleString() }}/1ヶ月
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              {{ plan.participations_count }}人
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
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
    },
    salon: {
      type: Object,
      default: null
    }
  },
  created () {
    console.log(this.salon)
  },
  methods: {
    closeModal (shouldUpdateTeamDetail) {
      this.$emit('closeModal', shouldUpdateTeamDetail)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
