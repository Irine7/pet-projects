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
};

// Posts render
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

const GeneratedPosts = postGenerator(6);

const postsBlock = document.querySelector('.posts');
postsBlock.innerHTML = '';
postsBlock.append(...GeneratedPosts);