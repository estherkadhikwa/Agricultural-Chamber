import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            alert('Registration successful');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
