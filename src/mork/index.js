import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
Mock.setup({
	timeout:1000  //设置请求延时时间
})
let msgBody = {
	'msgBody' : {
		'status' : '1',
		'msg' : '查询成功',
		'data' : null,
		"total":"8",
		"pageCount":2,
		"httpStatus":200,
		"pageSize":4,
		"pageNum":1,
		"status":1
	}
}
// 文章列表
Mock.mock('/api/articleList', /post|get/i,function(option){
	let data = [
		{"summary":"文章简介","editor":"0","createTime":"2018-07-23 15:03:02","author":"用户名","imageUrl":"https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3363866755,3796274311&fm=85&s=4F82B408052097110EA8EC970100E0E2","articleId":"20180723150302721","commentaryNumber":"0","browseNumber":"0","updateTime":"2018-07-23 15:03:02","title":"文章标题","starNumber":"0","collectNumber":"0"},
		{"summary":"文章简介","editor":"0","createTime":"2018-07-23 15:02:56","author":"用户名","imageUrl":"https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3363866755,3796274311&fm=85&s=4F82B408052097110EA8EC970100E0E2","articleId":"20180723150256783","commentaryNumber":"0","browseNumber":"0","updateTime":"2018-07-23 15:02:56","title":"文章标题","starNumber":"0","collectNumber":"0"},
		{"summary":"文章简介","editor":"0","createTime":"2018-07-23 15:02:33","author":"用户名","imageUrl":"https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3363866755,3796274311&fm=85&s=4F82B408052097110EA8EC970100E0E2","articleId":"20180723150233393","commentaryNumber":"0","browseNumber":"0","updateTime":"2018-07-23 15:02:33","title":"文章标题","starNumber":"0","collectNumber":"0"},
		{"summary":"文章简介","editor":"0","createTime":"2018-07-21 16:10:08","author":"用户名","imageUrl":"https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3363866755,3796274311&fm=85&s=4F82B408052097110EA8EC970100E0E2","articleId":"20180721161008838","commentaryNumber":"0","browseNumber":"0","updateTime":"2018-07-21 16:10:08","title":"文章标题","starNumber":"0","collectNumber":"0"}
	];
	msgBody.msgBody.data = data
	return msgBody;
})
Mock.mock('/api/getListContent', /post|get/i,function(option){
	let data = [
		{"summary":"文章简介","editor":"0","createTime":"2018-07-23 15:03:02","author":"用户名","imageUrl":"https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3363866755,3796274311&fm=85&s=4F82B408052097110EA8EC970100E0E2","articleId":"20180723150302721","commentaryNumber":"0","browseNumber":"0","updateTime":"2018-07-23 15:03:02","title":"文章标题","starNumber":"0","collectNumber":"0"},
		{"summary":"文章简介","editor":"0","createTime":"2018-07-23 15:02:56","author":"用户名","imageUrl":"https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3363866755,3796274311&fm=85&s=4F82B408052097110EA8EC970100E0E2","articleId":"20180723150256783","commentaryNumber":"0","browseNumber":"0","updateTime":"2018-07-23 15:02:56","title":"文章标题","starNumber":"0","collectNumber":"0"},
		{"summary":"文章简介","editor":"0","createTime":"2018-07-23 15:02:33","author":"用户名","imageUrl":"https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3363866755,3796274311&fm=85&s=4F82B408052097110EA8EC970100E0E2","articleId":"20180723150233393","commentaryNumber":"0","browseNumber":"0","updateTime":"2018-07-23 15:02:33","title":"文章标题","starNumber":"0","collectNumber":"0"},
		{"summary":"文章简介","editor":"0","createTime":"2018-07-21 16:10:08","author":"用户名","imageUrl":"https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3363866755,3796274311&fm=85&s=4F82B408052097110EA8EC970100E0E2","articleId":"20180721161008838","commentaryNumber":"0","browseNumber":"0","updateTime":"2018-07-21 16:10:08","title":"文章标题","starNumber":"0","collectNumber":"0"}
	];
	msgBody.msgBody.data = data
	return msgBody;
})


