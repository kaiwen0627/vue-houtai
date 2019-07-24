<template>
  <div class="components-container">
   
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content:''
    }
  },
  created() {
    this.showmsg()
  },
  methods:{
    showmsg(){
      console.log(this.content)
    },
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

