import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { Suspense, FC, lazy } from "react";

const ErrorBoundry = lazy(() => import("@/pages/handlers/ErrorBoundry"));

const App: FC = () => {
  return (
    <>
      <Suspense fallback={<main className="flex items-center justify-between min-h-screen">Loading...</main>}>
        <ErrorBoundry>
          <Routes>
            {routes.map((obj) => {
              return (
                <Route
                  key={obj.path}
                  path={obj.path}
                  element={<obj.element />}
                />
              );
            })}
          </Routes>
        </ErrorBoundry>
      </Suspense>
    </>
  );
};

export default App;
