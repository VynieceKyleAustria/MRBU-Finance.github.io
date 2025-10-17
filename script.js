// Get necessary elements from the DOM
const modeToggle = document.getElementById('mode-toggle');
const linkForm = document.getElementById('link-form');
const nameInput = document.getElementById('name-input');
// *** Restored: Using 'link-input' for the URL
const linkInput = document.getElementById('link-input'); 
const animeList = document.getElementById('anime-list');
const emptyMessage = document.getElementById('empty-message');
const videoPlayerContainer = document.getElementById('video-player-container');
const currentTitle = document.getElementById('current-title');
// *** Restored: Using 'video-embed' for the iframe
const videoEmbed = document.getElementById('video-embed'); 
const closePlayer = document.getElementById('close-player');

// --- 1. Data Storage and Initialization ---

// Load list from localStorage or initialize as an empty array
let videoList = JSON.parse(localStorage.getItem('animeVideoList')) || [];

const saveList = () => {
    localStorage.setItem('animeVideoList', JSON.stringify(videoList));
    renderList();
};

const renderList = () => {
    animeList.innerHTML = ''; // Clear current list
    
    if (videoList.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        videoList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.name}</span>
                <div class="actions">
                    <button class="play-btn" data-index="${index}">▶️ Watch Online</button>
                    <button class="delete-btn" data-index="${index}">🗑️</button>
                </div>
            `;
            animeList.appendChild(listItem);
        });
    }
};

// --- 2. Event Listeners ---

// Handle adding a new embed link
linkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = nameInput.value.trim() || 'Untitled Anime';
    // *** Restored: Getting the link from linkInput
    const link = linkInput.value.trim(); 

    if (link) {
        // *** Restored: Storing the link instead of the file path
        videoList.push({ name: title, link: link }); 
        saveList();
        
        // Clear inputs
        nameInput.value = '';
        linkInput.value = '';
    }
});

// Handle play and delete button clicks
animeList.addEventListener('click', (e) => {
    const target = e.target;
    const index = target.dataset.index;

    if (target.classList.contains('play-btn')) {
        // Play the video
        const video = videoList[index];
        currentTitle.textContent = video.name;
        
        // *** Restored: Set the <iframe>'s 'src' to the embed link ***
        videoEmbed.src = video.link; 
        
        // Show the player and hide the list
        videoPlayerContainer.classList.remove('hidden');
        document.getElementById('list-view').classList.add('hidden');
        
    } else if (target.classList.contains('delete-btn')) {
        // Delete the item
        if (confirm(`Are you sure you want to delete "${videoList[index].name}" from your list?`)) {
            videoList.splice(index, 1);
            saveList();
        }
    }
});

// Handle closing the video player
closePlayer.addEventListener('click', () => {
    // Stop the video by clearing the iframe source
    videoEmbed.src = ''; 

    // Hide the player and show the list
    videoPlayerContainer.classList.add('hidden');
    document.getElementById('list-view').classList.remove('hidden');
});

// Dark mode toggle (using simple class toggle)
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage so it persists
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkModePreference', isDarkMode);
});

// Check for dark mode preference on load
const savedDarkMode = localStorage.getItem('darkModePreference');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
}

// Initial render
renderList();
