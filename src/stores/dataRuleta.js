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
  apiKey: "AIzaSyDfwhQxayx6NsxEkU29MFLOwdTR5KRSF9k",
  authDomain: "ruletacachi.firebaseapp.com",
  projectId: "ruletacachi",
  storageBucket: "ruletacachi.appspot.com",
  messagingSenderId: "75302928452",
  appId: "1:75302928452:web:d2e4e51e32ec392aaa3c11",
  measurementId: "G-8R9HTST71G"
};
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
          url: 'https://canalonce.mx/REST/data/mdb/ruleta_temas.json?cache='+$.now(), 
          async: false
      });
      return data.responseJSON;
    }
    function jsonPreguntas(){       
      var data = $.ajax({ 
          url: 'https://canalonce.mx/REST/data/mdb/ruleta_preguntas.json?cache='+$.now(), 
          async: false
      });
      return data.responseJSON;
    }
    const updateStatus = () => {
      const actualizarTurno = document.querySelectorAll(".btn-actions");      
            actualizarTurno.forEach((btn) =>
              btn.addEventListener("click", async ({ target: { dataset } }) => {
                try {
                  await updateTurno(dataset.numero, {status: dataset.status});
                } catch (error) {
                  console.log(error);
                }
              })
            );
    }
    const updateSimple = async(val, numero) => {
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
                    size: 550,
                    displayShadow: true,
                    duration: 6,
                    resultVariation: 9,
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
                console.log('as');
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
      let content = document.createElement('div');
          categories.forEach(element => {
            if(questions[element] != undefined){
              localStorage.setItem(element, JSON.stringify(questions[element]));                  
            }
          });
    }
    const identicationData = (slug) => {
      let data = [], html = "", answer="",  i = 0;    
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
      $('.container-result .data-categorias').append(html);
      $('.container-result .answer').append(answer);
      updateCategorie(data, slug);
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
    /**
      * @description Funcion que elimina los registros duplicados de un array
      * @param originalArray Contiene el array principal
      * @param prop Nombre de la seccion del array que se quiere eliminar el duplicado
      * @return {newArray} Retorna un array sin elementos repetidos
    */ 
    function removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject  = {};  
      for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
      }
      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
      return newArray;
    }
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
