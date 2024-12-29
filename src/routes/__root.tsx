import { Footer } from '@/pages/Home/Footer'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
       <Footer/>
      <Outlet />
    </React.Fragment>
  )
}
