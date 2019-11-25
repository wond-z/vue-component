Vue.component('todo-item', {
    props: ['todo'],
    template: '<li @click="handleClick(todo.text)">{{ todo.text }}</li>',
    methods: {
        handleClick(val) {
            // 父子组件传值方法名必须小写
            this.$emit("childfn", val)
        }
    }
})


Vue.component('item-upload', {
    props:[],
    //全局组件根标签只能是一个
    template: `<div>
                     <el-upload
                        :action="baseUrl+'web/upload-file'"
                        list-type="picture-card"
                        :with-credentials="true"
                        :limit="9"
                        :data="{type:'img'}"
                        :on-preview="handlePictureCardPreview"
                        :on-change="changeUpload"               
                        :on-remove="changeUpload"
                        :before-upload="beforeAvatarUpload"
                        :on-exceed="exceed"
                        ref="upload"
                        :file-list="imgList">
                            <i class="el-icon-plus" ></i>
                      
                     </el-upload>                  
                     <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                     </el-dialog>
                     <p class="gray" >注：最多可上传9张图片，且每张图片大小不可超过200KB。</p>
                   
                </div>`,
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            imgArr:[],
            imgList:[],
        }
    },
    methods: {
        clearImgList(){
            this.$refs.upload.clearFiles()
        },
        changeUpload(file,fileList){

            if(file.response){
                if(file.response.code!="200"){
                    this.$message.error(file.response.msg);
                    fileList.splice(file);

                }
            }


            this.imgArr=[];
            var oThis=this;
            fileList.forEach(function (x) {
                if(x.response){
                    oThis.imgArr.push(x.response.data.value);
                }
            })
            var elUpload=document.getElementsByClassName("el-upload")[0];
            if(fileList.length==9){
                elUpload.style.cssText="display:none;"
            }else{
                elUpload.style.cssText="display:inline-block;"
            }
            this.$emit("change-upload",oThis.imgArr.join(","));


        },
        handlePictureCardPreview(file){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file){

            const isLt2M = file.size /1024 < 200;
            if (!isLt2M) {

                this.$message.error('上传图片大小不能超过200KB!');
            }
            return isLt2M;
        },
        exceed(){
            this.$message.error("最多上传9张图片");
        }


    },
    created(){
        this.baseUrl= sessionStorage.getItem("baseImgUpload");
    },
    mounted(){
        window.addEventListener("resize", this.clearImgList, false);
    }

})
