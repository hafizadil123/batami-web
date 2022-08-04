import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select'
import './style.css'

const UploadDocumentSection = () => {
    const [categoryTypes, setCategoryTypes] = useState([])
    const [selectedCategoryType, setSelectedCategoryType] = useState({})
    const [documentTypes, setDocumentTypes] = useState([])
    const [selectedDocumentType, setSelectedDocumentType] = useState({})
    const logged_user_detail: any = localStorage.getItem('logged_user_detail');
    const loggedInUserDetails = JSON.parse(logged_user_detail);

    const baseUrl = process.env.REACT_APP_API_URL;
    const getDocumentsDetailsSaveEndpoint = `${baseUrl}/api/Inner/DocumentsDetailsSave`;
    const getDataEndpoint = `${baseUrl}/api/Inner/GetData`;
    const authHeader = {
        headers: {
            Authorization: `bearer ${loggedInUserDetails.access_token}`
        }
    }

    useEffect(() => {
        getDataAPI()
    }, [])

    const getDataAPI = async () => {
        const response = await axios.post(getDataEndpoint, {}, authHeader)

        if (response && response.data.result) {
            const { data } = response;
            const { documentCategoryTypes } = data;
            setCategoryTypes(getTheUpdatedCategoryTypes(documentCategoryTypes) || [])
            setDocumentTypes(documentCategoryTypes && documentCategoryTypes.length && getTheUpdatedCategoryTypes(documentCategoryTypes[0].documentTypes)|| [])
            console.log('Data : ', data);
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

    const getTheUpdatedDocumentTypes = (documentTypes: any) => {
        console.log('documentTypes : ', documentTypes);
    }


    return (
        <div className='upload_container'>
            <div className='inputView'>
                <p className='labelStyle'>Category Type</p>
                <Select
                    options={categoryTypes}
                    onChange={(item: any) => {
                        setDocumentTypes(getTheUpdatedCategoryTypes(item.documentTypes))
                        setSelectedCategoryType(item)
                    }} />
            </div>
            <div className='inputView'>
                <p>Document Type</p>
                <Select
                    options={documentTypes}
                    onChange={(item: any) => {
                        setSelectedDocumentType(item)
                    }} />
            </div>
            <div className='inputView'>
                <p>Description</p>
                <input />
            </div>
            <div className='inputView'>
                <p>file</p>
                <input type='file' />
            </div>
            <div className='inputView'>
                <p>Start Date</p>
                <input type='date' />
            </div>
            <div className='inputView'>
                <p>End Date</p>
                <input type='date' />
            </div>
            <div className='inputView'>
                <p>HMO Type</p>
                <input type='select' />
            </div>
            <div className='inputView'>
                <p>Marriage Date</p>
                <input type='date' />
            </div>
            <div className='inputView'>
                <p>Bank</p>
                <input type='select' />
            </div>
            <div className='inputView'>
                <p>Bank Branch</p>
                <input />
            </div>
            <div className='inputView'>
                <p>Bank Account</p>
                <input />
            </div>
            <div className='inputView'>
                <p>Report Date</p>
                <input type='date' />
            </div>
            <button>Save</button>
        </div>
    )
}

export default UploadDocumentSection;