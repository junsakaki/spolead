<template>
  <div>
    <div class="subtitle-1 font-weight-bold">
      <div>クラウドファンディングを開始する</div>
      <div class="text-center px-4 mt-2">
        <router-link to="/funds/new" class="fund-link">
          <v-btn color="primary" outlined block>
            ファンド情報入力フォームへ
          </v-btn>
        </router-link>
      </div>
    </div>
    <div class="subtitle-1 font-weight-bold mt-8">
      <div>購入したリターン</div>
      <div v-if="funds.purchased.length > 0" class="mt-2">
        <v-card outlined tile style="margin-top: -1px;" class="fund-card">
          <v-row class="my-1 px-2">
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              リターン名
            </v-col>
            <v-col cols="12" sm="2" class="body-2 font-weight-bold text-center">
              金額
            </v-col>
            <v-col cols="12" sm="2" class="body-2 font-weight-bold text-center">
              購入個数
            </v-col>
            <v-col cols="12" sm="2" class="body-2 font-weight-bold text-center">
              支払い金額
            </v-col>
            <v-col cols="12" sm="2" class="body-2 font-weight-bold text-center">
              オーナー名
            </v-col>
            <v-col cols="12" sm="1" class="body-2 font-weight-bold text-center" />
          </v-row>
        </v-card>
        <div v-for="(item, i) in funds.purchased" :key="`fund-${item.id}-${i}`" class="fund-purchased-item">
          <router-link :to="`/funds/${item.owner.fund_id}`" class="fund-link">
            <v-card outlined tile style="margin-top: -1px;" class="fund-card">
              <v-row class="my-1 px-2">
                <v-col cols="12" sm="3" class="body-2 font-weight-bold">
                  {{ item.reduction.name }}
                </v-col>
                <v-col cols="12" sm="2" class="body-2 font-weight-bold text-center">
                  {{ item.amount }}円
                </v-col>
                <v-col cols="12" sm="2" class="body-2 font-weight-bold text-center">
                  {{ item.count }}個
                </v-col>
                <v-col cols="12" sm="2" class="body-2 font-weight-bold text-center">
                  {{ item.amount*item.count }}円
                </v-col>
                <v-col cols="12" sm="2" class="d-flex justify-center align-center caption">
                  <v-icon small class="mr-1">
                    mdi-account
                  </v-icon>
                  {{ item.owner.name }}
                </v-col>
                <v-col cols="12" sm="1" class="d-flex justify-center align-center caption" />
              </v-row>
            </v-card>
          </router-link>
          <div v-if="isWithinDeadline(item.created_at)" class="cancel">
            <v-btn x-small color="error" icon @click="showPaymentCancelModal(item)">
              <v-icon x-small>
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-cente mt-2">
        <span class="grey--text">
          購入したリターンはありません
        </span>
      </div>
    </div>
    <div class="subtitle-1 font-weight-bold mt-8">
      <div>公開中のファンド</div>
      <div v-if="funds.owned.length > 0" class="mt-2">
        <v-card
          v-for="fund in funds.owned"
          :key="fund.id"
          outlined
          tile
          style="margin-top: -1px;"
          class="fund-card"
        >
          <v-row class="my-1 px-2">
            <v-col cols="12" sm="9" class="body-2 font-weight-bold">
              {{ fund.name }}
            </v-col>
            <v-col cols="12" sm="3" class="d-flex justify-end align-center">
              <v-btn x-small class="ml-2 font-weight-bold" :color="fund.approval ? 'primary' : 'error'" elevation="0">
                {{ fund.approval ? '掲載中' : '審査中' }}
              </v-btn>
              <router-link :to="`/funds/${fund.id}`" class="ml-2 fund-link">
                <v-btn icon small>
                  <v-icon small>
                    mdi-eye
                  </v-icon>
                </v-btn>
              </router-link>
              <v-btn icon small class="ml-2" @click="showAnalyticsModal(fund)">
                <v-icon small>
                  mdi-chart-bar
                </v-icon>
              </v-btn>
              <v-btn icon small class="ml-2" @click="showEditModal(fund)">
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div v-else class="d-flex justify-cente mt-2">
        <span class="grey--text">
          掲載中のオンラインサロンはありません
        </span>
      </div>
    </div>
    <fund-analytics-modal
      :dialog="analyticsModal"
      :fund="selectedFund"
      @closeModal="closeModal"
    />
    <fund-edit-modal
      :dialog="editModal"
      :fund="selectedFund"
      @closeModal="closeModal"
    />
    <fund-payment-cancel-modal
      :dialog="paymentCancelModal"
      :reduction="selectedReduction"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import { addDays, isAfter } from 'date-fns'
import FundAnalyticsModal from '~/components/settings/organisms/FundAnalyticsModal.vue'
import FundEditModal from '~/components/settings/organisms/FundEditModal.vue'
import FundPaymentCancelModal from '~/components/settings/organisms/FundPaymentCancelModal.vue'

export default {
  components: { FundAnalyticsModal, FundEditModal, FundPaymentCancelModal },
  props: {
    funds: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      analyticsModal: false,
      editModal: false,
      paymentCancelModal: false,
      selectedFund: null,
      selectedReduction: null
    }
  },
  methods: {
    closeModal (shouldUpdateUser) {
      this.editModal = false
      this.analyticsModal = false
      this.paymentCancelModal = false
      this.selectedFund = null
      this.selectedReduction = null
      if (shouldUpdateUser) {
        this.$emit('getUser')
      }
    },
    showAnalyticsModal (fund) {
      this.selectedFund = fund
      this.analyticsModal = true
    },
    showEditModal (fund) {
      this.selectedFund = fund
      this.editModal = true
    },
    showPaymentCancelModal (reduction) {
      this.selectedReduction = reduction
      this.paymentCancelModal = true
    },
    isWithinDeadline (createdAt) {
      const coolingOffDays = 8
      const startDate = new Date(createdAt)
      const limitDate = addDays(startDate, coolingOffDays)
      const today = new Date()
      return isAfter(limitDate, today)
    }
  }
}
</script>
<style lang="scss" scoped>
.fund-link {
  text-decoration: none;
  color: inherit;
  .fund-card:hover {
    background-color: #1976d214;
    transition-duration: 0.28s;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
.fund-purchased-item {
  position: relative;
  .cancel {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
