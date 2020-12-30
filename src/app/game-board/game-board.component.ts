import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowerInterface } from '@interfaces/flower.interface';
import { GameRowInterface, LevelDataInterface } from '@interfaces/game-board.interface';
import { FlowerService } from '@services/flower.service';
import { GameService } from '@services/game.service';
import { setGameboard } from '../shared/utils/setboard';
import { GameOverComponent } from './game-over/game-over.component';
import { LevelOverComponent } from './level-over/level-over.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {
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
              private gameService: GameService,
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

  ngOnDestroy(): void {
    // Save the game state so if the user wants to resume he can
    // Save the board, the queue
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
        const nextFlower = this.flowers.shift();
        this.gameboard[rowIndex].row[squareIndex].flower = nextFlower;
        this.gameboard[rowIndex].row[squareIndex].occupied = true;
        const currQueue = this.flowers.slice();
        this.flowers = [...currQueue];
        // See if there is a match, if so, update board and score
        // Check for game over
        this.checkForGameOver();
        // Check for level done
        if (!this.flowers.length) {
          this.displayLevelOverDialog();
        }
      } else {
        console.log('I cannot place a flower here!');
      }
  }

  checkForMatches(): void {
    // See if you have 3 in a row
  }

  checkForGameOver(): void {
    // Check to see if every square is filled - if so, throw up modal, then
    // route to main menu
    let gameOver = true;
    this.gameboard.forEach(row => {
      row.row.forEach(square => {
        if ((square.useable) && (!square.occupied)) {
          gameOver = false;
          return;
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
    // Add up the number of empty squares
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
      data: levelData,
      panelClass: 'custom-modalbox'
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
