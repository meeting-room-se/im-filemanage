

// state:未修改state，map:要修改的数据，map形式
export const setState = (state,map) => {
  const newState = JSON.parse(JSON.stringify(state));
  for(const key in map){
    newState[key] = map[key];
  }
  return newState;
}