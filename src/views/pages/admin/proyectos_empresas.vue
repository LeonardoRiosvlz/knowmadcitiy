<template>
  <Layout class="authentication-bg">
  <div v-if="usuarioDB.cliente[0].sector=='Privado'">
  <PageHeader title="Licitación e inversión"  />
  </div>

  <div v-else-if="usuarioDB.cliente[0].sector=='Público'">
  <PageHeader title="Financiación de Proyectos"  />
  </div>
 
    <div class="row">
        <div class="col-3" v-for="proyectos in proyectos" :key="proyectos.id">
          <div class="card p-3">
           <img src="data:image/png;base64,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" class="card-img-top" alt="...">
           <div class="card-body">
                <h5 class="card-title">{{proyectos.titulo}}</h5>
                <p class="card-text">Empresa: <strong>{{proyectos.empresa.nombre}}</strong></p>

                <a :href="'/proyecto/'+proyectos.id" class="btn btn-primary">Ver Proyecto Completo</a>
            </div>
          </div>
        </div>
        
    </div>
    <div class="container">
         <div class="row">
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
      </div>
    
    </div>
    <br><br><br><br><br><br>  
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
      title: "Administracion de proyectos",
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
      client: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: ["nombre","actions"],
      proyectos: [], 
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
  watch: {
    cliente: function (val) {
      this.form.cliente_id=val;
      this.listarproyectos();
    },
    client: function (val) {
      this.form.cliente_id=val;
      this.listarEmpresa();
    }
  },
  created(){
    this.listarproyectos();
  },
  methods: {
     ...mapActions(['guardarUsuario']),
 
    async listarEmpresa(){
    let data = new FormData();
    data.append('cliente_id',this.usuarioDB.cliente[0].id);
    data.append('empresa_id',this.$route.params.id);
    await this.axios.post('api/proyectos/findEmpresas',data)
      .then((response) => {
        this.proyectos = response.data;
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
      this.listarEmpresa();
    },
    computed: {
    ...mapState(['usuarioDB']),
    rows() {
      return this.proyectos.length;
    },
  },
}
</script>
