import React from 'react'
// import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import Body from '../../components/Body'

type Props = {}

const Membersonly = (props: Props) => {
  return (
    <>
    <div>Membersonly</div>
    <br />
    <Link href="/api/auth/logout">logout</Link>
    <Body />
    </>
  )
}

export default Membersonly
// export const getServerSideProps = withPageAuthRequired();