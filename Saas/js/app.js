const isLoggedIn = localStorage.getItem("loggedIn");

if(isLoggedIn === "true"){
    window.location.href = "/html/dashboard.html";
}
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btn = document.getElementById("signupBtn");
const message = document.getElementById("message");
const savedUser = localStorage.getItem("user");

/*if(savedUser){
    const user = JSON.parse(savedUser);
    message.innerText = "Welcome " + user.name;
    message.style.color = "green";
}*/

btn.addEventListener("click", () => {

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Validation
    if(name === "" || email === "" || password === ""){
        message.innerText = "All fields are required!";
        message.style.color = "red";
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
    message.innerText = "Enter valid email!";
    message.style.color = "red";
    return;
    }

    if(password.length < 6){
        message.innerText = "Password must be at least 6 characters!";
        message.style.color = "red";
        return;
    }

    // Success
    message.innerText = "Signup Successful!";
    message.style.color = "green";
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    const user = {
    name: name,
    email: email
};

localStorage.setItem("user", JSON.stringify(user));

});