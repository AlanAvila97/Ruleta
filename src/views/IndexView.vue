<template>
  <main id="wrapper" class="bg-home index">
    <section class="section-roulette">
      <Roulette
        v-if="wheelActive"
        ref="wheel"
        class="ruleta-prueba"
        :items="items"
        :centered-indicator="wheelSettings.centeredIndicator"
        :indicator-position="wheelSettings.indicatorPosition"
        :size="wheelSettings.size"
        :display-shadow="wheelSettings.displayShadow"
        :display-border="wheelSettings.displayBorder"
        :display-indicator="wheelSettings.displayIndicator"
        :duration="wheelSettings.duration"
        :result-variation="wheelSettings.resultVariation"
        :easing="wheelSettings.easing"
        :counter-clockwise="wheelSettings.counterClockwise"
        :horizontal-content="wheelSettings.horizontalContent"
        :base-display="wheelSettings.baseDisplay"
        :base-size="wheelSettings.baseSize"
        :base-display-indicator="wheelSettings.baseDisplayIndicator"
        :base-display-shadow="wheelSettings.baseDisplayShadow"
        :base-background="wheelSettings.baseBackground"
        @click="launchWheel"
        @wheel-end="wheelEndedCallback"
      >
        <template #baseContent>
          <div class="arrow-roullete" v-html="wheelSettings.baseHtmlContent" />
        </template>
      </Roulette>
      <BotonGirar></BotonGirar>
    </section>
  </main>
</template>
<script setup>
    // vue
    import { ref, onMounted, computed } from "vue"
    import { useRoute, useRouter } from "vue-router";
    // Components 
    import BotonGirar from '../components/BotonGirar.vue';
    // Roullete
    import { Roulette } from "vue3-roulette";
    // Pinia
    import { useRuleta } from '../stores/dataRuleta'
    // 
    const dataRuleta = useRuleta();
    const { getItems, configRulette, parseoTexto, getDataFirebase, updateSimple } = dataRuleta;  
    // 
    const wheel = ref(null);
    const wheelActive = ref(true);
    let i = ref(null);
    const route = useRoute();
    const router = useRouter();
    const items = getItems();
    const wheelSettings = configRulette(); 
    const launchWheel = () => { 
      wheel.value.launchWheel();
      updateSimple('1', 'ZK0j79ShW7RivQ4b8Pfm');
    }
    const onHardReset = () => {
      wheelActive.value = false;
      setTimeout(() => {
        wheelActive.value = true;
      }, 100);            
    }
    const wheelEndedCallback = (evt) => {
        let question = parseoTexto(evt.name);
        updateSimple('0', 'ZK0j79ShW7RivQ4b8Pfm');        
        if(question != 'pierde-el-turno' && question != "doble-turno"){
          setTimeout(function(){
            router.push("/question/" + question);
          }, 500);
        }else{
          setTimeout(function(){
            onHardReset();
          }, 500);
        }
    }
    updateSimple('0', 'ZK0j79ShW7RivQ4b8Pfm');
    getDataFirebase();
</script>
<style scoped>
#wrapper {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
