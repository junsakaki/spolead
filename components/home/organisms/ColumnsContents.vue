<template>
    <section v-if="columnsContents.length === 5" class="carousel-container">
        <div>
            <h2>Spoleaderコラム</h2>
            <client-only>
            <swiper :options="jsSlideColumns" class="swiper">
                <swiper-slide v-for="item in columnsContents" :key="item.id" class="carousel-item">
                <a :href="item.url" target="_blank" class="columns-link">
                    <h3 class="columns-title">{{ item.title }}</h3>
                    <p class="columns-date">{{ item.date }}</p>
                    <div class="columns-thumbnail">
                      <img :src="item.thumbnail" alt="" />
                    </div>
                </a>
                </swiper-slide>
                <div slot="pagination" class="swiper-pagination"></div>
                <div slot="button-prev" class="swiper-button-prev"></div>
                <div slot="button-next" class="swiper-button-next"></div>
            </swiper>
            </client-only>
        </div>
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        // Swiperのオプションを設定
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      columnsContents: [],
      posts: [] // データを格納するための配列
    }
  },
  mounted () {
    this.setColumnContents()
  },
  methods: {
    async setColumnContents () {
      try {
        const response = await this.$axios.get(
          'https://column.spoleader.com/index.php/wp-json/wp/v2/posts'
        )

        // date_gmt の値で降順にソート
        response.data.sort((a, b) => new Date(b.date_gmt) - new Date(a.date_gmt))

        // 最初の5件を取得
        this.posts = response.data.slice(0, 5)
        for (const item of this.posts) {
          // itemに対して必要な処理を行う
        //   console.log(item.title.rendered) // 1件ずつのデータが出力されます
          console.log(item._links['wp:featuredmedia'][0].href) // 1件ずつのデータが出力されます
          const res = await this.$axios.get(
            item._links['wp:featuredmedia'][0].href
          )
          console.log('res')
          console.log(res)
          const originalDate = new Date(item.date)
          const formattedDate = `${originalDate.getFullYear()}.${(originalDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}.${originalDate.getDate().toString().padStart(2, '0')}`
          this.columnsContents.push({
            id: item.id,
            title: item.title.rendered,
            date: formattedDate,
            url: item.link,
            thumbnail: res.data.source_url
          })
        }
      } catch (error) {
        console.error('Error fetching data from API:', error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/* カルーセル全体のスタイル */
.carousel-container {
    width: 100%;
    margin: 0 auto;
}

.swiper {
    width: 100%;
    overflow: hidden;
}

.carousel-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px; /* カルーセルアイテムの高さ */
}

.swiper-pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}

.swiper-button-prev,
.swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px; /* ナビゲーションボタンの幅 */
    height: 30px; /* ナビゲーションボタンの高さ */
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5); /* ナビゲーションボタンの背景色 */
    color: #333; /* ナビゲーションボタンの文字色 */
    cursor: pointer;
}

.swiper-button-prev {
    left: 10px;
}

.swiper-button-next {
    right: 10px;
}

.columns-thumbnail img {
  width: 300px;
}
</style>
