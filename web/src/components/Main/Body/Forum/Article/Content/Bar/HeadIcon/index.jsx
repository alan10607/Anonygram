import { Fragment, useState, useEffect } from 'react';
import { ICON_USER } from 'config/constant';

export default function HeadIcon({ headUrl }) {
  const [error, setError] = useState(false);

  useEffect(() => {//reset if change headUrl
    setError(false);
  }, [headUrl])

  return (
    <Fragment>
      {headUrl && !error?
        <img className="head" src={headUrl} onError={e => setError(true)} alt="ICON_USER" /> :
        <img className="head icon" src={ICON_USER} alt="ICON_USER" />}
    </Fragment>
  )
}