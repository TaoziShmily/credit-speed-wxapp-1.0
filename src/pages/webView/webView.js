Page({
	data:{
		jump_url:''
	},
	onLoad(res){
		this.setData({
			jump_url:res.jump_url
		})
	}
})