/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default ({postId}) => {

    const [comments, setComments] = useState([]);
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        setComments(res.data)
    }
    useEffect(() => {
        fetchData()
    },[])

    const renderedComments = comments.map(e => {
        return <li key={e.id}>{e.comment}</li>
    })
    return <ul>{renderedComments}</ul>
}