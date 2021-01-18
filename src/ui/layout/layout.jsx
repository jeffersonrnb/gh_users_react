import React from 'react'
import Header from '../../ui/layout/header';

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <div className="content">
        {children}
      </div>
    </React.Fragment>
  );
}
