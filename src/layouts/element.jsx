export default {
  // 通过配置functional属性指定组件为函数式组件
  functional: true,
  /**
   * 渲染函数
   * @param {*} h
   * @param {*} context 函数式组件没有this, props, slots等都在context上面挂着
   */
  render(h, context) {
    const { props } = context
    if (props.beforeFun) {
      props.beforeFun()
    }
    if (props.content) {
      return props.content
    }
    return <div>test</div>
  }
}