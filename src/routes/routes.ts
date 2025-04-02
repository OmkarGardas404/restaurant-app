import { FC, lazy, LazyExoticComponent } from "react";
import { Paths } from "./paths";

type RouteObject = {
    element: LazyExoticComponent<FC>,
    path: string
}

export const routes: readonly RouteObject[] = [
    {
        element: lazy(() => import('@/pages/Landing')),
        path:Paths.LANDING
    },
    {
        element: lazy(() => import('@/pages/Login')),
        path:Paths.LOGIN
    },
    {
        element: lazy(() => import('@/pages/Signup')),
        path:Paths.SIGNUP
    },
    {
        element: lazy(() => import('@/pages/BookTable')),
        path:Paths.BOOKTABLE
    },
    {
        element: lazy(() => import('@/pages/LocationDetails')),
        path:`${Paths.LOCATION}/:id`
    }

]