<template>
    <main id="wrapper" class="bg-home buttons wrapper-2">
      <section class="section-roulette">

        <div class="content-buttons">
            <button class="btn-actions" type="button" data-status="1" data-numero="ZK0j79ShW7RivQ4b8Pfm">Girar</button>
            <button class="btn-actions" type="button" data-status="2" data-numero="ZK0j79ShW7RivQ4b8Pfm">Mostrar / ocultar</button>
            <button class="btn-actions" type="button" data-status="3" data-numero="ZK0j79ShW7RivQ4b8Pfm">Regresar</button>
        </div>
        <div class="double-question">
          <h2>Preguntas dobles</h2>
          <button class="btn-double" type="button" data-status="1" data-numero="ZK0j79ShW7RivQ4b8Pfm">Cambiar</button>
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
    display: none;
  }
  .wrapper-2 {
    display: flex !important;;
    align-items: center;
    height: 100vh;
    width: 100%;
  }

  .content-buttons{
    display: flex;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    height: 100%;
    max-width: 1120px;
    justify-content: space-between;
  }
  .double-question{
    display: flex;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    height: 100%;
    max-width: 1120px;
    flex-direction: column;
  }
  .content-buttons .btn-actions,
  .double-question .btn-double{
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #fff;
    background: rgba(252, 71, 162, 1);
    padding: 1rem;
    width: max(200px, 30%);
    height: 200px;
    max-height: 200px;
    font-size: calc(1rem + 0.5vw);
  }
  .content-buttons .btn-actions:focus{
    box-shadow: 0px 0px 3px 5px #00000061;
  }
  .double-question h2{
    color: #000;
  }
  </style>
  