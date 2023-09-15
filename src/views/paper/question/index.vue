<template>
  <mtable v-if="show"></mtable>
</template>

<script>
import data from "./data.js"
import _this from "@/main.js"
import api from "@/api/paper/paper/index"
export default {
  data() {
    _this.tableData = data.tableData
    data.show = false
    return data
  },
  created() {

  },
  mounted() {
    this.show = true
    _this.globa.donotFetch = true
    let paperData = []
    api.getPaperPaperList({
      page: 1,
      size: 1000
    }).then(res => {
      res.data.items.forEach(item => {
        paperData.push({
          name: item.name,
          key: item.id
        })
      })
      _this.methods.upDateAppendFliterOption({
        name: "试卷名称",
        key: "paper_id",
        type: "select",
        items: paperData,
        filterable: true,
        value: paperData[0].key
      })
      _this.methods.initData()
    })
  },
}
</script>