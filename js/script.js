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
const BOMBSNUMBER = 3;
const level = ['100','81','49']
let bombs = [];
let levelCell = document.getElementById('diff').value;
let endgame = false;
let msg;

//eventListner al bottone di avvio
btn.addEventListener('click', function(){
  init();
})

//Funzione che iniziallizza il gioco
function init(){
  createGrid(levelCell);
  bombs = generateBombs(levelCell);
  console.log(bombs);
}

// Funzione per creare la griglia 
function createGrid(cellNumbers){
  let grid = document.createElement('div')
  grid.classList.add('grid-container');
  for(let i = 0; i < cellNumbers; i++){
   const cell = generateCell(levelCell,i+1);
    grid.append(cell);
  }
  main.appendChild(grid); 
  
}



// Funzione per assegnare ID e contenuto alle celle + eventlistener al click
function generateCell(cellNumbers , cellId){
  let cell = document.createElement('div');
  cell.className='square';
  cell.classList.add(`cell-${cellNumbers}`);
  cell.cellId = cellId ;
  cell.innerHTML = `<small>${cellId}</small>`
  cell.addEventListener('click', selectedCell);

  return cell;
} 


// Funzione per randomizzare i numeri
function randomBombsnum(min , max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Funzione per creare randomicamente le bombe all'interno della griglia 
function generateBombs(cellNumbers){
  const generatedBombs = [];
  while(generatedBombs.length < BOMBSNUMBER){
  const bomb = randomBombsnum(1,cellNumbers);
  if(!generatedBombs.includes(bomb)){
    generatedBombs.push(bomb);
    }
  }
  return generatedBombs;
}
 

function selectedCell(  ){
  if (!bombs.includes(this.cellId)){
    this.classList.add('no-bomb');
    score++;
    const cells = document.getElementsByClassName('square');
    console.log(cells);
    if(score === cells.length - BOMBSNUMBER);{
      let msg = document.createElement('span');
      msg.innerHTML ="Hai vinto !!!  "
      main.append(msg);
      endgame = true;

    }
  }else{
    this.classList.add('bomb');
    endgame = true;
  }
}


