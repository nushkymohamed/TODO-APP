import React from "react";
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from "../src/App";


Enzyme.configure({ adapter :new Adapter()});

describe('App' ,() => {
    it('should show text ', () =>{
        const wrapper =shallow(<App/>);
        const text =wrapper.find('div div ');
        expect(text.text()).toBe('Text goes here');

    });

    it('should hide text when button is clicked ', () =>{
        const wrapper =shallow(<App/>);
        const button =wrapper.find('button');
        button.simulate('click');
        const text =wrapper.find('div div ');
        expect(text.length).toBe(0);

    });

});

