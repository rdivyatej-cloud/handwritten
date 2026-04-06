const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 1000;

function generateHandwriting() {
  const text = document.getElementById("textInput").value;
  const selectedFont = document.getElementById("fontSelect").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bg = new Image();
  bg.src = "./assets/paper.jpg"; 
  
  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    drawLines();   // notebook lines
    drawText(text, selectedFont);
    addSmudge();
  };
  bg.onerror = () => {
  console.log("Image failed, using fallback");

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawLines();
  drawText(text, selectedFont);
  addSmudge();
};
}

function drawLines() {
  ctx.strokeStyle = "#cce0ff";
  ctx.lineWidth = 1;

  for (let i = 80; i < canvas.height; i += 32) {
    ctx.beginPath();
    ctx.moveTo(40, i);
    ctx.lineTo(canvas.width - 40, i);
    ctx.stroke();
  }
}

function drawText(text, font) {
  ctx.font = `22px '${font}'`;
  ctx.fillStyle = "#1a1a1a";

  let x = 60;
  let y = 80;
  const lineHeight = 32;

  const words = text.split(" ");

  words.forEach(word => {
    const offsetX = Math.random() * 2;
    const offsetY = Math.random() * 3;
    const rotation = (Math.random() - 0.5) * 0.05;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillText(word, offsetX, offsetY);
    ctx.restore();

    x += ctx.measureText(word + " ").width;

    if (x > 700) {
      x = 60;
      y += lineHeight + Math.random() * 4;
    }
  });
}

function addSmudge() {
  const smudge = new Image();
  smudge.src = "assets/smudge.png";

  smudge.onload = () => {
    for (let i = 0; i < 6; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;

      ctx.globalAlpha = 0.05;
      ctx.drawImage(smudge, x, y, 120, 60);
      ctx.globalAlpha = 1;
    }
  };
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "handwriting.png";
  link.href = canvas.toDataURL();
  link.click();
}
