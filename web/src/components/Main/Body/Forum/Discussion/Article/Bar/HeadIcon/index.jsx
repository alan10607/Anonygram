import { ICON_USER } from 'config/constant';
import { Fragment, useEffect, useState } from 'react';

export default function HeadIcon({ headUrl }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [headUrl])

  return (
    <Fragment>
      <img
        className={`head${headUrl && !error ? "" : " icon"}`}
        src={headUrl && !error ? headUrl : ICON_USER}
        onError={e => setError(true)}
        alt="ICON_USER"
      />
    </Fragment>
  )
}