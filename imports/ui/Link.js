import React from 'react';

import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import LinksListFilter from './LinksListFilter';

export default () => {
  return (
    <div>
      <PrivateHeader title="exWARE.Lnks"/>
      <div className="page-content">
        <LinksListFilter/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
}