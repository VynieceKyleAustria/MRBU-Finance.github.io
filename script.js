<script>
    document.addEventListener('DOMContentLoaded', () => {
        const backgroundMusic = document.getElementById('background-music');
        const musicStarter = document.getElementById('music-starter');
        const promptContainer = document.getElementById('music-prompt-container');

        // By default, show the prompt container (it covers the screen)
        promptContainer.style.display = 'block';

        // Add a click listener to the dedicated starter button
        musicStarter.addEventListener('click', () => {
            // Attempt to play the music. play() returns a Promise.
            const playPromise = backgroundMusic.play();

            // Check if the Promise resolved successfully
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Music started successfully! Hide the prompt.
                    promptContainer.style.display = 'none';
                    console.log("Music started playing!");
                }).catch(error => {
                    // Play was prevented (browser still blocked it).
                    console.error("Music playback was blocked or failed:", error);
                    // Optionally, you could change the button text to show an error
                    musicStarter.textContent = "Music Blocked. Check Device Settings.";
                });
            }
        });

        // OPTIONAL: Auto-play muted video
        // Since you removed 'autoplay' from the video for mobile compatibility, 
        // you can try to start it *muted* when the page loads for a good visual start.
        const celebrationVideo = document.getElementById('celebration-video');
        if (celebrationVideo) {
            celebrationVideo.muted = true; // MUST BE MUTED for auto-play on mobile
            celebrationVideo.play().catch(e => console.log("Muted video autoplay failed:", e));
        }
    });
</script>
