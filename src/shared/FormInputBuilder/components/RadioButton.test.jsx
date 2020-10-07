import React from 'react';
import { shallow } from 'enzyme';
import RadioButton from './RadioButton';
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
it('should render RadioButton componet', () => {
    expect(shallow(<RadioButton {...MOCK_DATA} />)).toMatchSnapshot();
});
