import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Svg, G, Path} from 'react-native-svg';
import * as d3 from 'd3-shape';

export type Props = {
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
  coverFill?: string | null;
  coverRadius?: number;
  style?: StyleProp<ViewStyle>;
  children?: any;
};

const PieChart = ({
  widthAndHeight,
  series,
  sliceColor,
  coverFill = null,
  coverRadius,
  style = {},
  children,
}: Props): JSX.Element => {
  const radius = widthAndHeight / 2;
  const pieGenerator = d3.pie().sort(null);
  const arcs = pieGenerator(series);

  return (
    <Svg style={style} width={widthAndHeight} height={widthAndHeight}>
      <G transform={`translate(${widthAndHeight / 2}, ${widthAndHeight / 2})`}>
        {arcs.map((arc: any, i: number) => {
          let arcGenerator = d3
            .arc()
            .outerRadius(radius)
            .startAngle(arc.startAngle)
            .endAngle(arc.endAngle);

          // When 'coverFill' is also provided, instead of setting the
          // 'innerRadius', we draw a circle in the middle. See the 'Path'
          // after the 'map'.
          if (!coverRadius) {
            arcGenerator = arcGenerator.innerRadius(0);
          } else {
            arcGenerator = arcGenerator.innerRadius(coverRadius * radius);
          }

          // TODO: Pad: "stroke": "black, "stroke-width": "2px"
          //       OR: use padAngle

          return (
            <Path key={arc.index} fill={sliceColor[i]} d={arcGenerator()} />
          );
        })}

        {coverRadius && coverRadius > 0 && coverFill && (
          <Path
            key="cover"
            fill={coverFill}
            d={d3
              .arc()
              .outerRadius(coverRadius * radius)
              .innerRadius(0)
              .startAngle(0)
              .endAngle(360)()}
          />
        )}
      </G>
      <View style={styles.content}>{children}</View>
    </Svg>
  );
};

export {PieChart};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
