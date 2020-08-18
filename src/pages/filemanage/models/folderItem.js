import axios from 'axios'
export default {
  namespace: 'folderItem',
  state: {
    name: ['a','b'],
    isclick: [true,false]
  },
  reducers: {
    getFolders(state){
      axios.get('http://192.168.2.206:8080/list?path=/')
        .then((res) => {
          if(res.status === 200){

          }else{
            console.log("参数错误");
          }
        })
        .catch(() => {
          console.log("请求失败");
        })
    },

    changeClick(state,{payload}){
      console.log("修改文件夹点击状态");
      const isclick = state.isclick.fill(false);
      isclick.splice(payload,1,true);
      // const newState = JSON.parse(JSON.stringify(state));
      // newState.isclick = isclick;
      // return newState;
      return {
        ...state,
        isclick:isclick
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname}) => {
        if(pathname === '/filemanage'){
          dispatch({
            type: 'getFolders'
          })
        }
      })
    }
  }
};