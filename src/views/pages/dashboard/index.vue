
<template style="background-color:black;">
  <Layout  class="authentication-bg-clients" style="">
  <PageHeader  style="color:#fff;" :title="title" />
   <div class="container">
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
        <div>  <pre> {{usuarioDB}} </pre> </div>
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
    
    </div>
  </Layout>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex'
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
      title: "Home",
      items: [
        {
          text: "KnowmadCity"
        },
        {
          text: "Home",
          active: true
        }
      ]
    };
  },
  computed:{
    ...mapState(['counter'])
  },
  methods:{
    ...mapActions(['guardarUsuario']),
	session(){
		if (localStorage.getItem('token')) {
			const token=localStorage.getItem('token');
			this.guardarUsuario(token);
			
		}else{
		   this.$router.push({ name: '/login' });
		}
	}
  },
    created(){
		  this.session();
    },
};
</script>
