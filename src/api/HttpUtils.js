import queryString from 'query-string'

let baseUrl = 'http://cangdu.org:8001';

/**
 * 让fetch也可以timeout
 *  timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间
 * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已
 * @param {Promise} fetch_promise    fetch请求返回的Promise
 * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
 * @return 返回Promise
 */
function timeout_fetch(fetch_promise, timeout = 10000) {
  let timeout_fn = null;

  //这是一个可以被reject的promise
  let timeout_promise = new Promise(function (resolve, reject) {
    timeout_fn = function () {
      reject('timeout promise');
    };
  });

  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  let abortable_promise = Promise.race([
    fetch_promise,
    timeout_promise
  ]);

  setTimeout(function () {
    timeout_fn();
  }, timeout);

  return abortable_promise;
}

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @param isFormData 是否表单
 * @return 返回Promise
 */
function baseRequest(method, url, params = '', isFormData = false) {

  let header = !isFormData ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }:{
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  let option = params === '' ? {
    method: method,
    headers: header
  } : {
    method: method,
    headers: header,
    body: isFormData ? params : JSON.stringify(params)
  };

  return new Promise(function (resolve, reject) {
    timeout_fetch(fetch(baseUrl + url,
      option
    )).then((response) => {
      if (response.ok) {//response.ok会将404、500等这些请求错误给过滤掉
        return response.json()
      } else {
        reject(response);
      }
    }).then((responseData) => {
      console.log('res:', url, responseData);   //网络请求成功返回的数据
      if (responseData.status === 0) {
        reject(responseData);
      } else {
        resolve(responseData);
      }
    }).catch((err) => {
      console.log('err:', url, err);   //网络请求失败返回的数据
      reject(err);
    });
  });
}

export default class HttpUtils {

  /**
   * get请求
   * @param url
   * @param params
   * @returns {返回Promise}
   */
  static get(url, params = '') {
    /*GET请求不能添加body参数，需要拼接到url里去*/
    if (params !== '') {
      url = url + '?' + queryString.stringify(params)
    }
    return baseRequest('GET', url)
  }

  /**
   * post请求
   * @param url
   * @param params
   * @param isFormData 是否表单
   * @returns {返回Promise}
   */
  static post(url, params = '', isFormData) {
    return baseRequest('POST', url, params, isFormData)
  }

  /**
   * delete请求
   * @param url
   * @param params
   * @returns {返回Promise}
   */
  static delete(url, params = '') {
    return baseRequest('DELETE', url, params)
  }
}

//POST请求
// let params = {
//     username:'admin',
//     password:'123456'
// }
// HttpUtils.post('/auth',params)
//     .then( res=>{
//         //请求成功
//
//     }).catch( err=>{
//     //请求失败
// })

/*表单*/
// let formData = new FormData();
// formData.append("account",this.state.mobile);
// formData.append("password",this.state.pwd);
// HttpUtils.post('/login',formData, true)
//     .then( res=>{
//         //请求成功
//
//     }).catch( err=>{
//     //请求失败
// })