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
      <router-link to="/">
        <img
          :src="require('~/assets/images/SpoLeader-logo.png')"
          :aspect-ratio="16/6"
          width="80%"
          class="logo"
        >
      </router-link>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="signup-form"
      >
        <v-text-field
          v-model="nickname"
          :counter="30"
          :rules="nameRules"
          label="ニックネーム"
          required
        />
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
          :append-icon="passwordDisplay.new ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordDisplay.new ? 'text' : 'password'"
          @click:append="passwordDisplay.new = !passwordDisplay.new"
        />
        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordConfirmRules"
          label="パスワード（確認）"
          required
          :append-icon="passwordDisplay.confirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordDisplay.confirm ? 'text' : 'password'"
          @click:append="passwordDisplay.confirm = !passwordDisplay.confirm"
        />
      </v-form>
      <common-button button-size="large" button-color="primary" class="signup-button" @click="signUp">
        アカウント登録
      </common-button>
      <div class="login">
        すでにアカウントをお持ちですか？&nbsp;
        <router-link to="/login">
          ログインする
        </router-link>
      </div>
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
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      passwordDisplay: {
        new: false,
        confirm: false
      },
      nameRules: [
        v => !!v || 'ニックネームは必須項目です。',
        v => (v && v.length <= 30) || 'ニックネームは30文字が上限です。'
      ],
      emailRules: [
        v => !!v || 'Emailは必須項目です。',
        v => /.+@.+\..+/.test(v) || 'Emailの形式が正しくありません。'
      ],
      passwordRules: [
        v => (v && v.length >= 5) || 'パスワードは6文字以上に設定してください。'
      ],
      passwordConfirmRules: [
        v => (v === this.password) || 'パスワードが一致しません。'
      ]
    }
  },
  head () {
    return {
      title: 'アカウント登録 | '
    }
  },
  methods: {
    goLoginPage () {
      this.$router.push('/login')
    },
    validate () {
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    signUp () {
      if (this.validate()) {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'signup',
            data: {
              nickname: this.nickname,
              email: this.email,
              password: this.password
            }
          }).then((res) => {
            if (res.status === 200) {
              localStorage.setItem('token', res.data.access_token)
              localStorage.setItem('userId', res.data.user_id)
              localStorage.setItem('loginDateTime', new Date())
              // location.replace('http://localhost:8000/')
              location.replace('https://spolead.com/')
              // location.replace('http://develop01.spolead-sv.net/')
            }
          })
      }
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
.signup-button {
  width: 100%;
}
.login {
  margin-top: 60px;
  padding-top: 24px;
  text-align: center;
  color: #00000099;
  border-top: solid 1px #00000026;
  a {
    text-decoration: none;
  }
}
.SP .login {
  font-size: 12px;
}
.signup-form {
  margin-top: 24px;
}
.logo {
  margin: 0 auto;
}
</style>
