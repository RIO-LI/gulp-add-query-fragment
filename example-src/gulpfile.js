const gulp = require('gulp')
const addQueryFragment = require('../index.js')

gulp.task('addQueryFragment', function () {
    gulp.src(['./index.html'])
        .pipe(addQueryFragment([
            {
                selector: 'link,a,script,img,iframe',
                query: { t: Date.now(), key: 'chinese' },
                fragment: 'left'
            }, {
                selector: 'script#index',
                query: { t: 'kk', key: 'chinese' },
                fragment: 'center',
                overwrite: true
            }
        ]))
        .pipe(gulp.dest('../dist'))
})

