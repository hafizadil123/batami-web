import React, { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { requestPassword } from '../redux/AuthCRUD';
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL;

const initialValues = {
  email: '',
  userName: ''
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  userName: Yup.string().required('Required')
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      console.log('Emaillll', values.email, values.userName);
      try {
        setLoading(true);
        setStatus('');
        const response = await axios.post(API_URL + '/Api/Inner/RecoverPassword', { userName: values.userName, contanctInfo: values.email },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        if (response) {
          console.log('Responseeee', response)
          // setStatus(msg)
          setHasErrors(false);
          setLoading(false);
          const { data } = response;
          // localStorage.setItem('logged_user_detail', JSON.stringify(data))
          // window.location.href = '/dashboard';
        }
      } catch (err) {
        setHasErrors(true)
        setLoading(false)
        setSubmitting(false)
        setStatus('Some Error occured');
      }



      /////////////////////////
    },
  })

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Forgot Password ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>Enter your email to reset your password.</div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Sorry, looks like there are some errors detected, please try again.
            </div>
          </div>
        )}

        {hasErrors === false && formik.status && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>{formik.status}</div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
          <input
            type='email'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.email && formik.errors.email },
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

          <label className='form-label fw-bolder text-gray-900 fs-6' style={{ marginTop: '5px' }}>Username</label>
          <input
            type='text'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('userName')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.userName && formik.errors.userName },
              {
                'is-valid': formik.touched.userName && !formik.errors.userName,
              }
            )}
          />
          {formik.touched.userName && formik.errors.userName && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.userName}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            {loading ? (
              <span className='indicator-label'>please wait....</span>
            ) : <span className='indicator-label'>Submit</span>}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
