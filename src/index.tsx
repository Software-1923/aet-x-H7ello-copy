import React from 'react';
import Layout from './app/layout.tsx'; // Layout bileşenini doğru yoldan içe aktarın

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <div>Welcome to the Index Page</div>
    </Layout>
  );
};

export default IndexPage;
