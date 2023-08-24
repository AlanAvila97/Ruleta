<template>
    <div class="content-btn-ruleta">
        <div class="btn-girar">
            <button class="girar">Girar</button>
        </div>
        <div class="btn-clean-storage">
            <button class="clean">Limpiar</button>
        </div>
    </div>    
</template>
<script setup>
</script>

<style scoped>
    .content-btn-ruleta{
        position: absolute;
        bottom: 0;
        padding: 5px;
        display: flex;
        z-index: 1;
        width: 100%;
    }
    .content-btn-ruleta .btn-girar{
        width: 50%;
        display: flex;
        justify-content: flex-end;
    }
    .content-btn-ruleta .btn-clean-storage{
        width: 50%;
        display: flex;
        justify-content: flex-end;
    }
    .content-btn-ruleta button{
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #fff;
        background: rgba(252, 71, 162, 1);
        padding: 1rem;
        font-size: calc(0.5rem + 0.5vw);
    }
</style>