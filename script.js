// This is the content for your <script> block in the HTML, or your script.js file.

document.getElementById('play-button').addEventListener('click', function() {
    const audio = document.getElementById('background-music');
    
    // Attempt to play music
    audio.play().then(() => {
        // Fade out and hide the overlay
        const overlay = document.getElementById('intro-overlay');
        overlay.style.opacity = '0'; 
        setTimeout(() => {
            overlay.style.display = 'none'; 
        }, 500); // Wait for the 0.5s CSS transition

    }).catch(error => {
        console.error("Audio autoplay failed:", error);
        // Hide overlay even if audio fails to ensure user can see the content
        document.getElementById('intro-overlay').style.display = 'none';
    });
});
