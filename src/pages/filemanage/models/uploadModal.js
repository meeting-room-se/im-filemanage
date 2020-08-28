import { formatTableData, removeFile, setState } from '@/pages/filemanage/Utils/state';
import { getFolder, remoteurl, uploadFile } from '@/pages/filemanage/service';

export default {
  namespace: 'uploadModal',
  state: {
    visible: false,
    radiovalue: 1,
    uploadurl: remoteurl+"/file/upload/headpic",
    havepath: false,
    filelist: [],
    haveprogress: false,
    progress: 0,
    imgshow: false,
    imgdata: ""
  },
  reducers: {
    // 改变上传方式
    changeRadio(state, { payload }){
      if(payload["radiovalue"] === 1){
        payload["uploadurl"] = remoteurl+"/file/upload/headpic";
        payload["filelist"] = [];
        payload["havepath"] = false;

      }else{
        payload["uploadurl"] = remoteurl+"/file/upload/small";
        payload["filelist"] = [];
        payload["havepath"] = true;
      }
      return setState(state,payload);
    },
    changeState(state, { payload }){
      // return setState(state,payload);
      return {...state, ...payload}
    },
    initModal(state){
      const payload={
        visible: false,
        radiovalue: 1,
        uploadurl: remoteurl+"/file/upload/headpic",
        havepath: false,
        filelist: [],
        haveprogress: false,
        progress: 0,
        imgdata: ""
      }
      return setState(state,payload);
    },
    // 往filelist中添加file
    addFile(state, { payload }){
      const payload_ = {
        "filelist": [...state.filelist,payload]
      };
      console.log(payload_);
      // return setState(state,payload_);
      return {...state,...payload_}
    },
    // 删除filelist中的某一项
    removeFile(state, { payload }){
      const payload_ = {
        "filelist": [...removeFile(state.filelist,payload)],
      };
      console.log(payload_);
      // return setState(state,payload_);
      return {...state,...payload_}
    },
  },
  effects: {
    *commit({ payload }, { put, call, select }){
      var res = "";
      if(payload.path === ""){
        res = yield call(uploadFile,{url: payload["uploadurl"], file: payload["file"]});
      }else{
        res = yield call(uploadFile,{url: payload["uploadurl"], path: payload["path"],filelist: payload["filelist"]});
      }
      if(res === 'success'){
        const path = yield select(state => state.tableContent.path);
        const data = yield call(getFolder, path);
        yield put({
          type: 'tableContent/changeData',
          payload: {
            data: formatTableData(data),
            path: path,
          }
        })
      }

    }
  }


}