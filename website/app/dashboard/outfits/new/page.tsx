"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { sanitizeText, isValidUrl } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import type { ProductFormData } from "@/lib/types";

/**
 * Create New Outfit Page
 * ======================
 * Route: /dashboard/outfits/new
 * Form with: title, category, image upload, products (1-15).
 */

const emptyProduct: ProductFormData = {
  name: "",
  platform: "Amazon",
  affiliate_url: "",
  price: "",
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

  const addProduct = () => {
    if (products.length >= siteConfig.maxProductsPerOutfit) return;
    setProducts([...products, { ...emptyProduct }]);
  };

  const removeProduct = (index: number) => {
    if (products.length <= 1) return;
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof ProductFormData, value: string | boolean) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
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
      if (!p.price.trim()) {
        setError(`Product ${i + 1}: Price is required`);
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

      // Insert products
      const productRows = products.map((p, index) => ({
        outfit_id: outfit.id,
        name: sanitizeText(p.name),
        platform: p.platform,
        affiliate_url: p.affiliate_url.trim(),
        price: sanitizeText(p.price),
        display_order: index,
        in_stock: p.in_stock,
      }));

      const { error: productsError } = await supabase
        .from("products")
        .insert(productRows);

      if (productsError) {
        setError("Outfit created but failed to add products.");
        setIsLoading(false);
        return;
      }

      // Success — redirect to storefront
      router.push(`/${creator.username}`);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = siteConfig.categories
    .filter((c) => c !== "All")
    .map((c) => ({ value: c, label: c }));

  const platformOptions = siteConfig.platforms.map((p) => ({
    value: p,
    label: p,
  }));

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
                  <div className="flex items-center gap-3">
                    <Toggle
                      enabled={product.in_stock}
                      onChange={(val) => updateProduct(index, "in_stock", val)}
                      label={product.in_stock ? "In Stock" : "Out of Stock"}
                      size="sm"
                    />
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
                  <Input
                    label="Price"
                    value={product.price}
                    onChange={(e) => updateProduct(index, "price", e.target.value)}
                    placeholder="₹1,499"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-4 border border-border bg-surface p-4">
          <Toggle
            enabled={isPublished}
            onChange={setIsPublished}
          />
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
