<template>
  <div>
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

<script>
export default {
  data() {
    return {
      message: 'Hello Vue 2!',
      count: 0,
      showExtra: true,
      items: ['Vue', 'React', 'Angular'],
      newItem: '',
      createdAt: '',
      childMessage: ''
    }
  },
  computed: {
    doubledCount() {
      return this.count * 2
    }
  },
  watch: {
    count(newVal, oldVal) {
      console.log(`计数从 ${oldVal} 变为 ${newVal}`)
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    increment() {
      this.count++
    },
    toggleShow() {
      this.showExtra = !this.showExtra
    },
    addItem() {
      if (this.newItem.trim()) {
        this.items.push(this.newItem)
        this.newItem = ''
      }
    },
    handleChildEvent(msg) {
      this.childMessage = msg
      console.log('收到子组件消息:', msg)
    }
  },
  created() {
    this.createdAt = new Date().toLocaleTimeString()
    console.log('组件已创建')
  },
  mounted() {
    console.log('组件已挂载')
  },
  components: {
    ChildComponent: () => import('./ChildComponent.vue')
  }
}
</script>

<style scoped>
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
