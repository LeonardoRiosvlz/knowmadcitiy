<template>
  <Layout  class="authentication-bg-clients">
    <PageHeader :title="title" :items="items" />
        
       <div class="row">
          <div class="col-lg-6">
          
              <div class="row">
                <div class="col-lg-12">
                <h4 class="text-white">Información del Proyecto: {{proyectos.titulo}} </h4>
                  <div class="card border-secondary" ><br>
                          <p align="center">
                            <img  width="150"  height="150" style="float:center!importan" class="rounded"   v-bind:src="proyectos.empresa.logo" />
                          </p>
                      
                          <div class="card-body">
                            <h5 class="card-title" align="center">{{proyectos.titulo}}</h5>
                            <p algn="center">Empresa: <span class="badge badge-info">{{proyectos.empresa.nombre}} </span> Estado del Proyecto: <span class="badge badge-warning">{{form.status}} </span></p>
                          <p class="card-text" align="justify">Descripción: {{proyectos.descripcion}} </p>
                          <p class="card-text" align="justify">Presupuesto: {{proyectos.presupuesto}} </p>
                          </div>
                          <div class="">
                              <p align="center"><b-button v-b-modal.modal-1>Ver proyecto Completo</b-button></p> 
                          </div><br>
                  </div>
                </div>
            </div>

          </div>
          <div class="col-lg-6">
              <h4 class="text-white">Soporte del Proyecto:</h4>
              <div ><VueDocPreview :value="proyectos.archivo" type="office" /></div>
          </div>
       </div>
       
      

        <div >

            
        </div>   
            <b-modal id="modal-1" size="lg" hidde-footer>
                <div class="card border-secondary">
                    <img v-if="url" width="100%" style="float:center!importan" class="rounded"  :src="url" />
                      <div class="card-body"> 
                      <p align="center "><img  width="150"  height="150" style="float:center!importan" class="rounded"   v-bind:src="proyectos.empresa.logo" /></p>
                          
                        <h5 class="card-title" align="center">Título del Proyecto: {{form.titulo}}</h5>
                          <p algn="center">Empresa: <span class="badge badge-info">{{proyectos.empresa.nombre}} </span> - Fecha de Creación de Proyecto: <span class="badge badge-info">{{proyectos.created_at}}</span> - Estado del Proyecto: <span class="badge badge-warning">{{proyectos.status}} </span></p>
                            <div class="row">
                              <div class="col-lg-6">
                                <p class="card-text" align="justify">Descripción: {{proyectos.descripcion}} </p></div>
                                  <div class="col-lg-6">
                                    <p class="card-text" align="justify">Descripción de la Iniciativa: 
                                          <ol>
                                            <li v-for="(iniciativa, index) in form.descripcion_iniciativa" :key="index">{{iniciativa.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarIniciativa(index)">x</button></li>
                                          </ol>
                                    </p><br><br>
                                  </div>
                                  <div class="col-lg-6">Promotores: </div>
                                  <div class="col-lg-6">Objetivos: </div><br><br>
                                  <div class="col-lg-6">Observaciones: </div>
                                  <div class="col-lg-6">Justificación</div><br><br>
                                  <div class="col-lg-12">
                                    <div class="row">
                                      <div class="col-lg-6">Metas: {{proyectos.metas}} </div>
                                      <div class="col-lg-6"></div>
                                    </div>
                                  </div><br><br>
                            </div>
                      <!--
                            "id": "fce4ef4b-3e66-4c2c-89ea-741ccdec3b7b",
                            "numero": "null",
                            "titulo": "Molinos de vientos",
                            "status": "Pendiente",
                            "presupuesto": "150000",
                            "proyectos_propuestos": null,
                            "promotores": "[{\"nombre\":\"Nokia\"},{\"nombre\":\"Movistar\"}]",
                            "objetivos": "[{\"nombre\":\" Ecenas bibendu acum suscipit duifusce teger mauris augueph.\"},{\"nombre\":\" Ecenas bibendu acum suscipit duifusce tegek.\"}]",
                            "metas": null,
                            "descripcion_iniciativa": "[{\"nombre\":\" Ecenas bibendu acum suscipit duifusce teger mauris augueph.\"},{\"nombre\":\" Ecenas bibendu acum suscipit duifusce teger mauris augueph.\"}]",
                            "archivo": "https://plataformaknowmad.herokuapp.com/public/1625495397045-126825126Ficha Next GEN CARM_Dirección General Mar Menor_Balnearios_ (1) (1).docx",
                            "descripcion": "Dolornu himena mus eu fringi fringi. Sellus auguesed vulput metusqui sollic at que quiscras roin ulla. Proin aenean facilis sque adipisci sceleris class. Llam tempor uisque laciniai telluset sedlorem scras  odiophas ellus. Hendre lobortis euismodd ras ntum mattis lum. Lectusa lacusaen imperdie duifusce erossed vestib convalli. Lobortis id ullamcor isised isse roin. Tesque suspendi necinte massacra elitpr lla nullam itur lectusin varius. Ecenas bibendu acum suscipit duifusce teger mauris augueph.",
                            "oservaciones": null,
                            "justificacion": "Dolornu himena mus eu fringi fringi. Sellus auguesed vulput metusqui sollic at que quiscras roin ulla. Proin aenean facilis sque adipisci sceleris class. Llam tempor uisque laciniai telluset sedlorem scras odiophas ellus. Hendre lobortis euismodd ras ntum mattis lum. Lectusa lacusaen imperdie duifusce erossed vestib convalli. Lobortis id ullamcor isised isse roin. Tesque suspendi necinte massacra elitpr lla nullam itur lectusin varius. Ecenas bibendu acum suscipit duifusce teger mauris augueph. ",
                            "created_at": "2021-07-05T05:16:51.000Z",
                            "updated_at": "2021-07-05T14:29:58.000Z",
                            "empresa_id": 1,
                            "elabora_id": 1,
                            "aprueba_id": 1,
                            "empresa": {
                              "id": 1,
                              "nombre": "Facebook",
                              "cargo_contacto": "CEO",
                              "rubro": "Telecomunicaciones",
                              "logo": "https://plataformaknowmad.herokuapp.com/public/1624939287091-168123839ATH.jpg",
                              "numero_empleados": "23",
                              "procentaje_mujeres": "30",
                              "volumen_facturacion": "volument de facturacion",
                              "direccion": "direccion de la emrpesa",
                              "fundada": "2021-06-09",
                              "created_at": "2021-06-12T21:28:31.000Z",
                              "updated_at": "2021-06-29T04:01:27.000Z",
                              "cliente_id": 1
                      -->
                    
                        <p class="card-text"><small class="text-muted">Presupuesto: {{proyectos.presupuesto}}</small></p>
                      </div>
                </div>
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
import VueHtml2pdf from 'vue-html2pdf';
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
	}
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
