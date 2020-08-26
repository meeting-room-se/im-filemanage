import {
  setState,
  setFolderProps,
  deleteChildrenFolder,
  addChildrenFolder,
  formatFolderData,
} from '@/pages/filemanage/Utils/state';
import { getFolder } from '@/pages/filemanage/service';

export default {
  namespace: 'folderList',
  state: {
    list: [
      {
        name: 'test1',
        children: [
          {
            name: 'test3',
            children: [],
            isclick: false,
            isdevelop: false,
            isempty: false,
            path: "/test1/test3"
          }
        ],
        isclick: false,
        isdevelop: true,
        isempty: false,
        path: "/test1"
      },
      {
        name: 'test2',
        children: [

          ],
        isclick: false,
        isdevelop: false,
        isempty: true,
        path: "/test2"
      },
    ],
    currentfolder: ''
  },
  reducers: {
    // 改变文件夹点击状态，包括展开icon切换
    changeClick(state,{ payload }){
      // 修改当前选中的文件夹状态
      setFolderProps(state.list,payload["path"],payload["value"]);
      // 取消之前选中的文件夹的状态
      setFolderProps(state.list,state.currentfolder,{"isclick": false});
      const list = JSON.parse(JSON.stringify(state.list));
      return setState(state,{"list":list,"currentfolder": payload["path"]});
    },
    // 修改payload["path"]的孩子目录
    changeChildrenFolder(state,{ payload }){
      if(payload["isdevelop"] === true){
        deleteChildrenFolder(state.list,payload["path"]);
      }else{
        addChildrenFolder(state.list,payload["path"],payload["value"]);
      }
      const list = JSON.parse(JSON.stringify(state.list));
      return setState(state,{"list":list});
    },
    // 修改整个文件夹列表 ，初始化调用
    changeList(state,{ payload }){
      return setState(state,payload);
    }

  },
  effects:{

    *initFolder({ payload }, { put, call }){
      const data = yield call(getFolder,'/');
      yield put({
        type: 'changeList',
        payload: {
          list: formatFolderData(data["folders"]),
          currentfolder: '/'
        }
      })
    },

    // 对文件夹展开进行处理
    *changeDevelop({ payload }, { put, call }){
      if(payload["isdevelop"] === "true"){
        yield put({
          type:'changeChildrenFolder',
          payload:{
            isdevelop: true,
            path: payload["path"],
          }
        })
      }else{
        const data = yield call(getFolder,payload["path"]);
        yield put({
          type: 'changeChildrenFolder',
          payload: {
            isdevelop: false,
            path: payload["path"],
            value: formatFolderData(data["folders"])
          }
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname}) => {
        if(pathname === '/filemanage'){
          dispatch({
            type: 'initFolder',
          });
          dispatch({
            type: 'tableContent/changeData',
            payload: {
              path: '/'
            }
          })
        }
      })
    }
  }

};