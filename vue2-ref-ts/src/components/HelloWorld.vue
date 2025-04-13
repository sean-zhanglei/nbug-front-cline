<template>
  <!-- Fragment多根节点 -->
  <div class="main-content">
    <div v-if="showModal" class="modal">
      <p>这是模态框</p>
      <button @click="showModal = false">关闭</button>
    </div>
    <!-- 数据绑定 -->
    <h1>{{ message }}</h1>
    
    <!-- 方法调用 -->
    <button @click="reverseMessage">反转消息</button>
    
    <!-- 计算属性 -->
    <p>计数: {{ count }}</p>
    <p>翻倍计数: {{ doubledCount }}</p>
    <button @click="increment">增加</button>
    
    <!-- 条件渲染 -->
    <div v-if="showExtra">
      <p>当前计数是: {{ count }}</p>
      <button @click="toggleShow">隐藏</button>
    </div>
    <button v-else @click="toggleShow">显示更多</button>
    
    <!-- 列表渲染 -->
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }} - 索引: {{ index }}
      </li>
    </ul>
    <input v-model="newItem" @keyup.enter="addItem">
    <p>复杂计算结果: {{ heavyComputation }}</p>
    
    <!-- 异步组件 -->
    <div v-if="isLoading">加载中...</div>
    <AsyncComponent v-else :count="count"/>

    <!-- 子组件 -->
    <ChildComponent 
      :message="message" 
      :count="count"
      @child-event="handleChildEvent"
    />
    
    <!-- 生命周期展示 -->
    <p>组件创建时间: {{ createdAt }}</p>
    <p v-if="childMessage">子组件消息: {{ childMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import ChildComponent from './ChildComponent.vue'
import AsyncComponent from './AsyncComponent.vue'

interface Item {
  id: number
  name: string
}

interface ChildEventPayload {
  message: string
  timestamp: string
}

// 响应式数据
const useBaseData = () => {
  const message = ref<string>('Hello Vue 3!')
  const count = ref<number>(0)
  const showExtra = ref<boolean>(true)
  
  return { message, count, showExtra }
}

// 列表相关逻辑
const useList = () => {
  const items = ref<Array<Item>>([
    { id: 1, name: 'Vue' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' }
  ])
  const newItem = ref<string>('')

  const addItem = (): void => {
    if (newItem.value.trim()) {
      items.value.push({ 
        id: items.value.length + 1,
        name: newItem.value
      })
      newItem.value = ''
    }
  }

  return { items, newItem, addItem }
}

// 模态框逻辑
const useModal = () => {
  const showModal = ref<boolean>(false)
  return { showModal }
}

// 子组件交互
const useChildComponent = () => {
  const childMessage = ref<string>('')
  
  const handleChildEvent = (payload: ChildEventPayload): void => {
    childMessage.value = `${payload.message} (${payload.timestamp})`
  }

  return { childMessage, handleChildEvent }
}

export default defineComponent({
  name: 'HelloWorld',
  components: {
    ChildComponent,
    AsyncComponent
  },
  setup() {
    const { message, count, showExtra } = useBaseData()
    const { items, newItem, addItem } = useList()
    const { showModal } = useModal()
    const { childMessage, handleChildEvent } = useChildComponent()
    
    const createdAt = ref<string>('')
    const isLoading = ref<boolean>(true)

    // 计算属性
    const doubledCount = computed<number>(() => count.value * 2)
    const heavyComputation = computed<number>(() => {
      // 性能优化：减少计算量
      let result = 0
      for(let i = 0; i < 1000; i++) {
        result += Math.sqrt(i)
      }
      return result
    })

    // 方法
    const reverseMessage = (): void => {
      message.value = message.value.split('').reverse().join('')
    }
    const increment = (): void => {
      count.value++
    }
    const toggleShow = (): void => {
      showExtra.value = !showExtra.value
    }

    // 生命周期
    onMounted(() => {
      createdAt.value = new Date().toLocaleTimeString()
      setTimeout(() => {
        isLoading.value = false
      }, 1000)
    })

    return {
      message,
      showModal,
      count,
      showExtra,
      items,
      newItem,
      createdAt,
      childMessage,
      isLoading,
      doubledCount,
      heavyComputation,
      reverseMessage,
      increment,
      toggleShow,
      addItem,
      handleChildEvent
    }
  }
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 1000;
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  color: #42b983;
}
button {
  margin: 5px;
  padding: 5px 10px;
}
ul {
  margin: 10px 0;
  padding-left: 20px;
}
.async-content {
  margin: 20px 0;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 4px;
}
</style>
