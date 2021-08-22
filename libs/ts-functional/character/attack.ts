import * as Character from './character';
import * as AS from '@evercraft/ts-functional/ability-scores';
import { flow } from 'lodash';

const criticalHit = 20;

const minimum = (expression: number, min: number): number => {
  if (expression <= 1) {
    return min;
  }

  return expression;
};

/**
 * Handles one character attacking another
 *
 * @param attacker - The character initiating the attack
 * @param defender - The character being attacked
 * @param roll - The number rolled on the dice for the attacked
 * @returns a new defender character after the attack has been resolved
 */
export const attack = (
  attacker: Character.Type,
  defender: Character.Type,
  roll: number
): Character.Type => {
  const attackerStrength = Character.strength(attacker);
  const modifier = AS.modifier(attackerStrength);

  const modifiedRoll = roll + modifier;

  const damageDealt = minimum(1 + modifier, 1);

  if (roll === criticalHit) {
    return flow(
      Character.adjustCurrentHp(damageDealt * -2),
      Character.adjustExperiencePoints(10)
    )(defender);
  }

  if (modifiedRoll >= Character.armorClass(defender)) {
    return flow(
      Character.adjustCurrentHp(damageDealt * -1),
      Character.adjustExperiencePoints(10)
    )(defender);
  }

  return defender;
};
