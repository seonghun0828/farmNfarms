// import { ResponsiveLine } from '@nivo/line'

// const EXAMPLE_DATA = [
//   {
//     "id": "2021",
//     "color": "hsl(203, 70%, 50%)",
//     "data": [
//       {
//         "x": "30일전",
//         "y": 133
//       },
//       {
//         "x": "20일전",
//         "y": 49
//       },
//       {
//         "x": "10일전",
//         "y": 257
//       },
//       {
//         "x": "당일",
//         "y": 258
//       },
//     ]
//   },
//   {
//     "id": "2022",
//     "color": "hsl(203, 70%, 50%)",
//     "data": [
//       {
//         "x": "30일전",
//         "y": 133
//       },
//       {
//         "x": "20일전",
//         "y": 49
//       },
//       {
//         "x": "10일전",
//         "y": 257
//       },
//       {
//         "x": "당일",
//         "y": 258
//       },
//     ]
//   }
// ]

// const Graph = ({ priceData }) => {
//   const { thisYear, lastYear } = priceData.price;
  
//   const data = [
//     { 
//       "id": thisYear.year, "color:": "hsl(341, 70%, 50%)", 
//       "data" :[
//         {x:'30일전', y: thisYear.d30},
//         {x:'20일전', y: thisYear.d20},
//         {x:'10일전', y: thisYear.d10},
//         {x:'당일', y: thisYear.d0},
//       ]
//     }, 
//     {
//       "id": lastYear.year, "color": "hsl(341, 70%, 50%)", 
//       "data":[
//         {x:'30일전', y: lastYear.d30},
//         {x:'20일전', y: lastYear.d20},
//         {x:'10일전', y: lastYear.d10},
//         {x:'당일', y: lastYear.d0},
//       ]
//     }
//   ]
//   return (
//   <ResponsiveLine
//     data={data}
//     margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
//     xScale={{ type: 'point' }}
//     yScale={{
//       type: 'linear',
//       min: 'auto',
//       max: 'auto',
//       stacked: false,
//       reverse: false
//     }}
//     yFormat=" >-.0f"
//     axisTop={null}
//     axisRight={null}
//     axisBottom={{
//       orient: 'bottom',
//       tickSize: 5,
//       tickPadding: 5,
//       tickRotation: 0,
//       legend: priceData.product,
//       legendOffset: 36,
//       legendPosition: 'middle'
//     }}
//     axisLeft={{
//       orient: 'left',
//       tickSize: 8,
//       tickPadding: 5,
//       tickRotation: 0,
//       legend: '',
//       legendOffset: -20,
//       legendPosition: 'end'
//     }}
//     colors={{ scheme: 'category10' }}
//     lineWidth={5}
//     pointSize={11}
//     pointColor={{ theme: 'background' }}
//     pointBorderWidth={2}
//     pointBorderColor={{ from: 'serieColor' }}
//     pointLabelYOffset={-12}
//     areaOpacity={0.25}
//     useMesh={true}
//     legends={[
//         {
//           anchor: 'bottom-left',
//           direction: 'column',
//           justify: false,
//           translateX: 10,
//           translateY: -5,
//           itemsSpacing: 0,
//           itemDirection: 'left-to-right',
//           itemWidth: 80,
//           itemHeight: 20,
//           itemOpacity: 0.80,
//           symbolSize: 12,
//           symbolShape: 'circle',
//           symbolBorderColor: 'rgba(0, 0, 0, .5)',
//           effects: [
//             {
//               on: 'hover',
//               style: {
//                 itemBackground: 'rgba(0, 0, 0, .03)',
//                 itemOpacity: 1
//               }
//             }
//           ]
//         }
//       ]}
//     />
//   );
// }

// Graph.defaultProps = {
//   data: EXAMPLE_DATA,
// }

// export default Graph;