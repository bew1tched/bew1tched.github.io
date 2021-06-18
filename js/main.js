const initialState = 'S';
let table = document.getElementById("cellar");
let cellarTable = document.getElementById("cellarTable");

let outputDiv = document.getElementById('output');
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let operators = ['+', '-', '*', '/']

let validierung;

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
window.onload = function () {
    disableButtons()
};
let slider = document.getElementById("myRange");
let speed = 5;
let time = 1000;

slider.oninput = function () {
    speed = this.value;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearTable() {
    while (cellarTable.rows.length > 0) {
        cellarTable.deleteRow(0);
    }
}

function addCellarValue() {
    const row = cellarTable.insertRow(0);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = "X";
}

function delCellarValue() {
    try {
        cellarTable.deleteRow(0);
    } catch {
        cellarTable.style.color = "red";
        const row = cellarTable.insertRow(0);
        const cell1 = row.insertCell(0);
        cell1.innerHTML = "Keller bereits leer!";
    }
}

function genValid() {
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
        if (currentState.length > 20) {
            genValid();
        }
    }
    return currentState;
}

function isTerminal(value) {
    if (value.includes('A')) return false;
    if (value.includes('S')) return false;
    return !value.includes('Z');
}

let added = 0;

async function demo() {
    output();
    clearTable();
    inDemo();
    cellarTable.style.color = "black"

    for (let i = 0; i < demoArray.length; i++) {
        if (demoArray[i]['cellar'] === 'add') {
            addCellarValue();
            added += 1;
        }
        if (demoArray[i]['cellar'] === 'delete') {
            delCellarValue();
            added -= 1;
        }

        document.getElementById(demoArray[i]['node']).style.stroke = "green";
        document.getElementById(demoArray[i]['node']).style.strokeWidth = "4px";
        document.getElementById(demoArray[i]['path']).classList.add('green');
        document.getElementById(demoArray[i]['row']).style.backgroundColor = 'lightgreen';
        await sleep(time / speed);
        document.getElementById(demoArray[i]['node']).style.stroke = "black";
        document.getElementById(demoArray[i]['node']).style.strokeWidth = "2px";
        document.getElementById(demoArray[i]['path']).classList.remove('green');
        document.getElementById(demoArray[i]['row']).style.backgroundColor = 'white';
        await sleep(time / speed);
    }

    if (!validierung) {
        document.getElementById(demoArray[demoArray.length - 1]['node']).style.stroke = "red";
        document.getElementById(demoArray[demoArray.length - 1]['node']).style.strokeWidth = "4px";
        document.getElementById(demoArray[demoArray.length - 1]['path']).classList.add('red');
        document.getElementById(demoArray[demoArray.length - 1]['row']).style.backgroundColor = 'red';
        await sleep(time / speed);
        document.getElementById(demoArray[demoArray.length - 1]['node']).style.stroke = "black";
        document.getElementById(demoArray[demoArray.length - 1]['node']).style.strokeWidth = "2px";
        document.getElementById(demoArray[demoArray.length - 1]['path']).classList.remove('green');
        document.getElementById(demoArray[demoArray.length - 1]['row']).style.backgroundColor = 'white';
        await sleep(time / speed);
    }
    if (added !== 0) {
        cellarTable.style.color = "red";
    }

    afterDemo();
}

let steps = 0;

function nextStep() {
    console.log(demoArray)

    inSteps();
    output();
    cellarTable.style.color = "black"
    if (steps < demoArray.length) {
        if (demoArray[steps]['cellar'] === 'add') {
            addCellarValue();
            added += 1;
        }
        if (demoArray[steps]['cellar'] === 'delete') {
            delCellarValue();
            added -= 1;
        }
        if (steps !== 0) {
            document.getElementById(demoArray[steps - 1]['node']).style.stroke = "black";
            document.getElementById(demoArray[steps - 1]['node']).style.strokeWidth = "2px";
            document.getElementById(demoArray[steps - 1]['path']).classList.remove('green');
            document.getElementById(demoArray[steps - 1]['row']).style.backgroundColor = 'white';
        }

        document.getElementById(demoArray[steps]['node']).style.stroke = "green";
        document.getElementById(demoArray[steps]['node']).style.strokeWidth = "4px";
        document.getElementById(demoArray[steps]['path']).classList.add('green');
        document.getElementById(demoArray[steps]['row']).style.backgroundColor = 'lightgreen';


    }
    if (!validierung && steps === demoArray.length - 1) {
        document.getElementById(demoArray[demoArray.length - 1]['node']).style.stroke = "red";
        document.getElementById(demoArray[demoArray.length - 1]['node']).style.strokeWidth = "4px";
        document.getElementById(demoArray[demoArray.length - 1]['path']).classList.add('red');
        document.getElementById(demoArray[demoArray.length - 1]['row']).style.backgroundColor = 'red';
        if (added !== 0) {
            cellarTable.style.color = "red";
        }
    }
    if (added !== 0 && steps === demoArray.length - 1) {
        cellarTable.style.color = "red";
    }
    steps++;
    if (steps === demoArray.length + 1) {
        afterSteps();
        steps = 0;

        document.getElementById(demoArray[demoArray.length - 1]['node']).style.stroke = "black";
        document.getElementById(demoArray[demoArray.length - 1]['node']).style.strokeWidth = "2px";
        document.getElementById(demoArray[demoArray.length - 1]['path']).classList.remove('green');
        document.getElementById(demoArray[demoArray.length - 1]['row']).style.backgroundColor = 'white';
    }

}

function genInvalid() {
    let falseExp = genValid();
    while (falseExp.length < 3) {
        falseExp = genValid();
    }
    cutChar = Math.floor(Math.random() * falseExp.length) + 1;
    deletedChar = falseExp[cutChar - 1];
    return falseExp.slice(0, cutChar - 1) + falseExp.slice(cutChar)
}

function output() {
    const ausdruck = document.getElementById('input').value
    validierung = validate(ausdruck)
    if (validierung) {
        outputDiv.innerHTML = "Ausdruck ist korrekt.";
        outputDiv.style.color = "green";
    } else {
        outputDiv.innerHTML = "Ausdruck ist nicht korrekt.";
        outputDiv.style.color = "red";
    }
}


async function checkWord() {
    clearTable();
    const ausdruck = document.getElementById('input').value
    validierung = validate(ausdruck)
    output();
}

function getInvalid() {
    clearTable();

    let ausdruck = genInvalid();
    validierung = validate(ausdruck);
    document.getElementById('input').value = ausdruck;
    enableButtons();
}

function getValid() {
    clearTable();
    let ausdruck = genValid();
    validierung = validate(ausdruck);
    document.getElementById('input').value = ausdruck;
    enableButtons();
}

const isNumber = (c) => numbers.includes(c);
const isOperator = (c) => operators.includes(c);
const isOpen = c => c === '(';
const isClosed = c => c === ')';
let demoArray = [];

function validate(word) {
    let is_valid = true;
    const cellar = [];
    let last_char = null;
    let i = 0;
    demoArray = [];
    demoArray.push({'row': 'hidden', 'node': 'node1', 'path': 'hidden', 'cellar': 'false'})

    while (i < word.length && is_valid) {
        let current_char = word.charAt(i++);
        if (isNumber(current_char) && !last_char) { //Tab 1
            demoArray.push({'row': 'r_q1_q2_0', 'node': 'node2', 'path': 'p_q1_q2', 'cellar': 'false'})
            last_char = current_char;
            continue;
        }
        if (isNumber(current_char) && (isOpen(last_char) || isOperator(last_char))) { // Tab 5 oder Tab 9
            if (isOpen(last_char)) {
                demoArray.push({'row': 'r_q3_q2_0', 'node': 'node2', 'path': 'p_q3_q2', 'cellar': 'false'})
            }
            if (isOperator(last_char)) {
                demoArray.push({'row': 'r_q4_q2_0', 'node': 'node2', 'path': 'p_q4_q2', 'cellar': 'false'})
            }
            last_char = current_char;
            continue;
        }
        if (isOpen(current_char) && !last_char) { // Tab 2
            demoArray.push({'row': 'r_q1_q3_0', 'node': 'node3', 'path': 'p_q1_q3', 'cellar': 'add'})
            last_char = current_char;
            cellar.push('x')
            continue;
        }
        if (isOpen(current_char) && (isOperator(last_char) || isOpen(last_char))) { // Tab 10 oder Tab 6
            if (isOperator(last_char)) {
                demoArray.push({'row': 'r_q4_q3_0', 'node': 'node3', 'path': 'p_q4_q3', 'cellar': 'add'})
            }
            if (isOpen(last_char)) {
                demoArray.push({'row': 'r_q3_q3_0', 'node': 'node3', 'path': 'p_q3_q3_0', 'cellar': 'add'})
            }
            last_char = current_char;
            cellar.push('x');
            continue;
        }
        if (isClosed(current_char) && !last_char) { // kann nicht mit ) starten
            is_valid = false;
            continue;
        }
        if (isClosed(current_char) && (isClosed(last_char) || isNumber(last_char))) { // Tab 3 oder Tab 7
            if (isClosed(last_char)) {
                demoArray.push({'row': 'r_q3_q3_1', 'node': 'node3', 'path': 'p_q3_q3_1', 'cellar': 'delete'})
            }
            if (isNumber(last_char)) {
                demoArray.push({'row': 'r_q2_q3_0', 'node': 'node3', 'path': 'p_q2_q3', 'cellar': 'delete'})
            }
            last_char = current_char;
            if (isClosed(last_char) && !cellar.pop()) {
                is_valid = false;
            }
            continue;
        }
        if (isOperator(current_char) && !last_char) { // kann nicht mit Operator starten
            is_valid = false;
            continue;
        }
        if (isOperator(current_char) && (isNumber(last_char) || isClosed(last_char))) { // Tab 4 oder Tab 8
            if (isNumber(last_char)) {
                demoArray.push({'row': 'r_q2_q4_0', 'node': 'node4', 'path': 'p_q2_q4', 'cellar': 'false'})
            }
            if (isClosed(last_char)) {
                demoArray.push({'row': 'r_q3_q4_0', 'node': 'node4', 'path': 'p_q3_q4', 'cellar': 'false'})
            }
            last_char = current_char;
            is_valid = i < word.length;
            continue;
        }
        is_valid = false;
    }
    demoArray.push({
        'row': 'hidden',
        'node': demoArray[demoArray.length - 1]['node'],
        'path': 'hidden',
        'cellar': 'false'
    }) // Endzustand

    return is_valid && cellar.length === 0;
}


function enableButtons() {
    outputDiv.innerHTML = "";
    clearTable();
    document.getElementById("demoBtn").removeAttribute("disabled");
    document.getElementById("testBtn").removeAttribute("disabled");
    document.getElementById("next").removeAttribute("disabled");
    slider.removeAttribute('disabled');
}

function disableButtons() {
    document.getElementById("demoBtn").setAttribute('disabled', 'true');
    document.getElementById("testBtn").setAttribute('disabled', 'true');
    document.getElementById("next").setAttribute('disabled', 'true');
    slider.setAttribute('disabled', 'true');
}

function inDemo() {
    document.getElementById("demoBtn").setAttribute('disabled', 'true');
    document.getElementById("testBtn").setAttribute('disabled', 'true');
    document.getElementById("genValid").setAttribute('disabled', 'true');
    document.getElementById("genInvalid").setAttribute('disabled', 'true');
    document.getElementById("next").setAttribute('disabled', 'true');
}

function afterDemo() {
    document.getElementById("demoBtn").removeAttribute("disabled");
    document.getElementById("testBtn").removeAttribute("disabled");
    document.getElementById("genValid").removeAttribute("disabled");
    document.getElementById("genInvalid").removeAttribute("disabled");
    document.getElementById("next").removeAttribute("disabled");
    added = 0;
}

function inSteps() {
    document.getElementById("demoBtn").setAttribute('disabled', 'true');
    document.getElementById("testBtn").setAttribute('disabled', 'true');
    document.getElementById("genValid").setAttribute('disabled', 'true');
    document.getElementById("genInvalid").setAttribute('disabled', 'true');
    slider.setAttribute('disabled', 'true');
}

function afterSteps() {
    clearTable();
    document.getElementById("demoBtn").removeAttribute("disabled");
    document.getElementById("testBtn").removeAttribute("disabled");
    document.getElementById("genValid").removeAttribute("disabled");
    document.getElementById("genInvalid").removeAttribute("disabled");
    slider.removeAttribute('disabled');
    added = 0;
}

let eingabe = document.getElementById('input');
eingabe.addEventListener('keypress', enableButtons, true);
