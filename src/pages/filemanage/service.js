import axios from 'axios'
import qs from 'qs'

export const remoteurl = 'http://1.zmz121.cn:8010';


// 返回路径的目录内
export const getFolder = (path) => {
  // console.log(remoteurl+'/file/list?path='+path);
  return axios.get(remoteurl+'/file/list?path='+path)
    .then((res) => {
      if(res.status === 200){
        const data = res.data.data;
        return data;
      }else{
        console.log("参数错误");
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    })
}

export const uploadFile = (arg) => {
  if(arg.url === ""){
    return axios.post(arg.url,{file:arg.file},{
      onUploadProgress: progressEvent => {
        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
      }
    })
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          return "success";
        }else{
          return Promise.reject();
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  }else{
    const data = new FormData();
    data.append("filePath",arg.path);
    data.append("files[]",arg.filelist);
    return axios({
      method: 'post',
      url: arg.url,
      data: data,
      onUploadProgress: progressEvent => {
        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
        window.g_app._store.dispatch({
          type: 'uploadModal/changeState',
          payload: {
            progress: complete
          }
        });
        console.log(complete);
      }
      // headers: {'Content-Type':'multipart/form-data'}
    }).then((res) => {
      if(res.status === 200){
        return "success";
      }else{
        return Promise.reject();
      }
    }).catch((error) => {
      return Promise.reject(error);
    })

  }
}



