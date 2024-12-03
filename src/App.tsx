//@ts-nocheck
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import ProjectAnalytics from './pages/ProjectAnalytics';
import DemoPage from './pages/DemoPage';
import WTCL0 from './pages/WTCL0';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <DefaultLayout>
                <PageTitle title="CMO SWAR | DASHBOARD" />
                <ECommerce />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/activity"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Activity | CMOSWAR" />
                <Chart />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />

        <Route path='/demo' element={
          <>
            <DefaultLayout>
              <PageTitle title="Try it out" />
              <DemoPage />
            </DefaultLayout>
          </>
        } />

        <Route path='/project/:projectname'
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Try it out" />
                {/* <ProjectAnalytics /> */}
                <WTCL0 />
              </DefaultLayout>
            </>
          } />
        <Route path='project/wtc/l0' element={
          <DefaultLayout>
            <PageTitle title="Try it out" />
            {/* <WTCL0 /> */}
            <div className='relative'>
              <ProjectAnalytics />
            </div>
          </DefaultLayout>} />



        <Route path='project/:projectname/report' element={
          <DefaultLayout>
            <PageTitle title="Try it out" />
            {/* <WTCL0 /> */}
            <div className='relative'>
              <ProjectAnalytics />
            </div>
          </DefaultLayout>} />
      </Routes>
    </>
  );
}

export default App;
