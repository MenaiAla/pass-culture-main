import { getValue } from '@firebase/remote-config'
import React, { useRef, useState } from 'react'

import PageTitle from 'components/layout/PageTitle/PageTitle'
import useActiveFeature from 'hooks/useActiveFeature'
import useCurrentUser from 'hooks/useCurrentUser'
import { BannerRGS } from 'new_components/Banner'
import { Newsletter } from 'new_components/Newsletter'
import { setHasSeenRGSBanner } from 'repository/pcapi/pcapi'

import useRemoteConfig from '../../../hooks/useRemoteConfig'

import HomepageBreadcrumb, { STEP_ID_OFFERERS } from './HomepageBreadcrumb'
import Offerers from './Offerers/Offerers'
import { OffererStats } from './OffererStats'
import { ProfileAndSupport } from './ProfileAndSupport'
const Homepage = (): JSX.Element => {
  const profileRef = useRef(null)
  const statsRef = useRef(null)
  const {
    currentUser: { hasSeenProRgs },
  } = useCurrentUser()
  const [hasClosedRGSBanner, setHasClosedRGSBanner] = useState<boolean>(
    Boolean(hasSeenProRgs)
  )
  const isOffererStatsActive = useActiveFeature('ENABLE_OFFERER_STATS')
  const handleCloseRGSBanner = () => {
    setHasSeenRGSBanner().finally(() => {
      setHasClosedRGSBanner(true)
    })
  }
  const { remoteConfig } = useRemoteConfig()
  const coucou = useCurrentUser()
  console.log({ coucou })
  // eslint-disable-next-line no-console
  remoteConfig && console.log(getValue(remoteConfig, 'only500BiggerActors'))

  return (
    <div className="homepage">
      <PageTitle title="Espace acteurs culturels" />
      <h1>Bienvenue dans l’espace acteurs culturels</h1>
      {!hasClosedRGSBanner && (
        <BannerRGS closable onClose={handleCloseRGSBanner} />
      )}
      <HomepageBreadcrumb
        activeStep={STEP_ID_OFFERERS}
        isOffererStatsActive={isOffererStatsActive}
        profileRef={profileRef}
        statsRef={statsRef}
      />

      <section className="h-section">
        <Offerers />
      </section>
      {isOffererStatsActive && (
        <section className="h-section" ref={statsRef}>
          <OffererStats />
        </section>
      )}

      <section className="h-section" ref={profileRef}>
        <ProfileAndSupport />
        <div className="newsletter">
          <Newsletter />
        </div>
      </section>
    </div>
  )
}

export default Homepage
