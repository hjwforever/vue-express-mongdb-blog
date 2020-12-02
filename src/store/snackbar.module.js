/**
 * 参数列表如下:
 * msg 信息
 * color snackbar颜色
 * visible 是否可见
 * showClose 关闭按钮
 * timeout 停留持续时间
 */
export const snackbar = {
    //
    namespaced: true,
    state: {
        msg: '',
        color: '',
        visible: false,
        showClose: true,
        timeout: 2000,

    },
    // 逻辑处理,同步函数
    mutations: {
        OPEN_SNACKBAR(state, options) {
            state.visible = true;
            state.msg = options.msg;
            state.color = options.color;
            state.timeout = options.timeout;
        },
        CLOSE_SNACKBAR(state) {
            state.visible = false

        },
        setShowClose(state, isShow) {
            state.showClose = isShow
        },
        setTimeout(state, timeout) {
            state.timeout = timeout
        },
    },
    // 逻辑处理,异步函数
    actions :{
        openSnackbar (context,options){
            let timeout = context.state.timeout
            context.commit('OPEN_SNACKBAR',{
                msg:options.msg,
                color:options.color,
                timeout:options.timeout
            })
            setTimeout(()=>{
                context.commit('CLOSE_SNACKBAR')
            },timeout)
        }
    }
}
