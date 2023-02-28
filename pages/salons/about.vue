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
      <img src="@/assets/images/about.png" alt="Logo" class="salon-eye">
    </div>
    <div class="salon-about-content1">
        <img src="@/assets/images/women.png" alt="Logo" class="salon-about-woman">
      <div class="salon-about-comment1">
        <h2>オンラインサロンの特徴</h2>
        <p>
        オンラインサロンとはインターネット上で運営される会費制のクローズドなコミュニティのこと。
        誰でも参加できるオープンなSNSと異なり、同じ目的を持って対価を支払った熱量の高い人だけが参加できる仕組みになっています。
        仕事で使える知識を専門家に教わるスキルアップ型、憧れの芸能人と交流できるファンクラブ型、仲間と共にプロジェクトを実行していく企画型など、
        さまざまなスタイルがあるのが特徴です。
        </p>
      </div>
    </div>
    <div class="salon-about-content2">
      <div class="salon-about-comment2">
        <h2>多彩なオンラインサロン</h2>
        <h3>ファンクラブ型</h3>
        <h4>著名人と交流できる！限定イベントや先行告知も！</h4>
        <p>
        憧れのアイドルやタレント、著名人と交流できるサロン。サロン限定の写真や動画の閲覧、イベント先行告知やオフ会などで直接会える機会を設けているサロンもあります。
        </p>
        <h3>学ぶ・スキルアップ型</h3>
        <h4>専門分野の知識を学べる！会員同士の情報交換も活発</h4>
        <p>
        専門家や評論家、コンサルタントなど、さまざまな分野のプロフェッショナルから知識や技能のノウハウ共有を受けられます。会員同士での情報交換も盛んです。
        </p>
        <h3>集う・企画型</h3>
        <h4>著名人と交流できる！限定イベントや先行告知も！</h4>
        <p>
        実業家やジャーナリスト、起業家などがオーナーのサロンでは、メンバー同士でディスカッションしたり、共にプロジェクトを実行する動きが盛んです。趣味の合うメンバー同士でのオフ会も開催されています。
        </p>
        <h3>悩み相談型</h3>
        <h4>仕事や恋愛のお悩み相談！カウンセリングや鑑定で解決</h4>
        <p>
        カウンセラーや医師、スピリチュアルなど、特有のスキルを持った方から診断や占いなどを受けられます。カウンセリングや直接鑑定などを体験できるサロンもあり、あなたの悩みを解決する近道になるかもしれません。
        </p>
      </div>
      <div class="salon-about-ballon">
        <img src="@/assets/images/balloon.png" alt="Logo" class="salon-about-ballon">
      </div>
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
.salon-head {
  background: #F7F8FA;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align:center;
  padding: 10px;
}
.salon-eye {
  width: 90%;
  line-height: 24px;
  padding: 10px;
}
.salon-about-content1 {
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  margin: 50px;
}
.salon-about-content2 {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 10px;
}
.salon-about-woman{
  width:300px;
  margin: 10px;
}
.salon-about-comment1 {
  background: #F7F8FA;
  border-radius: 50px;
  padding: 15px;
  width:60%;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  margin: 10px;
}
.salon-about-comment2 {
  background: #F7F8FA;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  border-radius: 50px;
  width:50%;
  padding: 15px;
  margin: 10px;
}

.salon-about-ballon {
  width:300px;
  margin: 10px;
}
</style>
