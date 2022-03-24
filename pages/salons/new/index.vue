<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="container">
      <salons-regist-form @submit="submit" />
    </div>
  </v-layout>
</template>

<script>
import SalonsRegistForm from '~/components/salons/organisms/SalonsRegistForm.vue'
export default {
  components: {
    SalonsRegistForm
  },
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'オンラインサロンの登録申請',
          disabled: true
        }
      ],
      userId: null
    }
  },
  head () {
    return {
      title: 'オンラインサロンの登録申請 | '
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      if (this.$auth && this.$auth.user) {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'userIndex',
            query: {
              id: this.$auth.user.sub
            }
          }).then((res) => {
            if (res.status === 200) {
              this.userId = Number(res.data.user.id)
            }
          })
      } else {
        this.$router.push('/login')
      }
    },
    beforeSalonCreate (data) {
      const nextData = { ...data }
      data.plans.forEach((plan, index) => {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'paymentPlan',
            data: {
              amount: plan.amount,
              interval: 'month'
            }
          }).then((res) => {
            if (res.status === 200) {
              nextData.plans[index].plan_id = res.data.data.id
              if (index === nextData.plans.length - 1) {
                console.log(nextData)
                this.salonCreate(nextData)
              }
            }
          })
      })
    },
    salonCreate (data) {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'salonCreate',
          data
        }).then((res) => {
          if (res.status === 200) {
            this.$router.push('/salons')
          }
        })
    },
    submit (form) {
      const data = { ...form }
      data.owner.user_id = this.userId
      this.beforeSalonCreate(data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';
.container {
  width: 100%;
}
</style>
