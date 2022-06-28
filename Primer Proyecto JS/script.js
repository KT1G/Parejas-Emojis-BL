"use strict"



// 1 Crear un arreglo con las 16 "cartas"
// 2 desordenar el arr e imprimirlas en cada casilla


const arr1 = ["😀", "😀", "😎", "😎", "😈", "😈", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", "👻", "👻"];
const arr2 = ["😀", "😀", "😎", "😎", "😈", "😈", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", "👻", "👻", "😍", "😍", "🥶", "🥶"];
const arr3 = ["😀", "😀", "😎", "😎", "😈", "😈", "🤣", "🤣", "😝", "😝", "😖", "😖", "👹", "👹", "👻", "👻", "😍", "😍", "🥶", "🥶", "😭", "😭", "😴", "😴"];

let arr = arr1;
let tries;
let span = document.querySelector("span");
//variables del local storage
let usersPoints = []
let names = []

/* const level1 = 1
const level2 = 2
const level3 = 3 */


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
let nameTitle = document.querySelector(".insert_name");



//Seleccionamos el ranking
const ranking = document.querySelector("ol")


// selecionamos los botones 
const boton1 = document.querySelector(".l1")
const boton2 = document.querySelector(".l2")
const boton3 = document.querySelector(".l3")



//Funcion que segun el boton elige un array de emojis y rediseña la cuadricula y los stilos de los botones
function selectArrayEmojis() {


    if (this.classList.contains("l1")) {
        arr = arr1;
        

        boton1.classList.add("marked");
        boton2.classList.remove("marked");
        boton3.classList.remove("marked");

        boton2.style.cssText ="bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";
        boton3.style.cssText ="bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";

    }
    if (this.classList.contains("l2")) {
        arr = arr2;
        
        
        boton1.classList.remove("marked");
        boton2.classList.add("marked");
        boton3.classList.remove("marked");


        boton1.style.cssText = "bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";
        boton3.style.cssText = "bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";

    }
    if (this.classList.contains("l3")) {
        arr = arr3;
        
        
        boton1.classList.remove("marked");
        boton2.classList.remove("marked");
        boton3.classList.add("marked");


        boton1.style.cssText = "bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";
        boton2.style.cssText = "bacground:linear-gradient (rgb(35, 86, 255), rgb(0, 85, 165))";

    }
    return redesign(arr);
}



//Funcion Rediseño segun nivel
function redesign(array) {
    openCard = 0;
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
    if (cards.length === document.querySelectorAll(".match").length) {
        addUser();
        //seleccionar el class="insert_name" y cambiarlo por una frase con el nombre del usuario y  ¡Has ganado!
        const title = nameTitle.innerHTML;
        nameTitle.innerHTML = `¡Has ganado!`;
        setTimeout(() => {
            nameTitle.innerHTML = title;
        }, 5000);
    }
}



//si hay dos cartas seleccionadas se comprueba si son iguales, si lo son solo se les quita la clase selected y sino se les quita la clase flipped y se le quita la clase selected al cabo de 1 segundo
function compare() {
    const li = document.querySelectorAll("li");
    const arrli = [...li]; // seleccionamos todas las cartas que tengan la clase "selected"
    const selected = arrli.filter((el) => {
        if (el.classList.contains("flipped") && !el.classList.contains("match")) {
            return el;
        }}); // filtramos las cartas que tengan la clase "selected"
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


//Seleccionar los botones del Ranking
const moveRankingLevels = document.querySelectorAll(".moveRankingLevels");
for (const moveRankingLevel of moveRankingLevels) {
    moveRankingLevel.addEventListener("click", changeRankingLevel);
}


//Lista de usuarios y sus puntos.
//Comprobar si existen los arrays de usuarios y puntos en localStorage. si no existen, crearlos y guardarlos en localStorage; si existen, cogerlos de localStorage
let rankingLevel1, rankingLevel2, rankingLevel3;
function getRankingLevelLists() {
    //rankingLevel1
    if (localStorage.getItem("rankingLevel1") === null) {
        rankingLevel1 = [];
        localStorage.setItem("rankingLevel1", JSON.stringify(rankingLevel1));//guardamos el array en localStorage
    } else {
        rankingLevel1 = JSON.parse(localStorage.getItem("rankingLevel1"));//cogemos el array de localStorage
    }

    //rankingLevel2
    if (localStorage.getItem("rankingLevel2") === null) {
        rankingLevel2 = [];
        localStorage.setItem("rankingLevel2", JSON.stringify(rankingLevel2));//guardamos el array en localStorage
    } else {
        rankingLevel2 = JSON.parse(localStorage.getItem("rankingLevel2"));//cogemos el array de localStorage
    }

    //rankingLevel3
    if (localStorage.getItem("rankingLevel3") === null) {
        rankingLevel3 = [];
        localStorage.setItem("rankingLevel3", JSON.stringify(rankingLevel3));//guardamos el array en localStorage
    } else {
        rankingLevel3 = JSON.parse(localStorage.getItem("rankingLevel3"));//cogemos el array de localStorage
    }
    
}
getRankingLevelLists();


//Objeto con el rankingLevel y la lista de usuarios y sus puntos
const object = {
    l1: {
        rankingLevel: "Level 1",
        lista: rankingLevel1
    },
    l2: {
        rankingLevel: "Level 2",
        lista: rankingLevel2
    },
    l3: {
        rankingLevel: "Level 3",
        lista: rankingLevel3
    }
}














//Funcion para añadir un array de usuarios y sus puntos
let gameUser, gameTries;
function addUser() {
    //Comprobar que todas las cartas tengan la clase "match"
    if (cards.length === document.querySelectorAll(".match").length) {
        /* //Conseguir el nombre del usuario
        gameUser = nombre;
        console.log(gameUser); */
        //Conseguir el numero de tries
        gameTries = tries;
        //Comprobar el gameLevel
        if (arr.length === arr1.length) {
            //Coger la lista del localStorage
            rankingLevel1 = JSON.parse(localStorage.getItem("rankingLevel1"));
            //Añadir el usuario y sus puntos a la lista
            checkUser(gameUser, rankingLevel1);
            //Ordenar la lista
            orderArray(rankingLevel1);
            //Guardar la lista en el localStorage
            localStorage.setItem("rankingLevel1", JSON.stringify(rankingLevel1));
            //Mostrar el ranking
            showRanking(object.l1, rankingLevel1, arr1);
        }
        else if (arr.length === arr2.length) {
            //Coger la lista del localStorage
            rankingLevel2 = JSON.parse(localStorage.getItem("rankingLevel2"));
            //Añadir el usuario y sus puntos a la lista
            checkUser(gameUser, rankingLevel2);
            //Ordenar la lista
            orderArray(rankingLevel2);
            //Guardar la lista en el localStorage
            localStorage.setItem("rankingLevel2", JSON.stringify(rankingLevel2));
            showRanking(object.l2, rankingLevel2, arr2);
        }
        else if (arr.length === arr3.length) {
            //Coger la lista del localStorage
            rankingLevel3 = JSON.parse(localStorage.getItem("rankingLevel3"));
            //Añadir el usuario y sus puntos a la lista
            checkUser(gameUser, rankingLevel3);
            //Ordenar la lista
            orderArray(rankingLevel3);
            //Guardar la lista en el localStorage
            localStorage.setItem("rankingLevel3", JSON.stringify(rankingLevel3));
            showRanking(object.l3, rankingLevel3, arr3);
        }
    }
    else {
        alert("No has terminado el juego");
    }
}

//Funcion para comprobar si el usuario esta en la lista
function checkUser(user, array) {
    if (array.length === 0) {
        array.push([user, gameTries]);
    }
    else {
        //Comprobar si el usuario esta en la lista
        for (let i = 0; i < array.length; i++) {
            if (array[i][0] === user) {
                //Si esta en la lista actualizar el numero de tries al mas bajo
                console.log("El usuario esta en la lista");
                if (array[i][1] > gameTries) {
                    array[i][1] = gameTries;
                }
                return;
            }
        }
        //Si no esta en la lista añadir el usuario y sus puntos
        array.push([user, gameTries]);
    }
}

//Ordenar la lista de usuarios y sus puntos de menor a mayor
function orderArray(array) {
    array.sort((a, b) => a[1] - b[1]);
}

//Mostrar el Ranking, por defecto el rankingLevel1
function showRanking(property, arrayList, arrayIcons) {
    let ranking = property.rankingLevel;//declaro variable ranking, su valor es igual al de la clave rankingLevel del objeto l1
    document.querySelector("h3").innerHTML = ranking;//meter el valor de ranking en el h3 de DOM
    const fragment = document.createDocumentFragment();//crear un fragment
    const ol = document.querySelector("ol");//crear una variable  para seleccionar la ol
    ol.innerHTML = "";//limpiar la ol
    //recorrer el array y crear un li para cada elemento 
    for (let i = 0; i < 5; i++) {
        const li = document.createElement("li");        //Creo un li
        li.classList.add("person");                     //Añado la class "person"
        if (arrayList[i]){
            li.innerHTML = `${arrayList[i][0]} - ${arrayList[i][1]}`;//meto en el li el valor de cada elemento del array
        }
        else {
            li.innerHTML = "Vacio";
        }

        //Comprobar si el usuario hizo todas las parejas en el menor numero de intentos posible
        if (arrayList[i] && arrayList[i][1] === arrayIcons.length / 2) {
            li.innerHTML += ' "PLENO"';
            li.classList.add("perfect");
        }
        fragment.append(li);                            //Añado el li al fragment
    }
    ol.append(fragment);                                //Añado el fragment al ol
}
showRanking(object.l1, rankingLevel1, arr1);

//Funcion para mostrar cada ranking segun el nivel seleccionado
let level = "l1";
function changeRankingLevel() {
    if (this.classList.contains("right")) {
        if (level === "l1") {
            level = "l2";
            showRanking(object.l2, rankingLevel2, arr2);
        }
        else if (level === "l2") {
            level = "l3";
            showRanking(object.l3, rankingLevel3, arr3);
        }
    }
    else if (this.classList.contains("left")) {
        if (level === "l3") {
            level = "l2";
            showRanking(object.l2, rankingLevel2, arr2);
        }
        else if (level === "l2") {
            level = "l1";
            showRanking(object.l1, rankingLevel1, arr1);
        }
    }
}

//BOTONES DEL FOOTER
//Boton barajar de nuevo y reiniciar el juego
const button = document.querySelector(".reset");
button.addEventListener("click", reset);
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


//Volver a introducir el nombre del usuario en el input
const changePlayer = document.querySelector(".changePlayer");
changePlayer.addEventListener("click", changePlayerName);
function changePlayerName() {
    gameUser = prompt("Introduce tu nombre").toUpperCase();
    //cambiar el nombre del usuario en el input
    document.querySelector("input").value = gameUser;
    printNameTitle(gameUser);
    reset();
}



// EXPORTAR A OTRO ARCHIVO JS

//funcion para cambiar el nombre del usuario en el input y guardarlo en gameUser




// Funcion para colocar el nombre del jugador en el titulo del juego
function printNameTitle(nombre) {
    nameTitle.textContent = `Find The Partners ${nombre}`;
}


//Funcion con ey down que controla el inicio del juego y nos guarda el nombre en un localStorage

document.addEventListener("keydown", (e) => {
    console.log(e);
    gameUser = input.value.toUpperCase();
    
    printNameTitle(gameUser);
    
    // Posibles validaciones
    if (isNaN(gameUser) && gameUser.length <= 6) {
        
        if (e.code === "Enter" && gameUser) {
            header.classList.add("form_hide")
            main.classList.remove("main_hide")
        } 
    }

});

