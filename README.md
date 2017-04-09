# dingyou-auth-server
这是 dingtalk jsapi 的鉴权服务demo

# 如何使用?
```
sudo mkdir -pv /appServer/myproj && cd /appServer/myproj
sudo git clone https://github.com/caohaijiang/dingyou-auth-server.git ./authServer && cd authServer
sudo cnpm install 
sudo chmod +x ./install.sh && ./install.sh
sudo reboot
```
# 诊断
```
systemctl status myproj-authServer => 检查服务状态
systemctl stop myproj-authServer => 检查服务状态
forever list 

## 设置环境(centos 7)
```
vi /etc/environment
```
选取下面的其一,新增到文件中

> NODE_ENV="develop"

> NODE_ENV="test"

## 安装依赖

```
su root
mkdir -pv /appServer/ && cd /appServer/
git clone /home/git/gitea-repositories/dingyou/ddapiserver.git

su git
cd ddapiserver
npm install 

chown  -R git:git /appServer/ddapiserver && chmod  -R g+rws /appServer/ddapiserver  

```

## 增加守护(如果没有安装)

``` 
sudo npm install forever -g
ln -s /opt/node-v6.9.2-linux-x64/bin/cnpm /usr/local/bin/cnpm
```

## 开机启动
> 1. 创建文件:  vi /lib/systemd/system/node-ddapiserver.service

```
[Unit]
Description=node-ddapiserver
After=network.target
After=syslog.target

[Service]
EnvironmentFile=/appServer/ddapiserver/config/env
Type=forking
ExecStart=/usr/local/bin/forever -a start -l /appServer/ddapiserver/forever.log /appServer/ddapiserver/start.js
ExecReload=/usr/local/bin/forever restart /appServer/ddapiserver/start.js
ExecStop=/usr/local/bin/forever stop /appServer/ddapiserver/start.js
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

> 2. 设置权限: 
```
chmod 754 /lib/systemd/system/node-ddapiserver.service
systemctl enable node-ddApiServer
systemctl start node-ddApiServer
```

> 3. 管理使用
```
systemctl enable node-ddapiserver => 启用开机启动

systemctl disable node-ddapiserver => 禁止开机启动

systemctl status node-ddapiserver => 检查服务状态

systemctl start node-ddapiserver => 开始服务

systemctl stop node-ddapiserver => 停止服务

systemctl restart node-ddapiserver => 重启服务
```

## Git同步
    1. 创建钩子文件
```
su git
sudo vi /home/git/gitea-repositories/dingyou/ddapiserver.git/hook/post-receive
```
> APP_DIR='/appServer/ddapiserver'
> export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
>
> cd $APP_DIR
> env -i git reset --hard
> env -i git pull
>
> systemctl restart node-ddapiserver

    2. 授予权限
```
sudo chmod +x post-receive
```
    3. 测试同步
```
# 修改 package.json版本号,提交后,用如下命令观察是否同步成功?测试是否可以正常提供服务?

cat /appServer/ddapiserver/package.json
node start.js
```

# Restful Api 接口说明

### /api/token

    1. request(请求方式)
    2. 

    2. response(返回方式) 


### /api/sign

    1. request(请求方式)
```
fetch( 
    "URL",                
    {
        method:"post", 
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json', 
        },        
        body:JSON.stringify("字符串")
    }
);
 ```

    2. response(返回方式) 


# 附录

1. 服务器部署: http://gitea.gbtong.com/dingYou/dj.project/wiki/%E9%83%A8%E7%BD%B2-%E6%9C%8D%E5%8A%A1%3A-Node.js
2. koa参考文档: http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000
3. log4 参考文档: http://www.jianshu.com/p/6b816c609669
                 https://github.com/tough1985/hello-koa2
                 http://blog.fens.me/nodejs-log4js/
4. dingtalk服务端开发文档:https://open-doc.dingtalk.com/doc2/detail?spm=0.0.0.0.vxzHen&treeId=172&articleId=104981&docType=1

