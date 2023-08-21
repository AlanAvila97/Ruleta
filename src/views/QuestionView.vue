<template>
    <main id="wrapper" class="question">
        <section class="section-question">
        <div class="content-question">
            <div class="container-result">
            <!-- <h1>{{ $route.params.id }}</h1> -->
                <div class="element-animation">
                    <span class="item-animate"></span>
                </div>
                <div class="question info" @dblclick="backAdmin">
                <!-- <div class="question info"> -->
                    <h1 @click="showAnswer">
                        ¿Cuál es el modelo atómico que propuso que el átomo era una esfera 
                        sólida de material con carga positiva con electrones negativos clavados, 
                        como uvas pasas en una torta o pudín?
                    </h1>
                </div>
                <div class="answer d-none info" data-status="1" @dblclick="backAdmin">
                    <h1 @click="showAnswer">
                        Modelo atómico de Thomson
                    </h1>
                </div>
            </div>
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
    const { showAnswer } = dataRuleta;  
    // 
    const route = useRoute();
    const router = useRouter();

    const typeUser = route.params.user;
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
        if( typeUser == 1){
            router.push("/"+typeUser); 
        }
    }
    document.addEventListener('keydown', (event) => {   
        switch (event.keyCode) {
            case 65: 
                // Letra A  
                console.log('letra a');
                showAnswer();
                break;
            case 83:
                // Letra S
                router.push("/");                
                break;                
        }
    });
    onMounted(() => {
        animationItem()
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
  