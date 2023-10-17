import { Injectable } from "@angular/core";
import { type } from "os";
import swal from "sweetalert2";
import { ModulesService } from "../../master-services/modules/modules.service";

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: "Inicio",
    main: [
      {
        state: "master",
        short_label: "I",
        name: "Inicio",
        type: "sub",
        icon: "ti-home",
        children: [
          {
            state: "master",
            name: "Inicio",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "erp",
        short_label: "E",
        name: "ERP",
        type: "sub",
        icon: "ti-direction",
        children: [
          {
            state: "customers",
            name: "Administrar Clientes",
          },
          {
            state: "condicion",
            name: "Administrar Margen ",
          },

          {
            state: "regionalsAll",
            name: "Administrar Sucursales",
          },
          {
            state: "estimateAll",
            name: "Cotizaciones",
          },
          {
            state: "estimateCustomer",
            name: "Crear Cotización",
          },
          {
            state: "settlementAll",
            name: "Liquidaciones",
          },
          {
            state: "settlementCustomer",
            name: "Crear Liquidación",
          },
          {
            state: "registerOffice",
            name: "Administrar Sedes",
          },
          {
            state: "costCenter",
            name: "Administrar Centros de Costo",
          },
          {
            state: "subCostCenter",
            name: "Administrar Sub Centros de Costo",
          },
          {
            state: "warehouses",
            name: "Administrar Bodegas",
          },
          {
            state: "estimateCountries",
            name: "Administrar Paises Cotización",
          },
          {
            state: "priceCountriesDhl",
            name: "Administrar Tabla DHL",
          },
          {
            state: "estimateConfiguration",
            name: "Configuración de Cotizaciones",
          },
          {
            state: "LogTrm",
            name: "Histórico TRM",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "maintenance",
        short_label: "N",
        name: "Mantenimiento",
        type: "sub",
        icon: "ti-pulse",
        children: [
          {
            state: "forkliftShow",
            name: "Administrar Montacargas",
          },
          {
            state: "masterbattery",
            name: "Administrar baterías",
          },
          {
            state: "statusForklift",
            name: "Estado de Equipos",
          },
          {
            state: "forkliftReport",
            name: "Reporte de Técnico",
          },
          {
            state: "horometro",
            name: "Administrar Horometro",
          },
          {
            state: "resumenes",
            name: "Administrar Hojas de Vida",
          },
          {
            state: "controlTechnician",
            name: "Gestión de Mantenimientos",
          },
          {
            state: "controlMaintenanceForklift",
            name: "Gestión de Mantenimientos Por Equipos",
          },
          {
            state: "pending",
            name: "Gestión de Pendientes",
          },
          {
            state: "prevetiveMaintenance",
            name: "Asignar Mantenimiento Preventivo",
          },
          {
            state: "correctiveMaintenance",
            name: "Asignar Mantenimiento Correctivo",
          },
          {
            state: "checklistMaintenance",
            name: " Asignar Checklist",
          },
          {
            state: "batteryForklif",
            name: " Asignar Bateria",
          },
          {
            state: "registerForkliftReport",
            name: "Diligenciar Reporte Técnico",
          },
          {
            state: "platformTechinician",
            name: "Asignar Mantenimieto Plataforma",
          },
          {
            state: "stevedoreTechinician",
            name: "Asignar Mantenimieto Estibadores",
          },
          {
            state: "personalMonitoring",
            name: "Seguimiento Personal",
          },
          {
            state: "work_dashboard",
            name: "Administrar Rutinas Preventivas",
          },
          {
            state: "checklists",
            name: "Administrar Mantenimiento Checklist",
          },
          {
            state: "technicianReport",
            name: "Administrar Reporte Técnico",
          },
          {
            state: "platforms",
            name: "Administrar Mantenimiento Plataformas",
          },
          {
            state: "stevedores",
            name: "Administrar Mantenimiento Estibadores",
          },

          {
            state: "question",
            name: "Administrar Encuesta de Mantenimiento",
          },
          {
            state: "toilet",
            name: "Administrar Registro Aseo",
          },
          {
            state: "personalActivities",
            name: "Administrar Actividades del Personal",
          },

          {
            state: "registerBrand",
            name: "Administrar Marcas",
          },
          {
            state: "registerModel",
            name: "Administrar Modelos",
          },
          {
            state: "registerTyre",
            name: "Administrar Tipo de Llantas",
          },
          {
            state: "registerFuel",
            name: "Administrar Combustibles",
          },
          {
            state: "registerMachine",
            name: "Administrar Maquinas",
          },
          {
            state: "maintenanceSystem",
            name: "Administrar Sistemas",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "configuracion",
        short_label: "N",
        name: "Configuración",
        type: "sub",
        icon: "ti-panel",
        children: [
          {
            state: "register",
            name: "Administrar Usuarios",
          },
          {
            state: "registerTypeDocument",
            name: "Administrar Tipo Documento",
          },
          {
            state: "registerPaymentCondition",
            name: "Administrar Condiciones de Pago",
          },
          {
            state: "createSlider",
            name: "Administrar Noticias",
          },
          {
            state: "changePassword",
            name: "Cambio de Contraseña",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "reports",
        short_label: "R",
        name: "Informes",
        type: "sub",
        icon: "ti-stats-up",
        children: [
          {
            state: "reportsDuration",
            name: "Duración de Mantenimientos",
          },
          {
            state: "reportsForkliftMaintenance",
            name: "Mantenimientos por Equipos",
          },
          {
            state: "reportAsingFinish",
            name: "Rutinas Asignadas Vs Realizadas",
          },
          {
            state: "reportSystemMaintenance",
            name: "Reporte De Sistemas Mas Usados",
          },
          {
            state: "pendingReport",
            name: "Pendientes de los Equipos",
          },
          {
            state: "reportEstimateSettlement",
            name: "Reporte De Costos Por Cotizaciones",
          },
          {
            state: "reportIndicatorMaintenance",
            name: "Reporte De Cumplimiento de Mantenimiento",
          },
          {
            state: "reportsDurationTimesMaintenance",
            name: "Reporte De Diferencia de Tiempo en el Mantenimiento Correctivo",
          },
          {
            state: "horometerForklift",
            name: "Reporte Horometro De Equipos",
          },
          {
            state: "timeOutForklift",
            name: "Reporte Tiempo Muerto De Equipos",
          },
          {
            state: "maintenanceSettlement",
            name: "Reporte Mantenimientos Liquidados",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "catalogue",
        short_label: "C",
        name: "Catálogos Técnicos",
        type: "sub",
        icon: "ti-archive",
        children: [
          {
            state: "brandContents",
            name: "Administrar Marca",
          },
          {
            state: "modelContents",
            name: "Administrar Modelo",
          },
          {
            state: "brandModelContents",
            name: "Gestionar Archivos",
          },
          {
            state: "viewPdfCatalogue",
            name: "Ver Archivos",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "support",
        short_label: "S",
        name: "Soporte",
        type: "sub",
        icon: "ti-headphone-alt",
        children: [
          {
            state: "supportMain",
            name: "Generación Tickets",
          },
        ],
      },
    ],
  },
];

const MENUCUSTOMER = [
  {
    label: "Inicio",
    main: [
      {
        state: "master",
        short_label: "I",
        name: "Inicio",
        type: "sub",
        icon: "ti-home",
        children: [
          {
            state: "master",
            name: "Inicio",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "master",
        short_label: "E",
        name: "ERP",
        type: "sub",
        icon: "ti-direction",
        children: [
          {
            state: "estimateAll",
            name: "Cotizaciones",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "maintenance",
        short_label: "N",
        name: "Mantenimiento",
        type: "sub",
        icon: "ti-pulse",
        children: [
          {
            state: "forkliftShow",
            name: "Administrar Montacargas",
          },
          {
            state: "statusForklift",
            name: "Estado de Equipos",
          },
          {
            state: "horometro",
            name: "Administrar Horometro",
          },
          {
            state: "resumenes",
            name: "Administrar Hojas de Vida",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "support",
        short_label: "S",
        name: "Soporte",
        type: "sub",
        icon: "ti-headphone-alt",
        children: [
          {
            state: "supportMain",
            name: "Generación Tickets",
          },
        ],
      },
    ],
  },
];

const MENUASSIGN = [
  {
    label: "Inicio",
    main: [
      {
        state: "master",
        short_label: "I",
        name: "Inicio",
        type: "sub",
        icon: "ti-home",
        children: [
          {
            state: "master",
            name: "Inicio",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "master",
        short_label: "E",
        name: "ERP",
        type: "sub",
        icon: "ti-direction",
        children: [
          {
            state: "estimateAll",
            name: "Cotizaciones",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "maintenance",
        short_label: "N",
        name: "Mantenimiento",
        type: "sub",
        icon: "ti-pulse",
        children: [
          {
            state: "forkliftShow",
            name: "Administrar Montacargas",
          },
          {
            state: "statusForklift",
            name: "Estado de Equipos",
          },
          {
            state: "horometro",
            name: "Administrar Horometro",
          },
          {
            state: "resumenes",
            name: "Administrar Hojas de Vida",
          },
          {
            state: "correctiveMaintenance",
            name: "Asignar Mantenimiento Correctivo",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "support",
        short_label: "S",
        name: "Soporte",
        type: "sub",
        icon: "ti-headphone-alt",
        children: [
          {
            state: "supportMain",
            name: "Generación Tickets",
          },
        ],
      },
    ],
  },
];

const MENUFINANCIAL = [
  {
    label: "Inicio",
    main: [
      {
        state: "master",
        short_label: "I",
        name: "Inicio",
        type: "sub",
        icon: "ti-home",
        children: [
          {
            state: "master",
            name: "Inicio",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "master",
        short_label: "E",
        name: "ERP",
        type: "sub",
        icon: "ti-direction",
        children: [
          {
            state: "register",
            name: "Administrar Usuarios",
          },
          /* {
            state: 'modules',
            name:  'Administrar Modules'
          }, */
          {
            state: "costCenter",
            name: "Administrar Centros de Costo",
          },
          {
            state: "subCostCenter",
            name: "Administrar Sub Centros de Costo",
          },
          {
            state: "warehouses",
            name: "Administrar Bodegas",
          },
          /*
         {
            state: 'task',
            name: 'Administrar tareas'
          },*/
          {
            state: "createSlider",
            name: "Administrar Noticias",
          },
          {
            state: "customers",
            name: "Administrar Clientes",
          },
          {
            state: "regionalsAll",
            name: "Administrar Sucursales",
          },
          {
            state: "registerTypeDocument",
            name: "Administrar Tipo Documento",
          },
          {
            state: "registerPaymentCondition",
            name: "Administrar Condiciones de Pago",
          },
          {
            state: "estimateCountries",
            name: "Administrar Paises Cotización",
          },
          {
            state: "priceCountriesDhl",
            name: "Administrar Tabla DHL",
          },
          {
            state: "estimateConfiguration",
            name: "Configuración de Cotizaciones",
          },
          {
            state: "LogTrm",
            name: "Histórico TRM",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "support",
        short_label: "S",
        name: "Soporte",
        type: "sub",
        icon: "ti-headphone-alt",
        children: [
          {
            state: "supportMain",
            name: "Generación Tickets",
          },
        ],
      },
    ],
  },
];

const MENUCREATOR = [
  {
    label: "Inicio",
    main: [
      {
        state: "master",
        short_label: "I",
        name: "Inicio",
        type: "sub",
        icon: "ti-home",
        children: [
          {
            state: "master",
            name: "Inicio",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "master",
        short_label: "E",
        name: "ERP",
        type: "sub",
        icon: "ti-direction",
        children: [
          {
            state: "estimateAll",
            name: "Cotizaciones",
          },
          {
            state: "estimateCustomer",
            name: "Crear Cotización",
          },
          {
            state: "settlementAll",
            name: "Liquidaciones",
          },
          {
            state: "settlementCustomer",
            name: "Crear Liquidación",
          },
          {
            state: "registerOffice",
            name: "Administrar Sedes",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "maintenance",
        short_label: "N",
        name: "Mantenimiento",
        type: "sub",
        icon: "ti-pulse",
        children: [
          {
            state: "forkliftShow",
            name: "Administrar Montacargas",
          },
          {
            state: "statusForklift",
            name: "Estado de Equipos",
          },
          {
            state: "horometro",
            name: "Administrar Horometro",
          },
          {
            state: "resumenes",
            name: "Administrar Hojas de Vida",
          },
          {
            state: "controlTechnician",
            name: "Gestión de Mantenimientos",
          },
          {
            state: "controlMaintenanceForklift",
            name: "Gestión de Mantenimientos Por Equipos",
          },
          {
            state: "pending",
            name: "Gestión de Pendientes",
          },
          {
            state: "prevetiveMaintenance",
            name: "Asignar Mantenimiento Preventivo",
          },
          {
            state: "correctiveMaintenance",
            name: "Asignar Mantenimiento Correctivo",
          },
          {
            state: "checklistMaintenance",
            name: "Asignar Checklist",
          },
          {
            state: "registerForkliftReport",
            name: "Diligenciar Reporte Técnico",
          },
          {
            state: "platformTechinician",
            name: "Asignar Mantenimieto Plataforma",
          },
          {
            state: "stevedoreTechinician",
            name: "Asignar Mantenimieto Estibadores",
          },
          {
            state: "personalMonitoring",
            name: "Seguimiento Personal",
          },
          {
            state: "work_dashboard",
            name: "Administrar Rutinas Preventivas",
          },
          {
            state: "checklists",
            name: "Administrar Mantenimientos Checklist",
          },
          {
            state: "technicianReport",
            name: "Administrar Reporte Técnico",
          },
          {
            state: "platforms",
            name: "Administrar Mantenimientos Plataformas",
          },
          {
            state: "stevedores",
            name: "Administrar Mantenimientos Estibadores",
          },
          {
            state: "question",
            name: "Administrar Encuesta de Mantenimiento",
          },
          {
            state: "toilet",
            name: "Administrar Registro Aseo",
          },
          {
            state: "personalActivities",
            name: "Administrar Actividades del Personal",
          },

          /* {
            state:'work_dashboard',
            name:'Administrar rutinas'
          },*/

          {
            state: "registerBrand",
            name: "Administrar Marcas",
          },
          {
            state: "registerModel",
            name: "Administrar Modelos",
          },
          {
            state: "registerTyre",
            name: "Administrar Tipo de Llantas",
          },
          {
            state: "registerFuel",
            name: "Administrar Combustibles",
          },
          {
            state: "registerMachine",
            name: "Administrar Maquinas",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "configuracion",
        short_label: "N",
        name: "Configuración",
        type: "sub",
        icon: "ti-panel",
        children: [
          {
            state: "register",
            name: "Administrar Usuarios",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "reports",
        short_label: "R",
        name: "Informes",
        type: "sub",
        icon: "ti-stats-up",
        children: [
          {
            state: "reportsDuration",
            name: "Duración de Mantenimientos",
          },
          {
            state: "reportsForkliftMaintenance",
            name: "Mantenimientos por Equipos",
          },
          {
            state: "reportAsingFinish",
            name: "Rutinas Asignadas Vs Realizadas",
          },
          {
            state: "reportSystemMaintenance",
            name: "Reporte De Sistemas Mas Usados",
          },
          {
            state: "pendingReport",
            name: "Pendientes de los Equipos",
          },
          {
            state: "reportEstimateSettlement",
            name: "Reporte De Costos Por Cotizaciones",
          },
          {
            state: "reportIndicatorMaintenance",
            name: "Reporte De Cumplimiento de Mantenimiento",
          },
          {
            state: "reportsDurationTimesMaintenance",
            name: "Reporte De Diferencia de Tiempo en el Mantenimiento Correctivo",
          },
          {
            state: "horometerForklift",
            name: "Reporte Horometro De Equipos",
          },
          {
            state: "timeOutForklift",
            name: "Reporte Tiempo Muerto De Equipos",
          },
          {
            state: "maintenanceSettlement",
            name: "Reporte Mantenimientos Liquidados",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "catalogue",
        short_label: "C",
        name: "Catálogos Técnicos",
        type: "sub",
        icon: "ti-archive",
        children: [
          {
            state: "viewPdfCatalogue",
            name: "Ver Archivos",
          },
        ],
      },
    ],
  },
  {
    label: "UI Element",
    main: [
      {
        state: "support",
        short_label: "S",
        name: "Soporte",
        type: "sub",
        icon: "ti-headphone-alt",
        children: [
          {
            state: "supportMain",
            name: "Generación Tickets",
          },
        ],
      },
    ],
  },
];

const MENUSELLER = [
  {
    label: "Inicio",
    main: [
      {
        state: "master",
        short_label: "I",
        name: "Inicio",
        type: "sub",
        icon: "ti-home",
        children: [
          {
            state: "master",
            name: "Inicio",
          },
        ],
      },
    ],
  },


  {
    label: "master",
    main: [
      {
        state: "catalogue",
        short_label: "C",
        name: "Catálogos Técnicos",
        type: "sub",
        icon: "ti-archive",
        children: [
          {
            state: "viewPdfCatalogue",
            name: "Ver Archivos",
          },
        ],
      },
    ],
  },
  {
    label: "master",
    main: [
      {
        state: "master",
        short_label: "E",
        name: "ERP",
        type: "sub",
        icon: "ti-direction",
        children: [
          {
            state: "estimateAll",
            name: "Cotizaciones",
          },
          {
            state: "estimateCustomer",
            name: "Crear Cotización",
          },
          {
            state: "settlementAll",
            name: "Liquidaciones",
          },
          {
            state: "settlementCustomer",
            name: "Crear Liquidación",
          },

        ],
      },
    ],
  },

  {
    label: "UI Element",
    main: [
      {
        state: "support",
        short_label: "S",
        name: "Soporte",
        type: "sub",
        icon: "ti-headphone-alt",
        children: [
          {
            state: "supportMain",
            name: "Generación Tickets",
          },
        ],
      },
    ],
  },
];

@Injectable()
export class MenuItemsMasterService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  getCreator(): Menu[] {
    return MENUCREATOR;
  }

  getSeller(): Menu[] {
    return MENUSELLER;
  }

  getFinancial(): Menu[] {
    return MENUFINANCIAL;
  }

  getCustomer(): Menu[] {
    return MENUCUSTOMER;
  }

  getAssign(): Menu[] {
    return MENUASSIGN;
  }
  constructor() {}
}
