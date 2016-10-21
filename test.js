var chai = require('chai');
var assert = require('assert');
var expect = chai.expect;
var calc = require('./calc');
var sinon = require('sinon');

// PT1 Mocha
describe('hello world!', function() {
    it('should fail', function() {
        assert.equal(true, false);
    });

    it('1 + 1 equals?', function() {
        assert.equal(1 + 2, 3);
    })
});

// Show watch argument

// PT2 Add some chai
describe('expect style', function() {
    it('should fail too!', function() {
        expect(true).to.be.true;
    });

    it('should compare two strings', function() {
        expect('test').to.equal('test');
    });

    it('should compare two objects', function() {
        var obj1 = {
            name: 'test'
        };

        var obj2 = {
            name: 'test'
        };

        // expect(obj1).to.equal(obj2);
        expect(obj1).to.eql(obj2);
    });

    it('can test external functions!', function() {
        // Arrange
        var result;

        // Act
        result = calc.add(2, 4);

        // Assert
        expect(result).to.equal(6);
    });
    var obj;
    describe('you can nest blocks...', function() {
        // For test setup
        beforeEach(function() {
            obj = {
                name: 'Jon',
                age: 24
            };
        });

        // For test cleanup
        afterEach(function() {
            obj = null;
        });

        it('with more test cases', function() {
            // obj = {
            //     name: 'Jon',
            //     age: 24
            // };

            expect(obj.age).to.be.above(20);
        });

        it('you can reuse parts of your test', function() {
            // obj = {
            //     name: 'Jon',
            //     age: 24
            // };

            expect(obj.name.length).to.be.below(4);
        });

        // it.only('can also be tested exlusively', function() {
        //     expect(add(1, 15)).to.be.above(10);
        // });

        // it.skip('can also skip specific tests', function() {
        //     expect(true).to.be.false;
        // });
    });
});

describe('Spies, stubs and mocks!', function() {
    var spy;
    describe('spies', function() {
        beforeEach(function() {
            spy = sinon.spy(calc, 'add');
        });

        afterEach(function() {
            spy.restore()
        });

        it('Can tell us a lot about calls made', function() {
            calc.add(5, 10);
            expect(spy.calledOnce).to.be.true;
        });

        it('We can check a calls arguments', function() {
            calc.add(10, 20);
            expect(spy.calledWith(10, 20)).to.be.true;
        });
    });

    describe('stubs', function() {
        it('can fake a response', function() {
            sinon.stub(calc, 'add').returns(42);
            var result = calc.add(10, 11);
            expect(result).to.equal(42);
            calc.add.restore();
        });
    });

    describe('mocks', function() {
       it('replaces entire objects', function() {
           var expectation = sinon.mock(calc).expects('add').once();
           calc.add(2, 5);
           expect(expectation.verify()).to.be.true;
       })
    });
});

