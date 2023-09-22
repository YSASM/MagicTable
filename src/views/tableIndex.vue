<template>
  <mtable v-if="show"></mtable>
</template>

<script>
import _this from "@/main.js"
import utils from "@/utils"
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
    let path = `@/views${location.hash.replace(/#/, '')}/data.js`
    import(`@/views${location.hash.replace(/#/, '')}/data.js`).then(data => {
      if (!data) {
        this.$message.error(path + "失踪了！！！")
        return
      }
      _this.tableData = utils.deepClone(data.default)
      this.show = true
    }).catch(e => {
      this.$message.error(path + "失踪了！！！")
    })
  },
}
</script>