

<template>
  <Layout  class="authentication-bg">
    <PageHeader :title="title" :items="items"  />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');resete();editMode=false;">Crear cliente</b-button>
    </div>
    <div class="row ">
      <div class="col-12 ">
        <div class="card " style="background-color:rgba(0,0,0,0.5); color:#fff;">
          <div class="card-body">
            <h4 class="card-title"></h4>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length ">
                  <label class="d-inline-flex align-items-center">
                    Mostrar&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;Clientes
                  </label>
                </div>
              </div>
              <!-- Buscar Cliente -->
              <div class="col-sm-12 col-md-6 ">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Buscar Cliente:
                    <b-form-input
                      v-model="filter"
                      type="Buscar Cliente"
                      placeholder="Buscar Cliente..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End Buscar Cliente -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0 " style="color:#fff; min-height:300px;">

              <b-table
              
                light
                :items="clientes"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                variant="danger"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
                 style="color:#fff;"
              >
              <template v-slot:cell(estado)="data">
                <span v-if="data.item.user.status==='activo'" class="badge badge-success">Activo</span>
                
                <span v-else class="badge badge-danger">Inactivo</span>
               </template> 
                <template v-slot:cell(actions)="data">

                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Action
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                  <b-dropdown-item-button@click="editMode=true;setear(data.item.id)">Editar</b-dropdown-item-button>
                </b-dropdown>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
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
        <b-modal id="modal" false size="lg" hide-footer  title="Gestión de clientes" ok-only>
          <ValidationObserver ref="form">
            <form-wizard next-button-text="Siguiente" back-button-text="Anterior" finish-button-text="---"  color="#7fa3a3" transition="fade">
             <!--Paso 0-->
            <tab-content title="Bienvenido"  subtitle="Paso 1" icon="ri-star-3-fill">
                    <b-row>
                    <b-col>
                      <p align="center"><h5 align="center">Bienvenido al Formulario de creación de Clientes</h5></p>
                      <p align="justify">
                        <b>En el siguiente formulario podrá agregar, editar o actualizar los clientes segun el cliente y la empresa que lo haya solicitado</b> 
                      </p>
                    </b-col>
                      <b-col>
                      
                      <p align="center"><img src="@/assets/images/undraw_fill_form_re_cwyf.svg" width="450" height="250" alt=""></p>
                        
                      </b-col>
                    </b-row>
            
            </tab-content>
            <!---Paso 1--->
            <tab-content title="Datos Personales"  subtitle="Paso 1" icon="ri-user-3-fill">
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
                          <input v-model="form.email" @keyup="setEmail()" type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
        
                <b-col>
                  <div class="form-group">
                    <label>Telefono</label>
                    <ValidationProvider name="telefono" rules="required" v-slot="{ errors }">
                          <input v-model="form.telefono"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
             <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Fax</label>
                    <ValidationProvider name="email" rules="required" v-slot="{ errors }">
                          <input v-model="form.fax"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
        
                <b-col>
                  <div class="form-group">
                    <label>Celular</label>
                    <ValidationProvider name="celular" rules="required" v-slot="{ errors }">
                          <input v-model="form.celular"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
            </tab-content >
            <!--Paso 2-->
            <tab-content title="Estado de Cliente"  subtitle="Paso 1" icon="ri-lock-password-fill" >
               <b-row >
                <b-col>
                  <div class="form-group">
                    <label>Sector</label>
                    <ValidationProvider name="status" rules="required" v-slot="{ errors }">
                          <select v-model="form.sector"  name="tipo" class="form-control form-control-lg" >
                              <option value="Público">Público</option>
                              <option value="Privado">Privado</option>
                          </select>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
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
            <b-row class="mb-2">
               <b-col>
                   <label>Imagen</label>
                   <div id="preview mb-2">
                     <img v-if="url" width="100%" style="float:center!importan" class="rounded"  :src="url" />
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
            <!--Paso 3-->
            <tab-content title="Finalizar"  subtitle="Paso 1" icon="ri-check-fill" >
             <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Crear Cliente</button>
             <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Guardar Cambios</button>
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
    TabContent
  },
  data() {
    return {
      title: "Administracion de Clientes",
      items: [
        {
          text: "Gestión corporativa"
        },
        {
          text: "Clientes",
          active: true
        },
        
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
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["nombre","telefono", "email", "sector", "estado","actions"],
      clientes: [], 
      areas: [],
      cargos: [],
      regionales: [],
      regional: [],
      editMode:false,
      form:{
          'id':'',
          'logo':'',
          'nombre':'',
          'direccion':'',
          'telefono':'',
          'fax':'',
          'celular':'',
          'email':'', 
          'status':'', 
          'sector':'', 
          'password':'',
      }
    }
  },
  computed:{
        ...mapState(['counter'])
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
              this.agregarCliente();
            } else {
            }
          });        
      }else{
        this.$refs.form.validate().then(esValido => {
        if (esValido) {
          this.editarCliente();
        } else {
          
        }
      });
      }
   },
    resete(){
        var formulario = this.form;
        for (var key in formulario) {
             this.form[key]="";
       }
      },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
   async agregarCliente(){
     let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        data.append(key,formulario[key]);
      }
      if (this.file) {
        data.append('filename',this.file);
       }
       await  this.axios.post('api/clientes', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal('Cliente creado exitosamente','','success');
               this.listarClientes();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
                this.$swal('Ocurrio un problema al crear el cliente','','warning');
            });
      },
    async editarCliente(){
     let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        data.append(key,formulario[key]);
      }
      if (this.file) {
       data.append('filename',this.file);
      }
      await  this.axios.put('api/clientes', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
              }}).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarClientes();
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
      for (let index = 0; index < this.clientes.length; index++) {
        if (this.clientes[index].id===id) {
          this.form.id=this.clientes[index].id;
          this.form.user_id=this.clientes[index].user_id;
          this.form.nombre=this.clientes[index].nombre;
          this.form.direccion=this.clientes[index].direccion;
          this.form.telefono=this.clientes[index].telefono;
          this.form.fax=this.clientes[index].fax;
          this.form.celular=this.clientes[index].celular;
          this.form.sector=this.clientes[index].sector;
          this.form.email=this.clientes[index].email;
          this.form.status=this.clientes[index].user.status;
          this.url=this.clientes[index].logo;
          this.$root.$emit("bv::show::modal", "modal", "#btnShow");
          return;
        }
      }
    },
  async  listarClientes(){
    await  this.axios.get('api/clientes')
      .then((response) => {
        this.clientes = response.data;
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
      this.listarClientes();
    },
    computed: {
    rows() {
      return this.clientes.length;
    },
  },
}
</script>
