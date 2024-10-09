import { List, ListItem } from '@looker/components'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <List>
      <ListItem>
        <Link to={"/"}>Home</Link>
      </ListItem>
      <ListItem>
        <Link to={"/query"}>Query</Link>
      </ListItem>
      <ListItem>
        <Link to={"/embed"}>Embed</Link>
      </ListItem>
    </List>
  )
}

