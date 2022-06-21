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

    if (!this.classList.contains("match")) {


        if (openCard < 2 && !this.classList.contains("flipped")) {
            this.classList.add("flipped");

            openCard++;
            compare();
        }

    }
}


//si hay dos cartas seleccionadas se comprueba si son iguales, si lo son solo se les quita la clase selected y sino se les quita la clase flipped y se le quita la clase selected al cabo de 1 segundo
function compare() {

    const li = document.querySelectorAll("li");
    const arrli = [...li]; // seleccionamos todas las cartas que tengan la clase "selected"

    const selected = arrli.filter((el) => {
        if (el.classList.contains("flipped") && !el.classList.contains("match")) {
            return el;
        }
    }); // filtramos las cartas que tengan la clase "selected"

    const card1 = selected[0]; // seleccionamos la primera carta
    const card2 = selected[1]; // seleccionamos la segunda carta
    if (selected.length === 2) {
        tries++;
        span.innerHTML = tries;
        // comprobamos que haya dos cartas seleccionadas

        if (card1.textContent === card2.textContent) {
            // comprobamos que las dos cartas seleccionadas sean iguales
            card1.classList.add("match"); // si son iguales las ponemos como pareja
            card2.classList.add("match");

            setTimeout(() => {
                card1.classList.add("point");
                card2.classList.add("point");
            }, 200);

            openCard = 0;


        } else {
            // si no son iguales, las volvemos a cerrar

            if (
                !card1.classList.contains("match") &&
                !card2.classList.contains("match")
            ) {
                setTimeout(() => {
                    card1.classList.add("shaking")
                    card2.classList.add("shaking")
                }, 260)

                setTimeout(() => {
                    card1.classList.remove("flipped", "shaking");
                    card2.classList.remove("flipped", "shaking");
                    openCard = 0;
                }, 1000);
            } else {

                setTimeout(() => {
                    card1.classList.remove("point");
                    card2.classList.remove("point");
                    openCard = 0;
                }, 2000);


            }
        }
    }
}

//Boton barajar de nuevo y reiniciar el juego
const button = document.querySelector(".reset");
button.addEventListener("click", () => {
    tries = 0;
    span.innerHTML = tries;
    for (const card of cards) {
        card.className = "card";
    }
    setTimeout(() => {
        barajar();
    }, 500);
});