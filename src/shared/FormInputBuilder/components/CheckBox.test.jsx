import React from 'react';
import { shallow } from 'enzyme';
import CheckBox from './CheckBox';

const MOCK_DATA = {
    formState: 'other',
    meta: {
        label: 'Gender',
        items: [
            { key: 'male', value: 'Male' },
            { key: 'female', value: 'Female' },
            { key: 'other', value: 'other' },
        ],
        classes: 'col-6',
    },
    options: {},
    handler: () => {},
};

it('expect CheckBox to render', () => {
    expect(shallow(<CheckBox {...MOCK_DATA} />)).toMatchSnapshot();
});
