document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInputForm = document.querySelector('.chat-input-form');
    const chatInput = document.querySelector('.chat-input');

    // Função para adicionar a mensagem do usuário ao chat
    const addMessageToChat = (message) => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', 'wine-bg');
        messageContainer.innerHTML = `
            <div class="espaco"></div>
            <div class="message-text">${message}</div>
            <div class="message-sender">:${sessionStorage.nome}</div>
        `;

        // Adiciona a mensagem à área de mensagens do chat
        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Rolagem automática
    };

    // Função para adicionar a mensagem da IA ao chat
    const addAiMessageToChat = (message) => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', 'amethyst-bg');
        messageContainer.innerHTML = `
        <img class="iconIa" src="../assets/icon/EtiquetIAIcon.jpeg" alt="">
        <div class="message-sender">EtiquetIA:</div>
        <div class="message-text">${message}</div>
    `;
        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Função para enviar a mensagem para a OpenAI
    const sendMessageToOpenAI = async (message) => {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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' // Substitua com o seu token de autenticação
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{
                        role: 'user',
                        content: message
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar a mensagem para a API da OpenAI');
            }

            const data = await response.json();
            const responseMessage = data.choices[0].message.content.trim();

            // Adiciona a resposta da API ao chat
            addAiMessageToChat(responseMessage);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    // Evento ao enviar mensagem no formulário
    chatInputForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Adiciona a mensagem do usuário ao chat antes de enviar
        addMessageToChat(userMessage);

        // Envia a mensagem para a OpenAI
        await sendMessageToOpenAI(userMessage);

        // Limpa o campo de entrada após enviar a mensagem
        chatInput.value = '';
    });
});