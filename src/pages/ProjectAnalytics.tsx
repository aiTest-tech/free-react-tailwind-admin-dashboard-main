import React from 'react'
import { useParams } from 'react-router-dom';
import Chart from './Chart';

const ProjectAnalytics = () => {
    const params = useParams()
    console.log(params);
  return (
    <div>
      <h1>Project analytics {params.projectname}</h1>
      <Chart />
    </div>
  )
}

export default ProjectAnalytics