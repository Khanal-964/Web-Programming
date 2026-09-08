# Country & Capital Selection Interface

An enterprise-grade, accessible, and responsive single-page web utility engineered using pure semantic **HTML5**, **CSS3 Custom Properties (Design Tokens)**, and **Vanilla JavaScript (ES6+)**.

---

## 🏛 Architectural Highlights

- **Clean Architecture Separation**: Strict boundaries between the **Domain Model** (`COUNTRY_CAPITAL_MAP`), **Business Logic** (`CountryCapitalService`), **View/DOM Layer** (`CountryCapitalView`), and **Controller** (`CountryCapitalApp`).
- **Immutable Domain State**: Data dictionary is sealed using `Object.freeze()` to prevent runtime tampering or mutations.
- **XSS Immunity**: Strict use of `.textContent` instead of `.innerHTML` ensures zero attack vectors from dynamic strings.
- **WCAG 2.1 AA Accessibility**:
  - Live regions via `role="status"` and `aria-live="polite"` ensure screen readers dynamically announce capital changes without disruptive focus shifts.
  - Visible keyboard focus rings (`:focus-visible`) meeting 3:1 contrast ratios.
  - Screen-reader-friendly label associations.
  - Respects `@media (prefers-reduced-motion: reduce)`.
- **System Theme Adaptation**: Seamless dark/light theme switching based on `@media (prefers-color-scheme: dark)`.
- **Zero Third-Party Dependencies**: No React, Vue, jQuery, Bootstrap, or build step required. Runs directly off disk or via static file server.

---

## 📂 Project Structure

```
d:/GlobeCap/
├── index.html        # Semantic HTML5 markup, accessibility landmarks, and SVG favicon
├── style.css         # Tokenized design system, flexbox layout, dark mode, animations
├── script.js         # MVC structured application logic, service layer, and controller
├── test.js           # Automated unit test suite
├── .editorconfig     # Standardized code formatting configuration
└── README.md         # Architecture and usage documentation
```

---

## 🚀 Getting Started

### Direct Browser Execution
No web server, package manager, or build step is required:
1. Double-click [index.html](file:///d:/GlobeCap/index.html) or open it in any modern browser (Chrome, Safari, Edge, Firefox).
2. Choose a country from the dropdown to instantly view its capital city.

### Running Unit Tests
To execute the automated domain test suite via Node.js:
```bash
node test.js
```

---

## 🧪 Verification Matrix

| Country | Expected Capital | Verified |
| :--- | :--- | :---: |
| **Nepal** | Kathmandu | ✔ |
| **India** | New Delhi | ✔ |
| **Japan** | Tokyo | ✔ |
| **France** | Paris | ✔ |
| **Australia** | Canberra | ✔ |
| *(Default Option)* | *(Empty)* | ✔ |

---

## 📄 License
MIT
