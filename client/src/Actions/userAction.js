import axios from "axios";

//USER ACTIONS
//For Register user
export const register_user = (values) => dispatch => {
    return (
       axios.post(`/signUp`, values)
            .then(() => {
                    dispatch({ type: "REGISTER_USER", payload: values })
                    alert("Registration Successful");                    
                    //console.log("register done", values);
                    })
                    .catch(error => {
                        alert("Invalid Registration")
                        console.log('error', error);
                    })        
    )
}

//For Login User
export const login_User = (values) => dispatch => {
    return (
        axios.post(`/signIn`, values)
            .then((res) => {                
                alert("Login Successful");
                dispatch({ type: "LOGIN_USER", payload: res.data })
                })
                .catch(error => {
                alert("Invalid Credentials")
                console.log('error', error);
            })
    )
}

//For Get userData and Pagination
export const get_User = (page) => dispatch => {
    return (
    axios.get(`/getUser/page=${page}/getData`)
        .then(res => {
            const getUserData = res.data;
            //console.log("getUserData", getUserData);
            dispatch({ type: "GET_USER" , payload: getUserData })            
        })
        .catch(error => {
            console.log("error", error);            
        })
    )
}

//For Ascending Order
export const sorting_asc = (page) => dispatch => {
    return (
        axios.get(`/getUser/page=${page}/asc`)
        .then(res => {
            const getUserData = res.data;
            //console.log("getUserData", getUserData);
            dispatch({ type: "SORT_ASC" , payload: getUserData })            
        })
        .catch(error => {
            console.log("error", error);            
        })
    )
}

//For Descending Order
export const sorting_dsc = (page) => dispatch => {
    return (
        axios.get(`/getUser/page=${page}/dsc`)
        .then(res => {
            const getUserData = res.data;
            //console.log("getUserData", getUserData);
            dispatch({ type: "SORT_DSC" , payload: getUserData })            
        })
        .catch(error => {
            console.log("error", error);            
        })
    )
}

//For Search User
export const search_Field = (page,searchTerm) => dispatch => {
    return (
        axios.get(`/getUser/page=${page}/${searchTerm}`)
        .then(res => {
            const getUserData = res.data;
            //console.log("searchDta", getUserData);
            dispatch({ type: "SEARCH_FIELD" , payload: getUserData })            
        })
        .catch(error => {
            console.log("error", error);            
        })
    )
}

//For Edit User
export const edit_User = (id) => dispatch => {
    return (
        axios.get(`/editUser/${id}`)
            .then(res => {
                const editUserData = res.data;
                //console.log("editData", editUserData);
                dispatch({type: "EDIT_USER", payload:editUserData})
            })
            .catch(error => {
            console.log("error", error);
        })
    )
}


//For Update User
export const update_User = (id, values) => dispatch => {
    return (
        axios.put(`/updateUser/${id}`, values)
            .then(res => {
                const updateUserData = res.data;
                //console.log(updateUserData);
                dispatch({ type: "UPDATE_USER", payload: updateUserData })
            })
            .catch(error => {
                console.log("error", error);
            })
    )
}

//For Delete User
export const delete_User = (id) => dispatch => {
    return (
        axios.delete(`/deleteUser/${id}`)
        .then(res => {
                const userData = res.data;
                dispatch({ type: "DELETE_USER", payload: userData })
            })
            .catch(error => {
                console.log("error", error);
            })
    )
}

//For Logout User
export const logout_User = () => dispatch => {
    return (
        axios.get(`/logout`)
        .then(res => {
                const userData = res.data;
                dispatch({ type: "LOGOUT_USER", payload: userData })
            })
            .catch(error => {
                console.log("error", error);
            })
    )
}

