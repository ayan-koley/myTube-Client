import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import {
  Home,
  SignUpPage,
  Login,
  PublishVideoPage,
  DashBoardPage,
  VideoplayerPage,
  ProfileSectionPage,
  SearchedVideoPage,
  ChannelProfilePage,
  PlaylistVideoPage
} from "./pages/index.js";
import HistoryPage from "./pages/HistoryPage.jsx";
import  AuthLayout  from "./Components/AuthLayout/AuthLayout.jsx";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <AuthLayout authenticationRequired={false}>
//         <App />
//       </AuthLayout>
//     ),
//     children: [
//       {
//         path: "/",
//         element: (
//           <AuthLayout authenticationRequired={false}>
//             <Home />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/searchedvideo",
//         element: (
//           <AuthLayout authenticationRequired={false}>
//             <SearchedVideoPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/sign-up",
//         element: (
//           <AuthLayout authenticationRequired={false}>
//             <SignUpPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthLayout authenticationRequired={false}>
//             <Login />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/upload-video",
//         element: (
//           <AuthLayout authenticationRequired={true}>
//             <PublishVideoPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/dashboard",
//         element: (
//           <AuthLayout authenticationRequired={true}>
//             <DashBoardPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/watch-history",
//         element: (
//           <AuthLayout authenticationRequired={true}>
//             <HistoryPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/video/:videoId",
//         element: (
//           <AuthLayout authenticationRequired={false}>
//             <VideoplayerPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/profile",
//         element: (
//           <AuthLayout authenticationRequired={true}>
//             <ProfileSectionPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/profile/:username",
//         element: (
//           <AuthLayout authenticationRequired={false}>
//             <ChannelProfilePage />
//           </AuthLayout>
//         )
//       },
//       {
//         path: "/:playlistId/videos",
//         element: (
//           <AuthLayout authenticationRequired={false}>
//             <PlaylistVideoPage />
//           </AuthLayout>
//         )
//       }
//     ],
//   },
// ]);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout authenticationRequired={false}>
        <App />
      </AuthLayout>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/login", element: <Login /> },
      { path: "/upload-video", element: <PublishVideoPage /> },
      { path: "/dashboard", element: <DashBoardPage /> },
      { path: "/watch-history", element: <HistoryPage /> },
      { path: "/video/:videoId", element: <VideoplayerPage /> },
      { path: "/searchedvideo", element: <SearchedVideoPage /> },
      { path: "/profile", element: <ProfileSectionPage /> },
      { path: "/profile/:username", element: <ChannelProfilePage /> },
      { path: "/:playlistId/videos", element: <PlaylistVideoPage /> },
    ].map(route => ({
      ...route,
      element: (
        <AuthLayout authenticationRequired={
          ["/upload-video", "/dashboard", "/watch-history", "/profile"].includes(route.path)
        }>
          {route.element}
        </AuthLayout>
      )
    }))
  }
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
