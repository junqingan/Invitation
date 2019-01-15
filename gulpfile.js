var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');


//清除 dist
gulp.task('clean',function () {
	gulp.src(['./static/dist/'])
		.pipe(clean())
})

//css 压缩
gulp.task("css", function () {
	gulp.src(['./static/src/css/*.css'])
		.pipe(cssmin())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("./static/dist/css/"))
})

//js 压缩
gulp.task("js", function () {
	gulp.src(['./static/src/js/**/*.js'])
		.pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
        }))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("./static/dist/js/"))
})

//图片压缩
gulp.task('images', function () {
    return gulp.src('./static/src/images/*')
		 .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./static/dist/images/'));
});




gulp.task('default', ['css', 'js','images']);

gulp.task('watch', function () {
    gulp.watch('static/**/*.css', ['css']); //当所有css文件发生改变时，调用css任务
});