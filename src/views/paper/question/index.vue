<template>
  <mtable v-if="show"></mtable>
</template>

<script>
import data from "./data.js"
import _this from "@/main.js"
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
  }
}
</script>