import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
    let app = mount(<App/>);
    it('Renders the App Title', () => {
        expect(app.find('h2').text()).toEqual('Note To Self');
    });
    it('Renders the Clear Button',() => {
        expect(app.find('.btn').at(1).text()).toEqual('Clear Notes');
    });

    describe('Renders the Form', () => {
        it('Creates the Form Component', () => {
            expect(app.find('form').exists()).toEqual(true);
        });
        it('Renders the Form Control', () => {
            expect(app.find('.form-control').exists()).toBe(true);
        }); 
        it('Renders the Submit Button', () => {
            expect(app.find('.btn').at(0).text()).toEqual('Submit');
        });
    });

    describe('Renders creation of Note', () => {
        let testNote = 'test note';

        beforeEach(() => {
            app.find('FormControl').simulate('change', {
                target : { value : testNote }
            });
        });
        it('Updates Text in State', () => {
            expect(app.state().text).toEqual(testNote);
        });

        describe('Submission of New Note', () => {
            beforeEach(() => {
                app.find('.btn').at(0).simulate('click');
            });
            afterEach(() => {
                app.find('.btn').at(1).simulate('click');
            });
            it('Saving New Note to State', () => {
                expect(app.state().notes[0].text).toEqual(testNote);
            });
            
            describe('Remounting the Component', () => {
                let app2;
                beforeEach(() => {
                    app2 = mount(<App/>);
                });
                it('Reads Notes from Cookies', () => {
                    //console.log(app.state());
                    expect(app.state().notes[0]).toEqual({ text : testNote});
                });
            });

            describe('Click of Clear Button', () => {
                beforeEach(() => {
                    app.find('.btn').at(1).simulate('click');
                });
                it('Clears the Notes State', () => {
                    //console.log(app.state());
                    expect(app.state().notes).toEqual([]);
                });
            });
        });
    });
});