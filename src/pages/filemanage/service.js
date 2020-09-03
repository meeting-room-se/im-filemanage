import axios from 'axios'

export const remoteurl = 'http://1.zmz121.cn:8010';
// export const remoteurl = 'http://172.29.12.13:8010';
// export const remoteurl = 'http://192.168.2.206:8010';


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

export const mkDir = (arg) => {
  const data = new FormData();
  data.append("dir",arg);
  return axios({
    method: 'put',
    url: remoteurl+'/file/mkdir',
    data: data,

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


// 上传文件
export const uploadFile = (arg) => {
  if(arg.url === remoteurl+"/file/upload/headpic"){
    const data = new FormData();
    data.append("file",arg.file);
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
  }else{
    const data = new FormData();
    data.append("filePath",arg.path);
    console.log(arg.filelist);
    arg.filelist.forEach(file => {
      console.log(file);
      data.append('files[]', file);
    });
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
      },
      headers: {'Content-Type':'multipart/form-data'}
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

export const deleteRemoteFile = (arg) => {
  const data = new FormData();
  data.append("fileName", arg.fileName);
  data.append("filename", arg.filename)
  return axios({
    method: 'delete',
    url: remoteurl+"/file/delete",
    data: data
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




