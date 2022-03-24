<template>
  <div>
    <div class="subtitle-1 font-weight-bold">
      <div>指導者マッチング一覧</div>
      <div v-if="lessons.length > 0" class="mt-2">
        <v-card
          v-for="lesson in lessons"
          :key="lesson.id"
          outlined
          tile
          style="margin-top: -1px;"
          class="lesson-card"
        >
          <v-row class="my-1 px-2">
            <v-col cols="12" sm="9" class="d-flex align-center body-2 font-weight-bold">
              {{ lesson.name }}
            </v-col>
            <v-col cols="12" sm="3" class="d-flex justify-end align-center text-center">
              <v-btn x-small class="ml-2 font-weight-bold" :color="lesson.approval ? 'error' : 'primary'" @click="updateApproval(lesson)">
                {{ lesson.approval ? '承認取消' : '承認する' }}
              </v-btn>
              <v-btn icon small class="ml-2" @click="showDetailModal(lesson)">
                <v-icon small>
                  mdi-eye
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div v-else class="mt-2">
        指導者マッチングはありません
      </div>
    </div>
    <lesson-detail-modal
      :dialog="detailModal"
      :lesson="selectedLesson"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import LessonDetailModal from '~/components/manage/organisms/LessonDetailModal.vue'

export default {
  components: { LessonDetailModal },
  props: {
    lessons: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      detailModal: false,
      selectedLesson: null
    }
  },
  methods: {
    closeModal (shouldUpdateUser) {
      this.detailModal = false
      this.selectedLesson = null
      // TODO: 必要があればサロン情報を含むユーザー情報を再取得する
    },
    showDetailModal (lesson) {
      this.selectedLesson = lesson
      this.detailModal = true
    },
    updateApproval (lesson) {
      this.$emit('updateApproval', lesson)
    }
  }
}
</script>
<style lang="scss" scoped>
.lesson-link {
  text-decoration: none;
  color: inherit;
  .lesson-card:hover {
    background-color: #1976d214;
    transition-duration: 0.28s;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
