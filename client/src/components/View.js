import React, { useState, useEffect } from 'react';
import {useLocation, Link} from "react-router-dom";
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const apiUrl = 'http://localhost:4000/api/person'

export default function View() {
    const [personDetail, setPersonDetail] = useState({})
    let query = useQuery();
    useEffect(() => {
        const id = query.get("id")
        axios.get(`${apiUrl}/${id}`)
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
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{personDetail.firstName}</td>
                        <td>{personDetail.lastName}</td>
                        <td>{personDetail.age}</td>
                        <td>{personDetail.email}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
