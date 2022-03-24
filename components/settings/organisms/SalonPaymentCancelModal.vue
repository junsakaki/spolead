<template>
  <v-row justify="center">
    <v-dialog v-if="dialog" :value="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title />
        <v-card-text>
          サブスクリプションを取り消しますか？
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="onPaymentCancel">
            取り消す
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
    },
    salon: {
      type: Object,
      default: null
    }
  },
  methods: {
    onPaymentCancel () {
      const data = {
        type: 'subscription',
        payment_id: this.salon.payment_id
      }
      this.$store
        .dispatch('api/apiRequest', {
          api: 'paymentCancel',
          data
        }).then((res) => {
          if (res.status === 200) {
            this.salonWithdrawal()
          }
        })
    },
    salonWithdrawal () {
      const data = {
        user_id: this.salon.user_id,
        payment_id: this.salon.payment_id
      }
      this.$store
        .dispatch('api/apiRequest', {
          api: 'salonWithdrawal',
          data
        }).then((res) => {
          if (res.status === 200) {
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
