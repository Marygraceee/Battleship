/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-alert */

let gridOneBlocks = Array.from(document.querySelectorAll('.block'));
let gridTwoBlocks = Array.from(document.querySelectorAll('.blocktwo'));
let activePlayerShips = [];
let activeComputerShips = [];
const narrator = document.getElementById('narrator');
let allower = 1;
let startingNumber = 49;
const resetBtn = document.getElementById('resetBtn');

function countYourShips() {
  gridOneBlocks.forEach((block) => {
    if (block.classList.contains('shipon')) {
      activePlayerShips.push(block);
    }
  });
}

function randomEnemyShipPlacement() {
  const theRandomNumber = Math.floor(Math.random() * 49) + 1;
  if (gridTwoBlocks[(theRandomNumber - 1)].className === 'blocktwo') {
    gridTwoBlocks[(theRandomNumber - 1)].className = 'blocktwo shipon';
    activeComputerShips.push(gridTwoBlocks[(theRandomNumber - 1)]);
  } else if ((gridTwoBlocks[(theRandomNumber - 1)].className === 'blocktwo shipon')) {
    gridTwoBlocks[(theRandomNumber)].className = 'blocktwo shipon';
    activeComputerShips.push(gridTwoBlocks[(theRandomNumber)]);
  }
}

function computerHitsPlayer() {
  const theRandomNumber = Math.floor(Math.random() * `${startingNumber}`) + 1;
  const selectedGridBlock = gridOneBlocks[(theRandomNumber - 1)];
  if (selectedGridBlock.className === 'block') {
    selectedGridBlock.className = 'block hitnoship';
    const filteredItems = gridOneBlocks.filter((block) => block.className === 'block' || block.className === 'block shipon');
    gridOneBlocks = filteredItems;

    startingNumber -= 1;
  } else if (selectedGridBlock.className === 'block shipon') {
    selectedGridBlock.className = 'block shipon hityesship';
    const filteredItems = gridOneBlocks.filter((block) => block.className === 'block' || block.className === 'block shipon');
    gridOneBlocks = filteredItems;

    startingNumber -= 1;
  }
}

function hitEnemyGrid() {
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('shipon') && e.target.classList.contains('blocktwo') && (!e.target.classList.contains('hitnoship') && !e.target.classList.contains('hityesship'))) {
      const gridtwomisshit = e.target;
      gridtwomisshit.className = 'blocktwo hitnoship';
      checkRemainingShips();
      setTimeout(() => {
        computerHitsPlayer();
        checkRemainingShips();
      }, 1000);
    } else if (e.target.classList.contains('shipon') && e.target.classList.contains('blocktwo') && (!e.target.classList.contains('hitnoship') && !e.target.classList.contains('hityesship'))) {
      const gridtwosuccesshit = e.target;
      gridtwosuccesshit.className = 'blocktwo shipon hityesship';
      checkRemainingShips();
      setTimeout(() => {
        computerHitsPlayer();
        checkRemainingShips();
      }, 1000);
    }
  });
}

function placeYourShips() {
  narrator.textContent = 'Place 10 ships the way you like!';
  document.addEventListener('click', (e) => {
    if (activePlayerShips.length < 10) {
      activePlayerShips = [];
      if (e.target.className === 'block') {
        const playerGrid = e.target;
        playerGrid.className = 'block shipon';
        randomEnemyShipPlacement();
      } else if (e.target.className === 'block shipon') {
        alert('You cannot place a ship where there is already a ship');
      }
      countYourShips();
    }

    if (activePlayerShips.length === 10 && e.target.classList.contains('block')) {
      alert("You can't place any more ships");
      narrator.textContent = 'All the ships have been placed, attack the other grid!';
    }
    if (activePlayerShips.length === 10 && allower === 1) {
      hitEnemyGrid();
      allower = 0;
    }
  });
}

function checkRemainingShips() {
  const filteredPlayerShips = activePlayerShips.filter((ship) => ship.className === 'block shipon');
  const filteredComputerShips = activeComputerShips.filter((ship) => ship.className === 'blocktwo shipon');
  if (filteredComputerShips.length === 0) {
    narrator.textContent = 'Game ended! The Player won!';
    document.querySelectorAll('.block').forEach((block) => {
      block.style.cssText = 'pointer-events: none';
    });
    document.querySelectorAll('.blocktwo').forEach((blocktwo) => {
      blocktwo.style.cssText = 'pointer-events: none';
    });
  }
  if (filteredPlayerShips.length === 0) {
    narrator.textContent = 'Game ended! The Computer won!';
    document.querySelectorAll('.block').forEach((block) => {
      block.style.cssText = 'pointer-events: none';
    });
    document.querySelectorAll('.blocktwo').forEach((blocktwo) => {
      blocktwo.style.cssText = 'pointer-events: none';
    });
  }
  console.log(filteredPlayerShips, filteredComputerShips);
}

function reset() {
  activePlayerShips = [];
  activeComputerShips = [];
  allower = 1;
  startingNumber = 49;
  gridOneBlocks = [];
  gridTwoBlocks = [];
  document.querySelectorAll('.block').forEach((block) => {
    block.className = 'block';
  });
  document.querySelectorAll('.blocktwo').forEach((blocktwo) => {
    blocktwo.className = 'blocktwo';
  });
  gridOneBlocks = Array.from(document.querySelectorAll('.block'));
  gridTwoBlocks = Array.from(document.querySelectorAll('.blocktwo'));
  document.querySelectorAll('.block').forEach((block) => {
    block.style.cssText = 'pointer-events: all';
  });
  document.querySelectorAll('.blocktwo').forEach((blocktwo) => {
    blocktwo.style.cssText = 'pointer-events: all';
  });
  narrator.textContent = 'Game has been reset, place your 10 ships!';
  console.log(document.querySelectorAll('.block'));
  console.log(document.querySelectorAll('.blocktwo'));
}

resetBtn.addEventListener('click', reset);

function playGame() {
  placeYourShips();
}

playGame();
