Vue.component('change-association-selection-dia', {
    props: {
        init:{
            type: Array,
            default:() => []
        },
        list: {
            type: Array,
            default:() => []
        },
        contact:{
            type:String,
            default:() => ''
        }
    },
    data: function () {
        return {
            //搜索关键字
            diaChangeAssociationSelectionKey:'',
            //变更关联选择列表
            diaChangeAssociationSelectionListDataUse:this.list,
        }
    }, 
    methods: {
        //搜索变更关联选择
        searchChangeAssociationSelection(val){               
            let key = val  
            let data = this.init
            let dataList = []
            for(let i=0;i<data.length;i++){
                let dataChild = data[i]  
                 for(let index in dataChild) {  
                     let text = dataChild[index].toString()
                     if(text.indexOf(key) > -1 && index!=='id'){
                         dataList.push(dataChild)
                         break;
                     }
                 };                          
            }
            this.diaChangeAssociationSelectionListDataUse = dataList 
        },
        //获取选中状态
        getCheckedStatus(val){
            let contactChangeArr = this.contact.length > 0 ? this.contact.split(',') : []
            let id = val.OID         
            let status = false
            if(contactChangeArr.indexOf(id) > -1){                 
                status = true
            }
            return status
        },
        //数组删除
        ArrDelete(val,arr) {
            var index = this.ArrIndexOf(val,arr)
            if (index > -1) {
                arr.splice(index, 1)
            }
            return arr
        },
        //数组查找
        ArrIndexOf(val,arr){
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) return i
            }
            return -1
        },
        //选择变更关联选择
        checkChangeAssociationSelection(val,value){   
            //获取已选择列表数组
            let contactChangeArr = this.contact.length > 0 ? this.contact.split(',') : []       
            let id = value.OID.toString()
            let contactChangeStr = ''
            //勾选状态下  数组添加内容
            if(val==true){               
                contactChangeArr.push(id)
                contactChangeStr = contactChangeArr.join(',')
            }
            //取消勾选状态下  数组删除内容
            if(val==false){
                contactChangeArr = this.ArrDelete(id,contactChangeArr)
                contactChangeStr = contactChangeArr.join(',')
            }
            this.$emit('editcontactchange',contactChangeStr);        
        },    
    },
    mounted() {
        
    },
    created(){
    },
    template: `
            <el-form >
                <el-form-item>
                    <el-input v-model="diaChangeAssociationSelectionKey"  placeholder="请输入姓名或内容" suffix-icon="el-icon-search" @input="searchChangeAssociationSelection" ></el-input>
                </el-form-item>
                <el-card class="box-card" :body-style="{ maxHeight: '300px',overflowY: 'scroll'}">
                    <div v-for="(value,index) in diaChangeAssociationSelectionListDataUse" :key="index" class="text item">
                        <el-row style="position: relative;">
                            <el-col :span="2" style="position: absolute;top: calc( 50% - 7px)">
                                <el-checkbox  name="type" @change="function(val){checkChangeAssociationSelection(val,value)}"></el-checkbox>
                            </el-col>
                            <el-col :span="22" :offset="2" style="border:1px #DCDFE6 solid;padding:10px 20px;border-radis;border-radius: 5px;">
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
            </el-form>
        `
});
