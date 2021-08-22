import { Lens } from '@atomic-object/lenses';
import * as AbilityScores from '@evercraft/ts-functional/ability-scores';

// Types

type Alignment = 'Good' | 'Neutral' | 'Evil';

interface Character {
  readonly name: string;
  readonly alignment: Alignment;
  readonly maxHp: number;
  readonly damageTaken: number;
  readonly armorClass: number;
  readonly abilities: AbilityScores.Type;
  readonly experiencePoints: number;
}

type Type = Character;

const Default: Character = {
  name: '',
  alignment: 'Good',
  maxHp: 5,
  armorClass: 10,
  damageTaken: 0,
  abilities: AbilityScores.Default,
  experiencePoints: 0
};

// Lens

const name = Lens.from<Character>().prop('name');
const alignment = Lens.from<Character>().prop('alignment');
const damageTaken = Lens.from<Character>().prop('damageTaken');
const experiencePoints = Lens.from<Character>().prop('experiencePoints');

const maxHp = Lens.of<Character, number>({
  get: (char: Character): number => {
    return AbilityScores.modifier(constitution(char)) + char.maxHp;
  },
  set: (char: Character, value: number): Character => ({
    ...char,
    maxHp: value
  })
});

const armorClass = Lens.of<Character, number>({
  get: (char: Character): number => {
    return char.armorClass + AbilityScores.modifier(dexterity(char));
  },
  set: (char: Character, value: number): Character => ({
    ...char,
    armorClass: value
  })
});

const strength = Lens.from<Character>()
  .prop('abilities')
  .comp(AbilityScores.strength);

const dexterity = Lens.from<Character>()
  .prop('abilities')
  .comp(AbilityScores.dexterity);

const constitution = Lens.from<Character>()
  .prop('abilities')
  .comp(AbilityScores.constitution);

const intelligence = Lens.from<Character>()
  .prop('abilities')
  .comp(AbilityScores.intelligence);

const wisdom = Lens.from<Character>()
  .prop('abilities')
  .comp(AbilityScores.wisdom);

const charisma = Lens.from<Character>()
  .prop('abilities')
  .comp(AbilityScores.charisma);

// Helper functions

const _adjustCurrentHp = (char: Character, change: number): Character => {
  const currentDmg = damageTaken(char);

  return damageTaken.set(char, currentDmg - change);
};

function adjustCurrentHp(change: number): (char: Character) => Character;
function adjustCurrentHp(char: Character, change: number): Character;
function adjustCurrentHp(changeOrChar: Character | number, change?: number) {
  if (change === undefined) {
    return function(char: Character) {
      return _adjustCurrentHp(char, <number>changeOrChar);
    };
  } else {
    return _adjustCurrentHp(<Character>changeOrChar, change);
  }
}

const _adjustExperiencePoints = (
  char: Character,
  change: number
): Character => {
  const currentXp = experiencePoints(char);

  return experiencePoints.set(char, currentXp + change);
};

function adjustExperiencePoints(change: number): (char: Character) => Character;
function adjustExperiencePoints(char: Character, change: number): Character;
function adjustExperiencePoints(changeOrChar: Character | number, change?: number) {
  if (change === undefined) {
    return function(char: Character) {
      return _adjustExperiencePoints(char, <number>changeOrChar);
    };
  } else {
    return _adjustExperiencePoints(<Character>changeOrChar, change);
  }
}

const currentHp = (char: Character): number => {
  const dmgTaken = damageTaken(char);

  return maxHp(char) - dmgTaken;
};

export {
  Type,
  Default,
  name,
  alignment,
  maxHp,
  currentHp,
  armorClass,
  adjustCurrentHp,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  experiencePoints,
  adjustExperiencePoints
};
