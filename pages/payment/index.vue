<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row class="body-1" no-gutters>
      <v-col cols="12" sm="3" class="font-weight-bold">
        <v-card outlined tile class="pa-2">
          名称
        </v-card>
      </v-col>
      <v-col cols="12" sm="9">
        <v-card outlined tile class="pa-2">
          {{ $route.query.name }}
        </v-card>
      </v-col>
      <v-col v-if="$route.query.paymentType !== 'subscription'" cols="12" sm="3" class="font-weight-bold">
        <v-card outlined tile class="pa-2">
          購入個数
          <font color="red" class="ml-2 caption font-weight-bold">
            必須
          </font>
        </v-card>
      </v-col>
      <v-col v-if="$route.query.paymentType !== 'subscription'" cols="12" sm="9">
        <v-card outlined tile class="pa-2">
          <select v-model="purhaseCount" class="select-box px-2">
            <option v-for="item in purhaseCounts" :key="`selectItem-${item.value}`" :value="item.value">
              {{ item.label }}
            </option>
          </select>
          個
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="font-weight-bold">
        <v-card outlined tile class="pa-2">
          {{ $route.query.paymentType === 'subscription' ? '月額' : '支払い金額' }}
        </v-card>
      </v-col>
      <v-col cols="12" sm="9">
        <v-card outlined tile class="pa-2">
          {{ (purhaseCount * Number($route.query.amount)).toLocaleString() }}円
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="font-weight-bold">
        <v-card outlined tile style="padding: 15px 8px !important; min-height: 56px;">
          カード情報
          <font color="red" class="ml-2 caption font-weight-bold">
            必須
          </font>
        </v-card>
      </v-col>
      <v-col cols="12" sm="9">
        <v-card outlined tile class="pa-2" style="min-height: 56px;">
          <div>
            <script
              type="text/javascript"
              src="https://checkout.pay.jp/"
              class="payjp-button"
              data-key="pk_test_9b25bd2b15791cf0db83bb03"
              data-text="カード情報をしてください"
              data-submit-text="カード情報を確定する"
              data-partial="true"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="mt-4">
      <v-btn color="green darken-1" dark block :disabled="purhaseCount === null" @click="confirmBeforePurchase">
        購入手続きへ進む
      </v-btn>
    </div>
    <v-snackbar v-model="snackbar.display" top min-height="40" height="40" color="error">
      {{ snackbar.text }}
    </v-snackbar>
    <v-dialog v-if="dialog" :value="dialog" persistent max-width="600px">
      <v-card class="pt-4">
        <v-card-text>
          <div class="body-1 font-weight-bold">
            購入手続きを実行しますか？
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="submitPurchase">
            実行する
          </v-btn>
          <v-btn color="error" dark @click="closeModal(false)">
            キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: '商品購入',
          disabled: true
        }
      ],
      purhaseCount: 1,
      purhaseCounts: [
        { label: '選択してください', value: null },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 }
      ],
      snackbar: {
        display: false,
        text: ''
      },
      token: '',
      dialog: false,
      userId: null
    }
  },
  head () {
    return {
      title: '商品購入 | '
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
      } else {
        this.$router.push('/login')
      }
    },
    confirmBeforePurchase () {
      const token = document.getElementsByName('payjp-token')[0].value
      if (token === '') {
        this.snackbar = {
          display: true,
          text: 'カード情報を入力してください'
        }
        return
      }
      this.token = token
      this.dialog = true
    },
    onPurchaseCompleted ({ paymentId }) {
      const data = {
        user_id: this.userId,
        id: Number(this.$route.query.id),
        amount: Number(this.$route.query.amount),
        count: this.purhaseCount,
        payment_id: paymentId,
        type: this.$route.query.paymentType
      }
      if (this.$route.query.type === 'fund') {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'fundPurchase',
            data
          }).then((res) => {
            if (res.status === 200) {
              window.close()
            }
          }).catch(() => {
            this.snackbar = {
              display: true,
              text: 'クラウドファンディングの購入処理に失敗しました'
            }
          })
      }
      if (this.$route.query.type === 'salon') {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'salonParticipate',
            data: {
              ...data,
              plan_id: Number(this.$route.query.planId)
            }
          }).then((res) => {
            if (res.status === 200) {
              window.close()
            }
          }).catch(() => {
            this.snackbar = {
              display: true,
              text: 'オンラインサロンの購入処理に失敗しました'
            }
          })
      }
      if (this.$route.query.type === 'lesson') {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'talkCommentPayment',
            data: {
              ...data,
              comment_payment_id: Number(this.$route.query.id)
            },
            query: {
              id: Number(this.$route.query.id)
            }
          }).then((res) => {
            if (res.status === 200) {
              window.close()
            }
          }).catch(() => {
            this.snackbar = {
              display: true,
              text: '指導者マッチングの購入処理に失敗しました'
            }
          })
      }
    },
    submitPurchase () {
      this.closeModal()
      const data = {
        token: this.token,
        amount: Number(this.$route.query.amount) * this.purhaseCount,
        type: this.$route.query.paymentType
      }
      if (this.$route.query.paymentType === 'charge') {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'payment',
            data
          }).then((res) => {
            if (res.status === 200) {
              this.onPurchaseCompleted({ paymentId: res.data.data.id })
            }
          }).catch(() => {
            this.snackbar = {
              display: true,
              text: '購入に失敗しました'
            }
          })
      } else if (this.$route.query.paymentType === 'subscription') {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'paymentCustomer',
            data: { token: this.token }
          }).then((res) => {
            if (res.status === 200) {
              this.$store
                .dispatch('api/apiRequest', {
                  api: 'payment',
                  data: {
                    ...data,
                    plan: this.$route.query.subscriptionPlanId,
                    customer: res.data.data.id
                  }
                }).then((res) => {
                  if (res.status === 200) {
                    this.onPurchaseCompleted({ paymentId: res.data.data.id })
                  }
                }).catch(() => {
                  this.snackbar = {
                    display: true,
                    text: 'サブスクリプションの登録に失敗しました'
                  }
                })
            }
          }).catch(() => {
            this.snackbar = {
              display: true,
              text: 'サブスクリプションにおける顧客情報登録に失敗しました'
            }
          })
      }
    },
    closeModal () {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  border: solid 1px rgba(156, 156, 156, 0.37);
  border-radius: 4px !important; // vuetifyの設定に上書きされてしまうため!important
  margin-bottom: -1px; // border分のレイアウト崩れを調整
  margin-top: -1px; // border分のレイアウト崩れを調整
}
</style>
