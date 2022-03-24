<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <GuideLine :sports-title="getSportsTitle()" />
    <SearchForm placeholder="検索(スレッド名)" class="mt-8" @execSearch="execSearch" />
    <v-card class="px-4 py-2 mt-4">
      <div class="thread main mb-1">
        <div class="grey--text">
          スレッド名
        </div>
        <div class="text-center grey--text">
          コメント数
        </div>
        <div class="text-center grey--text">
          閲覧数
        </div>
      </div>
      <v-divider class="mb-2" />
      <router-link v-for="thread in displayThreads" :key="`thread-${thread.id}`" :to="`/forums/${$route.params.forumId}/threads/${thread.id}?sportsId=${$route.query.sportsId}`" class="thread py-1">
        <div class="thread-name ml-2">
          {{ thread.name }}
        </div>
        <div class="text-center">
          {{ thread.comments_count }}
        </div>
        <div class="text-center">
          {{ thread.views }}
        </div>
        <div class="filter" />
      </router-link>
    </v-card>
    <Pagination :total-pages="totalPages" :page="page" @execPagination="execPagination" />
    <div class="h2 text-left page-content-title mt-4">
      スレッドを作成する
    </div>
    <v-card class="mt-2 py-6 px-4">
      <div class="form-input">
        <span>ユーザー名</span>
        <div>
          <span class="validation-icon px-2">任意</span>
        </div>
        <input v-model="post.user_name" class="px-2" placeholder="(例) 名無しさん">
      </div>
      <div class="form-input mt-4">
        <span>スレッド名</span>
        <div>
          <span class="validation-icon required px-2">必須</span>
        </div>
        <input v-model="post.name" class="px-2" placeholder="(例) 指導方針について">
      </div>
      <textarea
        v-model="post.content"
        class="form-textarea mt-4 px-2"
        placeholder=""
      />
      <PostGuideLine target-name="スレッド" class="mt-4" />
      <div class="d-flex justify-center mt-4">
        <common-button button-color="primary" :disabled="post.content ==='' || post.name ===''" @click="createThread()">
          作成
        </common-button>
      </div>
    </v-card>
  </div>
</template>

<script>
import GuideLine from '~/components/shared/organisms/GuideLine.vue'
import CommonButton from '~/components/shared/atoms/CommonButton.vue'
import Pagination from '~/components/shared/molecules/Pagination.vue'
import SearchForm from '~/components/shared/molecules/SearchForm.vue'
import PostGuideLine from '~/components/shared/organisms/PostGuideLine.vue'

export default {
  components: {
    GuideLine,
    SearchForm,
    CommonButton,
    Pagination,
    PostGuideLine
  },
  data () {
    return {
      breadcrumbs: [],
      forum: {},
      displayThreads: [],
      searchWord: '',
      post: {
        user_name: '',
        name: '',
        content: ''
      },
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      totalPages: 10,
      paginationLimit: 20
    }
  },
  head () {
    return {
      title: 'BBS掲示板 | '
    }
  },
  created () {
    this.getForumDetail()
  },
  methods: {
    getSportsTitle () {
      const targetSports = this.$SPORTS.find(sports => sports.id === Number(this.$route.query.sportsId))
      return targetSports.title
    },
    getForumDetail () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'forumDetail',
          query: {
            id: Number(this.$route.params.forumId)
          }
        }).then((res) => {
          if (res.status === 200) {
            this.forum = res.data.bbs_forums[0]
            this.execPagination(this.page)
            this.totalPages = Math.ceil(this.forum.thread.length / this.paginationLimit)
            this.breadcrumbs = [
              ...this.$BREADCRUMBS,
              {
                text: 'BBS掲示板',
                link: true,
                exact: true,
                disabled: false,
                to: {
                  path: `/forums?sportsId=${this.$route.query.sportsId}`
                }
              },
              {
                text: this.forum.name,
                disabled: true
              }
            ]
          }
        })
    },
    execSearch (searchWord) {
      this.searchWord = searchWord
      this.page = 1
      this.getForumDetail()
    },
    execPagination (page) {
      window.scrollTo(0, 0)
      this.page = page
      this.displayThreads = this.forum.thread.slice((page - 1) * this.paginationLimit, (page - 1) * this.paginationLimit + this.paginationLimit)
      this.$router.push({ path: this.$router.path, query: { ...this.$route.query, page } })
    },
    createThread () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'threadCreate',
          data: {
            ...this.post,
            forum_id: Number(this.$route.params.forumId)
          }
        }).then((res) => {
          if (res.status === 200) {
            this.getForumDetail()
            this.post = {
              user_name: '',
              name: '',
              content: ''
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.thread {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  text-decoration: none;
  color: inherit;
}
.thread:visited {
  color: inherit;
}
.thread.main {
  font-size: 12px;
}
.thread-name {
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  ;
}
.thread .filter {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #1976d214;
  opacity: 0;
  transition-duration: 0.5s;
  cursor: pointer;
}
.thread:hover .filter {
  opacity: 1;
}
.form-input {
  display: grid;
  grid-template-columns: 100px 50px 1fr;
  input {
    border: solid 1px rgba(156, 156, 156, 0.37);
    border-radius: 4px;
    font-size: 14px;
  }
}
.form-textarea {
  width: 100%;
  border: solid 1px rgba(156, 156, 156, 0.37);
  border-radius: 4px;
  min-height: 200px;
  font-size: 14px;
}
.validation-icon {
  font-size: 12px;
  background: grey;
  color: white;
  border-radius: 4px;
}
.required {
  background: red;
}
</style>
