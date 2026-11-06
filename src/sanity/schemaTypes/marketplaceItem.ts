import {defineField, defineType} from "sanity";

export const marketplaceItem = defineType({
  name: "marketplaceItem",
  title: "Marketplace listing",
  type: "document",
  fields: [
    defineField({name:"title",type:"string",validation:r=>r.required().max(100)}),
    defineField({name:"slug",type:"slug",options:{source:"title"},validation:r=>r.required()}),
    defineField({name:"category",type:"string",options:{list:["Product","Service"]},validation:r=>r.required()}),
    defineField({name:"description",type:"text",validation:r=>r.required().max(500)}),
    defineField({name:"unit",type:"string",title:"Sales unit (e.g. tonne, m², job)",validation:r=>r.required().max(24)}),
    defineField({name:"priceSar",type:"number",title:"Unit price in SAR, excluding VAT",
      description:"Leave blank for quote-only listings.",
      validation:r=>r.positive().max(10000000).precision(2)}),
    defineField({name:"image",type:"image",options:{hotspot:true}}),
    defineField({name:"imageAlt",type:"string",title:"Image alternative text"}),
    defineField({name:"visibleInMarketplace",type:"boolean",initialValue:true,
      description:"Turn off and publish to hide a listing, including any matching built-in listing."}),
  ],
});
