import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowerInterface } from '../shared/models/flower.interface';
import { GameRowInterface } from '../shared/models/game-board.interface';
import { FlowerService } from '../shared/services/flower.service';
import { setGameboard } from '../shared/utils/setboard';
import { GameOverComponent } from './game-over/game-over.component';
import { LevelOverComponent } from './level-over/level-over.component';

export interface LevelDataInterface {
  level: number;
  levelScore: number;
  emptySquareBonus: number;
  totalScore: number;
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  flowers: FlowerInterface[] = [];
  gameOption = '';
  gameboard: GameRowInterface[] = [];
  currentScore = 0;
  currentLevel = 1;
  emptySquareBonus = 0;
  levelScore = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private flowerService: FlowerService,
              public dialog: MatDialog) { }

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
    this.levelScore = 0;
    this.currentScore = 0;
    this.currentLevel = 1;
    this.flowers = this.flowerService.getFlowerQueue(this.currentLevel);
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
        if (!this.flowers.length) {
          // throw up level done modal,
          // create new queue
        }
      } else {
        console.log('I cannot place a flower here!');
      }
  }

  checkForGameOver(): void {
    // Check to see if every square is filled - if so, throw up modal, then
    // route to main menu
    let gameOver = true;
    this.gameboard.forEach(row => {
      row.row.forEach(square => {
        if (!square.occupied) {
          gameOver = false;
        }
      });
    });
    if (gameOver) {
      this.displayGameOverDialog();
    }
  }

  displayGameOverDialog(): void {
    const dialogRef = this.dialog.open(GameOverComponent, {
      width: '250px',
      data: { score: this.currentScore }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'start over') {
        this.initGameBoard();
      } else {
        this.router.navigate(['/gameboard']);
      }
    });
  }

  calculateEmptySquareBonus(): number {
    // Add up the number of empty squares, times 10
    return 0;
  }

  displayLevelOverDialog(): void {

    // Calculate the emptySquareBonus
    const emptySquareBonus = this.calculateEmptySquareBonus();
    this.levelScore += emptySquareBonus;
    const levelData: LevelDataInterface = {
      level: this.currentLevel,
      levelScore: this.levelScore,
      emptySquareBonus,
      totalScore: this.currentScore
    };

    const dialogRef = this.dialog.open(LevelOverComponent, {
      width: '250px',
      data: levelData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // level = level + 1
      this.currentLevel++;
      // level Score = 0;
      this.levelScore = 0;
      // Create new flower queue
      this.flowers = this.flowerService.getFlowerQueue(this.currentLevel);
    });
  }

}
