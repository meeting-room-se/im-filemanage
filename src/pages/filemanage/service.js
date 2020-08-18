import axios from 'axios'


export const getFolders = (path) => {
  return axios.get('http://1.zmz121.cn:8080/list?path='+path)
    .then((res) => {
      if(res.status === 200){
        const data = res.data.data.floders;
        console.log(data);
        return data;
      }else{
        console.log("参数错误");
      }
    })
    .catch(() => {
      console.log("请求失败");
    })
}

export default getFolders;

