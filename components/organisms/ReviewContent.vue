<template>
  <div class="page-content-item-main">
    <div class="page-content-item-list">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <h1>{{ displayusername }} さんの口コミ</h1>
            <!-- <h2>性別: {{ displayGender }}  年代: {{ displayAgeGroup }}  在籍年: {{ review.enrollment_period }}  あなたの立場: {{ displayIsPlayer }}</h2> -->
            <p>- 性別: {{ displayGender }}</p>
            <p>- 年代: {{ displayAgeGroup }}</p>
            <p>- 在籍年: {{ review.enrollment_period }}</p>
            <p>- あなたの立場: {{ displayIsPlayer }}</p>

            <div :class="`${!isMobile && 'd-flex justify-left align-center'}`">
              <v-rating v-model="review.general_point" readonly />

              <!-- due to comment out unnecessary?? -->
              <!-- <div>{{ general_point }}</div> -->

              <div>方針: {{ review.policy_point }}  体制: {{ review.organization_point }}  活動: {{ review.activity_point }}  環境: {{ review.environment_point }}  イベント: {{ review.event_point }}  費用: {{ review.cost_point }}</div>
            </div>
            <v-card class="d-inline-block mx-auto" min-width="60vw" :width="isMobile && '100%'">
              <v-card-title>
                口コミ評価
              </v-card-title>
              <!-- <v-card-subtitle>
                評価理由
              </v-card-subtitle> -->
              <v-card-text>
                総合：
                <br />
                <p v-html="transformTextToHtml(review.general_post)" />
              </v-card-text>
              <v-card-text>
                チーム方針：
                <br />
                <p v-html="transformTextToHtml(review.policy_post)" />
              </v-card-text>
              <v-card-text>
                チーム体制：
                <br />
                <p v-html="transformTextToHtml(review.organization_post)" />
              </v-card-text>
              <v-card-text>
                活動内容：
                <br />
                <p v-html="transformTextToHtml(review.activity_post)" />
              </v-card-text>
              <v-card-text>
                チーム環境：
                <br />
                <p v-html="transformTextToHtml(review.environment_post)" />
              </v-card-text>
              <v-card-text>
                イベント：
                <br />
                <p v-html="transformTextToHtml(review.event_post)" />
              </v-card-text>
              <v-card-text>
                費用：
                <br />
                <p v-html="transformTextToHtml(review.cost_post)" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import transformTextToHtml from '~/pages/utils/transformTextToHtml'

export default {
  components: {
  },
  props: {
    review: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      transformTextToHtml,
      genderTypeList: [
        '男性',
        '女性'
      ],
      ageGroupMap: [
        'キッズ',
        '小学生',
        '中学生',
        '高校生',
        '大学・専門学生',
        '社会人'
      ],
      playerFlagMap: [
        'プレーヤー',
        '保護者',
        'チーム関係者',
        'その他'
      ],
      isMobile: this.$vuetify.breakpoint.smAndDown
    }
  },
  computed: {
    displayusername () {
      return this.review.username !== null ? this.review.username : '匿名'
    },
    displayGender () {
      return this.review.gender !== null ? this.genderTypeList[this.review.gender - 1] : '非公開'
    },
    displayAgeGroup () {
      return this.review.age_group !== null ? this.ageGroupMap[this.review.age_group - 1] : '非公開'
    },
    displayIsPlayer () {
      return this.review.player_flag !== null ? this.playerFlagMap[this.review.player_flag - 1] : '非公開'
    }

  },
  mounted () {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 4px 0px 4px 12px;
}
</style>
