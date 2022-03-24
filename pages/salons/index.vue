<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div v-if="salons.length > 0" class="salons">
      <v-row no-gutters>
        <v-col
          v-for="salon in salons"
          :key="salon.id"
          cols="12"
          sm="3"
          class="px-2 py-3"
        >
          <router-link :to="`/salons/${salon.id}`" class="salon">
            <v-card class="pb-2">
              <v-img
                v-if="salon.image_top"
                :src="salon.image_top"
                max-height="100"
                max-width="100%"
              />
              <div v-else class="salon-image" />
              <div class="body-1 font-weight-bold salon-name px-2">
                {{ salon.name }}
              </div>
              <div class="body-2 font-weight-bold owner-name mt-2 px-2">
                {{ salon.owner.name }}
              </div>
              <div class="caption salon-caption mt-2 px-2">
                {{ salon.caption }}
              </div>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </div>
    <div v-else class="d-flex justify-center">
      <span class="grey--text">
        登録されているサロンはありません
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'オンラインサロン',
          disabled: true
        }
      ],
      salons: []
    }
  },
  head () {
    return {
      title: 'オンラインサロン | '
    }
  },
  created () {
    this.getSalons()
  },
  methods: {
    getSalons () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'salonIndex'
        }).then((res) => {
          if (res.status === 200) {
            this.salons = res.data.salons
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.salon {
  text-decoration: none;
}
.salon-image {
  width: 100%;
  height: 100px;
  background: grey;
}
.salon-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  height: calc(16px * 1.5 * 2) // font-weight * line-height * line-clamp
}
.owner-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
.salon-caption {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  height: calc(12px * 1.2 * 3) // font-weight * line-height * line-clamp
}
</style>
