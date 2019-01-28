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
      legend: 'Of Cards are Bugs',
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
      legend: 'Cards/Week',
    },
    leadTime: {
      leadTime: 'Lead Time',
      timeToLive: 'Time To Live',
      responseTime: 'Response Time',
      cycleTime: 'Cycle Time',
      deployTime: 'Deploy Time',
      title: 'Average Time per Stage',
      cycleTimeDesc: 'The average time it takes a card from the start of the sprint untill it\'s done.',
      responseTimeDesc: 'The average time it takes a card from backlog to enter the sprint.',
      deployTimeDesc: 'The average time it takes a card to go to production once it\'s done.',
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
      title: 'Lifetime of a Card for a List',
      selectList: 'Select a List',
      genBin: 'Generate Bin Number',
      binWidth: 'Bin Size',
      xTitle: 'Days in the List',
      yTitle: 'Number of Cards',
      legend: 'Number of cards in bin',
    },
    dashboard: {
      present: {
        stats: 'Board Stats',
        speedVsBugs: 'Speed and Bugs',
        boardNow: 'Your Board right Now',
      },
      future: {
        title: 'Board Projection',
      },
      past: {
        title: 'Historical Data',
      },
      options: {
        menu: 'Menu',
        future: 'Projection',
        present: 'Current',
        past: 'Historical',
      },
      subOptions: {
        menu: 'Sub Menu',
        cumulative: 'Cumulative Chart',
        histogram: 'List Histogram',
        bugs: 'Historical Bugs',
        speed: 'Historical Speed',
      },
    },
    historicalBugs: {
      title: 'Historical Bugs Quantity in Backlog',
      legend: 'Bugs vs Time',
    },
    historicalSpeed: {
      title: 'Historical Team Speed',
      legend: 'Cards vs Time',
    },
    backlogBug: {
      legend: 'Bug Cards in Backlog',
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
      legend: 'De Tarjetas son Bugs',
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
      legend: 'Tarjetas/Semana',
    },
    leadTime: {
      leadTime: 'Tiempo de Entrega',
      timeToLive: 'Tiempo a Producción',
      responseTime: 'Tiempo de Respuesta',
      cycleTime: 'Tiempo de Iteración',
      deployTime: 'Tiempo de Despliegue',
      title: 'Tiempo Promedio en cada Estado',
      cycleTimeDesc: 'El tiempo promedio que le toma a una tarjeta desde que entra al sprint hasta que esta lista.',
      responseTimeDesc: 'El tiempo promedio que le toma a una tarjeta desde el backlog al sprint.',
      deployTimeDesc: 'El tiempo promedio que le toma a una tarjeta para entrar a producción desde que esta lista.',
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
      title: 'Tiempo de vida de Tarjetas para una Lista',
      selectList: 'Elija una Lista',
      genBin: 'Genera la Cantidad de Muestras',
      binWidth: 'Tamaño de la Muestra',
      xTitle: 'Días en la Lista',
      yTitle: 'Número de Tarjetas',
      legend: 'Número de tarjetas en el bin',
    },
    dashboard: {
      present: {
        stats: 'Estadísticas del Tablero',
        speedVsBugs: 'Velocidad y Bugs',
        boardNow: 'Tu Tablero en este momento',
      },
      future: {
        title: 'Proyección del Tablero',
      },
      past: {
        title: 'Datos Historicos',
      },
      options: {
        menu: 'Menú',
        future: 'Proyección',
        present: 'Actual',
        past: 'Historico',
      },
      subOptions: {
        menu: 'Sub Menú',
        cumulative: 'Gráfico Acumulado',
        histogram: 'Histograma de Listas',
        bugs: 'Bugs Historicos',
        speed: 'Velocidad Historica',
      },
    },
    historicalBugs: {
      title: 'Cantidad de Bugs Historicos en Backlog',
      legend: 'Bugs vs Tiempo',
    },
    historicalSpeed: {
      title: 'Velocidad del Equipo en el Tiempo',
      legend: 'Tarjetas vs Tiempo',
    },
    backlogBug: {
      legend: 'Tarjetas de Bug en Backlog',
    },
  },
};

export default messages;
