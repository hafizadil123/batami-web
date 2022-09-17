/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import axios from 'axios'
import { PageTitle } from '../../../_metronic/layout/core'
import './tabs.css'
const DashboardPage: FC = () => {

  const [responseMessage, setResponseMessage] = useState('');
  const [note, setNote] = useState('');
  const [isStartDisabled, setStartDisabled] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isEndDisabled, setEndDisabled] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [activeRow,setActiveRow]=useState('attendance');
  const [activeTab,setActiveTab] = useState('attendance');
  const [absenceTypeItems,setAbsenceTypeItems] = useState([]);
  const [hebrewButtons,setHebrewButtons]=useState({ButtonAbsenceAllDay:"",ButtonAbsenceEnd:"",ButtonAbsenceStart:"",ButtonAttendanceEnd:"",ButtonAttendanceStart:"",ButtonSickAllDay:"",ButtonSickEnd:"",ButtonSickStart:""})
  const [buttonActions,setButtonActions]=useState({allowAbsenceAllDay:false,allowAbsenceEnd:false,allowAbsenceStart:false,allowAttendanceEnd:false,allowAttendanceStart:false,allowSickAllDay:false,allowSickEnd:false,allowSickStart:false})
  const [workActivityCodeItems, setWorkActivityCodeItems] = useState([]);
  const [latestStartTime,setLatestStartTime]=useState(null);
  const [activeAbsenceType,setActiveAbsenceType]=useState("");
  const [responseStatus, setResponseStatus] = useState<any>(false)
  const [tabs,setTabs] =useState([
   {
     id:1,
     label:"נוכחות",
     name: 'attendance',
   },
   {
     id:2,
     label:"היעדרות",
     name:'absence',
     
   },
   {
     id:3,
     name:'sick',
     label:"מחלה"
   }
  ])

  const logged_user_detail: any = localStorage.getItem('logged_user_detail');
  const loggedInUserDetails = JSON.parse(logged_user_detail);

  const baseUrl = process.env.REACT_APP_API_URL;
  const endPoints ={
    'ButtonAttendanceStart':'/api/Inner/AttendanceDailySaveAttendanceEntrance',
    'ButtonAbsenceStart':'/api/Inner/AttendanceDailySaveAbsenceEntrance',
    'ButtonSickStart':'/api/Inner/AttendanceDailySaveSickEntrance',
    'exitAnyEntranceAPI':'/api/Inner/AttendanceDailySaveAnyExit',
    "ButtonFullSickDay":"/api/Inner/AttendanceDailyFullSickDay",
    "ButtonFullAbsenceDay":"/api/Inner/AttendanceDailyFullAbsenceDay"
  }
  const getDailyAttendanceEndpoint = `${baseUrl}/api/Inner/GetAttendanceDaily`;
  const saveStartShiftEndpoint = `${baseUrl}/api/Inner/SaveStartShift`;
  const saveEndShiftEndpoint = `${baseUrl}/api/Inner/SaveEndShift`;
  const getDataEntPoint = `${baseUrl}/api/Inner/GetData`;
  const headerJson = {
    headers: {
      Authorization: `bearer ${loggedInUserDetails.access_token}`
    }
  }

  useEffect(() => {
    getDailyAttendance();
    setUserFirstName(localStorage.getItem('logged_in_user_firstName')|| '');
    if(!(localStorage.getItem('absenceTypes') || localStorage.getItem('buttonHebrewTexts'))){
      getDataApi();
    }else{
      let bHebewTexts=JSON.parse(localStorage.getItem('buttonHebrewTexts')|| '');
      let abTypes=JSON.parse(localStorage.getItem('absenceTypes')|| '');
      setHebrewButtonsText(bHebewTexts)
      setAbsenceTypeItems(abTypes);
      setActiveAbsenceType(abTypes[0].id)


    }
  }, []);
  const setHebrewButtonsText =(data:any[])=>{
    let buttonsHebrew:any ={}
    data.forEach(({id,name})=>{
      buttonsHebrew[id]=name;
    })
    setHebrewButtons(buttonsHebrew);
}

  const getSelectedTabData =(activeTab:string) =>{
    switch (activeTab){
      case 'attendance' :
        return  constructAttandancePageContent();
      case 'absence':
        return constructAbsencePageContent();
      case 'sick':
        return constructSickNessPageContent();
    }
  }

  const handleAPIForAttendance =async (endPoint:string,dataToSend:any) =>{
    //axios request
    const response = await axios.post(`${baseUrl}${endPoint}`, dataToSend, headerJson);
    if(response && response.data){
      const {data}=response;
      console.log({data})
      if(data.result===false){
        return alert(data.message)
      }
      getDailyAttendance();
    }


  }

  const setStartTimeStatus = (time: any) => {
    setStartDisabled(time != null);
    setStartTime(time)
  }

  const setEndTimeStatus = (time: any) => {
    setEndDisabled(time != null);
    setEndTime(time)
  }
  const constructSickNessPageContent = () => {
    return <>
      <div>
        <input type='text' className='form-control mt-7' placeholder='הערה' value={note} onChange={e=>setNote(e.target.value)} />
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px", cursor: "pointer" }}>
          <button
            style={{ marginLeft: '100px' }}
            disabled={!buttonActions.allowSickAllDay}
            type='submit'
            id='exit_time_button'
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonFullSickDay;
              let data={
                workActivityNote:note,
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5'>
            {hebrewButtons.ButtonSickAllDay}
          </button>

          <button
            style={{ marginLeft: '100px' }}
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowSickStart}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonSickStart;
              let data={
                workActivityNote:note,
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5'>
              {activeRow==='sick' && latestStartTime!==null ? latestStartTime : hebrewButtons.ButtonSickStart }
            {/* {hebrewButtons.ButtonSickStart} */}
          </button>
          <button
            style={{ marginLeft: '100px' }}
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowSickEnd}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.exitAnyEntranceAPI;
              let data={
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5'>
            {hebrewButtons.ButtonSickEnd}
          </button>
        </div>

      </div>
    </>
  }

  const constructAttandancePageContent = () => {
    return <>
      <div>
        {
          workActivityCodeItems && workActivityCodeItems.length && <select
            aria-label=''
            data-control='select2'
            data-placeholder='Work Activity Code'
            className='form-select form-select-sm form-select-solid mb7'
            disabled={false}
            value={selectedOption}
            onChange={handleChange}
          >
            {
              workActivityCodeItems.map(({ id, name }) => <option value={id}>{`${name}`}</option>)
            }
          </select>
        }
        <input type='text' className='form-control mt-7' placeholder='הערה' value={note} onChange={e=>setNote(e.target.value)} />
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px", cursor: "pointer" }}>
         
          <button
            style={{ marginLeft: '100px' }}
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowAttendanceStart}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonAttendanceStart;
              let data={
                workActivityCode:selectedOption,
                workActivityNote:note
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5'>
              {activeRow==='attendance' && latestStartTime!==null ? latestStartTime : hebrewButtons.ButtonAttendanceStart }
          </button>

          <button
            style={{ marginLeft: '100px' }}
            disabled={!buttonActions.allowAttendanceEnd}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.exitAnyEntranceAPI;
              let data={
              }
              handleAPIForAttendance(endPoint,data);
            }}
            type='submit'
            id='exit_time_button'
            className='btn btn-lg btn-secondary w-170-px mb-5'>
            {hebrewButtons.ButtonAttendanceEnd}
          </button>

         
        </div>

      </div>
    </>
  }
  
  const constructAbsencePageContent = () => {
    return <>
      <div>
        {
          absenceTypeItems && absenceTypeItems.length && <select
            aria-label=''
            data-control='select2'
            data-placeholder='Work Activity Code'
            className='form-select form-select-sm form-select-solid mb-7'
            disabled={false}
            value={activeAbsenceType}
            onChange={handleChangeAbsenceType}
          >
            {
              absenceTypeItems.map(({ id, name }) => <option value={id}>{`${name}`}</option>)
            }
          </select>
        }
        <input type='text' className='form-control mt-7' placeholder='הערה' value={note} onChange={e=>setNote(e.target.value)} />
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px", cursor: "pointer" }}>
        <button
            style={{ marginLeft: '100px' }}
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowAbsenceAllDay}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonFullAbsenceDay;
              let data={
                absenceCode:activeAbsenceType,
                // workActivityNote:note
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5'>
            {hebrewButtons.ButtonAbsenceAllDay}
          </button>
          <button
            style={{ marginLeft: '100px' }}
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowAbsenceStart}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonAbsenceStart;
              let data={
                absenceCode:activeAbsenceType,
                // workActivityNote:note
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5'>
              {activeRow==='absence' && latestStartTime!==null ? latestStartTime : hebrewButtons.ButtonAbsenceStart }
           
            {/* {hebrewButtons.ButtonAbsenceStart} */}
          </button>
          <button
            style={{ marginLeft: '100px' }}
            type='submit'
            disabled={!buttonActions.allowAbsenceEnd}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.exitAnyEntranceAPI;
              let data={
                // absenceCode:activeAbsenceType,
                // workActivityNote:note
              }
              handleAPIForAttendance(endPoint,data);
            }}
            id='exit_time_button'
            className='btn btn-lg btn-secondary w-170-px mb-5'>
            {hebrewButtons.ButtonAbsenceEnd}
          </button>

        </div>

      </div>
    </>
  }
  const handleChangeAbsenceType =(e:any) =>{
    setActiveAbsenceType(e.target.value)
  }
  const getDailyAttendance = async () => {
    const response = await axios.post(getDailyAttendanceEndpoint, {}, headerJson)

    if (response && response.data) {
      const { data } = response;
      const { result, message, currentDate,currentStatus , latestStartTime,rowType, latestEndTime, workActivityItems,allowAbsenceAllDay,allowAbsenceEnd,allowAbsenceStart,allowAttendanceEnd,allowAttendanceStart,allowSickAllDay,allowSickEnd,allowSickStart } = data;
      setResponseStatus(result);
      setActiveTab(rowType);
      setCurrentDate(currentDate);
      setCurrentStatus(currentStatus);
      setButtonActions({
        allowAbsenceAllDay,allowAbsenceEnd,allowAbsenceStart,allowAttendanceEnd,allowAttendanceStart,allowSickAllDay,allowSickEnd,allowSickStart
      })
      if (result) {
        setStartTimeStatus(latestStartTime);
        setLatestStartTime(latestStartTime);
        setActiveRow(rowType);
        setEndTimeStatus(latestEndTime)
        // eslint-disable-next-line no-lone-blocks
        if (workActivityItems && workActivityItems.length) {
          setWorkActivityCodeItems(workActivityItems)
          setSelectedOption(workActivityItems[0].id)
        }
      }
      setResponseMessage(message)
    }
  }
  const getDataApi = async () => {
    const response = await axios.post(getDataEntPoint, {}, headerJson)

    if (response && response.data) {
      const { data } = response;
      const {absenceTypes,buttonHebrewTexts}=data;
      localStorage.setItem('absenceTypes',JSON.stringify(absenceTypes));
      localStorage.setItem('buttonHebrewTexts',JSON.stringify(buttonHebrewTexts));
      setAbsenceTypeItems(absenceTypes);
      setActiveAbsenceType(absenceTypes[0].id)
      setHebrewButtonsText(buttonHebrewTexts);      
    }
  }

  const saveStartShiftTiming = async () => {
    const response = await axios.post(saveStartShiftEndpoint, {
      workActivityCode: selectedOption
    }, headerJson)

    if (response && response.data) {
      const { data } = response;
      const { result, message } = data;
      setResponseStatus(result);
      if (result) {
        setStartTimeStatus(data.time)
      }
      setResponseMessage(message)
    }
  }

  const saveEndShiftTiming = async () => {
    const response = await axios.post(saveEndShiftEndpoint, {
      workActivityCode: selectedOption
    }, headerJson)

    if (response && response.data) {
      const { data } = response;
      const { result, message } = data;
      setResponseStatus(result);
      if (result) {
        setEndTimeStatus(data.time)
      }
      setResponseMessage(message)
    }
  }

  const handleChange =  (event: any) => {
    setSelectedOption(event.target.value);
  }
  const handleChangeTab  = (id:any) => (event: any)=>{
    setActiveTab(id);
  }
const getSelectedClass =(id:any)=>{
  if(id==activeTab){
    return `active-tab`
  }else{
    return `general-tab`
  }
}
  return <>
    <div className='main-container-dashboard'>
      <ul style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} className="nav nav-tabs nav-tabs-line mb-7">
      {tabs.length && tabs.map(({name,id,label})=>{
        // ${name.charAt(0).toUpperCase()+name.slice(1)}
          return (

            <li key={id} className="nav-item" onClick={handleChangeTab(name)}>
               <span className={`nav-link tab ${getSelectedClass(name)} ` }  data-toggle="tab" >{`${label}`}</span>
            </li>
    
          )
      })}
      </ul>
      <div style={{textAlign:'center',fontWeight:'bold',marginBottom:'30px'}}>
        {/* <p>Here is your Status</p> */}
        <p>{`שלום ${userFirstName}`}</p>
        <p>{`נוכחות יומית : ${currentDate}`}</p>
        <p>{`סטטוס נוכחי : ${currentStatus}`}</p>
      </div>
       {getSelectedTabData(activeTab)}

     
      {responseMessage && <div
        style={{
          background: responseStatus ? '#4CAF50' : '#EF5350',
          color: 'white',
          padding: '5px',
          textAlign: 'center'
        }}>{responseMessage}</div>}
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
 {/* <button
            type='submit'
            id='entrance_time_button'
            className='btn btn-lg btn-primary mb-5 w-170-px'
            disabled={isStartDisabled || responseMessage != null}
            onClick={() => {
              if (selectedOption) {
                saveStartShiftTiming()
              } else {
                setResponseMessage('חובה לבחור ערך בשדה פעילות');
              }
            }}>
            {isStartDisabled ? startTime : `כניסה`}
          </button> */}

          // <button
          //   style={{ marginLeft: '100px' }}
          //   // onClick={() => {
          //   //   if (selectedOption && startTime != null) {
          //   //     saveEndShiftTiming()
          //   //   } else {
          //   //     setResponseMessage('חובה לבחור ערך בשדה פעילות');
          //   //   }
          //   // }}
          //   // disabled={isEndDisabled}
          //   type='submit'
          //   id='exit_time_button'
          //   className='btn btn-lg btn-secondary w-170-px mb-5'>
          //   {/* {isEndDisabled ? endTime : `יציאה`} */}
          //   {hebrewButtons.ButtonAbsenceStart}
          // </button>