import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import Input from './Input';
import Card from 'react-bootstrap/Card';

export const actions = {
    onInput: action('onInput')
};

let sizeKnob = {
    label: 'size',
    options: {
        Small: 'sm',
        Medium: '',
        Large: 'lg'
    },
    defaultValue: ''
}

storiesOf('Input', module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
        // <div style={{ padding: '3rem' }}>
        //     <div className="pb-4">
        //         general stuff
        //     </div>

        //     {story()}
        // </div>
        <div className="p-4">
            <Card>
                <Card.Header>
                    <Card.Title className="mb-0">
                        Input
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        general stuff
                    </Card.Text>
                    {story()}
                </Card.Body>
            </Card>
        </div>
    ))
    .add('default', () => <Input defaultValue="some value" {...actions} />)
    .add('small size', () => {
        const size = select(sizeKnob.label, sizeKnob.options, 'sm');

        return (<Input defaultValue="some value" size={size} {...actions} />);
    })
    .add('large size', () => {
        const size = select(sizeKnob.label, sizeKnob.options, 'lg');

        return (<Input defaultValue="some value" size={size} {...actions} />);
    })
    .add('valid', () => <Input defaultValue="some value" valid {...actions} />)
    .add('invalid', () => <Input defaultValue="some value" valid={false} {...actions} />)
    .add('flushed', () => <Input defaultValue="some value" flush {...actions} />)
    .add('flushed valid', () => <Input defaultValue="some value" valid flush {...actions} />)
    .add('flushed invalid', () => <Input defaultValue="some value" valid={false} flush {...actions} />)
    .add('appended icon', () => <Input defaultValue="some value" icon="search" {...actions} />)
    .add('prepended icon', () => <Input defaultValue="some value" icon="search" prepend="false" {...actions} />)
    .add('clear button', () => <Input defaultValue="some value" clearButton {...actions} />)
    .add('appended icon with clear button', () => <Input defaultValue="some value" icon="search" prepend="false" clearButton {...actions} />)
    .add('prepended icon with clear button', () => <Input defaultValue="some value" icon="search" clearButton {...actions} />)
    .addWithChapters(
        'Story With Chapters',
        {
          subtitle: "<Optional story subtitle>",
          info: "<Optional story info>",
          chapters: [
            // List of chapters.
            {
              title: "<Optional chapter title>",
              subtitle: "<Optional chapter subtitle>",
              info: "<Optional chapter info>",
              sections: [
                // List of sections.
                {
                  title: "<Optional section title>",
                  subtitle: "<Optional section subtitle>",
                  info: "<Optional section info>",
                  sectionFn: () => (<Input />),
                  options: {
                    showSource: true,
                    allowSourceToggling: true,
                    showPropTables: true,
                    allowPropTablesToggling: true,
                  },
                },
              ],
            },
          ]
        }
      );
    ;