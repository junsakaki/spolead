<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="d-flex justify-center mt-2">
      <v-btn-toggle v-model="recruitment_target" color="primary" mandatory rounded>
        <v-btn value="student" class="px-8" @click="changeRecruitmentTarget('student')">
          コーチを探す
        </v-btn>
        <v-btn value="coach" class="px-8" @click="changeRecruitmentTarget('coach')">
          生徒を探す
        </v-btn>
      </v-btn-toggle>
    </div>
    <div v-if="recruitment_target === 'student'" class="lessons mt-4">
      <div v-for="lesson in lessons.filter(lesson => lesson.recruitment_target === 'student')" :key="lesson.id" class="px-2 py-3">
        <router-link :to="`/lessons/${lesson.id}`" class="lesson">
          <v-card rounded style="overflow: hidden">
            <v-row no-gutters>
              <v-col cols="12" sm="3">
                <v-img
                  v-if="lesson.image_top"
                  :src="lesson.image_top"
                  height="100%"
                />
                <div v-else class="lesson-image" />
              </v-col>
              <v-col cols="12" sm="9" class="pa-2">
                <div class="body-1 font-weight-bold lesson-name px-2">
                  {{ lesson.name }}
                </div>
                <div class="caption owner-name px-2 text-right">
                  <v-icon small>
                    mdi-account
                  </v-icon>
                  {{ lesson.owner.name }}
                </div>
                <div class="caption font-weight-bold lesson-caption px-2">
                  {{ lesson.caption }}
                </div>
                <div class="caption lesson-content px-2 mt-2">
                  {{ lesson.content }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </router-link>
      </div>
    </div>
    <div v-if="recruitment_target === 'coach'" class="lessons mt-4">
      <div v-for="lesson in lessons.filter(lesson => lesson.recruitment_target === 'coach')" :key="lesson.id" class="px-2 py-3">
        <v-card rounded style="overflow: hidden">
          <div class="pa-2">
            <v-row no-gutters>
              <v-col cols="12" sm="11">
                <div class="body-1 font-weight-bold lesson-name px-2">
                  {{ lesson.name }}
                </div>
                <div class="caption font-weight-bold lesson-caption px-2">
                  {{ lesson.caption }}
                </div>
                <div class="caption owner-name px-2">
                  <v-icon small>
                    mdi-account
                  </v-icon>
                  {{ lesson.owner.name }}
                </div>
              </v-col>
              <v-col cols="12" sm="1" class="d-flex align-center justify-center">
                <v-btn icon @click="startTalkroom(lesson)">
                  <v-icon>
                    mdi-message-text
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: '指導者マッチング',
          disabled: true
        }
      ],
      lessons: [],
      recruitment_target: this.$route.query.recruitment ?? 'student'
    }
  },
  head () {
    return {
      title: '指導者マッチング | '
    }
  },
  created () {
    this.getLessons()
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
            this.isLoading = false
            if (res.status === 200) {
              this.userId = Number(res.data.user.id)
            }
          })
      } else {
        this.$router.push('/login')
      }
    },
    getLessons () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'lessonIndex'
        }).then((res) => {
          if (res.status === 200) {
            this.lessons = res.data.lessons
          }
        })
    },
    changeRecruitmentTarget (recruitmentTarget) {
      this.$router.replace(`/lessons?recruitment=${recruitmentTarget}`)
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
                  content: `「${lesson.name}」から依頼しました！`
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
.lesson {
  text-decoration: none;
}
.lesson-image {
  width: 100%;
  height: 100px;
  background: grey;
}
.lesson-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}
.owner-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
.lesson-caption {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}
.lesson-content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}
</style>
