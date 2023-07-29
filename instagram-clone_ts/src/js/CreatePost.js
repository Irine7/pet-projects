import { postGeneration, postHTMLGenerate } from './PostsGeneration.js';
postGeneration();

export function createNewPost() {
// Create new post
const createNewPost = document.querySelector('.new-post-button');
const modal = document.querySelector('.modal__wrapper');

const modalElements = {
	text: document.querySelector('.modal__text'),
	img: document.querySelector('#link'),
	hashtag: document.querySelector('#hashtag'),
	saveBtn: document.querySelector('.modal__btn')
}

// Open modal window if clicked on New Post button
createNewPost.addEventListener('click', () => {
	if (modal.classList.contains('hidden')) {
		modal.classList.remove('hidden');
	}
})

// Close modal window if clicked outside it
modal.addEventListener('click', (event) => {
	if (event.target.classList.contains('modal__wrapper')) {
		closeAndClearModal();
	}
})

// Close and clear modal window and its forms
function closeAndClearModal() {
	modal.classList.add('hidden');
	modalElements.text.value = '';
	modalElements.img.value = '';
	modalElements.hashtag.value = '';
}

// Save new post in modal window
modalElements.saveBtn.addEventListener('click', () => {
	if (doesHaveErrors()) return;
	buildNewPostHTML(modalElements.img.value);
	closeAndClearModal();
})

// Check form for errors
function doesHaveErrors() {
	let isError= false;
	modalElements.text.classList.remove('modal__error');
	modalElements.img.classList.remove('modal__error');

	if (!modalElements.text.value) { // if it is empty
		modalElements.text.classList.add('modal__error');
		isError = true;
	}
	if (!modalElements.img.value) {
		modalElements.img.classList.add('modal__error');
		isError = true;
	}
	return isError;
}

// Create HTML code for a new post
function buildNewPostHTML(postAvatarUrl) {
	const postsBlock = document.querySelector('.posts');
	const lastColumn = document.querySelector('.posts > div:last-child');
	const lastColumnPosts = lastColumn.querySelectorAll('.post');
	const lastPostIndex = lastColumnPosts.length - 1;
	const isHorizontalLastPost = lastColumnPosts[lastPostIndex].classList.contains('post_horizontal');
	const isHorizontalNewPost = lastColumnPosts.length < 2 ? !isHorizontalLastPost : isHorizontalLastPost;
	const postHTML = postHTMLGenerate(postAvatarUrl, 'https://i.pravatar.cc/240', isHorizontalNewPost);

	if (lastColumnPosts.length > 1) {
		const newColumn = document.createElement('div');
		newColumn.appendChild(postHTML);
		postsBlock.appendChild(newColumn);
	} else {
		lastColumn.appendChild(postHTML);
	}
}
}