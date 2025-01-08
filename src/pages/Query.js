import { sdk } from '../helpers/Session'
import { DataProvider } from '@looker/components-data'
import { Query, Visualization } from '@looker/visualizations'
import { Button, Space, SpaceVertical, Form, FieldText } from '@looker/components'
import { useState } from 'react'

export default function QueryPage() {
  const [query, setQuery] = useState(null)
  const [form, setForm] = useState({
    model: 'okayama_info',
    view: 'population',
    fields: 'population.city_name,population.total_population',
  })
  const [operationType, setOperationType] = useState('')
  const [queryResult, setQueryResult] = useState(null)

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCreateQuery = async () => {
    await sdk.create_query({
      model: form.model,
      view: form.view,
      fields: form.fields.split(',').map(item => item.trim()),
      limit: 100
    }).then(res => {
      setQuery(res.value)
    })
  }

  const handleVisualize = async () => {
    setOperationType('visualize')
  }

  const handleShowJson = async () => {
    sdk.run_query({ query_id: query.id, result_format: 'json_bi' })
      .then(res => {
        setQueryResult(res)
        setOperationType('showJson')
    })
  }

  return (
    <>
      <SpaceVertical minWidth="600px">
        <p>Login and get access token before creating a query.</p>
        <Form>
          <FieldText label='model' name='model' type='text' value={form.model} onChange={handleFormChange} />
          <FieldText label='view' name='view' type='text' value={form.view} onChange={handleFormChange} />
          <FieldText label='fields' name='fields' type='text' value={form.fields} onChange={handleFormChange} />
        </Form>
        <Button onClick={handleCreateQuery}>
          Create Query
        </Button>
        {query && query.slug ?
          <>
            <div>
              Query slug: {query.slug}
            </div>
            <Space>
              <Button onClick={handleVisualize}>
                Visualize
              </Button>
              <Button onClick={handleShowJson}>
                Show json
              </Button>
            </Space>
          </>
          :
          <div>no query created</div>
        }
        {operationType === 'visualize' ?
          <DataProvider sdk={sdk}>
            <Query query={query.slug}>
              <Visualization />
            </Query>
          </DataProvider>
          : null
        }
        {operationType === 'showJson' ?
          <pre>
            {JSON.stringify(queryResult, null, 2)}
          </pre>
          : null
        }
      </SpaceVertical>
    </>
  )
}
