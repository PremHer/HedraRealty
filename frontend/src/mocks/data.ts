export const dashboardKpis = [
  { label: 'Lotes disponibles', value: '128', tone: 'default' as const, trend: '+12 respecto al mes pasado' },
  { label: 'Reservas activas', value: '32', tone: 'warning' as const, trend: '5 vencen esta semana' },
  { label: 'Colocaciones', value: '64', tone: 'positive' as const, trend: '+18% vs meta mensual' }
];

export const projects = [
  {
    id: 'proj-luna-azul',
    icon: 'trend',
    name: 'Residencial Luna Azul',
    status: 'En comercialización',
    manager: 'Carolina León',
    location: 'Pisco, Ica',
    stage: 'Etapa 2 de 4',
    progressSales: 0.32,
    progressWorks: 0.18,
    lotsTotal: 240,
    lotsAvailable: 128
  },
  {
    id: 'proj-sol-andino',
    icon: 'plan',
    name: 'Condominio Sol Andino',
    status: 'En planificación',
    manager: 'José Palacios',
    location: 'Cusco',
    stage: 'Lanzamiento Q4 2025',
    progressSales: 0,
    progressWorks: 0.06,
    lotsTotal: 180,
    lotsAvailable: 180
  },
  {
    id: 'proj-vista-mar',
    icon: 'build',
    name: 'Vista del Mar Premium',
    status: 'En obra',
    manager: 'Silvia Paredes',
    location: 'Máncora, Piura',
    stage: 'Urbanización avanzada',
    progressSales: 0.56,
    progressWorks: 0.42,
    lotsTotal: 320,
    lotsAvailable: 140
  }
];

export const lots = [
  {
    id: 'lot-a-01',
    code: 'A-01',
    block: 'A',
    area: 120,
    price: 52000,
    status: 'Disponible',
    project: 'Residencial Luna Azul'
  },
  {
    id: 'lot-a-02',
    code: 'A-02',
    block: 'A',
    area: 130,
    price: 54800,
    status: 'Reservado',
    project: 'Residencial Luna Azul'
  },
  {
    id: 'lot-b-04',
    code: 'B-04',
    block: 'B',
    area: 115,
    price: 49800,
    status: 'Separado',
    project: 'Residencial Luna Azul'
  },
  {
    id: 'lot-c-10',
    code: 'C-10',
    block: 'C',
    area: 145,
    price: 58000,
    status: 'Vendido',
    project: 'Vista del Mar Premium'
  }
];

export const cashflowSummary = [
  { id: 'cf-1', concept: 'Cobros del mes', amount: 186000, variation: '+8% vs. mes anterior' },
  { id: 'cf-2', concept: 'Egresos de obra', amount: -92000, variation: 'Incluye valorización proveedor' },
  { id: 'cf-3', concept: 'Penalidades por mora', amount: 6800, variation: 'Sin variación' }
];