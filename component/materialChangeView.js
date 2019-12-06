Vue.component('material-change-view', {
    props: {
        changeDataList: Array
    },
    data: function () {
        return {
            showData: [],
            tableTotal: 10,    // 总条数
            tablePage: 10,     // 每页条数
            pageNO: 1,         // 页码
        }
    },
    methods: {
        // 分页-切换页
        handleCurrentChange(val) {
            console.log(val);
            this.pageNO = val;
            this.dataShow();
            // this.searchByPage();
        },
        // 分页-每页条数
        handleSizeChange(val) {
            this.tablePage = val;
            this.dataShow();
            // this.searchByPage();
        },
        // 自定义分页显示处理
        dataShow() {
            var start = (this.pageNO - 1) * this.tablePage;
            var end = start + this.tablePage - 1;
            this.showData = this.changeDataList.slice(start, end)
        },
    },
    mounted() {
        this.tableTotal = this.changeDataList.length;
        this.showData = this.changeDataList.slice(0, 9);
    },
    template: `
        <div>
            <el-table
                :data="showData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                            <tr class="table-detail-row">
                                <td rowspan="1" colspan="1"><div class="cell">{{ props.row.originalMaterialName }}</div></td>
                                <td rowspan="1" colspan="1"><div class="cell">{{ props.row.originalMaterialBrand }}</div></td>
                                <td rowspan="1" colspan="1"><div class="cell">{{ props.row.originalMaterialModel }}</div></td>
                                <td rowspan="1" colspan="1"><div class="cell">{{ props.row.originalMaterialPrice }}</div></td>
                                <td rowspan="1" colspan="1"><div class="cell">{{ props.row.originalMaterialChangeNum }} / {{ props.row.originalPurchasenumCount }}</div></td>
                                <td rowspan="1" colspan="1"><div class="cell">{{ props.row.originalMaterialUnit }}</div></td>
                                <td rowspan="1" colspan="1"><div class="cell">{{ props.row.originalTypeName }}</div></td>
                            </tr>
                        </table>
                    </template>
                </el-table-column>
                <el-table-column label="材料名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.materialName !== scope.row.originalMaterialName" class="warning">{{scope.row.materialName}}</span>
                        <span v-else>{{scope.row.materialName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="材料品牌">
                    <template slot-scope="scope">
                        <span v-if="scope.row.materialBrand !== scope.row.originalMaterialBrand" class="warning">{{scope.row.materialBrand}}</span>
                        <span v-else>{{scope.row.materialBrand}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="规格型号">
                    <template slot-scope="scope">
                        <span v-if="scope.row.materialModel !== scope.row.originalMaterialModel" class="warning">{{scope.row.materialModel}}</span>
                        <span v-else>{{scope.row.materialModel}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="材料单价">
                    <template slot-scope="scope">
                        <span v-if="scope.row.materialPrice !== scope.row.originalMaterialPrice" class="warning">{{scope.row.materialPrice}}</span>
                        <span v-else>{{scope.row.materialPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="材料所需总量/已采购">
                    <template slot-scope="scope">
                        <span v-if="scope.row.materialChangeNum !== scope.row.originalMaterialChangeNum">
                            <i v-if="scope.row.materialChangeNum > scope.row.originalMaterialChangeNum" class="el-icon-top primary"></i>
                            <i v-else class="el-icon-bottom danger"></i>
                            <label class="warning">{{scope.row.materialChangeNum}}</label> / {{scope.row.originalPurchasenumCount}}
                        </span>
                        <span v-else>{{scope.row.materialChangeNum}} / {{scope.row.originalPurchasenumCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="材料单位">
                    <template slot-scope="scope">
                        <span v-if="scope.row.materialUnit !== scope.row.originalMaterialUnit" class="warning">{{scope.row.materialUnit}}</span>
                        <span v-else>{{scope.row.materialUnit}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="材料分类">
                    <template slot-scope="scope">
                        <span v-if="scope.row.typeName !== scope.row.originalTypeName" class="warning">{{scope.row.typeName}}</span>
                        <span v-else>{{scope.row.typeName}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                class="pagination-table"
                background
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="tablePage"
                :current-page="pageNO"
                layout="prev, pager, next, sizes, jumper"
                :total="tableTotal">
            </el-pagination>
        </div>
    `
});
