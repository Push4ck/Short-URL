document.addEventListener("DOMContentLoaded", function () {
    const shortBtn = document.getElementById('short-btn');
    const copyBtn = document.getElementById('copy-btn');
    const reloadBtn = document.getElementById('reload-btn');
    const shortenedUrlTextarea = document.getElementById("shortenedUrl");

    shortBtn.addEventListener('click', shortenUrl);
    copyBtn.addEventListener('click', copyUrlToClipboard);

    function shortenUrl() {
        const originalUrl = document.getElementById("originalUrl").value;
        const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`;

        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
            })
            .then(data => {
                shortenedUrlTextarea.value = data;
            })
            .catch(error => {
                shortenedUrlTextarea.value = `Error: ${error.message}`;
            });
    }

    function copyUrlToClipboard() {
        shortenedUrlTextarea.select();
        document.execCommand("copy");

        // Show the success message
        const successAlert = document.getElementById("success-alert");
        successAlert.style.display = "block";

        // Hide the success message after 1.5 seconds
        setTimeout(function () {
            successAlert.style.display = "none";
        }, 1500);
    }

    reloadBtn.addEventListener('click', function () {
        location.reload();
    });
});
