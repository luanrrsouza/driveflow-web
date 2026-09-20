import { Navigate, Route, Routes } from 'react-router'

import { DealerCreatePage } from '../features/dealers/pages/DealerCreatePage'
import { DealerEditPage } from '../features/dealers/pages/DealerEditPage'
import { DealerListPage } from '../features/dealers/pages/DealerListPage'

import { VehicleCreatePage } from '../features/vehicles/pages/VehicleCreatePage'
import { VehicleEditPage } from '../features/vehicles/pages/VehicleEditPage'
import { VehicleListPage } from '../features/vehicles/pages/VehicleListPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/vehicles" replace />}
      />

      <Route
        path="/dealers"
        element={<DealerListPage />}
      />

      <Route
        path="/dealers/new"
        element={<DealerCreatePage />}
      />

      <Route
        path="/dealers/:id/edit"
        element={<DealerEditPage />}
      />

      <Route
        path="/vehicles"
        element={<VehicleListPage />}
      />

      <Route
        path="/vehicles/new"
        element={<VehicleCreatePage />}
      />

      <Route
        path="/vehicles/:id/edit"
        element={<VehicleEditPage />}
      />

      <Route
        path="*"
        element={<Navigate to="/vehicles" replace />}
      />
    </Routes>
  )
}