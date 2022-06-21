"use strict"

// 1 Crear un arreglo con las 16 "cartas"
// 2 desordenar el arr e imprimirlas en cada casilla

const arr = ["😀", "😀", "😎", "😎", "😈 ", "😈 ", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", " 👻 ", " 👻 "];

//Numero de intentos
const span = document.querySelector("span");
let tries = 0;
span.innerHTML = tries;

//Seleccionar todas las cartas
const cards = document.querySelectorAll(".card");
let openCard = 0;

//Seleccionar todos los dorsos
const back = document.querySelectorAll(".back");

//Desodenar arr e introducir el valor de cada posicion en cada div de class back
function barajar() {
    const nums = arr.sort(() => Math.random() - 0.5);
    for (let i = 0; i < nums.length; i++) {
        back[i].innerHTML = nums[i];
    }
}
barajar();


//Seleccionar los li .card y añadirles un evento click
for (const card of cards) {
    card.addEventListener("click", flipCard);
}


//Al hacer click se llama a la funcion flipCard, se añade la clase flipped y la clase selected. Solo puede haber 2 cartas seleccionadas
function flipCard() {
    if (openCard < 2) {
        this.classList.add("flipped");
        this.classList.add("selected");
        openCard++;
    }
    compare();
}


//si hay dos cartas seleccionadas se comprueba si son iguales, si lo son solo se les quita la clase selected y sino se les quita la clase flipped y se le quita la clase selected al cabo de 1 segundo
function compare() {
    const selected = document.querySelectorAll(".selected");
    if (selected.length === 2) {
        tries++;
        span.innerHTML = tries;
        if (selected[0].innerHTML === selected[1].innerHTML) {
            selected[0].classList.replace("selected", "matched");
            selected[1].classList.replace("selected", "matched");
            openCard = 0;
        }
        else {
            setTimeout(() => {
            selected[0].className = "card";
            selected[1].className = "card";
            openCard = 0;
            }, 1000);
        }
    }
}

//Boton barajar de nuevo y reiniciar el juego
const button = document.querySelector("button");
button.addEventListener("click", () => {
    tries = 0;
    span.innerHTML = tries;
    for (const card of cards) {
        card.className = "card";
    }
    setTimeout(() => {barajar();}, 2000);
});