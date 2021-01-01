import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowerInterface } from '@interfaces/flower.interface';
import { GameDataInterface, GameRowInterface, LevelDataInterface } from '@interfaces/game-board.interface';
import { FlowerService } from '@services/flower.service';
import { GameService } from '@services/game.service';
import { checkRow, setGameboard } from '../shared/utils/game.util';
import { GameOverComponent } from './game-over/game-over.component';
import { LevelOverComponent } from './level-over/level-over.component';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce } from 'ng-animate';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))])
  ]
})
export class GameBoardComponent implements OnInit, OnDestroy {
  @ViewChild('curFlower') curFlowerElement;
  flowers: FlowerInterface[] = [];
  currentFlower: FlowerInterface;
  gameOption = '';
  gameboard: GameRowInterface[] = [];
  currentScore = 0;
  currentLevel = 1;
  emptySquareBonus = 0;
  levelScore = 0;
  plantAudio = new Audio();
  matchAudio = new Audio();
  bounce = false;
  curPosX = 0;
  curPosY = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private flowerService: FlowerService,
              private gameService: GameService,
              public dialog: MatDialog) { }

@HostListener('mousemove', ['$event'])
  handleMousemove(event): void {
    this.curPosX = event.clientX + 5;
    this.curPosY = event.clientY + 5;
  }

/*   @HostListener('click', ['$event.target'])
  handleClick(target): void {
    console.log('click!');
  } */

  animate(name: 'string'): void {
    this[name] = !this[name];
  }

  ngOnInit(): void {
    const gameOption = this.route.snapshot.paramMap.get('option');
    this.plantAudio.src = '../../assets/audio/plantflower.mp3';
    this.plantAudio.load();
    this.matchAudio.src = '../../assets/audio/match.mp3';
    this.matchAudio.load();

    if (gameOption && gameOption === 'resume') {
      // go back to the current game
      const resumeData: GameDataInterface = this.gameService.getGame();
      this.levelScore = resumeData?.levelScore;
      this.currentScore = resumeData?.totalScore;
      this.currentLevel = resumeData?.level;
      this.gameboard = resumeData?.board;
      this.flowers = resumeData?.queue;
      this.currentFlower = this.flowers.shift();
    } else {
      // Start a new game
      this.initGameBoard();
    }
  }

  ngOnDestroy(): void {
    // Save the game state so if the user wants to resume he can
    // Save the board, the queue
    // The currentFlower needs to be put back on the queue
    this.flowers.unshift(this.currentFlower);
    const gameData: GameDataInterface = {
      levelScore: this.levelScore,
      totalScore: this.currentScore,
      level: this.currentLevel,
      board: this.gameboard,
      queue: this.flowers
    };
    this.gameService.setCanResume(true);
    this.gameService.saveGame(gameData);
  }

  initGameBoard(): void {
    this.gameService.setCanResume(true);
    this.gameboard = setGameboard(1, this.gameboard);
    this.levelScore = 0;
    this.currentScore = 0;
    this.currentLevel = 1;
    this.flowers = this.flowerService.getFlowerQueue(this.currentLevel);
    this.currentFlower = this.flowers.shift();
  }

  onPlaceFlower(rowIndex: number, squareIndex: number): void {
    console.log('user clicked on ' + rowIndex, squareIndex);
    if ((!this.gameboard[rowIndex].row[squareIndex].occupied) &&
      (this.gameboard[rowIndex].row[squareIndex].useable)) {
        console.log('I will place a flower here!');
        // place the flower
        this.plantAudio.play();
        // const nextFlower = this.flowers.shift();
        this.gameboard[rowIndex].row[squareIndex].flower = this.currentFlower;
        this.gameboard[rowIndex].row[squareIndex].occupied = true;
        const currQueue = this.flowers.slice();
        this.flowers = [...currQueue];
        // See if there is a match, if so, update board and score
        console.log('current GameBoard ', this.gameboard);
        const result = checkRow(rowIndex, this.gameboard);
        if (result) {
          // There was a match, transform
          this.transformRow(rowIndex, result.start, result.end);
        }
        console.log('Result from checkRow is ', result);
        // Check for game over
        this.checkForGameOver();
        // Check for level done
        if (!this.flowers.length) {
          this.displayLevelOverDialog();
        } else {
          this.currentFlower = this.flowers.shift();
        }
      } else {
        console.log('I cannot place a flower here!');
      }
  }

  transformRow(rowNumber: number, start: number, end: number): void {
    const row = this.gameboard[rowNumber].row;
    for (let i = start; i <= end; i++) {
      const square = row[i];
      if (square.flower.innerColor === square.flower.outerColor) {
        // make the flower disappear
        square.occupied = false;
        square.flower = undefined;
        this.currentScore += 10;
        this.levelScore += 10;
      } else {
        square.flower.outerColor = square.flower.innerColor;
        this.currentScore += 5;
        this.levelScore += 5;
      }
    }
    this.matchAudio.play();
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
      width: '275px',
      height: '200px',
      panelClass: 'custom-modalbox',
      data: { score: this.currentScore }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.gameService.setCanResume(false);
      if (result === 'start over') {
        this.initGameBoard();
      } else {
        this.router.navigate(['/mainmenu']);
      }
    });
  }

  calculateEmptySquareBonus(): number {
    // Add up the number of empty squares, a square is
    // empty if it is useable and unoccupied
    // TODO: use reduce here
    let bonusScore = 0;
    this.gameboard.forEach(row => {
      row.row.forEach(square => {
        if (square.useable && !square.occupied) {
          bonusScore++;
        }
      });
    });
    return bonusScore;
  }

  displayLevelOverDialog(): void {

    // Calculate the emptySquareBonus
    const emptySquareBonus = this.calculateEmptySquareBonus();
    this.levelScore += emptySquareBonus;
    this.currentScore += emptySquareBonus;
    const levelData: LevelDataInterface = {
      level: this.currentLevel,
      levelScore: this.levelScore,
      emptySquareBonus,
      totalScore: this.currentScore
    };

    const dialogRef = this.dialog.open(LevelOverComponent, {
      data: levelData,
      panelClass: 'custom-modalbox',
      width: '300px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // level = level + 1
      this.currentLevel++;
      // level Score = 0;
      this.levelScore = 0;
      // Create new flower queue
      this.flowers = this.flowerService.getFlowerQueue(this.currentLevel);
      this.currentFlower = this.flowers.shift();
      this.gameboard = setGameboard(this.currentLevel, this.gameboard);
    });
  }
}
