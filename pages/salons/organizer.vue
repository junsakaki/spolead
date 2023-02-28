<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="salon-head">
    <p>
    オンラインレッスンやファンクラブの新しいカタチを目指して提供している オンラインサロンについての説明がここに入ります。
    オンラインレッスンやファンクラブの新しいカタチを目指して提供している オンラインサロンについての説明がここに入ります。
    オンラインレッスンやファンクラブの新しいカタチを目指して提供している オンラインサロンについての説明がここに入ります。
    オンラインレッスンやファンクラブの新しいカタチを目指して提供している オンラインサロンについての説明がここに入ります。
    オンラインレッスンやファンクラブの新しいカタチを目指して提供している オンラインサロンについての説明がここに入ります。
    </p>
    <img src="@/assets/images/organizer1.png" alt="Logo" class="salon-eye">
    <router-link to="/organizer/apply" class="btn1">
      <img
        src="~/assets/images/btn1.png"
        :width="360"
        :aspect-ratio="16/6"
      >
    </router-link>
    </div>
    <div class="salon-about-content1">
        <img src="@/assets/images/organizer12.png" alt="Logo" class="salon-org12">
        <router-link to="/organizer/apply" class="btn1">
          <img
            src="~/assets/images/btn1.png"
            :width="360"
            :aspect-ratio="16/6"
          >
        </router-link>
    </div><br><br><br>
    <div class="salon-about-content1">
      <img src="@/assets/images/organizer3.png" alt="Logo" class="salon-org12">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'はじめての方',
          disabled: true
        }
      ],
      salons: []
    }
  },
  head () {
    return {
      title: 'オンラインサロン | はじめての方'
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

.btn1{
  text-align:center;
}
.salon-head {
  background: #F7F8FA;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align:center;
  padding: 30px;
}
.salon-eye {
  width: 90%;
  padding: 5px;
  margin: 5px;
}
.salon-org12 {
  text-align:center;
  width: 90%;
  padding: 5px;
  margin: 5px;
}
.salon-about-content1 {
  text-align:center;
}
</style>
