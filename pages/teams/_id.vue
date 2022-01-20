<template>
  <v-layout>
    <div v-if="Object.keys(team).length > 0" class="page-container">
      <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <div class="page-header d-flex justify-space-between">
        <div class="page-header-title">
          <favorite-button :team-id="team.id" class="mr-2" />
          {{ team.name }}
        </div>
        <div class="page-header-sub">
          <v-btn
            v-if="isTeamOwner"
            icon
            color="primary"
            @click="showEditTeamModal"
          >
            <v-icon>mdi-pen</v-icon>
          </v-btn>
        </div>
      </div>
      <v-flex
        flex-wrap
        class="page-content"
      >
        <div class="page-content-item">
          <v-tabs
            v-model="tab"
            fixed-tabs
            background-color="primary"
            dark
            class="tabs"
          >
            <v-tab @change="changeTab(0)">
              トップ
            </v-tab>
            <v-tab id="reviews" @change="changeTab(1)">
              口コミ
            </v-tab>
            <v-tab id="careers" @change="changeTab(2)">
              進路実績
            </v-tab>
            <v-tab id="celebrities" @change="changeTab(3)">
              有名人
            </v-tab>
            <v-tab id="information" @change="changeTab(4)">
              基本情報
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <div :class="`page-content-item-main ${$vuetify.breakpoint.smAndDown && 'SP'}`">
                <div :class="`page-content-item-list ${$vuetify.breakpoint.smAndDown && 'SP'}`">
                  <v-img
                    :src="team.team_image ? team.team_image : ''"
                    height="200"
                    width="200"
                  />
                </div>
                <div class="page-content-item-list">
                  <p v-html="transformTextToHtml(team.team_information)" />
                </div>
              </div>
              <div class="page-content-item-footer">
                <!-- <common-button @click="moveToReview" v-if="unreadReviewCount > 0" button-color="primary">
                  口コミ情報（最新{{ unreadReviewCount }}件）
                </common-button> -->
              </div>
            </v-tab-item>
            <v-tab-item>
              <button class="post-button" @click="showRegistReviewsModal">
                + 口コミを投稿する
              </button>
              <!-- display reviews as much as review count -->
              <div v-if="team.reviews && team.reviews.length > 0">
                <div v-for="review in team.reviews" :key="`review-${review.id}`">
                  <review-content :review="review" />
                </div>
              </div>
              <div v-else>
                <div class="grey--text text-center">
                  まだ口コミがありません
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <button class="post-button" @click="showRegistCareersModal">
                + 進路実績を投稿する
              </button>
              <div v-if="team.careers && team.careers.length > 0">
                <div v-for="career in team.careers" :key="`career-${career.id}`">
                  <career-content :career="career" />
                </div>
              </div>
              <div v-else>
                <div class="grey--text text-center">
                  まだ進路実績に関する投稿がありません
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <button class="post-button" @click="showRegistCelebritiesModal">
                + 有名人を投稿する
              </button>
              <div v-if="team.celebrities && team.celebrities.length > 0">
                <div v-for="celebrity in team.celebrities" :key="`celebrity-${celebrity.id}`">
                  <celebrity-content :celebrity="celebrity" />
                </div>
              </div>
              <div v-else>
                <div class="grey--text text-center">
                  まだ有名人に関する投稿がありません
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div class="information">
                <div class="information-row">
                  <div>チーム・スクール名</div>
                  <div>{{ team.name }}</div>
                </div>
                <div class="information-row">
                  <div>スポーツジャンル</div>
                  <div>{{ getSportsName() }}</div>
                </div>
                <div class="information-row">
                  <div>所在地・活動場所等</div>
                  <div>{{ team.prefecture }}{{ team.city }}{{ team.street_number }}</div>
                </div>
                <div class="information-row">
                  <div>運営形式</div>
                  <div class="d-flex align-center">
                    <v-chip v-for="type in team.team_type ? team.team_type.split(',') : []" :key="`team_type-${type}`" color="primary" x-small class="mr-1">
                      {{ getTeamType(type) }}
                    </v-chip>
                    <v-chip v-for="type in team.target_age_type ? team.target_age_type.split(',') : []" :key="`target_age_type-${type}`" color="primary" x-small class="mr-1">
                      {{ getTargetAgeType(type) }}
                    </v-chip>
                  </div>
                </div>
                <div class="information-row">
                  <div>ホームページ</div>
                  <a :href="team.url" target="_blank">{{ team.url }}</a>
                </div>
              </div>
              <iframe
                :src="googleMap"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                width="100%"
                height="450"
              />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-flex>
      <!-- <common-button v-if="showMoreInfo" @click="moveToReview" button-size="large" button-color="primary" button-width="25vw">
        口コミをもっと見る
      </common-button> -->
      <team-edit-modal
        v-if="editTeamModal"
        :dialog="editTeamModal"
        :team="team"
        @teamEdit="teamEdit"
      />
      <reviews-regist-modal
        v-if="registReviewsModal"
        :dialog="registReviewsModal"
        :team-id="team.id"
        @closeModal="closeModal"
      />
      <careers-regist-modal
        v-if="registCareersModal"
        :dialog="registCareersModal"
        :team-id="team.id"
        @closeModal="closeModal"
      />
      <celebrities-regist-modal
        v-if="registCelebritiesModal"
        :dialog="registCelebritiesModal"
        :team-id="team.id"
        @closeModal="closeModal"
      />
    </div>
    <div v-else class="skelton-area">
      <span v-if="isError" class="red--text">チーム情報の取得に失敗しました</span>
      <TeamDetailSkelton v-if="isLoading" />
    </div>
  </v-layout>
</template>

<script>
import queryString from 'query-string'
import { colors } from '~/assets/js/Colors.js'
import TeamEditModal from '~/components/teams/organisms/TeamEditModal.vue'
import ReviewsRegistModal from '~/components/teams/organisms/ReviewsRegistModal.vue'
import CareersRegistModal from '~/components/teams/organisms/CareersRegistModal.vue'
import CelebritiesRegistModal from '~/components/teams/organisms/CelebritiesRegistModal.vue'
import ReviewContent from '~/components/teams/organisms/ReviewContent.vue'
import CareerContent from '~/components/teams/organisms/CareerContent.vue'
import CelebrityContent from '~/components/teams/organisms/CelebrityContent.vue'
import TeamDetailSkelton from '~/components/teams/organisms/TeamDetailSkelton.vue'
import FavoriteButton from '~/components/teams/atoms/FavoriteButton.vue'
import transformTextToHtml from '~/utils/transformTextToHtml'

export default {
  components: {
    TeamEditModal,
    ReviewsRegistModal,
    CareersRegistModal,
    CelebritiesRegistModal,
    ReviewContent,
    CareerContent,
    CelebrityContent,
    TeamDetailSkelton,
    FavoriteButton
  },
  data () {
    return {
      colors,
      transformTextToHtml,
      tab: Number(queryString.parse(location.search).tab),
      rating: 3,
      valid: true,
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      editTeamModal: false,
      registReviewsModal: false,
      registCelebritiesModal: false,
      registCareersModal: false,
      team: {},
      sports_name: '',
      showMoreInfo: true,
      isMobile: this.$vuetify.breakpoint.smAndDown,
      breadcrumbs: [],
      selectedCity: undefined,
      pageTitle: undefined,
      isLoading: false,
      isError: false
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  },
  computed: {
    googleMap () {
      return `https://maps.google.co.jp/maps?q=${this.team.prefecture + this.team.city + this.team.street_number}&output=embed&t=m&z=16&hl=ja`
    },
    unreadReviewCount () {
      const loginDateTime = new Date(localStorage.getItem('loginDateTime'))
      let unreadCount = 0
      this.reviewsList.forEach((review) => {
        if (new Date(review.created_at).getTime() > loginDateTime) {
          unreadCount += 1
        }
      })
      return unreadCount
    },
    isTeamOwner () {
      // TODO: need to get from access_token
      return String(this.team.user_id) === localStorage.getItem('userId')
    }
    // computed avarage point but unnecessary this point.
    // avarageGeneralReviewPoint () {
    //   let sumGeneralPoint = 0
    //   this.reviewsList.map((review) => {
    //     sumGeneralPoint += review.general_point
    //   })
    //   return sumGeneralPoint / this.reviewsList.length
    // }
  },
  created () {
    const { prefCode, cityCode } = this.$route.query
    this.getTeamDetail()
    this.getCityData({ prefCode, cityCode })
  },
  methods: {
    getTeamDetail () {
      this.isLoading = true
      this.isError = false
      this.$store
        .dispatch('api/apiRequest', {
          api: 'teamShow',
          params: {
            team_id: this.$route.params.id
          }
        }).then((res) => {
          this.isLoading = false
          if (res.status === 200) {
            this.team = res.data.team
          }
          this.pageTitle = this.getPageTitle({ isBreadcrumbs: false })
        }).catch(() => {
          this.isLoading = false
          this.isError = true
        })
    },
    getPageTitle ({ isBreadcrumbs }) {
      return `${this.team.name}の${this.team.team_type === 1 ? 'チーム' : this.team.team_type === 2 ? 'スクール' : ''}情報 | `
    },
    changeTab (number) {
      this.$router.replace({ path: location.pathname, query: { ...this.$route.query, tab: number } })
    },
    goLoginPage () {
      this.$router.push('/login')
    },
    showEditTeamModal () {
      this.editTeamModal = true
    },
    showRegistReviewsModal () {
      this.registReviewsModal = true
    },
    showRegistCareersModal () {
      this.registCareersModal = true
    },
    showRegistCelebritiesModal () {
      this.registCelebritiesModal = true
    },
    registReview () {
      this.closeModal()
    },
    teamEdit () {
      this.getTeamDetail()
      this.closeModal()
    },
    closeModal (shouldUpdateTeamDetail) {
      this.editTeamModal = false
      this.registReviewsModal = false
      this.registCelebritiesModal = false
      this.registCareersModal = false
      typeof shouldUpdateTeamDetail === 'boolean' && shouldUpdateTeamDetail && this.getTeamDetail()
    },
    getSportsName () {
      return this.$SPORTS.find(item => item.id === this.team.sports_id).title ?? ''
    },
    moveToReview () {
      document.getElementById('reviews').click()
    },
    getCityData ({ prefCode, cityCode }) {
      if (!prefCode || !cityCode) {
        this.selectedCity = undefined
      }
      this.$store
        .dispatch('api/apiRequest', {
          api: 'getCityApi',
          params: {
            prefCode
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.selectedCity = response.data.result.find(city => city.cityCode === cityCode)
            this.pageTitle = this.getPrevPageTitle({ isBreadcrumbs: false })
            this.breadcrumbs = [
              ...this.$BREADCRUMBS,
              {
                text: this.getPrevPageTitle({ isBreadcrumbs: true }),
                link: true,
                exact: true,
                disabled: false,
                to: {
                  path: `/teams?${this.$route.query.sportsId ? `sportsId=${this.$route.query.sportsId}` : ''}${this.$route.query.cityCode ? `cityCode=${this.$route.query.cityCode}` : ''}`
                }
              },
              {
                text: `${this.team.name}の${this.team.team_type === 1 ? 'チーム' : this.team.team_type === 2 ? 'スクール' : ''}情報`,
                disabled: true
              }
            ]
          }
        })
    },
    getPrevPageTitle ({ isBreadcrumbs }) {
      const { sportsId, page } = this.$route.query
      const sportsTitle = sportsId ? this.$SPORTS.find(item => item.id === Number(sportsId)).title : undefined
      const cityName = this.selectedCity?.cityName ?? undefined
      const pageNum = page ? `（${page}ページ目）` : undefined
      return `${sportsTitle ?? ''}${cityName ?? ''}のチーム・スクール${pageNum ?? ''}${isBreadcrumbs ? '' : ' | '}`
    },
    getTeamType (targetTeamType) {
      if (!targetTeamType) {
        return
      }
      const target = this.$TEAM_TYPE.find(item => item.typeId === Number(targetTeamType))
      return target ? target.teamType : null
    },
    getTargetAgeType (targetAgeType) {
      if (!targetAgeType) {
        return
      }
      const target = this.$TARGET_AGE.find(item => item.ageId === Number(targetAgeType))
      return target ? target.targetAgeType : null
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  min-width: 0;
}
@import '~/assets/scss/page.scss';
.page-header {
  @include default-page-header;
  height: unset;
  border-bottom: solid 1px #b3b3b38a;
}
.page-header-sub {
  text-align: right;
}
.page-content {
  @include default-page-content;
  margin: 0 32px;
  &-item {
    &-footer {
      justify-content: flex-start;
    }
    &-list {
      margin: 0px 12px;
    }
  }
  .tabs {
    margin: 24px 0px;
  }
}
.page-content-item-header {
  display: flex;
  justify-content: end;
  margin: 0;
  padding: 0 12px;
  font-size: 14px;
  color: #0000008a;
  div {
    margin-right: 16px;
  }
}
.page-content-item-header.SP {
  flex-direction: column;
}
.page-content-item {
  padding: 0;
}
.page-content-item-main.SP {
  flex-direction: column;
}
.page-content-item-list.SP {
  display: flex;
  justify-content: center;
  padding-bottom: 12px;
}
.skelton-area {
  width: 100%;
  text-align: center;
}
.post-button {
  margin-bottom: 12px;
  border: dashed 2px #0000008a;
  padding: 12px 24px;
  width: 100%;
  color: #0000008a;
  &:hover {
    opacity: 0.8;
  }
}
.information {
  margin-bottom: 12px;
  .information-row {
    display: grid;
    grid-template-columns: 170px 1fr;
    * {
      border: solid 1px #00000026;
      padding: 4px;
    }
  }
}
</style>
