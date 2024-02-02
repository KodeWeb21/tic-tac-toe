import "../styles/Circle.css"
export default function Circle({size}){
  return <span className="circlePlayer" style={{
    width: size,
    height: size,
  }}></span>
}