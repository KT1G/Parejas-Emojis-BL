"use strict"

// 1 Crear un arreglo con las 16 "cartas"
// 2 desordenar el arr e imprimirlas en cada casilla

const arr = ["😀", "😀", "😎", "😎", "😈 ", "😈 ", 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const nums = arr.sort(() => Math.random() - 0.5); // desordenamos el array
console.log("🚀 ~ file: script.js ~ line 8 ~ nums", nums)
const li = document.querySelectorAll("li");
const span = document.querySelector("span")


let openCard = 0
let tries = 0




li.forEach(el => {  // recorremos todas las cartas
    el.addEventListener("click", printNum)

});

function printNum(e) { // funcion que imprime el numero de la carta

    const  liSelected = e.target
    const numPrint = nums[liSelected.id]; // seleccionamos el numero de la carta seleccionada

    if (!liSelected.classList.contains("match")) { // comprobamos que no haya ninguna pareja que coincida.
        if (openCard < 2 && !liSelected.classList.contains("selected")) {// comprobamos que el numero de tarjetas destapadas sea menor a 2 y que no este ninguna seleccionada

            liSelected.classList.add("selected"); // le añadimos la clase "selected" para marcarcarla como seleccionada
            liSelected.innerHTML = numPrint;  // Pintamos del array uno de los 16 numero que coindida con el id de la carta seleccionada (AQUI VAN A IR LAS IMAGENES)
            openCard++; // aumentamos el numero de tarjetas destapadas
        }
    }
    console.log(openCard)

    validateCard();
  

}


function validateCard() { // funcion que valida si hay una pareja de cartas

    const selected = document.querySelectorAll(".selected") // seleccionamos todas las cartas que tengan la clase "selected"
    const card1 = selected[0]; // seleccionamos la primera carta
    const card2 = selected[1]; // seleccionamos la segunda carta

    if (selected.length === 2) { // comprobamos que haya dos cartas seleccionadas
        

        if (card1.textContent === card2.textContent) { // comprobamos que las dos cartas seleccionadas sean iguales
            card1.classList.replace("selected", "match"); // si son iguales las ponemos como pareja
            card2.classList.replace("selected", "match"); 
            openCard = 0;
        }
        else { // si no son iguales, las volvemos a cerrar
            
            tries++
            span.innerHTML = tries;
            setTimeout(() => {
                card1.innerHTML = " "
                card2.innerHTML = " "
                card1.classList.remove("selected") 
                card2.classList.remove("selected")
                openCard = 0
            },1000)
            
        }
    }

}




