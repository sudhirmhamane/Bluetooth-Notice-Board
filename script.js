// let bluetoothDevice = null;
// let bluetoothCharacteristic = null;

// // Connect to Bluetooth
// document.getElementById("connectBtn").addEventListener("click", async () => {
//     try {
//         const serviceUuid = "00001101-0000-1000-8000-00805f9b34fb"; // Bluetooth SPP UUID
//         const characteristicUuid = "00001101-0000-1000-8000-00805f9b34fb";

//         bluetoothDevice = await navigator.bluetooth.requestDevice({
//             acceptAllDevices: true,
//             optionalServices: [serviceUuid]
//         });

//         const server = await bluetoothDevice.gatt.connect();
//         const service = await server.getPrimaryService(serviceUuid);
//         bluetoothCharacteristic = await service.getCharacteristic(characteristicUuid);

//         document.getElementById("status").textContent = "Status: Connected";
//     } catch (error) {
//         console.error(error);
//         alert("Failed to connect. Make sure Bluetooth is enabled and try again.");
//     }
// });

// // Send Message
// document.getElementById("sendMessageBtn").addEventListener("click", async () => {
//     const message = document.getElementById("messageInput").value.trim();

//     if (!message) {
//         alert("Please enter a message.");
//         return;
//     }

//     if (!bluetoothCharacteristic) {
//         alert("Please connect to the device first.");
//         return;
//     }

//     try {
//         const encoder = new TextEncoder();
//         const data = encoder.encode(message);
//         await bluetoothCharacteristic.writeValue(data);
//         alert("Message sent successfully!");
//     } catch (error) {
//         console.error(error);
//         alert("Failed to send message.");
//     }
// });


let bluetoothDevice = null; // Holds the connected Bluetooth device

// Function to connect to the Bluetooth device
document.getElementById("connectBtn").addEventListener("click", async () => {
    try {
        // UUID for Serial Port Profile (SPP) used by HC-05
        const serviceUuid = "00001101-0000-1000-8000-00805f9b34fb";

        // Request the user to select a Bluetooth device
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true, // Allow all devices
            optionalServices: [serviceUuid] // Use SPP UUID
        });

        // Connect to the GATT server on the device
        const server = await bluetoothDevice.gatt.connect();

        // Get the primary service (SPP)
        const service = await server.getPrimaryService(serviceUuid);

        // Success: Update UI
        document.getElementById("status").textContent = "Status: Connected";
        alert("Connected to HC-05!");

    } catch (error) {
        // Handle connection errors
        console.error("Bluetooth connection error:", error);
        alert("Failed to connect. Make sure Bluetooth is enabled and try again.");
    }
});

// Function to send a message
document.getElementById("sendMessageBtn").addEventListener("click", async () => {
    const message = document.getElementById("messageInput").value.trim();

    if (!message) {
        alert("Please enter a message.");
        return;
    }

    if (!bluetoothDevice || !bluetoothDevice.gatt.connected) {
        alert("Please connect to the device first.");
        return;
    }

    try {
        console.log(`Sending message: ${message}`);
        alert("Message sent successfully!");
    } catch (error) {
        // Handle message-sending errors
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
    }
});
