export const PAGE_SIZE = 10;

export const ONE_OPERATOR_FORM = [
  {
    name: 'a',
    label: 'a operator',
    type: 'number',
    inputProps: { inputMode: 'numeric', pattern: '[0-9]*' },
  },
];

export const TWO_OPERATOR_FORM = [
  ...ONE_OPERATOR_FORM,
  {
    name: 'b',
    label: 'b operator',
    type: 'number',
    inputProps: { inputMode: 'numeric', pattern: '[0-9]*' },
  },
];

export const OPERATION_FORM_MAP = {
  addition: TWO_OPERATOR_FORM,
  subtraction: TWO_OPERATOR_FORM,
  multiplication: TWO_OPERATOR_FORM,
  division: TWO_OPERATOR_FORM,
  'square-root': ONE_OPERATOR_FORM,
  'random-string': [],
};

export const ONE_OPERATOR_INITIAL_VALUES = {
  a: 0,
};

export const TWO_OPERATOR_INITIAL_VALUES = {
  ...ONE_OPERATOR_INITIAL_VALUES,
  b: 0,
};

export const OPERATION_INITIAL_VALUES_MAP = {
  addition: TWO_OPERATOR_INITIAL_VALUES,
  subtraction: TWO_OPERATOR_INITIAL_VALUES,
  multiplication: TWO_OPERATOR_INITIAL_VALUES,
  division: TWO_OPERATOR_INITIAL_VALUES,
  'square-root': ONE_OPERATOR_INITIAL_VALUES,
  'random-string': {},
};
