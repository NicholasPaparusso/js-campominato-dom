/*
**Consegna**
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
****L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
**BONUS:**
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


*/

// dichiaro gli elementi del DOM

const btn = document.querySelector('.btn');
const main = document.querySelector('.main-wrapper');

// dichiaro le variabili globali
let diff;
let score = 0;
const BOMBSNUMBER = 16;
let bombs = [];



//eventListner al bottone di avvio
btn.addEventListener('click', function(){
  
  init();
})

// creo le funzioni
// creo una funziona che inizializza tutte le altre
function init(){
  createGrid();
  createSquare(diff,grid)
}

//Funzione genero il container della griglia dinamicamente
function createGrid(){
  const grid = document.createElement('div');
  grid.className ='grid-container';
  main.appendChild(grid);
  return grid;
}

var createdGrid = createGrid;

//Funzione Genero i quadrati in base alla difficoltà selezionata 
function createSquare(difficult, grid){
  diff = document.getElementById('diff').value;
  if(diff === "diff-1"){
    diff = Math.pow(10,2);
  }else if(diff === "diff-2"){
    diff =Math.pow(9,2);
  }else{
    diff = Math.pow(7,2);
  }
  for (let i = 0; i < difficult ; i++){
    let square = document.createElement('div')
    square.classList.add('square');
    square.innerHTML = [i+1];
    grid.append(square);
    square.style.width = squareSize();
    square.style.height = squareSize();
    square.addEventListener('click', thisCell)
  }
}

//Funzione per calcolare la grandezza dei quadrati
function squareSize(){
  return `calc(100% / ${ Math.sqrt(diff)})`;
}

//Funzione per Colorare le celle al click e restituire un valore numerico
function thisCell(){
  this.classList.add('blue');
  console.log(this.innerHTML)
}



