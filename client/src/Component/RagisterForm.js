import React from 'react';
import { useFormik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import queryString from 'query-string';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register_user, edit_User, update_User, } from '../Actions/userAction';


const RegForm = () => {
    //Get Edited User Id
    const { id } = queryString.parse(window.location.search);

    //For Navigate Page
    const history = useHistory();

    //For store the Edited User Data
    const [setEmployee] = useState([])

    //Dispatch the Api Request
    const dispatch = useDispatch();

    //Get responce of the Api Requeste
    const userList = useSelector(state => state.userList)

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            profession: "",
            salary1: "",
            salary2: "",
            salary3:"",
            totalsalary: "",
            email: "",
            password: "",
            confirmpassword: "",
        },

        onSubmit: (values) => {
            if (id) {
                dispatch(update_User(id, values))
                history.push('/dashbord')

                // for add new User
            } else {
                dispatch(register_user(values))
                history.push('/loginpage')
                formik.handleReset()
            }            
        }         
    });
    
    // get selectedEdit object
    useEffect(() => {
        if (id) {
            dispatch(edit_User(id))
            setEmployee(userList)
        }
    }, [])
    

    //set update values
    useEffect(() => {
        if (id && userList) {
            formik.setValues(userList)
        }
    }, [userList,useEffect])

    return (
        <>
            <div>
                    <h1>Registration Form</h1>                    
                <form onSubmit={formik.handleSubmit}>                    
                    <input type="text"
                        name="name"
                        placeholder='Enter Employee Name'
                        onChange={formik.handleChange}
                        value={formik.values.name} required
                    /><br />
                    
                    <input type="number"
                        name="phone"
                        placeholder='Enter phone'
                        onChange={formik.handleChange}
                        value={formik.values.phone} required
                    /><br />
                    
                    <input type="text"
                        name='profession'
                        placeholder='Enter Profession'
                        onChange={formik.handleChange}
                        value={formik.values.profession} required
                    /><br />
                    
                    <input type="number"
                        name='salary1'
                        placeholder='Enter salary'
                        onChange={formik.handleChange}
                        value={formik.values.salary1} required
                    /><br />

                    <input type="number"
                        name='salary2'
                        placeholder='Enter salary'
                        onChange={formik.handleChange}
                        value={formik.values.salary2} required
                    /><br />

                    <input type="number"
                        name='salary3'
                        placeholder='Enter salary'
                        onChange={formik.handleChange}
                        value={formik.values.salary3} required
                    /><br />
                    
                    <input type="text"
                        name='email'
                        placeholder='Enter Email'
                        onChange={formik.handleChange}
                        value={formik.values.email} required
                    /><br />
                    
                    <input type="password"
                        name='password'
                        placeholder='Enter password'
                        onChange={formik.handleChange}
                        value={formik.values.password} required
                    /><br />
                    
                    <input type="password"
                        name='confirmpassword'
                        placeholder='Enter confirm password'
                        onChange={formik.handleChange}
                        value={formik.values.confirmpassword} required
                    /><br />

                     {!id ? (
                       <button className='signIn' type='submit'>Submit</button> ) :

                            (<button className='signIn' type='update'>Update</button>)} 
                    
                    <button onClick={formik.handleReset} className='cancel' type='reset'>Cancel</button>
                </form><br/>
                <div className=''>
                    <p>already registered <NavLink to='/loginpage'>Login</NavLink></p>                    
                </div>
            </div>
        </>
    )
}

export default RegForm



