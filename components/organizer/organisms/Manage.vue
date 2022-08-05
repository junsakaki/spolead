<template>
  <div>
    <div class="d-flex align-center mt-8">
      <div class="subtitle-1 font-weight-bold">
        売上報告
      </div>
      <v-btn x-small text color="primary" class="ml-4" @click="showManageEarningsReportModal">
        表示
      </v-btn>
    </div>
    <div class="d-flex align-center mt-8">
      <div class="subtitle-1 font-weight-bold">
        出金履歴
      </div>
      <v-btn x-small text color="primary" class="ml-4" @click="showManageWithdrawalHistoryModal">
        表示
      </v-btn>
    </div>
    <div class="mt-8 mb-8">
      <div class="subtitle-1 font-weight-bold">
        メールアドレス変更
      </div>
      <div class="d-flex align-center ml-4">
        <div class="body-1">
          test@gmail.com
        </div>
        <v-btn x-small text color="primary" class="ml-4" @click="showManageUpdateEmailAddressModal">
          変更
        </v-btn>
      </div>
    </div>
    <manage-earnings-report-modal
      :dialog="manageEarningsReportModal"
      @closeModal="closeModal"
    />
    <manage-withdrawal-history-modal
      :dialog="manageWithdrawalHistoryModal"
      @closeModal="closeModal"
    />
    <manage-update-email-address-modal
      :dialog="manageUpdateEmailAddressModal"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import ManageEarningsReportModal from '~/components/organizer/organisms/ManageEarningsReportModal.vue'
import ManageWithdrawalHistoryModal from '~/components/organizer/organisms/ManageWithdrawalHistoryModal.vue'
import ManageUpdateEmailAddressModal from '~/components/organizer/organisms/ManageUpdateEmailAddressModal.vue'

export default {
  components: { ManageEarningsReportModal, ManageWithdrawalHistoryModal, ManageUpdateEmailAddressModal },
  data () {
    return {
      manageEarningsReportModal: false,
      manageWithdrawalHistoryModal: false,
      manageUpdateEmailAddressModal: false
    }
  },
  methods: {
    closeModal () {
      this.manageEarningsReportModal = false
      this.manageWithdrawalHistoryModal = false
      this.manageUpdateEmailAddressModal = false
    },
    showManageEarningsReportModal () {
      this.manageEarningsReportModal = true
    },
    showManageWithdrawalHistoryModal () {
      this.manageWithdrawalHistoryModal = true
    },
    showManageUpdateEmailAddressModal () {
      this.manageUpdateEmailAddressModal = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
