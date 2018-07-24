var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')


var port = process.env.PORT || 3000
var Movie = require("./models/movie.js")
var _ = require('underscore')
var app = express()


mongoose.connect('mongodb://localhost/imooc')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'node_modules')))
app.locals.moment = require('moment')
app.listen(port)

console.log('imooc is start on port' + port)

app.get('/', function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('index', {
			title: 'imooc mainpage',
			movies: movies
		})
	})
})

app.get('/movie/:id', function(req, res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: 'imooc' + movie.title,
			movie: movie
		})
	})
	
})

app.get('/admin/movie', function(req, res){
	res.render('admin', {
		title: 'imooc backend',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})

// app.get('/admin/update/:id', function(req, res){
// 	var id = req.params.id
// 	if(id){
// 		Movie.findById(id, function(req, res){
// 			res.render('admin', {
// 				title: 'imooc 后台更新页',
// 				movie: movie
// 			})
// 		})
// 	}
// })
app.get('/admin/update/:id',function(req,res){
   var id = req.params.id
   if(id){
      Movie.findById(id,function(err,movie){
        res.render('admin',{
            title:'imooc 后台更新页',
            movie:movie
        })
      })
   }

})

// app.post('/admin/movie/new', function(req, res){
// 	var id = res.body.movie._id
// 	var movieObj = req.body.movie
// 	var _movie

// 	if(id !== 'undefined'){
// 		Movie.findById(id, function(err, movie){
// 			if(err){
// 				console.log(err)
// 			}

// 			_movie = _.extend(movie, movieObj)
// 			_movie.save(function(err, movie){
// 				if(err){
// 					console.log(err)
// 				}
// 				res.redirect('/movie/' + movie._id)
// 			})
// 		})
// 	}else{
// 		_movie = new Movie({
// 			doctor: movieObj.doctor,
// 			title: movieObj.title,
// 			language: movieObj.language,
// 			country: movieObj.country,
// 			summary: movieObj.summary,
// 			flash: movieObj.flash,
// 			poster: movieObj.poster,
// 			year: movieObj.year
// 		})
// 		_movie.save(function(err, movie){
// 			if(err){
// 					console.log(err)
// 			}
// 			res.redirect('/movie/' + movie._id)
// 		})
// 	}

// })
app.post('/admin/movie/new',function(req,res){
    var id = req.body.movie._id
    var movieObj = req.body.movie
    console.log("ha")
    var _movie =null
    if(id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
            _movie=_.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/'+movie._id)
            })
            
        })
    }

    else{
        _movie = new Movie({
              doctor:movieObj.doctor,
              title:movieObj.title,
              country:movieObj.country, 
              language:movieObj.language,
              year:movieObj.year,
              poster:movieObj.poster, 
              summary:movieObj.summary,
              flash:movieObj.flash      
        })
        _movie.save(function(err,movie){
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/'+movie._id)
            })
    }
})

app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('list', {
			title: 'imooc list',
			movies: movies
		})
	})
})

// {
// 			title:'头号玩家',
// 			_id: 1,
// 			poster: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjlu-PgsancAhU_FzQIHe3dDgoQjRx6BAgBEAU&url=http%3A%2F%2Fwww.27270.com%2Fword%2Fdongwushijie%2Flist_8_2.html&psig=AOvVaw0hHxVov7EzPtXYe8nIZtTi&ust=1532028676360641'
// 		},{
// 			title:'狂暴巨兽',
// 			_id: 2,
// 			poster: 'http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/hori/8/84cu4uxrkzi0e60_big.jpg'
// 		},{
// 			title:'湮灭',
// 			_id: 3,
// 			poster: 'http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/hori/n/nvy9lp6e061ecu2_big.jpg'
// 		},{
// 			title:'全球风暴',
// 			_id: 4,
// 			poster: 'http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/hori/e/e3927iak2dvwelf_big.jpg'
// 		},{
// 			title:'骷髅岛',
// 			_id: 5,
// 			poster: 'http://puui.qpic.cn/vcover_vt_pic/0/71bctb897dwx46m1497603419/220'
// 		},{
// 			title:'环太平洋',
// 			_id: 6,
// 			poster: 'http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/hori/f/f7pqur8uhmzltps_big.jpg'
// 		}


// {
// 			doctor: '史蒂文·斯皮尔伯格',
// 			country: '美国',
// 			title: '头号玩家',
// 			year: 2018,
// 			poster: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjlu-PgsancAhU_FzQIHe3dDgoQjRx6BAgBEAU&url=http%3A%2F%2Fwww.27270.com%2Fword%2Fdongwushijie%2Flist_8_2.html&psig=AOvVaw0hHxVov7EzPtXYe8nIZtTi&ust=1532028676360641',
// 			language: 'English',
// 			flash: 'https://youtu.be/Lz5I57Zg1Qw',
// 			summary: '2045年，处于混乱和崩溃边缘的现实世界令人失望，人们将救赎的希望寄托于“绿洲”，\
// 			一个由鬼才詹姆斯·哈利迪（马克·里朗斯饰）一手打造的虚拟游戏宇宙。人们只要戴上VR设备，\
// 			就可以进入这个与现实形成强烈反差的虚拟世界。在这个世界中，有繁华的都市，形象各异、光彩照人的玩家，\
// 			而不同次元的影视游戏中的经典角色也可以在这里齐聚。就算你在现实中是一个挣扎在社会边缘的失败者，\
// 			在“绿洲”里也依然可以成为超级英雄，再遥远的梦想都变得触手可及。哈利迪弥留之际，\
// 			宣布将巨额财产和“绿洲”的所有权留给第一个闯过三道谜题，找出他在游戏中藏匿彩蛋的人，\
// 			自此引发了一场全世界范围内的竞争'
// 		}
// list delete movie data 列表页删除电影
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
});