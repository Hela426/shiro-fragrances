"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Flower2,
} from "lucide-react";

import ProductCard from "./product-card";
import { products } from "../data/products";
import { useTranslation } from "../lib/use-translation";

import {
  familyTranslations,
  getLocalizedProduct,
} from "../data/product-translations";

import {
  filterProducts,
  defaultFilters,
  type CatalogFilters,
  type CatalogFamily,
  type CatalogSort,
} from "../lib/catalog";

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function ProductCatalog() {
  const { language, t } = useTranslation();

  const [filters, setFilters] =
    useState<CatalogFilters>(defaultFilters);

  const [mobileFilters, setMobileFilters] =
    useState(false);

  const families: {
    value: CatalogFamily;
    label: string;
  }[] = [
    { value: "all", label: t.catalog.all },
    ...Object.entries(familyTranslations[language]).map(
      ([value, label]) => ({
        value: value as CatalogFamily,
        label,
      })
    ),
  ];

  const search = normalize(filters.search);

  const searchableProducts = products.filter((product) => {
    const spanish = getLocalizedProduct(product, "es");

    const searchableText = normalize([
      product.name,
      product.japaneseName,
      product.family,
      product.meaning,
      product.description,
      spanish.meaning,
      spanish.description,
      familyTranslations.es[product.family],
      ...product.notes.top,
      ...product.notes.heart,
      ...product.notes.base,
      ...spanish.notes.top,
      ...spanish.notes.heart,
      ...spanish.notes.base,
    ].join(" "));

    return searchableText.includes(search);
  });

  const filteredProducts = filterProducts(
    searchableProducts,
    {
      ...filters,
      search: "",
    }
  );

  function updateFilter<K extends keyof CatalogFilters>(
    key: K,
    value: CatalogFilters[K]
  ) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function clearFilters() {
    setFilters({ ...defaultFilters });
  }

  return (
    <div className="catalog-layout">
      <button
        type="button"
        className="mobile-filter-toggle"
        aria-expanded={mobileFilters}
        aria-controls="catalog-filters"
        onClick={() => setMobileFilters(!mobileFilters)}
      >
        {mobileFilters ? (
          <X size={18} />
        ) : (
          <SlidersHorizontal size={18} />
        )}

        {t.catalog.filters}
      </button>

      <aside
        id="catalog-filters"
        className={`catalog-sidebar ${
          mobileFilters ? "is-open" : ""
        }`}
      >
        <div className="filter-heading">
          <h2>{t.catalog.filters}</h2>

          <button type="button" onClick={clearFilters}>
            {t.catalog.reset}
          </button>
        </div>

        <div className="filter-group">
          <h3>{t.catalog.family}</h3>

          {families.map((family) => (
            <label
              className="filter-option"
              key={family.value}
            >
              <input
                type="radio"
                name="fragrance-family"
                checked={filters.family === family.value}
                onChange={() =>
                  updateFilter("family", family.value)
                }
              />

              {family.label}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>{t.catalog.maxPrice}</h3>

          <div className="price-filter-value">
            {t.catalog.upTo} ${filters.maxPrice}
          </div>

          <input
            type="range"
            min={50}
            max={100}
            step={5}
            value={filters.maxPrice}
            aria-label={t.catalog.maxPrice}
            onChange={(event) =>
              updateFilter(
                "maxPrice",
                Number(event.target.value)
              )
            }
          />

          <div className="price-filter-labels">
            <span>$50</span>
            <span>$100</span>
          </div>
        </div>

        <div className="filter-group">
          <h3>{t.catalog.availability}</h3>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.onlyNew}
              onChange={(event) =>
                updateFilter("onlyNew", event.target.checked)
              }
            />

            {t.catalog.arrivals}
          </label>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(event) =>
                updateFilter("inStock", event.target.checked)
              }
            />

            {t.catalog.inStock}
          </label>
        </div>
      </aside>

      <div className="catalog-results">
        <div className="catalog-search">
          <Search size={19} />

          <input
            type="search"
            placeholder={t.catalog.search}
            aria-label={t.catalog.searchLabel}
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
          />

          {filters.search && (
            <button
              type="button"
              aria-label={t.catalog.clearSearch}
              onClick={() => updateFilter("search", "")}
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="catalog-toolbar">
          <span aria-live="polite">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? t.catalog.singular
              : t.catalog.plural}
          </span>

          <select
            aria-label={t.catalog.sort}
            value={filters.sort}
            onChange={(event) =>
              updateFilter(
                "sort",
                event.target.value as CatalogSort
              )
            }
          >
            <option value="featured">
              {t.catalog.featured}
            </option>

            <option value="newest">
              {t.catalog.arrivals}
            </option>

            <option value="price-asc">
              {t.catalog.priceAsc}
            </option>

            <option value="price-desc">
              {t.catalog.priceDesc}
            </option>

            <option value="name-asc">
              {t.catalog.nameAsc}
            </option>
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid catalog-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <Flower2 size={45} strokeWidth={1} />

            <h2>{t.catalog.emptyTitle}</h2>

            <p>{t.catalog.emptyDescription}</p>

            <button
              type="button"
              className="primary-button"
              onClick={clearFilters}
            >
              {t.catalog.clearFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
