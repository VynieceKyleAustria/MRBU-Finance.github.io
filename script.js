const list = document.getElementById('anime-list');
const form = document.getElementById('link-form');
const nameInput = document.getElementById('name-input');
const linkInput = document.getElementById('link-input');
const emptyMessage = document.getElementById('empty-message');
const modeToggle = document.getElementById('mode-toggle');

// --- Core Function: Render a List Item ---
function createListItem(name, url) {
    const listItem = document.createElement('li');
    
    // Container for title and link
    const infoDiv = document.createElement('div');
    infoDiv.className = 'anime-info';

    // Title/Link element
    const linkA = document.createElement('a');
    linkA.href = url;
    linkA.target = "_blank";
    linkA.textContent = name || 'Untitled Link'; 
    
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

    infoDiv.appendChild(linkA);
    infoDiv.appendChild(linkSpan);

    listItem.appendChild(infoDiv);
    listItem.appendChild(deleteBtn);
    list.prepend(listItem); // Add to the top of the list
}

// --- Data Management Functions (Using localStorage) ---
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
    
    // Check for duplicates
    if (links.some(item => item.url === url)) {
        alert('This link is already on your list!');
        return;
    }
    
    const newLink = { name: name.trim(), url: url };
    links.push(newLink);
    saveLinks(links);
    
    // Efficiently update the view
    list.innerHTML = '';
    renderList();
}

function removeLink(urlToRemove) {
    let links = getLinks();
    links = links.filter(item => item.url !== urlToRemove);
    saveLinks(links);
    
    // Remove the item from the DOM
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
    list.innerHTML = ''; // Clear the list
    
    // Display newest links first
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
