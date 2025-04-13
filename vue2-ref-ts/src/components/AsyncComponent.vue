<template>
  <div class="async-content">异步加载的组件内容 - 当前计数: {{ count }}</div>
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
