/**
 * Public submission boundary shared by supplier onboarding and future RFQ/CRM intakes.
 * Handles request bodies before multipart parsing to avoid unbounded memory use.
 * Keep individual lead workflows separate from this reusable validation layer.
 */
export const INTAKE_MAX_BYTES = 7_500_000;
const allowedOrigins = new Set(["https://hexasteel.sa", "https://www.hexasteel.sa"]);

export function trustedIntakeOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return Boolean(origin && allowedOrigins.has(origin));
}

export async function readBoundedMultipart(
  request: Request,
  maxBytes = INTAKE_MAX_BYTES
): Promise<FormData | null> {
  const type = request.headers.get("content-type") || "";
  if (!/^multipart\/form-data\s*;/i.test(type)) return null;
  const declared = request.headers.get("content-length");
  if (declared !== null) {
    const length = Number(declared);
    if (!Number.isFinite(length) || length < 0 || length > maxBytes) return null;
  }
  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return await new Response(bytes, { headers: { "content-type": type } }).formData();
  } catch {
    await reader.cancel().catch(() => undefined);
    return null;
  }
}
