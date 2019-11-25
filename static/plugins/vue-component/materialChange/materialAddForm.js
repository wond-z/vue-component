Vue.component('material-add-form', {
    props: {
        // list: {
        //     type: Array,
        //     default:() => []
        // }
    },
    data: function () {
        return {
            list:[]
        }
    },
    methods: {
        moreMaterrial(){
            let data = {show:true}
            this.list.push(data)
            console.log(this.list)
        }
    },
    mounted() {

    },
    template: `
        <el-row>
            <el-col :span="16">
                <div style="margin-top: 20px;text-align: center">
                    <el-button type="primary" @click="moreMaterrial()" icon="el-icon-plus">新增材料</el-button>
                  </div>
                <table cellspacing="0" cellpadding="0" border="0" class="el-table" style="width: 100%;">
                    <thead class="has-gutter">
                        <tr>
                            <th colspan="1" rowspan="1" class="is-leaf" width="100px"><div class="cell">材料名称</div></th>
                            <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料品牌</div></th>
                            <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">规格型号</div></th>
                            <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料单价</div></th>
                            <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料所需总量</div></th>
                            <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料单位</div></th>
                            <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料分类</div></th>
                            <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">操作栏</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in list" v-show="item.show">
                            <td>index</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><el-button type="danger" size="small" icon="el-icon-close" @click="item.show=false">删除</el-button></td>
                        </tr>
                    </tbody>
                </table>
            </el-col>
        </el-row>
        `
});
