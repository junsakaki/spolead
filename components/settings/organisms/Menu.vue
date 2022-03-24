<template>
  <v-card class="text-center pb-2">
    <!-- <router-link to="/settings/account" class="subtitle-2 font-weight-bold settings-link">
      <div class="py-3">
        アカウント
      </div>
    </router-link> -->
    <router-link to="/settings/salons" class="subtitle-2 font-weight-bold mt-4 settings-link">
      <div class="py-3">
        オンラインサロン
      </div>
    </router-link>
    <router-link to="/settings/funds" class="subtitle-2 font-weight-bold mt-4 settings-link">
      <div class="py-3">
        クラウドファンディング
      </div>
    </router-link>
    <router-link to="/settings/lessons" class="subtitle-2 font-weight-bold mt-4 settings-link">
      <div class="py-3">
        指導者マッチング
      </div>
    </router-link>
    <!-- <router-link to="/settings/payments" class="subtitle-2 font-weight-bold mt-4 settings-link">
      <div class="py-3">
        決済情報
      </div>
    </router-link> -->
    <v-divider />
    <v-btn color="error" text class="mt-2" @click="logOut">
      ログアウト
    </v-btn>
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
.settings-link {
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
