const BASE_URL = "http://localhost:7000";

// USERS
async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  const users = await res.json();

  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.email}`;
    list.appendChild(li);
  });
}

// POSTS
async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  const posts = await res.json();

  const list = document.getElementById("postList");
  list.innerHTML = "";

  posts.forEach(post => {
    const li = document.createElement("li");
    li.textContent = post.title;
    list.appendChild(li);
  });
}
async function createUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email })
  });

  fetchUsers(); // refresh list
}

async function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const userId = document.getElementById("userId").value;

  await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content, userId })
  });

  fetchPosts(); // refresh list
}