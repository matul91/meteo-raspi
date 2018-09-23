const generator = require('typescript-react-svg-icon-generator')

const config = {
    svgDir: './resources/assets/images/icons/',
    destination: './resources/assets/js/src/components/svgIcon/SvgIcon.tsx',
    tslintDisable: true
}
generator(config)
