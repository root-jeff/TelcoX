// TelcoDashboard.tsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CreditCardOutlined,
  DataUsageOutlined,
  PhoneInTalkOutlined,
  WifiOutlined,
} from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";
import { DataGrid } from "@mui/x-data-grid";

// Tipos
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

// Datos de ejemplo
const dataUsage = [0, 45, 52, 38, 62, 55, 48].map((value, index) => ({
  x: index,
  y: value,
}));

const serviceColumns = [
  { field: "service", headerName: "Servicio", flex: 1 },
  { field: "details", headerName: "Detalles", flex: 1 },
  { field: "status", headerName: "Estado", flex: 1 },
];

const serviceRows = [
  {
    id: 1,
    service: "Internet Fibra",
    details: "100 Mbps",
    status: "Activo",
  },
  {
    id: 2,
    service: "Plan Móvil Premium",
    details: "Ilimitado",
    status: "Activo",
  },
];

const billColumns = [
  { field: "period", headerName: "Período", flex: 1 },
  { field: "amount", headerName: "Monto", flex: 1 },
  { field: "status", headerName: "Estado", flex: 1 },
  { field: "dueDate", headerName: "Vencimiento", flex: 1 },
];

const billRows = [
  {
    id: 1,
    period: "Mayo 2024",
    amount: "$89.99",
    status: "Pagada",
    dueDate: "15/05/2024",
  },
  {
    id: 2,
    period: "Abril 2024",
    amount: "$89.99",
    status: "Pagada",
    dueDate: "15/04/2024",
  },
];

// Componente de tarjeta de estadísticas
const StatsCard = ({ title, value, icon, color }: StatsCardProps) => (
  <Card sx={{ width: "100%" }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {value}
          </Typography>
        </Box>
        <Box sx={{ color }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

export const TelcoDashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
            <StatsCard
              title="Saldo Actual"
              value="$245.50"
              icon={<CreditCardOutlined />}
              color={theme.palette.primary.main}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
            <StatsCard
              title="Datos Usados"
              value="45.2 GB"
              icon={<DataUsageOutlined />}
              color={theme.palette.success.main}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
            <StatsCard
              title="Minutos Usados"
              value="320 min"
              icon={<PhoneInTalkOutlined />}
              color={theme.palette.warning.main}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
            <StatsCard
              title="Velocidad Internet"
              value="100 Mbps"
              icon={<WifiOutlined />}
              color={theme.palette.info.main}
            />
          </Box>
        </Box>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Consumo de Datos
          </Typography>
          <Box sx={{ height: 300 }}>
            <LineChart
              xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6] }]}
              series={[
                {
                  data: dataUsage.map((point) => point.y),
                  area: true,
                },
              ]}
              height={300}
            />
          </Box>
        </Paper>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box sx={{ flex: "1 1 400px", minWidth: "300px" }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Servicios Activos
              </Typography>
              <DataGrid
                rows={serviceRows}
                columns={serviceColumns}
                autoHeight
                hideFooter
                disableRowSelectionOnClick
              />
            </Paper>
          </Box>

          <Box sx={{ flex: "1 1 400px", minWidth: "300px" }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Facturación Reciente
              </Typography>
              <DataGrid
                rows={billRows}
                columns={billColumns}
                autoHeight
                hideFooter
                disableRowSelectionOnClick
              />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
