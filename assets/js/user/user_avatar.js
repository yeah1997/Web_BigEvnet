$(function () {
    // 1.1 获取裁剪区域的 DOM 元素 
    var $image = $('#image')
    // 1.2 配置选项 
    const options = {
        // 纵横比 
        aspectRatio: 1,
        // 指定预览区域 
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域 
    $image.cropper(options)


    let layer = layui.layer

    $('#btnChooseImg').on('click', function () {
        $('#file').click()
        console.log(1)
    })

    $('#file').on('change', function (e) {
        let fileList = e.target.files


        if (fileList.length === 0) {
            return layer.msg('请选择照片')
        }

        let file = e.target.files[0]

        let newImgURL = URL.createObjectURL(file)

        $image.cropper('destroy').attr('src', newImgURL).cropper(options)

    })


    $('#upload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败!')
                }
                layer.msg('更换头像成功!')
                window.parent.getUserInfo()
            }
        })
    })
})