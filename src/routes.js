import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Adddonation from "./pages/Donation/Adddonation/Adddonation"
import Editdonation from "./pages/Donation/Editdonation/Editdonation"
import Contact from "./pages/Contact/Contact"
import ContactInquiry from "./pages/ContactInquiry/ContactInquiry"
import Frontendsetting from "./pages/Frontendsetting/Frontendsetting"
import Pressreleases from "./pages/Pressreleases/Pressreleases"
import NotFound from './pages/Page404';
// ----------------------------------------------------------------------
import Donation from "./pages/Donation/Donation"
import Galleryimage from "./pages/Galleryimage/Galleryimage"
import AddPressreleases from "./pages/Pressreleases/AddPressreleases/AddPressreleases"
import EditPressreleases from "./pages/Pressreleases/EditPressreleases/EditPressreleases"
import AnnualReports from "./pages/AnnualReports/AnnualReports"
import AddAnnualReports from "./pages/AnnualReports/AddAnnualReports/AddAnnualReports"
export default function Router() {
  const Isloggin = localStorage.getItem('id_token');
  return useRoutes([
    {
      path: '/dashboard',
      element: Isloggin ? <DashboardLayout /> : <Navigate to="/" />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'donation', element: <Donation /> },
        { path: 'donation/donation/add', element: <Adddonation /> },
        { path: 'donation/donation/edit/:id', element: <Editdonation /> },
        { path: 'contact', element: <Contact /> },
        { path: 'inquiry-contacts', element: <ContactInquiry /> },
        { path: 'front-setting', element: <Frontendsetting /> },
        { path: 'gallery-image', element: <Galleryimage /> },
        { path: 'press-releases', element: <Pressreleases /> },
        { path: 'press-releases/press-releases/add', element: <AddPressreleases /> },
        { path: 'press-releases/press-releases/edit/:id', element: <EditPressreleases /> },
        { path: 'annual-reports', element: <AnnualReports /> },
        { path: 'annual-reports/annual-reports/add', element: <AddAnnualReports /> },

      ]
    },
    {
      path: '/',
      element: !Isloggin ? <LogoOnlyLayout /> : <Navigate to="/dashboard" />,
      children: [
        { path: '/', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
