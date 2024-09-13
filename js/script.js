'use strict';
const d = document;

const $byNames = d.getElementById('byNames'),
  $byCodes = d.getElementById('byCodes'),
  $name = d.getElementById('name'),
  $addName = d.getElementById('addName'),
  $iCode = d.getElementById('iCode'),
  $nCodes = d.getElementById('nCodes'),
  $addCodes = d.getElementById('addCodes'),
  $nGroups = d.getElementById('nGroups'),
  $nParticipants = d.getElementById('nParticipants'),
  $number = d.getElementById('number'),
  $generate = d.getElementById('generate');

const participants = [];
//const participants = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
//const participants = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
//const participants = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
//const participants = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];

let nameEntered = null,
  iCode = null,
  nCodes = null,
  by = null,
  number = null;

let limit = null;

d.addEventListener('DOMContentLoaded', () => {
  eventListener();
});

function eventListener() {
  $byNames.addEventListener('click', () => {
    setParticipants('names', 'codes');
  });
  $byCodes.addEventListener('click', () => {
    setParticipants('codes', 'names');
  });
  $name.addEventListener('input', (e) => {
    nameEntered = e.target.value;
  });
  $addName.addEventListener('click', () => {
    if (nameEntered) {
      participants.push(nameEntered);
      $name.value = null;
      nameEntered = null;
      showParticipats();
    }
  });
  $iCode.addEventListener('input', (e) => {
    iCode = +e.target.value;
  });
  $nCodes.addEventListener('input', (e) => {
    nCodes = +e.target.value;
  });
  $addCodes.addEventListener('click', () => {
    if (iCode && nCodes) {
      for (let i = iCode; i <= nCodes; i++) {
        participants.push(`Code ${i}`);
      }
      $iCode.value = null;
      $nCodes.value = null;
      showParticipats();
    }
  });
  $nGroups.addEventListener('click', () => {
    setGroups('nGroups');
  });
  $nParticipants.addEventListener('click', () => {
    setGroups('nParticipants');
  });
  $number.addEventListener('input', (e) => {
    number = +e.target.value;
  });
  $generate.addEventListener('click', () => {
    const mix = getParticipantsMixed();
    const arr = [];
    let pos = 0;
    if (by === 'nGroups') {
      if (mix.length % number === 0) {
        limit = mix.length / number;
      } else {
        limit = Math.ceil(mix.length / number);
      }
      for (let i = 0; i < number; i++) {
        const l = pos + limit > mix.length ? mix.length : pos + limit;
        const subArr = mix.slice(pos, l);
        arr.push(subArr);
        pos = l;
      }
    } else if (by === 'nParticipants') {
      if (mix.length % number === 0) {
        limit = mix.length / number;
      } else {
        limit = Math.ceil(mix.length / number);
      }
      for (let i = 0; i < limit; i++) {
        const l = pos + number > mix.length ? mix.length : pos + number;
        const subArr = mix.slice(pos, l);
        if (subArr.length === 1) {
          const idx = Math.floor(Math.random() * arr.length);
          arr[idx].push(subArr);
        } else {
          arr.push(subArr);
        }
        pos = l;
      }
    }
    showGroups(arr);
  });
}

function setParticipants(opt1, opt2) {
  const $el1 = d.getElementById(opt1),
    $el2 = d.getElementById(opt2);
  $el1.classList.remove('d-none');
  $el2.classList.add('d-none');
}

function showParticipats() {
  const $participants = d.getElementById('participants');
  let items = '';
  for (const participant of participants) {
    items += `<li>${participant}</li>`;
  }
  $participants.innerHTML = items;
}

function setGroups(opt) {
  const $el = d.getElementById('num');
  $el.classList.remove('d-none');
  by = opt;
}

function getParticipantsMixed() {
  const arr = [];
  let i = 0;
  while (i < participants.length) {
    const idx = Math.floor(Math.random() * participants.length);
    if (!arr.includes(participants[idx])) {
      arr.push(participants[idx]);
      i++;
    }
  }
  if (JSON.stringify(participants) === JSON.stringify(arr)) {
    getParticipantsMixed();
  } else return arr;
}

function showGroups(arr) {
  const $groups = d.getElementById('groups');
  let html = '';
  for (let i = 0; i < arr.length; i++) {
    html += `<div>
    <p>Group ${i + 1}</p>
    <ol>`;
    for (let j = 0; j < arr[i].length; j++) {
      html += `<li>${arr[i][j]}</li>`;
    }
    html += `</ol>
    </div>`;
  }
  $groups.innerHTML = html;
}
