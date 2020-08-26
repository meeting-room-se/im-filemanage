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
    .catch(() => {
      console.log("请求失败");
    })
}

export const uploadFile = (arg) => {
  if(arg.url === ""){
    return axios.post(arg.url,{file:arg.file})
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          return "success";
        }else{
          return "error";
        }
      })
      .catch(() => {
        console.log("请求失败");
      })
  }else{
    const data = qs.stringify({
      "filePath": arg.path,
      "files[]":  arg.filelist
    })
    return axios({
      method: 'post',
      url: arg.url,
      data: data,
      headers: {'Content-Type':'multipart/form-data'}
    }).then((res) => {
      if(res.status === 200){
        return "success";
      }else{
        return "error";
      }
    }).catch(() => {
      console.log("请求失败");
    })

  }
}



