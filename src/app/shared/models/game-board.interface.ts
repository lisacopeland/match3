import { FlowerInterface } from './flower.interface';

export interface GameSquareInterface {
  useable: boolean;         // If player is allowed to put something in this square
  occupied: boolean;        // if there is already a flower in this square
  flower: FlowerInterface | null; // flower in this square
}

export interface GameRowInterface {
  row: GameSquareInterface[];
}
