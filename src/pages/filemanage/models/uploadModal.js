import { setState } from '@/pages/filemanage/Utils/state';
import { remoteurl } from '@/pages/filemanage/service';

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

    changeFileList(state, { payload }){
      return setState(state,payload);
    },

    addFile(state, { payload }){
      const payload_ = {
        "filelist": [...state.filelist,payload]
      }
      return setState(state,payload_);
    },

    removeFile(state, { payload }){
    },

    changeVisible(state,{ payload }){
      return setState(state,payload);
    }
  }
}