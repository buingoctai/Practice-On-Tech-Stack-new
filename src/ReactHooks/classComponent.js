// Tạo ra IIFE (immediately invoked function expression)
const OverReact = (function () {
    function render(Component) {
        const instance = new Component();
        instance.render();
        return instance;
    }

    class Component {
        constructor(props) {
            this.props = props;
        }
        setState(state) {
            this.state = state;
            // trigger rerender
            this.render();
        }
    }
    return {
        render,
        Component
    }
}());

const { render, Component } = OverReact; // tạo ra hàm render và class Component để log xem hoạt động của setState trên class component

class ExtendedComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            name: 'bui ngoc tai'
        };
    }

    plusOne() {
        const { state: previousState } = this;
        let { counter } = previousState;
        counter = counter + 1;
        this.setState(Object.assign(previousState, { counter }));
    }
    updateName(name) {
        const { state: previousState } = this;
        this.setState(Object.assign(previousState, { name }));
    }

    render() {
        const { counter, name } = this.state;
        console.log(`rendered, counter: ${counter}, name: ${name}`);
    }
}


// testing
// const instance = render(ExtendedComponent);
// instance.plusOne();
// instance.updateName('bui ngoc teo');


// ta thấy khi gọi setState thì hàm render được gọi, ở đây ta log để xem cách render func bị trigger
// đó là trường hợp class component

// xét trường hợp function component
// đầu tiên, thế nào closure?
// bất kỳ biến nào được khai báo trong một func, chỉ dc truy cập bởi các đối tượng khác trong phạm vi function đó, tuy nhiên nếu trong một func má func đó lại 
// return về 1 func khác , thì các biến trong func lớn ấy có thể bi truy cập bởi tất cả các đối tượng khác trong func trong cùng.

function greet(text) {
    console.log(text);
    return function () {
        console.log(text);
    }
}

const func = greet("xin chào");
func();