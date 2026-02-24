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