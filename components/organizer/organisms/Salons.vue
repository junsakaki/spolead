<template>
  <div>
    <div class="subtitle-1 font-weight-bold">
      <div>オンラインサロンを掲載する</div>
      <div class="text-center px-4 mt-2">
        <router-link to="/salons/new" class="salon-link" target="_blank">
          <v-btn color="primary" outlined block>
            掲載情報入力フォームへ
            <v-icon small class="ml-1">
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </router-link>
      </div>
    </div>
    <div class="subtitle-1 font-weight-bold mt-8 mb-8">
      <div>掲載中のオンラインサロン</div>
      <div v-if="salons.owned.length > 0" class="mt-2">
        <v-card
          v-for="salon in salons.owned"
          :key="salon.id"
          outlined
          tile
          style="margin-top: -1px;"
          class="salon-card"
        >
          <v-row class="my-1 px-2">
            <v-col cols="12" sm="9" class="body-2 font-weight-bold">
              {{ salon.name }}
            </v-col>
            <v-col cols="12" sm="3" class="d-flex justify-end align-center">
              <v-btn x-small class="ml-2 font-weight-bold" :color="salon.approval ? 'primary' : 'error'" elevation="0">
                {{ salon.approval ? '掲載中' : '審査中' }}
              </v-btn>
              <router-link :to="`/salons/${salon.id}`" class="ml-2 salon-link">
                <v-btn icon small>
                  <v-icon small>
                    mdi-eye
                  </v-icon>
                </v-btn>
              </router-link>
              <v-btn icon small class="ml-2" @click="showAnalyticsModal(salon)">
                <v-icon small>
                  mdi-chart-bar
                </v-icon>
              </v-btn>
              <v-btn icon small class="ml-2" @click="showEditModal(salon)">
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
    <salon-analytics-modal
      :dialog="analyticsModal"
      :salon="selectedSalon"
      @closeModal="closeModal"
    />
    <salon-edit-modal
      :dialog="editModal"
      :salon="selectedSalon"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import SalonAnalyticsModal from '~/components/organizer/organisms/SalonAnalyticsModal.vue'
import SalonEditModal from '~/components/organizer/organisms/SalonEditModal.vue'

export default {
  components: { SalonAnalyticsModal, SalonEditModal },
  props: {
    salons: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      analyticsModal: false,
      editModal: false,
      selectedSalon: null
    }
  },
  methods: {
    closeModal (shouldUpdateUser) {
      this.editModal = false
      this.analyticsModal = false
      this.selectedSalon = null
      if (shouldUpdateUser) {
        this.$emit('getUser')
      }
    },
    showAnalyticsModal (item) {
      this.selectedSalon = { ...item }
      this.analyticsModal = true
    },
    showEditModal (item) {
      this.selectedSalon = { ...item }
      this.editModal = true
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
