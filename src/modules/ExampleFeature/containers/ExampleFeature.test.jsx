import React from 'react';
import { shallow } from 'enzyme';
import ExampleFeature from './ExampleFeature';
import formInputConfig from './form.config';

it('expect CheckBox to render', () => {
    expect(shallow(<ExampleFeature {...formInputConfig} />)).toMatchSnapshot();
});
