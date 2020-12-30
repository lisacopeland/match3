import { FlowerInterface } from '../models/flower.interface';
import { GameRowInterface, GameSquareInterface } from '../models/game-board.interface';

export interface LevelInfoInterface {
  level: number;
  places: boolean[][];
}

export const levelInfo: LevelInfoInterface[] = [
  {
    level: 1,
    places: [
      [false, false, false, true, false, false, false],
      [false, false, true, true, true, false, false],
      [false, true, true, true, true, true, false],
      [true, true, true, true, true, true, true],
      [false, true, true, true, true, true, false],
      [false, false, true, true, true, false, false],
      [false, false, false, true, false, false, false],
    ]
  },
  {
    level: 2,
    places: [
      [false, false, false, true, false, false, false],
      [false, true, true, true, true, true, false],
      [false, true, true, true, true, true, false],
      [true, true, true, true, true, true, true],
      [false, true, true, true, true, true, false],
      [false, true, true, true, true, true, false],
      [false, false, false, true, false, false, false],
    ]
  },
  {
    level: 3,
    places: [
      [false, false, false, true, false, false, false],
      [false, true, true, true, true, true, false],
      [false, true, true, true, true, true, false],
      [true, true, true, true, true, true, true],
      [false, true, true, true, true, true, false],
      [false, true, true, true, true, true, false],
      [false, false, false, true, false, false, false],
    ]
  },
  {
    level: 4,
    places: [
      [false, false, true, true, true, false, false],
      [false, true, true, true, true, true, false],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [false, true, true, true, true, true, false],
      [false, false, true, true, true, false, false],
    ]
  },
  {
    level: 5,
    places: [
      [false, false, true, true, true, false, false],
      [false, true, true, true, true, true, false],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [false, true, true, true, true, true, false],
      [false, false, true, true, true, false, false],
    ]
  },
  {
    level: 6,
    places: [
      [false, true, true, true, true, true, false],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, false, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [false, true, true, true, true, true, false],
    ]
  },
  {
    level: 7,
    places: [
      [false, true, true, true, true, true, false],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, false, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [false, true, true, true, true, true, false],
    ]
  },
  {
    level: 8,
    places: [
      [false, true, true, true, true, true, false],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, false, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [false, true, true, true, true, true, false],
    ]
  },
  {
    level: 9,
    places: [
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, false, true, true, true],
      [true, true, false, false, false, true, true],
      [true, true, true, false, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
    ]
  },
  {
    level: 10,
    places: [
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, false, true, true, true],
      [true, true, false, false, false, true, true],
      [true, true, true, false, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
    ]
  }
];

// Get the board configuration from the array above and initialize the gameboard
// If this is not level 1 then add the current flowers
export function setGameboard(level: number, gameBoard: GameRowInterface[]): GameRowInterface[] {
  const returnBoard: GameRowInterface[] = [];

  // Check if it is an entirely new board

  const currentLevelInfo: any = levelInfo.find(x => x.level === level);

  if ((!gameBoard.length) || (level === 1)) {
    for (let i = 0; i < 7; i++) {
      const newRow: GameRowInterface = {
        row: []
      };
      for (let j = 0; j < 7; j ++) {
        const newSquare: GameSquareInterface = {
          occupied: false,
          useable: currentLevelInfo?.places[i][j],
          flower: undefined
        };
        newRow.row.push(newSquare);
      }
      returnBoard.push(newRow);
    }
  } else {
    // Iterate thru the rows
    for (let i = 0; i < 7; i++) {
      // Copy the current row

      const newRow: GameSquareInterface[] = [...gameBoard[i].row];

      for (let j = 0; j < 7; j++) {
        const currentFlower = getFlower(gameBoard[i].row[j]);
        const useable = currentLevelInfo.places[i][j];
        const newSquare: GameSquareInterface = {
          occupied: useable && (currentFlower !== null),
          useable,
          flower: (useable) ? currentFlower : undefined
        };
        newRow[j] = newSquare;
      }
      returnBoard[i].row = newRow;
    }

  }

  return returnBoard;
}

export function getFlower(gameboardSquare: GameSquareInterface): FlowerInterface | undefined {
  if ((gameboardSquare === undefined) || (gameboardSquare === null)) {
    return undefined;
  }

  if ((gameboardSquare.flower === undefined) || (gameboardSquare.flower === null)) {
    return undefined;
  } else {
    return gameboardSquare.flower;
  }

}
