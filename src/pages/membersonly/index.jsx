import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import PanelBody from '../../components/PanelBody'
import { useStateContext } from "@/context/StateContext"
import TestMongoDb from "../../components/panel_menu/home/TestMongoDb";


const Membersonly = () => {
  const { user, error, isLoading, isConnected } = useStateContext();
  return (
    <div>
    <TestMongoDb />
    <PanelBody user={user} isConnected={isConnected} />
    </div>
  )
}

export default Membersonly

export const getServerSideProps = withPageAuthRequired();