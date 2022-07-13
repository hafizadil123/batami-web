/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import axios from 'axios'
import { PageTitle } from '../../../_metronic/layout/core'

const DashboardPage: FC = () => {
  
  const [responseMessage, setResponseMessage] = useState('');
  const [isStartDisabled,setStartDisabled] = useState(false);
  const [startTime,setStartTime] = useState(null);
  const [isEndDisabled,setEndDisabled] = useState(false);
  const [displayWorkActivity,setDisplayWorkActivity] = useState(false);
  const [endTime,setEndTime] = useState(null);
  const [selectedOption,setSelectedOption] = useState(0);
  const [workActivityCodeItems, setWorkActivityCodeItems] = useState([]);

  const logged_user_detail: any = localStorage.getItem('logged_user_detail');
  const loggedInUserDetails = JSON.parse(logged_user_detail);

  const baseUrl = process.env.REACT_APP_API_URL;
  const getDailyAttendanceEndpoint = `${baseUrl}/api/Inner/GetAttendanceDaily`;
  const saveStartShiftEndpoint = `${baseUrl}/api/Inner/SaveStartShift`;
  const saveEndShiftEndpoint = `${baseUrl}/api/Inner/SaveEndShift`;
  const headerJson = {
    headers: {
      Authorization: `bearer ${loggedInUserDetails.access_token}`
    }
  }

  useEffect(() => {
    getDailyAttendance();
  },[]);

  const setStartTimeStatus = (time: any) => {
    setStartDisabled(time != null);
    setStartTime(time)
  }

  const setEndTimeStatus = (time: any) => {
    console.log('Time : ',time);
    setEndDisabled(time != null);
    setEndTime(time)
  }

  const getDailyAttendance = async() => {
      const response = await axios.post(getDailyAttendanceEndpoint, {},headerJson)

      if(response && response.data.result){
        const {data} = response;
        const {result, message, latestStartTime, latestEndTime, workActivityItems, displayWorkActivity} = data;
        if(result){
          setStartTimeStatus(latestStartTime)
          setEndTimeStatus(latestEndTime)
          setDisplayWorkActivity(displayWorkActivity)
          // eslint-disable-next-line no-lone-blocks
          if(workActivityItems && workActivityItems.length){
            setWorkActivityCodeItems(workActivityItems)
            console.log('Data : ',workActivityItems);
            setSelectedOption(workActivityItems[0].id)
          }
        }
        setResponseMessage(message)
      }
  }

  const saveStartShiftTiming = async() => {
    const response = await axios.post(saveStartShiftEndpoint,{
      workActivityCode: selectedOption
    },headerJson)

    if(response && response.data.result){
      const {data} = response;
      const {result, message} = data;
      if(result){
        setStartTimeStatus(data.time)
      }
      setResponseMessage(message)
    }
  }

  const saveEndShiftTiming = async() => {
    const response = await axios.post(saveEndShiftEndpoint,{
      workActivityCode: selectedOption
    },headerJson)

    if(response && response.data.result){
      const {data} = response;
      const {result, message} = data;
      if(result){
        setEndTimeStatus(data.time)
      }
      setResponseMessage(message)
    }
  }

  const handleChange = (event: any) => {
    console.log('SelectedValue : ',event.target.value);
    setSelectedOption(event.target.value);
  }

  return <>
   <div>
    {displayWorkActivity && workActivityCodeItems && workActivityCodeItems.length && <select
      aria-label=''
      data-control='select2'
      data-placeholder='Work Activity Code'
      className='form-select form-select-sm form-select-solid'
      disabled={false}
      value={selectedOption}
      onChange={handleChange}>
      {
        workActivityCodeItems.map(({id, name}) => <option value={id}>{`${name}`}</option>)
      }
    </select>
    }

    <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"100px", cursor:"pointer" }}>
    <button 
      onClick={() => {
        if(displayWorkActivity && selectedOption && startTime != null){
          saveEndShiftTiming()
        }else{
          setResponseMessage('חובה לבחור ערך בשדה פעילות');
        }
      }}
      disabled={isEndDisabled}
      type='submit' 
      id='exit_time_button' 
      className='btn btn-lg btn-secondary mb-5'>
      {isEndDisabled ? endTime : `Exit`}
    </button>
    <button 
      type='submit' 
      id='entrance_time_button'  
      className='btn btn-lg btn-primary mb-5'
      disabled={isStartDisabled || responseMessage != null}
      onClick={() => {
        if(displayWorkActivity && selectedOption){
          saveStartShiftTiming()
        }else {
          setResponseMessage('חובה לבחור ערך בשדה פעילות');
        }
      }}>
      {isStartDisabled ? startTime : `Entrance`}
    </button>
    </div>
    {responseMessage && <div>{responseMessage}</div>}
  </div>
  </>
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
