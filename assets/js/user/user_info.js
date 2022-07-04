$(function() {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return layer.msg('长度必须在6以上!')
            }
        }
    })

    initUserInfo()

    $('#btnReset').on('click', function(e){
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function() {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url:'/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layer.msg('更新用户信息失败!')
                layer.msg('更新成功!')
                // window.parent.getUserInfo()
            }
        })
    })

    // -----------------------
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url:'/my/userinfo',
            success: function(res) {
                if(res.status !== 0) return layer.msg('后去用户信息失败!')
                form.val('formUserInfo', res.data)
            }
        })
    }

})

