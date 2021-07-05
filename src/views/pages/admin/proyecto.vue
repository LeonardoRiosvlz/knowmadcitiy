<template>
  <Layout  class="authentication-bg">
    <PageHeader :title="title" :items="items" />
        <button @click="word=!word">versiones</button>
        <div v-if="word"><VueDocPreview :value="proyectos.archivo" type="office" /></div>
        <div v-else><pre>{{proyectos}}</pre></div>

  
        
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
      title: "Administracion",
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
    setear(id) {
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
