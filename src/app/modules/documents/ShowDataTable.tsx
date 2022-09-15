/* eslint-disable jsx-a11y/anchor-is-valid */
import React ,{useState} from 'react';
import {Link} from 'react-router-dom';
// import {KTSVG} from '../../../../_metronic/helpers'
// import { colors, listData, parentKeys, fieldTypes, listOneFields, listTwoFields, listThreeFields, listFourFields, listFiveTypeOneFields, listFiveTypeNintyNineFields } from './../data'
type Props = {
  className: string,
  listData: any[],
  showDocumentEndpoint:string
}

const ShowDataTable: React.FC<Props> = ({className,listData,showDocumentEndpoint}) => {
  return (
    <div className={`card ${className}`}>

    
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3' style={{  width:"100%"}}>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <TableHeadView className="min-w-150px" text={'DocType'} />
                <TableHeadView className="min-w-150px" text="Description" />
                <TableHeadView className="min-w-150px" text="Link" />
                <TableHeadView className="" text="IsApproved" />
                <TableHeadView className="" text="IsDeclined" />
                <TableHeadView className="min-w-150px" text="Uploaded" />
                <TableHeadView className="min-w-150px" text="ActionDate" />
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
            {listData.map((item) => {
                                 const { docType, description, hasLink, code, isApproved, isDeclined, uploaded, actionDate } = item
                                return <tr  >
                                       <DataView dataText={docType || ''}  />
                                    <DataView dataText={description || ''}  />
                                    <DataView dataText={hasLink ? <Link style={{cursor:'pointer'}} to={`${showDocumentEndpoint}/${code}`} >{code}</Link> : ''} />
                                    <DataView dataText={isApproved || ''}  isCheckbox />
                                    <DataView dataText={isDeclined || ''} isCheckbox />
                                    <DataView dataText={uploaded || ''} />
                                    <DataView dataText={actionDate || ''}  />
                                </tr>
                            })}
             
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {ShowDataTable}
const DataView = (props: any) => {
    const { dataText,className, isCheckbox } = props;
    return (
        <>
            {
                isCheckbox ?
                    <td style={{  padding: '5px 0px',whiteSpace:'nowrap' }} className={`${className}`}> <input
                        type='checkbox'
                        className='form-control-sm'
                        checked={dataText}
                        disabled
                    /></td>
                    : <td style={{ whiteSpace:'nowrap', padding: '5px 5px' }}  className={`${className}`}>{dataText}</td>
            }
        </>
    )
}

const TableHeadView = (props: any) => {
  const {  text,className } = props;
  return (
      <th className={`${className}`}>{text}</th>
  )
}