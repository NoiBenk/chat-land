const supabaseUrl = "https://zeggxkkracfewofebacg.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_I5mGWcZ5y0RGTpi9trPXOA_swKDOopK";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// LOGIN
async function login() {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value.trim();

    if (!username) {
        alert("Enter a username");
        return;
    }

    // Insert into database
    const { error } = await supabase
        .from("users")
        .insert([{ username }]);

    if (error) {
        alert("Error: " + error.message);
        return;
    }

    localStorage.setItem("currentUser", username);
    showApp();
}

// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

// SHOW APP
function showApp() {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) return;

    document.getElementById("login-box").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("currentUser").innerText = currentUser;

    renderUsers();
}

// LOAD USERS
async function renderUsers() {
    const { data, error } = await supabase
        .from("users")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    data.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user.username;
        userList.appendChild(li);
    });
}

// AUTO LOGIN
showApp();
