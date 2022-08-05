<template>
  <div>
    <div class="subtitle-1 font-weight-bold">
      <div>参加中のオンラインサロン</div>
      <div v-for="(salon, i) in salons.participating" :key="`salon-${salon.salon.id}-${i}`" class="mt-2 salon-purchased-item">
        <router-link :to="`/salons/${salon.salon.id}`" class="salon-link">
          <v-card outlined tile style="margin-top: -1px;" class="salon-card">
            <v-row class="my-1 px-2">
              <v-col cols="12" sm="9" class=" body-2 font-weight-bold">
                {{ salon.salon.name }} - {{ salon.plans.name }}
              </v-col>
              <v-col cols="12" sm="3" class="d-flex justify-end align-center caption">
                <v-icon small class="mr-1">
                  mdi-account
                </v-icon>
                {{ salon.owner.name }}
              </v-col>
            </v-row>
          </v-card>
        </router-link>
        <div class="cancel">
          <v-btn x-small color="error" icon @click="showPaymentCancelModal(salon)">
            <v-icon x-small>
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div v-if="salons.participating.length === 0" class="d-flex justify-cente mt-2">
        <span class="grey--text">
          参加中のオンラインサロンはありません
        </span>
      </div>
    </div>
    <salon-payment-cancel-modal
      :dialog="paymentCancelModal"
      :salon="selectedSalon"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import SalonPaymentCancelModal from '~/components/settings/organisms/SalonPaymentCancelModal.vue'

export default {
  components: { SalonPaymentCancelModal },
  props: {
    salons: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      paymentCancelModal: false,
      selectedSalon: null
    }
  },
  methods: {
    closeModal (shouldUpdateUser) {
      this.paymentCancelModal = false
      this.selectedSalon = null
      if (shouldUpdateUser) {
        this.$emit('getUser')
      }
    },
    showPaymentCancelModal (item) {
      this.selectedSalon = { ...item }
      this.paymentCancelModal = true
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
.salon-purchased-item {
  position: relative;
  .cancel {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
