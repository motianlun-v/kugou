angular.module('app')
.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/newSong');

	$stateProvider
		.state({
			name:'newSong',
			url:'/newSong',
			templateUrl: 'newSong.html',
			controller: function($rootScope,$http,dialog,$state){
				//$scope.list = prepare.data;
				var swiper = new Swiper('.wrappic', {
                                pagination: '.cir',
                                paginationClickable: true,
                                spaceBetween: 10,
                                centeredSlides: true,
                                autoplay: 1500,
                                autoplayDisableOnInteraction: false
                            });      
				console.log(dialog)
				$http.get('music_list.json')
                        .success(function(list){
                            $rootScope.list =list.data;
                           
                        })  
                        $rootScope.tip =function(){
                        	
                            dialog.alert({
                                title:'提示信息',
                                info:'下载需要手机酷狗客户端支持',
                                callback:function(){
                                    console.log('确定--callback')  
                                }
                            })
                         }
                         $rootScope.search=function(){
                         	alert('点击弹出搜索页面')
                         	//$state.go('search')
                         }
			}  
		})
		.state({
			name:'search',
			url:'/search',
			templateUrl:'search.html'
		})
		.state({
			name:'ranking',
			url:'/ranking',
			templateUrl: 'ranking.html',
			controller: function($scope,$http){
				 $http.get('data/music_wrap.json')
                        .success(function(list){
                        	$scope.list = list.plist.list.info;
                        	console.log(list.plist.list.info)

                            
                        }) 
                         
			}
			
		})
		.state({
			name:'songList',
			url:'/songList',
			templateUrl: 'songList.html',
			controller: function($scope,$http){
				  $http.get('data/music_wrap2.json')
                        .success(function(list){
                        	//$scope.list = list.plist.list.info;
                        	$scope.arr =list.list.list.info;
                        	
                        	console.log(list.list.list.info)
                            
                            
                        }) 
			}
			
		})
		.state({
			name:'singer',
			url:'/singer',
			templateUrl: 'singer.html',
			controller: function($scope,$http){
				 $http.get('music_list.json')
                    .success(function(list){
                        $scope.list = list.data;
                    })
				 
			}
			
		})
})
.provider('dialog',function(){
		
		this.template = `<div class="dialog-box">
								<a class='close'>关闭x</a>
								<h2>{{title}}</h2>
								<div>
									{{info}}
								</div>
								<p><span class="sure">取消</span><span>在客户端下载</span></p>
							</div>`;
		this.render = function(){
			var body = document.body;
			var el = document.createElement('div');
			el.className = 'dialog show';
			el.innerHTML = this.template
			this .el = el;
			body.appendChild(el);
		}
		//点击确定
		this.sure = function(){
			this.el.onclick = function(e){
				var e = e || event;
				var target = e.target || e.srcElement;
				if (target.className == 'sure') {
					this.callback();
					this.el.remove()
					console.dir(this)
				};
				if (target.className == 'close') {
					this.el.remove();
					console.info('弹出框关闭')
				};
			}.bind(this);
			/*var btnSure = document.querySelector('.dialog-box p span');
			btnSure.onclick=function(){
				var dialog = document.querySelector('.dialog');
				document.body.removeChild(dialog)
				alert('removeChild  dialog')
			}*/
		}
		//点击关闭
		this.close = function(){
			var closeBtn = document.querySelector('.dialog-box a');

			closeBtn.onclick = function(){
				
				var dialog = document.querySelector('.dialog');
				document.body.removeChild(dialog)
			}
		}
		
		this.alert =function(options){
			
			this.template = this.template.replace('{{title}}',options.title)
			.replace('{{info}}',options.info);
			this.render();
			this.callback = options.callback;
			this.sure();
			this.close();
		}

		this.$get=function(){
			return {
				render:this.render,
				template:this.template,
				alert:this.alert,
				sure:this.sure,
				remove:this.remove,
				close:this.close,
				el:this.el,
				callback:this.callback
			}
		}
	})
