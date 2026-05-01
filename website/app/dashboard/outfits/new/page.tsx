"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { sanitizeText, isValidUrl } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import type { ProductFormData } from "@/lib/types";

/**
 * Create New Outfit Page
 * ======================
 * Route: /dashboard/outfits/new
 * Form with: title, category, image upload, products (1-15).
 * Each product has: name, platform, affiliate_url, optional product image.
 * Price and in-stock toggle removed for this phase.
 */

const emptyProduct: ProductFormData = {
  name: "",
  platform: "Amazon",
  affiliate_url: "",
  price: "",
  image_file: null,
  image_url: "",
  in_stock: true,
};

export default function NewOutfitPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);
  const [products, setProducts] = useState<ProductFormData[]>([{ ...emptyProduct }]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  const addProduct = () => {
    if (products.length >= siteConfig.maxProductsPerOutfit) return;
    setProducts([...products, { ...emptyProduct }]);
  };

  const removeProduct = (index: number) => {
    if (products.length <= 1) return;
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof ProductFormData, value: string | boolean | File | null) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

  const handleProductImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Product image must be JPG, PNG, or WEBP");
      return;
    }

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      });
      updateProduct(index, "image_file", compressed);
      updateProduct(index, "image_url", URL.createObjectURL(compressed));
      setError("");
    } catch {
      setError("Failed to process product image");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image");
      return;
    }

    // Validate file size (5MB max before compression)
    if (file.size > siteConfig.maxImageSizeMB * 1024 * 1024) {
      setError(`Image must be under ${siteConfig.maxImageSizeMB}MB`);
      return;
    }

    // Compress image
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: siteConfig.targetImageSizeKB / 1024,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });
      setImageFile(compressed);
      setImagePreview(URL.createObjectURL(compressed));
      setError("");
    } catch {
      setError("Failed to process image. Please try another.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate
    if (!title.trim()) {
      setError("Outfit title is required");
      setIsLoading(false);
      return;
    }
    if (!category) {
      setError("Please select a category");
      setIsLoading(false);
      return;
    }
    if (!imageFile) {
      setError("Please upload an outfit image");
      setIsLoading(false);
      return;
    }

    // Validate products
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      if (!p.name.trim()) {
        setError(`Product ${i + 1}: Name is required`);
        setIsLoading(false);
        return;
      }
      if (!p.affiliate_url.trim() || !isValidUrl(p.affiliate_url)) {
        setError(`Product ${i + 1}: Valid URL is required`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Session expired. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Get creator
      const { data: creator } = await supabase
        .from("creators")
        .select("id, username")
        .eq("auth_id", user.id)
        .single();

      if (!creator) {
        setError("Creator profile not found.");
        setIsLoading(false);
        return;
      }

      // Upload image
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${creator.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("outfit-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        setError("Failed to upload image. Please try again.");
        setIsLoading(false);
        return;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("outfit-images").getPublicUrl(fileName);

      // Insert outfit
      const { data: outfit, error: outfitError } = await supabase
        .from("outfits")
        .insert({
          creator_id: creator.id,
          title: sanitizeText(title),
          category,
          image_url: publicUrl,
          is_published: isPublished,
        })
        .select("id")
        .single();

      if (outfitError || !outfit) {
        setError("Failed to create outfit. Please try again.");
        setIsLoading(false);
        return;
      }

      // Upload product images and insert products
      const productRows = [];
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        let productImageUrl: string | null = null;

        // Upload product image if provided
        if (p.image_file) {
          const prodFileExt = (p.image_file as File).name.split(".").pop();
          const prodFileName = `${creator.id}/products/${outfit.id}_${i}_${Date.now()}.${prodFileExt}`;

          const { error: prodUploadError } = await supabase.storage
            .from("outfit-images")
            .upload(prodFileName, p.image_file as File);

          if (!prodUploadError) {
            const { data: { publicUrl: prodUrl } } = supabase.storage
              .from("outfit-images")
              .getPublicUrl(prodFileName);
            productImageUrl = prodUrl;
          }
        }

        productRows.push({
          outfit_id: outfit.id,
          name: sanitizeText(p.name),
          platform: p.platform,
          affiliate_url: p.affiliate_url.trim(),
          price: p.price ? sanitizeText(p.price) : "",
          image_url: productImageUrl,
          display_order: i,
          in_stock: true,
        });
      }

      const { error: productsError } = await supabase
        .from("products")
        .insert(productRows);

      if (productsError) {
        setError("Outfit created but failed to add products.");
        setIsLoading(false);
        return;
      }

      // Success — show the published URL
      const outfitPageUrl = `${siteConfig.url}/${creator.username}`;
      setPublishedUrl(outfitPageUrl);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyUrl = () => {
    if (publishedUrl) {
      navigator.clipboard.writeText(publishedUrl);
    }
  };

  const categoryOptions = siteConfig.categories
    .filter((c) => c !== "All")
    .map((c) => ({ value: c, label: c }));

  const platformOptions = siteConfig.platforms.map((p) => ({
    value: p,
    label: p,
  }));

  // Success state — show link
  if (publishedUrl) {
    return (
      <div className="mx-auto max-w-2xl text-center py-12">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="font-display text-2xl font-bold text-primary-dark">
          Outfit Published!
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Your outfit is live. Share this link in your bio, reels, or ads:
        </p>

        {/* Copyable URL */}
        <div className="mt-6 flex items-center gap-2 border border-border bg-background p-3 mx-auto max-w-md">
          <input
            type="text"
            value={publishedUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-text-primary outline-none"
          />
          <button
            onClick={copyUrl}
            className="bg-primary-dark px-3 py-1.5 text-xs font-medium text-white hover:bg-[#333] transition-colors"
          >
            Copy
                </button>
              </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href={publishedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-background transition-colors"
              >
            View Storefront →
          </a>
                      <button
            onClick={() => {
              setPublishedUrl(null);
              setTitle("");
              setCategory("");
              setImageFile(null);
              setImagePreview(null);
              setProducts([{ ...emptyProduct }]);
            }}
            className="bg-gold-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                      >
            Create Another
                      </button>
                  </div>
                </div>
  );
}

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-primary-dark">
        Create New Outfit
      </h1>
      <p className="mt-1 text-sm text-text-secondary">
        Add a complete look with up to {siteConfig.maxProductsPerOutfit} products
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Title */}
        <Input
          label="Outfit Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Navy Corporate Chic"
          maxLength={siteConfig.maxOutfitTitleLength}
          helperText={`${title.length}/${siteConfig.maxOutfitTitleLength} characters`}
          required
        />

        {/* Category */}
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categoryOptions}
          placeholder="Select a category"
          required
        />

        {/* Image Upload */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-primary">
            Outfit Image
          </label>
          <div className="border border-dashed border-border p-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto max-h-48 object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute right-0 top-0 bg-red-600 px-2 py-1 text-xs text-white"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-2 py-6">
                <span className="text-2xl">📷</span>
                <span className="text-sm text-text-secondary">
                  Click to upload (JPG, PNG, WEBP — max {siteConfig.maxImageSizeMB}MB)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium text-text-primary">
              Products ({products.length}/{siteConfig.maxProductsPerOutfit})
            </label>
            {products.length < siteConfig.maxProductsPerOutfit && (
              <Button type="button" variant="ghost" size="sm" onClick={addProduct}>
                + Add Product
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="border border-border bg-surface p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-secondary">
                    Product {index + 1}
                  </span>
                  {products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Product Image Upload */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text-secondary">
                    Product Image (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    {product.image_url ? (
                      <div className="relative h-16 w-16 border border-border overflow-hidden">
                        <img
                          src={product.image_url}
                          alt="Product"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateProduct(index, "image_file", null);
                            updateProduct(index, "image_url", "");
                          }}
                          className="absolute -right-1 -top-1 bg-red-600 h-4 w-4 flex items-center justify-center text-[8px] text-white rounded-full"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-16 w-16 cursor-pointer items-center justify-center border border-dashed border-border bg-background text-text-secondary hover:border-gold-accent transition-colors">
                        <span className="text-lg">+</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) => handleProductImageChange(index, e)}
                          className="hidden"
                        />
                      </label>
                    )}
                    <span className="text-[10px] text-text-secondary">
                      Square image recommended
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input
                    label="Product Name"
                    value={product.name}
                    onChange={(e) => updateProduct(index, "name", e.target.value)}
                    placeholder="Navy Wide Leg Palazzo"
                    required
                  />
                  <Select
                    label="Platform"
                    value={product.platform}
                    onChange={(e) =>
                      updateProduct(index, "platform", e.target.value)
                    }
                    options={platformOptions}
                  />
                  <Input
                    label="Affiliate URL"
                    value={product.affiliate_url}
                    onChange={(e) =>
                      updateProduct(index, "affiliate_url", e.target.value)
                    }
                    placeholder="https://amzn.to/abc123"
                    type="url"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-4 border border-border bg-surface p-4">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-border peer-checked:bg-gold-accent transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
          </label>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {isPublished ? "Publish" : "Save as Draft"}
            </p>
            <p className="text-xs text-text-secondary">
              {isPublished
                ? "This outfit will be visible on your storefront"
                : "Only you can see this outfit (hidden from public)"}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
          >
            {isPublished ? "Publish Outfit" : "Save Draft"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

