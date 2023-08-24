<template>
    <div class="content-hidden-answer">
        <h3>RESPUESTA</h3>
    </div>    
</template>
<script setup>
</script>

<style scoped>
    .content-hidden-answer{
        position: absolute;
        background: #ccc;
        bottom: 0;
        padding: 5px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .content-hidden-answer h3{
        color: #000;
        font-size: calc(0.8rem + 0.5vw);
    }

</style>