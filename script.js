let users = JSON.parse(localStorage.getItem("users")) || [];

function login() {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value.trim();

    if (!username) {
        alert("Enter a username");
        return;
    }

    // Save user if not already in list
    if (!users.includes(username)) {
        users.push(username);
        localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem("currentUser", username);

    showApp();
}

function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

function showApp() {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) return;

    document.getElementById("login-box").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("currentUser").innerText = currentUser;

    renderUsers();
}

function renderUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user;
        userList.appendChild(li);
    });
}

// Auto-login if already signed in
showApp();
