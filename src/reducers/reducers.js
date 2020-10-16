import { SAVE_LAUNCH_DETAILS, YEAR_SPECIFIC_DATA, LOAD_SPINNER } from '../actions/actions';
import {fromJS} from 'immutable';
import {fetchRocketData, fetchYears} from '../utils/commons';

const initialState = fromJS({
    completeData: [],
});

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_LAUNCH_DETAILS:{
        console.log('Inside save details reducers:-', action.data, action.type)

        return state.withMutations((stateMap)=>{
            stateMap.set('completeData', fromJS(fetchRocketData(action.data)))
                    .set('years', fromJS(fetchYears(action.data)))

        })
      };

    case YEAR_SPECIFIC_DATA: {
        console.log('Inside fetch years reducers:-', action.data, action.type)
        return state.update('completeData', () => fromJS(fetchRocketData(action.data)))
        //return state;
    }

    case LOAD_SPINNER: {
      console.log('Inside fetch years reducers:-', action.data, action.type)
      return state.set('spinner', action.data);
      //return state;
  }

    default:
      return state;
  }
}

export default rootReducer;