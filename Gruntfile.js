'use strict';
module.export =function(grunt){
    require('time-grunt;')(grunt);
    require('jit-grunt;')(grunt);
    grunt.initConfig({
        sass:{
            dist:{
                files:{
                    'css.styles.css':'css/styles.scss'
                }
            }
        },
        watch:{
            files:'css/*.scss',
            tasks:['sass']
        },
        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options:{
                    watchTask:true,
                    server:{
                        baseDir:'./'
                    }
                }
            }
        },
        copy:{
            html:{
                files:[{
                    expand:true,
                    dot:true,
                    cwd:'./',
                    src:['*.ht'],
                    dest:'dist'
                }]
            },
            fonts:{
                files:[{
                    expand:true,
                    dot:true,
                    cwd:'node_modules/font-awesome',
                    src:['font/*.*'],
                    dest:'dist'
                }]
            }
        },
        clean:{
            build:{
                src:['dist/']
            }
        },
        imagemin:{
            dynamic:{
                files:[{
                    expand:true,
                    dot:true,
                    cwd:'./',
                    src:['img/*.{png, jpg, gif}'],
                    dest:'dist/'
                }]
            }
        },
        useminPrepare:{
            foo:{
                dest:'dist',
                src:['contactus.html', 'aboutus.html', 'index.html']
            },
            options:{
                flow:{
                    steps:{
                        css:['cssmin'],
                        js:['uglify']
                    },
                    post:{
                        css:[{
                            name:'cssmin',
                            createConfig:function(context, block){
                                var generated=context.options.generated;
                                generated.options={
                                    keepSpecialComments:0, rebase:false
                                };
                            }
                        }]
                    }
                }
            }
        }
    });
    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync','watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin'
    ]);





};

