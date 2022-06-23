"use strict"



// 1 Crear un arreglo con las 16 "cartas"
// 2 desordenar el arr e imprimirlas en cada casilla


const arr1 = ["😀", "😀", "😎", "😎", "😈 ", "😈 ", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", " 👻 ", " 👻 "];
const arr2 = ["😀", "😀", "😎", "😎", "😈 ", "😈 ", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", " 👻 ", " 👻 ", "😍", "😍", "🥶", "🥶"];
const arr3 = ["😀", "😀", "😎", "😎", "😈 ", "😈 ", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", " 👻 ", " 👻 ", "😍", "😍", "🥶", "🥶", "😭", "😭", "😴", "😴"];

let arr = arr1;
let tries;
let span = document.querySelector("span");

//Numero de intentos
function attempts(){
    span = document.querySelector("span");
    tries = 0;
    span.innerHTML = tries;
}
attempts();

//Seleccionar todas las cartas
let cards = document.querySelectorAll(".card");

//Cartas abiertas
let openCard = 0;

//Seleccionar la ul
const ul = document.querySelector(".game");

//Seleccionar todos los dorsos
let back = document.querySelectorAll(".back");

//Seleccionar el Nivel
const levels = document.querySelectorAll(".levels");
for (const level of levels) {
    level.addEventListener("click", selectArrayEmojis);
}

//seleccionamos el buton del form
const butonInput = document.querySelector(".buton_input")

//seleccionamos el main 
const main = document.querySelector("main")

//seleccionamos el inpunt del header

const input = document.querySelector("input")

//seleccionamos el header 
const header = document.querySelector("header")

//seleccionamos el "h2 del Game"
const nameTitle = document.querySelector(".insert_name");

//Funcion que segun el boton elige un array de emojis y rediseña la cuadricula
function selectArrayEmojis() {
    if (this.classList.contains("l1")) {
        arr = arr1;
    }
    if (this.classList.contains("l2")) {
        arr = arr2;
    }
    if (this.classList.contains("l3")) {
        arr = arr3;
    }
    return redesign(arr);
}

//Funcion Rediseño segun nivel
function redesign(array) {
    const column = array.length / 4;
    ul.innerHTML = "";
    ul.removeAttribute("style");
    ul.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
    create(array);
    back = document.querySelectorAll(".back");
    shuffle(array);
    cards = document.querySelectorAll(".card");
    selectFlip();
    attempts();
    compare();
}


//Crear las cartas
function create(array) {
    const fragment = document.createDocumentFragment();
    for (const el of array) {
        const li = document.createElement("li");        //Creo li con class="card"
        li.classList.add("card");

        li.innerHTML = `<div class="content">
                            <div class="front">❔</div>
                            <div class="back"></div>
                        </div>`;
        fragment.append(li)
    }
    ul.append(fragment);
    cards = document.querySelectorAll(".card")
}
create(arr);


//Desodenar arr e introducir el valor de cada posicion en cada div de class back
function shuffle(array) {
    back = document.querySelectorAll(".back");
    const nums = array.sort(() => Math.random() - 0.5);
    for (let i = 0; i < nums.length; i++) {
        back[i].innerHTML = nums[i];
    }
    console.log(nums);
}


//Seleccionar los li .card y añadirles un evento click
function selectFlip(){
    for (const card of cards) {
        card.addEventListener("click", flipCard);
    }
}
selectFlip();


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
button.addEventListener("click", reset);
function reset() {
    tries = 0;
    span.innerHTML = tries;
    for (const card of cards) {
        card.className = "card";
    }
    setTimeout(() => {
        shuffle(arr);
    }, 500);
}
reset();

// EXPORTAR A OTRO ARCHIVO JS



// Funcion para colocar el nombre del jugador en el titulo del juego
function printNameTitle(name) {

 nameTitle.textContent = `Find The Partners ${name}`;
    
}


//Funcion que controla el inicio del juego y nos guarda el nombre en un localStorage
document.addEventListener("keydown", (e) => {
    console.log(e);
    let name = input.value.toUpperCase()
    let names = []
    
    printNameTitle(name);
    
    // Posibles validaciones
    if (isNaN(name) && name.length <= 6) {
        
        if (e.code === "Enter" && name) {
    
            
            if (!JSON.parse(localStorage.getItem("names"))) {
                
                localStorage.setItem("names", JSON.stringify(names));
            }
            
            names = JSON.parse(localStorage.getItem("names"));
            
            if (!names.includes(name)) {
                names.push(name)
            }
    
            localStorage.setItem("names", JSON.stringify(names));
    
            
            header.classList.add("form_hide")
            main.classList.remove("main_hide")
    
        }
    }
        
    });

    // EN CASO DE QUERER HACERLO PULSANDO UN BOTON
    /* 
    butonInput.addEventListener("click", () => {

        let names = []
        let name = input.value
        
        if (!JSON.parse(localStorage.getItem("names"))) {

        localStorage.setItem("names", JSON.stringify(names));
    }

    names = JSON.parse(localStorage.getItem("names"));

    if (!names.includes(name)) {
        names.push(name)
    }

    localStorage.setItem("names", JSON.stringify(names));



    header.classList.add("form_hide");
    main.classList.remove("main_hide");

}); */