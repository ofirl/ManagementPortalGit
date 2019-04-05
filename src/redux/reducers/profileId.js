import { SET_PROFILE } from '../actions';

const initialState = -1;

export default function profileId(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE:
            return action.profileId;
        default:
            return state;
    }
}