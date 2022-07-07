$(function () {

    let header = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage


    initTable()
    initCate()

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    template.defaults.imports.dateFormat = function (date) {
        const dt = new Date(date)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDay())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + '-' + ' ' + hh + ':' + mm + ':' + ss
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault();

        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()

        header.cate_id = cate_id
        header.state = state

        initTable()
    })

    $('tbody').on('clikc', '.btn-delete', function() {
        
        let id = $(this).attr('data-id')

        let btnLen = $('btn-delete').length

        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) return layer.msg(res.message)

                    layer.msg(res.message)

                    if(btnLen === 1){
                        header.pagenum = header.pagenum === 1? 1 : header.pagenum - 1
                    }
                    
                    initTable()
                }
            })
            
            layer.close(index);
        });

    })



    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: header,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                console.log(res)
                let htmlStr = template('tpl-table', res.data)
                $('tbody').html(htmlStr)

                renderPage(res.total)
            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)

                let htmlStr = template('tpl-cate', res)

                // console.log(htmlStr)

                $('[name=cate_id]').html(htmlStr)

                form.render()
            }
        })
    }

    function renderPage(total) {
        // 执行一个laypage实例
        laypage.render({
            elem: 'pageBox',  //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: header.pagesize, // 每页现实的数据
            limits: [2, 3, 5, 10],
            curr: header.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                header.pagenum = obj.curr
                header.pagesize = obj.limits

                if(!first){
                    initTable()
                }
            }
        });
    }
}) 