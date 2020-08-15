import React, { Fragment } from 'react';
import FileLNav from '@/pages/filemanage/components/fileLNav';
import FileContent from '@/pages/filemanage/components/fileContent';

function FileManage(props){
  return (
    <Fragment>
      <FileLNav/>
      <FileContent/>
    </Fragment>
  )
}

export default FileManage;