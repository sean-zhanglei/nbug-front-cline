const { mount } = require('@vue/test-utils')
const HelloWorld = require('./src/components/HelloWorld.vue').default

describe('HelloWorld.vue', () => {
  it('渲染初始消息', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.find('h1').text()).toBe('Hello Vue 3!')
  })

  it('反转消息功能', async () => {
    const wrapper = mount(HelloWorld)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('h1').text()).toBe('!3 euV olleH')
  })

  it('增加计数功能', async () => {
    try {
      const wrapper = mount(HelloWorld)
      console.log('组件HTML:', wrapper.html())
      
      // 使用更精确的选择器
      const incrementBtn = wrapper.find('button:nth-of-type(2)')
      if(!incrementBtn.exists()) {
        throw new Error('未找到增加按钮')
      }
      
      await incrementBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('计数: 1')
    } catch (error) {
      console.error('测试失败:', error)
      throw error
    }
  })
})
