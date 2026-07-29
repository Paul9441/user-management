function getting_user_data() {
    const username = document.getElementById("username").value.trim();
    const fullName = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Basic frontend validation
    if (!username || !fullName || !email || !password) {
        alert("All fields are required.");
        return;
    }

    const csrfToken = document.querySelector(
        "[name=csrfmiddlewaretoken]"
    ).value;

    const formData = new FormData();

    formData.append("username", username);
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("password", password);

    fetch("/register/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrfToken
        },
        body: formData
    })
    .then(response => {
        // Parse JSON even for 400 responses
        return response.json();
    })
    .then(data => {
        console.log(data);

        if (data.success === true) {
            alert(data.message);

            document.getElementById("registerForm").reset();

            window.location.href = "/login/";
        } else {
            // Display Django error message
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Registration Error:", error);
        alert("Something went wrong. Please try again.");
    });
}

// function getting_user_credentials() {

//     alert("Login button clicked!");

//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value;

//     if (!username || !password) {
//         alert("Please enter username and password.");
//         return;
//     }

    
//     const csrfToken = document.querySelector(
//         "[name=csrfmiddlewaretoken]"
//     ).value;

//     const formData = new FormData();

//     formData.append("username", username);
//     formData.append("password", password);
   
//     fetch("/login/", {
//         method: "POST",
//         headers: {
//             "X-CSRFToken": csrfToken
//         },
//         body: formData
//     })
//     .then(response => {
//         // Parse JSON even for 400 responses
//         return response.json();
//     })
    
// }

function getting_user_credentials() {
 debugger;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Validate fields
    if (!username || !password) {
        alert("Please enter username and password.");
        return;
    }

    // Get CSRF token
    const csrfElement = document.querySelector(
        "[name=csrfmiddlewaretoken]"
    );

    if (!csrfElement) {
        console.error("CSRF token not found.");
        alert("CSRF token not found.");
        return;
    }

    const csrfToken = csrfElement.value;

    // Prepare form data
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    // Send data to Django
    fetch("/login/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrfToken
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        if (data.success === true) {

            alert(data.message);

            // Redirect after successful login
            window.location.href = "/about/";

        } else {

            // Show error returned by Django
            alert(data.message);

        }
    })
    .catch(error => {

        console.error("Login Error:", error);

        alert("Something went wrong. Please try again.");

    });
}