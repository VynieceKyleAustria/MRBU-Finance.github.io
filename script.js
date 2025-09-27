document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.getElementById('snow-container');
    const numberOfSnowflakes = 100;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snow = document.createElement('div');
        snow.className = 'snow';
        snow.style.left = `${Math.random() * 100}vw`;
        snow.style.animationDuration = `${Math.random() * 3 + 4}s`;
        snow.style.animationDelay = `${Math.random() * 5}s`;
        snow.style.opacity = Math.random() * 0.7 + 0.3;
        snowContainer.appendChild(snow);
    }

});
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const audio = document.getElementById('background-music');
        const introButton = document.getElementById('play-button');
        const introOverlay = document.getElementById('intro-overlay');
        
        // New elements for video control
        const video = document.getElementById('celebration-video'); 
        const customPlayButton = document.getElementById('custom-play-button'); 

        // 1. INTRO BUTTON CLICK HANDLER
        introButton.addEventListener('click', function() {
            // Start audio
            audio.play().catch(error => {
                console.error("Audio autoplay failed:", error);
            });
            
            // Hide the intro overlay
            introOverlay.style.opacity = '0'; 
            setTimeout(() => {
                introOverlay.style.display = 'none'; 
            }, 500); 

            // IMPORTANT: The video will NOT auto-play here because a second interaction 
            // is usually required for the video. The custom button handles this.
        });

        // 2. CUSTOM VIDEO PLAY BUTTON HANDLER
        if (video && customPlayButton) {
            customPlayButton.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });

            // 3. LISTEN FOR VIDEO STATE CHANGES to hide/show the button
            video.addEventListener('play', () => {
                customPlayButton.classList.add('hidden');
                video.classList.add('playing');
            });

            video.addEventListener('pause', () => {
                customPlayButton.classList.remove('hidden');
                video.classList.remove('playing');
            });

            video.addEventListener('ended', () => {
                customPlayButton.classList.remove('hidden');
                video.classList.remove('playing');
                video.currentTime = 0; // Rewind the video
            });
        }
    });
</script>
