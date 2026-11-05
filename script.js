const postInput = document.getElementById("postInput");
const publishBtn = document.getElementById("publishBtn");
const postsContainer = document.getElementById("postsContainer");
const charCount = document.getElementById("charCount");

let posts = JSON.parse(localStorage.getItem("posts")) || [

    {
        id: 1,
        name: "Aarav Sharma",
        text: "Starting my day with positive energy! What are your plans today?",
        likes: 3,
        liked: false,
        comments: ["Have a great day!"]
    },

    {
        id: 2,
        name: "Maya Verma",
        text: "Learning something new every day is the best investment.",
        likes: 5,
        liked: false,
        comments: []
    }

];


// Save posts in Local Storage

function savePosts() {

    localStorage.setItem("posts", JSON.stringify(posts));

}


// Display all posts

function displayPosts() {

    postsContainer.innerHTML = "";

    if (posts.length === 0) {

        postsContainer.innerHTML = "<p>No posts available. Create your first post!</p>";

        return;

    }

    posts.forEach((post) => {

        const postCard = document.createElement("div");

        postCard.className = "post-card";

        postCard.innerHTML = `

            <div class="post-header">

                <div class="avatar">
                    ${post.name[0].toUpperCase()}
                </div>

                <div>
                    <h4>${escapeHTML(post.name)}</h4>
                    <small>Just now</small>
                </div>

            </div>

            <p class="post-text">${escapeHTML(post.text).replace(/\n/g, "<br>")}</p>

            <div class="post-actions">

                <button
                    class="like-btn ${post.liked ? "liked" : ""}"
                    onclick="likePost(${post.id})"
                >
                    ${post.liked ? "♥ Liked" : "♡ Like"} (${post.likes})
                </button>

                <button onclick="focusComment(${post.id})">
                    💬 Comment (${post.comments.length})
                </button>

            </div>

            <div class="comments">

                ${post.comments.map(comment => `
                    <div class="comment">${escapeHTML(comment)}</div>
                `).join("")}

            </div>

            <div class="comment-box">

                <input
                    type="text"
                    id="comment-${post.id}"
                    placeholder="Write a comment..."
                    maxlength="200"
                >

                <button onclick="addComment(${post.id})">
                    Send
                </button>

            </div>

        `;

        postsContainer.appendChild(postCard);

    });

}


// Prevent HTML injection

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// Create a new post

function createPost() {

    const text = postInput.value.trim();

    if (text === "") {

        alert("Please write something before publishing!");

        return;

    }

    const newPost = {

        id: Date.now(),

        name: "You",

        text: text,

        likes: 0,

        liked: false,

        comments: []

    };

    posts.unshift(newPost);

    savePosts();

    displayPosts();

    postInput.value = "";

    charCount.textContent = "0 / 500";

}


// Publish button

publishBtn.addEventListener("click", createPost);


// Character counter

postInput.addEventListener("input", () => {

    charCount.textContent = `${postInput.value.length} / 500`;

});


// Like and Unlike posts

function likePost(id) {

    const post = posts.find(post => post.id === id);

    if (!post) return;

    if (post.liked) {

        post.likes--;

        post.liked = false;

    } else {

        post.likes++;

        post.liked = true;

    }

    savePosts();

    displayPosts();

}


// Focus comment input

function focusComment(id) {

    const input = document.getElementById(`comment-${id}`);

    input.focus();

}


// Add comments

function addComment(id) {

    const input = document.getElementById(`comment-${id}`);

    const commentText = input.value.trim();

    if (commentText === "") {

        alert("Please write a comment!");

        return;

    }

    const post = posts.find(post => post.id === id);

    if (!post) return;

    post.comments.push(commentText);

    savePosts();

    displayPosts();

}


// Initial rendering

displayPosts();