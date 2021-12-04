<template>
    <div>
        <head-top></head-top>
	
         
		
    <div>
       <el-table
      :data="tableData.data"
      style="width: 100%">
      <el-table-column
        prop="pproblem"
        label="最热问题"
       >
      </el-table-column>
      <el-table-column
        prop="panswer"
        label="答案"
        width="500">
      </el-table-column>
     <el-table-column
        
        label="文件"
       >
        <template slot-scope="scope">
                 <a :href="`http://175.24.24.187:8080/images/tupian/${scope.row.pfile}`" >{{scope.row.pfname}}</a>
                  </template>
      </el-table-column>
      
     
      <el-table-column
        prop="pcount"
        label="查询次数"
      >
      </el-table-column>
    </el-table>
  


    </div>
		
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	
	
    export default {
    	data(){
    		return {
    			tableData:{},
				  
    		}
        
    	},
       mounted: function () {
            var _this = this   //很重要！！
            
             this.$axios({
                  method:'GET',
                  url:'/problem/hotProblem'
                }).then((resp)=>{
                  console.log(resp);
                  this.tableData=resp.data
                  console.log(this.tableData.data);
                }).catch((err)=>{
                  console.log(err);
                })
                     
        },
    	components: {
    		headTop,
    		
    	},
      created(){
        
      },
      methods:{
       
        
      }
    	
    }
    
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
     a{
    color: dodgerblue;
    font-size: 12px;
    
}
</style>
