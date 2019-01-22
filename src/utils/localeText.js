const messages = {
  en: {
    board: {
      labelFilter: 'Label Filter',
      dateFilter: 'Date Filter',
      startDate: 'Start Date',
      endDate: 'End Date',
      boardStatus: 'Board Status',
    },
    boardInfo: {
      numberOfCards: 'Number Of Cards',
      timeInListAverage: 'Time in List Average (days)',
      timeInListStandard: 'Standard Deviation in List  (days)',
      timeInListMode: 'Mode in List  (days)',
    },
    bug: {
      finishedCards: 'Finished Cards',
      bug: 'Bug',
      notBug: 'Not a Bug',
    },
    wip: {
      wipLists: 'Work In Progress Lists',
      days: 'Days',
    },
    landing: {
      body: 'Give me my damn project metrics.',
    },
    date: {
      day: 'Day',
      week: 'Week',
      month: 'Month',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
    chart: {
      options: 'Options',
      dateFormat: 'Date Format',
    },
    cumulative: {
      title: 'Cumulative Chart',
      fill: 'Fill lists retroactively',
    },
    teamSpeed: {
      title: 'Team Speed',
      byWeek: 'By Week',
    },
    leadTime: {
      leadTime: 'Lead Time',
      timeToLive: 'Time To Live',
      responseTime: 'Response Time',
      cycleTime: 'Cycle Time',
      deployTime: 'Deploy Time',
      title: 'Average Time per Stage',
    },
    general: {
      settings: 'Settings',
    },
    wizard: {
      general: {
        back: 'BACK',
        next: 'NEXT',
        finish: 'FINISH',
        advanced: 'ADVANCED',
        exit: 'EXIT',
      },
      board: {
        title: 'Choose a Board',
        description: 'Choose a Trello Board and press Next.',
      },
      lists: {
        title: 'Classify the Lists',
        description: 'Add the Lists to their respective categories.',
        backlog: 'Backlog',
        wip: 'Work In Progress',
        finished: 'Finished',
        production: 'Production',
      },
      archived: {
        title: 'Choose the Archived Lists',
        description: 'Choose the Lists you want to take their archived Cards into the metrics.',
      },
      bug: {
        title: 'Choose the Bug Labels',
        description: 'Choose the labels you use to mark bugs.',
      },
      wipLimit: {
        title: 'Select the Work in Progress Limit',
        description: 'Set a limit of Cards for the Work in Progress Lists. Leave empty if no limit.',
      },
    },
    wipHistogram: {
      title: 'Work in Progress List Histogram',
      selectList: 'Select a List',
      genBin: 'Generate Bin Number',
      binWidth: 'Bin Size',
      xTitle: 'Days in the List',
      yTitle: 'Number of Cards',
    },
  },
  es: {
    board: {
      labelFilter: 'Filtro de Etiquetas',
      dateFilter: 'Filtro de Fechas',
      startDate: 'Fecha de Inicio',
      endDate: 'Fecha de Fin',
      boardStatus: 'Estado del Tablero',
    },
    boardInfo: {
      numberOfCards: 'Número de Tarjetas',
      timeInListAverage: 'Tiempo Promedio en la Lista (días)',
      timeInListStandard: 'Desviación Estándar en la Lista (días)',
      timeInListMode: 'Moda en la Lista (días)',
    },
    bug: {
      finishedCards: 'Tarjetas Terminadas',
      bug: 'Bug',
      notBug: 'No es Bug',
    },
    wip: {
      wipLists: 'Listas en Progreso',
      days: 'Días',
    },
    landing: {
      body: 'Dame mis malditas métricas de proyecto.',
    },
    date: {
      day: 'Día',
      week: 'Semana',
      month: 'Mes',
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
    },
    chart: {
      options: 'Opciones',
      dateFormat: 'Formato de Fecha',
    },
    cumulative: {
      title: 'Gráfico Acumulado',
      fill: 'Rellenar listas retroactivamente',
    },
    teamSpeed: {
      title: 'Velocidad de Equipo',
      byWeek: 'Por Semana',
    },
    leadTime: {
      leadTime: 'Tiempo de Entrega',
      timeToLive: 'Tiempo a Producción',
      responseTime: 'Tiempo de Respuesta',
      cycleTime: 'Tiempo de Iteración',
      deployTime: 'Tiempo de Despliegue',
      title: 'Tiempo Promedio en cada Estado',
    },
    general: {
      settings: 'Ajustes',
    },
    wizard: {
      general: {
        back: 'ATRÁS',
        next: 'SIGUIENTE',
        finish: 'FINALIZAR',
        advanced: 'AVANZADO',
        exit: 'SALIR',
      },
      board: {
        title: 'Elija un Tablero',
        description: 'Elija un Tablero de Trello y aprete en Siguiente.',
      },
      lists: {
        title: 'Clasifique las Listas',
        description: 'Agregue las Listas a sus categorías respectivas.',
        backlog: 'En Cola',
        wip: 'Trabajo En Progreso',
        finished: 'Finalizadas',
        production: 'En Producción',
      },
      archived: {
        title: 'Elija las Listas Archivadas',
        description: 'Elija las listas de las cuales quiere considerar sus tarjetas archivadas para las métricas.',
      },
      bug: {
        title: 'Elija las Etiquetas de Errores',
        description: 'Elija las etiquetas que usa para marcar errores.',
      },
      wipLimit: {
        title: 'Elija un Límite de Trabajo en Progreso',
        description: 'Elija un límite de tarjetas para las listas en progreso. Deje en blanco para dejar sin límite',
      },
    },
    wipHistogram: {
      title: 'Histograma de Listas en Progreso',
      selectList: 'Elija una Lista',
      genBin: 'Genera la Cantidad de Muestras',
      binWidth: 'Tamaño de la Muestra',
      xTitle: 'Días en la Lista',
      yTitle: 'Numbero de Tarjetas',
    },
  },
};

export default messages;
