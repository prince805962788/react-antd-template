import { commitCancel } from '@/api/approve';
import Vacant from '@/assets/vacant.png';
import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { ApproveType, CommittedType } from '@/store/wsMessageSlice';
import { Button, message, Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MergeDialoge from '../MergeDialoge';
import style from './style.module.less';

const generateApproveColumns = (
  showMergeVisible: Dispatch<SetStateAction<boolean>>,
  setCommitDetail: Dispatch<SetStateAction<ApproveType | CommittedType | undefined>>,
): ColumnsType<ApproveType> => {
  const handleApprove = (record: ApproveType) => {
    setCommitDetail(record);
    showMergeVisible(true);
  };
  return [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: '5vw',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '提交时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: '10vw',
    },
    {
      title: '申请人',
      dataIndex: 'committer',
      key: 'committer',
    },
    {
      title: '操作',
      key: 'action',
      width: '10vw',
      render: (e, record) => {
        let res = <></>;
        switch (record.is_review) {
          case 0:
            res = (
              <Button
                type="primary"
                className={style.check}
                onClick={() => handleApprove(record)}
                icon={<Icon name="CommitCheck" style={{ color: '#fff', marginRight: 5 }} />}
              >
                审批
              </Button>
            );
            break;
          case 2:
            res = (
              <span className={style.checkError}>
                <Icon name="CommitReject" style={{ color: '#FF5C5C', marginRight: 5 }} />
                已驳回
              </span>
            );
            break;
          case 3:
            res = (
              <span className={style.checking}>
                <Icon name="CommitCheckSuccess" style={{ color: '#5068F2', marginRight: 5 }} />
                已审批
              </span>
            );
            break;
          case 4:
            res = (
              <span className={style.checking}>
                <Icon name="CommitCheckSuccess" style={{ color: '#5068F2', marginRight: 5 }} />
                已审批
              </span>
            );
            break;
          case 5:
            res = (
              <div className={style.rejectButton}>
                <span className={style.checkBack}>
                  <Icon name="ResetOutlined" style={{ color: '#242636', marginRight: 5 }} />
                  已撤回
                </span>
              </div>
            );
            break;
          case 6:
            res = (
              <div className={style.rejectButton}>
                <span className={style.checkError}>
                  <Icon name="CommitFail" style={{ color: '#FF5C5C', marginRight: 5 }} />
                  失败(分支改变)
                </span>
              </div>
            );
            break;
        }
        return res;
      },
    },
  ];
};
const generateCommittedColumns = (
  showMergeVisible: Dispatch<SetStateAction<boolean>>,
  setCommitDetail: Dispatch<SetStateAction<ApproveType | CommittedType | undefined>>,
): ColumnsType<CommittedType> => {
  const handleApprove = (record: CommittedType) => {
    setCommitDetail(record);
    showMergeVisible(true);
  };
  const sendCancel = async (record_id: number) => {
    const res = await commitCancel({ record_id });
    if (res) {
      message.success('撤销成功');
    }
  };
  return [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: '5vw',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '提交时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: '10vw',
    },
    {
      title: '审批人',
      dataIndex: 'reviewer',
      key: 'reviewer',
    },
    {
      title: '操作',
      key: 'action',
      width: '10vw',
      render: (_, record) => {
        let res = <></>;
        switch (record.is_review) {
          case 0:
            res = (
              <div className={style.rejectButton}>
                <span className={style.checking}>
                  <Icon name="CommitChecking" style={{ color: '#5068F2', marginRight: 5 }} />
                  待审批
                </span>

                <Popconfirm
                  title="确认是否撤回此提交"
                  onConfirm={() => sendCancel(record.record_id)}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" size="small" className={style.check}>
                    撤回
                  </Button>
                </Popconfirm>
              </div>
            );
            break;
          case 2:
            res = (
              <div className={style.rejectButton}>
                <span className={style.checkError}>
                  <Icon name="CommitReject" style={{ color: '#FF5C5C', marginRight: 5 }} />
                  被驳回
                </span>
                <Button
                  type="primary"
                  size="small"
                  className={style.check}
                  onClick={() => handleApprove(record)}
                >
                  查看
                </Button>
              </div>
            );
            break;
          case 3:
            res = (
              <span className={style.checkSuccess}>
                <Icon name="CommitSuccess" style={{ color: '#61C554', marginRight: 5 }} />
                成功
              </span>
            );
            break;
          case 4:
            res = (
              <div className={style.rejectButton}>
                <span className={style.checkError}>
                  <Icon name="CommitFail" style={{ color: '#FF5C5C', marginRight: 5 }} />
                  失败
                </span>
                <Button
                  type="primary"
                  size="small"
                  className={style.check}
                  onClick={() => handleApprove(record)}
                >
                  查看
                </Button>
              </div>
            );
            break;
          case 5:
            res = (
              <div className={style.rejectButton}>
                <span className={style.checkBack}>
                  <Icon name="ResetOutlined" style={{ color: '#242636', marginRight: 5 }} />
                  已撤回
                </span>
              </div>
            );
            break;
          case 6:
            res = (
              <div className={style.rejectButton}>
                <span className={style.checkError}>
                  <Icon name="CommitFail" style={{ color: '#FF5C5C', marginRight: 5 }} />
                  失败(分支改变)
                </span>
                <Button
                  type="primary"
                  size="small"
                  className={style.check}
                  onClick={() => handleApprove(record)}
                >
                  查看
                </Button>
              </div>
            );
            break;
        }
        return res;
      },
    },
  ];
};

const ApproveTable = ({
  type,
}: {
  type: 'ApproveColumns' | 'ApprovedColumns' | 'CommittedColumns';
}) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [mergeVisible, setMergeVisible] = useState(false);
  const [commitDetail, setCommitDetail] = useState<ApproveType | CommittedType>();
  const { approveList, approvedList, committedList } = useAppSelector(
    (state: RootState) => state.wsMsg,
  );
  useEffect(() => {
    const ApproveColumns = generateApproveColumns(setMergeVisible, setCommitDetail);
    const CommittedColumns = generateCommittedColumns(setMergeVisible, setCommitDetail);
    switch (type) {
      case 'ApproveColumns':
        setColumns(ApproveColumns);
        setList(approveList);
        break;
      case 'ApprovedColumns':
        setColumns(ApproveColumns);
        setList(approvedList);
        break;
      case 'CommittedColumns':
        setColumns(CommittedColumns);
        setList(committedList);
        break;
    }
  }, [type, approveList, approvedList, committedList]);
  return (
    <>
      <Table
        rowKey="commit_id"
        columns={columns}
        dataSource={list}
        pagination={false}
        scroll={{ y: 600 }}
        locale={{
          emptyText: (
            <div className={style.emptyTable}>
              <img className={style.emptyImg} src={Vacant} />
              暂无处理
            </div>
          ),
        }}
      />
      <MergeDialoge
        visible={mergeVisible}
        record={commitDetail}
        close={() => setMergeVisible(false)}
      />
    </>
  );
};

export default ApproveTable;
