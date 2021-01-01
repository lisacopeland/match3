import { Injectable } from '@angular/core';
import { GameDataInterface } from '@interfaces/game-board.interface';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  private currentGame: GameDataInterface | undefined = undefined;
  private canResume: false;

  // Method for saving a game (When user goes to the main menu)
  saveGame(gameData: GameDataInterface): void {
    this.currentGame = gameData;
  }

  // Method for retreiving the game (When a user hits resume)
  getGame(): GameDataInterface | undefined {
    return this.currentGame;
  }

  setCanResume(canResume): void {
    this.canResume = canResume;
  }

  getCanResume(): boolean {
    return this.canResume;
  }

}
