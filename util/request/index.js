
// 引入配置
import config from '../../config'

const requestInterceptors=(vm)=>{
	/**
	 * 请求拦截
	 * @param {Object} http
	 */
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		if(uni.getStorageSync('userInfo') && new Date().getTime() < 1790784000000){
			config.header.Authorization = 'Bearer '+uni.getStorageSync('userInfo').token
		}
		return config
	}, (config) => // 可使用async await 做异步操作
		Promise.reject(config))
}

//  初始化请求配置
const initRequest=(vm)=>{
	uni.$u.http.setConfig((defaultConfig) => {
		/* defaultConfig 为默认全局配置 */
		defaultConfig.baseURL = config.baseUrl /* 根域名 */
		return defaultConfig
	})
	requestInterceptors()
}
export {
	initRequest
}