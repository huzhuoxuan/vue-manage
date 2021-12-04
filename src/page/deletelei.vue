<template>
  <div>
    <head-top></head-top>
   
      <el-table
                :data="table_data.data"
                style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
            <el-table-column v-if="radio" type="index" width="50"></el-table-column>
      <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
              
                
                <el-table-column
                  label="类别"
                  prop="type">
                </el-table-column>
               
                
               
      <el-table-column label="操作" align="center">
        <template slot-scope="scope"> 
        
         

           <el-button
            size="small"
           :plain="true"
            type="danger"
            
            @click.native.prevent="handleDelete(scope.$index,scope.row,table_data.data)"
          >删除</el-button>
         
        </template>  
      
       
      </el-table-column>
    </el-table>
  <el-pagination
                           
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            >   
                    </el-pagination>
                    <h5>注：若该类别下有问题，需要先将该类别下所有问题删完才能删除该类别</h5>
  </div>
  
</template>

<script>
import headTop from  '../components/headTop.vue'
import axios from 'axios'
export default {
    components:{
        headTop
    },
    created(){
   
    },
   
  methods: {
    gettabledata() {
      
                this.$axios.get('/type/fingAllType?index=0').then((res) => {
                    this.table_data[i] = res.data[i];
                }).catch(function(error){
                    console.log(error);
                })
    
            },
    
    

    //多选框
     handleSelectionChange(val) {
       this.multipleSelection = val;
       console.log("selection:", this.multipleSelection);
     },
  
    //删除
     handleDelete(index,row,table_data) {
       console.log(index)
    console.log(row.id)
     this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            //点击确定的操作(调用接口)
             table_data.splice(index,1)
         var _this = this   //很重要！！
          this.$axios.get("/type/deleteType",{
                   params :{
                         id:row.id
                    }
                }).then(res=>{
                    if(res.data=="删除成功"){
                       this.gettabledata()
                        this.$message.success('删除成功')
                    }
                }).catch(error=>{
                    console.log(error);
                    this.$message.error('删除失败')
                })
     
      this.$message({
       message: "删除成功！",
       type: "success"
     });
     
          }).catch(() => {
            alert('已取消删除')
            //几点取消的提示
          });
 
   },
    
    handleCurrentChange(val){
      this.currentPage=val;
      // this.gettabledata()
      let url=`/type/findAllType?index=${val-1}` //pno=${this.pno++}`
this.$axios.get(url).then(resp=>{
this.table_data=resp.data;
    })
    }
   
  },
  mounted: function() {
    
    
     var _this = this   //很重要！！
      this.$axios({
                  method:'GET',
                  url:'/type/findAllType?index=0'
                }).then((resp)=>{
                  console.log(resp);
                  this.table_data=resp.data
                  console.log(this.table_data.data);
                }).catch((err)=>{
                  console.log(err);
                })
    
          
  },
 
  data() {
    return {
      // new_date_json: {}, //数据结构
       multipleSelection: [], //复选框，数据
      // is_edit: true, //是否可编辑
      // is_delete: true, //是否可删除
       selection: true, //是否需要复选框
       radio: false, //单选变色
      // space_color: true, //隔行变色
      //表头信息
    
      //表格数据
      table_data: {},
    currentPage:0, //初始页
                pagesize:10,    //    每页的数据
               total:100
    };
  }
};
</script>
<style scoped>
</style>
