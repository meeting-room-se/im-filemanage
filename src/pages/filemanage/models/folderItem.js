import { getFolders } from '@/pages/filemanage/service';
import { setState } from '@/pages/filemanage/Utils/state';

export default {
  namespace: 'folderItem',
  state: {
    name: [],
    isclick: [true,false]
  },
  reducers: {
    // 改变左边栏文件夹列表
    changeFolderList(state,{ payload }){
      console.log("修改文件夹列表");
      const name = [];
      const isclick = [];
      console.log("payload:"+payload);
      for(var i in payload){
        console.log(payload[i]);
        name.push(payload[i].name);
        isclick.push(false);
      }
      return setState(state,{
        "name": name,
        "isclick": isclick
      });
    },
    // 改变文件夹点击状态
    changeClick(state,{ payload }){
      console.log("修改文件夹点击状态");
      const isclick = state.isclick.fill(false);
      isclick.splice(payload,1,true);
      return setState(state,{
        "isclick": isclick
      });
    }
  },
  effects: {
    *getFolders({ payload }, { call, put }){
      const data = yield call(getFolders,payload);
      console.log(data);
      yield put({
        type: 'changeFolderList',
        payload: data
      })
    }
  }
  ,
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname}) => {
        if(pathname === '/filemanage'){
          dispatch({
            type: 'getFolders',
            payload: '/'
          })
        }
      })
    }
  }
};