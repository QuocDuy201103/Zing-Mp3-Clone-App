import { Home, Login, Public, Personal, Album } from './containers/public';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import path from './ultis/path';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './store/actions'


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(actions.getHome())
  },[])

  return (
    <>

      <div className="App">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />} >
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MYMUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />



            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
    </>
  );
}

export default App;
