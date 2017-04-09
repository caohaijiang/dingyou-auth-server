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
//检查服务状态
systemctl status myproj-authServer 

// 查看进行守护
forever list 
