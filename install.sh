sudo cp ./myproj-authServer.service /lib/systemd/system/myproj-authServer.service
sudo chmod 754 /lib/systemd/system/myproj-authServer.service
sudo systemctl enable myproj-authServer
sudo systemctl start myproj-authServer