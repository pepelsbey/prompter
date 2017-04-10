const gulp = require('gulp');
const sync = require('browser-sync').create();

// Server

gulp.task('server', () => {
	sync.init({
		ui: false,
		notify: false,
		ghostMode: false,
		server: {
			baseDir: '.'
		}
	});
});

// Watch

gulp.task('watch', () => {
	gulp.watch('index.html').on('change', sync.reload);
	gulp.watch('style.css').on('change', sync.reload);
	gulp.watch('script.js').on('change', sync.reload);
});

// Watch

gulp.task('default', [
	'server',
	'watch'
]);
