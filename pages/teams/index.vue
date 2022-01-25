<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div v-if="teams.length > 0" class="container">
      <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <div class="mb-4">
        <SearchForms @execSearch="execSearch" />
      </div>
      <v-flex
        v-for="team in teams"
        :key="team.id"
        flex-wrap
        class="page-content"
      >
        <v-card class="page-content-item">
          <div class="hover-filter" @click="goTeamDetail(team.id)" />
          <div class="mx-3 mt-3">
            <favorite-button :team-id="team.id" :is-favorite="favoriteTeams.includes(team.id)" class="mr-2" />
            {{ team.name }} {{ `${team.prefecture ? '(' + team.prefecture + team.city + team.street_number + ')' : ''}` }}
            <!-- <v-rating v-model="team.average_point" v-if="team.average_point" readonly /> -->
          </div>
          <div class="mx-3 mb-3">
            <v-chip v-for="type in team.team_type ? team.team_type.split(',') : []" :key="`teamType-${type}`" color="primary" x-small class="mr-1">
              {{ getTeamType(type) }}
            </v-chip>
            <v-chip v-for="type in team.target_age_type ? team.target_age_type.split(',') : []" :key="`targetAgeType-${type}`" color="primary" x-small class="mr-1">
              {{ getTargetAgeType(type) }}
            </v-chip>
          </div>
          <div :class="`${$vuetify.breakpoint.smAndDown && 'flex'} page-content-item-main`">
            <div class="page-content-item-list">
              <v-img v-if="team.team_image" :src="team.team_image ? team.team_image : ''" width="200" height="200" />
              <div v-else class="team-no-image">
                No image
              </div>
            </div>
            <div class="page-content-item-list">
              <div class="page-content-item-lists">
                <p v-if="team.team_information" v-html="transformTextToHtml(team.team_information)" />
                <div v-else class="grey--text">
                  情報がありません
                </div>
              </div>
              <v-divider :inset="false" class="inner-divider" />
              <div v-if="team.average_point" class="page-content-item-lists">
                <span class="text--lighten-2 mr-1">
                  ({{ team.average_point }})
                </span>
                <v-rating v-model="team.average_point" readonly />
              </div>
              <div class="page-content-item-lists grey--text">
                最新の口コミ評価({{ getLatestReview(team.reviews) ? new Date(getLatestReview(team.reviews).updated_at).toLocaleString() : 'まだ口コミがありません' }})
              </div>
              <div v-if="getLatestReview(team.reviews)" class="page-content-item-lists mx-6">
                <p v-html="transformTextToHtml(getLatestReview(team.reviews).general_post)" />
              </div>
            </div>
          </div>
        </v-card>
        <v-divider :inset="false" />
      </v-flex>
      <Pagination :total-pages="totalPages" :page="page" @execPagination="execPagination" />
    </div>
    <div else class="skelton-area">
      <span v-if="isError" class="red--text">チーム一覧の取得に失敗しました</span>
      <TeamsSkelton v-if="isLoading" />
      <span v-if="(!isError && !isLoading) && teams.length === 0" class="grey--text">登録されているチームはありません</span>
    </div>
  </v-layout>
</template>

<script>
import queryString from 'query-string'
import { colors } from '~/assets/js/Colors.js'
import Pagination from '~/components/shared/molecules/Pagination.vue'
import SearchForms from '~/components/teams/organisms/SearchForms.vue'
import TeamsSkelton from '~/components/teams/organisms/TeamsSkelton.vue'
import FavoriteButton from '~/components/teams/atoms/FavoriteButton.vue'
import transformTextToHtml from '~/utils/transformTextToHtml'

export default {
  components: {
    Pagination,
    TeamsSkelton,
    SearchForms,
    FavoriteButton
  },
  data () {
    return {
      colors,
      transformTextToHtml,
      valid: true,
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      registTeamModal: false,
      teams: [],
      searchWord: '',
      page: queryString.parse(location.search).page ? Number(queryString.parse(location.search).page) : 1,
      totalPages: 15,
      breadcrumbs: [],
      isLoading: false,
      isError: false,
      selectedCity: undefined,
      pageTitle: undefined,
      token: undefined,
      favoriteTeams: []
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  },
  computed: {
    isLogin () {
      return !!localStorage.getItem('userId')
    }
  },
  watch: {
    $route (to, from) {
      this.fetchInitialData()
    }
  },
  created () {
    this.fetchInitialData()
    this.getUser()
  },
  methods: {
    getUser () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'userIndex',
          query: {
            id: localStorage.getItem('userId')
          }
        }).then((res) => {
          this.isLoading = false
          if (res.status === 200) {
            this.favoriteTeams = res.data.user.favorite_teams
          }
        })
    },
    fetchInitialData () {
      const { prefCode, cityCode } = this.$route.query
      this.getTeams()
      this.getCityData({ prefCode, cityCode })
      this.getToken()
    },
    getTeams () {
      this.isLoading = true
      this.isError = false
      const params = {
        sports_id: this.$route.query.sportsId ?? null,
        search_word: this.$route.query.searchWord ?? null,
        team_type: this.$route.query.teamType ?? null,
        target_age_type: this.$route.query.targetAgeType ?? null,
        area: {
          latitude: Number(this.$route.query.latitude) ?? null,
          longitude: Number(this.$route.query.longitude) ?? null,
          city_codes: this.$route.query.cityCodes ?? null
        },
        page: this.page
      }

      this.$store
        .dispatch('api/apiRequest', {
          api: 'teamIndex',
          params
        }).then((res) => {
          this.isLoading = false
          if (res.status === 200) {
            scrollTo(0, 0)
            this.teams = res.data.teams
            this.totalPages = res.data.meta
          }
        }).catch(() => {
          this.isLoading = false
          this.isError = true
        })
    },
    goTeamDetail (teamId) {
      localStorage.setItem('teamId', teamId)
      this.$router.push({ path: `teams/${teamId}`, query: { ...this.$route.query, page: this.page } })
    },
    execSearch (search) {
      this.page = 1
      this.getTeams()
      this.$router.replace({
        path: 'teams',
        query: {
          ...search,
          teamType: search.teamType.toString(),
          targetAgeType: search.targetAgeType.toString(),
          cityCodes: search.cityCodes ? search.cityCodes.toString() : null
        }
      })
    },
    getLatestReview (reviews) {
      let latestReviewDate = ''
      let latestReview = ''
      if (reviews) {
        if (reviews.length > 0) {
          reviews.forEach((review) => {
            const updatedAt = new Date(review.updated_at)
            latestReviewDate = updatedAt
            latestReview = review
            if (review.updated_at > latestReviewDate) {
              latestReviewDate = updatedAt
              latestReview = review
            }
          })
        }
      }
      return latestReview === '' ? false : latestReview
    },
    execPagination (page) {
      window.scroll(0, 0)
      this.teams = []
      this.page = page
      this.$router.push({ name: 'teams', params: { sportsId: localStorage.getItem('sportsId') }, query: { sportsId: localStorage.getItem('sportsId'), page } })
      this.getTeams()
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
            this.pageTitle = this.getPageTitle({ isBreadcrumbs: false })
            this.breadcrumbs = [
              ...this.$BREADCRUMBS,
              {
                text: this.getPageTitle({ isBreadcrumbs: true }),
                disabled: true
              }
            ]
          }
        })
    },
    getPageTitle ({ isBreadcrumbs }) {
      const page = this.page ? `（${this.page}ページ目）` : undefined
      return `チーム・スクール${page ?? ''}${isBreadcrumbs ? '' : ' | '}`
    },
    getToken () {
      this.token = localStorage.getItem('token')
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
@import '~/assets/scss/page.scss';
.container {
  width: 100%;
}
.page-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
.page-content {
  @include default-page-content;
  margin: 0 auto 12px;
  &-item {
    &-footer {
      justify-content: flex-end;
    }
    .page-content-item-lists {
      display: flex;
      align-items: center;
    }
    .inner-divider {
      margin: 0px 12px;
    }
  }
}
.v-input {
  width: 25vw;
}
.search-field.SP {
  width: 100%;
}
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page-content-item {
  position: relative;
  width: 100%;
  cursor: pointer;
  .hover-filter {
    position: absolute;
    top: 0;
    left: 0;
    background: #1976d2;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    &:hover {
      opacity: 0.1;
      transition: opacity 0.1s ease-in-out;
    }
  }
}
.skelton-area {
  width: 100%;
  text-align: center;
}
.team-no-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: gray;
  color: white;
}
</style>
