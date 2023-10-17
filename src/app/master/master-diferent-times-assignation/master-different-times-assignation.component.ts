import { Injectable, OnInit } from "@angular/core";
export const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
export const EXCEL_EXTENSION = ".xlsx";

export const I18N_VALUES = {
  fr: {
    weekdays: ["Lun", "Mar", "Mié", "Juv", "Vie", "Sáb", "Dom"],
    months: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Agos",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  // other languages you would support
};

@Injectable()
export class I18n {
  language = "fr";
}

export interface bussnessInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

export interface typeMaintenanceInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

export interface statusMaintenanceInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

export interface busnessOfficeInterface {
  // item para mostrar clientes
  customer?: string;
  office?: Array<officeInterface>;
}

export interface officeInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

export interface OfficeForkliftInterface {
  // item para mostrar clientes
  office?: string;
  forklift?: Array<forkliftInterface>;
}

export interface forkliftInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

export interface tableInterface {
  Consecutivo?: string;
  Cliente?: string;
  Sede?: string;
  Equipo?: string;
  Tipo?: string;
  Estado?: string;
  Fecha_Asignado?: string;
  Fecha_Inicio?: string;
  Fecha_Fin?: string;
  Diferecia_tiempo_a_Iniciar?: string;
  Duracion_Actividad?: string;
  Trabajo_Realizado?: string;
}

