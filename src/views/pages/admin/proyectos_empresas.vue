<template>
  <Layout class="authentication-bg">
    <PageHeader title="Mis proyectos"  />
    <div class="row">
        <div class="col-3" v-for="proyectos in proyectos" :key="proyectos.id">
          <div class="card p-3">
           <div class="card-body">

                <h5 class="card-title">{{proyectos.titulo}}</h5>
                <p class="card-text">Empresa: <strong>{{proyectos.empresa.nombre}}</strong></p>

                <a :href="'/proyecto/'+proyectos.id" class="btn btn-primary">ir</a>
            </div>
          </div>
        </div>
        
    </div>
    
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
