import { sdk } from '../helpers/Session'
import { DataProvider } from '@looker/components-data'
import { Query, Visualization } from '@looker/visualizations'
import { Button, Label, InputText } from '@looker/components'
import { useState } from 'react'

export default function QueryPage() {
  const [slug, setSlug] = useState('')
  const [form, setForm] = useState({
    model: 'okayama_info',
    view: 'population',
    fields: 'population.city_name,population.total_population',
  })

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
      setSlug(res.value.slug)
    })
  }

  return (
    <>
      <div>
        <Label>Model</Label>
        <InputText name='model' type='text' value={form.model} onChange={handleFormChange} />
        <Label>View</Label>
        <InputText name='view' type='text' value={form.view} onChange={handleFormChange} />
        <Label>Fields</Label>
        <InputText name='fields' type='text' value={form.fields} onChange={handleFormChange} />
        <Button onClick={handleCreateQuery}>
          Create Query
        </Button>
      </div>
      {slug ?
        <>
          <div>
            Query slug: {slug}
          </div>
          <DataProvider sdk={sdk}>
            <Query query={slug}>
              <Visualization />
            </Query>
          </DataProvider>
        </>
        :
        <div>no slug</div>
      }
    </>
  )
}
