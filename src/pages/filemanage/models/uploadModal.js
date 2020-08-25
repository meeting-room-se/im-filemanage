import { setState } from '@/pages/filemanage/Utils/state';
import { remoteurl } from '@/pages/filemanage/service';

export default {
  namespace: 'uploadModal',
  state: {
    visible: false,
    radiovalue: 1,
    uploadurl: remoteurl+"/file/upload/headpic"
  },
  reducers: {
    changeRadio(state, { payload }){
      if(payload["radiovalue"] === 1){
        payload["uploadurl"] = remoteurl+"/file/upload/headpic";
      }else{
        payload["uploadurl"] = remoteurl+"/file/upload/small"
      }
      return setState(state,payload);
    },

    changeVisible(state,{ payload }){
      return setState(state,payload);
    }
  }
}