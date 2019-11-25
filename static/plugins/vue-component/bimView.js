Vue.component('bim-view', {
    props: ['csrf', 'url_param_projectid', 'html2canvas'],
    template: `  <div>
                 <el-form-item label="添加BIM模型">
                    <div class="bimComm">
                        <el-select @change="changeUnit()" v-model="projectid" placeholder="请选择合作公司" :disabled="checkBol">
                            <el-option
                                    v-for="item in unitList"
                                    :key="item.projectid"
                                    :label="item.name"
                                    :value="item.projectid">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <!--<el-select @change="loadBim()" v-model="bimselectIndex" placeholder="请选择BIM模型">-->
                            <!--<el-option-->
                                    <!--v-for="(item,index) in bimList"-->
                                    <!--:key="item.tf_id"-->
                                    <!--:label="item.tf_catelog"-->
                                    <!--:value="index">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                        <el-cascader
                            placeholder="请选择或搜索模型"
                            :options="bimList"
                            :props="props"
                            v-model="bimselectIndex"
                             @change="loadBim()"
                             filterable
                             :disabled="checkBol"
                             ></el-cascader>

                    </div>
                  </el-form-item>
                  <el-form-item label="BIM模型" v-if="bimShow">
                     <!--<el-button type="text" @click="getPic()">点击这里进行截屏</el-button>-->
                     <iframe id="testIframe" style="width: 950px;height: 550px" :src="bimUrl"></iframe>
                 </el-form-item>
                 <div class="pic"></div>
                 </div>`,
    data() {
        return {
            projectid: '',
            bimselectIndex: '',
            unitList: [],
            bimList: [],
            bimUrl: '',
            bimShow: false,
            bimData: {
                bimid: "",
                bimurl: "",
                bimname: ""
            },
            pointsObj: {},
            props: {
                value: "tf_id",
                label: "tf_catelog",
                children: "children"
            },
            bimSendData: {
                type: "1"
            },
            checkBol:false,
            BIMid: '',
        }
    },
    methods: {
        changeUnit() {
            this.bimShow=false;
            this.bimUrl="";
            this.bimList = [];
            this.getBimList(this.projectid)
        },
        getUnit() {
            let _this = this
            $.ajax({
                type: "post",//方法类型
                url: "cooperationunit",//url
                headers: {
                    'X-CSRF-Token': _this.csrf
                },
                data: {"projectid": _this.url_param_projectid, "type": "bim"},
                success: function (res) {
                    if (res.code == 200) {
                        _this.unitList = res.data
                    }
                }
            })
        },
        getBimList(projectid) {
            let _this = this;
            this.bimSendData.projectid = projectid;


            // if(sessionStorage.getItem("modelSendData")){
            //     var modelSendData=JSON.parse(sessionStorage.getItem("modelSendData"));
            //    for (var x in modelSendData){
            //        sendData[x]=modelSendData[x]
            //    }
            // }
            $.ajax({
                type: "post",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url: "/project/publish/bimlist",//url
                data: _this.bimSendData,
                success: function (res) {
                    if (res.code == 200) {
                        _this.bimList = res.data.node_list;

                    }
                }
            })
        },
        loadBim() {

            for (let item of this.bimselectIndex) {
                this.BIMid = item
            }
            let obj = this.getBimInfo(this.bimList)

            this.bimData.bimid = obj.tf_id
            this.pointsObj[this.bimData.bimid] = []
            this.bimData.bimurl = obj.tf_href
            this.bimData.bimname = obj.tf_catelog
            this.$emit("bimdata", this.bimData)
            // if ([924, 925, 926, 927, 928, 929, 930, 1104, 1500, 1593,1695,1696,1697,1698,1700,1699,1701,1702].indexOf(parseInt(this.url_param_projectid)) == -1) {
            //     this.bimUrl = `https://bimcloud.tfhulian.com/bim/BIM/index.html?f=${this.bimData.bimurl.slice(2)}`
            //     this.bimShow = true
            // } else {
            this.bimUrl = `/static/bim/topc.html?${this.bimData.bimurl}&markerEnable=true`
            this.bimShow = true
            // }
            if (obj.sourceBim) {
                let markerInfo = obj.sourceBim
                window.addEventListener("message", function (event) {

                    if (event.data.type == "InitCallBack") {
                        var bimData = {}
                        iframe1 = document.getElementById('testIframe')
                        for (let item of markerInfo) {
                            bimData.base64 = item.bimlink

                            iframe1.contentWindow.TKBIMtools.Fn._ShowMarkerLabel(bimData)
                        }
                    }
                })
            }

        },

        getBimInfo(tdata) {
            var bimid = this.BIMid
            var a = {}
            let fn = (data) => {
                if (Array.isArray(data) && data.length > 0) {
                    for (let v of data) {
                        if (v.tf_id == bimid) {
                            a = v
                        } else if (v.children) {
                            fn(v.children)
                        }
                    }
                }
            }
            fn(tdata)
            return a
        },
        getPic() {
            let _this = this
            const loading = _this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            // if ([924, 925, 926, 927, 928, 929, 930, 1104, 1500, 1593,1695,1696,1697,1698,1700,1699,1701,1702].indexOf(parseInt(this.url_param_projectid)) == -1) {
            //     var test = document.getElementById('testIframe')
            //     test.contentWindow.postMessage('getScreenCaptureForWeb', '*');
            //     window.addEventListener('message', function (event) {
            //             if (event.data) {
            //                 loading.close();
            //                 _this.$message({
            //                     message: '截图完成',
            //                     type: 'success'
            //                 });
            //                 _this.$emit("bimimg", "data:image/png;base64," + event.data)
            //             } else {
            //                 loading.close();
            //                 _this.$message({
            //                     message: '截图失败',
            //                     type: 'error'
            //                 });
            //             }
            //         }
            //     )
            // } else {
            var test = document.getElementById('testIframe').contentWindow.document.body
            _this.html2canvas(test).then(function (canvas) {
                // canvas宽度
                let canvasWidth = canvas.width;
                // canvas高度
                let canvasHeight = canvas.height;
                let img = Canvas2Image.convertToImage(canvas, canvasWidth, canvasHeight);
                // 渲染图片
                if (img) {
                    loading.close();
                    _this.$message({
                        message: '截图完成',
                        type: 'success'
                    });
                    _this.$emit("bimimg", $(img).attr('src'))
                } else {
                    loading.close();
                    _this.$message({
                        message: '截图失败',
                        type: 'error'
                    });
                }
            });
            // }
        }
    }
    ,
    mounted() {
        this.getUnit()
        let _this = this
        window.addEventListener("message", function (event) {
            let point = ''
            if (event.data.tickMarker) {

                point = _this.bimData.bimurl + "#marker=" + btoa(JSON.stringify(event.data.tickMarker))
                setTimeout(function () {
                    _this.getPic()
                }, 1000)
                _this.$emit("markerdata", point)
            }
        })

    }
})





