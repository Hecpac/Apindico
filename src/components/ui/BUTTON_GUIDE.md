# Guía de Uso de Variantes de Botones

## Jerarquía de CTAs en APINDICO

### 1. `variant="cta"` - Call to Action Principal (Naranja #FF6B35)
**Cuándo usar:**
- Acción principal de conversión en cada página
- "Cotizar Ahora" en header
- "Cotizar proyecto" en hero y secciones principales
- Máximo 1-2 por página/sección

**Ejemplo:**
```tsx
<Button variant="cta" size="lg">
  Cotizar proyecto
</Button>
```

---

### 2. `variant="primary"` - Acción Primaria (Azul #1565C0)
**Cuándo usar:**
- Acciones importantes pero secundarias a los CTAs
- Formularios de envío
- Navegación a secciones clave
- "Ver detalles", "Ver servicios"

**Ejemplo:**
```tsx
<Button variant="primary" size="md">
  Ver servicios
</Button>
```

---

### 3. `variant="accent"` - Acción de Énfasis (Amarillo #FFC107)
**Cuándo usar:**
- Destacar acciones específicas sin competir con CTA
- Descargas, recursos
- Acciones de baja fricción
- "Descargar Catálogo"

**Ejemplo:**
```tsx
<Button variant="accent" size="md">
  Descargar PDF
</Button>
```

---

### 4. `variant="secondary"` - Acción Secundaria (Borde Azul)
**Cuándo usar:**
- Acciones complementarias a la primaria
- "Agendar una llamada" junto a "Cotizar proyecto"
- "Contáctenos" junto a CTAs principales
- Navegación alternativa

**Ejemplo:**
```tsx
<Button variant="secondary" size="md">
  Agendar una llamada
</Button>
```

---

### 5. `variant="ghost"` - Acción Terciaria (Transparente)
**Cuándo usar:**
- Acciones de menor prioridad
- Links de navegación
- "Cancelar", "Volver"
- Dentro de cards o componentes con fondo

**Ejemplo:**
```tsx
<Button variant="ghost" size="sm">
  Cancelar
</Button>
```

---

## Reglas de Uso

### ✅ DO (Hacer)
- Usar máximo 1 botón CTA (naranja) por sección
- Agrupar botones relacionados con jerarquía clara
- Primary + Secondary juntos es una buena combinación
- Usar CTA para conversiones (cotizar, contactar ventas)

### ❌ DON'T (No hacer)
- No usar múltiples CTAs naranjas en la misma vista
- No mezclar CTA y Accent en el mismo grupo
- No usar solo ghost/secondary sin un botón más fuerte
- No usar CTA para acciones de baja prioridad

---

## Ejemplos por Sección

### Hero Section
```tsx
<div className="flex gap-4">
  <Button variant="cta" size="lg">Cotizar proyecto</Button>
  <Button variant="secondary" size="lg">Agendar una llamada</Button>
</div>
```

### CTA Section
```tsx
<div className="flex gap-4">
  <Button variant="cta" size="lg">Solicitar cotización</Button>
  <Button variant="primary" size="lg">Ver servicios</Button>
</div>
```

### Service Cards
```tsx
<Button variant="primary" size="md">Ver detalles</Button>
```

### Footer/Links
```tsx
<Button variant="ghost" size="sm">Política de Privacidad</Button>
```

---

## Tamaños

- `sm`: Enlaces, acciones terciarias (h-9, px-4)
- `md`: Botones estándar en cards y formularios (h-11, px-6)
- `lg`: CTAs principales, hero, secciones destacadas (h-14, px-8)
