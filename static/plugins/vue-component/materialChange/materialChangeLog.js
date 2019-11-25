Vue.component('material-change-log', {
    props: {
        list: {
            type: Array,
            default:() => []
        }
    },
    data: function () {
        return {
            tableData: [],
            btnStatus: true
        }
    }, 
    methods: {
        moreList(){
            this.btnStatus = false
            this.tableData = this.list
        },
        retractList(){
            this.btnStatus = true
            let data = []
            data.push(this.list[0])
            this.tableData = data
        }
    },
    mounted() {
        
    },
    created(){
        this.retractList()
    },
    template: `
        <el-row>
            <el-col :span="18">
                <el-table                
                  :data="tableData"        
                  style="width: 100%">
                  <el-table-column
                    prop="userName"
                    label="申请人"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="addDateTime"
                    label="申请时间"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="auditorPerson"
                    label="审核人">
                  </el-table-column>
                  <el-table-column
                    prop="auditorDateTime"
                    label="审核时间">
                  </el-table-column>
                  <el-table-column
                    prop="auditorResult"
                    label="审核结果">
                  </el-table-column>
                </el-table>
                 <div style="margin-top: 20px;text-align: center">
                    <el-button @click="moreList()" v-if="btnStatus == true" >点击展开更多</el-button>
                    <el-button @click="retractList()" v-if="btnStatus == false">点击收起</el-button>
                  </div>
            </el-col>
        </el-row>
        `
});
