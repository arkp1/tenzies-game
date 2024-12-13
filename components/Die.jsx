export default function Die(props) {
    const style = {
        backgroundColor : props.isHeld ? "#40F99B" : "white"
    }
  return (
    <>  
    <button style={style}
     onClick={props.hold}
     aria-label={`Die with value ${props.value}, 
     ${props.isHeld ? "held" : "not held"}`}
     >
    {props.value}
   </button>
   </>
  )
}
