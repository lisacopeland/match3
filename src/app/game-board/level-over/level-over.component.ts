import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LevelDataInterface } from '@shared/models/game-board.interface';

@Component({
  selector: 'app-level-over',
  templateUrl: './level-over.component.html',
  styleUrls: ['./level-over.component.scss']
})
export class LevelOverComponent implements OnInit {

  levelData: LevelDataInterface = {
    level: 1,
    levelScore: 0,
    emptySquareBonus: 0,
    totalScore: 0
  };

  constructor(public dialogRef: MatDialogRef<LevelOverComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LevelDataInterface) { }

  // Data looks like
  // level: number
  // levelScore: number
  // emptySquareBonus: number
  // totalScore: number

  ngOnInit(): void {
    this.levelData = this.data;
  }

}
