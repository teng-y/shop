/**
 * 1、这个文件是统一用来处理发送请求的，也就是说所有的请求都在这里进行处理
 * 2、只需要暴露相应的接口即可
 * 3、优点：将来更新或是维护的时候，在此处进行统一修改
 * 
 * **/

//1、引入axios，也就是引入ajax.js这个文件，然后发送请求
import ajax from './ajax'
//2、将发送请求的操作封装到函数中，向外暴露
// export function reqCategoryListDate(){
//     return ajax.get('/api/product/getBaseCategoryList')
// }

//三级分类导航
export const reqCategoryListDate = ()=> ajax.get('/api/product/getBaseCategoryList') 