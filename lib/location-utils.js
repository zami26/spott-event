import { City, State } from "country-state-city";

export function createLocationSlug(city, state) {
 if(!city || !state) return '';
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
 
  return `${citySlug}-${stateSlug}`;
}


export function parseLocationSlug(slug) {
  if (!slug || typeof slug !== "string") {
    return { city: null, state: null, isValid: false };
  }

  const parts = slug.split("-").filter(Boolean);
  if (parts.length < 2) {
    return { city: null, state: null, isValid: false };
  }

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const indianStates = State.getStatesOfCountry("IN");

  // Try every possible split point: city is parts[0..i], state is parts[i+1..end]
  // Prefer the split where BOTH city and state validate. Fall back to state-only.
  for (let i = 1; i < parts.length; i++) {
    const cityName = parts.slice(0, i).map(capitalize).join(" ");
    const stateName = parts.slice(i).map(capitalize).join(" ");

    const stateObj = indianStates.find(
      (s) => s.name.toLowerCase() === stateName.toLowerCase()
    );
    if (!stateObj) continue;

    const cities = City.getCitiesOfState("IN", stateObj.isoCode);
    const cityMatch = cities.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase()
    );

    if (cityMatch) {
      return { city: cityMatch.name, state: stateObj.name, isValid: true };
    }
  }

  // Nothing fully validated
  return { city: null, state: null, isValid: false };
}