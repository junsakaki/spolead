<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="funds">
      <v-row no-gutters>
        <v-col
          v-for="fund in funds"
          :key="fund.id"
          cols="12"
          sm="3"
          class="px-2 py-3"
        >
          <router-link :to="`/funds/${fund.id}`" class="fund">
            <v-card class="pb-2">
              <v-img
                v-if="fund.image_top"
                :src="fund.image_top"
                max-height="100"
                max-width="100%"
              />
              <div v-else class="fund-image" />
              <div class="body-1 font-weight-bold fund-name px-2">
                {{ fund.name }}
              </div>
              <div class="body-2 font-weight-bold owner-name mt-2 px-2">
                {{ fund.owner.name }}
              </div>
              <div class="caption fund-caption mt-2 px-2">
                {{ fund.caption }}
              </div>
              <div class="meter mt-4">
                <div class="meter-in">
                  <div class="bar" :style="`width: ${Math.floor(fund.supported_money/fund.target_money*100)}%;`">
                    <span>{{ Math.floor(fund.supported_money/fund.target_money*100) }}%</span>
                  </div>
                </div>
                <span>{{ fund.supported_money/fund.target_money }}%</span>
              </div>
              <v-row no-gutters class="mt-4">
                <v-col cols="12" sm="4" class="caption text-center">
                  現在
                </v-col>
                <v-col cols="12" sm="4" class="caption text-center">
                  支援者
                </v-col>
                <v-col cols="12" sm="4" class="caption text-center">
                  残り
                </v-col>
                <v-col cols="12" sm="4" class="caption text-center font-weight-bold">
                  {{ fund.supported_money.toLocaleString() }}円
                </v-col>
                <v-col cols="12" sm="4" class="caption text-center font-weight-bold">
                  {{ fund.supporters_count.toLocaleString() }}人
                </v-col>
                <v-col cols="12" sm="4" class="caption text-center font-weight-bold">
                  {{ fund.limit_date ? getDaysLeft(fund.limit_date) : '' }}
                </v-col>
              </v-row>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import getDaysLeft from '~/utils/getDaysLeft'

export default {
  data () {
    return {
      getDaysLeft,
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'クラウドファンディング',
          disabled: true
        }
      ],
      funds: []
    }
  },
  head () {
    return {
      title: 'クラウドファンディング | '
    }
  },
  created () {
    this.getFunds()
  },
  methods: {
    getFunds () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'fundIndex'
        }).then((res) => {
          if (res.status === 200) {
            this.funds = res.data.funds
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.fund {
  text-decoration: none;
}
.fund-image {
  width: 100%;
  height: 100px;
  background: grey;
}
.fund-name {
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
.fund-caption {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  height: calc(12px * 1.2 * 3) // font-weight * line-height * line-clamp
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
