import { Button, SpaceVertical } from "@looker/components"
import { useState } from 'react'
import { sdk } from '../helpers/Session'

export default function EmbedPage() {
  const [embedUrl, setEmbedUrl] = useState('')

  const handleEmbed = async () => {
    await sdk.create_sso_embed_url({
      target_url: `${process.env.REACT_APP_LOOKER_API_HOST}/embed/looks/11`,
      session_length: 300,
      external_user_id: 'stoba-signed-embed',
      permissions: [
        'access_data',
        'see_looks'
      ],
      models: ['e_commerce']
    }).then(res => {
      if (res.ok) setEmbedUrl(res.value.url)
    })
  }

  return (
    <>
      <SpaceVertical>
        <p>非公開埋め込み</p>
        <iframe
          src="https://centillionpartner.cloud.looker.com/embed/looks/11?allow_login_screen=false"
          title="Looker Embed"
          width="600"
          height="300">
        </iframe>
        <p>署名埋め込み</p>
        <Button onClick={handleEmbed}>Generate Embed URL</Button>
        {
          embedUrl ?
            <iframe
              src={embedUrl}
              title="Looker Embed"
              width="600"
              height="300">
            </iframe>
            : <div>no embed url</div>
        }
      </SpaceVertical>
    </>
  )
}
