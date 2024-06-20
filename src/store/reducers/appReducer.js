import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    fridayMusic: {}
    
}

const appReducer = (state = initState, action) =>{
    //type: name action
    // action: post from view
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                fridayMusic: action.homeData?.find(item => item.sectionId === 'hEditorTheme3') || {},
            }
            
    
        default:
            return state
    }
}

export default appReducer