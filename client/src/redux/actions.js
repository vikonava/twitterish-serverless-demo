const namespace = 'TWITTERAPP';

export const AUTH_SUCCEEDED = `${namespace}/AUTH_SUCCEEDED`;

export function userLoggedIn(value = false) {
  return {
    data: { value },
    type: AUTH_SUCCEEDED,
  };
}
