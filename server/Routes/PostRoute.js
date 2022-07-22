import express from 'express';
import { createPost, deletePost, disLikePost, getPost, getTimeLinePosts, likePost, updatePost, userPosts } from '../Controllers/PostController.js';
const router = express.Router()

router.post('/',createPost);
router.get('/:id',getPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.put('/:id/like',likePost);
router.put('/:id/dislike',disLikePost);
router.get('/:id/timeline',getTimeLinePosts);
router.get('/count/:id',userPosts);

export default router;