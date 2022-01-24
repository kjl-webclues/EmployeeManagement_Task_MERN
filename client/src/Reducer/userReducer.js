const initialState = {
    userData: [],
    userState: false,
    userList: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_USER":
            return {
                ...state
            }
        
        case "LOGIN_USER":
            return {
                ...state, 
                userData: action.payload,
                userState: true
            }
        
        case "GET_USER":
            return {
                ...state,
                userData: action.payload,
                userState: true
            }
        
        case "EDIT_USER":
            return {
                ...state,
                userList: action.payload
            }
        
        case "UPDATE_USER":
            return {
                ...state,                
                userList: action.payload
            }
        
        case "DELETE_USER":
            return {
                ...state,
                userData: false
            }
        
        case "LOGOUT_USER":
            return {
                ...state,
                userState: false
            }
        default:
            return state
    }
}

export default userReducer;

