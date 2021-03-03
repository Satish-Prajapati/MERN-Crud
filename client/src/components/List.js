import React from 'react'
import {Link} from "react-router-dom";

export default function List({users, deleteUser}) {
    return (
        <>
                <div className="row pt-4">
                    <Link to="/addedit">
                        <button className="btn btn-success my-2">Add New Person</button>
                    </Link>                  
                    <div className="col-12">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>
                                <Link to={`/view?id=${user._id}`}><button type="button" className="btn btn-primary mx-1">View</button></Link>
                                <Link to={`/add-edit?id=${user._id}`}><button type="button" className="btn btn-success mx-1">Edit</button></Link>
                                <button type="button" className="btn btn-danger mx-1" onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
        </>
    )
}
