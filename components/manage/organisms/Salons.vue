<template>
  <div>
    <div class="subtitle-1 font-weight-bold">
      <div>オンラインサロン一覧</div>
      <div v-if="salons.length > 0" class="mt-2">
        <v-card
          v-for="salon in salons"
          :key="salon.id"
          outlined
          tile
          style="margin-top: -1px;"
          class="salon-card"
        >
          <v-row class="my-1 px-2">
            <v-col cols="12" sm="9" class="d-flex align-center body-2 font-weight-bold">
              {{ salon.name }}
            </v-col>
            <v-col cols="12" sm="3" class="d-flex justify-end align-center text-center">
              <v-btn x-small class="ml-2 font-weight-bold" :color="salon.approval ? 'error' : 'primary'" @click="updateApproval(salon)">
                {{ salon.approval ? '承認取消' : '承認する' }}
              </v-btn>
              <v-btn icon small class="ml-2" @click="showDetailModal(salon)">
                <v-icon small>
                  mdi-eye
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div v-else class="mt-2">
        オンラインサロンはありません
      </div>
    </div>
    <salon-detail-modal
      :dialog="detailModal"
      :salon="selectedSalon"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import SalonDetailModal from '~/components/manage/organisms/SalonDetailModal.vue'

export default {
  components: { SalonDetailModal },
  props: {
    salons: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      detailModal: false,
      selectedSalon: null
    }
  },
  methods: {
    closeModal (shouldUpdateUser) {
      this.detailModal = false
      this.selectedSalon = null
      // TODO: 必要があればサロン情報を含むユーザー情報を再取得する
    },
    showDetailModal (salon) {
      this.selectedSalon = salon
      this.detailModal = true
    },
    updateApproval (salon) {
      this.$emit('updateApproval', salon)
    }
  }
}
</script>
<style lang="scss" scoped>
.salon-link {
  text-decoration: none;
  color: inherit;
  .salon-card:hover {
    background-color: #1976d214;
    transition-duration: 0.28s;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
