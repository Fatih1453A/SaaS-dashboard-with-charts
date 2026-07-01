declare module 'react-sparklines' {
  import { Component, ReactNode } from 'react'

  export interface SparklinesProps {
    data?: number[]
    limit?: number
    width?: number
    height?: number
    svgWidth?: number
    svgHeight?: number
    preserveAspectRatio?: string
    margin?: number
    min?: number
    max?: number
    style?: React.CSSProperties
    children?: ReactNode
  }

  export interface SparklinesLineProps {
    color?: string
    style?: React.CSSProperties
  }

  export class Sparklines extends Component<SparklinesProps> {}
  export class SparklinesLine extends Component<SparklinesLineProps> {}
  export class SparklinesBars extends Component<{ style?: React.CSSProperties }> {}
  export class SparklinesSpots extends Component<{ size?: number; style?: React.CSSProperties }> {}
  export class SparklinesReferenceLine extends Component<{ type?: 'max' | 'min' | 'mean' | 'avg' | 'median' | 'custom'; value?: number; style?: React.CSSProperties }> {}
  export class SparklinesNormalBand extends Component<{ style?: React.CSSProperties }> {}
}
