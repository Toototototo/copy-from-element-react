//@flow
import React from 'react';
import Table from '../../../src/table';
import './index.less';

export function isEmpty(value: any) {
  if (typeof value === 'undefined' || value === null || value === '') return true;
  return Object.keys(value).length < 1;
}

export function isNotEmpty(value: any) {
  return !isEmpty(value);
}

/**
 * 解析页面的主题
 * @param str
 * @return {any}
 */
export const parseThemes = (str: string): any => {
  // console.log('parse',str);
  let obj = {};
  if (isNotEmpty(str)) {
    try {
      obj = JSON.parse(
        str
          .replace('@header', '@head-back_color')
          .replace('@sider', '@sider-back_color')
          .replace('@font', '@sider-select_color')
          .replace('@button', '@select-color')
          .replace('@table', '@table_header_color'),
      );
    } catch (e) {
      console.error(e.message);
    }
  }
  return obj;
};

class Test extends React.Component {
  columns = [
    {
      resizable: true,
      columnKey: 'selection',
      dataIndex: 'selection',
      type: 'selection',
    },
    {
      label: '操作',
      width: 250,
      dataIndex: 'process',
      align: 'center',
      render: (_, record: any) => {
        // eslint-disable-next-line react/button-has-type
        return <button key="org" onClick={() => this.handleSetOrg(record)}>组织机构</button>;
      },
    },
    {
      label: '系统名称',
      dataIndex: 'sysName',
      width: 250,
    },
    {
      label: '版本号',
      dataIndex: 'sysVersion',
    },
    {
      label: '首页地址',
      dataIndex: 'sysHome',
      width: 300,
    },
    {
      label: '应用基地址',
      dataIndex: 'appBasic',
    },
    {
      label: '主题风格',
      align: 'center',
      dataIndex: 'sysSkin',
      className: 'sysSkinCls',
      width: 150,
      render: sysSkin => {
        let style = {};
        if (isNotEmpty(sysSkin)) {
          style = isNotEmpty(parseThemes(sysSkin)['@head-back_color'])
            ? { backgroundColor: parseThemes(sysSkin)['@head-back_color'] }
            : {};
        }
        return isNotEmpty(sysSkin) && <div style={{ ...style, width: '50px', height: '50px' }} />;
      },
    },
    {
      align: 'center',
      label: 'logo图标',
      dataIndex: 'sysLogo',
      className: 'sysLogoCls',
      render: sysLogo => isNotEmpty(sysLogo) && <img alt="" src={sysLogo} />,
    },
    {
      align: 'center',
      label: '登录背景',
      dataIndex: 'sysLogin',
      className: 'sysLoginCls',
      width: 200,
      render: sysLogin => isNotEmpty(sysLogin) && <img alt="" src={sysLogin} />,
    },
    {
      align: 'center',
      label: '单处登录',
      dataIndex: 'sysAlone',
      className: 'sysAloneCls',
      render: sysAlone => (sysAlone ? <span>是</span> : <span>否</span>),
    },
    {
      align: 'center',
      label: '全局设置',
      dataIndex: 'sysGlobal',
      className: 'sysGlobalCls',
      render: sysGlobal => (sysGlobal ? <span>是</span> : <span>否</span>),
    },
  ];
  data = [
    {
      'sysVersion': '1.0',
      'editWho': '1',
      'sysLogin': null,
      'sysLogo': 'data:image/png;base64,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',
      'sysSkin': '{"@header":"rgb(30,150,204)","@sider":"rgb(247,247,247)","@font":"rgb(143,143,143)","@table":"rgba(98,183,255,0.12)","@center":false}',
      'addWho': '1',
      'addDate': '2019-07-12 19:18:35',
      'editDate': '2019-07-17 12:51:15',
      'version': 0,
      'structure': null,
      'sysHome': null,
      'sysAlone': false,
      'sysGlobal': false,
      'appBasic': null,
      'sysName': '中泰智慧云',
      'tenant': null,
      'settingId': 'f0eded2faa0b4eb08821bcdc5eb41834',
      'disabled': false,
    },
    {
      'sysVersion': '1.0',
      'editWho': '1',
      'sysLogin': '',
      'sysSkin': '{"@header":"#ee3828","@sider":"#f9f9f9","@font":"#7a7a7a","@button":"#ee3828","@table":"rgba(238,56,40,0.12)","@center":true}',
      'addWho': '1',
      'addDate': '2019-06-20 10:58:26',
      'editDate': '2019-07-10 12:24:28',
      'version': 0,
      'structure': null,
      'sysHome': 'http://10.4.69.36:9060/#/home',
      'sysAlone': false,
      'sysGlobal': false,
      'appBasic': null,
      'sysName': '智慧党建',
      'tenant': null,
      'settingId': '5612c79fd891498888976e9993c97f6a',
      'disabled': false,
    },
  ];

  render() {
    return (
      <Table
        data={this.data}
        columns={this.columns}
        border
        rowKey='settingId'
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
