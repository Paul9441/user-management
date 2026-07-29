function getting_user_data() {
    alert("it working ")

    const username = document.getElementById("username").value;
    const fullName = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    alert(password)

  
    const csrfToken = document.querySelector(
        "[name=csrfmiddlewaretoken]"
    ).value;

    const formData = new FormData();

    formData.append("username", username);
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    debugger;
    fetch("/register/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrfToken
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {

        console.log(data);

        if (data.status === "success") {

            alert("User registered successfully.");

            document.getElementById("registerForm").reset();

            window.location.href = "/login/";

        } else {
            alert(data.message || "User registration failed.");
        }
    })
    .catch(error => {
        console.error("Registration Error:", error);
        alert("Something went wrong.");
    });
}