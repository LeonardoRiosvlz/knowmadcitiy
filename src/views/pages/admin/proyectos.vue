<template>
  <Layout  class="authentication-bg">
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');resete();editMode=false;">Crear proyectos</b-button>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card" style="background-color:rgba(0,0,0,0.5); color:#fff;">
            <div class="row p-2">
              <div class="col-4 pl-4">
  
                  <label>Seleccione el cliente para filtrar sus proyectos</label>
                    <v-select v-model="client" :options="clientes" :reduce="clientes => clientes.id"  :getOptionLabel="option => option.nombre"  style="background-color:rgba(255,255,255,0.5); color:#fff; border-radius:25px;"></v-select>
                 
            
              </div>
              <div class="col-4 pl-4">
                            <!-- Search -->
              <label class="d-inline-flex align-items-center">
                    Buscar: escriba el nombre del proyecto</label>
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Escriba el nombre del proyecto aqui..."
                      class="form-control form-control-sm ml-2"
                    style="background-color:rgba(255,255,255,0.5); color:#fff; border-radius:25px;"></b-form-input>
                  <!-- End search -->
              </div>
          </div>
          <div class="card-body" >
            <h4 class="card-title"></h4>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Mostrar&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;Proyectos
                  </label>
                  
                </div>
              </div>

            </div>
            <!-- Table -->
            <div class="table-responsive mb-0" style="min-height:400px">

              <b-table
                :items="proyectos"
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
              <template v-slot:cell(empresa)="data">
                {{data.item.empresa.nombre}}
              </template>
              <template v-slot:cell(estado)="data">
                <span v-if="data.item.status==='Creado'" class="badge badge-info">Creado</span>
                 <span v-if ="data.item.status==='Pendiente'" class="badge badge-warning">Pendiente</span>
                 <span v-if ="data.item.status==='Aprobado'" class="badge badge-success">Aprobado</span>
                 <span v-if ="data.item.status==='Rechazado'" class="badge badge-danger">Rechazado</span>
              </template>
                <template v-slot:cell(actions)="data">
                
                <b-dropdown size="sm" class="">
                  <template v-slot:button-content>
                    Acciones
                    <i class="mdi mdi-chevron-down"></i>
                  </template>
                  <b-dropdown-item-button@click="notificarConsulta(data.item.id,data.item.aprueba_id)">Notificar</b-dropdown-item-button>
                  <b-dropdown-item-button@click="notificarConsultaAprobar(data.item.id,data.item.elabora_id)">Aprobar</b-dropdown-item-button>
                  <b-dropdown-item-button@click="editMode=true;setearObservaciones(data.item.id)">Rechazar</b-dropdown-item-button>
                  <b-dropdown-item-button@click="editMode=true;setear(data.item.id)">Editar Proyecto</b-dropdown-item-button>
                  <b-dropdown-item-button@click="editMode=true;eliminar(data.item.id)">Eliminar Proyecto</b-dropdown-item-button>
                  <b-dropdown-item-button><a :href="'proyecto/'+data.item.id">Ver</a></b-dropdown-item-button>
                    
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
    </div><br><br><br>

        

        <b-modal id="modal" false size="lg" hide-footer  title="Gestión de proyectos" ok-only>
          <ValidationObserver ref="form">
          <form-wizard next-button-text="Siguiente" back-button-text="Anterior" finish-button-text="---"  color="#7fa3a3" transition="fade">
            <!--Paso 0-->
            <tab-content title="Bienvenido"  subtitle="Paso 1" icon="ri-star-3-fill">
                    <b-row>
                    <b-col v-if="form.titulo!=''">
                      <p align="center"><h5 align="center">Bienvenido al Formulario de actualización de Proyectos</h5></p>
                      <p align="justify">
                        <b>En el siguiente formulario podrá  editar o actualizar el proyecto según lo solicitado por el supervisor en caso de no haber sido aprobado el proyecto o que se deba modificar antes de enviar a su aprobación.</b> 
                      </p>
                    </b-col>
                    <b-col v-else>
                      <p align="center"><h5 align="center">Bienvenido al Formulario de creación de Proyectos</h5></p>
                      <p align="justify">
                        <b>En el siguiente formulario podrá crear su proyecto según los criterios que hayan sido solicitados</b> 
                      </p>
                    </b-col>
                      <b-col>
                      
                      <p align="center"><img src="@/assets/images/undraw_fill_form_re_cwyf.svg" width="450" height="250" alt=""></p>
                        
                      </b-col>
                    </b-row>
            
            </tab-content>
            <!--Paso 1-->
            <tab-content title="Seleccionar Cliente y empresa"  subtitle="Paso 1" icon="ri-user-3-fill" >
                   <b-row>
                      <b-col><br><br>
                          <p align="justify" v-if="form.id!=''">Paso 1: Actualice la información necesaria ya sea el cliente, la empresa correspondiente o el surpervisor encargado de aprobar este proyecto.</p>
                          <p align="justify" v-else>Paso 1: Elija el cliente, la empresa correspondiente y el surpervisor encargado de aprobar este proyecto.</p>
                          <p align="center"><img src="@/assets/images/forms/undraw_Collaboration.svg" width="120" alin="center" height="120" alt=""></p>
                        
                      </b-col>
                      <b-col>
                        <ValidationProvider name="cliente" rules="required" v-slot="{ errors }">
                          <label>Cliente</label>
                            <v-select v-model="cliente" :options="clientes" :reduce="clientes => clientes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      
                        <ValidationProvider name="empresas" rules="required" v-slot="{ errors }">
                          <label>Empresas </label>
                            <v-select v-model="form.empresa_id" :options="empresas" :reduce="empresas => empresas.id"  :getOptionLabel="option => option.nombre" ></v-select>
                            <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>

                        <ValidationProvider name="Aprueba" rules="required" v-slot="{ errors }">
                            <label>Supervisor que aprobará el Proyecto</label>
                               <v-select v-model="form.aprueba_id" :options="users" :reduce="users => users.id"  :getOptionLabel="option => option.nombre" ></v-select>
                              <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </b-col>
                      
                    </b-row>
                  

            </tab-content>
            <!--Paso 2-->
            <tab-content title="Descripción del Proyecto"  subtitle="Paso 2" icon="ri-building-2-fill">
                    <b-row>
                    <b-col><br><br>
                          <p align="justify" v-if="form.id!=''">Paso 2: Actualice la información necesesaria o solicitada como la descripción corta y descripción de la iniciatavita del proyecto:</p>
                          <p align="justify" v-else>Paso 2: Indique el título, descripción corta y descripción de la iniciatavita del proyecto:</p>
                          <p align="center"><img src="@/assets/images/forms/document.svg" width="120" alin="center" height="120" alt=""></p>
                        
                      </b-col>
                    <b-col>
                        <div class="form-group">
                          <label>Titulo del Proyecto </label>
                          <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                                <input v-model="form.titulo"  type="text" class="form-control" placeholder=" ">
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
 
                        <div class="form-group">
                          <label>Descripción corta </label>
                          <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                                <textarea v-model="form.descripcion"  type="text" class="form-control" placeholder=" "></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>

                        <label>Descripción de la iniciativa </label>
                            <input v-model="form.iniciativa"  type="text" class="form-control" placeholder=" " size="2"><br>
                            <p align="center"><button class="btn btn-sm btn-success " @click="cargarIniciativa()" :disabled="form.iniciativa===''">Añadir Iniciativa</button></p>
                              
                    </b-col>
                    <b-col>
                    <h5>Iniciativas Agregadas:</h5>
                       <ol>
                         <li v-for="(iniciativa, index) in form.descripcion_iniciativa" :key="index">{{iniciativa.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarIniciativa(index)">x</button></li>
                       </ol>
                    </b-col>
                    </b-row>
       
            </tab-content>
            <!--Paso 3-->
            <tab-content title="Justificación del proyecto"  subtitle="Paso 3"  icon="ri-currency-fill">
                    <b-row>
                     <b-col><br><br>
                          <p align="justify" v-if="form.id!=''">Paso 3: Actualice la información necesaria como la justificación, objetivos, dimensiones y presupuesto del proyecto:</p>
                          <p align="justify" v-else>Paso 3: Indique la justificación, objetivos, dimensiones y presupuesto del proyecto:</p>
                          <p align="center"><img src="@/assets/images/forms/presupuesto.svg" width="140" alin="center" height="140" alt=""></p>
                        
                      </b-col>
                      <b-col>
                        <div class="form-group">
                          <label>Justificación de la necesidad: </label>
                          <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                                <textarea rows="8" cols="7" v-model="form.justificacion"  type="text" class="form-control" placeholder=" "></textarea>
                                <span style="color:red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      </b-row>      
                      <b-row>
                        <b-col>
                          <div class="col-11">
                              <div class="form-group form-inline">
                                  <label>Agregar Promotores:&nbsp;</label>
                                    
                                    <input v-model="form.promotor"  type="text" class="form-control" placeholder=" ">
                                      <button class="btn btn-success " @click="cargarPromotor()" :disabled="form.promotor===''">+</button>
                                    
                                    
                                </div>
                            </div >
                        </b-col>
                          <b-col>
                          <h6>Promotores agregados:</h6>
                            <ol>
                              <li v-for="(promotor, index) in form.promotores" :key="index">{{promotor.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarpromotor(index)">X</button></li>
                            </ol>
                          </b-col>
                      </b-row>

                      <b-row>
                        <b-col>
                          <div class="col-11">
                            <div class="form-group form-inline">
                              <label>Agregar Objetivos de la iniciativa: </label>
                                  <input v-model="form.objetivo"  type="text" class="form-control" placeholder=" ">
                                  <button class="btn btn-success " @click="cargarObjetivo()" :disabled="form.objetivo===''">+</button>
                              </div>
                          </div >
                        </b-col>
                          <b-col>
                              <h6>Obejtivos de la Iniciativa agregados</h6>
                            <ol>
                              <li v-for="(objetivo, index) in form.objetivos" :key="index">{{objetivo.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarObjetivo(index)">X</button></li>
                            </ol>
                          </b-col>
                      </b-row>
                      <b-row>
                          <b-col>
                              <div class="col-11">
                                <div class="form-group  form-inline">
                                  <label>Dimension Ecológica: </label>
                                      <input v-model="form.ecologica"  type="text" class="form-control" placeholder=" ">
                                      <button class="btn btn-success " @click="cargarEcologica()" :disabled="form.ecologica===''">+</button>
                                  </div>
                              </div >
                          </b-col>
                            <b-col>
                            <h6>Dimensión Ecológica:</h6>
                              
                              <ol>
                                <li v-for="(ecologica, index) in form.dimension_ecologica" :key="index">{{ecologica.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarEcologica(index)">X</button></li>
                              </ol>
                            </b-col>
                      </b-row>
                      <b-row>
                          <b-col>
                            <div class="col-11">
                              <div class="form-group form-inline">
                                <label>Dimension Digital:</label>
                                    <input v-model="form.digital"  type="text" class="form-control" placeholder=" ">
                                    <button class="btn btn-success " @click="cargarDigital()" :disabled="form.dimension_digital===''">+</button>
                                </div>
                            </div >
                          </b-col>
                        
                          <b-col>
                            <h6>Dimension Digital:</h6>
                              <ol>
                                <li v-for="(objetivo, index) in form.dimension_digital" :key="index">{{objetivo.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarDigital(index)">X</button></li>
                              </ol>
                          </b-col>
                          
                      </b-row>
                      <b-row>
                        <b-col>
                          <div class="form-group">
                            <label v-if="form.presupuesto!=''">Actualizar Presupuesto</label>
                            <label>Presupuesto</label>
                            <ValidationProvider name="numero de empleados" rules="required" v-slot="{ errors }">
                                    <input v-model="form.presupuesto"  type="text" class="form-control" placeholder=" ">
                                    <span style="color:red">{{ errors[0] }}</span>
                            </ValidationProvider>
                            </div>
                        </b-col>
                        <b-col>
                        <div v-if="form.presupuesto!=''">
                          <h6>Presupuesto actual:</h6>
                          {{form.presupuesto}}&nbsp;€
                        </div>
                          
                        </b-col>
                      </b-row>

            </tab-content>
            <!--Paso 4-->
            <tab-content title="Guardar Proyecto"  subtitle="Paso 4" icon="ri-save-2-fill">
                <b-row>
                  <b-col>
                  <br><br>
                          <p align="center"><img src="@/assets/images/forms/subirpro.svg" width="180" alin="center" height="180" alt=""></p>
                          <p align="justify" v-if="form.titulo!=''">Paso 4: Proyecto Actualizado, ya solo falta guardar los cambios y notificar al subervisor:</p>
                           <p align="justify" v-else>Paso 4: Proyecto Completo, ya solo falta crear el proyecto y notificar al subervisor:</p>

                  </b-col>
                  <b-col><br>
                    <p align="center"><img src="@/assets/images/forms/nott.svg" width="140" alin="center" height="140" alt=""></p>
                    <h6>Su Proyecto será cargado y debe crear la notificación al supervisor para que proceda a la revisión.</h6>
                      <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Crear Proyecto</button>
              <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Guardar Cambios</button>
                  </b-col>
                </b-row>

            
            </tab-content>
          </form-wizard>
        </ValidationObserver>
      </b-modal>


  <b-modal id="modal_observaciones" hide-footer>
    <b-row>
    <b-col>
        <p align="center">
           <p align="center"><img src="@/assets/images/forms/cancel.svg" width="180" alin="center" height="180" alt=""></p>
        </p>
    </b-col>
      <b-col>
        <div class="form-group">
          <label>Razones del rechazo del Proyecto:</label>
            <textarea cols="7" rows="6" v-model="form.observaciones"  type="text" class="form-control" placeholder=" "></textarea>
        </div>
      </b-col>
    </b-row>
    <button class="btn btn-danger btn-block" @click="notificarConsultaRechazar()" :disabled="form.observaciones===''"> Rechazar</button>
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
///https://www.npmjs.com/package/vue-html2pdf
////https://vuejs.org/v2/guide/transitions.html;
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import vue2Dropzone from "vue2-dropzone";
import {mapState,mapMutations, mapActions} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import VueHtml2pdf from 'vue-html2pdf'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

// Local

import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VueDocPreview from 'vue-doc-preview'
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
    VueHtml2pdf,
    FormWizard,
    TabContent,
    VueDocPreview,
  },
    
  data() {
    return {
      title: "Administración de Proyectos",
      items: [
        {
          text: "Gestión corporativa"
        },
        {
          text: "proyectos",
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
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["titulo","presupuesto","empresa","estado","actions"],
      proyectos: [], 
      areas: [],
      proyectos: [],
      empresas: [],
      clientes: [],
      clien: [],
      users: [],
      cliente:'',
      client:'',
      editMode:false,
      form:{
      'titulo':'',
      'iniciativa':'',
      'descripcion_iniciativa':[],
      'promotor':'',
      'digital':'',
      'ecologica':'',
      'observaciones':'',
      'descripcion':'',
	    'promotores': [],
      'dimension_ecologica':[],
      'dimension_digital': [],
      'metas': [],
      'objetivo':'',
	    'objetivos': [],
      'presupuesto':'',
      'empresa_id':'',
      'aprueba_id':'',
      }
    }
  },


  watch: {
    cliente: function (val) {
      this.form.cliente_id=val;
      this.listarEmpresas();
    },
    client: function (val) {
      this.form.cliente_id=val;
      this.listarProyectos();
    }
  },
  props:{
      finishButtonText: {
    type: String,
    default: 'Completar',
    hidden: true
  },
  },
  methods: {

     ...mapActions(['guardarUsuario']),
    async submit() {
      console.log("email submitted!");
      
    },
    resete(){
      var formulario = this.form;
     for ( var key in formulario) {
            if (key=='descripcion_iniciativa') {
                this.form.descripcion_iniciativa=[];
            }else if (key=='promotores') {
                this.form.promotores=[];
            }else if (key=='objetivos') {
                this.form.objetivos=[];
            }else if (key=='dimension_ecologica') {
                this.form.dimension_ecologica=[];
            }else if (key=='dimension_digital') {
                this.form.dimension_digital=[];
            }else{
                this.form[key]="";
            }
        }
      },
    switchLoc(){
      if (!this.editMode) {
        
        this.$refs.form.validate().then(esValido => {
            if (esValido) {
              this.agregarProyecto();
              
            } else {
            }
          });        
      }else{
        
        this.$refs.form.validate().then(esValido => {
        if (esValido) {
          this.editarProyecto();
         
        } else {
          
        }
      });
      }
   },
    cargarPromotor(){
      this.form.promotores.push({
       nombre:this.form.promotor,
      });
    },
    eliminarpromotor(index){
       this.form.promotores.splice(index, 1);  
    },
    cargarObjetivo(){
      this.form.objetivos.push({
       nombre:this.form.objetivo,
      });
    },
    eliminarObjetivo(index){
       this.form.objetivos.splice(index, 1);  
    },
    cargarIniciativa(){
      this.form.descripcion_iniciativa.push({
       nombre:this.form.iniciativa,
      });
    },
    eliminarIniciativa(index){
       this.form.descripcion_iniciativa.splice(index, 1);  
    },
    cargarDigital(){
       this.form.dimension_digital.push({
       nombre:this.form.digital,
      });/*
      this.form.dimension_digital.push({
       nombre:this.form.digital,
      });*/
    },
    eliminarDigital(index){
       this.form.dimension_digital.splice(index, 1);  
    },
    cargarEcologica(){
      this.form.dimension_ecologica.push({
       nombre:this.form.ecologica,
      });
    },
    eliminarEcologica(index){
       this.form.dimension_ecologica.splice(index, 1);  
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
   async agregarProyecto(){
     let data = new FormData();
      var formulario = this.form;

     for ( var key in formulario) {
            if (key=='descripcion_iniciativa'||key=='promotores'||key=='objetivos'||key=='dimension_ecologica'||key=='dimension_digital') {
                data.append(key,JSON.stringify(formulario[key]));
            }else{
                data.append(key,formulario[key]);
            }
        }
      if (this.file) {
        data.append('filename',this.file);
       }
       await  this.axios.post('api/proyectos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal('Creado!!!','','success');
               this.listarProyectos();
               this.$root.$emit("bv::hide::modal", "modal", "#btnShow");
               ///limpiar el formulario
              }
            }).catch(e => {
                this.$swal('Nose pudo crear!!!','','warning');
            });
      },
    async editarProyecto(){
     let data = new FormData();
      var formulario = this.form;
      for ( var key in formulario) {
            if (key=='descripcion_iniciativa'||key=='promotores'||key=='objetivos'||key=='dimension_ecologica'||key=='dimension_digital') {
                data.append(key,JSON.stringify(formulario[key]));
                
            }else{
                data.append(key,formulario[key]);
            }
      }
      if (this.file) {
        data.append('filename',this.file);
      }
      await  this.axios.put('api/proyectos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
              }}).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarProyectos();
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
    setearObservaciones(id) {
      for (let index = 0; index < this.proyectos.length; index++) {
        if (this.proyectos[index].id===id) {
          this.form.id=this.proyectos[index].id;
          this.form.observaciones=this.proyectos[index].observaciones;
          this.form.elabora_id=this.proyectos[index].elabora_id;
          this.$root.$emit("bv::show::modal", "modal_observaciones", "#btnShow");
          return;
        }
      }
    },
    setear(id) {
      for (let index = 0; index < this.proyectos.length; index++) {
        if (this.proyectos[index].id===id) {
        this.cliente=this.proyectos[index].empresa.cliente_id;
          this.form.id=this.proyectos[index].id;
          this.form.numero=this.proyectos[index].numero;
          this.form.titulo=this.proyectos[index].titulo;
          this.form.status=this.proyectos.status;
          this.form.presupuesto=this.proyectos[index].presupuesto;
          this.form.promotores=JSON.parse(this.proyectos[index].promotores);
          this.form.objetivos=JSON.parse(this.proyectos[index].objetivos);
          this.form.dimension_ecologica=JSON.parse(this.proyectos[index].dimension_ecologica);
          this.form.dimension_digital=JSON.parse(this.proyectos[index].dimension_digital);
          this.form.descripcion_iniciativa=JSON.parse(this.proyectos[index].descripcion_iniciativa);
          this.form.justificacion=this.proyectos[index].justificacion;
          this.form.descripcion=this.proyectos[index].descripcion;
          this.form.empresa_id=this.proyectos[index].empresa_id;
          this.form.archivo=this.proyectos[index].archivo;
          this.form.cliente_id=this.proyectos[index].empresa.cliente_id;
          this.form.aprueba_id=this.proyectos[index].aprueba_id;
          this.$root.$emit("bv::show::modal", "modal", "#btnShow");
          return;
        }
      }
    },
    verdocumento(id) {
      for (let index = 0; index < this.proyectos.length; index++) {
        if (this.proyectos[index].id===id) {
        this.cliente=this.proyectos[index].empresa.cliente_id;
          this.form.id=this.proyectos[index].id;
          this.form.numero=this.proyectos[index].numero;
          this.form.titulo=this.proyectos[index].titulo;
          this.form.status=this.proyectos.status;
          this.form.presupuesto=this.proyectos[index].presupuesto;
          this.form.promotores=JSON.parse(this.proyectos[index].promotores);
          this.form.objetivos=JSON.parse(this.proyectos[index].objetivos);
          this.form.dimension_ecologica=JSON.parse(this.proyectos[index].dimension_ecologica);
          this.form.dimension_digital=JSON.parse(this.proyectos[index].dimension_digital);
          this.form.descripcion_iniciativa=JSON.parse(this.proyectos[index].descripcion_iniciativa);
          this.form.justificacion=this.proyectos[index].justificacion;
          this.form.empresa_id=this.proyectos[index].empresa_id;
          this.form.archivo=this.proyectos[index].archivo;
          this.form.cliente_id=this.proyectos[index].empresa.cliente_id;
           this.form.aprueba_id=this.proyectos[index].empresa.aprueba_id;
          this.$root.$emit("bv::show::modal", "modal_ver", "#btnShow");
       
          return;
        }
      }
    },
     generateReport () {
            this.$refs.html2Pdf.generatePdf()
     },
     async eliminarProyecto(id){
        let data = new FormData();
        data.append('id',id);
        await this.axios.post('api/proyectos/delete',data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
              if (response.status==200) {
                this.$swal(
                    'Eliminado con exito!',
                      '',
                      'success'
                );
                this.listarProyectos();
                }
              }).catch(e => {
                console.log(e.response.data.menssage);
                this.$swal(e.response.data);
          });
      }, 
      eliminar(id){
        this.$swal({
          title: 'Desea borrar este proyecto?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarProyecto(id);
          }
        })
      },
      notificarConsulta(id,aprueba_id){
        this.$swal({
          title: '¿Desea notificar este proyecto al administrador?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.notificarProyecto(id,aprueba_id);
          }
        })
      },
      async  notificarProyecto(id,aprueba_id){
    let data = new FormData();
    data.append('aprueba_id',aprueba_id);
    data.append('id',id);
    await  this.axios.post('api/proyectos/notificar',data)
      .then((response) => {
        if (response.status==200) {
          this.$swal('Notificado con exito ','','success');
          this.listarProyectos();
        }
      })
      .catch((e)=>{
        this.$swal('ocurrio un problema','','warning');
      })
    },
          notificarConsultaAprobar(id,elabora_id){
        this.$swal({
          title: 'Desea aprobar este proyecto?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.notificarProyectoAprobacion(id,elabora_id);
          }
        })
      },
      async  notificarProyectoAprobacion(id,elabora_id){
    let data = new FormData();
    data.append('elabora_id',elabora_id);
    data.append('id',id);
    await  this.axios.post('api/proyectos/aprobar',data)
      .then((response) => {
        if (response.status==200) {
          this.$swal('Notificado con exito ','','success');
          this.listarProyectos();
        }
      })
      .catch((e)=>{
        this.$swal('ocurrio un problema','','warning');
      })
    },

      notificarConsultaRechazar(){
        this.$swal({
          title: 'Desea rechazar este proyecto?',
          icon: 'question',
          iconHtml: '',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.notificarProyectoRechazar();
          }
        })
      },
   async  notificarProyectoRechazar(){
    let data = new FormData();
    data.append('elabora_id',this.form.elabora_id);
    data.append('id',this.form.id);
    data.append('observaciones',this.form.observaciones);
    await  this.axios.post('api/proyectos/rechazar',data)
      .then((response) => {
        if (response.status==200) {
          this.$swal('Rechazado con exito ','','success');
          this.$root.$emit("bv::hide::modal", "modal_observaciones", "#btnShow");
          this.listarProyectos();
        }
      })
      .catch((e)=>{
        this.$swal('ocurrio un problema','','warning');
      })
    },
  async  listarclientes(){
    await  this.axios.get('api/clientes')
      .then((response) => {
        this.clientes = response.data;
        this.clien = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
 async  listarEmpresas(){
    let data = new FormData();
    data.append('cliente_id',this.form.cliente_id);
    await  this.axios.post('api/empresas/listar',data)
      .then((response) => {
        this.empresas = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
  async  listarProyectos(){
    let data = new FormData();
    data.append('cliente_id',this.form.cliente_id);
    await  this.axios.post('api/proyectos/listar',data)
      .then((response) => {
        this.proyectos = response.data;
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
   async  listarUsers(){
    await  this.axios.get('api/user/admin')
      .then((response) => {
        this.users = response.data.rows;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
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
      this.listarclientes();
      this.listarUsers();
     // this.listarProyectos();
    },
    computed: {
    rows() {
      return this.proyectos.length;
    },
  },
}



</script>
