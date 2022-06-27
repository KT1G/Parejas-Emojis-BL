"use strict"



// 1 Crear un arreglo con las 16 "cartas"
// 2 desordenar el arr e imprimirlas en cada casilla


const arr1 = ["😀", "😀", "😎", "😎", "😈 ", "😈 ", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", " 👻 ", " 👻 "];
const arr2 = ["😀", "😀", "😎", "😎", "😈 ", "😈 ", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", " 👻 ", " 👻 ", "😍", "😍", "🥶", "🥶"];
const arr3 = ["😀", "😀", "😎", "😎", "😈 ", "😈 ", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", " 👻 ", " 👻 ", "😍", "😍", "🥶", "🥶", "😭", "😭", "😴", "😴"];

let arr = arr1;
let tries;
let span = document.querySelector("span");
//variables del local storage
let usersPoints = []
let names = []

const level1 = 1
const level2 = 2
const level3 = 3


//Numero de intentos
function attempts() {
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

//Seleccionar los botones del Nivel
const levels = document.querySelectorAll(".levels");
for (const level of levels) {
    level.addEventListener("click", selectArrayEmojis);
}


//seleccionamos el main 
const main = document.querySelector("main")

//seleccionamos el inpunt del header
const input = document.querySelector("input")

//seleccionamos el header 
const header = document.querySelector("header")

//seleccionamos el "h2 del Game"
const nameTitle = document.querySelector(".insert_name");

//Seleccionamos el ranking
const ranking = document.querySelector("ol")


// selecionamos los botones 
const boton1 = document.querySelector(".l1")
const boton2 = document.querySelector(".l2")
const boton3 = document.querySelector(".l3")



//Funcion que segun el boton elige un array de emojis y rediseña la cuadricula y los stilos de los botones
function selectArrayEmojis() {

    boton1.classList.add("l1");

    if (this.classList.contains("l1")) {
        arr = arr1;
        // igualando los tries y las openCard a 0, impedimos que al pulsar una sola carta y cambiar de nivel se bloqué el juego
        reset()

        boton2.style.cssText ="bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";
        boton3.style.cssText ="bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";

        ranking.innerHTML = `<h2>RANKING</h2>`;
        printRanking(ordenarRanking(level1));
    }
    if (this.classList.contains("l2")) {
        arr = arr2;
        // igualando los tries y las openCard a 0  impedimos que al pulsar una sola carta y cambiar de nivel se bloqué el juego
        reset()

        boton1.classList.remove("l1")

        boton1.style.cssText = "bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";
        boton3.style.cssText = "bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";

        this.style.background = "#FFFFFF";
        this.style.color = "black";

        ranking.innerHTML = `<h2>RANKING</h2>`;
        printRanking(ordenarRanking(level2));

    }
    if (this.classList.contains("l3")) {
        arr = arr3;
        // igualando los tries y las openCard a 0  impedimos que al pulsar una sola carta y cambiar de nivel se bloqué el juego
        reset()

        boton1.classList.remove("l1");

        boton1.style.cssText =
            "bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";
        boton2.style.cssText =
            "bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";

        this.style.background = "#FFFFFF";
        this.style.color = "black";

        ranking.innerHTML = `<h2>RANKING</h2>`;
        printRanking(ordenarRanking(level3));
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
        const li = document.createElement("li"); //Creo li con class="card"
        li.classList.add("card");
        //Meto codigo html en el li
        li.innerHTML = `<div class="content">
                            <div class="front">❔</div>
                            <div class="back"></div>
                        </div>`;
        fragment.append(li); //Añado el li al fragment
    }
    ul.append(fragment); //Añado el fragment al ul
    cards = document.querySelectorAll(".card") //Selecciono todos los li .card
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
function selectFlip() {
    for (const card of cards) {
        card.addEventListener("click", flipCard);
    }
}
selectFlip();


//Al hacer click se llama a la funcion flipCard, se añade la clase flipped
//Solo puede haber 2 cartas seleccionadas
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
    const arrli = [...li];

    const selected = arrli.filter((el) => {
        if (el.classList.contains("flipped") && !el.classList.contains("match")) {
            return el;
        }
    }); // filtramos las cartas que tengan la clase "flipped"

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
            // si no son iguales, las volvemos a cerrar y aplicamos efectos
            shaking(card1, card2)

        }

    }
    addPoints()

}


function shaking(card1, card2) {

    if (
        !card1.classList.contains("match") &&
        !card2.classList.contains("match")
    ) {
        setTimeout(() => {
            card1.classList.add("shaking");
            card2.classList.add("shaking");
        }, 260);

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

//Boton barajar de nuevo y reiniciar el juego
const button = document.querySelector(".reset");
button.addEventListener("click", reset);;

function reset() {
    tries = 0;
    openCard = 0;
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

//Funcion que controla el inicio del juego y nos guarda el nombre en un localStorage junto con un nuevo usuario el cual tiene el nombre introducido mas los puntos segun el nivel seleccionado


document.addEventListener("keydown", (e) => {

    let name = input.value.toUpperCase()

    printNameTitle(name);

    // Posibles validaciones
    if (isNaN(name) && name.length <= 6) {

        if (e.code === "Enter" && name) {

            if (!JSON.parse(localStorage.getItem("names"))) {

                localStorage.setItem("names", JSON.stringify(names));
            }
            if (!JSON.parse(localStorage.getItem("users"))) {
                localStorage.setItem("users", JSON.stringify(usersPoints));
            }

            names = JSON.parse(localStorage.getItem("names"));
            usersPoints = JSON.parse(localStorage.getItem("users"));

            if (!names.includes(name)) {
                names.push(name)
                usersPoints.push({
                    user: name,
                    points: [{
                            scoreLevel1: 0,
                        },
                        {
                            scoreLevel2: 0,
                        },
                        {
                            scoreLevel3: 0,
                        },
                    ],
                })

            }

            localStorage.setItem("users", JSON.stringify(usersPoints));
            localStorage.setItem("names", JSON.stringify(names));
            header.classList.add("form_hide")
            main.classList.remove("main_hide")

            if (ranking.classList.contains("l1")) {
                printRanking(ordenarRanking(level1));
                ranking.classList.remove("l1")
            }

        }
    }

});

//funcion para guardar en el local Storage los puntos segun el nivel (llamada linea 189)
function addPoints() {

    const li = document.querySelectorAll("li");
    const arrli = [...li];

    const matches = arrli.filter((el) => {
        if (el.classList.contains("match")) {
            return el;
        }
    });

    if (matches.length === 16 || matches.length === 20 || matches.length === 24) {

        let name = input.value.toUpperCase();
        usersPoints = JSON.parse(localStorage.getItem("users"));
        const player = usersPoints.find((n) => n.user === name);
        const playerScoreLevel1 = player.points[0].scoreLevel1;
        const playerSoreLevel2 = player.points[1].scoreLevel2
        const playerSoreLevel3 = player.points[2].scoreLevel3;

        if (playerScoreLevel1 > tries || playerScoreLevel1 === 0) {
            if (cards.length === 16) {

                player.points[0] = {
                    scoreLevel1: tries,
                };
            }
        }
        if (playerSoreLevel2 > tries || playerSoreLevel2 === 0) {
            if (cards.length === 20) {

                player.points[1] = {
                    scoreLevel2: tries,
                };
            }
        }
        if (playerSoreLevel3 > tries || playerSoreLevel3 === 0) {
            if (cards.length === 20) {

                player.points[2] = {
                    scoreLevel3: tries,
                };
            }
        }
        localStorage.setItem("users", JSON.stringify(usersPoints));


        console.log(tries)
    }

}





function ordenarRanking(nivel) {
    usersPoints = JSON.parse(localStorage.getItem("users"));

    if (nivel === level1) {

        const rankLevel1 = usersPoints
            .map((p) => ({
                user: p.user,
                points: p.points[0].scoreLevel1,
            }))
            .sort((a, b) => a.points - b.points);

        return rankLevel1

    } else if (nivel === level2) {
        const rankLevel2 = usersPoints
            .map((p) => ({
                user: p.user,
                points: p.points[1].scoreLevel2,
            }))
            .sort((a, b) => b.points - a.points);

        return rankLevel2;

    } else if (nivel === level3) {
        const rankLevel3 = usersPoints
            .map((p) => ({
                user: p.user,
                points: p.points[2].scoreLevel3,
            }))
            .sort((a, b) => b.points - a.points);

        return rankLevel3;


    }



}


function printRanking(rank) {
    console.log(rank)

    const fragment = document.createDocumentFragment();
    for (const el of rank) {

        if (el.points !== 0) {
            const li = document.createElement("li");
            li.innerHTML = `${el.user} : ${el.points} Tries `;
            fragment.append(li);
        }
    }
    ranking.append(fragment);

}






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