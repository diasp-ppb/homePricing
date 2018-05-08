/*
 Reference: https://www2.deloitte.com/content/dam/Deloitte/sg/Documents/careers/sg-careers-deloitte-sg-50th-anniversary-art-competition-art-colour-palette.pdf
 */

const DeloittePrimary = {
  white: '#FFFFFF',
  black: '#000000',
  deloitteGreen: '#86BC25',
  green2: '#C4D600',
  green4: '#43B02A',
  green6: '#046A38',
  green7: '#2c5234',
  teal5: '#0097A9',
  blue2: '#62B5E5',
  blue3: '#00A3E0',
  blue4: '#0076A8',
  blue6: '#012169',
  coolGray2: '#D0D0CE',
  coolGray4: '#BBBCBC',
  coolGray7: '#97999B',
  coolGray9: '#75787B',
  coolGray11: '#53565A'
}


const DeloitteSecondary = {
  green1: '#E3E48D',
  green5: '#009A44',
  teal1: '#DDEFE8',
  teal2: '#9DD4CF',
  teal3: '#6FC2B4',
  teal4: '#00ABAB',
  teal6: '#007680',
  teal7: '#004F59',
  blue1: '#A0DCFF',
  blue5: '#005587',
  blue7: '#041E42',
  coolGray6: '#A7A8AA',
  coolGray10: '#63666A'
}

const colors = {
  background: '#1F0808',
  clear: 'rgba(0,0,0,0)',
  facebook: '#3b5998',
  transparent: 'rgba(0,0,0,0)',
  silver: '#F7F7F7',
  steel: '#CCCCCC',
  error: 'rgba(200, 0, 0, 0.8)',
  ricePaper: 'rgba(255,255,255, 0.75)',
  frost: '#D8D8D8',
  cloud: 'rgba(200,200,200, 0.35)',
  windowTint: 'rgba(0, 0, 0, 0.4)',
  panther: '#161616',
  charcoal: '#595959',
  coal: '#2d2d2d',
  bloodOrange: '#fb5f26',
  snow: 'white',
  ember: 'rgba(164, 0, 48, 0.5)',
  fire: '#e73536',
  drawer: 'rgba(30, 30, 29, 0.95)',
  eggplant: '#251a34',
  border: '#483F53',
  banner: '#5F3E63',
  text: '#E0D7E5'
}

export default {
  ...DeloittePrimary,
  ...DeloitteSecondary,
  colors
}
