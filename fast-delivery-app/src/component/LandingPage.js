import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateUser from './CreateUser'

function LandingPage() {
  return (
    <>
      <p>Landing Page</p>
      <Switch>
        <Route path='/CreateUser' component={CreateUser} />
      </Switch>
    </>
  )
}

export default LandingPage