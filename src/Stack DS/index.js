//  trong stack, chỉ top item mới có thể bị get hoặc remove khỏi cấu trúc dữ liệu này

const Stack = (function () {
    function Stack() {
        this.length = 0;
        this.stack = [];
    }
    // Thêm item vào stack
    Stack.prototype.push = function (value) {
        this.stack[this.length] = value;
        this.length++;
    }
    // Xóa item cuối của stack và trả về giá trị
    Stack.prototype.pop = function () {
        if (!this.length) {
            return 'Stack is empty';
        }
        this.length--;
        const res = this.stack[this.length];
        this.stack = this.stack.splice(0, this.length);
        return res;
    }
    // Trả về length của stack
    Stack.prototype.size = function () {
        return this.length;
    }
    // Trả về giá trị item cuối
    Stack.prototype.peek = function () {
        return this.stack[this.length - 1];
    }
    // Xuất tất cả item
    Stack.prototype.show = function () {
        for (let i = 0; i < this.length; i++) {
            console.log(this.stack[i]);
        }
    }
    return Stack;
}());

const Stack = (function () {

}());

const myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.push(5);
console.log("truoc khi thực hiện các actions");

myStack.show();
console.log("item bị pop khỏi stack:", myStack.pop());
console.log("item cuối cùng trong stack ", myStack.peek());
console.log("length stack", myStack.size());

console.log("sau khi thực hiện các actions");
myStack.show();
