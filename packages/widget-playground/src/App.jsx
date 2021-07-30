import React from 'react'
import CombaseWidget from '@combase.app/widget/src/main';

function App() {
  return (
    <div className="App">
	  <CombaseWidget organization={import.meta.env.VITE_APP_ORGANIZATION_ID} theme="light" />
    </div>
  )
}

export default App
