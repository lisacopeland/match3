import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowerInterface, red } from '../shared/models/flower.interface';
import { blue, yellow } from '../shared/models/flowercolors';
import { GameRowInterface, GameSquareInterface } from '../shared/models/game-board.interface';
import { setGameboard } from '../shared/utils/setboard';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  flowers: FlowerInterface[] = [
    {
      innerColor: red,
      outerColor: blue
    },
    {
      innerColor: yellow,
      outerColor: yellow
    },
    {
      innerColor: blue,
      outerColor: yellow
    },
    {
      innerColor: blue,
      outerColor: blue
    },
    {
      innerColor: yellow,
      outerColor: blue
    },
    {
      innerColor: red,
      outerColor: blue
    }
  ];
  gameOption = '';
  gameboard: GameRowInterface[] = [];
  constructor(private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const gameOption = this.route.snapshot.paramMap.get('option');
    if (gameOption && gameOption === 'resume') {
      // go back to the current game
    } else {
      // Start a new game
      this.initGameBoard();
    }
  }

  initGameBoard(): void {
    this.gameboard = setGameboard(1, this.gameboard);
  }

  onPlaceFlower(rowIndex: number, squareIndex: number): void {
    console.log('user clicked on ' + rowIndex, squareIndex);
    if ((!this.gameboard[rowIndex].row[squareIndex].occupied) &&
      (this.gameboard[rowIndex].row[squareIndex].useable)) {
        console.log('I will place a flower here!');
        // place the flower
        // See if there is a match, if so, update board and score
        // Check for game over
        // Check for level done
      } else {
        console.log('I cannot place a flower here!');
      }
  }

}
