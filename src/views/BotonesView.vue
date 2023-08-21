<template>
    <main id="wrapper" class="bg-home index">
      <section class="section-roulette">

        <div class="content-buttons">
            <button class="btn-actions" type="button" data-status="1" data-numero="ZK0j79ShW7RivQ4b8Pfm">Girar</button>
            <button class="btn-actions" type="button" data-status="2" data-numero="ZK0j79ShW7RivQ4b8Pfm">Mostrar / ocultar</button>
            <button class="btn-actions" type="button" data-status="3" data-numero="ZK0j79ShW7RivQ4b8Pfm">Regresar</button>
        </div>
  
      </section>
    </main>
  </template>
  <script setup>
      // vue
      import { ref, onMounted, computed } from "vue"
      import { useRoute, useRouter } from "vue-router";
      // Roullete
      import { Roulette } from "vue3-roulette";
      // Pinia
      import { useRuleta } from '../stores/dataRuleta'
      // 
      const dataRuleta = useRuleta();
      const { getItems, configRulette, updateStatus, getDataFirebase } = dataRuleta;  
      // 
      const wheel = ref(null);
      const route = useRoute();
      const router = useRouter();
      const items = getItems();
      const wheelSettings = configRulette(); 
      const typeeUser = route.params.user;
      onMounted(() => {
        getDataFirebase();
        updateStatus();
      });
  </script>
  <style scoped>
  #wrapper {
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
  </style>
  