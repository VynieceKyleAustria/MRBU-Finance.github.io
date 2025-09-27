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

