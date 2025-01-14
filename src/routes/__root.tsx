import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Footer } from '@/pages/Home/Footer'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <BreadCrumb/>
       <Footer/>
      <Outlet />
    </React.Fragment>
  )
}
