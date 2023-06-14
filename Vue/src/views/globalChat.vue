<template>
  <div class="chat-container">
    <ul class="message-list">
      <li v-for="message in messages" :key="message.id" :class="{'my-message': message.isMine}">
        <span class="message-sender">{{ message.sender }}:</span>
        <span class="message-content">{{ message.content }}</span>
      </li>
    </ul>
    <div class="input-container">
      <input v-model="newMessage" type="text" placeholder="Escribe un mensaje..." class="input-field">
      <button @click="sendMessage" class="send-button">Enviar</button>
    </div>
  </div>
</template>
<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      email: sessionStorage.getItem('email'),
      userName: sessionStorage.getItem('name')
    };
  },
  mounted() {
    // Establecer la conexión del socket
    this.socket = io('http://localhost:4000');

    // Escuchar eventos de mensajes entrantes
    this.socket.on('chat message', (message) => {
      const isMine = message.senderEmail === email;
      this.messages.push({
        id: Date.now(),
        senderUserName: message.sender,
        senderEmail: this.email,
        content: message.content,
        isMine: isMine,
      });

    });
  },
  methods: {
    sendMessage() {
      // Enviar el mensaje al servidor de sockets
      this.socket.emit('chat message', {
        senderUserName: this.userName,
        senderEmail: this.email,
        content: this.newMessage,
      });
      // Limpiar el campo de entrada de mensajes
      this.newMessage = '';
    },
  },
};
</script>
<style scoped>
.chat-container {
  width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.message-list {
  list-style-type: none;
  padding: 0;
}

.my-message {
  text-align: right;
  color: blue;
}

.message-sender {
  font-weight: bold;
  margin-right: 5px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.input-field {
  flex: 1;
  padding: 5px;
}

.send-button {
  margin-left: 10px;
  padding: 5px 10px;
}
</style>






