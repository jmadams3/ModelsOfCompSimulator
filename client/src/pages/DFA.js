import React, { Component } from 'react'
import './styles.css';
import { DFAModel } from '../components/input/DFAModel';
import State from '../components/state/State';
import Arrow from '../components/arrow/arrow';

export default class DFA extends Component {
    outputDest = [];
    outputSymbols = [];

    constructor(props) {
        super(props);
        // set the states to their current values in local storage
        this.state = {
            alphabetDFA: localStorage.getItem('alphabetDFA'),
            statesDFA: localStorage.getItem('statesDFA'),
            startingStateDFA: localStorage.getItem('startingStateDFA'),
            acceptingStatesDFA: localStorage.getItem('acceptingStatesDFA'),
            transitionsDFA: localStorage.getItem('transitionsDFA'),
            inputDFA: localStorage.getItem('input'),
            modelStates: [],
            modelTransitions: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _showMessage = (bool) => {
        this.setState({
            showMessage: bool
        })
    }

    // Update the states as keys are pressed
    handleChange(evt, field) {
        this.setState({ [field]: evt.target.value });
        localStorage.setItem([field], evt.target.value);
    }

    // On submit, run the correct model simulation
    handleSubmit(event) {

        //if (page === "DFA") {
        console.log("Test1");
        let new_model = new DFAModel(this.state.startingStateDFA, this.state.acceptingStatesDFA, this.state.statesDFA, this.state.alphabetDFA, this.state.transitionsDFA);
        //console.log(new_model.checkInputString(this.state.input));
        let output = new_model.checkInputString(this.state.inputDFA);
        this.setState({
            modelStates: output[0].dest.name,
            modelTransitions: output[0].symbol
        });
        this.outputDest = [];
        this.outputSymbols = [];
        this.outputDest.push(output[0].source.name)
        for (let i = 0; i < output.length; i++) {
            this.outputDest.push(output[i].symbol);
            this.outputDest.push(output[i].dest.name);
        }
        console.log(this.outputDest, this.outputSymbols);

    }

    render() {

        return (
            <>
                <div className='contain'>
                    <h1>DFA</h1>
                    <div className='inputArea'>
                        <form onSubmit={this.handleSubmit} className="input" id="form" >
                            <div className='formGroup'>
                                <label>Alphabet:</label>
                                <input type="text" value={this.state.alphabetDFA} onChange={(event) => this.handleChange(event, "alphabetDFA")} name="alphabet" placeholder='ex: 0, 1' />

                            </div>
                            <div className='formGroup'>
                                <label>States:</label>
                                <input type="text" value={this.state.statesDFA} onChange={(event) => this.handleChange(event, "statesDFA")} name="states" placeholder='ex: A, B' />
                            </div>
                            <div className='formGroup'>
                                <label>Starting State:</label>
                                <input type="text" value={this.state.startingStateDFA} onChange={(event) => this.handleChange(event, "startingStateDFA")} name="startingState" placeholder='ex: A' />
                            </div>
                            <div className='formGroup'>
                                <label>Accepting States:</label>
                                <input type="text" value={this.state.acceptingStatesDFA} onChange={(event) => this.handleChange(event, "acceptingStatesDFA")} name="acceptingStates" placeholder="ex: B" />
                            </div>
                            <div className='formGroup'>
                                <label>Transitions:</label>
                                <input type="text" value={this.state.transitionsDFA} onChange={(event) => this.handleChange(event, "transitionsDFA")} name="transitions" placeholder="ex: (0, A, A); (1, A, B); (1, B, A); (0, B, B)" />
                            </div>
                            <div className='formGroup'>
                                <label>Input:</label>
                                <input type="text" value={this.state.inputDFA} onChange={(event) => this.handleChange(event, "inputDFA")} name="input" placeholder="ex: 10101" />
                            </div>
                            <div className='btnGroup'>
                                <input onClick={(event) => this.handleSubmit(event)} type="button" value="Run" />
                            </div>
                        </form>
                    </div>

                </div>
                <div className='visualArea'>
                    {this.outputDest.map((txt, index) => {
                        if (index % 2 == 0)
                            return <State symbol={txt}></State>
                        return <Arrow symbol={txt} />
                    })}
                </div>

            </>

        )

    }
}