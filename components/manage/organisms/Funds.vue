<template>
  <div>
    <div class="subtitle-1 font-weight-bold">
      <div>クラウドファンディング一覧</div>
      <div v-if="funds.length > 0" class="mt-2">
        <v-card
          v-for="fund in funds"
          :key="fund.id"
          outlined
          tile
          style="margin-top: -1px;"
          class="fund-card"
        >
          <v-row class="my-1 px-2">
            <v-col cols="12" sm="9" class="d-flex align-center body-2 font-weight-bold">
              {{ fund.name }}
            </v-col>
            <v-col cols="12" sm="3" class="d-flex justify-end align-center text-center">
              <v-btn x-small class="ml-2 font-weight-bold" :color="fund.approval ? 'error' : 'primary'" @click="updateApproval(fund)">
                {{ fund.approval ? '承認取消' : '承認する' }}
              </v-btn>
              <v-btn icon small class="ml-2" @click="showDetailModal(fund)">
                <v-icon small>
                  mdi-eye
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div v-else class="mt-2">
        クラウドファンディングはありません
      </div>
    </div>
    <fund-detail-modal
      :dialog="detailModal"
      :fund="selectedFund"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import FundDetailModal from '~/components/manage/organisms/FundDetailModal.vue'

export default {
  components: { FundDetailModal },
  props: {
    funds: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      detailModal: false,
      selectedFund: null
    }
  },
  methods: {
    closeModal (shouldUpdateUser) {
      this.detailModal = false
      this.selectedFund = null
      // TODO: 必要があればサロン情報を含むユーザー情報を再取得する
    },
    showDetailModal (fund) {
      this.selectedFund = fund
      this.detailModal = true
    },
    updateApproval (fund) {
      this.$emit('updateApproval', fund)
    }
  }
}
</script>
<style lang="scss" scoped>
.lesson-link {
  text-decoration: none;
  color: inherit;
  .lesson-card:hover {
    background-color: #1976d214;
    transition-duration: 0.28s;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
