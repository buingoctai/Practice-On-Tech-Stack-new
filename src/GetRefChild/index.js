import React from 'react';
import Parent from './parent';
import Child from './child';

const GetRefChild = ()=>{
    return (
        <Parent>
            <Child/>
        </Parent>
    );
}

export default GetRefChild;