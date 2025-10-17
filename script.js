const list = document.getElementById('anime-list');
const form = document.getElementById('link-form');
const nameInput = document.getElementById('name-input');
const linkInput = document.getElementById('link-input');
const emptyMessage = document.getElementById('empty-message');
const modeToggle = document.getElementById('mode-toggle');

// New Player Elements
const videoPlayerContainer = document.getElementById('video-player-container');
const videoEmbed = document.getElementById('video-embed');
const currentTitle = document.getElementById('current-title');
const closePlayerBtn = document.getElementById('close-player');
const listView = document.getElementById('list-view');

// --- Core Function: Render a List Item ---
function createListItem(name, url) {
    const listItem = document.createElement('li');
    
    // Container for title and link
    const infoDiv = document.createElement('div');
    infoDiv.className = 'anime-info';

    // Title/Link element (now acts as a PLAY button)
    const playLink = document.createElement('a');
    playLink.textContent = name || 'Untitled Link'; 
    playLink.href = "#"; // Prevent navigation
    playLink.title = "Click to watch";
    playLink.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the default link action
        loadVideo(url, name);
    });

    // Display the actual link for reference
    const linkSpan = document.createElement('span');
    linkSpan.textContent = url;
    linkSpan.className = 'anime-link';

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&#10005;'; // X icon
    deleteBtn.addEventListener('click', function() {
        removeLink(url);
    });

    infoDiv.appendChild(playLink);
    infoDiv.appendChild(linkSpan);

    listItem.appendChild(infoDiv);
    listItem.appendChild(deleteBtn);
    list.prepend(listItem);
}

// --- Video Player Functions ---

// 1. Function to switch to player mode
function loadVideo(url, name) {
    currentTitle.textContent = name || 'Now Playing';
    videoEmbed.src = url;
    
    // Switch views
    listView.classList.add('hidden');
    videoPlayerContainer.classList.remove('hidden');
    
    // Scroll to the top of the page to focus on the player
    window.scrollTo(0, 0);
}

// 2. Function to close the player
function closePlayer() {
    // Stop the video by removing the source
    videoEmbed.src = '';
    
    // Switch views
    videoPlayerContainer.classList.add('hidden');
    listView.classList.remove('hidden');
}


// --- Data Management Functions (Unchanged) ---
function getLinks() {
    const links = localStorage.getItem('animeLinks');
    return links ? JSON.parse(links) : [];
}

function saveLinks(links) {
    localStorage.setItem('animeLinks', JSON.stringify(links));
    updateEmptyMessage();
}

function addLink(name, url) {
    const links = getLinks();
    
    if (links.some(item => item.url === url)) {
        alert('This link is already on your list!');
        return;
    }
    
    const newLink = { name: name.trim(), url: url };
    links.push(newLink);
    saveLinks(links);
    
    list.innerHTML = '';
    renderList();
}

function removeLink(urlToRemove) {
    let links = getLinks();
    links = links.filter(item => item.url !== urlToRemove);
    saveLinks(links);
    
    const items = list.querySelectorAll('li');
    items.forEach(li => {
        const linkElement = li.querySelector('.anime-link');
        if (linkElement && linkElement.textContent === urlToRemove) {
            li.remove();
        }
    });
    updateEmptyMessage();
}

function renderList() {
    const links = getLinks();
    list.innerHTML = '';
    
    links.slice().reverse().forEach(item => {
        createListItem(item.name, item.url);
    });
    updateEmptyMessage();
}

function updateEmptyMessage() {
    const links = getLinks();
    emptyMessage.style.display = links.length === 0 ? 'block' : 'none';
}

// --- Event Listeners ---
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const name = nameInput.value;
    const url = linkInput.value;

    if (url) {
        addLink(name, url);
        nameInput.value = ''; 
        linkInput.value = '';
        linkInput.focus();
    }
});

// New Event Listener for the close button
closePlayerBtn.addEventListener('click', closePlayer);


modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load the list from storage
    renderList();
    
    // 2. Apply saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});
