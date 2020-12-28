import { UrlResolver } from '@angular/compiler';
import { FlowerInterface } from '../models/flower.interface';
import { GameRowInterface, GameSquareInterface } from '../models/game-board.interface';

export const level1 = [
  [ false, false, false, true, false, false, false ],
  [ false, false, true, true, true, false, false ],
  [ false, true, true, true, true, true, false ],
  [ true, true, true, true, true, true, true ],
  [ false, true, true, true, true, true, false],
  [ false, false, true, true, true, false, false],
  [ false, false, false, true, false, false, false],
];

export function setGameboard(level: number, gameBoard: GameRowInterface[]): GameRowInterface[] {
  const returnBoard: GameRowInterface[] = [];

  // Check if it is an entirely new board
  if ((!gameBoard.length) || (level === 1)) {
    for (let i = 0; i < 7; i++) {
      const newRow: GameRowInterface = {
        row: []
      };
      for (let j = 0; j < 7; j ++) {
        const newSquare: GameSquareInterface = {
          occupied: false,
          useable: level1[i][j],
          flower: null
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
        const useable = level1[i][j];
        const newSquare: GameSquareInterface = {
          occupied: (currentFlower !== null),
          useable,
          flower: (useable) ? currentFlower : null
        };
        newRow[j] = newSquare;
      }
      returnBoard[i].row = newRow;
    }

  }

  return returnBoard;
}

export function getFlower(gameboardSquare: GameSquareInterface): FlowerInterface | null {
  if ((gameboardSquare === undefined) || (gameboardSquare === null)) {
    return null;
  }

  if ((gameboardSquare.flower === undefined) || (gameboardSquare.flower === null)) {
    return null;
  } else {
    return gameboardSquare.flower;
  }

}
