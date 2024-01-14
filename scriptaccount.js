document.addEventListener("DOMContentLoaded", function () {
    // Add event listener after the DOM is fully loaded
    var createButton = document.getElementById("createButton");
    if (createButton) {
        createButton.addEventListener("click", function () {
            registerUser();
        });
    }
});

function registerUser() {
    // Your logic for registering a new user
    console.log("Registering user...");

    var identifiantValue = document.getElementById("Identifiant").value;
    var motDePasseValue = document.getElementById("motDePasse").value;

    if (identifiantValue === '' || motDePasseValue === '') {
        afficherMessage('Veuillez remplir tous les champs avant de valider.', 'error');
    } else {
        // Use Fetch API to send data to the server for registration
        fetch("/members/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: `identifiant=${encodeURIComponent(identifiantValue)}&motDePasse=${encodeURIComponent(motDePasseValue)}`,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Registration response:', data);

                if (data.success) {
                    afficherMessage('Inscription réussie. Vous pouvez vous connecter maintenant.', 'success');
                } else {
                    afficherMessage('L\'inscription a échoué. Veuillez réessayer.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function getCookie(name) {
    const cookieValue = document.cookie.split('; ')
        .find(row => row.startsWith(name + '='))
        .split('=')[1];

    return cookieValue ? decodeURIComponent(cookieValue) : null;
}

function afficherMessage(message, type) {
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = '<div class="' + type + '">' + message + '</div>';
}