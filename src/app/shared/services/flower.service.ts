import { Injectable } from '@angular/core';
import { FlowerInterface } from '@interfaces/flower.interface';

const colors = [
  '#A61515',   // red
  '#2313D2',   // blue
  '#FFD600',   // yellow,
  '#FFFFFF',   // white
  '#F7428D',   // pink,
  '#08BFBE',   // aqua,
];

const levelData = [
  {
    level: 1,
    queueLength: 5,
    colorChoices: 3,
  },
  {
    level: 2,
    queueLength: 10,
    colorChoices: 3,
  },
  {
    level: 3,
    queueLength: 15,
    colorChoices: 4,
  },
  {
    level: 4,
    queueLength: 20,
    colorChoices: 4,
  },
  {
    level: 5,
    queueLength: 25,
    colorChoices: 5,
  }

];

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  getFlowerQueue(level: number, easy: boolean): FlowerInterface[] {

    const flowerArray: FlowerInterface[] = [];
    // Generate a random array of flowers, butterflies, and shovels
    // The number of colors used depends on the level
    const currentLevelData = levelData.find(x => x.level === level);
    if (currentLevelData) {
      for (let x = 0; x < currentLevelData.queueLength; x++) {
        const outerColor = colors[this.getRandom(currentLevelData.colorChoices)];
        const innerColor = (easy) ? outerColor : colors[this.getRandom(currentLevelData.colorChoices)];
        const flower: FlowerInterface = {
          innerColor,
          outerColor
        };
        flowerArray.push(flower);
      }
    }

    return flowerArray;
  }

  getRandom(highest: number): number {
    const next = Math.floor((Math.random() * (highest)) + 0);
    return next;
  }
}
