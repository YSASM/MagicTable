<template>
  <mtable v-if="show"></mtable>
</template>

<script>
import data from "./data.js"
import _this from "@/main.js"
export default {
  data() {
    _this.tableData = data
    data.show = false
    return data
  },
  mounted() {
    this.show = true
  },
}
</script>