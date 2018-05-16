import React from 'react';

import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import LinksListFilter from './LinksListFilter';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
      <LinksListFilter/>
      <AddLink/>
      <LinksList/>
    </div>
  );
}