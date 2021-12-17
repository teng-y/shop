/**
 * 1、这个文件是统一用来处理发送请求的，也就是说所有的请求都在这里进行处理
 * 2、只需要暴露相应的接口即可
 * 3、优点：将来更新或是维护的时候，在此处进行统一修改
 * 
 * **/

//1、引入axios，也就是引入ajax.js这个文件，然后发送请求
import ajax from './ajax'
import mockAjax from './mockAjax'
//2、将发送请求的操作封装到函数中，向外暴露
// export function reqCategoryListDate(){
//     return ajax.get('/product/getBaseCategoryList')
// }

//1、三级分类导航
export const reqCategoryListDate = () => ajax.get('/product/getBaseCategoryList')

//2、获取轮播图片
export const reqBannerListData = () => mockAjax.get('/banner')
export const reqFloorListData = () => mockAjax.get('/floor')


//3、获取search组件数据
export const reqSearchGoodsData = (searchParams)=>ajax.post('/list',searchParams)

//4、获取商品详情页数据
export const reqGoodDetailInfoData = (id)=>ajax.get("/item/"+id)

// 5、添加选中的商品到购物车成功页面
export const reqAddOrUpdateCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
//6、获取购物车数据
export const reqShopCartListData = ()=>ajax.get('/cart/cartList')

// 7、更改服务器端购物车中商品的选中与否的状态
export const reqChangeShopCartInfoState =(skuID,isChecked) =>ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)

//8、删除一个购物车中的商品
export const reqDelOneShopCartInfo = (skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)

//9、删除批量选中购物车
export const reqDelShopCartInfo = (cartInfoList)=>ajax.delete('/cart/batchDeleteCart',cartInfoList)

//10、获取验证码
export const reqCode = (phone)=>{
    return ajax({
        url:`/user/passport/sendCode/${phone}`,
        method:'get',
    })
}

//11、注册
export const reqRegister = (user)=>{
    return ajax({
        url:'/user/passport/register',
        method:'post',
        data:user
    })
}

//12、登录，接收token
export const reqLogin = (user)=>{
    return ajax({
        url:'/user/passport/login',
        method:'post',
        data:user
    })
}

//根据获取用户信息
export const reqGetUserInfo = ()=>{
    return ajax({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

//13、退出登录
export const reqLogout = ()=>{
    return ajax({
        url:'/user/passport/logout',
        method:'get'
    })
}



//获取用户收货地址列表
export const reqUserAddressList = ()=>{
    return ajax({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

//
export const reqTradeInfo = ()=>{
    return ajax({
        url:'/order/auth/trade',
        method:'get'
    })
}

//提交订单
export const reqSubmitOrder = (tradeNo,tradeInfo)=>{
    return ajax({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:tradeInfo
    })
}

//获取订单信息
export const reqPayInfo = (orderId)=>{
    return ajax({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

//获取支付状态
export const reqPayStatus = (orderId)=>{
    return ajax({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

//获取订单支付列表
export const reqOrderInfo = (page,limit)=>{
    return ajax({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}

