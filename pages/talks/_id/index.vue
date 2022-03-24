<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="lesson-detail body-2 py-2 px-4">
      <div class="d-flex">
        <div class="font-weight-bold">
          指導概要
        </div>
        <div class="ml-2 lesson-detail-button" @click="showLessonDetail">
          {{ lessonDetail ? '非表示' : '表示' }}
        </div>
      </div>
      <div v-if="lessonDetail" class="my-2">
        <div>{{ talk.lesson.name }}</div>
        <div>{{ talk.lesson.caption }}</div>
        <v-row no-gutters class="mt-4">
          <v-col cols="12" sm="2" style="margin-top: -1px;">
            <v-card outlined tile class="pa-2">
              指導形式
            </v-card>
          </v-col>
          <v-col cols="12" sm="10" style="margin-top: -1px;">
            <v-card outlined tile class="pa-2">
              <v-chip v-for="contactType in talk.lesson.contact_type.split(',').map(Number)" :key="`contactType-${contactType}`" color="primary font-weight-bold" x-small class="mx-1">
                {{ getContactType(contactType) }}
              </v-chip>
            </v-card>
          </v-col>
          <v-col cols="12" sm="2" style="margin-top: -1px;">
            <v-card outlined tile class="pa-2">
              支払形式
            </v-card>
          </v-col>
          <v-col cols="12" sm="10" style="margin-top: -1px;">
            <v-card outlined tile class="pa-2">
              <v-chip v-for="paymentType in talk.lesson.payment_type.split(',').map(Number)" :key="`paymentType-${paymentType}`" color="primary font-weight-bold" x-small class="mx-1">
                {{ getPaymentType(paymentType) }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
        <div class="d-flex justify-center align-center mt-2">
          <router-link :to="`/lessons/${talk.lesson.id}`" class="detail-link caption">
            詳細を確認
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="!!userId" class="mt-4 body-1">
      <div v-if="talk.comments.length > 0">
        <div v-for="comment in talk.comments" :key="`comment-${comment.id}`" class="mt-4">
          <div class="comment-wrapper">
            <div class="caption">
              <!-- {{ !isMyComment(comment.user.id) ? talk.users.find(user => user.id === comment.user.id).name : '' }} -->
              {{ !isMyComment(comment.user.id) ? `id: ${comment.user.id}` : '' }}
            </div>
            <v-card outlined :class="`pa-2 comment ${isMyComment(comment.user.id) ? 'mine ml-4' : 'mr-4'}`">
              <p class="ma-0 comment-content" v-html="transformTextToHtml(comment.content)" />
            </v-card>
            <div class="caption text-right">
              {{ isMyComment(comment.user.id) ? 'あなた' : '' }}
            </div>
          </div>
          <div class="comment-wrapper">
            <div />
            <div>
              <v-card v-if="comment.payment" :class="`pa-4 mt-4 ${isMyComment(comment.user.id) ? 'ml-4' : 'mr-4'} text-center`" color="blue-grey" dark>
                <div>{{ `${!!comment.payment.plan_id ? '月額' : '支払い金額'}` }}: {{ comment.payment.amount.toLocaleString() }}円</div>
                <div v-if="comment.payment.cancel">
                  キャンセル済み
                </div>
                <div v-else>
                  <router-link
                    v-if="!comment.payment.payment_id"
                    :to="`/payment?type=lesson&id=${comment.payment.id}${comment.payment.plan_id ? `&subscriptionPlanId=${comment.payment.plan_id}` : ''}&name=${talk.lesson.name}&amount=${comment.payment.amount}&paymentType=${comment.payment.plan_id ? 'subscription' : 'charge'}`"
                    target="_blank"
                    style="text-decoration: none;"
                  >
                    <v-btn
                      class="mt-4"
                      color="blue-grey darken-2"
                      dark
                      :disabled="!!comment.payment.payment_id || isUsedPaymentButton"
                      @click="onClickPaymentButton()"
                    >
                      決済へ進む
                    </v-btn>
                  </router-link>
                  <div v-else>
                    <v-btn
                      class="mt-4"
                      color="error"
                      dark
                      @click="onClickCancelButton(comment)"
                    >
                      キャンセル
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </div>
            <div />
          </div>
        </div>
      </div>
      <div v-else>
        メッセージはまだありません
      </div>
    </div>
    <comment-button @complete="getTalkDetail()" />
    <payment-cancel-modal
      :dialog="paymentCancelModal"
      :comment="selectedComment"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import transformTextToHtml from '~/utils/transformTextToHtml'
import CommentButton from '~/components/talks/atoms/CommentButton.vue'
import PaymentCancelModal from '~/components/talks/organisms/PaymentCancelModal.vue'

export default {
  components: { CommentButton, PaymentCancelModal },
  data () {
    return {
      transformTextToHtml,
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'トークルーム',
          link: true,
          exact: true,
          disabled: false,
          to: {
            path: '/talks'
          }
        },
        {
          text: '詳細',
          disabled: true
        }
      ],
      lessonDetail: false,
      talk: { comments: [] },
      userId: null,
      isUsedPaymentButton: false,
      paymentCancelModal: false,
      selectedComment: null
    }
  },
  created () {
    this.getUser()
    this.getTalkDetail()
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
            this.isLoading = false
            if (res.status === 200) {
              this.userId = Number(res.data.user.id)
            }
          })
      } else {
        this.$router.push('/login')
      }
    },
    getTalkDetail () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'talkDetail',
          query: {
            id: Number(this.$route.params.id)
          }
        }).then((res) => {
          if (res.status === 200) {
            this.talk = res.data.lessons_talk_room
          }
        })
    },
    showLessonDetail () {
      this.lessonDetail = !this.lessonDetail
    },
    getContactType (contactType) {
      const target = this.$CONTACT_TYPE.find(item => item.id === Number(contactType))
      return target ? target.type : null
    },
    getPaymentType (paymentType) {
      const target = this.$PAYMENT_TYPE.find(item => item.id === Number(paymentType))
      return target ? target.type : null
    },
    isMyComment (id) {
      return id === this.userId
    },
    onClickPaymentButton () {
      this.isUsedPaymentButton = true
    },
    onClickCancelButton (comment) {
      this.selectedComment = comment
      this.paymentCancelModal = true
    },
    closeModal (shouldUpdateUser) {
      this.paymentCancelModal = false
      this.selectedComment = null
      if (shouldUpdateUser) {
        this.getUser()
        this.getTalkDetail()
      }
    }
  }
}
</script>
<style lang="scss">
.lesson-detail {
  border: solid 1px #80808061;
  border-radius: 10px;
}
.lesson-detail-button {
  font-size: 10px;
  color: #1976D2;
  cursor: pointer;
}
.detail-link {
  text-decoration: none;
}
.comment-wrapper {
  display: grid;
  grid-template-columns: 50px 1fr 50px;
}
.comment.mine {
  color: white !important;
  background-color: #1976d2 !important;
}
.comment-button {
  position: sticky;
  text-align: right;
  top: 0;
  bottom: 0;
}
.comment-content {
  span {
    overflow-wrap: anywhere;
  }
}
</style>
