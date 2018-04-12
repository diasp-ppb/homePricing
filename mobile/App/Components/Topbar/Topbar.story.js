import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Topbar from './Topbar'

storiesOf('Topbar')
  .add('Default', () => (
    <Topbar
      title='Pesquisar Anúncios'
    />
  ))
