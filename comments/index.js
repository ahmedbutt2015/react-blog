const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes} = require('crypto');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments',(req, res) => {
    const comments = commentsByPostId[req.params.id] || []
    res.send(comments);
})
app.post('/events',async (req, res) => {
    console.log("Event Recieved")
    res.send({"As" : "ok"})
});
app.post('/posts/:id/comments',async (req, res) => {
    
    const id = randomBytes(4).toString('hex');
    const {comment} = req.body;
    const comments = commentsByPostId[req.params.id] || []
    console.log(comments)
    comments.push({id, comment})
    commentsByPostId[req.params.id] = comments;


    await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data: {
            id, comment, postId: req.params.id
        }
    })

    res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log("Listening to 4001")
})