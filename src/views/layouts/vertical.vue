<script>
import router from "@/router";
import { layoutComputed } from "@/state/helpers";

import Topbar from "@/components/topbar";
import SideBar from "@/components/side-bar";
import Rightsidebar from "@/components/right-sidebar";
import Footer from "@/components/footer";

export default {
  components: { Topbar, SideBar, Rightsidebar, Footer },
  data() {
    return {
      isMenuCondensed: false,
    };
  },
  created: () => {
    document.body.removeAttribute("data-layout", "horizontal");
    //document.body.removeAttribute("data-topbar", "dark");
    document.body.setAttribute("data-sidebar", "dark");
    document.body.setAttribute("data-topbar", "dark");
  },
  computed: {
    ...layoutComputed,
  },
  methods: {
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
          document.body.classList.remove("vertical-collpsed");
        });
        document.body.classList.toggle("vertical-collpsed");
      } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
  },
  mounted() {
    document.body.classList.remove("auth-body-bg");
    if (this.loader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }
  },
};
</script>

<template>
  <div>
    <div id="preloader">
      <div id="status">
        <div class="spinner">
          <i class="ri-loader-line spin-icon"></i>
        </div>
      </div>
    </div>

    <!-- Begin page -->
    <div id="layout-wrapper">
      <Topbar />
      <SideBar
        :is-condensed="isMenuCondensed"
        :type="leftSidebarType"
        :width="layoutWidth"
      />
      <!-- ============================================================== -->
      <!-- Start right Content here -->
      <!-- ============================================================== -->
      <div class="main-content" data-sidebar="dark">
        <div class="page-content" data-sidebar="dark">
          <div class="container-fluid" data-sidebar="dark">
            <div class="container-fluid"><div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">Advanced Table</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="/" target="_self" class="">Tables</a></li><li class="breadcrumb-item active"><span aria-current="location">Advanced</span></li></ol></div></div></div></div><div class="row"><div class="col-12"><div class="card"><div class="card-body"><h4 class="card-title">Data Table</h4><div class="row mt-4"><div class="col-sm-12 col-md-6"><div id="tickets-table_length" class="dataTables_length"><label class="d-inline-flex align-items-center"> Show <select class="custom-select custom-select-sm" id="__BVID__488"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries </label></div></div><div class="col-sm-12 col-md-6"><div id="tickets-table_filter" class="dataTables_filter text-md-right"><label class="d-inline-flex align-items-center"> Search: <input type="search" placeholder="Search..." class="form-control form-control-sm ml-2 form-control" id="__BVID__489"></label></div></div></div><div class="table-responsive mb-0"><div class="table-responsive-sm"><table aria-rowcount="70" role="table" aria-busy="false" aria-colcount="6" class="table b-table" id="__BVID__490"><!----><!----><thead role="rowgroup" class=""><!----><tr role="row" class=""><th role="columnheader" scope="col" tabindex="0" aria-colindex="1" aria-sort="none" class=""><div>Name</div><span class="sr-only"> (Click to sort Ascending)</span></th><th role="columnheader" scope="col" tabindex="0" aria-colindex="2" aria-sort="none" class=""><div>Position</div><span class="sr-only"> (Click to sort Ascending)</span></th><th role="columnheader" scope="col" tabindex="0" aria-colindex="3" aria-sort="none" class=""><div>Office</div><span class="sr-only"> (Click to sort Ascending)</span></th><th role="columnheader" scope="col" tabindex="0" aria-colindex="4" aria-sort="ascending" class=""><div>Age</div><span class="sr-only"> (Click to sort Descending)</span></th><th role="columnheader" scope="col" tabindex="0" aria-colindex="5" aria-sort="none" class=""><div>Date</div><span class="sr-only"> (Click to sort Ascending)</span></th><th role="columnheader" scope="col" tabindex="0" aria-colindex="6" aria-sort="none" class=""><div>Salary</div><span class="sr-only"> (Click to sort Ascending)</span></th></tr></thead><tbody role="rowgroup"><!----><tr role="row" aria-rowindex="61" class=""><td aria-colindex="1" role="cell" class="">Oswald Cruikshank</td><td aria-colindex="2" role="cell" class="">Help Desk Operator</td><td aria-colindex="3" role="cell" class="">Armenia</td><td aria-colindex="4" role="cell" class="">57</td><td aria-colindex="5" role="cell" class="">2019/05/16</td><td aria-colindex="6" role="cell" class="">$15700</td></tr><tr role="row" aria-rowindex="62" class=""><td aria-colindex="1" role="cell" class="">Henrietta Carsberg</td><td aria-colindex="2" role="cell" class="">Data Coordiator</td><td aria-colindex="3" role="cell" class="">Paninggaran</td><td aria-colindex="4" role="cell" class="">59</td><td aria-colindex="5" role="cell" class="">2019/07/13</td><td aria-colindex="6" role="cell" class="">$13700</td></tr><tr role="row" aria-rowindex="63" class=""><td aria-colindex="1" role="cell" class="">Eugenie Sang</td><td aria-colindex="2" role="cell" class="">Operator</td><td aria-colindex="3" role="cell" class="">Oxbow</td><td aria-colindex="4" role="cell" class="">59</td><td aria-colindex="5" role="cell" class="">2019/07/16</td><td aria-colindex="6" role="cell" class="">$15200</td></tr><tr role="row" aria-rowindex="64" class=""><td aria-colindex="1" role="cell" class="">Mohandas Course</td><td aria-colindex="2" role="cell" class="">Staff Accountant II</td><td aria-colindex="3" role="cell" class="">Wuping</td><td aria-colindex="4" role="cell" class="">59</td><td aria-colindex="5" role="cell" class="">2019/07/18</td><td aria-colindex="6" role="cell" class="">$12900</td></tr><tr role="row" aria-rowindex="65" class=""><td aria-colindex="1" role="cell" class="">Lulita Espasa</td><td aria-colindex="2" role="cell" class="">Operator</td><td aria-colindex="3" role="cell" class="">Sabi</td><td aria-colindex="4" role="cell" class="">59</td><td aria-colindex="5" role="cell" class="">2019/06/06</td><td aria-colindex="6" role="cell" class="">$13600</td></tr><tr role="row" aria-rowindex="66" class=""><td aria-colindex="1" role="cell" class="">Munmro Rendell</td><td aria-colindex="2" role="cell" class="">Marketing Manager</td><td aria-colindex="3" role="cell" class="">Castelo</td><td aria-colindex="4" role="cell" class="">60</td><td aria-colindex="5" role="cell" class="">2018/11/15</td><td aria-colindex="6" role="cell" class="">$12400</td></tr><tr role="row" aria-rowindex="67" class=""><td aria-colindex="1" role="cell" class="">Lanny Cregeen</td><td aria-colindex="2" role="cell" class="">Programmer I</td><td aria-colindex="3" role="cell" class="">Abbeville</td><td aria-colindex="4" role="cell" class="">60</td><td aria-colindex="5" role="cell" class="">2018/09/26</td><td aria-colindex="6" role="cell" class="">$15400</td></tr><tr role="row" aria-rowindex="68" class=""><td aria-colindex="1" role="cell" class="">Jon Tarbox</td><td aria-colindex="2" role="cell" class="">Senior Cost Accountant</td><td aria-colindex="3" role="cell" class="">Ryazhsk</td><td aria-colindex="4" role="cell" class="">61</td><td aria-colindex="5" role="cell" class="">2019/02/22</td><td aria-colindex="6" role="cell" class="">$16000</td></tr><tr role="row" aria-rowindex="69" class=""><td aria-colindex="1" role="cell" class="">Cherye Bleby</td><td aria-colindex="2" role="cell" class="">Quality Engineer</td><td aria-colindex="3" role="cell" class="">La Concordia</td><td aria-colindex="4" role="cell" class="">62</td><td aria-colindex="5" role="cell" class="">2018/10/04</td><td aria-colindex="6" role="cell" class="">$14700</td></tr><tr role="row" aria-rowindex="70" class=""><td aria-colindex="1" role="cell" class="">Lombard Crepin</td><td aria-colindex="2" role="cell" class="">Project Manager</td><td aria-colindex="3" role="cell" class="">Novoul’yanovsk</td><td aria-colindex="4" role="cell" class="">63</td><td aria-colindex="5" role="cell" class="">2019/04/28</td><td aria-colindex="6" role="cell" class="">$13300</td></tr><!----><!----></tbody><!----></table></div></div><div class="row"><div class="col"><div class="dataTables_paginate paging_simple_numbers float-right"><ul class="pagination pagination-rounded mb-0"><ul role="menubar" aria-disabled="false" aria-label="Pagination" class="pagination b-pagination"><li role="presentation" class="page-item"><button role="menuitem" type="button" tabindex="-1" aria-label="Go to first page" class="page-link">«</button></li><li role="presentation" class="page-item"><button role="menuitem" type="button" tabindex="-1" aria-label="Go to previous page" class="page-link">‹</button></li><!----><li role="separator" class="page-item disabled bv-d-xs-down-none"><span class="page-link">…</span></li><li role="presentation" class="page-item bv-d-xs-down-none"><button role="menuitemradio" type="button" aria-label="Go to page 4" aria-checked="false" aria-posinset="4" aria-setsize="7" tabindex="-1" class="page-link">4</button></li><li role="presentation" class="page-item"><button role="menuitemradio" type="button" aria-label="Go to page 5" aria-checked="false" aria-posinset="5" aria-setsize="7" tabindex="-1" class="page-link">5</button></li><li role="presentation" class="page-item"><button role="menuitemradio" type="button" aria-label="Go to page 6" aria-checked="false" aria-posinset="6" aria-setsize="7" tabindex="-1" class="page-link">6</button></li><li role="presentation" class="page-item active"><button role="menuitemradio" type="button" aria-label="Go to page 7" aria-checked="true" aria-posinset="7" aria-setsize="7" tabindex="0" class="page-link">7</button></li><!----><!----><li role="presentation" class="page-item disabled" aria-hidden="true"><span role="menuitem" aria-label="Go to next page" aria-disabled="true" class="page-link">›</span></li><li role="presentation" class="page-item disabled" aria-hidden="true"><span role="menuitem" aria-label="Go to last page" aria-disabled="true" class="page-link">»</span></li></ul></ul></div></div></div></div></div></div></div></div>
            <slot />
          </div>
        </div>
        <Footer />
      </div>
      <Rightsidebar />
    </div>
  </div>
</template>