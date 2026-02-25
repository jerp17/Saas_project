const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logoutBtn");

// Check login
const isLoggedIn = localStorage.getItem("loggedIn");

if(isLoggedIn !== "true"){
    // Not logged in → go to login page
    window.location.href = "login.html";
}

// Get user
const savedUser = localStorage.getItem("user");

if(savedUser){
    const user = JSON.parse(savedUser);
    welcome.innerText = "Welcome " + user.name;
}
logoutBtn.addEventListener("click", () => {

    // Remove login status
    localStorage.removeItem("loggedIn");

    // Go back to login page
    window.location.href = "login.html";
});
function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}