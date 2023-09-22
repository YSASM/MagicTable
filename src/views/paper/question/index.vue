<template>
  <mtable v-if="show"></mtable>
</template>

<script>
import data from "./data.js"
import _this from "@/main.js"
export default {
  data() {
    _this.tableData = data
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  }
}
</script>