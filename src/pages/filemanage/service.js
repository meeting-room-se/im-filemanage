import axios from 'axios'

export const remoteurl = 'http://1.zmz121.cn:8010';

// 返回路径的目录内
export const getFolder = (path) => {
  console.log(remoteurl+'/file/list?path='+path);
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

export default getFolder;

