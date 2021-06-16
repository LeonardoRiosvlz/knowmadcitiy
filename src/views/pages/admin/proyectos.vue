<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="clearfix mb-3">
      <b-button class="float-right btn-info" left @click="$bvModal.show('modal');editMode=false;">Crear proyectos</b-button>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
            <div class="row p-2">
              <div class="col-3 pl-3">
  
                  <label>Cliente</label>
                    <v-select v-model="client" :options="clientes" :reduce="clientes => clientes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                 
            
              </div>

          </div>
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
              <template v-slot:cell(empresa)="data">
                {{data.item.empresa.nombre}}
              </template>
              <template v-slot:cell(estado)="data">
                {{data.item.status}}
              </template>
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
                  
                  <!--<b-dropdown-item-button@clic="generateReport()">Ver/Descargar Proyecto</b-dropdown-item-button>-->
                  <b-dropdown-item-button@click="editMode=true;verdocumento(data.item.id)">Ver</b-dropdown-item-button>
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

        <b-modal id="modal_ver" false size="lg" hide-footer  title="Gestión de proyectos" ok-only>
          <div>
            <h4 align="center">USE EL SIGUIENTE BOTÓN PARA VER O DESCARGAR EL PROYECTO DE NOMBRE:</h4>  
            
            <div align="center"><h3>{{form.titulo}}</h3><br><button class="btn btn-flat btn-info" @click="generateReport()">Ver/Descargar {{form.titulo}}</button></div>
            
            <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="false"
                :preview-modal="true"
                paginate-elements-by-height="1200"
                filename="Proyecto"
                :pdf-quality="2"
                :manual-pagination="true"
                pdf-format="a4"
                pdf-orientation="portrait"
                pdf-content-width="100%"
                margin="150"
                @progress="onProgress($event)"
                @startPagination="startPagination()"
                @hasPaginated="hasPaginated()"
                @hasStartedGeneration="hasStartedGeneration()"
                @hasGenerated="hasGenerated($event)"
                ref="html2Pdf"
            >
                <section slot="pdf-content">
        <div align="center" style="margin-left:;">
          <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-lg-8"><img src="@/assets/images/Logo-Knowmadcity-final.png" alt="" width="250" height="120">
              <br>
              <br><h3>MODELO DE FICHA DE PROYECTOS DE RECUPERACIÓN (“Iniciativas”)</h3>
              <br><h3>DESCRIPCIÓN DE LAS REFORMAS Y LAS INVERSIONES</h3>
              <br>
              <h4>Titulo: {{form.titulo}}</h4>
              <br><br>
            </div>
            <div class="col-lg-2"></div>

            <div class="row" style="width:80%;">
              
                <div class="col-lg 4 offset-lg-4" style="border: solid, 3px, #000">
                  <h4 align="center">1- Descripción de la iniciativa: </h4>
                </div>

                <div class="col-lg 4">
                  <ol>
                    <li align="left" v-for="(iniciativa, index) in form.descripcion_iniciativa" :key="index">{{iniciativa.nombre}} 
                    </li>
                  </ol>
                </div>

                <hr style="border: solid, 3px, #000">

                <div class="col-lg 6 offset-lg-4">
                  <h4 align="center"><h4 align="center">2-Justificación de la necesidad: principales retos y oportunidades: </h4> </h4>
                </div>

                <div class="col-lg 6">
                  <p align="justify">{{form.justificacion}}</p>
                <br><br>
                </div>

            
            </div>
            <div class="row" style="width:80%;">

                <div class="col-lg 6 offset-lg-3">
                  <h4 align="center">3-Objetivos de la iniciativa: </h4>  <p align="justify">{{form.justificacion}}</p>
                </div>

                <div class="col-lg 6">
                 <h4>4-Breve descripción de la iniciativa</h4>
                    <ol>
                      <li align="left" v-for="(iniciativa, index) in form.descripcion_iniciativa" :key="index">{{iniciativa.nombre}} 
                      </li>
                    </ol>
                </div>
            </div>


            

          </div>   
        </div>     


        <div class="html2pdf__page-break"/>

                  <section class="pdf-item">
                                 <div class="row" style="width:80%;">
              
                <div class="col-lg 4 offset-lg-4" style="border: solid, 3px, #000">
                  <h4 align="center">5-Dimensión digital y ecológica de la iniciativa </h4>
                </div>

                <div class="col-lg 4">
                  <p>Dimensión Digital:</p>
                  <p>Dimensión Ecológica:</p>
                </div>

                <hr style="border: solid, 3px, #000">
            </div> 
             <div class="row" style="width:80%;">
              
                <div class="col-lg 4 offset-lg-4" style="border: solid, 3px, #000">
                  <h4 align="center">6- Calendario e Hitos: </h4>
                </div>

                <div class="col-lg 4">
                  <ol>
                    <li align="left" v-for="(iniciativa, index) in form.descripcion_iniciativa" :key="index">{{iniciativa.nombre}} 
                    </li>
                  </ol>
                </div>

                <hr style="border: solid, 3px, #000">
            </div> 
                         <div class="row" style="width:80%;">
              
                <div class="col-lg 4 offset-lg-4" style="border: solid, 3px, #000">
                  <h4 align="center">7- Presupuesto: </h4>
                </div>

                <div class="col-lg 4">
                  <h4> {{form.presupuesto}} </h4> 
                                      
                </div>

                <hr style="border: solid, 3px, #000">
            </div>
                  </section>    
                </section>
                
                
            </vue-html2pdf>

          </div>
        </b-modal>
        <b-modal id="modal" false size="lg" hide-footer  title="Gestión de proyectos" ok-only>
          <ValidationObserver ref="form">
            <b-row>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Cliente</label>
                    <v-select v-model="cliente" :options="clientes" :reduce="clientes => clientes.id"  :getOptionLabel="option => option.nombre" ></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>
            </b-row>
             <b-row>
              <b-col>
                <ValidationProvider name="area dependiente" rules="required" v-slot="{ errors }">
                  <label>Empresas </label>
                    <v-select v-model="form.empresa_id" :options="empresas" :reduce="empresas => empresas.id"  :getOptionLabel="option => option.nombre" ></v-select>
                    <span style="color:red">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label>Titulo </label>
                  <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                        <input v-model="form.titulo"  type="text" class="form-control" placeholder=" ">
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row> 
              <b-row>
                <div class="col-11">
                  <div class="form-group">
                    <label>Descripción de la iniciativa </label>
                        <input v-model="form.iniciativa"  type="text" class="form-control" placeholder=" ">
                    </div>
                </div >
                <div class="col-1 py-4">
                  <label></label>
                  <button class="btn btn-success " @click="cargarIniciativa()" :disabled="form.iniciativa===''">+</button>
                </div >
              </b-row>
               <b-row>
                <ol>
                  <li v-for="(iniciativa, index) in form.descripcion_iniciativa" :key="index">{{iniciativa.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarIniciativa(index)">X</button></li>
                </ol>
              </b-row>
              </b-row> 
              <b-row>
              <b-col>
                <div class="form-group">
                  <label>Justificación de la necesidad </label>
                  <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
                        <textarea v-model="form.justificacion"  type="text" class="form-control" placeholder=" "></textarea>
                        <span style="color:red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </b-col>
              </b-row>      
              <b-row>
                <div class="col-11">
                  <div class="form-group">
                    <label>Promotores </label>
                        <input v-model="form.promotor"  type="text" class="form-control" placeholder=" ">
                    </div>
                </div >
                <div class="col-1 py-4">
                  <label></label>
                  <button class="btn btn-success " @click="cargarPromotor()" :disabled="form.promotor===''">+</button>
                </div >
              </b-row>
              <b-row>
                <ol>
                  <li v-for="(promotor, index) in form.promotores" :key="index">{{promotor.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarpromotor(index)">X</button></li>
                </ol>
              </b-row>
              <b-row>
                <div class="col-11">
                  <div class="form-group">
                    <label>Objetivos de la iniciativa </label>
                        <input v-model="form.objetivo"  type="text" class="form-control" placeholder=" ">
                    </div>
                </div >
                <div class="col-1 py-4">
                  <label></label>
                  <button class="btn btn-success " @click="cargarObjetivo()" :disabled="form.objetivo===''">+</button>
                </div >
              </b-row>
              <b-row>
               
                <ol>
                  <li v-for="(objetivo, index) in form.objetivos" :key="index">{{objetivo.nombre}} <button class="btn btn-sm btn-danger" @click="eliminarObjetivo(index)">X</button></li>
                </ol>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group">
                    <label>Presupuesto</label>
                    <ValidationProvider name="numero de empleados" rules="required" v-slot="{ errors }">
                            <input v-model="form.presupuesto"  type="text" class="form-control" placeholder=" ">
                            <span style="color:red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                </b-col>
              </b-row>
        </ValidationObserver>
           

        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && !editMode">Guardar</button>
        <button class="btn btn-block float-right btn-success" @click="switchLoc" v-if="!ver && editMode">Editar</button>

      </b-modal>
   
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
    VueHtml2pdf
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
      fields: ["titulo","presupuesto","empresa","estado","actions"],
      proyectos: [], 
      areas: [],
      proyectos: [],
      empresas: [],
      clientes: [],
      clien: [],
      regional: [],
      cliente:'',
      client:'',
      editMode:false,
      form:{
      'titulo':'',
      'iniciativa':'',
      'descripcion_iniciativa':[],
      'promotor':'',
	    'promotores': [],
      'metas': [],
      'objetivo':'',
	    'objetivos': [],
      'presupuesto':'',
       'empresa_id':'',
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

  methods: {
     ...mapActions(['guardarUsuario']),
    async submit() {
      console.log("email submitted!");
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
          this.form.empresa_id=this.proyectos[index].empresa_id;
          this.form.cliente_id=this.proyectos[index].empresa.cliente_id;
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
          this.form.cliente_id=this.proyectos[index].empresa.cliente_id;
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
     // this.listarProyectos();
    },
    computed: {
    rows() {
      return this.proyectos.length;
    },
  },
}
</script>
