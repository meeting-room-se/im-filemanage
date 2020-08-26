import { removeFile, setState } from '@/pages/filemanage/Utils/state';
import { remoteurl, uploadFile } from '@/pages/filemanage/service';

export default {
  namespace: 'uploadModal',
  state: {
    visible: false,
    radiovalue: 1,
    uploadurl: remoteurl+"/file/upload/headpic",
    havepath: false,
    filelist: []
  },
  reducers: {
    // 改变上传方式
    changeRadio(state, { payload }){
      if(payload["radiovalue"] === 1){
        payload["uploadurl"] = remoteurl+"/file/upload/headpic";
        payload["havepath"] = false;

      }else{
        payload["uploadurl"] = remoteurl+"/file/upload/small";
        payload["havepath"] = true;
      }
      return setState(state,payload);
    },
    // 更换整个filelist
    changeFileList(state, { payload }){
      return setState(state,payload);
    },
    // 往filelist中添加file
    addFile(state, { payload }){
      const payload_ = {
        "filelist": [...state.filelist,payload]
      }
      return setState(state,payload_);
    },
    // 删除filelist中的某一项
    removeFile(state, { payload }){
      const payload_ = removeFile(state.filelist,payload);
      return setState(state,payload_);
    },

    changeVisible(state,{ payload }){
      return setState(state,payload);
    }
  },
  effects: {
    *commit({ payload }, { put, call, select }){
      if(payload.path === ""){
        const file = yield select(state => state.uploadModal.filelist[0]);
        const res = yield call(uploadFile,{url: payload["uploadurl"], file: file});
      }else{
        const file = yield select(state => state.uploadModal.filelist);
        console.log(file);
        const res = yield call(uploadFile,{url: payload["uploadurl"], path: payload["path"],filelist: file});
      }

    }
  }


}