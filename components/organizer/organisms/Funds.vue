<template>
  <div>
    <div class="subtitle-1 font-weight-bold">
      <div>クラウドファンディングを開始する</div>
      <div class="text-center px-4 mt-2">
        <router-link to="/funds/new" class="fund-link" target="_blank">
          <v-btn color="primary" outlined block>
            ファンド情報入力フォームへ
            <v-icon small class="ml-1">
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </router-link>
      </div>
    </div>
    <div class="subtitle-1 font-weight-bold mt-8 mb-8">
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
  </div>
</template>

<script>
import FundAnalyticsModal from '~/components/organizer/organisms/FundAnalyticsModal.vue'
import FundEditModal from '~/components/organizer/organisms/FundEditModal.vue'

export default {
  components: { FundAnalyticsModal, FundEditModal },
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
      selectedFund: null,
      selectedReduction: null
    }
  },
  methods: {
    closeModal (shouldUpdateUser) {
      this.editModal = false
      this.analyticsModal = false
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
</style>
