<template>
  <div class="child">
    <h3>子组件</h3>
    <p>接收的消息: {{ message }}</p>
    <p>接收的计数: {{ count }}</p>
    <button @click="notifyParent">通知父组件</button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    notifyParent() {
      this.$emit('child-event', '来自子组件的消息')
    }
  }
}
</script>

<style scoped>
.child {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
}
</style>
