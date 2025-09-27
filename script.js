document.getElementById('play-button').addEventListener('click', function() {
    const audio = document.getElementById('background-music');
    const video = document.getElementById('celebration-video'); // Get the video element

    // Attempt to play background music first (async)
    audio.play().then(() => {
        // 1. If music starts, start the video playback 🎬
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
        console.error("Audio autoplay failed, but proceeding with video and page entry:", error);
        
        // If audio fails, still attempt to start video and hide the overlay
        if (video) {
            video.play(); 
        }
        document.getElementById('intro-overlay').style.display = 'none';
    });
});
