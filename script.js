// Get necessary elements from the DOM
const modeToggle = document.getElementById('mode-toggle');
const linkForm = document.getElementById('link-form');
const nameInput = document.getElementById('name-input');
const filePathInput = document.getElementById('file-path-input'); 
const animeList = document.getElementById('anime-list');
const emptyMessage = document.getElementById('empty-message');

// --- 1. Data Storage and Initialization ---

// Load list from localStorage or initialize as an empty array
let videoList = JSON.parse(localStorage.getItem('animeDownloadList')) || [];

const saveList = () => {
    localStorage.setItem('animeDownloadList', JSON.stringify(videoList));
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
            
            // Generate a filename based on the title, ensuring it ends with a video extension (mp4 is common)
            const defaultFilename = `${item.name.replace(/[^a-z0-9]/gi, '_')}.mp4`;
            
            listItem.innerHTML = `
                <span>${item.name}</span>
                <div class="actions">
                    <a href="${item.path}" download="${defaultFilename}" class="download-link">💾 Download</a>
                    <button class="delete-btn" data-index="${index}">🗑️</button>
                </div>
            `;
            animeList.appendChild(listItem);
        });
    }
};

// --- 2. Event Listeners ---

// Handle adding a new video URL/path to the list
linkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = nameInput.value.trim() || 'Untitled Anime';
    const filePath = filePathInput.value.trim(); // This is the URL or local file path

    if (filePath) {
        // Add the new item to the list
        videoList.push({ name: title, path: filePath }); 
        saveList();
        
        // Clear inputs
        nameInput.value = '';
        filePathInput.value = '';
    }
});

// Handle delete button clicks
animeList.addEventListener('click', (e) => {
    const target = e.target;
    const index = target.dataset.index;

    if (target.classList.contains('delete-btn')) {
        // Delete the item
        if (confirm(`Are you sure you want to delete "${videoList[index].name}" from your list?`)) {
            videoList.splice(index, 1);
            saveList();
        }
    }
    // The download link (<a> tag) handles the download automatically when clicked.
});

// Dark mode toggle
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
