import React from 'react';

import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
      <LinksList/>
      <AddLink/>
    </div>
  );
}