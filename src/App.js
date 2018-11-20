import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import cubejs from '@cubejs-client/core';
import numeral from 'numeral';
import { QueryRenderer } from '@cubejs-client/react';

const cubejsApi = cubejs('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpIjo0MDIwOX0.RJCWIKz9CeLg8DE94JFpbkZVxbCdenKhta28LnTwhtE');

export default () => {
  return (
    <QueryRenderer 
      query={{
        measures: ['AdyenEventDataQueue.count'],

        timeDimensions: [{
          dimension: 'AdyenEventDataQueue.createdAt',
          dateRange: ['2018-11-20', '2018-11-20'],
          granularity: 'hour'
        }]
      }} 
      cubejsApi={cubejsApi} 
      render={({ resultSet }) => {
        if (!resultSet) {
          return 'Loading...';
        }

        return (
          (resultSet) => (
            <h1 height={300}>
              { numeral(resultSet.chartPivot()[0]['AdyenEventDataQueue.count']).format('$0,0.00') }
            </h1>
 )

        );
      }}
    />
  )
}