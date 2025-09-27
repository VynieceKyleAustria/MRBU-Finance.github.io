document.getElementById('play-button').addEventListener('click', function() {
    const audio = document.getElementById('background-music');
    
    // Attempt to play background music (requires user interaction)
    audio.play().then(() => {
        // If music starts successfully:

        // Fade out and hide the intro overlay
        const overlay = document.getElementById('intro-overlay');
        overlay.style.opacity = '0'; 
        setTimeout(() => {
            overlay.style.display = 'none'; 
        }, 500);

    }).catch(error => {
        console.error("Audio autoplay failed:", error);
        
        // If audio fails, hide the overlay immediately
        document.getElementById('intro-overlay').style.display = 'none';
    });
});
