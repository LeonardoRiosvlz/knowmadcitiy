
<template>
  <Layout  class="authentication-bg">
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear Usuario</b-button>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card " style="background-color:rgba(0,0,0,0.5); color:#fff;">
          <div class="card-body">
            <h4 class="card-title"></h4>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Mostrar &nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp; usuarios
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Buscar:
                    <b-form-input
                      v-model="filter"
                      type="Buscar Usuario"
                      placeholder="Buscar Usuario..."
                      class="form-control form-control-sm ml-2" style="background-color:rgba(255,255,255,0.5); color:#fff; border-radius:25px;"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">

              <b-table
                :items="users"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
              <template v-slot:cell(Tipo_de_Usuario)="data">
                  <b-badge v-if="data.item.tipo === 'Master'" variant="success">Administrador </b-badge>
                  <b-badge v-else variant="info">Supervisor</b-badge>
              </template>
              <template v-slot:cell(estado)="form">
                  <b-badge v-if="form.item.status === 'activo'" variant="success"> Activo </b-badge>
                  <b-badge v-else variant="danger"> Inactivo </b-badge>
              </template>
              <template v-slot:cell(actions)="data">
                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                    <b-dropdown-item-button @click="editMode=true;ver=false;setear(data.item.id)"> Editar Usuario</b-dropdown-item-button>
                    <b-dropdown-item-button @click="eliminarCargo(data.item.id)"> Eliminar Usuario</b-dropdown-item-button>
                    <b-dropdown-item-button @click="editMode=false;ver=true;setear(data.item.id)"> Ver Usuario</b-dropdown-item-button>
                </b-dropdown>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col-sm">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        <b-modal id="modal" false size="lg" hide-footer  title="Gestión de usuarios" ok-only>
          <ValidationObserver ref="form">
          <form-wizard next-button-text="Siguiente" back-button-text="Anterior" finish-button-text="---"  color="#7fa3a3" transition="fade">
            <!--Paso 1-->
            <tab-content title="Información de usuario"  subtitle="Paso 1" icon="ri-user-3-fill" >
                           <b-row>
              <b-col>
                <div class="form-group">
                  <label>Nombre </label>
                  <ValidationProvider name="nombre" rules="required|alpha_spaces" v-slot="{ errors }">
                        <input v-model="form.nombre"  type="text" class="form-control" placeholder=" ">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Email</label>
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                          <input v-model="form.email" @keyup="setEmail()" type="text" class="form-control" placeholder=" " :disabled="editMode">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
                        <b-row class="mb-2">
               <b-col>
                   <label>Imagen</label>
                   <div id="preview mb-2">
                   <p align="center"><img v-if="url" width="200" height="200" style="float:center!importan" class="rounded"  :src="url" /></p>
                     
                   </div>
                    <b-form-file
                        v-model="file"
                        placeholder="Seleccione su image..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChange"
                    ></b-form-file>
               </b-col>
            </b-row> 
                     
            </tab-content>
            <!--Paso 2-->
            <tab-content title="Tipo de Usuario"  subtitle="Paso 2" icon="ri-apps-2-fill">
                <ValidationObserver ref="form">
                
                  <b-row>
                      <b-col>
                        <div class="form-group">
                          <label>Tipo</label>
                          <ValidationProvider name="tipo" rules="required" v-slot="{ errors }">
                                <select v-model="form.tipo" @change="setRoles()" name="tipo" class="form-control form-control-lg" >
                                    <option value="Master">Administrador</option>
                                    <option value="Administrador">Supervisor</option>
                                </select>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                  </b-row>
                  <hr>
                    <b-row >
                      <b-col>
                        <div class="form-group">
                          <label>Estatus</label>
                          <ValidationProvider name="status" rules="required" v-slot="{ errors }">
                                <select v-model="form.status"  name="tipo" class="form-control form-control-lg" >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                  </b-row>
                  <b-row v-if="!editMode">
                      <b-col>
                        <div class="form-group">
                          <label>Contraseña</label>
                          <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                                <input v-model="form.password"  type="password" class="form-control" placeholder=" ">
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col>
                        <div class="form-group">
                          <label>Confirmar contraseña</label>
                          <ValidationProvider name="repass" rules="required|confirmed:password" v-slot="{ errors }">
                                <input v-model="form.repass"  type="password" class="form-control" placeholder=" ">
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                  </b-row> 
          
              </ValidationObserver>
       
            </tab-content>
            <!--Paso 4-->


            <tab-content title="Crear/Actualizar Usuario"  subtitle="Paso 4" icon="ri-save-2-fill">
               <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Crear Usuario</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar Usuario</button>
            </tab-content>
          </form-wizard>
        </ValidationObserver>

     
     </b-modal>


  <footer class="footer dark" style="background-color:#505d69; color:#fff;">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          2021 © 
        </div>
        <div class="col-sm-6">
          <div class="text-sm-right d-none d-sm-block">
            Desarrollado por
            © Innova Tu Hotel
          </div>
        </div>
      </div>
    </div>
  </footer>
  </Layout>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import vue2Dropzone from "vue2-dropzone";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

// Local

import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

/**
 * Dashboard component
 */
export default {
  components: {
    vueDropzone: vue2Dropzone,
    Layout,
    PageHeader,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    FormWizard,
    TabContent,
  },
  data() {
    return {
      title: "Administracion de usuarios",
      items: [
        {
          text: "Gestión corporativa",
          color:"#ffffff",
        },
        {
          text: "Usuarios",
          color:"#ffffff",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      ver:false,
      url:"",
      url_firma:"",
      modal: true,
      file:null,
      firma:null,
      email: "",
      password: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5,10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["nombre","Tipo_de_Usuario","estado","actions"],
      users: [], 
      areas: [],
      cargos: [],
      regionales: [],
      regional: [],
      editMode:false,
      form:{
          'id':'',
          'area_id':'',
          'nombre':'',
          'username':'',
          'apellido':'',
          'email':'',
          'telefono':'',
          'tipo':'',
          'sexo':'',
          'entidad':'',
          'cargo':'',
          'codigo':'',
          'foto':'',
          'password':'',
          'repass':'',
          'roles':'',
          'direccion':'',
          'regional':'',
          'status':'',
          
      }
    }
  },
  computed:{
        ...mapState(['counter'])
   },
  created(){
    this.listarUsers();
  },
  methods: {
     ...mapActions(['guardarUsuario']),
    async submit() {
      console.log("email submitted!");
    },
    switchLoc(){
      if (!this.editMode) {
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarUsuario();
            } else {
            }
          });        
      }else{
        this.$refs.form.validate().then(esValido => {
        if (esValido) {
          this.editarUsuario();
        } else {
          
        }
      });
      }
   },
       onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
   async agregarUsuario(){
     let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        data.append(key,formulario[key]);
      }
      if (this.file) {
        data.append('filename',this.file);
       }
       await  this.axios.post('api/user/create', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal('Creado!!!','','success');
               this.listarUsers();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
                this.$swal('Nose pudo crear este email esta siendo usado por otro usuario','','warning');
            });
      },
    async editarUsuario(){
     let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        data.append(key,formulario[key]);
      }
      if (this.file) {
       data.append('filename',this.file);
      }
      await  this.axios.post('api/user/update', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
              }}).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarUsers();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
             
              this.$swal('ocurrio un problema','','warning');
            });
     },
    setear(id) {
      for (let index = 0; index < this.users.length; index++) {
        if (this.users[index].id===id) {
          this.form.id=this.users[index].id;
          this.form.nombre=this.users[index].nombre;
          this.form.username=this.users[index].username;
          this.form.apellido=this.users[index].apellido;
          this.form.email=this.users[index].email;
          this.form.telefono=this.users[index].telefono;
          this.form.tipo=this.users[index].tipo;
          this.form.sexo=this.users[index].sexo;
          this.form.entidad=this.users[index].entidad;
          this.form.cargo=this.users[index].cargo;
          this.form.regional=this.users[index].regional;
          this.form.codigo=this.users[index].codigo;
          this.form.tipo_tecnico=this.users[index].tipo_tecnico;
          this.form.cuenta=this.users[index].cuenta;
          this.form.area_id=this.users[index].area_id;
          this.form.nombre_cuenta=this.users[index].nombre_cuenta;
          this.form.tipo_tecnico=this.users[index].tipo_tecnico;
          this.form.tipo_cuenta=this.users[index].tipo_cuenta;
          this.form.codigo=this.users[index].codigo;
          this.form.status=this.users[index].status;
          this.form.direccion=this.users[index].direccion;
          this.form.dependencia=this.users[index].dependencia;
          this.$root.$emit("bv::show::modal", "modal", "#btnShow");
          return;
        }
      }
    },
  async  listarUsers(){
    await  this.axios.get('api/user/all')
      .then((response) => {
        this.users = response.data.rows;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    async  listarregional(){
      await  this.axios.get('api/regional')
        .then((response) => {
          this.regionales = response.data.rows;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
    },
    setEmail(){
      this.form.username=this.form.email;
    },
    setRoles(){
      if (this.form.tipo==="Administrador") {
          this.form.codigo="";
          this.form.entidad="No";
          this.form.cargo=""
          this.form.roles="3"
      } else if(this.form.tipo==="Coordinador") {
          this.form.entidad="No";
          this.form.cargo="";
          this.form.roles="2"
      }else{
           this.form.roles="1"
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    onFileChangeFirma(e) {
      const firma = e.target.files[0];
      this.url_firma = URL.createObjectURL(firma);
    },
    toggleModal () {
       this.modal = !this.modal
     },
	session(){
		if (localStorage.getItem('token')) {
			const token=localStorage.getItem('token');
			this.guardarUsuario(token);
			
		}else{
			this.$router.push({ name: 'Home' });
		}
	}
  },
    created(){
		  this.session();
      this.listarUsers();
    },
    computed: {
    rows() {
      return this.users.length;
    },
  },
}
</script>
