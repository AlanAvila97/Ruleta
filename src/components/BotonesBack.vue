<template>
    <div class="content-btn-back">
        <button class="">REGRESAR</button>
    </div>    
    <div class="content-btn-mostrar">
        <button class="">MOSTRAR</button>
    </div>    
</template>
<script setup>
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