import { Lens } from '@atomic-object/lenses';

type AbilityScore =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30;

interface AbilityScores {
  strength: AbilityScore;
  dexterity: AbilityScore;
  constitution: AbilityScore;
  intelligence: AbilityScore;
  wisdom: AbilityScore;
  charisma: AbilityScore;
}

type Type = AbilityScores;

const Default: AbilityScores = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10
};

const strength = Lens.from<AbilityScores>().prop('strength');
const dexterity = Lens.from<AbilityScores>().prop('dexterity');
const constitution = Lens.from<AbilityScores>().prop('constitution');
const intelligence = Lens.from<AbilityScores>().prop('intelligence');
const wisdom = Lens.from<AbilityScores>().prop('wisdom');
const charisma = Lens.from<AbilityScores>().prop('charisma');

const modifier = (score: AbilityScore) => Math.floor(score / 2) - 5;

export {
  Type,
  Default,
  modifier,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma
};
