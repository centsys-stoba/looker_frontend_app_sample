import { sdk } from '../helpers/Session'
import { DataProvider } from '@looker/components-data'
import { Query, Visualization } from '@looker/visualizations'
import { Button, Space, SpaceVertical, Form, FieldText, FieldSelect } from '@looker/components'
import { useState } from 'react'

export default function QueryPage() {
  const [query, setQuery] = useState(null)
  const [form, setForm] = useState({
    model: 'e_commerce',
    view: 'orders',
    fields: 'orders.created_date,orders.count',
  })
  const [visualizeConfig, setVisualizeConfig] = useState({
    type: 'line'
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

  const handleVisualizeConfigChange = (v) => {
    setVisualizeConfig({ type: v })
  }

  const handleCreateQuery = async () => {
    await sdk.create_query({
      model: form.model,
      view: form.view,
      fields: form.fields.split(',').map(item => item.trim()),
      limit: 100,
      vis_config: { 
        type: visualizeConfig.type,
      }
    }).then(res => {
      setQuery(res.value)
    })
  }

  const runQuery = () => {
    sdk.run_query({ query_id: query.id, result_format: 'json_detail' })
      .then(res => {
        setQueryResult(res)
      })
  }

  const handleVisualize = async () => {
    setOperationType('visualize')
  }

  const handleShowJson = async () => {
    await runQuery()
    setOperationType('showJson')
  }

  return (
    <>
      <SpaceVertical minWidth="600px">
        <p>Login and get access token before creating a query.</p>
        <Form>
          <FieldText label='model' name='model' type='text' value={form.model} onChange={handleFormChange} />
          <FieldText label='view' name='view' type='text' value={form.view} onChange={handleFormChange} />
          <FieldText label='fields' name='fields' type='text' value={form.fields} onChange={handleFormChange} />
          <FieldSelect label='visualizeType' name='type' value={visualizeConfig.type} onChange={handleVisualizeConfigChange} 
            options={[
              { label: 'area', value: 'area' },
              { label: 'bar', value: 'bar' },
              { label: 'column', value: 'column' },
              { label: 'line', value: 'line' },
              { label: 'scatter', value: 'scatter' },
              { label: 'single_value', value: 'single_value' },
              { label: 'sparkline', value: 'sparkline' },
              { label: 'table', value: 'table' },
              { label: 'pie', value: 'pie' },
            ]}
          />
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
          <>
            <DataProvider sdk={sdk}>
              <Query query={query.slug} >
                <Visualization height={600} width={800} />
              </Query>
            </DataProvider>
          </>
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
