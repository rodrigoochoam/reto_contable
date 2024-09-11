# Sistema de Gestión Contable

Este proyecto es un sistema de gestión contable desarrollado con React, TypeScript, y Vite. Proporciona funcionalidades para manejar pólizas, movimientos contables, y cuentas contables, además de integrar tipos de cambio en tiempo real.

## Instalación

1. Clona este repositorio:

   ```
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Navega al directorio del proyecto:

   ```
   cd [NOMBRE_DEL_DIRECTORIO]
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para ejecutar la aplicación en modo de desarrollo:

```
  npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## Funcionalidades Desarrolladas

1. **Gestión de Pólizas**: Permite crear, editar, y eliminar pólizas contables. Al hacer clic en una póliza, se muestran los movimientos asociados a ella.

2. **Gestión de Movimientos**: Facilita la creación y edición de movimientos contables asociados a pólizas.

3. **Cuentas Contables**: Visualización y manejo de cuentas contables con saldos actualizados.

4. **Tipos de Cambio**: Integración de tipos de cambio en tiempo real para conversiones monetarias.

5. **Filtros y Búsqueda**: Implementación de filtros para pólizas y movimientos por fecha, descripción, y número de póliza.

6. **Generación de Reportes**: Capacidad para generar y descargar reportes en formato PDF.

## Integración con API Pública

El proyecto utiliza la API de ExchangeRates para obtener tipos de cambio en tiempo real:

- API: ExchangeRates API
- Endpoint: `http://api.exchangeratesapi.io/v1/latest`
- Funcionalidad: Obtiene tasas de cambio actualizadas para diferentes monedas.

La integración se realiza en el archivo `src/lib/api/exchangeRateService.ts`.

## Estructura del Proyecto

- `src/components`: Contiene los componentes React de la aplicación.
- `src/lib/api`: Servicios para interactuar con APIs y almacenamiento local.
- `src/types`: Definiciones de tipos TypeScript.
- `src/hooks`: Custom hooks de React para lógica reutilizable.
- `src/Reports`: Componentes para la generación de reportes PDF.

## Tecnologías Principales

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- @react-pdf/renderer (para generación de PDFs)

## Notas Adicionales

- La aplicación utiliza almacenamiento local (localStorage) para persistir datos.
- Se ha implementado un diseño responsivo utilizando Tailwind CSS.

## Autor:

Rodrigo Ochoa Mayagoitia
Licencia: MIT
