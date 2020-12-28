import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { OptionsPageComponent } from './options-page/options-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScoresPageComponent } from './scores-page/scores-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainmenu', pathMatch: 'full' },
  { path: 'mainmenu', component: MainMenuComponent },
  { path: 'gameboard', component: GameBoardComponent },
  { path: 'gameboard/:option', component: GameBoardComponent },
  { path: 'options', component: OptionsPageComponent },
  { path: 'help', component: HelpPageComponent },
  { path: 'scores', component: ScoresPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
