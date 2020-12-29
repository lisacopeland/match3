import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './header/header.component';
import { FlowerComponent } from './flower/flower.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { FlowerQueueComponent } from './flower-queue/flower-queue.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { OptionsPageComponent } from './options-page/options-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { ScoresPageComponent } from './scores-page/scores-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameOverComponent } from './game-board/game-over/game-over.component';
import { LevelOverComponent } from './game-board/level-over/level-over.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlowerComponent,
    GameBoardComponent,
    FlowerQueueComponent,
    MainMenuComponent,
    OptionsPageComponent,
    HelpPageComponent,
    ScoresPageComponent,
    PageNotFoundComponent,
    GameOverComponent,
    LevelOverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
