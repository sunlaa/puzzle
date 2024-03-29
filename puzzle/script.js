const body = document.querySelector('body');

const div = document.createElement('div');
body.append(div);

const blockWidth = 1000;
const blockHeight = 550;

div.style.width = `${blockWidth}px`;
div.style.height = `${blockHeight}px`;

const rows = 10;
const sentenses = [
  'How was your weekend?',
  'They arrived at school at 7 a.m',
  'Is your birthday in August?',
  'There is a small boat on the lake',
  'I ate eggs for breakfast',
  'I brought my camera on my vacation',
  'The capital of the United States is Washington, D.C',
  'Did you catch the ball during the baseball game?',
  'People feed ducks at the lake',
  'The woman enjoys riding her bicycle',
];

let zIndex = 0;
let pieceId = 0;

function cut() {
  const pieces = [];
  for (let y = 0; y < rows; y++) {
    const sentense = sentenses[y].split(' ');
    const countOfPieces = sentense.length;

    const piecesWidthFitContent = sentense.reduce(
      (acc, elem) => (acc += elem.length * 16),
      0
    );

    let passedWidth = 0; // ширина которая уже использована, для указания корректного значения в background-position

    const line = document.createElement('div');
    line.style.height = `${blockHeight / rows}px`;
    line.className = 'line';
    div.append(line);

    for (let x = 0; x < countOfPieces; x++) {
      const fraction = (sentense[x].length * 16) / piecesWidthFitContent; // доля занимаемая кусочком в линии, 16 - предполагаемая ширина одной буквы
      const pieceWidth = fraction * blockWidth; // конечная ширина кусочка

      const container = document.createElement('div');
      container.className = 'container';

      const bulge = document.createElement('div'); // выпуклость
      bulge.className = 'bulge';
      bulge.style.top = `${blockHeight / rows / 2 - 7}px`; // высота кусочка разделить на 2 и отнять половину ширины выпуклости

      const piece = document.createElement('div');
      piece.className = 'piece';
      piece.textContent = sentense[x];

      container.id = pieceId++;
      container.style.zIndex = zIndex++;
      piece.style.height = `${blockHeight / rows}px`;
      piece.style.width = `${pieceWidth}px`;

      piece.style.backgroundImage = "url('./deerlake.jpg')";
      bulge.style.backgroundImage = "url('./deerlake.jpg')";

      const backSize = `${blockWidth}px ${blockHeight}px`;
      const backPos = `-${passedWidth}px ${
        // значения должны быть отрицательными!
        (blockHeight / 10) * -y
      }px`;

      piece.style.backgroundSize = backSize;
      piece.style.backgroundPosition = backPos;

      bulge.style.backgroundSize = backSize;
      bulge.style.backgroundPosition = `-${passedWidth - 10}px ${
        // 9 - ширина выпуклости
        (blockHeight / 10) * -y - 9
      }px`;

      passedWidth += pieceWidth;

      container.draggable = true;

      if (x === 0) {
        piece.style.mask = `radial-gradient(
          circle at ${pieceWidth}px 50%,
          transparent 0,
          transparent 7px,
          black 7px
        )`;
      } else if (x === countOfPieces - 1) {
        container.append(bulge);
      } else {
        piece.style.mask = `radial-gradient(
          circle at ${pieceWidth}px 50%,
          transparent 0,
          transparent 7px,
          black 7px
        )`;
        container.append(bulge);
      }

      pieces.push(container);
      container.append(piece);
      line.append(container);
    }
  }

  return pieces;
}

const puzzle = cut();
const field = document.createElement('div');
field.className = 'field';
body.append(field);

puzzle.forEach((elem) => {
  elem.addEventListener('dragstart', (e) => {
    const puzzlePiece = e.target;

    const puzzleId = puzzlePiece.id;
    e.dataTransfer.setData('id', puzzleId);
    setTimeout(() => (puzzlePiece.style.opacity = '0'), 0);
  });
});

field.addEventListener('dragover', (e) => {
  e.preventDefault();
});

field.addEventListener('dragenter', (e) => {
  e.target.classList.add('hovered');
});

field.addEventListener('dragleave', (e) => {
  e.target.classList.remove('hovered');
});

field.addEventListener('drop', (e) => {
  e.preventDefault();
  e.target.classList.remove('hovered');

  const id = e.dataTransfer.getData('id');
  const elem = document.getElementById(id);

  const placeholder = elem.cloneNode(true);
  placeholder.style.opacity = '0';
  elem.parentNode.insertBefore(placeholder, elem);

  elem.style.opacity = '1';
  e.target.append(elem);
});

// puzzle.forEach((elem, index) => {
//   if (index < 4) {
//     const container = document.createElement('div');
//     container.className = 'container';
//     field.append(container);
//     container.append(elem);
//   }
// });

// const body = document.body;

// const img = new Image();
// img.src = './deerlake.jpg';

// const imgWidth = img.width / 2;
// const imgHeight = img.height / 2;

// const rows = 10;
// const cols = 4;

// function createPiece() {
//   const piece = document.createElement('canvas');
//   const pieceContext = piece.getContext('2d');

//   const pieceWidth = imgWidth / cols;
//   const pieceHeight = imgHeight / rows;

//   pieceContext.beginPath();
//   pieceContext.moveTo(0, 0);
//   pieceContext.lineTo(0, pieceWidth);
//   pieceContext.lineTo()

//   piece.width = pieceWidth;
//   piece.height = pieceHeight;

//   img.onload = () =>
//     pieceContext.drawImage(
//       img,
//       0,
//       0,
//       pieceWidth,
//       pieceHeight,
//       0,
//       0,
//       pieceWidth / 2,
//       pieceHeight / 2
//     );
//   piece.draggable = true;
//   body.append(piece);
// }

// createPiece();
