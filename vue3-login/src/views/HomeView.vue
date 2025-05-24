<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <nav class="top-nav">
      <router-link to="/" class="active">首页</router-link>
      <router-link to="/products">特色产品</router-link>
      <router-link to="/culture">文化体验</router-link>
      <router-link to="/live">助农直播</router-link>
      <router-link to="/profile">我的</router-link>
    </nav>

    <!-- 轮播图 -->
    <div class="carousel">
      <div class="carousel-item" v-for="(item, index) in banners" :key="index">
        <img :src="item.image" alt="轮播图">
      </div>
    </div>

    <!-- 热门乡镇 -->
    <section class="section">
      <h2>热门乡镇</h2>
      <div class="card-container">
        <div class="card" v-for="town in towns" :key="town.id">
          <img :src="town.image" alt="乡镇图片">
          <h3>{{ town.name }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [
        { image: '/images/banner1.jpg' },
        { image: '/images/banner2.jpg' },
        { image: '/images/banner3.jpg' }
      ],
      towns: [
        { id: 1, name: '青山镇', image: '/images/town1.jpg' },
        { id: 2, name: '绿水乡', image: '/images/town2.jpg' },
        { id: 3, name: '白云村', image: '/images/town3.jpg' }
      ]
    }
  }
}
</script>

<style scoped>
.top-nav {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  background: rgba(255,255,255,0.5);
}

.carousel {
  position: relative;
  height: 200px;
  margin: 20px 0;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
</style>
