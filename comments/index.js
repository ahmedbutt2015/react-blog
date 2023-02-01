const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes} = require('crypto');

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments',(req, res) => {
    const comments = commentsByPostId[req.params.id] || []
    res.send(comments);
})
app.post('/posts/:id/comments',(req, res) => {
    
    const id = randomBytes(4).toString('hex');
    const {comment} = req.body;
    const comments = commentsByPostId[req.params.id] || []
    console.log(comments)
    comments.push({id, comment})
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log("Listening to 4001")
})