import { postsBlock } from '../app.js';

export function setComment() {
	const modalComment = document.querySelector('.modal__wrapper_comment');
	const modalCommentText = document.querySelector('.modal__text_comment');
	const saveBtnComment = document.querySelector('.modal__btn_comment');
	
	// Open modal window if clicked on Comment
	postsBlock.addEventListener('click', () => {
		// Check if the clicked item was a comment one
		if (modalComment.classList.contains('hidden')) {
			modalComment.classList.remove('hidden');
		}
	})

	// Close modal window if clicked outside it
	modalComment.addEventListener('click', (event) => {
		if (event.target.classList.contains('modal__wrapper_comment')) {
			modalComment.classList.add('hidden');
			modalCommentText.value = '';
		}
	})

	// Save new comment in modal window
	saveBtnComment.addEventListener('click', () => {
		if (doesHaveErrors()) return;
		modalComment.classList.add('hidden');
		modalCommentText.value = '';
		console.log('clicked');
	})

	// Check form for errors
	function doesHaveErrors() {
	let isError= false;
	modalCommentText.classList.remove('modal__error');

	if (!modalCommentText.value) { // if it is empty
		modalCommentText.classList.add('modal__error');
		isError = true;
	}
	return isError;
}
}