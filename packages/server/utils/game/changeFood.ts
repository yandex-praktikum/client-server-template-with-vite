import { FOOD_COLORS, MAP_HEIGHT, MAP_WIDTH } from '../../../shared/consts';
import type { TGame } from '../../../shared/types';
import { getRandomItem } from '../../../shared/utils/getRandomItem';
import { makeRandomPosition } from '../common/makeRandomPosition';

export const changeFood = (game: TGame) => {
  game.food = {
    position: makeRandomPosition(MAP_WIDTH, MAP_HEIGHT, 50),
    color: getRandomItem(FOOD_COLORS),
  };
};
