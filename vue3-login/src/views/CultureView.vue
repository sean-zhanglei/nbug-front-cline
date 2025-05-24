<template>
  <div class="culture">
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="tab-content">
      <!-- 民俗文化 -->
      <div v-if="activeTab === 1" class="culture-section">
        <h2>民俗文化</h2>
        <div class="video-container">
          <div class="placeholder">民俗文化视频</div>
        </div>
        <p>展示当地传统节日、民间习俗等文化内容</p>
      </div>

      <!-- 传统技艺 -->
      <div v-if="activeTab === 2" class="culture-section">
        <h2>传统技艺</h2>
        <div class="gallery">
          <div v-for="i in 3" :key="i" class="craft-item">
            <div class="placeholder">技艺{{ i }}图片</div>
          </div>
        </div>
      </div>

      <!-- 文化日历 -->
      <div v-if="activeTab === 4" class="calendar">
        <h2>文化活动日历</h2>
        <div class="calendar-grid">
          <div 
            v-for="day in 30" 
            :key="day"
            :class="{ active: day % 7 === 0 }"
          >
            {{ day }}
            <span v-if="day % 7 === 0" class="dot"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 1,
      tabs: [
        { id: 1, name: '民俗文化' },
        { id: 2, name: '传统技艺' },
        { id: 3, name: '历史故事' },
        { id: 4, name: '文化日历' }
      ]
    }
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  border-bottom: 1px solid #d2b48c;
}

.tabs button {
  padding: 10px 15px;
  background: none;
  border: none;
  color: #52b467;
}

.tabs button.active {
  border-bottom: 2px solid #52b467;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.dot {
  display: block;
  width: 6px;
  height: 6px;
  background: red;
  border-radius: 50%;
  margin: 3px auto;
}
</style>
