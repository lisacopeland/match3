import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowerInterface } from '@interfaces/flower.interface';
import { GameDataInterface, GameRowInterface, LevelDataInterface } from '@interfaces/game-board.interface';
import { FlowerService } from '@services/flower.service';
import { GameService } from '@services/game.service';
import { checkColumn, checkRow, setGameboard } from '../shared/utils/game.util';
import { GameOverComponent } from './game-over/game-over.component';
import { LevelOverComponent } from './level-over/level-over.component';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce } from 'ng-animate';
import { ChooseDifficultyComponent } from './choose-difficulty/choose-difficulty.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  easyDifficulty = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private flowerService: FlowerService,
              private gameService: GameService,
              private cdRef: ChangeDetectorRef,
              public dialog: MatDialog) { }

// For making the current piece follow the mouse
@HostListener('mousemove', ['$event'])
  handleMousemove(event): void {
    this.curPosX = event.clientX + 5;
    this.curPosY = event.clientY + 5;
  }

/*   @HostListener('click', ['$event.target'])
  handleClick(target): void {
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
      this.easyDifficulty = resumeData.easyDifficulty;
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
      easyDifficulty: this.easyDifficulty,
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

    const dialogRef = this.dialog.open(ChooseDifficultyComponent, {
      width: '275px',
      height: '200px',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Result can be 'easy' 'hard'
      this.easyDifficulty = (result === 'easy');
      this.flowers = this.flowerService.getFlowerQueue(this.currentLevel, this.easyDifficulty);
      this.currentFlower = this.flowers.shift();
    });
  }

  onPlaceFlower(rowIndex: number, squareIndex: number): void {
    if ((!this.gameboard[rowIndex].row[squareIndex].occupied) &&
      (this.gameboard[rowIndex].row[squareIndex].useable)) {
        // place the flower
        this.plantAudio.play();
        // const nextFlower = this.flowers.shift();
        this.gameboard[rowIndex].row[squareIndex].flower = this.currentFlower;
        this.gameboard[rowIndex].row[squareIndex].occupied = true;
        const currQueue = this.flowers.slice();
        this.flowers = [...currQueue];
        this.cdRef.detectChanges();
        this.checkForMatches(rowIndex, squareIndex);
        // Check for game over
        this.checkForGameOver();
        // Check for level done
        if (!this.flowers.length) {
          this.displayLevelOverDialog();
        } else {
          this.currentFlower = this.flowers.shift();
        }
      }
  }

  transformRow(rowNumber: number, start: number, end: number): number[] {
    // Return an array of the squares checked
    const changedSquares = [];
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
        changedSquares.push(i);
        this.currentScore += 5;
        this.levelScore += 5;
      }
    }
    this.cdRef.detectChanges();
    this.matchAudio.play();
    return changedSquares;
  }

  transformCol(colNumber: number, start: number, end: number): number[] {
    // Return an array of the squares checked
    const changedSquares = [];
    // const row = this.gameboard[rowNumber].row;
    for (let i = start; i <= end; i++) {
      const square = this.gameboard[i].row[colNumber];
      if (square.flower.innerColor === square.flower.outerColor) {
        // make the flower disappear
        square.occupied = false;
        square.flower = undefined;
        this.currentScore += 10;
        this.levelScore += 10;
      } else {
        square.flower.outerColor = square.flower.innerColor;
        changedSquares.push(i);
        this.currentScore += 5;
        this.levelScore += 5;
      }
    }
    this.cdRef.detectChanges();
    this.matchAudio.play();
    return changedSquares;
  }

  checkForMatches(rowIndex: number, columnIndex): void {
    // See if you have 3 in a row
    // See if there is a match, if so, update board and score
    let foundMatch = true;
    // let gotChangedSquares = false;
    while (foundMatch) {
      const rowRun = checkRow(rowIndex, this.gameboard);
      const columnRun = checkColumn(columnIndex, this.gameboard);
      foundMatch = (rowRun !== null) || (columnRun !== null);
      if (rowRun !== null) {
        const changedColSquares = this.transformRow(rowIndex, rowRun.start, rowRun.end);
      }
      if (columnRun !== null) {
        const changedRowSquares = this.transformCol(columnIndex, columnRun.start, columnRun.end);
      }
    }
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
      // level = level + 1
      this.currentLevel++;
      // level Score = 0;
      this.levelScore = 0;
      // Create new flower queue
      this.flowers = this.flowerService.getFlowerQueue(this.currentLevel, this.easyDifficulty);
      this.currentFlower = this.flowers.shift();
      this.gameboard = setGameboard(this.currentLevel, this.gameboard);
    });
  }
}
