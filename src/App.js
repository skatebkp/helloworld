import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';

const cubejsApi = cubejs('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpIjo0MDIwOX0.RJCWIKz9CeLg8DE94JFpbkZVxbCdenKhta28LnTwhtE');

export default () => {
  return (
    <QueryRenderer 
      query={{
        measures: ['integration_log.count'],
        dimensions: ['integration_log.date_created']
      }} 
      cubejsApi={cubejsApi} 
      render={({ resultSet }) => {
        if (!resultSet) {
          return 'Loading...';
        }

        return (
          <LineChart data={resultSet.rawData()}>
            <XAxis dataKey="integration_log.date_created"/>
            <YAxis/>
            <Line type="monotone" dataKey="integration_log..count" stroke="#8884d8"/>
          </LineChart>
        );
      }}
    />
  )
}