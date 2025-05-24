<template>
  <div class="products">
    <h1>特色产品</h1>
    <div class="grid">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img :src="product.image" alt="产品图片">
        <div class="info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.town }} · ¥{{ product.price }}</p>
          <span class="tag" v-if="product.isHot">热销</span>
          <span class="tag new" v-if="product.isNew">新品</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: '青山绿茶',
          town: '青山镇',
          price: 128,
          image: '/images/product1.jpg',
          isHot: true,
          isNew: false
        },
        {
          id: 2,
          name: '手工竹编',
          town: '绿水乡', 
          price: 88,
          image: '/images/product2.jpg',
          isHot: false,
          isNew: true
        }
      ]
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
}

.product-card {
  border: 1px solid #d2b48c;
  border-radius: 8px;
  overflow: hidden;
}

.tag {
  background: #f7d794;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}
.tag.new {
  background: #52b467;
}
</style>
