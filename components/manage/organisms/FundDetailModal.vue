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
              クラウドファンディング名
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ fund.name }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              概要
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ fund.caption }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              目標金額
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ fund.target_money }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              期限日
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ fund.limit_date }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              トップ画像
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-img
                v-if="fund.image_top"
                :src="fund.image_top"
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
              サブ画像
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-img
                v-if="fund.image_sub"
                :src="fund.image_sub"
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
                <p v-html="transformTextToHtml(fund.content)" />
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              背景
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <p v-html="transformTextToHtml(fund.background)" />
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              自己紹介
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <p v-html="transformTextToHtml(fund.self_introduction)" />
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              注意事項
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <p v-html="transformTextToHtml(fund.precautions)" />
              </v-card>
            </v-col>
          </v-row>
          <div>プラン一覧</div>
          <v-row v-for="reduction in fund.reductions" :key="`reduction-${reduction.id}`">
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              {{ reduction.name }}
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                <div>
                  価格: {{ reduction.amount.toLocaleString() }}円
                </div>
                <div>
                  {{ reduction.caption }}
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
                {{ fund.owner.name }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              住所
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ fund.owner.address }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              メールアドレス
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ fund.owner.mail_address }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              生年月日
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ fund.owner.birthday }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              電話番号
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-card outlined tile class="pa-1">
                {{ fund.owner.tel }}
              </v-card>
            </v-col>
            <v-col cols="12" sm="3" class="body-2 font-weight-bold">
              本人確認書類1
            </v-col>
            <v-col cols="12" sm="9" class="body-2">
              <v-img
                v-if="fund.owner.identification_1"
                :src="fund.owner.identification_1"
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
                v-if="fund.owner.identification_2"
                :src="fund.owner.identification_2"
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
                {{ fund.owner.transfer_account }}
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
    fund: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      transformTextToHtml
    }
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
