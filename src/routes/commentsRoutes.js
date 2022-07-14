

 const router = require('../core/routeConfig')
 const comment = require('../models/comment')
 // check token
 const hasToken = require('../core/userAuth')
const mongoose = require('mongoose')
// creating comments

router.get('/:postId/comments', hasToken, async (req,res)=>{
    console.log(req.params.postId);
    const comments = await comment.find({
        post:mongoose.Types.ObjectId(req.params.postId)
    }).populate('collectionName createdBy')
    console.log(comments);
  res.send(comments) 
})

router.post('/:postId/comments',hasToken,(req,res)=>{

    const comments = new comment({
        post: req.params.postId, 
        text: req.body.text,
        likes: req.body.likes,
        createdBy: req.decoded
    })
    comments.save()
   res.send(comments) 
})


module.exports = router 