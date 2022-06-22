/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { KTSVG } from '../../../helpers'
import { useSelector } from 'react-redux'
import { UserModel } from '../../../../app/modules/auth/models/UserModel'
import { RootState } from '../../../../setup'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'

export interface objectV {
  access_token?: string
}
export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>

      {/* <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span> */}
        </div>
      </div>
      {/* <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages123'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      > */}
      {/* <FormattedMessage id="AUTH.GENERAL.ACCOUNT_DETAILS" /> */}
      <AsideMenuItem to={`/`} title={`מִיוּן`} hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='סיורים' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='הגדרות' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='מסמכים' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='הודעות' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='שכר' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='פרטים אישיים' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='נוֹכְחוּת' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='מחוץ לארץ' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='דִירָה' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='ההעדפות שלי' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/`} title='נוכחות יומית' hasBullet={true}></AsideMenuItem>
      <AsideMenuItem to={`/user-details`} title='פרטי המשתמש' hasBullet={true}></AsideMenuItem>

      {/* </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div> */}
      {/* <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div> */}
      {/* <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}
