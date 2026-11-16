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

import {
  filterProducts,
  defaultFilters,
  type CatalogFilters,
  type CatalogFamily,
  type CatalogSort,
} from "../lib/catalog";

const families: {
  value: CatalogFamily;
  label: string;
}[] = [
  { value: "all", label: "All fragrances" },
  { value: "floral", label: "Floral" },
  { value: "woody", label: "Woody" },
  { value: "amber", label: "Amber" },
  { value: "green", label: "Green" },
  { value: "aquatic", label: "Aquatic" },
];

export default function ProductCatalog() {
  const [filters, setFilters] =
    useState<CatalogFilters>(defaultFilters);

  const [mobileFilters, setMobileFilters] =
    useState(false);

  const filteredProducts = filterProducts(
    products,
    filters
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

        Filters
      </button>

      <aside
        id="catalog-filters"
        className={`catalog-sidebar ${
          mobileFilters ? "is-open" : ""
        }`}
      >
        <div className="filter-heading">
          <h2>Filters</h2>

          <button
            type="button"
            onClick={clearFilters}
          >
            Reset
          </button>
        </div>

        <div className="filter-group">
          <h3>Fragrance family</h3>

          {families.map((family) => (
            <label
              className="filter-option"
              key={family.value}
            >
              <input
                type="radio"
                name="fragrance-family"
                checked={
                  filters.family === family.value
                }
                onChange={() =>
                  updateFilter("family", family.value)
                }
              />

              {family.label}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>Maximum price</h3>

          <div className="price-filter-value">
            Up to ${filters.maxPrice}
          </div>

          <input
            type="range"
            min={50}
            max={100}
            step={5}
            value={filters.maxPrice}
            aria-label="Maximum price"
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
          <h3>Availability</h3>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.onlyNew}
              onChange={(event) =>
                updateFilter(
                  "onlyNew",
                  event.target.checked
                )
              }
            />

            New arrivals
          </label>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(event) =>
                updateFilter(
                  "inStock",
                  event.target.checked
                )
              }
            />

            In stock
          </label>
        </div>
      </aside>

      <div className="catalog-results">
        <div className="catalog-search">
          <Search size={19} />

          <input
            type="search"
            placeholder="Search fragrances or notes..."
            aria-label="Search fragrances"
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
          />

          {filters.search && (
            <button
              type="button"
              aria-label="Clear search"
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
              ? "fragrance"
              : "fragrances"}
          </span>

          <select
            aria-label="Sort fragrances"
            value={filters.sort}
            onChange={(event) =>
              updateFilter(
                "sort",
                event.target.value as CatalogSort
              )
            }
          >
            <option value="featured">Featured</option>
            <option value="newest">New arrivals</option>
            <option value="price-asc">
              Price: low to high
            </option>
            <option value="price-desc">
              Price: high to low
            </option>
            <option value="name-asc">Name: A–Z</option>
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

            <h2>A moment of stillness.</h2>

            <p>
              No fragrances match your current filters.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}