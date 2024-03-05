<template>
    <section v-if="columnsContents.length === 9" class="carousel-container">
        <div>
            <h2>SpoLeadeRコラム</h2>
            <client-only>
            <swiper :options="swiperOptions" class="swiper">
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
        autoplay: {
          delay: 1000, // 自動再生の遅延時間（ミリ秒）
          disableOnInteraction: false // ユーザーの操作後も自動再生を継続するかどうか
        },
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
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
        this.posts = response.data.slice(0, 9)
        for (const item of this.posts) {
          const res = await this.$axios.get(
            item._links['wp:featuredmedia'][0].href
          )
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
    margin: 10 auto;
}

.swiper {
    width: 100%;
    overflow: hidden;
}

.carousel-item {
  margin: 0 10px;
  min-width: 300px;
  max-width: calc((100% / 5) - 20px);
  white-space: normal;
  background-color: #f4f4f4;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
    background-color: rgba(190, 182, 182, 0.219); /* ナビゲーションボタンの背景色 */
    color: #333; /* ナビゲーションボタンの文字色 */
    cursor: pointer;
    z-index: 1000; /* 他の要素よりも前面に表示 */
}

.swiper-button-prev {
    left: 30px;
}

.swiper-button-next {
    right: 10px;
}
.columns-title{
  height: 100px;
}
.columns-thumbnail img {
  overflow: hidden;
  width: 100%;
  height: 160px;
  aspect-ratio: 1.618 / 1;
  object-fit: cover;
}
</style>
