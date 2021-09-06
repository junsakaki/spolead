<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div class="page-header">
      <div class="page-header-title">
        <common-button @click="goSignupPage" button-color="primary" button-size="large">
          アカウント登録
        </common-button>
      </div>
    </div>
    <div class="page-title">
      ログインページ
    </div>
    <v-flex
      xs12
      sm8
      md6
      d-flex
      flex-wrap
      class="page-content"
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="メールアドレス"
          required
        />
        <!-- user@example.com -->
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="パスワード"
          required
        />
        <!-- mypass -->
      </v-form>
    </v-flex>
    <common-button @click="login" button-size="large" button-color="primary" class="login-button">
      ログイン
    </common-button>
    <v-alert v-if="invalidAuth" type="error">
      認証情報が正しくありません。
    </v-alert>
  </v-layout>
</template>

<script>
import { colors } from '~/assets/js/Colors.js'
import CommonButton from '~/components/atoms/CommonButton.vue'

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
  methods: {
    login () {
      console.log('store', this.$store)
      console.log('validate', this.validate())
      if (this.validate()) {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'login',
            data: {
              email: this.email,
              password: this.password
            }
          }).then((res) => {
            if (res.status === 200) {
              console.log('res', res)
              localStorage.setItem('token', res.data.user.access_token)
              localStorage.setItem('userId', res.data.user.user_id)
              localStorage.setItem('loginDateTime', new Date())
              console.log('token →', res.data.access_token)
              // location.replace('http://localhost:8000/')
              //location.replace('https://spolead.com/')
              location.replace('http://develop01.spolead-sv.net/')
            }
          }).catch((err) => {
            console.log('ERROR', err)
            this.invalidAuth = true
          })
      }
    },
    goSignupPage () {
      this.$router.push('/signup')
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
.page-header {
  @include default-page-header;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.page-title {
  width: 100%;
  height: 13vh;
  font-size: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.SP .page-title {
  width: 100%;
  height: 13vh;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-content {
  margin: 32px;
}
.v-input {
  width: 25vw;
}
.SP .v-input {
  width: 75vw;
}
.v-alert {
  margin: 32px;
}
.login-button {
  width: 25vw;
}
.SP .login-button {
  width: 75vw;
}
</style>
