<template>
  <div class="fillcontain">
      <!-- 时间筛选区域 -->
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="按时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="250" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <!--  scope.row.date是prop的属性值date(好像是获取的数据里的属性名) -->
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>

        <el-table-column prop="operation" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="handleDelete(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--
        弹框页面Dialog.vue
        1. 弹框页面Dialog.vue是CapitalFlow.vue的子页面，在弹框Dialog.vue里输入的内容也是父组件CapitalFlow.vue的,
        要通过表单验证还需把在弹框Dialog.vue里输入的内容传给弹窗子组件Dialog.vue
    -->
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>
<script>
import Dialog from "../components/Dialog";
export default {
  name: "capitalflow",
  data() {
    return {
      // 默认分页数据
      tableData: [],
      // 所有表格数据
      allTableData: [],
      // 存储按时间筛选的数据
      filterTableData: [],
      // 存放弹窗输入的内容
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      dialog: {
        //传给子组件dialog，决定是否显示(默认不显示)
        show: false,
        // 弹窗标题
        title: "",
        option: "edit"
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总条数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      // 筛选时间的起始时间
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  computed: {
      user(){
        //   通过 v-if = 'user.identity == "manager"' 设置权限
          return this.$store.getters.user;

      }
  },
  components: {
    Dialog
  },
  created() {
    this.getProfile();
  },
  methods: {
    // 获取数据
    getProfile() {
      this.$axios("/api/profiles").then(res => {
        console.log(res);
        this.tableData = res.data;
        this.allTableData = res.data; //所有数据
        // this.filterTableData = res.data;
        // 设置分页数据
        this.setPaginations();
      });
    },

    // 设置分页数据方法
    setPaginations() {
      // 总条数
      this.paginations.total = this.allTableData.length;
      //当前页
      this.paginations.page_index = 1;
      // 设置每页条数默认为5
      this.paginations.page_size = 5;
      // 设置默认分页数据,js过滤函数filter()
      this.tableData = this.allTableData.filter((item, index) => {
        // 每页的条数小于5
        return index < this.paginations.page_size;
      });
    },

    // 输入框里选择每页显示的条数
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },

    // 获取当前页数据
    handleCurrentChange(page) {
      // 当前页
      //   let sortnum = this.paginations.page_size * (page - 1);
      //   let table = this.allTableData.filter((item, index) => {
      //     return index >= sortnum;
      //   });
      //   // 设置默认分页数据
      //   this.tableData = table.filter((item, index) => {
      //     return index < this.paginations.page_size;
      //   });

      // 获取当前页
      let index = this.paginations.page_size * (page - 1);
      //数据的总条数
      let nums = this.paginations.page_size * page;
      // 选中页页数的数据
      let tables = [];

      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
      }
      this.tableData = tables;
    },

    // 编辑
    handleEdit(row) {
      //点击编辑按钮时,显示弹窗,设置相应的标题,标识(区分是编辑还是添加)
      console.log(row);
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      // 编辑信息时弹窗输入框显示点击编辑按钮对应的数据
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },

    // 删除
    handleDelete(row, index) {
      //点击删除按钮时删除对应行信息,根据id来删除
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.getProfile();
        this.$message("删除成功");
      });
    },

    // 筛选
    handleSearch() {
      // 如果开始时间或结束时间为空
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间"
        });
        // this.getProfile();
        return;
      }
      // 转化为毫秒
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.allTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // this.getProfile();
      // 分页数据
      this.setPaginations();
    },

    // 添加
    handleAdd() {
      //点击编辑按钮时,显示弹窗,设置相应的标题,标识(区分是编辑还是添加)
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      // 添加信息的时候输入框的内容为空
      (this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      }),
        console.log(this.dialog.show);
    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>


