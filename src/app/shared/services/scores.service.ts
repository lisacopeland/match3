import { Injectable } from '@angular/core';

export interface ScoreInterface {
  name: string;
  scoreDate: Date;
  score: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreList: ScoreInterface[];
  // Get the score list from localstorage

  getScoreList(): ScoreInterface[] {
    return this.scoreList;
  }

  addScore(newScore: ScoreInterface): void {
    this.scoreList.push(newScore);
  }

  readScores(): void {
    const scores = localStorage.getItem('scores');
    this.scoreList = JSON.parse(scores);
  }

  writeScores(): void {
    localStorage.setItem('scores', JSON.stringify(this.scoreList));
  }

}
