import { removeFile, setState } from '@/pages/filemanage/Utils/state';
import { remoteurl, uploadFile } from '@/pages/filemanage/service';

export default {
  namespace: 'uploadModal',
  state: {
    visible: false,
    radiovalue: 1,
    uploadurl: remoteurl+"/file/upload/headpic",
    havepath: false,
    filelist: [],
    haveprogress: false,
    progress: 0
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
    changeState(state, { payload }){
      return setState(state,payload);
    },
    initModal(state){
      const payload={
        visible: false,
        radiovalue: 1,
        uploadurl: remoteurl+"/file/upload/headpic",
        havepath: false,
        filelist: [],
        haveprogress: false,
        progress: 0
      }
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
  },
  effects: {
    *commit({ payload }, { put, call, select }){
      if(payload.path === ""){
        const file = yield select(state => state.uploadModal.filelist[0]);
        const res = yield call(uploadFile,{url: payload["uploadurl"], file: file});
      }else{
        const file = yield select(state => state.uploadModal.filelist);
        console.log(file);
        const res = yield call(uploadFile,{put: put,url: payload["uploadurl"], path: payload["path"],filelist: file});
      }

    }
  }


}