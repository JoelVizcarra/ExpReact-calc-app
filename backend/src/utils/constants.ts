export const OPERATIONS = {
  buyCredits: 'buy_credits',
  addition: 'addition',
  subtraction: 'subtraction',
  multiplication: 'multiplication',
  division: 'division',
  squareRoot: 'square-root',
  randomString: 'random-string',
};

export type OperationsType = keyof typeof OPERATIONS;
