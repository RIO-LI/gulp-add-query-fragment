# gulp-add-query-fragment
Add the query parameter and the fragment anchor to the specified element link

First you should intall `gulp-add-query-fragment` by npm, open your terminal and input the bash
```
    npm install gulp-add-query-fragment
```

Use examples：
```
const gulp = require('gulp')
const addQueryFragment = require('gulp-add-query-fragment')

gulp.task('addQueryFragment', function () {
    //Select the file or directory you want to operate
    gulp.src(['./index.html'])
        .pipe(addQueryFragment([
            {
                //css selector
                selector: 'link,a,script,img,iframe', 

                //Add the query parameter to the href or src address of the  element selected by the css selector
                //such as './library/bootstrap/bootstrap.min.js' will be modified to
                //'./library/bootstrap/bootstrap.min.js?t=20170809&lang=chinese'
                query: { t: 20170809,lang: 'chinese' }, 
                
                //Link anchor，such as：‘https://www.example.com/index.html’,will be modified to
                // ‘https://www.example.com/index.html#left’
                fragment: 'left'
            }, {
                selector: 'script#index',
                query: { t: 'kk', lang: 'en' },
                fragment: 'center',
                // Whether to overwrite the previous query parameters
                overwrite: true
            }
        ]))
        .pipe(gulp.dest('./dist'))
})
```

open your terminal and input the bash,you will see the effect
```
    gulp addQueryFragment
```
