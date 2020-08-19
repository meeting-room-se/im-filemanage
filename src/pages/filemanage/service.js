import axios from 'axios'

// 返回路径的目录内容
export const getFolder = (path) => {
  return axios.get('http://1.zmz121.cn:8080/list?path='+path)
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

