import { configure, addDecorator, setAddon } from '@storybook/react';
// import requireContext from 'require-context.macro';

import '../src/assets/css/theme-dark.min.css';

import '../src/assets/fonts/feather/feather.min.css';
import '../src/assets/libs/highlight.js/styles/vs2015.css';
import '../src/assets/libs/select2/dist/css/select2.min.css';
import '../src/assets/libs/quill/dist/quill.core.css';
import '../src/assets/libs/flatpickr/dist/flatpickr.min.css';

// import { withInfo } from '@storybook/addon-info';

import chaptersAddon from 'react-storybook-addon-chapters';
setAddon(chaptersAddon);

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /.stories.js$/);
// const req = requireContext('../src/components', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

/*
last add-on to add :
https://github.com/evgenykochetkov/react-storybook-addon-props-combinations
*/

// console.log(styles.h1);

// addDecorator(
//   withInfo({
//     header: true,
//     inline: true,
//     styles: {
//       header: {
//         h1: {
//           color: 'red'
//           // styles.h1
//         },
//         body: {
//           color: 'blue'
//         }
//         // ...styles.h1
//       },
//       infoBody: {
//         backgroundColor: 'inherit',
//         color: 'green'
//         // ...styles
//       },
//       source: {
//         backgroundColor: 'inherit',
//         color: 'inherit'
//       }
//     }
//   })
// );

configure(loadStories, module);