import Project from '@/pages/Project/Project'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projectshow')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=' p-4'>
    <Project/>
  </div>
}
