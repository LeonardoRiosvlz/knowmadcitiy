<style>
#pdf{
  font-family: 'Courier New', Courier, monospace;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  color:#000;
  width:5in;
  height:5in;
}
 @media (min-width: 992px){
   .modal-dialog{
     width: 760px;
   }
 .modal-lg {
   width: 700px;
 } 
 }
 
</style> 

<template>
    <Layout  class="authentication-bg-clients">
          <PageHeader :title="title" :items="items" />
            <div class="row">
            <!--Creación de vista de proyecto completo-->
                <div class="col-lg-6 offset-3">
                <h4 class="text-white">Información del Proyecto: {{proyectos.titulo}} </h4>
                    <div class="header bg-white card" v-if="form.status==='Creado'">
                                
                          <div class="row">
                                <div class="col-lg-6"><p></p>
                                      <p align="center">
                                        <img  width="150"  height="150" style="float:center!importan;" class="rounded"   v-bind:src="proyectos.empresa.logo" />
                                      </p>
                                </div>
                                <div class="col-lg-6"><p></p>
                                    <h4>Titulo del Proyecto:</h4>
                                    <h5 class="title" align="center">{{proyectos.titulo}}</h5>
                                      <p algn="center">
                                        Empresa: <span class="badge badge-info">{{proyectos.empresa.nombre}} </span> <br>
                                        Estado del Proyecto: <span class="badge badge-warning">{{form.status}} </span>  <br>
                                        <span>Presupuesto: {{proyectos.presupuesto}}</span>
                                      </p>
                                </div>
                                    
                            <div class="col-lg-12">
                                <p align="center"> <h6 align="center">Para descargar el soporte de este proyecto haga clic a continuación:</h6></p>
                              <div class="" v-if="form.status==='Creado'">
                                <p align="center"> 
                                    <b-button id="show-btn" v-b-modal.modal-lg style="background-color:#fff;" class="btn bg-pdf" @click="$bvModal.show('bv-modal-example')"> <img src="@/assets/images/pdf.png" alt height="75" width="60" /></b-button> 
                                  
                                  </p>
                              </div>
                            <div class="" v-else>
                                <div class="alert alert-warning">
                                El Proyecto aún no ha sido aprobado
                                </div>
                            </div>
                        <!----> <pre> {{form}} </pre> 
                      </div>
                          </div>
                      </div>                    
                </div>
                    <!--Modal para PDF-->
                    <b-modal id="bv-modal-example" size="xl" class="modal-lg modal-md modal-dialog fade" hide-footer >
                      <template #modal-title>
                        <h4 class="">Información del Proyecto: {{proyectos.titulo}} </h4>
                      </template>
                      <div id="app" ref="document" style="bacground-color:#fff;" >
                      <div class="border-secondary p-3" ><br>
                      <div class="header">
                          <div class="row">
                            <div class="col-lg-6">
                                  <p align="center">
                                    <img  width="150"  height="150" style="float:center!importan;" class="rounded"   v-bind:src="proyectos.empresa.logo" />
                                  </p>
                            </div>
                            <div class="col-lg-6">
                                <h4>Titulo del Proyecto:</h4>
                                <h5 class="title" align="center">{{proyectos.titulo}}</h5>
                                  <p algn="center">
                                    Empresa: <span class="badge badge-info">{{proyectos.empresa.nombre}} </span> <br>
                                    Estado del Proyecto: <span class="badge badge-warning">{{form.status}} </span>  <br>
                                    <span>Presupuesto: {{proyectos.presupuesto}}</span>
                                  </p>
                            </div>
                          </div>
                      </div>  
                            <div class="body">
                                <div class="row">
                                <div class="col-lg-12"><br><br><br><h4 align="center"> <b>DESCRIPCIÓN DE LAS REFORMAS Y LAS INVERSIONES</b></h4><br><br></div>
                                  <div class="col-lg-12 text-dark"><b>Descripción de la iniciativa:<br></b>
                                  
                                      <p class="card-text text-dark" align="justify"> <br>{{proyectos.descripcion}} </p>
                                  </div>
                                  <div class="col-lg-12 text-dark"><br><strong>Justificación de la necesidad: principales retos y oportunidades:</strong>
                                      <p class="card-text" align="justify"> <br> {{proyectos.descripcion}} </p><br>
                                  </div>
                                  <div class="col-lg-6 text-dark"><br><b>Breve descripción de la iniciativa:</b>
                                    <p align="justify" class="card-text">
                                      <br>
                                      <ol>
                                        <li v-for="(iniciativa, index) in form.descripcion_iniciativa" :key="index">{{iniciativa.nombre}} </li>
                                      </ol>
                                    </p>
                                  </div>
                                  <div class="col-lg-6 text-dark"><b></b><b>Objetivos:</b>
                                      <p align="justify" class="card-text">
                                          <br>
                                          <ol>
                                            <li v-for="(iniciativa, index) in form.objetivos" :key="index">{{iniciativa.nombre}} </li>
                                          </ol>
                                      </p>
                                  </div>
                                  
                                </div>
                            </div>

                            <!--Organizar bien la información para que no se monte encima de las hojas del PDF-->
                        <div class="html2pdf__page-break"></div>
                        <div class="body"> <br>
                                <div class="col-lg-12"><br><p align="left"><h4>DIMENSIÓN DIGITAL Y ECOLÓGICA DE LA INICIATIVA:</h4>  </p>
                                    <div class="row">
                                      <div class="col-lg-6"><b>Dimensión Digital:</b>  <p></p>
                                          <p align="justify" class="card-text">
                                          <br>
                                          <ol>
                                            <li v-for="(iniciativa, index) in form.dimension_digital" :key="index">{{iniciativa.nombre}} </li>
                                          </ol>
                                      </p>
                                      </div>
                                      <div class="col-lg-6"><b>Dimensión Ecológica:</b><p></p> 
                                          <p algin="justify"> 
                                             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, excepturi nisi. Aliquam similique inventore, ducimus architecto unde fugiat quidem quasi quos officiis. Recusandae blanditiis sunt quisquam, quod excepturi tenetur incidunt.
                                          </p>
                                      </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                  <div class="table-responsive table-condensed">
                                    <table class="table text-dark">
                                      <tr class="table-primary">
                                      <th class="col-3 text-dark">Actividad</th>
                                      <th  class="col-3  text-dark col-2 d-inline-block">Hito</th>
                                      <th class="col-3  text-dark">2020
                                        <td class="bg-active text-dark">Q4</td>
                                      </th>
                                      <th class="col-3  text-dark">2021
                                          <td class="bg-active text-dark">S1</td>
                                          <td class="bg-active text-dark">S2</td>
                                      </th>
                                      <th class="col-3  text-dark">2022
                                          <td class="bg-active text-dark">S1</td>
                                          <td class="bg-active text-dark">S2</td>
                                      </th>
                                      <th class=" text-dark">2023
                                          <td class="bg-active text-dark">S1</td>
                                          <td class="bg-active text-dark">S2</td>
                                      </th>
                                      
                                      </tr>
                                    
                                        <tr class="table-active">
                                           <td class="table-active text-dark">Fase 1</td>
                                          <td class="bg-active  text-dark d-inline-block col-2" scope="col"> 
                                                 <p  align="justify" style="display:inline-block;">
                                                 Diseño de plataformas
                                                  </p> 
                                                  </td>
                                          <td class="bg-active  text-dark" >Fase 3</td>
                                          
                                        
                                          
                                        </tr>
                                    </table>
                                  </div>
                                </div>
                        
                        </div>
                            <br>
                      </div>
                  </div>
                  <p align="center"> <button class="btn btn-outline-secondary" @click="exportToPDF">Descarcar Soporte del Proyecto</button></p>
                      
                    </b-modal>
                <!--DEscargar PDF
                <div class="col-lg-6 ">
                <h4 class="text-white">Descargar Soporte del proyecto </h4>
                    <div class="row bg-pdf"><br><br>
                    <div class="col-lg-12 card">
                    
                      <div class="col-lg-12">
              
                        <div class="" v-if="form.status==='Creado'">
                          <p align="center"> 
                              <b-button id="show-btn" class="btn-small" @click="$bvModal.show('bv-modal-example')">Ver/Descargar Proyecto</b-button> 
                             
                            </p>
                        </div>
                      <div class="" v-else>
                          <div class="alert alert-warning">
                          El Proyecto aún no ha sido aprobado
                          </div>
                      </div>
                   
                      </div>
                    </div>
                      
                  </div>

                </div>-->
            </div>  
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
import VueHtml2pdf from 'vue-html2pdf';
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import html2pdf from 'html2pdf.js'
import e6promise from 'es6-promise'
//import * as jsPDF from 'jspdf';


// Local

import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VueDocPreview from 'vue-doc-preview'

/**
 * Dashboard component
 */
export default {
  components: {
   e6promise,
    html2pdf,
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
      title: "Proyecto",
      items: [
        {
          text: "Gestión corporativa"
        },
        {
          text: "proyecto",
          active: true
        }
      ],
     dropzoneOptions: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      word:false,
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
      'descripcion':'',
	    'promotores': [],
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
    	exportToPDF () {
				html2pdf(this.$refs.document, {
          width:10,
          height:9,
					margin: 0.5,
					filename: 'Proyecto.pdf',
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait',putOnlyUsedFonts:true, floatPrecision: 16 }
				})
			},
              createPDF () {
             
             
            var doc = new jsPDF();
            html2pdf(this.$refs.document, {
					margin: 1,
					filename: 'document.pdf',
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
				})
          },
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
   async agregarProyecto(){
     let data = new FormData();
      var formulario = this.form;

     for ( var key in formulario) {
            if (key=='descripcion_iniciativa') {
                data.append(key,JSON.stringify(formulario[key]));
            }else if (key=='promotores') {
                data.append(key,JSON.stringify(formulario[key]));
            }else if (key=='objetivos') {
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
              if (key=='descripcion_iniciativa') {
                  data.append(key,JSON.stringify(formulario[key]));
              }else if (key=='promotores') {
                  data.append(key,JSON.stringify(formulario[key]));
              }else if (key=='objetivos') {
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
    setear() {

        //this.cliente=this.proyectos[index].empresa.cliente_id;
          this.form.id=this.proyectos.id;
          this.form.numero=this.proyectos.numero;
          this.form.titulo=this.proyectos.titulo;
          this.form.status=this.proyectos.status;
          this.form.presupuesto=this.proyectos.presupuesto;
          this.form.promotores=JSON.parse(this.proyectos.promotores);
          this.form.objetivos=JSON.parse(this.proyectos.objetivos);
          this.form.dimension_digital=JSON.parse(this.proyectos.dimension_digital);
          this.form.dimension_ecologica=JSON.parse(this.proyectos.dimension_ecologica);
          this.form.descripcion_iniciativa=JSON.parse(this.proyectos.descripcion_iniciativa);
          this.form.justificacion=this.proyectos.justificacion;
          this.form.descripcion=this.proyectos.descripcion;
          this.form.empresa_id=this.proyectos.empresa_id;
          this.form.archivo=this.proyectos.archivo;
          this.form.cliente_id=this.proyectos.empresa.cliente_id;
          this.form.aprueba_id=this.proyectos.aprueba_id;
          return;

    },
    verdocumento(id) {
      for (let index = 0; index < this.proyectos.length; index++) {
        if (this.proyectos[index].id===id) {
        this.cliente=this.proyectos[index].empresa.cliente_id;
          this.form.id=this.proyectos[index].id;
          this.form.numero=this.proyectos[index].numero;
          this.form.titulo=this.proyectos[index].titulo;
          this.form.presupuesto=this.proyectos[index].presupuesto;
          this.form.promotores=JSON.parse(this.proyectos[index].promotores);
          this.form.objetivos=JSON.parse(this.proyectos[index].objetivos);
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
          title: 'Desea borrar esta proyecto?',
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
    data.append('id',this.$route.params.id);
    console.log(this.$route.params.id);
    await  this.axios.post('api/proyectos/find',data)
      .then((response) => {
        this.proyectos = response.data;
        this.setear();
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
	},
  
  },
    created(){
	  this.session();
      this.listarProyectos();
    },
    computed: {
    rows() {
      return this.proyectos.length;
    },
  },
  
}


</script>
