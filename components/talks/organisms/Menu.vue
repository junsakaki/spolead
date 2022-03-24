<template>
  <div class="talks-menu">
    <div v-if="!!talks && talks.length > 0">
      <v-card class="px-4 py-2 mt-4">
        <div class="talk main mb-1">
          <div class="grey--text">
            トークルーム
          </div>
          <div class="text-center grey--text">
            相手
          </div>
        </div>
        <v-divider class="mb-2" />
        <router-link v-for="talk in talks" :key="`talk-${talk.id}`" :to="`/talks/${talk.id}`" class="talk py-1">
          <div class="pl-2">
            <div class="caption grey--text text--darken-1">
              ルームID: {{ talk.id }}
            </div>
            <div class="body-1 font-weight-bold">
              {{ talk.lesson.name }}
            </div>
            <div class="body-2 grey--text text--darken-1 ml-2">
              {{ talk.comments.length > 0 ? `${getCommentOwnerName(talk)}: ${talk.comments[0].content}` : 'メッセージはありません' }}
            </div>
            <div v-if="talk.comments.length > 0" class="caption grey--text text--darken-1 ml-2">
              {{ talk.comments[0].created_date }}
            </div>
          </div>
          <div class="body-2 font-weight-bold text-center talk-name ">
            {{ talk.users.find(user => user.id !== userId).id }}
          </div>
          <div class="filter" />
        </router-link>
      </v-card>
    </div>
    <div v-else>
      <div class="grey--text text-center">
        まだトークルームがありません
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    talks: {
      type: Array,
      default: null
    },
    userId: {
      type: Number,
      default: null
    },
    selectedTalk: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getCommentOwnerName (talk) {
      if (talk.comments[0].user.id === this.userId) {
        return 'あなた'
      } else {
        return talk.comments[0].user.id
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.talks-menu {
  height: 100vh;
}
.talk {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 100px;
  text-decoration: none;
  color: inherit;
}
.talk:visited {
  color: inherit;
}
.talk.main {
  font-size: 12px;
}
.talk-name {
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  ;
}
.talk .filter {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1976d214;
  opacity: 0;
  transition-duration: 0.5s;
  cursor: pointer;
}
.talk:hover .filter {
  opacity: 1;
}
</style>
