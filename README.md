
1. Descripción del Contexto
Título: Aplicación de Gestión Clínica Móvil (Esculappmed)
La aplicación Esculappmed se concibe como una herramienta móvil para la gestión básica de información en un entorno clínico o de consultorio.

Idea/Contexto Elegido: El contexto principal es la administración de datos de pacientes y el control de inventario de medicamentos asociados a un centro de atención médica. Esto simula el trabajo diario de un profesional de la salud que necesita acceder, registrar y actualizar información de forma rápida y segura desde un dispositivo móvil.

Objetivo: El objetivo principal es demostrar la capacidad de desarrollar una Aplicación de Negocio (LOB) funcional usando tecnologías híbridas, implementando el ciclo de vida completo de los datos (CRUD) y garantizando la seguridad de acceso a través de la gestión de autenticación y autorización.

2. Conceptos del Framework 
Arquitectura de Ionic Framework
Ionic es un framework de desarrollo de aplicaciones móviles híbridas que permite construir aplicaciones nativas utilizando tecnologías web (HTML, CSS, JavaScript).

Naturaleza Híbrida: Ionic se basa en Capacitor (o Cordova) para envolver el código web en un Webview nativo. Esto permite que la aplicación se ejecute en dispositivos iOS, Android y como una PWA (Progressive Web App) usando una única base de código.

Integración con UI: Ionic proporciona una vasta biblioteca de componentes de interfaz de usuario (UI) prediseñados (como ion-button, ion-card, ion-list) que imitan el look and feel nativo de iOS y Android, asegurando una experiencia de usuario coherente en todas las plataformas.

Framework Seleccionado (Angular)
Angular es el framework principal utilizado para estructurar la lógica y el estado de la aplicación.

Desarrollo Basado en Componentes: Angular fomenta la creación de bloques de código reutilizables e independientes (Componentes). Cada pantalla (página) que desarrollamos, como login.page.ts o detalle.page.ts, es un componente.

Programación Reactiva y Formulario: Utilizamos Formularios Reactivos para la gestión de datos (Login, Registro, CRUD), lo cual permite una manipulación más robusta del estado del formulario y facilita la implementación de validaciones complejas.

Módulos (Standalone): El proyecto emplea la arquitectura Standalone (componentes independientes de módulos), simplificando la estructura del proyecto y mejorando la performance al optimizar el proceso de bundling (empaquetado).

3. Patrones de Diseño 
En el proyecto se aplicaron principalmente tres patrones de diseño esenciales para el desarrollo de aplicaciones modernas:

Modelo-Vista-VistaModelo (MVVM):

Vista (View): Representada por el archivo .html (ej. login.page.html). Es la interfaz de usuario que consume y muestra los datos.

VistaModelo (ViewModel) / Componente: Representado por el archivo .ts (ej. login.page.ts). Contiene la lógica del negocio, el manejo del formulario (FormGroup) y actúa como intermediario entre la Vista y el Modelo.

Modelo (Model): Representado por las Interfaces TypeScript (interface Paciente, interface Medicamento) y los Servicios (AuthService). Define la estructura de los datos y la lógica para manipularlos (CRUD).

Patrón de Componentes:

Todo en Ionic/Angular es un componente (.component.ts o .page.ts). Este patrón garantiza la reutilización de código y la modularidad. Por ejemplo, el patrón se aplica al crear una página separada para el detalle de un paciente (detalle.page) y otra para el detalle de un medicamento (medicamento-detalle.page).

Patrón de Servicio (Inyección de Dependencias):

Utilizamos Servicios (ej. AuthService) para centralizar la lógica de negocio que debe ser compartida, como la gestión del estado de la sesión (login(), logout()) o las operaciones CRUD (si estuviéramos usando un servicio CRUD dedicado). Esto separa la lógica de datos de la lógica de la interfaz.
