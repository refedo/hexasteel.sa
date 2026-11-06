"use client";

import {useState} from "react";
import {useClient} from "sanity";
import {marketplaceDefaults} from "../../content/marketplace";

export function ImportMarketplaceItems() {
  const client = useClient({apiVersion:"2025-02-01"});
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState("");

  async function prepareDrafts() {
    setBusy(true);
    try {
      const slugs = await client.fetch<string[]>(
        '*[_type=="marketplaceItem" && defined(slug.current)].slug.current',
        {}, {perspective:"raw",useCdn:false},
      );
      const existing = new Set(slugs);
      const missing = marketplaceDefaults.filter(item=>!existing.has(item.slug));
      const transaction = client.transaction();
      for (const item of missing) {
        transaction.createIfNotExists({
          _id:`drafts.marketplace-${item.slug}`,_type:"marketplaceItem",
          slug:{_type:"slug",current:item.slug},title:item.title,category:item.category,
          description:item.description,unit:item.unit,visibleInMarketplace:true,
          ...(item.priceHalalas ? {priceSar:item.priceHalalas/100} : {}),
        });
      }
      if (missing.length) await transaction.commit();
      setMessage(`${missing.length} missing listings prepared for review in Marketplace — Products & Services.`);
    } catch {
      setMessage("Draft preparation failed. Check your Sanity permissions and retry.");
    } finally {
      setBusy(false);
    }
  }

  return <section style={{padding:32,maxWidth:760}}>
    <h1>Prepare marketplace listings</h1>
    <p>Copy the starting catalog into unpublished drafts. Review and publish each listing to manage it from Studio. Existing listings are preserved.</p>
    <button disabled={busy} onClick={prepareDrafts}>{busy ? "Preparing…" : "Prepare missing marketplace drafts"}</button>
    <p role="status">{message}</p>
  </section>;
}
