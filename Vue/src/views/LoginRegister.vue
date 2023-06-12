
<template>
    <div class="container">
      <img class="logo" src="/img/logo.svg" alt="anime random logo">
      <form id="loginForm" @submit.prevent="loginUser" class="form" :style="{ display: loginFormDisplay }">
        <h2>Iniciar sesión</h2>
        <input class="input" v-model="email" type="email" placeholder="Correo electrónico" required>
        <input class="input" v-model="password" type="password" placeholder="Contraseña" required>
        <button type="submit">Iniciar sesión</button>
        <p>¿No tienes una cuenta? <a href="#" @click="toggleForm">Registrarse</a></p>
      </form>
      <form id="registerForm" @submit.prevent="registerUser" class="form" :style="{ display: registerFormDisplay }">
        <h2>Registrarse</h2>
        <input class="input" v-model="name" type="text" placeholder="Nombre" required>
        <input class="input" v-model="email" type="email" placeholder="Correo electrónico" required>
        <input class="input" v-model="date" type="date" placeholder="Fecha de nacimiento" required>
        <input class="input" v-model="password" type="password" placeholder="Contraseña" required>
        <label for="imageUpload" class="file-upload">
          <img src="/img/84459.png" alt="Subir archivo" class="iconUpload">
          <span>{{ estadoImagen }}</span>
        </label>
        <input type="file"  id="imageUpload" style="display: none" @change="ImageUpload">
        <p v-if="msg">{{ msg }}</p>
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes una cuenta? <a href="#" @click="toggleForm">Iniciar sesión</a></p>
      </form>
    </div>
  </template>

<script>
import registerLoginService from '@/services/registerLoginService.js';
import router from '/src/router'
export default {
    mounted(){
    document.querySelector('header').style.display = 'none';
    //document.querySelector('body').style.backgroundColor = 'rgb(68, 29, 177)';
  },
  data() {
    return {
      loginFormDisplay: 'flex',
      registerFormDisplay: 'none',
      estadoImagen: 'Sin imagen seleccionada',
      name: '',
      email: '',
      date: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    toggleForm() {
      this.loginFormDisplay = this.loginFormDisplay === 'none' ? 'flex' : 'none';
      this.registerFormDisplay = this.registerFormDisplay === 'none' ? 'flex' : 'none';
    },
    ImageUpload(event) {
      const imagenInput = event.target;
      if (imagenInput.files.length > 0) {
        this.estadoImagen = 'Imagen subida';
      } else {
        this.estadoImagen = 'Sin imagen seleccionada';
      }
    },
    registerUser(){
      console.log("RegisterUser")
      const userData = {
      name: this.name,
      email: this.email,
      date: this.date,
      password: this.password
    };
      console.log(userData);
      registerLoginService.registerUserApi(userData).then(response => {  
      console.log('Usuario registrado:', response.data);
      localStorage.setItem('token',response.data.token);
      router.push('/home');
    })
    .catch(error => {
      this.msg = "El correo ya ha sido utilizado";
      console.log(this.msg );
      console.error('Error al registrar el usuario:', error);
    });
    },
    loginUser(){
      console.log("loginUser");
      console.log(this.email,this.password);
      const userData = {
      email: this.email,
      password: this.password
    };
      registerLoginService.loginUserApi(userData).then(response => {
      console.log('Login correcto:', response.data);
      localStorage.setItem('token',response.data.token);
      router.push('/home');
    })
    .catch(error => {
      this.msg = "El correo y la contraseña no coinciden";
      console.log(this.msg );
      console.error('Error en el login del usuario:', error);
    });
    }
  }
};
</script>
<style scoped>
body {
    animation: colors  10s ease-in-out infinite;
}
@keyframes colors {
    0% { background-color: hsl(288, 51%, 50%); }
    50% { background-color: rgb(68, 29, 177); }
    100% { background-color: hsl(288, 51%, 50%); }}

</style>
<style scoped>
.container {
    display: flex;
    flex-direction: column  ;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
  }
  
  .logo {
    width: 35rem;
    transform: translateY(calc(100% - 19rem));
  }
  .form {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f2f2f2;
    animation: fade 0.5s ease-in-out;
    max-width: 300px;
    width: 100%;
  }
  
  @keyframes fade {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
  }
  
  .iconUpload{
    width: 30px; 
    height: 30px;
  }
  .file-upload span {
    font-size: 14px;
    color: #666;
    align-items: center ;
  }
  .file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    border-radius: 4px;
    padding: 20px;
    cursor: pointer;
  }
  .file-upload:hover {
    border-color: #6752a6;
  }
  
  .file-upload:hover span {
    color: #6752a6;
  }

 .input{
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #6752a6;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #503c81;
  }
  
  p {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
  }
  
  a {
    color: #6752a6;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
 
  @media only screen and (max-width: 600px) {
    .form {
      width: 100%;
      max-width: 100%;
    }
  }

</style>

