let bluetoothDevice = null;
let bluetoothCharacteristic = null;

// Connect to Bluetooth
document.getElementById("connectBtn").addEventListener("click", async () => {
    try {
        const serviceUuid = "00001101-0000-1000-8000-00805f9b34fb"; // Bluetooth SPP UUID
        const characteristicUuid = "00001101-0000-1000-8000-00805f9b34fb";

        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: [serviceUuid]
        });

        const server = await bluetoothDevice.gatt.connect();
        const service = await server.getPrimaryService(serviceUuid);
        bluetoothCharacteristic = await service.getCharacteristic(characteristicUuid);

        document.getElementById("status").textContent = "Status: Connected";
    } catch (error) {
        console.error(error);
        alert("Failed to connect. Make sure Bluetooth is enabled and try again.");
    }
});

// Send Message
document.getElementById("sendMessageBtn").addEventListener("click", async () => {
    const message = document.getElementById("messageInput").value.trim();

    if (!message) {
        alert("Please enter a message.");
        return;
    }

    if (!bluetoothCharacteristic) {
        alert("Please connect to the device first.");
        return;
    }

    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        await bluetoothCharacteristic.writeValue(data);
        alert("Message sent successfully!");
    } catch (error) {
        console.error(error);
        alert("Failed to send message.");
    }
});
