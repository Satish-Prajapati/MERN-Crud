import React, { useState, useEffect } from 'react';
import {useLocation, Link} from "react-router-dom";
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const apiUrl = 'http://localhost:4000/api/person'
let id

export default function Edit({updateUser,addUser}) {

    const [personDetail, setPersonDetail] = useState({})
    let query = useQuery();
    useEffect(() => {
        id = query.get("id")
        id && axios.get(`${apiUrl}/${id}`)
        .then(res => {
            const details = res.data
            setPersonDetail(details)
        })
    }, [])

    return (
        <>
        <Link to="/">
           <button className="btn btn-success my-2">Home</button>
        </Link>
            <form onSubmit={id ? (e) => updateUser(e,id) : addUser} className='pt-4'>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="First Name" name='firstName' onChange={(e) => setPersonDetail({firstName: e.target.value})} value={personDetail.firstName} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Last Name" name='lastName' onChange={(e) => setPersonDetail({lastName: e.target.value})} value={personDetail.lastName} required/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <input type="number" className="form-control" placeholder="Age" name='age' onChange={(e) => setPersonDetail({age: e.target.value})} value={personDetail.age} required />
                    </div>
                    <div className="col">
                        <input type="email" className="form-control" placeholder="Email" name='email' onChange={(e) => setPersonDetail({email: e.target.value})} value={personDetail.email} required />
                    </div>
                </div>
                <div className='text-center pt-3'>
                    <input type="submit" className='btn btn-primary' value={id ? "Edit Person" : 'Add Person'}/>
                </div>
            </form>
        </>
    )
}
