import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-difficulty',
  templateUrl: './choose-difficulty.component.html',
  styleUrls: ['./choose-difficulty.component.scss']
})
export class ChooseDifficultyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChooseDifficultyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClose(level: string): void {
    this.dialogRef.close(level);
  }

}
