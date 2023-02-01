/* eslint-disable import/no-anonymous-default-export */
import react, { useState } from 'react';
import axios from 'axios';
export default ({postId}) => {

    const [content, setContent] = useState('');

    const onNewSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
            comment: content
        })
        setContent('')
    }

    return <div>
        <form onSubmit={onNewSubmit}><div className='form-group'>
        <label>New Comment</label>
        <input value={content} onChange={e => setContent(e.target.value)} className='form-control' />
        </div><button className='btn btn-primary'>Submit</button>
        </form>
        </div>
}