import React, {useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_User, delete_User} from '../Actions/userAction';
import { Pagination } from '@material-ui/lab';
import  debounce  from 'lodash.debounce';

const Dashbord = () => {

    //For Searching
    const [request, setRequest] = useState('asc');

    //For Pagination
    const [page, setPage] = useState(1);

    //For Dispatch Action Api 
    const dispatch = useDispatch();

    //For Maping Data
    const userData = useSelector(state => state.userData);

    //For Navigate Page
    const history = useHistory();

    //For Delete User Api
    const deleteUser = (id) => {        
        dispatch(delete_User(id))
        window.location.reload();
        history.push('/registerpage')
    }

    //For Get Request
    useEffect(() => {
        dispatch(get_User(page,request))    
    }, [page, request, dispatch])
    
    //For Searching
    const handleSearch = debounce((value) => {
        setRequest(value)
    }, 500)   

    return (        
        <> 
            <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 my-1 text-center'>
                            <h1> Welcome to Dashbord</h1>            
                        </div>
                    </div>                    
            </div>
            <div className='searchbar'>
                <input type="text"  onChange={(e) => handleSearch(e.target.value)} />
            </div>
            <div>                    
                <button onClick={() => setRequest("asc")}>Ascending</button>&nbsp;
                <button onClick={() => setRequest("dsc")}>Decsending</button>
            </div> 
            
            <hr />

            <div className='col-md-12  mx-auto'>
                        <table className='table table-hover'>
                                <thead className='text-black text-center'>
                                    <tr>                                        
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Phone</th>
                                        <th scope='col'>Profession</th>
                                        <th scope='col'>Salary1st</th>
                                        <th scope='col'>Salary2nd</th>
                                        <th scope='col'>Salary3rd</th>
                                        <th scope='col'>TotalSalary</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Password</th>
                                        <th scope='col'>Confirmpassword</th>
                                        <th scope='col'>Action</th>                                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((elem) => {
                                        return (
                                            <tr key={elem._id}>                                        
                                                <td>{elem.name}</td>
                                                <td>{elem.phone}</td>
                                                <td>{elem.profession}</td>
                                                <td>{elem.salary1}</td>
                                                <td>{elem.salary2}</td>
                                                <td>{elem.salary3}</td>
                                                <td>{elem.salary1 + elem.salary2 + elem.salary3}</td>
                                                <td>{elem.email}</td>
                                                <td>{elem.password}</td>
                                                <td>{elem.confirmpassword}</td>
                                                <td><NavLink to={`/editUser/:?id=${elem._id}`}><button className='editbtn'>Edit</button></NavLink> &nbsp;
                                                <button className='deletebtn' onClick={() => deleteUser(elem._id)} >Delete</button></td>                                                        
                                            </tr> 
                                        )
                                    })}
                                </tbody>
                        </table>
                        <Pagination
                        count={3}
                        variant='outlined'
                        color='secendory'
                        onChange={(event, value) => { setPage(value) }}
                        />
            </div>
        </>
    )
}
export default Dashbord