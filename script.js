/**
 * @fileoverview Enterprise-grade Country and Capital dynamic selection controller.
 * Designed with a clean architectural separation between Domain Model, Service, View, and Controller.
 * Adheres to strict mode, zero global namespace pollution, and defensive coding standards.
 *
 * @version 2.0.0
 * @license MIT
 */

"use strict";

/**
 * ============================================================================
 * 1. DOMAIN MODEL & DATA STORE (Immutable)
 * ============================================================================
 * Key-value mapping representing verified country-to-capital relationships.
 * Object.freeze guarantees runtime immutability against accidental modification.
 *
 * @type {Readonly<Record<string, string>>}
 */
const COUNTRY_CAPITAL_MAP = Object.freeze({
  Nepal: "Kathmandu",
  India: "New Delhi",
  Japan: "Tokyo",
  France: "Paris",
  Australia: "Canberra"
});

/**
 * ============================================================================
 * 2. SERVICE LAYER (Pure Business Logic)
 * ============================================================================
 * Encapsulates domain lookup logic without any DOM or presentation dependencies.
 * Highly unit-testable and decoupled.
 */
class CountryCapitalService {
  /**
   * Retrieves the capital city for a given country.
   *
   * @param {string} country - The name of the selected country.
   * @returns {string} The corresponding capital name, or an empty string if not found.
   */
  static getCapital(country) {
    if (typeof country !== "string") {
      return "";
    }

    const trimmedCountry = country.trim();
    return COUNTRY_CAPITAL_MAP[trimmedCountry] || "";
  }

  /**
   * Verifies if a given country exists in the domain dataset.
   *
   * @param {string} country - The country name to check.
   * @returns {boolean} True if the country exists in the dictionary, false otherwise.
   */
  static hasCountry(country) {
    if (typeof country !== "string") {
      return false;
    }
    return Object.prototype.hasOwnProperty.call(COUNTRY_CAPITAL_MAP, country.trim());
  }

  /**
   * Returns a list of all supported country names.
   *
   * @returns {string[]} An array of country names.
   */
  static getSupportedCountries() {
    return Object.keys(COUNTRY_CAPITAL_MAP);
  }
}

/**
 * ============================================================================
 * 3. VIEW LAYER (DOM Interaction & UI State)
 * ============================================================================
 * Responsible solely for DOM queries, attribute updates, and CSS class toggling.
 * Protects against XSS by strictly utilizing textContent instead of innerHTML.
 */
class CountryCapitalView {
  /**
   * @param {string} selectElementId - The ID of the <select> element.
   * @param {string} displayElementId - The ID of the capital output element.
   * @throws {Error} If required DOM elements are not found in the document.
   */
  constructor(selectElementId, displayElementId) {
    /** @private @type {HTMLSelectElement|null} */
    this.selectElement = document.getElementById(selectElementId);

    /** @private @type {HTMLElement|null} */
    this.displayElement = document.getElementById(displayElementId);

    this._validateElements(selectElementId, displayElementId);
  }

  /**
   * Defensive assertion ensuring required DOM nodes are present.
   * @private
   */
  _validateElements(selectId, displayId) {
    if (!this.selectElement) {
      throw new Error(`[CountryCapitalView] Select element '#${selectId}' was not found in the DOM.`);
    }
    if (!this.displayElement) {
      throw new Error(`[CountryCapitalView] Display element '#${displayId}' was not found in the DOM.`);
    }
  }

  /**
   * Renders the capital name with visual state transitions.
   *
   * @param {string} capitalName - The capital city to render.
   */
  renderCapital(capitalName) {
    if (!this.displayElement) return;

    if (capitalName && capitalName.trim() !== "") {
      this.displayElement.textContent = capitalName;
      this.displayElement.classList.add("is-visible");
    } else {
      this.displayElement.classList.remove("is-visible");
      this.displayElement.textContent = "";
    }
  }

  /**
   * Binds an event listener to the dropdown change event.
   *
   * @param {(event: Event) => void} handler - The event handler callback function.
   */
  bindSelectionChange(handler) {
    if (this.selectElement) {
      this.selectElement.addEventListener("change", handler);
    }
  }
}

/**
 * ============================================================================
 * 4. CONTROLLER LAYER (Application Orchestration)
 * ============================================================================
 * Mediates between the View and Service, coordinating state changes and user events.
 */
class CountryCapitalApp {
  /**
   * @param {CountryCapitalView} view - Injected View instance.
   */
  constructor(view) {
    /** @private @type {CountryCapitalView} */
    this.view = view;

    // Bound handler to maintain execution context
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  /**
   * Initializes the application and registers listeners.
   */
  init() {
    this.view.bindSelectionChange(this.handleSelectionChange);
  }

  /**
   * Event handler executed whenever the dropdown selection changes.
   *
   * @param {Event} event - The DOM change event.
   */
  handleSelectionChange(event) {
    const target = /** @type {HTMLSelectElement} */ (event.target);
    const selectedCountry = target.value;

    // Service lookup for capital city
    const capital = CountryCapitalService.getCapital(selectedCountry);

    // Update view with retrieved capital
    this.view.renderCapital(capital);
  }
}

/**
 * ============================================================================
 * 5. APPLICATION BOOTSTRAP
 * ============================================================================
 * Instantiates and mounts the application once the DOM is safely loaded.
 */
function bootstrapApplication() {
  try {
    const view = new CountryCapitalView("countrySelect", "capitalDisplay");
    const app = new CountryCapitalApp(view);
    app.init();
  } catch (error) {
    console.error("[CountryCapitalApp] Failed to initialize application:", error);
  }
}

// Support for both standard DOMContentLoaded and deferred/async script execution in browser environments
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrapApplication);
  } else {
    bootstrapApplication();
  }
}

// Export for testing environments (CommonJS/Node)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    COUNTRY_CAPITAL_MAP,
    CountryCapitalService,
    CountryCapitalView,
    CountryCapitalApp
  };
}

