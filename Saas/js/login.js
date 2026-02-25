const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const btn = document.getElementById("loginBtn");
const message = document.getElementById("loginMessage");

btn.addEventListener("click", () => {

    const email = emailInput.value;
    const password = passwordInput.value;

    const savedUser = localStorage.getItem("user");

    if(!savedUser){
        message.innerText = "No user found. Please signup.";
        message.style.color = "red";
        return;
    }

    const user = JSON.parse(savedUser);

    if(email === user.email){
    message.innerText = "Login Successful!";
    message.style.color = "green";

    // Save login status
    localStorage.setItem("loggedIn", "true");

    // Redirect to dashboard
    window.location.href = "Saas/html/dashboard.html";
}


});
