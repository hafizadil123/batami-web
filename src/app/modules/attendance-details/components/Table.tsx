import React, {useEffect, useState} from 'react'
import {TableLabels, fieldTypes} from './../data'
type Props = {
  days: any[]
  absenceTypes: any[]
  updateDataHandler: (id: any, key: string, value: any) => any
  updateWorkActivitItemsHandler: (
    id: any,
    key1: string,
    key2: string,
    value: any,
    value2: any
  ) => any
  updateCount: (date: any) => any
}

const Table: React.FC<Props> = ({
  days,
  absenceTypes,
  updateDataHandler,
  updateWorkActivitItemsHandler,
  updateCount,
}) => {
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
                      <TableDataViewForStartTime
                        updateDataHandler={updateDataHandler}
                        startTime1={day.startTime1}
                        date={day.date}
                        startTime2={day.startTime2}
                        startTime3={day.startTime3}
                        startTime4={day.startTime4}
                        startTime5={day.startTime5}
                        currentCount={day.currentCount}
                        itemCount={day.itemCount}
                        updateCount={updateCount}
                      />
                      <TableDataViewForEndTime
                        updateDataHandler={updateDataHandler}
                        endTime1={day.endTime1}
                        date={day.date}
                        endTime2={day.endTime2}
                        endTime3={day.endTime3}
                        endTime4={day.endTime4}
                        endTime5={day.endTime5}
                        currentCount={day.currentCount}
                        itemCount={day.itemCount}
                      />
                      <TableDataViewForWorkActivityItems
                        date={day.date}
                        currentCount={day.currentCount}
                        itemCount={day.itemCount}
                        workActivityItems={day.workActivityItems}
                        workActivity1={day.workActivity1}
                        workActivity2={day.workActivity2}
                        workActivity3={day.workActivity3}
                        workActivity4={day.workActivity4}
                        workActivity5={day.workActivity5}
                        updateWorkActivitItemsHandler={updateWorkActivitItemsHandler}
                      />
                      <TableDataViewForWorkActivityNotes
                        date={day.date}
                        currentCount={day.currentCount}
                        itemCount={day.itemCount}
                        workActivityNote1={day.workActivityNote1}
                        workActivityNote2={day.workActivityNote2}
                        workActivityNote3={day.workActivityNote3}
                        workActivityNote4={day.workActivityNote4}
                        workActivityNote5={day.workActivityNote5}
                        updateDataHandler={updateDataHandler}
                      />
                      {/* <TableDataView
                        itemCount={day.itemCount}
                        type={fieldTypes.select}
                        currentCount={day.currentCount}
                        text={absenceTypes}
                      /> */}
                      <TableDataViewForAbsenceTypes
                        absenceTypes={absenceTypes}
                        updateWorkActivitItemsHandler={updateWorkActivitItemsHandler}
                        absenceCode={day.absenceCode}
                        date={day.date}
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
                      <TableDataViewForNote
                        itemCount={day.itemCount}
                        currentCount={day.currentCount}
                        notes={day.notes}
                        updateDataHandler={updateDataHandler}
                        date={day.date}
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
const TableDataViewForAbsenceTypes = (props: any) => {
  const {updateWorkActivitItemsHandler, absenceTypes, date, absenceCode} = props
  const getAbsenceName = (id: any) => {
    const item = absenceTypes.find((item: any) => item.id == id)
    return item?.name
  }
  const renderFields = () => {
    return (
      <>
        <select
          className='form-control-sm'
          value={absenceCode}
          onChange={(e) => {
            const value = e.target.value
            const absenceName = getAbsenceName(value)
            updateWorkActivitItemsHandler(
              date,
              'absenceCode',
              'absenceName',
              e.target.value,
              absenceName
            )
          }}
        >
          {absenceTypes?.map((item: any) => {
            return <option value={item.id}> {item.name}</option>
          })}
        </select>
      </>
    )
  }
  return <>{renderFields()}</>
}
const TableDataViewForNote = (props: any) => {
  const {notes, updateDataHandler, date} = props
  const [notesLocal, setNotes] = useState('')
  useEffect(() => {
    setNotes(notes)
  }, [notes])
  const renderFields = () => {
    return (
      <>
        <input
          type='text'
          className='form-control-sm'
          value={notesLocal}
          onChange={(e) => {
            setNotes(e.target.value)
          }}
          onBlur={() => {
            updateDataHandler(date, 'notes', notesLocal)
            console.log(notesLocal)
          }}
        />
      </>
    )
  }
  return <>{renderFields()}</>
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
  return <>{renderFields()}</>
}
const TableDataViewForStartTime = (props: any) => {
  const {
    itemCount,
    startTime1,
    startTime2,
    startTime3,
    startTime4,
    startTime5,
    updateDataHandler,
    date,
    updateCount,
  } = props
  const renderFields = () => {
    switch (itemCount) {
      case 1:
        return (
          <>
            <td className={``}>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime1}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime1', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  onClick={(e) => {
                    updateCount(date)
                  }}
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
            </td>
          </>
        )
      case 2:
        return (
          <>
            <td className={``}>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime1}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime1', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime2}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime2', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  onClick={(e) => {
                    updateCount(date)
                  }}
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
            </td>
          </>
        )
      case 3:
        return (
          <>
            <td className={``}>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime1}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime1', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime2}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime2', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  value={startTime3}
                  className='m-1 form-control-sm'
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime3', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  onClick={(e) => {
                    updateCount(date)
                  }}
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
            </td>
          </>
        )
      case 4:
        return (
          <>
            <td className={``}>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime1}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime1', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime2}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime2', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  value={startTime3}
                  className='m-1 form-control-sm'
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime3', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime4}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime4', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  onClick={(e) => {
                    updateCount(date)
                  }}
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
            </td>
          </>
        )
      case 5:
        return (
          <>
            <td className={``}>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime1}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime1', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime2}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime2', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  value={startTime3}
                  className='m-1 form-control-sm'
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime3', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime4}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime4', e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                >
                  +
                </span>
              </div>
              <div style={{display: 'flex'}}>
                <input
                  type='time'
                  className='m-1 form-control-sm'
                  value={startTime5}
                  onChange={(e) => {
                    updateDataHandler(date, 'startTime5', e.target.value)

                    console.log(e.target.value)
                  }}
                />
                <span
                  style={{height: '50px', lineHeight: '50px', fontSize: '3rem', cursor: 'pointer'}}
                ></span>
              </div>
            </td>
          </>
        )
    }
  }
  return <>{renderFields()}</>
}
const TableDataViewForEndTime = (props: any) => {
  const {
    type,
    className,
    currentCount,
    itemCount,
    endTime1,
    endTime2,
    endTime3,
    endTime4,
    endTime5,
    updateDataHandler,
    date,
  } = props
  const renderFields = () => {
    switch (itemCount) {
      case 1:
        return (
          <>
            <td className={``}>
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime1}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime1', e.target.value)
                  console.log(e.target.value)
                }}
              />
            </td>
          </>
        )
      case 2:
        return (
          <>
            <td className={``}>
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime1}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime1', e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime2}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime2', e.target.value)
                  console.log(e.target.value)
                }}
              />
            </td>
          </>
        )
      case 3:
        return (
          <>
            <td className={``}>
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime1}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime1', e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime2}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime2', e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime3}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime3', e.target.value)
                  console.log(e.target.value)
                }}
              />
            </td>
          </>
        )
      case 4:
        return (
          <>
            <td className={``}>
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime1}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime1', e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime2}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime2', e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime3}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime3', e.target.value)

                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime4}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime4', e.target.value)

                  console.log(e.target.value)
                }}
              />
            </td>
          </>
        )
      case 5:
        return (
          <>
            <td className={``}>
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime1}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime1', e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime2}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime2', e.target.value)
                  console.log(e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime3}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime3', e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime4}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime4', e.target.value)
                  console.log(e.target.value)
                }}
              />
              <input
                type='time'
                className='m-1 form-control-sm'
                value={endTime5}
                onChange={(e) => {
                  updateDataHandler(date, 'endTime5', e.target.value)
                  console.log(e.target.value)
                }}
              />
            </td>
          </>
        )
    }
  }
  return <>{renderFields()}</>
}
const TableDataViewForWorkActivityItems = (props: any) => {
  const {
    itemCount,
    workActivityItems,
    workActivity1,
    workActivity2,
    workActivity3,
    workActivity4,
    workActivity5,
    updateWorkActivitItemsHandler,
    date,
  } = props
  const getActivityName = (id: any) => {
    const item = workActivityItems.find((item: any) => item.id == id)
    return item?.name
  }
  const renderFields = () => {
    switch (itemCount) {
      case 1:
        return (
          <>
            <td>
              <select
                value={workActivity1}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity1',
                    'workActivityName1',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
            </td>
          </>
        )
      case 2:
        return (
          <>
            <td>
              <select
                value={workActivity1}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity1',
                    'workActivityName1',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity2}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity2',
                    'workActivityName2',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
            </td>
          </>
        )
      case 3:
        return (
          <>
            <td>
              <select
                value={workActivity1}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity1',
                    'workActivityName1',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity2}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity2',
                    'workActivityName2',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity3}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity3',
                    'workActivityName3',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
            </td>
          </>
        )
      case 4:
        return (
          <>
            <td>
              <select
                value={workActivity1}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity1',
                    'workActivityName1',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity2}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity2',
                    'workActivityName2',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity3}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity3',
                    'workActivityName3',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity4}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity4',
                    'workActivityName4',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
            </td>
          </>
        )
      case 5:
        return (
          <>
            <td>
              <select
                value={workActivity1}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity1',
                    'workActivityName1',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity2}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity2',
                    'workActivityName2',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity3}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity3',
                    'workActivityName3',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity4}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity4',
                    'workActivityName4',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
              <select
                value={workActivity5}
                onChange={(e) => {
                  const value = e.target.value
                  const activityName = getActivityName(value)
                  updateWorkActivitItemsHandler(
                    date,
                    'workActivity5',
                    'workActivityName5',
                    e.target.value,
                    activityName
                  )
                }}
                className='form-control-sm'
              >
                {workActivityItems?.map((item: any) => {
                  return <option value={item.id}> {item.name}</option>
                })}
              </select>
            </td>
          </>
        )
    }
  }
  return <>{renderFields()}</>
}
const TableDataViewForWorkActivityNotes = (props: any) => {
  const {
    itemCount,
    workActivityNote1,
    workActivityNote2,
    workActivityNote3,
    workActivityNote4,
    workActivityNote5,
    date,
    updateDataHandler,
  } = props
  const [workActivityNoteLocal1, setWorkAcivityNote1] = useState('')
  const [workActivityNoteLocal2, setWorkAcivityNote2] = useState('')
  const [workActivityNoteLocal3, setWorkAcivityNote3] = useState('')
  const [workActivityNoteLocal4, setWorkAcivityNote4] = useState('')
  const [workActivityNoteLocal5, setWorkAcivityNote5] = useState('')
  useEffect(() => {
    setWorkAcivityNote1(workActivityNote1)
    setWorkAcivityNote2(workActivityNote2)
    setWorkAcivityNote3(workActivityNote3)
    setWorkAcivityNote4(workActivityNote4)
    setWorkAcivityNote5(workActivityNote5)
  }, [
    workActivityNote1,
    workActivityNote2,
    workActivityNote3,
    workActivityNote4,
    workActivityNote5,
  ])
  const renderFields = () => {
    switch (itemCount) {
      case 1:
        return (
          <>
            <td>
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal1}
                onChange={(e) => {
                  setWorkAcivityNote1(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote1', workActivityNoteLocal1)
                  console.log(workActivityNoteLocal1)
                }}
              />
            </td>
          </>
        )
      case 2:
        return (
          <>
            <td>
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal1}
                onChange={(e) => {
                  setWorkAcivityNote1(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote1', workActivityNoteLocal1)
                  console.log(workActivityNoteLocal1)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal2}
                onChange={(e) => {
                  setWorkAcivityNote2(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote2', workActivityNoteLocal2)
                  console.log(workActivityNoteLocal2)
                }}
              />
            </td>
          </>
        )
      case 3:
        return (
          <>
            <td>
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal1}
                onChange={(e) => {
                  setWorkAcivityNote1(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote1', workActivityNoteLocal1)
                  console.log(workActivityNoteLocal1)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal2}
                onChange={(e) => {
                  setWorkAcivityNote2(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote2', workActivityNoteLocal2)
                  console.log(workActivityNoteLocal2)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal3}
                onChange={(e) => {
                  setWorkAcivityNote3(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote3', workActivityNoteLocal3)
                  console.log(workActivityNoteLocal3)
                }}
              />
            </td>
          </>
        )
      case 4:
        return (
          <>
            <td>
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal1}
                onChange={(e) => {
                  setWorkAcivityNote1(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote1', workActivityNoteLocal1)
                  console.log(workActivityNoteLocal1)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal2}
                onChange={(e) => {
                  setWorkAcivityNote2(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote2', workActivityNoteLocal2)
                  console.log(workActivityNoteLocal2)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal3}
                onChange={(e) => {
                  setWorkAcivityNote3(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote3', workActivityNoteLocal3)
                  console.log(workActivityNoteLocal3)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal4}
                onChange={(e) => {
                  setWorkAcivityNote4(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote4', workActivityNoteLocal4)
                  console.log(workActivityNoteLocal4)
                }}
              />
            </td>
          </>
        )
      case 5:
        return (
          <>
            <td>
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal1}
                onChange={(e) => {
                  setWorkAcivityNote1(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote1', workActivityNoteLocal1)
                  console.log(workActivityNoteLocal1)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal2}
                onChange={(e) => {
                  setWorkAcivityNote2(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote2', workActivityNoteLocal2)
                  console.log(workActivityNoteLocal2)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal3}
                onChange={(e) => {
                  setWorkAcivityNote3(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote3', workActivityNoteLocal3)
                  console.log(workActivityNoteLocal3)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal4}
                onChange={(e) => {
                  setWorkAcivityNote4(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote4', workActivityNoteLocal4)
                  console.log(workActivityNoteLocal4)
                }}
              />
              <input
                type='text'
                className='form-control-sm'
                value={workActivityNoteLocal5}
                onChange={(e) => {
                  setWorkAcivityNote5(e.target.value)
                }}
                onBlur={(e) => {
                  updateDataHandler(date, 'workActivityNote5', workActivityNoteLocal5)
                  console.log(workActivityNoteLocal5)
                }}
              />
            </td>
          </>
        )
    }
  }
  return <>{renderFields()}</>
}
const TableHeadView = (props: any) => {
  const {text, className} = props
  return <th className={`${className}`}>{text}</th>
}
export default Table
