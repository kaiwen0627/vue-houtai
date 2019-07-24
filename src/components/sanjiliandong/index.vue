<template>
  <div class="linkage">
    <el-select v-model="sheng" placeholder="省级地区" size="small" @change="choseProvince">
      <el-option v-for="item in province" :key="item.id" :label="item.city" :value="item.id" />
    </el-select>
    <el-select v-model="shi" placeholder="市级地区" size="small" @change="choseCity">
      <el-option v-for="item in shi1" :key="item.id" :label="item.city" :value="item.id" />
    </el-select>
    <el-select v-model="qu" placeholder="区级地区" size="small" @change="choseBlock">
      <el-option v-for="item in qu1" :key="item.id" :label="item.city" :value="item.id" />
    </el-select>
  </div>
</template>
<script>
import {
  fetchcitys
} from '@/api/city'
import {
  fetchshi
} from '@/api/city'
import {
  fetchxian
} from '@/api/city'

export default {
  name: 'Test002',
  props: ['fillData'],

  data() {
    return {
      sheng: '',
      shi: '',
      qu: '',
      province: [],
      shi1: [],
      qu1: [],
      selectSheng: '',
      selectShi: '',
      selectQu: '',
      sanjipinjie: ''

    }
  },
  mounted() {
    this.getcity()
  },
  methods: {
    getcity() {
      fetchcitys().then(res => {
        this.province = res.data.items
      })
    },
    getshi() {
      fetchshi(this.selectSheng).then(res => {
        this.shi1 = res.data.items
      }).catch(err => {
        console.log(err)
      })
    },
    getxian() {
      fetchxian(this.selectSheng, this.selectShi).then(res => {
        this.qu1 = res.data.items
      }).catch(err => {
        console.log(err)
      })
    },
    choseProvince(value) {
      let obj = {}
      obj = this.province.find((item) => {
        return item.id === value
      })
      this.selectSheng = obj.id
      this.getshi(this.selectSheng)
    },
    choseCity(value) {
      let obj = {}
      obj = this.shi1.find((item) => {
        return item.id === value
      })
      this.selectShi = obj.id
      this.getxian(this.selectSheng, this.selectShi)
    },
    choseBlock(value) {
      let obj = {}
      obj = this.qu1.find((item) => {
        return item.id === value
      })
      this.selectQu = obj.id
      // 拼接省市区的id
      this.sanjipinjie = this.selectSheng + ',' + this.selectShi + ',' + this.selectQu
      this.$emit('ssqchange', this.sanjipinjie)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
