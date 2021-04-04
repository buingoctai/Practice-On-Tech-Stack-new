import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

const Parent = (props)=>{
    const refParent = useRef(null);
    useEffect(()=>{
        console.log('Did mount',props.children);
        // console.log('Child node',document.querySelectorAll('.animation > *'));
        console.log('Child node',refParent.current.querySelectorAll('.animation > *'));
    },[]);


    return (
        <div className='animation' ref={refParent}>
            {props.children}
        </div>
    );
}

export default Parent;