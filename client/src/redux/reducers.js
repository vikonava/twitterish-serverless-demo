import {
  AUTH_SUCCEEDED,
} from './actions';

const initialState = {
  signedIn: false,
};

const Reducers = (state = initialState, { data, type }) => {
  const newState = Object.assign({}, state);

  switch(type) {
    case AUTH_SUCCEEDED:
      newState.signedIn = data.value;
      return newState;

    default:
      return state;
  };
}

const reducers = { twitterApp: Reducers };

export default Reducers;
