const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let points = []
let data = {}

let dx;
let dy;

point_1 = {'dx': 106, 'dy': 163};
point_2 = {'dx': 186, 'dy': 83};
point_3 = {'dx': 186, 'dy': 83};
point_4 = {'dx': 286, 'dy': 83};
point_5 = {'dx': 366, 'dy': 163};
point_6 = {'dx': 460, 'dy': 163};
point_7 = {'dx': 186, 'dy': 243};
point_8 = {'dx': 286, 'dy': 243};

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

function drawBall() {
  ctx.beginPath();
  ctx.arc(dx, dy, 15, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(152,245,255,1)";
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
}

function getFalseReber() {
  word = non_rebers[Math.floor(Math.random() * non_rebers.length)];
  document.getElementById("myText").value = word.toUpperCase();
  redFunction(word);
}

function testReber() {
  word = document.getElementById("myText").value.toLocaleString().toLowerCase();
  console.log(word)
  console.log(old_word)
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
      points.push({'dx': point_1.dx, 'dy': point_1.dy});

    } else {
      redFunction(word);
      break;
    }
    if ((c === 't') || (c === 'p')) {
      if (c === 't') {
        i++;
        c = word[i];
        points.push({'dx': point_2.dx, 'dy': point_2.dy});
      }
      if (c === 'p') {
        i++;
        points.push({'dx': point_7.dx, 'dy': point_7.dy});
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
        points.push({'dx': point_3.dx, 'dy': point_3.dy});
      }
      if (c === 'x') {
        i++;
        c = word[i];
        points.push({'dx': point_4.dx, 'dy': point_4.dy});
      }
    } else {
      redFunction(word);
      break;
    }
    if ((c === 's') || (c === 'x')) {
      if (c === 'x') {
        i++;
        points.push({'dx': point_7.dx, 'dy': point_7.dy});
        loop(word, i);
        break;
      }
      if (c === 's') {
        i++;
        c = word[i];
        points.push({'dx': point_5.dx, 'dy': point_5.dy});
        if (c === 'e') {
          let t_word = word;
          i++;
          c = word[i];
          if (c) {
            redFunction(t_word);
            break;
          }
          points.push({'dx': point_6.dx, 'dy': point_6.dy});
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
        points.push({'dx': point_7.dx, 'dy': point_7.dy});
      }
      if (c === 'v') {
        i++;
        c = word[i];
        points.push({'dx': point_8.dx, 'dy': point_8.dy});
      }
    } else {
      redFunction(word);
    }
    if ((c === 'v') || (c === 'p')) {
      if (c === 'p') {
        i++;
        c = word[i];
        points.push({'dx': point_4.dx, 'dy': point_4.dy});
        if ((c === 'x') || (c === 's')) {
          if (c === 'x') {
            i++;
            points.push({'dx': point_7.dx, 'dy': point_7.dy});
            loop(word, i)
          }
          if (c === 's') {
            i++;
            c = word[i];
            points.push({'dx': point_5.dx, 'dy': point_5.dy});
            if (c === 'e') {
              i++;
              c = word[i];
              if (c) {
                redFunction(word);
                return;
              }
              points.push({'dx': point_6.dx, 'dy': point_6.dy});
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
        points.push({'dx': point_5.dx, 'dy': point_5.dy});
        if (c === 'e') {
          i++;
          c = word[i];
          if (c) {
            redFunction(word);
            return;
          }
          points.push({'dx': point_6.dx, 'dy': point_6.dy});
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

function redFunction(word) {
  let element = document.getElementById("yourText");
  element.value = word.toUpperCase() + " is not a Reber word!";
  element.style.color = "red";
  document.getElementById("stepReber").setAttribute('disabled', 'true');
  document.getElementById("animateReber").setAttribute('disabled', 'true');
  createFalseTable(word);
  old_word = word;
}

function greenFunction(word) {
  document.getElementById("yourText").value = word.toUpperCase();
  document.getElementById("yourText").style.color = "green";
  document.getElementById("stepReber").removeAttribute("disabled");
  document.getElementById("animateReber").removeAttribute("disabled");
  createTable(word);
  old_word = word.toLowerCase();
}


let los = document.getElementById('testReber');
los.addEventListener('click', testReber, true);

let animate = document.getElementById('animateReber');
animate.addEventListener('click', animateDemo, true);

let step = document.getElementById('stepReber');
step.addEventListener('click', stepDemo, true);
