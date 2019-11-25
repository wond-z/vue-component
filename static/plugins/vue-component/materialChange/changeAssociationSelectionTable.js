Vue.component('change-association-selection-table', {
    props: {
        list: {
            type: Array,
            default:() => []
        }
    },
    data: function () {
        return {

        }
    }, 
    methods: {
        
    },
    mounted() {
        
    },
    template: `
        <el-row>
            <el-col :span="16">
                <el-card class="box-card" style="margin-left: 150px;width: calc( 100% - 100px);">
                    <div v-for="(value,index) in list" :key="index" class="text item">
                        <el-row style="border:1px #DCDFE6 solid;padding:10px 20px;border-radis;border-radius: 5px;">
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="12">
                                        {{ value.realname }}
                                    </el-col>
                                    <el-col :span="12" class="text-align-right text-color-red">
                                        {{ value.processType }}
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        {{ value.timecreate }}
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        {{ value.content }}
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        `
});
