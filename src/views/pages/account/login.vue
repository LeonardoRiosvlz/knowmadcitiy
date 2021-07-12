<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      
    </div>
    <div>
      <div class="container-fluid p-0  authentication-bg ">
        <div class="row no-gutters">
          <div class="col-lg-4">
            <div class="authentication-page-content  p-4 d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                           <h4 class="font-size-32 mt-4 text-white">Bienvenido a nuestra Intranet!</h4>
                          <a href="/" class="logo">
                          </a>
                        </div>               
                        <p class="text-white">Logueate para continuar al sistema.</p>
                      </div>

                      <b-alert
                        variant="danger"
                        class="mt-3"
                        v-if="notification.message"
                        show
                        dismissible
                      >{{notification.message}}</b-alert>

                      <div class="p-2 mt-5">
                        <ValidationObserver ref="form">
                          <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">Email</label>
                            <input
                              type="email"
                              v-model="form.email"
                              class="form-control"
                              id="email"
                              placeholder="Enter email"
                            />
                            <span style="color:red">{{ errors[0] }}</span>
                          </div>
                           </ValidationProvider>
                          <ValidationProvider name="email" rules="required" v-slot="{ errors }">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Password</label>
                            <input
                              v-model="form.password"
                              type="password"
                              class="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                            />
                            <span style="color:red">{{ errors[0] }}</span>
                          </div>
                          </ValidationProvider>

                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customControlInline"
                            />
                            <label
                              class="custom-control-label text-white"
                              for="customControlInline"
                            >Recordarme</label>
                          </div>
                          </ValidationObserver>
                          <div class="mt-4 text-center">
                            <button
                              class="btn btn-primary btn-block w-md waves-effect waves-light"
                             @click="switchLoc"
                            >Entrar</button>
                          </div>

                          <div class="mt-4 text-center">
                            <router-link tag="a" to="/forgot-password" class="text-white">
                              <i class="mdi mdi-lock mr-1"></i> Olvidaste tu contraseña?
                            </router-link>
                          </div>
                     
                        
                      </div>

                      <div class="mt-5 text-center text-white">
                        <p>
                          © 2021 Desarrollador por: <br><a href="https://innovatuhotel.com" target="_blank" style="color:white;">INNOVA TU HOTEL ECUADOR</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class=""><br>
             <img src="@/assets/images/Logo-Knowmadcity-finalblanco.png" height="350" align="center" alt="" class="centerimg">
               
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex';
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "vuelidate/lib/validators";

export default {
      metaInfo: {
      title: 'Login',
      titleTemplate: 'Login',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
   },
    components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      editMode:false,
      submitted: false,
      form:{
          'email':'',
          'password':'',
      }
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    ...mapState(['counter'])
  },
  created() {
    document.body.classList.add("auth-body-bg");
    this.session();
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  methods: {
    switchLoc(){
      this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.login();
            } else {
            }
      });
    },
    ...mapActions(['guardarUsuario']),
      async  login(){
        let data = new FormData();
        data.append('email',this.form.email);
        data.append('password',this.form.password);
       await  this.axios.post('api/auth/signin', data).then(response => {
            if (response.status==200) {
               this.$swal('Acceso Confirmado!',
                          'Bienvenido',
                          'success');
               ///limpiar el formulario 
              this.guardarUsuario(response.data.accessToken);  
			        this.session();
              return;                
              }
            }).catch(e => {
              console.log(e);
              if (e.response.status===401) {
                     this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        html: 'Algo ha salido mal, usuario o contraseña incorrectos<br>¿No recuerdas tus Credenciales?',
                        confirmButtonText: 'Reintentar',
                        footer: '<a href="/forgot-password">Recuperar Cuenta</a>'
                      });
              }
              if (e.response.status===403) {
                     this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        html: 'esta cuenta has sido baneada por el admintrador de este portal?',
                      });
              }
           });     
    },
    session(){
      if (localStorage.getItem('token')) {
        const token=localStorage.getItem('token');
        this.guardarUsuario(token);
        this.$router.push({ name: 'home' });

      }else{
        console.log("No estas logueado");
      }
    }
  }
};
</script>