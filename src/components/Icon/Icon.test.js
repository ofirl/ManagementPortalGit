import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './Icon';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Icon type="search" />, div);

    const inputElement = div.querySelector('i');
    expect(inputElement).not.toBe(null);

    ReactDOM.unmountComponentAtNode(div);
});