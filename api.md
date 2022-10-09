# 接口文档



## 检测用户名

```
接口地址： /checkusername
请求方式： get|post
携带数据： username   用户名
携带位置： query|header|body
返回数据：
	{
		error: 0 允许注册 1 用户已存在 2 ... 3 ...
		data: 提示信息：  成功  失败  
	}
```

## 注册

```
接口地址： /regist
请求方式： post
携带数据： username password  
携带位置： body
返回数据：
	{
		error: 0 允许注册 1 用户已存在 2 ... 3 ...
		data: 提示信息：  成功  失败  
	}
```


## 登录

```
接口地址： /login
请求方式： post
携带数据： username password  
携带位置： body
返回数据：
	{
		error: 0 允许注册 1 用户已存在 2 ... 3 ...
		data: 提示信息
	}
```


## 创建相册

```
接口地址： /create_album
请求方式： get
携带数据： name  相册名称 authrization  token  ps: token一般携带在请求头里 专门的字段 authrization
携带位置： query 
返回数据：
	{
		error: 0 创建相册成功 1 相册已经存在 2 ... 3 ...
		data: 提示信息
	}
```


## 请求用户名下的所有相册

```
接口地址： /get_albums
请求方式： get
携带数据： authrization  token  ps: token一般携带在请求头里 专门的字段 authrization
携带位置： query 
返回数据：
	{
		error: 0 创建相册成功 1 相册已经存在 2 ... 3 ...
		data: 提示信息
	}
```



## 上传一张图片到指定的相册

```
接口地址： /upload_img
请求方式： post
携带数据： 
	authrization  token 
	albumname     相册名称
	file		  图片们
携带位置： body 
返回数据：
	{
		error: 0 上传成功 1 文件已存在 2 ... 3 ...
		data: 提示信息
	}
```




## 删除相册

```
接口地址： /del_album
请求方式： get
携带数据： 
	authrization  token 
	name     相册名称
	id       相册id
携带位置： query 
返回数据：
	{
		error: 0 删除成功 1 删除失败 2 ... 3 ...
		data: 提示信息
	}
```




## 获取某个相册下的所有图片

```
接口地址： /get_albums_images
请求方式： get
携带数据： 
	authrization  token 
	id     相册id
携带位置： query 
返回数据：
	{
		error: 0 成功 1 失败 
		data: 提示信息
	}
```



## 更改图片名称

```
接口地址： /update_img_name
请求方式： get
携带数据： 
	authrization  token 
	name     相册名称
携带位置： query 
返回数据：
	{
		error: 0 成功 1 失败 
		data: 提示信息
	}
```


## 更改相册名称

```
接口地址： /update_album_info
请求方式： get
携带数据： 
	authrization  token 
	old   原来的值
	type  要做什么修改 
		"descript" 修改相册简介 
		"albumname" 修改相册名称
	new   新值
	id    相册id

携带位置： query 
返回数据：
	{
		error: 0 成功 1 失败 
		data: 提示信息
	}
```


## 获取用户信息
```
接口地址：/getUserInfo
请求方式： get
携带数据： 
	authrization  token 
携带位置： query 
返回数据：
	{
		error: 0 成功 1 失败 
		data: 用户信息对象
	}
```

## 修改用户信息
```
接口地址: /update_user_info
请求方式：post
携带数据：
	authrization   token
	username		用户名
	password		密码
	nickname		昵称
	phoneNumber		手机号
	email			邮箱
	sex				性别
	province		省份
	city			城市
	district		县区
	personalSign	个性签名
携带位置：body
返回信息：
	{
		error：0/1
		data: 成功/失败
	}
```

## 获取用户全部信息
```
接口地址：/get_all_user_info
请求方式： get
携带数据： 
	authrization  token 
携带位置： query 
返回数据：
	{
		error: 0 成功 1 失败 
		data: 用户信息对象
	}
```

## 获取所有用户
```
接口地址：/get_all_user
请求方式： get
携带数据：无
携带位置：无
返回数据：
	{
		error: 0 成功 1 失败 
		data: 用户信息对象数组
	}
```

## 获取某个用户的所有相册
```
接口地址：/get_someone_all_albums
请求方式： get
携带数据：
	authrization  token 
	target     目标用户名
携带位置：query
返回数据：
	{
		error: 0 成功 1 失败 
		data: 用户相册数组
	}
```


## 获取某个用户的某个相册的所有图片

```
接口地址：/get_someone_album_all_imgs
请求方式： get
携带数据：
	authrization  token 
	id     相册id
携带位置：query
返回数据：
	{
		error: 0 成功 1 失败 
		data: 该相册的全部信息
	}
```