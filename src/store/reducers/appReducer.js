import actionTypes from "../actions/actionTypes";

const initState = {
    homeData: [],
    test: 'Hello'
}

const appReducer = (state = initState, action) =>{
    //type: name action
    // action: post from view
    switch (action.type) {
        case actionTypes.GET_HOME:
            return state
            
    
        default:
            return state
    }
}

export default appReducer