const baseurl = 'https://v1.alapi.cn/api/'

export function request(url,method,data={}) {
	return new Promise((resolve, reject)=> {
		uni.request({
			url: baseurl+url,
			method: method,
			data: data,
			header: {
				'token': 'fPJKQ7jdkAFTDbXwd6xd',
				'Content-Type': 'application/x-www-form-urlencoded' 
			},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}