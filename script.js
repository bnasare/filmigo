const navbar = document.querySelector('.nav');
const inactiveElements = document.querySelectorAll('#inactive');
const toasts = document.getElementById('toasts');
const imgs = document.getElementById('imgs');
const img = document.querySelectorAll('#imgs img');
const dropdown = document.getElementById('menuBtn');
const dropdownContent = document.querySelector('.dropdown-content');

dropdown.addEventListener('click', () => {
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
})

document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});

inactiveElements.forEach(inactive => {
    inactive.addEventListener('click', createNotification);
});

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

window.addEventListener('scroll', navController);

function navController() {
    if (window.scrollY > navbar.offsetHeight + 150) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
}

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
