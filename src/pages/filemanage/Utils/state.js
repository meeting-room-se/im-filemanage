// 获得文件类型
function getFileType(filename){
  const index = filename.indexOf('.');
  if(index === -1){
    return 'folder';
  }else{
    return filename.substring(index+1,filename.length);
  }
}

// 从filelist中删除file
export const removeFile = (filelist,file) => {
  for(var i in filelist){
    if(filelist[i].uid === file.uid){
      filelist.splice(i,1);
      break
    }
  }
  return filelist;
}

// state:未修改state，map:要修改的数据，map形式
export const setState = (state,map) => {
  const newState = JSON.parse(JSON.stringify(state));
  for(const key in map){
    newState[key] = map[key];
  }
  return newState;
}

// 格式化文件夹列表格式 ，参数是文件夹列表
export const formatFolderData = (data) => {
  const result = [];
  for(const i in data){
    result.push({
      name: data[i]["name"],
      children: [],
      isclick: false,
      isdevelop: false,
      isempty: data[i]["emptyFolder"],
      path: '/'+data[i]["nameOfFullPath"],
    });
  }
  return result;
}
// 格式化文件夹表数据
export const formatTableData = (data) => {
  console.log(data);
  const result = [];
  const files = data["files"];
  const folders = data["folders"];
  let key = 0;
  for(var i in folders){
    result.push({
      key: ""+key,
      name: folders[i]["name"],
      type: "folder",
      size: "",
      lastmodified: folders[i]["time"],
      download: {path:"/"+folders[i]["nameOfFullPath"], type: getFileType(folders[i]["name"])},
      delete: "/"+folders[i]["nameOfFullPath"]
    });
    key = key+1;
  }
  for(var j in files){
    result.push({
      key: ""+key,
      name: files[j]["name"],
      type: getFileType(files[j]["name"]),
      size: files[j]["size"],
      lastmodified: files[j]["time"],
      download: {path:"/"+files[j]["nameOfFullPath"], type: getFileType(files[j]["name"])},
      delete: "/"+files[j]["nameOfFullPath"]
    })
    key = key+1;
  }
  return result;
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
// path:/test1/test2  修改list文件列表中，path路径的文件项的属性,最终修改list
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

// 将value(list类型)添加至list中的path文件夹的children列表中，并且切换展开icon
export const addChildrenFolder = (list,path,value) => {
  if(path === '' || path === null){
    return
  }
  const pathlist = path.split('/');
  pathlist.splice(0,1)
  if(pathlist.length === 1){
    for(const re in list){
      if(pathlist[0] === list[re].name){
        // 合并原始children和要添加的文件夹列表
        list[re]["children"] = list[re]["children"].concat(value);
        list[re]["isdevelop"] = true;
      }
    }
  }else{
    const p = pathlist[0];
    for(const j in list) {
      if (p === list[j].name) {
        addChildrenFolder(list[j].children,path.slice(p.length+1,path.length),value)
      }
    }
  }
}
// 将path路径的文件夹内的children列表清空，并且切换展开icon
export const deleteChildrenFolder = (list,path) => {
  if(path === '' || path === null){
    return
  }
  const pathlist = path.split('/');
  pathlist.splice(0,1)
  if(pathlist.length === 1){
    for(const re in list){
      if(pathlist[0] === list[re].name){
        // 清空path路径文件夹下的孩子列表
        list[re]["children"] = [];
        list[re]["isdevelop"] = false;
      }
    }
  }else{
    const p = pathlist[0];
    for(const j in list) {
      if (p === list[j].name) {
        deleteChildrenFolder(list[j].children,path.slice(p.length+1,path.length))
      }
    }
  }
}


export const formatFileSize = (size) => {
  // const GB = size / (1024 * 1024 * 1024);
  // const GB_ = size % (1024 * 1024 * 1024);
  // const MB = GB_ / 1024;
  // const MB_ = GB_ % 1024;
  // const KB = MB_ /1024;
  if(size === ""){
    return "";
  }
  const result = Math.round(size/1024);
  return result+"kb";
}