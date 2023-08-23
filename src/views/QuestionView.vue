<template>
    <main id="wrapper" class="question view-question">
        <section class="section-question">
            <div class="content-question">
                <div class="container-result">
                <!-- <h1>{{ $route.params.id }}</h1> -->
                    <div class="element-animation">
                        <span class="item-animate"></span>
                    </div>
                    <div class="question info data-categorias" @click="backAdmin">
                    </div>
                    <div class="answer d-none info" data-status="1" @dblclick="backAdmin">
                    </div>
                </div>
            </div>
            <div class="visibility-hidden">
                <button class="back-home" @click="backAdmin"></button>
            </div>
        </section>
    </main>
  </template>
  <script setup>
    // Css
    import '@/assets/css/main-animation.css'
    // 
    import anime from 'animejs/lib/anime.es.js';    
    // vue
    import { onMounted, computed } from "vue"
    import { useRoute, useRouter } from "vue-router";
    // Pinia
    import { useRuleta } from '../stores/dataRuleta'
    // 
    const dataRuleta = useRuleta();
    const { updateSimple, getDataFirebase, generateQuestions, identicationData } = dataRuleta;  
    // 
    const route = useRoute();
    const router = useRouter();

    const idQuestion = route.params.id;

    const animationItem = () =>{
        anime({
                targets: '.item-animate',
                translateY: [
                    { value: 0, duration: 1000 },
                    { value: 250, duration: 1000 },
                    { value: 0, duration: 1000 }
                ],
                easing: 'linear',
                autoplay: true,
                direction: 'alternate',
                loop: true,
            });
    }    
    const backAdmin = () => {
        // setTimeout(function () {  
        // }, 1000);
    }
    onMounted(() => {
        updateSimple('0', 'ZK0j79ShW7RivQ4b8Pfm');
        animationItem()
        getDataFirebase();
        generateQuestions();
        identicationData(idQuestion);
    });
  </script>
  <style scoped>
    #wrapper {
        display: flex;
        align-items: center;
        height: 100vh;
        width: 100%;
    }
    .d-none{
        display: none!important; 
    }
  </style>
  