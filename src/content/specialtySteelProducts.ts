export const specialtySteelProducts = {
  "unipole": {
    title: "Steel Unipole Structures",
    seoTitle: "Steel Unipole Billboard Structures in Saudi Arabia",
    description: "Project-specific steel unipole fabrication for roadside billboards and outdoor advertising structures in Saudi Arabia.",
    keywords: ["unipole billboard", "billboard steel structure", "outdoor advertising steel structure", "unipole fabrication Saudi Arabia"],
    applications: ["Roadside and freestanding billboards", "Static advertising faces and steel support frames for digital displays"],
    rfqDetails: "Share the site location, overall height, sign-face dimensions, drawings and available wind and foundation design criteria.",
  },
  "hoarding": {
    title: "Steel Hoarding Structures",
    seoTitle: "Steel Hoarding and Site Perimeter Frames in Saudi Arabia",
    description: "Fabricated steel hoarding frames for construction site perimeters and temporary advertising panels in Saudi Arabia.",
    keywords: ["construction site hoarding", "steel hoarding frame", "site perimeter hoarding", "advertising hoarding"],
    applications: ["Construction site perimeter screening", "Temporary advertising hoarding and branded development frontages"],
    rfqDetails: "Share the perimeter length, panel height, site layout, panel type and available fixing or anchorage details.",
  },
  "space-frames": {
    title: "Steel Space Frames",
    seoTitle: "Steel Space Frames for Long-Span Roofs in Saudi Arabia",
    description: "Project-specific steel space frames for long-span roofs and canopies in Saudi Arabia. Request a quotation for your roof geometry and support layout.",
    keywords: ["steel space frame", "space frame roof", "three-dimensional steel grid", "long-span space frame", "space frame fabrication Saudi Arabia"],
    applications: ["Long-span roofs for atriums, halls and concourses", "Three-dimensional steel grids for entrance and architectural canopies"],
    rfqDetails: "Share the roof plan, spans, support locations, grid geometry, cladding loads and available structural drawings.",
  },
  "trusses": {
    title: "Steel Trusses",
    seoTitle: "Steel Roof Trusses and Truss Fabrication in Saudi Arabia",
    description: "Project-specific steel truss fabrication for industrial roofs, warehouses, hangars and canopies in Saudi Arabia.",
    keywords: ["steel roof trusses", "steel truss fabrication", "warehouse roof truss", "long-span steel truss", "industrial steel trusses Saudi Arabia"],
    applications: ["Long-span steel roof trusses for industrial buildings, warehouses and hangars", "Canopy trusses and other structural assemblies specified for the project"],
    rfqDetails: "Share the span, truss depth or roof profile, spacing, design loads, connection requirements and available drawings.",
  },
};

export type SpecialtySteelSlug = keyof typeof specialtySteelProducts;
export const specialtySteelEntries = Object.entries(specialtySteelProducts) as
  [SpecialtySteelSlug, (typeof specialtySteelProducts)[SpecialtySteelSlug]][];
