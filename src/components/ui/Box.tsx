import { styled } from '@mui/material'
import { COLOR_PALLETE } from '@utils/constants'

const { grey } = COLOR_PALLETE

const Box = styled('div')(
  () => `
        box-sizing: border-box;
        padding: 16px;
        border-radius: 16px;
        background-color: white;
        border-color: ${grey[200]}
  `
)

export default Box
