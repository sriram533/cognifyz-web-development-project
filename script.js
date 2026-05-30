const form = document.getElementById("userForm");
const usersList = document.getElementById("usersList");

// Submit form
form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        password: document.getElementById("password").value
    };

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        displayUsers(data.users);
        form.reset();
    } else {
        alert(data.message);
    }
});

// Display users
function displayUsers(users) {
    usersList.innerHTML = "";

    users.forEach(user => {
        usersList.innerHTML += `
            <p>${user.name} - ${user.email} - ${user.age}</p>
        `;
    });
}

// Load existing users
async function loadUsers() {
    const response = await fetch("/api/users");
    const users = await response.json();

    displayUsers(users);
}

loadUsers();
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.textContent = taskInput.value;

    taskList.appendChild(li);

    taskInput.value = "";
}