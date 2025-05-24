<template>
  <div class="live">
    <div v-if="!currentLive" class="live-list">
      <h1>助农直播</h1>
      <div class="live-cards">
        <div 
          v-for="live in lives" 
          :key="live.id"
          class="live-card"
          @click="enterLive(live.id)"
        >
          <div class="cover">
            <span class="viewer-count">{{ live.viewers }}观看</span>
          </div>
          <div class="info">
            <h3>{{ live.title }}</h3>
            <p>{{ live.farmer }} · {{ live.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="live-room">
      <div class="video-container">
        <div class="placeholder">直播画面</div>
      </div>
      <div class="sidebar">
        <div class="danmu-area">
          <div v-for="msg in messages" :key="msg.id" class="danmu">
            {{ msg.user }}: {{ msg.content }}
          </div>
        </div>
        <button class="coupon-btn">领取优惠券</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLive: null,
      lives: [
        {
          id: 1,
          title: '青山绿茶采摘现场',
          farmer: '张大爷',
          time: '今天 14:00',
          viewers: '1.2万',
          cover: '/images/live1.jpg'
        },
        {
          id: 2,
          title: '手工竹编教学',
          farmer: '李阿姨',
          time: '明天 10:00', 
          viewers: '3.5k',
          cover: '/images/live2.jpg'
        }
      ],
      messages: [
        { id: 1, user: '用户1', content: '茶叶看起来真新鲜' },
        { id: 2, user: '用户2', content: '怎么购买？' }
      ]
    }
  },
  methods: {
    enterLive(id) {
      this.currentLive = this.lives.find(live => live.id === id)
    }
  }
}
</script>

<style scoped>
.live-cards {
  display: grid;
  gap: 20px;
  padding: 15px;
}

.live-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.viewer-count {
  background: rgba(0,0,0,0.5);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.coupon-btn {
  background: #52b467;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
}
</style>
