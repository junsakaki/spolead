<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <div class="text-h5 font-weight-bold">
          {{ lesson.name }}
        </div>
        <div class="body-1 mt-8">
          {{ lesson.caption }}
        </div>
        <div class="body-2 mt-8">
          {{ lesson.owner.name }}
        </div>
        <v-img
          v-if="lesson.image_top"
          :src="lesson.image_top"
          max-height="200"
          max-width="100%"
          class="lesson-image mt-8"
        />
        <div v-else class="lesson-image mt-8" />
        <v-img
          v-if="lesson.image_sub"
          :src="lesson.image_sub"
          max-height="200"
          max-width="100%"
          class="lesson-image mt-8"
        />
        <div v-else class="lesson-image mt-8" />
        <div class="mt-8 d-flex align-center">
          <div class="body-1 font-weight-bold mr-4">
            受講タイプ
          </div>
          <v-chip v-for="contactType in lesson.contact_type.split(',')" :key="`contactType-${contactType}`" color="primary" x-small class="mx-1">
            {{ getContactType(contactType) }}
          </v-chip>
        </div>
        <div class="mt-8 d-flex align-center">
          <div class="body-1 font-weight-bold mr-4">
            支払いタイプ
          </div>
          <v-chip v-for="paymentType in lesson.payment_type.split(',')" :key="`paymentType-${paymentType}`" color="primary" x-small class="mx-1">
            {{ getPaymentType(paymentType) }}
          </v-chip>
        </div>
        <div class="content mt-8">
          <div class="text-h5 font-weight-bold">
            サロン概要
          </div>
          <div class="mt-2">
            <p v-html="transformTextToHtml(lesson.content)" />
          </div>
        </div>
        <div class="background mt-8">
          <div class="text-h5 font-weight-bold">
            背景
          </div>
          <div class="mt-2">
            <p class="body-1" v-html="transformTextToHtml(lesson.background)" />
          </div>
        </div>
        <div class="selfIntroduction mt-8">
          <div class="text-h5 font-weight-bold">
            自己紹介
          </div>
          <div class="mt-2">
            <p class="body-1" v-html="transformTextToHtml(lesson.self_introduction)" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" :class="!$vuetify.breakpoint.smAndDown && 'pl-4'">
        <v-banner elevation="4" rounded>
          <div class="py-4">
            <div class="body-1 font-weight-bold">
              指導依頼
            </div>
            <div class="caption">
              指導を依頼してトークルームを開始します。注意事項をよく読んでから相談ボタンをクリックしてください。
            </div>
            <div class="body-2 font-weight-bold mt-4">
              追加オプション
            </div>
            <v-textarea
              v-model="form.option"
              dense
              required
            />
            <div class="caption font-weight-bold">
              注意事項
            </div>
            <div class="caption">
              {{ lesson.precautions }}
            </div>
            <div class="text-center mt-4">
              <common-button button-color="primary" @click="startTalkroom(lesson)">
                依頼
              </common-button>
            </div>
          </div>
        </v-banner>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import transformTextToHtml from '~/utils/transformTextToHtml'
import CommonButton from '~/components/shared/atoms/CommonButton.vue'

export default {
  components: { CommonButton },
  data () {
    return {
      transformTextToHtml,
      breadcrumbs: [],
      lesson: { owner: {}, contact_type: '', payment_type: '' },
      form: {
        option: null
      },
      userId: null
    }
  },
  head () {
    return {
      title: `${this.lesson.name} - 指導者マッチング | `
    }
  },
  created () {
    this.getLessonDetail()
    this.getUser()
  },
  methods: {
    getUser () {
      if (this.$auth && this.$auth.user) {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'userIndex',
            query: {
              id: this.$auth.user.sub
            }
          }).then((res) => {
            if (res.status === 200) {
              this.userId = Number(res.data.user.id)
            }
          })
      } else {
        this.$router.push('/login')
      }
    },
    getLessonDetail () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'lessonDetail',
          query: {
            id: Number(this.$route.params.id)
          }
        }).then((res) => {
          if (res.status === 200) {
            this.lesson = res.data.lesson
          }
          this.breadcrumbs = [
            ...this.$BREADCRUMBS,
            {
              text: '指導者マッチング',
              link: true,
              exact: true,
              disabled: false,
              to: {
                path: '/lessons'
              }
            },
            {
              text: this.lesson.name,
              disabled: true
            }
          ]
        })
    },
    getContactType (contactType) {
      const target = this.$CONTACT_TYPE.find(item => item.id === Number(contactType))
      return target ? target.type : null
    },
    getPaymentType (paymentType) {
      const target = this.$PAYMENT_TYPE.find(item => item.id === Number(paymentType))
      return target ? target.type : null
    },
    startTalkroom (lesson) {
      // lessonIdを元にトークルームを作成する
      this.$store
        .dispatch('api/apiRequest', {
          api: 'talkCreate',
          data: {
            user_id: this.userId,
            lesson_id: lesson.id
          }
        }).then((res) => {
          if (res.status === 200) {
            // デフォルトのメッセージを送る
            this.$store
              .dispatch('api/apiRequest', {
                api: 'talkCommentCreate',
                query: {
                  id: res.data.talk.id
                },
                data: {
                  user_id: this.userId,
                  content: `「${this.lesson.name}」から依頼しました！（追加オプション： ${this.form.option ?? '記載なし'}）`
                }
              }).then(() => {
              // 受け取ったルームIDヘ遷移する
                this.$router.push(`/talks/${res.data.talk.id}`)
              })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson-image {
  width: 100%;
  height: 200px;
  background: grey;
}
.plan-name {
  border-bottom: solid 1px blue;
}
</style>
