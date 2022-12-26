'use strict';
const d = document,
  $form = d.getElementById('form'),
  $generateBy = $form.generateBy,
  $select = d.getElementById('select');

let strParticipants = null,
  arrParticipants = [];

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
  let limit = null,
    html = '<option value="">Please choose an option...</option>';
  if (option === 'byTeams') {
    limit = arrParticipants.length / 2;
    for (let i = 2; i <= limit; i++) {
      html += `
      <option value="${i}">${i} teams</option>
    `;
    }
  }
  if (option === 'byParticipants') {
    limit = arrParticipants.length - 2;
    for (let i = 2; i <= limit; i++) {
      html += `
      <option value="${i}">${i} participants by team</option>
    `;
    }
  }
  $select.innerHTML = html;
}

function handleSubmit(e) {
  e.preventDefault();
  $select.value;
}
