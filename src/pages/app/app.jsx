import logo from '../../assets/img/logo.svg';
import '../../assets/css/app.scss';
import Layout from '../../ui/layout/layout';

export default function App() {
  return (
    <Layout>
      <div className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </Layout>
  );
}
