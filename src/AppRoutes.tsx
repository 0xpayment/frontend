import React, { FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Components from 'src/pages/Components'
import Send from 'src/pages/Send'
import Stats from 'src/pages/Stats'
import TransactionPage from 'src/pages/Transaction'

const AppRoutes: FC = () => {
  return (
    <Switch>
      { <Route path="/order" component={Send} />

      /*<Route path="/convert" component={Convert} />
      <Route path="/pool" component={Pools} />
      <Route path="/stake" component={Stake} />
      <Route path="/stats" component={Stats} />
      <Route path="/withdraw" component={Withdraw} />

      <Route exact path={['/tx', '/tx/:hash']} component={TransactionPage} />

      <Route path="/components" component={Components} /> */}

      <Redirect to="/order" />
    </Switch>
  )
}

export default AppRoutes
