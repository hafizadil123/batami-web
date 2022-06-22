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
const API_URL = process.env.REACT_APP_API_URL;



const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  volunteerNumber: Yup.string().required('Required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  firstName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First Name is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  IdNumber: Yup.string().required('Required'),
  Passport: Yup.string().max(9, 'Maximum length is 9'),

  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function UserDetails() {

  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState<any>({});
  const dispatch = useDispatch()
  const location = useLocation()


  const initialValues = {
    volunteerNumber: userDetails?.['volunteerNumber'],
    firstname: userDetails?.['firstName'],
    lastname: userDetails?.['lastName'],
    IdNumber: userDetails?.['idNumber'],
    Passport: userDetails?.['passport'],
    street: userDetails?.['streetName'],
    apartmentNumber: userDetails?.['apartmentNumber'],
    houseEnterance: userDetails?.['houseEnterance'],
    poBox: userDetails?.['poBox'],
    zipCode: userDetails?.['zipCode'],
    schoolCityCode: userDetails?.['schoolCityCode'],
    schoolCode: userDetails?.['schoolCode'],
    houseNumber: userDetails?.['houseNumber'],
    birthDate: moment(userDetails?.['birthDate']).format('yyyy-MM-DD'),
    hebYear: userDetails?.['hebYear'],
    hebMonth: userDetails?.['hebMonth'],
    hebDay: userDetails?.['hebDay'],
    fatherName: userDetails?.['fatherName'],
    motherName: userDetails?.['motherName'],
    immigrationCountryCode: userDetails?.['immigrationCountryCode'],
    migrationDate: userDetails?.['migrationDate'],
    educationYears: userDetails?.['educationYears'],
    isHighEducation: userDetails?.['isHighEducation'],
    familyStatusCode: userDetails?.['familyStatusCode'],
    phone1: userDetails?.['phoneNumber'],
    cellPhone: userDetails?.['cellPhone'],
    bankCode: userDetails?.['bankCode'],
    bankBranch: userDetails?.['bankBranch'],
    bankAccount: userDetails?.['bankAccount'],
    isArmyInterested: userDetails?.['isArmyInterested'],
    email: userDetails?.['email'],
    acceptTerms: false,
  }

  console.log('KAAAAAAAAA', moment(userDetails?.['birthDate']).format('DD/MM/YYYY'));
  useEffect(() => {
    getUserDetails();
  }, []);


  const getUserDetails = async () => {
    const logged_user_detail: any = localStorage.getItem('logged_user_detail');
    console.log('USerrrrrrrrrrrr', JSON.parse(logged_user_detail))
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

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    // validationSchema: registrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      // setTimeout(() => {
      //   register(values.email, values.firstname, values.lastname, values.password, location.search)
      //     .then(({data: {api_token, msg}}) => {
      //       setLoading(false)
      //       setStatus(msg)
      //       setSubmitting(false)
      //       dispatch(auth.actions.register(api_token))
      //     })
      //     .catch(() => {
      //       setLoading(false)
      //       setSubmitting(false)
      //       setStatus('Registration process has broken')
      //     })
      // }, 1000)
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

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
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
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
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Volunteer Number</label>
          <input
            placeholder=''
            type='text'
            disabled
            autoComplete='off'
            {...formik.getFieldProps('volunteerNumber')}
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
        </div>
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
            {...formik.getFieldProps('firstname')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.firstname && formik.errors.firstname,
              },
              {
                'is-valid': formik.touched.firstname && !formik.errors.firstname,
              }
            )}
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.firstname}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Immigration Country Code</label>
          <input
            placeholder='Immigration Country Code'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('immigrationCountryCode')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.immigrationCountryCode && formik.errors.immigrationCountryCode,
              },
              {
                'is-valid': formik.touched.immigrationCountryCode && !formik.errors.immigrationCountryCode,
              }
            )}
          />
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
              {...formik.getFieldProps('lastname')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.lastname && formik.errors.lastname,
                },
                {
                  'is-valid': formik.touched.lastname && !formik.errors.lastname,
                }
              )}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.lastname}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Phone1</label>
          <input
            placeholder='Phone'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('phone1')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.phone1 && formik.errors.phone1,
              },
              {
                'is-valid': formik.touched.phone1 && !formik.errors.phone1,
              }
            )}
          />
          {formik.touched.phone1 && formik.errors.phone1 && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.phone1}</span>
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
              type='text'
              disabled
              autoComplete='off'
              {...formik.getFieldProps('IdNumber')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.IdNumber && formik.errors.IdNumber,
                },
                {
                  'is-valid': formik.touched.IdNumber && !formik.errors.IdNumber,
                }
              )}
            />
            {formik.touched.IdNumber && formik.errors.IdNumber && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.IdNumber}</span>
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
              {...formik.getFieldProps('Passport')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.Passport && formik.errors.Passport,
                },
                {
                  'is-valid': formik.touched.Passport && !formik.errors.Passport,
                }
              )}
            />
            {formik.touched.Passport && formik.errors.Passport && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.Passport}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>

      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
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
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Birthdate</label>
            {formik.getFieldProps('birthDate').value}
            <input
              // placeholder='Passport'
              type='date'
              autoComplete='off'
              {...formik.getFieldProps('birthDate')}
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
              >
                <option value={formik.getFieldProps('hebYear').value} >{userDetails?.['hebYear']}</option>
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
              >
                <option value={formik.getFieldProps('hebMonth').value}>{userDetails?.['hebMonth']}</option>
              </select>
              <select
                aria-label='Select a Timezone'
                data-control='select2'
                data-placeholder='date_period'
                className='form-select form-select-sm form-select-solid'
                {...formik.getFieldProps('hebDay')}
              >
                <option value={formik.getFieldProps('hebDay').value}>{userDetails?.['hebDay']}</option>
              </select>
            </div>
          </div>
          {/* end::Form group */}
        </div>

      </div>

      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6' style={{ marginRight: '1rem' }}>Is Army Interested</label>
          <input
            type='checkbox'
            autoComplete='off'
            defaultChecked={userDetails?.['isArmyInterested']}
            {...formik.getFieldProps('isArmyInterested')}
          />
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>CityCode</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <select
                name='timezone'
                aria-label='Select a Timezone'
                data-control='select2'
                data-placeholder='date_period'
                className='form-select form-select-sm form-select-solid'
              >
                <option value='next'>year</option>
                <option value='last'>Within the last</option>
                <option value='between'>Between</option>
                <option value='on'>On</option>
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
              {...formik.getFieldProps('street')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.street && formik.errors.street,
                },
                {
                  'is-valid': formik.touched.street && !formik.errors.street,
                }
              )}
            />
            {formik.touched.street && formik.errors.street && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.street}</span>
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
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
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
          <div className='fv-row mb-5'>
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
          {/* end::Form group */}
        </div>
      </div>


      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>School City Code</label>
          <input
            placeholder='School City Code'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('schoolCityCode')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.schoolCityCode && formik.errors.schoolCityCode,
              },
              {
                'is-valid': formik.touched.schoolCityCode && !formik.errors.schoolCityCode,
              }
            )}
          />
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
          <div className='fv-row mb-5'>
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
          {/* end::Form group */}
        </div>
      </div>



      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>School Code</label>
          <input
            placeholder='School Code'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('schoolCode')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.schoolCode && formik.errors.schoolCode,
              },
              {
                'is-valid': formik.touched.schoolCode && !formik.errors.schoolCode,
              }
            )}
          />
          {formik.touched.schoolCode && formik.errors.schoolCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.schoolCode}</span>
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
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
