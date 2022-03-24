<template>
  <v-row justify="center">
    <v-dialog v-if="dialog" :value="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="headline">申請内容</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              サロン名
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ salon.name }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              概要
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ salon.caption }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              トップ画像
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-img
                v-if="salon.imageTop"
                :src="salon.imageTop"
                max-height="150"
                max-width="250"
                contain
              />
              <div v-else>
                <v-card outlined tile class="pa-1">
                  画像はありません
                </v-card>
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              内容
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <p v-html="transformTextToHtml(salon.content)" />
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              背景
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <p v-html="transformTextToHtml(salon.background)" />
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              自己紹介
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <p v-html="transformTextToHtml(salon.selfIntroduction)" />
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              注意事項
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <p v-html="transformTextToHtml(salon.precautions)" />
              </v-card>
            </v-col>
          </v-row>
          <div>プラン一覧</div>
          <v-row v-for="plan in salon.plans" :key="`plan-${plan.id}`">
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              {{ plan.name }}
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <div>
                  価格: {{ plan.amount.toLocaleString() }}円
                </div>
                <div>
                  {{ plan.caption }}
                </div>
              </v-card>
            </v-col>
          </v-row>
          <div>申請者情報</div>
          <v-row>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              氏名
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ salon.owner.name }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              住所
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ salon.owner.address }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              メールアドレス
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ salon.owner.mail_address }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              生年月日
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ salon.owner.birthday }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              電話番号
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ salon.owner.tel }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              本人確認書類1
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-img
                v-if="salon.owner.identification1"
                :src="salon.owner.identification1"
                max-height="150"
                max-width="250"
                contain
              />
              <div v-else>
                <v-card outlined tile class="pa-1">
                  画像はありません
                </v-card>
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              本人確認書類2
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-img
                v-if="salon.owner.identification2"
                :src="salon.owner.identification2"
                max-height="150"
                max-width="250"
                contain
              />
              <div v-else>
                <v-card outlined tile class="pa-1">
                  画像はありません
                </v-card>
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              振込先口座情報
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ salon.owner.transferAccount }}
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeModal(false)">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import transformTextToHtml from '~/utils/transformTextToHtml'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    salon: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      transformTextToHtml
    }
  },
  created () {
    console.log(this.salon)
  },
  methods: {
    closeModal (shouldUpdateTeamDetail) {
      this.$emit('closeModal', shouldUpdateTeamDetail)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
