# SRN Spaceships — React Native Technical Test

Mobile app (Expo + React Native) and a decoupled REST API (Node.js + Express) to browse a static spaceships catalog.

---

## Estructura del Repo

/backend # Node.js + Express API (Dockerized)
/mobile # Expo React Native app

---

**************************************************************************************************

###
Pasos claros para clonar y levantar el backend usando Docker.
### 

1. Clonar repositorio

    ```bash
    git clone <REPO_URL>
    cd srn-spaceships

2. Arrancar API usando Docker Compose
    cd backend
    docker compose up --build


Esto demostrata la app en:
http://localhost:3000

3. Validar endpoint

Abrir en explorar o correr:

    curl http://localhost:3000/spaceships


Esperable: a JSON array with 10 spaceships.

4. Detener servicios

    Foreground mode: CTRL + C

Cleanup:

    docker compose down


**************************************************************************************************

###
Pasos para ejecutar la App en Expo
###

1) Instalar dependcias

    cd mobile
    npm install

2) Start Expo (recommended with clean cache)
npx expo start -c

3) Run on Android / iOS

Press a to launch on Android Emulator
Press i to launch on iOS Simulator (macOS only)

Notas API (importante)

La app llama al backend localmente, por lo que la URL base sera diferente según se corra

    Android Emulator (Android Studio): http://10.0.2.2:3000
    iOS Simulator: http://localhost:3000
    Physical device: http://<LAN_IP>:3000 (example: http://192.168.1.50:3000)

Correr Expo en modo tunnel si la app se pega en el splash screen
npx expo start --tunnel


**************************************************************************************************

###
Enlace a un Video Demo
###

URL: https://youtu.be/ZI7u9XtZ-2o

**************************************************************************************************

###
EAS Build: Describe los pasos y configuración necesaria en eas.json para generar .apk e .ipa de producción.
###

Pasos a alto nivel:

1. Instalar EAS CLI:
    npm i -g eas-cli


2. Autenticarse e inicializar el proyecto:
    eas login
    cd mobile
    eas build:configure


3. Crear el archivo eas.json con perfiles de producción.

4. Asegurar que app.json / app.config.js incluya correctamente:

    ios.bundleIdentifier
    android.package

5. Ejecutar los builds:

Android (producción):

    eas build -p android --profile production


iOS (producción):

    eas build -p ios --profile production

Notas varias:

a. Para Play Store, se recomienda usar AAB (app-bundle).
b. Para distribución rápida o testing interno, se puede generar un APK (production-apk).
c. EAS guía de forma interactiva el firmado de Android (keystore) y las credenciales de iOS (certificados y provisioning), aunque también pueden gestionarse manualmente mediante EAS Credentials.

**************************************************************************************************

###
Offline First — ¿Qué estrategia de base de datos local usar y por qué?
###

a. Si la aplicación debe funcionar sin conexión a internet, implementaría una estrategia Offline-First utilizando:

    SQLite (mediante expo-sqlite) para datos estructurados e indexación
    Una capa de sincronización liviana para reconciliar cambios remotos cuando hay conexión

b. Razones por las cuales usar SQLite:

Es una tecnología madura, estable y ampliamente soportada.
Ideal para datos relacionales (naves, facciones, favoritos, historial).
Soporta índices y filtrado/búsqueda eficiente a escala.
Funciona muy bien en entornos Expo con bajo overhead.

c. Estrategia propuesta:

En el primer arranque con conexión: consumir /spaceships y persistir los datos en SQLite.
La UI siempre lee desde SQLite como single source of truth.
Cuando hay conexión: refrescar datos usando una estrategia de versionado (ETag o timestamps) y actualizar los registros locales.
Opcional: almacenar la fecha del último sync y manejar una política de caché “stale”.

d. Cuándo elegir Realm en su lugar:

Si el modelo de datos se vuelve altamente anidado.
Si se requieren consultas reactivas complejas.
Si la resolución de conflictos offline es más sofisticada y se necesita una DB orientada a objetos.

Para un catalogo simple, con filtros por facciones, SQLite es la opción más simple y robusta. Siendo escalable en caso de ser necesario para incluir filtros dinamicos e interacción con el usuario (favoritos, más buscados, etc.)

###
Apple Guideline 4.2 — Rechazo por “Minimum Functionality”
###

Apple es conocido por ser estricto con sus aplicaciones, sin embargo tengo experiencia práctica lidiando con el store y sus requerimientos de ofertas de valor de apps subidas en él. Acá describo una solucion de producto y técnica.

a. Agregar funcionalidades que aumenten el valor para el usuario sin inflar el alcance:

Búsqueda (por nombre o palabras clave)
Favoritos / marcadores persistidos localmente (SQLite)
Analítica por facción (conteo por facción) y filtros rápidos tipo chips
Modo offline con indicador de “Última actualización”
Estados de error y vacíos bien diseñados (skeleton loading)

b. Mejorar contenido y engagement:

Pantalla de detalle enriquecida: especificaciones, imágenes, naves relacionadas por facción, etc.
Adicionalmente: visualizador de modelo 3D de las naves (se puede agregar como contenido adicional descargable, para no inflar el peso de la app base).
Agregar toggles de accesibilidad (perfil de color, tamaño de letras, modo narración, etc.)
Crear un onboarding interactivo con elementos gamificados simples.

---

Estas mejoras demuestran funcionalidad real, persistencia de datos y una propuesta de valor coherente para el público objetivo de una app que liste naves de Star Wars, tomando en consideración usuarios con diferentes necesidades de accesibilidad, lo que normalmente satisface los criterios de la Guideline 4.2.

###
Repo Git
###

URL: https://github.com/Gagz9k/srn-spaceships