//import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/home';
import SignUpSide from './routes/register';
import NavBar from './components/containers/navbar/navbar';
import ResponsiveDrawer from './routes/dashboard/sidebar-material';
import { theme } from './styles/temp_style';
import { MuiThemeProvider } from "@material-ui/core/styles";



function App() {

  console.log = console.warn = console.error = () => {};
  return (
    <div className="App">
       <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/' exact component={Home}/>  
          <Route path='/home' exact component={Home}/>
          <Route path='/register' exact component={SignUpSide}/>
          <Route path='/dashboard' component={ResponsiveDrawer}/>
        </Switch>
      </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
