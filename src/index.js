import { useState } from "react"
import ReactDOM from "react-dom"
import App from "./App"

function Overlay() {
  const [ready, set] = useState(false)
  return (
    <>
      <App />
    </>
  )
}

ReactDOM.render(<Overlay />, document.getElementById("root"))
