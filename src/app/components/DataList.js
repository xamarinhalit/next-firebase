export default (props)=>(
    <ul>
          {props.data!=undefined?props.data.map((item,i)=>(
                  <li key={i} onClick={()=>this.SendClick()} >
                  {item.name}
                </li>
            )):null}
            
        </ul>
);