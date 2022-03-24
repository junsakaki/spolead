<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="headline">口コミ投稿フォーム</span>
          <small><span style="color: red;">*</span>は必須項目です</small>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="username"
                  autocomplete="投稿者名(任意)"
                  label="投稿者名(任意)"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <!-- dammy for adjust layout -->
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="player_flag"
                  :items="playerFlagList"
                  label="あなたの立場"
                  item-text="playerType"
                  item-value="playerFlag"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="gender_id"
                  :items="genderTypeList"
                  label="性別"
                  item-text="gender"
                  item-value="genderId"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="age_group"
                  :items="ageGroupList"
                  item-text="AgeGroupType"
                  item-value="AgeGroupId"
                  label="あなたの年代"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="enrollment_period"
                  :items="enrollmentPeriodList"
                  label="在籍年"
                />
              </v-col>
              <v-card-title class="justify-space-between">
                <span class="headline">チーム口コミ評価</span>
              </v-card-title>
              <v-col cols="12">
                <v-textarea
                  v-model="policy_post"
                  autocomplete="チーム方針"
                  label="チーム方針"
                  dense
                />
                <div class="point-space">
                  <span class="blue--text mr-2">
                    ({{ policy_point }})
                  </span>
                  <v-rating v-model="policy_point" />
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="organization_post"
                  autocomplete="チーム体制"
                  label="チーム体制"
                  dense
                />
                <div class="point-space">
                  <span class="blue--text mr-2">
                    ({{ organization_point }})
                  </span>
                  <v-rating v-model="organization_point" />
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="activity_post"
                  autocomplete="活動内容"
                  label="活動内容"
                  dense
                />
                <div class="point-space">
                  <span class="blue--text mr-2">
                    ({{ activity_point }})
                  </span>
                  <v-rating v-model="activity_point" />
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="environment_post"
                  autocomplete="チーム環境"
                  label="チーム環境"
                  dense
                />
                <div class="point-space">
                  <span class="blue--text mr-2">
                    ({{ environment_point }})
                  </span>
                  <v-rating v-model="environment_point" />
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="event_post"
                  autocomplete="イベント"
                  label="イベント"
                  dense
                />
                <div class="point-space">
                  <span class="blue--text mr-2">
                    ({{ event_point }})
                  </span>
                  <v-rating v-model="event_point" />
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="cost_post"
                  autocomplete="費用"
                  label="費用"
                  dense
                />
                <div class="point-space">
                  <span class="blue--text mr-2">
                    ({{ cost_point }})
                  </span>
                  <v-rating v-model="cost_point" />
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="general_post"
                  autocomplete="総合評価"
                  label="総合評価"
                />
                <div class="point-space">
                  <span class="blue--text mr-2">
                    ({{ general_point }})
                  </span>
                  <v-rating v-model="general_point" />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeModal(false)">
            やめる
          </v-btn>
          <v-btn color="blue darken-1" text @click="postReview">
            投稿する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  components: {
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    teamId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      gender_id: '',
      enrollment_period: '在籍中',
      age_group: '',
      player_flag: '',
      general_post: '',
      general_point: 3,
      policy_post: '',
      policy_point: 3,
      organization_post: '',
      organization_point: 3,
      activity_post: '',
      activity_point: 3,
      environment_post: '',
      environment_point: 3,
      event_post: '',
      event_point: 3,
      cost_post: '',
      cost_point: 3,
      username: '',

      genderTypeList: [
        { gender: '男性', genderId: 1 },
        { gender: '女性', genderId: 2 }
      ],
      enrollmentPeriodList: ['在籍中', '2015〜2020', '2010〜2014', '2005〜2009', '2000〜2004', 'それ以前'],

      ageGroupList: [
        { AgeGroupType: 'キッズ', AgeGroupId: 1 },
        { AgeGroupType: '小学生', AgeGroupId: 2 },
        { AgeGroupType: '中学生', AgeGroupId: 3 },
        { AgeGroupType: '高校生', AgeGroupId: 4 },
        { AgeGroupType: '大学・専門学生', AgeGroupId: 5 },
        { AgeGroupType: '社会人', AgeGroupId: 6 }
      ],
      playerFlagList: [
        { playerType: 'プレーヤー', playerFlag: 1 },
        { playerType: '保護者', playerFlag: 2 },
        { playerType: 'チーム関係者', playerFlag: 3 },
        { playerType: 'その他', playerFlag: 4 }
      ]
    }
  },
  methods: {
    postReview () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'reviewCreate',
          data: {
            gender: this.gender_id,
            enrollment_period: this.enrollment_period,
            age_group: this.age_group,
            player_flag: this.player_flag,
            general_post: this.general_post,
            general_point: this.general_point,
            policy_post: this.policy_post,
            policy_point: this.policy_point,
            organization_post: this.organization_post,
            organization_point: this.organization_point,
            activity_post: this.activity_post,
            activity_point: this.activity_point,
            environment_post: this.environment_post,
            environment_point: this.environment_point,
            event_post: this.event_post,
            event_point: this.event_point,
            cost_post: this.cost_post,
            cost_point: this.cost_point,
            team_id: this.teamId,
            username: this.username
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.gender_id = ''
            this.enrollment_period = ''
            this.age_group = ''
            this.player_flag = ''
            this.general_post = ''
            this.general_point = 3
            this.policy_post = ''
            this.policy_point = 3
            this.organization_post = ''
            this.organization_point = 3
            this.activity_post = ''
            this.activity_point = 3
            this.environment_post = ''
            this.environment_point = 3
            this.event_post = ''
            this.event_point = 3
            this.cost_post = ''
            this.cost_point = 3
            this.username = ''
            this.closeModal(true)
          }
        })
    },
    closeModal (shouldUpdateTeamDetail) {
      this.$emit('closeModal', shouldUpdateTeamDetail)
    }
  }
}
</script>
<style lang="scss" scoped>
.point-space {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: -20px;
  position: relative;
}
// .v-rating {
//   z-index: 1;
//   position: relative;
//   top: -8px;
//   right: -330px;
// }
</style>
