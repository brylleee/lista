import React, { useEffect } from 'react';
import { Html5Qrcode } from "html5-qrcode";

// Our main component
const App = () => {

    // useEffect() means if this component is rendered (shown to the user)
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");  // Use the div with id 'reader' as our QR Code Reader
        const config = { fps: 10, qrbox: { width: 250, height: 50 } };  //  QR Code Reader configurations

        // Start reader using back camera
        html5QrCode.start({ facingMode: "environment" }, config,
            (text, result) => {
                // Everything in here executes if scan is successful
                console.log(text);
            },
            (errorMessage) => {
                // If scan has error, this block will execute
                console.log(errorMessage);
            }
        ).catch((err) => {
            // This block will execute if the app has trouble starting the camera
            console.log(err);
        });
    });

    // Render all visible parts of our app, place all (HTML) contents here
    return (
        <div id="reader"></div>
    )
};

export default App;
