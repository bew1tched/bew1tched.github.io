const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let points = []

let x;
let y;
let dx;
let dy;

point_1 = {'x': 0, 'y': 161, 'dx': 96, 'dy': 161};
point_2 = {'x': 96, 'y': 161, 'dx': 184, 'dy': 71};
point_4 = {'x': 184, 'y': 71, 'dx': 296, 'dy': 71};
point_5 = {'x': 296, 'y': 71, 'dx': 382, 'dy': 161};
point_6 = {'x': 382, 'y': 161, 'dx': 465, 'dy': 161};
point_7 = {'x': 106, 'y': 163, 'dx': 186, 'dy': 243};
point_8 = {'x': 185, 'y': 251, 'dx': 296, 'dy': 251};
point_9 = {'x': 296, 'y': 251, 'dx': 382, 'dy': 161};

point_S = {'x': 184, 'y': 71, 'dx': 184, 'dy': 71};
point_T = {'x': 184, 'y': 251, 'dx': 184, 'dy': 251};
point_P = {'x': 296, 'y': 251, 'dx': 296, 'dy': 71};
point_X = {'x': 298, 'y': 71, 'dx': 185, 'dy': 251};


let word = "";
let old_word = "";

let table = document.getElementById("myTablerow");
let falseTable = document.getElementById("myFalseTablerow");

let rebers = ['bpvve', 'BTSSXXTVVE', 'BTXXVPSE', 'BPVPXVPXVPXVVE', 'BTSXXVPSE', 'btsxse', 'btsxxtvve']
let non_rebers = ['BTSSPXSE', 'BPTVVB', 'BTXXVVSE', 'BPVSPSE', 'BTSSSE', 'SBTPPE', 'BVVSE', 'BTSXPE']

let slider = document.getElementById("myRange");
let speed = 5;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

slider.oninput = function () {
  speed = this.value;
}

function drawHalfCircleS() {
  ctx.beginPath();
  ctx.arc(x-1, y-33, 19, 0.9, Math.PI * 0.85, true);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(152,245,255,0.8)";
  ctx.stroke();
}

function drawHalfCircleT() {
  ctx.beginPath();
  ctx.arc(x - 6, y + 36, 19, 0, Math.PI * 1.5, false);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(152,245,255,0.8)";
  ctx.stroke();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(dx, dy, 16, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(152,245,255,1)";
  ctx.fill();
  ctx.closePath();
}

function drawLine() {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(dx, dy);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(152,245,255,0.8)";
  ctx.stroke();
}

async function drawIt(j) {
  x = points[j]['x']
  y = points[j]['y']
  dx = points[j]['dx']
  dy = points[j]['dy']
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  await sleep(100);

  if ((x === 184) && (dx === x) && (y === 71) && (dy === y)) {
    drawHalfCircleS();
  }
  if ((x === 184) && (dx === x) && (y === 251) && (dy === y)) {
    drawHalfCircleT();
  }
  drawLine();
  drawBall();
}

function createTable(word) {
  if ((word !== "") || (word !== this.word)) {
    const row = table.insertRow(0);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = word.toUpperCase();
  }
}

function createFalseTable(word) {
  if ((word !== "") || (word !== this.word)) {
    const row = falseTable.insertRow(0);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = word.toUpperCase();
  }
}

function getReber() {
  word = rebers[Math.floor(Math.random() * rebers.length)];
  document.getElementById("myText").value = word.toUpperCase();
  testReber();
  disableReberTest();
}

function getFalseReber() {
  word = non_rebers[Math.floor(Math.random() * non_rebers.length)];
  document.getElementById("myText").value = word.toUpperCase();
  redFunction(word);
}

function testReber() {
  word = document.getElementById("myText").value.toLocaleString().toLowerCase();
  if (word.toLowerCase() === old_word.toLowerCase()) {
    return;
  }

  points = [];
  k = 0;

  let c = '';
  let i = 0;
  while (i < word.length) {
    c = word[i];
    if (c === 'b') {
      i++;
      c = word[i];
      points.push(point_1);

    } else {
      redFunction(word);
      break;
    }
    if ((c === 't') || (c === 'p')) {
      if (c === 't') {
        i++;
        c = word[i];
        points.push(point_2);
      }
      if (c === 'p') {
        i++;
        points.push(point_7);
        loop(word, i);
        break;
      }
    } else {
      redFunction(word);
      break;
    }
    if ((c === 's') || (c === 'x')) {
      while ((c === 's')) {
        i++;
        c = word[i];
        points.push(point_S);
      }
      if (c === 'x') {
        i++;
        c = word[i];
        points.push(point_4);
      }
    } else {
      redFunction(word);
      break;
    }
    if ((c === 's') || (c === 'x')) {
      if (c === 'x') {
        i++;
        points.push(point_X);
        loop(word, i);
        break;
      }
      if (c === 's') {
        i++;
        c = word[i];
        points.push(point_5);
        if (c === 'e') {
          let t_word = word;
          i++;
          c = word[i];
          if (c) {
            redFunction(t_word);
            break;
          }
          points.push(point_6);
          greenFunction(word);
        }
      }
    } else {
      redFunction(word);
      break;
    }
  }

  function loop(word, i) {
    let c = word[i];
    if ((c === 'v') || (c === 't')) {
      while (c === 't') {
        i++;
        c = word[i];
        points.push(point_T);
      }
      if (c === 'v') {
        i++;
        c = word[i];
        points.push(point_8);
      }
    } else {
      redFunction(word);
    }
    if ((c === 'v') || (c === 'p')) {
      if (c === 'p') {
        i++;
        c = word[i];
        points.push(point_P);
        if ((c === 'x') || (c === 's')) {
          if (c === 'x') {
            i++;
            points.push(point_X);
            loop(word, i)
          }
          if (c === 's') {
            i++;
            c = word[i];
            points.push(point_5);
            if (c === 'e') {
              i++;
              c = word[i];
              if (c) {
                redFunction(word);
                return;
              }
              points.push(point_6);
              greenFunction(word);
            } else {
              redFunction(word);
            }
          }
        } else {
          redFunction(word);
        }
      }
      if (c === 'v') {
        i++;
        c = word[i];
        points.push(point_9);
        if (c === 'e') {
          i++;
          c = word[i];
          if (c) {
            redFunction(word);
            return;
          }
          points.push(point_6);
          greenFunction(word);
        } else {
          redFunction(word);
        }
      }
    } else {
      redFunction(word);
    }
  }
}

async function demo() {
  for (let j = 0; j < points.length; j++) {
    await drawIt(j);
    await sleep(2000 / speed);
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function enableButtons() {
  document.getElementById("animateReber").removeAttribute("disabled");
  document.getElementById("stepReber").removeAttribute("disabled");

}

function disableButtons() {
  document.getElementById("stepReber").setAttribute('disabled', 'true');
  document.getElementById("animateReber").setAttribute('disabled', 'true');
}

function enableReberTest() {
  document.getElementById("testReber").removeAttribute("disabled");
}

function disableReberTest() {
  document.getElementById("testReber").setAttribute('disabled', 'true');
}

function animateDemo() {
  disableButtons();
  demo().then(r => enableButtons());
}

let k = 0;

function stepDemo() {
  if (points.length === 0) {
    testReber();
  }
  stepIt();
}

function stepIt() {
  if (k < points.length) {
    drawIt(k);
  } else {
    k = -1;
  }
  k++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redFunction(word) {
  let element = document.getElementById("yourText");
  element.value = word.toUpperCase() + " is not a Reber word!";
  element.style.color = "red";
  disableButtons();
  disableReberTest();
  createFalseTable(word);
  old_word = word;
}

function greenFunction(word) {
  document.getElementById("yourText").value = word.toUpperCase();
  document.getElementById("yourText").style.color = "green";
  enableButtons();
  disableReberTest();
  createTable(word);
  old_word = word.toLowerCase();
}

let los = document.getElementById('testReber');
los.addEventListener('click', testReber, true);

let animate = document.getElementById('animateReber');
animate.addEventListener('click', animateDemo, true);

let step = document.getElementById('stepReber');
step.addEventListener('click', stepDemo, true);

let input = document.getElementById('myText');
input.addEventListener('keypress', enableReberTest, true);
input.addEventListener('input', enableReberTest, true);
