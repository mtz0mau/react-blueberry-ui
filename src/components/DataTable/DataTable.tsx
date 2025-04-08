import { Card, Pagination, Table, TableProps, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { Button } from 'components/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Input } from 'components/Form/components/Input';
import { CiSearch } from 'react-icons/ci';
import { useSearchFilter } from "components/DataTable/hooks/useSearchFilter";
import { useDataPaginator } from "components/DataTable/hooks/useDataPaginator";
import { IDataTable } from "components/DataTable/interfaces/IDataTable";

interface Props extends IDataTable {
  selectedRowKeysExternal?: string[];
  setSelectedRowKeysExternal?: (selectedRowKeys: string[]) => void;
}

export const DataTable = ({
  columns,
  data,
  title,
  buttonLabel,
  searchPlaceholder,
  hideButton,
  hideSearch,
  onButtonClick,
  headless,
  disableSelection,
  disablePagination,
  onRowClick,
  selectionActions = () => [],
  rowClassName,
  selectedRowKeysExternal,
  setSelectedRowKeysExternal
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { filteredData, search, setSearch } = useSearchFilter(data);
  const {
    paginatedData,
    setCurrentPage,
    currentPage,
    setPageLength,
    pageLength
  } = useDataPaginator(filteredData, disablePagination ? filteredData.length : 5);

  const getCountRegistersLabel = (count: number) => {
    if (count === 1) return '1 registro';
    return `${count} registros`;
  };

  const dataSource = useMemo<TableProps<any>['dataSource']>(() => {
    return (disablePagination ? filteredData : paginatedData).map((item) => ({
      ...item,
      key: item?.id
    }));
  }, [(disablePagination ? filteredData : paginatedData)]);

  return (
    <>
      {!headless && (
        <Card size={'small'} className={'mb-3 w-full'}>
          <div className={'flex md:items-center justify-between flex-col md:flex-row'}>
            <div className={'flex items-center gap-3'}>
              <div className={'font-semibold text-lg'}>{title}</div>
              <Tag className={'rounded-full'}>{getCountRegistersLabel(data.length)}</Tag>
            </div>

            {!hideButton && (
              <div className={'mt-3 md:mt-0 w-full md:w-auto'}>
                <Button
                  label={buttonLabel}
                  color={'primary'}
                  variant={'solid'}
                  icon={<AiOutlinePlus/>}
                  onClick={onButtonClick}
                  className={'w-full'}
                />
              </div>
            )}
          </div>
        </Card>
      )}

      <div className={'flex flex-col md:flex-row gap-5 items-center mb-3'}>
        {!hideSearch && (
          <Input
            placeholder={searchPlaceholder ? searchPlaceholder : 'Buscar...'}
            className={'w-full md:w-[50%]'}
            icon={<CiSearch/>}
            value={search}
            onChange={(value: string) => setSearch(value)}
          />
        )}

        {(selectedRowKeysExternal || selectedRowKeys).length > 0 && (
          <div className={'flex gap-3 items-center'}>
            {selectionActions((selectedRowKeysExternal || selectedRowKeys))}
          </div>
        )}
      </div>

      <div>
        <Table
          scroll={{ x: true }}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowHoverable={true}
          rowClassName={rowClassName}
          bordered
          onRow={(record) => ({
            onClick: () => onRowClick ? onRowClick(record) : null
          })}
          className={'shadow-sm'}
          {...(disableSelection ? {} : {
            rowSelection: {
              type: 'checkbox',
              selectedRowKeys: selectedRowKeysExternal || selectedRowKeys,
              onChange: (selectedRowKeys) => {
                // @ts-ignore
                setSelectedRowKeysExternal && setSelectedRowKeysExternal(selectedRowKeys);
                setSelectedRowKeys(selectedRowKeys);
              }
            }
          })}
        />
      </div>

      {!disablePagination && (
        <div className={'mt-3'}>
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageLength}
            onChange={(page) => setCurrentPage(page)}
            onShowSizeChange={(_, size) => setPageLength(size)}
            align={'end'}
          />
        </div>
      )}
    </>
  );
};
