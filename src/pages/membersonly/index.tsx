import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
// import PanelBody from '../../components/PanelBody'

type Props = {}

const Membersonly = (props: Props) => {
  return (
    <>
      {/* <PanelBody /> */}
      <p>Membersonly is successfully shown</p>
    </>
  )
}

export default Membersonly
export const getServerSideProps = withPageAuthRequired();