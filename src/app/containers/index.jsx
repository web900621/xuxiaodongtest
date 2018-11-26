import React from 'react'
import LeftPanel from '../components/leftpanel'
import Main from '../containers/main'
import RightPanel from '../components/rightpanel'
class App extends React.Component{
    render(){
        return (
          <div>
              <LeftPanel/>
              <Main/>
              <RightPanel/>
          </div>
        )
    }
}
export default App