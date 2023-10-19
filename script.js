function railFenceEncrypt(plainText, key) {
    let fence = [];
    for (let i = 0; i < key; i++) {
        fence.push([]);
    }

    let rail = 0;
    let direction = 1;

    for (let i = 0; i < plainText.length; i++) {
        fence[rail].push(plainText[i]);
        rail += direction;

        if (rail === key - 1 || rail === 0) {
            direction = -direction;
        }
    }

    let cipherText = "";
    for (let i = 0; i < key; i++) {
        cipherText += fence[i].join("");
    }

    return cipherText;
}

function railFenceDecrypt(cipherText, key) {
    let fence = [];
    for (let i = 0; i < key; i++) {
        fence.push([]);
    }

    let rail = 0;
    let direction = 1;

    for (let i = 0; i < cipherText.length; i++) {
        fence[rail].push("");
        rail += direction;

        if (rail === key - 1 || rail === 0) {
            direction = -direction;
        }
    }

    let index = 0;
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < fence[i].length; j++) {
            fence[i][j] = cipherText[index++];
        }
    }

    let plainText = "";
    rail = 0;
    direction = 1;

    for (let i = 0; i < cipherText.length; i++) {
        plainText += fence[rail].shift();
        rail += direction;

        if (rail === key - 1 || rail === 0) {
            direction = -direction;
        }
    }

    return plainText;
}

function sendMessage() {
    const input = document.getElementById("input");
    const messages = document.getElementById("messages");
    

    const message = input.value.trim();
    if (message !== "") {
        const encryptedMessage = railFenceEncrypt(message, 3);
        messages.innerHTML += `
        <div class="message outgoing" >
        <span class="content">${encryptedMessage}</span>
        <span class="sender"> คุณ<span class="sender"></span> </div>`;

        input.value = "";
        input.focus();

        setTimeout(() => {
            const decryptedMessage = railFenceDecrypt(encryptedMessage, 3);
            messages.innerHTML += `
            <div class="message incoming" >
            <span class="sender">เพื่อน <span class="sender"></span> 
            <span class="content">${decryptedMessage}</span></div>`;
        }, 3000);
    }
    
}

