module.exports = {
    lintOnSave : false,
    devServer:{
        proxy:{
            // 代理上配在本地的开发服务器
            "/api":{
                target:'http://39.98.123.211',
                // pathRewrite:{}
            }
        },
        open:true
    }
}