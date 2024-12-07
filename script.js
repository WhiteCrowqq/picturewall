// Import the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPY0ZPdwl1OFqxm9hO1z_zf7XzAykWwgI",
    authDomain: "test1-9ec8d.firebaseapp.com",
    projectId: "test1-9ec8d",
    storageBucket: "test1-9ec8d.appspot.com",
    messagingSenderId: "392915794780",
    appId: "1:392915794780:web:9b267fa2a8c772484b9f99",
    measurementId: "G-3KPESTMYR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const status = document.getElementById('status');
const uploadedImage = document.getElementById('uploadedImage');

// Upload button click handler
uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0]; // Get the selected file

    if (!file) {
        status.textContent = "Please select a file first!";
        return;
    }

    // Create a storage reference
    const storageRef = ref(storage, `images/${file.name}`);

    try {
        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the file's download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update status
        status.textContent = "Upload successful!";

        // Display the uploaded image
        uploadedImage.src = downloadURL;
        uploadedImage.style.display = "block";

        console.log('File URL:', downloadURL);
    } catch (error) {
        console.error('Upload failed:', error);
        status.textContent = `Upload failed: ${error.message}`;
    }
});
