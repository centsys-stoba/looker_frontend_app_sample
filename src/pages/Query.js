import { sdk } from '../helpers/Session'
import { DataProvider } from '@looker/components-data'
import { Query, Visualization } from '@looker/visualizations'

export default function QueryPage() {
  return (
    <>
      <DataProvider sdk={sdk}>
        {/* Change this query slug to match your query slug */}
        <Query query="ZU2WqykkdfzAehwEgMpw7U">
          <Visualization />
        </Query>
      </DataProvider>
    </>
  )
}
