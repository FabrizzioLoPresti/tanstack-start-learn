import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import FetchComponent from './-fetcher/fetch-component'

export const Route = createFileRoute('/react-query/fetch-data')({
  component: RouteComponent,
})

function RouteComponent() {
  const [mountedFetcher, setMountedFetcher] = useState(false)

  return (
    <div>
      <h1>Hello "/react-query/fetch-data"!</h1>
      <button onClick={() => setMountedFetcher(!mountedFetcher)}>
        Mount Fetcher
      </button>
      {mountedFetcher && <FetchComponent />}
    </div>
  )
}
