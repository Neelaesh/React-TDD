import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from './note';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const cookie_key = "NOTES";

class App extends React.Component {
    
    constructor() {
        super();
        this.state = {
            text : '',
            notes : []
        }
    }

    componentDidMount = () => {
        this.setState({
            notes : read_cookie(cookie_key)
        })
    }

    submit = () => {
        const { notes, text } = this.state;
        notes.push({ text });
        this.setState({
            notes
        }, ()=>{
            console.log("State ",this.state);
        });
        bake_cookie(cookie_key, notes);
    }

    clear = () => {
        delete_cookie(cookie_key);
        this.setState({
            notes : []
        });
    }

    render(){
        return(
            <div>
                <h2>Note To Self</h2>
            <Form>
                <FormControl onChange={event => this.setState({ text : event.target.value }) }/>
                <Button onClick= {this.submit}>Submit</Button>
            </Form>
            {
                this.state.notes.map( (note, index) => {
                    return(
                        <Note key={index} note={note}></Note>
                    )
                })
            }
            <Button onClick={this.clear}>Clear Notes</Button>
            </div>
        )
    }
}

export default App