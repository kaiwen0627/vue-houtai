<template>
  <div class="custom-tree-container">
    <div class="block">
      <p>后端功能(后台功能)</p>
      <el-tree
        :data="data_table"
        draggable
        node-key="id"
        :allow-drop="allowDrop"
        @node-drop="sort"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
        @node-click="nodeclick"
      >
      </el-tree>
      <!-- 新增 -->
      <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
        :modal-append-to-body='false'
      >
        <el-form :model="ruleForm" ref="ruleForm" :rules="formRules" label-width="110px" class="demo-ruleForm">
          <el-form-item label="功能名称:" prop="label">
            <el-input v-model="ruleForm.label" size='small'></el-input>
          </el-form-item>
           <el-form-item label="描述:" prop="description">
             <el-input type="textarea" v-model="ruleForm.description" size='small'></el-input>
           </el-form-item>
           <el-form-item label="功能类型:" prop='type'>
             <el-radio-group v-model="ruleForm.type" @change="changeRadio">
              <el-radio  label="1">root</el-radio>
              <el-radio  label="2">应用</el-radio>
              <el-radio label="3">菜单</el-radio>
              <el-radio label="4">按钮</el-radio>
             </el-radio-group>
           </el-form-item>
           <el-form-item label="模板路径:" prop="	templatePath">
             <el-input v-model="ruleForm.templatePath" size='small'></el-input>
           </el-form-item>
           <el-form-item label="指向地址:" prop="url">
             <el-input v-model="ruleForm.url" size='small'></el-input>
           </el-form-item>
           <el-form-item label="跳转地址:" prop="href">
             <el-input v-model="ruleForm.href" size='small'></el-input>
           </el-form-item>
           <el-form-item label="图标存放地址:" prop="src">
             <el-input v-model="ruleForm.src" size='small'></el-input>
           </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCancel" size='small'>取 消</el-button>
          <el-button type="primary" @click="queding" size='small'>确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 编辑 -->
       <el-dialog title="编辑" :visible.sync="dialogVisibleEdit"  append-to-body=""width="40%" :before-close="handleClose"
         :modal-append-to-body='false'>
         <el-form :model="ruleFormedit" ref="ruleFormedit" :rules="formRulesedit" label-width="110px" class="demo-ruleForm">
          <el-form-item label="功能名称:" prop="label">
            <el-input v-model="ruleFormedit.label" size='small'></el-input>
          </el-form-item>
          <el-form-item label="描述:" prop="description">
            <el-input type="textarea" v-model="ruleFormedit.description" size='small'></el-input>
          </el-form-item>
          <el-form-item label="功能类型:" prop='type'>
            <el-radio-group v-model="ruleFormedit.type" @change="changeRadio">
              <el-radio label="1">root</el-radio>
              <el-radio label="2">应用</el-radio>
              <el-radio label="3">菜单</el-radio>
              <el-radio label="4">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模板路径:" prop="	templatePath">
            <el-input v-model="ruleFormedit.templatePath" size='small'></el-input>
          </el-form-item>
          <el-form-item label="指向地址:" prop="url">
            <el-input v-model="ruleFormedit.url" size='small'></el-input>
          </el-form-item>
          <el-form-item label="跳转地址:" prop="href">
            <el-input v-model="ruleFormedit.href" size='small'></el-input>
          </el-form-item>
          <el-form-item label="图标存放地址:" prop="src">
            <el-input v-model="ruleFormedit.src" size='small'></el-input>
          </el-form-item>

         </el-form>
         <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisibleEdit = false">取 消</el-button>
           <el-button type="primary" @click="editqueding">确 定</el-button>
         </span>
       </el-dialog>
    </div>
  </div>
</template>

<script>
let id = 1000

export default {
  name:'FunManagener',
  data() {
    const data_table = [
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1'
              },
              {
                id: 10,
                label: '三级 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1'
          },
          {
            id: 6,
            label: '二级 2-2'
          }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1',
            children:[]
          },
          {
            id: 8,
            label: '二级 3-2'
          }
        ]
      },
      
    ]
    return {
      data_table: JSON.parse(JSON.stringify(data_table)),
      dialogVisible: false,
      dialogVisibleEdit:false,
      ruleForm:{     //新增表单
        permissionPid:'',
        label:'',
        description:'',
        type:'',
        templatePath:'',
        href:'',
        src:'',
        url:''
      },
      ruleFormedit:{  //编辑表单
         permissionPid:'',
         label:'',
         description:'',
         type:'',
         templatePath:'',
         href:'',
         src:'',
         url:''
      },
      addData:'',
      editNodeData:'',
      editData:'',
      drapData:[],   //拖拽完成之后的改变数据的集合
      formRules:{
       label: [{ required: true, message: '请输入功能名称', trigger: 'blur' }],
      },
       formRulesedit:{
       label: [{ required: true, message: '请输入功能名称', trigger: 'blur' }],
       }
     
    }
  },

  methods: {
    //新增弹框确定
    queding(){      
        let data = this.addData  
        //console.log(this.ruleForm)     
        const newChild = { id: id++, label: this.ruleForm.label, children: [] }
        //const newChild = { id: id++, children: [] }   
       // console.log(Object.assign(newChild,this.ruleForm)  )   
        //发送请求，把表单内容传给后台。成功执行以下程序
        
       
        //如果是新增
        if (data.add && !data.children) {
          this.$set(data, 'children', [])
          data.children.push(newChild)
        }else if(data.add && data.children){
            data.children.push(newChild)
        }  
         
        this.dialogVisible = false
        this.$refs.ruleForm.resetFields()
    },
    //新增取消
    addCancel(){
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = false
    },
    //编辑弹框确定
    editqueding(){    
    let editData = this.editData
    //console.log('edit',editData)
    //发送请求，把表单内容传给后台。成功执行以下程序  
   
    if(editData.edit){       
      this.editNodeData.label = this.ruleFormedit.label
    }
    this.dialogVisibleEdit = false
    this.$refs.ruleFormedit.resetFields()
    },


    append(node,data) {  
      //console.log(node)
      this.ruleForm.permissionPid = node.key
      this.$set(data, 'add', true)
      this.addData = data;
      this.dialogVisible = true
     
    },
    
    edit(node,data){ 
      //console.log(data) 
      //console.log(node)
      this.$set(data, 'edit', true)      
      this.editData = data    
      this.editNodeData = node.data       
      this.dialogVisibleEdit = true
      
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent(h, { node, data, store }) {  
      return (
        <span class='custom-tree-node'>
          <span class='custom-tree-node-span'>{node.label}</span>
          <span>
            <el-button
              size='mini'
              type='text'
              on-click={() => this.append(node,data)}
            >
                新增下级功能
            </el-button>
            <el-button size='mini' type='text' on-click={()=> this.edit(node, data)}
              >
              编辑
            </el-button>
            <el-button
              size='mini'
              type='text'
              on-click={() => this.remove(node, data)}
            >
                删除
            </el-button>
          </span>
        </span>
      )
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    nodeclick(date, node, slef) {
      // console.log(data)
      // console.log(node)
      // console.log(self)
      //console.log('拖拽之前的data',this.data_table)
    },
    //只能平级移动
    allowDrop(draggingNode, dropNode, type){
      console.log('1',draggingNode)
      console.log('2',dropNode)
    //  console.log(type)
      if (draggingNode.level === dropNode.level) {    
        return type === 'prev' || type === 'next'     
        // if (draggingNode.parent.id === dropNode.parent.id) {
        //     return type === 'prev' || type === 'next' 
        // }
      } else {
        // 不同级进行处理
        return false
      }
    //任意级别拖拽
    // if (draggingNode.data.aboveId === dropNode.data.aboveId) {
    // return type === 'prev' || type === 'next'
    // } else {
    // return type === 'prev' || type === 'next' || type === 'inner'
    // }
    },
    sort(draggingNode,dropNode,type,event){
      //console.log(draggingNode)
      //console.log(dropNode)
      //console.log(type)
      //console.log(event)
      //console.log("拖拽之后的data",this.data_table)
     this.drapData.push(...dropNode.parent.data.children)
     //console.log(this.drapData)
     //发送请求，传入this.drapData

    },
    //新增弹框中单选按钮切换
    changeRadio(id){
      console.log(id)
      this.ruleForm.type = id;
      console.log(this.ruleForm);
      
    },
    
  }
}
</script>

<style> 
  .custom-tree-node {   
    display: block;   
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
   
  }
 .custom-tree-node-span{
     padding:0 20px 0 0;
 }
 .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
 }
 .el-textarea {
    display: inline-block;
    width: 50%;
    vertical-align: bottom;
    font-size: 14px;
 }
</style>
<style type='scss' scoped>
 .block{
 width:60%;
 margin:0 auto;
 }

</style>