let sins = ["Pride", "Greed", "Lust", "Wrath", "Gluttony", "Envy", "Sloth"];
let displayed_sins = []; // Массив для хранения отображённых грехов
let wave_y = 700;
let target_wave_y = 700; // Целевая позиция волны
let collapse = false;
let counter = 0;
let fill_count = 0;
let font, backImg, mother_and_child, bush, tree, wave;
let local_counter = 0;
function preload() {
  font = loadFont("https://files.catbox.moe/wep8hv.ttf");
  backImg = loadImage("https://files..moe/e2a56a.jpg");
  mother_and_child = loadImage("https://files.catbox.moe/5dzkr8.png");
  bush = loadImage("https://files.catbox.moe/zvv66v.png");
  tree = loadImage("https://files.catbox.moe/zypf4p.png");
  wave = loadImage("https://files.catbox.moe/kukxte.png");
}
function setup() {
  textFont(font);
  var canvas = createCanvas(displayWidth, 710);
  canvas.parent('canvasGod');
  backImg.resize(displayWidth, 710);
  wave.resize(displayWidth, 900);

  // Отрисовка пейзажа
  drawLandscape();
}
function draw() {
  // Плавное движение волны
  wave_y = lerp(wave_y, target_wave_y, 0.05);

  // Отображение волны
  image(wave, 0, wave_y);

  // Отображение всех грехов
  displaySins();

  // Отображение текста при коллапсе
  if (collapse) {
    showCollapseText();
  }

  // Отображение текста до коллапса
  if (!collapse) {
    showInstructionText();
  }
}
function mousePressed() {
  // Обновление грехов
  if (!collapse && counter < sins.length) {
    fill_count = 0;
    displayed_sins.push({
      text: sins[counter],
      x: random(100, width - 100),
      y: random(100, height - 100)
    });
  }

  // Проверка на коллапс (после отображения последнего греха)
  if (counter === sins.length) {
    collapse = true;
    fill_count = 0;
  }

  // Поднятие волны плавно
  if (!collapse && counter > 0) {
    target_wave_y -= 145; // Устанавливаем новую цель для позиции волны
  }
  counter++;
}
function drawLandscape() {
  image(backImg, 0, 0);
  image(tree, width / 5 * 3.5, 330, 350, 400);
  image(tree, width / 5 * 2.2, 260, 300, 360);
  image(tree, width / 5 * 4, 50, 200, 240);
  image(tree, width / 5, 200, 200, 240);
  image(mother_and_child, width / 6 - 40, 400, 150, 142);
  image(bush, width / 5 + 20, 460, 140, 100);
  image(bush, width / 5, 500, 80, 55);
  image(tree, width / 10 - 200, 300, 300, 360);
}
function displaySins() {
  for (let i = 0; i < displayed_sins.length; i++) {
    let sin = displayed_sins[i];
    fill(i === displayed_sins.length - 1 ? "red" : "black"); // Последний грех красный, остальные чёрные
    stroke(i === displayed_sins.length - 1 ? "white" : 0);
    strokeWeight(2);
    textSize(36);
    textAlign(CENTER);
    text(sin.text, sin.x, sin.y);
  }
}
function showCollapseText() {
  fill_count += 2;
  image(backImg, 0, 0);
  image(wave, 0, wave_y);
  fill(255, 0, 0, fill_count);
  stroke(0, 0, 0, fill_count);
  strokeWeight(3);
  textSize(48);
  textAlign(CENTER);
  text("You regret, don’t you?", width / 2, 300);
}
function showInstructionText() {
  fill(255);
  textSize(42);
  textAlign(CENTER);
  noStroke();
  text("Click on sins to punish them", width / 2, 60);
}
function showStartHintText() {
  fill(200);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text("Click to start", width / 2, 100);
}