$(function () {

    let layer = layui.layer
    let form = layui.form

    let indexAdd = null
    let indexEdit = null

    initArtCateList()

    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })


    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(123)
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })

    $('tbody').on('click', '.btn-edit', function () {

        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        let id = $(this).attr('button-id')

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {

                if (res.data !== 0) return layer.msg(res.message)

                console(res)
                layer.msg(res.message)
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('button-id')

        layer.confirm('确认删除 ?', function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) layer.msg(res.message)

                    layer.msg(res.message)
                    layer.close(index)
                    console.log(index)
                    initArtCateList()
                }
            })
            
        });

    })

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)

                let htmlStr = template('tpl-table', res)

                $('tbody').html(htmlStr)
            }
        })
    }

})