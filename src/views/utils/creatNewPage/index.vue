<template>
  <div class="index-container">
    <!-- <el-row class="line">
      <el-col :span="11">
        <el-card>
          <el-form v-model="data">
            <el-form-item>
              <el-input v-model="data.scrollWidth"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="11">
        
      </el-col>
    </el-row> -->
    <el-card>
      <mtable ref="table"></mtable>
    </el-card>
    <el-card style="height: 580px;">
      <!-- <JsonEditor :copyable="true" style="width: 100%;" v-model="data" mode="code"></JsonEditor> -->
      <codeEditor :value="data" @change="changeData" />
    </el-card>
    <!-- <el-row class="line">
      <el-col :span="10">
        <el-card style="height: 580px;">
          <codeEditor :value="data" @change="changeData" />
        </el-card>
      </el-col>
      <el-col :span="13">
        <el-card>
          <mtable ref="table"></mtable>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="height: max-content;">
      <JsonViewer :expanded="true" :value="data" style="width: 100% !important;">
      </JsonViewer>
    </el-card> -->
  </div>
</template>

<script>
import data from "./data.js"
import _this from "@/main.js"
import JsonViewer from 'vue-json-viewer'
import codeEditor from "@/components/codeEditor/index"

export default {
  data() {
    _this.tableData = data.tableData
    return {
      show: false,
      load: false,
      data: data.tableData,
    }
  },
  mounted() {
    this.watchTableData = setInterval(() => {
      let _thisdata = _this.tableData
      Object.keys(this.data).forEach(key => {
        this[key] = _thisdata[key]
      })
    }, 100)
    this.show = true
    this.load = false
  },
  components: {
    JsonViewer,
    codeEditor
  },
  methods: {
    changeData(val) {
      this.data = val
      _this.tableData = this.data
      let that = this
      setTimeout(() => {
        _this.methods.upDateTable()
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  .line {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
  }
}
</style>