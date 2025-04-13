<template>
  <div>
    <teleport to="body">
      <div v-if="showModal" class="modal">
        <p>这是一个Teleport到body的模态框</p>
        <button @click="showModal = false">关闭</button>
      </div>
    </teleport>
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
    <input v-model="newItem" @keyup.enter="addItem" v-focus>
    
    <!-- 子组件 -->
    <ChildComponent 
      :message="message" 
      :count="count"
      @child-event="handleChildEvent"
    />

    <!-- 异步组件 -->
    <Suspense>
      <template #default>
        <AsyncComponent :count="count" />
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>
    
    <!-- 生命周期展示 -->
    <p>组件创建时间: {{ createdAt }}</p>
    <p v-if="childMessage">子组件消息: {{ childMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUpdated, onUnmounted, defineAsyncComponent, Directive } from 'vue'
import ChildComponent from './ChildComponent.vue'

interface Item {
  id: number
  name: string
}

const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'))

export default defineComponent({
  name: 'HelloWorld',
  components: {
    ChildComponent,
    AsyncComponent
  },
  directives: {
    focus: {
      mounted(el: HTMLElement) {
        el.focus()
      }
    }
  },
  setup() {
    // 响应式数据
    const message = ref<string>('Hello Vue 3!')
    const count = ref<number>(0)
    const showExtra = ref<boolean>(true)
    const items = ref<Array<string>>(['Vue', 'React', 'Angular'])
    const newItem = ref<string>('')
    const createdAt = ref<string>('')
    const childMessage = ref<string>('')
    const showModal = ref(false)

    // 计算属性
    const doubledCount = computed<number>(() => count.value * 2)

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
    
    const addItem = (): void => {
      if (newItem.value.trim()) {
        items.value.push(newItem.value)
        newItem.value = ''
      }
    }
    
    const handleChildEvent = (msg: string): void => {
      childMessage.value = msg
      console.log('收到子组件消息:', msg)
    }

    // 生命周期钩子
    onMounted((): void => {
      createdAt.value = new Date().toLocaleTimeString()
      console.log('组件已挂载')
    })

    onUpdated((): void => {
      console.log('组件已更新')
    })

    onUnmounted((): void => {
      console.log('组件已卸载')
    })

    const timer = setInterval(() => {
      console.log('定时器运行中...')
    }, 5000)

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      message,
      count,
      showExtra,
      items,
      newItem,
      createdAt,
      childMessage,
      showModal,
      doubledCount,
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
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1000;
}

.modal button {
  margin-top: 10px;
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
</style>
