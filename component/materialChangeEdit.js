Vue.component('material-change-edit', {
    // props: ['changeDataList'],      // 在 JavaScript 中是 camelCase 的
    props: {
        changeDataList: Array
    },
    data: function () {
        return {
            detail: [],
            edited: [],
            options: [
                {
                    value: '钢筋',
                    label: '钢筋'
                }, {
                    value: '水泥',
                    label: '水泥'
                }, {
                    value: '2',
                    label: '其它'
                }
            ],
            inputMaxlength: 25,
            controls: false,
            tableTotal: 10,    // 总条数
            tablePage: 10,     // 每页条数
            pageNO: 1,         // 页码
            searchInput: '',
            searchResult: []
        }
    },
    methods: {
        // 解析变更材料数据，添加两个空字段，用以填充‘材料所需总量变更’
        parseChangeDataList(data) {
            var result = [];

            if (data.length > 0) {
                data.forEach(function (item, index) {
                    var obj = {
                        id: 'custom' + index,
                        show: index < 10 ? true : false,
                        addStatus: false,
                        addValue: ''
                    };
                    var assignObj = Object.assign({}, item, obj);
                    result.push(assignObj);
                });
                return result;
            }
            return result;
        },
        // 对比数据，有修改返回true，无修改或空返回false
        dataComparison(rowId, editId, value) {
            // 原始数据
            var rootData = this.changeDataList;
            // 索引号
            var index = rowId.substr(6);
            // 键名
            var key = editId.substr(5);
            // 原始值
            var rawValue = rootData[index][key] ? rootData[index][key].toString() : '';
            // console.log(rawValue);
            // console.log(value);
            if (value) {
                var newValue = value.toString();
                return rawValue === newValue ? true : false;
            } else {
                this.detail[index][key] = rawValue;
                return true;
            }
        },
        /**
         * 材料所需总量变更校验
         * @param {string} rowId  行id
         */
        addValueValid(rowId) {
            // 索引号
            var index = rowId.substr(6);
            // 当前行数据
            var row = this.detail[index];
            // 减少
            if (!row.addStatus) {
                var all = row.originalMaterialChangeNum ? parseFloat(row.originalMaterialChangeNum) : 0;
                var have = row.originalPurchasenumCount ? parseFloat(row.originalPurchasenumCount) : 0;
                var D_Value = all - have;
                if (row.addValue > D_Value) {
                    this.detail[index]['addValue'] = D_Value;
                }
            }
        },
        /**
         * 材料所需总量变更增加/减少切换
         * @param {boolean} value  当前值
         * @param {string} rowId  行id
         */
        switchChange(rowId) {
            // console.log(value);
            // console.log(rowId);
            this.addValueValid(rowId);
        },
        // input框状态(失焦后触发)
        inputBlur(e) {
            var value = e.target.value;
            var editId = e.target.attributes['edit-id'].nodeValue;
            var rowId = e.target.attributes['row-id'].nodeValue;
            var status = this.dataComparison(rowId, editId, value);
            var node = document.querySelector('input[row-id=' + rowId + '][edit-id=' + editId + ']');
            if (!status) {
                node.classList.add('is-warning');
            } else {
                node.classList.remove('is-warning');
            }
        },
        /**
         * 数字输入框与下拉状态设置
         * @param  {string || number} value  当前值
         * @param  {string} rowId  行id
         * @param  {string} editId 编辑框名称
         */
        inputNumberBlur(value, rowId, editId, valid) {
            // console.log(value);
            var status = this.dataComparison(rowId, editId, value);

            // 材料所需总量变更校验
            if (valid) {
                this.addValueValid(rowId);
            }
            var node = document.querySelector('div[row-id=' + rowId + '][edit-id=' + editId + '] input');
            if (!status) {
                node.classList.add('is-warning');
            } else {
                node.classList.remove('is-warning');
            }
        },
        /**
        * changeSelect 下拉框状态（改变值后触发）
        * @param  {string} value 当前值
        * @param  {string} rowId 行号/ID
        */
        changeSelect(value, rowId) {
            var status = this.dataComparison(rowId, 'edit_typeName', value);
            var node = document.querySelector('div[row-id=' + rowId + '][edit-id=edit_typeName] input');
            if (!status) {
                node.classList.add('is-warning');
            } else {
                node.classList.remove('is-warning');
            }
        },
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
        // 自定义分页显示处理；搜索分页处理
        // 搜索分页原理：
        // 1.找出detail中包含搜索内容的行，存储行索引（searchResult)
        // 2.搜索结果总条数传递给tableTotal，生成分页
        // 3.在searchResult中截取当前页面需要显示数据数量的片段showList
        // 4.遍历showList，将detail中对应行数据show属性设置为true
        dataShow() {
            var self = this;
            var data = this.detail;
            var start = (this.pageNO - 1) * this.tablePage;
            var end = start + this.tablePage;
            if (this.searchInput) {
                // 分页总数
                this.tableTotal = this.searchResult.length;
                var showList = this.searchResult.slice(start, end);
                // 先将所有数据隐藏
                self.detail.forEach(function (item, index) {
                    self.detail[index].show = false;
                });
                // 显示搜索结果片段
                for (var i = 0; i < showList.length; i++) {
                    self.detail[showList[i]].show = true;
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    self.detail[i].show = false;
                    if ((i > start || i === start) && i < end) {
                        self.detail[i].show = true;
                    }
                }
            }
        },
        // 搜索
        searchData() {
            var self = this;
            var value = this.searchInput;
            if (value) {
                this.searchResult = [];
                this.detail.forEach(function (item, index) {
                    if (item.materialname.indexOf(value) > -1
                    || item.materialbrand.indexOf(value) > -1
                    || item.materialmodel.indexOf(value) > -1
                    // || item.materialPrice.indexOf(value) > -1
                    // || item.materialChangeNum.indexOf(value) > -1
                    || item.unit.indexOf(value) > -1
                    || item.typename.indexOf(value) > -1) {
                        console.log(self.searchResult);
                        self.searchResult.push(index);
                    }
                });
            } else {
                this.searchResult = [];
            }
            this.dataShow();
        },
        // 解析返回最终格式数据
        resultData() {
            var resultData = [];
            this.detail.forEach(function (item) {
                var obj = {
                    materialOID: item.materialOID || '',
                    materialName: item.materialname,
                    materialBrand: item.materialbrand,
                    materialModel: item.materialmodel,
                    materialPrice: item.materialPrice,
                    materialChangeNum: item.materialChangeNum,
                    materialUnit: item.unit,
                    typeName: item.typename
                };
                resultData.push(obj);
            });
            return resultData;
        },
        // 变更列表
        interfaceForMetrailDetail(param) {
            var self = this;
            $.ajax({
                type: 'POST',
                url: apihost + '/instantmessage/getdepartmentlist.rest',
                data: param,
                success: function (res) {
                    if (parseInt(res.code) === 200) {
                        self.detail = self.parseChangeDataList(res.data.changeDataList);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        },
    },
    mounted() {
        // this.interfaceForMetrailDetail();
        this.detail = this.parseChangeDataList(this.changeDataList);
        console.log(this.detail);
        this.tableTotal = this.detail.length;
    },
    watch: {
        searchInput(nv, ov) {
            console.log(nv);
            console.log(ov);
            this.searchInput = nv.trim();
            this.searchData();
        }
    },
    template: `
        <div>
            搜索：<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput" class="searchInput"></el-input>
            <table cellspacing="0" cellpadding="0" border="0" class="el-table" style="width: 100%;">
                <thead class="has-gutter">
                    <tr>
                        <th colspan="1" rowspan="1" class="is-leaf" width="100px"><div class="cell">材料名称</div></th>
                        <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料品牌</div></th>
                        <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">规格型号</div></th>
                        <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料单价</div></th>
                        <th colspan="1" rowspan="1" class="is-leaf" width="180px"><div class="cell">材料所需总量/已采购</div></th>
                        <th colspan="1" rowspan="1" class="is-leaf" width="180px"><div class="cell">材料所需总量变更</div></th>
                        <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料单位</div></th>
                        <th colspan="1" rowspan="1" class="is-leaf"><div class="cell">材料分类</div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in detail" v-show="item.show">
                        <td>{{item.materialname}}</td>
                        <td>
                            <el-input v-model="item.materialbrand" @blur="inputBlur" :maxlength="inputMaxlength" :row-id="item.id" edit-id="edit_materialBrand"></el-input>
                        </td>
                        <td>
                            <el-input v-model="item.materialmodel" @blur="inputBlur" :maxlength="inputMaxlength" :row-id="item.id" edit-id="edit_materialModel"></el-input>
                        </td>
                        <td>
                            <el-input-number
                                v-model="item.materialPrice"
                                :controls="controls"
                                :precision="2"
                                @blur="function(e){inputNumberBlur(item.materialPrice, item.id, 'edit_materialPrice')}"
                                :row-id="item.id"
                                edit-id="edit_materialPrice">
                            </el-input-number>
                        </td>
                        <td>{{ item.materialnum }} / {{ item.purchasenumCount }}</td>
                        <td>
                            <el-switch v-model="item.addStatus" active-text="增加" inactive-text="减少" @change="function(val){switchChange(item.id)}" class="inline-block switchStyle"></el-switch>
                            <el-input-number
                                v-model="item.addValue"
                                class="inline-block"
                                style="width: 100px;"
                                :controls="controls"
                                :precision="2"
                                @blur="function(e){inputNumberBlur(item.addValue, item.id, 'edit_addValue', true)}"
                                :row-id="item.id"
                                edit-id="edit_addValue">
                            </el-input-number>
                        </td>
                        <td>
                            <el-input v-model="item.unit" @blur="inputBlur" :row-id="item.id" edit-id="edit_materialUnit"></el-input>
                        </td>
                        <td>
                            <el-select v-model="item.typename" placeholder="请选择" @change="function(val){changeSelect(val, item.id, 'edit_typeName')}" :row-id="item.id" edit-id="edit_typeName">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                </tbody>
            </table>
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
