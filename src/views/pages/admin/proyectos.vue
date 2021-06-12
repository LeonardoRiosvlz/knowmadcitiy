<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear proyectos</b-button>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title"></h4>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">

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




        <b-modal id="modal" false size="lg" hide-footer  title="Gestión de proyectos" ok-only>
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Cliente {{form.dependencia}}</label>
                    <v-select v-model="form.cliente_id" :options="clientes" :reduce="clientes => clientes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>
            </b-row>
         <b-row>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Fundada</label>
                   <b-form-datepicker id="example-datepicker" v-model="form.fundada" class="mb-2"></b-form-datepicker>
               <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Nombre </label>
                  <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                        <input v-model="form.nombre"  type="text" class="form-control" placeholder=" ">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label>Cargo del contacto </label>
                  <ValidationProvider name="cargo del contacto" rules="required" v-slot="{ errors }">
                        <input v-model="form.cargo_contacto"  type="text" class="form-control" placeholder=" ">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>      
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Rubro </label>
                    <ValidationProvider name="rubro" rules="required" v-slot="{ errors }">
                            <input v-model="form.rubro"  type="text" class="form-control" placeholder=" ">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Numero de empleados </label>
                    <ValidationProvider name="numero de empleados" rules="required" v-slot="{ errors }">
                            <input v-model="form.numero_empleados"  type="text" class="form-control" placeholder=" ">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
              <b-row>
               <b-col>
                  <div class="form-group">
                    <label>Porcentaje de mujeres </label>
                    <ValidationProvider name="Porcentaje de mujeres" rules="required" v-slot="{ errors }">
                            <input v-model="form.procentaje_mujeres"  type="text" class="form-control" placeholder=" ">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
                <b-col>
                  <div class="form-group">
                    <label>Volumen de facturación</label>
                    <ValidationProvider name="volumen de facturación" rules="required" v-slot="{ errors }">
                          <input v-model="form.volumen_facturacion"  type="text" class="form-control" placeholder=" ">
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Dirección</label>
                    <ValidationProvider name="dirección" rules="required" v-slot="{ errors }">
                          <textarea v-model="form.direccion"  type="text" class="form-control" placeholder=" "></textarea>
                          <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </b-col>
            </b-row>
            <hr>
            <b-row class="mb-2">
               <b-col>
                   <label>Imagen</label>
                   <div id="preview mb-2">
                     <img v-if="url" width="100%" style="float:center!importan" class="rounded"  :src="url" />
                   </div>
                    <b-form-file
                        v-model="file"
                        placeholder="Seleccione su image..."
                        drop-placeholder="Drop file here..."
                        @change="onFileChange"
                    ></b-form-file>
               </b-col>
            </b-row>     
        </ValidationObserver>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>
     </b-modal>
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
    vSelect
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
  computed:{
        ...mapState(['counter'])
   },
  created(){
    this.listarproyectos();
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
        data.append('filename',this.file);
       }
       await  this.axios.post('api/proyectos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
           }}).then(response => {
            if (response.status==200) {
               this.$swal('Creado!!!','','success');
               this.listarproyectos();
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
       data.append('filename',this.file);
      }
      await  this.axios.put('api/proyectos', data, {
           headers: {
            'Content-Type': 'multipart/form-data'
              }}).then(response => {
            if (response.status==200) {
               this.$swal('Editado con exito','','success');
               this.listarproyectos();
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
        this.form.id=this.proyectos[index].id;
        this.form.nombre=this.proyectos[index].nombre;
	    this.form.cargo_contacto=this.proyectos[index].cargo_contacto;
	    this.form.rubro=this.proyectos[index].rubro;
	    this.form.logo=this.proyectos[index].logo;
	    this.form.numero_empleados=this.proyectos[index].numero_empleados;
	    this.form.procentaje_mujeres=this.proyectos[index].procentaje_mujeres;
	    this.form.volumen_facturacion=this.proyectos[index].volumen_facturacion;
	    this.form.direccion=this.proyectos[index].direccion;
	    this.form.fundada=this.proyectos[index].fundada;
        this.form.cliente_id=this.proyectos[index].cliente_id;
        this.url=this.proyectos[index].logo;
          this.$root.$emit("bv::show::modal", "modal", "#btnShow");
          return;
        }
      }
    },
     async eliminarempresa(id){
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
                this.listarproyectos();
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
  async  listarproyectos(){
    await  this.axios.get('api/proyectos')
      .then((response) => {
        this.proyectos = response.data;
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
      this.listarproyectos();
      this.listarClientes();
    },
    computed: {
    rows() {
      return this.proyectos.length;
    },
  },
}
</script>
