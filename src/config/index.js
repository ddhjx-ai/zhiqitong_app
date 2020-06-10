
// const HOST = 'http://10.0.1.129:9100/';  // 本地开发接口地址
// const HOST = 'http://localhost:8188/wisave-api' //测试环境接口地址
const PATH = 'http://139.159.144.119/erp'; //接口路径
// const PICTURE_SUFFIX = 'http://10.0.0.204:8001/';// 图片的前缀
const HOST = process.env.NODE_ENV === 'development' ? PATH : (window.location.origin + '/erp')

const BASEURL = window.location.origin + '/erp'
// const OTHERURL = 'http://10.0.1.129:9100'
const PICTURE_SUFFIX = process.env.NODE_ENV === 'development' ? 'http://10.0.1.187:8001/' : 'http://10.0.0.49:28080/';
export default{
  HOST,
  PATH,
  PICTURE_SUFFIX,
  BASEURL, 
  // OTHERURL
}
