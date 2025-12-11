import {createStore} from 'vuex'

const store = createStore({
	state:{
		//登录用户数据
		userInfo:{},
		//token令牌
		token:'',
		//是否登录
		hasLogin:false
	},
	mutations:{
		/**
		* 登录的方法
		* @params {boolean} state 登录的状态，默认false未登录
		* @param {object}  provider 用户的信息
		* */
		login(state,provider){
			 console.log('登录成功，写入登录数据')
			 state.hasLogin = true //设置登录的状态
			 state.userInfo = provider.user //用户的信息
			 state.token = provider.token //用户的信息
			 //设置到缓存中
			 uni.setStorage({
			 	key:"userInfo",
				data:provider
			 })
		},
		/**
		 * 退出登录
		 * @param {boolean} state 登录状态
		 * */
		logout(state) {
			 state.hasLogin = false //设置登录的状态
			 state.userInfo = {} // 清空用户对象
			 state.token = '' // 清空用户对象
			// 清空缓存的用户信息
			uni.removeStorage({
				key:"userInfo"
			})
		}
	}
})

export default store;
