/** Register der Spiele (Module in `games/<id>/`) */
import { nachzeichnen } from './nachzeichnen';
import { pong } from './pong';
import { ziehenAblegen } from './ziehen-ablegen';
import type { GameId, GameModule } from './types';

export type { GameId, GameModule } from './types';
export { GAME_IDS } from './types';

export const GAMES: Record<GameId, GameModule<any>> = { nachzeichnen, pong, 'ziehen-ablegen': ziehenAblegen };

export function gameById(id: GameId): GameModule<any> {
  return GAMES[id];
}
