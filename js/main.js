'use strict';
import { getFirstStepView, getSecondStepView } from './views.js';

const d = document,
  $main = d.querySelector('main'),
  $participants = d.getElementById('participants'),
  participants = [];

d.addEventListener('DOMContentLoaded', () => {
  $main.innerHTML = getFirstStepView();
  watchFirstStep();
});

function watchFirstStep() {
  const $form = d.querySelector('form'),
    $byNames = d.getElementById('byNames'),
    $byCodes = d.getElementById('byCodes'),
    $name = d.getElementById('name'),
    $addName = d.getElementById('addName'),
    $addNames = d.getElementById('addNames'),
    $iCode = d.getElementById('iCode'),
    $nCodes = d.getElementById('nCodes'),
    $addCodes = d.getElementById('addCodes');

  let nameEntered = null,
    iCode = null,
    nCodes = null;

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  $byNames.addEventListener('click', () => {
    handleParticipants('names', 'codes');
  });
  $byCodes.addEventListener('click', () => {
    handleParticipants('codes', 'names');
  });
  $name.addEventListener('input', (e) => {
    nameEntered = e.target.value;
  });
  $name.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      setParticipants();
    }
  });
  $addName.addEventListener('click', () => {
    setParticipants();
  });
  $addNames.addEventListener('click', () => {
    if (!participants.length) {
      notify('warning', 'Enter the names');
    } else if (participants.length < 4) {
      notify('warning', 'You must enter at least 4 names');
    } else {
      goToStepTwo();
    }
  });
  $iCode.addEventListener('input', (e) => {
    iCode = +e.target.value;
    checkCode('iCode');
  });
  $iCode.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      setCodes();
    }
  });
  $nCodes.addEventListener('input', (e) => {
    nCodes = +e.target.value;
    checkCode('nCodes');
  });
  $nCodes.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      setCodes();
    }
  });
  $addCodes.addEventListener('click', () => {
    setCodes();
  });
  const setParticipants = () => {
    if (nameEntered) {
      participants.push(nameEntered);
      nameEntered = null;
      $name.value = null;
      showParticipants();
    } else {
      notify('warning', 'Enter a name');
    }
  };
  const checkCode = (code) => {
    if (code <= 0) {
      notify('warning', 'You must enter a positive number');
      if (code === 'iCode') {
        iCode = null;
        $iCode.value = null;
      } else if (code === 'nCodes') {
        {
          nCodes = null;
          $nCodes.value = null;
        }
      }
    }
  };
  const setCodes = () => {
    if (!iCode) {
      notify('warning', 'Enter initial code');
    } else if (!nCodes) {
      notify('warning', 'Enter number of codes');
    } else if (nCodes < iCode + 3) {
      notify('warning', 'You must request at less 4 codes');
    } else {
      for (let i = iCode; i <= nCodes; i++) {
        participants.push(`Code #${i}`);
      }
      goToStepTwo();
    }
  };
}

function handleParticipants(opt1, opt2) {
  const $el1 = d.getElementById(opt1),
    $el2 = d.getElementById(opt2);
  $el1.classList.remove('d-none');
  $el2.classList.add('d-none');
}

function showParticipants() {
  let html = '<section class="participants"><h3>Participants</h3><ol>';
  for (const participant of participants) {
    html += `<li>${participant}</li>`;
  }
  html += '</ol></section>';
  $participants.innerHTML = html;
}

function goToStepTwo() {
  showParticipants();
  $main.innerHTML = getSecondStepView();
  watchSecondStep();
}

function watchSecondStep() {
  const $form = d.querySelector('form'),
    $byNgroups = d.getElementById('byNgroups'),
    $byNparticipants = d.getElementById('byNparticipants'),
    $number = d.getElementById('number'),
    $generate = d.getElementById('generate');

  let by = null,
    number = null;

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  $byNgroups.addEventListener('click', () => {
    by = 'byNgroups';
  });
  $byNparticipants.addEventListener('click', () => {
    by = 'byNparticipants';
  });
  $number.addEventListener('input', (e) => {
    number = +e.target.value;
    if (number <= 0) {
      number = null;
      $number.value = null;
      notify('warning', 'You must enter a positive number');
    }
  });
  $number.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      getRandomTeams();
    }
  });
  $generate.addEventListener('click', () => {
    getRandomTeams();
  });
  const getRandomTeams = () => {
    if (!by) {
      notify('warning', 'You must select an option');
      return;
    }
    if (number < 2) {
      notify('warning', 'You must request at less 2 groups');
      return;
    }
    let limit = null;
    const mix = getParticipantsMixed();
    const arr = [];
    let pos = 0;
    if (by === 'byNgroups') {
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
    } else if (by === 'byNparticipants') {
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
    showTeams(arr);
  };
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
  }
  return arr;
}

function showTeams(arr) {
  let html =
    '<section class="teams"><h2>Generated Teams</h2><div class="cards">';
  for (let i = 0; i < arr.length; i++) {
    html += `<div class="card">
    <h4>Group ${i + 1}</h4>
    <ol>`;
    for (let j = 0; j < arr[i].length; j++) {
      html += `<li>${arr[i][j]}</li>`;
    }
    html += '</ol></div>';
  }
  html += '</div></section>';
  $main.innerHTML = html;
}

function notify(className, text) {
  const $notify = d.getElementById('notify');
  $notify.innerHTML = `<p class="${className}">${text}</p>`;
  const timeoutId = setTimeout(() => {
    $notify.innerHTML = null;
    clearTimeout(timeoutId);
  }, 3000);
}
