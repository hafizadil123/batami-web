/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'


const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required( ` שדהשם משתמש הינו חובה`),
  password: Yup.string()
    .required( ` שדהסיסמה הינו חובה`),
})

const initialValues = {
  username: '',
  password: '',
}


export function Login(props: any) {
  const [loading, setLoading] = useState(false)
  const API_URL = process.env.REACT_APP_API_URL;
  const LOGIN_URL = `${API_URL}/Token`
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        setLoading(true);
        setStatus('')
        let username = values.username + '^13';
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', values.password)
        params.append('grant_type', 'password')
        const response = await axios.post(LOGIN_URL, params);
        if (response) {
          setLoading(false);
          const { data } = response;
          localStorage.setItem('logged_user_detail', JSON.stringify(data))
          window.location.href = '/dashboard';
        }
      } catch (err) {
        setLoading(false)
        setSubmitting(false)
        setStatus('תעודת זהות וסיסמא אינם תקינים, יש לנסות שנית או לפנות למוקד.')
      }
    }
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}

      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>{<FormattedMessage id="AUTH.GENERAL.ACCOUNT_DETAILS" />}</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        null
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>{<FormattedMessage id="AUTH.INPUT.USERNAME" />}</label>

        <input
          placeholder='תעודת זהות'
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.username && formik.errors.username },
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
          type='username'
          name='username'
          autoComplete='off'
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.username}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'><FormattedMessage id="AUTH.INPUT.PASSWORD" /></label>
            {/* end::Label */}
            {/* begin::Link */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{ marginLeft: '5px' }}
            >
              שכחת סיסמא ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>{<FormattedMessage id='AUTH.GENERAL.SUBMIT_BUTTON' />}</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>


      </div>
      {/* end::Action */}
    </form>
  )
}
