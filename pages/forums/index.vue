<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <GuideLine :sports-title="getSportsTitle()" />
    <v-card class="px-4 py-2 mt-4">
      <div class="forum main mb-1">
        <div class="grey--text">
          フォーラム名
        </div>
        <div class="text-center grey--text">
          スレッド数
        </div>
        <div class="text-center grey--text">
          コメント総数
        </div>
      </div>
      <v-divider class="mb-2" />
      <router-link v-for="forum in forums" :key="`forum-${forum.id}`" :to="`/forums/${forum.id}?sportsId=${$route.query.sportsId}`" class="forum py-1">
        <div class="forum-name ml-2">
          {{ forum.name }}
        </div>
        <div class="text-center">
          {{ forum.thread_count }}
        </div>
        <div class="text-center">
          {{ forum.comments_count }}
        </div>
        <div class="filter" />
      </router-link>
    </v-card>
  </div>
</template>

<script>
import GuideLine from '~/components/shared/organisms/GuideLine.vue'

export default {
  components: {
    GuideLine
  },
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'BBS掲示板',
          disabled: true
        }
      ],
      forums: []
    }
  },
  head () {
    return {
      title: 'BBS掲示板 | '
    }
  },
  watch: {
    $route (to, from) {
      this.getForums()
    }
  },
  created () {
    this.getForums()
  },
  methods: {
    getSportsTitle () {
      const targetSports = this.$SPORTS.find(sports => sports.id === Number(this.$route.query.sportsId))
      return targetSports.title
    },
    getForums () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'forumIndex',
          params: {
            sports_id: Number(this.$route.query.sportsId)
          }
        }).then((res) => {
          if (res.status === 200) {
            this.forums = res.data.bbs_forums
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.forum {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  text-decoration: none;
  color: inherit;
}
.forum:visited {
  color: inherit;
}
.forum.main {
  font-size: 12px;
}
.forum-name {
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  ;
}
.forum .filter {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #1976d214;
  opacity: 0;
  transition-duration: 0.5s;
  cursor: pointer;
}
.forum:hover .filter {
  opacity: 1;
}
</style>
