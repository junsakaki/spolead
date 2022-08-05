<template>
  <v-layout
    column
    justify-center
    align-center
    class="page-container"
  >
    <v-flex
      xs12
      sm8
      md6
      d-flex
      flex-wrap
      class="page-content"
    >
      <router-link to="/" class="top d-flex align-center flex-column">
        <img
          :src="require('~/assets/images/SpoLeader-logo.png')"
          :aspect-ratio="16/6"
          width="80%"
          class="logo"
        >
        <div class="caption font-weight-bold">
          管理者ページ
        </div>
      </router-link>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="login-form"
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="メールアドレス"
          required
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="パスワード"
          required
        />
      </v-form>
      <common-button button-size="large" button-color="primary" class="login-button" @click="login">
        ログイン
      </common-button>
      <v-alert v-if="invalidAuth" type="error">
        認証情報が正しくありません。
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import { colors } from '~/assets/js/Colors.js'
import CommonButton from '~/components/shared/atoms/CommonButton.vue'
export default {
  components: {
    CommonButton
  },
  data () {
    return {
      colors,
      valid: true,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'Emailは必須項目です。',
        v => /.+@.+\..+/.test(v) || 'Emailの形式が正しくありません。'
      ],
      passwordRules: [
        v => (v && v.length >= 5) || 'パスワードは6文字以上です。'
      ],
      invalidAuth: false
    }
  },
  head () {
    return {
      title: 'ログイン | '
    }
  },
  methods: {
    login () {
      if (this.validate()) {
        // this.$store
        //   .dispatch('api/apiRequest', {
        //     api: 'login',
        //     data: {
        //       email: this.email,
        //       password: this.password
        //     }
        //   }).then((res) => {
        //     if (res.status === 200) {
        //       localStorage.setItem('token', res.data.user.access_token)
        //       localStorage.setItem('userId', res.data.user.user_id)
        //       localStorage.setItem('loginDateTime', new Date())
        //       // location.replace('http://localhost:8000/')
        //       location.replace('https://spolead.com/')
        //       // location.replace('http://develop01.spolead-sv.net/')
        //     }
        //   }).catch(() => {
        //     this.invalidAuth = true
        //   })
        this.$router.push('/organizer')
      }
    },
    validate () {
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';
.page-container {
  position: relative;
  height: 100vh;
}
.page-content {
  position: absolute;
  padding: 0 32px 32px 32px;
  display: flex;
  flex-direction: column;
}
.v-input {
  width: 100%;
  margin: 16px 0;
  padding: 0;
}
.v-alert {
  margin: 32px;
}
.login-button {
  width: 100%;
}
.login-form {
  margin-top: 24px;
}
.logo {
  margin: 0 auto;
}
.top {
  text-decoration: none;
  &:hover, &:link, &:visited {
    color: #0000008A;
  }
}
</style>
