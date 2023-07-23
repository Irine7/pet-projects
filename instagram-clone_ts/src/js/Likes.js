export function setLikes() {
	const postsBlock = document.querySelector('.posts');
	
	// Event delegation to a parent node with a class '.post'
	postsBlock.addEventListener('click', (event) => {
		// Check if the clicked item was a heart one
		const target = event.target;
		const isLikeClicked = target.classList.contains('insta_like') || target.classList.contains('insta_like_fill');
	
		// Put/remove 'like' if the clicked item was a heart one
		if (isLikeClicked) {
			const parent = target.parentNode;
			if (parent.classList.contains('active')) {
				parent.classList.remove('active');
				parent.innerHTML = '<i class="insta_like"></i>';
			} else {
				parent.classList.add('active');
				parent.innerHTML = '<i class="insta_like_fill"></i>';
			}
		}
	})
}