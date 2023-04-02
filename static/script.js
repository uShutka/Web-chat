document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message-form');
    const messages = document.querySelector('#messages');

    const updateMessages = () => {
        fetch('/get_messages')
            .then(response => response.json())
            .then(data => {
                messages.innerHTML = '';
                data.forEach(message => {
                    messages.innerHTML += `<p><strong>${message.name}:</strong> ${message.message}</p>`;
                });
            });
    };

    setInterval(updateMessages, 1000);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = document.querySelector('#name-input');
        const messageInput = document.querySelector('#message-input');

        fetch('/send_message', {
            method: 'POST',
            body: new FormData(form)
        })
            .then(() => {
                nameInput.value = '';
                messageInput.value = '';
            });
    });
});