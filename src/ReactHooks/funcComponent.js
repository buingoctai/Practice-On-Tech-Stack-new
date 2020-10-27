OverReact = (function () {
    let context = {};
    let callId = -1;
    function render(Component) {
        context.Component = Component;
        const instance = Component();
        instance.render();
        // reset the callId after every render
        callId = -1;
        // ensuring that instance.render is not available out OverReact.render
        delete instance.render;
        context.instance = instance;
        return context;
    }
    function useState(initialState) {
        if (!context) {
            throw new Error('hooks can not be called with out a rendering context');
        }
        if (!context.hooks) {
            context.hooks = [];
        }

        callId = callId + 1;

        const hooks = context.hooks;
        const currentState = hooks[callId] ? hooks[callId] : initialState;
        hooks[callId] = currentState;
        const setState = function () {
            const currentCallId = callId;
            return function (newState) {
                hooks[currentCallId] = newState;
                render(context.Component);
            }
        }();

        return [currentState, setState];
    }
    return {
        render,
        useState
    }
}());
const { render, useState } = OverReact;
function Component() {
    const [counter, setCounter] = useState(0);
    const [name, setName] = useState('bùi ngọc tài');

    function plusOne() {
        setCounter(counter + 1);
    }

    function updateName(name) {
        setName(name);
    }
    function render() {
        console.log(`rendered, counter: ${counter}, name: ${name}`);
    }

    return {
        render,
        plusOne,
        updateName
    }
}

const context = render(Component);
context.instance.plusOne();
context.instance.updateName('bui ngoc teo');