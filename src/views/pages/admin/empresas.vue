<template>
  <Layout class="authentication-bg">
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');resete();editMode=false;">Crear empresas</b-button>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card" style="background-color:rgba(0,0,0,0.5); color:#fff;">
          <div class="row p-2">
              <div class="col-3 pl-3">
                  <label>Filtrar Empresas por Clientes</label>
                    <v-select v-model="client" :options="clientes" :reduce="clientes => clientes.id"  :getOptionLabel="option => option.nombre" aria-placeholder="Seleccione su cliente" style="background-color:rgba(255,255,255,0.5); color:#fff; border-radius:25px;"></v-select>
              </div>
          </div>
          <div class="card-body">
            <h4 class="card-title"></h4>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Mostrar&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;Empresas
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Buscar o filtrar empresa:
                    <b-form-input
                      v-model="filter"
                      type="Buscar o filtrar empresa"
                      placeholder="Buscar o filtrar empresa..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0" style="min-height:350px">

              <b-table
                :items="empresas"
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
              <template v-slot:cell(status)="data">
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
                  <b-dropdown-item-button@click="editMode=true;eliminar(data.item.id)">Eliminar</b-dropdown-item-button>
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
   
        <b-modal id="modal" false size="lg" hide-footer  title="Gestión de empresas" ok-only>
          <ValidationObserver ref="form">
            <form-wizard next-button-text="Siguiente" back-button-text="Anterior" finish-button-text="---"  color="#7fa3a3" transition="fade">
            <!---Paso 0--->
            <tab-content title="Bienvenido"  subtitle="Paso 1" icon="ri-star-3-fill">
                    <b-row>
                    <b-col v-if="form.cliente_id!=''">
                    <br><br>
                      <p align="center"><h5 align="center">Bienvenido al Formulario de actualización de Proyectos
                      </h5></p>
                     <p align="justify">
                        <b>En el siguiente formulario podrá  editar o actualizar la información de la empresa según lo solicitado por el supervisor en caso de no haber sido aprobado el proyecto o que se deba modificar antes de enviar a su aprobación.</b> 
                      </p>
                    </b-col>
                    <b-col v-else-if="form.cliente_id==''"><p align="center"><h5 align="center">Bienvenido al Formulario de creación de Empresas</h5></p>
                      <p align="justify">
                        <b>En el siguiente formulario podrá agregar la empresa según los criterios que hayan sido solicitados por el cliente</b> 
                      </p>
                       
                    </b-col>
                      <b-col>
                      
                      <p align="center"><img src="@/assets/images/forms/empresa.svg" width="450" height="250" alt=""></p>
                        
                      </b-col>
                    </b-row>
            
            </tab-content>
            <!---Paso 1--->
            <tab-content title="Datos de Cliente y descripción de la Empresa"  subtitle="Paso 1" icon="ri-user-3-fill">
            <b-row>
            <b-col><br><br>
                  <h5> Paso 1: Datos de Cliente y descripción de la Empresa</h5><br>
                  <p align="justify" v-if="form.cliente_id!==''">                        
                      Actualice la información necesaria solicitada por el supervisor o el cliente en cuanto a la empresa, asegurese de que está eligiendo el cliente correspondiente a la empresa que se va a editar.

                  </p>
                  <p align="justify" v-else>                        
                      Para la creación de la empresa debe elegir el cliente y llenar los campos correspondientes a la información de la empresa.

                  </p>
                  <p align="center"><img src="@/assets/images/forms/undraw_Collaboration.svg" width="200" alin="center" height="200" alt=""></p>
                        
            </b-col>
              <b-col>
                  <label>Logo de la Empresa</label>
                      <div id="preview mb-2">
                      <p align="center">
                      <img v-if="url" width="140" align="center" style="float:center!importan" height="120" class="rounded"  :src="url" />
                      </p>
                      </div>
                        <b-form-file
                            v-model="file"
                            placeholder="Seleccione el logo..."
                            drop-placeholder="Drop file here..."
                            @change="onFileChange"
                        ></b-form-file>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Cliente {{form.dependencia}}</label>
                    <v-select v-model="form.cliente_id" :options="clientes" :reduce="clientes => clientes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Fundada</label>
                   <b-form-datepicker id="example-datepicker" v-model="form.fundada" class="mb-2"></b-form-datepicker>
               <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
                 <div class="form-group">
                  <label>Nombre </label>
                  <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                        <input v-model="form.nombre"  type="text" class="form-control" placeholder=" ">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label>Cargo del contacto </label>
                  <ValidationProvider name="cargo del contacto" rules="required" v-slot="{ errors }">
                        <input v-model="form.cargo_contacto"  type="text" class="form-control" placeholder=" ">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                    <label>Actividad o sector de la Empresa </label>
                    <ValidationProvider name="rubro" rules="required" v-slot="{ errors }">
                            <input v-model="form.rubro"  type="text" class="form-control" placeholder=" ">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
              </b-col>
            </b-row>

            </tab-content >
            <!--Paso 2-->
            <tab-content title="Datos de empleados y logo de la Empresa"  subtitle="Paso 1" icon="ri-lock-password-fill" >
                <b-row class="mb-2">
                  <b-col class="col-6"><br><br>
                  <h5>Paso 2: Datos de empleados y logo de la Empresa</h5>
                  <p align="justify" v-if="form.cliente_id!==''">                        
                        Actualice la información de la empresa segun lo solicitado por el cliente o supervisor, ya sea volúmen de facturación, porcentaje de mujeres, etc.
                  </p>
                  <p align="justify" v-else>                        
                        Indique la cantidad de empleados, volúmen de facturación y demas datos necesarios para la creación de la empresa.
                  </p>
                  <p align="center"><img src="@/assets/images/forms/trabajadores.svg" width="200" alin="center" height="200" alt=""></p>
                        
            </b-col>

            
                  <b-col>
                  <br><br><br><br>
                    <div class="form-group">
                    <label>Numero de empleados </label>
                    <ValidationProvider name="numero de empleados" rules="required" v-slot="{ errors }">
                            <input v-model="form.numero_empleados"  type="text" class="form-control" placeholder=" ">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                     <div class="form-group">
                    <label>Volumen de facturación</label>
                    <ValidationProvider name="volumen de facturación" rules="required" v-slot="{ errors }">
                          <input v-model="form.volumen_facturacion"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  </b-col>
                  <b-col>
                  <br><br><br><br>
                    <div class="form-group">
                    <label>Porcentaje de mujeres </label>
                    <ValidationProvider name="Porcentaje de mujeres" rules="required" v-slot="{ errors }">
                            <input v-model="form.procentaje_mujeres"  type="text" class="form-control" placeholder=" ">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                    <div class="form-group">
                    <label>Dirección</label>
                    <ValidationProvider name="dirección" rules="required" v-slot="{ errors }">
                          <textarea v-model="form.direccion" rows="1"  type="text" class="form-control" placeholder=" "></textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                     
                  
                </b-col>
            </b-row>

 
            </tab-content>
            <!--Paso 3-->
            <tab-content title="Crear/Actualizar Empresa"  subtitle="Paso 3" icon="ri-check-fill" >
                                <b-row>

                      <b-col>
                          <h5 align="center">Paso 3: Crear/Actualizar Empresa</h5>
                      <p align="center" v-if="form.cliente_id!==''">                        
                        Guarde los cambios realizados en la empresa y mantengase al tanto de notificaciones del supervisor a cargo.
                  </p>
                  <p align="center" v-else>                        
                        Haga clic en <b>Crear Empresa</b> para agregar el registro de la misma en nuestro sistema.
                  </p>
                      <p align="center"><img src="@/assets/images/forms/undraw_Updated_resume_re_q1or.svg" width="210" alin="center" height="210" alt=""></p>
                      <b-row>
                        <b-co-3></b-co-3>
                        <b-co-3 class="offset-5">                      <p align="center" style="width:160px; margin-left:-15%;"> 
                      <button class="btn btn-block float-right btn-success" size="10" @click="switchLoc" v-if="!ver && !editMode">Crear Empresa</button>
                      <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Guardar Cambios</button>
                      </p></b-co-3>
                        <b-co-3></b-co-3>
                      </b-row>
              
                      </b-col>
                    </b-row>

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
      title: "Administracion de Empresas",
      items: [
        {
          text: "Gestión corporativa"
        },
        {
          text: "empresas",
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
      pageOptions: [10, 25, 50, 100],
      filter: null,
      client: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["nombre","actions"],
      empresas: [], 
      areas: [],
      clientes: [],
      regionales: [],
      regional: [],
      editMode:false,
      form:{
        'nombre':'',
	    'cargo_contacto':'',
	    'rubro':'',
	    'logo':'',
	    'numero_empleados':'',
	    'procentaje_mujeres':'',
	    'volumen_facturacion':'',
	    'direccion':'',
	    'fundada':'',
      }
    }
  },
  computed:{
        ...mapState(['usuarioDB'])
   },
  watch: {
    cliente: function (val) {
      this.form.cliente_id=val;
      this.listarEmpresas();
    },
    client: function (val) {
      this.form.cliente_id=val;
      this.listarEmpresa();
    }
  },
  created(){
    this.listarempresas();
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
              this.agregarEmpresa();
            } else {
            }
          });        
      }else{
        this.$refs.form.validate().then(esValido => {
        if (esValido) {
          this.editarEmpresa();
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
   async agregarEmpresa(){
     let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        data.append(key,formulario[key]);
      }
      if (this.file) {
        console.log(this.file);
        data.append('filename',this.file);
       }
       await  this.axios.post('api/empresas', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal('Creado!!!','','success');
               this.listarempresas();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
                for (var key in formulario) {
                   this.form[key]="";
                 }
              }
            }).catch(e => {
                this.$swal('Nose pudo crear!!!','','warning');
            });
      },
    async editarEmpresa(){
     let data = new FormData();
      var formulario = this.form;
      for (var key in formulario) {
        data.append(key,formulario[key]);
      }
      if (this.file) {
        console.log(this.file);
       data.append('filename',this.file);
      }
      await  this.axios.put('api/empresas', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
              }}).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarempresas();
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
      for (let index = 0; index < this.empresas.length; index++) {
        if (this.empresas[index].id===id) {
        this.form.id=this.empresas[index].id;
        this.form.nombre=this.empresas[index].nombre;
	    this.form.cargo_contacto=this.empresas[index].cargo_contacto;
	    this.form.rubro=this.empresas[index].rubro;
	    this.form.logo=this.empresas[index].logo;
	    this.form.numero_empleados=this.empresas[index].numero_empleados;
	    this.form.procentaje_mujeres=this.empresas[index].procentaje_mujeres;
	    this.form.volumen_facturacion=this.empresas[index].volumen_facturacion;
	    this.form.direccion=this.empresas[index].direccion;
	    this.form.fundada=this.empresas[index].fundada;
        this.form.cliente_id=this.empresas[index].cliente_id;
        this.url=this.empresas[index].logo;
          this.$root.$emit("bv::show::modal", "modal", "#btnShow");
          return;
        }
      }
    },
     async eliminarempresa(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/empresas/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarempresas();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminar(id){
        this.$swal({
          title: 'Desea borrar esta empresa?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarempresa(id);
          }
        })
      },
  async  listarempresas(){
    await  this.axios.get('api/empresas')
      .then((response) => {
        this.empresas = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    async listarEmpresa(){
    let data = new FormData();
    data.append('cliente_id',this.form.cliente_id);
    await this.axios.post('api/empresas/listar',data)
      .then((response) => {
        this.empresas = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
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
      this.listarempresas();
      this.listarClientes();
    },
    computed: {
    rows() {
      return this.empresas.length;
    },
  },
}
</script>
