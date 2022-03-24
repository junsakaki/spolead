<template>
  <div>
    <div class="subtitle-1 font-weight-bold">
      <div>指導者/生徒を募集する</div>
      <div class="text-center px-4 mt-2">
        <router-link to="/lessons/new" class="lesson-link">
          <v-btn color="primary" outlined block>
            募集情報入力フォームへ
          </v-btn>
        </router-link>
      </div>
    </div>
    <div class="subtitle-1 font-weight-bold mt-8">
      <div>公開中のマッチング一覧</div>
      <div v-if="lessons.length > 0" class="mt-2">
        <div v-for="lesson in lessons" :key="lesson.id">
          <v-card outlined tile style="margin-top: -1px;">
            <v-row class="my-1 px-2">
              <v-col cols="12" sm="9" class="d-flex align-center body-2 font-weight-bold">
                {{ lesson.name }}
              </v-col>
              <v-col cols="12" sm="3" class="d-flex justify-end align-center">
                <v-btn x-small class="ml-2 font-weight-bold" :color="lesson.approval ? 'error' : 'primary'" elevation="0">
                  {{ lesson.approval ? '掲載中' : '審査中' }}
                </v-btn>
                <router-link :to="`/lessons/${lesson.id}`" class="ml-2 lesson-link">
                  <v-btn icon small>
                    <v-icon small>
                      mdi-eye
                    </v-icon>
                  </v-btn>
                </router-link>
                <v-btn icon small class="ml-2" @click="showEditModal(lesson)">
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <v-card
            v-for="talk in lesson.talks"
            :key="talk.id"
            outlined
            tile
            class="ml-6 lesson-card"
            style="margin-top: -1px;"
          >
            <router-link :to="`/talks/${talk.id}`" style="text-decoration: none;">
              <v-row class="my-1 px-2">
                <v-col cols="12" sm="12" class="caption font-weight-bold py-0 black--text">
                  {{ talk.users[0].name }}とのトークルーム
                </v-col>
                <v-col cols="12" sm="12" class="caption font-weight-bold py-0 px-4 grey--text comment-content">
                  {{ talk.comments.length > 0 ? `あなた: ${talk.comments[0].content}` : 'メッセージはありません' }}
                </v-col>
                <v-col cols="12" sm="12" class="d-flex justify-end align-center py-0 px-4 caption font-weight-bold grey--text">
                  2022/01/01 12:00
                </v-col>
              </v-row>
            </router-link>
          </v-card>
        </div>
      </div>
      <div v-else class="mt-2">
        公開中のマッチングはありません
      </div>
    </div>
    <lesson-edit-modal
      :dialog="editModal"
      :lesson="selectedLesson"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import LessonEditModal from '~/components/settings/organisms/LessonEditModal.vue'

export default {
  components: { LessonEditModal },
  props: {
    lessons: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      editModal: false,
      selectedLesson: null
    }
  },
  methods: {
    closeModal (shouldUpdateUser) {
      this.editModal = false
      this.analyticsModal = false
      this.selectedLesson = null
      if (shouldUpdateUser) {
        this.$emit('getUser')
      }
    },
    showEditModal (salon) {
      this.selectedLesson = salon
      this.editModal = true
    }
  }
}
</script>
<style lang="scss" scoped>
.lesson-link {
  text-decoration: none;
  color: inherit;
}
.lesson-card:hover {
  background-color: #1976d214;
  transition-duration: 0.28s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.comment-content {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
