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
const router = useRouter();

export const useRuleta = defineStore('useRuleta', () => {
    const getItems = () => {
        return [
            { id: 1, name: "politecnicos_destacados", htmlContent: "Politécnicos <br> Destacados", textColor: "", background: "", },
            { id: 2, name: "doble_turno", htmlContent: "Doble <br> turno", textColor: "", background: "", },
            { id: 3, name: "creaciones_politecnicas", htmlContent: "Creaciones <br> Politécnicas", textColor: "'#fff'", background: "#af03ff", },
            { id: 4, name: "instituciones_ipn", htmlContent: "Instituciones del <br> IPN", textColor: "", background: "", },
            { id: 5, name: "turno_sorpresa", htmlContent: "Turno <br> sorpresa", textColor: "", background: "", },
            { id: 6, name: "pierde_turno", htmlContent: "Pierde un <br> turno", textColor: "", background: "", },
        ];
    }
    const configRulette = () => {
        return {
                    centeredIndicator: true,
                    indicatorPosition: "top",
                    size: 550,
                    displayShadow: true,
                    duration: 6,
                    resultVariation: 90,
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
    const showAnswer = () => {
      let elements = document.querySelectorAll('.container-result .info');
      let answer = getElementByClass(`answer`);
      let question = getElementByClass(`container-result .question`);
      elements.forEach(ele => {        
          ele.classList.add('d-none');
      });
      if(answer.dataset.status == 1 ){
          answer.dataset.status = 0;        
          answer.classList.remove('d-none');
      }else{
          answer.dataset.status = 1;        
          question.classList.remove('d-none');
      }
      setTimeout(updateSimple('0', 'ZK0j79ShW7RivQ4b8Pfm') , 1000);
    }
    const getElementByClass = (element) => {
      return document.querySelector(`.${element}`)
    }
    const backAdmin = () => {
      let backHome = getElementByClass(`back-home`);   
      updateSimple('0', 'ZK0j79ShW7RivQ4b8Pfm');
      backHome.click();
      console.log(); 
      // cl
      // if(!backHome){
      // }
    }
    const getDataFirebase = () => {
      onGetTasks((querySnapshot) => {
        let action = getElementByClass(`action-user`);    
        let ruleta = getElementByClass(`ruleta-prueba`);    
        
        // hamburger.addEventListener("click", change);
        querySnapshot.forEach((doc) => {
          const turnos = doc.data();
          action.value = turnos.status;
          switch (turnos.status) {
            case '1':
              ruleta.click();
            case '2':
                showAnswer();
              break;
            case '3':
                backAdmin();
              break;          
            default:
              break;
          }                 
        });
      });
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
    // const parser
    return { getItems, configRulette, parseoTexto, showAnswer, getDataFirebase, getElementByClass, updateStatus, updateSimple }
})
