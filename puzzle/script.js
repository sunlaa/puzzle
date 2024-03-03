const body = document.querySelector('body');
const img = new Image();
img.src = './deerlake.jpg';
wholeWidth = img.width;
wholeHeight = img.height;

const div = document.createElement('div');
body.append(div);

const blockWidth = wholeWidth / 2;
const blockHeight = wholeHeight / 2;

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
    line.className = 'line';
    div.append(line);

    for (let x = 0; x < countOfPieces; x++) {
      const fraction = (sentense[x].length * 16) / piecesWidthFitContent; // доля занимаемая кусочком в линии
      const pieceWidth = fraction * blockWidth; // конечная ширина кусочка

      const bulge = document.createElement('div');
      bulge.className = 'bulge';

      const concavity = document.createElement('div');
      concavity.className = 'concavity';

      const piece = document.createElement('div');
      piece.className = 'piece';
      piece.textContent = sentense[x];

      piece.style.height = `${blockHeight / rows}`;
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
      bulge.style.backgroundPosition = backPos;

      passedWidth += pieceWidth;

      piece.draggable = true;
      piece.addEventListener('drag', () => {
        console.log('dragging');
      });

      pieces.push(piece);
      line.append(piece);
      piece.append(bulge);
      piece.append(concavity);
    }
  }

  return pieces;
}

cut();
