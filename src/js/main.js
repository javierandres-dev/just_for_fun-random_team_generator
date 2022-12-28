'use strict';
const d = document,
  $form = d.getElementById('form'),
  $generateBy = $form.generateBy,
  $select = d.getElementById('select'),
  $teams = d.getElementById('teams');

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
  $form.addEventListener('reset', () => {
    strParticipants = null;
    arrParticipants = [];
    $selected = null;
    $form.totalParticipants.value = arrParticipants.length;
    $teams.innerHTML = null;
  });
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
  let limit = null,
    html = '<option value="">Please choose an option...</option>';
  if (option === 'byTeams') {
    limit = arrParticipants.length / 2;
    for (let i = 2; i <= limit; i++) {
      html += `
      <option value="${i}-teams">${i} teams</option>
    `;
    }
  }
  if (option === 'byParticipants') {
    limit = arrParticipants.length - 2;
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
  const indexs = [],
    participants = [],
    teams = [];
  let maxParticipants = null,
    arr = [];
  do {
    const index = getRandomInt(arrParticipants.length);
    if (!indexs.includes(index)) indexs.push(index);
  } while (indexs.length !== arrParticipants.length);
  for (const i of indexs) participants.push(arrParticipants[indexs[i]]);
  if (rule === 'teams')
    maxParticipants = Math.round(participants.length / amount);
  if (rule === 'participants') maxParticipants = amount;
  for (let i = 0; i < participants.length; i++) {
    arr.push(participants[i]);
    if (arr.length === maxParticipants) {
      teams.push(arr);
      arr = [];
    }
    if (i + 1 === participants.length) {
      if (arr.length === 1) {
        const idx = getRandomInt(teams.length);
        teams[idx].push(arr[0]);
      }
      if (arr.length > 1) teams.push(arr);
    }
  }
  showTeams(teams);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function showTeams(teams) {
  let i = 0,
    html = '';
  while (i < teams.length) {
    html += `
      <p>Team ${i + 1}</p>
      <ul>
    `;
    for (const participant of teams[i]) {
      html += `<li>${participant}</li>`;
    }
    html += '</ul>';
    i++;
  }
  $teams.innerHTML = html;
}
