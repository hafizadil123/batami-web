/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import moment from 'moment';
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import './style.css'
const API_URL = process.env.REACT_APP_API_URL;

const logged_user_detail: any = localStorage.getItem('logged_user_detail');
const getUser = JSON.parse(logged_user_detail);
let userType = localStorage.getItem('userType');

const userDetailValidation = Yup.object().shape({
  firstName: Yup.string()
    .max(50, 'Maximum 50 letters')
    .required('First name is required'),
  volunteerNumber: Yup.string().required('Required'),
  email: Yup.string()
    .email('Wrong email format')
    .max(50, 'Maximum 50 letters')
    .required('Email is required'),
  lastName: Yup.string()
    .max(50, 'Maximum 50 letters')
    .required('Last name is required'),
  cellPhone: Yup.string().max(10, 'Maximum length is 10').matches(
    /^(0[23489]\d{7})|(0[57]\d{8})$/,
    "Incorrect number format"
  ).required(),
  phoneNumber: Yup.string().max(10, "Maximum length is 10").matches(/^(0[23489]\d{7})|(0[57]\d{8})$/, 'Incorrect Format'),
  idNumber: Yup.string().required('Required'),
  streetName: Yup.string().max(100, 'Maximum length is 100'),
  houseNumber: Yup.string().max(5, 'Maximum length is 5'),
  apartmentNumber: Yup.number().required().min(1, 'Minimum limit is 1').max(9999, 'Maximum limit is 9999'),
  houseEnterance: Yup.string().max(5, 'Maximum length is 5').required(),
  poBox: Yup.string().max(5, 'Maximum length is 10').required(),
  zipCode: Yup.string().max(7, 'Maximum length is 7').matches(/^[0-9]*$/).required(),
  schoolCityCode: Yup.string().required(),
  passport: Yup.string().max(9, 'Maximum length is 9'),
  schoolCode: Yup.string().required(),
  fatherName: Yup.string().required().max(20, 'Maximum length is 20'),
  motherName: Yup.string().required().max(20, 'Maximum length is 20'),
  bankCode: Yup.string(),
  bankBranch: Yup.string(),
  bankAccount: Yup.string(),
  immigrationCountryCode: Yup.string(),
  educationYears: Yup.number().required().nullable().min(0, 'Minimum limit is 0').max(20, 'Maximum limit is 20'),
  isHighEducation: Yup.boolean(),
  selectedYear: Yup.string(),
  serviceGuideCode: Yup.string(),
  friendFirstName: Yup.string().nullable().when('serviceGuideCode', {
    is: (serviceGuideCode: any) => {
      return (serviceGuideCode == 2);
    },
    then: Yup.string().required()
  }),
  friendLastName: Yup.string().nullable().when('serviceGuideCode', {
    is: (serviceGuideCode: any) => {
      return (serviceGuideCode == 2);
    },
    then: Yup.string().required()
  }),
  friendCellPhone: Yup.string().nullable().when('serviceGuideCode', {
    is: (serviceGuideCode: any) => {
      return (serviceGuideCode == 2);
    },
    then: Yup.string().required().matches(/^(0[23489]\d{7})|(0[57]\d{8})$/, 'Incorrect Format')
  }),
  // acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function UserDetails() {

  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState<any>({});
  const [dataForFields, setGetData] = useState<any>([]);
  const [show, setShowGender] = useState<any>(false);
  const [schoolCodes, setSchoolCodesArray] = useState<any>([]);
  const dispatch = useDispatch()
  const location = useLocation()


  const initialValues = {
    ...userDetails,
    gender: '',
    birthDate: moment(userDetails?.['birthDate']).format('yyyy-MM-DD'),
    // acceptTerms: false,
  }

  console.log('User Details', moment(userDetails?.['birthDate']).format('yyyy-MM-DD'))

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    getData();
  }, []);


  const getUserDetails = async () => {
    const logged_user_detail: any = localStorage.getItem('logged_user_detail');
    const getUser = JSON.parse(logged_user_detail);
    try {
      setLoading(true);
      const response = await axios.post(API_URL + '/api/Inner/GetUserDetails', {},
        {
          headers: {
            Authorization: `bearer ${getUser.access_token}`
          }
        }
      );
      if (response) {
        setLoading(false);
        const { data } = response;
        setUserDetails(data);
        console.log('dataaa', data)
      }
    }
    catch (err) {
      console.log('Errorrrr', err);
    }
  }


  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL + '/api/Inner/GetData');
      if (response) {
        setLoading(false);
        const { data } = response;
        setGetData(data);
        console.log('dataaa', data);
      }
    }
    catch (err) {
      console.log('Errorrrr', err);
    }
  }

  const getUrl = () => {
    if (userType === 'Volunteer') {
      return API_URL + '/api/Inner/UpdateUserDetails'
    }
    return API_URL + '/api/Inner/UpdateUserDetails'
  }

  const getInitialValues = (initialValues: any) => {
    if (userType !== 'Volunteer') {
      delete initialValues['volunteerNumber']
    }
    return initialValues
  }
  const formik = useFormik({
    initialValues: getInitialValues(initialValues),
    enableReinitialize: true,
    validationSchema: userDetailValidation,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log('VAluesssssssss', values);
      setLoading(true);
      axios.post(getUrl(), values, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${getUser.access_token}`
        }
      }).then(res => {
        setLoading(false);
        if (res) {
          alert('data has been updated')
        }
      });
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  var schools: any = [];
  for (let i = 0; i < dataForFields?.schoolCityTypes?.length; i++) {
    if (dataForFields.schoolCityTypes[i].id === 3002) {
      schools = dataForFields.schoolCityTypes[i].schools;
    }
  }
  console.log('Schollsssssssss', schools);

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>User Details</h1>
        {/* end::Title */}
      </div>
      {/* end::Heading */}


      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='row'>
        <div className={`${userType === 'Volunteer' ? 'col-xl-6' : 'col-xl-12'}`}>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Father name</label>
            <input
              placeholder='Father name'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('fatherName')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.fatherName && formik.errors.fatherName,
                },
                {
                  'is-valid': formik.touched.fatherName && !formik.errors.fatherName,
                }
              )}
            />
            {formik.touched.fatherName && formik.errors.fatherName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.fatherName}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
        {userType === 'Volunteer' && <div className='col-xl-6'>

          <label className='class="form-label fw-bolder text-dark fs-6'>Volunteer Number</label>
          <input
            placeholder=''
            type='text'
            autoComplete='off'
            disabled
            {...formik.getFieldProps('volunteerNumber')}
            style={{ marginTop: '5px' }}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.volunteerNumber && formik.errors.volunteerNumber,
              },
              {
                'is-valid': formik.touched.volunteerNumber && !formik.errors.volunteerNumber,
              }
            )}
          />
          {formik.touched.volunteerNumber && formik.errors.volunteerNumber && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.volunteerNumber}</span>
              </div>
            </div>
          )}

        </div>}
      </div>


      <div className='row fv-row mb-7'>

        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Mother name</label>
            <input
              placeholder='Mother name'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('motherName')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.motherName && formik.errors.motherName,
                },
                {
                  'is-valid': formik.touched.motherName && !formik.errors.motherName,
                }
              )}
            />
            {formik.touched.motherName && formik.errors.motherName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.motherName}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>

        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>First name</label>
          <input
            placeholder='First name'
            type='text'
            autoComplete='off'
            style={{ marginTop: '5px' }}
            {...formik.getFieldProps('firstName')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.firstName && formik.errors.firstName,
              },
              {
                'is-valid': formik.touched.firstName && !formik.errors.firstName,
              }
            )}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.firstName}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Immigration Country Code</label>
          <select
            // name='hebYear'
            aria-label=''
            data-control='select2'
            data-placeholder='date_period'
            className='form-select form-select-sm form-select-solid'
            {...formik.getFieldProps('immigrationCountryCode')}
            onChange={formik.handleChange}
          >
            {dataForFields?.countryTypes?.map((item: any) => (
              <option value={item.id} >{item.name}</option>
            ))}
          </select>
          {formik.touched.immigrationCountryCode && formik.errors.immigrationCountryCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.immigrationCountryCode}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Last name</label>
            <input
              placeholder='Last name'
              type='text'
              autoComplete='off'

              {...formik.getFieldProps('lastName')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.lastName && formik.errors.lastName,
                },
                {
                  'is-valid': formik.touched.lastName && !formik.errors.lastName,
                }
              )}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.lastName}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Phone</label>
          <input
            placeholder='Phone'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('phoneNumber')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber,
              },
              {
                'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
              }
            )}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.phoneNumber}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>ID Number</label>
            <input
              placeholder='ID Number'
              disabled
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('idNumber')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.idNumber && formik.errors.idNumber,
                },
                {
                  'is-valid': formik.touched.idNumber && !formik.errors.idNumber,
                }
              )}
            />
            {formik.touched.idNumber && formik.errors.idNumber && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.idNumber}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>


      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Cell Phone</label>
          <input
            placeholder='Cell Phone'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('cellPhone')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.cellPhone && formik.errors.cellPhone,
              },
              {
                'is-valid': formik.touched.cellPhone && !formik.errors.cellPhone,
              }
            )}
          />
          {formik.touched.cellPhone && formik.errors.cellPhone && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.cellPhone}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Passport</label>
            <input
              placeholder='Passport'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('passport')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.passport && formik.errors.passport,
                },
                {
                  'is-valid': formik.touched.passport && !formik.errors.passport,
                }
              )}
            />
            {formik.touched.passport && formik.errors.passport && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.passport}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>

      <div className='row fv-row mb-7'>
        <div className='col-xl-6'><div>
          <label className='class="form-label fw-bolder text-dark fs-6'>Bank Code</label>
          <input
            placeholder='Bank Code'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('bankCode')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.bankCode && formik.errors.bankCode,
              },
              {
                'is-valid': formik.touched.bankCode && !formik.errors.bankCode,
              }
            )}
          />
          {formik.touched.bankCode && formik.errors.bankCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.bankCode}</span>
              </div>
            </div>
          )}
        </div>
          <div>
            <label className='class="form-label fw-bolder text-dark fs-6'>Bank Branch</label>
            <input
              placeholder='Bank Account'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('bankBranch')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.bankBranch && formik.errors.bankBranch,
                },
                {
                  'is-valid': formik.touched.bankBranch && !formik.errors.bankBranch,
                }
              )}
            />
            {formik.touched.bankBranch && formik.errors.bankBranch && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.bankBranch}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Birthdate</label>
            <input
              // placeholder='Passport'
              type='date'
              {...formik.getFieldProps('birthDate')}
              value="2022-2-2"
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.birthDate && formik.errors.birthDate,
                },
                {
                  'is-valid': formik.touched.birthDate && !formik.errors.birthDate,
                }
              )}
            />
            {formik.touched.birthDate && formik.errors.birthDate && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.birthDate}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>


      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Bank Account</label>
          <input
            placeholder='Bank Account'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('bankAccount')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.bankAccount && formik.errors.bankAccount,
              },
              {
                'is-valid': formik.touched.bankAccount && !formik.errors.bankAccount,
              }
            )}
          />
          {formik.touched.bankAccount && formik.errors.bankAccount && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.bankAccount}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Hebrew Birthdate</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <select
                // name='hebYear'
                aria-label=''
                data-control='select2'
                data-placeholder='date_period'
                className='form-select form-select-sm form-select-solid'
                {...formik.getFieldProps('hebYear')}
                onChange={formik.handleChange}
              >
                {dataForFields?.hebYears?.map((item: any) => (
                  <option value={item.id} >{item.name}</option>
                ))}
                {/* <option value='last'>Within the last</option>
                <option value='between'>Between</option>
                <option value='on'>On</option> */}
              </select>
              <select
                aria-label='Select a Timezone'
                data-control='select2'
                data-placeholder='date_period'
                className='form-select form-select-sm form-select-solid'
                {...formik.getFieldProps('hebMonth')}
                onChange={formik.handleChange}
              >
                {dataForFields?.hebMonths?.map((item: any) => (
                  <option value={item.id} >{item.name}</option>
                ))}
              </select>
              <select
                aria-label='Select a Timezone'
                data-control='select2'
                data-placeholder='date_period'
                className='form-select form-select-sm form-select-solid'
                {...formik.getFieldProps('hebDay')}
                onChange={formik.handleChange}
              >
                {dataForFields?.hebDays?.map((item: any) => (
                  <option value={item.id} >{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* end::Form group */}
        </div>

      </div>

      <div className='row fv-row mb-7'>
        <div className='col-xl-6' >
          <label className='class="form-label fw-bolder text-dark fs-6' style={{ marginRight: '1rem' }}>Is Army Interested</label>
          <input
            type='checkbox'
            autoComplete='off'
            defaultChecked={userDetails?.['isArmyInterested']}
            {...formik.getFieldProps('isArmyInterested')}
            onChange={() => setShowGender(!show)}
          />
          {show &&
            <select
              style={{ marginTop: '1.5rem' }}
              aria-label='Select Gender'
              data-control='select2'
              data-placeholder='date_period'
              className='form-select form-select-sm form-select-solid'
              {...formik.getFieldProps('gender')}
              onChange={formik.handleChange}
            >
              {dataForFields?.genderTypes?.map((item: any) => (
                <option value={item.id} >{item.name}</option>
              ))}
            </select>
          }
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>CityCode</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <select
                // name='hebYear'
                aria-label=''
                data-control='select2'
                data-placeholder='date_period'
                className='form-select form-select-sm form-select-solid'
                {...formik.getFieldProps('cityType')}
                onChange={formik.handleChange}
              >
                {dataForFields?.cityTypes?.map((item: any) => (
                  <option value={item.id} >{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* end::Form group */}
        </div>
      </div>



      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>House Number</label>
          <input
            placeholder='House Number'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('houseNumber')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.houseNumber && formik.errors.houseNumber,
              },
              {
                'is-valid': formik.touched.houseNumber && !formik.errors.houseNumber,
              }
            )}
          />
          {formik.touched.houseNumber && formik.errors.houseNumber && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.houseNumber}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Street</label>
            <input
              placeholder='Street'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('streetName')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.streetName && formik.errors.streetName,
                },
                {
                  'is-valid': formik.touched.streetName && !formik.errors.streetName,
                }
              )}
            />
            {formik.touched.streetName && formik.errors.streetName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.streetName}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>


      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>Apartment Number</label>
          <input
            placeholder='Apartment Number'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('apartmentNumber')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.apartmentNumber && formik.errors.apartmentNumber,
              },
              {
                'is-valid': formik.touched.apartmentNumber && !formik.errors.apartmentNumber,
              }
            )}
          />
          {formik.touched.apartmentNumber && formik.errors.apartmentNumber && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.apartmentNumber}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>House Number</label>
            <input
              placeholder='House Number'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('houseNumber')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.houseNumber && formik.errors.houseNumber,
                },
                {
                  'is-valid': formik.touched.houseNumber && !formik.errors.houseNumber,
                }
              )}
            />
            {formik.touched.houseNumber && formik.errors.houseNumber && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.houseNumber}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>


      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>House Entrance</label>
          <input
            placeholder='House Enterance'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('houseEnterance')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.houseEnterance && formik.errors.houseEnterance,
              },
              {
                'is-valid': formik.touched.houseEnterance && !formik.errors.houseEnterance,
              }
            )}
          />
          {formik.touched.houseEnterance && formik.errors.houseEnterance && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.houseEnterance}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Apartment Number</label>
            <input
              placeholder='Apartment Number'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('apartmentNumber')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.apartmentNumber && formik.errors.apartmentNumber,
                },
                {
                  'is-valid': formik.touched.apartmentNumber && !formik.errors.apartmentNumber,
                }
              )}
            />
            {formik.touched.apartmentNumber && formik.errors.apartmentNumber && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.apartmentNumber}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>



      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>PO Box</label>
          <input
            placeholder='PO Box'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('poBox')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.poBox && formik.errors.poBox,
              },
              {
                'is-valid': formik.touched.poBox && !formik.errors.poBox,
              }
            )}
          />
          {formik.touched.poBox && formik.errors.poBox && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.poBox}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          {/* <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>House Entrance</label>
            <input
              placeholder='House Enterance'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('houseEnterance')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.houseEnterance && formik.errors.houseEnterance,
                },
                {
                  'is-valid': formik.touched.houseEnterance && !formik.errors.houseEnterance,
                }
              )}
            />
            {formik.touched.houseEnterance && formik.errors.houseEnterance && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.houseEnterance}</span>
                </div>
              </div>
            )}
          </div> */}
          {/* end::Form group */}
        </div>
      </div>
      {/* end::Form group */}


      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>Zip Code</label>
          <input
            placeholder='Zip Code'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('zipCode')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.zipCode && formik.errors.zipCode,
              },
              {
                'is-valid': formik.touched.zipCode && !formik.errors.zipCode,
              }
            )}
          />
          {formik.touched.zipCode && formik.errors.zipCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.zipCode}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          {/* <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>PO Box</label>
            <input
              placeholder='PO Box'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('poBox')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.poBox && formik.errors.poBox,
                },
                {
                  'is-valid': formik.touched.poBox && !formik.errors.poBox,
                }
              )}
            />
            {formik.touched.poBox && formik.errors.poBox && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.poBox}</span>
                </div>
              </div>
            )}
          </div> */}
          {/* end::Form group */}
        </div>
      </div>


      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>School City Code</label>
          <select
            style={{ marginTop: '1.5rem' }}
            aria-label='Select School City Code'
            data-control='select2'
            data-placeholder='date_period'
            className='form-select form-select-sm form-select-solid'
            {...formik.getFieldProps('schoolCityCode')}
            onChange={formik.handleChange}
          >
            {dataForFields?.schoolCityTypes?.map((item: any) => (
              <option value={item.id} >{item.name}</option>
            ))}
          </select>
          {formik.touched.schoolCityCode && formik.errors.schoolCityCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.schoolCityCode}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}

          <label className='form-label fw-bolder text-dark fs-6'>School Code</label>
          <select
            style={{ marginTop: '1.5rem' }}
            aria-label='Select School Code'
            data-control='select2'
            data-placeholder='date_period'
            className='form-select form-select-sm form-select-solid'
            {...formik.getFieldProps('schoolCode')}
            onChange={formik.handleChange}
          >
            {dataForFields?.schoolCityTypes?.map((item: any) => (
              <option value={item.id} >{item.name}</option>
            ))}
          </select>
          {formik.touched.schoolCode && formik.errors.schoolCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.schoolCode}</span>
              </div>
            </div>
          )}
          {/* end::Form group */}
        </div>
      </div>



      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>

          <label className='form-label fw-bolder text-dark fs-6'>Zip Code</label>
          <input
            placeholder='Zip Code'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('zipCode')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.zipCode && formik.errors.zipCode,
              },
              {
                'is-valid': formik.touched.zipCode && !formik.errors.zipCode,
              }
            )}
          />
          {formik.touched.zipCode && formik.errors.zipCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.zipCode}</span>
              </div>
            </div>
          )}


        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>

            <label className='form-label fw-bolder text-dark fs-6'>Email</label>
            <input
              placeholder='School Code'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.email && formik.errors.email,
                },
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.email}</span>
                </div>
              </div>
            )}

          </div>
          {/* end::Form group */}
        </div>
      </div>


      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>

          <label className='form-label fw-bolder text-dark fs-6'>Education Years</label>
          <input
            placeholder='Education Years'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('educationYears')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.educationYears && formik.errors.educationYears,
              },
              {
                'is-valid': formik.touched.educationYears && !formik.errors.educationYears,
              }
            )}
          />
          {formik.touched.educationYears && formik.errors.educationYears && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.educationYears}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Is High Education?</label>
            <input
              type='checkbox'
              autoComplete='off'
              defaultChecked={userDetails?.['isHighEducation']}
              {...formik.getFieldProps('isHighEducation')}
            />

          </div>
          {/* end::Form group */}
        </div>
      </div>



      <div className='row fv-row mb-7'>
        {show &&
          <div className='col-xl-6'>
            <label className='form-label fw-bolder text-dark fs-6'>Selected Year</label>
            <select
              style={{ marginTop: '1.5rem' }}
              aria-label='Select Year'
              data-control='select2'
              data-placeholder='date_period'
              className='form-select form-select-sm form-select-solid'
              {...formik.getFieldProps('selectedYear')}
              onChange={formik.handleChange}
            >
              {dataForFields?.selectedYearTypes?.map((item: any) => (
                <option value={item.id} >{item.name}</option>
              ))}
            </select>

            {formik.touched.educationYears && formik.errors.educationYears && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.educationYears}</span>
                </div>
              </div>
            )}
          </div>
        }
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          {console.log('Formikkkkkkkkk', formik.values)}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Service Guide Code</label>
            <select
              style={{ marginTop: '1.5rem' }}
              aria-label='Service Guide Code'
              data-control='select2'
              data-placeholder='date_period'
              className='form-select form-select-sm form-select-solid'
              {...formik.getFieldProps('serviceGuideCode')}
              onChange={formik.handleChange}
            >
              {dataForFields?.serviceGuideTypes?.map((item: any) => (
                <option value={item.id} >{item.name}</option>
              ))}
            </select>

          </div>
          {/* end::Form group */}
        </div>
      </div>



      <div className='row fv-row mb-7'>
        {formik.values.serviceGuideCode == 2 &&
          <div className='col-xl-6'>
            <label className='form-label fw-bolder text-dark fs-6'>Friend First Name</label>
            <input
              placeholder='Friend First Name'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('friendFirstName')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.friendFirstName && formik.errors.friendFirstName,
                },
                {
                  'is-valid': formik.touched.friendFirstName && !formik.errors.friendFirstName,
                }
              )}
            />


            {formik.touched.friendFirstName && formik.errors.friendFirstName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.friendFirstName}</span>
                </div>
              </div>
            )}
          </div>
        }

        {formik.values.serviceGuideCode == 2 &&
          <div className='col-xl-6'>
            {/* begin::Form group Lastname */}
            <div>
              <label className='form-label fw-bolder text-dark fs-6'>Friend Last Name</label>
              <input
                placeholder='Friend First Name'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('friendLastName')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.friendLastName && formik.errors.friendLastName,
                  },
                  {
                    'is-valid': formik.touched.friendLastName && !formik.errors.friendLastName,
                  }
                )}
              />
              {formik.touched.friendLastName && formik.errors.friendLastName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.friendLastName}</span>
                  </div>
                </div>
              )}
            </div>


            <div>
              <label className='form-label fw-bolder text-dark fs-6'>Friend Cell Phone</label>
              <input
                placeholder='Friend Cell Phone'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('friendCellPhone')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.friendCellPhone && formik.errors.friendCellPhone,
                  },
                  {
                    'is-valid': formik.touched.friendCellPhone && !formik.errors.friendCellPhone,
                  }
                )}
              />
              {formik.touched.friendCellPhone && formik.errors.friendCellPhone && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.friendCellPhone}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        }
        {/* end::Form group */}
      </div>


      {/* begin::Form group */}
      {/* <div className='fv-row mb-10'>
        <div className='form-check form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <label
            className='form-check-label fw-bold text-gray-700 fs-6'
            htmlFor='kt_login_toc_agree'
          >
            I Agree the{' '}
            <Link to='/auth/terms' className='ms-1 link-primary'>
              terms and conditions
            </Link>
            .
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.acceptTerms}</span>
              </div>
            </div>
          )}
        </div>
      </div> */}
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary mb-5'
        >
          {!loading && <span className='indicator-label'>Update</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

      </div>
      {/* end::Form group */}
    </form>
  )
}
