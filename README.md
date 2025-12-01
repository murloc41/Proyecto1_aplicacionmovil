**
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
**# Esculappmed — Evaluación Sumativa Unidad 2 (Integración de Periféricos)

## 1. Descripción del Contexto
Aplicación móvil híbrida para el personal de salud que agiliza:
- Registro y consulta de pacientes
- Gestión básica de medicamentos y detalles
- Entregas de turno con apoyo visual (foto) y contexto (ubicación)

Esta fase se enfoca en integrar periféricos nativos que aporten valor operativo.

## 2. Descripción de la Implementación
- **Periférico 1 — Cámara**
  - Plugin: `@capacitor/camera`
  - Flujo: Botón "Tomar Foto / Actualizar Foto" → permiso → cámara nativa → captura → previsualización.
  - Persistencia: Guarda `webPath` en `Preferences` con clave `foto_{idPaciente}`.
  - Recuperación: En `ngOnInit` se lee la clave y se reestablece la imagen.

- **Periférico 2 — Geolocalización (GPS)**
  - Plugin: `@capacitor/geolocation`
  - Flujo: Botón "Capturar Ubicación Actual" → `checkPermissions()` → `requestPermissions()` → lat/lon → feedback al usuario.
  - Persistencia: Guarda `{ lat, lon }` en `Preferences` con clave `coords_{idPaciente}`.
  - Recuperación: En `ngOnInit` se lee la clave y se muestra "Ubicación RECUPERADA" con lat/lon.

- **Gestión de permisos**
  - AndroidManifest: `CAMERA`, `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION` + `uses-feature` de `camera` y `gps`.
  - Runtime: Cámara (automático por plugin) y GPS (solicitud explícita, manejo de denegación).

## 3. Capturas de Pantalla (Evidencia)
Inserte las imágenes en este orden:
1. Diálogo de permiso de **Cámara** (Android): "Allow camera access?"
2. Diálogo de permiso de **Ubicación** (Android): "Allow location access?"
3. **Cámara abierta** y luego **foto mostrada** en interfaz (detalle del paciente)
4. **Ubicación capturada**: Texto "Ubicación capturada: Latitud ..., Longitud ..."
5. **Evidencia de persistencia**: captura de Logcat con mensajes `✅ Foto guardada` y/o `✅ Ubicación guardada`
6. **Reinicio de app**: mostrar que la foto y "Ubicación RECUPERADA" se recargan correctamente

## 4. Cómo Obtener la Evidencia (UI y Logcat)
- **UI**: Las pantallas de detalle ya muestran la foto y los textos de ubicación capturada/recuperada.
- **Logcat (Android Studio)**:
  - Abrir Logcat, filtrar por el proceso de la app
  - Buscar mensajes: `✅ Foto guardada`, `✅ Ubicación guardada`, `📍 Estado de permisos`, `🛰️ Capturando posición GPS`
  - Realice las acciones (tomar foto / capturar ubicación) y capture el panel con esas líneas

## 5. Credenciales de Acceso
- Usuario: `admin@mail.com`
- Contraseña: `123456`

## 6. Comandos (PowerShell)
- Desarrollo web:
```powershell
npx ionic serve
```
- Build + Sync:
```powershell
npx ionic build
npx cap sync
```
- Abrir Android Studio:
```powershell
npx cap open android
```

## 7. Archivos Clave
- Periféricos (cámara y GPS): `src/app/pages/detalle/detalle.page.ts` y `detalle.page.html`
- Persistencia: `src/app/services/preferences.service.ts`
- Permisos Android: `android/app/src/main/AndroidManifest.xml`
- Configuración Capacitor: `capacitor.config.ts`

## 8. Consideraciones Técnicas
- `Preferences` no cifra datos (apto para URI y coordenadas). Para datos sensibles, usar almacenamiento seguro.
- GPS con timeout de 15s y `maximumAge: 0` para evitar caché.
- Web vs nativo: `Capacitor.isNativePlatform()` usa `CameraSource.Camera` en nativo y `CameraSource.Prompt` en web.

## 9. Conclusión
Se integran dos periféricos nativos (Cámara y Geolocalización) con permisos, persistencia y recarga al reiniciar, cumpliendo el RA 1.3 y aportando valor al flujo clínico.

---

## 10. Continuación: Contexto, Framework y Patrones

### 10.1 Título y Contexto
**Aplicación de Gestión Clínica Móvil (Esculappmed)**

La aplicación Esculappmed se concibe como una herramienta móvil para la gestión básica de información en un entorno clínico o de consultorio.

**Idea/Contexto Elegido:** Administración de datos de pacientes y control de inventario de medicamentos asociados a un centro de atención médica. Simula el trabajo diario de un profesional de la salud que necesita acceder, registrar y actualizar información de forma rápida y segura desde un dispositivo móvil.

**Objetivo:** Demostrar la capacidad de desarrollar una Aplicación de Negocio (LOB) funcional usando tecnologías híbridas, implementando el ciclo de vida completo de los datos (CRUD) y garantizando la seguridad de acceso mediante autenticación y autorización.

### 10.2 Conceptos del Framework
**Arquitectura de Ionic Framework**
- Naturaleza Híbrida: Ionic se basa en Capacitor para envolver el código web en un WebView nativo, ejecutándose en iOS, Android y como PWA bajo una única base de código.
- Integración con UI: Biblioteca extensa de componentes (`ion-button`, `ion-card`, `ion-list`, etc.) con look & feel nativo en iOS y Android.

**Framework Seleccionado (Angular)**
- Desarrollo Basado en Componentes: Cada pantalla (login, detalle, listado) es un componente autónomo.
- Programación Reactiva y Formularios: Formularios Reactivos (Reactive Forms) para gestión robusta del estado y validaciones.
- Standalone Components: Arquitectura sin módulos, simplificando estructura y mejorando performance de bundling.

### 10.3 Patrones de Diseño
**Modelo–Vista–VistaModelo (MVVM)**
- Vista (View): Archivos `.html` (por ejemplo, `login.page.html`).
- VistaModelo (Component/TS): Archivos `.ts` (por ejemplo, `login.page.ts`) con lógica de negocio y formularios.
- Modelo (Model): Interfaces TypeScript (por ejemplo, `Paciente`, `Medicamento`) y servicios (`AuthService`) que definen y manipulan datos (CRUD).

**Patrón de Componentes**
- Todo en Ionic/Angular es un componente (`.component.ts` o `.page.ts`). Facilita reutilización y modularidad (ej. páginas de detalle de paciente y de medicamento).

**Patrón de Servicio (DI)**
- Servicios como `AuthService` encapsulan lógica compartida: estado de sesión (`login()`, `logout()`), y pueden gestionar operaciones CRUD. Se separa lógica de datos de la interfaz mediante inyección de dependencias.
