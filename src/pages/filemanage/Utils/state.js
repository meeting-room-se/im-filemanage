
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
// path:/test1/test2  修改list文件列表中，path路径的文件项的属性
export const setFolderProps = (list,path,map) => {
  if(path === '' || path === null){
    return
  }
  const pathlist = path.split('/');
  pathlist.splice(0,1)
  if(pathlist.length === 1){
    for(const re in list){
      if(pathlist[0] === list[re].name){
        for(const key in map){
          list[re][key] = map[key];
          return
        }
      }
    }
  }else{
    const p = pathlist[0];
    for(const j in list) {
      if (p === list[j].name) {
        setFolderProps(list[j].children,path.slice(p.length+1,path.length),map)
      }
    }
  }
}