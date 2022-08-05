<template>
  <v-row justify="center">
    <v-dialog v-if="dialog" :value="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="headline">概要</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="3">
              目標金額
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              現在
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              支援者数
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              残り
            </v-col>
            <v-col cols="12" sm="3">
              {{ fund.target_money ? fund.target_money.toLocaleString() : 0 }}円
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              {{ fund.supported_money ? fund.supported_money.toLocaleString() : 0 }}円
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              {{ fund.supporters_count ? fund.supporters_count.toLocaleString() : 0 }}人
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              {{ fund.limit_date ? getDaysLeft(fund.limit_date) : '' }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-title class="justify-space-between">
          <span class="headline">購入状況</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              リターン名
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              価格
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              購入者数
            </v-col>
          </v-row>
          <v-row v-for="reduction in fund.reductions" :key="`reduction-${reduction.id}`">
            <v-col cols="12" sm="6">
              {{ reduction.name }}
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              {{ reduction.amount.toLocaleString() }}
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              {{ reduction.purchased_count }}人
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
import getDaysLeft from '~/utils/getDaysLeft'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    fund: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      getDaysLeft
    }
  },
  created () {
    console.log(this.fund)
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
