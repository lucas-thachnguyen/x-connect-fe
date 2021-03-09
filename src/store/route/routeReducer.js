import { LOCATION_CHANGE } from 'react-router-redux';

// Initial routing state
const routeInitialState = {
    location: null,
};

const routeReducer = (state = routeInitialState, action) => {
    switch (action.type) {
      /* istanbul ignore next */
      case LOCATION_CHANGE:
        return {
          ...state,
          location: action.payload
        }
      default:
        return state;
    }
}

export default routeReducer;
