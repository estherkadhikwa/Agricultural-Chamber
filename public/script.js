import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhTjz4Rq9K-DIckaKC-KuHtMrX7ENPC3A",
    authDomain: "agrichamber-b4c68.firebaseapp.com",
    projectId: "agrichamber-b4c68",
    storageBucket: "agrichamber-b4c68.firebasestorage.app",
    messagingSenderId: "400333526643",
    appId: "1:400333526643:web:e9dd766ad2ee294346fc06",
    measurementId: "G-2HC71SF4PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if analytics is supported before initializing
isSupported().then((supported) => {
    if (supported) {
      const analytics = getAnalytics(app);
      // Your analytics setup code here
    } else {
      console.log("Analytics is not supported in this environment.");
    }
  });


const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const memberLoginBtn = document.getElementById('member-login');
    const loginPopup = document.getElementById('login-popup');
    const registerPopup = document.getElementById('register-popup');
    const becomeMemberButton = document.getElementById("become-member");
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const closePopupButtons = document.querySelectorAll('.close-popup');
    const searchForm = document.querySelector('.search-container');
    const searchInput = searchForm?.querySelector('input');
    const logoutButton = document.getElementById('logout-button');


    // Toggle mobile menu
    menuToggle?.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    // Popup functionality
    const showPopup = (popup) => {
        popup.style.display = 'block';
    };

    const hidePopup = (popup) => {
        popup.style.display = 'none';
    };

    if (becomeMemberButton) {
        becomeMemberButton.addEventListener("click", () => {
            registerPopup.style.display = "block";
        })
    }

    memberLoginBtn?.addEventListener('click', () => showPopup(loginPopup));
    showRegisterLink?.addEventListener('click', (e) => {
        e.preventDefault();
        hidePopup(loginPopup);
        showPopup(registerPopup);
    });
    showLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        hidePopup(registerPopup);
        showPopup(loginPopup);
    });

    closePopupButtons.forEach((button) => {
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
    const updateAuthState = (user) => {
        if (user) {
            console.log("User is signed in:", user);
            if (memberLoginBtn) {
                memberLoginBtn.style.display = 'inline-block';
            }
            if (logoutButton) {
                logoutButton.style.display = 'inline-block';
            }

            // If on member dashboard page, update content
            if (window.location.pathname.includes('member-dashboard.html')) {
                updateMemberDashboard(user);
            } else {
                // Redirect to member dashboard if on login page
                if (window.location.pathname.includes('login.html')) {
                    window.location.href = 'member-dashboard.html';
                }
            }
        } else {
            console.log("User is signed out");
            if (memberLoginBtn) {
                memberLoginBtn.style.display = 'inline-block';
            }
            if (logoutButton) {
                logoutButton.style.display = 'none';
            }

            // Redirect to login page if trying to access member dashboard
            if (window.location.pathname.includes('member-dashboard.html')) {
                window.location.href = 'index.html';
            }
        }
    };

    onAuthStateChanged(auth, updateAuthState);

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            signOut(auth).then(() => {
                console.log("User signed out successfully");
                window.location.href = 'index.html';
                alert("Logged out successfully!");
            }).catch((error) => {
                console.error("Sign out error:", error);
            });
        });
    }

    // Function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Function to update member dashboard content
    window.updateMemberDashboard = function(user) {
        const memberName = document.getElementById('member-name');
        if (memberName) {
            // Extract username part of the email and capitalize the first letter
            const username = user.email.split('@')[0];
            memberName.textContent = capitalizeFirstLetter(username);
        }
    };


    // Populate recent activity (example data)
    const activityList = document.getElementById('activity-list');
    if (activityList) {
        const recentActivities = [
            'Viewed latest market report',
            'Commented on Sustainable Farming forum',
            'Registered for upcoming webinar',
            'Downloaded industry trend analysis'
        ];

        activityList.innerHTML = recentActivities.map(activity => `<li>${activity}</li>`).join('');
    }
    

    // Close menu when a link is clicked
    mainNav?.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mainNav.classList.remove('show');
        }
    });

    // Search form validation
    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (searchInput.value.trim() === '') {
            alert('Please enter a search term');
        } else {
            console.log('Searching for:', searchInput.value);
        }
    });

    // Member directory search
    window.searchMembers = () => {
        const input = document.getElementById('search-input');
        const filter = input.value.toLowerCase();
        const members = document.getElementsByClassName('member');

        Array.from(members).forEach((member) => {
            const name = member.querySelector('h3')?.innerText.toLowerCase() || '';
            const company = member.querySelectorAll('p')[0]?.innerText.toLowerCase() || '';
            const email = member.querySelectorAll('p')[1]?.innerText.toLowerCase() || '';
            const phone = member.querySelectorAll('p')[2]?.innerText.toLowerCase() || '';

            if ([name, company, email, phone].some((text) => text.includes(filter))) {
                member.style.display = '';
            } else {
                member.style.display = 'none';
            }
        });
    };

    // Login form submission
    document.getElementById("login-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login successful!");
                console.log(userCredential.user);
                window.location.href = 'member-dashboard.html';
            })
            .catch((error) => {
                alert("Login failed: " + error.message);
            });
    });

    // Register form submission
    document.getElementById("register-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Registration successful!");
                console.log(userCredential.user);
                window.location.href = 'member-dashboard.html';
            })
            .catch((error) => {
                alert("Registration failed: " + error.message);
            });
    });
});


// Namibia Agricultural Map
const apiKey = 'c7934319a9ee40268304663279c6f774'; // Secure your API key properly in production
        const map = L.map('map').setView([-22.9576, 18.4904], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const locations = [
            { name: "Kavango Region", type: "region", address: "Kavango Region, Namibia", info: "Known for its crop production, including mahangu (pearl millet) and maize." },
            { name: "Zambezi Region", type: "region", address: "Zambezi Region, Namibia", info: "Suitable for crops like maize, sorghum, and millet. Also known for fishing." },
            { name: "Otjozondjupa Region", type: "region", address: "Otjozondjupa Region, Namibia", info: "Major cattle farming area with some crop production." },
            { name: "Oshakati Open Market", type: "market", address: "Oshakati, Namibia", info: "Large market for local produce and crafts." },
            { name: "Windhoek City Market", type: "market", address: "Windhoek, Namibia", info: "Central market in the capital city for various agricultural products." },
            { name: "Katima Mulilo Fresh Produce Market", type: "market", address: "Katima Mulilo, Namibia", info: "Important market for fresh produce in the Zambezi Region." },
            { name: "Rundu Extension Office", type: "extension", address: "Rundu, Namibia", info: "Provides agricultural support services to farmers in the Kavango East Region." },
            { name: "Ondangwa Agricultural Development Centre", type: "extension", address: "Ondangwa, Namibia", info: "Offers training and support for farmers in northern Namibia." },
            { name: "Grootfontein Agricultural College", type: "extension", address: "Grootfontein, Namibia", info: "Provides agricultural education and extension services." }
        ];

        const markerColors = {
            region: '#4CAF50',
            market: '#FFC107',
            extension: '#2196F3'
        };

        const markers = [];

        function createCustomIcon(color) {
            return L.divIcon({
                className: 'custom-icon',
                html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`
            });
        }

        function addMarker(location, latlng) {
            const marker = L.marker(latlng, {
                icon: createCustomIcon(markerColors[location.type])
            }).addTo(map);

            marker.bindPopup(`
                <div class="info-window">
                    <h3>${location.name}</h3>
                    <p>${location.info}</p>
                    <p><strong>Type:</strong> ${location.type.charAt(0).toUpperCase() + location.type.slice(1)}</p>
                </div>
            `);

            markers.push({ marker, type: location.type });
        }

        locations.forEach(location => {
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location.address)}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const { lat, lng } = data.results[0].geometry;
                        addMarker(location, [lat, lng]);
                    } else {
                        console.error('No results found for:', location.address);
                    }
                })
                .catch(error => {
                    console.error('Error with geocoding request:', error);
                    alert('Error fetching location data, please try again later.');
                });
        });

        document.querySelectorAll('.legend-item').forEach(item => {
            item.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                filterMarkers(type);
            });
        });

        function filterMarkers(type) {
            markers.forEach(({ marker, type: markerType }) => {
                if (type === 'all' || type === markerType) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
        }
