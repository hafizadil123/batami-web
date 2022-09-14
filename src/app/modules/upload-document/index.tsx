import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select'
import './style.css'

const UploadDocumentSection = () => {
    const [categoryTypes, setCategoryTypes] = useState<any[]>([])
    const [selectedCategoryType, setSelectedCategoryType] = useState({})
    const [selectedCategoryTypeId, setSelectedCategoryTypeId] = useState(0)
    const [documentTypes, setDocumentTypes] = useState<any[]>([])
    const [hmoTypes, setHmoTypes] = useState<any[]>([])
    const [banks, setBanks] = useState<any[]>([])
    const [selectedDocumentType, setSelectedDocumentType] = useState({})
    const [selectedHMO, setSelectedHMO] = useState<any>({})
    const [selectedBank, setSelectedBank] = useState<any>({})
    const [selectedDocumentTypeId, setSelectedDocumentTypeId] = useState(0)
    const [file, setFile] = useState<any>(null)

    const inputFileRef = React.createRef<any>()
    const [responseStatus, setResponseStatus] = useState<any>(false);
    const [description, setDescription] = useState<any>('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [marriageDate, setMarriageDate] = useState('')
    const [bankBranch, setBankBranch] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [reportDate, setReportDate] = useState('')
    const logged_user_detail: any = localStorage.getItem('logged_user_detail');
    const loggedInUserDetails = JSON.parse(logged_user_detail);

    const [isValid, setValid] = useState<any>(true)
    const [errorMessage, setErrorMessage] = useState<any>('')

    const baseUrl = process.env.REACT_APP_API_URL;
    const getDocumentsDetailsSaveEndpoint = `${baseUrl}/api/Inner/DocumentsDetailsSave`;
    const getCheckDatesEndpoint = `${baseUrl}/api/Inner/CheckDates`;
    const getDataEndpoint = `${baseUrl}/api/Inner/GetData`;
    const authHeader = {
        headers: {
            Authorization: `bearer ${loggedInUserDetails.access_token}`
        }
    }

    const checkAvailableDates = async () => {
        const response = await axios.post(getDocumentsDetailsSaveEndpoint, {
            code: selectedCategoryTypeId,
            startDate,
            endDate
        }, authHeader)
    }

    const isValidated = () => {
        let isValidFlag = true
        if (selectedDocumentTypeId == 24) {
            if (startDate == '') {
                isValidFlag = (false)
                setErrorMessage('יש לבחור בתאריך התחלה')
            }
            if (startDate >= endDate) {
                isValidFlag = (false)
                setErrorMessage('תאריך ההתחלה חייב להיות קטן מתאריך הסיום')
            }
        }
        if (selectedDocumentTypeId == 43) {
            if (marriageDate == '') {
                isValidFlag = (false)
                setErrorMessage('יש לבחור תאריך נישואין')
            }
        }
        if (selectedDocumentTypeId == 5) {
            if (selectedBank == '') {
                isValidFlag = (false)
                setErrorMessage('חובה לבחור בנק')
            }
            if (bankBranch == '') {
                isValidFlag = (false)
                setErrorMessage('יש להיכנס לסניף הבנק')
            }
            if (bankAccount == '') {
                isValidFlag = (false)
                setErrorMessage('יש להזין חשבון בנק')
            }
        }
        if ([23, 40].includes(selectedDocumentTypeId)) {
            if (reportDate == '') {
                isValidFlag = (false)
                setErrorMessage('יש לבחור בתאריך דיווח')
            }
        }

        setValid(isValidFlag)
        return isValidFlag
    }

    const postImageToServer = async () => {
        if (isValidated()) {
            console.log('Data : ', file);
            const data = new FormData()


            //   data.append('code', selectedCategoryTypeId !=0 ? selectedCategoryTypeId.toString() : ''+undefined);
            selectedDocumentTypeId != 0 && data.append('DocumentTypeCode', selectedDocumentTypeId.toString());
            description && data.append('description', description.toString());
            startDate && data.append('AttendanceStartDate', moment(startDate).format('DD/MM/YYYY').toString());
            endDate && data.append('AttendanceEndDate', moment(endDate).format('DD/MM/YYYY').toString());
            file && data.append('file', file);
            marriageDate && data.append('MarriageDate', moment(marriageDate).format('DD/MM/YYYY').toString());
            selectedHMO && data.append('hmoTypeCode', selectedHMO.id.toString());
            true && data.append('bankCode', selectedBank.id.toString());
            bankBranch && data.append('bankBranch', bankBranch.toString());
            bankAccount && data.append('bankAccount', bankAccount.toString());
            reportDate && data.append('reportDate', reportDate.toString());

            const response = await axios.post(getDocumentsDetailsSaveEndpoint, data, authHeader)
            console.log('response : ',response)
            if (response && response.data) {
                const { data } = response
                const { result, message } = data;
               
                setResponseStatus(result);
                if (!result)
                    setErrorMessage(message)
                else
                    setErrorMessage('')
            }
        }
    }

    useEffect(() => {
        getDataAPI()
    }, [])

    const getDataAPI = async () => {
        const response = await axios.post(getDataEndpoint, {}, authHeader)

        if (response && response.data.result) {
            const { data } = response;
            const { documentCategoryTypes, hmoTypes, banks } = data;
            // === Assign list and value to Category Type === //
            setCategoryTypes(getTheUpdatedCategoryTypes(documentCategoryTypes) || [])
            setSelectedCategoryType(documentCategoryTypes[0] || {});
            setSelectedCategoryTypeId(documentCategoryTypes[0].id || 0);
            // === Assign list and value to Document Type === //
            setDocumentTypes(documentCategoryTypes && documentCategoryTypes.length && getTheUpdatedCategoryTypes(documentCategoryTypes[0].documentTypes) || [])
            setSelectedDocumentType(documentCategoryTypes[0] || {})
            setSelectedDocumentTypeId(documentCategoryTypes[0].id || 0)
            // === Assign list and value to HMO Type === //
            setHmoTypes(getTheUpdatedCategoryTypes(hmoTypes) || [])
            setSelectedHMO(hmoTypes[0] || {})
            // === Assign list and value to Category Type === //
            setBanks(getTheUpdatedCategoryTypes(banks) || [])
            setSelectedBank(banks[0] || {})
        }
    }

    const getTheUpdatedCategoryTypes = (documentCategoryTypes: any) => {
        const temp: any = []

        documentCategoryTypes.forEach((item: any) => {
            const { id, name } = item;
            temp.push({
                value: id,
                label: name,
                ...item
            })
        })
        return temp || []
    }

    function handleChange(event: any) {
        const selectedFile = event.target.files[0];
        if ((selectedFile.size / 1000000) < 2) {
            console.log('DDD : ', selectedFile);
            setFile(selectedFile);
        } else {
            inputFileRef.current.value = ''
        }
    }

    return (
        <div>
            <div className='upload_container'>
                <div className='inputView'>
                    <p className='labelStyle'>Category Type</p>
                    <div className='sectionOne'>
                        <select style={{ width: '100%' }}
                            onChange={(event: any) => {
                                const selectedItem = categoryTypes.filter((item: any) => item.id == event.target.value)[0] || {}
                                setDocumentTypes(getTheUpdatedCategoryTypes(selectedItem && selectedItem.documentTypes))
                                setSelectedCategoryType(selectedItem)
                                setSelectedCategoryTypeId(selectedItem.id)
                                console.log('DocumentTypes : ', selectedItem.documentTypes);
                            }}>
                            {
                                categoryTypes.map((item: any, index) => {
                                    return <option key={index} value={item.id} >{item.name || ''}</option>
                                })
                            }
                        </select>
                    </div>

                </div>
                {true && <div className='inputView'>
                    <p className='labelStyle'>Document Type</p>
                    <div className='sectionOne'>
                        <select style={{ width: '100%' }}
                            onChange={(event: any) => {
                                const selectedItem = documentTypes.filter((item: any) => item.id == event.target.value)[0] || {}
                                setSelectedDocumentType(selectedItem)
                                setSelectedDocumentTypeId(selectedItem.id)
                            }}>
                            {
                                documentTypes.map((item: any, index) => {
                                    return <option key={index} value={item.id} >{item.name || ''}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                }

                <div className='inputView'>
                    <p className='labelStyle'>Description</p>
                    <div className='sectionOne'>
                        <input
                            value={description}
                            className='sectionOneField'
                            maxLength={100}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className='inputView'>
                    <p className='labelStyle'>file</p>
                    <div className='sectionOne'>
                        <input
                            className='sectionOneField'
                            ref={inputFileRef}
                            type='file'
                            onChange={handleChange} accept='.docx, .pdf, .png, .jpg,.jepg ,.gif' />
                    </div>
                </div>
                {
                    selectedDocumentTypeId === 24 && <div className='inputView'>
                        <p className='labelStyle'>Start Date</p>
                        <div className='sectionOne'>
                            <input
                                type='date'
                                className='sectionOneField'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                    </div>
                }
                {
                    selectedDocumentTypeId === 24 && <div className='inputView'>
                        <p className='labelStyle'>End Date</p>
                        <div className='sectionOne'>
                            <input
                                type='date'
                                className='sectionOneField'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                }
                {
                    selectedDocumentTypeId === 24 && <div className='inputView'>
                        <p className='labelStyle'>HMO Type</p>
                        <div className='sectionOne'>
                            <select
                                className='sectionOneField'
                                value={selectedHMO.id}
                                onChange={(event: any) => {
                                    const selectedItem = hmoTypes.filter((item: any) => item.id == event.target.value)[0] || {}
                                    setSelectedHMO(selectedItem)
                                }}>
                                {
                                    hmoTypes.map((item: any, index) => {
                                        return <option key={index} value={item.id} >{item.name || ''}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                }
                {
                    selectedDocumentTypeId === 43 && <div className='inputView'>
                        <p className='labelStyle'>Marriage Date</p>
                        <div className='sectionOne'>
                            <input
                                type='date'
                                className='sectionOneField'
                                value={marriageDate}
                                onChange={(e) => setMarriageDate(e.target.value)} />
                        </div>
                    </div>
                }
                {
                    selectedDocumentTypeId === 5 && <div className='inputView'>
                        <p className='labelStyle'>Bank</p>
                        <div className='sectionOne'>
                            <select
                                className='sectionOneField'
                                value={selectedBank.id}
                                onChange={(event: any) => {
                                    const selectedItem = banks.filter((item: any) => item.id == event.target.value)[0] || {}
                                    setSelectedBank(selectedItem)
                                }}>
                                {
                                    banks.map((item: any, index) => {
                                        return <option key={index} value={item.id} >{item.name || ''}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                }
                {
                    selectedDocumentTypeId === 5 && <div className='inputView'>
                        <p className='labelStyle'>Bank Branch</p>
                        <div className='sectionOne'>
                            <input
                                value={bankBranch}
                                onChange={(e) => setBankBranch(e.target.value)}
                                className='sectionOneField'
                                maxLength={3} />
                        </div>
                    </div>
                }
                {
                    selectedDocumentTypeId === 5 && <div className='inputView'>
                        <p className='labelStyle'>Bank Account</p>
                        <div className='sectionOne'>
                            <input
                                value={bankAccount}
                                className='sectionOneField'
                                maxLength={9}
                                onChange={(e) => setBankAccount(e.target.value)} />
                        </div>
                    </div>
                }
                {
                    [23, 40].includes(selectedDocumentTypeId) && <div className='inputView'>
                        <p className='labelStyle'>Report Date</p>
                        <div className='sectionOne'>
                            <input
                                type='month'
                                className='sectionOneField'
                                value={reportDate}
                                onChange={(e) => setReportDate(e.target.value)} />
                        </div>
                    </div>
                }
            </div>
            <button className='btn btn-lg btn-primary mb-5' onClick={() => {
                postImageToServer()
            }}>Save</button>
            {errorMessage && <div className='message_section' style={{ background: responseStatus ? '#4CAF50' : '#EF5350' }}>
                {errorMessage}
            </div>
            }
        </div>
    )
}

export default UploadDocumentSection;