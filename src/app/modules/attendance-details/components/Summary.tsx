import React, {useEffect, useState} from 'react'
import {lables} from './../data'
type Props = {
  data: {
    volunteerName: string
    volunteerNumber: string
    idNumber: string
    coordinatorName: string
    instituteName: string
    reportMonth: string
    totalWorkTime: string
    totalWorkingDays: string
    volunteerWeeklyHours: string
    volunteerWorkTime: string
    totalMonthTime: string
    workTimeDiff: string
    year: string
    month: string
  }
}

const Summary: React.FC<Props> = ({data}) => {
  const {
    volunteerName,
    volunteerNumber,
    idNumber,
    coordinatorName,
    instituteName,
    // reportMonth,
    totalWorkTime,
    totalWorkingDays,
    volunteerWeeklyHours,
    volunteerWorkTime,
    totalMonthTime,
    workTimeDiff,
    month,
    year,
  } = data
  console.log({sssss: data})
  return (
    <>
      <div className={`card mb-5 col-xl-12`} style={{width: '100%'}}>
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* begin::Table body */}
              <tbody>
                <tr>
                  <TableDataView className='min-w-150px' text={lables.VolunteerName} type='text' />
                  <TableDataView className='min-w-150px' text={volunteerName} type='text' />
                  <TableDataView text={lables.VolunteerNumber} type='text' />
                  <TableDataView text={volunteerNumber} type='text' />
                  <TableDataView text={lables.IdNumber} type='text' />
                  <TableDataView text={idNumber} type='text' />
                </tr>
                <tr>
                  <TableDataView
                    className='min-w-150px'
                    text={lables.CoordinatorName}
                    type='text'
                  />
                  <TableDataView className='min-w-150px' text={coordinatorName} type='text' />
                  <TableDataView text={lables.InstituteName} type='text' />
                  <TableDataView text={instituteName} type='text' />
                </tr>
                <tr>
                  <TableDataView className='min-w-150px' text={lables.ReportMonth} type='text' />
                  <TableDataView className='min-w-150px' text={month + ' / ' + year} type='text' />
                  <TableDataView text={lables.TotalWorkTime} type='text' />
                  <TableDataView text={totalWorkTime} type='text' />
                  <TableDataView text={lables.TotalWorkingDays} type='text' />
                  <TableDataView text={totalWorkingDays} type='text' />
                </tr>
                <tr>
                  <TableDataView
                    className='min-w-150px'
                    text={lables.VolunteerWeeklyHours}
                    type='text'
                  />
                  <TableDataView className='min-w-150px' text={volunteerWeeklyHours} type='text' />
                  <TableDataView text={lables.VolunteerWorkTime} type='text' />
                  <TableDataView text={volunteerWorkTime} type='editText' />
                </tr>
                <tr>
                  <TableDataView className='min-w-150px' text={lables.TotalMonthTime} type='text' />
                  <TableDataView className='min-w-150px' text={totalMonthTime} type='text' />
                  <TableDataView text={lables.WorkTimeDiff} type='text' />
                  <TableDataView text={workTimeDiff} type='text' />
                </tr>
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}
const TableDataView = (props: any) => {
  const {text, type, className} = props
  const [note, setNote] = useState(text)
  useEffect(() => {
    setNote(text)
  }, [text])
  const renderFields = () => {
    switch (type) {
      case 'editText':
        return (
          <td className={`${className}`}>
            <input
              style={{minHeight: '30px', textAlign: 'right'}}
              className='form-control'
              value={note}
              // disabled={true}
              onChange={setNote}
            />
          </td>
        )
      case 'text':
        return <td className={`${className}`}>{text}</td>
    }
  }

  return <>{renderFields()}</>
}
export default Summary
