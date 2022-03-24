<template>
  <v-card class="text-center">
    <!-- <router-link to="/manage/account" class="subtitle-2 font-weight-bold manage-link">
      <div class="py-3">
        アカウント
      </div>
    </router-link> -->
    <router-link to="/manage/salons" class="subtitle-2 font-weight-bold mt-4 manage-link">
      <div class="py-3">
        オンラインサロン
      </div>
    </router-link>
    <router-link to="/manage/funds" class="subtitle-2 font-weight-bold mt-4 manage-link">
      <div class="py-3">
        クラウドファンディング
      </div>
    </router-link>
    <router-link to="/manage/lessons" class="subtitle-2 font-weight-bold mt-4 manage-link">
      <div class="py-3">
        指導者マッチング
      </div>
    </router-link>
  </v-card>
</template>

<script>
export default {
  methods: {
    logOut () {
      this.$router.push('/logout')
    }
  }
}
</script>
<style lang="scss" scoped>
.manage-link {
  color: inherit;
  text-decoration: none;
  padding: 8px 0;
  :hover {
    background-color: #1976d214;
    transition-duration: 0.28s;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
