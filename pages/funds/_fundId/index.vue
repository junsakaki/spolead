<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="text-h5 font-weight-bold">
      {{ fund.name }}
    </div>
    <v-row no-gutters class="mt-8">
      <v-col cols="12" md="8">
        <div class="body-1">
          {{ fund.caption }}
        </div>
        <div class="body-2 mt-8">
          {{ fund.owner.name }}
        </div>
        <v-img
          v-if="fund.image_top"
          :src="fund.image_top"
          max-height="200"
          max-width="100%"
          class="fund-image mt-8"
        />
        <div v-else class="fund-image mt-8" />
        <v-img
          v-if="fund.image_sub"
          :src="fund.image_sub"
          max-height="200"
          max-width="100%"
          class="fund-image mt-8"
        />
        <div v-else class="fund-image mt-8" />
        <div class="content mt-8">
          <div class="text-h5 font-weight-bold">
            ファンド概要
          </div>
          <div class="mt-2">
            <p v-html="transformTextToHtml(fund.content)" />
          </div>
        </div>
        <div class="background mt-8">
          <div class="text-h5 font-weight-bold">
            背景
          </div>
          <div class="mt-2">
            <p class="body-1" v-html="transformTextToHtml(fund.background)" />
          </div>
        </div>
        <div class="selfIntroduction mt-8">
          <div class="text-h5 font-weight-bold">
            自己紹介
          </div>
          <div class="mt-2">
            <p class="body-1" v-html="transformTextToHtml(fund.self_introduction)" />
          </div>
        </div>
        <div class="precautions mt-8">
          <div class="text-h5 font-weight-bold">
            注意事項
          </div>
          <div class="mt-2">
            <p class="body-1" v-html="transformTextToHtml(fund.precautions)" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" :class="!$vuetify.breakpoint.smAndDown && 'pl-4'">
        <v-banner elevation="4" rounded>
          <div class="py-4">
            <div class="body-2 font-weight-bold">
              現在
            </div>
            <div class="text-h4  font-weight-bold ml-4">
              {{ fund.supported_money ? fund.supported_money.toLocaleString() : 0 }}円
            </div>
            <div class="meter mt-4">
              <div class="meter-in">
                <div class="bar" :style="`width: ${Math.floor(fund.supported_money/fund.target_money*100)}%;`">
                  <span>{{ Math.floor(fund.supported_money/fund.target_money*100) }}%</span>
                </div>
              </div>
              <span>{{ Math.floor(fund.supported_money/fund.target_money*100) }}%</span>
            </div>
            <div class="caption  font-weight-bold ml-4">
              目標金額: {{ fund.target_money ? fund.target_money.toLocaleString() : 0 }}円
            </div>
            <div class="body-2 font-weight-bold">
              支援者
            </div>
            <div class="text-h4 font-weight-bold ml-4">
              {{ fund.supporters_count ? fund.supporters_count.toLocaleString() : 0 }}人
            </div>
            <div class="body-2 font-weight-bold">
              残り
            </div>
            <div class="text-h4 font-weight-bold ml-4">
              {{ fund.limit_date ? getDaysLeft(fund.limit_date) : '' }}
            </div>
          </div>
        </v-banner>
        <v-banner elevation="4" rounded class="mt-4">
          <div v-for="(item, i) in fund.reductions" :key="item.id" class="py-4">
            <div class="body-1 font-weight-bold">
              {{ item.name }}
            </div>
            <div class="text-caption">
              {{ item.caption }}
            </div>
            <div class="text-center mt-4">
              <font style="font-size: 28px;">
                {{ item.amount.toLocaleString() }}
              </font>
              円
            </div>
            <div class="d-flex justify-center align-center">
              <router-link :to="`/payment?type=fund&id=${item.id}&name=${item.name}&amount=${item.amount}&paymentType=charge`" target="_blank" class="text-center mt-4">
                <common-button button-color="primary">
                  このリターンで支援する
                </common-button>
              </router-link>
            </div>
            <v-divider v-if="i !== fund.reductions.length - 1" class="mt-8" />
          </div>
        </v-banner>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import transformTextToHtml from '~/utils/transformTextToHtml'
import getDaysLeft from '~/utils/getDaysLeft'
import CommonButton from '~/components/shared/atoms/CommonButton.vue'

export default {
  components: { CommonButton },
  data () {
    return {
      transformTextToHtml,
      getDaysLeft,
      breadcrumbs: [],
      fund: { owner: {} }
    }
  },
  head () {
    return {
      title: `${this.fund.name} - クラウドファンディング | `
    }
  },
  created () {
    this.getFundDetail()
  },
  methods: {
    getFundDetail () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'fundDetail',
          query: {
            id: this.$route.params.fundId
          }
        }).then((res) => {
          if (res.status === 200) {
            this.fund = res.data.fund
          }
          this.breadcrumbs = [
            ...this.$BREADCRUMBS,
            {
              text: 'クラウドファンディング',
              link: true,
              exact: true,
              disabled: false,
              to: {
                path: '/funds'
              }
            },
            {
              text: this.fund.name,
              disabled: true
            }
          ]
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.fund-image {
  width: 100%;
  height: 200px;
  background: grey;
}
.plan-name {
  border-bottom: solid 1px blue;
}
.meter {
  padding: 12px 8px;
  height: 35px;
  width: 100%;
  >span {
    display: none;
  }
  .meter-in {
    overflow: hidden;
    background-color: #e4e4e4;
    width: 100%;
    height: 15px;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    .bar {
      background: linear-gradient(270deg, #1976d2 0%, #1976d2 17.48%, #1976d2 49.56%, #324ad3 69.79%, #4f32d3 100%);
      max-width: 100%;
      height: 100%;
      color: #ffffff;
      text-align: left;
      line-height: 16px;
      font-size: 11px;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
      border-bottom-right-radius: inherit;
      border-bottom-left-radius: inherit;span {
        display: inline-block;
        margin-left: 7px;
      }
    }
  }
}
</style>
