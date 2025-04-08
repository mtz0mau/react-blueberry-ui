# React Blueberry UI 🫐

Una biblioteca de componentes de interfaz de usuario (UI) para React, construida sobre Ant Design y React Hook Form. Nuestro objetivo es ofrecer componentes reutilizables y centralizados que simplifican el desarrollo de interfaces complejas.

## 🤔 ¿Por qué React Blueberry UI?

Este proyecto nace de la necesidad de combinar el poder y la estética de Ant Design con la eficiencia en el manejo de formularios de React Hook Form, proporcionando una capa de abstracción que facilita la implementación de patrones comunes en nuestras aplicaciones.

En lugar de configurar repetidamente la integración entre estas bibliotecas en cada proyecto o componente, `react-blueberry-ui` ofrece componentes listos para usar que ya incorporan las mejores prácticas y configuraciones.

## ✨ Características

*   **Basado en Ant Design:** Hereda la rica variedad de componentes y el sistema de diseño de Ant Design.
*   **Integración con React Hook Form:** Componentes de formulario diseñados para funcionar sin problemas con React Hook Form, simplificando la validación y el manejo del estado del formulario.
*   **Centralizado y Reutilizable:** Componentes diseñados para ser la única fuente de verdad, reduciendo la duplicación de código.
*   **TypeScript:** Escrito completamente en TypeScript para una mejor experiencia de desarrollo y mantenibilidad.

## 🚀 Instalación

Puedes instalar `react-blueberry-ui` usando npm o yarn:

```bash
npm install react-blueberry-ui antd react-hook-form
# o
yarn add react-blueberry-ui antd react-hook-form
```

**Nota:** `react-blueberry-ui` tiene `antd` y `react-hook-form` como dependencias peer. Asegúrate de tenerlas instaladas en tu proyecto.

## 🔧 Uso Básico

Aquí tienes un ejemplo simple de cómo usar un componente de `react-blueberry-ui`:

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
// Asegúrate de importar los estilos de Ant Design en algún punto de tu aplicación,
// por ejemplo, en tu archivo principal (index.js o App.js)
// import 'antd/dist/reset.css'; // o la forma recomendada por Ant Design

// Importa los componentes que necesites de tu biblioteca
import { BlueberryInput, BlueberryButton } from 'react-blueberry-ui'; // ¡Ajusta esta línea según tu estructura!

function MyForm() {
  // Configura React Hook Form como lo harías normally
  const { handleSubmit, control } = useForm();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
  };

  return (
    // Usa handleSubmit para manejar el envío
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*
        Usa los componentes de Blueberry UI.
        Pasan el 'control' de React Hook Form y el 'name' del campo.
        Reemplaza 'BlueberryInput' con el nombre real de tu componente.
      */}
      <BlueberryInput
        name="username" // Nombre del campo para React Hook Form
        control={control} // Pasa el control de React Hook Form
        label="Nombre de Usuario" // Propiedad específica de tu componente (ejemplo)
        rules={{ required: 'El nombre de usuario es obligatorio' }} // Reglas de validación
      />

      {/* Botón para enviar el formulario */}
      <BlueberryButton type="primary" htmlType="submit">
        Enviar
      </BlueberryButton>
    </form>
  );
}

export default MyForm;

```

*(Recuerda reemplazar `BlueberryInput`, `BlueberryButton` y la ruta de importación con los nombres y la estructura reales de tu biblioteca).*

## 🛠️ Componentes Disponibles

*   `<Input/>`: Un campo de texto integrado con `react-hook-form`.
*   `<Select/>`: Un selector desplegable.
*   `<Form/>`: Un componente contenedor de formulario (si aplica).
*   ... (¡Agrega aquí el resto de tus componentes!)

*(Te recomiendo crear documentación más detallada para cada componente, quizás usando herramientas como Storybook).*

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar `react-blueberry-ui`, por favor abre un *issue* o envía un *pull request*.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles (si tienes uno).
