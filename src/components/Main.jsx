import React, { Component } from 'react';
import { Fragment } from 'react';
import Button from './button';

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ['/', '*', '-', '+'];
const ids = {
    7: 'seven',
    8: 'eight',
    9: 'nine',
    4: 'four',
    5: 'five',
    6: 'six',
    1: 'one',
    2: 'two',
    3: 'three',
    0: 'zero',
    '/': 'divide',
    '*': 'multiply',
    '-': 'subtract',
    '+': 'add'
}

class App extends Component {
    state = {
        calc: '',
        currentValue: '',
        calcDisplay: '',
        lastPressed: ''
    }
    shouldComponentUpdate = () => {
        let { calcDisplay, currentValue, calc, lastPressed } = this.state;
        if (currentValue.length > 14) {
            return false
        }
        return true
    }
    handleClick = event => {
        let { innerText } = event.target;

        // console.log(innerText)
        switch (innerText) {
            case '.':
                let { calc: calcc, currentValue: cV, calcDisplay: cD } = this.state;
                let copyOFCalcc = calcc.split(/[\+\-\*\/]/);
                copyOFCalcc = copyOFCalcc[copyOFCalcc.length - 1];

                if (copyOFCalcc.includes('.')) {
                    console.log('includes .')
                    // cV += '0';
                    // calcc += '0';
                } else if (copyOFCalcc == '.') {
                    // nothing!
                } else if (copyOFCalcc.split('')[0] === undefined) {
                    cV = '0.';
                    calcc += '0.';
                } else {
                    cV += '.';
                    calcc += '.';
                    // console.log(cV)
                    // console.log('heyyyy')
                }
                cD = calcc
                console.log(calcc)
                this.setState({
                    lastPressed: innerText,
                    currentValue: cV,
                    calc: calcc,
                    calcDisplay: cD
                })
                break;
            case '=':
                let { calc, currentValue, calcDisplay } = this.state;

                let result = eval(calc);
                calcDisplay += ('=' + result);

                this.setState({
                    calc: result,
                    currentValue: result,
                    calcDisplay,
                    lastPressed: innerText
                })
                break;
            case 'AC':
                this.setState({
                    calc: '',
                    currentValue: '',
                    calcDisplay: '',
                    lastPressed: innerText,
                })
                break;
            default:
                let b = parseInt(innerText);
                // check if an input number or not
                if (Number.isNaN(b)) {
                    let { calc, calcDisplay } = this.state;
                    if (calc === '') {
                        calc += innerText;
                    } else {
                        calc += innerText;
                    }
                    calcDisplay = calc;
                    this.setState({
                        calc,
                        currentValue: innerText,
                        calcDisplay,
                        lastPressed: innerText
                    })
                } else {

                    let { calc, currentValue, calcDisplay } = this.state;
                    if (calc === '') {
                        calc = innerText
                    } else {
                        calc += innerText;
                    }
                    const c = calc.split('')

                    const splitted = calc.split(/[\+\-\*\/]/);
                    calc = c.slice(c.findIndex(e => e == '.' || e > 0)).join('');
                    // calcDisplay = calc;
                    // console.log('splitted===');
                    // console.log(splitted)
                    calcDisplay = calc;

                    if (splitted.length == 1 && calcDisplay == 0) {
                        currentValue = '0';
                    } else {
                        currentValue = splitted[splitted.length - 1];
                    }


                    this.setState({
                        calc,
                        currentValue,
                        calcDisplay,
                        lastPressed: innerText
                    })
                }
                break;
        }
    }


    darkMode = event => {
        console.log('hello world!')
    }

    render() {
        const { calc, currentValue, calcDisplay } = this.state
        return (
            <Fragment>
                <div className="calculator">
                    <div id="container">
                        <div className="calc E">{calcDisplay}</div>
                        <div className="calc" id="display">{currentValue === '' ? '0' : currentValue}</div>
                    </div>
                    <div className="nums-container">
                        <Button onClick={this.handleClick} id="clear" nums="AC" className="longg" />
                        <Button onClick={this.darkMode} id={'moon'} >
                            <i className="far fa-moon"></i>
                        </Button>
                        {nums.map(e => {
                            return (
                                <Button key={e} nums={e} className={(e === 0 ? 'long' : '')} onClick={this.handleClick} id={ids[e]} />
                            )
                        })}
                        <Button onClick={this.handleClick} id="decimal" nums="." />
                    </div>
                    <div className="ops-container">
                        {
                            ops.map(e => {
                                return (
                                    <Button
                                        key={e}
                                        onClick={this.handleClick}
                                        id={ids[e]}
                                    >
                                        {e}
                                    </Button>
                                )
                            })
                        }
                        <Button
                            onClick={this.handleClick}
                            id="equals"
                        >
                            =
                        </Button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default App;