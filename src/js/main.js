'use strict';
const d = document,
  $form = d.getElementById('form'),
  $generateBy = $form.generateBy,
  $select = d.getElementById('select');

let strParticipants = null,
  arrParticipants = [],
  $selected = null;

d.addEventListener('DOMContentLoaded', () => {
  $form.totalParticipants.value = arrParticipants.length;
  eventListeners();
});

function eventListeners() {
  $form.participants.addEventListener('input', handleInput);
  $form.participants.addEventListener('keyup', handleKeyup);
  for (const $generate of $generateBy) {
    $generate.addEventListener('change', handleChange);
  }
  $form.addEventListener('submit', handleSubmit);
}

function handleInput(e) {
  strParticipants = e.target.value.trim();
}

function handleKeyup(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    arrParticipants = strParticipants.split('\n');
    $form.totalParticipants.value = arrParticipants.length;
  }
}

function handleChange(e) {
  if (arrParticipants.length > 2) {
    handleSelect(e.target.value);
  }
}

function handleSelect(option) {
  const limit = arrParticipants.length / 2;
  let html = '<option value="">Please choose an option...</option>';
  if (option === 'byTeams') {
    for (let i = 2; i <= limit; i++) {
      html += `
      <option value="${i}-teams">${i} teams</option>
    `;
    }
  }
  if (option === 'byParticipants') {
    for (let i = 2; i <= limit; i++) {
      html += `
      <option value="${i}-participants">${i} participants by team</option>
    `;
    }
  }
  $select.innerHTML = html;
}

function handleSubmit(e) {
  e.preventDefault();
  const arr = $select.value.split('-');
  generateTeams(parseInt(arr[0]), arr[1]);
}

function generateTeams(amount, rule) {
  console.log(arrParticipants);
  const indexs = [];
  do {
    const index = getRandomInt(arrParticipants.length);
    console.log(index);
  } while (indexs.length === arrParticipants.length);
  console.log(indexs);
  //const newArr = arrParticipants
  if (rule === 'teams') {
  }
  if (rule === 'participants') {
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
