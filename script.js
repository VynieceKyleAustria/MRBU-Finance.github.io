document.getElementById('play-button').addEventListener('click', function() {
    const audio = document.getElementById('background-music');
    const video = document.getElementById('celebration-video'); 

    // Attempt to play background music first (requires user interaction)
    audio.play().then(() => {
        // If music starts successfully:

        // 1. Start the video playback 🎬
        if (video) {
            video.play(); 
        }

        // 2. Fade out and hide the intro overlay
        const overlay = document.getElementById('intro-overlay');
        overlay.style.opacity = '0'; 
        setTimeout(() => {
            overlay.style.display = 'none'; 
        }, 500);

    }).catch(error => {
        console.error("Audio autoplay failed, proceeding with video and page entry:", error);
        
        // If audio fails (e.g., policy blocks it), still proceed:
        
        // 1. Attempt to start video anyway
        if (video) {
            video.play(); 
        }

        // 2. Hide the overlay immediately
        document.getElementById('intro-overlay').style.display = 'none';
    });
});
