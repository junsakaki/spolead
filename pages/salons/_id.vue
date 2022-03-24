<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <div class="text-h5 font-weight-bold">
          {{ salon.name }}
        </div>
        <div class="body-1 mt-8">
          {{ salon.caption }}
        </div>
        <div class="body-2 mt-8">
          {{ salon.owner.name }}
        </div>
        <v-img
          v-if="salon.image_top"
          :src="salon.image_top"
          max-height="200"
          max-width="100%"
          class="salon-image mt-8"
        />
        <div v-else class="salon-image mt-8" />
        <v-img
          v-if="salon.image_sub"
          :src="salon.image_sub"
          max-height="200"
          max-width="100%"
          class="salon-image mt-8"
        />
        <div v-else class="salon-image mt-8" />
        <div class="content mt-8">
          <div class="text-h5 font-weight-bold">
            サロン概要
          </div>
          <div class="mt-2">
            <p v-html="transformTextToHtml(salon.content)" />
          </div>
        </div>
        <div class="background mt-8">
          <div class="text-h5 font-weight-bold">
            背景
          </div>
          <div class="mt-2">
            <p class="body-1" v-html="transformTextToHtml(salon.background)" />
          </div>
        </div>
        <div class="selfIntroduction mt-8">
          <div class="text-h5 font-weight-bold">
            自己紹介
          </div>
          <div class="mt-2">
            <p class="body-1" v-html="transformTextToHtml(salon.selfIntroduction)" />
          </div>
        </div>
        <div class="precautions mt-8">
          <div class="text-h5 font-weight-bold">
            注意事項
          </div>
          <div class="mt-2">
            <p class="body-1" v-html="transformTextToHtml(salon.precautions)" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" :class="!$vuetify.breakpoint.smAndDown && 'pl-4'">
        <v-banner elevation="4" rounded>
          <div v-for="(plan, i) in salon.plans" :key="plan.id" class="py-4">
            <div class="body-1 font-weight-bold">
              {{ plan.name }}
            </div>
            <div class="text-caption">
              {{ plan.caption }}
            </div>
            <div class="text-center mt-4">
              <font style="font-size: 28px;">
                {{ plan.amount.toLocaleString() }}
              </font>
              円 / 1ヶ月
            </div>
            <div class="d-flex justify-center align-center">
              <router-link :to="`/payment?type=salon&id=${salon.id}&planId=${plan.id}&name=${plan.name}&amount=${plan.amount}&paymentType=subscription&subscriptionPlanId=${plan.plan_id}`" target="_blank" class="text-center mt-4">
                <common-button button-color="primary">
                  このプランで参加する
                </common-button>
              </router-link>
            </div>
            <v-divider v-if="i !== salon.plans.length - 1" class="mt-8" />
          </div>
        </v-banner>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import transformTextToHtml from '~/utils/transformTextToHtml'
import CommonButton from '~/components/shared/atoms/CommonButton.vue'

export default {
  components: { CommonButton },
  data () {
    return {
      transformTextToHtml,
      breadcrumbs: [],
      salon: { owner: {} }
    }
  },
  head () {
    return {
      title: `${this.salon.name} - オンラインサロン | `
    }
  },
  created () {
    this.getSalonDetail()
  },
  methods: {
    getSalonDetail () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'salonDetail',
          query: {
            id: this.$route.params.id
          }
        }).then((res) => {
          if (res.status === 200) {
            this.salon = res.data.salon
          }
          this.breadcrumbs = [
            ...this.$BREADCRUMBS,
            {
              text: 'オンラインサロン',
              link: true,
              exact: true,
              disabled: false,
              to: {
                path: '/salons'
              }
            },
            {
              text: this.salon.name,
              disabled: true
            }
          ]
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.salon-image {
  width: 100%;
  height: 200px;
  background: grey;
}
.plan-name {
  border-bottom: solid 1px blue;
}
</style>
