import { getTableData, setState } from '@/pages/filemanage/Utils/state';
import getFolder from '@/pages/filemanage/service';
export default {
  namespace: 'currentFolder',
  state: {
    folders: [],
    files: [],
    path: ''
  },
  reducers: {
    // 改变当前文件夹
    changeFolder(state,{ payload }){
      return setState(state,payload);
    },


  },
  effects: {
    *getFolder({ payload }, { put, call }){
      const data = yield call(getFolder, payload);
      const data_ = {};
      data_['path'] = payload;
      data_['folders'] = data['floders'];
      data_['files'] = data['files'];
      yield put({
        type: 'changeFolder',
        payload: data_
      });
      const folders = data_.folders;
      yield put({
        type: 'folderItem/initFolderItem',
        payload: folders
      })
    },
    *initFolderItem(action,{ put, select }) {
      const folders = yield select(state => state.currentFolder.folders);
      console.log(folders);
      yield put({
        type: 'folderItem/initFolderItem',
        payload: folders
      })
    },
    // 初始化表格数据，不包含文件夹
    *initFiles(action,{ put, select }){
      const files = yield select(state => state.currentFolder.files);
      const path = yield select(state => state.currentFolder.path);
      console.log("files",files);
      const data = getTableData({ files: files,folders:[]});
      yield put({
        type: 'tableContent/changeTable',
        payload: {
          data: data,
          path: path
        }
      })
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname}) => {
        if(pathname === '/filemanage'){
          dispatch({
            type: 'getFolder',
            payload: '/'
          });
          dispatch({
            type: 'initFiles',
          })
        }
      })
    }
  }

}