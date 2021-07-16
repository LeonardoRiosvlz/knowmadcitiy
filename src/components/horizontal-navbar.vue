
<script>

import {mapState,mapMutations, mapActions} from 'vuex'
import vue2Dropzone from "vue2-dropzone";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import PageHeader from "@/components/page-header";
import { layoutMethods } from "@/state/helpers";
import { menuItems } from "./horizontal-menu";

export default {
    components: {
    vueDropzone: vue2Dropzone,
    PageHeader,
  },
  data() {
    return {
      menuItems: menuItems,
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
      },
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
  methods: {
    ...layoutMethods,
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
		   this.$router.push({ name: '/login' });
		}
	},
    /**
     * Menu clicked show the submenu
     */
    onMenuClick(event) {
      event.preventDefault();
      const nextEl = event.target.nextSibling;
      if (nextEl && !nextEl.classList.contains("show")) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove("show");
        }
        nextEl.classList.add("show");
      } else if (nextEl) {
        nextEl.classList.remove("show");
      }
      return false;
    },
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    change_layout(layout) {
      return this.changeLayoutType({ layoutType: layout });
    },
    topbarLight() {
      document.body.setAttribute("data-topbar", "light");
      document.body.removeAttribute("data-layout-size", "boxed");
    },
    boxedWidth() {
      document.body.setAttribute("data-layout-size", "boxed");
      document.body.removeAttribute("data-topbar", "light");
      document.body.setAttribute("data-topbar", "dark");
    }
  },
    created(){
		  this.session();
      this.listarEmpresa();
    },
};
</script>

<template>
  <div class="topnav"  style=" color:#fff;">
    <div class="container-fluid">
      <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
        <div class="collapse navbar-collapse" id="topnav-menu-content" v-if="usuarioDB.rol==='Master'">
          <ul class="navbar-nav">
            <li class="nav-item dropdown" v-for="(item, index) of menuItems" :key="index">
              <router-link
                tag="a"
                v-if="!item.subItems"
                :to="item.link"
                class="nav-link dropdown-toggle arrow-none"
              >
                <i :class="`${item.icon} mr-2`"></i>
                {{$t(item.label)}}
              </router-link>

              <a
                v-if="item.subItems"
                class="nav-link dropdown-toggle arrow-none"
                @click="onMenuClick"
                href="javascript: void(0);"
                id="topnav-components"
                role="button"
              >
                <i :class="`${item.icon} mr-2`"></i>
                {{$t(item.label)}}
                <div class="arrow-down"></div>
              </a>
              <div
                class="dropdown-menu row"
                aria-labelledby="topnav-dashboard"
                v-if="hasItems(item)"
              >
                <template v-for="(subitem) of item.subItems">
                  <router-link
                    :key="subitem.id"
                    class="col dropdown-item side-nav-link-ref"
                    v-if="!hasItems(subitem)"
                    :to="subitem.link"
                  >{{$t(subitem.label)}}</router-link>
                  <div class="dropdown" v-if="hasItems(subitem)" :key="subitem.id">
                    <a class="dropdown-item" href="javascript: void(0);" @click="onMenuClick">
                      {{ $t(subitem.label) }}
                      <div class="arrow-down"></div>
                    </a>
                    <div class="dropdown-menu">
                      <router-link
                        v-for="(subSubitem, index) of subitem.subItems"
                        :key="index"
                        :to="subSubitem.link"
                        class="dropdown-item side-nav-link-ref"
                      >{{ $t(subSubitem.label) }}</router-link>
                    </div>
                  </div>
                </template>
              </div>
            </li>
            
          </ul>
        </div>
            

        <div class="collapse navbar-collapse navbar-nav" id="topnav-menu-content" v-if="usuarioDB.rol==='Cliente'">
            <div v-if="usuarioDB.cliente[0].sector=='Público'">
                <b-nav-item-dropdown text="Gestión" class="text-black" >
                    <b-dropdown-item href="/home" class="nav-item dropdown">Dashboard</b-dropdown-item>
                    <b-dropdown-item href="/empresas_clientes">Certificaciones</b-dropdown-item>
                  <b-nav-item-dropdown id="topnav-menu-content" text="Financiación de Proyectos" class="nav-item dropdown" style="margin-left:25px;">
                    <b-dropdown-item v-for="empresas in empresas" :key="empresas.id" :href="'/proyectos_empresas/'+empresas.id" class="nav-item">{{empresas.nombre}}</b-dropdown-item>
                  </b-nav-item-dropdown>
                </b-nav-item-dropdown>
            </div>
            <div v-else-if="usuarioDB.cliente[0].sector=='Privado'">
                <b-nav-item-dropdown text="Gestión" class="text-black" >
                    <b-dropdown-item href="/home" class="nav-item dropdown">Dashboard</b-dropdown-item>
                    <b-dropdown-item href="/empresas_clientes">Certificaciones Empresariales</b-dropdown-item>
                  <b-nav-item-dropdown id="topnav-menu-content" text="Licitación e Inversión" class="nav-item dropdown" style="margin-left:25px;">
                    <b-dropdown-item v-for="empresas in empresas" :key="empresas.id" :href="'/proyectos_empresas/'+empresas.id" class="nav-item">{{empresas.nombre}}</b-dropdown-item>
                  </b-nav-item-dropdown>
                </b-nav-item-dropdown>
            </div>
         
          <b-nav-item href="#" disabled v-b-tooltip.hover.bottom title="En Construcción" > Grupo de Trabajo</b-nav-item>
          <b-nav-item href="#" disabled v-b-tooltip.hover.bottom title="En Construcción" > Calendario de Sesiones</b-nav-item>
          <b-nav-item href="#" disabled v-b-tooltip.hover.bottom title="En Construcción" > Grupo de Asesores</b-nav-item>

        </div>
      </nav>
    </div>
  </div>
</template>