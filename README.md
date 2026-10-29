# CyberSerchMX · Web design showcase

Tres sitios originales de muestra, hechos con HTML, CSS y JavaScript, sin framework, rastreadores ni dependencias de ejecución.

**[Explorar la colección](https://sergioh-devsec.github.io/web-design-showcase/)**

| Sitio | Diseño | Interacción |
| --- | --- | --- |
| [Dental del Parque](https://sergioh-devsec.github.io/web-design-showcase/dental/) | Composición arquitectónica, verde salvia y bloques asimétricos | Selector de etapas de visita, agenda de demostración y FAQ |
| [Andrea Molina · Psicología](https://sergioh-devsec.github.io/web-design-showcase/psicologia/) | Diario editorial, fotografía enmarcada, serif y tonos papel | Carta desplegable, modalidades y agenda de muestra |
| [Mariana Nail Atelier](https://sergioh-devsec.github.io/web-design-showcase/unas/) | Editorial de moda, contraste burdeos y fotografía protagonista | Selector de tonos y acabados con estimación local |

## Alcance

Marcas ficticias de portafolio. No son negocios ni clientes reales. Las imágenes fueron generadas con IA; no representan instalaciones, personas o resultados de clientes. Los textos no son asesoramiento clínico. Horarios y precios son ilustrativos; ningún botón reserva citas ni procesa pagos.

## Ejecutar y revisar

```sh
python -m http.server 8080
node --test tests/*.test.cjs
```

Abre `http://localhost:8080/`. La publicación usa GitHub Pages desde `main` / raíz. Cada carpeta contiene la página de su concepto y usa `site.css`, `site.js` y `assets/` compartidos. No requiere instalación ni compilación.

## Decisiones de implementación

- Navegación por teclado, foco visible, enlace de salto y diálogos nativos con cierre mediante Escape y devolución del foco.
- Layout adaptable y animación discreta que respeta `prefers-reduced-motion`.
- Agenda sin campos de información personal, envío de formularios bloqueado y aviso inequívoco de demostración.
- Sin almacenamiento de datos, cookies, llamadas a APIs o bibliotecas remotas.
- CSP restrictiva; enlaces externos explícitos; contenido dinámico mediante `textContent`.
- La estimación de uñas utiliza una lista cerrada de opciones y rechaza valores no admitidos.

## Adaptación a un negocio real

Sustituir la identidad de muestra por datos autorizados; aportar credenciales profesionales verificadas cuando corresponda; integrar una agenda real y sus avisos de privacidad; conectar mensajes o pagos solo tras configurar y probar sus proveedores.

Diseño y desarrollo: CyberSerchMX. Código visible para evaluar el trabajo; no se concede una licencia de redistribución implícita. Los nombres se usan como conceptos ficticios, sin afirmar titularidad registral. Ver [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md) para la procedencia de las imágenes.


## Ejercicios básicos, separados del portafolio principal

- [Calculadora](basicos/calculadora/): precedencia, paréntesis, porcentajes y control de errores, sin eval.
- [Juego de memoria](basicos/memoria/): ocho parejas, contador de intentos y reinicio seguro.
- [Lista de tareas](basicos/tareas/): tareas en memoria y descarga local de texto.

[Probar los ejercicios](https://sergioh-devsec.github.io/web-design-showcase/basicos/). No se enlazan desde la página principal de CyberSerchMX.

Pruebas de lógica: `node --test tests/*.test.cjs`. Para verlos localmente: `python -m http.server 8080` desde esta carpeta y abrir `/basicos/`. Sin dependencias, cuentas ni persistencia de datos.
