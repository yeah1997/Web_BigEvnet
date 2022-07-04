$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '俩次密码一样'
            }
        }
    })

    $('#changePwd').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('提交失败')
                }

                layer.msg('提交成功!')
                $('#changePwd')[0].reset()
            }
        })
    })
})