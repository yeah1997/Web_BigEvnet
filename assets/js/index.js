$(function () {

    // Get User Infomation
    getUserInfo()

    $('#btnLogout').on('click', function () {
        layui.layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            //do something
            if(index === 1) {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }else {
                
            }

            layer.close(index);
        });
    })

})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // header Token
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {

            if (res.status !== 0) return layui.layer.msg('获取用户信息失败!')

            console.log(res.data)
            // render Avatar
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // User Profile Picture
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName).show()
    }

}