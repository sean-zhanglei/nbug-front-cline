<template>
  <div class="child">
    <h3>子组件</h3>
    <p>接收的消息: {{ message }}</p>
    <p>接收的计数: {{ count }}</p>
    <button @click="notifyParent">通知父组件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChildComponent',
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
  emits: ['child-event'],
  setup(props, { emit }) {
    const notifyParent = () => {
      emit('child-event', {
        message: '来自子组件的消息',
        timestamp: new Date().toLocaleTimeString()
      })
    }

    return {
      notifyParent
    }
  }
})
</script>

<style scoped>
.child {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
}
</style>
