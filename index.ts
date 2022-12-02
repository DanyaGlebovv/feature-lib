import { init, isFeatureAvailableForUser } from './src';

init({
  criterias: [
    {
      id: 'criteria1',
      check: (user: any, value: any) => user.id === value,
    },
    {
      id: 'criteria2',
      check: (user: any, value: any) => user.name === value,
    },
  ],
  features: [{ id: 'feature', criteria: [{ criteria1: 1, criteria2: 'Name' }] }],
});

console.log(isFeatureAvailableForUser('feature', { id: 1, name: 'Test' })); // False
console.log(isFeatureAvailableForUser('feature', { id: 1, name: 'Name' })); // True
