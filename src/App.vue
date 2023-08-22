<script setup>
  // Vue
  import { onMounted } from "vue";
  // Components 
  import InputsUsers from './components/InputsUsers.vue';
  // Pinia
  import { useRuleta } from './stores/dataRuleta'
  // 
  const dataRuleta = useRuleta();
  const { updateSimple, generateQuestions } = dataRuleta;  
  // 
  onMounted(() => {
      generateQuestions();
      updateSimple('0', 'ZK0j79ShW7RivQ4b8Pfm');
  });
</script>
<template>
  <InputsUsers></InputsUsers>
  <router-view v-slot="{ Component }">
    <transition name="view" mode="ease-in-out">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.page {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 768px;
  padding: 15px;
  box-sizing: border-box;
}
.view-enter-active,
.view-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.view-enter-active {
  transition-delay: 0.3s;
}
.view-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.view-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.view-leave {
  opacity: 1;
  transform: translateX(0px);
}
.view-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
