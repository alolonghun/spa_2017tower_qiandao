import Sign from './../pages/sign.vue'
import Success from './../pages/success.vue'
import Fail from './../pages/fail.vue'

export default [
	{
		path: '/',
		name: 'sign',
		component: Sign
	},
	{
		path: '/success',
		name: 'success',
		component: Success
	},
	{
		path: '/fail/:errorId',
		name: 'fail',
		component: Fail
	},
]
