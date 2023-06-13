<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message }}</li>
    </ul>
    <input v-model="newMessage" type="text" placeholder="Escribe un mensaje...">
    <button @click="sendMessage">Enviar</button>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
    };
  },
  mounted() {
    // Establecer la conexión del socket
    this.socket = io('http://localhost:4000');

    // Escuchar eventos de mensajes entrantes
    this.socket.on('chat message', (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      // Enviar el mensaje al servidor de sockets
      this.socket.emit('chat message', this.newMessage);

      // Limpiar el campo de entrada de mensajes
      this.newMessage = '';
    },
  },
};

</script>