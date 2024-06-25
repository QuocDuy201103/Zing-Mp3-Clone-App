import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    remixMusic: {},
    seasonSong: {},
    chillSong: {},
    top100: {},
    albumHot: {},
    isLoading: false
    
}

const appReducer = (state = initState, action) =>{
    //type: name action
    // action: post from view
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                remixMusic: action.homeData?.find(item => item.sectionId === 'hEditorTheme3') || {},
                seasonSong: action.homeData?.find(item => item.sectionId === 'hSeasonTheme') || {},
                chillSong: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                albumHot: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
            }
        case actionTypes.LOADING:
            return{
                ...state,
                isLoading: action.flag
            }
            
    
        default:
            return state
    }
}

export default appReducer