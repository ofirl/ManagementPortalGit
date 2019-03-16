import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Input />, div);

    const inputElement = div.querySelector('input');
    expect(inputElement).not.toBe(null);

    ReactDOM.unmountComponentAtNode(div);
});