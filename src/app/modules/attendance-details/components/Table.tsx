import React, {useEffect, useState} from 'react'
import {TableLabels, fieldTypes} from './../data'
type Props = {
  days: any[]
  absenceTypes: any[]
}

const Table: React.FC<Props> = ({days, absenceTypes}) => {
  return (
    <>
      <div className={`card mb-5 col-xl-12`} style={{width: '100%'}}>
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* begin::Table body */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <TableHeadView
                    className='min-w-150px'
                    type={fieldTypes}
                    text={TableLabels.date}
                  />
                  <TableHeadView className='min-w-150px' text={TableLabels.dayInWeek} />
                  <TableHeadView className='min-w-150px' text={TableLabels.dayType} />
                  <TableHeadView className='' text={TableLabels.starTime} />
                  <TableHeadView className='' text={TableLabels.endTime} />
                  <TableHeadView className='min-w-150px' text={TableLabels.workActivity1} />
                  <TableHeadView className='min-w-150px' text={TableLabels.workActivityNote1} />
                  <TableHeadView className='min-w-150px' text={TableLabels.absenceType} />
                  <TableHeadView className='min-w-150px' text={TableLabels.isSickDay} />
                  <TableHeadView className='min-w-150px' text={TableLabels.isApprovedSickDay} />
                  <TableHeadView className='min-w-150px' text={TableLabels.isQuarantine} />
                  <TableHeadView className='min-w-150px' text={TableLabels.totalHours} />
                  <TableHeadView className='min-w-150px' text={TableLabels.notes} />
                </tr>
              </thead>
              <tbody>
                {days.map((day: any) => {
                  return (
                    <tr>
                      <TableDataView
                        itemCount={day.itemCount}
                        type={fieldTypes.text}
                        text={day.date}
                        currentCount={day.currentCount}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        type={fieldTypes.text}
                        text={day.dayInWeek}
                        currentCount={day.currentCount}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        type={fieldTypes.text}
                        currentCount={day.currentCount}
                        text={day.dayType}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        type={fieldTypes.time}
                        currentCount={day.currentCount}
                        text={day.startTime1}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        currentCount={day.currentCount}
                        type={fieldTypes.time}
                        text={day.endTime1}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        type={fieldTypes.select}
                        text={day.workActivityItems}
                        currentCount={day.currentCount}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        type={fieldTypes.editText}
                        currentCount={day.currentCount}
                        text={day.workActivityNote1}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        type={fieldTypes.select}
                        currentCount={day.currentCount}
                        text={absenceTypes}
                      />

                      <TableDataView
                        itemCount={day.itemCount}
                        currentCount={day.currentCount}
                        type={fieldTypes.checkbox}
                        text={day.isSickDay}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        currentCount={day.currentCount}
                        type={fieldTypes.checkbox}
                        text={day.isQuarantineSickDay}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        currentCount={day.currentCount}
                        type={fieldTypes.checkbox}
                        text={day.isApprovedSickDay}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        currentCount={day.currentCount}
                        type={fieldTypes.text}
                        text={day.totalHours}
                      />
                      <TableDataView
                        itemCount={day.itemCount}
                        currentCount={day.currentCount}
                        type={fieldTypes.editText}
                        text={day.notes}
                      />
                    </tr>
                  )
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
    </>
  )
}
const TableDataView = (props: any) => {
  const {type, className, currentCount, itemCount} = props
  const text: any = props.text
  // const [note, setNote] = useState(text)
  // useEffect(() => {
  //   setNote(text)
  // }, [text])
  const renderFields = () => {
    switch (type) {
      case 'editText':
        return (
          <td className={`${className}`}>
            <input
              style={{minHeight: '30px', textAlign: 'right'}}
              className='form-control'

              // value={note}
              // disabled={true}
              // onChange={setNote}
            />
          </td>
        )
      case 'text':
        return <td className={`${className}`}>{text}</td>
      case 'select':
        return (
          <td>
            <select className='form-control-sm'>
              {text?.map((item: any) => {
                return <option value={item.id}> {item.name}</option>
              })}
            </select>
          </td>
        )
      case 'time':
        return (
          <td className={`${className}`}>
            <input
              type='time'
              value={text}
              onChange={(e) => {
                console.log(e.target.value)
              }}
            />
          </td>
        )
      case 'checkbox':
        return (
          <td className={`${className}`}>
            <input type='checkbox' className='form-control-sm' checked={text} />
          </td>
        )
    }
  }
  const createStartTimeInputs = () => {
    if (currentCount == 1) {
      return <>{/* <input type="time" value={startTime1} /> */}</>
    }
  }

  return <>{renderFields()}</>
}
const TableHeadView = (props: any) => {
  const {text, className} = props
  return <th className={`${className}`}>{text}</th>
}
export default Table
