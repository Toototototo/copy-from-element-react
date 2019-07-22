import React from 'react';
import Table from '../../../src/table';

class Test extends React.Component {
  columns = [
    {
      label: 'selection',
      dataIndex: 'selection',
      type: 'selection',
      width: 48,
    },
    {
      label: '日期',
      dataIndex: 'date',
      width: 180,
    },
    {
      label: '姓名',
      dataIndex: 'name',
      width: 180,
    },
    {
      label: '地址',
      dataIndex: 'address',
    },
  ];
  data = [{
    key: '1',
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
    {
      key: '2',
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
    }];

  render() {
    return (
      <Table
        data={this.data}
        columns={this.columns}
        border
        emptyText=''
        fit
        highlightCurrentRow
        rowStyle={{}}
        showHeader
        showSummary={false}
        stripe
        sumText=''
      />
    );
  }
}

export default Test;
