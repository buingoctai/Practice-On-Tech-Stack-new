import React from 'react';
import './style.css';

const CssSwitchCaseConditions = ()=>{
    const onInputRange = (event) => {
        console.log('on input range',event.target);
        //event.target.parentNode.style.setProperty('--deplay',`${value}s`);
    }
    return (
        <div>
            <label className='labelWrap'>
                <div>animation-delay</div>
                <p>Controls the <code>delay</code> property of the animation using negative value</p>
                <input
                    type='range'
                    min='-100'
                    max='0'
                    value='-100'
                    onInput={(event) => onInputRange(event)}
                />
            </label>
        </div>
    );
}

export default CssSwitchCaseConditions;

// move state based styling to css
// giải quyết: separate business logic và visual style logic