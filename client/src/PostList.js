import React, {useState, useEffect} from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts');
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    },[]);

    const renderedPosts = Object.values(posts).map(post => {
        return <div key={post.id} className="card col-4 ">
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList postId={post.id}/>
                <CommentCreate postId={post.id}/>
                
            </div>
        </div>
    })
    return <div className="row col-12 d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>;
}