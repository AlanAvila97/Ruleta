<template>
    <div class="visibility-hidden">
        <input id="acionUser" class="actual-user" type="text" value="">
        <input id="acionUser" class="action-user" type="text" value="0">
        <div class="data-categorias">
        </div>
    </div>    
</template>
<script setup>
    // vue
    import { ref, onMounted, computed } from "vue"
    import { useRoute, useRouter } from "vue-router";
    // 
    const route = useRoute();
    const router = useRouter();
    // 
    const typeeUser = route.params.user;
</script>
<style lang="scss" scoped>

</style>