// Selecting DOM elements
const navbar = document.querySelector('.nav');
const inactiveElements = document.querySelectorAll('#inactive');
const toasts = document.getElementById('toasts');
const imgs = document.getElementById('imgs');
const img = document.querySelectorAll('#imgs img');
const dropdown = document.getElementById('menuBtn');
const dropdownContent = document.querySelector('.dropdown-content');

// Dropdown menu event listeners
dropdown.addEventListener('click', () => {
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
});

document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});

// Close dropdown when an option is clicked
document.querySelectorAll('.dropdown-content a').forEach((option) => {
    option.addEventListener('click', () => {
        dropdownContent.style.display = 'none';
    });
});

// Notification event listeners
inactiveElements.forEach(inactive => {
    inactive.addEventListener('click', createNotification);
});

// Function to create and remove notifications
function createNotification() {
    const notif = document.createElement('div');
    notif.classList.add('toast');

    const spinnerIcon = document.createElement('i');
    spinnerIcon.classList.add('fa-solid', 'fa-spinner', 'fa-spin');

    notif.appendChild(spinnerIcon);
    notif.appendChild(document.createTextNode('Pending'));

    toasts.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 1000);
}

// Navbar visibility control on scroll
window.addEventListener('scroll', navController);

function navController() {
    if (window.scrollY > navbar.offsetHeight + 150) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
}

// Image slider functionality
const nav_list = document.querySelector('.nav__list');
const toast = document.querySelector('.toast');

let idx = 0;
let interval = setInterval(run, 3000);

function run() {
    idx++;
    changeImage();
}

function changeImage() {
    if (idx > img.length - 1) {
        idx = 0;
    } else if (idx < 0) {
        idx = img.length - 1;
    }

    imgs.style.transform = `translateX(${-idx * 16.667}%)`;
}

// Movie API configuration
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bc5f14f026b71687afbff6cc7bad4d4b&page=2';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=bc5f14f026b71687afbff6cc7bad4d4b&query="';

// DOM elements for movie search
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

// Initial movie fetch
getMovies(API_URL);

// Fetch movies from API and display them
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

// Display movies in the DOM
function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `;

        main.appendChild(movieEl);
    });
}

// Determine the class based on the movie rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Search form event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});
