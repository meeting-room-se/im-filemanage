
function getFileType(filename){
  const index = filename.indexOf('.');
  if(index === -1){
    return 'folder';
  }else{
    return filename.substring(index+1,filename.length);
  }
}

// state:未修改state，map:要修改的数据，map形式
export const setState = (state,map) => {
  const newState = JSON.parse(JSON.stringify(state));
  for(const key in map){
    newState[key] = map[key];
  }
  return newState;
}

// 从folders信息中获取文件夹名字，返回列表类型
export const getFolderName = (folders) => {
  const name=[];
  for(const i in folders){
    name.push(folders[i]["name"]);
  }
  return name;
}
// 处理接口返回数据,返回Table中data格式
export const getTableData = (data) => {
  const res = [];
  const folders = data.folders;
  const files = data.files;
  for(const i in folders){
    res.push({
      name: folders[i].name,
      type: getFileType(folders[i].name),
      size: '',
      lastmodified: folders[i].lastmodified,
      download: "",
      delete: ""
    })
  }
  for(const i in files){
    res.push({
      name: files[i].name,
      type: getFileType(folders[i].name),
      size: files[i].size,
      lastmodified: files[i].lastmodified,
      download: "",
      delete: ""
    })
  }
  return res;
}