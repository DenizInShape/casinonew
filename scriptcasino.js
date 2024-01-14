document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var identifiantValue = document.getElementById("Identifiant").value;
    var motDePasseValue = document.getElementById("motDePasse").value;

    if (identifiantValue === '' || motDePasseValue === '') {
        afficherMessage('Veuillez remplir tous les champs avant de valider.', 'error');
    } else {
        // Use Fetch API to send data to the server for authentication
        fetch("/members/authenticate/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"), // Function to get CSRF token from cookie
            },
            body: JSON.stringify({
                identifiant: identifiantValue,
                motDePasse: motDePasseValue,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Authentication response:', data);

                if (data.success) {
                    console.log('Redirecting to salon page with user data:', data.identifiant, data.score);
                    // Redirect to the salon page with user data
                    window.location.href = '/members/salon?identifiant=' + data.identifiant + '&score=' + data.score;
                } else {
                    // Display error message on the main page
                    afficherMessage('Identifiants incorrects. Veuillez réessayer.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

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