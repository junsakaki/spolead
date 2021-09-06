<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div class="page-header">
      <div class="page-header-title">
        {{ team.name }}
      </div>
      <div class="page-header-sub">
        <common-button @click="showRegistReviewsModal" button-color="primary">
          口コミ投稿する
        </common-button>
        <common-button @click="showEditTeamModal" v-if="isTeamOwner" button-color="primary">
          チーム編集
        </common-button>
      </div>
    </div>
    <v-flex
      xs12
      sm8
      md6
      flex-wrap
      class="page-content"
    >
      <div class="page-content-item">
        <div class="page-content-item-header">
          {{ team.name }}（{{ team.prefecture }} {{ team.city }}）
        </div>
        <div class="page-content-item-header">
          活動エリア：{{ team.prefecture }} {{ team.city }}/ジャンル：{{ sports_name }}
        </div>
        <v-tabs
          v-model="tab"
          fixed-tabs
          background-color="primary"
          dark
          class="tabs"
        >
          <v-tab @change="changeTab(1)">
            トップ
          </v-tab>
          <v-tab id="reviews" @change="changeTab(2)">
            口コミ
          </v-tab>
          <v-tab @change="changeTab(3)">
            活動場所
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <div :class="`page-content-item-main ${isMobile && 'SP'}`">
              <div :class="`page-content-item-list ${isMobile && 'SP'}`">
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
                <v-container>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <!-- <div class="grey--text">チームトップ情報</div> -->
                      <p v-html="transformTextToHtml(team.team_information)" />
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </div>
            <div class="page-content-item-footer">
              <!-- <common-button @click="moveToReview" v-if="unreadReviewCount > 0" button-color="primary">
                口コミ情報（最新{{ unreadReviewCount }}件）
              </common-button> -->
            </div>
          </v-tab-item>
          <v-tab-item>
            <!-- display reviews as much as review count -->
            <div v-for="review in reviewsList" :key="review.id">
              <review-content :review="review" />
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="page-content-item-main">
              <div class="page-content-item-list">
                <v-container>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <h1>{{ team.name }}の活動場所</h1>
                      <div class="d-flex justify-left align-center" />
                      <v-card class="d-inline-block mx-auto" min-width="60vw">
                        <iframe
                          :src="googleMap"
                          frameborder="0"
                          scrolling="no"
                          marginheight="0"
                          marginwidth="0"
                          width="100%"
                          height="450"
                        />
                        <v-card-title>{{ team.prefecture }}{{ team.city }}{{ team.street_number }}</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <v-divider :inset="false" />
    </v-flex>
    <common-button @click="$router.push('/Teams')">
      戻る
    </common-button>
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
      :dialog="registReviewsModal"
      @registReview="registReview"
      :teamId="team.id"
    />
  </v-layout>
</template>

<script>
import { colors } from '~/assets/js/Colors.js'
import CommonButton from '~/components/atoms/CommonButton.vue'
import TeamEditModal from '~/components/organisms/TeamEditModal.vue'
import ReviewsRegistModal from '~/components/organisms/ReviewsRegistModal.vue'
import ReviewContent from '~/components/organisms/ReviewContent.vue'
import transformTextToHtml from '~/pages/utils/transformTextToHtml'

export default {
  components: {
    CommonButton,
    TeamEditModal,
    ReviewsRegistModal,
    ReviewContent
  },
  data () {
    return {
      colors,
      transformTextToHtml,
      tab: null,
      rating: 3,
      valid: true,
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      editTeamModal: false,
      registReviewsModal: false,
      team: {},
      reviewsList: [],
      sports_name: '',
      showMoreInfo: true,
      isMobile: this.$vuetify.breakpoint.smAndDown
    }
  },
  computed: {
    googleMap () {
      return `https://maps.google.co.jp/maps?q=${this.team.prefecture + this.team.city + this.team.street_number}&output=embed&t=m&z=16&hl=ja`
    },
    unreadReviewCount () {
      const loginDateTime = new Date(localStorage.getItem('loginDateTime'))
      let unreadCount = 0
      this.reviewsList.map((review) => {
        console.log('post DAte', new Date(review.created_at).getTime())
        console.log('login DAte', loginDateTime.getTime())
        console.log('test', new Date(review.created_at) > loginDateTime.getTime())
        if (new Date(review.created_at).getTime() > loginDateTime) {
          unreadCount += 1
        }
      })
      return unreadCount
    },
    isTeamOwner () {
      // TODO: need to get from access_token
      console.log('teams user_id', this.team.user_id)
      console.log('storage user_id', localStorage.getItem('userId'))
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
    console.log('TeamDetailparams', this.$route.params)
    this.getTeamDetail()
    this.getReviews()
  },
  methods: {
    getTeamDetail () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'teamShow',
          params: {
            team_id: localStorage.getItem('teamId')
          }
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.team = res.data.team
            console.log(this.team)
            this.whichSports()
          }
        })
    },
    getReviews () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'reviewIndex',
          params: {
            team_id: localStorage.getItem('teamId')
          }
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.reviewsList = res.data.reviews
          }
        })
    },
    changeTab (number) {
      if (number === 2 || number === 3) {
        this.showMoreInfo = false
      } else {
        this.showMoreInfo = true
      }
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
    registReview () {
      this.getReviews()
      this.closeModal()
    },
    teamEdit () {
      this.getTeamDetail()
      this.closeModal()
    },
    closeModal () {
      this.editTeamModal = false
      this.registReviewsModal = false
    },
    whichSports () {
      if (this.team !== {}) {
        switch (this.team.sports_id) {
          case 1:
            this.sports_name = 'サッカー'
            break
          case 2:
            this.sports_name = '野球'
            break
          case 3:
            this.sports_name = 'バスケットボール'
            break
          case 4:
            this.sports_name = 'バレーボール'
            break
          case 5:
            this.sports_name = 'ダンス'
            break
          case 6:
            this.sports_name = 'ラグビー'
            break
          case 7:
            this.sports_name = 'スイミング'
            break
        }
      }
    },
    moveToReview () {
      document.getElementById('reviews').click()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';
.page-header {
  @include default-page-header;
}
.page-header-sub {
  text-align: right;
}
.page-content {
  @include default-page-content;
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
.page-content-item-main.SP {
  flex-direction: column;
}
.page-content-item-list.SP {
  display: flex;
  justify-content: center;
}
</style>
