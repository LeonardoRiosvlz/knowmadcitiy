
<template style="background-color:black;">
  <Layout  class="authentication-bg-clients" style="">
  <PageHeader  style="color:#fff;" :title="title" />
   <div class="container" v-if="usuarioDB.rol==='Master'">
      <h3   style="color:#fff;">Gestion de Clientes, Empresas y Proyectos:</h3><br>
        <div class="row">
          <div class="col-sm-6" >
            <div class="card" style="background-color:rgba(0,0,0,0.5);">
              <div class="card-body" style="color:#fff;">
                
                <div class="row">
                  <div class="col-lg-12 offset">
                  <div class="col-lg-12"> <a href="/clientes" class="btn btn-outline-info btn-flat btn-block ">Clientes</a><br></div>
                  <div class="col-lg-12"> <a href="/empresas" class="btn btn-outline-info btn-flat btn-block ">Empresas de clientes</a><br> </div>
                  <div class="col-lg-12">  <a href="/proyectos" class="btn btn-outline-info btn-flat btn-block ">Proyectos de Clientes</a><br></div>
                   
                   
                  
                  </div>
                </div>
                </div>
              </div>
            </div>
          
          <div class="col-sm-6" >
           
            </div>
        </div>
        <div>  </div>
        <br><br><br>
    </div>   
       <div class="container" v-else-if="usuarioDB.rol==='Cliente'">
      <h3   style="color:#fff;">Bienvenido {{usuarioDB.nombre}}</h3><br>
        <div class="row">
          <div class="col-sm-4" >
            <div class="card " style="">
              <div class="card-body" style="color:#fff;">
                 <p align="center"><h5 align="center">Sector Privado</h5></p>
                <div class="row">
                  <div class="col-lg-12" v-if="usuarioDB.cliente[0].sector=='Público'">
                      <div class="col-lg-12"  > 
                        <a href="/empresas_clientes" class="btn btn-outline-info btn-flat btn-block ">Certificaciones</a><br> 
                      </div>
                      <div class="col-lg-12" v-for="empresas in empresas" :key="empresas.id">  
                          <a :href="'/proyectos_empresas/'+empresas.id" class="btn btn-outline-info btn-flat btn-block">Financiación de Proyectos</a><br>
                      </div>
                      <div class="col-lg-12">
                          <span class="d-inline-block btn-block" tabindex="0" v-b-tooltip.top title="En Construcción">
                                <b-button variant="primary" class="btn btn-outline-info btn-flat btn-block" style="pointer-events: none;" disabled>Cursos</b-button>
                          </span>
                      </div>
                  </div>
                  <div class="col-lg-12" v-else-if="usuarioDB.cliente[0].sector=='Privado'">
                      <div class="col-lg-12"  > 
                        <a href="/empresas_clientes" class="btn btn-outline-info btn-flat btn-block ">Certificaciones Empresariales</a><br> 
                      </div>
                      <div class="col-lg-12" v-for="empresas in empresas" :key="empresas.id">  
                          <a :href="'/proyectos_empresas/'+empresas.id" class="btn btn-outline-info btn-flat btn-block">Licitación e Inversión</a><br>
                      </div>
                      <div class="col-lg-12">
                          <span class="d-inline-block btn-block" tabindex="0" v-b-tooltip.top title="En Construcción">
                                <b-button variant="primary" class="btn btn-outline-info btn-flat btn-block" style="pointer-events: none;" disabled>Proyectos arquitectónicos, turísticos y ambientales</b-button>
                          </span>
                      </div>
                  </div>
                 
                </div>
                </div>
              </div>
            </div>
          
          <div class="col-sm-4" >
              <div class="card">
                  <div class="card-body">
                      <div class="row">
                        <div class="col-lg-12">
                        <p align="center"><h5 align="center">Formación</h5></p>
                            <div class="col-lg-12">
                            
                              <span class="d-inline-block btn-block" tabindex="0" v-b-tooltip.top title="En Construcción">
                                <b-button variant="primary" class="btn btn-outline-info btn-flat btn-block" style="pointer-events: none;" disabled>Consultor Evolution Country</b-button>
                              </span>
                              <span class="d-inline-block btn-block" tabindex="0" v-b-tooltip.top title="En Construcción">
                                <b-button variant="primary" class="btn btn-outline-info btn-flat btn-block" style="pointer-events: none;" disabled>Consultor Evolution City</b-button>
                              </span>
                              <span class="d-inline-block btn-block" tabindex="0" v-b-tooltip.top title="En Construcción">
                                <b-button variant="primary" class="btn btn-outline-info btn-flat btn-block" style="pointer-events: none;" disabled>Consultor Evolution Construction</b-button>
                              </span>
                            </div>
                        </div>
                        
                      </div>
                  </div>
              </div>

            </div>

        </div>
        <div>  </div>
        <br><br><br>
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
    </div><br><br><br><br><br><br>
  </Layout>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex'
import vue2Dropzone from "vue2-dropzone";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import Stat from "./widget";
import RevenueAnalytics from "./revenue";
import SalesAnalytics from "./sales-analytics";
import EarningReport from "./earning";
import Sources from "./sources";
import RecentActivity from "./recent-activity";
import RevenueLocation from "./revenue-location";
import Chat from "./chat";
import Transaction from './transaction';

/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    vueDropzone: vue2Dropzone,
    PageHeader,
    Stat,
    RevenueAnalytics,
    SalesAnalytics,
    EarningReport,
    Sources,
    RecentActivity,
    RevenueLocation,
    Chat,
    Transaction
  },
  data() {
      return {
      title: "Dashboard",
      items: [
        {
          text: "Gestión corporativa"
        },
        {
          text: "Inicio",
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
  computed:{
    ...mapState(['usuarioDB']),
    rows() {
      return this.empresas.length;
    },
  },
   mounted() {
    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }
    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add("active");
        }
        const parent3 = parent2.parentElement;
        if (parent3) {
          parent3.classList.add("active");
          var childAnchor = parent3.querySelector(".has-dropdown");
          if (childAnchor) childAnchor.classList.add("active");
        }

        const parent4 = parent3.parentElement;
        if (parent4) parent4.classList.add("active");
        const parent5 = parent4.parentElement;
        if (parent5) parent5.classList.add("active");
      }
    }
  },
  methods:{
    ...mapActions(['guardarUsuario']),
  async listarEmpresa(){
    let data = new FormData();
    data.append('cliente_id',this.usuarioDB.cliente[0].id);
    await this.axios.post('api/empresas/listar',data)
      .then((response) => {
        this.empresas = response.data;
        
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
	session(){
		if (localStorage.getItem('token')) {
			const token=localStorage.getItem('token');
			this.guardarUsuario(token);
			
		}else{
		   this.$router.push({ path: '/login' });
		}
	},
  setear() {

        //this.cliente=this.proyectos[index].empresa.cliente_id;
          this.form.id=this.usuarioDB.id;
          this.form.rol=this.usuarioDB.rol;
          this.form.imagen=this.usuarioDB.imagen;
          this.form.email=this.usuarioDB.email;
          this.form.nombre=this.usuarioDB.nombre;
          this.form.cliente=JSON.parse(this.usuarioDB.cliente);
          this.form.iat=this.usuarioDB.empresa.iat;
          this.form.exp=this.usuarioDB.exp;
          return;

    },
  },
    created(){
		  this.session();
      this.listarEmpresa();
    },
    
};

</script>
