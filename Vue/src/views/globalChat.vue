<template>
  <div class="chat-container">
    <ul class="message-list">
      <li v-for="message in messages" :key="message.id" :class="[message.isMine ? 'my-message' : 'other-message']">
        <span class="message-sender">{{ message.senderUserName }}: </span>
        <span class="message-content">{{ message.content }}</span>
      </li>
    </ul>
  </div>
    <div class="input-container">
      <label class="input-wrapper" data-text="">
      <input v-model="newMessage" type="text" placeholder="Escribe un mensaje..." class="input-field">
      </label>
      <button @click="sendMessage" class="send-button">Enviar</button>
    </div>
</template>
<script>
import io from 'socket.io-client';

export default {
  data() {
    const userinfo = JSON.parse(sessionStorage.getItem('usuario'));
    return {
      messages: [],
      newMessage: '',
      email: userinfo.user.email,
      userName: userinfo.user.name
    };
  },
  mounted() {
    // Establecer la conexión del socket
    this.socket = io('http://localhost:4000');
    // Escuchar eventos de mensajes entrantes
    this.socket.on('chat message', (message) => {
      const isMine = message.senderEmail === this.email;
      this.messages.push({
        id: Date.now(),
        senderUserName: message.senderUserName,
        senderEmail: message.senderEmail,
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
  width: 70%;
  margin: 0 auto;
  border-radius: 4px;
  padding: 10px;
  height: 400px;
  overflow-y: auto;
  margin-top: 1rem;
}


.message-container {
  flex: 1;
  margin-bottom: 10px; 
}
.message-list{
  list-style-type: none;
  overflow-wrap: break-word;
  padding: 0px;
}
.my-message {
  text-align: right;
  color: black;
  font-size: large;
  width: 70%;
  padding: 10px;
  margin: 5px;
  margin-left: 30%;
  border-radius: 10px 10px 0 10px;
  background-color: lightgray;
}
.other-message{
  font-size: large;
  width: 70%;
  padding: 10px;
  margin: 5px;
  margin-right: 30%;
  background-color: gray;
  color: black;
  border-radius: 10px 10px 10px 0px;
}
.message-sender {
  font-weight: bold;
  margin-left: 5px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 2rem;
}

.input-field {
  flex: 1;
  padding: 5px;
}

.send-button {
  margin-left: 10px;
  padding: 5px 10px;
}
.input-wrapper {
  display: block;
  width: 500px;
  position: relative;
}
input {
  color: #ddd;
  border: none;
  padding: 0;
  outline: none;
  width: auto;
  min-width: 100%;
  font-size: 1.5rem;
  line-height: 3em;
  font-family: system-ui;
  border-bottom: 3px solid #333333;
  background-color: transparent;
}
.input-wrapper::after {
  content: attr(data-text);
  font-size: 1.5rem;
  line-height: 0;
  height: 0;
  max-width: 100%;
  font-family: Roboto, Arial, sans-serif;
  border-bottom: 3px solid #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  overflow: hidden;
  user-select: none;
  color: transparent;
}
.send-button {
  margin-left: 10px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: grey;
}
</style>






