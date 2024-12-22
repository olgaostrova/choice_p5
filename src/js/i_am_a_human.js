let blocks = [];
let particles = [];
let block_x = 150;
let block_y = 10;
let floors_counter = 10;
let blocks_counter = 0;
let start_x;
let start_y = 560;
let collapse = false;
let words = [];
let languages = ["Babylon", "Вавилон", "Babülon", "Babilonia", "Babilòn", "Babilon", "iBhabhiloni"];
let backImg, towel_dark, towel_light, towel_medium;

function preload() {
  //font = loadFont("fonts/EBGaramond-Italic.ttf");
  font = loadFont("https://files.catbox.moe/wep8hv.ttf");
  backImg = loadImage("https://files.catbox.moe/0bym4j.png");
  towel_dark = loadImage("https://files.catbox.moe/v7bzna.png");
  towel_light = loadImage("https://files.catbox.moe/jj5xck.png");
  towel_medium = loadImage("https://files.catbox.moe/hsxh6u.png");
}

function setup() {
  textFont(font);
  var canvas = createCanvas(displayWidth, 710);
  canvas.parent('canvasHuman');
  backImg.resize(displayWidth, 710);
  towel_medium.resize(60, 53);
  towel_light.resize(60, 53);
  towel_dark.resize(60, 53);
  start_x = width / 2 - 300;
  block_x = start_x;
  block_y = start_y;
  
}

function draw() {
  let targetFrameRate = 15 + blocks.length / 50; // Базовая частота 30 + 2 FPS за каждый блок
  frameRate(targetFrameRate);
  image(backImg, 0, 0);
  if (blocks.length === 0 || collapse) {
    frameRate(60);
  }

  // Отрисовка блоков
  for (let i = blocks.length - 1; i >= 0; i--) {
    let block = blocks[i];
    let current_towel = getRandomTowel();
    

    if (collapse) {
      block.y += block.speed;

      if (block.y > height / 2) {
        createParticles(block.x, block.y);
        blocks.splice(i, 1); // Удаляем блок из массива
      } else {
        image(current_towel, block.x, block.y);
      }
    } else {
      image(current_towel, block.x, block.y);
    }
  }

  // Отрисовка частиц
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];

    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.alpha -= 5;

    fill("white");
    noStroke();
    ellipse(particle.x, particle.y, particle.size);

    if (particle.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  if (collapse) {
    for (let word of words) {
      fill(word.color);
      textSize(word.size);
      text(word.text, word.x, word.y);
      word.y += word.speed;
    }
  }

  // Отображение текста перед началом падения
  if (!collapse) {
    fill("white");
    textAlign(CENTER);
    textSize(42);
    text("Click to overthrow God", width / 2, 60);
  }
}

function mousePressed() {
  if (!collapse) {
    blocks.push({
      x: block_x,
      y: block_y,
      speed: random(1, 2)
    });

    if (floors_counter - 1 === blocks_counter) {
      block_y -= 53;
      start_x += 30;
      block_x = start_x;
      blocks_counter = 0;
      floors_counter--;
    } else if (floors_counter > 0) {
      blocks_counter++;
      block_x += 60;
    } else {
      collapse = true;
      generateWords();
    }
  }
}

function getRandomTowel() {
  let arr = [towel_dark, towel_light, towel_medium];
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
  let i = getRandomInt(0,3)
  return arr[i]
}


function generateWords() {
  words = [];
  for (let i = 0; i < 60; i++) {
    let word = {
      text: random(languages),
      x: random(width),
      y: random(height),
      size: random(15, 30),
      speed: random(1, 3), // Случайная скорость падения для слов
      color: "white"
    };
    words.push(word);
  }
}

// Создаём частицы для разрушения блока
function createParticles(x, y) {
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: x + random(-10, 10),
      y: y + random(-10, 10),
      vx: random(-2, 2), 
      vy: random(-2, 2),
      size: random(3, 7), 
      alpha: 255
    });
  }
}