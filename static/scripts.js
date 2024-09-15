document.getElementById('video-file').addEventListener('change', function() {
    const videoFile = document.getElementById('video-file').files[0];
    const formData = new FormData();
    formData.append('videoFile', videoFile);

    fetch('/upload-video-file', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        displayWidgets(data.video_id);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function displayWidgets(videoId) {
    fetch(`/get-widgets/${videoId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('insights-container').innerHTML = `<iframe src="${data.insights_url}" width="100%" height="400px"></iframe>`;
            document.getElementById('player-container').innerHTML = `<iframe src="${data.player_url}" width="100%" height="400px"></iframe>`;
        })
        .catch(error => {
            console.error('Error fetching widgets:', error);
        });
}


document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#upload-section').scrollIntoView({
        behavior: 'smooth'
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    const fileInput = document.getElementById('video-file');
    const loadingDiv = document.getElementById('loading');

    // Smooth scroll for "Get started" button
    ctaButton.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });

    // Handle file input change
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            loadingDiv.style.display = 'block';

            // Simulate a delay for loading
            setTimeout(function() {
                window.location.href = "/widgets"; // Adjust the URL as needed
            }, 2000); // Adjust the delay as needed
        }
    });
});






// Show the popup on page load (or you can trigger it based on an event)
window.onload = function() {
    document.getElementById('popup').style.display = 'flex'; // Display popup on load
};

// Close the popup when clicking the 'Close' button
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none'; // Hide popup
});

// Report an Issue button logic (you can replace this with your own logic)
document.getElementById('report-issue').addEventListener('click', function() {
    window.location.href = "mailto:support@example.com"; // Opens email client
});


function uploadVideoFile() {
    // Show loading GIF
    document.getElementById('loading').style.display = 'block';

    // Simulate file upload process (replace this with actual upload logic)
    const fileInput = document.getElementById('video-file');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            // Simulate a delay (this represents the time taken for the file to upload)
            setTimeout(function () {
                // Hide loading GIF after file processing
                document.getElementById('loading').style.display = 'none';

                // Show widget section once file is uploaded
                document.getElementById('widget-section').style.display = 'flex';

                // Here you can add logic to set video or audio source if needed
                console.log('File uploaded: ', file.name);
            }, 2000); // Simulate a 2 second delay for demo purposes
        };

        // Start reading the file (replace with actual upload logic)
        reader.readAsDataURL(file);
    } else {
        // If no file selected, hide the loading GIF and widgets
        document.getElementById('loading').style.display = 'none';
        document.getElementById('widget-section').style.display = 'none';
        alert('No file selected');
    }
}