import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@shared/services/game.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  canResume = false;
  constructor(private router: Router,
              private gameService: GameService) { }

  ngOnInit(): void {
    this.canResume = this.gameService.getCanResume();
  }

  onGotoGame(option: string): void {
    this.router.navigate(['/gameboard', {option}]);
  }

}
