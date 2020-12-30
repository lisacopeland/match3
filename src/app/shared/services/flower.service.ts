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
    queueLength: 15,
    colorChoices: 4,
  },
  {
    level: 3,
    queueLength: 20,
    colorChoices: 5,
  },
  {
    level: 4,
    queueLength: 25,
    colorChoices: 6,
  }
];

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  getFlowerQueue(level: number): FlowerInterface[] {

    const flowerArray: FlowerInterface[] = [];
    // Generate a random array of flowers, butterflies, and shovels
    // The number of colors used depends on the level
    const currentLevelData = levelData.find(x => x.level === level);
    if (currentLevelData) {
      for (let x = 0; x < currentLevelData.queueLength; x++) {
        const flower: FlowerInterface = {
          innerColor: colors[this.getRandom(currentLevelData.colorChoices)],
          outerColor: colors[this.getRandom(currentLevelData.colorChoices)]
        };
        console.log('inner: ' + flower.innerColor + ' outer: ' + flower.outerColor);
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
