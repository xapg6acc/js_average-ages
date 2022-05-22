'use strict';

const avarageDifference = (x) => {
  return x.reduce((sum, age) => sum + age, 0) / x.length;
};

const calculate = (person) => {
  const personAges = person.map(x => x.died - x.born);

  return avarageDifference(personAges);
};

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menAvarage = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  );

  return calculate(menAvarage);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenAvarage = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name) && person.sex === 'f'
      : person.sex === 'f'
  );

  return calculate(womenAvarage);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenAvarage = people.filter(person =>
    onlyWithSon
      ? people.some(mother => person.mother === mother.name)
        && person.sex === 'm'
      : people.some(mother => person.mother === mother.name)
  );

  const childrenAges = childrenAvarage.map(child =>
    child.born - (people.find(mother => mother.name === child.mother)).born
  );

  return avarageDifference(childrenAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
