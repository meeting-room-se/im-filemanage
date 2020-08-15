export default {
  namespace: 'folder',
  state: {
    name: ['a','b'],
    isclick: [true,false]
  },
  reducers: {
    changeClick(state,{payload}){
      console.log("修改文件夹点击状态");
      const isclick = state.isclick.fill(false);
      isclick.splice(payload,1,true);
      const newState = JSON.parse(JSON.stringify(state));
      newState.isclick = isclick;
      return newState;
    }
  }
};