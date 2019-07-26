<template>
  <div class="base_bg_container">
    <div class="newPlate-container">
      <div class="detailContent">
        <p><i class='titleleftbar'></i><span>平台基本信息</span></p>
        <el-button type="primary" round size="mini" @click="back">返回</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="150px" :rules="formRules" class='addplate'>
        <el-form-item label="分管账套名称" prop="name">
          <el-input v-model="form.name" size="small" />
        </el-form-item>
        <el-form-item label="平台名称" prop="pname">
          <el-input v-model="form.pname" size="small" />
        </el-form-item>
        <el-form-item label="所在区域" prop="city">
          <sanji v-model="form.city" :fill-data="filldataArr" @ssqchange="changesanji" />
        </el-form-item>
        <el-form-item label="使用周期" prop="data">
          <el-col :span="3">
            <el-date-picker ref="date1" v-model="form.data.date1" type="date" placeholder="选择开始日期" style="width: 100%;"
              size="small" format=" yyyy-MM-dd" />
          </el-col>
          <el-col class="line" :span="1" style="text-align: center;">至</el-col>
          <el-col :span="3">
            <el-date-picker ref="date2" v-model="form.data.date2" type="date" placeholder="选择截止日期" style="width: 100%;"
              size="small" format=" yyyy-MM-dd" />
          </el-col>
        </el-form-item>
        <el-form-item label="禁用状态" prop="delivery" required>
          <el-switch v-model="form.delivery" active-color="#13ce66" inactive-color="#ddd" />
        </el-form-item>
        <el-form-item label="管理员姓名" prop="glname">
          <el-input v-model="form.glname" size="small" />
        </el-form-item>
        <el-form-item label="管理员账号" prop="glacNum">
          <el-input v-model="form.glacNum" size="small" />
        </el-form-item>
        <el-form-item label="备注说明" prop="desc">
          <el-input v-model="form.desc" type="textarea" size="small" />
        </el-form-item>

      </el-form>
    </div>
    <div class='btngroups'>
      <el-button type="primary" size="mini" @click="onSubmit" round>保存</el-button>
      <el-button type="primary" size="mini" @click="onSave" round>保存,继续配置功能</el-button>
      <el-button size="mini" @click="onCancel" round>取消</el-button>
    </div>
  </div>
</template>
<script>
  import sanji from '@/components/sanjiliandong'
  export default {
    name: 'AcMangentnewPlate',
    components: {
      sanji
    },
    data() {
      var checkData = (rule, value, callback) => {
        if (value.date1 !== '' && value.date2 == '') {
          callback(new Error('请选择截止日期'))
        } else if (value.date1 == '' && value.date2 == '') {
          callback(new Error('请选择使用周期'))
        } else {
          callback()
        }
      }
      var checkCity = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请选择所在区域'))
        } else {
          callback()
        }
      }
      return {
        filldataArr: [], // 三级联动数据回填
        sanjidata: '',
        form: {
          name: '',
          pname: '',
          city: '',
          data: {
            date1: '',
            date2: ''
          },
          delivery: false,
          glname: '',
          glacNum: '',
          desc: ''
        },
        formRules: {
          name: [{
            required: true,
            message: '请输入分管账套名称',
            trigger: 'blur'
          }],
          pname: [{
            required: true,
            message: '请输入平台名称',
            trigger: 'blur'
          }],
          glname: [{
            required: true,
            message: '请输入管理员名称',
            trigger: 'blur'
          }],
          glacNum: [{
            required: true,
            message: '请输入管理员账号',
            trigger: 'blur'
          }],
          data: [{
            required: true,
            message: '请选择使用周期',
            trigger: ['blur', 'change'],
            validator: checkData
          }],
          city: [{
            required: true,
            message: '请选择所在区域',
            trigger: ['blur', 'change'],
            validator: checkCity
          }]

        }
      }
    },
    methods: {
      changesanji(data) {
        console.log(data)
        this.form.city = data
        this.sanjidata = data
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 提交表单请求数据
            console.log('submit!')
            this.$refs.form.resetFields()
            this.form.data.date1 = ''
            this.form.data.date2 = ''
            this.$emit('closeDia')
          } else {
            return false
          }
        })
      },
      onSave() {},
      onCancel() {
        this.$refs.form.resetFields()
        this.form.data.date1 = ''
        this.form.data.date2 = ''
      },
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss">
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 200px;
  }

  .el-textarea {
    display: inline-block;
    width: 400px;
    vertical-align: bottom;
    font-size: 14px;
  }
</style>
<style lang="scss" scoped>
  .newPlate-container {
    background: #fff;

    .detailContent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;

      span {
        padding: 0 0 0 10px;
      }
    }

    .addplate {
      padding: 0 0 10px 0;
    }
  }

  .btngroups {
    margin: 10px 0 0 0;
  }
</style>
