<template>
    <div class="fillcontain">
        <head-top></head-top>
        
        <div class="table_container">
            <el-table
                :data="tableData.data"
                style="width: 100%"
               
                >
           
                <el-table-column
                  label="提问问题"
                  prop="fproblem"
                  >
                </el-table-column>
                <el-table-column
                  label="提问人姓名"
                  prop="ftname">
                </el-table-column>
                <el-table-column
                  label="提问人单位"
                  prop="fname">
                </el-table-column>
                 <el-table-column
                  label="提问人电话"
                  prop="fcall">
                </el-table-column>
                 <el-table-column
                  label="提问时间"
                  prop="createTime">
                </el-table-column>
               
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="1000">
                </el-pagination>
            </div>
            
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import axios from 'axios'
   
    export default {
        data(){
            return {
                count:0,
              isPaging:true, //是否显示分页
pageIndex:1, //当前页（必传）
pageSize :20, //每页多少条
currentPage:1, //当前显示3页
totalNumber: 1, //总条数

totalPage:1 , //总页数
pno:'1', // 页码
// 分页功能
currentPage4: 4,
tableData:{}, //后台拿来的数据
            
            }
        },
       // created(){
            //this.initData();
           // console.log(11111)
       // },
    	components: {
    		headTop,
    	},
        created:function(){
           
        },
         mounted: function () {
            var _this = this   //很重要！！
            // axios.get('/feedbac/findAllFeedbac?index=0')
            //     .then(function (res) {
            //         console.log(res);
            //         _this.tableData = res.data
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
             this.$axios({
                  method:'GET',
                  url:'/feedbac/findAllFeedbac?index=0'
                }).then((resp)=>{
                  console.log(resp);
                  this.tableData=resp.data
                  console.log(this.tableData.data);
                }).catch((err)=>{
                  console.log(err);
                })
        },
        methods: {
             
            
            
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;

                this.offset = (val - 1)*this.limit;
                let url=`/feedbac/findAllFeedbac?index=${val-1}` //pno=${this.pno++}`
this.$axios.get(url).then(result=>{
this.tableData=result.data;
})
                
            },          
           
           
           
           
            
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
