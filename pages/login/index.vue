<template>
  <div class="container" />
</template>

<script>
export default {
  head () {
    return {
      title: 'ログイン | '
    }
  },
  created () {
    if (!this.$auth.user && !location.hash) {
      this.$auth.loginWith('auth0')
    } else {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
}
</style>
