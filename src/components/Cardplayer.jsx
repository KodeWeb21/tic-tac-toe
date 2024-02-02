import "../styles/Cardplayer.css";
import Circle from "./Circle";
import Cross from "./Cross";

function Player({ player, victories }) {
  if (player === "o") {
    return (
      <div className="cardplayer__bg">
        <Circle size={20}/>
        <span>: {victories}</span>
      </div>
    );
  }

  return (
    <div className="cardplayer__bg">
      <Cross size={25}/>
      <span>: {victories}</span>
    </div>
  );
}
export default function Cardplayer(victories) {
  const {x,o} = victories.victories;
  return (
    <>
      <header className="header">
        <Player player="o" victories={o} />
        <Player player="x" victories={x} />
      </header>
    </>
  );
}
