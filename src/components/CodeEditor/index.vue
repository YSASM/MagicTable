<template>
  <div class="codeEditBox">
    <!-- <el-button @click="codeChange" type="success" style="width: 100%;margin-bottom: 10px;">提交</el-button> -->
    <editor v-model="code" height="500px" @init="editorInit" lang="json" :options="editorOptions" theme="chrome"
      @input="codeChange">
    </editor>
  </div>
</template>
<script>
import utils from '@/utils'
import Editor from 'vue2-ace-editor'
export default {
  name: "CodeEditor",
  props: {
    value: {
      type: [Object, Array, String],
      default: () => {
        return {}
      }
    },
    backType: {
      type: String,
      default: "str"
    }
  },
  components: {
    Editor,
  },
  watch: {
    value(v, ov) {
      this.getStringJson()
    }
  },
  created() {
    this.getStringJson()
  },
  data() {
    return {
      code: '',
      editorOptions: {
        // 设置代码编辑器的样式
        enableBasicAutocompletion: true, // 启用基本自动完成
        enableSnippets: true, // 启用代码段
        enableLiveAutocompletion: true, // 启用实时自动完成
        tabSize: 2, // 标签大小
        fontSize: 15, // 设置字号
        showPrintMargin: false, // 去除编辑器里的竖线
      },
      keywords_list: [
        { meta: "逻辑操作符", caption: "AND", value: "AND", score: 1 },
        { meta: "逻辑操作符", caption: "OR", value: "OR", score: 1 },
        { meta: "逻辑操作符", caption: "NOT", value: "NOT", score: 1 },
      ]
    }
  },
  methods: {
    getStringJson() {
      try {
        if (typeof this.value == "object") {
          let value = utils.deepClone(this.value)
          this.code = JSON.stringify(value, null, 2)
        }
        else {
          this.code = JSON.stringify(JSON.parse(this.value), null, 2)
        }
      } catch (e) {
        this.code = String(this.value)
        this.$emit('has-error')
      }
    },
    codeChange() {
      try {
        let value = JSON.parse(this.code)
        if (this.backType == "str") {
          this.$emit('json-change', this.code)
        } else if (this.backType == "obj") {
          this.$emit('json-change', value)
        }
      } catch (e) {
        this.$emit('has-error')
      }
    },
    editorInit() {
      require('brace/theme/chrome');
      require('brace/ext/language_tools'); //language extension prerequsite...
      require('brace/mode/json');
      require('brace/snippets/json');
    },
  },
}
</script>
<style scoped>
.codeEditBox {
  width: 100%;
  border: 1px solid #dcdee2;
}

.ace_editor {
  height: 100% !important;
}

.ace_content {
  line-height: 20px;
  font-size: 12px;
  color: pink;
}
</style>
