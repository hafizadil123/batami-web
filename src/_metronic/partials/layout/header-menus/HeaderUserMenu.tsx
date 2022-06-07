/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import clsx from 'clsx'
import { shallowEqual, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UserModel } from '../../../../app/modules/auth/models/UserModel'
import { RootState } from '../../../../setup'
import { Languages } from './Languages'
import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import { useDispatch } from 'react-redux'
import { toAbsoluteUrl } from '../../../helpers'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const HeaderUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(auth.actions.logout())
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              Adil Sikandar
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              ahafiz167@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>










      <div className='separator my-2'></div>

      <div
        className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
        data-kt-menu-trigger='click'
        data-kt-menu-attach='parent'
        data-kt-menu-placement='bottom-end'
        data-kt-menu-flip='bottom'
      >
        {/* <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='metronic' /> */}
        <Languages />
      </div>

      <div className='menu-item px-5'>
        <Link to='/change-password' className='menu-link px-5'>
          Change Password
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
