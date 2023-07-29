const postsBlock = document.querySelector('.posts');
export { postsBlock };

import { setLikes } from './js/Likes.js';
setLikes();
import { setComment } from './js/Comment.js';
setComment();
import { postGeneration } from './js/PostsGeneration.js';
postGeneration();
import { createNewPost } from './js/CreatePost.js';
createNewPost();