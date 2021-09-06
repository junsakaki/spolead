<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div class="page-header">
      チーム一覧
      <common-button @click="showRegistTeamModal" v-if="isLogin" button-color="primary">
        チームを登録する
      </common-button>
    </div>
    <div class="page-header-title">
      <SearchForm :class="isMobile && 'SP'" @execSearch="execSearch" />
    </div>
    <v-flex
      v-for="team in teams"
      :key="team.id"
      xs12
      sm8
      md6
      flex-wrap
      class="page-content"
    >
      <div :class="`page-content-item ${isMobile && 'SP'}`">
        <div class="page-content-item-header" style="display">
          {{ team.name }} ({{ team.prefecture }}{{ team.city }}{{ team.street_number }})
          <v-chip color="primary" x-small>{{ teamTypeList[team.team_type] }}</v-chip>
          <v-chip color="primary" x-small>{{ targetAgeList[team.target_age_type] }}</v-chip>
          <!-- <v-rating v-model="team.average_point" v-if="team.average_point" readonly /> -->
        </div>
        <div :class="`${isMobile && 'flex'} page-content-item-main`">
          <div class="page-content-item-list">
            <v-card class="d-inline-block mx-auto">
              <v-container>
                <v-row justify="space-between">
                  <v-col cols="auto">
                    <v-img
                      :src="team.team_image ? team.team_image : ''"
                      height="200"
                      width="200"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </div>
          <div class="page-content-item-list">
            <div v-if="team.average_point" class="page-content-item-lists">
              <span class="text--lighten-2 mr-1">
                ({{ team.average_point }})
              </span>
              <v-rating v-model="team.average_point" readonly />
            </div>
            <div class="page-content-item-lists">
              <p v-html="transformTextToHtml(team.team_information)" />
            </div>
            <v-divider :inset="false" class="inner-divider" />
            <div class="page-content-item-lists grey--text">
              最新の口コミ評価({{ getLatestReview(team.reviews) ? new Date(getLatestReview(team.reviews).updated_at).toLocaleString() : 'まだ口コミがありません' }})
            </div>
            <div v-if="getLatestReview(team.reviews)" class="page-content-item-lists mx-6">
              <p v-html="transformTextToHtml(getLatestReview(team.reviews).general_post)" />
            </div>
          </div>
        </div>
        <div class="page-content-item-footer">
          <common-button @click="goTeamDetail(team.id)" button-color="primary">
            チームの詳細を確認する
          </common-button>
        </div>
      </div>
      <v-divider :inset="false" />
    </v-flex>
    <!-- <common-button button-size="large" button-color="primary" button-width="25vw">
      ユーザー登録
    </common-button> -->
    <Pagination @execPagination="execPagination" :totalPages="totalPages" :page="page" />
    <team-regist-modal :dialog="registTeamModal" @registTeam="registTeam" />
  </v-layout>
</template>

<script>
import { colors } from '~/assets/js/Colors.js'
import CommonButton from '~/components/atoms/CommonButton.vue'
import TeamRegistModal from '~/components/organisms/TeamRegistModal.vue'
import SearchForm from '~/components/molecules/SearchForm.vue'
import Pagination from '~/components/molecules/Pagination.vue'
import transformTextToHtml from '~/pages/utils/transformTextToHtml'

export default {
  components: {
    CommonButton,
    SearchForm,
    TeamRegistModal,
    Pagination
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
      page: 1,
      totalPages: 15,
      targetAgeList: [null, 'キッズ', '小学生', '中学生', '高校生', '大学・専門学生', '社会人'],
      teamTypeList: [null, 'チーム', 'スクール'],
      isMobile: this.$vuetify.breakpoint.smAndDown
    }
  },
  computed: {
    isLogin () {
      return !!localStorage.getItem('userId')
    }
  },
  created () {
    this.getTeams()
  },
  methods: {
    getTeams () {
      let params = {}
      // get Teams related to sportsId
      if (localStorage.getItem('sportsId')) {
        params = {
          sports_id: localStorage.getItem('sportsId')
        }
      // get Teams related to cityCodes
      } else {
        params = {
          city_code: localStorage.getItem('cityCode')
        }
      }

      params.search_word = this.searchWord
      params.page = this.page

      this.$store
        .dispatch('api/apiRequest', {
          api: 'teamIndex',
          params
        }).then((res) => {
          if (res.status === 200) {
            scrollTo(0, 0)
            this.teams = res.data.teams
            this.totalPages = res.data.meta
            console.log('this.teams  ', this.teams)
            console.log('this.total_pages  ', this.totalPages)
          }
        })
    },
    goLoginPage () {
      this.$router.push('/login')
    },
    goTeamDetail (teamId) {
      localStorage.setItem('teamId', teamId)
      this.$router.push('TeamDetails')
    },
    showRegistTeamModal () {
      this.registTeamModal = true
    },
    registTeam () {
      this.getTeams()
      this.closeModal()
    },
    closeModal () {
      this.registTeamModal = false
    },
    execSearch (searchWord) {
      console.log('searching by', searchWord)
      this.searchWord = searchWord
      this.page = 1
      this.getTeams()
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
      this.page = page
      this.getTeams()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';
.page-header {
  @include default-page-header;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-content {
  @include default-page-content;
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
  width: 100%;
}
.page-content-item.SP {
  width: fit-content;
}
</style>
