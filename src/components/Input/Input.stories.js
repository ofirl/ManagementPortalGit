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
          {/* <Card.Text className="pb-4">
                        general stuff
                    </Card.Text> */}
          {story()}
        </Card.Body>
      </Card>
    </div>
    // {story()}
  ))
  .addWithChapters(
    'Default',
    {
      useTheme: false,
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (<Input defaultValue="some value" />),
              options: {
                showPropTables: true
              }
            }
          ]
        }
      ]
    }
  )
  .addWithChapters(
    'Callbacks',
    {
      useTheme: false,
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (<Input defaultValue="some value" {...actions} />),
              options: {
                showPropTables: true
              }
            }
          ]
        }
      ]
    }
  )
  .addWithChapters(
    // 'Story With Chapters',
    'Variants',
    {
      useTheme: false,
      title: null,
      subtitle: null,
      info: null,
      chapters: [
        // List of chapters.
        {
          title: "Size",
          subtitle: "",
          info: "",
          sections: [
            // List of sections.
            {
              title: "Small",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input size="sm" />)
              // options: {
              // showSource: false,
              // allowSourceToggling: true,
              // showPropTables: true,
              // allowPropTablesToggling: true,
              // },
            },
            {
              title: "Medium",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input placeholder="some value" />)
            },
            {
              title: "Large",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input placeholder="some value" size="lg" />)
            },
          ],
        },
        {
          title: "Validity",
          subtitle: "",
          info: "",
          sections: [
            {
              title: "Valid",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input placeholder="some value" valid />)
            },
            {
              title: "Invalid",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input placeholder="some value" valid={false} />)
            },
          ],
        },
        {
          title: "Icons",
          subtitle: "",
          info: "",
          sections: [
            {
              title: "Appended",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input placeholder="some value" icon="search" />)
            },
            {
              title: "Prepended",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input placeholder="some value" icon="search" prepend />)
            },
          ],
        },
        {
          title: "Clear button",
          subtitle: "",
          info: "",
          sections: [
            {
              title: "",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input placeholder="some value" clearButton />)
            }
          ],
        },
        {
          title: "Flushed",
          subtitle: "",
          info: "",
          sections: [
            {
              title: "",
              subtitle: "",
              info: "",
              sectionFn: () => (<Input placeholder="some value" flush />)
            }
          ],
        },
        {
          title: "Prop types",
          sections: [{
            title: "",
            sectionFn: () => (<Input className="d-none" />),
            options: {
              showSource: false,
              // allowSourceToggling: false,
              showPropTables: true
              // allowPropTablesToggling: false
            }
          }]
        }
      ]
    }
  );
;