import React, { Component } from 'react';
import './home.less';
import RightClickContextMenu from '../rightclickcontextmenu/rightclickcontextmenu';
import { Menu, Dropdown, Button ,Icon, Input,Upload,Card,Table} from 'antd';
const menu = (
    <Menu>
      <Menu.Item>
        <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" showUploadList={false} >
          <span style={{color:'#3caef0'}}>上传文件</span>
        </Upload>
      </Menu.Item>
      <Menu.Item>
        <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
        <span style={{color:'#3caef0'}}>上传文件夹</span>
        </Upload>
      </Menu.Item>
    </Menu>
  );
function strsort(a,b){
  var stra=a.toUpperCase();
  var strb=b.toUpperCase();
  if(stra<strb){
    return -1;
  }
  if(stra>strb){
    return 1;
  }
  return 0;
}
const columns = [
    {
      title: '文件名',
      dataIndex: 'filename',
      render: text => <a>{text}</a>,
      width:600,
      defaultSortOrder: 'descend',
      sorter: (a, b) => strsort(a.filename,b.filename),
    },
    {
      title: '大小',
      dataIndex: 'size',
      width:150,
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: '修改时间',
      dataIndex: 'date',
      width:250,
      sorter: (a, b) => strsort(a.date,b.date),
    },
  ];
  const data = [
    {
      key: '1',
      filename: 'test1',
      size: 30,
      date: '2019-12-13 08:47',
    },
    {
      key: '2',
      filename: 'test2',
      size: 31,
      date: '2019-10-14 08:47',
    },
    {
      key: '3',
      filename: 'test3',
      size: 32,
      date: '2019-08-13 08:47',
    }
  ];
  
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state={isdisplay:false,iscontextmenu:false};
  }
  onClickopen=()=>{
    console.log('open');
  }
  onClickload=()=>{
    console.log('load');
  }
  onClickmove=()=>{
    console.log('move');
    this.setState({iscontextmenu:false})
  }
  onClickcopy=()=>{
    console.log('copy');
    this.setState({iscontextmenu:false})
  }
  onClickrename=()=>{
    console.log('rename');
    this.setState({iscontextmenu:false})
  }
  onClickdelete=()=>{
    console.log('delete');
    this.setState({iscontextmenu:false})
  }
  onRow=record => {
    return {
      onClick: event => {
        this.setState({iscontextmenu:false})
      }, // 点击行
      onContextMenu: event => {
        this.setState({iscontextmenu:true})},
      onMouseEnter: event => {return(
        <RightClickContextMenu/>
      )}, // 鼠标移入行
      onMouseLeave: event => {},
    };
  }
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys:', selectedRowKeys,'selectedRows: ', selectedRows);
        if(selectedRowKeys.length!==0){
          this.setState({ isdisplay:true });
        }else{
          this.setState({ isdisplay:false });
        }
        
      },
      getCheckboxProps: record => ({
        //disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const {iscontextmenu}=this.state;
      return (
          <div className='home'>
            <div className='homeheader'>
                <div className='homeheader-left'>
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <Button className='homeheader-button'>
                            <Icon type="upload" className='homeheader-icon' />上传
                        </Button>
                    </Dropdown>
                    <Button className='homeheader-button'>
                        <Icon type="folder-add" className='homeheader-icon' />新建文件夹
                    </Button>
                    <Button className='homeheader-button' style={{display:(this.state.isdisplay)?'inline':'none'}}>
                        <Icon type="download" className='homeheader-icon'/>下载
                    </Button>
                    <Button className='homeheader-button' style={{display:(this.state.isdisplay)?'inline':'none'}}>
                        <Icon type="delete" className='homeheader-icon'/>删除
                    </Button>
                </div>
                <div className='homeheader-right'>
                    <Input.Search placeholder="选择您的文件" className='homeheader-right-search' onSearch={value => console.log(value)}/>
                </div>
            </div>
            <Card size="small" title="我的文件" extra={<span>已加载2项</span>}>
              {
                  iscontextmenu && (<RightClickContextMenu 
                  visible={iscontextmenu} 
                  onClickopen={this.onClickopen}
                  onClickload={this.onClickload}
                  onClickmove={this.onClickmove}
                  onClickcopy={this.onClickcopy}
                  onClickrename={this.onClickrename}
                  onClickdelete={this.onClickdelete}
                  />)
              }
             
              <Table onRow={this.onRow} rowSelection={rowSelection} columns={columns} dataSource={data} pagination='false'/>
            </Card>
          </div>
      )
  }
}
