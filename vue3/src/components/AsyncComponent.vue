<template>
  <div class="async-content">
    <h3>异步组件</h3>
    <p>计数器平方: {{ count * count }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AsyncComponent',
  props: {
    count: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped>
.async-content {
  margin: 20px 0;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 4px;
}
</style>
