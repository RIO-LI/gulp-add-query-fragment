# gulp-add-query-fragment
给指定元素链接添加query参数和fragment锚点

使用例子：
```
const gulp = require('gulp')
const addQueryFragment = require('../index.js')

gulp.task('addQueryFragment', function () {
    //选择你要操作的文件或目录
    gulp.src(['./index.html'])
        .pipe(addQueryFragment([
            {
                //css选择器
                selector: 'link,a,script,img,iframe', 

                //要为css选择器选中的元素的href或src地址添加查询参数
                //例如：'./library/bootstrap/bootstrap.min.js' 将被修改成
                //'./library/bootstrap/bootstrap.min.js?t=20170809&lang=chinese'
                query: { t: 20170809,lang: 'chinese' }, 
                
                //链接锚点，例如：‘https://www.example.com/index.html’,将被修改为
                // ‘https://www.example.com/index.html#left’
                fragment: 'left'
            }, {
                selector: 'script#index',
                query: { t: 'kk', lang: 'en' },
                fragment: 'center',
                // 是否覆盖之前的查询参数
                overwrite: true
            }
        ]))
        .pipe(gulp.dest('../dist'))
})
```