$(function () {
    // event for reg
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    // event for login
    $('#ling_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // Get Layui-form Object
    let form = layui.form
    let layer = layui.layer

    let url = 'http://www.liulongbin.top:3007'

    // DIY Username Reg, password Red
    form.verify({
        // DIY pwd
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()

            if (pwd !== value) {
                return '俩次密码不一致'
            }
        }
    })

    // Action for Reg
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();

        let data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() }

        $.post('/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg(res.message)
                $('#ling_login').click()

            }
        )
    })

    // Action for Login
    $('#form_login').submit(function(e) {
        e.preventDefault()
        
        // let data = { username: $('.login-box [name=username]').val(), password: $('.login-box [name=password]').val() }

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg(res.message)
                // login success reserve in RocalStorage
                localStorage.setItem('token', res.token)
                // Href to index.html
                location.href = '/index.thml'
                // console.log(res.token)
            }
        })

    })
})