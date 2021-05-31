const initialState = 'S';
let table = document.getElementById("validationRow");
let btnNext = document.getElementById("next");
btnNext.style.visibility = 'hidden';

let deletedChar;
let cutChar;
const states = {
  S: {
    followers: ['SOS', 'A', 'Z'],
  },
  Z: {
    followers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  },
  O: {
    followers: ['+', '-', '*', '/'],
  },
  A: {
    followers: ['(S)'],
  },
};
let currentState = initialState;

let slider = document.getElementById("myRange");
let speed;
let time = 1000;

slider.oninput = function () {
  speed = this.value;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clearTable() {
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}

async function genValid() {
  deletedChar = '';
  clearTable();
  currentState = initialState;

  while (!isTerminal(currentState)) {
    if (currentState.indexOf('S') > -1) {
      output(currentState);
      await demo("row1");
      currentState = currentState.replaceAll('S', () => {
        return states.S.followers[Math.floor(Math.random() * states.S.followers.length)];
      });
      output(currentState);
    }
    if (currentState.indexOf('Z') > -1) {
      output(currentState);
      await demo("row2");
      currentState = currentState.replaceAll('Z', () => {
        return states.Z.followers[Math.floor(Math.random() * states.Z.followers.length)];
      });
      output(currentState);
    }
    if (currentState.indexOf('O') > -1) {
      output(currentState);
      await demo("row3");
      currentState = currentState.replaceAll('O', () => {
        return states.O.followers[Math.floor(Math.random() * states.O.followers.length)];
      });
      output(currentState);
    }
    if (currentState.indexOf('A') > -1) {
      output(currentState);
      await demo("row4");
      currentState = currentState.replaceAll('A', () => {
        return states.A.followers[Math.floor(Math.random() * states.A.followers.length)];
      });
      output(currentState);
    }
    if (currentState.length > 1000) {
      break;
    }
  }
  validate(currentState);
}

function isTerminal(value) {
  if (value.includes('A')) return false;
  if (value.includes('S')) return false;
  if (value.includes('O')) return false;

  return !value.includes('Z');
}

async function demo(row) {
  document.getElementById(row).style.color = 'red';
  await sleep(time / speed);
  document.getElementById(row).style.removeProperty('color');
}


async function genStepwise() {
  deletedChar = '';
  clearTable();
  currentState = initialState;
  output(currentState);
  document.getElementById("row2").style.removeProperty('color');
  document.getElementById("row3").style.removeProperty('color');
  document.getElementById("row4").style.removeProperty('color');

  document.getElementById("row1").style.color = 'red';
}

function nextStep() {
  clearTable();

  if (!isTerminal(currentState)) {

    if ((currentState.indexOf('S') > -1) || (currentState.indexOf('SOS') > -1)) {
      document.getElementById("row2").style.removeProperty('color');
      document.getElementById("row3").style.removeProperty('color');
      document.getElementById("row4").style.removeProperty('color');

      document.getElementById("row1").style.color = 'red';
      currentState = currentState.replaceAll('S', () => {
        return states.S.followers[Math.floor(Math.random() * states.S.followers.length)];
      });
      output(currentState);

    }
    if (currentState.indexOf('Z') > -1) {
      document.getElementById("row1").style.removeProperty('color');
      document.getElementById("row3").style.removeProperty('color');
      document.getElementById("row4").style.removeProperty('color');

      document.getElementById("row2").style.color = 'red';
      currentState = currentState.replaceAll('Z', () => {
        return states.Z.followers[Math.floor(Math.random() * states.Z.followers.length)];
      });
      output(currentState);

    }
    if (currentState.indexOf('O') > -1) {
      document.getElementById("row1").style.removeProperty('color');
      document.getElementById("row2").style.removeProperty('color');
      document.getElementById("row4").style.removeProperty('color');

      document.getElementById("row3").style.color = 'red';
      currentState = currentState.replaceAll('O', () => {
        return states.O.followers[Math.floor(Math.random() * states.O.followers.length)];
      });
      output(currentState);

    }
    if (currentState.indexOf('A') > -1) {
      document.getElementById("row1").style.removeProperty('color');
      document.getElementById("row2").style.removeProperty('color');
      document.getElementById("row3").style.removeProperty('color');
      document.getElementById("row4").style.color = 'red';
      currentState = currentState.replaceAll('A', () => {
        return states.A.followers[Math.floor(Math.random() * states.A.followers.length)];
      });
      output(currentState);

    }
  }
  output(currentState);
  if (isTerminal(currentState)) {
    validate(currentState);
    btnNext.style.visibility = 'hidden';
  }
}

function genInvalid() {
  clearTable();
  deletedChar = '';
  currentState = initialState;
  while (!isTerminal(currentState)) {
    if (currentState.indexOf('S') > -1) {
      currentState = currentState.replaceAll('S', () => {
        return states.S.followers[Math.floor(Math.random() * states.S.followers.length)];
      });
    }
    if (currentState.indexOf('Z') > -1) {
      currentState = currentState.replaceAll('Z', () => {
        return states.Z.followers[Math.floor(Math.random() * states.Z.followers.length)];
      });
    }
    if (currentState.indexOf('O') > -1) {
      currentState = currentState.replaceAll('O', () => {
        return states.O.followers[Math.floor(Math.random() * states.O.followers.length)];
      });
    }
    if (currentState.indexOf('A') > -1) {
      currentState = currentState.replaceAll('A', () => {
        return states.A.followers[Math.floor(Math.random() * states.A.followers.length)];
      });
    }
    if (currentState.length > 1000) {
      break;
    }
  }

  if (currentState.length > 3) {
    cutChar = Math.floor(Math.random() * currentState.length) + 1;
    deletedChar = currentState[cutChar - 1];
    let wrongState = currentState.slice(0, cutChar - 1) + currentState.slice(cutChar);
    output(wrongState);
    validate(wrongState);
  } else {
    genInvalid();
  }

}

function output(currentState) {
  document.getElementById('output').innerHTML = currentState;
}

function validate(currentState) {
  const row = table.insertRow(0);
  const cell1 = row.insertCell(0);
  cell1.innerHTML = ((currentState.match(/\(/g) || []).length).toString();
  const cell2 = row.insertCell(1);
  cell2.innerHTML = ((currentState.match(/\)/g) || []).length).toString();
  const cell3 = row.insertCell(2);
  cell3.innerHTML = 'Valid!';

  let open = ((currentState.match(/\(/g) || []).length).toString();
  let close = ((currentState.match(/\)/g) || []).length).toString();
  let numbers = currentState.split(/[ \(,\),\+,\-,\*, \/,\"]+/).map(x => +x);
  let bigNumber = false;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 9) {
      bigNumber = true;
    }
  }
  if (bigNumber) {
    cell3.innerHTML = 'Invalid: number > 9 found!!';
  }
  if (open !== close) {
    cell3.innerHTML = "Invalid due to count of '(' and ')'!";
  }
  if (states.O.followers.includes(deletedChar)) {
    cell3.innerHTML = "Operator missing at position " + cutChar;
  }
  if (states.Z.followers.includes(deletedChar)) {
    cell3.innerHTML = "Number missing at position " + cutChar;
  }
  enableButtons();
}

function enableButtons() {
  document.getElementById("genValid").removeAttribute("disabled");
  document.getElementById("genInvalid").removeAttribute("disabled");
  document.getElementById("genStepwise").removeAttribute("disabled");
  slider.removeAttribute('disabled');
}

function disableButtons() {
  document.getElementById("genValid").setAttribute('disabled', 'true');
  document.getElementById("genInvalid").setAttribute('disabled', 'true');
  document.getElementById("genStepwise").setAttribute('disabled', 'true');
}

function doNotDisableNext() {
  btnNext.style.visibility = 'visible';
  slider.setAttribute('disabled', 'true');
  document.getElementById("genValid").setAttribute('disabled', 'true');
  document.getElementById("genInvalid").setAttribute('disabled', 'true');
  document.getElementById("genStepwise").setAttribute('disabled', 'true');
}

let los = document.getElementById('genValid');
los.addEventListener('click', disableButtons, true);
los.addEventListener('click', genValid, true);

let next = document.getElementById('genStepwise');
next.addEventListener('click', doNotDisableNext, true);
next.addEventListener('click', genStepwise, true);

