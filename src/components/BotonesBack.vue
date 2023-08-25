<template>
    <div class="content-btn-back" @click="clickBack">
        <button class="">REGRESAR</button>
    </div>    
    <div class="content-btn-mostrar" @click="clickBtnShow">
        <button class="">MOSTRAR</button>
    </div>    
</template>
<script setup>
    // vue
    import { useRoute, useRouter } from "vue-router";
    // Pinia
    import { useRuleta } from '../stores/dataRuleta'
    // 
    const dataRuleta = useRuleta();
    const { updateSimple, getDataFirebase, generateQuestions, identicationData } = dataRuleta;  
    // 
    const router = useRouter();
    // 
    const clickBack = () => {
        console.log('limpiar');
        hidenQuestion();
        setTimeout(function () {  
            router.push("/");      
        }, 100);
    }
    const clickBtnShow = () => {
        let contentQuestion = $('.container-result .info');
        let answer = $(`.container-result .answer`);
        let question = $(`.container-result .data-categorias`);
        $(contentQuestion).addClass('d-none');
        if($(answer).attr('data-status') == 1 ){
            $(answer).attr('data-status', 0);
            $(answer).removeClass('d-none');
        }else{
            $(answer).attr('data-status', 1);
            $(question).removeClass('d-none');
        }
        updateSimple('0', 'ZK0j79ShW7RivQ4b8Pfm');

    }
    const hidenQuestion = () =>{
      let contentQuestion = $('.container-result .info');
      let answer = $(`.container-result .answer`);
      let question = $(`.container-result .data-categorias`);
      $(contentQuestion).addClass('d-none');
    //   $(question).removeClass('d-none');
      $(answer).attr('data-status', 1);
    //   $(answer).addClass('d-none');
    }
</script>

<style scoped>
    .content-btn-back{
        position: absolute;
        bottom: 0;
        padding: 5px;
        display: flex;
        z-index: 1;
    }
    .content-btn-mostrar{
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 5px;
        display: flex;
        z-index: 1;
        justify-content: flex-end;
    }
    .content-btn-back button,
    .content-btn-mostrar button{
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #fff;
        background: rgba(252, 71, 162, 1);
        padding: 1rem;
        font-size: calc(0.5rem + 0.5vw);
    }

</style>