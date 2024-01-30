<template>
  <pre class="jsonview" v-html="code"></pre>
</template>

<script>
import JsonViewer from "vue-json-viewer"
import utils from '@/utils'
import { nextTick } from 'vue'
export default {
  name: "JsonViewer",
  props: {
    value: {
      type: [Object, Array, String],
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      code: "{}",
      hid_list: []
    }
  },
  watch: {
    value(v, ov) {
      this.getStringJson()
    }
  },
  components: {
    JsonViewer
  },
  created() {
    this.getStringJson()
  },
  methods: {
    themJson(obj) {
      let isarray = Array.isArray(obj)
      for (let key in obj) {
        let value = obj[key]
        let vtype = typeof value
        if (vtype == "object") {
          obj[key] = this.themJson(value)
        }
        else if (vtype == "string") {
          let flage = false
          try {
            let temp = JSON.parse(value)
            if (typeof temp == "object") {
              obj[key] = this.themJson(temp)
              flage = true
            }
          } catch (e) { }
          if (!flage) {
            if (value.includes("http")) {
              obj[key] = `<a target="_blank" href=\"${value}\">${value}</a>`
            }
            else if (value && !isNaN(Number(value))) {
              obj[key] = `<span style='color:#FC8284'>${value}</span>`
            }
            else {
              obj[key] = `<span style='color:#000000'>${value}</span>`
            }
          }
        }
        else if (vtype == "number") {
          obj[key] = `<span style='color:#FC8284'>${value}</span>`
        }
        else if (vtype == "boolean") {
          obj[key] = `<span style='color:#3E6D0C'>${value}</span>`
        }
        if (!isarray) {
          obj[`<span style='color:#93C942'>${key}</span>`] = utils.deepClone(obj[key])
          delete obj[key]
        }

      }
      return obj
    },
    formatJson(obj) {
      obj = utils.deepClone(obj)
      let del_list = ["utils", "fieldIndex"]
      del_list.forEach(item => {
        delete obj[item]
      });
      obj = this.themJson(obj)
      let str = JSON.stringify(obj)
      str = str.replace(/\\\"/g, "\"")
      str = str.replace(/\\n/g, "")
      let ind = 0
      let backstr = ""
      let disind = false
      for (let i in str) {
        let s = str[i]
        if (s === "\{" || s === "\[") {
          if (!disind) {
            ind++
            let id = "hid_" + Math.random() + utils.generateUUID()
            this.hid_list.push(id)
            s = s + `<i id="${id}" class="el-icon-remove-outline"></i><div id="f_${id}">`
            s = s + "\n"
            for (let j = 0; j < ind; j++) {
              s = s + "  "
            }
          }
        }
        else if (s === "\}" || s === "\]") {
          if (!disind) {
            ind--
            for (let j = 0; j < ind; j++) {
              s = "  " + s
            }
            s = `</div>` + s
            s = "\n" + s
          }
        }
        else if (s === ",") {
          if (!disind) {
            s = s + "\n"
            for (let j = 0; j < ind; j++) {
              s = s + "  "
            }
          }
        }
        else if (s === "\"") {
          disind = !disind
        }
        backstr += s
      }
      return backstr
    },
    hidClick(id) {
      this.console.log(document.getElementById(id))
    },
    getStringJson() {
      if (!this.value) {
        return
      }
      try {
        if (typeof this.value == "object") {
          if (Object.keys(this.value).length == 0) {
            return
          }
          console.log(typeof this.value)
          this.code = this.formatJson(this.value)
        }
        else {
          this.code = this.formatJson(JSON.parse(this.value))
        }
      } catch (e) {
        console.log(e)
        this.code = String(this.value)
      }
      nextTick(() => {
        for (let i in this.hid_list) {
          let id = this.hid_list[i]
          if (!id) {
            return
          }
          let f_id = "f_" + id
          let item = document.getElementById(id)
          if (!item) {
            return
          }
          let f_item = document.getElementById(f_id)
          if (!f_item) {
            return
          }
          item.addEventListener("click", () => {
            if (f_item.getAttribute("hidden")) {
              f_item.removeAttribute("hidden")
              item.setAttribute("class", "el-icon-remove-outline")
            } else {
              f_item.setAttribute("hidden", "hidden")
              item.setAttribute("class", "el-icon-circle-plus-outline")

            }
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.jsonview {
  width: 100%;
  text-align: start;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>