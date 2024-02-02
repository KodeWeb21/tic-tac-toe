import "../styles/Button.css"
export default function Button({reset}){
  return <button className="btn" onClick={reset}>
    Play  Again
  </button>
}