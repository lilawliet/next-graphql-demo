# 使用 npx prisma db seed 命令需要创建 mongodb 复制集

### 这里是 windows 系统下 创建 mongodb 复制集，其他系统参考[这里](https://developer.aliyun.com/article/851136)

- 1. 修改 config/ 下面的三个文件夹（db1/db2/db3）中的绝对路径

```
# next-graphql-demo/config/db1/mongod.conf
systemLog:
    ...
    path:  D:\vm-share\next-graphql-demo\datas\db1\mongod.log # 删除
    path:  [你的项目绝对路径]\datas\db1\mongod.log # 新增
    ...
storage:
    dbPath: D:\vm-share\next-graphql-demo\datas\db1 # 删除
    dbPath: [你的项目绝对路径]\datas\db1 # 新增
...
```

- 2. 在 datas 目录下面创建对应第一步的存储数据和日志的文件夹

```
mkdir -p .\datas\db1
mkdir -p .\datas\db2
mkdir -p .\datas\db3
```

- 3. 分别用三个命令窗口启动三个服务（不要关闭窗口）

```

# 注意将这里的绝对路径 D:\vm-share\next-graphql-demo 改为本机的项目绝对路径

mongod -f D:\vm-share\next-graphql-demo\config\db1\mongod.conf
mongod -f D:\vm-share\next-graphql-demo\config\db2\mongod.conf
mongod -f D:\vm-share\next-graphql-demo\config\db3\mongod.conf

```

- 4. 进入 mongodb 控制台

```

mongosh "mongodb://127.0.0.1:27017"

```

- 5. 创建集群

```

rs.initiate({ \_id: "rs0", members: [{ _id: 0, host: "localhost:27017" },{ _id: 1, host: "localhost:27018" },{
_id: 2, host: "localhost:27019"}]})

```

- 6. 初始化数据

```

npx prisma db seed

```
