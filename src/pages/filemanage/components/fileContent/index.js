import React from 'react';
import {Input, Button, Table, Tag, Space} from 'antd'
import { connect } from 'dva';
import styles from './index.css'
import icon from '../../statics/iconfont/iconfont.css'

function FileContent(props){
  return (
    <div className={styles.Wrapper}>
      {/*搜索*/}
      <div className={styles.Title}>
        <Input className={styles.SearchInput}/>
        <Button type={"primary"} className={styles.SearchBtn}>
          <span className={icon.iconfont} style={{fontSize: "23px"}}>&#xe60c;</span>
        </Button>
        <a className={styles.More}><span className={icon.iconfont} style={{fontSize: "28px"}}>&#xe7ac;</span></a>
      </div>
      {/*表格*/}
      <div className={styles.Content}>
        <h1 className={styles.FolderName}>foldername</h1>
        <Table columns={props.columns} dataSource={props.data} />
      </div>
    </div>
  )
}

function mapStateToProps({ fileContent }){
  return {
    columns: fileContent.columns,
    data: fileContent.data
  }
}

export default connect(mapStateToProps)(FileContent);