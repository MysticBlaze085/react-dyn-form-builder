import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
    test('snapshot renders', () => {
        const component = shallow(<App />);
        expect(component).toMatchSnapshot();
    });
});
