document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('show');
    });

    // Popup functionality
    const memberLoginBtn = document.getElementById('member-login');
    const loginPopup = document.getElementById('login-popup');
    const registerPopup = document.getElementById('register-popup');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const closePopupButtons = document.querySelectorAll('.close-popup');

    function showPopup(popup) {
        popup.style.display = 'block';
    }

    function hidePopup(popup) {
        popup.style.display = 'none';
    }

    memberLoginBtn.addEventListener('click', () => showPopup(loginPopup));
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        hidePopup(loginPopup);
        showPopup(registerPopup);
    });
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        hidePopup(registerPopup);
        showPopup(loginPopup);
    });

    closePopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            hidePopup(loginPopup);
            hidePopup(registerPopup);
        });
    });

    // Close popup when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginPopup || e.target === registerPopup) {
            hidePopup(loginPopup);
            hidePopup(registerPopup);
        }
    });
    // Authentication state observer
    // Authentication state observer
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            console.log("User is signed in:", user);
            memberLoginBtn.textContent = 'Logout';
            memberLoginBtn.removeEventListener('click', () => showPopup(loginPopup));
            memberLoginBtn.addEventListener('click', () => {
                firebase.auth().signOut().then(() => {
                    console.log("User signed out successfully");
                    location.reload();
                }).catch((error) => {
                    console.error("Sign out error:", error);
                });
            });
        } else {
            // User is signed out
            console.log("User is signed out");
            memberLoginBtn.textContent = 'Member Login';
            memberLoginBtn.removeEventListener('click', () => {
                firebase.auth().signOut();
            });
            memberLoginBtn.addEventListener('click', () => showPopup(loginPopup));
        }
    });

    // Close the menu when a link is clicked
    mainNav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mainNav.classList.remove('show');
        }
    });

    // Simple form validation for the search input
    const searchForm = document.querySelector('.search-container');
    const searchInput = searchForm.querySelector('input');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (searchInput.value.trim() === '') {
            alert('Please enter a search term');
        } else {
            // Perform search or redirect to search results page
            console.log('Searching for:', searchInput.value);
        }
    });
});

/* Member Directory */
function searchMembers() {
    let input = document.getElementById('search-input');
    let filter = input.value.toLowerCase();
    let members = document.getElementsByClassName('member');

    // Loop through all members and hide those who don't match the search query
    for (let i = 0; i < members.length; i++) {
        let name = members[i].getElementsByTagName('h3')[0];
        let company = members[i].getElementsByTagName('p')[0]; // Looking at the first <p> for company name
        let email = members[i].getElementsByTagName('p')[1]; // Looking at the second <p> for email
        let phone = members[i].getElementsByTagName('p')[2]; // Looking at the third <p> for phone number

        if (name || company || email || phone) {
            let nameText = name.textContent || name.innerText;
            let companyText = company.textContent || company.innerText;
            let emailText = email.textContent || email.innerText;
            let phoneText = phone.textContent || phone.innerText;

            if (nameText.toLowerCase().includes(filter) || 
                companyText.toLowerCase().includes(filter) || 
                emailText.toLowerCase().includes(filter) || 
                phoneText.toLowerCase().includes(filter)) {
                members[i].style.display = "";
            } else {
                members[i].style.display = "none";
            }
        }
    }
}

