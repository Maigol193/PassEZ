document.getElementById("qrButton").addEventListener("click", async () => {
    try {
        const response = await fetch('http://localhost:3000/create-visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: 'yourUserId', visitId: 'yourVisitId' }) // Cambia por tus valores
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById("qrCodeImage").src = data.qrCode; // Actualiza el src de la imagen con el QR generado
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error al generar el código QR:", error);
        alert(`Error al generar el código QR: ${error.message}`);
    }
});

document.getElementById("numpadButton").addEventListener("click", async () => {
    try {
        const response = await fetch('http://localhost:3000/create-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: 'yourUserId', visitId: 'yourVisitId' }) // Cambia por tus valores
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById("numericCodeDisplay").innerText = data.code; // Muestra el código numérico generado
            // Abre el modal para mostrar el código
            const modal = new bootstrap.Modal(document.getElementById('modalNumpad'));
            modal.show();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error al generar el código numérico:", error);
        alert(`Error al generar el código numérico: ${error.message}`);
    }
});