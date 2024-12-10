export const UN_DIG_STATUS = {
  SUCCESS: 'successUndig',
  FAILURE: 'failUndig',
  PASSWORD_ERROR: 'passwordError',
} as const;

export type UnDigStatus = (typeof UN_DIG_STATUS)[keyof typeof UN_DIG_STATUS];
