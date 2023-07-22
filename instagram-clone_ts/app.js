// Likes
{
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

// Posts generation and render
{
const defaultPostData = {
	img: 'https://picsum.photos/350/570?grayscale?id=',
	user: {
		avatar: 'https://i.pravatar.cc/240?img=',
		nickname: '@jane_doe'
	}
}

// Posts generation function
function postGenerator(postCount = 1) {
	const posts = [];
	let isHorizontal = false;

	for (let i = 1; i <= postCount; i++) {
		// First post data
		const postImg = defaultPostData.img + i;
		const userPhoto = defaultPostData.user.avatar + i;
		const post = postHTMLGenerate(postImg, userPhoto, isHorizontal);

		// Second post data
		const postImg2 = defaultPostData.img + i + 1;
		const userPhoto2 = defaultPostData.user.avatar + i +1;
		const post2 = postHTMLGenerate(postImg2, userPhoto2, !isHorizontal);

		// Create post's column
		const postsColumn = document.createElement('div');
		postsColumn.append(post);
		postsColumn.append(post2);

		posts.push(postsColumn);

		isHorizontal = !isHorizontal;
	}

	return posts;
}

function postHTMLGenerate(postImg, userPhoto, isHorizontal) {
	// Create div with a class 'post'
	const post = document.createElement('div');
	post.className = isHorizontal ? 'post post_horizontal' : 'post';
	post.innerHTML = `
		<div class="post__img">
			<img src="${postImg}" alt="">
		</div>
		<div class="post__footer">
			<div class="post__user">
				<div class="user user__row">
					<div class="user__avatar">
						<img src="${userPhoto}" alt="avatar">
					</div>
					<div class="user__nickname">@jane_doe</div>
				</div>
			</div>
			<div class="post__actions">
				<div class="post__action">
					<i class="insta_like"></i>
				</div>
				<div class="post__action">
					<i class="insta_comment"></i>
				</div>
				<div class="post__action">
					<i class="insta_message"></i>
				</div>
			</div>
		</div>
	`;
	return post;
}

const GeneratedPosts = postGenerator(6);

const postsBlock = document.querySelector('.posts');
postsBlock.innerHTML = '';
postsBlock.append(...GeneratedPosts);
}

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
});

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
	console.log(lastColumnPosts);

	if (lastColumnPosts.length > 1) {
		const newColumn = document.createElement('div');
		newColumn.appendChild(postHTML);
		postsBlock.appendChild(newColumn);
	} else {
		lastColumn.appendChild(postHTML);
	}
}