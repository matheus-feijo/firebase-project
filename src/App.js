import { HomePage } from './Pages/HomePage';
import {Pagina404} from "./Pages/Pagina404";
import {Cadastro} from "./Pages/Cadastro";

import {BrowserRouter, Route,Switch} from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import { Success } from './Pages/Sucess';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <AuthProvider>
          <Switch>
              <Route path={"/"} exact component={HomePage} />
              <Route path={"/cadastro"} exact component={Cadastro}/>
              <Route path={"/sucess"} exact component={Success}/>
              <Route component={Pagina404} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>

  );
}

export default App;
