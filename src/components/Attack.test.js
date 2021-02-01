import React from "react";
import Attack from "./Attack";
import { render } from "@testing-library/react";

test("Attack component renders the attack info", () => {
  const attack = {
    cost: ["Psychic", "Colorless"],
    name: "Psywave",
    text:
      "This attack does 10 damage times the amount of Energy attached to your opponent's Active Pokémon.",
    damage: "10×",
    convertedEnergyCost: 2,
  };

  const { queryByText, queryByAltText } = render(<Attack {...attack} />);
  expect(queryByText(attack.name)).toBeVisible();
  expect(queryByText(attack.text)).toBeVisible();
  expect(queryByText(attack.damage)).toBeVisible();
  attack.cost.forEach((alt) => {
    const img = queryByAltText(alt);
    expect(img).toBeVisible();
    expect(img.getAttribute("src")).toEqual(`assets/${alt}.webp`);
  });
});
