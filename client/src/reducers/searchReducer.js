const intialState = {text: ""}

const searchReducer = (state = intialState, action) => 
{
    switch(action.type) {
        case 'SEARCH_QUERY':
            return {...state, ...action.payload};
        default:
            return state; 
    }
}

export default searchReducer;