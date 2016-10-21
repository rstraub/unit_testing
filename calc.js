function add(value, otherValue) {
    return value + otherValue;
}

function subtract(value, otherValue) {
    return value - otherValue;
}

var calc = {
    add: add,
    subtract: subtract
};

module.exports = calc;
