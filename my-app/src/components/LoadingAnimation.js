import React from "react";
import ReactLoading from 'react-loading';

function LoadingAnimation(props) {
   return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column'}}>
          <ReactLoading type={"spinningBubbles"} color={'#9e4800'} height={200} width={200}/>
      </div>
   );
}

export default LoadingAnimation;
