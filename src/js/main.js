'use strict';
const d = document,
  $form = d.getElementById('form'),
  $selectBy = $form.selectBy,
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
  for (const $selector of $selectBy) {
    $selector.addEventListener('change', handleChange);
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
  console.log(e.target.value);
  if (arrParticipants.length > 2) {
    console.log(arrParticipants.length);
  }
}

function handleSubmit(e) {
  e.preventDefault();
}
