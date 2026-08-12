<template>
  <div
    class="back-to-top"
    :class="{ visible: show }"
    @click="scrollToTop"
  >
    ↑
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)

function handleScroll() {
  show.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 80px;
  width: 44px;
  height: 44px;
  background: #1a3c7c;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 999;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(26, 60, 124, 0.3);
}

.back-to-top.visible {
  opacity: 1;
}

.back-to-top:hover {
  transform: translateY(-3px);
}
</style>
