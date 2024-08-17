import React from 'react'

export default function MovieInfo(props) {
    let { movie } = props;

  return (
    <div>
        <ul>
            <li>{movie.original_title}</li>
            <li>{movie.release_date}</li>
            <li>{movie.revenue}</li>
            <li>{movie.runtime}</li>
        </ul>
    </div>
  )
}
