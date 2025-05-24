<template>
  <div class="profile">
    <div class="user-info">
      <div class="avatar"></div>
      <h2>乡村用户</h2>
    </div>

    <div class="functions">
      <div class="func-item">
        <div class="icon">📦</div>
        <span>我的订单</span>
      </div>
      <div class="func-item">
        <div class="icon">❤️</div>
        <span>我的收藏</span>
      </div>
      <div class="func-item">
        <div class="icon">📱</div>
        <span>联系客服</span>
      </div>
      <div class="func-item">
        <div class="icon">⚙️</div>
        <span>设置</span>
      </div>
    </div>

    <button class="feedback-btn">意见反馈</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '乡村用户',
        avatar: '/images/avatar.jpg'
      }
    }
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
}

.user-info {
  text-align: center;
  margin-bottom: 30px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f7d794;
  margin: 0 auto 10px;
}

.functions {
  margin-bottom: 30px;
}

.func-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.icon {
  margin-right: 15px;
  font-size: 20px;
}

.feedback-btn {
  background: #52b467;
  color: white;
  border: none;
  padding: 12px 0;
  width: 100%;
  border-radius: 6px;
}
</style>
