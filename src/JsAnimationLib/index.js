import React from 'react';
import anime from 'animejs/lib/anime.es';

const JsAnimationLib = () => {
    const onClickContainer=()=>{
        var elements = document.querySelectorAll('.item');
        anime({
            targets: elements,
            translateX: 270
          });
    }
    return (<div onClick={()=>onClickContainer()} style={{width:'500px',height:'500px',backgroundColor:'cornsilk'}}>
       <div className='item' style={{width:'50px',height:'50px',backgroundColor:'aquamarine', margin:'10px 10px'}} />
       <div className='item' style={{width:'50px',height:'50px',backgroundColor:'aquamarine', margin:'10px 10px'}}/>
       <div className='item' style={{width:'50px',height:'50px',backgroundColor:'aquamarine', margin:'10px 10px'}}/>
    </div>);
}

export default JsAnimationLib;