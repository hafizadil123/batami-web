import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import { colors, listData, parentKeys, fieldTypes, listOneFields } from './data'

const SectionDataView = (props: any) => {
    const { data, hasSecondYear, sectionTitle, parentKey, onFieldClicked } = props;
    return (
        <div style={{ flex: 1, margin: '5px' }}>
            <ListHeaderSection headerTitle={`${sectionTitle || ''}`} hasSecondYear={hasSecondYear} />
            {data && data.map((item: any, index: any) => {
                const { yearOneValue, yearTwoValue } = item;
                if (item.parentKey === parentKey &&
                    yearOneValue != null && yearOneValue != '' &&
                    yearTwoValue != null && yearTwoValue != '') {
                    return <AttendaneDetailItem
                        key={index}
                        item={item}
                        hasSecondYear={hasSecondYear}
                        onFieldClicked={onFieldClicked} />
                }
            })
            }
        </div>
    )
}

const ListHeaderSection = (props: any) => {
    const { headerTitle, hasSecondYear } = props;
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {hasSecondYear && <p style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{`Year 2`}</p>}
                <p style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{`Year 1`}</p>
                <p style={{ textAlign: 'center', flex: 3, fontWeight: 'bold' }}>{headerTitle}</p>
            </div>
        </>
    )
}

const AttendaneDetailItem = (props: any) => {
    const { item, hasSecondYear, onFieldClicked } = props
    const { yearTwoValue, yearOneValue, listNo, type, color, label } = item;
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
                {hasSecondYear && <div style={{ flex: 1 }} >
                    <p
                        style={{ padding: '0px 5px', margin: '0px 3px', background: '#ffffff', height: '20px', border: '1px solid #000', textAlign: 'center', cursor: `${[listNo, type].includes(0) ? 'pointer' : 'default'}` }}
                        onClick={() => {
                            if (![listNo, type].includes(0)) {
                                onFieldClicked(listNo, type, 2)
                            }
                        }}>{`${yearTwoValue || ''}`}</p>
                </div>
                }
                <div style={{ flex: 1 }}>
                    <p
                        style={{ padding: '0px 5px', margin: '0px 3px', background: '#ffffff', height: '20px', border: '1px solid #000', textAlign: 'center', cursor: `${[listNo, type].includes(0) ? 'pointer' : 'default'}` }}
                        onClick={() => {
                            if (![listNo, type].includes(0)) {
                                onFieldClicked(listNo, type, 1)
                            }
                        }}>{`${yearOneValue || ''}`}</p>
                </div>
                <p
                    style={{ marginLeft: '5px', color: color, flex: 3, textAlign: 'right', fontSize: '15px' }}
                    onClick={() => {
                        onFieldClicked(1, 2, 1)
                    }}
                >{`${label}`}</p>
            </div>
        </>
    )
}

const TableDataView = (props: any) => {
    const { flexValue, text, type } = props;
    const [note, setNote] = useState(text);
    console.log('Props : ', props)

    const renderFields = () => {
        switch (type) {
            case fieldTypes.editText:
                return (<td style={{ display: 'flex', flex: flexValue || 1, border: '1px solid black', padding: '10px 5px' }}>
                    <input
                        style={{ width: '100%', minHeight: '30px', textAlign: 'right' }}
                        value={note}
                        onChange={setNote}
                    />
                </td>)
            case fieldTypes.checkbox:
                return (<td style={{ display: 'flex', flex: flexValue || 1, border: '1px solid black', padding: '10px 5px', justifyContent: 'center', alignItems: 'center' }}>
                    <input
                        type='checkbox'
                        checked={text}
                        disabled
                    />
                </td>)
            case fieldTypes.text:
                return (<td style={{ display: 'flex', flex: flexValue || 1, border: '1px solid black', padding: '10px 5px', justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </td>)
        }
    }

    return (
        <>
            {
                renderFields()
            }
        </>


    )
}

const TableHeadView = (props: any) => {
    const { flexValue, text } = props;
    return (
        <th style={{ display: 'flex', flex: flexValue || 1, border: '1px solid black', padding: '10px 5px', justifyContent: 'center', alignItems: 'center' }}>{text}</th>
    )
}

const MainAttendance = () => {
    const [data, setData] = useState(listData);
    const [reportData, setReportData] = useState([]);
    const [hasSecondYear, setHasSecondYear] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [alertList, setAlertList] = useState([])

    const logged_user_detail: any = localStorage.getItem('logged_user_detail');
    const loggedInUserDetails = JSON.parse(logged_user_detail);

    const baseUrl = process.env.REACT_APP_API_URL;
    const getAttendanceSummaryEndpoint = `${baseUrl}/api/Inner/GetAttendanceSummary`;
    const getAttendanceShowListEndpoint = `${baseUrl}/api/Inner/AttendanceShowList`;
    const getReportListEndpoint = `${baseUrl}/api/Inner/GetReportList`;
    const authHeader = {
        headers: {
            Authorization: `bearer ${loggedInUserDetails.access_token}`
        }
    }

    useEffect(() => {
        getAttendanceSummary()
        renderReportList();
    }, [])

    const getAttendanceSummary = async () => {
        const response = await axios.post(getAttendanceSummaryEndpoint, {},
            authHeader)

        if (response && response.data.result) {
            const { data } = response;
            const { result, message, isHasSecondYear } = data;
            setHasSecondYear(isHasSecondYear);
            renderDataWithFields(data);
        }
    }

    const getAttendanceShowList = async (list: any, type: any, year: any) => {
        setShowModal(true);
        const response = await axios.post(getAttendanceShowListEndpoint, {
            list,
            type,
            year,
            sortBy: 'code',
            sortOrder: 'asc',
            page: 1,
            rows: 15
        }, authHeader)

        if (response && response.data.result) {
            const { data } = response;
            const { result, message, rows } = data;
            if(result){
                setAlertList(rows);
            }
        }
    }

    const renderReportList = async () => {
        const response = await axios.post(getReportListEndpoint, {},
            authHeader)

        console.log('Response : ', response);
        if (response && response.data.result) {
            setReportData(response.data.rows);
        }
    }

    const renderDataWithFields = (data: any) => {
        Object.keys(data).forEach((item) => {
            if (!['result', 'message'].includes(item)) {
                listData.forEach((temp) => {
                    if (temp.keyYearOne === item) {
                        temp.yearOneValue = data[`${item}`]
                    }
                    if (temp.keyYearTwo === item) {
                        temp.yearTwoValue = data[`${item}`]
                    }
                })
            }
        })
        setData(listData);
    }

    return (
        <>
            <div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <SectionDataView
                        data={data}
                        parentKey={parentKeys.settingsData}
                        sectionTitle={`נתוני שיבוץ`}
                        onFieldClicked={getAttendanceShowList}
                    />
                    <SectionDataView
                        data={data}
                        parentKey={parentKeys.vacationData}
                        sectionTitle={`נתוני חופשה`}
                        onFieldClicked={getAttendanceShowList}
                    />
                    <SectionDataView
                        data={data}
                        parentKey={parentKeys.sickDaysData}
                        sectionTitle={`נתוני ימי מחלה`}
                        onFieldClicked={getAttendanceShowList}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <SectionDataView
                        data={data}
                        parentKey={parentKeys.timeData}
                        sectionTitle={`נתוני שעות`}
                        onFieldClicked={getAttendanceShowList}
                    />
                    <SectionDataView
                        data={data}
                        parentKey={parentKeys.supplementData}
                        sectionTitle={`נתוני השלמות`}
                        onFieldClicked={getAttendanceShowList}
                    />
                    <SectionDataView
                        data={data}
                        parentKey={parentKeys.summaryData}
                        sectionTitle={`סיכום`}
                        onFieldClicked={getAttendanceShowList}
                    />
                </div>
                <div style={{ width: '100%' }}>
                    {reportData.length && <table style={{ width: '100%', border: '1px solid black', padding: '15px' }}>
                        <tr style={{ display: 'flex', flexDirection: 'row' }}>
                            <TableHeadView flexValue={3} text={`Notes`} />
                            <TableHeadView flexValue={1} text={`Manager Approval`} />
                            <TableHeadView flexValue={1} text={`Coordinator Approval`} />
                            <TableHeadView flexValue={1} text={`Report Month`} />

                        </tr>
                        {reportData.map((item, index) => {
                            const { reportMonth, notes, managerApproval, coordinatorApproval } = item;
                            return <tr style={{ display: 'flex', flexDirection: 'row' }} key={index}>
                                <TableDataView flexValue={3} text={notes} type={fieldTypes.editText} />
                                <TableDataView flexValue={1} text={managerApproval} type={fieldTypes.checkbox} />
                                <TableDataView flexValue={1} text={coordinatorApproval} type={fieldTypes.checkbox} />
                                <TableDataView flexValue={1} text={reportMonth} type={fieldTypes.text} />
                            </tr>
                        })}
                    </table>
                    }
                </div>
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        <>
                            <table style={{ width: '100%' }} >
                                <tr style={{ display: 'flex', flexDirection: 'row', width: '100%', background: '#28b6e5' }}>
                                    {
                                        listOneFields.map((item) => {
                                            return <p style={{ flex: 1, textAlign: 'center', color: '#ffffff', height: '100%', justifyContent: 'center' }}>{item.key}</p>
                                        })
                                    }
                                </tr>
                                <tr>
                                    {
                                        alertList.map((item, index) => {
                                            return <p style={{ flex: 1, textAlign: 'center', color: '#ffffff', height: '100%', justifyContent: 'center' }}>{item[`${listOneFields[index].key}`]}</p>
                                        })
                                    }
                                </tr>
                            </table>
                        </>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default MainAttendance;