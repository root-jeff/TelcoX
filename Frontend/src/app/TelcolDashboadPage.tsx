import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
  useTheme,
  Button,
  Chip,
} from "@mui/material";
import {
  CreditCardOutlined,
  DataUsageOutlined,
  PhoneInTalkOutlined,
  WifiOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../global/redux";
import { ApiEndpoints } from "../api";

export interface IConsumos {
  id: number;
  tipo: any;
  cantidad: string;
  fecha: string;
}
// Tipos
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const consumoColumns = [
  { field: "tipo", headerName: "Tipo", flex: 1 },
  { field: "cantidad", headerName: "Cantidad Consumida", flex: 1 },
  { field: "fecha", headerName: "Fecha", flex: 1 },
];

const suscripcionColumns = [
  {
    field: "tipo",
    headerName: "Tipo",
    flex: 1,
    renderCell: (params) => (
      <Typography>{params.row.paquete ? "Paquete" : "Servicio"}</Typography>
    ),
  },
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 1,
    renderCell: (params) => (
      <Typography>
        {params.row.paquete?.nombre || params.row.servicio?.nombre}
      </Typography>
    ),
  },
  {
    field: "precio",
    headerName: "Precio",
    flex: 1,
    renderCell: (params) => (
      <Typography>
        ${params.row.paquete?.precio || params.row.servicio?.precio}
      </Typography>
    ),
  },
  {
    field: "estado",
    headerName: "Estado",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.row.estado}
        color={params.row.estado === "ACTIVO" ? "success" : "error"}
        size="small"
      />
    ),
  },
  {
    field: "fechaFin",
    headerName: "Vence",
    flex: 1,
    renderCell: (params) => (
      <Typography>
        {new Date(
          params.row.finSuscripcion || params.row.finSuscriopcion
        ).toLocaleDateString()}
      </Typography>
    ),
  },
];

export const TelcoDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [consumos, setConsumos] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const {
    auth: { idUsuario },
  } = useGlobalStore();

  const url = ApiEndpoints.BaseURL + ApiEndpoints.BaseApi;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch consumos
        const [consumosPaquetes, consumosServicios] = await Promise.all([
          fetch(`${url}/consumos/paquetes/${idUsuario}`).then((res) =>
            res.json()
          ),
          fetch(`${url}/consumos/servicios/${idUsuario}`).then((res) =>
            res.json()
          ),
        ]);

        const formattedConsumos = [
          ...consumosPaquetes,
          ...consumosServicios,
        ].map((consumo, index) => ({
          id: index,
          tipo: consumo.tipo_recurso || consumo.servicio.tipo,
          cantidad: `${consumo.cantidad_consumida} ${
            consumo.servicio?.unidadMedida || "MB"
          }`,
          fecha: new Date(consumo.fecha).toLocaleDateString(),
        }));

        setConsumos(formattedConsumos);
        setLoading(false);

        // Fetch suscripciones
        const [suscripcionesPaquetes, suscripcionesServicios] =
          await Promise.all([
            fetch(`${url}/suscripciones/paquetes/${idUsuario}`).then(
              (res) => res.json()
            ),
            fetch(`${url}/suscripciones/servicios/${idUsuario}`).then(
              (res) => res.json()
            ),
          ]);

        const formattedSuscripciones = [
          ...suscripcionesPaquetes.map((sub) => ({
            ...sub,
            id: `p-${sub.id}`,
          })),
          ...suscripcionesServicios.map((sub) => ({
            ...sub,
            id: `s-${sub.id}`,
          })),
        ];

        setSuscripciones(formattedSuscripciones);
        setLoadingSubs(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoadingSubs(false);
      }
    };

    fetchData();
  }, []);

  // StatsCard component remains the same
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

  // Calcular total de facturación
  const totalFacturacion = suscripciones.reduce((total, sub) => {
    const precio = sub.paquete?.precio || sub.servicio?.precio || 0;
    return total + parseFloat(precio);
  }, 0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<ShoppingCartOutlined />}
            onClick={() => navigate("suscripciones")}
            sx={{ mb: 2 }}
          >
            Ver Paquetes y Servicios
          </Button>
        </Box>

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
              title="Total Facturación"
              value={`$${totalFacturacion.toFixed(2)}`}
              icon={<CreditCardOutlined />}
              color={theme.palette.primary.main}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
            <StatsCard
              title="Datos Usados"
              value={`${consumos
                .reduce(
                  (total, consumo) =>
                    consumo.tipo === "DATOS"
                      ? total + parseFloat(consumo.cantidad)
                      : total,
                  0
                )
                .toFixed(2)} MB`}
              icon={<DataUsageOutlined />}
              color={theme.palette.success.main}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
            <StatsCard
              title="Minutos Usados"
              value={`${consumos
                .reduce(
                  (total, consumo) =>
                    consumo.tipo === "MINUTOS"
                      ? total + parseFloat(consumo.cantidad)
                      : total,
                  0
                )
                .toFixed(0)} min`}
              icon={<PhoneInTalkOutlined />}
              color={theme.palette.warning.main}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
            <StatsCard
              title="Servicios Activos"
              value={suscripciones
                .filter((sub) => sub.estado === "ACTIVO")
                .length.toString()}
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
                  data: [0, 45, 52, 38, 62, 55, 48],
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
                Historial de Consumos
              </Typography>
              <DataGrid
                rows={consumos}
                columns={consumoColumns}
                autoHeight
                loading={loading}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5 },
                  },
                }}
              />
            </Paper>
          </Box>

          <Box sx={{ flex: "1 1 400px", minWidth: "300px" }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Suscripciones Activas
              </Typography>
              <DataGrid
                rows={suscripciones}
                columns={suscripcionColumns}
                autoHeight
                loading={loadingSubs}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5 },
                  },
                }}
              />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
