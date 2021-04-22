const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let points = []
let data = {}

let dx;
let dy;

let word = "";

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

function drawBall() {
  ctx.beginPath();
  ctx.arc(dx, dy, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


async function drawIt(j) {
  dx = points[j]['dx']
  dy = points[j]['dy']
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  await sleep(100);
  drawBall();
}

function createTable(word) {
  const row = table.insertRow(0);
  const cell1 = row.insertCell(0);
  cell1.innerHTML = word.toUpperCase();
}

function createFalseTable(word) {
  const row = falseTable.insertRow(0);
  const cell1 = row.insertCell(0);
  cell1.innerHTML = word.toUpperCase();
}

function getReber() {
  word = rebers[Math.floor(Math.random() * rebers.length)];
  document.getElementById("myText").value = word.toUpperCase();
  testReber();
}

function getFalseReber() {
  word = non_rebers[Math.floor(Math.random() * non_rebers.length)];
  document.getElementById("myText").value = word.toUpperCase();
  createFalseTable(word);
  redFunction();
}

function testReber() {

  points = [];
  k = 0;
  word = document.getElementById("myText").value.toLocaleString().toLowerCase();

  let c = '';
  let i = 0;
  while (i < word.length) {
    c = word[i];
    if (c === 'b') {
      i++;
      c = word[i];
      data = {
        'x': 2,
        'y': 162,
        'dx': 106,
        'dy': 162,
      }
      points.push(data);

    } else {
      redFunction();
      createFalseTable(word);
      break;
    }
    if ((c === 't') || (c === 'p')) {
      if (c === 't') {
        i++;
        c = word[i];
        data = {
          'x': 106,
          'y': 162,
          'dx': 185,
          'dy': 80,
        }
        points.push(data);
      }
      if (c === 'p') {
        i++;
        data = {
          'x': 106,
          'y': 162,
          'dx': 185,
          'dy': 242,
        }
        points.push(data);
        loop(word, i);
        break;
      }
    } else {
      redFunction();
      createFalseTable(word);
      break;
    }
    if ((c === 's') || (c === 'x')) {
      while ((c === 's')) {
        i++;
        c = word[i];
        data = {
          'x': 185,
          'y': 80,
          'dx': 185,
          'dy': 80,
        }
        points.push(data);
      }
      if (c === 'x') {
        i++;
        c = word[i];
        data = {
          'x': 185,
          'y': 80,
          'dx': 285,
          'dy': 80,
        }
        points.push(data);
      }
    } else {
      redFunction();
      createFalseTable(word);
      break;
    }
    if ((c === 's') || (c === 'x')) {

      if (c === 'x') {
        i++;
        data = {
          'x': 285,
          'y': 80,
          'dx': 185,
          'dy': 242,
        }
        points.push(data);
        loop(word, i);
        break;
      }
      if (c === 's') {
        i++;
        c = word[i];
        data = {
          'x': 285,
          'y': 80,
          'dx': 365,
          'dy': 162,
        }
        points.push(data);
        if (c === 'e') {
          // DONE
          i++;
          data = {
            'x': 360,
            'y': 162,
            'dx': 470,
            'dy': 162,
          }
          points.push(data);
          greenFunction();
          createTable(word);
        }
      }
    } else {
      redFunction();
      createFalseTable(word);
      break;
    }
  }

  function loop(word, i) {
    let c = word[i];
    if ((c === 'v') || (c === 't')) {
      while (c === 't') {
        i++;
        c = word[i];
        data = {
          'x': 185,
          'y': 242,
          'dx': 185,
          'dy': 242,
        }
        points.push(data);
      }
      if (c === 'v') {
        i++;
        c = word[i];
        data = {
          'x': 185,
          'y': 242,
          'dx': 285,
          'dy': 242,
        }
        points.push(data);
      }
    } else {
      redFunction();
      createFalseTable(word);
    }
    if ((c === 'v') || (c === 'p')) {
      if (c === 'p') {
        i++;
        c = word[i];
        data = {
          'x': 285,
          'y': 242,
          'dx': 285,
          'dy': 80,
        }
        points.push(data);

        if ((c === 'x') || (c === 's')) {
          if (c === 'x') {
            i++;
            data = {
              'x': 285,
              'y': 80,
              'dx': 185,
              'dy': 242,
            }
            points.push(data);
            loop(word, i)
          }
          if (c === 's') {
            i++;
            c = word[i];
            data = {
              'x': 285,
              'y': 80,
              'dx': 365,
              'dy': 162,
            }
            points.push(data);

            if (c === 'e') {
              i++;
              data = {
                'x': 360,
                'y': 162,
                'dx': 470,
                'dy': 162,
              }
              points.push(data);
              greenFunction();
              createTable(word);
              //demo();
            } else {
              redFunction();
              createFalseTable(word);
            }
          }
        } else {
          redFunction();
          createFalseTable(word);
        }
      }
      if (c === 'v') {
        i++;
        c = word[i];
        data = {
          'x': 285,
          'y': 242,
          'dx': 365,
          'dy': 162,
        }
        points.push(data);
        if (c === 'e') {
          // DONE
          i++;
          data = {
            'x': 360,
            'y': 162,
            'dx': 470,
            'dy': 162,
          }
          points.push(data);
          greenFunction();
          createTable(word);
          //demo();
        } else {
          redFunction();
          createFalseTable(word);
        }
      }
    } else {
      redFunction();
      createFalseTable(word);
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

function animateDemo() {
  demo();
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

function redFunction() {
  let element = document.getElementById("yourText");
  element.value = word.toUpperCase() + " is not a Reber word!";
  element.style.color = "red";
  document.getElementById("stepReber").setAttribute('disabled', 'true');
  document.getElementById("animateReber").setAttribute('disabled', 'true');
  word = "";
}

function greenFunction() {
  document.getElementById("yourText").value = word.toUpperCase();
  document.getElementById("yourText").style.color = "green";
  document.getElementById("stepReber").removeAttribute("disabled");
  document.getElementById("animateReber").removeAttribute("disabled");
  word = "";
}

let los = document.getElementById('testReber');
los.addEventListener('click', testReber, true);

let animate = document.getElementById('animateReber');
animate.addEventListener('click', animateDemo, true);

let step = document.getElementById('stepReber');
step.addEventListener('click', stepDemo, true);
