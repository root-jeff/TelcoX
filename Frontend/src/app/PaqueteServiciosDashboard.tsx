import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions,
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ApiEndpoints } from '../api';
import { useGlobalStore } from '../global/redux';

export const PackageServiceDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const url = ApiEndpoints.BaseURL + ApiEndpoints.BaseApi;

    const {
      auth: { idUsuario },
    } = useGlobalStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesRes, servicesRes, subscriptionsRes] = await Promise.all([
          fetch(`${url}/paquetes/`),
          fetch(`${url}/servicios/`),
          fetch(`${url}/paquetes/activos/${idUsuario}/`)
        ]);
        
        const packagesData = await packagesRes.json();
        const servicesData = await servicesRes.json();
        const subscriptionsData = await subscriptionsRes.json();
        
        setPackages(packagesData);
        setServices(servicesData);
        setActiveSubscriptions(subscriptionsData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const handleSubscribe = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${url}/suscripciones/paquetes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paquete: selectedItem.id,
          usuario: idUsuario,
          inicioSuscripcion: new Date().toISOString().split('T')[0],
          finSuscripcion: new Date(Date.now() + selectedItem.duracion * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }),
      });

      if (response.ok) {
        setOpenDialog(false);
        // Actualizar la lista de suscripciones activas
        const updatedSubscriptions = await fetch(`${url}/paquetes/activos/${idUsuario}/`).then(res => res.json());
        setActiveSubscriptions(updatedSubscriptions);
      } else {
        throw new Error('Error al procesar la suscripción');
      }
    } catch (error) {
      setError('Error al procesar la suscripción');
    }
    setSubmitting(false);
  };

  const renderItem = (item, isPackage) => {
    const isSubscribed = activeSubscriptions.some(sub => sub.id === item.id);
    
    return (
      <Card 
        key={item.id}
        sx={{ 
          m: 2, 
          width: { xs: '100%', sm: '45%', md: '30%' },
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {item.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.descripcion}
          </Typography>
          <Typography variant="h6" color="primary">
            ${item.precio}
          </Typography>
          {isPackage && (
            <>
              <Typography variant="body2">
                Datos: {item.datos} MB
              </Typography>
              <Typography variant="body2">
                Minutos: {item.minutos}
              </Typography>
            </>
          )}
          <Typography variant="body2">
            Duración: {item.duracion} días
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto' }}>
          <Button 
            size="small" 
            color="primary"
            onClick={() => {
              setSelectedItem(item);
              setOpenDialog(true);
            }}
            disabled={isSubscribed}
          >
            {isSubscribed ? 'Ya Suscrito' : 'Suscribirse'}
          </Button>
        </CardActions>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Tabs 
        value={tabValue} 
        onChange={(_, newValue) => setTabValue(newValue)}
        centered={!isMobile}
        variant={isMobile ? "scrollable" : "standard"}
      >
        <Tab label="Paquetes" />
        <Tab label="Servicios" />
      </Tabs>

      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'flex-start',
          mt: 3
        }}
      >
        {tabValue === 0 ? 
          packages.map(pkg => renderItem(pkg, true)) :
          services.map(service => renderItem(service, false))
        }
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Suscripción</DialogTitle>
        <Formik
          initialValues={{}}
          validationSchema={Yup.object({})}
          onSubmit={handleSubscribe}
        >
          {({ isSubmitting }) => (
            <Form>
              <DialogContent>
                <Typography>
                  ¿Estás seguro que deseas suscribirte a {selectedItem?.nombre}?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Precio: ${selectedItem?.precio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duración: {selectedItem?.duracion} días
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Confirmar'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};
