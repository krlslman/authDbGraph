import React from 'react'
// import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import PanelBody from '../../components/PanelBody'

type Props = {}

const Membersonly = (props: Props) => {
  return (
    <>
    <div>Membersonly</div>
    <br />
    <Link href="/api/auth/logout">logout</Link>
    <PanelBody />
    </>
  )
}

export default Membersonly
// export const getServerSideProps = withPageAuthRequired();