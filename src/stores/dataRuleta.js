import { ref } from "vue";
import { defineStore } from 'pinia'
import { useRoute, useRouter } from "vue-router";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8HWcarCoCacudf-SZ9HnG8COY6tpcCJY",
  authDomain: "cachiporra-ruleta.firebaseapp.com",
  projectId: "cachiporra-ruleta",
  storageBucket: "cachiporra-ruleta.appspot.com",
  messagingSenderId: "339058061338",
  appId: "1:339058061338:web:f296c1f824dbcec9dd21a3",
  measurementId: "G-HLCHP05J2K"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCxkvPFEH-Xtl5UHN4Q_BJ9wUyAdcfmx0w",
//   authDomain: "rult-9f9a9.firebaseapp.com",
//   projectId: "rult-9f9a9",
//   storageBucket: "rult-9f9a9.appspot.com",
//   messagingSenderId: "236005822566",
//   appId: "1:236005822566:web:094ac065bc065041289da7",
//   measurementId: "G-21E7MT1C9J"
// };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const onGetTasks = (callback) =>
             onSnapshot(collection(db, "jugadas"), callback);
export const updateTurno=(id,newFields)=>
             updateDoc(doc(db, "jugadas", id), newFields);     
//  

export const useRuleta = defineStore('useRuleta', () => {
    const router = useRouter();
    /**
      * @description Funcion que obtiene el json que contiene la infomación de todos los programas
    */
    function jsonCategoriasPreguntas(){       
      var data = $.ajax({ 
          url: 'https://admino.fabricaapps.com/rest/ruleta_temas?cache='+$.now(), 
          async: false
      });
      return data.responseJSON;
    }
    function jsonPreguntas(){       
      var data = $.ajax({ 
          url: 'https://admino.fabricaapps.com/rest/ruleta_preguntas?cache='+$.now(), 
          async: false
      });
      return data.responseJSON;
    }
    const updateStatus = () => {
      $("body .section-roulette .content-buttons .btn-actions").click();
    }
    const updateSimple = async(val, numero) => {
        try {
          await updateTurno(numero, {status: val});
        } catch (error) {
          console.log(error);
        }
    }
    const changeUserSimple = async(val, numero) => {
      try {
        await updateTurno(numero, {status: val});
      } catch (error) {
        console.log(error);
      }
    }
    const getItems = () => {
      let dataCategorias = jsonCategoriasPreguntas();
      let categorias = [];
      dataCategorias.forEach((element, key) => {
        let slug = element.name.replaceAll('<br>', '-');
            slug = parseoTexto(slug);
            categorias.push({
                              id: key,
                              name:  slug,
                              htmlContent: element.name,
                              textColor: '',
                              background: '',
                            });
      });
      return categorias;
    }
    const configRulette = () => {
        return {
                    centeredIndicator: true,
                    indicatorPosition: "top",
                    size: 420,
                    displayShadow: true,
                    duration: 6,
                    resultVariation: 85,
                    easing: "ease",
                    counterClockwise: true,
                    horizontalContent: false,
                    displayBorder: true,
                    displayIndicator: false,
                    baseDisplay: true,
                    baseSize: 210,
                    baseDisplayShadow: false,
                    baseDisplayIndicator: false,
                    // baseBackground: "",
                    baseBackground: "",
                    baseHtmlContent:
                        "<img class='' src='https://canalonce.mx/REST/data/images/ruleta-flecha-3.png' alt='' srcset=''>",
                };
    }
    const parseoTexto = (cadena) => {
      let txt = String(cadena);
      let textParser = txt.replaceAll(" ", "-");
      textParser = textParser.toLowerCase();
      textParser = eliminarAcentos(textParser);
      return eliminarCaracteres(textParser);
    }
    const eliminarAcentos = (cadena) => {
      var chars = {
        á: "a",
        é: "e",
        í: "i",
        ó: "o",
        ú: "u",
        à: "a",
        è: "e",
        ì: "i",
        ò: "o",
        ù: "u",
        ñ: "n",
        Á: "A",
        É: "E",
        Í: "I",
        Ó: "O",
        Ú: "U",
        À: "A",
        È: "E",
        Ì: "I",
        Ò: "O",
        Ù: "U",
        Ñ: "N",
      };
      var expr = /[áàéèíìóòúùñ]/gi;
      var res = cadena.replace(expr, function (e) {
        return chars[e];
      });
      return res;
    }
    const eliminarCaracteres = (cadena) => {
      var outString = cadena.replace(
        /[`~!¡@#$%^&*()_|+\=¿?;:'",.<>\{\}\[\]\\\/]/gi,
        ""
      );
      return outString;
    }
    const getElementByClass = (element) => {
      return document.querySelector(`.${element}`)
    }
    const backAdmin = () => {
      updateSimple('0', 'ZK0j79ShW7RivQ4b8Pfm');
      router.push("/"); 
    }
    const getDataFirebase = () => {
      onGetTasks((querySnapshot) => {
        let user = getElementByClass(`actual-user`);    
        let action = getElementByClass(`action-user`);    
        let ruleta = getElementByClass(`ruleta-prueba`);  
        let url = window.location.href;  
        let statusUrl = comprobationURL(url);
        // 
        querySnapshot.forEach((doc) => {
          const turnos = doc.data();
          action.value = turnos.status;
          switch (turnos.status) {
            case '1':
              if(getElementByClass(`index`) != null){
                ruleta.click();
              }
              break;
            case '2':
              let s = document.querySelector('body .view-question');
              if(s != null){
                showAnswer();
              }
              break;
            case '3':
              let a = document.querySelector('body .view-question');
              if(a != null){
                backAdmin();
              }
              break;          
            default:
              break;
          }                 
        });
      });
    }
    const comprobationURL = (url) =>{
      let neURL = url.split('/');
      let status = true;
      neURL.forEach(ele => {
        if(ele === 'botones'){
          status = false;
        }
      });
      return status;
    }
    const generateQuestions = () => {
      let questions = jsonPreguntas();
      let categories = generateCategorias();
      var data = [], info = [], html = '', items = '';    
      var i = 0;
      let storage = allStorage();
          categories.forEach(element => {
            if(questions[element] != undefined){
              if(storage.length < 1){
                console.log('menor');
                localStorage.setItem(element, JSON.stringify(questions[element]));                  
              }else{
                console.log('mayor');
              }
            }
          });
      // localStorage.clear();
    }
    const identicationData = (slug) => {
      let data = [], html = "", answer="",  i = 0;    
      let elementQuestion = $('body .section-question .content-question .container-result .data-categorias');
      let elementAnswer = $('body .section-question .content-question .container-result .answer');
      let elementAnswerHidden = $('body #wrapper .content-hidden-answer h3');
      let elementContador = $('body #wrapper .container-contador h2');
      // 
      let response = JSON.parse(localStorage.getItem(slug));
          response.forEach((val, key) => {
              if(key != 0){
                data.push(val)
              }
              if(i === 0){
                html += '<h1 class="" id="question-'+val.id+'">'+val.pregunta+'</h1>'
                answer += '<h1 class="" id="answer-'+val.id+'">'+val.respuesta+'</h1>';  
              }
              i++;
          });
          // 
          elementQuestion.html('');
          elementQuestion.append(html);
          // 
          elementAnswer.html('');
          elementContador.html(data.length);
          elementAnswer.append(answer);
          elementAnswerHidden.html(answer);
          if(data.length == 0){
            alert('Las preguntas se acabaron, procederemos a reiniciarlas en el siguiente tiro.')
            resetQuestion(slug);
          }else{
            updateCategorie(data, slug);
          }
    }
    function resetQuestion(slug) {
      let categories = generateCategorias();
      let questions = jsonPreguntas();
      categories.forEach(element => {
        if(element === slug){
          if(questions[element] != undefined){
            localStorage.setItem(element, JSON.stringify(questions[element]));                  
          }
        }        
      });
    }
    function allStorage() {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        return keys;
    }
    const showAnswer = () => {
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
    const updateCategorie = (data, slug) => {
      localStorage.setItem(slug, JSON.stringify(data)); 
      console.log(slug);
      console.log(JSON.parse(localStorage.getItem(slug)));
    }
    const generateCategorias = () => {
      let data = []
      let categorias = jsonCategoriasPreguntas();
          categorias.forEach(element => {
            let val = element.name.replaceAll('<br>', '-');
                val = parseoTexto(val);
            if(val != 'pierde-un-turno') { 
              data.push(val);
            }
          });
      return data;
    }
    const hidenQuestion = () =>{
      let contentQuestion = $('.container-result .info');
      let answer = $(`.container-result .answer`);
      let question = $(`.container-result .data-categorias`);
      $(contentQuestion).addClass('d-none');
      $(question).removeClass('d-none');
      $(answer).addClass('d-none');
    }
    $("body").on("click", ".btn-girar .girar", function(){
      updateSimple('1', 'ZK0j79ShW7RivQ4b8Pfm');
    });
    $("body").on("click", ".btn-clean-storage .clean", function(){
      localStorage.clear(); 
      console.log(localStorage);         
    });
    $("body").on("click", ".btn-actions", async function(){
        let numero = $(this).attr('data-numero');
        let status = $(this).attr('data-status');
        try {
          await updateTurno(numero, {status: status});
        } catch (error) {
          console.log(error);
        }
    }); 
    // const parser
    return { 
      getItems, 
      configRulette, 
      parseoTexto, 
      showAnswer, 
      getDataFirebase, 
      getElementByClass, 
      updateStatus, 
      updateSimple,
      generateQuestions,
      identicationData,
    }
})
